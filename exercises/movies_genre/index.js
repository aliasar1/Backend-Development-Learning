const winston = require('winston');
const logger = require('./utils/logging');
const express = require('express');
const app = express();

require('./utils/routes')(app);
require('./utils/db')();
require('./utils/config')();
require('./utils/validation')();

winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

process.on('uncaughtException', (ex) => {
  logger.error('Uncaught Exception:', ex);
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  logger.error('Unhandled Rejection:', ex);
  throw ex;
});

// Throwing an error here will be caught by the error handling code in logger.js
// throw new Error("Bad error in startup!");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;
