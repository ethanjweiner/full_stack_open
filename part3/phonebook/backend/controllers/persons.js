const PersonRouter = require('express').Router();
const Person = require('../models/person');
const createHttpError = require('http-errors');

PersonRouter.get('/', (_, response) => {
  Person.find({}).then((people) => response.json(people));
});

PersonRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      response.json(person);
    })
    .catch(next);
});

PersonRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then(() => {
      return response.status(204).end();
    })
    .catch(next);
});

PersonRouter.post('/', (request, response, next) => {
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

PersonRouter.put('/:id', (request, response, next) => {
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

module.exports = PersonRouter;