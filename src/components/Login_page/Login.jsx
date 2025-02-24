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
        <h2 className="login-text">Login in with</h2>
        <div className="other-login">
          <div className="google-box" onClick={handleGoogleSignIn}>
            <img className="google-img" src="/google.svg" alt="Google" />
          </div>
        </div>
        <div className="or-text">
          <h2 className="or_text1">OR</h2>
        </div>
        <div className="form-box">
          <div className="email-input">
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
          <div className="pass-input">
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
            <div className="error-message" style={{ color: "red", fontSize: "0.875rem", marginTop: "8px", textAlign: "left" }}>
              {errorMsg}
            </div>
          )}
        </div>
        <div className="forget-pass">
          <Link to="/login/forgot-password">Forget password?</Link>
        </div>
        <div className="login-button">
          <button className="login-btn" onClick={handleEmailPasswordSignIn}>
            Login
          </button>
        </div>
        <div className="sign-up">
          <p>Dont have account?</p>
          <Link to="/login/sign-up">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
