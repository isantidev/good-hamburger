import { Sandwich } from "@/lib/types/menu.type";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function SandwichCard(content: Sandwich) {
    const imageUrl = `/sandwich/${content.name.toLowerCase()}/mid.webp`;
    const { addToCart } = useCart();

    return (
        <article className="">
            <Image
                src={imageUrl}
                alt={`sandwich ${content.name}`}
                width={350}
                height={350}
                onError={(e) => {
                    e.currentTarget.src = "/placeholder.webp";
                }}
                loading="lazy"
            />
            <div className="">
                <h3>{content.name}</h3>
                <p>Price: ${content.price.toFixed(2)}</p>
            </div>
            <button
                className="bg-yellow-400 text-black font-bold py-2 px-4 rounded pointer hover:scale-105 transition-transform"
                onClick={() => addToCart(content)}
            >
                Add to cart +
            </button>
        </article>
    );
}
