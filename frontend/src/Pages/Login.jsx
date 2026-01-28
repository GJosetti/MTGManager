import React, { useState } from "react";
import Card from "../Components/Card.jsx";
import TextInput from "../Components/TextInput.jsx";
import Button from "../Components/Button.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await axios.post(
                "/api/auth/login",
                {
                    user: name,
                    password
                },
                {
                    withCredentials: true
                }
            );

            alert("Login realizado com sucesso!");
            navigate("/home");
        } catch (err) {
            console.error(err);
            alert("Erro no login");
        }
    };
    //------------PÁGINA DE LOGIN---------------------
    return (
        <Card title="Login">
            <TextInput
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu email aqui..."
            />

            <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha..."
            />

            <Button onClick={handleLogin}>
                Enviar
            </Button>
        </Card>
    );
}

export default Login;
