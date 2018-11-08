const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customers')
const app = express();

mongoose.connect('mongodb+srv://enado:mbiP87rC2ew2ab0h@cluster0-6aldy.mongodb.net/vidly?retryWrites=true',{ useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB..'))
.catch(err => console.error('Could not connect to mongoDb', err));


app.use(express.json());
app.use('/api/genres', genres);

app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}`));
