"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/providers/products";
import { Link } from "@/components/ui/LocaleLink";

interface OrderDetail {
  id: string;
  ref: string;
  status: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  discount: number;
  items: { name: string; quantity: number; price: number }[];
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

const statusSteps = ["pending", "processing", "shipped", "delivered"];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { token } = useAuth();
  const { addItem } = useCart();
  const { products } = useProducts();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [reordered, setReordered] = useState(false);

  useEffect(() => {
    if (!token || !orderId) return;
    fetch(`/api/orders?id=${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setOrder(data.order || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-oryn-orange border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white border border-oryn-grey/15 p-12 text-center">
        <h3 className="text-lg font-bold mb-2">Order not found</h3>
        <Link href="/account/orders" className="text-oryn-orange hover:underline text-sm">
          Back to orders
        </Link>
      </div>
    );
  }

  const currentStep = statusSteps.indexOf(order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/account/orders" className="text-[10px] text-oryn-black/40 font-plex hover:text-oryn-orange transition-colors">
            Orders
          </Link>
          <span className="text-oryn-orange text-[10px]">/</span>
          <span className="text-[10px] font-mono text-oryn-orange">{order.ref}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Order {order.ref}</h1>
            <p className="text-xs text-oryn-black/40 font-plex mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 border border-oryn-grey/20 text-[10px] font-mono tracking-[0.1em] text-oryn-black/40 hover:border-oryn-orange hover:text-oryn-orange transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
              </svg>
              PRINT
            </button>
            <div className={`px-3 py-1 text-[10px] font-mono tracking-[0.1em] uppercase ${
              order.status === "delivered" ? "bg-green-100 text-green-700" :
              order.status === "shipped" ? "bg-purple-100 text-purple-700" :
              order.status === "processing" ? "bg-blue-100 text-blue-700" :
              order.status === "cancelled" ? "bg-red-100 text-red-700" :
              "bg-yellow-100 text-yellow-700"
            }`}>
              {order.status}
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Progress */}
      {order.status !== "cancelled" && (
        <div className="bg-white border border-oryn-grey/15 p-6">
          <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-5">ORDER TRACKING</h3>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${
                    i <= currentStep ? "bg-oryn-orange text-white" : "bg-oryn-grey/20 text-oryn-black/30"
                  }`}>
                    {i <= currentStep ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    ) : (
                      String(i + 1)
                    )}
                  </div>
                  <span className={`text-[9px] font-mono tracking-[0.05em] mt-2 ${
                    i === currentStep ? "text-oryn-orange font-bold" : i <= currentStep ? "text-oryn-black/60" : "text-oryn-black/30"
                  }`}>
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`flex-1 h-px mx-3 ${i < currentStep ? "bg-oryn-orange" : "bg-oryn-grey/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Items */}
        <div className="bg-white border border-oryn-grey/15 p-6">
          <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">ORDER ITEMS</h3>
          <div className="divide-y divide-oryn-grey/10">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-[10px] text-oryn-black/40 font-plex">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold">&euro;{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-oryn-grey/10 space-y-2">
            <div className="flex justify-between text-xs text-oryn-black/50 font-plex">
              <span>Subtotal</span>
              <span>&euro;{order.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-oryn-black/50 font-plex">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? "FREE" : `\u20ac${order.shippingCost?.toFixed(2)}`}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xs text-green-600 font-plex">
                <span>Discount</span>
                <span>-&euro;{order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-oryn-grey/10">
              <span>Total</span>
              <span className="text-oryn-orange">&euro;{order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="space-y-6">
          <div className="bg-white border border-oryn-grey/15 p-6">
            <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">SHIPPING ADDRESS</h3>
            {order.shipping ? (
              <div className="text-xs text-oryn-black/60 font-plex space-y-1">
                <p className="font-medium text-oryn-black">{order.shipping.firstName} {order.shipping.lastName}</p>
                <p>{order.shipping.address}</p>
                <p>{order.shipping.city}, {order.shipping.postalCode}</p>
                <p>{order.shipping.country}</p>
              </div>
            ) : (
              <p className="text-xs text-oryn-black/40 font-plex">Shipping details not available</p>
            )}
          </div>

          <div className="bg-white border border-oryn-grey/15 p-6">
            <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">PAYMENT</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-oryn-black/40 font-plex">Method</span>
                <span className="text-xs font-medium capitalize">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-oryn-black/40 font-plex">Status</span>
                <span className={`text-xs font-medium capitalize ${
                  order.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"
                }`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reorder */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            let added = 0;
            for (const item of order.items || []) {
              const product = products.find((p) => p.name === item.name);
              if (product) {
                for (let i = 0; i < item.quantity; i++) addItem(product);
                added++;
              }
            }
            if (added > 0) {
              setReordered(true);
              setTimeout(() => setReordered(false), 3000);
            }
          }}
          className={`flex-1 py-3 text-xs font-medium tracking-[0.15em] transition-colors flex items-center justify-center gap-2 ${
            reordered
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-oryn-orange text-white hover:bg-oryn-orange-dark"
          }`}
        >
          {reordered ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              ADDED TO CART
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              REORDER ALL ITEMS
            </>
          )}
        </button>
      </div>

      {/* Help */}
      <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-5 flex items-start gap-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
          <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 className="text-xs font-bold mb-1">Need Help?</h4>
          <p className="text-[10px] text-oryn-black/50 font-plex">
            If you have questions about your order, contact us at{" "}
            <a href="mailto:info@orynpeptides.com" className="text-oryn-orange hover:underline">info@orynpeptides.com</a>{" "}
            with your order reference ({order.ref}).
          </p>
        </div>
      </div>
    </div>
  );
}
