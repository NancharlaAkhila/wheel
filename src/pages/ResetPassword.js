import React, { useState } from 'react';
import axios from 'axios'; // You can use axios for HTTP requests
import '../Styles/ResetPassword.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.includes('@') || !email) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Make API call to send OTP to the email
      const response = await axios.post('/api/send-otp', { email });
      
      if (response.data.success) {
        setOtpSent(true);
        setSuccess('OTP sent to your email.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('Error sending OTP. Please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (otp !== '1234') { // Replace with actual OTP validation
      setError('Invalid OTP.');
      setSuccess('');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccess('');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Make API call to reset password
      const response = await axios.post('/api/reset-password', { email, otp, newPassword });

      if (response.data.success) {
        setSuccess('Password has been successfully reset.');
        setOtpSent(false); // Reset form state after success
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
      setError('Error resetting password. Please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className="reset-password-form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="reset-password-form">
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter OTP"
          />
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default ResetPassword;
