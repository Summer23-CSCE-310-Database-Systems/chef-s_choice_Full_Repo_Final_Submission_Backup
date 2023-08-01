import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use the absolute URL of the backend server
const backendURL = 'http://localhost:80/backend/api/recipe';

function Login() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here, i.e., send user ID to the server for authentication
    // For this example, we will just navigate to the Recipe page with the user ID as a parameter
    // navigate(`/Recipe/${userId}`);
    navigate(`/Recipe`)
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <textarea
        className="user-id-input"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleLogin} className="login-button"> Submit </button>
    </div>
  );
}

export default Login;