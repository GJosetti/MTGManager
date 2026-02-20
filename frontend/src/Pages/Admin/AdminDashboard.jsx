import React, {useEffect, useState} from 'react';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    CalendarClock,
    Users,
    Settings,
    LogOut,
    Plus,
    TrendingUp,
    Search,
    Bell
} from 'lucide-react';
import '../../Style/AdminDashboard.css';
import axios from "axios";
import { Link } from "react-router-dom";


import {useNavigate} from "react-router-dom";




const AdminDashboard = () => {

    const [productCount, setProductCount] = useState(0);
    const [userInfo, setUserInfo] = useState("");

    // Dados Mockados para Exemplo

    const recentSales = [
        { id: '#1023', card: 'Sheoldred, the Apocalypse', value: 'R$ 450,00', date: 'Hoje, 14:30' },
        { id: '#1022', card: 'The One Ring (Bundle)', value: 'R$ 380,00', date: 'Hoje, 11:15' },
        { id: '#1021', card: 'Mana Crypt (Border)', value: 'R$ 1.200,00', date: 'Ontem' },
    ];
    const stockAlerts = [
        { name: 'Black Lotus (Proxy)', qtd: 2, status: 'Crítico' },
        { name: 'Sol Ring (Commander)', qtd: 5, status: 'Baixo' },
    ];

    const employees = [
        { name: 'Carlos Silva', role: 'Gerente', status: 'Ativo' },
        { name: 'Ana Souza', role: 'Vendedora', status: 'Ativo' },
        { name: 'Marcos Dias', role: 'Estoquista', status: 'Folga' },
    ];

    const activeReservations = [
        { client: 'Pedro Alencar', items: '2x Orcish Bowmasters', expire: '4h restantes' },
        { client: 'Julia M.', items: '1x Deck Commander Eldrazi', expire: '24h restantes' },
    ];

    async function HandleLogout()
    {
        const response = await axios.post("/api/auth/logout");
    }

    async function HandleProductCount()
    {
        const response = await axios.get("/api/product/count")
        setProductCount(response.data)
    }

    async function UserInfo()
    {
        const response = await axios.get("/api/auth/me")
        setUserInfo(response.data);
        console.log(response.data);
    }



    useEffect(() => {
        HandleProductCount();
    }, [])

    useEffect(() => {
        UserInfo();
    }, []);


    return (
        <div className="dashboard-container">

            {/* --- Sidebar --- */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">👑</div>
                    <span>MTGManager</span>
                </div>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link active">
                            <LayoutDashboard size={20} /> Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/inventory" className="nav-link">
                            <Package size={20} /> Estoque
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/sales" className="nav-link">
                            <ShoppingCart size={20} /> Vendas
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/reservation" className="nav-link">
                            <CalendarClock size={20} /> Reservas
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <Users size={20} /> Funcionários
                        </a>
                    </li>
                    <li className="nav-item" style={{ marginTop: 'auto' }}>
                        <a href="#" className="nav-link">
                            <Settings size={20} /> Configurações
                        </a>
                    </li>
                </ul>

                <div className="user-profile">
                    <div className="avatar">
                        {userInfo?.name
                            ?.split(" ")
                            ?.map(n => n[0])
                            ?.slice(0, 2)
                            ?.join("")
                            ?.toUpperCase()}
                    </div>
                    <div className="user-info">
                        <h4>{userInfo?.name}</h4>
                        <span>{userInfo?.email}</span>
                    </div>
                    <Link to="/login" onClick={HandleLogout}>
                        <LogOut
                            size={16}
                            style={{ marginLeft: "auto", cursor: "pointer", color: "#64748b" }}
                        />
                    </Link>
                </div>
            </aside>

            {/* --- Conteúdo Principal --- */ }
            <main className="main-content">

                {/* Top Header */}
                <header className="header-top">
                    <div>
                        <h1>Visão Geral</h1>
                        <p style={{ color: '#94a3b8', margin: 0 }}>Bem-vindo de volta ao seu painel.</p>
                    </div>

                    <div className="header-actions">
                        <button className="btn-icon" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                            <Search size={20} />
                        </button>
                        <button className="btn-icon" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: '10px' }}>
                            <Bell size={20} />
                        </button>
                        <button className="btn-primary">
                            <Plus size={18} /> Nova Venda Rápida
                        </button>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Vendas Hoje</h3>
                            <p className="value">R$ 2.450</p>
                        </div>
                        <div className="stat-icon"><TrendingUp size={24} /></div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Reservas Ativas</h3>
                            <p className="value">8</p>
                        </div>
                        <div className="stat-icon"><CalendarClock size={24} /></div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Cartas em Estoque</h3>
                            <p className="value">{productCount}</p>
                        </div>
                        <div className="stat-icon"><Package size={24} /></div>
                    </div>

                </div>

                {/* Dashboard Grid Layout */}
                <div className="dashboard-grid">

                    {/* Coluna Esquerda (Principal) */}
                    <div className="left-column">

                        {/* Histórico de Vendas Recentes */}
                        <div className="section-card">
                            <div className="section-header">
                                <h2><ShoppingCart size={18} /> Últimas Vendas</h2>
                                <a href="#" style={{ fontSize: '0.85rem', color: '#8b5cf6', textDecoration: 'none' }}>Ver todas</a>
                            </div>
                            <div className="table-wrapper">
                                <table className="data-table">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Produto Principal</th>
                                        <th>Valor</th>
                                        <th>Data</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {recentSales.map((sale, i) => (
                                        <tr key={i}>
                                            <td>{sale.id}</td>
                                            <td style={{ color: '#f8fafc' }}>{sale.card}</td>
                                            <td style={{ color: '#10b981', fontWeight: 600 }}>{sale.value}</td>
                                            <td>{sale.date}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Gerenciamento de Funcionários (Resumo) */}
                        <div className="section-card">
                            <div className="section-header">
                                <h2><Users size={18} /> Escala de Funcionários</h2>
                                <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Adicionar</button>
                            </div>
                            <div className="table-wrapper">
                                <table className="data-table">
                                    <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Função</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {employees.map((emp, i) => (
                                        <tr key={i}>
                                            <td style={{ color: '#f8fafc' }}>{emp.name}</td>
                                            <td>{emp.role}</td>
                                            <td>
                          <span className={`status-badge ${emp.status === 'Ativo' ? 'status-active' : 'status-pending'}`}>
                            {emp.status}
                          </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* Coluna Direita (Lateral) */}
                    <div className="right-column">

                        {/* Seção de Reservas (Destaque) */}
                        <div className="section-card" style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                            <div className="section-header">
                                <h2 style={{ color: '#a78bfa' }}><CalendarClock size={18} /> Reservas Pendentes</h2>
                            </div>
                            <div className="reservation-list">
                                {activeReservations.map((res, i) => (
                                    <div className="reservation-item" key={i}>
                                        <div className="res-details">
                                            <strong>{res.client}</strong>
                                            <span>{res.items}</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ fontSize: '0.75rem', color: '#f59e0b' }}>{res.expire}</span>
                                        </div>
                                    </div>
                                ))}
                                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                                    Nova Reserva
                                </button>
                            </div>
                        </div>

                        {/*TODO: Remover ou trocar sessão de "Estoque Baixo" */}

                        {/* Alertas de Estoque */}
                        <div className="section-card">
                            <div className="section-header">
                                <h2><Package size={18} /> Estoque Baixo</h2>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {stockAlerts.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                                        <span style={{ color: '#cbd5e1' }}>{item.name}</span>
                                        <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>{item.qtd} un.</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );


};

export default AdminDashboard;