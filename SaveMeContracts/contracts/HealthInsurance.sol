pragma solidity ^0.5.16;

import 'contracts/TokenValidation.sol';
import 'contracts/SaveMeToken.sol';


/*  This contract:
    - calls the Token Validation to verify the tokens of a user/patient every 3 months
    - returns a digital copy of the insurance of this user/patient
    - draws money from the patients account, through approval*/


contract HealthInsurance is TokenValidation {

    address public PatientAddress;
    address public InsuranceCompanyAddress;
    uint256 public insurance_cost;
    string public IPFS_Insurance_hash;
    bool public three_monthsPassed;


    //Create Event , when 3 months have passed, in order to call again the Token Validation
    event ReValidate (
        //TokenValidation tokentoken_validation_instance =  new TokenValidation( InsuranceCompanyAddress , PatientAddress); //this is wrong but conceptually this is what I aim to do
    );


    constructor ( address _PatientAddress, address _InsuranceCompanyAddress, uint256 _insurance_cost) public {

        PatientAddress = _PatientAddress;
        InsuranceCompanyAddress = _InsuranceCompanyAddress;
        insurance_cost = _insurance_cost;
        init();
   }


    function init() public returns (bool success) {
       //reset the 3 monthsPassed boolean...as we just validated today
       three_monthsPassed = false;
       //call TokenValidation
       TokenValidation token_validation_instance = new TokenValidation( InsuranceCompanyAddress , PatientAddress);
       token_validation_instance.deploy_tokens(); //call the function from the token validation contract todeploy the tokens
       //Deploy now the health insurance of the user/patient
       DeployInsuranceCopy(PatientAddress);
       //Now call the allowance function from SaveMeToken (or maybe need to change, where I've placed the allowance function)
       allowance(PatientAddress, InsuranceCompanyAddress, insurance_cost);

       //This is wrong, but what I am trying to do is the emit an Event and redo Token Validation if 3 months since the deployment of this contract have passed
       if(three_monthsPassed){
       emit ReValidate();
       }
   }

    function viewInsuranceCopy(address Insured_party) public returns(bool success){
        //return the IPFS_Insurance_Hash

        return true;
    }

    function DeployInsuranceCopy(address Insured_party) public returns (bool succcess){
        //Create an IPFS file with the address of the insured party attached
        //This will act as a digital copy of the health insurance
        //Conceptual Decision => deploy actual Health Insurance Digital Copy on ETH blockchain
        //The Created IPFS file is encrypted with the address of Insured_party
        //update hash
        //IPFS_hash_Insurance  = deployed_hash_address // IPFS hash is set as
        return true;
    }



}

