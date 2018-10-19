const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

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
});

//Get all genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//Get genre per ID
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!req.body.id) return res.status(404).send('The genre with the given id was not found');

    res.send(genre);
});

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
    res.send(genre);

});

app.put('/api/genres/:id', (req, res) => {
    //Look up the course
    //If not existing, retun 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    //Validate
    //If invalid, return 400 - Bad request
    const {error} = validateGenres(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }
    
    //Update course
    genre.name = req.body.name;
    //return the updated course
    res.send(genre);

});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    //Return not found if the id is invalid
    if(!genre) return res.status(404).send('The genre with the given id was not found');

    //Delete
    //Find index of course in array 
    const index = genres.indexOf(genre);
    genres.splice(index,1);

    //return object that was deleted
    res.send(genre);

});

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}`));
