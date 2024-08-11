// index.js

// Load the configuration from .env file for the process.
// These should be the first lines in the app to avoid errors.
const dotenv = require('dotenv');
dotenv.config();

// Validate environment variables before proceeding
const { validateEnvironmentVariables } = require('./validator/environment');
validateEnvironmentVariables();

// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const { connection } = require("./connector");
const cors = require('cors');
const path = require('path');

const app = express();

// Body parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Get the port from environment variables
const port = process.env[`${process.env.NODE_ENV}_PORT`];

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});