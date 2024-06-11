import { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setUser(user)
    } 
    catch (exception) {
        console.log("Wrong Credentials")
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
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
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)} 
            />
          </div>
          <div>
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
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={handleLogOut}>log out</button>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}
      </div>
  )
}

export default App