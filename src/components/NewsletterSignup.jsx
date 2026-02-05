import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { addEmailToNewsletter } from '../lib/firebase';

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error', null
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação
        if (!email.trim()) {
            setStatus('error');
            setMessage('Por favor, insira seu email.');
            return;
        }

        if (!validateEmail(email)) {
            setStatus('error');
            setMessage('Por favor, insira um email válido.');
            return;
        }

        setLoading(true);
        setStatus(null);
        setMessage('');

        try {
            const result = await addEmailToNewsletter(email);
            setStatus('success');
            setMessage(result.message);
            setEmail(''); // Limpar campo após sucesso
        } catch (error) {
            setStatus('error');
            setMessage(error.message || 'Erro ao cadastrar email. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Lista de Discussão</h3>
                        <p className="text-sm text-white/80">Receba novidades e atualizações</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Inscrever-se
                            </>
                        )}
                    </button>
                </form>

                {/* Mensagens de feedback */}
                {status && (
                    <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${status === 'success'
                            ? 'bg-green-500/20 border border-green-400/30'
                            : 'bg-red-500/20 border border-red-400/30'
                        }`}>
                        {status === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
                        )}
                        <p className={`text-sm ${status === 'success' ? 'text-green-100' : 'text-red-100'
                            }`}>
                            {message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
