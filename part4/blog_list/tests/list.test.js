const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blogs');

const api = supertest(app);
const testHelper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});

  const promises = testHelper.blogs.map(blog => {
    return new Blog(blog).save();
  });
  await Promise.all(promises);
});

describe('get blogs', () => {
  test('get entire blog list', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(testHelper.blogs.length);
  }, 100000);

  test('id property exists', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('create blogs', () => {
  test('create blog', async () => {
    const blog = {
      title: 'Star wars',
      author: 'Star wars author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 1000,
    };

    await api.post('/api/blogs', JSON.stringify(blog))
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await Blog.find({});
    expect(newBlogs).toHaveLength(testHelper.blogs.length + 1);
  });

  test('default like count', async () => {
    const blog = {
      title: 'Star wars',
      author: 'Star wars author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    };

    const response = await api.post('/api/blogs', JSON.stringify(blog));
    const newBlog = await Blog.findById(response.body.id);
    expect(newBlog.likes).toBe(0);
  });

  test('missing title', async () => {
    const blog = {
      author: 'Star wars author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    };

    await api.post('/api/blogs', JSON.stringify(blog)).expect(400);
  }, 100000);

  test('missing url', async () => {
    const blog = {
      title: 'Star wars',
      author: 'Star wars author',
    };

    await api.post('/api/blogs', JSON.stringify(blog)).expect(400);
  }, 100000);
});

afterAll(async () => {
  await Blog.deleteMany({});
  mongoose.connection.close();
});