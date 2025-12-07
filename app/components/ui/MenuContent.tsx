"use client";

import { useEffect, useState } from "react";
import SandwichCard from "./SandwichCard";
import ExtraCard from "./ExtraCard";
import { getMenuData } from "@/lib/data/menu";
import { Menu } from "@/lib/types/menu.type";

const useFilter = () => {
    const [filter, setFilter] = useState<string>("all");
    return { filter, setFilter };
};

export default function MenuContent() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [menu, setMenu] = useState<Menu>({ extras: [], sandwiches: [] });

    const { filter, setFilter } = useFilter();

    useEffect(() => {
        async function fetchMenu() {
            try {
                setIsLoading(true);

                // Simulate delay of 1 second
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const data = await getMenuData().then((data) => data[0]);
                setMenu(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMenu();
    }, []);

    // Show the correct sections based on the filter
    const showExtras = filter === "all" || filter === "extras";
    const showSandwiches = filter === "all" || filter === "sandwiches";

    if (isLoading) {
        return <p className="p-4 text-center">Loading menu...</p>;
    }

    return (
        <>
            <div className="w-full flex justify-center gap-4 mb-6 col-span-1 @lg:col-span-full row-start-1">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filter === "all"
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("sandwiches")}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filter === "sandwiches"
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Sandwiches
                </button>
                <button
                    onClick={() => setFilter("extras")}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filter === "extras"
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Extras
                </button>
            </div>

            {showExtras && (
                <aside className="w-full row-start-2 @lg:row-start-2 @lg:col-start-2">
                    {menu.extras.map((extra) => {
                        return (
                            <ExtraCard key={`extra-${extra.id}`} {...extra} />
                        );
                    })}
                </aside>
            )}

            {showSandwiches && (
                <section className="w-full grid grid-cols-1 grid-flow-row gap-4 row-start-3 @lg:grid-cols-7 @lg:grid-rows-2 @lg:row-start-2 @lg:col-start-1 [&>*:nth-child(1)]:@lg:col-span-3 [&>*:nth-child(2)]:@lg:col-span-3 [&>*:nth-child(2)]:@lg:col-start-5 [&>*:nth-child(3)]:@lg:row-start-2 [&>*:nth-child(3)]:@lg:col-start-3 [&>*:nth-child(3)]:@lg:col-span-3">
                    {menu.sandwiches.map((sandwich) => {
                        return (
                            <SandwichCard
                                key={`sandwich-${sandwich.id}`}
                                {...sandwich}
                            />
                        );
                    })}
                </section>
            )}
        </>
    );
}
