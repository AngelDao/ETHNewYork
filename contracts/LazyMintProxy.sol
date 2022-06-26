// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import { SeaportInterface } from "./interfaces/SeaportInterface.sol";
import { IStoreFront } from "./interfaces/IStoreFront.sol";
import { AdvancedOrder, CriteriaResolver, Order, OrderParameters, OrderComponents, Fulfillment, Execution } from "./lib/ConsiderationStructs.sol";

contract LazyMintProxy {
    address public seaportAddress;
    address public storefrontAddress;

    constructor(address _seaportAddress, address _storefrontAddress) {
        seaportAddress = _seaportAddress;
        storefrontAddress = _storefrontAddress;
    }

    function fulfillAdvancedOrder(
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient
    ) external payable returns (bool fulfilled) {
        //load storefront contract
        IStoreFront storefrontDeployment = IStoreFront(storefrontAddress);

        // get mint parameters from order
        uint256 amount = advancedOrder.parameters.offer.length;

        // Mint NFT
        storefrontDeployment.mint(recipient, amount);

        //load seaport contract
        SeaportInterface seaportDeployment = SeaportInterface(seaportAddress);

        //execute sale
        fulfilled = seaportDeployment.fulfillAdvancedOrder{ value: msg.value }(
            advancedOrder,
            criteriaResolvers,
            fulfillerConduitKey,
            recipient
        );

        //check if successful or revert
        if (!fulfilled) revert("Seaport order unable to be fulfilled.");
    }

    function fulfillAdvancedOrderWithPermit(
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient,
        address _operator,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external payable returns (bool fulfilled) {
        //load storefront contract
        IStoreFront storefrontDeployment = IStoreFront(storefrontAddress);

        // get mint parameters from order
        uint256 amount = advancedOrder.parameters.offer.length;

        // Mint NFT
        storefrontDeployment.mint(recipient, amount);

        storefrontDeployment.permitAll(
            recipient,
            _operator,
            true,
            type(uint256).max,
            _v,
            _r,
            _s
        );

        //load seaport contract
        SeaportInterface seaportDeployment = SeaportInterface(seaportAddress);

        //execute sale
        fulfilled = seaportDeployment.fulfillAdvancedOrder{ value: msg.value }(
            advancedOrder,
            criteriaResolvers,
            fulfillerConduitKey,
            recipient
        );

        //check if successful or revert
        if (!fulfilled) revert("Seaport order unable to be fulfilled.");
    }
}
