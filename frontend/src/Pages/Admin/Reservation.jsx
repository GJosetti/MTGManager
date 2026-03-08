import React, {useEffect, useState} from 'react';
import {
    Search, Calendar, ArrowLeft, PackageCheck, Clock, Check
} from 'lucide-react';
import '../../Style/Reservation.css';
import axios from "axios";


const Reservations = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRes, setSelectedRes] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});
    const [sales, setSale] = useState([]);

    const handleGoBack = () => { window.location.href = '/admin/home'; };

    const openModal = (reservation) => {
        setSelectedRes(reservation);
        setCheckedItems({});
    };

    async function fetchSales() {
        const response = await axios.get("/api/sale/listReserved", {withCredentials: true});
        console.log(response.data);
        setSale(response.data);
    }

    const isToday = (isoDate) => {
        if (!isoDate) return false;
        const date = new Date(isoDate);
        if (isNaN(date)) return false;
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const salesToday = sales.filter(s => isToday(s.createdAt));
    const salesCountToday = salesToday.length;

    const toggleCheck = (itemId) => {
        setCheckedItems(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }));
    };

    const totalItems = selectedRes ? selectedRes.items.length : 0;
    const checkedCount = selectedRes ? selectedRes.items.filter(i => checkedItems[i.id]).length : 0;
    const progressPercent = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;
    const isAllChecked = totalItems > 0 && checkedCount === totalItems;

    const filteredData = sales.filter(r =>
        r.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toString().includes(searchTerm)
    );

    useEffect(() => {
        fetchSales();
    }, []);

    return (
        <div className="reservations-container">

            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={18}/> Voltar ao Dashboard
                </button>
            </nav>

            <header className="page-header">
                <h1>Reservas & Picking</h1>
                <p>Gerencie pedidos pendentes e separe as cartas do estoque.</p>
            </header>

            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Pendentes</h3>
                        <p className="kpi-value">{sales.filter(r => r.status === 'PENDING').length}</p>
                    </div>
                    <div className="kpi-icon orange"><Clock size={28}/></div>
                </div>

                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Prontos p/ Retirada</h3>
                        <p className="kpi-value">{sales.filter(r => r.status === 'SEPARATED').length}</p>
                    </div>
                    <div className="kpi-icon"><PackageCheck size={28}/></div>
                </div>

                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Reservas Hoje</h3>
                        <p className="kpi-value">{salesCountToday}</p>
                    </div>
                    <div className="kpi-icon green"><Calendar size={28}/></div>
                </div>
            </div>

            <div className="table-card">
                <div className="table-header-row">
                    <h2 style={{margin: 0, fontSize: '1.2rem'}}>Fila de Pedidos</h2>
                    <div style={{position: 'relative'}}>
                        <Search size={16} style={{position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}/>
                        <input className="search-field" placeholder="Buscar Cliente ou ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
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
                            <td style={{fontFamily: 'monospace', color: '#94a3b8'}}>{res.id}</td>
                            <td style={{fontWeight: 600}}>{res.client?.name}</td>
                            <td>
                                <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem'}}>
                                    <Calendar size={14} color="#64748b"/>
                                    {res.createdAt ? (
                                        <>
                                            {isToday(res.createdAt) ? (
                                                <span style={{color: '#10b981', fontWeight: 600}}>Hoje</span>
                                            ) : (
                                                <span>{new Date(res.createdAt).toLocaleDateString('pt-BR')}</span>
                                            )}
                                            <span style={{color: '#64748b'}}>
                                                {new Date(res.createdAt).toLocaleTimeString('pt-BR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </>
                                    ) : (
                                        <span style={{color: '#94a3b8'}}>Sem data</span>
                                    )}
                                </div>
                            </td>
                            <td>{res.items.length} produtos</td>
                            <td>
                                <span className={`status-badge ${res.status === 'PENDING' ? 'status-pending' : 'status-ready'}`}>
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

            {selectedRes && (
                <div className="modal-overlay" onClick={() => setSelectedRes(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>

                        <div className="modal-header">
                            <h2 style={{margin: 0, fontSize: '1.1rem'}}>Separação: {selectedRes.id}</h2>
                            <span style={{fontSize: '0.8rem', color: '#94a3b8'}}>Cliente: {selectedRes.client?.name}</span>
                        </div>

                        <div className="modal-body">

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
                                                {isChecked && <Check size={16} strokeWidth={4}/>}
                                            </div>
                                            <div className="item-info">
                                                <div className="item-name">{item.name}</div>
                                                <div className="item-meta">
                                                    {item.qty}x • {item.set} • <span style={{color: '#f59e0b'}}>{item.location}</span>
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