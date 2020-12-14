pragma solidity ^0.5.16;

import 'contracts/SaveMeToken.sol';

/*This Contract Gives Access to an Account, to view another accounts IPFS file with data measurements for the past 1 month*/

contract DataAccess is SaveMeToken{

    address public AskingAccess; //address of the ETH address asking to access
    address public GrantAccess; // this patients data
    uint256 public tokens_paid; //this is the amount of tokens agreed by 2 parties to be exchanged
    bool public RequestApprovedByPatient; //Patient should Approve giving access to his/her own data
    //Conceptual choice: Maybe the amount should be fixed.
    

    constructor (address _AskingAccess, address _GrantAccess, uint256 _tokens_paid) public{
        AskingAccess = _AskingAccess;
        GrantAccess = _GrantAccess;
        tokens_paid = _tokens_paid; //this could be set to a ficed amount =>conceptual decision
    }


    function getAccess() public returns(bool success){
        //get IPFS file for _GrantAccess address, which corresponds to the patient
        //Write IPFS file with the public key corresponding to AskingAccess address;
        //Upload new IPFS file
        //Return the hash of this new uploaded IPFS file to the AskingAccess address

        //Then transfer all tokens from one account to the other
        transferFrom(AskingAccess, GrantAccess,tokens_paid); //from the SaveMeToken class
        return true;

    }

}