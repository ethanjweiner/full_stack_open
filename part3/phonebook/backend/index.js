require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Person = require('./models/person');
const createHttpError = require('http-errors');

// Database Setup
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });

// Middleware
app.use(express.json());

morgan.token('data', (request) => {
  request.method === 'POST' ? JSON.stringify(request.body) : '';
});
const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :data'
);
app.use(logger);

// Serve static files
app.use(express.static('dist'));

// Routes
app.get('/info', (_, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const html = `<p>Phonebook has info for ${count} people</p>
    <p>${new Date().toString()}</p>
    `.trim();

      response.send(html);
    })
    .catch(next);
});

app.get('/api/persons', (_, response) => {
  Person.find({}).then((people) => response.json(people));
});

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      response.json(person);
    })
    .catch(next);
});

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then(() => {
      return response.status(204).end();
    })
    .catch(next);
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (request.get('Content-Type') !== 'application/json') {
    return next(createHttpError(415));
  }

  Person.find({ name: body.name })
    .then((result) => {
      if (result.length) {
        return next(
          createHttpError(422, `The name '${body.name}' is already taken`)
        );
      }

      const person = new Person(body);
      return person.save();
    })
    .then((person) => response.json(person))
    .catch(next);
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  if (request.get('Content-Type') !== 'application/json') {
    return next(createHttpError(415));
  }

  const newPerson = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, newPerson, {
    new: true,
    runValidators: true,
  })
    .then((newPerson) => {
      response.send(newPerson);
    })
    .catch(next);
});

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown API endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, _, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  if (error.status) {
    return response.status(error.status).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// Set up server on production/development port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
