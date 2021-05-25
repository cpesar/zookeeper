//DEPENDENCIES NEEDED FOR THIS FILE
const fs = require("fs");
const path = require("path");
          
          
              //------filterByQuery() function--------
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
      console.log(personalityTraitsArray);
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



                    //-----findById() function------
//HANDLE REQUESTS FOR A SPECIFIC ANIMAL
function findById(id, animalsArray){
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}




                    //-----createNewAnimal() function-----
//FUNCTION TO HANDLE ANIMAL CREATION
function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  // our function's main code will go here!
  fs.writeFileSync(
    path.join(__dirname, '../data/animals.json'),
        //save the javascript data as JSON, so we need to convert it
          //the null argument means we don't want to edit any existing data
          //the 2 indicates that we want to make whitespace to make it more readable
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  // return finished code to post route for response
  return animal;
}



                //--validateAnimal() function------
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

module.exports = {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal
};