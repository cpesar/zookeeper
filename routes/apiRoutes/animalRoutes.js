
//START AN INSTANCE OF ROUTER
const router = require('express').Router();

//IMPORT FUNCTIONS FROM lib/animals.js FILE
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');



//HANDLE ROUTES FOR ALL ANIMALS
    //----filterByQuery() api route----
// app.get('/animals', (req, res) => {
router.get('/animals', (req, res) => {
  let results = animals;
  if(req.query){
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});


//HANDLE REQUESTS FOR A SPECIFIC ANIMAL
        //---findById() api route
// app.get('/animals/:id', (req, res) => {
router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if(result){
    res.json(result);
  } else {
    res.send(404);
  }
});



        //-----POST Routes----
// app.post('/animals', (req, res) => {
router.post('/animals', (req, res) => {
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

//EXPORT THE ROUTER
module.exports = router;
