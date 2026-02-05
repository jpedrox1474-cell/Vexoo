
import {
    LayoutDashboard, Calendar, PawPrint, DollarSign, Users, Package,
    Stethoscope, Settings, Menu, Plus, Search, Clock, BedDouble,
    ShoppingCart, FileText, Activity, UserCheck, Truck, BarChart3,
    ShieldCheck, CreditCard, HeartPulse, Syringe, LogOut, X, Edit2,
    Trash2, Eye, AlertCircle, CheckCircle2, TrendingUp, TrendingDown,
    Printer, Download, Save, Filter, ChevronRight
} from 'lucide-react';

export const INITIAL_DATA = {
    pets: [
        { id: 1, nome: 'Mel', especie: 'Cão', raca: 'Golden Retriever', idade: '3 anos', tutor: 'Ana Silva', tutorId: 1, peso: '28kg', status: 'Saudável' },
        { id: 2, nome: 'Thor', especie: 'Cão', raca: 'Husky Siberiano', idade: '2 anos', tutor: 'Carlos Santos', tutorId: 2, peso: '25kg', status: 'Em tratamento' },
        { id: 3, nome: 'Luna', especie: 'Gato', raca: 'Persa', idade: '1 ano', tutor: 'Maria Oliveira', tutorId: 3, peso: '4kg', status: 'Saudável' },
        { id: 4, nome: 'Bob', especie: 'Cão', raca: 'Vira-lata', idade: '5 anos', tutor: 'Ana Silva', tutorId: 1, peso: '12kg', status: 'Saudável' },
    ],
    tutores: [
        { id: 1, nome: 'Ana Silva', cpf: '123.456.789-00', telefone: '(11) 98765-4321', email: 'ana@email.com', endereco: 'Rua A, 123', pets: [1, 4] },
        { id: 2, nome: 'Carlos Santos', cpf: '234.567.890-11', telefone: '(11) 97654-3210', email: 'carlos@email.com', endereco: 'Rua B, 456', pets: [2] },
        { id: 3, nome: 'Maria Oliveira', cpf: '345.678.901-22', telefone: '(11) 96543-2109', email: 'maria@email.com', endereco: 'Rua C, 789', pets: [3] },
    ],
    equipe: [
        { id: 1, nome: 'Dr. Ricardo Silva', cargo: 'Médico Veterinário', crmv: 'SP-12345', especialidade: 'Clínico Geral', status: 'Ativo' },
        { id: 2, nome: 'Dra. Juliana Mendes', cargo: 'Médica Veterinária', crmv: 'SP-23456', especialidade: 'Cirurgia', status: 'Ativo' },
        { id: 3, nome: 'Mariana Costa', cargo: 'Auxiliar Vet', crmv: '-', especialidade: 'Enfermagem', status: 'Ativo' },
    ],
    agenda: [
        { id: 1, petId: 1, pet: 'Mel', tutor: 'Ana Silva', data: '2026-02-01', hora: '14:30', tipo: 'Check-up', veterinario: 'Dr. Ricardo Silva', status: 'Aguardando' },
        { id: 2, petId: 2, pet: 'Thor', tutor: 'Carlos Santos', data: '2026-02-01', hora: '15:00', tipo: 'Vacinação', veterinario: 'Dr. Ricardo Silva', status: 'Confirmado' },
        { id: 3, petId: 3, pet: 'Luna', tutor: 'Maria Oliveira', data: '2026-02-02', hora: '09:00', tipo: 'Consulta', veterinario: 'Dra. Juliana Mendes', status: 'Agendado' },
    ],
    prontuarios: [
        { id: 1, petId: 1, data: '2026-01-15', veterinario: 'Dr. Ricardo Silva', queixa: 'Check-up de rotina', diagnostico: 'Animal saudável', tratamento: 'Vermifugação recomendada' },
    ],
    produtos: [
        { id: 1, nome: 'Ração Premium Adulto 15kg', categoria: 'Alimentação', estoque: 45, estoqueMin: 10, preco: 189.90, fornecedor: 'PetFood Ltda' },
        { id: 2, nome: 'Vacina V10', categoria: 'Medicamentos', estoque: 8, estoqueMin: 15, preco: 85.00, fornecedor: 'MedVet' },
        { id: 3, nome: 'Antipulgas 10ml', categoria: 'Medicamentos', estoque: 32, estoqueMin: 20, preco: 65.00, fornecedor: 'MedVet' },
        { id: 4, nome: 'Shampoo Neutro 500ml', categoria: 'Higiene', estoque: 5, estoqueMin: 10, preco: 35.00, fornecedor: 'PetClean' },
    ],
    vendas: [
        { id: 1, data: '2026-01-31', cliente: 'Ana Silva', total: 189.90, pagamento: 'Cartão Débito', status: 'Concluída' },
        { id: 2, data: '2026-01-31', cliente: 'Carlos Santos', total: 130.00, pagamento: 'Dinheiro', status: 'Concluída' },
    ],
    cirurgias: [
        { id: 1, petId: 1, pet: 'Mel', data: '2026-02-05', hora: '09:00', tipo: 'Castração', veterinario: 'Dra. Juliana Mendes', status: 'Agendada' },
    ],
    internacoes: [
        { id: 1, petId: 2, pet: 'Thor', entrada: '2026-01-30', motivo: 'Pós-operatório', veterinario: 'Dra. Juliana Mendes', status: 'Internado' },
    ],
    exames: [
        { id: 1, petId: 1, pet: 'Mel', data: '2026-01-25', tipo: 'Hemograma Completo', veterinario: 'Dr. Ricardo Silva', resultado: 'Normal', status: 'Concluído' },
    ],
    vacinas: [
        { id: 1, petId: 1, pet: 'Mel', data: '2026-01-10', vacina: 'V10', lote: 'VX-2025-001', proxima: '2027-01-10', veterinario: 'Dr. Ricardo Silva' },
    ],
    contasPagar: [
        { id: 1, descricao: 'Aluguel Clínica', valor: 5500.00, vencimento: '2026-02-05', status: 'Pendente', categoria: 'Fixo' },
        { id: 2, descricao: 'Energia Elétrica', valor: 850.00, vencimento: '2026-01-28', status: 'Paga', categoria: 'Fixo' },
        { id: 3, descricao: 'Distribuidora MedVet', valor: 1200.00, vencimento: '2026-02-10', status: 'Pendente', categoria: 'Fornecedor' },
    ],
    fornecedores: [
        { id: 1, nome: 'MedVet Distribuidora', cnpj: '12.345.678/0001-90', contato: '(11) 3333-4444', categoria: 'Medicamentos' },
        { id: 2, nome: 'PetFood Ltda', cnpj: '23.456.789/0001-01', contato: '(11) 4444-5555', categoria: 'Alimentação' },
    ],
};

