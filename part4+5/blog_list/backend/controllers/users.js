const UsersRouter = require('express').Router();
require('express-async-errors');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const SALT_ROUNDS = 10;

UsersRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

UsersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password || username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'Invalid username or password' });
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return response.status(400).json({ error: 'Username taken' });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

module.exports = UsersRouter;
