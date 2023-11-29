import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  return (
    <div className="app">
      {token && (
        <div>
          <h1>Bem-vindo!</h1>
          <button onClick={() => setToken('')}>Logout</button>
        </div>
      )}
      {!token && <LoginPage />}
    </div>
  );
};

export default App;
