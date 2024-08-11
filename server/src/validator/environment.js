

const validateEnvironmentVariables =  () => {

    // Accessing environment variables
    const environment = process.env.NODE_ENV || 'LOCAL';

    console.log(`Environment Used : ${environment}`);

    const port = process.env[`${environment}_PORT`];
    const mongodbUrl = process.env[`${environment}_MONGODB_URL`];
    const username = process.env[`${environment}_MONGODB_USERNAME`];
    const password = process.env[`${environment}_MONGODB_PASSWORD`];

    // Validating required environment variables
    const requiredVariables = [port, mongodbUrl, username, password];
    const missingVariables = requiredVariables.filter(variable => !variable);

    if (missingVariables.length > 0) {
        console.error(`Some environment variables are missing for ${environment} environment. Please check your .env file.`);
        process.exit(1);
    }
}

module.exports = { validateEnvironmentVariables };