const app = require('./app')
const config = require('./utils/config')
const { connectDB } = require('./utils/db')
const logger = require('./utils/logger')

// Connect to database and serve backend
connectDB(config.DATABASE_URI).then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
})
