const express = require('express');

// Express returns an app which is mostly middleware
const app = express();

// This functions uses middlware on our request
app.use((req, res, next) => {
  console.log('first middleware');
  // If you execute then req will continue it's journey
  next();
});

app.use((req, res, next) => {
  // Send back response
  res.send('hello from express');
});

// export the express app to be used by the server
module.exports = app;
