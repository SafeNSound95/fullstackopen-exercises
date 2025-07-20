const {test, describe} = require("node:test")
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('mostBlogs returns the right object', () => {
  test('of an array of blogPosts with no values', () => {
      assert.strictEqual(listHelper.mostBlogs([]), 0)
    })
    
    test('of an array of blogPosts with 1 value', () => {
      assert.deepStrictEqual(listHelper.mostBlogs([listHelper.initialBlogs[1]]), {author:'her', blogs:1})
    })
  
    test('of an array of blogPosts with many values', () => {
      assert.deepStrictEqual(listHelper.mostBlogs(listHelper.initialBlogs), { author: 'them', blogs: 3 })
    })
})