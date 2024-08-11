// swagger.js
const path = require('path');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Movie Booking APIs',
        version: '1.0.0',
        description: 'Movie Booking System API Documentation',
    },
    servers: [
        {
            url: ``,
            description: `${process.env.NODE_ENV} server`,
        },
    ],
};

const options = {
    swaggerDefinition,
    
    apis: [path.join(__dirname, '../docs/**/*.yaml')], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
