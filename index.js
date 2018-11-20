const logger = require('./middleware/logger');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();
require('./startup/db')();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.infoLog.log({level: 'info', message: `Listening on port ${port}`}));