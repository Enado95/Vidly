const Joi = require('joi');
const express = require('express');
const app = express();

const genres = [
    {id: 1, name: 'Documentary'},
    {id: 2, name: 'Sci-Fi'}
]

function validateGenres(genres){
    const schema = {
        name: Joi.string().min(4).required()
    }

    return Joi.validate(course,schema);
}

app.get('/', (req, res) =>{
    res.send('Welcome to the genre service');
})

//Get all genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
})

//Get genre per ID
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.body.id));
    if(!req.body.id) return res.status(404).send('The genre with the given id was not found');

    res.send(genre);
})

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}`));
