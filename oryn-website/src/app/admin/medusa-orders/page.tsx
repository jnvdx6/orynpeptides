"use client";

import { useEffect, useState, useCallback } from "react";

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface Order {
  id: string;
  display_id: number;
  status: string;
  email: string;
  total: number;
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  currency_code: string;
  items: OrderItem[];
  shipping_address?: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postal_code: string;
    country_code: string;
  };
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  archived: "bg-gray-100 text-gray-600",
  canceled: "bg-red-100 text-red-800",
  requires_action: "bg-orange-100 text-orange-800",
};

function formatPrice(amount: number, currency = "eur") {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MedusaOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const limit = 20;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("oryn_admin_token");
      const res = await fetch(
        `/api/admin/medusa?resource=orders&limit=${limit}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOrders(data.orders || []);
      setCount(data.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Medusa Order History</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {count} total orders from Medusa backend
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          Refresh
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Order</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Items</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    <svg className="w-5 h-5 animate-spin mx-auto mb-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono font-medium text-gray-900">
                        #{order.display_id}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-900">{order.email}</div>
                      {order.shipping_address && (
                        <div className="text-xs text-gray-400">
                          {order.shipping_address.city}, {order.shipping_address.country_code?.toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {order.items?.length || 0} items
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-gray-900">
                      {formatPrice(order.total, order.currency_code)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500">
              Showing {offset + 1}-{Math.min(offset + limit, count)} of {count}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setOffset(Math.max(0, offset - limit))}
                disabled={offset === 0}
                className="px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-xs text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setOffset(offset + limit)}
                disabled={offset + limit >= count}
                className="px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Panel */}
      {selectedOrder && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              Order #{selectedOrder.display_id}
            </h3>
            <button
              onClick={() => setSelectedOrder(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</p>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedOrder.status] || "bg-gray-100 text-gray-600"}`}>
                {selectedOrder.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm text-gray-900">{selectedOrder.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Created</p>
              <p className="text-sm text-gray-900">{formatDate(selectedOrder.created_at)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Currency</p>
              <p className="text-sm text-gray-900 uppercase">{selectedOrder.currency_code}</p>
            </div>
          </div>

          {/* Shipping Address */}
          {selectedOrder.shipping_address && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Shipping Address</p>
              <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                <p>{selectedOrder.shipping_address.first_name} {selectedOrder.shipping_address.last_name}</p>
                <p>{selectedOrder.shipping_address.address_1}</p>
                <p>{selectedOrder.shipping_address.postal_code} {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.country_code?.toUpperCase()}</p>
              </div>
            </div>
          )}

          {/* Line Items */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Items</p>
            <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
              {selectedOrder.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400">
                      {formatPrice(item.unit_price, selectedOrder.currency_code)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-mono font-medium text-gray-900">
                    {formatPrice(item.total, selectedOrder.currency_code)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-mono">{formatPrice(selectedOrder.subtotal, selectedOrder.currency_code)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-mono">{formatPrice(selectedOrder.shipping_total, selectedOrder.currency_code)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax</span>
              <span className="font-mono">{formatPrice(selectedOrder.tax_total, selectedOrder.currency_code)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2">
              <span>Total</span>
              <span className="font-mono">{formatPrice(selectedOrder.total, selectedOrder.currency_code)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
