import React, {useEffect, useState} from 'react';
import { ArrowLeft, ShoppingCart, Layers } from 'lucide-react';
import '../Style/CardView.css';
import { useParams } from "react-router-dom";
import axios from "axios";

// Mock de uma carta específica com suas versões
const MOCK_CARD_DATA = {
    name: "Sol Ring",
    type: "Artefato",
    oracleText: "{T}: Adicione {C}{C}.",
    versions: [
        {
            id: "v1",
            setName: "Commander Masters",
            setCode: "CMM",
            finish: "Non-foil",
            price: 15.00,
            image: "https://cards.scryfall.io/large/front/7/f/7f4e910e-a60d-473d-bd8b-7043a597a7d4.jpg?1691353139"
        },
        {
            id: "v2",
            setName: "Kaladesh Inventions",
            setCode: "MPS",
            finish: "Foil • Masterpiece",
            price: 1250.00,
            image: "https://cards.scryfall.io/large/front/3/a/3abb7a78-2c67-463d-a51b-02b115ff678f.jpg?1674312845"
        },
        {
            id: "v3",
            setName: "Limited Edition Alpha",
            setCode: "LEA",
            finish: "Non-foil",
            price: 18500.00,
            image: "https://cards.scryfall.io/large/front/0/b/0bc70669-715a-471a-bef5-21d3f237eb3b.jpg?1559591398"
        }
    ]
};










const CardView = () => {
    // Estado para controlar qual imagem está sendo exibida (inicia com a 1ª versão)
    const [cardData, setCardData] = useState(null);
    const [displayImage, setDisplayImage] = useState("");
    const { id } = useParams();
    const [cards, setCards] = useState([]);
    // Estado para saber qual versão o mouse está em cima (para estilizar a barra se quiser)
    const [hoveredVersionId, setHoveredVersionId] = useState(null);

    const handleGoBack = () => {
        // Exemplo de navegação para voltar à loja ou inventário
        window.history.back();
    };

    async function handleFetchCards()
    {
        try{
            const response = await axios.get("/api/product/searchByOracleId", {params:{id: id}})
            console.log(response.data);
            setCards(response.data)
            setCardData(response.data[0].card)
            console.log(cardData)
        }
        catch
        {

        }

    }



    const handleAddToCart = (e, version) => {
        e.stopPropagation(); // Evita acionar outros eventos da barra
        alert(`Adicionado ao carrinho: ${MOCK_CARD_DATA.name} (${version.setCode}) por R$ ${version.price.toFixed(2)}`);
    };

    useEffect(() => {
        handleFetchCards();

    }, [id]);

    if (!cards.length) {
        return <div>Carta não encontrada</div>;
    }

    if (!cardData) {
        return <div>Carregando...</div>;
    }

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
                    {/* A imagem atualiza em tempo real baseada no state 'displayImage' */}
                    <img
                        src={displayImage}
                        alt={cardData?.name}
                        className="main-card-image"
                    />
                </div>

                {/* LADO DIREITO: Detalhes e Versões */}
                <div className="details-section">

                    {/* Informações Básicas da Carta */}
                    <div className="card-header-info">
                        <h1 className="card-name">{cardData?.name}</h1>
                        <p className="card-type">{cardData?.typeLine}</p>
                        <div className="card-oracle">
                            {cardData?.oracleText}
                        </div>
                    </div>

                    {/* Lista de Versões (Barras) */}
                    <div className="versions-header">
                        <Layers size={20} color="#8b5cf6" />
                        Versões Disponíveis
                    </div>

                    <div className="versions-list">
                        {cards.map((version) => (
                            <div
                                key={version.id}
                                className={`version-bar ${hoveredVersionId === version.id ? 'active-hover' : ''}`}
                                // MÁGICA AQUI: Atualiza a imagem principal ao passar o mouse
                                onMouseEnter={() => {
                                    setDisplayImage(version.card.imageUrl);
                                    setHoveredVersionId(version.id);
                                }}
                                onMouseLeave={() => setHoveredVersionId(null)}
                            >
                                {/* Info da Edição (Esquerda da Barra) */}
                                <div className="version-info">
                                    <div className="set-badge">{version.quantity} unid</div>
                                    <div>
                                        <div className="set-name">{version.card.set}</div>
                                        <span className="set-finish">{version.condition}</span>
                                    </div>
                                </div>

                                {/* Preço e Botão (Direita da Barra) */}
                                <div className="version-action">
                                    <div className="version-price">
                                        R$ {version?.buyPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </div>
                                    <button
                                        className="btn-add-cart"
                                        onClick={(e) => handleAddToCart(e, version)}
                                    >
                                        <ShoppingCart size={18} />
                                        Adicionar
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CardView;