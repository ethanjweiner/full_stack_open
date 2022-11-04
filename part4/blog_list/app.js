const express = require('express');
const app = express();
const cors = require('cors');
const BlogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const mongoose = require('mongoose');

mongoose.connect(config.DATABASE_URI);

app.use(cors());
app.use(express.json());

app.use('/api/blogs', BlogsRouter);

const errorHandler = (error, _, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).send('Invalid input');
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;