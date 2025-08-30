const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {

  try {
  const blog = new Blog(request.body)

  if(!blog.likes) {
    blog.likes = 0
  }

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
  return response.status(400).json({ error: 'userId missing or not valid' })
  }

  blog.user = user._id
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id) 
  await user.save()
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
    const populatedBlog = await savedBlog.populate('user')

    return response.json(populatedBlog)

  } catch(error) {
    next(error)
  }
}
)


module.exports = blogsRouter