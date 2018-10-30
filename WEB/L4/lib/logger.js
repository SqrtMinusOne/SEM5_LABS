const winston = require('winston');
const Sentry = require('winston-raven-sentry');

const options = {
    console:{
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
};

let logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format: 'HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        }),
        new Sentry({
            level: 'warn',
            dsn: "https://c9702d23fe224736b9d6ad3f867d68da:0a2efc9957014c82aa85bf3b38f8e55b@sentry.io/1310383"
        })
    ],
});

logger.stream = {
    write: (message, encoding)=>{
        logger.info(message.replace(/[\r?\n\s]/g, ""));
    }
};

module.exports = logger;