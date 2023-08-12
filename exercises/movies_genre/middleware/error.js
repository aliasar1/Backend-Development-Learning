const winston = require('winston');
const logger = require('../utils/logger');

module.exports = function(err, req, res, next){
    // error
    // warn
    // info
    // verbose
    // debug
    // silly
    // winston.log('error', err.message);
    logger.error(err.message, err);

    res.status(500).send('Something failed.');
}

// I have used express-async-errors but if it doesn't work we can use this apporach.