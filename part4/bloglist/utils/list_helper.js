const _ = require('lodash');
const Blog = require('../models/blog')

const initialBlogs = [
  {title:"Prisoner",author:"him",url:"www.him.com",likes:15}, 
  {title:"Azaka",author:"her",url:"www.her.com",likes:10}, 
  {title:"Ban",author:"them",url:"www.them.com",likes:25},
  {title:"Banned",author:"them",url:"www.them.com",likes:2},
  {title:"Banner",author:"them",url:"www.them.com",likes:1}
]

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogPostsArray) => {
  return blogPostsArray.reduce((sum, blogPost) => sum + blogPost.likes, 0)
}

const favoriteBlog = (blogPostsArray) => {
  if(blogPostsArray.length === 0)  return 0

  const likes = blogPostsArray.map(b => b.likes)
  return blogPostsArray[likes.indexOf(Math.max(...likes))]
}

const mostBlogs = (blogPostsArray) => {
  if(blogPostsArray.length === 0)  return 0

  const authors = blogPostsArray.map(b => b.author)
  const authorsCount = _.countBy(authors)

  const blogs = Math.max(...Object.values(authorsCount))
  const author = Object.keys(authorsCount)[Object.values(authorsCount).indexOf(blogs)]

  return {author, blogs}
}

const mostLikes = (blogPostsArray) => {
  if(blogPostsArray.length === 0)  return 0

  const authorLikesArr = blogPostsArray.map((blog) => [blog.author,blog.likes])
  const authorLikesCount = {}

  for(const [author, likes] of authorLikesArr ) {
    if (authorLikesCount[author] === undefined) {
      authorLikesCount[author] = likes
    } else {
      authorLikesCount[author] += likes
    }
  }

  let mostLikes = 0
  let authorWithMostLikes = ''

  for(const [author,likes] of Object.entries(authorLikesCount)) {
    if(likes > mostLikes) {
      mostLikes = likes
      authorWithMostLikes = author
    }
  }

  return {author:authorWithMostLikes, likes:mostLikes}
}

const blogsInDb = async () => {
   const blogs = await Blog.find({})
   return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ url: 'www.wowza.com', title:'hey now'})
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
  nonExistingId
}


