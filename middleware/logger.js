const winston = require('winston');
const { format } = winston;
const { combine, label, timestamp, prettyPrint } = format;

const errorLog = winston.createLogger({
    format: combine(
        label({label: 'App logging'}),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        prettyPrint()
    ),
    transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ]
});

exports.errorLog = errorLog;

