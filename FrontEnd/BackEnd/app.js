const express = require('express'); //linrary to allow web development
const app = express(); //create an app
const port = 8000;
const path = require('path');
const ejs = require('ejs') ; //embedded javascript templates
const ipfsClient = require('ipfs-http-client');
const ipfs = new ipfsClient({host: 'localhost', port: '5001' ,protocol: 'http'});//Connect to the IPFS daemon node
const cors = require('cors'); //Allos access-control-allow-origin headders to be added to your app responses 
const fs = require('fs') ; //interacting with files
//Which origins are allowd to access server resources? 
//Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts
//You can use it to set allowed origins. Check https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
const moment = require('moment'); //a Javascript date library for parsing,validating,formatting and manipulating dates
const config = require('./config.json'); //require configuration file that has all the infromation for connecting to the local blockchain
const Datastore =  require('nedb'); //for database
app.use(cors()); //this will contrin the list of all the allowed origins
const title = 'OracleEngine';  
const Web3 = require('web3'); //A collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket
const HDWalletProvider = require('@truffle/hdwallet-provider'); //HD Wallet-enabled Web3 provider.Signs transactions for addresses derived from word mnemonics
const Tx = require('ethereumjs-tx').Transaction; 
const networkID = 0; // 
const networkURL = 'http://localhost:7545'; // 'https://rinkeby.infura.io/v3/' + config.INFURA_API_KEY; // It's not a URL for our local blockchain. Our ethereum client to send all non-transaction requests to the blockhain
const provider = new HDWalletProvider(config.ORACLE_ACCOUNT.MNEMONIC, networkURL); //Parameters are the mnemonic of our Address and the URL of our EthereumClient
//Takes the mnemonic from the config file speicifed .(=>OracleHub.json =>From there go to ORACLE_ACCOUNT =>MNEMONIC and get the mnemonic)
const web3 = new Web3(provider); //define a Web3 etheureum node by parsing the address and the Ethereum Client URL
const accountAddress = web3.currentProvider.addresses[0];
const privateKey = Buffer.from(config.ORACLE_ACCOUNT.PRIVATE_KEY, 'hex'); //get again alsoo the private keys from OracleHub.json 
//const Fin4OracleHubABI = require('./Fin4OracleHub.json').abi; //parse in the JSON format of the compiled SC
//const contract = new web3.eth.Contract(Fin4OracleHubABI); //retrieve the contract from the ABI
//const contractAddress = config.Fin4OracleHubAddress;  //get the address of the contract
const database = new Datastore({filename:'data_database.db', timestampData : false}); //do not timestamp the data 
const token_database= new Datastore({filename:"token_database.db", timestampData : false}); //only add the server id => "_id"



/* Load database / Create one if file specified is not found  */
database.loadDatabase(); 
token_database.loadDatabase();
let counter = null;
database.count({}, function (err, counted) {set_the_counter(counted);}); //Get # of entries in database


 /* Start Application */
 app.listen(8000, () => console.info('Application running on port 8000'));
 app.use(express.static ('public')) //you should give a directory file
 app.use(express.json({limit: '1mb'})) ;//allows to receive json posts and set a limit of how big JSON files you can receive as POST
 app.use(cors());
  


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



//Upon initialization



/*
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
*/ 
 


/* TODO 
1.  Add more security! We want everything to be handled by the server and bareminimum from the index.html. 
	Hence only send data vlues as JSON and not the whole object.


2. 	Clean the database every 1 hour, to reduce GET response speeds from the server


3.	Use Bootstrap to ensure that the website looks nice across all platforms


4.  Use AJAX to automatically update when a POST is received   

5.  Set  up Shadow account
    a) Generate a Public-Private key pair
    b) Access list IDs associated with ETH addresses

6.  Create IPNS with mutable link for each user
    a)For measurements
    b)For total average glucose level calculations for token reward

7.  Upon new POST request get ETH address, based on received Sensor ID

8.  Download IPFS of corresponding Patient using assigned IPNS link
    Decrypt file using Shadow's private key
    Add new measurement to downloaded text file 
    -Encrypt IPFS file with patients public key and with Shadow's account public key
   -Reupload txt IPFS file 
   -IPNS link for this patient will point to the new hash of uploaded file
*/







/* Application routes */

app.post('/', (request,response) => { //handle post requests to the server
  console.log(request.body);
  response.send("200");
});

app.get('/', (request, response) =>  { //handle get requests to the server
  app.set('view engine', 'html'); 
  response.status(200).sendFile(`/../FrontEnd/public/index.html`);
});




app.get('/measurement_page', (request,response) => {
  
  response.sendFile(path.resolve(`./public/measurements.html`)) //try to avoid relative paths, they say it is the hackers first try

});


