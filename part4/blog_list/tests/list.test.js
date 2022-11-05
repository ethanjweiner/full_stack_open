/* eslint-disable jest/expect-expect */
/* eslint-disable node/no-unpublished-require */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blogs');
const testHelper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.blogs);
});

describe('get blogs', () => {
  test('get entire blog list', async () => {
    const response = await api
      .get('/api/blogs')
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

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await testHelper.blogsInDb();
    expect(newBlogs).toHaveLength(testHelper.blogs.length + 1);
  });

  test('default like count', async () => {
    const blog = {
      title: 'Star wars',
      author: 'Star wars author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    };

    const response = await api.post('/api/blogs').send(blog);
    const newBlog = await Blog.findById(response.body.id);
    expect(newBlog.likes).toBe(0);
  });

  test('missing title', async () => {
    const blog = {
      author: 'Star wars author',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    };

    await api.post('/api/blogs').send(blog).expect(400);
  }, 100000);

  test('missing url', async () => {
    const blog = {
      title: 'Star wars',
      author: 'Star wars author',
    };

    await api.post('/api/blogs').send(blog).expect(400);
  }, 100000);
});

describe('delete blogs', () => {
  test('delete singular blog', async () => {
    const blogToDelete = (await testHelper.blogsInDb())[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const newBlogs = await testHelper.blogsInDb();
    expect(newBlogs).toHaveLength(testHelper.blogs.length - 1);

    const urls = newBlogs.map((blog) => blog.url);
    expect(urls).not.toContain(blogToDelete.url);
  });

  test('delete non-existent id', async () => {
    const idToDelete = await testHelper.nonExistingId();
    await api.delete(`/api/blogs/${idToDelete}`).expect(204);

    const newBlogs = await testHelper.blogsInDb();
    expect(newBlogs).toHaveLength(testHelper.blogs.length);
  });
});

describe('update blogs', () => {
  test('update blog likes', async () => {
    const blogToUpdate = (await testHelper.blogsInDb())[0];
    const updatedData = { ...blogToUpdate, likes: blogToUpdate.likes + 3 };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200);

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 3);
  });

  test('update blog likes with string', async () => {
    const blogToUpdate = (await testHelper.blogsInDb())[0];
    const updatedData = { ...blogToUpdate, likes: 'string!' };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(400);
  });

  test('update blog likes without likes', async () => {
    const blogToUpdate = (await testHelper.blogsInDb())[0];
    const updatedData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200);

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    expect(updatedBlog.likes).toBe(blogToUpdate.likes);
  });
});

afterAll(async () => {
  await Blog.deleteMany({});
  mongoose.connection.close();
});
