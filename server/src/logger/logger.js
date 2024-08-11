const winston = require("winston");

const errorStackFormat = winston.format((info) => {
    if (info instanceof Error) {
        return Object.assign({}, info, {
            message: `${info.message}\n${info.stack}`,
        });
    }
    return info;
});


const getTransportsForWinstonLogger = () => { 

    const transports = []
    switch (process.env.NODE_ENV) {
        case 'LOCAL':
        case 'TESTING':
        case 'PRODUCTION':
            transports.push(
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(), // Apply color only to console output
                        winston.format.printf(({ timestamp, level, message }) => {
                            return `${timestamp} [${level}]: ${message}`;
                        })
                    )
                }),
                new winston.transports.File({
                    filename: 'app.log',
                    format: winston.format.combine(
                        winston.format.uncolorize(), // Remove color codes for file output
                        winston.format.printf(({ timestamp, level, message }) => {
                            return `${timestamp} [${level}]: ${message}`;
                        })
                    )
                }));
            break;
    }
    return transports;
}

// Create a Winston logger instance for application level logging.
const applicationLevelLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        errorStackFormat(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: getTransportsForWinstonLogger()
});



module.exports = { applicationLevelLogger }