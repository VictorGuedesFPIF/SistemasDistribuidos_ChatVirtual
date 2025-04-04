import React from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Register = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redireciona diretamente para o chat
    navigate('/chat');
  };

  return (
    <div className="auth-form">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome completo"
          // Removidos os estados e onChange pois não serão usados
        />
        <input
          type="email"
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Senha"
        />
        <input
          type="password"
          placeholder="Confirme a senha"
        />
        <button 
          type="submit"
          className="register-button" // Adicionei uma classe para estilização
        >
          Cadastrar e Ir para o Chat
        </button>
      </form>
      <p>
        Já tem uma conta?{' '}
        <button 
          type="button" 
          onClick={onSwitchToLogin} 
          className="switch-button"
        >
          Faça login
        </button>
      </p>
    </div>
  );
};

export default Register;