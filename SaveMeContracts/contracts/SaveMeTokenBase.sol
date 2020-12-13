pragma solidity ^0.7.5;

contract SaveMeTokenBase { // abstract class
    address ClaimingAddress ;  //other classes can access this
    address tokenCreator; //other classes can access this
    string public description ;
    string public unit;
    uint public tokenCreationTime;
    uint initialSupply; //others can access as well
    address initialSupplyOwner; //others can access as well
    bool private initDone = false;
    bool private TokenValidationHasMinterRole = true;

    constructor() public {
        tokenCreationTime = now;
    }

    function init(address _ClaimingAddress, bool _TokenValidationHasMinterRole, string memory _description, string memory _unit) public {
        require(!initDone, "init() can only be called once"); // TODO also require token creator?
        ClaimingAddress = _ClaimingAddress;
        TokenValidationHasMinterRole = _TokenValidationHasMinterRole;
        description = _description;
        unit = _unit;
        initDone = true;
    }

    function name() public view returns(string memory);
    function symbol() public view returns(string memory);

    function getTokenCreator() public view returns(address) {
        return tokenCreator;
    }

    address[] public addressesWithMinterRoles;
    addresses_withMinterroles = '' //add the address of the TokenValidation Contract 

    function getInitialSupplyOwnerAndTokenCreatorAndMinterRoles() internal view returns(address[] memory) {
        address[] memory addresses = new address[](2 + addressesWithMinterRoles.length);
        addresses[0] = initialSupplyOwner;
        addresses[1] = tokenCreator;
        for (uint i = 0; i < addressesWithMinterRoles.length; i++) {
            addresses[2 + i] = addressesWithMinterRoles[i];
        }
        return addresses;
    }

    function isMinter(address account) public view returns (bool);

    function addMinter(address account) public;

    function renounceMinter() public;

    function mint(address account, uint256 amount) public returns (bool);
}
