"use client";

import { useCart } from "@/app/context/CartContext";
import { Advertise } from "@/app/utils/Advertise";
import { Extra, Sandwich } from "@/lib/types/menu.type";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function AddToCart(content: Sandwich | Extra) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        const isThere = cartItems.find(
            (item) =>
                (item.id === content.id && item.name === content.name) ||
                (item.type === "sandwich" && content.type === "sandwich")
        );

        setIsDisabled(!!isThere);

        // Si el producto ya no está en el carrito, ocultar la advertencia
        if (!isThere) {
            setShowWarning(false);
        }
    }, [cartItems, content.id, content.name, content.type]);

    const handleAddToCart = () => {
        if (isDisabled) {
            // El usuario intentó agregar un producto que ya existe
            setShowWarning(true);
            setTimeout(() => {
                setShowWarning(false);
            }, 3000);
        } else {
            addToCart(content);
            setShowWarning(false);
        }
    };

    return (
        <>
            <button
                className={`text-sm sm:text-lg font-semibold py-3 px-6 rounded transition-transform mt-4 ${
                    isDisabled
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-yellow-400 text-black cursor-pointer hover:scale-105"
                }`}
                onClick={handleAddToCart}
            >
                {isDisabled ? "Already in cart" : "Add to cart"}
            </button>
            {showWarning &&
                createPortal(
                    <>
                        <Advertise item={content.type} />
                    </>,
                    document.getElementById("messages-wrapper")!
                )}
        </>
    );
}
