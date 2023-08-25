pragma solidity >=0.8.0 <0.9.0;

import "./ERC721.sol";

contract Seeker is ERC721 {
    uint256 private _totalSupply;

    constructor(address payable owner, string memory name, string memory symbol) ERC721(name, symbol) {
        _totalSupply = 0;
        _mint(owner, _totalSupply + 1, address(0));
    }
}