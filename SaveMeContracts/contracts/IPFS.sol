//Licensing
pragma solidity ^0.5.16;


/*This contract aims to get the Hash corresponding to the IPFS files of a particular user.
-Development stage
*/



contract IPFS{

    string public IPFShash;

    function sendHash(string memory _x)public {
        IPFShash = _x;
    }
    function getHash() public view returns (string memory _x) {
        return IPFShash;
    }

}



