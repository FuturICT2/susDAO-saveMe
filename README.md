# "SaveMe", a token for Health

This is a repository dedicated to "SaveMe",a token for health! The aim of this token is to incentivize diabetes patients to take care of their own health and be more engaged with ensuring they mantain stable glucose levels throughout the day. Combining IoT and Tokens deployed on Decentralized Systems, SaveMe will become the #1 solution to diabetes. A CGM(Continuous Glucose Monitor) is attached to each patient's arm and takes blood measurements every 5 minutes. The glucose level measurements are reported every 5 minutes in the DApp and alert the patient for any abnormalities.

![SaveMe -  A token for Health](/assets/saveMe.jpg)

### Token Award conditions
For a token to be awarded, the average of the 4 quarter measurements (each quarter measurement is the mean of 3 measurements of 5-minute measurement intervals) must be within the normal range of 70mg/dl (3.9mmol/L)  and 180dl/mg(10mmol/L). The ranges are dfined based on the 3 levels of hypoglycemia and hyperglycemia.The sensor sends  data, either as measurements or token calculations.Both sources of data are saved in an IPFS file each encrypted with the public key of the patient & the shaddow account.

## Required Software
To run the application, you will need the following software:
- VS (Visual Studio)
- Nodejs
- Ganache
- Truffle
- ngrok

## Required Hardware
For full functionality, make sure you have:
- Sensor to POST data ( *ESP32* or *Arduino* )



## How to run?
1. Download directory either manually or using git clone
    ```sh
    git clone "https://github.com/FuturICT2/susDAO-saveMe"
    ```
2. Open project folder with VS
3. Download all necessary packages with npm
    ```sh
    npm start
    npm install
    ```
4. Server website and expose localhost to a public address for sensor to send data

    *a)* Start ngrok in a Terminal, where your - `localhost:8000 ` will be exposed

    ```sh
    ./ngrok http 8000
    ```
    *b)* Copy ngrok main public address

5. Change the ngrok public address for all relevant files

    *a)* Go to HTML files and change public address
        
    ```sh
    cd FontEnd/BackEnd/public 
    ```
    and go to
    ```sh
    index.js
    measurement.js
    tokens.js
    ```
    paste the new ngrok public address under:
    **ngrok_address**
    
    *b)* Go to Arduino file 
    ```sh
    main.ino
    ``` 
    and change address by pasting the ngrok public address

6. Update Sensor file main.ino with your home's Network Login details

7. Verify and Upload **main.ino** in Sensor(ESP32 or Arduino)

8. Go to directory of application file
    ```sh
    cd FrontEnd/BackEnd
    ```
    
9. Run appplication in VS using Node
    ```sh
    node app.js
    ```