app.get('/menu_page', (request,response) => {
  
  response.sendFile(path.resolve(`./public/menu.html`)) //try to avoid relative paths, they say it is the hackers first try

});



app.get('/tokens_page', (request,response) => {
  
  response.sendFile(path.resolve(`./public/tokens.html`)) //try to avoid relative paths, they say it is the hackers first try

});


app.get('/send_token_page', (request,response) => {
    
    response.sendFile(path.resolve(`./public/send.html`)) //try to avoid relative paths, they say it is the hackers first try

});



app.post('/sensor_data', (request, response) => {
  const postBody = request.body;
  var timestamp = (new Date()).getTime();
  var id = postBody.id ;
  postBody["date"] = timestamp;//postBody["counter"] = counter; //add the counter field
  database.insert(postBody) ; 
  //add new measurement in text file
  let  new_measurement  = postBody.data + String(timestamp) ;
  console.log("Server received sensor measurements" , postBody); //print the POST data received
  //if (id_verified) // if id is verified then return a success maeesage
  response.write("Measurement received");

  //Save Measurements in IPFS
  /*
  fs.writeFile('new_measurement.txt', new_measurement, (err) => { 
    // In case of a error throw err. 
    if (err) throw err; 
  }) 

  //Save in IPFS
  const ipfsHash = await ipfs.add('new_meassurement.txt')
  console.log("The post body is stored under this hash" , ipfsHash); //display the Hash of the data uploaded to IPFS

  //retrieve previous measurements using the corresponding IPNS address
  console.log(await ipfs.cat(ipfsHash));
  */
  
});


app.get('/sensor_data' , (request, response)=> { //Quering data from the dataset and get the last inserted value
  database.find({}, (err, data) => {
    maxDate = get_the_max_date_number(data);
    database.find({date: maxDate} , (err,matched_objects) => {
      if (err) {
        response.statusCode = 404;
        response.json(err);
	  };
	  delete matched_objects[0]['id'] //send JSON object without sensor id
	  delete matched_objects[0]['_id']; //send JSON object without server id
	  response.json(matched_objects[0]);
      console.log("Latest Measurement retrieved is", matched_objects[0])
	  //consider sening as a response only the data as JSON and not the ID
    });
  });

});

app.post('/token', (request, response) => {
	const postBody = request.body; //POSTed data from sensor
	let sensorID = postBody.id;
	let timestamp = Math.round(moment().valueOf());
	let data = postBody.average;
	callFin4OracleHub(sensorID, timestamp, data, response);
	postBody["date"] = (new Date()).getTime();//postBody["counter"] = counter; //add the counter field
  	token_database.insert(postBody); 
    console.log("Server received token average" , postBody);
	//if (id_verified) // if id is verified then return a success maeesage
	//Check List with verified IDs
    response.write("Token verified");
    
  });




  app.get('/token', (request, response) => {
	//For now just read the POST data, but this will be displayed by reading from the blockchain
	token_database.find({id: "58:17:14:a4:ae:30"} , (err,same_id_objects) => { //get the id for each user
			maxDate = get_the_max_date_number(same_id_objects); //out of the entries with the same id
			token_database.find({date: maxDate} , (err,matched_objects) => {
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
    
  });


  app.get('/token_quantity', (request, response) => {
	//For now just read the POST data, but this will be displayed by reading from the blockchain
	token_database.find({id: "58:17:14:a4:ae:30"} , (err,matched_objects) => { //get the id for each user
		if (err) {
		  response.statusCode = 404;
		  response.json(err);
		};
		//json_text = '{ \"quantity\":'+String(matched_objects.length)+"} " ; //counts tokens corresponding to user with this id
    //TokenQuantity_object = JSON.parse(json_text);
    let token_quantity = matched_objects.length ;
		response.json({quantity: token_quantity , pao : "ole ole"});
		console.log("Total tokens:", token_quantity);
    });
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


    const addFile = async (filename ,filepath) => {
      const file = fs.reeadFileSync(file);
      const fileAdded = ipfs.add({path:filename , content:file})
    }


    //const retrieve 
    //You can use the public gateway to retrieve documents when they don't have their own node
    //Show any documents to your friend using the public gateway.
    //The public gateway is ipfs.io/ipfs/YourHash
    //You could use even siderus.io/ipfs/YourHash
    //When you want to make access to your public documents faster, you can use PInata to pin your content among very nodes
    //and make it faster available (you have to pay though)



    //Public mutable links using IPNS for your IPFS text files
    //ipfs name publish --key="text_file_that_hols theRSAPrivate_and_PublicKeys"
    //And then you can access any updated content pointing to this IPNS link
    //using the ipfs.io/ipns/YourPublishedHash 
    //const fileHash = await (addFile) //then we get back the new IPFS hash. Then this new IPFS hash will point to the IPNS address

















