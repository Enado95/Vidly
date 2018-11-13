const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental',new mongoose.Schema({
    customer: new mongoose.Schema({
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
    }),
}));