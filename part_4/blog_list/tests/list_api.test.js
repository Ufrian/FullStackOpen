const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const blogsRouter = require('../controllers/blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there are initially some notes saved', () => {
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
})

describe('viewing a specific blog', () => {
  test('unique identifier property is named id', async () => {
    const blogs = await helper.blogsInDb()
    
    const firstBlog = blogs[0]   
    expect(firstBlog.id).toBeDefined()  
  })
})

describe('addition of a blog', () => {
  test('succeeds with valid data', async () => {
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

  test('if likes property is missing, default value to 0', async () => {
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
  
  test('fail with status code 400 if no title property', async () => {
    const noTitleBlog = {
      author: "The Fortnite Team",
      url: "https://www.fortnite.com/competitive/news/fortnite-championship-series-2024-details",
      likes: 20
    }  
  
    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)  
  })

  test('fail with status code 400 if no url property', async () => {
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
})  

describe('deletion of a blog', () => {
  test('valid id succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const blogs = blogsAtEnd.map(b => b.title)
    expect(blogs).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds updating information of individual blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {...blogToUpdate, likes: 99 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})