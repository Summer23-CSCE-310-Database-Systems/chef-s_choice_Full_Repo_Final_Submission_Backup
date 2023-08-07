import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

// URL for the backend API
const backendURL = 'http://localhost:80/backend/user_api';

// Login component
function Login() {
  // State variables
  const [users, setUsers] = useState([]); // Store user data from backend
  const [fname, setFName] = useState(''); // First name input field value
  const [lname, setLName] = useState(''); // Last name input field value
  const { uid, setUid } = useUser(); // User ID state from UserContext
  const navigate = useNavigate(); // Navigation function

  // Fetch user data from the backend on component mount
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      setUsers(response.data);
    });
  }, []);

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Adding user...');

    // Check if the user exists in the users array
    const existingUser = users.find(user => user.fname === fname && user.lname === lname);

    if (existingUser) {
      // If user exists, set user data and store in local storage
      setUid(existingUser.uid);
      setFName(existingUser.fname);
      setLName(existingUser.lname);
      localStorage.setItem('uid', uid); // This line should use `existingUser.uid`
      localStorage.setItem('userName', `${existingUser.fname} ${existingUser.lname}`);
    } else {
      try {
        // If user doesn't exist, add user to the backend and update state
        const response = await axios.post(backendURL, {
          fname: fname,
          lname: lname,
        });
        console.log('User added successfully:', response.data);
        setUid(response.data.uid);
        setUsers([...users, response.data]);
        setFName('');
        setLName('');
        localStorage.setItem('uid', uid); // This line should use `response.data.uid`
        localStorage.setItem('userName', `${response.data.fname} ${response.data.lname}`);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }

    // Navigate to the home page
    navigate('/');
  };

  // Handle user logout
  const handleLogout = () => {
    setUid(null);
    navigate('/');
  };

  // Update local storage when user ID or users array changes
  useEffect(() => {
    if (uid) {
      const user = users.find(user => user.uid === uid);
      if (user) {
        localStorage.setItem('uid', uid); // This line should use `user.uid`
        localStorage.setItem('userName', `${user.fname} ${user.lname}`);
      }
    } else {
      localStorage.removeItem('uid');
      localStorage.removeItem('userName');
    }
  }, [uid, users]);

  // Render the login form and user information
  return (
    <div className="login-container">
      {uid ? (
        <div>
          {/* Display welcome message and logout button */}
          <h1>Welcome User {uid}: {localStorage.getItem('userName')}!</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      ) : (
        <div>
          {/* Display login form */}
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              className="text-box"
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
            />
            <input
              className="text-box"
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
            />
          </form>
          <button onClick={handleLogin} className="login-button">Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
