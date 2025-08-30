const { test, describe } = require('node:test')
const assert  = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favoriteBlog returns the blog with the most likes', () => {
    test('of an array of blogPosts with no values', () => {
      assert.strictEqual(listHelper.favoriteBlog([]), 0)
    })
    
    test('of an array of blogPosts with 1 value', () => {
      assert.deepStrictEqual(listHelper.favoriteBlog([listHelper.initialBlogs[0]]), listHelper.initialBlogs[0])
    })
  
    test('of an array of blogPosts with many values', () => {
      assert.deepStrictEqual(listHelper.favoriteBlog(listHelper.initialBlogs), listHelper.initialBlogs[2])
    })
  }
) 
