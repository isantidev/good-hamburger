"use client";

import { createContext, useContext, useState } from "react";
import { ContextChildren, CartContextType } from "@/lib/types/context.type";
import { Extra, Sandwich } from "@/lib/types/menu.type";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: ContextChildren) {
    const [cartItems, setCartItems] = useState<(Sandwich | Extra)[]>([]);

    const addToCart = (item: Sandwich | Extra): void => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId: number): void => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
        );
    };

    const clearCart = (): void => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCard must be used within a CartProvider");
    }

    return context;
}
