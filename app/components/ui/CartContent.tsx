"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";

export function Cart({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}) {
    const { cartItems } = useCart();
    const [isSandwich, setIsSandwich] = useState<boolean>(false);

    useEffect(() => {
        setIsSandwich(cartItems.some((item) => item.type === "sandwich"));
    }, [cartItems]);

    return (
        <article className="absolute w-lg flex flex-col top-20 -right-20 text-black bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-999">
            <h3 className="font-bold text-xl w-full text-center">
                Your Current Cart
            </h3>
            <table>
                <tr className="flex flex-col gap-2 mt-4">
                    <thead className="sr-only">
                        <td>
                            <Image
                                src={"/placeholder.webp"}
                                alt="item image"
                                width={50}
                                height={50}
                            />
                        </td>
                        <td>Item</td>
                        <td>Price</td>
                    </thead>
                    <hr />
                    <tbody className="my-8 flex flex-col [&>tr]:border-b [&>tr]:border-gray-400 [&>tr]:pb-2">
                        {!cartItems.length && (
                            <>
                                <tr className="grid grid-cols-[auto_1fr_auto_4rem] gap-2 items-center">
                                    <td>
                                        <Image
                                            src={"/placeholder.webp"}
                                            alt="placeholder"
                                            width={50}
                                            height={50}
                                        />
                                    </td>
                                    <td>Empty Cart</td>
                                    <td className="w-16 shrink flex justify-between">
                                        <i>$</i>
                                        <i>0.00</i>
                                    </td>
                                    <td className=""></td>
                                </tr>
                                <hr className="" />
                            </>
                        )}
                        {cartItems.map((item) => (
                            <CartItem
                                key={`${item.type}-${item.id}`}
                                item={item}
                            />
                        ))}
                    </tbody>
                </tr>
            </table>
            <button
                className={`w-full bg-amber-200 py-2 px-4 flex justify-evenly text-lg cursor-pointer ${
                    !isSandwich ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                    console.log("click");
                }}
                disabled={!isSandwich}
            >
                {!isSandwich ? "Add a Sandwich to proceed" : "Let's Checkout"}
                {/* <Image
                        className="bg-black rounded-full p-1"
                        src={"/icons/cart-checkout-icon.svg"}
                        alt="checkout icon"
                        width={20}
                        height={20}
                    /> */}
            </button>
        </article>
    );
}
