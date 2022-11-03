const BlogsRouter = require('express').Router();
const Blog = require('../models/blogs');

BlogsRouter.get('/', (_, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

BlogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});

module.exports = BlogsRouter;