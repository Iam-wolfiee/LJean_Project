import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Validation para sa login form
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Please enter your UserID.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email.';
    if (!password) newErrors.password = 'Please enter your password.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  HTTP request para sa login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        // Check kung anong role ng user at i-redirect
        const data = await response.json();
        if (response.ok) {
          const userRole = data.user.role;
          if (userRole === 'owner') navigate('/owner');
          else if (userRole === 'manager') navigate('/manager');
          else if (userRole === 'staff') navigate('/staff');
          else if (userRole === 'sales') navigate('/sales');
          else navigate('/guest');
        } else {
          alert(data.message || data.error); // Error galing sa backend
        }
      } catch (error) {
        alert('Something went wrong. Please try again.'); // Error sa connection or server
      }
    }
  };

  //Frontend
  return (
    <div className="login-container">
      <div className="login-left"></div>
      <div className="login-right">
        <div className="company-name-box">
          <h1>L-JEAN TRADING</h1>
          <p className="slogan">Construction and Supply</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="userid">UserID</label>
          <div className="input-icon">
            <FaUser className="icon" />
            <input
              type="email"
              id="userid"
              placeholder="Enter your userID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''}
            />
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <div className="input-icon">
            <FaLock className="icon" />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
            />
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}

          <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>

          <button type="submit" className="login-btn">Login</button>

          <p className="signup-text">
            Don’t have an account? <Link to="/" className="signup-text-link">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
