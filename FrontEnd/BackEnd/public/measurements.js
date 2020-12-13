var ngrok_address = 'http://bf9f06dbf42c.ngrok.io' ;
            var sensor_data_address = ngrok_address + "/sensor_data";
            var token_address = ngrok_address + "/token";
            console.log('I am about to fetch the post data from the sensor');
            const options = {method: 'GET', headers: { 'Content-Type':'application/json'}, body: JSON.stringify()}
            let red =false ;
            async function getSensorData(){
                const response = await fetch(sensor_data_address, options);//, options); //options could include many things
                const data = await response.json() ;
                console.log(data.data); //print last measurement
                document.getElementById('measurement').textContent = data["data"];  //data.toFixed(2)//set it only to 2 decimal places 
                let last_measurement = parseFloat(data.data);
            
                //document.getElementById('measurement').textContent = data["data"];  //data.toFixed(2)//set it only to 2 decimal places 
                if (last_measurement <=3.0 || last_measurement>=10)
                {
                    document.getElementById("measurement").style.color = "red";
                    document.getElementById("sugar_warning").style.visibility = 'visible';
                    red = true ;
                }
                else {  if(red=true){
                    document.getElementById("measurement").style.color = "black";//set back to normal black color
                    document.getElementById("sugar_warning").style.visibility = 'hidden';
                    red = false ; }
                    //otherwise do nothing
                }
            }


            


            async function getToken(){
                const response = await fetch(token_address, options);//, options); //options could include many things
                const data = await response.json() ;
                console.log(data.average); //print last measurement / equivalent to data["average"]
                document.getElementById('average').textContent = data["average"];//toFixed(2)//set it only to 2 decimal places if is it an integer
                let above = false;
                let last_average = parseFloat(data.average);

                //document.getElementById('measurement').textContent = data["data"];  //data.toFixed(2)//set it only to 2 decimal places 
                if (last_average <=3.0 || last_average>=9.5)
                {
                    document.getElementById("average").style.color = "red";
                    above = true ;
                    
                }
                else {  if(red=true){
                    document.getElementById("average").style.color = "black";//set back to normal black color
                    above = false ; }
                    //otherwise do nothing
                }
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
            setInterval(getSensorData, 3000);  //receive requests every 1 second
            setInterval(getToken, 3000);  //receive requests every 1 second