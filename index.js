require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const logger = require('./middleware/logger');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const auth = require('./routes/auth');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const app = express();


logger.exceptionsLog.exceptions.handle();

process.on('unhandledRejection', (ex) => {
    throw ex;
});

// const p = Promise.reject(new Error('Something failed miserably!'));
// p.then(() => console.log('Done'));
throw new Error('something happened');

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL error: jwtPrivateKey is not defined.');
    process.exit(1);
};

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
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to mongoDb', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
