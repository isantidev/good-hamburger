export default function Advertise({ item }: { item: string }) {
  return (
    <div className="max-w-screen h-fit inline-flex items-center gap-4 px-4 py-2 rounded-2xl shadow bg-white">
      <img
        src="/advertise.svg"
        width={40}
        height={40}
        alt="Information icon"
        className="shrink-0"
      />
      <small className="text-base text-gray-700">
        You can select only one item per {item}.
      </small>
    </div>
  );
}
