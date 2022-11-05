const morgan = require('morgan');
const logger = require('./logger');

morgan.token('data', (request) =>
  request.method === 'POST' ? JSON.stringify(request.body) : ''
);

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :data'
);

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown API endpoint' });
};

const errorHandler = (error, _, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  if (error.status) {
    return response.status(error.status).send({ error: error.message });
  }

  return next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
