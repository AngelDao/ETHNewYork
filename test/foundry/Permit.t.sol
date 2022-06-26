// SPDX-License-Identifier: MIT
pragma solidity >=0.8.13;
import "forge-std/Test.sol";
import "../../contracts/StoreFront.sol";

contract FulfillBasicOrderTest is Test {
    address verifyingContract;
    StoreFront token;
    uint256 internal alicePk = 0xa11ce;
    uint256 internal bobPk = 0xb0b;
    uint256 internal calPk = 0xca1;
    address payable internal alice = payable(vm.addr(alicePk));
    address payable internal bob = payable(vm.addr(bobPk));
    address payable internal cal = payable(vm.addr(calPk));
    string public constant NAME = "STOREFRONT";
    string public constant VERSION = "1";

    bytes32 constant DOMAIN_TYPEHASH =
        keccak256(
            "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        );

    bytes32 constant PERMIT_ALL_TYPEHASH =
        keccak256(
            "PermitAll(address owner,address operator,bool approved,uint256 nonce,uint256 deadline)"
        );

    function setUp() public {
        token = new StoreFront(address(this), "");
        verifyingContract = address(token);
    }

    function testPermitAll() public {
        uint8 v;
        bytes32 r;
        bytes32 s;
        (v, r, s) = signPermitAll(alicePk, bob, true, 0, type(uint256).max);

        token.permitAll(alice, bob, true, type(uint256).max, v, r, s);
        assertTrue(token.isApprovedForAll(alice, bob));
    }

    function testRemoveAll() public {
        uint8 v;
        bytes32 r;
        bytes32 s;
        (v, r, s) = signPermitAll(alicePk, bob, true, 0, type(uint256).max);

        token.permitAll(alice, bob, true, type(uint256).max, v, r, s);
        (v, r, s) = signPermitAll(alicePk, bob, false, 1, type(uint256).max);

        token.permitAll(alice, bob, false, type(uint256).max, v, r, s);

        assertFalse(token.isApprovedForAll(alice, bob));
    }

    function testFailInvalidSig() public {
        uint8 v;
        bytes32 r;
        bytes32 s;
        (v, r, s) = signPermitAll(calPk, bob, true, 0, type(uint256).max);
        token.permitAll(alice, bob, true, type(uint256).max, v, r, s);
    }

    function testFailInvalidNonce() public {
        uint8 v;
        bytes32 r;
        bytes32 s;
        (v, r, s) = signPermitAll(alicePk, bob, true, 1, type(uint256).max);
        token.permitAll(alice, bob, true, type(uint256).max, v, r, s);
    }

    function computeDigest(bytes32 _domainSeparator, bytes32 _structHash)
        public
        pure
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked("\x19\x01", _domainSeparator, _structHash)
            );
    }

    function computeDomainSeparator() public view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    DOMAIN_TYPEHASH,
                    keccak256(bytes(NAME)),
                    keccak256(bytes(VERSION)),
                    block.chainid,
                    verifyingContract
                )
            );
    }

    function signPermitAll(
        uint256 _pk,
        address _operator,
        bool _bool,
        uint256 _nonce,
        uint256 _deadline
    )
        public
        returns (
            uint8 v,
            bytes32 r,
            bytes32 s
        )
    {
        bytes32 structHash = keccak256(
            abi.encode(
                PERMIT_ALL_TYPEHASH,
                vm.addr(_pk),
                _operator,
                _bool,
                _nonce++,
                _deadline
            )
        );

        (v, r, s) = vm.sign(
            _pk,
            computeDigest(computeDomainSeparator(), structHash)
        );
    }
}
