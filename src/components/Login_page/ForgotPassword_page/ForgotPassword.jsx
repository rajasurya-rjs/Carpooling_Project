import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ForgotPassword.css";
import { auth } from "../../../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
    } catch (error) {
      console.error("Reset password error:", error);
      // ...handle error...
    }
  };

  return (
    <div className='whole'>
      <div className='forgot-box'>
        <h2 className='forgot-text'>Forgot Your Password?</h2>
        <p className='forgot-desc'>Enter your email address and we'll send you a link to reset your password.</p>
        <div className='form-box'>
          <div className='email-input'>
            <input
              type='email'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className='send-button'>
          <button className='send-btn' onClick={handleResetPassword}>Send Reset Link</button>
        </div>
        <div className='back-to-login'>
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
