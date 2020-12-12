var button_measurements = document.getElementById("measurement-button");//get the elements form the htlm file
var button_send = document.getElementById("send-message"); //get the send button from the html file

function send_token(){
    location.href = "http://ca50bdc46536.ngrok.io/send_token_page"; //get the measurements page
}

    

function measurement_page() {
    location.href = "http://ca50bdc46536.ngrok.io/measurement_page"; //get the send token page
}


console.log('I am about to fetch the post data from the sensor');
const options = {method: 'GET', headers: { 'Content-Type':'application/json'}, body: JSON.stringify()}

async function getSensorData(){
    const response = await fetch('http://ca50bdc46536.ngrok.io/sensor_data', options);//, options); //options could include many things
    const data = await response.json() ;
    console.log(data.data); //print last measurement
    document.getElementById('measurement').textContent = data["data"];  //data.toFixed(2)//set it only to 2 decimal places 
}


async function getToken(){
    const response = await fetch('http://ca50bdc46536.ngrok.io/token', options);//, options); //options could include many things
    const data = await response.json() ;
    console.log(data.average); //print last measurement / equivalent to data["average"]
    document.getElementById('average').textContent = data["average"];//toFixed(2)//set it only to 2 decimal places if is it an integer
}


async function getTokenQuantity(){
    const response = await fetch('http://ca50bdc46536.ngrok.io/token_quantity', options);//, options); //options could include many things
    const data = await response.json() ;
    console.log(data.quantity); //print last measurement
    document.getElementById('quantity').textContent = data["quantity"];
    //document.getElementById('quantity').textContent = data.quantity; //equivalent data.toFixed(2)//set it only to 2 decimal places 
}
/*fetch('/sensor_data')
.then(function(response) {
    return response.json()
})
.then(function(data){
    console.log('the data', data)
})  */
getSensorData(); //get first data once we loaded it
getToken();
getTokenQuantity();
setInterval(getSensorData, 3000);  //receive requests every 1 second
setInterval(getToken, 3000);  //receive requests every 1 second
setInterval(getTokenQuantity, 3000);  //receive requests every 1 second