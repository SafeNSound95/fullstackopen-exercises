const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if(!blog.likes) {
    blog.likes = 0
  }

  try {
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request,response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async(request, response, next) => {
  try {
    const updatedBlog = request.body
    const blog = await Blog.findById(request.params.id)

    if(!blog) {
      return response.status(404).end()
    }

    blog.title = updatedBlog.title
    blog.author = updatedBlog.author
    blog.url = updatedBlog.url
    blog.likes = updatedBlog.likes

    const savedBlog = await blog.save()
    return response.json(savedBlog)

  } catch(error) {
    next(error)
  }
}
)


module.exports = blogsRouter