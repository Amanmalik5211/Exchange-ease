import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css';
import logo2 from './logo2.png'
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const url = 'http://localhost:5000/login';
    const data = { email, password };

    axios.post(url, data)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('userName', res.data.username);
          navigate("/");
        } else if (res.data.message) {
          alert(res.data.message);
        } else {
          alert("Unexpected response from server.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Server error, please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        
        {/* Brand Section */}
        <div className='login-brand'>
          <img src={logo2} alt="Exchange Ease Logo" />
          <h1 className='login-brand-title'>Exchange Ease</h1>
          <p className='login-brand-subtitle'>Buy & Sell with Ease</p>
        </div>

        {/* Login Card */}
        <div className='login-card'>
          <div className='login-card-header'>
            <h2 className='login-card-title'>Welcome Back</h2>
            <p className='login-card-desc'>Sign in to continue to your account</p>
          </div>

          <form onSubmit={userLogin}>
            <div className='login-form-group'>
              <label className='login-label'>Email Address</label>
              <div className='login-input-wrapper'>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='login-input'
                  placeholder='Enter your email'
                  required
                />
                <span className='login-input-icon'>✉</span>
              </div>
            </div>

            <div className='login-form-group'>
              <label className='login-label'>Password</label>
              <div className='login-input-wrapper'>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='login-input'
                  placeholder='Enter your password'
                  required
                />
                <span className='login-input-icon'>🔒</span>
              </div>
            </div>

            <button type="submit" className='login-btn' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className='login-footer'>
            <p className='login-footer-text'>Don't have an account?</p>
            <Link to='/signup' className='login-footer-link'>Create Account</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
