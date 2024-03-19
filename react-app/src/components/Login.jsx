import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Header from './Header'
import './Login.css';
import axios from 'axios';
function Login() {
  const navigate = useNavigate();
  const[password,setPassword] = useState('');
  const[email,setEmail] = useState('');
  // const[username,setUsername] = useState('');
const userLogin = (e)=>{
  e.preventDefault();
  console.log({email,password});
  const url = 'http://localhost:5000/login';
  const data = {email,password};
  axios.post(url,data)
  .then((res) => {
    console.log(res);
    if (res.data.message) {
      alert(res.data.message);
      console.log(res.data.token);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        
        navigate("/")
      }
    }
    else{
      console.log("no problem")
    }
  })
  .catch((err)=>{
    console.log(err)
    alert('server error...........');
  })
}

  return (
    <>
    <Header/>
    <div className='div-form'>
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  className="form-control" id="exampleInputPassword1"/>
      </div>
      <button type="submit" onClick={userLogin} className="btn btn-primary">Login</button>
      <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '20px' }}>
        <p>Do not have account?</p>
        <Link to='/signup'>Signup</Link>
      </div>
    </form>
    </div>
    </>
  )
}

export default Login
