
const LoginForm = ({ username, password, handleUsername, handlePassword, handleLogin }) => {

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input id="username" value={username} onChange={handleUsername}/>
        </label>
        <br></br>
        <label>
          password
          <input id="password" type="password" value={password} onChange={handlePassword}/>
        </label>
        <button id="login-button" type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm