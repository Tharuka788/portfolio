"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple client-side call to api route for cookie setting
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            setError('Invalid Password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-deep-dark text-white p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 rounded-2xl w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Admin <span className="text-neon-purple">Login</span></h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-purple"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="w-full bg-neon-purple text-black font-bold py-3 rounded-lg hover:bg-purple-400 transition-colors">
                        Login
                    </button>
                    <a href="/" className="block text-center text-sm text-neutral-400 hover:text-white mt-4">Return to Home</a>
                </form>
            </motion.div>
        </div>
    );
}
