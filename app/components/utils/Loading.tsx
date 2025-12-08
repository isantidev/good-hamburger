export function Loading({ children }: { children: string }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-gray-600">{children}...</div>
        </div>
    );
}
