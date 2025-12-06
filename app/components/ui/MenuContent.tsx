"use client";

import { useEffect, useState } from "react";
import SandwichCard from "./SandwichCard";
import ExtraCard from "./ExtraCard";
import { getMenuData } from "@/lib/data/menu";
import { Menu } from "@/lib/types/menu.type";

export default function MenuContent() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [menu, setMenu] = useState<Menu>({ extras: [], sandwiches: [] });

    useEffect(() => {
        const fetchMenu = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const data = await getMenuData().then((data) => data[0]);
            setMenu(data);
            setIsLoading(false);
        };

        fetchMenu();
    }, []);

    if (isLoading) {
        return <p>Loading menu...</p>;
    }

    return (
        <>
            <aside className="w-full row-start-1 @lg:col-start-2">
                {/* Extras Card Content */}
                {menu.extras.map((extra) => {
                    return <ExtraCard key={`extra-${extra.id}`} {...extra} />;
                })}
            </aside>
            <section className="w-full grid grid-cols-1 grid-flow-row gap-4 row-start-2 @lg:grid-cols-7 @lg:grid-rows-2 @lg:row-start-1 @lg:col-start-1 [&>*:nth-child(1)]:@lg:col-span-3 [&>*:nth-child(2)]:@lg:col-span-3 [&>*:nth-child(2)]:@lg:col-start-5 [&>*:nth-child(3)]:@lg:row-start-2 [&>*:nth-child(3)]:@lg:col-start-3 [&>*:nth-child(3)]:@lg:col-span-3">
                {/* Sandwiches Card Content */}
                {menu.sandwiches.map((sandwich) => {
                    return (
                        <SandwichCard
                            key={`sandwich-${sandwich.id}`}
                            {...sandwich}
                        />
                    );
                })}
            </section>
        </>
    );
}
