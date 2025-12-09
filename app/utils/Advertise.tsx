export function Advertise({ item }: { item: string }) {
    return (
        <div className="max-w-screen h-fit inline-flex items-center gap-4 px-4 py-2 rounded-2xl shadow text-amber-900 bg-amber-300 ring-2 ring-amber-800">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <g fill="none">
                    <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M5.312 10.762C8.23 5.587 9.689 3 12 3s3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022z"
                    />
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        strokeWidth="2"
                        d="M12 8v5"
                    />
                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                </g>
            </svg>
            <small className="text-base">
                You can select only one item per {item}.
            </small>
        </div>
    );
}
