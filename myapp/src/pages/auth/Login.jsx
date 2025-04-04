import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Login = ({ login, auth, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password })
      //.then(() => {
        navigate('/chat');
      
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {auth.error && <div className="error-message">{auth.error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={auth.loading}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={auth.loading}
        />
        <button 
          type="submit" 
          disabled={auth.loading}
        >
          {auth.loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      
      <p>
        Não tem uma conta?{' '}
        <button 
          type="button" 
          onClick={onSwitchToRegister} 
          className="switch-button"
          disabled={auth.loading}
        >
          Cadastre-se
        </button>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.App.auth
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch({ type: "LOGIN_REQUEST", payload: credentials })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);