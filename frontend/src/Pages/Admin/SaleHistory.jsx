import React, {useEffect, useState} from 'react';
import {
    Search, Calendar, DollarSign, TrendingUp, X, ArrowLeft, ShoppingBag
} from 'lucide-react';
import '../../Style/SaleHistory.css';
import axios from "axios";

// Mock de Dados de Vendas (Mantido igual)
const SALES_DATA = [
    {
        id: '#1024',
        buyer: 'Pedro Alencar',
        date: 'Hoje',
        time: '14:30',
        total: 450.00,
        status: 'Concluído',
        items: [
            { name: 'Sheoldred, the Apocalypse', qty: 1, price: 450.00 }
        ]
    },
    {
        id: '#1023',
        buyer: 'Julia Martins',
        date: 'Hoje',
        time: '11:15',
        total: 380.00,
        status: 'Concluído',
        items: [
            { name: 'The One Ring (Bundle)', qty: 1, price: 320.00 },
            { name: 'Dragon Shield Matte Black', qty: 1, price: 60.00 }
        ]
    },
    {
        id: '#1022',
        buyer: 'Cliente Balcão',
        date: 'Hoje',
        time: '09:45',
        total: 65.00,
        status: 'Concluído',
        items: [
            { name: 'Sol Ring', qty: 1, price: 15.00 },
            { name: 'Arcane Signet', qty: 1, price: 10.00 },
            { name: 'Command Tower', qty: 1, price: 40.00 }
        ]
    },
    {
        id: '#1021',
        buyer: 'Marcos Silva',
        date: 'Ontem',
        time: '18:20',
        total: 1200.00,
        status: 'Concluído',
        items: [
            { name: 'Mana Crypt (Border)', qty: 1, price: 1200.00 }
        ]
    },
];


//TODO:ARRUMAR O FRONT AQUI

