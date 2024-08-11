const { applicationLevelLogger } = require("./logger/logger");

const errorHandlingMiddleware = (err, req, res, next) => {
    applicationLevelLogger.error('Unhandled Error', {
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip
    });

    // Default status code
    let statusCode = 500;

    // Set status code based on error type
    if (err.name === 'ValidationError') {
        statusCode = 400;
    } else if (err.statusCode) {
        statusCode = err.statusCode;
    }

    // Determine the status code and response based on the error
    switch (statusCode) {
        case 400:
            res.status(400).json({
                error: 'Bad Request',
                message: err.message || 'The request could not be understood or was missing required parameters.'
            });
            break;
        case 404:
            res.status(404).json({
                error: 'Not Found',
                message: 'The requested resource was not found.'
            });
            break;
        case 500:
            res.status(500).json({
                error: 'Internal Server Error',
                message: err.message || 'An unexpected error occurred on the server.'
            });
            break;
        default:
            res.status(500).json({
                error: 'Internal Server Error',
                message: err.message || 'An unexpected error occurred.'
            });
            break;
    }
};

module.exports = { errorHandlingMiddleware }