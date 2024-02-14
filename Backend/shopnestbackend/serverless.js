const express = require('express');
const app = express();

// Define your Express routes and middleware here
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Define the serverless function handler
module.exports = async (req, res) => {
  // Pass the incoming request to your Express app for processing
  await app(req, res);
};