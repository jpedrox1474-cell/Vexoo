import React, { useState, useEffect } from 'react';
import {
    Activity, Dumbbell, Target, Users, Calendar, TrendingUp, LogOut,
    Settings, LayoutDashboard, Utensils, Heart, Award, Plus, Search,
    Edit, Trash2, CheckCircle2, DollarSign, BrainCircuit, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import SystemHeader from '@/components/shared/SystemHeader';

const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

export default function EliteSystem() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        navigate('/Login');
    };

    const renderDashboard = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Alunos Ativos", value: "124", sub: "8 novos este mês", icon: Users, color: "bg-orange-500" },
                    { title: "Treinos Hoje", value: "42", sub: "15 concluídos", icon: Dumbbell, color: "bg-red-500" },
                    { title: "Avaliações", value: "12", sub: "Próxima em 2h", icon: Activity, color: "bg-blue-500" },
                    { title: "Faturamento", value: "R$ 15.400", sub: "Meta: 85%", icon: DollarSign, color: "bg-emerald-500" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">{stat.title}</p>
                                <h3 className="text-3xl font-black text-slate-800 mt-2">{stat.value}</h3>
                                <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
                            </div>
                            <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8">
                    <h3 className="text-xl font-black text-slate-800 flex gap-2 items-center mb-6"><Target className="text-orange-600" /> Metas dos Alunos</h3>
                    <div className="space-y-4">
                        {[
                            { name: "João Silva", goal: "Perda de Peso", progress: 75, status: "No Caminho" },
                            { name: "Maria Oliveira", goal: "Hipertrofia", progress: 40, status: "Atrasada" },
                            { name: "Carlos Souza", goal: "Condicionamento", progress: 95, status: "Quase lá" },
                        ].map((m, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-slate-800">{m.name} - {m.goal}</span>
                                    <span className="text-xs font-black text-orange-600 uppercase">{m.status}</span>
                                </div>
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div className="bg-orange-500 h-full transition-all duration-1000" style={{ width: `${m.progress}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-3xl p-6 text-white text-center">
                    <BrainCircuit className="mx-auto text-orange-400 mb-4" size={48} />
                    <h3 className="text-xl font-bold mb-2">IA Trainer</h3>
                    <p className="text-slate-400 text-sm mb-6">Gere periodizações inteligentes baseadas na evolução do aluno.</p>
                    <button className="w-full py-3 bg-orange-600 rounded-xl font-bold hover:bg-orange-500 transition-all">Criar Novo Treino</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900">
            <aside className={`bg-slate-900 text-white w-64 flex flex-col transition-all overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'}`}>
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shrink-0"><Dumbbell size={20} /></div>
                    {isSidebarOpen && <span className="text-xl font-black">EliteFit</span>}
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'alunos', icon: Users, label: 'Alunos' },
                        { id: 'treinos', icon: Dumbbell, label: 'Treinos' },
                        { id: 'avaliacoes', icon: Activity, label: 'Avaliações' },
                        { id: 'nutricao', icon: Utensils, label: 'Nutrição' },
                        { id: 'finance', icon: DollarSign, label: 'Financeiro' },
                        { id: 'settings', icon: Settings, label: 'Configurações' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}
                        >
                            <item.icon size={20} />
                            {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <SystemHeader title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'dashboard' ? renderDashboard() : (
                            <div className="p-20 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200 text-slate-400">
                                <Zap size={64} className="mx-auto mb-6 opacity-20 text-orange-500" />
                                <h2 className="text-2xl font-black text-slate-700 capitalize">Módulo: {activeTab}</h2>
                                <p className="mt-2">Configure os parâmetros de performance para seus alunos de elite.</p>
                                <button className="mt-8 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl">Configurar Agora</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
