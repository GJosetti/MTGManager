import React, { useState, useMemo } from 'react';
import {
    Search, Plus, Filter, ArrowLeft, ChevronLeft, ChevronRight
} from 'lucide-react';
import '../../Style/Inventory.css';
import axios from "axios";
import { useEffect } from "react";

// ... (Mantenha o MOCK_INVENTORY igual ao anterior) ...
const MOCK_INVENTORY = [
    { id: 1, name: 'The One Ring', set: 'LTR', price: 380.00, quantity: 4, type: 'Artefato', color: 'C', condition: 'NM', image: 'https://cards.scryfall.io/art_crop/front/d/5/d580634f-b310-4585-a481-86054d4930ce.jpg?1686968688' },
    { id: 2, name: 'Sheoldred, the Apocalypse', set: 'DMU', price: 450.50, quantity: 1, type: 'Criatura', color: 'B', condition: 'NM', image: 'https://cards.scryfall.io/art_crop/front/d/6/d67be074-cdd4-41d9-ac89-0a0456c4e4b2.jpg?1673307230' },
    { id: 3, name: 'Sol Ring', set: 'CMM', price: 15.00, quantity: 23, type: 'Artefato', color: 'C', condition: 'SP', image: 'https://cards.scryfall.io/art_crop/front/7/f/7f4e910e-a60d-473d-bd8b-7043a597a7d4.jpg?1691353139' },
    { id: 4, name: 'Orcish Bowmasters', set: 'LTR', price: 210.00, quantity: 0, type: 'Criatura', color: 'B', condition: 'NM', image: 'https://cards.scryfall.io/art_crop/front/7/c/7c024bae-5631-4e20-ac69-df392ac9e109.jpg?1686968516' },
    { id: 5, name: 'Mana Crypt', set: '2XM', price: 950.00, quantity: 2, type: 'Artefato', color: 'C', condition: 'MP', image: 'https://cards.scryfall.io/art_crop/front/4/d/4d960186-4559-4af0-bd22-63baa15f8939.jpg?1599709515' },
    { id: 6, name: 'Force of Will', set: 'DMR', price: 320.00, quantity: 3, type: 'Mágica Instantânea', color: 'U', condition: 'NM', image: 'https://cards.scryfall.io/art_crop/front/8/9/89f618d6-1dcc-403b-a055-081b0a49e847.jpg?1675199279' },
    { id: 7, name: 'Lightning Bolt', set: 'CLB', price: 5.00, quantity: 50, type: 'Mágica Instantânea', color: 'R', condition: 'SP', image: 'https://cards.scryfall.io/art_crop/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg?1702429406' },
    { id: 8, name: 'Birds of Paradise', set: 'DMR', price: 35.00, quantity: 8, type: 'Criatura', color: 'G', condition: 'HP', image: 'https://cards.scryfall.io/art_crop/front/f/e/feefe9f0-24a6-461c-9ef1-86c5a6f33b83.jpg?1675199852' },
    { id: 9, name: 'Wrath of God', set: 'CMM', price: 12.00, quantity: 5, type: 'Feitiço', color: 'W', condition: 'NM', image: 'https://cards.scryfall.io/art_crop/front/8/3/8396eabc-843e-4791-8f53-2b631dba572b.jpg?1691353982' },
    { id: 10, name: 'Teferi, Time Raveler', set: 'WAR', price: 45.00, quantity: 2, type: 'Planeswalker', color: 'WU', condition: 'NM', image: 'https://cards.scryfall.io/art_crop/front/5/c/5cb76266-ae50-4bbc-8f96-d98f309b02d3.jpg?1650599925' },

];

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


        // const response = await axios.get("/api/cards", { params });

        // setCards(response.data);
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

    const filteredData = useMemo(() => {
        return MOCK_INVENTORY.filter(card => {
            const matchesSearch = card.name.toLowerCase().includes(filters.search.toLowerCase());
            const matchesMana = selectedManas.length === 0 || selectedManas.some(m => card.color.includes(m));
            const matchesType = filters.type === '' || card.type.toLowerCase().includes(filters.type.toLowerCase());
            const matchesCondition = filters.condition === '' || card.condition === filters.condition;
            const min = filters.minPrice ? parseFloat(filters.minPrice) : 0;
            const max = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
            const matchesPrice = card.price >= min && card.price <= max;
            return matchesSearch && matchesMana && matchesType && matchesCondition && matchesPrice;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [filters, selectedManas]);

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
                        <option value="Criatura">Criatura</option>
                        <option value="Terreno">Terreno</option>
                        <option value="Encantamento">Encantamento</option>
                        <option value="Artefato">Artefato</option>
                        <option value="Mágica Instantânea">Mágica Instantânea</option>
                        <option value="Feitiço">Feitiço</option>
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
                {currentItems.length > 0 ? (
                    currentItems.map((card) => (
                        <div key={card.id} className="mtg-card-item">
                            <div className="card-image-area">
                                <img src={card.image} alt={card.name} className="card-img" />
                                <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.85)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', border: '1px solid #555', color: '#fff' }}>
                                    {card.quantity} un.
                                </div>
                            </div>
                            <div className="card-details">
                                <span style={{ fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 'bold', textTransform: 'uppercase' }}>{card.set} • {card.condition}</span>
                                <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={card.name}>{card.name}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    R$ {card.price.toFixed(2)}
                  </span>
                                    <div style={{width: 12, height: 12, borderRadius:'50%', background: `var(--mana-${card.color.toLowerCase().charAt(0)})` }}></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        <Filter size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>Nenhuma carta encontrada</h3>
                    </div>
                )}
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