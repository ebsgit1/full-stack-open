const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('identifier = id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map((blog) => blog.id)
  ids.forEach((id) => {
    assert.strictEqual(
      typeof id,
      'string',
      'id needs to be a string'
    )
  })
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'uusi',
    author: 'testi',
    url: 'http://testi.fi/3',
    likes: 4,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map((blog) => blog.title)
  assert.strictEqual(
    titles.includes('uusi'),
    true,
    'Expected titles to include "uusi"'
  )
})

test('blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'uusi2',
    author: 'Testi 2',
    url: 'http://testi.fi/4',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(
    response.body.likes,
    0,
    'Expected default value for "likes" to be 0'
  )
})

test('blog without title or url returns 400', async () => {
  const withoutTitle = {
    author: 'Testi 4',
    url: 'http://testi.fi/5',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(withoutTitle)
    .expect(400)

  const withoutUrl = {
    title: 'uusi 3',
    author: 'Testi 5',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(withoutUrl)
    .expect(400)
})


after(async () => {
  await mongoose.connection.close()
})