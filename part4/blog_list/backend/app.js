const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const BlogsRouter = require('./controllers/blogs');
const UsersRouter = require('./controllers/users');
const LoginRouter = require('./controllers/login');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

mongoose.connect(config.DATABASE_URI);

app.use(cors());
app.use(express.json());
app.use(middleware.loadToken);
app.use(middleware.loadUser);

app.use('/api/login', LoginRouter);
app.use('/api/users', UsersRouter);
app.use('/api/blogs', BlogsRouter);

app.use(middleware.errorHandler);

module.exports = app;
