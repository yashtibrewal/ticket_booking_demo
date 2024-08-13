
if (!process.env.API_URL) {
    throw new Error('Environment Not Set');
}

module.exports = { backendUrl: process.env.API_URL }
