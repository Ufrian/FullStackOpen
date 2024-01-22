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

afterAll(async () => {
  await mongoose.connection.close()
})