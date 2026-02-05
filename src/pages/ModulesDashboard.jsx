import React, { useEffect, useMemo } from 'react';
import { useAuth } from '@/lib/AuthContext';
import ModuleCard from '@/components/dashboard/ModuleCard';
import { Sparkles, Calendar, User, LogOut, AlertCircle } from 'lucide-react';
import { createPageUrl } from '@/utils';

const modules = [
  {
    id: 'barberpro',
    title: 'BarberPro',
    description: 'Gestão completa para barbearias de elite.',
    image: '/images/barberpro_hero.png',
    icon: 'scissors',
    features: ['Agendamento 24/7', 'Financeiro', 'Fidelidade'],
    link: createPageUrl('BarberSystem')
  },
  {
    id: 'elitetraining',
    title: 'Elite Training',
    description: 'Alta performance para treinadores.',
    image: '/images/elitetraining_hero.png',
    icon: 'dumbbell',
    features: ['Treinos IA', 'Avaliação', 'Dietas'],
    link: createPageUrl('EliteSystem')
  },
  {
    id: 'vetpro',
    title: 'VetPro',
    description: 'Cuidado clínico avançado.',
    image: '/images/vetpro_hero.png',
    icon: 'stethoscope',
    features: ['Prontuário', 'Internação', 'Vacinas'],
    link: createPageUrl('VetSystem')
  },
  {
    id: 'vidrosmart',
    title: 'VidroSmart',
    description: 'Engenharia e orçamentos precisos.',
    image: '/images/vidrosmart_hero.png',
    icon: 'grid',
    features: ['Projetos', 'Orçamentos', 'Estoque'],
    link: createPageUrl('VidracariaSystem')
  }
];

export default function ModulesDashboard() {
  const { user, isAuthenticated, isLoadingAuth, logout, navigateToLogin } = useAuth();

  // Calculate days remaining in trial
  const trialInfo = useMemo(() => {
    if (!user?.createdAt) {
      return { daysRemaining: 30, isExpired: false };
    }

    const createdDate = new Date(user.createdAt);
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, 30 - daysPassed);

    return {
      daysRemaining,
      isExpired: daysRemaining === 0,
      createdDate: createdDate.toLocaleDateString('pt-BR')
    };
  }, [user]);

  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      navigateToLogin();
    }
  }, [isLoadingAuth, isAuthenticated]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Carregando seu workspace...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Account Header */}
        <div className="mb-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center relative shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 opacity-90"></div>
                <span className="relative text-white font-black text-2xl italic">V</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {user?.full_name || user?.email?.split('@')[0] || 'Usuário'}
                </h2>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Trial Badge */}
              <div className="flex items-center gap-2 bg-violet-100 text-violet-700 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {trialInfo.isExpired ? 'Teste Expirado' : `${trialInfo.daysRemaining} dias restantes`}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => logout('/Login')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2 bg-white border border-violet-200 text-violet-700 rounded-full px-4 py-2 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Seu Workspace</span>
          </div>

          {!import.meta['env']?.VITE_FIREBASE_API_KEY && (
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg animate-pulse">
              <AlertCircle className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-tight">Sync Offline (Demo)</span>
            </div>
          )}
        </div>

        {/* System Alert for Mock Mode */}
        {!import.meta['env']?.VITE_FIREBASE_API_KEY && (
          <div className="mb-10 p-5 bg-white border-l-4 border-amber-400 rounded-r-2xl shadow-sm">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Atenção: Sistema de Contas em Modo de Teste</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Para habilitar o <strong>Login Real do Google</strong> e sincronização de conta real, você precisa configurar as chaves do Firebase no seu arquivo <code className="bg-slate-100 px-1 rounded text-pink-600">.env</code>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2 brand-font italic">VEXO Workspace</h1>
          <p className="text-lg text-slate-600 font-medium">Selecione o ambiente de trabalho para começar a gerenciar seu negócio.</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {modules.map(module => (
            <ModuleCard key={module.id} {...module} isExpired={trialInfo.isExpired} />
          ))}
        </div>

        {/* Trial Info Card */}
        {!trialInfo.isExpired && (
          <div className="bg-gradient-to-r from-violet-600 via-violet-700 to-violet-800 rounded-2xl p-8 text-center shadow-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 mb-4">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Período de Teste</span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-3">
              Acesso Total por {trialInfo.daysRemaining} Dias
            </h3>

            <p className="text-violet-200 mb-6 max-w-2xl mx-auto">
              Explore todos os módulos gratuitamente. Sem cartão de crédito, sem compromisso.
              Sua conta foi criada em {trialInfo.createdDate}.
            </p>

            <div className="flex items-center justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-4xl font-bold text-white">{trialInfo.daysRemaining}</div>
                <div className="text-sm text-violet-200">dias restantes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/20">
                <div className="text-4xl font-bold text-white">4</div>
                <div className="text-sm text-violet-200">módulos ativos</div>
              </div>
            </div>
          </div>
        )}

        {/* Expired Trial Warning */}
        {trialInfo.isExpired && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-center shadow-xl">
            <h3 className="text-3xl font-bold text-white mb-3">Período de Teste Expirado</h3>
            <p className="text-red-100 mb-6">
              Seu período de teste de 30 dias terminou. Entre em contato para continuar usando o VEXO.
            </p>
            <button className="bg-white text-red-600 font-semibold px-8 py-3 rounded-lg hover:bg-red-50 transition-colors">
              Falar com Suporte
            </button>
          </div>
        )}
      </div>
    </div>
  );
}