const winston = require('winston');
require('winston-mongodb');
const { format } = winston;
const { combine, label, timestamp, prettyPrint } = format;

const errorLog = winston.createLogger({
    format: combine(
        label({ label: 'App logging' }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        prettyPrint()
    ),
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.MongoDB({
            db: 'mongodb://odane:Passw0rd@10.170.65.113:27001/vidly?authSource=admin',
            level: 'error'
        })
    ]
});

const exceptionsLog = winston.createLogger({
    format: combine(
        label({ label: 'App logging' }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: 'combined.log', level: 'error' })
    ],
    exceptionHandlers:[
        new winston.transports.File({ filename: 'exceptions.log', level: 'error', handleExceptions: true }),
        new winston.transports.Console({ level: 'error' })
    ],
    exitOnError: false
});

exports.errorLog = errorLog;
exports.exceptionsLog = exceptionsLog;
