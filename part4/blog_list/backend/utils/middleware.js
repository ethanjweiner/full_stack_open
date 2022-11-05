const jwt = require('jsonwebtoken');
const User = require('../models/users');

const loadToken = (request, _, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

const loadUser = async (request, _, next) => {
  if (!request.token) request.user = null;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) request.user = null;

  request.user = await User.findById(decodedToken.id);

  next();
};

const errorHandler = (error, _, response, next) => {
  if (['ValidationError', 'CastError'].includes(error.name)) {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'invalid token' });
  }

  return next(error);
};

module.exports = { loadToken, loadUser, errorHandler };
