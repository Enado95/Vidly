const {Movie, validate} = require('../models/movies');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

//get all movies 
router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

//get movies by id
router.get('/:id', async (req, res) =>{
    try{
        const movie = await Movie.findById(mongoose.Types.ObjectId(req.params.id));

        if(!movie) return res.status(404).send("Movie with id %s was not found", req.params.id);

        res.send(movie);
    }
    catch(err){
        return res.status(400).send(err.message);
    }

});

router.post('/', async (req, res) =>{
    const{error} = validate.req.body;

    if(error){
        return res.status(400).send(error.detail[0].message);
    }

    let movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);
    
});

router.put('/:id', async (req,res) =>{
    try{
        const {error} = validate.req.body;
        if(error) {
            return res.status(400).send(error.details[0].message);
        }
        const movie = await Movie.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{
            title: req.body.title,
            genre: req.body.genre,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        { new: true });

        if(!movie) return res.status(404).send("Movie with the id %s was not found", req.params.id);

        res.send(movie);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.delete('/', async (req, res) =>{
    try{
        const movie = await Movie.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));

        if(!movie) return res.status(404).send("Movie with the id %s was not found", req.params.id);

        res.send(movie);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});
