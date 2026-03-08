"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth";
import { Link } from "@/components/ui/LocaleLink";

interface Order {
  id: string;
  ref: string;
  status: string;
  total: number;
  subtotal: number;
  items: { name: string; quantity: number; price: number }[];
  createdAt: string;
  paymentMethod: string;
  shipping?: { city?: string; country?: string };
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusIcons: Record<string, string> = {
  pending: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  processing: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  shipped: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
  delivered: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  cancelled: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
};

export default function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch("/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-oryn-orange border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Your Orders</h1>
        <p className="text-xs text-oryn-black/40 font-plex">
          Track and manage all your ORYN orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-oryn-grey/15 p-12 text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" className="mx-auto mb-4">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-lg font-bold mb-2">No orders yet</h3>
          <p className="text-xs text-oryn-black/40 font-plex mb-6">
            Your order history will appear here once you make your first purchase.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
          >
            BROWSE PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block bg-white border border-oryn-grey/15 p-5 hover:border-oryn-orange/30 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono">{order.ref}</span>
                  <span className={`px-2 py-0.5 text-[9px] font-mono tracking-[0.1em] uppercase ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" className="group-hover:stroke-oryn-orange transition-colors">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex items-center gap-6 text-[10px] text-oryn-black/40 font-plex">
                <span>{new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span>{order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}</span>
                <span className="font-medium text-oryn-black/70">&euro;{order.total?.toFixed(2)}</span>
              </div>

              {/* Progress bar for active orders */}
              {["pending", "processing", "shipped"].includes(order.status) && (
                <div className="mt-3 pt-3 border-t border-oryn-grey/10">
                  <div className="flex items-center gap-2">
                    {["pending", "processing", "shipped", "delivered"].map((step, i) => {
                      const statusOrder = ["pending", "processing", "shipped", "delivered"];
                      const currentIndex = statusOrder.indexOf(order.status);
                      const isComplete = i <= currentIndex;
                      const isCurrent = i === currentIndex;
                      return (
                        <div key={step} className="flex items-center gap-2 flex-1">
                          <div className={`w-5 h-5 flex items-center justify-center text-[8px] ${
                            isComplete ? "bg-oryn-orange text-white" : "bg-oryn-grey/20 text-oryn-black/30"
                          }`}>
                            {isComplete ? (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            ) : (
                              String(i + 1)
                            )}
                          </div>
                          <span className={`text-[8px] font-mono tracking-[0.05em] ${isCurrent ? "text-oryn-orange font-medium" : "text-oryn-black/30"}`}>
                            {step.toUpperCase()}
                          </span>
                          {i < 3 && <div className={`flex-1 h-px ${i < currentIndex ? "bg-oryn-orange" : "bg-oryn-grey/20"}`} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
