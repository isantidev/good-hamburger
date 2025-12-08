"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cart } from "@/app/components/ui/CartContent";

export default function Nav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`sticky top-0 max-w-screen h-fit flex items-center justify-center gap-8 space-x-4 px-4 uppercase *:semi-bold text-white transition-colors duration-300 z-9999 ${
                isScrolled ? "bg-red-900/90" : "bg-red-950"
            }`}
        >
            <div
                id="navigation-wrapper"
                className="flex max-w-7xl w-full mx-auto py-2 items-center justify-between"
            >
                <Link href={"/"}>
                    <Image
                        src="/logo.png"
                        alt="Good Hamburger Logo"
                        width={80}
                        height={40}
                        priority
                    />
                </Link>
                <div
                    id="navigation-links"
                    className="inline-flex gap-8 *:after:block *:after:w-0 *:hover:after:w-full *:after:h-1 *:after:bg-white transform-fill *:after:transition-bg-width *:after:easy-in-out *:after:duration-300"
                >
                    <Link href={"/#menu"}>Menu</Link>
                    <Link href={"/orders"}>Orders</Link>
                </div>
                <div className="relative">
                    <Image
                        className="cursor-pointer"
                        src="/icons/cart-icon.svg"
                        alt="Cart Icon"
                        width={40}
                        height={40}
                        priority
                        onClick={() => {
                            setIsCartOpen(!isCartOpen);
                        }}
                    />
                    {isCartOpen && (
                        <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
                    )}
                </div>
            </div>
        </nav>
    );
}
