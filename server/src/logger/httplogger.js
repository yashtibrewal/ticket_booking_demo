// Middleware to log http request

const { applicationLevelLogger } = require("./logger");

const httpLoggingMiddleware = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;

        const logInfo = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            query: req.query,
            headers: req.headers,
            body: req.body,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            statusCode: res.statusCode,
            responseTime: `${duration}ms`,
            responseSize: res.get('Content-Length') || 'unknown',
        };

        // Convert logInfo to a string format compatible with printf
        const logInfoString = JSON.stringify(logInfo, null, 2);
        // Log the request and response data
        if (res.statusCode >= 400) {
            applicationLevelLogger.error(logInfoString);
        } else {
            applicationLevelLogger.info(logInfoString);
        }
    });

    next();
}

module.exports = {httpLoggingMiddleware};