
const express = require('express'); //linrary to allow web development
const app = express(); //create an app
const port = 4050;
const cors = require('cors'); //Allos access-control-allow-origin headders to be added to your app responses 
//Which origins are allowd to access server resources? 
//Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts
//You can use it to set allowed origins. Check https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
const moment = require('moment'); //a Javascript date library for parsing,validating,formatting and manipulating dates
const config = require('./config.json'); //require configuration file that has all the infromation for connecting to the local blockchain
const Datastore =  require('nedb'); //for database
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
const database = new Datastore({filename:'data_database.db', timestampData : false}); //do not timestamp the data 
const token_database= new Datastore({filename:"token_database.db", timestampData : false}); //only add the server id => "_id"




/*Application set-up */
const app = express();



/* Load database / Create one if file specified is not found  */
database.loadDatabase(); 
token_database.loadDatabase();
let counter = null;
database.count({}, function (err, counted) {set_the_counter(counted);}); //Get # of entries in database


 /* Start Application */

app.listen(8000, () => console.info('Application running on port 8000'));
app.use(express.static ('public')) //you should give a directory file
app.use(express.json({limit: '1mb'})) ;//allows to receive json posts and set a limit of how big JSON files you can receive as POST
 



/* Application routes */

/* Use this for catching errors

  response.wres.sendStatus(200)
  // === res.status(200).send('OK')
  
  res.sendStatus(403)
  // === res.status(403).send('Forbidden')
  
  res.sendStatus(404)
  // === res.status(404).send('Not Found')
  
  res.sendStatus(500)
  // === res.status(500).send('Internal Server Error')    */



app.get('/', (request, response) =>  { //handle get requests to the server
  app.set('view engine', 'html'); 
  response.status(200).sendFile(`/../FrontEnd/public/index.html`);
});




app.post('/', (request,response) => { //handle post requests to the server
  console.log(request.body);
  response.send("200");
});   

app.post('/sensor_data', (request, response) => {
  const postBody = request.body;
  postBody["date"] = (new Date()).getTime();//postBody["counter"] = counter; //add the counter field
  database.insert(postBody) ; 
  console.log("Received" , postBody);
  //if (id_verified) // if id is verified then return a success maeesage
  response.write("Measurement received");
  
});


app.get('/sensor_data' , (request, response)=> { //Quering data from the dataset and get the last inserted value
  database.find({}, (err, data) => {
    maxDate = get_the_max_date_number(data);
    database.find({date: maxDate} , (err,matched_objects) => {
      if (err) {
        response.statusCode = 404;
        response.json(err);
	  };
	  delete matched_objects['id'] //send JSON object without sensor id
	  delete matched_objects['_id']; //send JSON object without server id
	  response.json(matched_objects[0]);
      console.log("Latest Measurement retrieved is", matched_objects[0].data)
	  //consider sening as a response only the data as JSON and not the ID
    });
  });

});

app.post('/token', (request, response) => {
	const postBody = request.body; //POSTed data from sensor
	postBody["date"] = (new Date()).getTime();//postBody["counter"] = counter; //add the counter field
  	database.insert(postBody); 
    console.log(postBody);
	//if (id_verified) // if id is verified then return a success maeesage
	//Check List with verified IDs
    response.write("Token verified");
    
  });

  app.get('/token', (request, response) => {
	//For now just read the POST data, but this will be displayed by reading from the blockchain
	database_tokens.find({id: "58:17:14:a4:ae:30"} , (err,same_id_objects) => { //get the id for each user
			maxDate = get_the_max_date_number(data); //out of the entries with the same id
			database.find({date: maxDate} , (err,matched_objects) => {
			  if (err) {
				response.statusCode = 404;
				response.json(err);
			  };
			  delete matched_objects['id']; //send JSON object without sensor id
			  delete matched_objects['_id']; //send JSON object without server id
			  response.json(matched_objects[0]);
			  console.log("Latest token average was", matched_objects[0].average)
			  //consider sening as a response only the data as JSON and not the ID
			});
		  });
		if (err) {
		  response.statusCode = 404;
		  response.json(err);
		};
		json_text = '{ \"average\":'+String(match_objects[0].average)+"} " ; //counts tokens corresponding to user with this id
		let TokenQuantity_object = JSON.parse(text);
		response.json(TokenQuantity_object);
		console.log("Total tokens:", TokenQuantity.quanity);
    
  });


  app.get('/token_quantity', (request, response) => {
	//For now just read the POST data, but this will be displayed by reading from the blockchain
	database_tokens.find({id: "58:17:14:a4:ae:30"} , (err,matched_objects) => { //get the id for each user
		if (err) {
		  response.statusCode = 404;
		  response.json(err);
		};
		json_text = '{ \"quantity\":'+String(matched_objects.length)+"} " ; //counts tokens corresponding to user with this id
		let TokenQuantity_object = JSON.parse(text);
		response.json(TokenQuantity_object);
		console.log("Total tokens:", TokenQuantity.quanity);
    
  });








  /* All functions used */
  function get_the_max_date_number(data){
    var array = [];
    for (i=0 ; i<data.length ; i++){
      index_date = data[i].date;
      array[i] = index_date;
    }
    array.sort(function(a, b){return b - a}); //descending order
    console.log("The most recent date is", array[0]); //get max date value
    return array[0];
  }


  function set_the_counter(result){
    console.log(result);
    counter = result ; 
  }


  function get_latest_object(database){
    latest = database[0]//get last object in JSON array 
    console.log(latest.data);
    return latest ;
  }

  //might not need this function yet
  function get_last_measurement(){
    last = object["data"];//get last measurement from object 
    //console.log(last);
    return last ;
  }
 







































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




/* TODO 
1.  Add more security! We want everything to be handled by the server and bareminimum from the index.html. 
	Hence only send data vlues as JSON and not the whole object.


2. 	Clean the database every 1 hour, to reduce GET response sppeds from the server


3.	Use Bootstrap to ensure that the website looks nice across all platforms


4.  Use AJAX to automatically update when a POST is received

*/