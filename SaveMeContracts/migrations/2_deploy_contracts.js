var SaveMeToken = artifacts.require("./SaveMeToken.sol");
var TokenValidation = artifacts.require("./TokenValidation.sol");
var HealthInsurance = artifacts.require('.HealthInsurance.sol');
var DataAccess = artifacts.require('./DataAccess.sol');
var IPFS = artifacts.require('./IPFS.sol');
var _initialSupply = 0 ;

module.exports = function(deployer) {
  deployer.deploy( SaveMeToken , _initialSupply ); // the first is the initial supply, then the initial_supplyOwner and the tokenCreator

  deployer.deploy(TokenValidation);

  deployer.deploy(HealthInsurance);

  deployer.deploy(DataAccess) ;

  deployer.deploy(IPFS);

};
