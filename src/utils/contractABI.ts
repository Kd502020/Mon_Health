export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const CONTRACT_ABI = [
  "function uploadData(string memory _ipfsHash) public",
  "function grantAccess(address _user, address _canAccess) public",
  "function revokeAccess(address _user, address _revokeFrom) public",
  "function hasAccess(address _user, address _caller) public view returns (bool)",
  "function getDataHash(address _user) public view returns (string memory)",
  "event DataUploaded(address indexed user, string ipfsHash)",
  "event AccessGranted(address indexed owner, address indexed grantedTo)",
  "event AccessRevoked(address indexed owner, address indexed revokedFrom)"
];
