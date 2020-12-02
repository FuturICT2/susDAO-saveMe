
/* Required packages - Libraries*/
const express = require('express');
var path = require('path');
var cors = require('cors');
//const bodyParser = require('body-parser');
const { response } = require('express');
const Datastore =  require('nedb'); //for database

/*Application set-up */
const app = express();



//define variables
const database = new Datastore({filename:'data_database.db', timestampData : false}); //timestamp the data as well
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



app.get('/', (request, response) =>  { //handle get requests to the server
  app.set('view engine', 'html'); 
  response.status(200).sendFile(`/../FrontEnd/public/index.html`);
});


app.get('/measurement_page', (request,response) => {
  
  response.sendFile(path.resolve(__dirname+`/public/measurements.html`)) //try to avoid relative paths, they say it is the hackers first try

});


app.get('/send_token_page', (request,response) => {
    
    response.sendFile(path.resolve(__dirname+`/public/send.html`)) //try to avoid relative paths, they say it is the hackers first try

});



app.post('/', (request,response) => { //handle post requests to the server
  console.log(request.body);
  response.send("200");
});   

app.post('/sensor_data', (request, response) => {
  const postBody = request.body;
  postBody["date"] = (new Date()).getTime();//postBody["counter"] = counter; //add the counter field
  database.insert(postBody) ; 
  console.log("Server received sensor measurements" , postBody); //print the POST data received
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