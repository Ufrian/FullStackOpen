import '../App.css'
import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [credentials, setCredentials] = useState({username: '', password: ''})
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const [notification, setNotification] = useState({msg: '', type: ''})

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const loggedUserLocal = window.localStorage.getItem('loggedNoteappUser')
    
    if(loggedUserLocal) {
      const user = JSON.parse(loggedUserLocal)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleCredentials = (event) => {
    const {name, value} = event.target
    setCredentials({...credentials, [name]: value })    
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setCredentials({...credentials, username: '', password: ''})
    } 
    catch ({ response }) {
      handleNotification(response.data.error, "error")
    }
  }

  if (!blogs.length) return

  const handleLogOut = async () => {
    window.localStorage.removeItem('loggedNoteappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleNewBlog = (event) => {
    const {name, value} = event.target
    setNewBlog({...newBlog, [name]: value })
  }

  const addNewBlog = async () => {
    try {
      const addedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(addedBlog))
      setNewBlog({...newBlog, title: '', author: '',url: ''})
      handleNotification(`A new blog: ${addedBlog.title} - by ${addedBlog.author} added`, "success")
    }
    catch ({ response }) {
      handleNotification(response.data.error, "error")
    }
  }

  const handleNotification = (message, status) => {
    setNotification({
      ...notification,
      msg: message, 
      type: status 
    })
    setTimeout(() => {
      setNotification({...notification, msg: '', type: '' })
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log In</h2>
        <Notification notification={ notification } />
        <LoginForm
          handleLogin={ handleLogin }
          username={ credentials.username }
          password={ credentials.password }
          handleCredentials={handleCredentials}
        />
      </div>
    )
  }

 return (
  <div>
    <h2>Home</h2>
    <Notification notification={ notification } />
    {user.name} logged in
    <button type='submit' onClick={handleLogOut}>logout</button>
    <Togglable buttonLabel="new blog">
      <NewBlogForm
        newBlog={newBlog}
        handleNewBlog={handleNewBlog}
        addNewBlog={addNewBlog} 
      />
    </Togglable>
    <h2>Blogs</h2>
    <Blogs blogs={ blogs }/>
  </div>
 )
}

export default App