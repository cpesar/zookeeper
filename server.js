const express = require('express');
const { animals } = require('./data/animals');

const app = express();

app.get('/api/animals', (req, res) => {
  res.send('Hello!');
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});