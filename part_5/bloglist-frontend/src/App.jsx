import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      setCredentials({
        username: '',
        password: ''
      })
    } 
    catch (error) {
      console.error(error)
    }
  }

  const handleLogOut = () => {
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
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  if (user === null) {
    return (
      <div>
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
    {user.name} logged in
    <button type='submit' onClick={handleLogOut}>logout</button>
    <NewBlogForm
      newBlog={newBlog}
      handleNewBlog={handleNewBlog}
      addNewBlog={addNewBlog} 
    />
    <h2>Blogs</h2>
    <Blogs blogs={ blogs }/>
  </div>
 )
}

export default App