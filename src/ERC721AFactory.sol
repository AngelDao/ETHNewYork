// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import {ERC721A} from "./ERC721A.sol";

contract ERC721AFactory {
    function deploy() public {
        ERC721A token = new ERC721A();
    }
}
