import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import {
  Scissors, Calendar, DollarSign, Users, Smartphone, Award, ShoppingCart,
  ArrowLeft, CheckCircle2, Star, PlayCircle, Zap, TrendingUp
} from 'lucide-react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
    }

    h1, h2, h3, h4, h5, h6, .brand-font {
      font-family: 'Outfit', sans-serif;
    }

    .glass-nav {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: saturate(180%) blur(20px);
    }
  `}</style>
);

const Navbar = () => (
  <nav className="glass-nav sticky top-0 z-50 border-b border-slate-200/60 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to={createPageUrl('Home')} className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-10 h-10 bg-slate-900 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 opacity-80"></div>
          <span className="relative text-white font-black text-xl italic">V</span>
        </div>
        <span className="brand-font text-2xl font-extrabold tracking-tight text-slate-900 ml-1">VEXO</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to={createPageUrl('Login')} className="hidden sm:block text-sm font-bold text-slate-700 hover:text-indigo-600">
          Login
        </Link>
        <Link to={createPageUrl('Register')} className="px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300">
          Acessar Módulo
        </Link>
      </div>
    </div>
  </nav>
);

export default function BarbeariaInfo() {
  const module = {
    name: "BarberPro System",
    tagline: "A revolução da gestão para barbearias de elite",
    description: "O sistema definitivo que automatiza sua rotina, elimina o no-show e proporciona uma experiência VIP para seus clientes desde o primeiro agendamento.",
    color: "from-amber-500 to-orange-600",
    textColor: "text-amber-600",
    image: "/images/barberpro_hero.png",
    gallery: [
      "/images/barberpro_gallery.png",
      "/images/barberpro_gallery.png",
      "/images/barberpro_gallery.png"
    ],
    stats: [
      { value: "+30%", label: "Faturamento" },
      { value: "-90%", label: "Faltas (No-Show)" },
      { value: "24/7", label: "Agendamento" }
    ],
    testimonial: {
      text: "Desde que implementamos o BarberPro, nossa taxa de ocupação subiu drasticamente. Os clientes amam o app e nós amamos a organização financeira.",
      author: "Marcos Silva, Dono da Royal Cuts"
    },
    deepDive: [
      {
        title: "Gestão de Comissionamento Complexa",
        desc: "Sabemos que cada barbeiro pode ter um acordo diferente. Configure percentuais por serviço, produto ou profissional. O sistema calcula tudo automaticamente no final do dia.",
        image: "/images/barberpro_gallery.png"
      },
      {
        title: "Experiência do Cliente Premium",
        desc: "Seu cliente recebe lembretes via WhatsApp, avalia o atendimento e acumula pontos de fidelidade. Um ciclo vicioso de retorno e satisfação.",
        image: "https://images.unsplash.com/photo-1634480532822-7265a0c9c733?auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      { icon: Calendar, title: "Agenda Inteligente", desc: "Sincronização em tempo real e lista de espera automática." },
      { icon: DollarSign, title: "Financeiro Blindado", desc: "Fluxo de caixa, DRE e controle de despesas operacionais." },
      { icon: Users, title: "Gestão de Equipe", desc: "Controle de horários, escalas e performance individual." },
      { icon: Smartphone, title: "App White-Label", desc: "Seu próprio aplicativo na loja com sua logo e cores." },
      { icon: Award, title: "Clube de Fidelidade", desc: "Cashback e pontos configuráveis para reter clientes." },
      { icon: ShoppingCart, title: "Loja de Produtos", desc: "Controle de estoque e venda de produtos (pomadas, óleos)." }
    ],
    features: ["Agendamento Online", "Comissões Automáticas", "Controle de Estoque", "App do Cliente", "Disparo de WhatsApp", "Fechamento de Caixa", "Relatórios de ROI", "Múltiplas Unidades"]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <GlobalStyles />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={module.image} alt={module.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Link to={createPageUrl('Home')} className="flex items-center gap-2 text-white/60 hover:text-white mb-8 font-medium transition-colors text-sm uppercase tracking-wider">
              <ArrowLeft size={16} /> Voltar para Soluções
            </Link>

            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <Scissors className="text-white" size={20} />
              <span className="text-white/90 text-xs font-bold uppercase tracking-widest">{module.name}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight">
              {module.tagline}
            </h1>

            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-light">
              {module.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl('Register')} className="text-lg px-8 py-5 rounded-2xl shadow-xl shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-500 hover:brightness-110 text-white font-bold text-center transition-all">
                Começar Teste Grátis
              </Link>
              <button className="text-lg px-8 py-5 bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white rounded-2xl font-bold border-2 flex items-center justify-center gap-2">
                <PlayCircle size={20} />
                Ver Demonstração
              </button>
            </div>
          </div>

          {/* Card Flutuante de Estatísticas */}
          <div className="hidden lg:block animate-fade-in delay-150">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-sm ml-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Impacto Médio</p>
                  <p className="text-white font-bold text-lg">Resultados Reais</p>
                </div>
              </div>
              <div className="space-y-6">
                {module.stats.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <span className="text-3xl font-black text-white">{stat.value}</span>
                    <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar Mobile */}
      <section className="lg:hidden bg-slate-900 py-8 px-6 border-b border-slate-800">
        <div className="flex justify-around gap-4 flex-wrap">
          {module.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {module.deepDive.map((item, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
              <div className="lg:w-1/2">
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${module.color} opacity-30 blur-2xl rounded-[3rem] group-hover:opacity-50 transition duration-500`}></div>
                  <img src={item.image} alt={item.title} className="relative rounded-[2.5rem] shadow-2xl w-full object-cover h-[400px] transform transition duration-500 hover:scale-[1.01]" />
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg max-w-xs hidden md:block">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                      <CheckCircle2 size={14} className="text-green-500" /> Feature Premium
                    </div>
                    <p className="text-slate-900 font-bold text-sm">Tecnologia exclusiva VEXO</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`}></span>
                  Solução Especializada
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">{item.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">{item.desc}</p>
                <button className="flex items-center gap-2 text-amber-600 hover:gap-4 transition-all font-bold">
                  Saiba mais sobre isso <ArrowLeft className="rotate-180" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Um sistema feito para o seu dia a dia</h2>
            <p className="text-slate-500">Imagens reais de ambientes transformados pela nossa tecnologia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-96">
            {module.gallery.map((img, i) => (
              <div key={i} className={`relative rounded-3xl overflow-hidden group h-64 md:h-full ${i === 1 ? 'md:-mt-10 md:mb-10 shadow-2xl z-10' : 'shadow-lg'}`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500"></div>
                <img src={img} alt="Gallery" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-gradient-to-br ${module.color} rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl`}>
            <div className="relative z-10">
              <div className="flex justify-center mb-8 gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="fill-white text-white" size={20} />)}
              </div>
              <blockquote className="text-2xl md:text-4xl font-bold text-white leading-tight mb-8">
                "{module.testimonial.text}"
              </blockquote>
              <cite className="text-white/80 font-medium not-italic text-lg">
                — {module.testimonial.author}
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Funcionalidades */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Zap size={14} />
              Suite Completa
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Poder operacional incomparável
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Cada ferramenta foi desenhada pensando nos desafios reais da sua profissão
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {module.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className={module.textColor} size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de Features */}
      <section className="py-16 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mb-10">Checklist de Funcionalidades</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 max-w-5xl mx-auto">
            {module.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`}></div>
                <span className="text-slate-300 font-medium text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-50"></div>
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${module.color} opacity-20 blur-[100px] rounded-full`}></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
              Comece a transformação hoje.
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Junte-se a mais de 5.000 profissionais que elevaram o padrão de seus negócios com a VEXO.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('ModulesDashboard')} className={`px-10 py-5 rounded-full bg-gradient-to-r ${module.color} text-white font-bold text-lg shadow-lg hover:brightness-110 transform hover:-translate-y-1 transition-all`}>
                Criar Conta Gratuita
              </Link>
              <button className="px-10 py-5 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 transition-all">
                Agendar Demonstração
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-8 font-medium">
              30 dias de garantia incondicional • Sem fidelidade
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 bg-white text-slate-950 rounded flex items-center justify-center font-black italic">V</div>
                <span className="brand-font text-2xl font-extrabold tracking-tight">VEXO</span>
              </div>
              <p className="text-slate-400 max-w-sm text-lg leading-relaxed">
                Redefinindo os limites da produtividade profissional através de tecnologia proprietária e design focado no usuário.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-indigo-400">Plataforma</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><button className="hover:text-white transition">Como Funciona</button></li>
                <li><button className="hover:text-white transition">Novos Setores</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-indigo-400">Contato</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-medium">
                <li><button className="hover:text-white transition">Suporte 24/7</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-xs tracking-widest uppercase">© 2026 VEXO GLOBAL SYSTEMS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}