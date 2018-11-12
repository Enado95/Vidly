const mongoose = require('mongoose');
const Joi = require('joi');
const Genres = require('./genres');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true
    },
    genre: [Genres],
    numberInStock: number,
    dailyRentalRate: number
}));

function validateMovies(movies){
    const schema = {
        title: Joi.number().min(3).required(),
        genre: Joi.required(),
        numberInStock: Joi.required(),
        dailyRentalRate: Joi.required()
    }

    return Joi.validate(customers, schema);
};

exports.Movie = Movie;
exports.validate = validateMovies;