const LoginForm = ({ handleLogin, username, password, handleCredentials }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type='text'
            value={username}
            name='username'
            onChange={handleCredentials}
          />
        </div>
        <div>
          password
          <input 
            type='password'
            value={password}
            name='password'
            onChange={handleCredentials}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}



export default LoginForm