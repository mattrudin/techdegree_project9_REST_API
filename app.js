'use strict';

/************************************************************************************
Load modules
************************************************************************************/
const express = require('express');
const app = express();

const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const users = require('./routes/users');
const courses = require('./routes/courses');

// Database setup
const mongoose = require('mongoose');
const { connection } = mongoose;


/************************************************************************************
Database configuration
************************************************************************************/
mongoose.connect('mongodb://localhost:27017/fsjstd-restapi',
  { useNewUrlParser: true });

connection.on('error', console.error.bind(console, 'Connection error:'));

connection.once('open', () => {
  console.log('DB connection successful');
});


/************************************************************************************
Configuration
set and use functions
************************************************************************************/
// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Setup body-parser
app.use(urlencoded({ extended: true }));
app.use(json());


/************************************************************************************
Implementing routes (located in ./routes)
************************************************************************************/
// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Route integration
app.use('/api/users', users);
app.use('/api/courses', courses);


/************************************************************************************
Error handling
************************************************************************************/
// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

/************************************************************************************
Server setup
************************************************************************************/
// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
