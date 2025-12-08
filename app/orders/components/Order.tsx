import type { Order } from "@/lib/types/order.type";

export default function OrderItem({
    order,
    hasDiscount,
}: {
    order: Order;
    hasDiscount: boolean;
}) {
    const discount = order.total - order.totalWithDiscount;
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <li className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        {order.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Order #{order.id}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">
                        {formatDate(order.date)}
                    </p>
                </div>
            </div>

            <div className="border-t border-b py-3 mb-3">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Products:
                </h3>
                <p className="text-gray-800">
                    {order.products.map((p) => p.name).join(", ")}
                </p>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">
                        Total without discount:
                    </span>
                    <span className="font-medium text-gray-800">
                        ${order.total.toFixed(2)}
                    </span>
                </div>

                {hasDiscount && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span className="font-medium">
                            -${discount.toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Total with discount:</span>
                    <span>${order.totalWithDiscount.toFixed(2)}</span>
                </div>
            </div>
        </li>
    );
}
