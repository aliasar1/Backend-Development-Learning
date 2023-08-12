const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.MongoDB({ db: 'mongodb://127.0.0.1/movies_genre'})
  ]
});

module.exports = logger;

