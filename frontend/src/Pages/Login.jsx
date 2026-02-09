import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, CodeXml } from 'lucide-react';
import '../Style/Login.css';
import axios from "axios";
import {useAuth} from "../RouteControl/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import ErrorBox from "../Components/ErrorBox.jsx";


const Login = () => {
    const { setUser } = useAuth();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        user: '',
        password: '',
        rememberMe: false
    });


    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const navigate = useNavigate();

    function handleRoutes(i)
    {
        switch (i)
        {
            case 0:
                //NAVIGATE TELA DE ADMIN
                navigate('/admin/home')
                break;


            case 1:
                //NAVIGATE TELA DE USUARIO
                console.log("Indo para a tela de Usuários...")
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try
        {
            const response = await axios.post(
                '/api/auth/login',
                {
                    user: formData.user,
                    password: formData.password
                }
            );

            setUser(response.data)
            handleRoutes(response.data.role);

        }
        catch (err) {

            if (err.response?.status === 401) {
                setError(err.response.data.message || "Usuário ou senha inválidos");
            } else {
                setError("Erro inesperado. Tente novamente.");
            }
        }
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
                   <ErrorBox error={error}/>
                    {/* Campo de Email ou Usuário */}
                    <div className="input-group">
                        <label htmlFor="emailOrUser">EMAIL</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                id="emailOrUser"
                                name="user"
                                className="form-input"
                                placeholder="ex: lojista@mtgmanager.com.br"
                                value={formData.user}
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



                    {/* Botão de Login */}
                    <button type="submit" className="btn-login">
                        Entrar no Sistema
                    </button>

                    {/* Link de Cadastro */}
                    <div className="register-link">
                        Ainda não é parceiro? <a href="/register">Cadastre sua loja</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;