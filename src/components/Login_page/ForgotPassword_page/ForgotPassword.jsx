import React from 'react';
import "./ForgotPassword.css";

function ForgotPassword() {
  return (
    <div className='whole'>
      <div className='forgot-box'>
        <h2 className='forgot-text'>Forgot Your Password?</h2>
        <p className='forgot-desc'>Enter your email address and we'll send you a link to reset your password.</p>
        <div className='form-box'>
          <div className='email-input'>
            <input type='email' placeholder='Email address' />
          </div>
        </div>
        <div className='send-button'>
          <button className='send-btn'><a href='#'>Send Reset Link</a></button>
        </div>
        <div className='back-to-login'>
          <a href='#'>Back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
