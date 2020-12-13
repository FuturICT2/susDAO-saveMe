pragma solidity ^0.5.16;

import 'contract/TokenValidation.sol'
import 'contract/SaveMeToken.sol'


/*  This contract:
    - calls the Token Validation to verify the tokens of a user/patient every 3 months
    - returns a digital copy of the insurance of this user/patient
    - draws money from the patients account, through approval*/


contract HealthInsurance is TokenValidation {

    public address PatientAddress ;
    public address InsuranceCompanyAddress ;
    public uint256 insurance_cost ;
    public string IPFS_Insurance_hash ;
    public bool 3monthsPassed ; 


    //Create Event , when 3 months have passed, in order to call again the Token Validation
    event ReValidate {
        tokentoken_validation_instance =  new TokenValidation( InsuranceCompanyAddress , PatientAddress); //this is wrong but conceptually this is what I aim to do
    }


    constructor ( _PatientAddress , _InsuranceCompanyAddress , _insurance_cost) public {

        PatientAddress = _PatientAddress ;
        InsuranceCompanyAddress = _InsuranceCompanyAddress ;
        insurance_cost =  _insurance_cost; 


        init() ;
   }


   function init(){
       //reset the 3 monthsPassed boolean...as we just validated today
       3monthsPassed =false ;
       //call TokenValidation
       TokenValidation token_validation_instance =  new TokenValidation( InsuranceCompanyAddress , PatientAddress);
       //Deploy now the health insurance of the user/patient
       DeployInsuranceCopy(PatientAddress) ; 
       //Now call the allowance function from SaveMeToken (or maybe need to change, where I've placed the allowance function)
       allowance(PatientAddress, InsuranceCompanyAddress ,insurance_cost)

       //This is wrong, but what I am trying to do is the emit an Event and redo Token Validation if 3 months since the deployment of this contract have passed
       if(3monthsPassed){
       emit ReValidate 
       }
       
   }

    function viewInsuranceCopy(address Insured_party){

        return IPFS_hash_Insurance;

    } 

    function DeployInsuranceCopy(address Insured_party){
        //Create an IPFS file with the address of the insured party attached
        //This will act as a digital copy of the health insurance
        //Conceptual Decision => deploy actual Health Insurance Digital Copy on ETH blockchain
        //The Created IPFS file is encrypted with the address of Insured_party
        //update hash
        //IPFS_hash_Insurance  = deployed_hash_address // IPFS hash is set as
        //
    }



}

