const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

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

function validateCustomers(customers){
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        phone: Joi.string().min(7).max(50).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customers, schema);
};

//Get all customers
router.get('/', async (req, res) =>{
    const customers = await Customer.find().sort('name');

    res.send(customers);
});

//Get customers per ID
router.get('/:id', async (req,res) => {
    const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(404).send("Customer with the given ID was not found");
});

//Add new customer
router.post('/', async (req,res) => {
    //Object destructing to retrieve exact value from object thats need
    const {error} = validateCustomers(req.body);

    //If there is an error return a response with proper status code
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    customer = await customer.save();

    res.send(customer);

});

//update customer
router.put('/:id', async (req, res) => {
    const {error} = validateCustomers(req.body);
    if (error){
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findOneAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    },
    {new: true});

    if(!customer) return res.status(404).send("Customer with the given id was not found");

    res.send(customer);
});

//Delete Customer
router.delete('/:id', async (req, res) => { 
    const customer = await Customer.findOneAndDelete(req.params.id);

    if(!customer) return res.status(404).send("Customer with the given ID was not found");

    res.send(customer);
});

module.exports = router;