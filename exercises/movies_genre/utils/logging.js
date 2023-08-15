const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logfile.log' }),
    // new winston.transports.MongoDB({
    //   db: 'mongodb://127.0.0.1/movies_genre',
    //   level: 'info',
    // }),
  ],
  format: winston.format.combine(
    winston.format.simple(),
  ),
});

module.exports = logger;