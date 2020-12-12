var QRCode = require("qrcode");
var canvas = document.getElementById('canvas');


//function to set QR code in the welcoming page
async function setQR(text_to_QR){
    QRCode.toCanvas(canvas, text_to_QR , function (error) {
            if (error) console.error(error)
            console.log('success!');
            })
    
    
}





window.addEventListener('load', async () => {
    console.log("Hey") ;
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable().then((account) =>{
            const defaultAccount = account[0]
            web3.eth.defaultAccount = defaultAccount
            })
            console.log(web3.eth.defaultAccount);
            setQR(String(web3.eth.defaultAccount)); //Set the QR code in the welcome page
            
            
            //web3.eth.getAccounts().then(function(acc){ accounts = acc })
            // Acccounts now exposed
        } catch (error) {
            alert("You need to log-in for full website functionality. Try re-loading the page");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        alert ("It is a requirement to install MetaMask");
        console.log('Non-Ethereum browser detected \n You should consider trying MetaMask!');
        location.href = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
    }
    
});