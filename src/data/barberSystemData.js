
export const INITIAL_SERVICES = [
    { id: 1, name: 'Corte de Cabelo', price: 45.00, duration: 45, commission: 60, icon: 'Scissors', description: 'Corte masculino tradicional' },
    { id: 2, name: 'Barba Modelada', price: 35.00, duration: 30, commission: 50, icon: 'User', description: 'Barba alinhada e modelada' },
    { id: 3, name: 'Combo Corte + Barba', price: 70.00, duration: 60, commission: 65, icon: 'Star', description: 'Pacote completo com desconto' },
    { id: 4, name: 'Pezinho / Acabamento', price: 15.00, duration: 15, commission: 40, icon: 'Scissors', description: 'Finalização e acabamento' },
    { id: 5, name: 'Sobrancelha', price: 20.00, duration: 20, commission: 50, icon: 'User', description: 'Design de sobrancelha' },
    { id: 6, name: 'Relaxamento', price: 80.00, duration: 90, commission: 55, icon: 'Star', description: 'Relaxamento capilar completo' },
];

export const INITIAL_PRODUCTS = [
    { id: 1, name: 'Pomada Modeladora', price: 45.00, stock: 25, category: 'Finalização' },
    { id: 2, name: 'Shampoo Anticaspa', price: 35.00, stock: 15, category: 'Higiene' },
    { id: 3, name: 'Óleo para Barba', price: 55.00, stock: 30, category: 'Barba' },
    { id: 4, name: 'Cera Modeladora', price: 40.00, stock: 20, category: 'Finalização' },
];

export const INITIAL_BARBERS = [
    { id: 1, name: 'Mestre João', rating: 4.9, avatar: 'J', commission: 60, phone: '(14) 99999-0001', status: 'Ativo', specialty: 'Cortes Clássicos' },
    { id: 2, name: 'Marcos Silva', rating: 4.7, avatar: 'M', commission: 55, phone: '(14) 99999-0002', status: 'Ativo', specialty: 'Barbas e Degradês' },
    { id: 3, name: 'André Navalha', rating: 5.0, avatar: 'A', commission: 65, phone: '(14) 99999-0003', status: 'Ativo', specialty: 'Cortes Modernos' },
];

export const INITIAL_CLIENTS = [
    { id: 1, name: 'Carlos Eduardo', phone: '(14) 98888-0001', email: 'carlos@email.com', visits: 15, lastVisit: '2026-01-20', points: 150, status: 'VIP' },
    { id: 2, name: 'Roberto Dias', phone: '(14) 98888-0002', email: 'roberto@email.com', visits: 8, lastVisit: '2026-01-25', points: 80, status: 'Regular' },
    { id: 3, name: 'Felipe Neto', phone: '(14) 98888-0003', email: 'felipe@email.com', visits: 3, lastVisit: '2026-01-26', points: 30, status: 'Novo' },
    { id: 4, name: 'João Silva', phone: '(14) 98888-0004', email: 'joao@email.com', visits: 22, lastVisit: '2026-01-15', points: 220, status: 'VIP' },
];

export const INITIAL_APPOINTMENTS = [
    { id: 101, clientId: 1, serviceId: 3, barberId: 1, date: '2026-01-28', time: '09:00', status: 'Confirmado', price: 70, paymentMethod: 'Pendente', notes: '' },
    { id: 102, clientId: 2, serviceId: 1, barberId: 2, date: '2026-01-28', time: '10:00', status: 'Confirmado', price: 45, paymentMethod: 'Pendente', notes: '' },
    { id: 103, clientId: 3, serviceId: 2, barberId: 1, date: '2026-01-28', time: '11:00', status: 'Confirmado', price: 35, paymentMethod: 'Pendente', notes: '' },
    { id: 104, clientId: 1, serviceId: 1, barberId: 3, date: '2026-01-27', time: '14:00', status: 'Concluído', price: 45, paymentMethod: 'Pix', notes: '', rating: 5 },
    { id: 105, clientId: 4, serviceId: 3, barberId: 2, date: '2026-01-27', time: '15:00', status: 'Concluído', price: 70, paymentMethod: 'Cartão Débito', notes: '', rating: 5 },
];

export const INITIAL_EXPENSES = [
    { id: 1, description: 'Aluguel', amount: 2500, category: 'Fixo', date: '2026-01-05', status: 'Pago' },
    { id: 2, description: 'Energia Elétrica', amount: 450, category: 'Variável', date: '2026-01-10', status: 'Pago' },
    { id: 3, description: 'Produtos para Revenda', amount: 1200, category: 'Estoque', date: '2026-01-15', status: 'Pago' },
    { id: 4, description: 'Internet', amount: 150, category: 'Fixo', date: '2026-01-20', status: 'Pendente' },
];

export const LOYALTY_TIERS = [
    { name: 'Bronze', minPoints: 0, discount: 5, color: 'orange' },
    { name: 'Prata', minPoints: 100, discount: 10, color: 'gray' },
    { name: 'Ouro', minPoints: 200, discount: 15, color: 'yellow' },
    { name: 'Diamante', minPoints: 500, discount: 20, color: 'blue' },
];
