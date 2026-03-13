import React, { useState } from "react";

const VerifyEmail = () => {
  
  const [otp,setOTP]= useState(new Array(6).fill(""));

  const handleChange =(e,index)=>{
    const value=e.target.value
    if(/^\d*$/.test(value)){
      const newOtp=[...otp];
      newOtp[index]=value
      setOTP(newOtp)
    }

    if(value && index < 5 ){
      document.getElementById(`otp-${index+1}`).focus();
    }
  }

  const handleOTP =async () =>{
    const otpString=otp.join("");
    const res=await fetch('http://localhost:3000/verify-otp',{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        otp:otpString
      })
    })
    const data = await res.json();
    console.log(data);
    alert(data.message);
  }
  
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconBox}>
          ✉️
        </div>

        <h2 style={styles.title}>Verify Your Email</h2>

        <p style={styles.subtitle}>
          A 6-digit verification code has been sent to your email.
        </p>

        <div style={styles.otpContainer}>
          {
            otp.map((value,index)=>(
              <input 
                key={index}
                id={`otp-${index}`}
                maxLength='1'
                value={value}
                type="text"
                onChange={(e)=>handleChange(e,index)}
                style={styles.otpInput}
              />
            ))
          }

        </div>

        <button   onClick={handleOTP} style={styles.verifyBtn}>
          Verify Code
        </button>

        <p style={styles.resendText}>
          Didn't receive the code?{" "}
          <span style={styles.resendLink}>Resend OTP</span>
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