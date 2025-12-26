import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import logo2 from './logo2.png';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const url = 'http://localhost:5000/signup';
    const data = { username, email, password, mobile };

    axios.post(url, data)
      .then((res) => {
        if (res.data.message === 'saved user') {
          navigate("/login");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Server error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='signup-page'>
      <div className='signup-container'>
        
        {/* Brand Section */}
        <div className='signup-brand'>
          <img src={logo2} alt="Exchange Ease Logo" />
          <h1 className='signup-brand-title'>Exchange Ease</h1>
          <p className='signup-brand-subtitle'>Your Marketplace, Simplified</p>
          
          <div className='signup-features'>
            <div className='signup-feature'>
              <span className='signup-feature-icon'>🛒</span>
              <span>Buy & sell products locally</span>
            </div>
            <div className='signup-feature'>
              <span className='signup-feature-icon'>💬</span>
              <span>Chat directly with sellers</span>
            </div>
           
          </div>
        </div>

        {/* Signup Card */}
        <div className='signup-card'>
          <div className='signup-card-header'>
            <h2 className='signup-card-title'>Create Account</h2>
          </div>

          <form onSubmit={userSignup}>
            <div className='signup-form-row'>
              <div className='signup-form-group'>
                <label className='signup-label'>Username</label>
                <div className='signup-input-wrapper'>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='signup-input'
                    placeholder='Your name'
                    required
                  />
                  <span className='signup-input-icon'>👤</span>
                </div>
              </div>

              <div className='signup-form-group'>
                <label className='signup-label'>Mobile</label>
                <div className='signup-input-wrapper'>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className='signup-input'
                    placeholder='Phone number'
                    required
                  />
                  <span className='signup-input-icon'>📱</span>
                </div>
              </div>
            </div>

            <div className='signup-form-group'>
              <label className='signup-label'>Email Address</label>
              <div className='signup-input-wrapper'>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='signup-input'
                  placeholder='Enter your email'
                  required
                />
                <span className='signup-input-icon'>✉</span>
              </div>
            </div>

            <div className='signup-form-group'>
              <label className='signup-label'>Password</label>
              <div className='signup-input-wrapper'>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='signup-input'
                  placeholder='Create a password'
                  required
                />
                <span className='signup-input-icon'>🔒</span>
              </div>
            </div>

            <button type="submit" className='signup-btn' disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className='signup-footer'>
            <p className='signup-footer-text'>Already have an account?</p>
            <Link to='/login' className='signup-footer-link'>Sign In</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
