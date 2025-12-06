import { Sandwich } from "@/lib/types/menu.type";
import Image from "next/image";

export default function SandwichCard(content: Sandwich) {
    const imageUrl = `/sandwich/${content.name.toLowerCase()}/mid.webp`;

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
            <h3>{content.name}</h3>
            <p>Price: ${content.price.toFixed(2)}</p>
        </article>
    );
}
