import React, {useEffect, useState} from 'react';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    CalendarClock,
    Users,
    LogOut,
    Plus,
    TrendingUp,
    Search,
    Bell, WalletCards
} from 'lucide-react';
import '../../Style/AdminDashboard.css';
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

    const [productCount, setProductCount] = useState(0);
    const [userInfo, setUserInfo] = useState("");
    const [sales, setSales] = useState([]);
    const [reservation, setReservation] = useState([]);
    const [employees, setEmployees] = useState([]);

    const isAdmin = userInfo?.role === 0;
    console.log(userInfo);

    async function HandleLogout() {
        await axios.post("/api/auth/logout");
    }

    async function HandleProductCount() {
        const response = await axios.get("/api/product/count");
        setProductCount(response.data);
    }

    async function UserInfo() {
        const response = await axios.get("/api/auth/me");
        setUserInfo(response.data);
    }

    async function handleFetchSales() {
        const response = await axios.get("/api/sale/listRecent", {params: {months: 3}});
        setSales(response.data);
    }

    async function handleFetchReservations() {
        const response = await axios.get("/api/sale/listReserved", {});
        setReservation(response.data);
    }

    async function handleFetchEmployees() {
        const response = await axios.get("/api/user/listByRole", {params: {role_id: 2}});
        setEmployees(response.data);
    }

    const isToday = (isoDate) => {
        if (!isoDate) return false;
        const date = new Date(isoDate);
        if (isNaN(date)) return false;
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const salesToday = sales.filter(s => isToday(s.finishedAt));
    const totalToday = salesToday.reduce((acc, curr) => acc + curr.totalValue, 0);

    useEffect(() => { HandleProductCount(); }, []);
    useEffect(() => { UserInfo(); }, []);
    useEffect(() => { handleFetchSales(); }, []);
    useEffect(() => { handleFetchReservations(); }, []);
    useEffect(() => { handleFetchEmployees(); }, []);

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
                            <LayoutDashboard size={20}/> Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/inventory" className="nav-link">
                            <WalletCards size={20}/> Singles
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/productsinventory" className="nav-link">
                            <Package size={20}/> Outros Produtos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/sales" className="nav-link">
                            <ShoppingCart size={20}/> Vendas
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/admin/reservation" className="nav-link">
                            <CalendarClock size={20}/> Reservas
                        </a>
                    </li>
                    {isAdmin && (
                        <li className="nav-item">
                            <a href="/admin/employee" className="nav-link">
                                <Users size={20}/> Funcionários
                            </a>
                        </li>
                    )}
                </ul>

                <div className="user-profile">
                    <div className="avatar">
                        {userInfo?.name?.split(" ")?.map(n => n[0])?.slice(0, 2)?.join("")?.toUpperCase()}
                    </div>
                    <div className="user-info">
                        <h4>{userInfo?.name}</h4>
                        <span>{userInfo?.email}</span>
                    </div>
                    <Link to="/login" onClick={HandleLogout}>
                        <LogOut size={16} style={{marginLeft: "auto", cursor: "pointer", color: "#64748b"}}/>
                    </Link>
                </div>
            </aside>

            {/* --- Conteúdo Principal --- */}
            <main className="main-content">

                {/* Top Header */}
                <header className="header-top">
                    <div>
                        <h1>Visão Geral</h1>
                        <p style={{color: '#94a3b8', margin: 0}}>Bem-vindo de volta ao seu painel.</p>
                    </div>
                    <div className="header-actions">
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Vendas Hoje</h3>
                            <p className="value">R${totalToday.toFixed(2)}</p>
                        </div>
                        <div className="stat-icon"><TrendingUp size={24}/></div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Reservas Ativas</h3>
                            <p className="value">{reservation.filter(r => r.status === 'PENDING').length}</p>
                        </div>
                        <div className="stat-icon"><CalendarClock size={24}/></div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Cartas em Estoque</h3>
                            <p className="value">{productCount}</p>
                        </div>
                        <div className="stat-icon"><Package size={24}/></div>
                    </div>
                </div>

                {/* Dashboard Grid Layout */}
                <div className="dashboard-grid">

                    {/* Coluna Esquerda */}
                    <div className="left-column">

                        {/* Últimas Vendas */}
                        <div className="section-card">
                            <div className="section-header">
                                <h2><ShoppingCart size={18}/> Últimas Vendas</h2>
                                <a href="/admin/sales" style={{fontSize: '0.85rem', color: '#8b5cf6', textDecoration: 'none'}}>Ver todas</a>
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
                                    {sales.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} style={{textAlign: 'center', color: '#64748b', padding: '1.5rem'}}>
                                                Nenhuma venda recente
                                            </td>
                                        </tr>
                                    ) : sales.map((sale, i) => {
                                        const mostExpensiveItem = sale.items?.reduce((prev, current) => {
                                            const prevValue = prev.quantity * prev.unitPrice;
                                            const currentValue = current.quantity * current.unitPrice;
                                            return currentValue > prevValue ? current : prev;
                                        }, sale.items?.[0]);

                                        return (
                                            <tr key={i}>
                                                <td>{sale.id}</td>
                                                <td style={{color: '#f8fafc'}}>{mostExpensiveItem?.productName}</td>
                                                <td style={{color: '#10b981', fontWeight: 600}}>R${sale.totalValue}</td>
                                                <td>
                                                    {sale.finishedAt ? (
                                                        <>
                                                            {isToday(sale.finishedAt) ? (
                                                                <span style={{color: '#10b981', fontWeight: 600}}>Hoje </span>
                                                            ) : (
                                                                <span>{new Date(sale.finishedAt).toLocaleDateString('pt-BR')} </span>
                                                            )}
                                                            <span style={{color: '#64748b'}}>
                                                                {new Date(sale.finishedAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span style={{color: '#94a3b8'}}>Não finalizada</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* Coluna Direita */}
                    <div className="right-column">

                        {/* Reservas Pendentes */}
                        <div className="section-card" style={{borderColor: 'rgba(139, 92, 246, 0.3)'}}>
                            <div className="section-header">
                                <h2 style={{color: '#a78bfa'}}><CalendarClock size={18}/> Reservas Pendentes</h2>
                            </div>
                            <div className="reservation-list">
                                {reservation.length === 0 ? (
                                    <div style={{textAlign: 'center', padding: '2rem 1rem', color: '#64748b', fontSize: '0.9rem'}}>
                                        <CalendarClock size={32} style={{marginBottom: '0.5rem', opacity: 0.4}}/>
                                        <p style={{margin: 0}}>Nenhuma reserva pendente</p>
                                    </div>
                                ) : (
                                    reservation.map((res, i) => (
                                        <div className="reservation-item" key={i}>
                                            <div className="res-details">
                                                <strong>{res.client?.name}</strong>
                                                <span>
                                                    {res.items[0]?.productName}
                                                    {res.items.length > 1 && ` +${res.items.length - 1}`}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;