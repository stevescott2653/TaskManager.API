import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './auth/AuthContext';

function App() {
  const { isAuthenticated, logout } = useAuth ? useAuth() : { isAuthenticated: false, logout: () => {} };
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Only show header/footer if not on login or register
  const hideLayout = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && (
        <header className="bg-blue-600 text-white py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">Task Manager</h1>
            <nav>
              <ul className="flex gap-4">
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
      )}
      <main className={`flex-1 container mx-auto py-8 ${hideLayout ? 'flex items-center justify-center' : ''}`}>
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
      {!hideLayout && (
        <footer className="bg-gray-200 text-center py-4">
          <p>&copy; 2025 Task Manager. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

export default App;