const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey') );    
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(users) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(2).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(users, schema);
};

exports.validate = validateUser;
exports.User = User;

