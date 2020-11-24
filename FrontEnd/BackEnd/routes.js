const http = require('http');
const fs = require('fs').promises; //promise to kep up with moden JavaScript best practices
const host ='localhost';
const port = 8000;

let indexFile;

const sensor = JSON.stringify([
    { title: "SaveMe token reached" , creator: "Christos Antoniou" , year: 2020}
]);

const sensor_receive_data = JSON.stringify([
    {title: "Send me your data SugarBabe" , year:2020}
]);


const requestListener = function (req, res) { //define it initially as html and then switch to JSON depending on URL
    res.setHeader("Content-Type","application/json");
    switch(req.url){
        case "/sensor":
            res.setHeader("Content-Type","application/json");
            res.writeHead(200); // Get is OK
            res.end(sensor) ; //return as a response the sensor function
            break
        case "/sensor_receive_data":
            res.setHeader("Content-Type","application/json");
            res.writeHead(200);
            res.end(sensor_receive_data) ; //return the function as reponse
            break
        case "/welcome":
            res.setHeader("Content-Type","application/json");
            res.writeHead(200); // Get is OK
            res.end(`{"message": "This is a JSON response"}`) ; //return as a JSON message
            
        default:re.setHeader("Content-Tpe", "application/json")
                res.writeHead(404);
                res.end(JSON.stringify({error:"Resource not found"}));

    }
    
};


const server = http.createServer(requestListener);


fs.readFile(__dirname+"/sensor.html")
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });