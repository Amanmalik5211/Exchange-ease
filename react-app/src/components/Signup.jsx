import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const userSignup = async (e) => {
    e.preventDefault();
    console.log({ username, password, email, mobile });

    try {
      let profilePhotoUrl = null;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('photo', selectedFile);

        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        profilePhotoUrl = response.data.photoUrl;
        console.log('File uploaded successfully:', profilePhotoUrl);
      }

      // Proceed with user signup
      const url = 'http://localhost:5000/signup';
      const data = {
        username,
        email,
        password,
        mobile,
        profilePhotoUrl
      };

      const res = await axios.post(url, data);
      console.log(res.data);

      if (res.data.message) {
        alert(res.data.message);
        // if (res.data.message === 'saved user') {
        //   navigate('/');
        // }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup');
    }
  };

  return (
    <>
      <div className="div-form">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername" className="form-label">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="exampleInputUsername" aria-describedby="usernameHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputMobile" className="form-label">Mobile</label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" id="exampleInputMobile" />
          </div>
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit" onClick={userSignup} className="btn btn-primary">SignUp</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
