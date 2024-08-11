// index.js

// Load the configuration from .env file for the process.
// These should be the first lines in the app to avoid errors.
const dotenv = require('dotenv');
dotenv.config();

// Validate environment variables before proceeding
const { validateEnvironmentVariables } = require('./validator/environment');
validateEnvironmentVariables();

// Dependencies
const { applicationLevelLogger } = require('./logger/logger');
const express = require("express");
const bodyParser = require("body-parser");
const { connection } = require("./connector");
const cors = require('cors');
const path = require('path');
const { httpLoggingMiddleware } = require('./logger/httplogger');

const app = express();

// HTTP Logging
app.use(httpLoggingMiddleware);

// Body parser setup
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(express.json());

// Enable CORS
app.use(cors());


// Error handling middleware
app.use((err, req, res, next) => {
  applicationLevelLogger.error('Unhandled Error', {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip
  });

  res.status(500).send('Something went wrong!');
});


app.get('/test', (req, res) => {
  res.send('Hello, World!');
});

// Get the port from environment variables
const port = process.env[`${process.env.NODE_ENV}_PORT`];

// Start the server
app.listen(port, () => {
  const message = `App listening on port ${port}!`;
  applicationLevelLogger.info(message)
});