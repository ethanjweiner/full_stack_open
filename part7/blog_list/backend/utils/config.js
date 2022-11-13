require('dotenv').config();

const { PORT, NODE_ENV } = process.env;
const DATABASE_URI =
  NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URI
    : process.env.DATABASE_URI;

module.exports = { PORT, DATABASE_URI, NODE_ENV };
