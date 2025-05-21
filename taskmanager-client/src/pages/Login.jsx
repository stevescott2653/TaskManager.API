import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('https://localhost:5001/api/auth/login', {
                email,
                password
            });
            login(response.data.token); // update context and localStorage
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;