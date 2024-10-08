const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware');
const { log } = require('console')
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) response.json(blog)
  else response.status(404).end()
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const blogConcatUser = await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(blogConcatUser)
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const blog = {
    title: body.title,
    autor: body.author,
    url: body.url,
    likes: body.likes,
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true})
  const blogConcatUser = await updatedBlog.populate('user', { username: 1, name: 1 })

  response.json(blogConcatUser)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog === null) return response.status(404).json({error: "page not found or has already been deleted"})

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()  
  }
  else {
    response.status(401).json({ error: 'invalid user' }).end()
  }
})

module.exports = blogsRouter