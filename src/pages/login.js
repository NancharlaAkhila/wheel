// components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/login.css';  // Import the updated CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccess('');
      return;
    }

    // Prepare the login data to be sent to the backend
    const loginData = {
      email: email,
      password: password
    };

    try {
      // Sending POST request to backend API
      const response=await axios.post('http://localhost/:8081/signin', loginData); // Remove response variable
  
      if (response.success)
      {
      setSuccess('Registration successful!');
      setError('');
      }
    } catch (err) {
      // On error, show error message
      setError('password or email id is incorrect.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="forgot-password">
        <p>Forgot your password? <Link to="/ResetPassword">Reset</Link></p>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
