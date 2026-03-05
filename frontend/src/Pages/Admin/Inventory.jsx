import React, { useState, useEffect } from 'react';
import {
    Search, Plus, ArrowLeft, ChevronLeft, ChevronRight, Edit2, X
} from 'lucide-react';
import '../../Style/Inventory.css';
import axios from "axios";

const Inventory = () => {
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedManas, setSelectedManas] = useState([]);
    const [cards, setCards] = useState([]);
    const [heroSearch, setHeroSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const [filters, setFilters] = useState({
        search: '',
        type: '',
        condition: '',
        minPrice: '',
        maxPrice: ''
    });

    // --- ESTADOS DOS MODAIS ---
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Estado do Modal de Edição (Agora com todas as infos)
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        condition: 'NM',
        language: 'EN',
        foil: false,
        quantity: 1,
        buyPrice: '',
        sellPrice: ''
    });

    // Estado do Modal de Adição
    const [addForm, setAddForm] = useState({
        cardSearch: '',
        card: null,
        condition: 'NM',
        language: 'EN',
        foil: false,
        quantity: 1,
        buyPrice: '',
        sellPrice: '',
        productType:"CARD"
    });

    // Estado para o Dropdown do SearchHero
    const [cardSuggestions, setCardSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // --- FUNÇÕES DE API ---
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
            const response = await axios.get("/api/product/search", { params },
                {
                    withCredentials: true  // ⚡ envia cookies só nesta requisição
                });
            setCards(response.data);
        } catch (error) {
            console.error("Erro ao buscar cartas:", error);
        }
    }

    async function handleCreateProduct() {
        await axios.post("http://localhost:8080/api/product/create", {
            card_id: addForm.card.id,
            condition: addForm.condition,
            language: addForm.language,
            foil: addForm.foil,
            quantity: Number(addForm.quantity),
            buyPrice: Number(addForm.buyPrice),
            sellPrice: Number(addForm.sellPrice),
            productType: "CARD"
        },
            {
                withCredentials: true  // ⚡ envia cookies só nesta requisição
            });
    }

    async function fetchSearchResults() {
        try {
            const response = await axios.get("/api/card/search", {
                params: { name: heroSearch }
            });

            const data = response.data;

            if (Array.isArray(data)) {
                setSearchResult(data);
            } else if (Array.isArray(data.content)) {
                setSearchResult(data.content);
            } else {
                setSearchResult([]);
            }
        } catch (error) {
            console.error("Erro na busca:", error);
            setSearchResult([]);
        }
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

    // --- LÓGICA DO MODAL DE EDITAR (NOVA) ---
    const openEditModal = (product) => {
        setEditingProduct(product);
        // Preenche o formulário com os dados que vieram do banco
        setEditForm({
            condition: product.condition || 'NM',
            language: product.language || 'EN',
            foil: product.foil || false,
            quantity: product.quantity || 1,
            buyPrice: product.buyPrice || '',
            sellPrice: product.sellPrice || ''
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(editingProduct.id);

            await axios.post(`http://localhost:8080/api/product/update`, {
                id: editingProduct.id,
                condition: editForm.condition,
                language: editForm.language,
                foil: editForm.foil,
                quantity: Number(editForm.quantity),
                buyPrice: Number(editForm.buyPrice),
                sellPrice: Number(editForm.sellPrice),
            },
                {
                    withCredentials: true  // ⚡ envia cookies só nesta requisição
                }


            );

            console.log("Produto Atualizado:", editingProduct.id, editForm);

            setIsEditModalOpen(false);
            fetchItems(); // Recarrega a lista
        } catch (error) {
            console.error("Erro ao atualizar o produto", error);
        }
    };

    // --- LÓGICA DO SEARCH HERO (MODAL ADICIONAR) ---
    const handleSearchType = async (e) => {
        const value = e.target.value;
        setAddForm({ ...addForm, cardSearch: value });
        setHeroSearch(value);
        if (value.length >= 2) {
            fetchSearchResults();
            const results = searchResult.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
            setCardSuggestions(results);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelectCard = (card) => {
        setAddForm({
            ...addForm,
            cardSearch: '',
            card: card
        });
        setShowSuggestions(false);
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        await handleCreateProduct();
        setIsAddModalOpen(false);
        fetchItems();
    };

    useEffect(() => {
        if (heroSearch.trim().length > 1) {
            fetchSearchResults();
        } else {
            setSearchResult([]);
        }
    }, [heroSearch]);

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
                <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>
                    <Plus size={18} /> Nova Carta
                </button>
            </div>

            <div className="filters-panel">
                <div className="filter-group search-group">
                    <label>Pesquisar Nome</label>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: 10, top: 12, color: '#94a3b8' }} />
                        <input name="search" className="form-input" style={{ paddingLeft: '32px' }} placeholder="Ex: Black Lotus..." value={filters.search} onChange={handleFilterChange} />
                    </div>
                </div>

                <div className="filter-group standard-group">
                    <label>Tipo</label>
                    <select name="type" className="form-input" value={filters.type} onChange={handleFilterChange}>
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

                <div className="filter-group mana-group">
                    <label>Cor</label>
                    <div className="mana-selector">
                        {['W', 'U', 'B', 'R', 'G', 'C'].map(color => (
                            <button key={color} className={`mana-btn ${color.toLowerCase()} ${selectedManas.includes(color) ? 'active' : ''}`} onClick={() => toggleMana(color)}>
                                {color === 'C' ? '◇' : '{' + color + '}'}
                            </button>
                        ))}
                    </div>
                </div>

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

            <div className="inventory-grid">
                {currentItems.map((product) => (
                    <div key={product.id} className="mtg-card-item">

                        <div className="card-actions-overlay">
                            <button className="btn-edit-card" onClick={() => openEditModal(product)} title="Editar Produto">
                                <Edit2 size={16} />
                            </button>
                        </div>

                        <div className="card-image-area">
                            <img src={product.card.imageUrl} alt={product.card.name} className="card-img" />
                            <div style={{ position: 'absolute', top: 220, right: 70, background: 'rgba(0,0,0,0.50)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', border: '1px solid #555', color: '#fff' }}>
                                {product.quantity} un.
                            </div>
                        </div>

                        <div className="card-details">
                            <span style={{ fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                {product.card.set} • {product.condition}
                            </span>
                            <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={product.card.name}>
                                {product.card.name}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    R$ {Number(product.sellPrice).toFixed(2)}
                                </span>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#666' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination-container">
                    <button className="page-btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft size={20} /></button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button key={number} className={`page-btn ${currentPage === number ? 'active' : ''}`} onClick={() => changePage(number)}>{number}</button>
                    ))}
                    <button className="page-btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}><ChevronRight size={20} /></button>
                </div>
            )}

            {/* ========================================================= */}
            {/* MODAL 1: EDITAR INFORMAÇÕES DO PRODUTO (NOVO) */}
            {/* ========================================================= */}
            {isEditModalOpen && editingProduct && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    {/* Retirei o maxWidth de 400px para caber as duas colunas */}
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleEditSubmit}>
                            <div className="modal-header">
                                <h2 style={{margin:0, fontSize:'1.2rem'}}>Editar Produto no Estoque</h2>
                                <button type="button" onClick={() => setIsEditModalOpen(false)} style={{background:'none', border:'none', cursor:'pointer', color:'#fff'}}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="modal-body">
                                {/* Exibe visualmente qual carta está sendo editada */}
                                <div style={{display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem'}}>
                                    <img src={editingProduct.card.imageUrl} alt="" style={{width: '60px', borderRadius: '4px'}} />
                                    <div>
                                        <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{editingProduct.card.name}</div>
                                        <div style={{color: '#8b5cf6', fontSize: '0.8rem'}}>{editingProduct.card.set}</div>
                                        <div style={{color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px'}}>ID do Produto: {editingProduct.id}</div>
                                    </div>
                                </div>

                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                    <div className="form-group">
                                        <label>Estado (Condition)</label>
                                        <select className="form-input" required value={editForm.condition} onChange={e => setEditForm({...editForm, condition: e.target.value})}>
                                            <option value="NM">Near Mint (NM)</option>
                                            <option value="SP">Slightly Played (SP)</option>
                                            <option value="MP">Moderately Played (MP)</option>
                                            <option value="HP">Heavily Played (HP)</option>
                                            <option value="PO">Poor (PO)</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Idioma</label>
                                        <select className="form-input" required value={editForm.language} onChange={e => setEditForm({...editForm, language: e.target.value})}>
                                            <option value="EN">Inglês</option>
                                            <option value="PT">Português</option>
                                            <option value="IT">Italiano</option>
                                            <option value="ZH">Chinês Simplificado</option>
                                            <option value="JA">Japonês</option>
                                            <option value="FR">Francês</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Preço de Custo (R$)</label>
                                        <input type="number" min="0" step="0.01" className="form-input" required value={editForm.buyPrice} onChange={e => setEditForm({...editForm, buyPrice: e.target.value})} />
                                    </div>

                                    <div className="form-group">
                                        <label>Preço de Venda (R$)</label>
                                        <input type="number" min="0" step="0.01" className="form-input" required value={editForm.sellPrice} onChange={e => setEditForm({...editForm, sellPrice: e.target.value})} />
                                    </div>

                                    <div className="form-group">
                                        <label>Quantidade em Estoque</label>
                                        <input type="number" min="0" className="form-input" required value={editForm.quantity} onChange={e => setEditForm({...editForm, quantity: e.target.value})} />
                                    </div>

                                    <div className="form-group" style={{display: 'flex', alignItems: 'flex-end', paddingBottom: '0.5rem'}}>
                                        <label className="checkbox-group">
                                            <input type="checkbox" checked={editForm.foil} onChange={e => setEditForm({...editForm, foil: e.target.checked})} />
                                            Versão Foil / Brilhante
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer" style={{margin: '1.5rem 0 0 0', borderRadius: '0 0 16px 16px'}}>
                                <button type="button" className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn-save">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================= */}
            {/* MODAL 2: ADICIONAR NOVA CARTA COM SEARCH HERO */}
            {/* ========================================================= */}
            {isAddModalOpen && (
                <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{margin:0, fontSize:'1.2rem'}}>Adicionar Novo Produto</h2>
                            <button onClick={() => setIsAddModalOpen(false)} style={{background:'none', border:'none', cursor:'pointer', color:'#fff'}}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* BARRAS DE PESQUISA COM DROPDOWN FLUTUANTE */}
                            <div className="form-group" style={{ position: 'relative' }}>
                                <label>Pesquisar Carta (Base de Dados)</label>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} style={{ position: 'absolute', left: 12, top: 12, color: '#94a3b8' }} />
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{ paddingLeft: '2.5rem' }}
                                        placeholder="Digite o nome (Ex: Sol Ring)..."
                                        value={addForm.cardSearch}
                                        onChange={handleSearchType}
                                        onFocus={() => {
                                            if (cardSuggestions.length > 0) setShowSuggestions(true);
                                        }}
                                        onBlur={() => {
                                            setTimeout(() => setShowSuggestions(false), 200);
                                        }}
                                    />
                                </div>

                                {/* DROPDOWN */}
                                {showSuggestions && cardSuggestions.length > 0 && (
                                    <div className="search-dropdown">
                                        <div style={{padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 'bold'}}>SUGESTÕES</div>
                                        {cardSuggestions.map(card => (
                                            <div key={card.id} className="dropdown-item" onClick={() => handleSelectCard(card)}>
                                                <img src={card.imageUrl} className="dropdown-img" alt={card.name} />
                                                <div className="dropdown-info">
                                                    <h4>{card.name}</h4>
                                                    <span>Edição: {card.set}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {addForm.card && (
                                <div style={{display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem'}}>
                                    <img src={addForm.card.imageUrl} alt="" style={{width: '60px', borderRadius: '4px'}} />
                                    <div>
                                        <div style={{fontWeight: 'bold', fontSize: '1.1rem'}}>{addForm.card.name}</div>
                                        <div style={{color: '#8b5cf6', fontSize: '0.8rem'}}>{addForm.card.set}</div>
                                        <div style={{color: '#10b981', fontSize: '0.8rem', marginTop: '4px'}}>✓ Carta vinculada com sucesso</div>
                                    </div>
                                    <button
                                        type="button"
                                        style={{marginLeft: 'auto', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', alignSelf: 'flex-start'}}
                                        onClick={() => setAddForm({...addForm, card: null})}
                                        title="Remover Seleção"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleAddSubmit}>
                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                    <div className="form-group">
                                        <label>Estado (Condition)</label>
                                        <select className="form-input" required value={addForm.condition} onChange={e => setAddForm({...addForm, condition: e.target.value})}>
                                            <option value="NM">Near Mint (NM)</option>
                                            <option value="SP">Slightly Played (SP)</option>
                                            <option value="MP">Moderately Played (MP)</option>
                                            <option value="HP">Heavily Played (HP)</option>
                                            <option value="PO">Poor (PO)</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Idioma</label>
                                        <select className="form-input" required value={addForm.language} onChange={e => setAddForm({...addForm, language: e.target.value})}>
                                            <option value="EN">Inglês</option>
                                            <option value="PT">Português</option>
                                            <option value="IT">Italiano</option>
                                            <option value="ZH">Chinês Simplificado</option>
                                            <option value="JA">Japonês</option>
                                            <option value="FR">Francês</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Preço de Custo (R$)</label>
                                        <input type="number" min="0" step="0.01" className="form-input" required value={addForm.buyPrice} onChange={e => setAddForm({...addForm, buyPrice: e.target.value})} />
                                    </div>

                                    <div className="form-group">
                                        <label>Preço de Venda (R$)</label>
                                        <input type="number" min="0" step="0.01" className="form-input" required value={addForm.sellPrice} onChange={e => setAddForm({...addForm, sellPrice: e.target.value})} />
                                    </div>

                                    <div className="form-group">
                                        <label>Quantidade</label>
                                        <input type="number" min="1" className="form-input" required value={addForm.quantity} onChange={e => setAddForm({...addForm, quantity: e.target.value})} />
                                    </div>

                                    <div className="form-group" style={{display: 'flex', alignItems: 'flex-end', paddingBottom: '0.5rem'}}>
                                        <label className="checkbox-group">
                                            <input type="checkbox" checked={addForm.foil} onChange={e => setAddForm({...addForm, foil: e.target.checked})} />
                                            Versão Foil / Brilhante
                                        </label>
                                    </div>
                                </div>

                                <div className="modal-footer" style={{margin: '1.5rem -1.5rem -1.5rem -1.5rem'}}>
                                    <button type="button" className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
                                    <button type="submit" className="btn-save" disabled={!addForm.card}>
                                        Adicionar ao Estoque
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;