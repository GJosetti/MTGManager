import React, { useState } from 'react';
import {User, Store, Mail, Lock, Eye, EyeOff, Package, TrendingUp, ShieldCheck, Database, FileText} from 'lucide-react';
import '../../Style/Registe.css';
import data from "bootstrap/js/src/dom/data.js";
import axios from "axios";
import ErrorBox from "../../Components/ErrorBox.jsx";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        role_id: 1
    });
    const navigate = useNavigate();



    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{
            const response = await axios.post('/api/auth/register',formData);

            navigate('/login')
        }
        catch (err) {

            if (err.response?.status === 400) {
                setError(err.response.data || "");
            } else {
                setError("Erro inesperado. Tente novamente.");
            }
        }
    };

    return (
        <div className="register-container">

            <div className="left-panel">
                <div className="illustration-content">

                    <h2>Junte-se ao Reino</h2>
                    <p>
                        Crie sua conta e adquira cartas de Magic: The Gathering para sua coleção!
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
                            <div className="feature-icon"><ShieldCheck size={20} /></div>
                            <div className="feature-text">
                                <h4>Segurança</h4>
                                <span>Dados seguros</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* --- Lado Direito: Formulário --- */}
            <div className="right-panel">
                <div className="form-header">
                    <h2>Criar conta</h2>
                    <p>Preencha os dados abaixo para se cadastrar</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Linha 1: Nome e Loja */}
                    <ErrorBox error={error}/>
                    <div className="form-row">
                        <div className="input-group" style={{ marginRight: "8px" }}>
                            <label>Seu Nome</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="João da Silva"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>CPF</label>
                            <div className="input-wrapper">
                                <FileText className="input-icon" size={18} style={{ marginRight: "8px" }}/>
                                <input
                                    type="text"
                                    name="cpf"
                                    className="form-input"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setFormData({ ...formData, cpf: value });
                                    }}
                                    maxLength={11}

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

                        <div className="input-group">
                            <label>Senha</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-input"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                                <button type="button" onClick={togglePassword} style={{background:'none', border:'none', position:'absolute', right: 10, cursor:'pointer', color: '#94a3b8'}}>
                                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                </button>
                            </div>
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