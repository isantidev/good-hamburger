import { Sandwich } from "@/lib/types/menu.type";

export default function SandwichCard(content: Sandwich) {
    return (
        <>
            <h3>{content.name}</h3>
        </>
    );
}
