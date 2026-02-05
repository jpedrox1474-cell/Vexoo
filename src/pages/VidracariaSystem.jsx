import React, { useState } from 'react';
import {
    Grid, Ruler, FileType, Users, Package, TrendingUp, LogOut,
    Settings, LayoutDashboard, Calculator, Hammer, HardHat, Plus, Search,
    Edit, Trash2, CheckCircle2, DollarSign, Layers, Box
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import SystemHeader from '@/components/shared/SystemHeader';

const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

export default function VidracariaSystem() {
    const { logout } = useAuth();
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
                    { title: "Pedidos Ativos", value: "28", sub: "12 em produção", icon: Layers, color: "bg-blue-600" },
                    { title: "Medições Hoje", value: "5", sub: "Tudo agendado", icon: Ruler, color: "bg-cyan-600" },
                    { title: "Estoque Vidros", value: "850m²", sub: "Baixo: Temperado 8mm", icon: Box, color: "bg-amber-600" },
                    { title: "Vendas (Mês)", value: "R$ 42.800", sub: "Crescimento: +18%", icon: DollarSign, color: "bg-emerald-600" },
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
                    <h3 className="text-xl font-black text-slate-800 flex gap-2 items-center mb-6"><Hammer className="text-blue-600" /> Ordens de Serviço Ativas</h3>
                    <div className="space-y-4">
                        {[
                            { client: "Condomínio Alpha", service: "Fachada Pele de Vidro", deadline: "Amanhã", priority: "Alta" },
                            { client: "Residencial Jardins", service: "Box Temperado (3 un)", deadline: "05/02", priority: "Normal" },
                            { client: "Escritório Tech", service: "Divisórias Acústicas", deadline: "10/02", priority: "Normal" },
                        ].map((os, i) => (
                            <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                                <div>
                                    <p className="font-bold text-slate-800">{os.client}</p>
                                    <p className="text-xs text-slate-500">{os.service}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-blue-600 uppercase">{os.priority}</p>
                                    <p className="text-xs text-slate-400">Prazo: {os.deadline}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-6 text-white text-center shadow-xl">
                    <Calculator className="mx-auto text-blue-300 mb-4" size={48} />
                    <h3 className="text-xl font-bold mb-2">Calculadora Técnica</h3>
                    <p className="text-blue-200 text-sm mb-6">Calcule pesos, folgas e orçamentos baseados no m² e ferragens.</p>
                    <button className="w-full py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all">Abrir Calculadora</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900">
            <aside className={`bg-slate-900 text-white w-64 flex flex-col transition-all overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'}`}>
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0"><Grid size={20} /></div>
                    {isSidebarOpen && <span className="text-xl font-black italic">VIDROSMART</span>}
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'orcamentos', icon: Calculator, label: 'Orçamentos' },
                        { id: 'ordens', icon: Hammer, label: 'Ordens de Serviço' },
                        { id: 'medicoes', icon: Ruler, label: 'Medições' },
                        { id: 'clientes', icon: Users, label: 'Clientes' },
                        { id: 'estoque', icon: Box, label: 'Estoque' },
                        { id: 'settings', icon: Settings, label: 'Configurações' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-400 hover:bg-white/5'}`}
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
                                <HardHat size={64} className="mx-auto mb-6 opacity-20 text-blue-500" />
                                <h2 className="text-2xl font-black text-slate-700 capitalize">Processo de {activeTab}</h2>
                                <p className="mt-2 text-sm max-w-sm mx-auto">Módulo técnico otimizado para gestão de vidraçarias e esquadrias.</p>
                                <button className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100">Acessar Banco de Dados</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
