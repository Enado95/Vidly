const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental',new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 2,
                maxlength: 255,
                required: true
            },
            isGold:{
                type: Boolean,
                default:false
            },
            phone: {
                type: String,
                minlength: 7,
                maxlength: 50,
                required: true            
            }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                minlength: 3,
                maxlength: 255,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 300        
            }
        })
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    }

    return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;