const express = require('express');
const app = express();
const cors = require('cors');
const BlogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', BlogsRouter);

module.exports = app;