const express = require('express');
const app = express();
const Person = require('./models/person');
const createHttpError = require('http-errors');
const { unknownEndpoint, errorHandler, logger } = require('./utils/middleware');

// Middleware
app.use(express.json());
app.use(logger);
app.use(express.static('dist'));

// Set up routes
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

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
