import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Calendar, PawPrint, DollarSign, Users, Package,
    Stethoscope, Settings, Menu, Plus, Search, BedDouble,
    ShoppingCart, FileText, Activity, UserCheck, Truck, BarChart3,
    ShieldCheck, CreditCard, HeartPulse, Syringe, LogOut, X, Edit2,
    Trash2, Eye, AlertCircle, CheckCircle2, TrendingUp, TrendingDown,
    Printer, Save, Download
} from 'lucide-react';
import { INITIAL_DATA, MENU_STRUCTURE } from '@/data/vetSystemData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import SystemHeader from '@/components/shared/SystemHeader';

// --- UTILS & COMPONENTS ---

const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const StatCard = ({ title, value, trend, icon: Icon, color, subtitle }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group relative overflow-hidden">
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 ${color}`}></div>
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl lg:text-3xl font-black text-slate-800 mt-2 tracking-tight">{value}</h3>
                {trend && <p className={`text-xs mt-2 font-bold flex items-center gap-1 ${trend.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{trend.includes('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend}</p>}
                {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
            </div>
            <div className={`p-3 rounded-xl ${color} text-white shadow-lg transform group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
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

const Table = ({ headers, data, actions = null, emptyMessage = "Nenhum registro encontrado." }) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead>
                <tr className="border-b-2 border-slate-100 bg-slate-50/50">
                    {headers.map((h, idx) => <th key={idx} className="text-left p-4 text-xs font-black text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>)}
                    {actions && <th className="text-right p-4 text-xs font-black text-slate-500 uppercase tracking-wider">Ações</th>}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {data.length > 0 ? (
                    data.map((row, idx) => (
                        <tr key={idx} className="hover:bg-indigo-50/30 transition-colors group">
                            {Object.values(row).slice(1).map((cell, cellIdx) => (
                                <td key={cellIdx} className="p-4 text-sm text-slate-700 whitespace-nowrap">{cell}</td>
                            ))}
                            {actions && <td className="p-4 text-right"><div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">{actions(row)}</div></td>}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={headers.length + (actions ? 1 : 0)} className="p-8 text-center text-slate-400">
                            <div className="flex flex-col items-center gap-2">
                                <Search size={32} className="opacity-20" />
                                <p>{emptyMessage}</p>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 z-[60] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl text-white font-semibold transform transition-all animate-in slide-in-from-right ${type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
            {type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            {message}
        </div>
    );
};

// --- APP COMPONENT ---

export default function VetSystem() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Removal of redundant auth check (now handled by ProtectedRoute)

    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [data, setData] = useState(INITIAL_DATA);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [carrinho, setCarrinho] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState(null);

    const showNotification = (msg, type = 'success') => {
        setNotification({ message: msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // CRUD GENÉRICO
    const handleSave = (collection, item) => {
        const isEdit = !!item.id;
        let newItem = { ...item };

        if (!isEdit) {
            // Gerador de ID simples
            const maxId = data[collection].length > 0 ? Math.max(...data[collection].map(i => i.id)) : 0;
            newItem.id = maxId + 1;
            setData(prev => ({ ...prev, [collection]: [...prev[collection], newItem] }));
            showNotification('Registro criado com sucesso!');
        } else {
            setData(prev => ({ ...prev, [collection]: prev[collection].map(i => i.id === item.id ? item : i) }));
            showNotification('Registro atualizado com sucesso!');
        }
        setShowModal(false);
        setEditingItem(null);
    };

    const handleDelete = (collection, id) => {
        if (confirm('Tem certeza que deseja excluir este registro?')) {
            setData(prev => ({ ...prev, [collection]: prev[collection].filter(i => i.id !== id) }));
            showNotification('Registro excluído.', 'error');
        }
    };

    const openForm = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        setShowModal(true);
    };

    // --- FILTRAGEM GLOBAL CORRIGIDA ---
    const filteredData = (collection) => {
        const collectionData = data[collection] || [];
        if (!searchTerm) return collectionData;

        const lowerTerm = searchTerm.toLowerCase();

        return collectionData.filter(item => {
            // Cria um array com todos os valores das propriedades do objeto
            const values = Object.values(item);

            // Verifica se algum valor inclui o termo de busca
            return values.some(val =>
                String(val).toLowerCase().includes(lowerTerm)
            );
        });
    };

    // --- COMPONENTES DE FORMULÁRIO ---

    const FormGeneric = ({ fields, onSubmit, initialValues, title }) => {
        const [form, setForm] = useState(initialValues || {});

        const handleChange = (e) => {
            const { name, value } = e.target;
            setForm(prev => ({ ...prev, [name]: value }));
        };

        return (
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.name} className="space-y-1">
                        {field.label && <label className="text-xs font-bold text-slate-500 uppercase">{field.label}</label>}
                        {field.type === 'select' ? (
                            <select name={field.name} value={form[field.name] || ''} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" required={field.required}>
                                <option value="">Selecione...</option>
                                {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea name={field.name} value={form[field.name] || ''} onChange={handleChange} rows={4} placeholder={field.placeholder} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" required={field.required} />
                        ) : (
                            <input type={field.type || 'text'} name={field.name} value={form[field.name] || ''} onChange={handleChange} placeholder={field.placeholder} step={field.step} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" required={field.required} />
                        )}
                    </div>
                ))}
                <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-200 flex justify-center items-center gap-2">
                    <Save size={20} /> Salvar Registro
                </button>
            </form>
        );
    };

    const getFormConfig = (type) => {
        const petOptions = data.pets.map(p => ({ value: p.id, label: `${p.nome} (${p.tutor})` }));
        const vetOptions = data.equipe.filter(e => e.cargo && (e.cargo.includes('Veterinário') || e.cargo.includes('Médic'))).map(v => ({ value: v.nome, label: v.nome }));
        const tutorOptions = data.tutores.map(t => ({ value: t.id, label: t.nome }));

        switch (type) {
            case 'agenda':
                return {
                    collection: 'agenda',
                    initial: editingItem || { petId: '', data: new Date().toISOString().split('T')[0], hora: '', tipo: '', veterinario: '', status: 'Aguardando' },
                    fields: [
                        { name: 'petId', type: 'select', options: petOptions, required: true, label: 'Paciente' },
                        { name: 'tipo', type: 'select', options: [{ value: 'Consulta', label: 'Consulta' }, { value: 'Vacina', label: 'Vacina' }, { value: 'Check-up', label: 'Check-up' }, { value: 'Retorno', label: 'Retorno' }], required: true, label: 'Tipo' },
                        { name: 'veterinario', type: 'select', options: vetOptions, required: true, label: 'Veterinário' },
                        { name: 'data', type: 'date', required: true, label: 'Data' },
                        { name: 'hora', type: 'time', required: true, label: 'Horário' },
                    ],
                    transform: (formData) => {
                        const pet = data.pets.find(p => p.id === parseInt(formData.petId));
                        return { ...formData, petId: parseInt(formData.petId), pet: pet?.nome, tutor: pet?.tutor };
                    }
                };
            case 'pet':
                return {
                    collection: 'pets',
                    initial: editingItem || { nome: '', especie: '', raca: '', idade: '', tutorId: '', peso: '', status: 'Saudável' },
                    fields: [
                        { name: 'nome', label: 'Nome do Pet', required: true },
                        { name: 'especie', type: 'select', label: 'Espécie', options: [{ value: 'Cão', label: 'Cão' }, { value: 'Gato', label: 'Gato' }, { value: 'Ave', label: 'Ave' }, { value: 'Outro', label: 'Outro' }], required: true },
                        { name: 'raca', label: 'Raça', required: true },
                        { name: 'idade', label: 'Idade', required: true },
                        { name: 'peso', label: 'Peso (ex: 10kg)', required: true },
                        { name: 'tutorId', type: 'select', label: 'Tutor Responsável', options: tutorOptions, required: true },
                    ],
                    transform: (formData) => {
                        const tutor = data.tutores.find(t => t.id === parseInt(formData.tutorId));
                        return { ...formData, tutorId: parseInt(formData.tutorId), tutor: tutor?.nome };
                    }
                };
            case 'tutor':
                return {
                    collection: 'tutores',
                    initial: editingItem || { nome: '', cpf: '', telefone: '', email: '', endereco: '', pets: [] },
                    fields: [
                        { name: 'nome', label: 'Nome Completo', required: true },
                        { name: 'cpf', label: 'CPF', required: true },
                        { name: 'telefone', label: 'Telefone/WhatsApp', required: true },
                        { name: 'email', label: 'Email', type: 'email', required: true },
                        { name: 'endereco', label: 'Endereço Completo', required: true },
                    ]
                };
            case 'produto':
                return {
                    collection: 'produtos',
                    initial: editingItem || { nome: '', categoria: '', estoque: 0, estoqueMin: 5, preco: 0, fornecedor: '' },
                    fields: [
                        { name: 'nome', label: 'Nome do Produto', required: true },
                        { name: 'categoria', type: 'select', label: 'Categoria', options: [{ value: 'Medicamentos', label: 'Medicamentos' }, { value: 'Alimentação', label: 'Alimentação' }, { value: 'Higiene', label: 'Higiene' }], required: true },
                        { name: 'estoque', type: 'number', label: 'Qtd. Estoque', required: true },
                        { name: 'estoqueMin', type: 'number', label: 'Estoque Mínimo', required: true },
                        { name: 'preco', type: 'number', step: '0.01', label: 'Preço de Venda (R$)', required: true },
                        { name: 'fornecedor', label: 'Fornecedor', required: true },
                    ],
                    transform: (d) => ({ ...d, estoque: parseInt(d.estoque), estoqueMin: parseInt(d.estoqueMin), preco: parseFloat(d.preco) })
                };
            case 'prontuario':
                return {
                    collection: 'prontuarios',
                    initial: editingItem || { petId: '', data: new Date().toISOString().split('T')[0], veterinario: '', queixa: '', diagnostico: '', tratamento: '' },
                    fields: [
                        { name: 'petId', type: 'select', label: 'Paciente', options: petOptions, required: true },
                        { name: 'veterinario', type: 'select', label: 'Veterinário', options: vetOptions, required: true },
                        { name: 'data', type: 'date', label: 'Data do Atendimento', required: true },
                        { name: 'queixa', type: 'textarea', label: 'Queixa Principal', required: true },
                        { name: 'diagnostico', type: 'textarea', label: 'Diagnóstico', required: true },
                        { name: 'tratamento', type: 'textarea', label: 'Tratamento/Prescrição', required: true },
                    ],
                    transform: (d) => ({ ...d, petId: parseInt(d.petId) })
                };
            case 'internacao':
                return {
                    collection: 'internacoes',
                    initial: editingItem || { petId: '', entrada: new Date().toISOString().split('T')[0], motivo: '', veterinario: '', status: 'Internado' },
                    fields: [
                        { name: 'petId', type: 'select', label: 'Paciente', options: petOptions, required: true },
                        { name: 'veterinario', type: 'select', label: 'Veterinário Responsável', options: vetOptions, required: true },
                        { name: 'entrada', type: 'date', label: 'Data Entrada', required: true },
                        { name: 'motivo', label: 'Motivo da Internação', required: true },
                    ],
                    transform: (d) => {
                        const pet = data.pets.find(p => p.id === parseInt(d.petId));
                        return { ...d, petId: parseInt(d.petId), pet: pet?.nome };
                    }
                };
            case 'cirurgia':
                return {
                    collection: 'cirurgias',
                    initial: editingItem || { petId: '', data: '', hora: '', tipo: '', veterinario: '', status: 'Agendada' },
                    fields: [
                        { name: 'petId', type: 'select', label: 'Paciente', options: petOptions, required: true },
                        { name: 'tipo', label: 'Procedimento Cirúrgico', required: true },
                        { name: 'veterinario', type: 'select', label: 'Cirurgião', options: vetOptions, required: true },
                        { name: 'data', type: 'date', label: 'Data', required: true },
                        { name: 'hora', type: 'time', label: 'Hora', required: true },
                    ],
                    transform: (d) => {
                        const pet = data.pets.find(p => p.id === parseInt(d.petId));
                        return { ...d, petId: parseInt(d.petId), pet: pet?.nome };
                    }
                };
            case 'conta':
                return {
                    collection: 'contasPagar',
                    initial: editingItem || { descricao: '', valor: 0, vencimento: '', categoria: 'Fixo', status: 'Pendente' },
                    fields: [
                        { name: 'descricao', label: 'Descrição da Despesa', required: true },
                        { name: 'valor', type: 'number', step: '0.01', label: 'Valor (R$)', required: true },
                        { name: 'vencimento', type: 'date', label: 'Data de Vencimento', required: true },
                        { name: 'categoria', type: 'select', label: 'Categoria', options: [{ value: 'Fixo', label: 'Fixo' }, { value: 'Fornecedor', label: 'Fornecedor' }, { value: 'Impostos', label: 'Impostos' }, { value: 'Outros', label: 'Outros' }], required: true },
                        { name: 'status', type: 'select', label: 'Status Inicial', options: [{ value: 'Pendente', label: 'Pendente' }, { value: 'Paga', label: 'Paga' }], required: true },
                    ],
                    transform: (d) => ({ ...d, valor: parseFloat(d.valor) })
                };

            case 'vacina':
                return {
                    collection: 'vacinas',
                    initial: editingItem || { petId: '', vacina: '', lote: '', data: new Date().toISOString().split('T')[0], proxima: '', veterinario: '' },
                    fields: [
                        { name: 'petId', type: 'select', label: 'Paciente', options: petOptions, required: true },
                        { name: 'vacina', label: 'Nome da Vacina', required: true },
                        { name: 'lote', label: 'Lote', required: true },
                        { name: 'data', type: 'date', label: 'Data Aplicação', required: true },
                        { name: 'proxima', type: 'date', label: 'Próxima Dose', required: true },
                        { name: 'veterinario', type: 'select', label: 'Veterinário', options: vetOptions, required: true },
                    ],
                    transform: (d) => {
                        const pet = data.pets.find(p => p.id === parseInt(d.petId));
                        return { ...d, petId: parseInt(d.petId), pet: pet?.nome };
                    }
                };

            case 'exame':
                return {
                    collection: 'exames',
                    initial: editingItem || { petId: '', tipo: '', data: new Date().toISOString().split('T')[0], veterinario: '', resultado: 'Aguardando', status: 'Solicitado' },
                    fields: [
                        { name: 'petId', type: 'select', label: 'Paciente', options: petOptions, required: true },
                        { name: 'tipo', label: 'Tipo de Exame', required: true },
                        { name: 'veterinario', type: 'select', label: 'Veterinário Solicitante', options: vetOptions, required: true },
                        { name: 'data', type: 'date', label: 'Data Coleta', required: true },
                        { name: 'resultado', label: 'Resultado (Resumo)', required: false },
                        { name: 'status', type: 'select', label: 'Status', options: [{ value: 'Solicitado', label: 'Solicitado' }, { value: 'Concluído', label: 'Concluído' }], required: true },
                    ],
                    transform: (d) => {
                        const pet = data.pets.find(p => p.id === parseInt(d.petId));
                        return { ...d, petId: parseInt(d.petId), pet: pet?.nome };
                    }
                };

            case 'equipe':
                return {
                    collection: 'equipe',
                    initial: editingItem || { nome: '', cargo: '', crmv: '', especialidade: '', status: 'Ativo' },
                    fields: [
                        { name: 'nome', label: 'Nome Completo', required: true },
                        { name: 'cargo', type: 'select', label: 'Cargo', options: [{ value: 'Médico Veterinário', label: 'Médico Veterinário' }, { value: 'Auxiliar Vet', label: 'Auxiliar Vet' }, { value: 'Recepcionista', label: 'Recepcionista' }, { value: 'Administrativo', label: 'Administrativo' }], required: true },
                        { name: 'crmv', label: 'CRMV (Se aplicável)', required: false },
                        { name: 'especialidade', label: 'Especialidade/Função', required: true },
                        { name: 'status', type: 'select', label: 'Status', options: [{ value: 'Ativo', label: 'Ativo' }, { value: 'Inativo', label: 'Inativo' }], required: true },
                    ]
                };

            default:
                return null;
        }
    };

    const renderView = () => {
        // Cálculos para Dashboard e Financeiro
        const today = new Date().toISOString().split('T')[0];
        const totalVendas = data.vendas.reduce((acc, curr) => acc + curr.total, 0);
        const totalDespesas = data.contasPagar.filter(c => c.status === 'Paga').reduce((acc, curr) => acc + curr.valor, 0);
        const lucro = totalVendas - totalDespesas;

        // Configurações de colunas para tabelas genéricas
        const colunasAgenda = ['Paciente', 'Tutor', 'Data', 'Hora', 'Tipo', 'Veterinário', 'Status'];
        const mapAgenda = (a) => ({ id: a.id, pet: a.pet, tutor: a.tutor, data: new Date(a.data).toLocaleDateString('pt-BR'), hora: a.hora, tipo: a.tipo, vet: a.veterinario, status: <span className={`badge ${a.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{a.status}</span> });

        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard title="Faturamento Total" value={formatCurrency(totalVendas)} trend="+12.5%" icon={DollarSign} color="bg-emerald-500" subtitle="Vendas acumuladas" />
                            <StatCard title="Agendamentos Hoje" value={data.agenda.filter(a => a.data === today).length} subtitle="Pacientes agendados" icon={Calendar} color="bg-indigo-500" trend="" />
                            <StatCard title="Pacientes Ativos" value={data.pets.length} trend="+4.3%" icon={PawPrint} color="bg-amber-500" subtitle="Base total" />
                            <StatCard title="Internações" value={data.internacoes.filter(i => i.status === 'Internado').length} icon={BedDouble} color="bg-rose-500" subtitle="Ocupação atual" trend="" />
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Agenda Preview */}
                            <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-black text-slate-800 flex gap-2 items-center"><Calendar className="text-indigo-600" /> Agenda de Hoje</h3>
                                    <button onClick={() => setActiveTab('agenda')} className="text-indigo-600 text-sm font-bold hover:bg-indigo-50 px-3 py-1 rounded-lg transition-colors">Ver completa</button>
                                </div>
                                <div className="space-y-4">
                                    {data.agenda.filter(a => a.data === today).length > 0 ? (
                                        data.agenda.filter(a => a.data === today).map(a => (
                                            <div key={a.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all">
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-indigo-100 font-bold text-indigo-600 text-lg shadow-sm">{a.pet[0]}</div>
                                                    <div>
                                                        <p className="font-bold text-slate-800">{a.pet} <span className="text-slate-400 font-normal">({a.tutor})</span></p>
                                                        <p className="text-xs text-slate-500 font-medium bg-slate-200 px-2 py-0.5 rounded-md inline-block mt-1">{a.tipo} • {a.veterinario}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-lg text-slate-700">{a.hora}</p>
                                                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${a.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{a.status}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-10 text-slate-400">
                                            <Calendar size={48} className="mx-auto mb-3 opacity-20" />
                                            <p>Nenhum agendamento para hoje.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Alerts & Quick Actions */}
                            <div className="space-y-6">
                                {/* Alertas */}
                                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10"><AlertCircle className="text-amber-400" /> Atenção Necessária</h3>
                                    <div className="space-y-3 relative z-10">
                                        {data.produtos.filter(p => p.estoque < p.estoqueMin).length > 0 && (
                                            <div className="flex gap-3 items-start bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                                                <Package className="text-amber-400 shrink-0 mt-0.5" size={16} />
                                                <div>
                                                    <p className="text-sm font-bold text-amber-100">Estoque Baixo</p>
                                                    <p className="text-xs text-slate-400">{data.produtos.filter(p => p.estoque < p.estoqueMin).length} produtos precisam de reposição.</p>
                                                </div>
                                            </div>
                                        )}
                                        {data.contasPagar.filter(c => c.status === 'Pendente' && new Date(c.vencimento) <= new Date()).length > 0 && (
                                            <div className="flex gap-3 items-start bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                                                <CreditCard className="text-rose-400 shrink-0 mt-0.5" size={16} />
                                                <div>
                                                    <p className="text-sm font-bold text-rose-100">Contas Vencendo</p>
                                                    <p className="text-xs text-slate-400">Existem contas pendentes para hoje.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-4">Acesso Rápido</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => openForm('agenda')} className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm font-bold transition-colors flex flex-col items-center gap-2">
                                            <Calendar size={20} /> Agendar
                                        </button>
                                        <button onClick={() => openForm('pet')} className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-sm font-bold transition-colors flex flex-col items-center gap-2">
                                            <PawPrint size={20} /> Novo Pet
                                        </button>
                                        <button onClick={() => setActiveTab('pdv')} className="p-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-sm font-bold transition-colors flex flex-col items-center gap-2">
                                            <ShoppingCart size={20} /> Vender
                                        </button>
                                        <button onClick={() => openForm('prontuario')} className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-sm font-bold transition-colors flex flex-col items-center gap-2">
                                            <Stethoscope size={20} /> Prontuário
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'agenda':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div><h2 className="text-2xl font-black text-slate-800">Agenda Médica</h2><p className="text-slate-500">Gestão de consultas e retornos</p></div>
                            <button onClick={() => openForm('agenda')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500 shadow-lg shadow-indigo-200 transition-all"><Plus size={20} /> Novo Agendamento</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <Table
                                headers={colunasAgenda}
                                data={filteredData('agenda').map(mapAgenda)}
                                actions={(row) => (
                                    <>
                                        <button onClick={() => openForm('agenda', data.agenda.find(a => a.id === row.id))} className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete('agenda', row.id)} className="p-2 hover:bg-rose-50 rounded-lg text-rose-600 transition-colors"><Trash2 size={16} /></button>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                );

            case 'atendimento':
                const emEspera = data.agenda.filter(a => a.data === today && (a.status === 'Confirmado' || a.status === 'Em Atendimento'));
                return (
                    <div className="space-y-6">
                        <div><h2 className="text-2xl font-black text-slate-800">Fila de Atendimento</h2><p className="text-slate-500">Pacientes do dia aguardando chamada</p></div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {emEspera.length > 0 ? emEspera.map((item, idx) => (
                                <div key={item.id} className={`p-6 rounded-2xl border-2 transition-all ${item.status === 'Em Atendimento' ? 'bg-indigo-50 border-indigo-500 shadow-lg' : 'bg-white border-slate-100 hover:border-indigo-200'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-black text-slate-600">{idx + 1}</div>
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${item.status === 'Em Atendimento' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{item.status}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800">{item.pet}</h3>
                                    <p className="text-sm text-slate-500 mb-4">{item.tutor} • <span className="font-semibold text-indigo-600">{item.tipo}</span></p>

                                    <div className="space-y-2">
                                        {item.status !== 'Em Atendimento' && (
                                            <button onClick={() => handleSave('agenda', { ...item, status: 'Em Atendimento' })} className="w-full py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors">Chamar Paciente</button>
                                        )}
                                        <button onClick={() => handleSave('agenda', { ...item, status: 'Finalizado' })} className="w-full py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors">Finalizar</button>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-3 text-center py-12 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-300">
                                    <UserCheck size={48} className="mx-auto mb-4 opacity-30" />
                                    <p>Não há pacientes na fila de espera para hoje.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'prontuario':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div><h2 className="text-2xl font-black text-slate-800">Prontuário Digital</h2><p className="text-slate-500">Histórico clínico</p></div>
                            <button onClick={() => openForm('prontuario')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500 shadow-lg shadow-indigo-200 transition-all"><Plus size={20} /> Novo Registro</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Data', 'Paciente', 'Veterinário', 'Queixa', 'Diagnóstico']}
                                data={filteredData('prontuarios').map(p => {
                                    const pet = data.pets.find(pet => pet.id === p.petId);
                                    return { id: p.id, data: new Date(p.data).toLocaleDateString('pt-BR'), pet: pet?.nome || 'N/A', vet: p.veterinario, queixa: p.queixa, diag: p.diagnostico };
                                })}
                                actions={(row) => (
                                    <button className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600"><Eye size={16} /></button>
                                )}
                            />
                        </div>
                    </div>
                );

            case 'internacao':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div><h2 className="text-2xl font-black text-slate-800">Internação & UTI</h2><p className="text-slate-500">Monitoramento de pacientes</p></div>
                            <button onClick={() => openForm('internacao')} className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-rose-500 shadow-lg shadow-rose-200 transition-all"><Plus size={20} /> Nova Internação</button>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-6">
                            {data.internacoes.filter(i => i.status === 'Internado').length > 0 ? data.internacoes.filter(i => i.status === 'Internado').map(i => (
                                <div key={i.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-2 h-full bg-rose-500"></div>
                                    <div className="flex justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-black text-slate-800">{i.pet}</h3>
                                            <p className="text-sm text-slate-500">Entrada: {new Date(i.entrada).toLocaleDateString('pt-BR')}</p>
                                        </div>
                                        <BedDouble className="text-rose-500" size={24} />
                                    </div>
                                    <div className="bg-rose-50 p-4 rounded-xl mb-4">
                                        <p className="text-xs font-bold text-rose-800 uppercase mb-1">Motivo</p>
                                        <p className="text-sm text-rose-900">{i.motivo}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                                        <p className="text-xs text-slate-400">Resp: <span className="font-bold text-slate-600">{i.veterinario}</span></p>
                                        <button onClick={() => handleSave('internacoes', { ...i, status: 'Alta' })} className="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-sm font-bold transition-colors">Dar Alta</button>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-2 text-center py-10 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">
                                    <p>Nenhum paciente internado no momento.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'pdv':
                const addToCart = (produto) => {
                    if (produto.estoque <= 0) { showNotification('Produto sem estoque!', 'error'); return; }
                    const exists = carrinho.find(c => c.id === produto.id);
                    if (exists) {
                        setCarrinho(carrinho.map(c => c.id === produto.id ? { ...c, qtd: c.qtd + 1 } : c));
                    } else {
                        setCarrinho([...carrinho, { ...produto, qtd: 1 }]);
                    }
                };

                const finalizeSale = () => {
                    if (carrinho.length === 0) return;
                    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0);

                    // Atualizar estoque
                    const novosProdutos = data.produtos.map(p => {
                        const itemCarrinho = carrinho.find(c => c.id === p.id);
                        return itemCarrinho ? { ...p, estoque: p.estoque - itemCarrinho.qtd } : p;
                    });

                    // Criar venda
                    const novaVenda = {
                        id: data.vendas.length + 1,
                        data: new Date().toISOString().split('T')[0],
                        cliente: 'Consumidor Final', // Simplificado
                        total: total,
                        pagamento: 'Dinheiro',
                        status: 'Concluída'
                    };

                    setData(prev => ({ ...prev, produtos: novosProdutos, vendas: [...prev.vendas, novaVenda] }));
                    setCarrinho([]);
                    showNotification('Venda realizada com sucesso!');
                };

                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-slate-800">Frente de Caixa (PDV)</h2>
                        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
                            {/* Product Grid */}
                            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 flex flex-col h-full shadow-sm">
                                <div className="mb-4 relative">
                                    <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                                    <input type="text" placeholder="Buscar produtos..." className="w-full pl-10 p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-indigo-500 transition-all" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 content-start">
                                    {data.produtos.map(p => (
                                        <button key={p.id} onClick={() => addToCart(p)} className="flex flex-col items-start p-4 border border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/30 transition-all text-left group disabled:opacity-50" disabled={p.estoque <= 0}>
                                            <div className="w-full aspect-square bg-slate-100 rounded-xl mb-3 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 transition-colors">
                                                <Package size={32} />
                                            </div>
                                            <h4 className="font-bold text-sm text-slate-700 leading-tight mb-1">{p.nome}</h4>
                                            <div className="flex justify-between w-full items-center mt-auto">
                                                <span className="font-black text-indigo-600">{formatCurrency(p.preco)}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.estoque > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{p.estoque} un</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Cart */}
                            <div className="bg-slate-900 rounded-3xl p-6 flex flex-col h-full shadow-2xl text-white">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-4">
                                    <ShoppingCart className="text-indigo-400" />
                                    <h3 className="font-bold text-lg">Cesta de Compras</h3>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar mb-4">
                                    {carrinho.length > 0 ? carrinho.map(item => (
                                        <div key={item.id} className="flex justify-between items-center bg-slate-800 p-3 rounded-xl">
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold truncate">{item.nome}</p>
                                                <p className="text-xs text-slate-400">{item.qtd}x {formatCurrency(item.preco)}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold">{formatCurrency(item.preco * item.qtd)}</span>
                                                <button onClick={() => setCarrinho(carrinho.filter(c => c.id !== item.id))} className="text-rose-400 hover:text-rose-300"><X size={16} /></button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center text-slate-500 mt-10">Carrinho vazio</div>
                                    )}
                                </div>

                                <div className="bg-slate-800 p-4 rounded-2xl space-y-3">
                                    <div className="flex justify-between text-slate-400 text-sm">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0))}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black text-white pt-2 border-t border-slate-700">
                                        <span>Total</span>
                                        <span>{formatCurrency(carrinho.reduce((s, i) => s + (i.preco * i.qtd), 0))}</span>
                                    </div>
                                    <button onClick={finalizeSale} disabled={carrinho.length === 0} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/50 mt-2">
                                        FINALIZAR VENDA
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'estoque':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div><h2 className="text-2xl font-black text-slate-800">Controle de Estoque</h2><p className="text-slate-500">Gestão de produtos e insumos</p></div>
                            <button onClick={() => openForm('produto')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500 transition-all"><Plus size={20} /> Novo Produto</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                            <Table
                                headers={['Produto', 'Categoria', 'Estoque Atual', 'Mínimo', 'Preço', 'Status']}
                                data={filteredData('produtos').map(p => ({
                                    id: p.id, nome: p.nome, cat: p.categoria, est: p.estoque, min: p.estoqueMin, preco: formatCurrency(p.preco),
                                    status: <span className={`badge ${p.estoque < p.estoqueMin ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{p.estoque < p.estoqueMin ? 'Crítico' : 'Normal'}</span>
                                }))}
                                actions={(row) => (
                                    <>
                                        <button onClick={() => openForm('produto', data.produtos.find(p => p.id === row.id))} className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete('produtos', row.id)} className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg"><Trash2 size={16} /></button>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                );

            case 'caixa':
            case 'faturamento':
                return (
                    <div className="space-y-8 animate-in fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Painel Financeiro</h2>
                            <div className="flex gap-2">
                                <button onClick={() => openForm('conta')} className="bg-rose-600 text-white px-4 py-2 rounded-xl font-bold flex gap-2 items-center text-sm hover:bg-rose-500 shadow-md"><Plus size={16} /> Lançar Despesa</button>
                                <button className="bg-slate-800 text-white px-4 py-2 rounded-xl font-bold flex gap-2 items-center text-sm hover:bg-slate-700 shadow-md"><Printer size={16} /> Relatório</button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><TrendingUp size={24} /></div>
                                    <p className="text-sm font-bold text-slate-400 uppercase">Receitas</p>
                                </div>
                                <h3 className="text-3xl font-black text-slate-800">{formatCurrency(totalVendas)}</h3>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-rose-100 text-rose-600 rounded-xl"><TrendingDown size={24} /></div>
                                    <p className="text-sm font-bold text-slate-400 uppercase">Despesas Pagas</p>
                                </div>
                                <h3 className="text-3xl font-black text-slate-800">{formatCurrency(totalDespesas)}</h3>
                            </div>
                            <div className={`p-6 rounded-3xl border shadow-sm text-white ${lucro >= 0 ? 'bg-indigo-600 border-indigo-500' : 'bg-rose-600 border-rose-500'}`}>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-white/20 rounded-xl"><DollarSign size={24} /></div>
                                    <p className="text-sm font-bold opacity-80 uppercase">Saldo Líquido</p>
                                </div>
                                <h3 className="text-3xl font-black">{formatCurrency(lucro)}</h3>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-3xl border border-slate-100 p-6">
                                <h3 className="font-bold text-lg mb-4 text-slate-800">Contas a Pagar</h3>
                                <div className="space-y-3">
                                    {data.contasPagar.length > 0 ? data.contasPagar.slice(0, 5).map(c => (
                                        <div key={c.id} className="flex justify-between items-center p-3 border rounded-xl hover:bg-slate-50 transition-colors">
                                            <div>
                                                <p className="font-bold text-slate-700">{c.descricao}</p>
                                                <p className="text-xs text-slate-500">{new Date(c.vencimento).toLocaleDateString('pt-BR')} • {c.categoria}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-slate-800">{formatCurrency(c.valor)}</p>
                                                {c.status === 'Pendente' ? (
                                                    <button onClick={() => handleSave('contasPagar', { ...c, status: 'Paga' })} className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 font-bold mt-1">Pagar</button>
                                                ) : (
                                                    <span className="text-[10px] text-emerald-600 font-bold flex items-center justify-end gap-1"><CheckCircle2 size={10} /> Pago</span>
                                                )}
                                            </div>
                                        </div>
                                    )) : <p className="text-slate-400 text-center py-4">Nenhuma conta registrada.</p>}
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl border border-slate-100 p-6">
                                <h3 className="font-bold text-lg mb-4 text-slate-800">Últimas Vendas</h3>
                                <div className="space-y-3">
                                    {data.vendas.slice().reverse().slice(0, 5).map(v => (
                                        <div key={v.id} className="flex justify-between items-center p-3 bg-slate-50/50 rounded-xl">
                                            <div>
                                                <p className="font-bold text-sm text-slate-700">{v.cliente}</p>
                                                <p className="text-xs text-slate-400">{new Date(v.data).toLocaleDateString('pt-BR')} • {v.pagamento}</p>
                                            </div>
                                            <span className="font-black text-emerald-600">{formatCurrency(v.total)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            // VIEWS GENÉRICAS (Pets, Tutores, Equipe)
            case 'pets':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Base de Pacientes</h2>
                            <button onClick={() => openForm('pet')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500"><Plus size={20} /> Novo Pet</button>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredData('pets').map(pet => (
                                <div key={pet.id} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all group relative">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl font-black text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            {pet.especie === 'Cão' ? '🐶' : pet.especie === 'Gato' ? '🐱' : '🐾'}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xl text-slate-800">{pet.nome}</h3>
                                            <p className="text-sm text-slate-500">{pet.raca}</p>
                                            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 mt-1 inline-block">{pet.status}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl mb-4">
                                        <p className="flex justify-between"><span>Tutor:</span> <span className="font-bold">{pet.tutor}</span></p>
                                        <p className="flex justify-between"><span>Idade:</span> <span className="font-bold">{pet.idade}</span></p>
                                        <p className="flex justify-between"><span>Peso:</span> <span className="font-bold">{pet.peso}</span></p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openForm('pet', pet)} className="flex-1 py-2 bg-white border-2 border-slate-100 hover:border-indigo-200 text-indigo-600 font-bold rounded-xl transition-colors">Editar</button>
                                        <button onClick={() => handleDelete('pets', pet.id)} className="p-2 text-rose-400 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'tutores':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Tutores</h2>
                            <button onClick={() => openForm('tutor')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500"><Plus size={20} /> Novo Tutor</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Nome', 'Contato', 'Email', 'Qtd Pets']}
                                data={filteredData('tutores').map(t => ({ id: t.id, nome: t.nome, tel: t.telefone, email: t.email, pets: t.pets.length }))}
                                actions={(row) => (
                                    <>
                                        <button onClick={() => openForm('tutor', data.tutores.find(t => t.id === row.id))} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete('tutores', row.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                );

            case 'equipe':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Corpo Clínico & Equipe</h2>
                            <button onClick={() => openForm('equipe')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500"><Plus size={20} /> Novo Profissional</button>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredData('equipe').map(e => (
                                <div key={e.id} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl font-black text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            <ShieldCheck size={32} />
                                        </div>
                                        <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${e.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{e.status}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl text-slate-800">{e.nome}</h3>
                                        <p className="text-sm font-bold text-indigo-600">{e.cargo}</p>
                                    </div>
                                    <div className="space-y-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl my-4">
                                        <p className="flex justify-between"><span>Especialidade:</span> <span className="font-bold">{e.especialidade}</span></p>
                                        <p className="flex justify-between"><span>CRMV:</span> <span className="font-bold">{e.crmv}</span></p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openForm('equipe', e)} className="flex-1 py-2 bg-white border-2 border-slate-100 hover:border-indigo-200 text-indigo-600 font-bold rounded-xl transition-colors">Editar</button>
                                        <button onClick={() => handleDelete('equipe', e.id)} className="p-2 text-rose-400 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'vacinas':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Centro de Vacinação</h2>
                            <button onClick={() => openForm('vacina')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500"><Plus size={20} /> Nova Vacina</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Data', 'Paciente', 'Vacina', 'Lote', 'Próxima Dose', 'Veterinário']}
                                data={filteredData('vacinas').map(v => ({
                                    id: v.id,
                                    data: new Date(v.data).toLocaleDateString('pt-BR'),
                                    pet: v.pet,
                                    vacina: v.vacina,
                                    lote: <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{v.lote}</span>,
                                    proxima: new Date(v.proxima).toLocaleDateString('pt-BR'),
                                    vet: v.veterinario
                                }))}
                                actions={(row) => (
                                    <>
                                        <button onClick={() => openForm('vacina', data.vacinas.find(v => v.id === row.id))} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete('vacinas', row.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                );

            case 'exames':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Laudos e Exames</h2>
                            <button onClick={() => openForm('exame')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500"><Plus size={20} /> Solicitar Exame</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Data', 'Paciente', 'Tipo', 'Resultado', 'Status']}
                                data={filteredData('exames').map(e => ({
                                    id: e.id,
                                    data: new Date(e.data).toLocaleDateString('pt-BR'),
                                    pet: e.pet,
                                    tipo: e.tipo,
                                    res: e.resultado || '-',
                                    status: <span className={`badge ${e.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{e.status}</span>
                                }))}
                                actions={(row) => (
                                    <>
                                        <button onClick={() => openForm('exame', data.exames.find(e => e.id === row.id))} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete('exames', row.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                );

            case 'cirurgias':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Mapa Cirúrgico</h2>
                            <button onClick={() => openForm('cirurgia')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-indigo-500"><Plus size={20} /> Agendar Cirurgia</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Data', 'Hora', 'Paciente', 'Procedimento', 'Cirurgião', 'Status']}
                                data={filteredData('cirurgias').map(c => ({
                                    id: c.id,
                                    data: new Date(c.data).toLocaleDateString('pt-BR'),
                                    hora: c.hora,
                                    pet: c.pet,
                                    tipo: c.tipo,
                                    vet: c.veterinario,
                                    status: <span className={`badge ${c.status === 'Realizada' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{c.status}</span>
                                }))}
                                actions={(row) => (
                                    <>
                                        <button onClick={() => openForm('cirurgia', data.cirurgias.find(c => c.id === row.id))} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete('cirurgias', row.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                );

            case 'pdv':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Frente de Caixa (PDV)</h2>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-6">Realizar Venda</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Buscar Produto</label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                            <input type="text" placeholder="Nome ou código..." className="w-full pl-10 p-3 bg-slate-50 border rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center text-slate-400 text-sm">
                                        Nenhum item no carrinho
                                    </div>
                                    <button className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 uppercase tracking-wider">Finalizar Venda</button>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <h3 className="font-bold text-lg mb-6">Produtos Recentes</h3>
                                <div className="space-y-3">
                                    {data.produtos.slice(0, 4).map(p => (
                                        <div key={p.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                                            <div><p className="font-bold text-slate-800">{p.nome}</p><p className="text-xs text-slate-400">{p.categoria} • {p.estoque} un</p></div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-black text-slate-900">{formatCurrency(p.preco)}</span>
                                                <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all"><Plus size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'estoque':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Gestão de Estoque</h2>
                            <button onClick={() => openForm('produto')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center"><Plus size={20} /> Novo Produto</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Produto', 'Categoria', 'Estoque', 'Mínimo', 'Preço', 'Fornecedor']}
                                data={data.produtos.map(p => ({
                                    id: p.id,
                                    nome: p.nome,
                                    cat: p.categoria,
                                    est: <span className={`font-bold ${p.estoque <= p.estoqueMin ? 'text-rose-500' : 'text-emerald-500'}`}>{p.estoque}</span>,
                                    min: p.estoqueMin,
                                    price: formatCurrency(p.preco),
                                    forn: p.fornecedor
                                }))}
                                actions={(row) => (
                                    <>
                                        <button onClick={() => openForm('produto', data.produtos.find(p => p.id === row.id))} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete('produtos', row.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                );

            case 'caixa':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Fluxo de Caixa</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Entradas (Mês)</p>
                                <h3 className="text-3xl font-black text-emerald-600 tracking-tight">R$ 24.850,00</h3>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Saídas (Mês)</p>
                                <h3 className="text-3xl font-black text-rose-600 tracking-tight">R$ 15.120,00</h3>
                            </div>
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Saldo Atual</p>
                                <h3 className="text-3xl font-black text-indigo-600 tracking-tight">R$ 9.730,00</h3>
                            </div>
                        </div>
                    </div>
                );

            case 'prontuario':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Prontuário Digital</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.pets.map(pet => (
                                <div key={pet.id} className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:bg-indigo-600 transition-colors">{pet.especie[0]}</div>
                                        <div><h3 className="font-bold text-slate-800">{pet.nome}</h3><p className="text-xs text-slate-400">Tutor: {pet.tutor}</p></div>
                                    </div>
                                    <button className="w-full py-2 bg-indigo-50 text-indigo-600 font-bold rounded-xl text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">Abrir Prontuário</button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'atendimento':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Fila de Espera</h2>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 p-6">
                            <div className="space-y-4">
                                {data.agenda.filter(a => a.status === 'Aguardando').map(a => (
                                    <div key={a.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border-l-4 border-indigo-600">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold">{a.hora}</div>
                                            <div><p className="font-bold text-slate-800">{a.pet}</p><p className="text-xs text-slate-400">Tutor: {a.tutor} • {a.tipo}</p></div>
                                        </div>
                                        <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg text-sm">Chamar Próximo</button>
                                    </div>
                                ))}
                                {data.agenda.filter(a => a.status === 'Aguardando').length === 0 && (
                                    <div className="text-center py-12 text-slate-400">Nenhum pet na fila no momento.</div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 'internacao':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Internação / UTI</h2>
                            <button onClick={() => openForm('internacao')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center"><Plus size={20} /> Nova Internação</button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {data.internacoes.map(i => (
                                <div key={i.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
                                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><BedDouble size={32} /></div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-slate-800">{i.pet}</h3>
                                        <p className="text-sm text-slate-500 mb-2">Entrada: {new Date(i.entrada).toLocaleDateString('pt-BR')}</p>
                                        <p className="text-xs text-slate-400">Motivo: {i.motivo}</p>
                                        <div className="mt-4 flex gap-2">
                                            <span className="badge bg-blue-100 text-blue-700">{i.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'vendas':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-slate-800">Histórico de Vendas</h2>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Data', 'Cliente', 'Total', 'Pagamento', 'Status']}
                                data={data.vendas.map(v => ({
                                    id: v.id,
                                    data: new Date(v.data).toLocaleDateString('pt-BR'),
                                    cli: v.cliente,
                                    tot: formatCurrency(v.total),
                                    pag: v.pagamento,
                                    st: <span className="badge bg-emerald-100 text-emerald-700">{v.status}</span>
                                }))}
                            />
                        </div>
                    </div>
                );

            case 'compras':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Compras & Fornecedores</h2>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Fornecedor', 'CNPJ', 'Contato', 'Categoria']}
                                data={data.fornecedores.map(f => ({
                                    id: f.id,
                                    nome: f.nome,
                                    cnpj: f.cnpj,
                                    cont: f.contato,
                                    cat: f.categoria
                                }))}
                            />
                        </div>
                    </div>
                );

            case 'contas-pagar':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800">Contas a Pagar</h2>
                            <button className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center"><Plus size={20} /> Nova Conta</button>
                        </div>
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <Table
                                headers={['Descrição', 'Valor', 'Vencimento', 'Categoria', 'Status']}
                                data={data.contasPagar.map(c => ({
                                    id: c.id,
                                    desc: c.descricao,
                                    val: <span className="font-bold text-rose-600">{formatCurrency(c.valor)}</span>,
                                    venc: new Date(c.vencimento).toLocaleDateString('pt-BR'),
                                    cat: c.categoria,
                                    st: <span className={`badge ${c.status === 'Paga' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{c.status}</span>
                                }))}
                            />
                        </div>
                    </div>
                );

            case 'faturamento':
                return (
                    <div className="space-y-6 text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm animate-in fade-in">
                        <BarChart3 size={64} className="mx-auto text-indigo-200 mb-6" />
                        <h2 className="text-2xl font-black text-slate-800">Relatórios de Faturamento</h2>
                        <p className="text-slate-500 max-w-md mx-auto mt-2">Gere gráficos e relatórios detalhados de lucratividade, ticket médio e desempenho por veterinário.</p>
                        <div className="mt-8 flex justify-center gap-4">
                            <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl flex gap-2 items-center"><Download size={20} /> Exportar PDF</button>
                            <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl flex gap-2 items-center"><Printer size={20} /> Imprimir</button>
                        </div>
                    </div>
                );

            case 'configuracoes':
                return (
                    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
                        <h2 className="text-2xl font-black text-slate-800">Configurações do Sistema</h2>
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Settings className="text-indigo-600" /> Dados da Clínica</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-500">Nome Fantasia</label>
                                    <input type="text" defaultValue="Clínica Veterinária Central" className="w-full p-3 bg-slate-50 border rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-500">CNPJ</label>
                                    <input type="text" defaultValue="12.345.678/0001-90" className="w-full p-3 bg-slate-50 border rounded-xl" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Backup de Segurança</h3>
                                <p className="text-indigo-200 text-sm">Última cópia realizada hoje às 08:00</p>
                            </div>
                            <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors">Realizar Backup</button>
                        </div>
                    </div>
                );

            default:
                // Fallback genérico para abas não implementadas (Exames, Vacinas, etc, usam estrutura similar)
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-800 capitalize">{activeTab}</h2>
                            <button onClick={() => openForm(activeTab === 'vacinas' ? 'vacina' : activeTab === 'cirurgias' ? 'cirurgia' : 'exame')} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex gap-2 items-center"><Plus size={20} /> Novo</button>
                        </div>
                        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300 text-slate-400">
                            <p>Módulo em construção. Use o menu para navegar.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-600 selection:bg-indigo-100 selection:text-indigo-900">
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}

            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} hidden lg:flex bg-slate-900 flex-col h-screen fixed z-30 transition-all duration-300 ease-in-out shadow-2xl border-r border-slate-800`}>
                <div className="p-6 flex items-center gap-3 h-24">
                    <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-900/50 shrink-0"><PawPrint className="text-white" size={24} /></div>
                    <div className={`transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0 hidden'}`}>
                        <span className="text-white font-black text-xl tracking-tight">VET<span className="text-indigo-400">PRO</span></span>
                        <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">SaaS Edition</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-6 mt-4 overflow-y-auto custom-scrollbar pb-10">
                    {MENU_STRUCTURE.map((group, idx) => (
                        <div key={idx}>
                            {isSidebarOpen && <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{group.group}</p>}
                            <div className="space-y-1">
                                {group.items.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all relative group ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                        title={!isSidebarOpen ? item.label : ''}
                                    >
                                        <item.icon size={20} className="shrink-0" />
                                        {isSidebarOpen && <span className="font-bold text-sm truncate">{item.label}</span>}
                                        {!isSidebarOpen && activeTab === item.id && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800 bg-slate-900">
                    <button onClick={() => logout()} className="w-full flex items-center gap-3 p-3 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-all">
                        <LogOut size={20} className="shrink-0" />
                        {isSidebarOpen && <span className="font-bold text-sm">Sair do Sistema</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <SystemHeader
                    title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                    <div className="max-w-7xl mx-auto pb-20">
                        {renderView()}
                    </div>
                </div>
            </main>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingItem ? 'Editar Registro' : 'Novo Registro'}>
                {modalType && getFormConfig(modalType) && (
                    <FormGeneric
                        title={editingItem ? 'Editar Registro' : 'Novo Registro'}
                        fields={getFormConfig(modalType).fields}
                        initialValues={getFormConfig(modalType).initial}
                        onSubmit={(formData) => {
                            const config = getFormConfig(modalType);
                            const processedData = config.transform ? config.transform(formData) : formData;
                            handleSave(config.collection, processedData);
                        }}
                    />
                )}
            </Modal>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .badge { display: inline-block; padding: 0.15rem 0.6rem; border-radius: 999px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
      `}</style>
        </div>
    );
}
