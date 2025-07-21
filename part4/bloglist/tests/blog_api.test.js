const { describe, test, beforeEach, after } = require('node:test') 
const assert = require('node:assert') 
const supertest = require('supertest')

const mongoose = require('mongoose')
const Blog = require('../models/blog') 
const helper = require('../utils/list_helper')
const app = require('../app')

const api = supertest(app)

describe('when there are initial blogs in the DB', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as JSON', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/) 
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    assert(response.body[0].id)
    assert(!response.body[0]._id)
  })

  describe('creating a new blog', () => {
    test('a valid blog is added', async() => {
      const newBlog = {
        title:'new',
        author:'newer',
        url:'www.newest.com',
        likes:5
      }

      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/) 

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes('new'))
    })

    test('blog likes default to 0', async () => {
    const newBlog = {
      title:'new',
      author:'newer',
      url:'www.newest.com',
    }

    const response = await api
    .post('/api/blogs')
    .send(newBlog)

    assert.strictEqual(response.body.likes, 0)
    })

    test('return 400 status code if title property is missing', async() => {
      const newBlog = {
      author:'newer',
      url:'www.newest.com',
      likes:5
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })

    test('return 400 status code if url property is missing', async() => {
      const newBlog = {
            title:'new',
            author:'newer',
            likes:5
          }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type',/application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    })

    test('return 400 status code if title and url properties are missing', async() => {
        const newBlog = {
          author:'newer',
          likes:5
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type',/application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  }
)
  
  describe('Deleting a blog', () => {
    test('blog with valid id is deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[0].id

    await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogsAtStart[0].title))
  })

  test('return 400 status code when we try to delete a blog with invalid id', async () => {
    const id = 'fjasdkjag48534gdf'
    
    await api
    .delete(`/api/blogs/${id}`)
    .expect(400)
    .expect('Content-Type',/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  })

  describe('updating a blog', () => {
    test('updating a blog with valid id works', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[0].id

    const updatedBlog = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url:blogsAtStart[0].url,
      likes: ++blogsAtStart[0].likes,
    }

    const response = await api
    .put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/) 

    assert.strictEqual(response.body.likes, updatedBlog.likes)
  })

  test('return 404 status code when we try to update a blog that doesnt exist', async () => {
    const id = await helper.nonExistingId()
    
    const updatedBlog = {
      title: 'title',
      author: 'author',
      url:'url',
      likes: 0,
    }

    const response = await api
    .put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .expect(404)

  })

  test('return 400 status code when we try to update a blog with invalid id', async () => {
    const id = '98453tzkjfskag4309'
    
    const updatedBlog = {
      title: 'title',
      author: 'author',
      url:'url',
      likes: 0,
    }

    const response = await api
    .put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  })
  })

    after(async () => {
    await mongoose.connection.close()
  })
}
)
  
 

