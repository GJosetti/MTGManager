import React, { useState } from 'react';
import {
    Search, Calendar, ArrowLeft, PackageCheck, Clock, Check
} from 'lucide-react';
import '../../Style/Reservation.css';

// Mock de Dados de Reservas
const RESERVATIONS_DATA = [
    {
        id: '#R-501',
        customer: 'Pedro Alencar',
        date: 'Hoje, 10:00',
        itemsCount: 3,
        status: 'Pendente',
        items: [
            { id: 1, name: 'Orcish Bowmasters', set: 'LTR', qty: 2, location: 'Gaveta A1' },
            { id: 2, name: 'The One Ring', set: 'LTR', qty: 1, location: 'Vitrine 2' }
        ]
    },
    {
        id: '#R-502',
        customer: 'Julia M.',
        date: 'Ontem, 16:30',
        itemsCount: 5,
        status: 'Pendente',
        items: [
            { id: 3, name: 'Sol Ring', set: 'CMD', qty: 1, location: 'Caixa Comum' },
            { id: 4, name: 'Arcane Signet', set: 'CMD', qty: 1, location: 'Caixa Comum' },
            { id: 5, name: 'Command Tower', set: 'CMD', qty: 1, location: 'Caixa Comum' },
            { id: 6, name: 'Swords to Plowshares', set: 'DMR', qty: 2, location: 'Gaveta B3' }
        ]
    },
    {
        id: '#R-499',
        customer: 'Carlos Drumond',
        date: '10/02/2026',
        itemsCount: 1,
        status: 'Pronto',
        items: [
            { id: 7, name: 'Sheoldred, the Apocalypse', set: 'DMU', qty: 1, location: 'Separado' }
        ]
    }
];

const Reservations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRes, setSelectedRes] = useState(null); // Reserva aberta no modal
    const [checkedItems, setCheckedItems] = useState({}); // Estado dos checkboxes { id: true/false }

    // Voltar
    const handleGoBack = () => { window.location.href = '/admin/home'; };

    // Abrir Modal
    const openModal = (reservation) => {
        setSelectedRes(reservation);
        // Se quiser persistir o estado, precisaria salvar no objeto principal.
        // Aqui reiniciaremos o check para simular o processo de separação.
        setCheckedItems({});
    };

    // Toggle Checkbox
    const toggleCheck = (itemId) => {
        setCheckedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId] // Inverte o valor
        }));
    };

    // Cálculos do Modal
    const totalItems = selectedRes ? selectedRes.items.length : 0;
    const checkedCount = selectedRes ? selectedRes.items.filter(i => checkedItems[i.id]).length : 0;
    const progressPercent = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
    const isAllChecked = totalItems > 0 && checkedCount === totalItems;

    // Filtragem da Tabela
    const filteredData = RESERVATIONS_DATA.filter(r =>
        r.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="reservations-container">

            {/* Topo */}
            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={18} /> Voltar ao Dashboard
                </button>
            </nav>

            <header className="page-header">
                <h1>Reservas & Picking</h1>
                <p>Gerencie pedidos pendentes e separe as cartas do estoque.</p>
            </header>

            {/* KPIs */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Pendentes</h3>
                        <p className="kpi-value">{RESERVATIONS_DATA.filter(r => r.status === 'Pendente').length}</p>
                    </div>
                    <div className="kpi-icon orange"><Clock size={28}/></div>
                </div>

                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Prontos p/ Retirada</h3>
                        <p className="kpi-value">{RESERVATIONS_DATA.filter(r => r.status === 'Pronto').length}</p>
                    </div>
                    <div className="kpi-icon"><PackageCheck size={28}/></div>
                </div>
            </div>

            {/* Tabela Principal */}
            <div className="table-card">
                <div className="table-header-row">
                    <h2 style={{margin:0, fontSize:'1.2rem'}}>Fila de Pedidos</h2>
                    <div style={{position:'relative'}}>
                        <Search size={16} style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#94a3b8'}}/>
                        <input className="search-field" placeholder="Buscar Cliente ou ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <table className="res-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Data do Pedido</th>
                        <th>Itens</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map(res => (
                        <tr key={res.id}>
                            <td style={{fontFamily:'monospace', color:'#94a3b8'}}>{res.id}</td>
                            <td style={{fontWeight:600}}>{res.customer}</td>
                            <td>{res.date}</td>
                            <td>{res.itemsCount} produtos</td>
                            <td>
                  <span className={`status-badge ${res.status === 'Pendente' ? 'status-pending' : 'status-ready'}`}>
                    {res.status}
                  </span>
                            </td>
                            <td>
                                <button className="btn-action" onClick={() => openModal(res)}>
                                    {res.status === 'Pendente' ? 'Separar' : 'Ver Detalhes'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL DE SEPARAÇÃO (PICKING) --- */}
            {selectedRes && (
                <div className="modal-overlay" onClick={() => setSelectedRes(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>

                        <div className="modal-header">
                            <h2 style={{margin:0, fontSize:'1.1rem'}}>Separação: {selectedRes.id}</h2>
                            <span style={{fontSize:'0.8rem', color:'#94a3b8'}}>Cliente: {selectedRes.customer}</span>
                        </div>

                        <div className="modal-body">

                            {/* Barra de Progresso */}
                            <div className="progress-container">
                                <div className="progress-label">
                                    <span>Progresso da Separação</span>
                                    <span style={{color: isAllChecked ? '#10b981' : '#94a3b8'}}>
                    {checkedCount}/{totalItems} itens
                  </span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div
                                        className="progress-bar-fill"
                                        style={{width: `${progressPercent}%`, backgroundColor: isAllChecked ? '#10b981' : '#8b5cf6'}}
                                    ></div>
                                </div>
                            </div>

                            {/* Lista de Itens com Checkbox */}
                            <div className="picking-list">
                                {selectedRes.items.map(item => {
                                    const isChecked = !!checkedItems[item.id];
                                    return (
                                        <div
                                            key={item.id}
                                            className={`picking-item ${isChecked ? 'checked' : ''}`}
                                            onClick={() => toggleCheck(item.id)}
                                        >
                                            <div className="custom-checkbox">
                                                {isChecked && <Check size={16} strokeWidth={4} />}
                                            </div>
                                            <div className="item-info">
                                                <div className="item-name">{item.name}</div>
                                                <div className="item-meta">
                                                    {item.qty}x • {item.set} • <span style={{color:'#f59e0b'}}>{item.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setSelectedRes(null)}>Cancelar</button>
                            <button
                                className={`btn-save ${isAllChecked ? 'ready' : ''}`}
                                disabled={!isAllChecked && selectedRes.status === 'Pendente'}
                                onClick={() => {
                                    alert('Pedido marcado como pronto!');
                                    setSelectedRes(null);
                                }}
                            >
                                {selectedRes.status === 'Pronto' ? 'Fechar' : (isAllChecked ? 'Concluir Separação' : 'Marque todos os itens')}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Reservations;