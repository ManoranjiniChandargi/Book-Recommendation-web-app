import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [storedEmail, setStoredEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [storedAge, setStoredAge] = useState("");

  const styles = {
    loginContainer: {
      width: "100%",
      maxWidth: "400px",
      margin: "50px auto",
      padding: "24px",
      border: "1px solid #007d9354",
      borderRadius: "24px",
      backgroundColor: "white",
      boxSizing: "border-box",
    },
    heading: {
      fontSize: "2.2em",
      lineHeight: "1.1",
      textAlign: "center",
      marginBottom: "24px",
      color: "#213547",
    },
    inputGroup: {
      marginBottom: "10px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      color: "#555",
      fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    input: {
      width: "100%",
      height: "30px",
      marginBottom: "10px",
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    button: {
      width: "100%",
      height: "40px",
      backgroundColor: "#005564",
      color: "white",
      border: "0",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      textTransform: "uppercase",
      fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    errorMessage: {
      color: "red",
      fontSize: "14px",
      textAlign: "center",
      marginTop: "10px",
    },
    toggleLink: {
      textAlign: "center",
      fontSize: "14px",
      marginTop: "20px",
      cursor: "pointer",
      color: "#007d93",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (email && age && password) {
        setStoredEmail(email);
        setStoredAge(age); // Save age during sign-up
        setStoredPassword(password);
        alert("Sign Up successful");

        // Reset form fields after sign-up
        setEmail("");
        setAge("");
        setPassword("");

        // Switch to Sign In form after successful sign-up
        setIsSignUp(false);
      } else {
        setError("Please fill in all fields.");
      }
    } else {
      if (email === storedEmail && password === storedPassword) {
        alert("Login successful");
        onLogin(Number(storedAge)); // Ensure age is passed as a number
        setEmail("");
        setAge("");
        setPassword("");
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.heading}>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {isSignUp && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={styles.input}
            />
          </div>
        )}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <button type="submit" style={styles.button}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p
        style={styles.toggleLink}
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default LoginPage;
