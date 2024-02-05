const LoginForm = ({ handleLogin, username, handleUsername, password, handlePassword}) => {
  return (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsername}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password" 
        onChange={handlePassword}
      />
    </div>
    <button type="submit">login</button>
  </form>  
  )
}

export default LoginForm

