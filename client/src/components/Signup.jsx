// --- File: Signup.jsx ---
// This component is now fully connected to handle user registration.

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';

export const Signup = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Call the registerUser function from our api.js utility
            const data = await registerUser(name, email, password);
            // If registration is successful, call the onLogin function from App.jsx
            // to set the user state and token, effectively logging them in.
            onLogin(data);
            // Redirect to the main dashboard
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="header">
                <h2 id="auth-title">Sign Up for YatriBandhu</h2>
            </div>
            <form onSubmit={handleSubmit} id="signup-form" className="auth-form">
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
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
                <button type="submit" className="btn btn-primary">Sign Up</button>
                {error && <p className="auth-error">{error}</p>}
            </form>
            <p className="auth-toggle">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};
