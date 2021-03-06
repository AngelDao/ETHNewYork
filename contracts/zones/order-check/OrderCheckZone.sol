// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { ZoneInterface } from "./interfaces/ZoneInterface.sol";
import { ZoneInteractionErrors } from "./interfaces/ZoneInteractionErrors.sol";
import { SeaportInterface } from "./interfaces/SeaportInterface.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// prettier-ignore
import {
    AdvancedOrder,
    CriteriaResolver,
    Order,
    OrderComponents,
    Fulfillment,
    Execution
} from "./lib/ConsiderationStructs.sol";

contract OrderCheckZone is ZoneInterface {
    /**
    * @notice No checks required 
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

        // orderhash.extraData is an abi encoded bytes object containing
        // (voucherHash, bytes32), (voucherSignature, bytes),
        // (merkleProof, bytes32), (merkleRoot, bytes32)
        (
            bytes32 _voucherHash,
            bytes memory _voucherSignature,
            bytes32[] memory _merkleProof,
            bytes32 _merkleRoot
        ) = abi.decode(order.extraData, (bytes32, bytes, bytes32[], bytes32));

        // Check that voucher is signed by caller (called fulfill function)
        // Voucher signature is stored in order.extraData
        address signer = ECDSA.recover(_voucherHash, _voucherSignature);
        require(
            signer == order.parameters.offerer,
            "extraData not signed by offerer"
        );

        // Check that the caller is in the merkle root
        bytes32 leaf = keccak256(abi.encodePacked(caller));
        require(
            MerkleProof.verify(_merkleProof, _merkleRoot, leaf),
            "Invalid proof"
        );

        // Return the selector of isValidOrder as the magic value.
        validOrderMagicValue = ZoneInterface.isValidOrder.selector;
    }
}
