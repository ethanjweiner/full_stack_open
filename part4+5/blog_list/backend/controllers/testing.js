const testingRouter = require('express').Router();
const User = require('../models/users');
const Blog = require('../models/blogs');

testingRouter.post('/reset', async (_, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  response.status(204).send();
});

module.exports = testingRouter;
