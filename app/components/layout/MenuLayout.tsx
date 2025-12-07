import { Suspense, lazy } from "react";

const MenuContent = lazy(
    () =>
        new Promise<typeof import("@/app/components/ui/MenuContent")>(
            (resolve) => {
                setTimeout(
                    () => resolve(import("@/app/components/ui/MenuContent")),
                    1000
                );
            }
        )
);

export default function MenuLayout() {
    return (
        <section id="menu">
            <h2>Enjoy your next best meal!</h2>

            <div className="@container px-8 grid grid-rows-[auto_1fr] grid-cols-1 place-content-center lg:grid-cols-[1fr_1fr_auto] gap-4">
                <Suspense fallback={<p>Loading menu...</p>}>
                    <MenuContent />
                </Suspense>
            </div>
        </section>
    );
}
