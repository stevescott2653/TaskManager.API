import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="app-container">
            <header className="navbar">
                <div className="logo">TaskManager</div>
                <nav>
                    <ul className="nav-links">
                        {!isAuthenticated && (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            <main className="main-content">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/"
                        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
                    />
                </Routes>
            </main>
            <footer className="footer">
                <p>&copy; 2025 TaskManager. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}