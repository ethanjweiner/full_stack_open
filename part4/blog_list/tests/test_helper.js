const Blog = require('../models/blogs');
const User = require('../models/users');

// Blogs
const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'To remove',
    author: 'To remove',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 0,
  });

  await blog.save();
  await blog.remove();

  // eslint-disable-next-line no-underscore-dangle
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogDocs = await Blog.find({});
  return blogDocs.map((blog) => blog.toJSON());
};

// Users
const users = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'Password',
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'Password1234!',
  },
];

const usersInDb = async () => {
  const userDocs = await User.find({});
  return userDocs.map((user) => user.toJSON());
};

const existingUsername = async () => {
  const userDocs = await User.find({});
  return userDocs[0].username;
};

module.exports = {
  blogs,
  blogsInDb,
  nonExistingId,
  users,
  usersInDb,
  existingUsername,
};
