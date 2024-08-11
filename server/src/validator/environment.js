const { applicationLevelLogger } = require("../logger/logger");


const validateEnvironmentVariables = () => {

    // Accessing environment variables
    const environment = process.env.NODE_ENV || 'LOCAL';
    applicationLevelLogger.info(`Environment Used : ${environment}`);

    const port = process.env[`${environment}_PORT`];
    const mongodbUrl = process.env[`${environment}_MONGODB_URL`];

    // Validating required environment variables
    const requiredVariables = [port, mongodbUrl];
    const missingVariables = requiredVariables.filter(variable => !variable);

    if (missingVariables.length > 0) {
        applicationLevelLogger.error(new Error('Invalid .env file'));
    }
}

module.exports = { validateEnvironmentVariables };