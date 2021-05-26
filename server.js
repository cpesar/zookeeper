//REQUIRED MODULES
const express = require('express');
const { animals } = require('./data/animals.json');

const fs = require('fs');
const path = require('path');
const router = require('./routes/apiRoutes/animalRoutes');

const PORT = process.env.PORT || 3001;
//INSTANTIATE THE SERVER
const app = express();


const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


//WHEN ENTERING JSON DATA USING EXPRESS:
    //MUST USE DOUBLE QUOTES " " AND NAMES MUST BE STRINGS

          //MIDDLEWARE- 
  //Both of these functions are needed every time you create a server to POST data
// parse incoming string or array data
//express.urlencoded is a built in express.js method
    //takes incoming POST data and converts it to key/value pairs
app.use(express.urlencoded({ extended: true }));

//-------
//SERVE STATIC FILES
  //Added middleware to the server
  //express.static() instructs the server to make the files public 
  //Allows all of the front-end CSS and javascript to be accessed
  //USE THIS MIDDLEWARE ANYTIME WE CREATE A SERVER THAT HAS BOTH JSON DATA AND FRONT-END CODE
  app.use(express.static('public'));
//---------
// parse incoming JSON data
//express.json() method takes incoming POST data in the form of a JSON object and parses it into the req.body javascript object
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//SERVE STATIC FILES
  //Added middleware to the server
  //express.static() instructs the server to make the files public 
  //Allows all of the front-end CSS and javascript to be accessed
  //USE THIS MIDDLEWARE ANYTIME WE CREATE A SERVER THAT HAS BOTH JSON DATA AND FRONT-END CODE
app.use(express.static('public'));

//ROUTE THAT THE FRONT END CAN REQUEST DATA FROM
  //get() method requires 2 arguments:
    //1. A string that describes the route the client will fetch from
    //2. Callback function that will execute every time the route is accessed with a GET request

// app.get('/api/animals', (req, res) => {
//   //use the send () method if we want to send short messages
//   //use json to send lots of JSON, like API
//   //pass in the animals data from the data folder and it will return all of the json data
//   res.json(animals);
// });


    //This function will take in a req.query as an argument and filter through the animals accordingly -> returning the new filtered array
    //THIS WILL ONLY QUERY STRINGS
// if(query.diet){
//     filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
//   }
//   if(query.species){
//     filteredResults = filteredResults.filter(animal => animal.species === query.species);
//   }
//   if(query.name){
//     filteredResults = filteredResults.filter(animal => animal.name === query.name);
//   }
//   return filteredResults;


//LISTENS FOR POST REQUESTS
  //Represent the action of a client requesting the server to accept data
// app.post('/api/animals', (req, res) => {
//   //req body is where our incoming content will be
//   console.log(req.body);
//   res.json(req.body);
// });


//METHOD TO MAKE THE SERVER LISTEN
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});