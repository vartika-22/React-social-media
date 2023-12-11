// Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const handleSignup = async () => {

    if (!firstName || !lastName || !email || !password) {
      console.error('Please fill in all required fields');
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      const response = await axios.post('http://localhost:9090/auth/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      console.log(response.data); // You can handle the response as needed, e.g., show a success message or redirect to the login page
    } catch (error) {
      console.error('Signup failed:', error.response.data);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleLogin = () => {
    // Navigate to the signup page
    navigate('/signin');
  };

  return (
    <div>
      <h1>Signup</h1>
      <label>First Name:</label>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}  required/>
      <br />
      <label>Last Name:</label>
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
      <br />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <br />
      <button onClick={handleSignup}>Signup</button>
      <br></br>
      <button onClick={handleLogin}>Login</button>
      <ToastContainer />
    </div>
    
  );
};

export default Signup;
