import { Sandwich } from "@/lib/types/menu.type";
import Image from "next/image";
import { AddToCart } from "./AddToCartButton";

export default function SandwichCard(content: Sandwich) {
    const imageUrl = `/sandwich/${content.name.toLowerCase()}/mid.webp`;

    return (
        <article className="max-w-3xl w-fit px-8 mx-auto flex flex-col xl:flex-row justify-center xl:justify-evenly items-center hover:scale-105 hover:[&>img]:rotate-12 transition-transform bg-white p-4 rounded-lg shadow-orange-950 hover:shadow-xl gap-4 ">
            <Image
                className="max-w-86 w-64 md:w-70 lg:w-full"
                src={imageUrl}
                alt={`sandwich ${content.name}`}
                width={350}
                height={350}
                onError={(e) => {
                    e.currentTarget.src = "/placeholder.webp";
                }}
                loading="lazy"
            />
            <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="[&>h3]:font-extrabold text-xl lg:text-2xl [&>p]:font-medium [&>p]:text-lg lg:[&>p]:text-xl text-center lg:text-left">
                    <h3>{content.name}</h3>
                    <p>Price: ${content.price.toFixed(2)}</p>
                </div>
                <AddToCart {...content} />
            </div>
        </article>
    );
}
