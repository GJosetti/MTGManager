import React, { useState, useEffect,useMemo } from 'react';
import { Search, ShoppingCart, Filter, Package, User, ChevronDown, Plus } from 'lucide-react';
import '../../Style/ClientStore.css';
import '../../Style/Inventory.css'; // Importamos para reaproveitar estilos do painel de filtros (filters-panel, mana-selector)
import axios from "axios";








// Mock Produtos Selados (Boosters/Decks)
const MOCK_PRODUCTS = [
    { id: 101, name: 'Commander Masters - Set Booster Box', category: 'SEALED', price: 1890.00, image: 'https://m.media-amazon.com/images/I/81B+5vKkXdL._AC_SY450_.jpg' },
    { id: 102, name: 'Lord of the Rings - Bundle', category: 'BUNDLE', price: 320.00, image: 'https://m.media-amazon.com/images/I/81Vd9vR1rQL._AC_SX425_.jpg' },
    { id: 103, name: 'Eldrazi Incursion - Commander Deck', category: 'DECK', price: 650.00, image: 'https://m.media-amazon.com/images/I/71wLp2-vKXL._AC_SY450_.jpg' },
];

const ClientStore = () => {
    const [heroSearch, setHeroSearch] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const [cards, setCards] = useState([]);

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
    // Filtros Avançados (Singles)


    const [selectedManas, setSelectedManas] = useState([]);
    const [filters, setFilters] = useState({ search: '', type: '', minPrice: '', maxPrice: '' });
    // Lógica Search Hero (Dropdown)

    const heroSuggestions = heroSearch.length < 1
        ? []
        : cards
            .filter(c => c.card?.name.toLowerCase().includes(heroSearch.toLowerCase()))
            .slice(0, 3);


    const handleAddToCart = () => setCartCount(prev => prev + 1);

    const toggleMana = (color) => {

        setSelectedManas(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
    };
    const handleFilterChange = (e) => {

        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        fetchItems();
    }, [filters, selectedManas]);

    return (
        <div className="store-container">

            {/* Navbar Transparente */}
            <nav className="store-nav">
                <div className="nav-brand">
                    <div style={{width: 32, height: 32, background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>👑</div>
                    MTGManager
                </div>
                <div className="nav-links">
                    <a href="#" style={{color: '#fff'}}>Loja</a>
                    <a href="#">Decks</a>
                    <a href="#">Eventos</a>
                </div>
                <div className="nav-actions">
                    <button className="cart-btn">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                    <button style={{background:'none', border: '1px solid #334155', color: '#fff', padding: '8px 16px', borderRadius: 8, cursor: 'pointer'}}>Login</button>
                </div>
            </nav>

            {/* Hero Section com Pesquisa Inteligente */}
            <header className="hero-section">
                <div className="hero-title">
                    <h1>Encontre sua próxima jogada.</h1>
                    <p>O maior acervo de Magic: The Gathering da região.</p>
                </div>

                <div className="search-container">
                    <Search style={{position: 'absolute', left: 20, top: 22, color: '#94a3b8'}} />
                    <input
                        type="text"
                        className="hero-search-input"
                        placeholder="Pesquise por nome da carta, coleção ou produto..."
                        value={heroSearch}
                        onChange={(e) => setHeroSearch(e.target.value)}
                    />


                    {/* O DROPDOWN MÁGICO */}

                    {heroSuggestions.length > 0 && (
                        <div className="search-dropdown">
                            <div style={{padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold'}}>SUGESTÕES</div>
                            {heroSuggestions.map(item => (
                                <div key={item.id} className="dropdown-item" onClick={() => alert(`Indo para ${item.card.name}`)}>
                                    <img src={item.card.imageUrl} className="dropdown-img" alt={item.card.name} />
                                    <div className="dropdown-info">
                                        <h4>{item.card.name}</h4>
                                        <span>{item.card.type_line} • {item.card.set}</span>
                                    </div>
                                    <div style={{marginLeft: 'auto', fontWeight: 'bold', color: '#10b981'}}>
                                        R$ {item.sellPrice.toFixed(2)}
                                    </div>
                                </div>
                            ))}
                            <div className="dropdown-item" style={{justifyContent: 'center', color: '#8b5cf6', fontWeight: '600'}}>
                                Ver todos os resultados para "{heroSearch}"
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Seção 1: Produtos Selados (Comprar Produtos) */}
            <section>
                <div className="section-title">
                    <Package size={24} color="#a78bfa" />
                    <h2>Destaques da Loja</h2>
                    <div className="section-divider"></div>
                </div>

                <div className="products-scroll">
                    {MOCK_PRODUCTS.map(prod => (
                        <div key={prod.id} className="product-card">
                            <div className="product-img-area">
                                <img src={prod.image} className="product-img" alt={prod.name} />
                            </div>
                            <div className="product-info">
                                <span className="product-tag">{prod.category}</span>
                                <h3 style={{fontSize: '1rem', margin: '0.5rem 0', height: '40px', overflow: 'hidden'}}>{prod.name}</h3>
                                <span className="product-price">R$ {prod.price.toFixed(2)}</span>
                                <button className="btn-buy" onClick={handleAddToCart}>
                                    <ShoppingCart size={18} /> Adicionar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Seção 2: Busca de Cartas (Singles) com Filtros */}
            <section className="catalog-section">
                <div className="section-title" style={{padding: 0, marginBottom: '2rem'}}>
                    <Filter size={24} color="#a78bfa" />
                    <h2>Catálogo de Cartas (Singles)</h2>
                </div>

                {/* Reutilizando a estrutura de Filtros do Admin */}
                <div className="filters-panel">
                    <div className="filter-group search-group">
                        <label>Nome</label>
                        <div style={{position: 'relative'}}>
                            <Search size={16} style={{position: 'absolute', left: 10, top: 12, color: '#94a3b8'}} />
                            <input name="search" className="form-input" style={{paddingLeft: '32px'}} placeholder="Ex: Sol Ring..." value={filters.search} onChange={handleFilterChange} />
                        </div>
                    </div>

                    <div className="filter-group mana-group">
                        <label>Cor</label>
                        <div className="mana-selector">
                            {['W', 'U', 'B', 'R', 'G', 'C'].map(c => (
                                <button key={c} className={`mana-btn ${c.toLowerCase()} ${selectedManas.includes(c) ? 'active' : ''}`} onClick={() => toggleMana(c)}>
                                    {c === 'C' ? '◇' : '{'+c+'}'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group standard-group">
                        <label>Tipo</label>
                        <select name="type" className="form-input" value={filters.type} onChange={handleFilterChange}>
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
                </div>


                {/* Grid de Singles */}
                <div className="shop-grid">
                    {cards.map(product => (
                        <div key={product.id} className="mtg-card-item">
                            <div className="card-image-area">
                                <img
                                    src={product.card?.imageUrl}
                                    className="card-img"
                                    alt={product.card?.name}
                                />
                            </div>

                            <div className="card-details">
                <span style={{
                    fontSize: '0.7rem',
                    color: '#8b5cf6',
                    fontWeight: 'bold'
                }}>
                    {product.card?.set} • {product.condition}
                </span>

                                <h3 style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {product.card?.name}
                                </h3>

                                <div style={{ marginTop: 'auto' }}>
                    <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        display: 'block',
                        marginBottom: '0.5rem'
                    }}>
                        R$ {Number(product.buyPrice).toFixed(2)}
                    </span>

                                    <button
                                        className="btn-buy"
                                        onClick={handleAddToCart}
                                        style={{ marginTop: 0, padding: '0.6rem' }}
                                    >
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </section>

        </div>
    );

};

export default ClientStore;