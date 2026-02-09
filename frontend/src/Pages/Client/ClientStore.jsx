import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Filter, Package, User, ChevronDown, Plus } from 'lucide-react';
import '../../Style/ClientStore.css';
import '../../Style/Inventory.css'; // Importamos para reaproveitar estilos do painel de filtros (filters-panel, mana-selector)

// Mock Cartas (Singles)
const MOCK_SINGLES = [
    { id: 1, name: 'The One Ring', set: 'LTR', price: 380.00, type: 'Artefato', color: 'C', image: 'https://cards.scryfall.io/art_crop/front/d/5/d580634f-b310-4585-a481-86054d4930ce.jpg?1686968688' },
    { id: 2, name: 'Sheoldred, the Apocalypse', set: 'DMU', price: 450.50, type: 'Criatura', color: 'B', image: 'https://cards.scryfall.io/art_crop/front/d/6/d67be074-cdd4-41d9-ac89-0a0456c4e4b2.jpg?1673307230' },
    { id: 3, name: 'Sol Ring', set: 'CMM', price: 15.00, type: 'Artefato', color: 'C', image: 'https://cards.scryfall.io/art_crop/front/7/f/7f4e910e-a60d-473d-bd8b-7043a597a7d4.jpg?1691353139' },
    { id: 4, name: 'Lightning Bolt', set: 'CLB', price: 5.00, type: 'Mágica Instantânea', color: 'R', image: 'https://cards.scryfall.io/art_crop/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg?1702429406' },
];

// Mock Produtos Selados (Boosters/Decks)
const MOCK_PRODUCTS = [
    { id: 101, name: 'Commander Masters - Set Booster Box', category: 'SEALED', price: 1890.00, image: 'https://m.media-amazon.com/images/I/81B+5vKkXdL._AC_SY450_.jpg' },
    { id: 102, name: 'Lord of the Rings - Bundle', category: 'BUNDLE', price: 320.00, image: 'https://m.media-amazon.com/images/I/81Vd9vR1rQL._AC_SX425_.jpg' },
    { id: 103, name: 'Eldrazi Incursion - Commander Deck', category: 'DECK', price: 650.00, image: 'https://m.media-amazon.com/images/I/71wLp2-vKXL._AC_SY450_.jpg' },
];

const ClientStore = () => {
    const [heroSearch, setHeroSearch] = useState('');
    const [cartCount, setCartCount] = useState(0);

    // Filtros Avançados (Singles)
    const [selectedManas, setSelectedManas] = useState([]);
    const [filters, setFilters] = useState({ search: '', type: '', minPrice: '', maxPrice: '' });

    // Lógica Search Hero (Dropdown)
    const heroSuggestions = useMemo(() => {
        if (heroSearch.length < 1) return [];
        return MOCK_SINGLES.filter(c =>
            c.name.toLowerCase().includes(heroSearch.toLowerCase())).slice(0, 3);
    }, [heroSearch]);

    // Lógica Filtros Catálogo
    const filteredSingles = useMemo(() => {
        return MOCK_SINGLES.filter(card => {
            const matchesSearch = card.name.toLowerCase().includes(filters.search.toLowerCase());
            const matchesMana = selectedManas.length === 0 || selectedManas.some(m => card.color.includes(m));
            const matchesType = filters.type === '' || card.type.toLowerCase().includes(filters.type.toLowerCase());
            return matchesSearch && matchesMana && matchesType;
        });
    }, [filters, selectedManas]);

    const handleAddToCart = () => setCartCount(prev => prev + 1);

    const toggleMana = (color) => {
        setSelectedManas(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

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
                                <div key={item.id} className="dropdown-item" onClick={() => alert(`Indo para ${item.name}`)}>
                                    <img src={item.image} className="dropdown-img" alt="" />
                                    <div className="dropdown-info">
                                        <h4>{item.name}</h4>
                                        <span>{item.type} • {item.set}</span>
                                    </div>
                                    <div style={{marginLeft: 'auto', fontWeight: 'bold', color: '#10b981'}}>
                                        R$ {item.price.toFixed(2)}
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
                    {filteredSingles.map(card => (
                        <div key={card.id} className="mtg-card-item">
                            <div className="card-image-area">
                                <img src={card.image} className="card-img" alt={card.name} />
                            </div>
                            <div className="card-details">
                                <span style={{fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 'bold'}}>{card.set} • NM</span>
                                <h3 style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{card.name}</h3>
                                <div style={{marginTop: 'auto'}}>
                                    <span style={{fontSize: '1.2rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem'}}>R$ {card.price.toFixed(2)}</span>
                                    <button className="btn-buy" onClick={handleAddToCart} style={{marginTop: 0, padding: '0.6rem'}}>
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