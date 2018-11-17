const winston = require('winston');
require('winston-mongodb');
const { format } = winston;
const { combine, label, timestamp, prettyPrint } = format;

const enumerateErrorFormat = format(info => {
    if (info.message instanceof Error) {
      info.message = Object.assign({
        message: info.message.message,
        stack: info.message.stack
      }, info.message);
    }
  
    if (info instanceof Error) {
      return Object.assign({
        message: info.message,
        stack: info.stack
      }, info);
    }
  
    return info;
  });

const errorLog = winston.createLogger({
    format: combine(
        label({ label: 'Route Error logging' }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        prettyPrint()
    ),
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
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

const infoLog = winston.createLogger({
    transports: [
        new winston.transports.Console({
          level: 'debug',
          format: format.combine(
            enumerateErrorFormat(),
            format.simple()
          ),
        }),
    ]
});

exports.infoLog = infoLog;
exports.errorLog = errorLog;
exports.exceptionsLog = exceptionsLog;
