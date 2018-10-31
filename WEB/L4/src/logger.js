// @flow

const winston = require('winston');
const Sentry = require('winston-raven-sentry');

const enumerateErrorFormat = winston.format(info => {
    if (info instanceof Error) {
        return Object.assign({
            message: info.message,
            stack: info.stack
        }, info);
    }
    return info;
});

let logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ //Вывод в консоль
            level: 'debug', // Уровень debug или выше
            format: winston.format.combine(
                enumerateErrorFormat(),
                winston.format.colorize(),
                winston.format.timestamp({
                    format: 'HH:mm:ss'
                }),
               winston.format.printf(info => {
                    if (info.message instanceof Error){
                        return `${info.timestamp} ${info.level}: ${info.message.name} ${info.message.message}\n` +
                        `${info.message.stack}`
                    }
                    return `${info.timestamp} ${info.level}: ${info.message}`;
                })
            )
        }),
    ],
});

logger.add(new Sentry({ //Вывод в Sentry
    level: 'warn', //Уровень warn или выше
    dsn: "https://c9702d23fe224736b9d6ad3f867d68da:0a2efc9957014c82aa85bf3b38f8e55b@sentry.io/1310383"
}));

//Для morgan
logger.stream = {
    write: (message, encoding)=>{
        logger.info(message.replace(/[\n]/g, ""));
    }
};

module.exports = logger;