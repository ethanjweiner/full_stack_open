const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = (uri) => mongoose
  .connect(uri)
  .then(() => {
    logger.info('Database connected');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message);
  });

module.exports = { connectDB };