const mongoose = require('mongoose');
const Joi = require('joi');

//Create Genre object with database validation
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

//Request Validation  
function validateGenres(genres){
    const schema = {
        name: Joi.string().min(4).required()
    }

    return Joi.validate(genres,schema);
};

exports.Genre = Genre;
exports.validate = validateGenres;