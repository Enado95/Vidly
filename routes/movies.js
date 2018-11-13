const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genres')
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

//get all movies 
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

//get movies by id
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(mongoose.Types.ObjectId(req.params.id));

        if (!movie) return res.status(404).send("Movie with id %s was not found", req.params.id);

        res.send(movie);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }

});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(mongoose.Types.ObjectId(req.body.genreId));
        if (!genre) return res.status(400).send('Invalid genre.');

        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

        movie = await movie.save();

        res.send(movie);
    } catch (err) {
        return res.status(400).send(err.message);
    }

});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const genre = await Genre.findById(mongoose.Types.ObjectId(req.body.genreId));
        if (!genre) return res.status(400).send('Invalid genre.');

        const movie = await Movie.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
            { new: true });

        if (!movie) return res.status(404).send("Movie with the given id was not found");

        res.send(movie);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));

        if (!movie) return res.status(404).send("Movie with the given id was not found");

        res.send(movie);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});

module.exports = router;