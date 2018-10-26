const winston = require('winston');

const options = {
    console:{
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
};

let logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'HH:mm:ss'
        }),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console()
    ],
});

logger.stream = {
    write: (message, encoding)=>{
        logger.info(message.replace(/[\r?\n\s]/g, ""));
    }
};

module.exports = logger;