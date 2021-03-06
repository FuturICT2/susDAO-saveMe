pragma solidity ^0.5.16;

contract SaveMeTokenStub {

    function name() public view returns(string memory);

    function getTokenCreator() public view returns(address);

    function receiveVerifierApprovalNotice(address verifierTypeAddress, uint claimId, string memory message) public;

    function receiveVerifierRejectionNotice(address verifierTypeAddress, uint claimId, string memory message) public;

    function receiveVerifierPendingNotice(address verifierTypeAddress, uint claimId, string memory message) public;

    function countApprovedClaimsOfThisUser(address user) public returns(uint);

    function getVerifierStatus(address verifier, uint claimId) public returns(uint);

    function balanceOf(address account) public view returns (uint256);

}
