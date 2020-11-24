
/* Required packages */
const express = require('express');
//const bodyParser = require('body-parser');
const { response } = require('express');

/*Application set-up */
const app = express();

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

app.get('/', (request, response) =>  {
  app.set('view engine', 'html'); 
  response.status(200).sendFile(`${__dirname}/public/index.html`);
});

app.post('/', (request,reponse) => {
  console.log(request.body);
  response.writeHead(200);
  response.end();
});

app.post('/sensor_data', (request, response) => {
  const postBody = request.body;
  console.log(postBody);
  //if (id_verified) // if id is verified then return a success maeesage
  response.write("Measurement received");
  
});

//Add the app_get for this page
//app.get 

app.post('/token', (request, response) => {
    const postBody = request.body;
    console.log(postBody);
    //if (id_verified) // if id is verified then return a success maeesage
    response.write("Token verified");
    
  });


 