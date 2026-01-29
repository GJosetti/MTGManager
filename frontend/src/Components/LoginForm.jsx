import React, { useState } from 'react';
import InputField from './InputField';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(
            "/api/auth/login",
            {user: email, password},
            {withCredentials: true}
        );


        const role = response.data.role;

        if(role == 0)
        {
            navigate("/admin/home")
        }
        else if (role == 1)
        {
            navigate("/funcionario/home")
        }
        else if (role ==2)
        {
            navigate("/cliente/home")
        }

        console.log('Attempting login with:', {email, password});


    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <InputField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@yourstore.com"
            />

            <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
            />

            <button type="submit" className="login-button">
                Acessar
            </button>
        </form>
    );
};

export default LoginForm;