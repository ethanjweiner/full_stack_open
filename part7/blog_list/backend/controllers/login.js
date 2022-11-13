/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const LoginRouter = require('express').Router();
require('express-async-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const isValidUser = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    return false;
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.passwordHash);
  return passwordIsCorrect;
};

LoginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  if (!(await isValidUser(username, password))) {
    return response.status(401).json({ error: 'Invalid credentials' });
  }

  const user = await User.findOne({ username });

  const userData = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userData, process.env.SECRET);

  // Respond w/ token so user can save & use on subsequent requests
  return response.status(200).json({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = LoginRouter;
