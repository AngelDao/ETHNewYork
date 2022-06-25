// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/TokenFactory.sol";

contract ContractTest is Test {
    TokenFactory factory;

    function setUp() public {
        factory = new TokenFactory();
    }

    function testExample() public {
        assertTrue(true);
    }
}
