const logger = require('../middleware/logger')

module.exports = function (err,req, res, next) {
    logger.errorLog.error(err.message);

    res.status(500).send('Something failed');
} 