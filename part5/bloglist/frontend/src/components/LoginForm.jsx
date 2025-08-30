
const LoginForm = ({username, password, handleUsername, handlePassword, handleLogin}) => {
 
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input value={username} onChange={handleUsername}/>
        </label>
        <br></br>
        <label>
          password
          <input type="password" value={password} onChange={handlePassword}/>
        </label>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm