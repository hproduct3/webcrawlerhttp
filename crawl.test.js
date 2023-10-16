const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
  const input = 'https://www.freecodecamp.org/news/support'
  const actual = normalizeURL(input)
  const expected = 'www.freecodecamp.org/news/support'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
  const input = 'https://www.freecodecamp.org/news/support/'
  const actual = normalizeURL(input)
  const expected = 'www.freecodecamp.org/news/support'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'http://www.FREECODECAMP.org/news/support'
  const actual = normalizeURL(input)
  const expected = 'www.freecodecamp.org/news/support'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
  const input = 'http://www.freecodecamp.org/news/support'
  const actual = normalizeURL(input)
  const expected = 'www.freecodecamp.org/news/support'
  expect(actual).toEqual(expected)
})