import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, CodeXml } from 'lucide-react';
import '../Style/Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        emailOrUser: '',
        password: '',
        rememberMe: false
    });

    const img = "blob:https://4eh9iapa8uin0qhigaqiupgdyhj9chvjiljnh1peg4fp8zdy8t-h861731785.scf.usercontent.goog/1ac35545-b1d3-4940-8cd0-af662086db6f";

    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados de Login:', formData);
        // Aqui você adicionaria a lógica de chamada ao seu backend Spring Boot
    };

    return (
        <div className="login-container">
            {/* --- Painel Esquerdo (Visual e Texto) --- */}
            <div className="login-left-panel">
                <div className="panel-content" >
                    <div className="logo-box">
                        <div style={{ fontSize: '24px' }}>👑</div>
                    </div>

                    <h1>MTGManager</h1>
                    <h3 className="subtitle">GERENCIAMENTO PROFISSIONAL</h3>

                    <p className="description">
                        Organize seu estoque, gerencie pedidos e domine o mercado de Magic: The Gathering com nossa plataforma exclusiva para lojistas.
                    </p>
                </div>
            </div>

            {/* --- Painel Direito (Formulário de Login) --- */}
            <div className="login-right-panel">
                <div className="form-header">
                    <h2>Bem-vindo de volta!</h2>
                    <p>Insira suas credenciais para acessar o painel.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Campo de Email ou Usuário */}
                    <div className="input-group">
                        <label htmlFor="emailOrUser">EMAIL OU USUÁRIO</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                id="emailOrUser"
                                name="emailOrUser"
                                className="form-input"
                                placeholder="ex: lojista@mtgmanager.com.br"
                                value={formData.emailOrUser}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Campo de Senha */}
                    <div className="input-group">
                        <div className="label-with-link">
                            <label htmlFor="password">SENHA</label>
                            <a href="#" className="forgot-password-link">Esqueceu a senha?</a>
                        </div>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password-btn"
                                onClick={togglePassword}
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                    </div>

                    {/* Checkbox Lembrar dispositivo */}
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <label htmlFor="rememberMe">Lembrar deste dispositivo</label>
                    </div>

                    {/* Botão de Login */}
                    <button type="submit" className="btn-login">
                        Entrar no Sistema
                    </button>

                    {/* Link de Cadastro */}
                    <div className="register-link">
                        Ainda não é parceiro? <a href="/registro">Cadastre sua loja</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;