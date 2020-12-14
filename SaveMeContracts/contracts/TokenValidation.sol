pragma solidity ^0.5.16;

import 'contracts/SaveMeToken.sol';

/*This contract creates the tokens based on the IPFS token file retrieved & read */
//Hence :
    //We set supply of tokens to 0;
    //Go to the IPFS file of the account specified by tokenOwner
    //Retrieve and read the Token IPFS file
    //Count # of tokens
    // supply = IPFS_tokens() ; Set supply to this number of tokens
    //The # of SaveTokens to be created are set by supply
    //Create an instance of SaveMe token
    //SaveMeToken token_instance = new SaveMeToken (supply, TokenOwner ,TokenValidationAddress);
    //SaveMeToken constructor receives (_initialSupply, _initialSupplyOwner, _tokenCreator)

contract TokenValidation is SaveMeToken
{
    address private ValidationCaller;
    address private TokenValidationAddress;
    address private TokenOwner;
    uint256 private supply;
    uint public tokenCreationTime;
    bool private initDone = false;
    bool private validPatient = false;
    string private IPFShash ;
    string private IPNSLink ;


    //It maps an address to an IPNS String link. And then this is mapped to an IPFS hash, corresponding to the token IPFS file
    mapping(address =>mapping(string => string)) private IPFS_tokenHash;
    mapping(address => string) IPNS_tokenLink ;
    mapping(address => bool) patients;


    constructor () public {
        tokenCreationTime = now;
        }



     function init(address _ValidationCaller, address _TokenOwner) public {
        require(!initDone, "init() can only be called once"); // TODO also require token creator?
        ValidationCaller = _ValidationCaller;
        TokenOwner = _TokenOwner;
        initDone = true;
        }


    //returns the Hash of the IPFS toke file corresponding to the patient
    function getIPFSTokensHash() private returns (bool success){
        require (validPatient, "This Address does not correspond to an existing patient");
        //go to IPNS link and get the hash
        IPFShash = IPFS_tokenHash[TokenOwner][IPNS_tokenLink[TokenOwner]];
        return true;
    }


    function checkAddress(address _to) private returns (bool){
        
        validPatient = patients[_to];
        return true;

    }

    function getValidatedTokens() private returns (uint256){
        require (validPatient ,"This Address does not correspond to an existing patient");
        //count tokens inside the IPFS hash
        //supply = download_and_count(IPFShash) ;
        return supply ;

    }


    function deployTokens( address _from, address  _to) public returns (bool) {
        supply = 0;
        init(_from, _to);
        checkAddress(_to);
        getIPFSTokensHash();
        getValidatedTokens();
        return true ;
    }

}