const SalesHistory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSale, setSelectedSale] = useState(null);
    const [sales, setSales] = useState([]);


    async function handleFetchSales()
    {
        const response = await axios.get("/api/sale/listRecent", {params:{months:3}})

        setSales(response.data);
        console.log(response.data)
    }




    // Função para voltar ao dashboard
    const handleGoBack = () => {
        // Se estiver usando react-router-dom: navigate('/admin/home')
        window.location.href = '/admin/home';
    };

    const filteredSales = sales.filter(sale =>
         sale.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         String(sale.id).includes(searchTerm)
    );


    const isToday = (isoDate) => {
        if (!isoDate) return false;

        const date = new Date(isoDate);
        if (isNaN(date)) return false;

        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const salesToday = sales.filter(s => isToday(s.finishedAt));

    const totalToday = salesToday
        .reduce((acc, curr) => acc + curr.totalValue, 0);

    const salesCountToday = salesToday.length;

    const ticketAverage = salesCountToday > 0
        ? totalToday / salesCountToday
        : 0;
    useEffect(() => {
        handleFetchSales()
    }, []);

    useEffect(() => {
        console.log("SALES API:", sales);
    }, [sales]);

    return (
        <div className="sales-history-container">

            {/* Botão de Voltar (Padrão Estoque) */}
            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={18} /> Voltar ao Dashboard
                </button>
            </nav>

            <header className="page-header">
                <h1>Relatório de Vendas</h1>
                <p>Acompanhamento detalhado de performance e transações.</p>
            </header>

            {/* Grid de KPIs */}
            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Faturamento (Hoje)</h3>
                        <p className="kpi-value">R$ {totalToday.toFixed(2)}</p>
                    </div>
                    <div className="kpi-icon green">
                        <DollarSign size={28} />
                    </div>
                </div>

                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Vendas Realizadas (Hoje)</h3>
                        <p className="kpi-value">{salesCountToday}</p>
                    </div>
                    <div className="kpi-icon">
                        <ShoppingBag size={28} />
                    </div>
                </div>

                <div className="kpi-card">
                    <div className="kpi-info">
                        <h3>Ticket Médio (Hoje)</h3>
                        <p className="kpi-value">R$ {ticketAverage.toFixed(2)}</p>
                    </div>
                    <div className="kpi-icon">
                        <TrendingUp size={28} />
                    </div>
                </div>
            </div>

            {/* Tabela de Vendas */}
            <div className="table-card">
                <div className="table-header-row">
                    <h2 style={{margin:0, fontSize:'1.2rem', display:'flex', alignItems:'center', gap:'10px'}}>
                        Transações Recentes
                        <span style={{fontSize:'0.8rem', color:'#94a3b8', fontWeight:'normal'}}>({filteredSales.length} resultados)</span>
                    </h2>

                    <div className="search-field-wrapper">
                        <Search size={18} style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#94a3b8'}}/>
                        <input
                            className="search-field"
                            placeholder="Buscar por ID ou Comprador..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <table className="sales-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Comprador</th>
                        <th>Itens</th>
                        <th>Data</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredSales.map((sale) => (
                        <tr key={sale.id}>
                            <td style={{fontFamily:'monospace', color:'#94a3b8'}}>{sale.id}</td>
                            <td style={{fontWeight: 600}}>{sale.client.name}</td>
                            <td>
                                <span style={{color: '#f8fafc'}}>{sale.items[0].productName}</span>
                                {sale.items.length > 1 && <span style={{color:'#94a3b8', fontSize:'0.85rem', marginLeft:'6px'}}>+{sale.items.length - 1}</span>}
                            </td>
                            <td>
                                <div style={{display:'flex', alignItems:'center', gap:'6px', fontSize:'0.9rem'}}>
                                    <Calendar size={14} color="#64748b"/>

                                    {sale.finishedAt ? (
                                        <>
                                            {isToday(sale.finishedAt) ? (
                                                <span style={{color:'#10b981', fontWeight:600}}>Hoje</span>
                                            ) : (
                                                <span>
            {new Date(sale.finishedAt).toLocaleDateString('pt-BR')}
          </span>
                                            )}

                                            <span style={{color:'#64748b'}}>
          {new Date(sale.finishedAt).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
          })}
        </span>
                                        </>
                                    ) : (
                                        <span style={{color:'#94a3b8'}}>Não finalizada</span>
                                    )}
                                </div>
                            </td>
                            <td style={{fontWeight:'bold', color:'#10b981'}}>R$ {sale.totalValue.toFixed(2)}</td>
                            <td><span className="status-badge">{sale.status}</span></td>
                            <td>
                                <button className="btn-details" onClick={() => setSelectedSale(sale)}>
                                    Detalhes
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL DE DETALHES --- */}
            {selectedSale && (
                <div className="modal-overlay" onClick={() => setSelectedSale(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h2 style={{margin:0, fontSize:'1.1rem'}}>Pedido {selectedSale.id}</h2>
                                <span style={{fontSize:'0.8rem', color:'#94a3b8'}}>Realizado por {selectedSale.client.name}</span>
                            </div>
                            <button onClick={() => setSelectedSale(null)} style={{background:'none', border:'none', cursor:'pointer', color:'#fff'}}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div style={{maxHeight:'300px', overflowY:'auto'}}>
                                {selectedSale.items.map((item, idx) => (
                                    <div key={idx} className="item-row">
                                        <div>
                                            <div style={{fontWeight:500, marginBottom:'4px'}}>{item.productName}</div>
                                            <div style={{fontSize:'0.85rem', color:'#94a3b8'}}>{item.quantity}x R$ {item.unitPrice.toFixed(2)}</div>
                                        </div>
                                        <div style={{fontWeight:'bold', alignSelf:'center'}}>
                                            R$ {(item.quantity * item.unitPrice).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{display:'flex', justifyContent:'space-between', marginTop:'1.5rem', background:'rgba(16, 185, 129, 0.1)', padding:'1rem', borderRadius:'8px', border:'1px solid rgba(16, 185, 129, 0.2)'}}>
                                <span style={{fontWeight:600, color:'#10b981'}}>TOTAL FINAL</span>
                                <span style={{fontSize:'1.2rem', fontWeight:'bold', color:'#10b981'}}>R$ {selectedSale.totalValue.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="close-btn" onClick={() => setSelectedSale(null)}>Fechar Visualização</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SalesHistory;