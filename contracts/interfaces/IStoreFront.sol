pragma solidity ^0.8.10;

interface IStoreFront {
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] amounts
    );
    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 id,
        uint256 amount
    );
    event URI(string value, uint256 indexed id);

    function permitAll(
        address _owner,
        address _operator,
        bool _approved,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external;

    function balanceOf(address, uint256) external view returns (uint256);

    function balanceOfBatch(address[] memory owners, uint256[] memory ids)
        external
        view
        returns (uint256[] memory balances);

    function isApprovedForAll(address, address) external view returns (bool);

    function mint(address _to, uint256 _amount) external;

    function owner() external view returns (address);

    function renounceOwnership() external;

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;

    function setApprovalForAll(address operator, bool approved) external;

    function setMinter(address _minter) external;

    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    function totalSupply(uint256) external view returns (uint256);

    function transferOwnership(address newOwner) external;

    function updateBaseUri(string memory base) external;

    function uri(uint256 id) external view returns (string memory);
}
