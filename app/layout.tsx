import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Good Hamburger - Eat the best sandwiches in town",
    description:
        "Welcome to Good Hamburger, the home of the best sandwiches in town. Savor our delicious, handcrafted sandwiches made with fresh ingredients and bursting with flavor. Whether you're craving a classic bacon sandwich or a gourmet creation, we've got something for every sandwich lover. Join us for an unforgettable dining experience!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <nav className="max-w-screen h-fit bg-gray-800 text-white flex items-center justify-center gap-8 space-x-4 px-4 uppercase semi-bold">
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
                            <Link href={"/"}>Menu</Link>
                            <Link href={"/orders"}>Orders</Link>
                        </div>
                        <Image
                            src="/cart-icon.svg"
                            alt="Cart Icon"
                            width={40}
                            height={40}
                            priority
                        />
                    </div>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
}
