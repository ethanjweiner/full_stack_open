const express = require('express');
const app = express();
const Person = require('./models/person');
const PersonRouter = require('./controllers/persons');
const { unknownEndpoint, errorHandler, requestLogger } = require('./utils/middleware');

// Middleware
app.use(express.json());
app.use(requestLogger);
app.use(express.static('dist'));

// Set up routes
app.use('/api/persons', PersonRouter);

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


app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
