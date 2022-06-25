// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import { ERC1155 } from "@rari-capital/solmate/src/tokens/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

contract StoreFront is ERC1155, Ownable {
    mapping(uint256 => uint256) public totalSupply;
    string baseURI;
    address minter;
    uint256 id;

    constructor(address _minter, string memory _baseURI) {
        minter = _minter;
        baseURI = _baseURI;
    }

    modifier onlyMinter() {
        require(msg.sender == minter);
        _;
    }

    function mint(address _to, uint256 _amount) external onlyMinter {
        _mint(_to, _id, _amount, "");
        totalSupply[_id++] += _amount;
    }

    function updateBaseUri(string calldata base) external onlyOwner {
        baseURI = base;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, Strings.toString(id)))
                : baseURI;
    }
}
