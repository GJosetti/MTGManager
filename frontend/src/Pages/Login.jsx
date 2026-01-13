import React, { useState } from "react";
import Card from "../Components/Card.jsx";
import TextInput from "../Components/TextInput.jsx";
import Button from "../Components/Button.jsx";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Card title="Login">
            <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome aqui..."
            />
            <TextInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha..."
            />
            <Button
                onClick={async () => {
                    try {
                        const response = await fetch("/api/auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ user: name, password }),
                            credentials: "include"
                        });

                        if (!response.ok) {
                            throw new Error("Login falhou");
                        }

                        console.log("Login realizado com sucesso!");
                    } catch (err) {
                        console.error(err);
                        alert("Erro no login");
                    }
                }}
            >
                Enviar
            </Button>
        </Card>
    );
}

export default Login;
