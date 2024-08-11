const express = require('express');
const { mongoose } = require('../connector');

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is up and running!'
    });
});


router.get('/health/database', async (req, res, next) => {
    try {
        // Check MongoDB connectivity
        await mongoose.connection.db.command({ ping: 1 });

        res.status(200).json({
            status: 'OK',
            message: 'Server and MongoDB are up and running!'
        });
    } catch (err) {
        next(err);
    }
});

module.exports = { healthCheckRouter: router }; 