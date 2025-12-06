import { Extra } from "@/lib/types/menu.type";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function ExtraCard(content: Extra) {
    const imageUrl = `/extra/${content.imageName.toLowerCase()}/small.webp`;
    const { addToCart } = useCart();

    return (
        <>
            <Image
                src={imageUrl}
                alt={`extra ${content.name}`}
                width={300}
                height={300}
                onError={(e) => {
                    e.currentTarget.src = "/placeholder.webp";
                }}
                loading="lazy"
            />
            <h3>{content.name}</h3>
            <p>Price: ${content.price.toFixed(2)}</p>
            <button
                className="bg-amber-400 text-black font-bold py-2 px-4 rounded pointer hover:scale-105 transition-transform"
                onClick={() => addToCart(content)}
            >
                Add to cart +
            </button>
        </>
    );
}
