const logger = require('./middleware/logger');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.infoLog.log({level: 'info', message: `Listening on port ${port}`}));

module.exports = server;