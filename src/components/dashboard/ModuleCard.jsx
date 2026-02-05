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
        <div className={`group relative bg-white rounded-[2.5rem] shadow-sm transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full ${isExpired ? 'opacity-75 grayscale-[0.5]' : 'hover:shadow-xl hover:-translate-y-2'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
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

            <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-violet-600 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-2">
                    {description}
                </p>

                <div className="space-y-2 mb-8 flex-1">
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
                        className="block w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm transition hover:bg-violet-600 text-center"
                    >
                        Acessar Módulo
                    </Link>
                ) : (
                    <button
                        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm transition hover:bg-violet-600 text-center"
                        onClick={() => !link ? alert('Em breve!') : window.location.href = '#suporte'}
                    >
                        {isExpired ? 'Assinar Agora' : 'Em Breve'}
                    </button>
                )}
            </div>
        </div>
    );
}
