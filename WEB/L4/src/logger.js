const winston = require('winston');
const Sentry = require('winston-raven-sentry');

let logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ //Вывод в консоль 
            level: 'debug', // Уровень debug или выше
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format: 'HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        }),
        new Sentry({ //Вывод в Sentry
            level: 'warn', //Уровень warn или выше
            dsn: "https://c9702d23fe224736b9d6ad3f867d68da:0a2efc9957014c82aa85bf3b38f8e55b@sentry.io/1310383"
        })
    ],
});

logger.stream = { //Для morgan
    write: (message, encoding)=>{
        logger.info(message.replace(/[\r?\n\s]/g, ""));
    }
};

module.exports = logger;