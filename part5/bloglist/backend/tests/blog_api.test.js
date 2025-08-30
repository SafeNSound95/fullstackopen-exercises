const { describe, test, beforeEach, after } = require('node:test') 
const assert = require('node:assert') 
const supertest = require('supertest')

const mongoose = require('mongoose')
const Blog = require('../models/blog') 
const User = require('../models/user') 
const helper = require('../utils/list_helper')
const app = require('../app')
const bcrypt = require('bcrypt')

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

}
)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

   test('creation fails with proper status and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'newbie',
      name: 'New User',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('Password must be entered'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'shorty',
      name: 'Short Pass',
      password: 'pw',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('longer than 3 characters'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      name: 'Too Short Username',
      password: 'validpassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('is shorter than the minimum allowed length'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
 await mongoose.connection.close()
})
  
 

