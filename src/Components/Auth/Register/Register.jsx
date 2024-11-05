const Register = () => {
  return (
    <div className="auth-container">
      <input type="checkbox" id="auth-toggle" />
      <div className="form login">
        <header>Login</header>
        <form>
          <input type="text" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <a href="efefef">Forgot password?</a>
          <input type="button" className="button" value="Login" />
        </form>
        <div className="toggle-link">
          <span>
            Don't have an account? <label htmlFor="auth-toggle">Signup</label>
          </span>
        </div>
      </div>
    </div>
  )
}
export default Register;