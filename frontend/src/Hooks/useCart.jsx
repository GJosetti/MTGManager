import { useState, useEffect } from "react";

function useCart() {

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId, quantity = 1, stock) => {
        const exists = cart.find(item => item.productId === productId);

        if (exists) {
            const newQty = exists.quantity + quantity;
            if (newQty > stock) {
                alert("Quantidade maior que o estoque disponível!");
                return;
            }
            alert("Adicionado ao carrinho!");
            setCart(prev => prev.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQty }
                    : item
            ));
            return;
        }

        if (quantity > stock) {
            alert("Quantidade maior que o estoque disponível!");
            return;
        }

        alert("Adicionado ao carrinho!");
        setCart(prev => [...prev, { productId, quantity }]);
    };
    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.productId !== productId));
    };

    const cleanCart = () => {
        setCart([]);
    };

    return { cart, addToCart, removeFromCart };
}

export default useCart;