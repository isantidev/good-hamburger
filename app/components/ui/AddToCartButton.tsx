import { useCart } from "@/app/context/CartContext";
import { Extra, Sandwich } from "@/lib/types/menu.type";

export function AddToCart(content: Sandwich | Extra) {
    const { addToCart } = useCart();

    return (
        <button
            className="bg-yellow-400 text-lg text-black font-semibold py-3 px-6 rounded cursor-pointer hover:scale-105 transition-transform mt-4"
            onClick={() => addToCart(content)}
        >
            Add to cart
        </button>
    );
}
