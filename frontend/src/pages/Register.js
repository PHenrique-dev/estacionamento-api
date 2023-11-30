import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password,
        confirmPassword,
      });

      console.log('Registro bem-sucedido:', response.data);

      // Aqui você pode redirecionar o usuário ou executar ações adicionais após o registro.
    } catch (error) {
      console.error('Erro no registro:', error.response.data.msg);
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="register-container">
      <h1>Página de Registro</h1>
      <form onSubmit={handleRegister}>
        <label>Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
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
        <label>Confirme a Senha:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Registrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register
