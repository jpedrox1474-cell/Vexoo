import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useAuth } from '@/lib/AuthContext';
import {
  TrendingUp, DollarSign, Users, Calendar, ArrowRight, Bell, Settings,
  User, LogOut, Menu, X, CheckCircle2, Clock, Activity, Package,
  BarChart3, Zap, Target, Award, Sparkles, ChevronRight, Plus,
  FileText, Eye, Edit, Trash2, LayoutDashboard, CreditCard, MessageSquare
} from 'lucide-react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: #fafafa;
    }

    h1, h2, h3, h4, h5, h6, .brand-font {
      font-family: 'Outfit', sans-serif;
    }

    .glass-effect {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: saturate(180%) blur(20px);
    }

    .card-premium {
      background: #ffffff;
      border: 1px solid #eef2f6;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .card-premium:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px -12px rgba(15, 23, 42, 0.1);
      border-color: #6366f1;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-slide-up {
      animation: slideUp 0.6s ease-out forwards;
    }
  `}</style>
);

export default function Dashboard() {
  const { user, logout, navigateToLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      // Logic handled by ProtectedRoute, but good fallback
    }
  }, [user]);

  const stats = [
    {
      label: 'Receita Mensal',
      value: 'R$ 45.280',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      label: 'Clientes Ativos',
      value: '1.247',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      label: 'Agendamentos',
      value: '342',
      change: '+23.1%',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      label: 'Taxa de Conversão',
      value: '68%',
      change: '+5.4%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <GlobalStyles />

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl('Home')} className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-10 h-10 bg-slate-900 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 opacity-80"></div>
                <span className="relative text-white font-black text-xl italic drop-shadow-sm">V</span>
              </div>
              <span className="brand-font text-2xl font-extrabold tracking-tight text-slate-900 ml-1">VEXO</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-800 leading-tight">{user?.full_name || 'Usuário'}</div>
                  <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Conta Admin</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  {user?.full_name?.charAt(0) || <User size={18} />}
                </div>
              </div>

              <button
                onClick={() => logout('/Login')}
                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Section */}
        <div className="mb-10 animate-slide-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={12} className="animate-pulse" /> Dashboard Premium
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-2 brand-font">
                Olá, {user?.full_name?.split(' ')[0] || 'Usuário'}! 👋
              </h1>
              <p className="text-lg text-slate-500 font-medium tracking-tight">
                Veja o que está acontecendo no seu ecossistema hoje.
              </p>
            </div>
            <Link
              to={createPageUrl('ModulesDashboard')}
              className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-slate-900 text-white hover:bg-violet-600 shadow-xl shadow-violet-500/20 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <LayoutDashboard size={18} />
              Acessar Módulos
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="card-premium rounded-[2rem] p-6 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-black bg-emerald-50 px-2 py-1 rounded-lg">
                    <TrendingUp size={12} />
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 card-premium rounded-[2.5rem] p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Performance Global</h2>
                <p className="text-slate-400 text-sm font-medium italic">Dados integrados de todos os seus terminais</p>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
                <Target size={20} />
              </button>
            </div>

            <div className="h-64 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group cursor-pointer hover:bg-white hover:border-indigo-300 transition-all">
              <BarChart3 size={48} className="mb-4 opacity-20 group-hover:opacity-40 transition-opacity text-indigo-600" />
              <p className="font-bold text-sm">Clique para carregar métricas detalhadas</p>
            </div>
          </div>

          <div className="card-premium rounded-[2.5rem] p-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-black text-slate-900 mb-6">Atividade</h3>
            <div className="space-y-6">
              {[
                { icon: CheckCircle2, text: 'Venda processada', time: 'há 2 min', color: 'text-emerald-500' },
                { icon: Users, text: 'Novo cliente (VetPro)', time: 'há 15 min', color: 'text-blue-500' },
                { icon: Calendar, text: 'Agendamento (Barber)', time: 'há 40 min', color: 'text-indigo-500' },
                { icon: Zap, text: 'Sincronização OK', time: 'há 1h', color: 'text-amber-500' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`mt-1 h-2 w-2 rounded-full ${item.color.replace('text-', 'bg-')} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.text}</p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              Histórico Completo
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {[
            { label: 'Meu Perfil', icon: User, tab: 'Settings' },
            { label: 'Assinatura', icon: CreditCard, tab: 'Settings' },
            { label: 'Equipe', icon: Users, tab: 'ModulesDashboard' },
            { label: 'Ajuda', icon: MessageSquare, tab: 'Home' }
          ].map((link, i) => (
            <Link
              key={i}
              to={createPageUrl(link.tab)}
              className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <link.icon size={20} />
              </div>
              <span className="font-bold text-slate-700 text-sm">{link.label}</span>
              <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

