pragma solidity ^0.5.16;

import 'contracts/tokens/ERC20StandardInterface.sol';
import 'contracts/tokens/ERC20Plus.sol';
import 'contracts/SaveMeTokenBase.sol';
import 'contracts/util/SafeMath.sol';



/*This Contract creates a SaveMe token . The parameters that need to be aprsed are the amount of token supply , the owner and the token creator*/

using SafeMath for uint256, uint , uint8 ; //use safemath for all math operations to avoid overflows and hacking of your smart contracts

contract SaveMeToken is ERC20StandardInterface , ERC20Plus {
    string  public name = "SaveMe";
    string  public symbol = "SVM";
    string  public standard = "SaveMe v1.0";
    bool public  isBurnable = true ;
    bool public isTransferable = true ;
    bool public isMintable = true ;
    uint256 public totalSupply;
    uint8 decimals = 0 ; //we don't want our token to be divisable
    address private TokenValidationAddress = ;//

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    //call an instance of the token and parse in the initial supply, the owner and the token creator address


    constructor(uint256 _initialSupply, address _initialSupplyOwner, address _tokenCreator) public {
        require (_tokenCreator == TokenValidationAddress, "Require only the TokenValidationAddress to be allowed to create anew token"); //Allow only TokenValidation Address to be token creator;
        ERC20Plus(name, symbol, decimals, address(1), isBurnable, isTransferable, isMintable, _initialSupply, _initialSupplyOwner);
        SaveMeTokenBase();
        tokenCreator = _tokenCreator; //inherit to TokenBase
        initialSupply = _initialSupply; //inherit to TokenBase
        initialSupplyOwner = _initialSupplyOwner; //inherited to TokenBase
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {  //method deploying contract and sending tokens
        require(balanceOf[msg.sender] >= _value, "Not enough tokens");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) { //give approval to an account to withdraw from another account
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) { //transfer from one account to another
        require(_value <= balanceOf[_from], "Not enough tokens to transfer required amount");
        require(_value <= allowance[_from][msg.sender], "You earned all the agreed tokens, cannot get more");

        balanceOf[_from] -= _value; //remove from other account address
        balanceOf[_to] += _value;  //add to one account address

        allowance[_from][msg.sender] -= _value; //reduce amount of allowance by 1 everytime

        emit Transfer(_from, _to, _value); //trigger even for token transfer

        return true;
    }



    function getTokenInfo(address user) public view returns( string memory, string memory,
        string memory, string memory, uint256, uint) {
        return (name(), symbol(), description, unit, totalSupply() , tokenCreationTime);
    }

    function getDetailedTokenInfo() public view returns(uint256, uint256, uint,
        bool[] memory, string memory, address[] memory) {

        bool[] memory props = new bool[](4);
        props[0] = isTransferable;
        props[1] = isMintable;
        props[2] = isBurnable;
        props[3] = false; // isCapped

        uint[] memory values = new uint[](4);
        values[0] = 0; // cap
        values[1] = uint(decimals());
        values[2] = fixedAmount;
        values[3] = initialSupply;

        return (balanceOf(msg.sender), totalSupply(), tokenCreationTime, props, values, getInitialSupplyOwnerAndTokenCreatorAndMinterRoles());
    }

}
