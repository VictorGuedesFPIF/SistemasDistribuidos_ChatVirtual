import React from 'react';
import LogoVirtualChat from '../../images/logoVirtualChat3.png'; // Caminho corrigido
import './authLayout.css';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="auth-header">
                <img src={LogoVirtualChat} alt="Logo Chat Virtual" className="auth-logo" />
                <h1 className="auth-title">Chat Virtual</h1>
            </div>
            <div className="auth-content">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;