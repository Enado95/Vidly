const logger = require('./logger')

module.exports = function (err,req, res, next) {
    logger.errorLog.error(err.message, err);

    res.status(500).send('Something failed');
} 