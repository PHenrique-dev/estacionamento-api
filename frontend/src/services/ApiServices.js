import axios from 'axios';
import React, { useState, useEffect } from 'react';
const instance = axios.create({
  baseURL: 'http://localhost:3000/api', 
});
const getUsers = async () => {
    try {
      const response = await instance.get('/users');
      const users = response.data;
      console.log(users);
    } catch (error) {
      console.error(error);
    }
  };
  const register = async (user) => {
    try {
      const response = await instance.post('/auth/register', user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const login = async (email, password) => {
    try {
      const response = await instance.post('/auth/user', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Logado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  };
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const checkToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token' });
    }
  };
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
        const response = await axios.get('/auth/user', { headers: { Authorization: `Bearer ${token}` } });
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
            <h1>Login ou registro</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              login(e.target.email.value, e.target.password.value);
            }}>
              <input type="email" name="email" placeholder="Endereço de email" />
              <input type="password" name="password" placeholder="Senha" />
              <button type="submit">Login</button>
            </form>
            <p>Não tem conta? <a href="#">Registre-se</a></p>
          </div>
        )}
      </div>
    );
  };
  
  export default App;
  
