"use client";

import { useState, useEffect, lazy } from "react";
import { Order } from "@/lib/types/order.type";
import { Loading } from "@/app/components/utils/Loading";

const OrderItem = lazy(() => import("./components/Order"));

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            new Promise((resolve) => setTimeout(resolve, 1000));

            const storedOrders = localStorage.getItem("orders");
            if (storedOrders) {
                const parsedOrders: Order[] = JSON.parse(storedOrders);
                const sortedOrders = parsedOrders.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setOrders(sortedOrders);
            }
        } catch (error) {
            console.error("Error loading orders:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Loading children="Loading orders" />;
    }

    return (
        <section className="min-h-dvh h-full bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
                </header>

                {/* Orders List */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <p className="text-gray-500 text-lg">No orders yet</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => {
                            const discount =
                                order.total - order.totalWithDiscount;
                            const hasDiscount = discount > 0;

                            return (
                                <OrderItem
                                    key={`order-${order.id}`}
                                    order={order}
                                    hasDiscount={hasDiscount}
                                />
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}
