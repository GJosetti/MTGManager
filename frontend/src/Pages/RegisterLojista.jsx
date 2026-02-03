import React, { useState } from 'react';
import { User, Store, Mail, Lock, Eye, EyeOff, Package, TrendingUp, ShieldCheck, Database } from 'lucide-react';
import '../Style/Registe.css';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        loja: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    return (
        <div className="register-container">

            <div className="left-panel">
                <div className="illustration-content">

                    <div style={{ marginBottom: '20px' }}>

                        <div style={{ width: 50, height: 50, background: '#8b5cf6', margin: '0 auto', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            📖
                        </div>
                    </div>

                    <h2>Junte-se ao Reino</h2>
                    <p>
                        Crie sua conta hoje e comece a gerenciar seu inventário de Magic: The Gathering como um verdadeiro Planeswalker.
                    </p>

                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon"><Package size={20} /></div>
                            <div className="feature-text">
                                <h4>Estoque</h4>
                                <span>Controle total</span>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon"><TrendingUp size={20} /></div>
                            <div className="feature-text">
                                <h4>Vendas</h4>
                                <span>Insights reais</span>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon"><ShieldCheck size={20} /></div>
                            <div className="feature-text">
                                <h4>Segurança</h4>
                                <span>Dados seguros</span>
                            </div>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon"><Database size={20} /></div>
                            <div className="feature-text">
                                <h4>API</h4>
                                <span>Integração</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Lado Direito: Formulário --- */}
            <div className="right-panel">
                <div className="form-header">
                    <h2>Criar conta de Lojista</h2>
                    <p>Preencha os dados abaixo para cadastrar sua loja.</p>
                </div>

                <form>
                    {/* Linha 1: Nome e Loja */}
                    <div className="form-row">
                        <div className="input-group">
                            <label>Seu Nome</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input
                                    type="text"
                                    name="nome"
                                    className="form-input"
                                    placeholder="João da Silva"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Nome da Loja</label>
                            <div className="input-wrapper">
                                <Store className="input-icon" size={18} />
                                <input
                                    type="text"
                                    name="loja"
                                    className="form-input"
                                    placeholder="Lotus Games"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Linha 2: Email */}
                    <div className="form-row">
                        <div className="input-group">
                            <label>Email Comercial</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="contato@sualoja.com"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Linha 3: Senhas */}
                    <div className="form-row">
                        <div className="input-group">
                            <label>Senha</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="senha"
                                    className="form-input"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                                <button type="button" onClick={togglePassword} style={{background:'none', border:'none', position:'absolute', right: 10, cursor:'pointer', color: '#94a3b8'}}>
                                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                </button>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Confirmar Senha</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    className="form-input"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="terms-checkbox">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">
                            Concordo com os <a href="#">Termos de Serviço</a> e confirmo que li a <a href="#">Política de Privacidade</a>.
                        </label>
                    </div>

                    <button type="submit" className="btn-submit">
                        Criar Conta
                    </button>

                    <div className="login-link">
                        Já possui cadastro? <a href="/login">Fazer login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;