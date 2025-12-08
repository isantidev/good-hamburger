"use client";

import { useEffect, useState } from "react";
import { Order } from "@/lib/types/order.type";
import { Food } from "@/lib/types/menu.type";
import { DiscountCalc } from "@/app/utils/DiscountCalc";

// Utility function to save order to localStorage
const saveOrderToLocalStorage = (order: Order) => {
    try {
        const existingOrders = localStorage.getItem("orders");
        const orders: Order[] = existingOrders
            ? JSON.parse(existingOrders)
            : [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        return true;
    } catch (error) {
        console.error("Error saving order to localStorage:", error);
        return false;
    }
};

// Generate unique order ID
const generateOrderId = () => {
    return `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Modal Component
export function OrderConfirmationModal({
    isOpen,
    onClose,
    cartItems,
}: {
    isOpen: boolean;
    onClose: () => void;
    cartItems: Food[];
}) {
    const [userName, setUserName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [totals, setTotals] = useState({
        normalTotal: 0,
        finalDiscount: 0,
        finalTotal: 0,
    });

    const discountCalc = new DiscountCalc();

    useEffect(() => {
        setTotals(() => discountCalc.calculateTotal(cartItems));
    }, [cartItems]);

    const discountPercentage =
        totals.normalTotal > 0
            ? Math.round((totals.finalDiscount / totals.normalTotal) * 100)
            : 0;

    const handleConfirmOrder = () => {
        if (!userName.trim()) {
            alert("Please enter your name");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty");
            return;
        }

        setIsSubmitting(true);

        // Simulate processing delay
        setTimeout(() => {
            const order: Order = {
                id: generateOrderId(),
                name: userName.trim(),
                products: cartItems.map((item) => ({ ...item })),
                discount: totals.finalDiscount,
                total: totals.normalTotal,
                totalWithDiscount: totals.finalTotal,
                date: new Date().toISOString(),
            };

            const saved = saveOrderToLocalStorage(order);

            if (saved) {
                setOrderSuccess(true);
                setTimeout(() => {
                    setIsSubmitting(false);
                    setOrderSuccess(false);
                    setUserName("");
                    onClose();
                }, 2000);
            } else {
                setIsSubmitting(false);
                alert("Failed to save order. Please try again.");
            }
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <header className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Confirm Your Order
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isSubmitting}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </header>

                {/* Success Message */}
                {orderSuccess && (
                    <aside className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-10 rounded-lg">
                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Order Confirmed!
                            </h3>
                            <p className="text-gray-600">
                                Your order has been placed successfully.
                            </p>
                        </div>
                    </aside>
                )}

                <main className="p-6 space-y-6">
                    <div>
                        <label
                            htmlFor="userName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Your Name
                        </label>
                        <input
                            id="userName"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Order Summary */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                            Order Summary
                        </h3>
                        <div className="space-y-2">
                            {cartItems.map((item) => (
                                <div
                                    key={`${item.type}-${item.id}`}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <span className="text-gray-600">
                                        {item.name}
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Discount Information (Read-only) */}
                    {discountPercentage > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-sm font-medium text-green-800">
                                    Discount Applied: {discountPercentage}%
                                </p>
                            </div>
                            <p className="text-xs text-green-700">
                                {discountPercentage === 20 &&
                                    "Combo deal: Sandwich + 2 extras"}
                                {discountPercentage === 15 &&
                                    "Special: Sandwich + Soda"}
                                {discountPercentage === 10 &&
                                    "Combo: Sandwich + Fries"}
                            </p>
                        </div>
                    )}

                    {/* Totals */}
                    <div className="pt-4 border-t space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium text-gray-900">
                                ${totals.normalTotal.toFixed(2)}
                            </span>
                        </div>
                        {totals.finalDiscount > 0 && (
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-green-600">
                                    Discount ({discountPercentage}%)
                                </span>
                                <span className="font-medium text-green-600">
                                    -${totals.finalDiscount.toFixed(2)}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-lg font-semibold pt-2 border-t">
                            <span className="text-gray-900">Total</span>
                            <span className="text-blue-600">
                                ${totals.finalTotal.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="flex gap-3 p-6 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmOrder}
                        disabled={isSubmitting || cartItems.length === 0}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Processing..." : "Confirm Order"}
                    </button>
                </footer>
            </div>
        </div>
    );
}
