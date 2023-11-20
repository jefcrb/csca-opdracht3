import React, { useState, useEffect } from 'react';
import AuthService from './AuthService';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Callback from './Callback';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [user, setUser] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
    password: '',
    email: ''
  });

  useEffect(() => {
    AuthService.getUser().then((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        console.log(user)
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  }, []);

  const handleLogin = () => {
    AuthService.signinRedirect();
  };

  const handleLogout = () => {
    AuthService.signoutRedirect().then(() => {
      setIsAuthenticated(false);
      setUser(null);
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationInfo({ ...registrationInfo, [name]: value });
  };

  const handleRegistration = async () => {
    // Here you would call your back-end API or OIDC provider's user management API to create the user.
    // This is where you would implement `registerUser`.
    try {
      const response = await registerUser(registrationInfo);
      // Handle success - perhaps auto-log in the user or show a success message
    } catch (error) {
      // Handle errors (e.g., user already exists, server error)
    }
  };

  const accessApi = async () => {
    if (user && user.id_token) {
      try {
        const response = await fetch('http://localhost:5000/api', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + user.id_token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setApiResponse(data?.message);
        console.log(data);
        // Handle the response data
      } catch (error) {
        console.error('Error accessing the API:', error);
      }
    } else {
      console.log('No access token available');
    }
  };

  return (
    <BrowserRouter>
      <div>
        {!isAuthenticated ? (
          <>
            <button onClick={() => setShowRegistration(true)}>Register</button>
            <button onClick={handleLogin}>Log In</button>
          </>
        ) : (
          <>
            <p>Welcome, {user ? user.profile.sub : 'unknown'}!</p>
            <button onClick={handleLogout}>Log Out</button>
          </>
        )}

        {showRegistration && (
          <div>
            <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
            <button onClick={handleRegistration}>Register</button>
          </div>
        )}

        <div>
          <p>{user ? 'Access token: ' + user.access_token : 'No access token'}</p>
          <p>{user ? 'ID token: ' + user.id_token : 'No ID token'}</p>
        </div>

        <button onClick={accessApi}>Access API</button>
        <p>{apiResponse}</p>

        <Routes>
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

async function registerUser(registrationDetails) {
  // Implement the function to send the registration details to your back-end or OIDC provider
  // Return the response from the API
}
