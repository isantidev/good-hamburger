import { ReactElement } from "react";
import { Sandwich, Extra } from "./menu.type";

export interface ContextChildren {
    children?: ReactElement | undefined;
}

export interface CartContextType {
    cartItems: (Sandwich | Extra)[];
    addToCart: (item: Sandwich | Extra) => void;
    removeFromCart: (itemId: number, itemType: "sandwich" | "extra") => void;
    clearCart: () => void;
}
