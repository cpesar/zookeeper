//REQUIRED MODULES
const express = require('express');
const { animals } = require('./data/animals.json');

const PORT = process.env.PORT || 3001;
//INSTANTIATE THE SERVER
const app = express();

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






//METHOD TO MAKE THE SERVER LISTEN
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});