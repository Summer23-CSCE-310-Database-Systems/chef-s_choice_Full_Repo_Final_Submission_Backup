import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const backendURL = 'http://localhost:80/backend/user_api';

function Login() {
  const [users, setUsers] = useState([]);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const { uid, setUid } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(backendURL).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Adding user...');
    const existingUser = users.find(user => user.fname === fname && user.lname === lname);
    if (existingUser) {
      setUid(existingUser.uid);
      setFName(existingUser.fname);
      setLName(existingUser.lname);
      localStorage.setItem('uid', uid);
      localStorage.setItem('userName', `${existingUser.fname} ${existingUser.lname}`);
    } else {
      try {
        const response = await axios.post(backendURL, {
          fname: fname,
          lname: lname,
        });
        console.log('User added successfully:', response.data);
        setUid(response.data.uid);
        setUsers([...users, response.data]);
        setFName('');
        setLName('');
        localStorage.setItem('uid', uid);
        localStorage.setItem('userName', `${response.data.fname} ${response.data.lname}`);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
    navigate('/');
  };

  const handleLogout = () => {
    setUid(null);
    navigate('/');
  };

  useEffect(() => {
    if (uid) {
      const user = users.find(user => user.uid === uid);
      if (user) {
        localStorage.setItem('uid', uid);
        localStorage.setItem('userName', `${user.fname} ${user.lname}`);
      }
    } else {
      localStorage.removeItem('uid');
      localStorage.removeItem('userName');
    }
  }, [uid, users]);

  return (
    <div className="login-container">
      {uid ? (
        <div>
          <h1>Welcome User {uid}: {localStorage.getItem('userName')}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
