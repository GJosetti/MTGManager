import React, { useState, useEffect } from 'react';
import {
    Search, Plus, ArrowLeft, ChevronLeft, ChevronRight, Edit2, X, Package, Link as LinkIcon, Trash2
} from 'lucide-react';
import '../../Style/Inventory.css';
import axios from "axios";

const ProductsInventory = () => {
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({});

    const [addForm, setAddForm] = useState({
        nomeProduto: '',
        language: 'PT',
        quantity: 1,
        sellPrice: '',
        productType: "SEALED",
        ImgProdutoUrl: ''
    });

    async function fetchItems() {
        try {
            const response = await axios.get("/api/product/searchByType", { params: { type: "SEALED" }, withCredentials: true });
            const filtered = response.data.filter(p => p?.nomeProduto?.toLowerCase().includes(searchQuery.toLowerCase()));
            setProducts(filtered);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [searchQuery, currentPage]);

    const handleGoBack = () => { window.location.href = '/admin/home'; };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setEditForm({
            id: product.id,
            nomeProduto: product.nomeProduto,
            ImgProdutoUrl: product.ImgProdutoUrl,
            language: product.language,
            quantity: product.quantity,
            sellPrice: product.sellPrice,
            productType: product.productType
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/product/update", editForm, { withCredentials: true });
            setIsEditModalOpen(false);
            fetchItems();
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return;
        try {
            await axios.post("/api/product/delete", Number(id), {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            fetchItems();
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/product/create", addForm, { withCredentials: true });
            setIsAddModalOpen(false);
            setAddForm({ nomeProduto: '', language: 'PT', quantity: 1, sellPrice: '', productType: "SEALED", ImgProdutoUrl: '' });
            fetchItems();
        } catch (error) {
            console.error("Erro ao criar produto:", error);
        }
    };

    return (
        <div className="inventory-container">
            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={16}/> Voltar ao Dashboard
                </button>
            </nav>

            <div className="inventory-header">
                <div className="title-section">
                    <h1>Produtos Selados e Acessórios</h1>
                    <p>Gerencie boosters, bundles, decks e suprimentos da loja.</p>
                </div>
                <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>
                    <Plus size={18}/> Novo Produto
                </button>
            </div>

            <div className="filters-panel" style={{display: 'flex', alignItems: 'flex-end'}}>
                <div className="filter-group search-group" style={{flex: 1}}>
                    <label>Pesquisar Produto</label>
                    <div style={{position: 'relative'}}>
                        <Search size={16} style={{position: 'absolute', left: 10, top: 12, color: '#94a3b8'}}/>
                        <input
                            className="form-input"
                            style={{paddingLeft: '32px'}}
                            placeholder="Ex: Bundle Lord of the Rings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="inventory-grid">
                {currentItems.length > 0 ? currentItems.map((item) => (
                    <div key={item.id} className="mtg-card-item">

                        <div className="card-actions-overlay">
                            <button className="btn-edit-card" onClick={() => openEditModal(item)} title="Editar Produto">
                                <Edit2 size={16}/>
                            </button>
                            <button
                                className="btn-edit-card"
                                onClick={() => handleDelete(item.id)}
                                title="Excluir Produto"
                                style={{color: '#ef4444'}}
                            >
                                <Trash2 size={16}/>
                            </button>
                        </div>

                        <div className="card-image-area" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px'}}>
                            <img
                                src={item.ImgProdutoUrl}
                                alt={item.nomeProduto}
                                style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'contain'}}
                            />
                            <div style={{position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.85)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--accent-purple)', color: '#fff', fontWeight: 'bold'}}>
                                {item.quantity} un.
                            </div>
                        </div>

                        <div className="card-details">
                            <h3 style={{fontSize: '0.95rem', margin: '0.4rem 0', lineHeight: '1.3'}} title={item.nomeProduto}>
                                {item.nomeProduto}
                            </h3>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem'}}>
                                <span style={{fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-green)'}}>
                                    R$ {Number(item.sellPrice).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748b'}}>
                        <Package size={48} style={{marginBottom: '1rem', opacity: 0.5}}/>
                        <h3>Nenhum produto encontrado</h3>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination-container">
                    <button className="page-btn" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}><ChevronLeft size={20}/></button>
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(number => (
                        <button key={number} className={`page-btn ${currentPage === number ? 'active' : ''}`} onClick={() => changePage(number)}>{number}</button>
                    ))}
                    <button className="page-btn" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}><ChevronRight size={20}/></button>
                </div>
            )}

            {/* MODAL EDITAR */}
            {isEditModalOpen && editingProduct && (
                <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <form onSubmit={handleEditSubmit}>
                            <div className="modal-header">
                                <h2 style={{margin: 0, fontSize: '1.2rem'}}>Editar Produto</h2>
                                <button type="button" onClick={() => setIsEditModalOpen(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#fff'}}>
                                    <X size={20}/>
                                </button>
                            </div>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label>Nome do Produto</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        required
                                        value={editForm.nomeProduto}
                                        onChange={e => setEditForm({...editForm, nomeProduto: e.target.value})}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>URL da Imagem</label>
                                    <div style={{position: 'relative'}}>
                                        <LinkIcon size={18} style={{position: 'absolute', left: 12, top: 12, color: '#94a3b8'}}/>
                                        <input
                                            type="url"
                                            className="form-input"
                                            style={{paddingLeft: '2.5rem'}}
                                            value={editForm.ImgProdutoUrl}
                                            onChange={e => setEditForm({...editForm, ImgProdutoUrl: e.target.value})}
                                        />
                                    </div>
                                    {editForm.ImgProdutoUrl && (
                                        <div style={{marginTop: '1rem', textAlign: 'center', background: 'var(--bg-input)', padding: '1rem', borderRadius: '8px', border: '1px dashed var(--border-color)'}}>
                                            <img
                                                src={editForm.ImgProdutoUrl}
                                                alt="Preview"
                                                style={{maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px', margin: '0 auto', display: 'block'}}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                    <div className="form-group">
                                        <label>Idioma</label>
                                        <select className="form-input" value={editForm.language} onChange={e => setEditForm({...editForm, language: e.target.value})}>
                                            <option value="PT">Português</option>
                                            <option value="EN">Inglês</option>
                                            <option value="JA">Japonês</option>
                                            <option value="ES">Espanhol</option>
                                            <option value="N/A">Não se aplica</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Quantidade</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="form-input"
                                            required
                                            value={editForm.quantity}
                                            onChange={e => setEditForm({...editForm, quantity: Number(e.target.value)})}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Preço de Venda (R$)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="form-input"
                                            required
                                            value={editForm.sellPrice}
                                            onChange={e => setEditForm({...editForm, sellPrice: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn-save">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL ADICIONAR */}
            {isAddModalOpen && (
                <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{margin: 0, fontSize: '1.2rem'}}>Adicionar Novo Produto</h2>
                            <button onClick={() => setIsAddModalOpen(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#fff'}}>
                                <X size={20}/>
                            </button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleAddSubmit}>

                                <div className="form-group">
                                    <label>Nome do Produto</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        required
                                        placeholder="Ex: Dragon Shield Matte Black"
                                        value={addForm.nomeProduto}
                                        onChange={e => setAddForm({...addForm, nomeProduto: e.target.value})}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>URL da Imagem</label>
                                    <div style={{position: 'relative'}}>
                                        <LinkIcon size={18} style={{position: 'absolute', left: 12, top: 12, color: '#94a3b8'}}/>
                                        <input
                                            type="url"
                                            className="form-input"
                                            style={{paddingLeft: '2.5rem'}}
                                            placeholder="https://exemplo.com/imagem.png"
                                            value={addForm.ImgProdutoUrl}
                                            onChange={e => setAddForm({...addForm, ImgProdutoUrl: e.target.value})}
                                        />
                                    </div>
                                    {addForm.ImgProdutoUrl && (
                                        <div style={{marginTop: '1rem', textAlign: 'center', background: 'var(--bg-input)', padding: '1rem', borderRadius: '8px', border: '1px dashed var(--border-color)'}}>
                                            <img
                                                src={addForm.ImgProdutoUrl}
                                                alt="Preview"
                                                style={{maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px', margin: '0 auto', display: 'block'}}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                                    <div className="form-group">
                                        <label>Idioma</label>
                                        <select className="form-input" required value={addForm.language} onChange={e => setAddForm({...addForm, language: e.target.value})}>
                                            <option value="PT">Português</option>
                                            <option value="EN">Inglês</option>
                                            <option value="JA">Japonês</option>
                                            <option value="ES">Espanhol</option>
                                            <option value="N/A">Não se aplica</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Quantidade</label>
                                        <input type="number" min="1" className="form-input" required value={addForm.quantity} onChange={e => setAddForm({...addForm, quantity: Number(e.target.value)})}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Preço de Venda (R$)</label>
                                        <input type="number" min="0" step="0.01" className="form-input" required value={addForm.sellPrice} onChange={e => setAddForm({...addForm, sellPrice: e.target.value})}/>
                                    </div>
                                </div>

                                <div className="modal-footer" style={{margin: '1.5rem -1.5rem -1.5rem -1.5rem'}}>
                                    <button type="button" className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
                                    <button type="submit" className="btn-save" disabled={!addForm.nomeProduto}>Cadastrar Produto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsInventory;