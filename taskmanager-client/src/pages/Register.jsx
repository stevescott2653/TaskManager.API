import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/register', { email, password, confirmPassword });
            setSuccess('Registration successful! You can now log in.');
            setLoading(false);
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.data) {
                // Show detailed error if available
                if (Array.isArray(err.response.data)) {
                    setError(err.response.data.map(e => e.description || e.code || JSON.stringify(e)).join(' '));
                } else if (err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError('Registration failed.');
                }
            } else {
                setError('Registration failed.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {error && <div className="text-red-600 mt-4 text-center">{error}</div>}
                {success && <div className="text-green-600 mt-4 text-center">{success}</div>}
            </form>
        </div>
    );
}

export default Register;