//REQUIRED MODULES
const express = require('express');
const { animals } = require('./data/animals.json');

const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
//INSTANTIATE THE SERVER
const app = express();


//WHEN ENTERING JSON DATA USING EXPRESS:
    //MUST USE DOUBLE QUOTES " " AND NAMES MUST BE STRINGS

          //MIDDLEWARE- 
  //Both of these functions are needed every time you create a server to POST data
// parse incoming string or array data
//express.urlencoded is a built in express.js method
    //takes incoming POST data and converts it to key/value pairs
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
//express.json() method takes incoming POST data in the form of a JSON object and parses it into the req.body javascript object
app.use(express.json());

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



                //HOW THIS FOREACH() LOOP WORKS
//1.  We're revising the filteredResults array for each trait that we loop through with forEach()
//2.  Each iteration revises the filteredResults so that it only contains animals that possess the indicated trait
//3.  At the end of the forEach() loop, we'll have a filteredResults array that only contains animals that have all of the traits we are targeting

//* Use:
  //http://localhost:3001/api/animals? <insert route here>
  //http://localhost:3001/api/animals? <personalityTraits=hungry>
function filterByQuery(query, animalsArray){
  let personalityTraitsArray = [];
  //save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if(query.personalityTraits){
    //save personality traits as a dedicated array
    //if personality traits is a string, place it into a new array and save
    if(typeof query.personalityTraits === 'string'){
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    //Loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
      //check the trait against each animal in the filteredResults array
      //update the animalsArray for each trait in the forEach() loop
    filteredResults = filteredResults.filter(
      animal => animal.personalityTraits.indexOf(trait) !== -1
    );
    });
  }
  if(query.diet){
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if(query.species){
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if(query.name){
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
}

app.get('/api/animals', (req, res) => {
  let results = animals;
  if(req.query){
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});







//HANDLE REQUESTS FOR A SPECIFIC ANIMAL
function findById(id, animalsArray){
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

//HANDLE REQUESTS FOR A SPECIFIC ANIMAL
app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if(result){
    res.json(result);
  } else {
    res.send(404);
  }
});

//FUNCTION TO HANDLE ANIMAL CREATION
function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  // our function's main code will go here!
  fs.writeFileSync(
    path.join(__dirname, './data/animals.json'),
        //save the javascript data as JSON, so we need to convert it
          //the null argument means we don't want to edit any existing data
          //the 2 indicates that we want to make whitespace to make it more readable
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  // return finished code to post route for response
  return animal;
}



//LISTENS FOR POST REQUESTS
  //Represent the action of a client requesting the server to accept data
// app.post('/api/animals', (req, res) => {
//   //req body is where our incoming content will be
//   console.log(req.body);
//   res.json(req.body);
// });

app.post('/api/animals', (req, res) => {
  //set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  //if data in req.body is incorrect, send 400 error back
  if(!validateAnimal(req.body)){
    res.status(400).send('The animal is not properly formatted.');
  } else {
     // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});




//VALIDATE THE DATA
function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== 'string') {
    return false;
  }
  if (!animal.species || typeof animal.species !== 'string') {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== 'string') {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}




                  //ADD A ROUTE
      //  '/' takes us to the root route of the server- the route used to create a homepage for a server
      //The only thing this route does is respond with an HTML page to display in the browser
      //Use the path module to ensure that we are sending to the correct location
      //res.sendFile() has all the built in features for serving to an HTML page
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});




//METHOD TO MAKE THE SERVER LISTEN
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});