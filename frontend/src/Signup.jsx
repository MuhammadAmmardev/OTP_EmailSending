import React from "react";
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import VerifyEmail from './VerifyOTP'



function Signup() {

   const [formState,setFormState]=useState({
    username:"",
    email:"",
    password:""
   })

  const [showOTP, setShowOTP] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading,setLoading]=useState(false);


  const handleChange =(e)=>{
     setFormState({
      ...formState,
      [e.target.name]:e.target.value
     })

  }
  
  const handleSubmit = async (e) =>{
   e.preventDefault();
   setLoading(true);
   const resp= await fetch('http://localhost:3000/register',{
    method:"POST",
    headers:{
      'content-Type':"application/json"
    },
    body: JSON.stringify(formState)
   })

   const response=await resp.json();
   console.log(response.message)


   setUserData(formState);
   setLoading(false)
   setShowOTP(true);


   setFormState({
    username:"",
    email: "",
    password:""
  });



  }

  
  if(showOTP){
    return <VerifyEmail userData={userData} />
   }


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

          <form onSubmit={handleSubmit}>

            <label>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter useremail"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />

            <button className="signup-btn"  >
             {loading ? "Sign Up...":"Sign Up"} 
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