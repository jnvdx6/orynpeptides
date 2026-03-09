"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/providers/products";
import { useLocale } from "@/i18n/LocaleContext";
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

export default function OrdersPage() {
  const { token } = useAuth();
  const { addItem } = useCart();
  const { products } = useProducts();
  const { t, locale } = useLocale();
  const o = t.account.orders;
  const od = t.account.orderDetail;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordered, setReordered] = useState<string | null>(null);

  const handleReorder = (e: React.MouseEvent, order: Order) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    let added = 0;
    for (const item of order.items || []) {
      const product = products.find((p) => p.name === item.name);
      if (product) {
        for (let i = 0; i < item.quantity; i++) {
          addItem(product);
        }
        added++;
      }
    }
    if (added > 0) {
      setReordered(order.id);
      setTimeout(() => setReordered(null), 2000);
    }
  };

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

  const dateLocale = locale === "es" ? "es-ES" : "en-GB";
  const statusLabels: Record<string, string> = {
    pending: od.pending,
    processing: od.processing,
    shipped: od.shipped,
    delivered: od.delivered,
    cancelled: od.cancelled,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">{o.title}</h1>
        <p className="text-xs text-oryn-black/40 font-plex">
          {o.subtitle}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-oryn-grey/15 p-12 text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" className="mx-auto mb-4">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 className="text-lg font-bold mb-2">{o.noOrders}</h3>
          <p className="text-xs text-oryn-black/40 font-plex mb-6">
            {o.noOrdersDesc}
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
          >
            {o.browseProducts}
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
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" className="group-hover:stroke-oryn-orange transition-colors">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-[10px] text-oryn-black/40 font-plex">
                  <span>{new Date(order.createdAt).toLocaleDateString(dateLocale, { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span>{order.items?.length || 0} {(order.items?.length || 0) !== 1 ? o.items : o.item}</span>
                  <span className="font-medium text-oryn-black/70">&euro;{order.total?.toFixed(2)}</span>
                </div>
                <button
                  onClick={(e) => handleReorder(e, order)}
                  className={`px-3 py-1.5 text-[9px] font-mono tracking-[0.1em] transition-colors ${
                    reordered === order.id
                      ? "bg-green-100 text-green-700"
                      : "bg-oryn-orange/10 text-oryn-orange hover:bg-oryn-orange hover:text-white"
                  }`}
                >
                  {reordered === order.id ? o.addedToCart : o.reorder}
                </button>
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
                            {(statusLabels[step] || step).toUpperCase()}
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
