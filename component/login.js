
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { Paper } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const handleLogin = async () => {
    if (!email || !password) {
        console.error('Please fill in all required fields');
        toast.error('Please fill in all required fields');
        return;
      }
    try {
      const response = await axios.post('http://localhost:9090/auth/signin', {
        email: email,
        password: password,
      });

      const { token } = response.data;

      // Store the token in local storage or a secure storage method
      localStorage.setItem('token', token);

      // Redirect or perform any necessary actions after successful login
      console.log('Login successful');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };
  const handleSignup = () => {
    // Navigate to the signup page
    navigate('/signup');
  };

  return (
    <Paper>
        <div>
      <h1>Login</h1>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
      <ToastContainer/>
    </div>
    </Paper>
    
  );
};

export default Login;
