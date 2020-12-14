var SaveMeToken = artifacts.require("./SaveMeToken.sol");
var TokenValidation = artifacts.require("./TokenValidation.sol");
var _initialSupply = 0 ;

module.exports = function(deployer) {
  deployer.deploy( SaveMeToken , _initialSupply ); // the first is the initial supply, then the initial_supplyOwner and the tokenCreator
};
