require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
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


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL error: jwtPrivateKey is not defined.');
    process.exit(1);
};

mongoose
    .connect('mongodb+srv://cluster0-6aldy.mongodb.net/vidly?retryWrites=true',
        { 
            authSource: 'admin',
            auth: {
                user: 'superuser',
                password: 'greatpassword'
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
