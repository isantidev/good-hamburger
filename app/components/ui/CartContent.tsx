"use client";

import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";
import { OrderConfirmationModal } from "@/app/components/ui/ConfirmModal";

export function Cart({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}) {
    const { cartItems } = useCart();
    const [isSandwich, setIsSandwich] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsSandwich(cartItems.some((item) => item.type === "sandwich"));
    }, [cartItems]);

    return (
        <>
            <aside
                className="absolute top-20 right-0 text-black bg-white border border-gray-300 rounded-lg shadow-lg z-999 w-[calc(100vw-2rem)] sm:w-96 max-w-md"
                role="dialog"
                aria-labelledby="cart-title"
                aria-modal="false"
            >
                <div className="p-4 flex flex-col">
                    <h2
                        id="cart-title"
                        className="font-bold text-xl w-full text-center"
                    >
                        Your Current Cart
                    </h2>

                    <div className="mt-4">
                        <hr className="border-gray-300" aria-hidden="true" />

                        {!cartItems.length ? (
                            <div className="my-8">
                                <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center pb-2 border-b border-gray-400">
                                    <div className="shrink-0">
                                        <Image
                                            src={"/placeholder.webp"}
                                            alt=""
                                            width={50}
                                            height={50}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <p className="text-gray-500">Empty Cart</p>
                                    <p className="w-16 shrink-0 flex justify-between">
                                        <span aria-hidden="true">$</span>
                                        <span>0.00</span>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <ul className="my-8 flex flex-col [&>li]:border-b [&>li]:border-gray-400 [&>li]:pb-2">
                                {cartItems.map((item) => (
                                    <li key={`${item.type}-${item.id}`}>
                                        <CartItem item={item} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        className={`w-full py-2 px-4 flex justify-center items-center gap-2 text-lg rounded transition-colors ${
                            !isSandwich
                                ? "bg-gray-200 cursor-not-allowed text-gray-500"
                                : "bg-amber-200 hover:bg-amber-300 cursor-pointer"
                        }`}
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        disabled={!isSandwich}
                        aria-disabled={!isSandwich}
                    >
                        {!isSandwich
                            ? "Add a Sandwich to proceed"
                            : "Let's Checkout"}
                    </button>
                </div>
            </aside>
            <OrderConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                cartItems={cartItems}
            />
        </>
    );
}
