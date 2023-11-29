import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/user', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (user) => {
    try {
      const response = await axios.post('/auth/register', user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
      const token = localStorage.getItem('token');
      const response =  axios.get('/auth/user', { headers: { Authorization: `Bearer ${token}` } });
      setUser(response.data);
    }
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <div>
          <h1>Usuário logado</h1>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <h1>Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            login(e.target.email.value, e.target.password.value);
          }}>
            <input type="email" name="email" placeholder="Endereço de email" />
            <input type="password" name="password" placeholder="Senha" />
            <button type="submit" href="#">Login</button>
          </form>
          <p>Não tem conta? <a href="/auth/register">Registre-se</a></p>
        </div>
      )}
    </div>
  );
};

export default App;
