// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import { ERC1155 } from "@rari-capital/solmate/src/tokens/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

contract StoreFront is ERC1155, Ownable {
    bytes32 constant DOMAIN_TYPEHASH =
        keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );

    bytes32 constant PERMIT_ALL_TYPEHASH =
        keccak256(
            "PermitAll(address owner,address operator,bool approved,uint256 nonce,uint256 deadline)"
        );

    string public constant NAME = "STOREFRONT";
    string public constant VERSION = "1";
    /// nonces for permit signature validation
    mapping(address => uint256) public nonces;

    mapping(uint256 => uint256) public totalSupply;
    string baseURI;
    address minter;
    uint256 nextId;

    constructor(address _minter) {
        minter = _minter;
        baseURI = "";
    }

    modifier onlyMinter() {
        require(msg.sender == minter);
        _;
    }

    function mint(address _to, uint256 _amount) external onlyMinter {
        _mint(_to, nextId, _amount, "");
        totalSupply[nextId++] += _amount;
    }

    function transferMinter(address _newMinter) external {
        require(msg.sender == minter || msg.sender == owner());
        minter = _newMinter;
    }

    function _computeDomainSeparator() internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    DOMAIN_TYPEHASH,
                    keccak256(bytes(NAME)),
                    keccak256(bytes(VERSION)),
                    block.chainid,
                    address(this)
                )
            );
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

    function permitAll(
        address _owner,
        address _operator,
        bool _approved,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external {
        if (block.timestamp > _deadline) revert("SIG EXPIRED");

        bytes32 structHash = _computePermitAllStructHash(
            _owner,
            _operator,
            _approved,
            _deadline
        );

        bytes32 digest = _computeDigest(_computeDomainSeparator(), structHash);

        address signer = ecrecover(digest, _v, _r, _s);

        if (signer == address(0) || signer != _owner) revert("INVALIDSIG");

        isApprovedForAll[_owner][_operator] = _approved;

        emit ApprovalForAll(_owner, _operator, _approved);
    }

    function _computeDigest(bytes32 _domainSeparator, bytes32 _structHash)
        internal
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked("\x19\x01", _domainSeparator, _structHash)
            );
    }

    function _computePermitAllStructHash(
        address _owner,
        address _operator,
        bool _approved,
        uint256 _deadline
    ) internal returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    PERMIT_ALL_TYPEHASH,
                    _owner,
                    _operator,
                    _approved,
                    nonces[_owner]++,
                    _deadline
                )
            );
    }
}
