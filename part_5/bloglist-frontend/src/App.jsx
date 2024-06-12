import { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const createBlog = async (e) => {
    e.preventDefault()

    try {
      const blogObj = {
        title: title,
        author: author,
        url: url,
        user: user.token
      }

      const blogRsp = await blogService.create(blogObj)

      setBlogs([...blogs, blogRsp])
    }
    catch (err) {
      console.log("Error!")
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } 
    catch (err) {
        console.log("Wrong Credentials")
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    blogService.setToken(null)
    setUsername('')
    setPassword('')
    setUser(null)
  }

  if (!user) {
    return (
      <div>
        <h2>LOG IN</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)} 
            />
          </div>
          <div>
            password:
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)} 
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
      <div>  
        <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>log out</button>
        <div>
          <h2>Create New Blog</h2>
          <form onSubmit={createBlog}>
            <div>
              title:
              <input
                type='text'
                value={title}
                name='title'
               onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type='text'
                value={author}
                name='author'
               onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type='text'
                value={url}
                name='url'
               onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type='submit'>create</button>
          </form>
        </div>
        <div>
        <h2>Blog List</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      </div>
  )
}

export default App