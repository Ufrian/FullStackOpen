const LoginForm = ({ handleLogin, username, handleUsername, password, handlePassword }) => {
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
          type='text'
          value={username}
          name='Username'
          onChange={handleUsername}
          />
        </div>
        <div>
          password
          <input 
            type='password'
            value={password}
            name='Password'
            onChange={handlePassword}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


/*
 <div>
      <h2>Log In</h2>
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
        <button type="submit">login</button>
      </form>
    </div>
*/



export default LoginForm