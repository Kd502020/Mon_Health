// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AfitID {
    mapping(address => string) public userIpfsHash;
    mapping(address => mapping(address => bool)) public canAccessData;
    address public owner;

    event DataUploaded(address indexed user, string ipfsHash);
    event AccessGranted(address indexed owner, address indexed grantedTo);
    event AccessRevoked(address indexed owner, address indexed revokedFrom);

    constructor() {
        owner = msg.sender;
    }

    function uploadData(string memory _ipfsHash) public {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty.");
        userIpfsHash[msg.sender] = _ipfsHash;
        emit DataUploaded(msg.sender, _ipfsHash);
    }

    function grantAccess(address _user, address _canAccess) public {
        require(msg.sender == _user, "Only the data owner can grant access.");
        require(_canAccess != address(0), "Invalid address to grant access to.");
        canAccessData[_user][_canAccess] = true;
        emit AccessGranted(_user, _canAccess);
    }

    function revokeAccess(address _user, address _revokeFrom) public {
        require(msg.sender == _user, "Only the data owner can revoke access.");
        require(_revokeFrom != address(0), "Invalid address to revoke access from.");
        canAccessData[_user][_revokeFrom] = false;
        emit AccessRevoked(_user, _revokeFrom);
    }

    function hasAccess(address _user, address _caller) public view returns (bool) {
        return canAccessData[_user][_caller];
    }

    function getDataHash(address _user) public view returns (string memory) {
        require(canAccessData[_user][msg.sender] || msg.sender == _user, "Access denied.");
        return userIpfsHash[_user];
    }
}
