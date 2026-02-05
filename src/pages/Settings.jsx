import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { User, Lock, Bell, Shield, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Voltar</span>
                </button>

                <h1 className="text-3xl font-bold text-slate-900 mb-2">Configurações</h1>
                <p className="text-slate-500 mb-8">Gerencie sua conta e preferências do sistema.</p>

                <div className="grid md:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <nav className="space-y-1">
                        {[
                            { id: 'profile', icon: User, label: 'Perfil' },
                            { id: 'security', icon: Lock, label: 'Segurança' },
                            { id: 'notifications', icon: Bell, label: 'Notificações' },
                            { id: 'privacy', icon: Shield, label: 'Privacidade' },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === item.id
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                        : 'text-slate-600 hover:bg-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Content */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-8">
                            {activeTab === 'profile' && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                                            {user?.full_name ? user.full_name[0] : 'U'}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">Sua Foto</h3>
                                            <p className="text-sm text-slate-500 mb-3">Isso será exibido no seu perfil.</p>
                                            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-500">Alterar foto</button>
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                                            <input
                                                type="text"
                                                defaultValue={user?.full_name}
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 ring-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                                            <input
                                                type="email"
                                                defaultValue={user?.email}
                                                disabled
                                                className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-500 shadow-lg shadow-indigo-200 transition-all">
                                        <Save size={20} /> Salvar Alterações
                                    </button>
                                </div>
                            )}

                            {activeTab !== 'profile' && (
                                <div className="py-20 text-center text-slate-400">
                                    <p>Configurações de {activeTab} em desenvolvimento.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
