# "SaveMe", a token for Health

This is a repository dedicated to "SaveMe", a token for health! The aim of this token is to incentivize diabetes patients to take care of their own health and be more engaged with ensuring they mantain stable glucose levels throughout the day. Combining IoT and Tokens deployed on Decentralized Systems, SaveMe will become the #1 solution to diabetes. A CGM (Continuous Glucose Monitor) is attached to each patient's arm and takes blood measurements every 5 minutes. The glucose level measurements are reported every 5 minutes in the DApp and alert the patient for any abnormalities.

![SaveMe -  A token for Health](/assets/saveMe.jpg)

### Token Award conditions
For a token to be awarded, the average of the 4 quarter measurements (each quarter measurement is the mean of 3 measurements of 5-minute measurement intervals) must be within the normal range of 70mg/dl (3.9mmol/L)  and 180dl/mg(10mmol/L). The ranges are dfined based on the 3 levels of hypoglycemia and hyperglycemia.The sensor sends  data, either as measurements or token calculations. Both sources of data are saved in an IPFS file each encrypted with the public key of the patient & the shaddow account.

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

    *a)* Start ngrok in a Terminal, where your  `localhost:8000 ` will be exposed

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



## Sensor & Front End
The sensor source code is written in *Processing* an dis uploaded to either an *Arduino* or an *ESP32*, using the a compatible IDE. At the same time we run the application in VS using Node. Hence the sensor starts sending *POST* data to the server operating through *Node* and exposed through *ngrok*. An ilustration of both the sensor and the website Front End are shown below.

![Front End and Sensor Device for the SaveMe project](/assets/development.jpg)

To access the website it is a requirement, to have a **Metamask** account and login. The unique sensor id of each CGM is associated with a Metamask account that can access real-time measurements from the sensor.


## Development Mode & Future Work
1. Add some minor functions to support IPFS access inside the Smart Contracts
2. Add request and approve contracts to ensura that a Data Access request is accepted by the corresponding party
3. For existing contracts and any newly written, in the terminal use
    ```sh
    truffle compile
    ```
    to compile the contracts and also
    
    ```sh
    truffle migrate
    ```
    
    to migrate them

3. Implement detailed testing 

    - Check if token is succesfully dpeloyed

    - Run test cases for different token validation from diffent types of users
    
    - Run test cases for data access and ensure that no bridge of any patient's privacy occurs
    
    - Run test to check the response of the Smart Contracts and transfer of tokens funds

4. To check the success of any written tests use the truffle comman in the terminal

    ```sh
    truffle test
    ```

5. Write more code on the app.js file to support the Smart Contract interaction with the FrontEnd. Specifically:

    - IPFS interaction with the Smart Contracts and the Front End
    
    - Transfer tokens from one account to the other using the "Send Tokens" button after reading the destination address from the QR code
    
    - Implement the relevant menu options with the respective Smart Contracts (Data Access , Token Validation , Health Insurance). This means that the Front End must interaact with the Smart Contract and allow the user to view his/her Health Insurance, Validate Tokens upon request or Download and Access any measurements through IPFS.


## Coding Background
    
* Solidity ⮕ Smart Contract Coding
* Javascript ⮕  Back End & Front End  Web Developement
*  Processing ⮕  Sensor Coding 
*  HTML ⮕ Front End Web Development
* Bootstrap ⮕  Responsive Front End Web Development

## Special Thanks
I would like to thank [@benjaminaaron](https://github.com/benjaminaaron) (Benjamin Aaron Degenhart) for his much appreciated help and contribution in the coding part,
as well as [Dr.Markus M. Dapp](https://coss.ethz.ch/people/postdocs/mdapp.html) and  [Mark Ballandies](https://gess.ethz.ch/en/the-department/people/person-detail.MTgyMTMx.TGlzdC81MTIsNjE4MTIwODY=.html) for their assistance and guidance in the conceptual development of SaveMe.





