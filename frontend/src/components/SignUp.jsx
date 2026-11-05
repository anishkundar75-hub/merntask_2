import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      setSuccessMessage(data.message || 'Account created successfully!');
      setFormData({ email: '', password: '' });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-card">
      <h1 className="signup-title">Create Account</h1>

      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        {/* Email Input */}
        <div className="input-group">
          <span className="input-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aab4be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="card-input"
            required
            autoComplete="email"
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <span className="input-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aab4be" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="card-input"
            required
            autoComplete="new-password"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="signup-submit-btn" disabled={loading}>
          {loading ? 'SIGNING UP...' : 'SIGN UP'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
