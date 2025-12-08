import { Suspense, lazy } from "react";
import { Loading } from "@/app/components/utils/Loading";

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
        <section>
            <div className="@container px-8 grid grid-rows-[auto_1fr] grid-cols-1 place-content-center lg:grid-cols-[1fr_1fr_auto] gap-4">
                <Suspense fallback={null}>
                    <MenuContent />
                </Suspense>
            </div>
        </section>
    );
}
