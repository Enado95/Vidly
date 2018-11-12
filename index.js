const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const Movies = require('./routes/movies');
const app = express();

mongoose
    .connect('mongodb://odane:Passw0rd@10.170.65.113:27001/vidly?authSource=admin',
        { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to mongoDb', err));


app.use(express.json());
app.use('/api/genres', genres);

app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
