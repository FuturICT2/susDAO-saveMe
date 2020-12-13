#include "LiquidCrystal.h"
#include "WiFi.h"
#include "HTTPClient.h"


//Pins and LCD setup
LiquidCrystal lcd(22,23,5,18,19,21); //corresponding to the LCD pins( LCD4 , LCD5 , LCD11, LCD12, LCD13, LCD14) with LCD3 being the potentiometer pin (SCL , SDA , SCK,MOSI ,MISO , 21)
const int RED_PIN = 34; // number of the pin changing the Dflop state
int SENSOR_PIN = A0;   //don't really need it

//Compute variables
boolean token = false;

//Network parameters
const char* ssid = "Type Wifi SSID"; //SSID of your Wi-Fi router
const char* pass = "Type password";
char accessToken[] = "SaveMe";

//Address
char pingAddress[] = "Paste here ngrok address"; // sensor ping end point
char verificationAddress[] = "paste here/token"; // Claim verification end point with /token
char dataAddress[] =  "paste here/sensor_data"; // Claim verification end point with/sensor_data
byte MAC[6] ; 

String id;
String tik = "\""; //Create useful String to replace this " symbol
int skip= 0 ; //start with an indicator/flag of whether the website is online


void setup() {  
  //Setup Serial
  Serial.begin(115200);

  //LCD setup
  lcd.begin(16,2) ;
  lcd.print("-----SaveMe-----");
  lcd.setCursor(0,1);
  lcd.print("Token for Health");


  //Setup Wifi Connection
  Serial.println("-----SaveMe-----");
  Serial.println(" A Token for Health");
  Serial.println();
  Serial.println();
  delay(4000);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Connecting to...");
  Serial.print("Connecting to...");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    lcd.print('.');
    Serial.print(".");
    
  }
  Serial.println("");
  lcd.clear();
  Serial.println("Wi-Fi connected successfully");
  lcd.print("Wi-Fi connected to");
  lcd.setCursor(0,1);
  lcd.print(ssid);
  delay(3000);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Public IP");
  lcd.setCursor(0,1);
  lcd.print(WiFi.localIP());

  
  //Setup LED
  pinMode(RED_PIN, OUTPUT); // we set the green led pin as an output pin

  //Setup id of device(user) using the MAC Address
  WiFi.macAddress(MAC);
  id = String(MAC[5],HEX)+":"+String(MAC[4],HEX)+":"+String(MAC[3],HEX)+":"+String(MAC[2],HEX)+":"+String(MAC[1],HEX)+":"+String(MAC[0],HEX);
  
  //Check if website is online
  ping();

}




void loop() {
float average = 0 ;
//Find average after 5 testings
for( int i=0 ; i<6 ; i++){
 delay(6000);
 //Serial.println(" On ");
 digitalWrite(RED_PIN , HIGH);
 //int sensor_value = analogRead(SENSOR_PIN) ;
 //float voltage = (sensor_value/1024.0)*5.0;
 //float celsius = (voltage - 0.5)*100;
 delay(2000);
 digitalWrite(RED_PIN, LOW);//do nothing 
 double measurement = (random(100,1500))/100; // the normal range is between 4-10.5
 Serial.println("The measurement taken at "+ String()+ " is " + String(measurement)); // Add some Internet time here
 lcd.setCursor(0,0);
 lcd.print("-----SaveMe-----");
 lcd.setCursor(0,1);
 lcd.print("Last:"+ String(measurement)+"           ");
 send_measurement(String(measurement));
 average = average+measurement;
}
lcd.clear();
float total_average = average/6;

//Decide if a token is awarded
if(total_average>10.5){token =false;}
else{ if(total_average<4.0){token=false;}
else{token=true;}}

//Print results to LCD screen and Serial
Serial.println("Glucose Level Avg 1 h is "+String(total_average));
lcd.print("Avg Gl is "+String(total_average));
lcd.setCursor(0,1); //Change line

if (token)
{
    lcd.print("Token Awarded"); 
    Serial.println("Token Awarded");
    verifyClaim(String(total_average));
}
else 
{
    lcd.print("No Token Awarded"); 
    Serial.println("No Token Awarded");
    rejectClaim(String(total_average));
}

  }


// Ping Server
void ping() {

  while (skip == 0){
  
    // Declare object of class HTTPClient
    HTTPClient http;

    // Specify Ping destination
    http.begin(pingAddress);

    // Specify Content type and authenticate as Oracle
    http.addHeader("Content-Type", "application/json");

    // Send Request and receive http Code
    int httpCode = http.POST(String("{\"accessToken\": \"") + "SaveMe"+ String("\"}"));

    
    // Logging
    if (httpCode == 200) {
      Serial.println("\n Ping! ------ \n");
      //String payload = httpCode.getString());
      //Serial.println(payload);
      skip = 1;
    } else {
      Serial.print(httpCode) ;
      Serial.println("\n Server not available \n");
    }
    
    // Close connection
    http.end();
  }
}

void send_measurement(String data) {

  //Declare object of HTTPClient class
  HTTPClient http2;

  http2.begin(dataAddress); 

  // Specify content-type header and "log in" as Oracle
  http2.addHeader("Content-Type", "application/json");

  String json_post = String("{\"id\":\"")+ id + String("\",\"data\": " ) +tik + data+ String("\" }"); // to use " you create a string that has /" inside it
  //always use String() because in C++ all string are initialized as char []
  // Actually send the request
  int httpCode = http2.POST(json_post);

  // Get the response payload
  String payload = http2.getString();

  // Logging
  Serial.print("httpCode = ");
  Serial.println(httpCode);
  Serial.print("payload is = ");
  Serial.println(payload);

}

// Send Verification of Claim to Server and award token
void verifyClaim(String value) {

  
  String post_string = String("{\"id\":\"")+ id + String("\",\"average\": " ) + tik + value + tik + String(", \"token\": \"Yes\" }"); // to use " you create a string that has /" inside it );
  // Declare object of class HTTPClient
  HTTPClient http;

  // Specify request destination
  http.begin(verificationAddress);

  // Specify content-type header and "log in" as Oracle
  http.addHeader("Content-Type", "application/json");

  // Actually send the request
  int httpCode = http.POST(post_string);

  // Get the response payload
  String payload = http.getString();

  // Logging
  Serial.print("httpCode = ");
  Serial.println(httpCode);
  Serial.print("payload is = ");
  Serial.println(payload);

  // Close connection
  http.end();
}



// Send Claim rejection to the server and remove 2 tokens
void rejectClaim(String value) {

  // Declare object of class HTTPClient
  HTTPClient http;
  tik = String("\"");
  String post_string = String("{\"id\":\"")+ id + String("\",\"average\": " ) + tik + value + tik+String(", \"token\": \"No\" }"); // to use " you create a string that has \" inside it );

  // Specify request destination
  http.begin(verificationAddress);

  // Specify content-type header and "log in" as Oracle
  http.addHeader("Content-Type", "application/json");



  // Actually send the request
  int httpCode = http.POST(post_string); //JSON format

  // Get the response payload
  String payload = http.getString(); //get the payload of the response from the server

  // Logging
  Serial.print("httpCode = ");
  Serial.println(httpCode); // we POST our data and then the server rturns a response that is then printed out
  Serial.print("payload is = ");
  Serial.println(payload);

  // Close connection
  http.end();
}
