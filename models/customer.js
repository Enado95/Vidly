const mongoose = require('mongoose');
 const Joi = require('joi');


 //Customer Object with database level validation 
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 50
    }
}));

//Validate Customer request
function validateCustomers(customers){
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        phone: Joi.string().min(7).max(50).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customers, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomers;