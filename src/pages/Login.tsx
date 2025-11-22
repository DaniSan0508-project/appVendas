import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import type { LoginRequest } from '../types/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const credentials: LoginRequest = {
            email,
            password,
            remember,
            tenant_id: 1,
        };

        try {
            const res = await fetch('http://fidelidade.sysfar.com.br/auth/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const responseJson = await res.json();

            if (!res.ok) {
                const errorMsg = responseJson.msg || 'Credenciais inválidas.';
                throw new Error(errorMsg);
            }

            login(responseJson.access_token, responseJson.data);
            navigate('/dashboard', { replace: true }); // ✅ Redireciona após login

        } catch (err: any) {
            setError(err.message || 'Erro no login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8 space-y-8">
                <div className="flex justify-center">
                    <ShoppingCart className="h-12 w-12 text-indigo-400" />
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">App Vendas</h1>
                    <p className="text-gray-400 mt-1">
                        Simplifique, melhore a visibilidade e gestão de suas Vendas
                    </p>
                </div>

                {error && (
                    <div className="p-3 bg-red-900/50 text-red-200 text-sm rounded-lg border border-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 border-slate-400 rounded focus:ring-2 focus:ring-indigo-500 bg-slate-800"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                            Mantenha-me conectado
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${loading
                            ? 'bg-indigo-500 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
                            }`}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}