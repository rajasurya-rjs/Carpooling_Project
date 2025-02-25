import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import "../ForgotPassword_page/ForgotPassword.css";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
    
      if (!email || !password) {
        throw new Error("Email and password must be provided");
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   
      await updateProfile(userCredential.user, { displayName: username });
      console.log("User signed up:", userCredential.user);
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Sign Up Error:", error.message);

    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign Up User:", result.user);
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Google Sign Up Error:", error);
   
    }
  };

  return (
    <div className="whole">
      <div className="forgot-box">
        <h2 className="forgot-text">Sign Up</h2>
        <p className="forgot-desc">Create a new account</p>
        <div className="form-box">
        
          <div className="email-input">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="email-input">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pass-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="send-button">
          <button className="send-btn" onClick={handleSignUp}>Sign Up</button>
        </div>
      
        <div className="google-box" onClick={handleGoogleSignUp} style={{ cursor: "pointer", marginTop: "1rem" }}>
          <img className="google-img" src="/google.svg" alt="Google" />
          {/* <span>Sign Up with Google</span> */}
        </div>
        <div className="back-to-login">
          <Link to="/">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
