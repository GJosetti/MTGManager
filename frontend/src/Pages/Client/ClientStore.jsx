import React, {useState, useEffect} from 'react';
import {Search, ShoppingCart, Filter, Package, LogOut, ArrowRight} from 'lucide-react';
import '../../Style/ClientStore.css';
import '../../Style/Inventory.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const ClientStore = () => {
    const [heroSearch, setHeroSearch] = useState('');
    const [logged, setLogged] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cards, setCards] = useState([]);
    const [userInfo, setUserInfo] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sealedProducts, setSealedProducts] = useState([]);
    const [selectedManas, setSelectedManas] = useState([]);
    const [filters, setFilters] = useState({search: '', type: '', minPrice: '', maxPrice: ''});

    const navigate = useNavigate();

    async function fetchSearchResults() {
        try {
            setLoading(true);
            const response = await axios.get("/api/card/searchUnique", {params: {name: heroSearch}});
            const data = response.data;
            if (Array.isArray(data)) setSearchResult(data);
            else if (Array.isArray(data.content)) setSearchResult(data.content);
            else setSearchResult([]);
        } catch (error) {
            console.error("Erro na busca:", error);
            setSearchResult([]);
        } finally {
            setLoading(false);
        }
    }

    async function fetchItems() {
        try {
            const params = {
                search: filters.search || null,
                type: filters.type || null,
                condition: filters.condition || null,
                minPrice: filters.minPrice || null,
                maxPrice: filters.maxPrice || null,
                colors: selectedManas.join(",")
            };
            const response = await axios.get("/api/product/search", {params});
            setCards(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error(error);
            setCards([]);
        }
    }

    async function HandleFetchSealedProducts() {
        try {
            const response = await axios.get("/api/product/searchByType", {params: {type: "SEALED"}, withCredentials: true});
            setSealedProducts(response.data.slice(0, 4));
        } catch (error) {
            console.error(error);
            setSealedProducts([]);
        }
    }

    async function UserInfo() {
        try {
            const response = await axios.get("/api/auth/me");
            setUserInfo(response.data);
        } catch (e) {
            console.log("Usuário não logado ou erro na api");
        }
    }

    async function CheckLogin() {
        try {
            const response = await axios.get("/api/auth/me");
            setLogged(response.data.email != null);
        } catch (e) {
            setLogged(false);
        }
    }

    async function HandleLogout() {
        await axios.post("/api/auth/logout");
        setLogged(false);
    }

    const heroSuggestions = heroSearch.length < 1
        ? []
        : searchResult?.filter(c => c.name?.toLowerCase().includes(heroSearch.toLowerCase())).slice(0, 3);

    const toggleMana = (color) => {
        setSelectedManas(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
    };

    const handleFilterChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value});
    };

    useEffect(() => { UserInfo(); }, []);
    useEffect(() => { CheckLogin(); }, []);
    useEffect(() => { fetchItems(); }, [filters, selectedManas]);
    useEffect(() => { HandleFetchSealedProducts(); }, []);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(totalItems);
        }
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (heroSearch.length > 2) fetchSearchResults();
        }, 500);
        return () => clearTimeout(delay);
    }, [heroSearch]);

    return (
        <div className="store-container">

            {/* Navbar */}
            <nav className="store-nav">
                <div className="nav-brand">MTGManager</div>
                <div className="nav-actions">
                    <button className="cart-btn" onClick={() => navigate('/client/cart')}>
                        <ShoppingCart size={24}/>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                    {logged ? (
                        <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                            <div className="avatar">
                                {userInfo?.name?.split(" ")?.map(n => n[0])?.slice(0, 2)?.join("")?.toUpperCase()}
                            </div>
                            <Link to="/login" onClick={HandleLogout}>
                                <LogOut size={16} style={{cursor: "pointer", color: "#64748b"}}/>
                            </Link>
                        </div>
                    ) : (
                        <button style={{background: 'none', border: '1px solid #334155', color: '#fff', padding: '8px 16px', borderRadius: 8, cursor: 'pointer'}}
                                onClick={() => navigate("/login")}>
                            Login
                        </button>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-title">
                    <h1>Encontre sua próxima jogada.</h1>
                    <p>O maior acervo de Magic: The Gathering da região.</p>
                </div>

                <div className="search-container">
                    <Search style={{position: 'absolute', left: 20, top: 22, color: '#94a3b8'}}/>
                    {loading && <div className="loading-spinner" style={{position: 'absolute', right: 5, top: 30}}></div>}
                    <input
                        type="text"
                        className="hero-search-input"
                        placeholder="Pesquise por nome da carta, coleção ou produto..."
                        value={heroSearch}
                        onChange={(e) => setHeroSearch(e.target.value)}
                    />

                    {heroSuggestions.length > 0 && (
                        <div className="search-dropdown">
                            <div style={{padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold'}}>SUGESTÕES</div>
                            {heroSuggestions.map(item => (
                                <div key={item.id} className="dropdown-item" onClick={() => navigate(`/cardview/${item.oracleID}`)}>
                                    <img src={item.imageUrl} className="dropdown-img" alt={item.name}/>
                                    <div className="dropdown-info">
                                        <h4>{item.name}</h4>
                                        <span>{item.type_line} • {item.set}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Seção Produtos Selados */}
            <section>
                <div className="section-title">
                    <Package size={24} color="#a78bfa"/>
                    <h2>Produtos Selados e Acessórios</h2>
                    <div className="section-divider"></div>
                </div>

                <div className="products-scroll">
                    {sealedProducts.length > 0 ? (
                        sealedProducts.map(prod => (
                            <div key={prod.id} className="product-card" onClick={() => navigate(`/client/product/${prod.id}`)}>
                                <div className="product-img-area">
                                    <img src={prod.ImgProdutoUrl} className="product-img" alt={prod.nomeProduto}/>
                                </div>
                                <div className="product-info">
                                    <h3 style={{fontSize: '1rem', margin: '0.5rem 0', height: '40px', overflow: 'hidden'}}>{prod.nomeProduto}</h3>
                                    <span className="product-price">R$ {Number(prod.sellPrice).toFixed(2)}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{width: '100%', textAlign: 'center', padding: '3rem', color: '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Package size={48} style={{opacity: 0.3}}/>
                            <h3 style={{color: '#f8fafc', marginTop: '1rem', marginBottom: '0.5rem'}}>Ainda não temos produtos disponíveis.</h3>
                            <p style={{margin: 0}}>Fique de olho, em breve teremos novidades nesta seção!</p>
                        </div>
                    )}
                </div>

                {sealedProducts.length >= 4 && (
                    <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
                        <button
                            onClick={() => navigate('/client/sealedCatalog')}
                            style={{
                                background: 'none',
                                border: '1px solid #8b5cf6',
                                color: '#a78bfa',
                                padding: '0.6rem 2rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            Ver Todos os Produtos <ArrowRight size={16}/>
                        </button>
                    </div>
                )}
            </section>

            {/* Seção Singles */}
            <section className="catalog-section">
                <div className="section-title" style={{padding: 0, marginBottom: '2rem'}}>
                    <Filter size={24} color="#a78bfa"/>
                    <h2>Catálogo de Cartas (Singles)</h2>
                </div>

                <div className="filters-panel">
                    <div className="filter-group search-group">
                        <label>Nome</label>
                        <div style={{position: 'relative'}}>
                            <Search size={16} style={{position: 'absolute', left: 10, top: 12, color: '#94a3b8'}}/>
                            <input name="search" className="form-input" style={{paddingLeft: '32px'}} placeholder="Ex: Sol Ring..." value={filters.search} onChange={handleFilterChange}/>
                        </div>
                    </div>

                    <div className="filter-group mana-group">
                        <label>Cor</label>
                        <div className="mana-selector">
                            {['W', 'U', 'B', 'R', 'G', 'C'].map(c => (
                                <button key={c} className={`mana-btn ${c.toLowerCase()} ${selectedManas.includes(c) ? 'active' : ''}`} onClick={() => toggleMana(c)}>
                                    {c === 'C' ? '◇' : '{' + c + '}'}
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

                <div className="shop-grid">
                    {cards.length > 0 ? (
                        cards.map(product => (
                            <div key={product.id} className="mtg-card-item" onClick={() => navigate(`/cardview/${product.card.oracleID}`)}>
                                <div className="card-image-area">
                                    <img src={product.card?.imageUrl} className="card-img" alt={product.card?.name}/>
                                </div>
                                <div className="card-details">
                                    <span style={{fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 'bold'}}>
                                        {product.card?.set} • {product.condition}
                                    </span>
                                    <h3 style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                        {product.card?.name}
                                    </h3>
                                    <div style={{marginTop: 'auto'}}>
                                        <span style={{fontSize: '1.2rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem'}}>
                                            R$ {Number(product.sellPrice).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', color: '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '12px', border: '1px dashed #334155'}}>
                            <Search size={48} style={{opacity: 0.3}}/>
                            <h3 style={{color: '#f8fafc', margin: '1rem 0 0.5rem 0'}}>Não há cartas no sistema ainda.</h3>
                            <p style={{margin: 0}}>Tente limpar os filtros, buscar por outro termo ou volte mais tarde.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ClientStore;