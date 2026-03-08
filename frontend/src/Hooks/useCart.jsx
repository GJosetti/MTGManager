import { useState, useEffect } from "react";

function useCart() {
    const [cart, setCart] = useState(() => {
        // Tenta pegar do localStorage no carregamento
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    // Sempre que o cart mudar, salva no localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId, quantity = 1) => {
        setCart(prev => {
            const exists = prev.find(item => item.productId === productId);
            if (exists) {
                return prev.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { productId, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.productId !== productId));
    };

    return { cart, addToCart, removeFromCart };
}

export default useCart;