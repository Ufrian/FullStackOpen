import { useState } from "react"

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const logUser = (e) => {
    e.preventDefault()

    handleLogin(username, password)
    setUsername("")
    setPassword("")
  }

  return (
    <div>
      <h2>LOG IN</h2>
      <form onSubmit={logUser}>
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

export default LoginForm