console.log('I am about to fetch the token post data from the sensor');

            var ngrok_address = "http://bf9f06dbf42c.ngrok.io"
            var token_quantity_address = ngrok_address + "/token_quantity";
            var token_address = ngrok_address + "/token";
            async function getTokenQuantity(){
            const response = await fetch(token_quantity_addres, options);//, options); //options could include many things
            const data = await response.json() ;
            console.log(data.quantity); //print last measurement
            document.getElementById('quantity').textContent = data["quantity"];
            //document.getElementById('quantity').textContent = data.quantity; //equivalent data.toFixed(2)//set it only to 2 decimal places 
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

            getToken();
            getTokenQuantity();
            setInterval(getSensorData, 3000);  //receive requests every 1 second
            setInterval(getToken, 3000);  //receive requests every 1 second