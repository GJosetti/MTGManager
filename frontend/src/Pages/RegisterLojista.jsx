import React, { useState } from 'react';
import { User, Store, Mail, Lock, Eye, EyeOff, Package, TrendingUp, ShieldCheck, Database } from 'lucide-react';
import '../Style/Registe.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmarSenha: '',
        cpf: '',
        role_id: 1
    });

    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            setLoading(true);
            await axios.post('/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                cpf: formData.cpf,
                role_id: formData.role_id
            });
            navigate('/login');
        } catch (err) {
            setError('Erro ao criar conta. Verifique os dados e tente novamente.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">

            <div className="left-panel">
                <div className="illustration-content">
                    <div style={{marginBottom: '20px'}}>
                        <div style={{width: 50, height: 50, background: '#8b5cf6', margin: '0 auto', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            📖
                        </div>
                    </div>

                    <h2>Junte-se ao Reino</h2>
                    <p>Crie sua conta hoje e comece a gerenciar seu inventário de Magic: The Gathering como um verdadeiro Planeswalker.</p>

                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon"><Package size={20}/></div>
                            <div className="feature-text"><h4>Estoque</h4><span>Controle total</span></div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><TrendingUp size={20}/></div>
                            <div className="feature-text"><h4>Vendas</h4><span>Insights reais</span></div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><ShieldCheck size={20}/></div>
                            <div className="feature-text"><h4>Segurança</h4><span>Dados seguros</span></div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon"><Database size={20}/></div>
                            <div className="feature-text"><h4>API</h4><span>Integração</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-panel">
                <div className="form-header">
                    <h2>Criar conta de Lojista</h2>
                    <p>Preencha os dados abaixo para cadastrar sua loja.</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Seu Nome</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18}/>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="João da Silva"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>CPF</label>
                            <div className="input-wrapper">
                                <Store className="input-icon" size={18}/>
                                <input
                                    type="text"
                                    name="cpf"
                                    className="form-input"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Email</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18}/>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="contato@sualoja.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <label>Senha</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18}/>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" onClick={togglePassword} style={{background: 'none', border: 'none', position: 'absolute', right: 10, cursor: 'pointer', color: '#94a3b8'}}>
                                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                </button>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Confirmar Senha</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18}/>
                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div style={{color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', padding: '0.5rem 1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)'}}>
                            {error}
                        </div>
                    )}

                    <div className="terms-checkbox">
                        <input type="checkbox" id="terms" required/>
                        <label htmlFor="terms">
                            Concordo com os <a href="#">Termos de Serviço</a> e confirmo que li a <a href="#">Política de Privacidade</a>.
                        </label>
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Criando conta...' : 'Criar Conta'}
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