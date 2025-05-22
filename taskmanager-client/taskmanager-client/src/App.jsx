import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './auth/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container min-h-screen flex flex-col">
      <header className="navbar bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo text-2xl font-bold">TaskManager</div>
          <nav>
            <ul className="nav-links flex gap-4">
              {!isAuthenticated && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
              {isAuthenticated && (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="bg-blue-800 px-2 py-1 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-content flex-1 container mx-auto py-8">
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
      <footer className="footer bg-gray-200 text-center py-4">
        <p>&copy; 2025 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;