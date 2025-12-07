"use client";

import { createContext, useContext, useState } from "react";
import { ContextChildren, CartContextType } from "@/lib/types/context.type";
import { Extra, Sandwich } from "@/lib/types/menu.type";
import { SANDWICH, EXTRA } from "@/app/const";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: ContextChildren) {
    const [cartItems, setCartItems] = useState<(Sandwich | Extra)[]>([]);

    // Add item to cart
    const addToCart = (item: Sandwich | Extra): void => {
        const isSandwich = item.type === SANDWICH;
        const isExtra = item.type === EXTRA;

        const isDuplicate = cartItems.find(
            (cartItem) => cartItem.id === item.id && cartItem.type === item.type
        );
        const isOnlyOneSandwichInCart =
            cartItems.filter((cartItem) => cartItem.type === SANDWICH).length >=
            1;

        if (isSandwich && (isDuplicate || isOnlyOneSandwichInCart)) return; // Prevent adding duplicate sandwiches

        if (isExtra && isDuplicate) return; // Prevent adding duplicate extras

        setCartItems((prevItems) => [...prevItems, item]);
    };

    // Remove item from cart
    const removeFromCart = (
        itemId: number,
        itemType: "sandwich" | "extra"
    ): void => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) => item.id !== itemId || item.type !== itemType
            )
        );
    };

    // Clear the cart
    const clearCart = (): void => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Custom hook to use the CartContext
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCard must be used within a CartProvider");
    }

    return context;
}
