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
const cors = require('cors');
const { httpLoggingMiddleware } = require('./logger/httplogger');
const { applicationLevelLogger } = require('./logger/logger');
const { errorHandlingMiddleware } = require('./errorHandlingMiddleware');
const { healthCheckRouter } = require('./routes/healthcheck');
const { bookingRoutes } = require('./routes/booking');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();

// Middleware setup:

// Enable CORS
app.use(cors());

// HTTP Logging - should be before routes and catch-all middleware
app.use(httpLoggingMiddleware);

// Body parser express.json() which is fine for JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define your routes

// health check routes
app.use(healthCheckRouter);

// api booking routes
app.use(bookingRoutes);


// Catch-all route for 404 errors - should be after all routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested resource ${req.originalUrl} was not found.`,
  });
});

// Error handling middleware - should be the last middleware
app.use(errorHandlingMiddleware);

// Get the port from environment variables
const port = process.env[`${process.env.NODE_ENV}_PORT`] || 3000; // Default to 3000 if not set

// Start the server
app.listen(port, () => {
  const message = `App listening on port ${port}!`;
  applicationLevelLogger.info(message);
});
