require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { generateId } = require('./helpers');
const app = express();

// Middleware
app.use(express.json());
morgan.token('data', (request) => {
  request.method === 'POST' ? JSON.stringify(request.body) : '';
});
const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :data'
);
app.use(logger);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/info', (_, response) => {
  const html = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date().toString()}</p>
  `.trim();

  response.send(html);
});

app.get('/api/persons', (_, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);

  const person = persons.find((person) => person.id === id);

  if (!person) {
    return response.status(404).end();
  }

  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = parseInt(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  return response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  if (request.get('Content-Type') !== 'application/json') {
    return response.status(422).send();
  }

  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Missing person name or number',
    });
  }

  if (persons.find((person) => person.name === body.name)) {
    return response.status(422).json({
      error: `The name '${body.name}' is already taken`,
    });
  }

  const person = {
    id: generateId(),
    ...body,
  };

  persons.push(person);
  response.json(person);
});

// Set up server on port
const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
