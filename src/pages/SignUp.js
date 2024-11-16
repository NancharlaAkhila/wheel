// components/SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styles/SignUp.css';  // Import the updated CSS

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }
    if (phone.length < 10) {
      setError('Please enter a valid phone number.');
      setSuccess('');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccess('');
      return;
    }

    // Prepare the user data to be sent to the backend
    const userData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      contactNo: phone
    };

    try {
      // Sending POST request to backend API
      const response=await axios.post('http://localhost:8081/api/signup', userData);
      if (response.success)
      {
      setSuccess('Registration successful!');
      setError('');
      }
    } catch (err) {
      // On error, show error message
      setError('An error occurred during registration.');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="form-field">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-field">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter your last name"
          />
        </div>
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
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter your phone number"
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="forgot-password">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
