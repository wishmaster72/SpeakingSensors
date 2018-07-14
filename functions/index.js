
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



'use strict';

const http = require('https');
const functions = require('firebase-functions');
// https://io.adafruit.com/api/v2/WishMaster1/feeds/testfeed/data/last?x-aio-key=2eec9e206f014ebaaf2e38067bb03c51

const host = 'io.adafruit.com';
const feedname = 'rpmfeed';
const xAIOkey = '2eec9e206f014ebaaf2e38067bb03c51';

console.log(new getAdafruitAPI_RPM());
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {


  // Call the weather API
  getAdafruitAPI_RPM().then((output) => {
    res.json({ 'fulfillmentText': output }); // Return the results of the weather API to Dialogflow
    return;
  }).catch(() => {
    res.json({ 'fulfillmentText': `I don't know the weather but I hope it's good!` });
  });
});

function getAdafruitAPI_RPM () {
  return new Promise((resolve, reject) => {
    // Create the path for the HTTP request to get the weather
    let path = '/api/v2/WishMaster1/feeds/' + feedname + '/data/last?x-aio-key=' + xAIOkey;
    //console.log('API Request: ' + host + path);

    // Make the HTTP request to get the weather
    http.get({host: host, path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        
        let feed = JSON.parse(body); // After all the data has been received parse the JSON for desired data
    
        // Create response
        let output = 'The latest value of RPM is: nnnn ' + feed.value;

        // Resolve the promise with the output text
       // console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        console.log(`Error calling the weather API: ${error}`)
        return Promis.reject();
      });
    });
  });
}
