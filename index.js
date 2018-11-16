require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const logger = require('./middleware/logger');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./startup/routes')(app);

logger.exceptionsLog.exceptions.handle();

process.on('unhandledRejection', (ex) => {
    throw ex;
});

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL error: jwtPrivateKey is not defined.');
    process.exit(1);
};


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
