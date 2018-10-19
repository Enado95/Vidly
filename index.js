const Joi = require('joi');
const express = require('express');
const app = express();


app.use(expess.json());

const genres = [
    {id: 1, name: 'Documentary'},
    {id: 2, name: 'Sci-Fi'}
]

function validateGenres(genres){
    const schema = {
        name: Joi.string().min(4).required()
    }

    return Joi.validate(genres,schema);
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

app.post('/api/genres', (req,res) => {
    //Object destructing to retrieve exact value from object thats need
    const {error} = validateGenres(req.body);

    //If there is an error return a response with proper status code
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    
    genres.push(genre);

})

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}`));
