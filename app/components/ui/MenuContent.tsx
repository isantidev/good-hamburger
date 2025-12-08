"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { getMenuData } from "@/lib/data/menu";
import { Menu } from "@/lib/types/menu.type";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Loading } from "@/app/components/utils/Loading";

const SandwichCard = lazy(() => {
    new Promise<typeof import("./SandwichCard")>((resolve) => {
        setTimeout(() => resolve(import("./SandwichCard")), 500);
    });
    return import("./SandwichCard");
});

const ExtraCard = lazy(() => {
    new Promise<typeof import("./ExtraCard")>((resolve) => {
        setTimeout(() => resolve(import("./ExtraCard")), 500);
    });
    return import("./ExtraCard");
});

const useFilter = () => {
    const [filter, setFilter] = useState<string>("all");
    return { filter, setFilter };
};

export default function MenuContent() {
    const [menu, setMenu] = useState<Menu>({ extras: [], sandwiches: [] });

    const { filter, setFilter } = useFilter();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Sync URL to State and State to URL
    useEffect(() => {
        const urlFilter = searchParams.get("filter") || "all";

        if (filter !== urlFilter) {
            setFilter(urlFilter);
        }
    }, [searchParams, setFilter, filter]);

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);

        const params = new URLSearchParams(searchParams);

        if (newFilter === "all") {
            params.delete("filter");
        } else {
            params.set("filter", newFilter);
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        async function fetchMenu() {
            try {
                // Simulate delay of 1 second
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const data = await getMenuData().then((data) => data[0]);
                setMenu(data);
            } catch (error) {
                console.error("Error fetching menu data:", error);
            }
        }

        fetchMenu();
    }, []);

    const showExtras = filter === "all" || filter === "extras";
    const showSandwiches = filter === "all" || filter === "sandwiches";

    return (
        <>
            <div className="w-full flex justify-center gap-4 mb-6 col-span-full row-start-1">
                <button
                    onClick={() => handleFilterChange("all")}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filter === "all"
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    All
                </button>
                <button
                    onClick={() => handleFilterChange("sandwiches")}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filter === "sandwiches"
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Sandwiches
                </button>
                <button
                    onClick={() => handleFilterChange("extras")}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                        filter === "extras"
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    Extras
                </button>
            </div>

            <Suspense fallback={<Loading children="Loading Extras" />}>
                {showExtras && (
                    <aside
                        className={`w-full grid gap-4 row-start-2 ${
                            filter === "extras"
                                ? "grid-cols-1 lg:grid-cols-2"
                                : filter === "all"
                                ? "grid-cols-2 lg:grid-cols-1 lg:col-start-3"
                                : ""
                        }`}
                    >
                        {menu.extras.map((extra) => {
                            return (
                                <ExtraCard
                                    key={`extra-${extra.id}`}
                                    {...extra}
                                />
                            );
                        })}
                    </aside>
                )}
            </Suspense>
            <Suspense fallback={<Loading children="Loading Sandwiches" />}>
                {showSandwiches && (
                    <section className="w-full grid grid-cols-1 grid-flow-row lg:grid-cols-2 lg:col-span-2 gap-4">
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
            </Suspense>
        </>
    );
}
