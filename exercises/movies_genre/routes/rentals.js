const { Rental, validate} = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();  

router.get('/', async (req, res) => {
   const rentals = await Rental.find().sort('-dateOut');
   res.send(rentals); 
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');

    if(movie.numberInStock == 0) return res.status(400).send('Movie out of stock!');

    let rental = new Rental({
        customer : {
            id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    });

    await rental.save();
    movie.numberInStock--;
    await movie.save();
    res.send(rental);
});

module.exports = router; 