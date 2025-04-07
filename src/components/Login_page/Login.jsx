import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../firebase-config";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User:", result.user);
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleEmailPasswordSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      setErrorMsg("");
      navigate("/user-dashboard");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setErrorMsg("Wrong password");
      } else if (error.code === "auth/user-not-found") {
        setErrorMsg("No such email exists in the database");
      } else {
        console.error("Sign In Error:", error);
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div className="whole">
      <div className="login-box">
        <h2 className="login-h2">Login in with</h2>
        <div className="login-other-login">
          <div className="login-google-box" onClick={handleGoogleSignIn}>
            <img className="login-google-img" src="/google.svg" alt="Google" />
          </div>
        </div>
        <div className="login-or-text">
          <h2 className="login-or-text">OR</h2>
        </div>
        <div className="login-form-box">
          <div className="login-email-input">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg("");
              }}
            />
          </div>
          <div className="login-pass-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
            />
          </div>
          {errorMsg && (
            <div
              className="error-message"
              style={{ color: "red", fontSize: "0.875rem", marginTop: "8px", textAlign: "left" }}
            >
              {errorMsg}
            </div>
          )}
        </div>
        <div className="login-forget-pass">
          <Link to="/login/forgot-password">Forget password?</Link>
        </div>
        <div className="login-login-button">
          <button className="login-login-btn" onClick={handleEmailPasswordSignIn}>
            Login
          </button>
        </div>
        <div className="login-sign-up">
          <p>Dont have account?</p>
          <Link to="/login/sign-up">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;