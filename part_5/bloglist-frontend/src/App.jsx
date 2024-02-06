import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

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
    const loggedUserLocal = window.localStorage.getItem('loggedNoteappUser')
    
    if(loggedUserLocal) {
      const user = JSON.parse(loggedUserLocal)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } 
    catch (error) {
      console.error(error)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

 return (
  <div>
    {!user && <LoginForm
        handleLogin={ handleLogin }
        username={ username }
        handleUsername={({ target }) => setUsername(target.value)}
        password={ password }
        handlePassword={({ target }) => setPassword(target.value)} 
      />
    }
    {user && <Blogs 
        name={ user.name } 
        blogs={ blogs }
        logOut={handleLogOut}
      />
    }
  </div>
 )
}

export default App