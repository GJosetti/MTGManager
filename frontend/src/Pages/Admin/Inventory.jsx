import React, { useState, useMemo } from 'react';
import {
    Search, Plus, Filter, ArrowLeft, ChevronLeft, ChevronRight
} from 'lucide-react';
import '../../Style/Inventory.css';
import axios from "axios";
import { useEffect } from "react";


const _inventory = []


const Inventory = () => {
    const [itemsPerPage] = useState(10); // Aumentei para 10 cartas por página
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedManas, setSelectedManas] = useState([]);
    const [cards, setCards] = useState([]);

    const [filters, setFilters] = useState({
        search: '',
        type: '',
        condition: '',
        minPrice: '',
        maxPrice: ''
    });

    async function fetchItems() {
        const params = {
            search: filters.search || null,
            type: filters.type || null,
            condition: filters.condition || null,
            minPrice: filters.minPrice || null,
            maxPrice: filters.maxPrice || null,
            colors: selectedManas.join(",")
        };


        const response = await axios.get("/api/product/search", { params });
        setCards(response.data);
    }


    useEffect(() => {
        fetchItems();
    }, [filters, selectedManas, currentPage]);

    const handleGoBack = () => { window.location.href = '/admin/home'; };

    const toggleMana = (color) => {
        setSelectedManas(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
        setCurrentPage(1);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setCurrentPage(1);
    };

    const filteredData = cards;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    return (
        <div className="inventory-container">
            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={16} /> Voltar ao Dashboard
                </button>
            </nav>

            <div className="inventory-header">
                <div className="title-section">
                    <h1>Controle de Estoque</h1>
                    <p>Gerenciamento avançado de cartas e produtos.</p>
                </div>
                <button className="btn-add">
                    <Plus size={18} /> Nova Carta
                </button>
            </div>

            {/* --- Painel de Filtros (Layout Horizontal) --- */}
            <div className="filters-panel">

                {/* Busca por Nome (Ocupa mais espaço: search-group) */}
                <div className="filter-group search-group">
                    <label>Pesquisar Nome</label>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: 10, top: 12, color: '#94a3b8' }} />
                        <input
                            name="search"
                            className="form-input"
                            style={{ paddingLeft: '32px' }}
                            placeholder="Ex: Black Lotus..."
                            value={filters.search}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>


                {/* Tipo de Carta (Agora é um Select) */}
                <div className="filter-group standard-group">
                    <label>Tipo</label>
                    <select
                        name="type"
                        className="form-input"
                        value={filters.type}
                        onChange={handleFilterChange}
                    >
                        <option value="">Todos</option>
                        <option value="Creature">Criatura</option>
                        <option value="Land">Terreno</option>
                        <option value="Enchantment">Encantamento</option>
                        <option value="Artifact">Artefato</option>
                        <option value="Instant">Mágica Instantânea</option>
                        <option value="Sorcery">Feitiço</option>
                        <option value="Planeswalker">Planeswalker</option>
                    </select>
                </div>

                {/* Cores de Mana */}
                <div className="filter-group mana-group">
                    <label>Cor</label>
                    <div className="mana-selector">
                        {['W', 'U', 'B', 'R', 'G', 'C'].map(color => (
                            <button
                                key={color}
                                className={`mana-btn ${color.toLowerCase()} ${selectedManas.includes(color) ? 'active' : ''}`}
                                onClick={() => toggleMana(color)}
                                title={`Mana ${color}`}
                            >
                                {color === 'C' ? '◇' : '{' + color + '}'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Estado da Carta */}
                <div className="filter-group standard-group">
                    <label>Estado</label>
                    <select name="condition" className="form-input" value={filters.condition} onChange={handleFilterChange}>
                        <option value="">Todos</option>
                        <option value="NM">NM</option>
                        <option value="SP">SP</option>
                        <option value="MP">MP</option>
                        <option value="HP">HP</option>
                    </select>
                </div>

                {/* Preço Min/Max (Ocupa espaço padrão) */}
                <div className="filter-group standard-group" style={{ flexDirection: 'row', gap: '5px', alignItems: 'flex-end' }}>
                    <div style={{flex: 1}}>
                        <label style={{display:'block', marginBottom: '4px'}}>Min (R$)</label>
                        <input name="minPrice" type="number" min="0" className="form-input" placeholder="0" value={filters.minPrice} onChange={handleFilterChange}/>
                    </div>
                    <div style={{flex: 1}}>
                        <label style={{display:'block', marginBottom: '4px'}}>Max (R$)</label>
                        <input name="maxPrice" type="number" min="0" className="form-input" placeholder="..." value={filters.maxPrice} onChange={handleFilterChange}/>
                    </div>
                </div>
            </div>

            {/* --- Grid de Resultados --- */}
            <div className="inventory-grid">
                {currentItems.map((product) => (
                    <div key={product.id} className="mtg-card-item">
                        <div className="card-image-area">
                            <img
                                src={product.card.imageUrl}
                                alt={product.card.name}
                                className="card-img"
                            />

                            <div style={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                background: 'rgba(0,0,0,0.85)',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                border: '1px solid #555',
                                color: '#fff'
                            }}>
                                {product.quantity} un.
                            </div>
                        </div>

                        <div className="card-details">
      <span style={{
          fontSize: '0.7rem',
          color: '#8b5cf6',
          fontWeight: 'bold',
          textTransform: 'uppercase'
      }}>
        {product.card.set} • {product.condition}
      </span>

                            <h3
                                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                title={product.card.name}
                            >
                                {product.card.name}
                            </h3>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 'auto'
                            }}>
        <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
          R$ {Number(product.sellPrice).toFixed(2)}
        </span>

                                {/* bolinha neutra (você não tem color no backend) */}
                                <div style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    background: '#666'
                                }} />
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Paginação */}
            {totalPages > 1 && (
                <div className="pagination-container">
                    <button className="page-btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft size={20} /></button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button key={number} className={`page-btn ${currentPage === number ? 'active' : ''}`} onClick={() => changePage(number)}>{number}</button>
                    ))}
                    <button className="page-btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}><ChevronRight size={20} /></button>
                </div>
            )}
        </div>
    );
};

export default Inventory;