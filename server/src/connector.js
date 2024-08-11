// Require necessary modules
const mongoose = require('mongoose');
const { applicationLevelLogger } = require('./logger/logger');

// Extract environment variables
const { NODE_ENV } = process.env;
const environmentPrefix = `${NODE_ENV}_`;

// Construct the MongoDB URI with username and password
const port = process.env[`${environmentPrefix}PORT`];
const mongodbUrl = process.env[`${environmentPrefix}MONGODB_URL`];
const username = process.env[`${environmentPrefix}MONGODB_USERNAME`];
const password = process.env[`${environmentPrefix}MONGODB_PASSWORD`];

const mongoURI = `mongodb://${username}:${password}@${mongodbUrl}`;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const message = `Connection established with the MongoDB server online ${process.env[`${environmentPrefix}MONGODB_URL`]}`;
        applicationLevelLogger.info(message);
    })
    .catch(err => {
        applicationLevelLogger.error(err)
    });
