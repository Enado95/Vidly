const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

//Get list of all movies
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');

    res.send(rentals);
});

router.post('/', async (req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(mongoose.Types.ObjectId(req.body.customerId));
    if(!customer) return res.status(404).send('Customer with the given id was not paid')

    const movie = await Movie.findById(mongoose.Types.ObjectId(req.body.movieId));
    if(!movie) return res.status(404).send('Movie with the given id was not found');

    if(movie.numberInStock === 0) return res.status(400).send('Movie is currently out of stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        new Fawn.Task()
        .save('rentals', rental) //password rental object to rentals collection in mongodb 
        .update('movies', {_id: movie._id }, {
            $inc: { numberInStock: -1 }
        })
        .run();
    } catch (err) {
        res.status(500).send('Something went wrong ',err.message);
    }
    

    res.send(rental);

});

module.exports = router;