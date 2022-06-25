// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { ZoneInterface } from "../interfaces/ZoneInterface.sol";
import { ZoneInteractionErrors } from "../interfaces/ZoneInteractionErrors.sol";
import {recover} from "@openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";

import { SeaportInterface } from "../interfaces/SeaportInterface.sol";

// prettier-ignore
import {
    AdvancedOrder,
    CriteriaResolver,
    Order,
    OrderComponents,
    Fulfillment,
    Execution
} from "../lib/ConsiderationStructs.sol";

contract OfferCheckZone is ZoneInterface {
    
    /**
    * @notice Check if a given order is signed by the same addresss
    *         that created the order, and fits the Merkle root.
    * @dev This function is called by Seaport whenever extraData is not
    *      provided by the caller.

    * @param orderHash The hash of the order.
    * @param caller    The caller in question.
    * @param offerer   The offerer in question.
    * @param zoneHash  The hash to provide upon calling the zone.
    *
    * @return validOrderMagicValue A magic value indicating if the order is
    *                              currently valid.
    */
    function isValidOrder(
        bytes32 orderHash,
        address caller,
        address offerer,
        bytes32 zoneHash
    ) external pure override returns (bytes4 validOrderMagicValue) {
        orderHash;
        caller;
        offerer;
        zoneHash;

        // Return the selector of isValidOrder as the magic value.
        validOrderMagicValue = ZoneInterface.isValidOrder.selector;
    }

    /**
    * @notice Check if a given order including hash in extraData is signed by the same addresss
    *         that created the order, and fits the Merkle root.
    *
    * @dev This function is called by Seaport whenever any extraData is
    *      provided by the caller.
    *
    * @param orderHash         The hash of the order.
    * @param caller            The caller in question.
    * @param order             The order in question.
    * @param priorOrderHashes  The order hashes of each order supplied prior to
    *                          the current order as part of a "match" variety
    *                          of order fulfillment.
    * @param criteriaResolvers The criteria resolvers corresponding to
    *                          the order.
    *
    * @return validOrderMagicValue A magic value indicating if the order is
    *                              currently valid.
    */
    function isValidOrderIncludingExtraData(
        bytes32 orderHash,
        address caller,
        AdvancedOrder calldata order,
        bytes32[] calldata priorOrderHashes,
        CriteriaResolver[] calldata criteriaResolvers
    ) external pure override returns (bytes4 validOrderMagicValue) {
        orderHash;
        caller;
        order;
        priorOrderHashes;
        criteriaResolvers;

        // Check that voucher is signed by offerer
        // Voucher signature is stored in order.extraData
        address signer = recover(voucherHash, order.extraData);
        require(signer == order.parameters.offerer, "extraData not signed by offerer");

        // Return the selector of isValidOrder as the magic value.
        validOrderMagicValue = ZoneInterface.isValidOrder.selector;
    }

}