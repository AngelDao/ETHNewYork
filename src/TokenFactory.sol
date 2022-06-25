// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {LazyMintable} from "./LazyMintable.sol";

contract TokenFactory {
    function deploy() public {
        LazyMintable token = new LazyMintable();
    }
}
