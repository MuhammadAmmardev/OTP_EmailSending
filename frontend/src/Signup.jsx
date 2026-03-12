import React from "react";
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  return (
    <div className="signup-container">
      
      {/* Left Side Background */}
      <div className="signup-left">
      </div>

      {/* Right Side Form */}
      <div className="signup-right">
        <div className="form-box">

          <h2>Create an account</h2>
          <p className="subtitle">Enter your details below to get started.</p>

          <form>

            <label>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter useremail"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
            />

            <button className="signup-btn">
              Sign Up
            </button>

          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <button className="google-btn">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <p className="login-text">
            Already have an account? <a href="#">Login</a>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Signup;