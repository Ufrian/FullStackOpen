import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif , setNotif] = useState(null)

  let sortedBlogs = []

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

  const createBlog = async (title, author, url) => {
    try {
      const blogObj = {
        title: title,
        author: author,
        url: url,
        user: user.token
      }

      const blogRsp = await blogService.create(blogObj)

      setBlogs([...blogs, blogRsp])
      
      const successNotiif = {
        msg: `a new blog ${blogRsp.title} by ${blogRsp.author} added`,
        status: "success"
      }
      handleNotification(successNotiif)
    }
    catch ({ response }) {
      const errorNotif = {
        msg: response.data.error,
        status: "error",
      }
      handleNotification(errorNotif)
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } 
    catch ({ response }) {
        const errorNotif = {
          msg: response.data.error,
          status: "error",
        }
        handleNotification(errorNotif)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    blogService.setToken(null)
    setUser(null)
  }

  const handleNotification = (notifObj) => {
    setNotif(notifObj)

    setTimeout(() => {
      setNotif(null)
    }, 5000);
  }

  const removeBlog = async (id) => {
      try{
        await blogService.remove(id);
        const blogsRemoved = blogs.filter(blog => blog.id != id)
        setBlogs(blogsRemoved)

        const successNotiif = {
          msg: "Blog deleted",
          status: "success"
        }
        handleNotification(successNotiif)
      }
      catch ({ response }) {
        const errorNotif = {
          msg: response.data.error,
          status: "error",
        }
        handleNotification(errorNotif)
    }
  }

  const sortBlogs = () => {
    sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);
  }

  const updateBlog = async (newBlogObj) => {
    try {
      const blogUpdate = await blogService.update(newBlogObj.id, newBlogObj)
      setBlogs(blogs.map(blog => blog.id !== blogUpdate.id ? blog : blogUpdate))
    }
    catch (err) {
      console.log(err)
    }
  }

  sortBlogs()  

  if (!user) {
    return (
      <div>
        < Notification notifObj={notif} />
        <LoginForm handleLogin={ handleLogin }/>
      </div>
    )
  }

  return (
      <div>
        < Notification notifObj={notif} />  
        <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={ handleLogOut }>log out</button>
          <Togglable btnLabel={"create new note"}>
            <BlogForm  createBlog={ createBlog } />
          </Togglable>
        <div>
        <h2>Blog List</h2>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={ updateBlog } removeBlog={removeBlog}/>
        )}
        </div>
      </div>
  )
}

export default App