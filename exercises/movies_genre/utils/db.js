const logger = require('./logging');
const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://127.0.0.1/movies_genre', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    logger.info('Connected to MongoDB...');
  });
};
