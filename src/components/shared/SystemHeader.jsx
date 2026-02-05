import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown, Bell, Sparkles } from 'lucide-react';

export default function SystemHeader({ title, onToggleSidebar }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/Login');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    // Calculate trial days (reusing logic)
    const getTrialDays = () => {
        if (!user?.createdAt) return 30;
        const createdDate = new Date(user.createdAt);
        const today = new Date();
        const daysPassed = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        return Math.max(0, 30 - daysPassed);
    };

    const trialDays = getTrialDays();

    return (
        <header className="h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex justify-between items-center sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-4">
                {onToggleSidebar && (
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg mr-2"
                    >
                        <ChevronDown className="rotate-90" size={24} />
                    </button>
                )}
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-slate-900 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 hidden sm:flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 opacity-90"></div>
                        <span className="relative text-white font-black text-xl italic drop-shadow-sm">V</span>
                    </div>
                    <div className="h-8 w-[1px] bg-slate-200 hidden sm:block mx-1"></div>
                    <h2 className="text-xl font-black text-slate-800 brand-font truncate max-w-[200px] sm:max-w-none tracking-tight">
                        {title}
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                {/* Trial Badge (Hidden on mobile if needed) */}
                <div className="hidden sm:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full border border-indigo-100">
                    <Sparkles size={14} className="animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">{trialDays} dias de teste</span>
                </div>

                {/* Notifications Icon (Placeholder) */}
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 sm:gap-3 p-1.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                            {user?.photo_url ? (
                                <img src={user.photo_url} alt={user.full_name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                getInitials(user?.full_name || user?.email)
                            )}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-bold text-slate-800 leading-tight">
                                {user?.full_name?.split(' ')[0] || 'Usuário'}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium">Conta Admin</p>
                        </div>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                                <p className="text-sm font-bold text-slate-900 truncate">{user?.full_name}</p>
                                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => { setIsDropdownOpen(false); navigate('/ModulesDashboard'); }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                                >
                                    <Sparkles size={18} /> Painel de Módulos
                                </button>
                                <button
                                    onClick={() => { setIsDropdownOpen(false); navigate('/Settings'); }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                                >
                                    <Settings size={18} /> Configurações
                                </button>
                            </div>
                            <div className="p-2 border-t border-slate-50">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                >
                                    <LogOut size={18} /> Sair do Sistema
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
