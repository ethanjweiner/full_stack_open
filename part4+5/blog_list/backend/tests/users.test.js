/* eslint-disable node/no-unpublished-require */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/users');
const testHelper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const promises = testHelper.users.map((user) =>
    api.post('/api/users').send(user)
  );

  await Promise.all(promises);
});

describe('user creation', () => {
  test('new valid user', async () => {
    const userData = {
      username: 'ethan',
      name: 'Ethan Weiner',
      password: 'Password12345!',
    };

    const response = await api
      .post('/api/users')
      .send(userData)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.username).toBe(userData.username);
    const newUsers = await testHelper.usersInDb();
    expect(newUsers).toHaveLength(testHelper.users.length + 1);
  });

  test('missing username', async () => {
    const userData = {
      name: 'Missing username',
      password: 'Password',
    };

    const response = await api.post('/api/users').send(userData).expect(400);
    expect(response.body.error).toBe('Invalid username or password');
    const newUsers = await testHelper.usersInDb();
    expect(newUsers).toHaveLength(testHelper.users.length);
  });

  test('missing password', async () => {
    const userData = {
      username: 'Missing password',
      name: 'Missing password',
    };

    const response = await api.post('/api/users').send(userData).expect(400);
    expect(response.body.error).toBe('Invalid username or password');
    const newUsers = await testHelper.usersInDb();
    expect(newUsers).toHaveLength(testHelper.users.length);
  });

  test('username too short', async () => {
    const userData = {
      username: 'ab',
      name: 'Username too short',
      password: 'Working password',
    };

    const response = await api.post('/api/users').send(userData).expect(400);
    expect(response.body.error).toBe('Invalid username or password');
    const newUsers = await testHelper.usersInDb();
    expect(newUsers).toHaveLength(testHelper.users.length);
  });

  test('password too short', async () => {
    const userData = {
      username: 'abcdef',
      name: 'Username too short',
      password: 'ac',
    };

    const response = await api.post('/api/users').send(userData).expect(400);
    expect(response.body.error).toBe('Invalid username or password');
    const newUsers = await testHelper.usersInDb();
    expect(newUsers).toHaveLength(testHelper.users.length);
  });

  test('username taken', async () => {
    const username = await testHelper.existingUsername();

    const userData = {
      username,
      name: 'Username taken',
      password: 'Password1234!',
    };

    const response = await api.post('/api/users').send(userData).expect(400);
    expect(response.body.error).toBe('Username taken');
    const newUsers = await testHelper.usersInDb();
    expect(newUsers).toHaveLength(testHelper.users.length);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
