const morgan = require('morgan');

morgan.token('data', (request) => {
  request.method === 'POST' ? JSON.stringify(request.body) : '';
});

const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :data'
);

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown API endpoint' });
};

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

module.exports = {
  logger,
  unknownEndpoint,
  errorHandler
};