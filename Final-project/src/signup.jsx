import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import './signup.css';

// Para sa pag-store ng form data
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) newErrors.email = 'Please enter your UserID.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email.';
    if (!formData.password) newErrors.password = 'Please enter your password.';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        });

        //pag valid at sucessful ung pag create automatic sa direct login.
        const data = await response.json();
        if (response.ok) {
          navigate('/login'); 
        } else {
          alert(data.message || data.error);
        }
      } catch (error) {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  //Frontend
  return (
    <div className="signup-container">
      <div className="signup-left"></div>
      <div className="signup-right">
        <div className="company-name-box">
          <h1 className="company-title">L-JEAN TRADING</h1>
          <p className="slogan">Construction and Supply</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <label>Full Name</label>
          <div className="input-icon">
            <FaUser className="icon" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'input-error' : ''}
            />
          </div>
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}

          <label>UserID</label>
          <div className="input-icon">
            <FaEnvelope className="icon" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your userID"
              className={errors.email ? 'input-error' : ''}
            />
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}

          <div className="password-row">
            <div>
              <label>Password</label>
              <div className="input-icon">
                <FaLock className="icon" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'input-error' : ''}
                />
              </div>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div>
              <label>Confirm Password</label>
              <div className="input-icon">
                <FaLock className="icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
              </div>
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button type="submit">Sign Up</button>

          <p className="login-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
