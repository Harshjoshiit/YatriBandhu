// --- File: Login.jsx ---
// This component is now fully connected to handle user login.

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';

export const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await loginUser(email, password);
            onLogin(data); // Pass user data and token up to App.jsx
            navigate('/'); // Redirect to dashboard on successful login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="header">
                <h2 id="auth-title">Login to YatriBandhu</h2>
            </div>
            <form onSubmit={handleSubmit} id="login-form" className="auth-form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button type="submit" className="btn btn-primary">Login</button>
                {error && <p className="auth-error">{error}</p>}
            </form>
            <p className="auth-toggle">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};
