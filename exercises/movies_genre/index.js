const Joi = require('joi');
const dotenv = require('dotenv');
require('express-async-errors');
Joi.objectId = require('joi-objectid')(Joi)
const logger = require('./utils/logger');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const mongoose = require('mongoose');
const express = require('express');
const winston = require('winston/lib/winston/config');
const app = express();

process.on('uncaughtException', (ex)=>{
    logger.error(ex.message, ex);
    process.exit(1);
});

process.on('unhandledRejection', (ex)=>{
    logger.error(ex.message, ex);
    process.exit(1);
});

// This would also log any errors exception outside the express scope.
// throw new Error("An uncaught exception caught!");

// const p = Promise.reject(new Error("Failed badly!"));
// p.then(()=> console.log("Failed"));

dotenv.config();

if(!process.env.JWT_KEY){
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


mongoose.connect('mongodb://127.0.0.1/movies_genre', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
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

    app.use(error);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
})
.catch(err => console.error('Could not connect to MongoDB...', err));
