const mongoose = require('mongoose');
const app = require('./app');
const config = require('./utils/config');

mongoose.connect(config.DATABASE_URI).then(() => {
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
});

