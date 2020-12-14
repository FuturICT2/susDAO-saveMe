pragma solidity ^0.5.16;

import 'contracts/SaveMeToken.sol';

/*This contract creates the tokens based on the IPFS token file retrieved & read */

contract TokenValidation is SaveMeToken
{
    address private ValidationCaller;
    address private TokenValidationAddress;
    address private TokenOwner;
    uint256 private supply;
    uint public tokenCreationTime;
    bool private initDone = false;


    constructor () public {
        tokenCreationTime = now;
        }



     function init(address _ValidationCaller, address _TokenOwner, uint256 _supply) public {
        require(!initDone, "init() can only be called once"); // TODO also require token creator?
        ValidationCaller = _ValidationCaller;
        TokenOwner = _TokenOwner;
        supply = _supply;
        initDone = true;
        }

    function deployTokens() public returns (bool success) {
    TokenValidationAddress == msg.sender; // we want the token creator to be the Token Validation Contract address
    supply = 0; //set supply of tokens to 0;
    //Go to the IPFS file of the account specified by tokenOwner
    //Retrieve and read the Token IPFS file
    //Count # of tokens
    // supply = IPFS_tokens() ; Set supply to this number of tokens
    //The # of SaveTokens to be created are set by supply
    //Create an instance of SaveMe token
    //SaveMeToken token_instance = new SaveMeToken (supply, TokenOwner ,TokenValidationAddress);
    //SaveMeToken constructor receives (_initialSupply, _initialSupplyOwner, _tokenCreator)
    return true;
    }

}