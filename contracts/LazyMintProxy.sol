// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import { OrderCheckZone } from "./order-check/OrderCheckZone.sol";
import { SeaportInterface } from "./order-check/interfaces/SeaportInterface.sol";
import { StoreFront } from "./interfaces/IStoreFront.sol";

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
        StoreFront storefrontDeployment = StoreFront(storefrontAddress);

        // get mint parameters from order
        address to = recipient; //or AdvancedOrder.parameters.consideration[0].recipient;
        uint256 amount = AdvancedOrder.parameters.offer.length;

        // Mint NFT
        storefrontDeployment.mint(to, amount);

        //Approve seaport
        //......

        //load seaport contract
        SeaportInterface seaportDeployment = SeaportInterface(seaportAddress);

        //execute sale
        bool wentThrough = seaportDeployment.fulfillAdvancedOrder(
            advancedOrder,
            criteriaResolvers,
            fulfillerConduitKey,
            recipient
        );

        //check if successful or revert
        if (!wentThrough) {
            revert("Seaport order unable to be fulfilled.");
        } else {
            return true;
        }
    }
}
