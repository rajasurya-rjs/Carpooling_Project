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
    }
  };

  return (
    <div className='whole'>
      <div className="forgot-password-box">
        <h2 className="forgot-password-text">Forgot Your Password?</h2>
        <p className="forgot-password-desc">Enter your email address and we'll send you a link to reset your password.</p>
        <div className="forgot-password-form-box">
          <div className="forgot-password-email-input">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="forgot-password-send-button">
          <button className="forgot-password-send-btn" onClick={handleResetPassword}>Send Reset Link</button>
        </div>
        <div className="forgot-password-back-to-login">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
