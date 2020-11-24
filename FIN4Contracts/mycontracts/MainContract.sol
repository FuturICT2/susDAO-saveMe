pragma solidity ^0.5.17;

contract Fin4Main {

    address public MainContractCreator;
    constructor() public {
        MainContractCreater = msg.sender;
    }

    address public UncappedTokenCreatorAddress;
    address public CappedTokenCreatorAddress;
    address public TokenManagementAddress;
    address public ClaimingAddress;
    address public CollectionsAddress;
    address public VerifyingAddress;
    address public GroupsAddress;
    address public SystemParametersAddress;
    address public UnderlyingsAddress;
    address public VotingAddress;
    address public Fin4OracleHubAddress; TODO

    function setSatelliteAddresses(address uncappedTokenCreator, address cappedTokenCreator, address tokenManagement, address claiming,
    address collections, address messaging, address verifying, address groups, address systemParameters, address underlyings, address fin4voting) public {
        require (msg.sender == MainContractCreator, "Only the creator of MainContract can set satellite addresses");
        UncappedTokenCreatorAddress = uncappedTokenCreator;
        CappedTokenCreatorAddress = cappedTokenCreator;
        TokenManagementAddress = tokenManagement;
        ClaimingAddress = claiming;
        CollectionsAddress = collections;
        MessagingAddress = messaging;
        VerifyingAddress = verifying;
        GroupsAddress = groups;
        SystemParametersAddress = systemParameters;
        UnderlyingsAddress = underlyings;
        VotingAddress = fin4voting;
    }

    function getSatelliteAddresses() public view returns(address, address, address, address, address, address, address, address,
        address, address, address) {
        return (UncappedTokenCreatorAddress, CappedTokenCreatorAddress, TokenManagementAddress, ClaimingAddress,
            CollectionsAddress, MessagingAddress, VerifyingAddress, GroupsAddress, SystemParametersAddress,
            UnderlyingsAddress, VotingAddress);
    }

    address public REPToken;
    address public GOVToken;
    address public Registry;
    address public PLCRVoting;
    address public Parameterizer;

    function setTCRaddresses(address _REPToken, address _GOVToken, address _Registry, address _PLCRVoting, address _Parameterizer) public {
        REPToken = _REPToken;
        GOVToken = _GOVToken;
        Registry = _Registry;
        PLCRVoting = _PLCRVoting;
        Parameterizer = _Parameterizer;
    }

    function getTCRaddresses() public view returns(address, address, address, address, address) {
        return (REPToken, GOVToken, Registry, PLCRVoting, Parameterizer);
    }

    // FOR DEV

    uint public foo = 3;

    function dev(uint numb) public {
        require(numb == foo, "numb is not foo");
    }

}
