const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const errorHandler = require('./utils/middleware').errorHandler

logger.info('connecting to', config.MONGODB_URI)

const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB ')
  } catch(error) {
    logger.error('error connection to MongoDB:', error.message)
  }
}

connect()

const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

module.exports = app