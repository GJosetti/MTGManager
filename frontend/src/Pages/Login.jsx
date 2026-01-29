import React, { useState } from "react";
import Header from "../Components/Header";
import Card from "../Components/Card";
import TextInput from "../Components/TextInput";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setError(null);

            const response = await axios.post(
                "/api/auth/login",
                {
                    user: email,
                    password,
                },
                { withCredentials: true }
            );

            const role = response.data.role;
            console.log(role);
            //Admin
            if(role == 0)
            {
                navigate("/admin/home");
            }//Funcionario
            else if (role == 1)
            {
                navigate("/funcionario/home");
            }//Cliente
            else if (role == 2)
            {
                navigate("/cliente/home");
            }
            else
            {
                setError("poisé");
            }


        } catch {
            setError("Email ou senha inválidos");
        }
    };

    return (
        <>
            <Header />


            <main className="flex-grow-1 d-flex justify-content-center align-items-center">
                <Card title="Acessar sistema" className="shadow" style={{ width: "400px" }}>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <TextInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />

                    <TextInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                    />

                    <div className="d-grid">
                        <Button className="btn-primary" onClick={handleLogin}>
                            Entrar
                        </Button>
                    </div>

                </Card>
            </main>
        </>
    );
}

export default Login;