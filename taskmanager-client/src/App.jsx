import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <div className="app-container">
                {/* Navigation Bar */}
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
                                <li><Link to="/dashboard">Dashboard</Link></li>
                            )}
                        </ul>
                    </nav>
                </header>

                {/* Main Content */}
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

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; 2025 TaskManager. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;