/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: {
    type: Array,
    default: [],
  },
});

blogSchema.set('toJSON', {
  transform: (_, returnedBlog) => {
    returnedBlog.id = returnedBlog._id;
    delete returnedBlog._id;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
