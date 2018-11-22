const mongoose = require('mongoose');
const Joi = require('joi');


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

//Create Genre object with database validation
const Genre = mongoose.model('Genre', genreSchema);

//Request Validation  
function validateGenres(genres){
    const schema = {
        name: Joi.string().min(4).max(50).required()
    }

    return Joi.validate(genres,schema);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenres;