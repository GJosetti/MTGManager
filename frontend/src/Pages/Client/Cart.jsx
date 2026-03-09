import React, {useState, useEffect} from 'react';
import { ArrowLeft, ShoppingCart, Trash2, Minus, Plus, CreditCard, PackageOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Cart.css';
import axios from "axios";
import useCart from "../../Hooks/useCart.jsx";

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const handleGoBack = () => { navigate('/client/home'); };

    const updateQuantity = (id, delta) => {
        setCartItems(prev => {
            const updated = prev.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    if (newQty >= 1 && newQty <= item.stock) {
                        return { ...item, quantity: newQty };
                    }
                }
                return item;
            });

            const cart = updated.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }));

            localStorage.setItem("cart", JSON.stringify(cart));
            return updated;
        });
    };

    const removeItem = (id) => {
        setCartItems(prev => {
            const updated = prev.filter(item => item.id !== id);

            const cart = updated.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }));

            localStorage.setItem("cart", JSON.stringify(cart));
            return updated;
        });
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.sellPrice * item.quantity), 0);
    const totalFinal = subtotal;

    async function fetchCartProducts() {
        try {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const productIds = cart.map(item => item.productId);

            const response = await axios.get(
                "/api/product/findAllByID",
                { params: { idList: productIds }, withCredentials: true }
            );

            const products = response.data;

            const merged = products.map(product => {
                const cartItem = cart.find(c => c.productId === product.id);
                return {
                    ...product,
                    quantity: cartItem?.quantity || 1,
                    stock: product.quantity
                };
            });

            setCartItems(merged);
        } catch (error) {
            console.error("Erro ao buscar produtos do carrinho", error);
        }
    }

    const handleCheckout = async () => {
        const me = await axios.get("/api/auth/me", {}, { withCredentials: true });

        const sale = {
            clientId: me.data.id,
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity
            })),
            totalValue: totalFinal,
            createdAt: new Date().toISOString(),
            finishedAt: null,
            paymentMethod: "CASH",
            status: "PENDING"
        };

        await axios.post("/api/sale/create", sale, { withCredentials: true });

        localStorage.removeItem("cart");
        setCartItems([]);
        alert("Pedido realizado com sucesso!");
        navigate("/client/home");
    };

    useEffect(() => {
        fetchCartProducts();
    }, []);

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

                                <img
                                    src={item.card ? item.card.imageUrl : item.ImgProdutoUrl}
                                    alt={item.card ? item.card.name : item.nomeProduto}
                                    className={`item-img ${item.productType === 'SEALED' ? 'sealed' : ''}`}
                                />

                                <div className="item-details">
                                    {item.card && <span className="item-set">{item.card.set}</span>}
                                    <h3 className="item-name">
                                        {item.card ? item.card.name : item.nomeProduto}
                                    </h3>
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

                                <div className="item-price-col">
                                    <div style={{textAlign: 'right'}}>
                                        <div className="item-total-price">
                                            R$ {(item.sellPrice * item.quantity).toFixed(2)}
                                        </div>
                                        {item.quantity > 1 && (
                                            <div className="item-unit-price">
                                                R$ {item.sellPrice.toFixed(2)} / un.
                                            </div>
                                        )}
                                    </div>

                                    <div className="qty-controls">
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16}/>
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button
                                            className="qty-btn"
                                            onClick={() => updateQuantity(item.id, 1)}
                                            disabled={item.quantity >= item.stock}
                                            title={item.quantity >= item.stock ? "Estoque máximo atingido" : ""}
                                        >
                                            <Plus size={16}/>
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

                        <div className="summary-total">
                            <span className="summary-total-label">Total</span>
                            <span className="summary-total-value">R$ {totalFinal.toFixed(2)}</span>
                        </div>

                        <button className="btn-checkout" onClick={handleCheckout}>
                            <CreditCard size={20}/> Finalizar Pedido
                        </button>

                        <div style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b'}}>
                            <p>Pagamento será realizado no balcão</p>
                            <p>Suas cartas serão separadas e reservadas após a confirmação.</p>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="empty-cart-state">
                    <PackageOpen size={64} style={{color: '#64748b', opacity: 0.5}}/>
                    <h2>Seu carrinho está vazio!</h2>
                    <p>Parece que você ainda não adicionou nenhuma mágica ao seu arsenal.</p>
                    <button onClick={handleGoBack} className="btn-back"
                            style={{margin: '0 auto', background: 'var(--accent-purple)', color: '#fff', border: 'none'}}>
                        Explorar a Loja
                    </button>
                </div>
            )}

        </div>
    );
};

export default Cart;