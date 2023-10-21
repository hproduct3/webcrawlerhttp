const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')
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

test('getURLsFromHTML absolute', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href = "https://www.freecodecamp.org/news/">
          www.freecodecamp.org
        </a>
      </body>
    </html>`
  const inputBaseURL = "https://www.freecodecamp.org/news/"
  const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
  const expected = ["https://www.freecodecamp.org/news/"]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href = "/news/">
          www.freecodecamp.org
        </a>
      </body>
    </html>`
  const inputBaseURL = "https://www.freecodecamp.org"
  const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
  const expected = ["https://www.freecodecamp.org/news/"]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href = "https://www.freecodecamp.org/path1/">
          www.freecodecamp.org Path One
        </a>
        <a href = "/path2/">
          www.freecodecamp.org Path Two
        </a>
      </body>
    </html>`
  const inputBaseURL = "https://www.freecodecamp.org"
  const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
  const expected = ["https://www.freecodecamp.org/path1/","https://www.freecodecamp.org/path2/"]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href = "invalid">
          Invalid URL
        </a>
      </body>
    </html>`
  const inputBaseURL = "https://www.freecodecamp.org"
  const actual = getURLsFromHTML(inputHTMLBody,inputBaseURL)
  const expected = []
  expect(actual).toEqual(expected)
})