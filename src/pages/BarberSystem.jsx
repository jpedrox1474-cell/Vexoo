import React, { useState, useEffect } from 'react';
import {
    Calendar, Scissors, User, Clock, TrendingUp, Users, CheckCircle, Settings, Menu, X, LogOut,
    ChevronRight, DollarSign, Star, Smartphone, ShieldCheck, LayoutDashboard, Bell, MessageSquare,
    Gift, BarChart3, CreditCard, Package, ShoppingCart, Sparkles, FileText, Send, TrendingDown, Percent, UserPlus,
    ClipboardList, AlertCircle, CheckSquare, Edit, Trash2, Plus, Search, Filter, Download,
    Mail, Phone, MapPin, ChevronLeft, Eye, Award, Target, Zap, Heart, Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import SystemHeader from '@/components/shared/SystemHeader';
import {
    INITIAL_SERVICES, INITIAL_BARBERS, INITIAL_CLIENTS, INITIAL_APPOINTMENTS,
    INITIAL_PRODUCTS, INITIAL_EXPENSES, LOYALTY_TIERS
} from '@/data/barberSystemData';

// --- STYLES ---
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
    }

    h1, h2, h3, h4, h5, h6, .brand-font {
      font-family: 'Outfit', sans-serif;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .glass-sidebar {
      background: #0f172a; /* Slate 900 */
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 10px;
    }
  `}</style>
);

// --- UTILS ---
const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        success: 'bg-emerald-600',
        error: 'bg-rose-600',
        info: 'bg-indigo-600',
        warning: 'bg-amber-600'
    };

    return (
        <div className={`fixed top-4 right-4 z-50 ${styles[type]} text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-right`}>
            {type === 'success' && <CheckCircle size={20} />}
            {type === 'error' && <AlertCircle size={20} />}
            {type === 'info' && <Bell size={20} />}
            <span className="font-bold text-sm">{message}</span>
        </div>
    );
};

// --- COMPONENTS ---
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 brand-font">
                        <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                        {title}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} className="text-slate-500" /></button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function BarberSystem() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [view, setView] = useState('admin'); // 'admin' or 'booking'
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Data States
    const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
    const [services, setServices] = useState(INITIAL_SERVICES);
    const [barbers, setBarbers] = useState(INITIAL_BARBERS);
    const [clients, setClients] = useState(INITIAL_CLIENTS);
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

    // UI States
    const [toast, setToast] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Removal of redundant auth check (now handled by ProtectedRoute)

    const showToast = (message, type = 'info') => {
        setToast({ message, type });
    };

    // --- CALCULATIONS ---
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(a => a.date === today);
    const completedToday = todayAppointments.filter(a => a.status === 'Concluído');
    const totalRevenue = completedToday.reduce((sum, a) => sum + a.price, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const netProfit = totalRevenue - totalExpenses; // Simplified for demo (using total expenses vs day revenue) - ideally should be monthly

    // This calculation is just for the demo visualization
    const monthRevenue = appointments
        .filter(a => a.status === 'Concluído' && a.date.startsWith('2026-01'))
        .reduce((sum, a) => sum + a.price, 0);
    const monthProfit = monthRevenue - totalExpenses;

    const openModal = (type, item = null) => {
        setModalType(type);
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleLogout = () => {
        logout();
        navigate('/Login');
    };

    // --- RENDERERS ---

    const renderDashboard = () => (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Faturamento Hoje", value: formatCurrency(totalRevenue), sub: `${completedToday.length} atendimentos`, icon: DollarSign, color: "bg-emerald-500", trend: "+12%" },
                    { title: "Agendamentos Hoje", value: todayAppointments.length, sub: `${todayAppointments.filter(a => a.status === 'Confirmado').length} pendentes`, icon: Calendar, color: "bg-indigo-500", trend: "" },
                    { title: "Total Clientes", value: clients.length, sub: `${clients.filter(c => c.status === 'VIP').length} VIPs`, icon: Users, color: "bg-purple-500", trend: "+5" },
                    { title: "Lucro (Mês)", value: formatCurrency(monthProfit), sub: "Líquido", icon: TrendingUp, color: "bg-amber-500", trend: "+8.5%" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group relative overflow-hidden">
                        <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 ${stat.color}`}></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                                <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tight brand-font">{stat.value}</h3>
                                <p className="text-xs text-slate-500 mt-1 font-medium">{stat.sub}</p>
                            </div>
                            <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg transform group-hover:scale-110 transition-transform`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Agenda Preview */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-slate-800 flex gap-2 items-center"><Calendar className="text-indigo-600" /> Próximos Agendamentos</h3>
                        <button onClick={() => setActiveTab('agenda')} className="text-indigo-600 text-sm font-bold hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors">Ver Agenda Completa</button>
                    </div>
                    <div className="space-y-4">
                        {todayAppointments.length > 0 ? todayAppointments.slice(0, 5).map(apt => {
                            const client = clients.find(c => c.id === apt.clientId);
                            const service = services.find(s => s.id === apt.serviceId);
                            const barber = barbers.find(b => b.id === apt.barberId);
                            return (
                                <div key={apt.id} className="flex flex-col sm:flex-row justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all gap-4">
                                    <div className="flex gap-4 items-center w-full sm:w-auto">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-200 font-bold text-slate-700 text-xl shadow-sm">{apt.time}</div>
                                        <div>
                                            <p className="font-bold text-slate-800">{client?.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">{service?.name} • {barber?.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${apt.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' :
                                            apt.status === 'Confirmado' ? 'bg-indigo-100 text-indigo-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>{apt.status}</span>
                                        <button className="p-2 hover:bg-indigo-50 rounded-xl text-indigo-600 transition-colors"><Edit size={18} /></button>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="text-center py-10 text-slate-400">
                                <Calendar size={48} className="mx-auto mb-3 opacity-20" />
                                <p>Nenhum agendamento para hoje.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions & Top Barbers */}
                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20 -mr-10 -mt-10"></div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10 brand-font">Ações Rápidas</h3>
                        <div className="grid grid-cols-2 gap-3 relative z-10">
                            {[
                                { icon: Plus, label: "Agendar", action: () => openModal('newAppointment') },
                                { icon: UserPlus, label: "Novo Cliente", action: () => openModal('newClient') },
                                { icon: Send, label: "Promoção", action: () => openModal('promo') },
                                { icon: FileText, label: "Despesa", action: () => openModal('expense') }
                            ].map((act, i) => (
                                <button key={i} onClick={act.action} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border border-white/5">
                                    <act.icon size={20} className="text-indigo-400" />
                                    <span className="text-xs font-bold">{act.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Top Barbeiros</h3>
                        <div className="space-y-4">
                            {barbers.map(b => (
                                <div key={b.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm border border-slate-200">{b.avatar}</div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">{b.name}</p>
                                            <div className="flex items-center text-xs text-amber-500 font-bold gap-1"><Star size={10} fill="currentColor" /> {b.rating}</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">R$ 1.250</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAgenda = () => (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div><h2 className="text-2xl font-black text-slate-800 brand-font">Agenda da Barbearia</h2><p className="text-slate-500">Gestão de horários e profissionais</p></div>
                <button onClick={() => openModal('newAppointment')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500 shadow-lg shadow-indigo-200 transition-all"><Plus size={20} /> Novo Agendamento</button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                    <input type="text" placeholder="Buscar cliente..." className="flex-1 min-w-[200px] p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <select className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-600"><option>Todos os Barbeiros</option></select>
                    <select className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-600"><option>Todos Status</option></select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                            <tr>
                                <th className="p-4 rounded-l-xl">Horário</th>
                                <th className="p-4">Cliente</th>
                                <th className="p-4">Serviço</th>
                                <th className="p-4">Profissional</th>
                                <th className="p-4">Valor</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 rounded-r-xl">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {appointments.filter(a => !searchTerm || clients.find(c => c.id === a.clientId)?.name.toLowerCase().includes(searchTerm.toLowerCase())).map(apt => {
                                const client = clients.find(c => c.id === apt.clientId);
                                const service = services.find(s => s.id === apt.serviceId);
                                const barber = barbers.find(b => b.id === apt.barberId);
                                return (
                                    <tr key={apt.id} className="hover:bg-indigo-50/50 transition-colors">
                                        <td className="p-4 font-black text-slate-700">{apt.time} <span className="text-[10px] block text-slate-400 font-normal">{new Date(apt.date).toLocaleDateString('pt-BR')}</span></td>
                                        <td className="p-4 font-bold text-slate-800">{client?.name}</td>
                                        <td className="p-4 text-slate-600 text-sm">{service?.name}</td>
                                        <td className="p-4"><span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{barber?.name}</span></td>
                                        <td className="p-4 font-black text-emerald-600">{formatCurrency(apt.price)}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${apt.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' :
                                                apt.status === 'Confirmado' ? 'bg-indigo-100 text-indigo-700' :
                                                    'bg-amber-100 text-amber-700'
                                                }`}>{apt.status}</span>
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition"><Edit size={16} /></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderClients = () => (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-black text-slate-800 brand-font">Gestão de Clientes</h2><p className="text-slate-500">Base de dados e histórico de consumo</p></div>
                <button onClick={() => openModal('newClient')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500 transition-all"><Plus size={20} /> Adicionar Cliente</button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {clients.map(client => (
                        <div key={client.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-lg">{client.name[0]}</div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{client.name}</h4>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${client.status === 'VIP' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>{client.status}</span>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-slate-500 mb-4">
                                <p className="flex items-center gap-2"><Scissors size={14} /> {client.totalSpent} total gasto</p>
                                <p className="flex items-center gap-2"><Calendar size={14} /> Última visita: {client.lastVisit}</p>
                            </div>
                            <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all">Ver Perfil Completo</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-black text-slate-800 brand-font">Estoque de Produtos</h2><p className="text-slate-500">Controle de vendas e suprimentos</p></div>
                <button onClick={() => openModal('newProduct')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500 transition-all"><Plus size={20} /> Novo Produto</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INITIAL_PRODUCTS.map(product => (
                    <div key={product.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 rounded-2xl text-slate-600"><Package size={24} /></div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${product.stock < 5 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                {product.stock} em estoque
                            </span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg mb-1">{product.name}</h4>
                        <p className="text-sm text-slate-400 mb-4">Categoria: {product.category}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                            <span className="text-xl font-black text-slate-800">{formatCurrency(product.price)}</span>
                            <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><ShoppingCart size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFinance = () => (
        <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
                <div><h2 className="text-2xl font-black text-slate-800 brand-font">Financeiro</h2><p className="text-slate-500">Fluxo de caixa e lucratividade</p></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Receita Total</p>
                    <h3 className="text-3xl font-black text-emerald-600 tracking-tight">R$ 12.450,00</h3>
                    <div className="mt-4 p-3 bg-emerald-50 rounded-xl text-xs text-emerald-700 font-bold">+15% vs mês anterior</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Despesas</p>
                    <h3 className="text-3xl font-black text-rose-600 tracking-tight">R$ 3.120,00</h3>
                    <div className="mt-4 p-3 bg-rose-50 rounded-xl text-xs text-rose-700 font-bold">-5% vs mês anterior</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ticket Médio</p>
                    <h3 className="text-3xl font-black text-indigo-600 tracking-tight">R$ 85,00</h3>
                    <div className="mt-4 p-3 bg-indigo-50 rounded-xl text-xs text-indigo-700 font-bold">+R$ 10,00 aumento</div>
                </div>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 font-bold text-slate-800">Lançamentos Recentes</div>
                <div className="p-6 space-y-4">
                    {INITIAL_EXPENSES.map(exp => (
                        <div key={exp.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white rounded-xl shadow-sm"><DollarSign size={18} className="text-rose-500" /></div>
                                <div><p className="font-bold text-slate-800">{exp.description}</p><p className="text-xs text-slate-400">{exp.date}</p></div>
                            </div>
                            <span className="font-black text-rose-600">-{formatCurrency(exp.amount)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderMarketing = () => (
        <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-black text-slate-800 brand-font">Marketing & Fidelização</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-900 to-indigo-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                    <Sparkles className="text-indigo-400 mb-4" size={32} />
                    <h3 className="text-xl font-bold mb-2">Campanhas SMS / WhatsApp</h3>
                    <p className="text-slate-300 text-sm mb-6">Envie lembretes automáticos e promoções especiais para seus clientes.</p>
                    <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Criar Campanha</button>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <Gift className="text-purple-600 mb-4" size={32} />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Sistema de Pontuação</h3>
                    <p className="text-slate-500 text-sm mb-6">Defina quantos pontos cada serviço gera para trocas por brindes.</p>
                    <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">Configurar Regras</button>
                </div>
            </div>
        </div>
    );

    const renderLoyalty = () => renderMarketing(); // Share marketing view for now

    // --- MAIN RENDER ---
    return (
        <div className="min-h-screen bg-slate-50 font-sans flex text-slate-900">
            <GlobalStyles />

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 bg-slate-900 text-white w-64 transform transition-transform duration-300 ease-in-out border-r border-slate-800/50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static flex flex-col`}>
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                        <Scissors size={20} />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight brand-font">BarberPro</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {[
                        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { id: 'agenda', icon: Calendar, label: 'Agenda' },
                        { id: 'clients', icon: Users, label: 'Clientes' },
                        { id: 'products', icon: Package, label: 'Produtos' },
                        { id: 'finance', icon: DollarSign, label: 'Financeiro' },
                        { id: 'marketing', icon: MessageSquare, label: 'Marketing' },
                        { id: 'loyalty', icon: Gift, label: 'Fidelidade' },
                        { id: 'settings', icon: Settings, label: 'Configurações' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${activeTab === item.id
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-500'} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-rose-500/10 rounded-xl transition font-medium text-sm">
                        <LogOut size={20} /> Sair do Sistema
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <SystemHeader
                    title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 pb-24">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'dashboard' && renderDashboard()}
                        {activeTab === 'agenda' && renderAgenda()}
                        {activeTab === 'clients' && renderClients()}
                        {activeTab === 'products' && renderProducts()}
                        {activeTab === 'finance' && renderFinance()}
                        {activeTab === 'marketing' && renderMarketing()}
                        {activeTab === 'loyalty' && renderLoyalty()}
                        {activeTab === 'settings' && (
                            <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 shadow-sm animate-in fade-in">
                                <Settings size={48} className="mx-auto mb-4 opacity-20" />
                                <h3 className="text-xl font-bold text-slate-700">Configurações da Unidade</h3>
                                <p className="mt-2 text-sm">Gerencie horários de funcionamento, taxas e equipe.</p>
                                <button className="mt-6 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200">Salvar Preferências</button>
                            </div>
                        )}
                        {/* More tabs can be implemented similarly using consistent styling */}
                        {activeTab !== 'dashboard' && activeTab !== 'agenda' && activeTab !== 'clients' && activeTab !== 'products' && activeTab !== 'finance' && activeTab !== 'marketing' && activeTab !== 'loyalty' && activeTab !== 'settings' && (
                            <div className="flex flex-col items-center justify-center h-96 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
                                <Settings size={48} className="mb-4 opacity-20" />
                                <h3 className="text-lg font-bold text-slate-500">Módulo em Desenvolvimento</h3>
                                <p className="text-sm">A interface administrativa segue o mesmo padrão.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modals */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Gerenciar Registro">
                <div className="py-8 text-center text-slate-500">
                    <p>Formulário dinâmico para: <span className="font-bold text-indigo-600">{modalType}</span></p>
                    <p className="text-xs mt-2">Funcionalidade simulada para demonstração.</p>
                </div>
            </Modal>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
}
