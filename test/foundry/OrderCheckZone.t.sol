// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13;

// prettier-ignore
import {
    AdvancedOrder,
    CriteriaResolver,
    Order,
    OrderComponents,
    Fulfillment,
    Execution
} from "../../contracts/lib/ConsiderationStructs.sol";
import { BaseOrderTest } from "./utils/BaseOrderTest.sol";
import { OrderCheckZone } from "../../contracts/zones/order-check/OrderCheckZone.sol";

contract OrderCheckZoneTest is OrderCheckZone, BaseOrderTest {

    struct TestTx {
        bytes32 orderHash;
        address caller;
        address offerer;
        bytes32 zoneHash;
        bytes32[] priorOrderHashes;
    }

    struct TestOrder {
        bytes32 _voucherHash;
        bytes _voucherSignature;
        bytes32[] _merkleProof;
        bytes32 _merkleRoot;
    }

    function testIsValidOrder(TestTx memory inputs)
        public
    {
        try this.isValidOrder(
                inputs.orderHash,
                inputs.caller,
                inputs.offerer,
                inputs.zoneHash
            ) {} catch (bytes memory reason) {
                assertPass(reason);
            }
    }

    function testIsValidOrderIncludingExtraData(TestTx memory inputs)
        public 
    {
        try this.isValidOrderIncludingExtraData(
            inputs.orderHash,
            inputs.caller,
            inputs.order,
            inputs.priorOrderHashes,
            0
        ) {} catch (bytes memory reason) {
            assertPass(reason);
        }
    }
    
    TestTx testTx = createTestTx();
}