const winston = require('winston');
const { format } = winston;
const { combine, label, json, timestamp, prettyPrint } = format;

const errorLog = winston.createLogger({
    format: combine(
        label({label: 'App logging'}),
        timestamp(),
        prettyPrint()
        
    ),
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
});

exports.errorLog = errorLog;

