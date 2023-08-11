const Joi = require('joi');
const dotenv = require('dotenv');
Joi.objectId = require('joi-objectid')(Joi)
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config();

if(!process.env.JWT_KEY){
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://127.0.0.1/movies_genre', {
    useNewUrlParser: true, 
    family: 4
})
.then(() => {
    console.log('Connected to MongoDB...');

    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
})
.catch(err => console.error('Could not connect to MongoDB...', err));
