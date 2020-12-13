# "SaveMe", a token for Health

This is a repository dedicated to "SaveMe",a token for health! The aim of this token is to incentivize diabetes patients to take care of their own health and be more engaged with ensuring they mantain stable glucose levels throughout the day. Combining IoT and Tokens deployed on Decentralized Systems, SaveMe will become the #1 solution to diabetes. A CGM(Continuous Glucose Monitor) is attached to each patient's arm and takes blood measurements every 5 minutes. The glucose level measurements are reported every 5 minutes in the DApp and alert the patient for any abnormalities. In the event of not internet connectivity of the device, then the results are saved locally and the user is notified about the glucose levels via Bluetooth connectivity. When CGM internet connectivity is restored then all data is validated in the blockchain and all the tokens are awarded. 

![SaveMe -  A token for Health](/assets/saveMe.jpg)

### Token Award conditions
For a token to be awarded, the average of the 4 quarter measurements (average of 3 5-minute measurements) must be within the normal range of 70mg/dl (3.9mmol/L)  and 180dl/mg(10mmol/L). For these ranges we take into account the 3 levels of hypoglycemia and hypoglycemia mentioned above and the amount of time of each event that needs to be minimized to avoid any after effects. Also a token is not awarded for 1hour averages above the severe limit(70-55mg/dl lower limit and 180mg/dl upper limit) . Furthermore a burning function is implemented and a penalty of -100 tokens and zeroing of weekly bonus multiplier is implemented for emergency/clinical-significant limits (<55mg/dl and >250mg/dl). As for the concept of bonus multiplier, at the end of the week if  more than 157/172 are awarded (172 possible tokens awarded throughout the week and allow for an error of 2 hours per day (for 2 meals) corresponding to 14 tokens maximum lost per week). If more than 157 tokens are awarded per week then the earning are multiplied by each weeks multiplier. The multiplier is incremented by 1 per week. The multiplier is reset to 0 if a clinical significant event occurs. All information for each user will be stored in a large IPFS.

## Required Software
To run the application, you will need the following software:
-VS (Easier to run application)
-Nodejs
-Ganache
-Truffle

For full functionality, make sure you have:
-Sensor to POST data
-ngrok to expose localhost to a public web address


## How to run?
1. Download directory either manually or using git clone
2. Open project folder with VS
3. Download all necessary packages with npm
    npm install
4. Server website and expose localhost to a public address for sensor to send data
    a)Start ngrok in a Terminal, where your localhost:8000 will be exposed
    ./ngrok http 8000
    b)Copy ngrok main public address

5. Change the ngrok public address for all relevant files
    a) Go to HTML files and change public address
        FontEnd->BackEnd->public->index.js & measurement.jss & tokens.js and paste the new ngrok_address
    b) Go to Arduino file and change address
        SaveMeSensors->main.ino and paste the new address

6. Update Sensor file main.ino with your home's Network Login details

7. Verify and Upload main.ino in Sensor(ESP32 or Arduino)

8. Go to directory of application file
    cd FrontEnd/BackEnd
9. Run appplication in VS using Node
    node app.js
