// --- File: App.jsx --- 
// This version adds a wrapper for the auth pages to apply a different background.

import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { parsePDF } from './utils/pdfParser';
import { saveTicket } from './utils/api';

export default function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);
    const [ticketData, setTicketData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        setToken(data.token);
        setUser(data);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    const handlePdfProcess = async (file) => {
        setIsLoading(true);
        setError('');
        try {
            const parsedData = await parsePDF(file);
            const savedTicket = await saveTicket(parsedData, token);
            setTicketData(savedTicket);
        } catch (err) {
            setError(err.message);
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isLoading) {
        return <div className="container" style={{textAlign: 'center', display: 'block'}}>Loading...</div>;
    }

    // A helper component to wrap auth routes in the old UI
    const AuthLayout = ({ children }) => (
        <div className="auth-page-wrapper">
            <div className="container">
                {children}
            </div>
        </div>
    );

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!user ? <AuthLayout><Login onLogin={handleLogin} /></AuthLayout> : <Navigate to="/" />} />
                <Route path="/signup" element={!user ? <AuthLayout><Signup onLogin={handleLogin} /></AuthLayout> : <Navigate to="/" />} />
                <Route 
                    path="/" 
                    element={
                        user ? (
                            <Dashboard 
                                user={user}
                                token={token}
                                handleLogout={handleLogout}
                                ticketData={ticketData}
                                setTicketData={setTicketData}
                                processPDF={handlePdfProcess}
                                isLoading={isLoading}
                                error={error}
                            />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } 
                />
            </Routes>
        </Router>
    );
}
