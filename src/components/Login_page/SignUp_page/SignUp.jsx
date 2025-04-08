import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { 
  createUserWithEmailAndPassword, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import "./SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailPasswordSignUp = async () => {
    try {
      if (!email || !password) {
        throw new Error("Email and password must be provided");
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      console.log("User signed up:", userCredential.user);
      navigate("/user-dashboard");
    } catch (error) {
      setErrorMsg(error.message);
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
    <div className="signup-container-unique">
      <div className="signup-box-unique">
        <h2 className="signup-title-unique">Sign Up with</h2>
        <div className="signup-other-options">
          <div className="signup-google-option" onClick={handleGoogleSignUp}>
            <img className="signup-google-icon" src="/google.svg" alt="Google" />
          </div>
        </div>
        <div className="signup-divider">
          <h2 className="signup-divider-text">OR</h2>
        </div>
        <form className="signup-form-unique">
          <div className="signup-input-group-unique">
            <label htmlFor="username" className="signup-label-unique">Username</label>
            <input
              type="text"
              id="username"
              className="signup-input-unique"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMsg("");
              }}
            />
          </div>
          <div className="signup-input-group-unique">
            <label htmlFor="email" className="signup-label-unique">Email</label>
            <input
              type="email"
              id="email"
              className="signup-input-unique"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg("");
              }}
            />
          </div>
          <div className="signup-input-group-unique">
            <label htmlFor="password" className="signup-label-unique">Password</label>
            <input
              type="password"
              id="password"
              className="signup-input-unique"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
            />
          </div>
          {errorMsg && (
            <div
              className="signup-error-message"
              style={{ color: "red", fontSize: "0.875rem", marginTop: "8px", textAlign: "left" }}
            >
              {errorMsg}
            </div>
          )}
          <button type="submit" className="signup-button-unique" onClick={handleEmailPasswordSignUp}>
            Sign Up
          </button>
        </form>
        <p className="signup-footer-unique">
          Already have an account? <Link to="/" className="signup-link-unique">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
