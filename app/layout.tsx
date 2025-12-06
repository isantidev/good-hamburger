import type { Metadata } from "next";
import Nav from "./components/layout/Nav";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";

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
                <Providers>
                    <>
                        <Nav />
                        <main>{children}</main>
                    </>
                </Providers>
            </body>
        </html>
    );
}
