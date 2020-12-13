
        var ngrok_address = "http://bf9f06dbf42c.ngrok.io"; //change this address Ctrl+V
        var button_measurements = document.getElementById("measurement-button");//get the elements form the htlm file
        var button_send = document.getElementById("send-message"); //get the send button from the html file
        var send_token_page_address = ngrok_address+ "/send_token_page";
        var menu_page_address = ngrok_address+"/menu_page";
        var measurement_page_address =  ngrok_address + "/measurement_page";
        var token_page_address = ngrok_address+ "/tokens_page";
        var token_quantity_address = ngrok_address + "/token_quantity";
        var sensor_data_address = ngrok_address + "/sensor_data";
        
        function send_token(){
            location.href = send_token_page_address ; //get the measurements page
        }


        function menu_page() {
            
            location.href = menu_page_address;
        }


        function measurement_page() {
            location.href = measurement_page_address; //get the send token page
        }

        function tokens_page(){
            location.href = token_page_address; //get tokens page
        }


        console.log('I am about to fetch the post data from the sensor');
        const options = {method: 'GET', headers: { 'Content-Type':'application/json'}, body: JSON.stringify()}
        let red = false;


        async function getSensorData(){
            const response = await fetch(sensor_data_address, options);//, options); //options could include many things
            const data = await response.json() ;
            let last_measurement = parseFloat(data.data);
            console.log(data.data); //print last measurement
            //document.getElementById('measurement').textContent = data["data"];  //data.toFixed(2)//set it only to 2 decimal places 
            if (last_measurement <=3.0 || last_measurement>=10)
            {
                document.getElementById("measurement-button").style.backgroundImage = "url('assets/warning2.png')";
                //document.getElementById("alert").play(); //enable only when you have fixed the AJAX automatic requests
                //alert("Sugar levels out of range!");
                red = true ;   
            }
            else {  if(red=true){
                document.getElementById("measurement-button").style.backgroundImage = "url('assets/tick2.png')";
                red = false ;
                alert_once  = false ; }
                //otherwise do nothing
            }
        }


        async function getTokenQuantity(){
            const response = await fetch( token_quantity_address ,options);//, options); //options could include many things
            const data = await response.json() ;
            console.log(data.quantity); //print last measurement
            document.getElementById('quantity').textContent = data["quantity"];
            //document.getElementById('quantity').textContent = data.quantity; //equivalent data.toFixed(2)//set it only to 2 decimal places 
        }

        getSensorData(); //get first data once we loaded it
        getTokenQuantity();
        setInterval(getSensorData, 3000);  //receive requests every 1 second
        setInterval(getTokenQuantity, 3000);  //receive requests every 1 second

