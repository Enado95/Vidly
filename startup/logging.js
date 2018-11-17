const logger = require('../middleware/logger');
require('express-async-errors');

module.exports = function () {
    logger.exceptionsLog.exceptions.handle();

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

}