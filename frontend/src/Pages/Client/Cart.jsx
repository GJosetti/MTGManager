import React, { useState, useMemo } from 'react';
import { ArrowLeft, ShoppingCart, Trash2, Minus, Plus, CreditCard, PackageOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Cart.css';

// Mock de itens no carrinho
const INITIAL_CART = [
    {
        id: "c1",
        productType: "CARD",
        name: "The One Ring",
        set: "LTR",
        condition: "NM",
        language: "EN",
        price: 380.00,
        quantity: 1,
        stock: 4,
        imageUrl: "https://cards.scryfall.io/art_crop/front/d/5/d580634f-b310-4585-a481-86054d4930ce.jpg?1686968688"
    },
    {
        id: "c2",
        productType: "CARD",
        name: "Sol Ring",
        set: "CMM",
        condition: "SP",
        language: "PT",
        price: 15.00,
        quantity: 2,
        stock: 10,
        imageUrl: "https://cards.scryfall.io/art_crop/front/7/f/7f4e910e-a60d-473d-bd8b-7043a597a7d4.jpg?1691353139"
    },
    {
        id: "p1",
        productType: "SEALED",
        name: "Commander Masters - Set Booster Box",
        set: "CMM",
        language: "EN",
        price: 1890.00,
        quantity: 1,
        stock: 3,
        imageUrl: "https://m.media-amazon.com/images/I/81B+5vKkXdL._AC_SY450_.jpg"
    }
];

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(INITIAL_CART);

    // Navegação
    const handleGoBack = () => { navigate('/cliente/home'); }; // Ajuste a rota para a sua loja

    // --- LÓGICAS DO CARRINHO ---
    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                // Impede que fique menor que 1 e maior que o estoque disponível
                if (newQty >= 1 && newQty <= item.stock) {
                    return { ...item, quantity: newQty };
                }
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    // --- CÁLCULOS TOTAIS ---
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 25.00; // Exemplo: Frete grátis acima de R$ 500
    const totalFinal = subtotal + shipping;

    const handleCheckout = () => {
        alert("Redirecionando para pagamento seguro...\nTotal: R$ " + totalFinal.toFixed(2));
        // Aqui você chamaria sua API para criar o Pedido/Reserva e limparia o carrinho
    };

    return (
        <div className="cart-container">

            <nav className="top-nav">
                <button onClick={handleGoBack} className="btn-back">
                    <ArrowLeft size={16} /> Continuar Comprando
                </button>
            </nav>

            <header className="page-header">
                <h1><ShoppingCart size={28} color="#8b5cf6" /> Meu Carrinho</h1>
                <p>Você tem {totalItems} {totalItems === 1 ? 'item' : 'itens'} no seu pedido.</p>
            </header>

            {cartItems.length > 0 ? (
                <div className="cart-layout">

                    {/* --- LISTA DE ITENS --- */}
                    <div className="cart-items-section">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item-card">

                                {/* Imagem */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className={`item-img ${item.productType === 'SEALED' ? 'sealed' : ''}`}
                                />

                                {/* Detalhes */}
                                <div className="item-details">
                                    <span className="item-set">{item.set}</span>
                                    <h3 className="item-name">{item.name}</h3>
                                    <div className="item-meta">
                                        {item.productType === 'CARD' && (
                                            <span>Estado: <strong style={{color: '#fff'}}>{item.condition}</strong></span>
                                        )}
                                        <span>Idioma: <strong style={{color: '#fff'}}>{item.language}</strong></span>
                                    </div>

                                    <button className="btn-remove" onClick={() => removeItem(item.id)}>
                                        <Trash2 size={14} /> Remover
                                    </button>
                                </div>

                                {/* Preço e Quantidade */}
                                <div className="item-price-col">
                                    <div style={{ textAlign: 'right' }}>
                                        <div className="item-total-price">
                                            R$ {(item.price * item.quantity).toFixed(2)}
                                        </div>
                                        {item.quantity > 1 && (
                                            <div className="item-unit-price">
                                                R$ {item.price.toFixed(2)} / un.
                                            </div>
                                        )}
                                    </div>

                                    <div className="qty-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, 1)}
                                            disabled={item.quantity >= item.stock}
                                            title={item.quantity >= item.stock ? "Estoque máximo atingido" : ""}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* --- RESUMO DO PEDIDO --- */}
                    <div className="cart-summary-section">
                        <h2 className="summary-title">Resumo do Pedido</h2>

                        <div className="summary-row">
                            <span>Subtotal ({totalItems} itens)</span>
                            <strong>R$ {subtotal.toFixed(2)}</strong>
                        </div>

                        <div className="summary-row">
                            <span>Frete Estimado</span>
                            <strong style={{ color: shipping === 0 ? '#10b981' : '#f8fafc' }}>
                                {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                            </strong>
                        </div>

                        <div className="summary-total">
                            <span className="summary-total-label">Total</span>
                            <span className="summary-total-value">R$ {totalFinal.toFixed(2)}</span>
                        </div>

                        <button className="btn-checkout" onClick={handleCheckout}>
                            <CreditCard size={20} /> Finalizar Compra
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                            <p>Pagamento seguro via Pix ou Cartão.</p>
                            <p>Suas cartas serão separadas e reservadas imediatamente após a confirmação.</p>
                        </div>
                    </div>

                </div>
            ) : (
                /* --- ESTADO VAZIO --- */
                <div className="empty-cart-state">
                    <PackageOpen size={64} style={{ color: '#64748b', opacity: 0.5 }} />
                    <h2>Seu carrinho está vazio!</h2>
                    <p>Parece que você ainda não adicionou nenhuma mágica ao seu arsenal.</p>
                    <button onClick={handleGoBack} className="btn-back" style={{ margin: '0 auto', background: 'var(--accent-purple)', color: '#fff', border: 'none' }}>
                        Explorar a Loja
                    </button>
                </div>
            )}

        </div>
    );
};

export default Cart;