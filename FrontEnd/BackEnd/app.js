
/* Required packages - Libraries*/
const express = require('express');
//const bodyParser = require('body-parser');
const { response } = require('express');
const Datastore =  require('nedb'); //for database

/*Application set-up */
const app = express();



//define variables
const database = new Datastore({filename:'data_database.db', timestampData : false}); //timestamp the data as well
database.loadDatabase(); //it load the database.Or it makes one if the databas does not exceed
database.insert({_id : "__counter__" , counter: -1});



 /* Start Application */

app.listen(8000, () => console.info('Application running on port 8000'));
app.use(express.static ('public')) //you should give a directory file
app.use(express.json({limit: '1mb'})) ;//allows to receive json posts and set a limit of how big JSON files you can receive as POST
 



 //get latest counter number
let counter = null;
database.count({}, function (err, counted) {set_the_counter(counted);});

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

app.get('/', (request, response) =>  {
  app.set('view engine', 'html'); 
  response.status(200).sendFile(`${__dirname}/public/index.html`);
});




app.post('/', (request,response) => {
  console.log(request.body);
  response.send("200");
  //response.end();
});   

app.post('/sensor_data', (request, response) => {
  const postBody = request.body;
  postBody["date"] = (new Date()).getTime();//postBody["counter"] = counter; //add the counter field
  database.insert(postBody) ; 
  console.log("Received" , postBody);
  //if (id_verified) // if id is verified then return a success maeesage
  response.write("Measurement received");
  
});





//Add the app_get for the nsor_data route , to get and display all the data
app.get('/sensor_data' , (request, response)=> { 
  //assume the request return the data we stored using the php script
  //Quering data from the dataset and get the last inserted value
  database.find({}, (err, data) => {
    maxDate = get_the_max_date_number(data);
    database.find({date: maxDate} , (err,matched_objects) => {
      if (err) {
        response.statusCode = 404;
        response.json(err);
      };
      response.json(matched_objects[0]);
      console.log("Latest Measurement retrieved is", matched_objects[0].data)
    //console.log ("The last measurement was" , got_latest_post_data);
    });
  });

});

app.post('/token', (request, response) => {
    const postBody = request.body;
    console.log(postBody);
    //if (id_verified) // if id is verified then return a success maeesage
    response.write("Token verified");
    
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
 