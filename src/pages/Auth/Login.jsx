import  { useState } from 'react';
import { useLoginAccountMutation } from './authApi.js';
import {useNavigate} from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [loginAccount, { isLoading, error }] = useLoginAccountMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email, password };

        try {
            const res = await loginAccount(credentials);
            console.log("Login success:", res);
            navigate('/');
            // Optionally, navigate or handle successful login
        } catch (err) {
            console.error('Login failed:', err.message || err);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>

                {error && <p className="text-red-500 text-sm">{error.data?.message || 'Login failed'}</p>}

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
