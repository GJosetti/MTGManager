import React, { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingCart, Layers } from 'lucide-react';
import '../Style/CardView.css';
import { useParams } from "react-router-dom";
import axios from "axios";

const CardView = () => {
    const [cardData, setCardData] = useState(null);
    const [displayImage, setDisplayImage] = useState("");
    const { id } = useParams();
    const [cards, setCards] = useState([]);
    const [products, setProducts] = useState([]);
    const [hoveredVersionId, setHoveredVersionId] = useState(null);

    const handleGoBack = () => {
        window.history.back();
    };

    // Busca os cards e products simultaneamente
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

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        alert(`Adicionado ao carrinho: ${product.card.name} (${product.card.set}) por R$ ${product.buyPrice.toFixed(2)}`);
    };

    useEffect(() => {
        handleFetchData();
    }, [id]);

    // Cria um map de products para acesso rápido
    const productsByCardId = Object.fromEntries(
        products.map(p => [p.card.id, p])
    );

    return (
        <div className="card-view-container">

            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={18} /> Voltar para a Busca
                </button>
            </nav>

            <div className="card-content-grid">

                {/* LADO ESQUERDO: Imagem da Carta */}
                <div className="image-section">
                    <img
                        src={displayImage}
                        alt={cardData?.name}
                        className="main-card-image"
                    />
                </div>

                {/* LADO DIREITO: Detalhes e Versões */}
                <div className="details-section">

                    <div className="card-header-info">
                        <h1 className="card-name">{cardData?.name}</h1>
                        <p className="card-type">{cardData?.typeLine}</p>
                        <div className="card-oracle">
                            {cardData?.oracleText}
                        </div>
                    </div>

                    <div className="versions-header">
                        <Layers size={20} color="#8b5cf6" />
                        Versões Disponíveis
                    </div>

                    <div className="versions-list">
                        {cards.map((version) => {
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
                                                ? `R$ ${product.buyPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                                : "—"
                                            }
                                        </div>

                                        {product && (
                                            <button
                                                className="btn-add-cart"
                                                onClick={(e) => handleAddToCart(e, product)}
                                            >
                                                <ShoppingCart size={18} />
                                                Adicionar
                                            </button>
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