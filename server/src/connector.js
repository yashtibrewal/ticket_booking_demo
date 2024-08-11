// Require necessary modules
const mongoose = require('mongoose');
const { applicationLevelLogger } = require('./logger/logger');

// Extract environment variables
const { NODE_ENV } = process.env;
const environmentPrefix = `${NODE_ENV}_`;

// Construct the MongoDB URI with username and password
const mongodbUrl = process.env[`${environmentPrefix}MONGODB_URL`];

const mongoURI = mongodbUrl;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true }, useNewUrlParser: true, useUnifiedTopology: true };

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, clientOptions)
    .then(() => {
        const message = `Connection established with the MongoDB server online`;
        applicationLevelLogger.info(message);
    })
    .catch(err => {
        applicationLevelLogger.error(err)
    });


// Export instance

module.exports = { mongoose };