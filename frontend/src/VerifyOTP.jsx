import React from "react";

const VerifyEmail = () => {
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
          <input type="text" maxLength="1" style={styles.otpInput} />
          <input type="text" maxLength="1" style={styles.otpInput} />
          <input type="text" maxLength="1" style={styles.otpInput} />
          <input type="text" maxLength="1" style={styles.otpInput} />
          <input type="text" maxLength="1" style={styles.otpInput} />
          <input type="text" maxLength="1" style={styles.otpInput} />
        </div>

        <button style={styles.verifyBtn}>
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