const validateObjectId = require("../middleware/validateObjectId");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Get all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

//Get genre per ID
router.get('/:id', validateObjectId,async (req, res) => {
    const genre = await Genre.findById(mongoose.Types.ObjectId(req.params.id));

    if (!genre) return res.status(404).send('The genre with the given id was not found');

    res.send(genre);

});

//Created new genre
router.post('/', auth, async (req, res) => {
    //Object destructing to retrieve exact value from object thats need
    const { error } = validate(req.body);

    //If there is an error return a response with proper status code
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({ name: req.body.name });
    await genre.save();

    res.send(genre);

});

//update genres
router.put('/:id', validateObjectId,async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const genre = await Genre.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found');

    //return the updated course
    res.send(genre);

});

router.delete('/:id', [validateObjectId,auth, admin], async (req, res) => {

    const genre = await Genre.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));

    if (!genre) return res.status(404).send('The genre with the given id was not found');

    res.send(genre);


});

module.exports = router;