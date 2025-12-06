import { Extra } from "@/lib/types/menu.type";
import Image from "next/image";

export default function ExtraCard(content: Extra) {
    const imageUrl = `/extra/${content.imageName.toLowerCase()}/small.webp`;

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
        </>
    );
}
