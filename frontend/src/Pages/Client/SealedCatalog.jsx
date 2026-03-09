import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, ShoppingCart, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../Style/ClientStore.css';
import '../../Style/Inventory.css';

const SealedCatalog = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    const handleGoBack = () => navigate('/client/home');

    async function fetchSealedProducts() {
        try {
            setLoading(true);
            const response = await axios.get("/api/product/searchByType", {params: {type: "SEALED"}});
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos selados:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSealedProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const filteredProducts = products.filter(p =>
        p.nomeProduto?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        alert(`Adicionado ao carrinho: ${product.nomeProduto}`);
    };

    return (
        <div className="store-container" style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>

            <nav className="top-nav" style={{marginBottom: '2rem'}}>
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={16}/> Voltar à Loja
                </button>
            </nav>

            <header className="page-header" style={{marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem'}}>
                <div>
                    <h1 style={{margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <Package size={28} color="#8b5cf6"/>
                        Produtos Selados
                    </h1>
                    <p style={{color: 'var(--text-gray)', margin: 0}}>Encontre caixas, boosters, decks e acessórios.</p>
                </div>

                <div className="search-group" style={{width: '100%', maxWidth: '350px', position: 'relative'}}>
                    <Search size={18} style={{position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8'}}/>
                    <input
                        type="text"
                        className="form-input"
                        style={{paddingLeft: '2.5rem', width: '100%'}}
                        placeholder="Buscar produto..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            <div className="inventory-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'}}>
                {loading ? (
                    <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b'}}>
                        Carregando produtos...
                    </div>
                ) : currentItems.length > 0 ? (
                    currentItems.map(product => (
                        <div
                            key={product.id}
                            className="mtg-card-item"
                            style={{cursor: 'pointer'}}
                            onClick={() => navigate(`/client/product/${product.id}`)}
                        >
                            <div className="card-image-area" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.2)'}}>
                                <img
                                    src={product?.ImgProdutoUrl}
                                    alt={product?.nomeProduto}
                                    style={{maxHeight: '180px', maxWidth: '100%', objectFit: 'contain'}}
                                />
                            </div>

                            <div className="card-details" style={{padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1}}>
                                <h3 style={{fontSize: '1rem', margin: '0.5rem 0', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                                    {product.nomeProduto}
                                </h3>

                                <div style={{marginTop: 'auto', paddingTop: '1rem'}}>
                                    <span style={{fontSize: '1.2rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem', color: 'var(--accent-green)'}}>
                                        R$ {Number(product.sellPrice).toFixed(2)}
                                    </span>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', color: '#64748b', background: 'rgba(30, 41, 59, 0.3)', borderRadius: '12px', border: '1px dashed #334155'}}>
                        <Package size={48} style={{opacity: 0.3, marginBottom: '1rem'}}/>
                        <h3 style={{color: '#f8fafc', margin: '0 0 0.5rem 0'}}>Nenhum produto encontrado.</h3>
                        <p style={{margin: 0}}>Tente buscar por um nome diferente.</p>
                    </div>
                )}
            </div>

            {!loading && totalPages > 1 && (
                <div className="pagination-container" style={{marginTop: '3rem'}}>
                    <button className="page-btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                        <ChevronLeft size={20}/>
                    </button>

                    {Array.from({length: totalPages}, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            className={`page-btn ${currentPage === number ? 'active' : ''}`}
                            onClick={() => changePage(number)}
                        >
                            {number}
                        </button>
                    ))}

                    <button className="page-btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                        <ChevronRight size={20}/>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SealedCatalog;