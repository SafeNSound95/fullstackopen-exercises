const {test, describe} = require("node:test")
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('mostLikes returns the right object', () => {
  test('of an array of blogPosts with no values', () => {
      assert.strictEqual(listHelper.mostLikes([]), 0)
    })
    
    test('of an array of blogPosts with 1 value', () => {
      assert.deepStrictEqual(listHelper.mostLikes([listHelper.initialBlogs[2]]), {author:'them', likes:25})
    })
  
    test('of an array of blogPosts with many values', () => {
      assert.deepStrictEqual(listHelper.mostLikes(listHelper.initialBlogs), { author: 'them', likes: 28 })
    })
})