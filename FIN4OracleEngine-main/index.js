const express = require('express');
const app = express();
const port = 4050;
const cors = require('cors');
const moment = require('moment');
const config = require('./config.json');
app.use(cors());
const title = 'FIN4OracleEngine';

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const networkID = 0; // 4
const networkURL = 'http://localhost:7545'; // 'https://rinkeby.infura.io/v3/' + config.INFURA_API_KEY;
const provider = new HDWalletProvider(config.ORACLE_ACCOUNT.MNEMONIC, networkURL);
const web3 = new Web3(provider);
const accountAddress = web3.currentProvider.addresses[0];
const privateKey = Buffer.from(config.ORACLE_ACCOUNT.PRIVATE_KEY, 'hex');
const Fin4OracleHubABI = require('./Fin4OracleHub.json').abi;
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
