import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleCredentials: PropTypes.func.isRequired
}

export default LoginForm