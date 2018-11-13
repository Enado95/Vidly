const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    genre: genreSchema,
    numberInStock: {
       type: Number,
       min: 0,
       max: 300
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 300        
    }
}));

function validateMovies(movies){
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(300).required(),
        dailyRentalRate: Joi.number().min(0).max(300).required()
    }

    return Joi.validate(movies, schema);
};

exports.Movie = Movie;
exports.validate = validateMovies;