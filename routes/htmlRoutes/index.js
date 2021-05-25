      //REQUIRED MODULES
const path = require('path');
const router = require('express').Router();

  
        //ADD A ROUTE
//  '/' takes us to the root route of the server- the route used to create a homepage for a server
//The only thing this route does is respond with an HTML page to display in the browser
//Use the path module to ensure that we are sending to the correct location
//res.sendFile() has all the built in features for serving to an HTML page

//GET ROUTE TO SERVE INDEX.HTML PAGE
// app.get('/', (req,res) => {
  router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  //GET ROUTE TO SERVE ANIMALS.HTML
  // app.get('/animals', (req, res) => {
  router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
  });
  
  //GET ROUTE TO SERVE ZOOKEEPERS.HTML
  // app.get('/zookeepers', (req, res) => {
  router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
  });
  
  //WILDCARD ROUTE TO HANDLE ROUTES THAT DON'T EXIST
    //THIS ROUTE ALWAYS GOES LAST!
  // app.get('*', (req, res) => {
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  
module.exports = router;