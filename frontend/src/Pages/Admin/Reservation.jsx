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
    const [showConfirm, setShowConfirm] = useState(false);

    const handleGoBack = () => { window.location.href = '/admin/home'; };

    const openModal = (reservation) => {
        setSelectedRes(reservation);
        setCheckedItems({});
        setShowConfirm(false);
    };

    async function updateItemsStatus() {
        const itemsToUpdate = selectedRes.items.filter(
            item => item.status !== 'SEPARATED' && !!checkedItems[item.id]
        );

        await Promise.all(
            itemsToUpdate.map(item =>
                axios.post("/api/sale/updateSaleItemStatus", item.id, {
                    headers: { "Content-Type": "application/json" }
                })
            )
        );
    }

    async function finishSeparation(data) {
        await axios.post(`/api/sale/updateStatusDto`, data, {
            headers: { "Content-Type": "application/json" }
        });
    }

    async function finishSale(id) {
        await axios.post(`/api/sale/finish`, id, {
            headers: { "Content-Type": "application/json" }
        });
    }

    async function sendEmail(to) {
        await axios.post(`/api/email/send`, {
            to: to,
            subject: "Sua reserva está pronta!",
            message: "Olá! Sua reserva está separada e pronta para retirada."
        }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
    }

    async function fetchSales() {
        const response = await axios.get("/api/sale/listReserved", {withCredentials: true});
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

    const separatedCount = selectedRes ? selectedRes.items.filter(
        item => item.status === 'SEPARATED' || !!checkedItems[item.id]
    ).length : 0;

    const progressPercent = totalItems > 0 ? (separatedCount / totalItems) * 100 : 0;
    const isAllSeparated = totalItems > 0 && separatedCount === totalItems;

    // Verifica se a venda já está totalmente separada no banco (sem precisar marcar nada)
    const isAlreadySeparatedInDb = selectedRes?.status === 'SEPARATED';

    const filteredData = sales.filter(r =>
        r.client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toString().includes(searchTerm)
    );

    const handleConcluir = async () => {
        try {
            await updateItemsStatus();

            if (isAllSeparated) {
                await finishSeparation({
                    id: selectedRes.id,
                    status: "SEPARATED"
                });
                sendEmail(selectedRes.client.username)
            }

            await fetchSales();
            setSelectedRes(null);
        } catch (err) {
            console.error("Erro ao atualizar itens:", err);
            alert("Erro ao concluir separação. Tente novamente.");
        }
    };

    const handleFinalizarCompra = async () => {
        try {

            await finishSale(selectedRes.id);
            await fetchSales();
            setSelectedRes(null);
            setShowConfirm(false);
        } catch (err) {
            console.error("Erro ao finalizar compra:", err);
            alert("Erro ao finalizar compra. Tente novamente.");
        }
    };

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
                            <td>{res.items.length > 1 ? `${res.items.length} produtos` : `${res.items.length} produto`}</td>
                            <td>
                                <span className={`status-badge ${res.status === 'PENDING' ? 'status-pending' : 'status-ready'}`}>
                                    {res.status}
                                </span>
                            </td>
                            <td>
                                <button className="btn-action" onClick={() => openModal(res)}>
                                    {res.status === 'PENDING' ? 'Separar' : 'Ver Detalhes'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedRes && (
                <div className="modal-overlay" onClick={() => { setSelectedRes(null); setShowConfirm(false); }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>

                        <div className="modal-header">
                            <h2 style={{margin: 0, fontSize: '1.1rem'}}>
                                {isAlreadySeparatedInDb ? 'Detalhes' : 'Separação'}: {selectedRes.id}
                            </h2>
                            <span style={{fontSize: '0.8rem', color: '#94a3b8'}}>Cliente: {selectedRes.client?.name}</span>
                        </div>

                        <div className="modal-body">

                            {/* Confirmação de finalizar compra */}
                            {showConfirm ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '2rem 1rem',
                                    textAlign: 'center'
                                }}>
                                    <PackageCheck size={48} color="#10b981"/>
                                    <h3 style={{margin: 0, fontSize: '1.1rem'}}>Confirmar Finalização</h3>
                                    <p style={{color: '#94a3b8', margin: 0}}>
                                        Tem certeza que deseja finalizar a compra do pedido <strong style={{color: '#f8fafc'}}>#{selectedRes.id}</strong> de <strong style={{color: '#f8fafc'}}>{selectedRes.client?.name}</strong>?
                                    </p>
                                    <p style={{color: '#94a3b8', fontSize: '0.85rem', margin: 0}}>
                                        Total: <strong style={{color: '#10b981'}}>R$ {selectedRes.totalValue?.toFixed(2)}</strong>
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="progress-container">
                                        <div className="progress-label">
                                            <span>Progresso da Separação</span>
                                            <span style={{color: isAllSeparated ? '#10b981' : '#94a3b8'}}>
                                                {separatedCount}/{totalItems} itens
                                            </span>
                                        </div>
                                        <div className="progress-bar-bg">
                                            <div
                                                className="progress-bar-fill"
                                                style={{
                                                    width: `${progressPercent}%`,
                                                    backgroundColor: isAllSeparated ? '#10b981' : '#8b5cf6'
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="picking-list">
                                        {selectedRes.items.map(item => {
                                            const alreadySeparated = item.status === 'SEPARATED';
                                            const isChecked = alreadySeparated || !!checkedItems[item.id];

                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`picking-item ${isChecked ? 'checked' : ''}`}
                                                    onClick={() => !alreadySeparated && toggleCheck(item.id)}
                                                    style={{
                                                        cursor: alreadySeparated ? 'default' : 'pointer',
                                                        borderColor: alreadySeparated ? '#10b981' : undefined,
                                                        backgroundColor: alreadySeparated ? 'rgba(16, 185, 129, 0.08)' : undefined,
                                                    }}
                                                >
                                                    <div className="custom-checkbox" style={{
                                                        borderColor: alreadySeparated ? '#10b981' : undefined,
                                                        backgroundColor: alreadySeparated ? '#10b981' : undefined,
                                                    }}>
                                                        {isChecked && <Check size={16} strokeWidth={4}/>}
                                                    </div>
                                                    <div className="item-info">
                                                        <div className="item-name" style={{color: alreadySeparated ? '#10b981' : undefined}}>
                                                            {item.productName}
                                                            {alreadySeparated && (
                                                                <span style={{fontSize: '0.75rem', marginLeft: '8px', color: '#10b981'}}>
                                                                    ✓ Separado
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="item-meta">{item.quantity}x</div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            {showConfirm ? (
                                <>
                                    <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                                        Voltar
                                    </button>
                                    <button className="btn-save ready" onClick={handleFinalizarCompra}>
                                        Confirmar Finalização
                                    </button>
                                </>
                            ) : isAlreadySeparatedInDb ? (
                                <>
                                    <button className="btn-cancel" onClick={() => setSelectedRes(null)}>
                                        Fechar
                                    </button>
                                    <button className="btn-save ready" onClick={() => setShowConfirm(true)}>
                                        Finalizar Compra
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn-cancel" onClick={() => setSelectedRes(null)}>
                                        Cancelar
                                    </button>
                                    <button
                                        className={`btn-save ${isAllSeparated ? 'ready' : ''}`}
                                        disabled={!isAllSeparated}
                                        onClick={handleConcluir}
                                    >
                                        {isAllSeparated ? 'Concluir Separação' : 'Marque todos os itens'}
                                    </button>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default Reservations;