const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((savedBlog) => {
    response.status(201).json(savedBlog)
  }).catch(error => logger.error(error.message))
})

module.exports = blogsRouter