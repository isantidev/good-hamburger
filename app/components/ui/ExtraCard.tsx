import { Extra } from "@/lib/types/menu.type";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { AddToCart } from "@/app/components/utils/AddToCartButton";

export default function ExtraCard(content: Extra) {
    const imageUrl = `/extra/${content.imageName.toLowerCase()}/small.webp`;
    const { addToCart } = useCart();

    return (
        <article className="max-w-sm w-fit px-6 mx-auto flex flex-col justify-center items-center hover:scale-105 hover:[&>img]:-rotate-6 transition-transform bg-zinc-900 p-4 rounded-lg shadow-amber-950 hover:shadow-lg gap-4 ">
            <Image
                className="max-w-52 w-40 md:w-48 lg:w-full"
                src={imageUrl}
                alt={`extra ${content.name}`}
                width={200}
                height={200}
                onError={(e) => {
                    e.currentTarget.src = "/placeholder.webp";
                }}
                loading="lazy"
            />
            <div className="[&>h3]:font-extrabold text-white text-xl lg:text-2xl [&>p]:font-medium [&>p]:text-lg lg:[&>p]:text-xl text-center lg:text-left">
                <h3>{content.name}</h3>
                <p>Price: ${content.price.toFixed(2)}</p>
                <AddToCart {...content} />
            </div>
        </article>
    );
}
