require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = (uri) => mongoose
  .connect(uri)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });

module.exports = { connectDB };