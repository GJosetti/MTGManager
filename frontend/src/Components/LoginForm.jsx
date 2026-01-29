import React, { useState } from 'react';
import InputField from './InputField';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // --- BACKEND INTEGRATION POINT ---
        // Place your API call here (e.g., fetch or axios).
        // Example:
        // loginUser({ email, password })
        //   .then(res => handleSuccess(res))
        //   .catch(err => handleError(err));

        console.log('Attempting login with:', { email, password });
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
                Enter the Battlefield
            </button>
        </form>
    );
};

export default LoginForm;