export const MENU_STRUCTURE = [
    {
        group: "Operacional", items: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'agenda', label: 'Agenda Médica', icon: Calendar },
            { id: 'atendimento', label: 'Fila de Espera', icon: UserCheck },
        ]
    },
    {
        group: "Clínica & Médico", items: [
            { id: 'prontuario', label: 'Prontuário Digital', icon: Stethoscope },
            { id: 'internacao', label: 'Internação/UTI', icon: BedDouble },
            { id: 'exames', label: 'Laudos e Exames', icon: Activity },
            { id: 'vacinas', label: 'Centro de Vacinação', icon: Syringe },
            { id: 'cirurgias', label: 'Mapa Cirúrgico', icon: HeartPulse },
        ]
    },
    {
        group: "Gestão & Vendas", items: [
            { id: 'pdv', label: 'Frente de Caixa (PDV)', icon: ShoppingCart },
            { id: 'vendas', label: 'Histórico de Vendas', icon: FileText },
            { id: 'estoque', label: 'Gestão de Estoque', icon: Package },
            { id: 'compras', label: 'Compras/Fornecedores', icon: Truck },
        ]
    },
    {
        group: "Financeiro", items: [
            { id: 'caixa', label: 'Fluxo de Caixa', icon: DollarSign },
            { id: 'contas-pagar', label: 'Contas a Pagar', icon: CreditCard },
            { id: 'faturamento', label: 'Relatórios Financeiros', icon: BarChart3 },
        ]
    },
    {
        group: "Cadastros", items: [
            { id: 'pets', label: 'Pacientes (Pets)', icon: PawPrint },
            { id: 'tutores', label: 'Clientes (Tutores)', icon: Users },
            { id: 'equipe', label: 'Corpo Clínico', icon: ShieldCheck },
        ]
    },
    {
        group: "Sistema", items: [
            { id: 'configuracoes', label: 'Configurações', icon: Settings },
        ]
    }
];
