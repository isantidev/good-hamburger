import MenuLayout from "./components/layout/MenuLayout";

export default function Home() {
    return (
        <>
            <h1 className="w-full text-center text-white text-shadow-lg text-shadow-amber-600 font-extrabold text-6xl my-10 capitalize">
                Get the best sandwiches in town
            </h1>
            <MenuLayout />
        </>
    );
}
