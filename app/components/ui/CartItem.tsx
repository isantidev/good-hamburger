import { Sandwich, Extra } from "@/lib/types/menu.type";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export function CartItem({ item }: { item: Sandwich | Extra }) {
    const { removeFromCart } = useCart();

    const imageUrl = `/${item.type}/${item.imageName.toLowerCase()}/small.webp`;

    return (
        <tr
            key={item.id}
            className="grid grid-cols-[auto_1fr_auto_4rem] gap-2 items-center "
        >
            <td>
                <Image src={imageUrl} alt={item.name} width={50} height={50} />
            </td>
            <td>{`${item.name} - ${item.type}`}</td>
            <td className="w-16 shrink flex justify-between">
                <i>$</i>
                <i>{item.price.toFixed(2)}</i>
            </td>
            <td
                className="place-self-center cursor-pointer"
                onClick={() => removeFromCart(item.id, item.type)}
            >
                🅧
            </td>
        </tr>
    );
}
