const BlogsRouter = require('express').Router();
require('express-async-errors');
const Blog = require('../models/blogs');

BlogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
  });

  response.json(blogs);
});

BlogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const { user } = request;

  if (!user) {
    return response
      .status(401)
      .json({ error: 'Must be authenticated to create blogs' });
  }

  const blog = new Blog({ title, author, url, likes, user: user.id });
  const result = await blog.save();

  user.blogs = user.blogs.concat(blog.id);
  await user.save();

  return response.status(201).json(result);
});

BlogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).send();
});

BlogsRouter.put('/:id', async (request, response) => {
  const newBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
    }
  );
  response.status(200).json(newBlog);
});

module.exports = BlogsRouter;
