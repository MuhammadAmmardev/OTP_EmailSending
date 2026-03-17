import React, { useState, useRef, useEffect } from "react";
import Home from "./Home";
import Signup from './Signup'

const VerifyEmail = (props) => {

  const [otp, setOTP] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const [displayError, setDisplayError] = useState();
  const [page, setPage] = useState("verify"); 
  const [loading,setLoading]=useState(false);

  const [timeLeft, setTimeLeft] = useState(60); // start from 60 seconds

  useEffect(() => {
    if (timeLeft === 0){
      setPage("signup");
    } // stop when timer reaches 0

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // cleanup interval on unmount
  }, [timeLeft]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);


  const handleChange = (e, index) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value
      setOTP(newOtp)
    }

    if (value && index < 5) {

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  }


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleOTP = async () => {
    const otpString = otp.join("");
    setLoading(true);

    const res = await fetch('http://localhost:3000/verify-otp', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        otp: otpString,
        userData: props.userData,

      })

    })
   

    const data = await res.json();
    if (res.status !== 200) {
      // ✅ delay error display so "Verifying..." shows first
      setTimeout(() => {
        setLoading(false);
        setDisplayError(data.message);
        setTimeout(() => setDisplayError(), 2000); // hide error after 2s
      }, 2000); // 0.8s delay
    } else {
      setTimeout(()=>{
        setLoading(false);
        setPage("home");
      },2000)
      
    }
  }

  const resendOTP = async() =>{
    
    const response=await fetch('http://localhost:3000/register',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        username:props.userData.username,
        email:props.userData.email,
        password:props.userData.password
      })
    })
    const resp=await response.json();
    console.log(resp.message)
  }


  
  if (page === "signup") {
    return <Signup />;
  }

  if (page === "home") {
    return <Home />;
  }

  return (
    <div style={styles.page}>
    

      <div style={styles.card}>
        <div>
          <p>
            <span style={{ color: "black" }}>OTP expires in: </span>
            <span style={{ color: "red"  }}>
              {timeLeft}s
            </span>
          </p>
        </div>
        <div style={styles.iconBox}>
          ✉️
        </div>

        <h2 style={styles.title}>Verify Your Email</h2>

        <p style={styles.subtitle}>
          A 6-digit verification code has been sent to your email.
        </p>

        <div style={styles.otpContainer}>
          {
            otp.map((value, index) => (
              <input
                key={index}
                ref={(inputElement) => {
                  inputsRef.current[index] = inputElement; // store this input in the array
                }}
                id={`otp-${index}`}
                maxLength='1'
                value={value}
                type="text"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => {
                  const paste = e.clipboardData.getData("text").slice(0, 6);
                  if (/^\d+$/.test(paste)) setOTP(paste.split(""));
                }}
                style={styles.otpInput}
              />
            ))
          }

        </div>

        {
          displayError ? <p style={{ color: 'red', fontSize: '16px' }}>{displayError}</p> : null
        }

        <button onClick={handleOTP} style={styles.verifyBtn} disabled={loading}>
        {loading ? "Verify Code...": "Verify Code"}
        </button>

        <p style={styles.resendText}>
          Didn't receive the code?{" "}
          <span style={styles.resendLink} onClick={()=>resendOTP()}>Resend OTP</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  iconBox: {
    fontSize: "28px",
    marginBottom: "15px",
  },

  title: {
    margin: "10px 0",
  },

  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "25px",
  },

  otpContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  otpInput: {
    width: "40px",
    height: "45px",
    textAlign: "center",
    fontSize: "18px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
  },


  verifyBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },


  resendText: {
    marginTop: "15px",
    fontSize: "13px",
    color: "#777",
  },

  resendLink: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "500",
  },

};

export default VerifyEmail;