import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { ShoppingBag, ArrowRight, Lock, Mail, ArrowLeft } from 'lucide-react';

// Inline helper to prevent import issues
const createPageUrl = (pageName) => {
    if (!pageName) return '/';
    return '/' + pageName.replace(/ /g, '-');
};

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, loginWithGoogle, isAuthenticated, authError } = useAuth();
    const navigate = useNavigate();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Por favor, digite seu email primeiro.');
            return;
        }
        // Simulated recovery
        alert(`Um link de recuperação foi enviado para ${email} (Funcionalidade simulada)`);
        setError('');
    };

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/ModulesDashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, password);
            // Redirection is now handled by useEffect
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Credenciais inválidas. Tente novamente.');
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await loginWithGoogle();
            // Redirection is now handled by useEffect
        } catch (err) {
            console.error('Google login error:', err);
            setError('Falha ao entrar com Google. Tente novamente.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* Left Column - Form */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-24">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex flex-col gap-2">
                        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-4 group w-fit">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-bold">Voltar para o site</span>
                        </Link>

                        <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 mb-8 group">
                            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-black italic">V</span>
                            </div>
                            <span className="font-bold text-slate-900 text-xl group-hover:text-indigo-600 transition-colors">VEXO</span>
                        </Link>

                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Bem-vindo de volta!</h1>
                        <p className="text-slate-500">
                            Não tem uma conta?{' '}
                            <Link to={createPageUrl('Register')} className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Experimente Grátis
                            </Link>
                        </p>
                    </div>

                    <div className="space-y-6">
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="group w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-[0.98]"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                className="w-5 h-5 group-hover:scale-110 transition-transform"
                                alt="Google"
                            />
                            <span>Entrar com Google</span>
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-slate-500">ou entre com email</span>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Profissional</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                                        Lembrar de mim
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Esqueceu a senha?
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2 animate-shake">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Entrar na Plataforma <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Column - Image/Marketing */}
            <div className="hidden lg:block relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
                        alt="Office"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/60 to-slate-900/90" />
                </div>

                <div className="relative h-full flex flex-col justify-end p-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                        <ShoppingBag size={14} />
                        Enterprise Edition
                    </div>
                    <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
                        Gestão inteligente para negócios que não param de crescer.
                    </h2>
                    <p className="text-xl text-slate-400 max-w-lg">
                        Acompanhe métricas em tempo real, gerencie equipes e automatize processos financeiros em uma única plataforma.
                    </p>
                </div>
            </div>
        </div>
    );
}
