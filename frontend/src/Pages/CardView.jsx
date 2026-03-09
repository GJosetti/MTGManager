import React, { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingCart, Layers } from 'lucide-react';
import '../Style/CardView.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import useCart from "../Hooks/useCart.jsx";

const CardView = () => {

    const [cardData, setCardData] = useState(null);
    const [displayImage, setDisplayImage] = useState("");
    const { id } = useParams();
    const [cards, setCards] = useState([]);
    const [products, setProducts] = useState([]);
    const [hoveredVersionId, setHoveredVersionId] = useState(null);
    const [quantities, setQuantities] = useState({});

    const { addToCart } = useCart();

    const handleGoBack = () => window.history.back();

    async function handleFetchData() {
        try {
            const [cardsResponse, productsResponse] = await Promise.all([
                axios.get("/api/card/searchByOracleId", { params: { id } }),
                axios.get("/api/product/searchByOracleId", { params: { id } })
            ]);

            const cardsData = cardsResponse.data;
            const productsData = productsResponse.data;

            setCards(cardsData);
            setProducts(productsData);
            setCardData(cardsData[0]);
            setDisplayImage(cardsData[0]?.imageUrl);
        } catch (error) {
            console.error(error);
        }
    }

    const increaseQty = (product) => {
        setQuantities(prev => {
            const current = prev[product.id] || 1;
            if (current >= product.quantity) return prev;
            return { ...prev, [product.id]: current + 1 };
        });
    };

    const decreaseQty = (product) => {
        setQuantities(prev => {
            const current = prev[product.id] || 1;
            if (current <= 1) return prev;
            return { ...prev, [product.id]: current - 1 };
        });
    };

    const handleAddToCart = (e, product) => {
        const quantity = quantities[product.id] || 1;
        addToCart(product.id, quantity, product.quantity);
    };

    useEffect(() => { handleFetchData(); }, [id]);
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const productsByCardId = Object.fromEntries(
        products.map(p => [p.card.id, p])
    );

    const sortedCards = [...cards].sort((a, b) => {
        const hasA = productsByCardId[a.id] ? 1 : 0;
        const hasB = productsByCardId[b.id] ? 1 : 0;
        return hasB - hasA;
    });

    return (
        <div className="card-view-container">

            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={18}/> Voltar para a Busca
                </button>
            </nav>

            <div className="card-content-grid">

                <div className="image-section">
                    <img
                        src={displayImage}
                        alt={cardData?.name}
                        className="main-card-image"
                    />
                </div>

                <div className="details-section">

                    <div className="card-header-info">
                        <h1 className="card-name">{cardData?.name}</h1>
                        <p className="card-type">{cardData?.typeLine}</p>
                        <div className="card-oracle">{cardData?.oracleText}</div>
                    </div>

                    <div className="versions-header">
                        <Layers size={20} color="#8b5cf6"/>
                        Versões Disponíveis
                    </div>

                    <div className="versions-list">
                        {sortedCards.map((version) => {

                            const product = productsByCardId[version.id];

                            return (
                                <div
                                    key={version.id}
                                    className={`version-bar ${hoveredVersionId === version.id ? 'active-hover' : ''}`}
                                    onMouseEnter={() => {
                                        setDisplayImage(version.imageUrl);
                                        setHoveredVersionId(version.id);
                                    }}
                                    onMouseLeave={() => setHoveredVersionId(null)}
                                >

                                    <div className="version-info">
                                        <div className="set-badge">
                                            {product ? `${product.quantity} unid` : "Sem estoque"}
                                        </div>
                                        <div>
                                            <div className="set-name">{version.set}</div>
                                            <span className="set-finish">
                                                {product?.condition ?? "—"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="version-action">
                                        <div className="version-price">
                                            {product
                                                ? `R$ ${product.sellPrice?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`
                                                : "—"
                                            }
                                        </div>

                                        {product && (
                                            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                                <div className="qty-control">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            decreaseQty(product);
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{quantities[product.id] || 1}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            increaseQty(product);
                                                        }}
                                                        disabled={(quantities[product.id] || 1) >= product.quantity}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    className="btn-add-cart"
                                                    onClick={(e) => handleAddToCart(e, product)}
                                                >
                                                    <ShoppingCart size={18}/>
                                                    Adicionar
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CardView;