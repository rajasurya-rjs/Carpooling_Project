import React from 'react'
import "./Login.css"
function Login() {
  return (
    <div className='whole'>
    <div className="login-box">
        <h2 className='login-text'>Login in with</h2>
        <div className='other-login'>
            <div className='google-box'><img className='google-img' src='google.svg'></img></div>
            <div className='apple-box'><img className='apple-img' src='apple.svg'></img></div>
        </div>
        <div className='or-text'><h2 className='or_text1'>OR</h2></div>
        <div className="form-box">
            <div className='email-input'><input type='email' placeholder='Email address'></input></div>
            <div className='pass-input'><input type='password' placeholder='Password'></input></div>
        </div>
        <div className="forget-pass"><a href='#'>Forget password?</a></div>
        <div className='login-button'> <button className='login-btn'><a href='#'>Login</a></button></div>
        <div className='sign-up'><p>Dont have account?</p><a href='#'>Sign up</a></div>
  </div>
  </div>
  )
}

export default Login