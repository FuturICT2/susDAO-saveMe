pragma solidity ^0.7.5;

contract SaveMeMain {

    address public MainContractCreator;
    constructor() public {
        MainContractCreator = msg.sender;
    }

    address public SaveMeUncappedTokenCreatorAddress;
    address public SaveMeCappedTokenCreatorAddress;
    address public SaveMeTokenManagementAddress;
    address public SaveMeClaimingAddress;
    address public SaveMeCollectionsAddress;
    address public SaveMeVerifyingAddress;
    address public SaveMeGroupsAddress;
    address public SaveMeSystemParametersAddress;
    address public SaveMeUnderlyingsAddress;
    address public SaveMeVotingAddress;
    address public SaveMeFin4OracleHubAddress; 

    function setSatelliteAddresses(address uncappedTokenCreator, address cappedTokenCreator, address tokenManagement, address claiming,
    address collections, address verifying, address groups, address systemParameters, address underlyings, address fin4voting) public {
        require (msg.sender == MainContractCreator, "Only the creator of MainContract can set satellite addresses");
        SaveMeUncappedTokenCreatorAddress = uncappedTokenCreator;
        SaveMeCappedTokenCreatorAddress = cappedTokenCreator;
        SaveMeTokenManagementAddress = tokenManagement;
        SaveMeClaimingAddress = claiming;
        SaveMeCollectionsAddress = collections;
        //SaveMeMessagingAddress = messaging;
        SaveMeVerifyingAddress = verifying;
        SaveMeGroupsAddress = groups;
        SaveMeSystemParametersAddress = systemParameters;
        SaveMeUnderlyingsAddress = underlyings;
        SaveMeVotingAddress = fin4voting;
    }

    function getSatelliteAddresses() public view returns(address, address, address, address, address, address, address, address,
        address, address) {
        return (SaveMeUncappedTokenCreatorAddress, SaveMeCappedTokenCreatorAddress, SaveMeTokenManagementAddress, SaveMeClaimingAddress,
            SaveMeCollectionsAddress,  SaveMeVerifyingAddress, SaveMeGroupsAddress, SaveMeSystemParametersAddress,
            SaveMeUnderlyingsAddress, SaveMeVotingAddress);
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
