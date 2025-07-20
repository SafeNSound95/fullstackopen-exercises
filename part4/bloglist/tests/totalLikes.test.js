const {test, describe} = require("node:test")
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('totalLikes returns the right sum', () => {
  
  test('of an array of blogPosts with no values', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
  
  test('of an array of blogPosts with 1 value', () => {
    assert.strictEqual(listHelper.totalLikes([listHelper.initialBlogs[0]]), 15)
  })

  test('of an array of blogPosts with many values', () => {
    assert.strictEqual(listHelper.totalLikes(listHelper.initialBlogs), 53)
  })
}) 

