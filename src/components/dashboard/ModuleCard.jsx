import React from 'react';
import { ArrowRight, Scissors, Dumbbell, Stethoscope, Grid, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
    scissors: Scissors,
    dumbbell: Dumbbell,
    stethoscope: Stethoscope,
    grid: Grid
};

export default function ModuleCard({ title, description, image, icon, features, link, isExpired }) {
    const Icon = iconMap[icon] || Grid;

    return (
        <div className={`group relative bg-white rounded-2xl shadow-sm transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full ${isExpired ? 'opacity-75 grayscale-[0.5]' : 'hover:shadow-xl'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                    <Icon className="w-6 h-6 text-violet-600" />
                </div>
                {isExpired && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 bg-slate-900/40 backdrop-blur-[2px]">
                        <div className="bg-white/90 px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                            <Lock className="w-4 h-4 text-red-600" />
                            <span className="text-xs font-black uppercase text-slate-900">Acesso Bloqueado</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {description}
                </p>

                <div className="space-y-2 mb-6 flex-1">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                            {feature}
                        </div>
                    ))}
                </div>

                {link && !isExpired ? (
                    <Link
                        to={link}
                        className="w-full py-3.5 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                        Acessar Módulo
                        <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                ) : (
                    <button
                        className="w-full py-3.5 px-4 bg-slate-900 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                        onClick={() => !link ? alert('Em breve!') : window.location.href = '#suporte'}
                    >
                        {isExpired ? 'Assinar Agora' : 'Em Breve'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
