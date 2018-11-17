const mongoose = require('mongoose');
const logger = require('../middleware/logger');

module.exports = function () {
    mongoose
        .connect('mongodb://10.170.65.113:27001/vidly',
            {
                authSource: 'admin',
                auth: {
                    user: 'odane',
                    password: 'Passw0rd'
                },
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
            })
        .then(() => logger.infoLog.log({level: 'info', message: 'Connected to MongoDB..'}));

}