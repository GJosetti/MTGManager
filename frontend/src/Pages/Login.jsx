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
            <Button onClick={() => alert(`Olá, ${name}!`)}>
                Enviar
            </Button>
        </Card>
    );
}

export default Login;
