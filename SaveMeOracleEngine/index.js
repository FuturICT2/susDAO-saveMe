
const express = require('express'); //linrary to allow web development
const app = express(); //create an app
const port = 4050;
const cors = require('cors'); //Allos access-control-allow-origin headders to be added to your app responses 
//Which origins are allowd to access server resources? 
//Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts
//You can use it to set allowed origins. Check https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
const moment = require('moment'); //a Javascript date library for parsing,validating,formatting and manipulating dates
const config = require('./config.json');
app.use(cors()); //this will contrin the list of all the allowed origins
const title = 'OracleEngine';  

const HDWalletProvider = require('@truffle/hdwallet-provider'); //HD Wallet-enabled Web3 provider.Signs transactions for addresses derived from word mnemonics
const Tx = require('ethereumjs-tx').Transaction; 
const Web3 = require('web3'); //A collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket
const networkID = 0; // 
const networkURL = 'http://localhost:7545'; // 'https://rinkeby.infura.io/v3/' + config.INFURA_API_KEY; // It's not a URL for our local blockchain. Our ethereum client to send all non-transaction requests to the blockhain
const provider = new HDWalletProvider(config.ORACLE_ACCOUNT.MNEMONIC, networkURL); //Parameters are the mnemonic of our Address and the URL of our EthereumClient
//Takes the mnemonic from the config file speicifed .(=>OracleHub.json =>From there go to ORACLE_ACCOUNT =>MNEMONIC and get the mnemonic)
const web3 = new Web3(provider); //define a Web3 etheureum node by parsing the address and the Ethereum Client URL
const accountAddress = web3.currentProvider.addresses[0];
const privateKey = Buffer.from(config.ORACLE_ACCOUNT.PRIVATE_KEY, 'hex'); //get again alsoo the private keys from OracleHub.json 
const Fin4OracleHubABI = require('./Fin4OracleHub.json').abi; //parse in
const contract = new web3.eth.Contract(Fin4OracleHubABI);
const contractAddress = config.Fin4OracleHubAddress;

app.listen(port, () => console.log(title + ' listening on port ' + port));

app.get('/', (req, res) => res.send(title));

app.post('/sensor', (request, response) => {
	console.log('Received sensor request: ', request.query);

	// e.g. http://localhost:4050/sensor?id=PlantWateringSensor&data=ThePlantSaysThanksForWatering

	let sensorID = request.query.id;
	let timestamp = Math.round(moment().valueOf());
	let data = request.query.data;

	callFin4OracleHub(sensorID, timestamp, data, response);
});

let callFin4OracleHub = async function(sensorID, timestamp, data, response) {
	console.log('Attempting to call Fin4OracleHub.receiveSensorSignal()', contractAddress, sensorID, timestamp, data);

	let callData = contract.methods.receiveSensorSignal(sensorID, timestamp, data).encodeABI();

	web3.eth.getGasPrice((e, gasPrice) => {
		console.log('Got gas price: ' + gasPrice);
		web3.eth.getTransactionCount(accountAddress).then(count => {
			console.log('Got transaction count: ' + count);

			const rawTransaction = {
				from: accountAddress,
				gas: web3.utils.toHex(100000 * 10), // is * 10 a good factor?? 
				gasPrice: web3.utils.toHex(gasPrice * 2),
				to: contractAddress,
				value: '0x00',
				chainId: web3.utils.toHex(networkID),
				data: callData,
				nonce: web3.utils.toHex(count)
			};
			console.log('Created rawTransaction');

			var tx = new Tx(rawTransaction);
			tx.sign(privateKey);
			console.log('Transaction is signed');

			web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex')).on('receipt', receipt => {
				let report = 'Called Fin4OracleHub.receiveSensorSignal()';
				console.log(report);
				response.send(report);
			});
		});
	});
};
