import MenuContent from "@/app/components/ui/MenuContent";

export default function MenuLayout() {
    return (
        <>
            <h2>Enjoy your next best meal!</h2>

            <div className="@container grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-[1fr_auto] gap-4">
                <MenuContent />
            </div>
        </>
    );
}
