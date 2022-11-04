const BlogsRouter = require('express').Router();
require('express-async-errors');
const Blog = require('../models/blogs');

BlogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

BlogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = BlogsRouter;