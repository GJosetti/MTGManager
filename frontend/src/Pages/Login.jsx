import React from 'react';
import LoginForm from '../Components/LoginForm.jsx';
import '../Style/LoginStyle.css';

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-card">
                <header className="login-header">
                    <h1>MTG Manager</h1>
                    <p>Store Owner Portal</p>
                </header>

                <LoginForm />


                <footer className="login-footer">
                    <a href="/forgot-password" title="Recuperar acesso" className="forgot-password-link">
                        Esqueceu sua senha?
                    </a>
                </footer>

            </div>
        </div>
    );
};

export default LoginPage;