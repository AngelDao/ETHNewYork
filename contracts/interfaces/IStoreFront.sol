pragma solidity ^0.8.10;

interface Interface {
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] amounts);
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 amount);
    event URI(string value, uint256 indexed id);

    function balanceOf(address, uint256) view external returns (uint256);
    function balanceOfBatch(address[] memory owners, uint256[] memory ids) view external returns (uint256[] memory balances);
    function isApprovedForAll(address, address) view external returns (bool);
    function mint(address _to, uint256 _amount) external;
    function owner() view external returns (address);
    function renounceOwnership() external;
    function safeBatchTransferFrom(address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external;
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) external;
    function setApprovalForAll(address operator, bool approved) external;
    function supportsInterface(bytes4 interfaceId) view external returns (bool);
    function totalSupply(uint256) view external returns (uint256);
    function transferOwnership(address newOwner) external;
    function updateBaseUri(string memory base) external;
    function uri(uint256 id) view external returns (string memory);
}
