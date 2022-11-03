const app = require('./app');
const config = require('./utils/config');
const { connectDB } = require('./utils/db');

// Connect to database and serve backend
connectDB(config.DATABASE_URI).then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
});

