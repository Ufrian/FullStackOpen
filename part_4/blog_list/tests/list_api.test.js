const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const blogs = await helper.blogsInDb()

  const firstBlog = blogs[0]   

  expect(firstBlog.id).toBeDefined()  
})

test('a blog can be added', async () => {
  const newBlog = {
    title: "How to Learn from Tutorials the Right Way - and Not Get Trapped in Tutorial Hell",
    author: "Jessica Wilkins",
    url: "https://www.freecodecamp.org/news/how-to-learn-from-coding-tutorials-and-avoid-tutorial-hell/",
    likes: 19
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('How to Learn from Tutorials the Right Way - and Not Get Trapped in Tutorial Hell')
})

test('if likes property is missing, it will default to the value 0', async () => {
  const newBlog = {
    title: "5 Common Server Vulnerabilities with Node.js",
    author: "JavaScript Today",
    url: "https://blog.javascripttoday.com/blog/node-js-server-vulnerabilities/",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const [lastBlog] = blogsAtEnd.slice(-1)
  
  expect(lastBlog.likes).toBe(0)
})

test('verify if title or url properties are missing from request', async () => {
  const noTitleBlog = {
    author: "The Fortnite Team",
    url: "https://www.fortnite.com/competitive/news/fortnite-championship-series-2024-details",
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  const noUrlBlog = {
    title: "Oracle introduces JavaScript support in MySQL",
    author: "Paul Krill",
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

afterAll(async () => {
  await mongoose.connection.close()
})