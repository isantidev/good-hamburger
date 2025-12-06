import { ReactElement } from "react";
import { CartProvider } from "./context/CartContext";

export function Providers({ children }: { children: ReactElement }) {
    return (
        <>
            <CartProvider>{children}</CartProvider>;
        </>
    );
}
