pragma solidity ^0.7.5;

import 'contracts/SaveMeToken.sol';

/*This contract creates the tokens based on the IPFS token file retrieved & read */

contract TokenValidation is SaveMeToken
{   
    private address ValidationCaller;
    private address TokenValidationAddress ; 
    private address TokenOwner;
    private uint256 supply;


    constructor (address _ValidationCaller, address _TokenOwner) public {
        ValidationCaller = _ValidationCaller;
        TokenOwner = _TokenOwner;

    }

    function deployTokens(){
    TokenValidationAddress == msg.sender; // we want the token creator to be the Token Validation Contract address
    supply = 0 ; //set supply of tokens to 0;
    //Go to the IPFS file of the account specified by tokenOwner
    //Retrieve and read the Token IPFS file
    //Count # of tokens 
    // supply = IPFS_tokens() ; Set supply to this number of tokens
    //The # of SaveTokens to be created are set by supply
    //Create an instance of SaveMe token
    SaveMeToken token_instance = new SaveMeToken(supply , TokenOwner , TokenValidationAddress);  //SaveMeToken constructor receives (_initialSupply, _initialSupplyOwner, _tokenCreator)
        
    }
    
    


}