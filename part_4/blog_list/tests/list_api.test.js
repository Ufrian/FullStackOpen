const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)

  const user = new User({ username: 'root', name: "TestUnit" ,passwordHash })

  await user.save()
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
    const token = await helper.getToken()

    const newBlog = {
      title: "How to Learn from Tutorials the Right Way - and Not Get Trapped in Tutorial Hell",
      author: "Jessica Wilkins",
      url: "https://www.freecodecamp.org/news/how-to-learn-from-coding-tutorials-and-avoid-tutorial-hell/",
      likes: 19
    }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('How to Learn from Tutorials the Right Way - and Not Get Trapped in Tutorial Hell')
  })

  test('if likes property is missing, default value to 0', async () => {
    const token = await helper.getToken()

    const newBlog = {
      title: "5 Common Server Vulnerabilities with Node.js",
      author: "JavaScript Today",
      url: "https://blog.javascripttoday.com/blog/node-js-server-vulnerabilities/",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    const [lastBlog] = blogsAtEnd.slice(-1)
    expect(lastBlog.likes).toBe(0)
  })
  
  test('fail with status code 400 if no title property', async () => {
    const token = await helper.getToken()

    const noTitleBlog = {
      author: "The Fortnite Team",
      url: "https://www.fortnite.com/competitive/news/fortnite-championship-series-2024-details",
      likes: 20
    }  
  
    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)  
  })

  test('fail with status code 400 if no url property', async () => {
    const token = await helper.getToken()

    const noUrlBlog = {
      title: "Oracle introduces JavaScript support in MySQL",
      author: "Paul Krill",
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)  
  })

  test('fails with status code 401 if token not provided', async () => {
    const token = null

    const blogsAtStart = await helper.blogsInDb()
    
    const newBlog = {
      title: "How to Learn from Tutorials the Right Way - and Not Get Trapped in Tutorial Hell",
      author: "Jessica Wilkins",
      url: "https://www.freecodecamp.org/news/how-to-learn-from-coding-tutorials-and-avoid-tutorial-hell/",
      likes: 19
    }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(401)
    .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toEqual(blogsAtStart)
  })
})  

describe('deletion of a blog', () => {
  test('valid id succeeds with status code 204', async () => {
    const token = await helper.getToken()

    await helper.cleanDbandPostBlog()

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${token}` })
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

describe('creating a user when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('wordpass', 10)
    const user = new User({ username: 'sieg', name: "Siegfried" ,passwordHash })

    await user.save()
  })

  test('fails if username already exists', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'sieg',
      name: 'Siegmeyer',
      password: "password1234"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')
      
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('fail with status code 400 if username is less than 3 characters long', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: "ao",
      name: "Hiodoshi Ao",
      password: "ahokun"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')
    
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('fail with status code 400 if password is less than 3 characters long ', async () => {
    const usersAtStart = await User.find({})
    
    const newUser = {
      username: "hiodoshi",
      name: "Hiodoshi Ao",
      password: "k"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('password must be at least 3 characters long')
        
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})