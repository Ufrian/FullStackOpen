import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ logUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    logUser(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          data-testid="username"
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          data-testid="password"
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
          login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  logUser: PropTypes.func.isRequired
}

export default LoginForm

