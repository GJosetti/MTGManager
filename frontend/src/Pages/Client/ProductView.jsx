import React, { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingCart, Package } from 'lucide-react';
import '../../Style/CardView.css';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useCart from "../../Hooks/useCart.jsx";

const ProductView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);

    const handleGoBack = () => { navigate(-1); };

    async function handleFetchData() {
        try {
            setLoading(true);
            const response = await axios.get(`/api/product/findById`, { params: { id } });
            setProduct(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Erro ao buscar o produto:", error);
        } finally {
            setLoading(false);
        }
    }

    const increaseQty = () => {
        setQuantities(prev => {
            const current = prev[product.id] || 1;
            if (current >= product.quantity) return prev;
            return { ...prev, [product.id]: current + 1 };
        });
    };

    const decreaseQty = () => {
        setQuantities(prev => {
            const current = prev[product.id] || 1;
            if (current <= 1) return prev;
            return { ...prev, [product.id]: current - 1 };
        });
    };

    const handleAddToCart = () => {
        const quantity = quantities[product.id] || 1;
        addToCart(product.id, quantity, product.quantity);
    };

    useEffect(() => {
        handleFetchData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <div className="card-view-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>Carregando produto...</div>;
    }

    if (!product) {
        return (
            <div className="card-view-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
                <h2>Produto não encontrado.</h2>
                <button onClick={handleGoBack} className="btn-back" style={{ margin: '1rem auto' }}>Voltar</button>
            </div>
        );
    }

    const displayImage = product.ImgProdutoUrl;
    const displayName = product.nomeProduto || product.name || product.catalog?.name;
    const displayLanguage = product.language || 'PT';

    return (
        <div className="card-view-container">
            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={18} /> Voltar para a Loja
                </button>
            </nav>

            <div className="card-content-grid">

                {/* --- LADO ESQUERDO: IMAGEM --- */}
                <div className="image-section">
                    <img
                        src={displayImage}
                        alt={displayName}
                        className="main-card-image"
                        style={{ objectFit: 'contain', background: 'transparent', boxShadow: 'none', maxHeight: '500px' }}
                    />
                </div>

                {/* --- LADO DIREITO: INFORMAÇÕES E COMPRA --- */}
                <div className="details-section">
                    <div className="card-header-info">
                        <h1 className="card-name">{displayName}</h1>
                        <p className="card-type">Produto Selado / Acessório</p>

                    </div>

                    <div className="versions-header">
                        <Package size={20} color="#8b5cf6" />
                        Comprar Produto
                    </div>

                    <div className="versions-list">
                        <div className="version-bar" style={{ cursor: 'default', transform: 'none', borderColor: 'var(--border-color)', background: 'rgba(30, 41, 59, 0.7)' }}>

                            <div className="version-info">
                                <div className="set-badge" style={{
                                    color: product.quantity > 0 ? '#10b981' : '#ef4444',
                                    borderColor: product.quantity > 0 ? '#10b981' : '#ef4444'
                                }}>
                                    {product.quantity > 0 ? `${product.quantity} em estoque` : "Esgotado"}
                                </div>
                                <div>

                                </div>
                            </div>

                            <div className="version-action">
                                <div className="version-price">
                                    R$ {product.sellPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </div>

                                {product.quantity > 0 && (
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

                                        <div className="qty-control">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); decreaseQty(); }}
                                                disabled={(quantities[product.id] || 1) <= 1}
                                            >
                                                -
                                            </button>

                                            <span>{quantities[product.id] || 1}</span>

                                            <button
                                                onClick={(e) => { e.stopPropagation(); increaseQty(); }}
                                                disabled={(quantities[product.id] || 1) >= product.quantity}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button className="btn-add-cart" onClick={handleAddToCart}>
                                            <ShoppingCart size={18} />
                                            Adicionar
                                        </button>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductView;