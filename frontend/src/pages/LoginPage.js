import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/user', {
        email,
        password,
      });

      console.log('Login successful:', response.data);

      // Aqui você pode direcionar o usuário ou executar ações adicionais após o login
    } catch (error) {
      console.error('Erro no login:', error.response.data.msg);
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h1>Página de Login</h1>
        <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Entrar</button>
        <p>
          Não tem conta?{' '}
          <a href="/register">Registre-se</a>
        </p>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
