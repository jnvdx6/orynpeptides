'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { adminGet, adminPut, adminDelete } from '@/lib/admin-fetch';
import type { Order, OrderStatus, PaymentStatus } from '@/types';

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-amber-50 text-amber-700',
  processing: 'bg-blue-50 text-blue-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
};

const paymentStatusColors: Record<PaymentStatus, string> = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-emerald-50 text-emerald-700',
  failed: 'bg-red-50 text-red-700',
  expired: 'bg-gray-100 text-gray-600',
};

const statusOptions: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | OrderStatus>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.set('status', filterStatus);
      if (search.trim()) params.set('search', search.trim());
      const qs = params.toString();
      const data = await adminGet<{ orders: Order[] }>(
        `/api/admin/orders${qs ? `?${qs}` : ''}`
      );
      setOrders(data.orders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, search]);

  useEffect(() => {
    const timeout = setTimeout(fetchOrders, 300);
    return () => clearTimeout(timeout);
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      await adminPut('/api/admin/orders', { orderId, status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (orderId: string) => {
    setDeletingId(orderId);
    try {
      await adminDelete(`/api/admin/orders?id=${orderId}`);
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      if (expandedId === orderId) setExpandedId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete order');
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  // --- Loading state ---
  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-gray-400 text-sm">Loading orders...</span>
        </div>
      </div>
    );
  }

  // --- Error state ---
  if (error && orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-red-500 text-sm">{error}</div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Filter bar */}
      <div className="px-5 py-4 border-b border-gray-200 flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ref or customer..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange transition-colors"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | OrderStatus)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange cursor-pointer"
        >
          <option value="all">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-gray-100 text-gray-600 rounded-full font-medium">
            {orders.length}
          </span>
          order{orders.length !== 1 ? 's' : ''}
        </span>
        {loading && (
          <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
      </div>

      {/* Error banner (non-blocking) */}
      {error && orders.length > 0 && (
        <div className="px-5 py-3 bg-red-50 border-b border-red-100 flex items-center justify-between">
          <span className="text-sm text-red-600">{error}</span>
          <button onClick={fetchOrders} className="text-sm text-red-700 font-medium hover:underline">
            Retry
          </button>
        </div>
      )}

      {/* Orders table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order Ref</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="w-20 px-3 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <Fragment key={order.id}>
                <tr
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                >
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-900">{order.ref}</td>
                  <td className="px-5 py-3.5 text-gray-900">
                    {order.shipping.firstName} {order.shipping.lastName}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-gray-900">EUR {order.total.toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.paymentMethod === 'crypto'
                          ? 'bg-orange-50 text-orange-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {order.paymentMethod === 'crypto'
                        ? order.cryptoPayment?.currency ?? 'Crypto'
                        : 'Card'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                        paymentStatusColors[order.paymentStatus] ?? ''
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                      className={`rounded-full px-2 py-0.5 text-xs font-medium border-0 cursor-pointer appearance-none pr-5 focus:outline-none focus:ring-2 focus:ring-oryn-orange/20 disabled:opacity-50 ${
                        statusColors[order.status] ?? ''
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 4px center',
                      }}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{formatDate(order.createdAt)}</td>
                  <td className="px-3 py-3.5 flex items-center gap-1">
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(order.id);
                      }}
                      disabled={deletingId === order.id}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      title="Delete order"
                    >
                      {deletingId === order.id ? (
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                    {/* Expand chevron */}
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === order.id ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </td>
                </tr>

                {/* Expanded detail row */}
                {expandedId === order.id && (
                  <tr className="border-t border-gray-100">
                    <td colSpan={9} className="px-5 py-5 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Items */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2.5">Items</h4>
                          <div className="space-y-1.5">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-gray-900">
                                  {item.productName} x{item.quantity}
                                </span>
                                <span className="font-mono text-gray-900">
                                  EUR {(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                            <div className="space-y-1 pt-1.5 border-t border-gray-200 text-sm">
                              <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span className="font-mono">EUR {order.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span className="font-mono">EUR {order.shippingCost.toFixed(2)}</span>
                              </div>
                              {order.discount > 0 && (
                                <div className="flex justify-between text-emerald-600">
                                  <span>Discount</span>
                                  <span className="font-mono">-EUR {order.discount.toFixed(2)}</span>
                                </div>
                              )}
                              <div className="flex justify-between font-medium text-gray-900 pt-1 border-t border-gray-200">
                                <span>Total</span>
                                <span className="font-mono">EUR {order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Customer */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2.5">Customer</h4>
                          <p className="text-sm text-gray-900">
                            {order.shipping.firstName} {order.shipping.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{order.shipping.email}</p>
                          {order.shipping.phone && (
                            <p className="text-sm text-gray-500">{order.shipping.phone}</p>
                          )}
                        </div>

                        {/* Shipping */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2.5">Shipping Address</h4>
                          <p className="text-sm text-gray-700">{order.shipping.address}</p>
                          <p className="text-sm text-gray-700">
                            {order.shipping.postalCode} {order.shipping.city}
                          </p>
                          <p className="text-sm text-gray-700">{order.shipping.country}</p>
                        </div>

                        {/* Meta */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2.5">Details</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Order ID</span>
                              <span className="text-gray-900 font-mono text-xs">{order.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">User ID</span>
                              <span className="text-gray-900 font-mono text-xs truncate max-w-[120px]">{order.userId}</span>
                            </div>
                            {order.referralCode && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Referral</span>
                                <span className="text-gray-900 font-mono text-xs">{order.referralCode}</span>
                              </div>
                            )}
                            {order.cryptoPayment && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Crypto Amount</span>
                                  <span className="text-gray-900 font-mono text-xs">
                                    {order.cryptoPayment.amount} {order.cryptoPayment.currency}
                                  </span>
                                </div>
                                {order.cryptoPayment.txHash && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Tx Hash</span>
                                    <span className="text-gray-900 font-mono text-xs truncate max-w-[120px]" title={order.cryptoPayment.txHash}>
                                      {order.cryptoPayment.txHash}
                                    </span>
                                  </div>
                                )}
                              </>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-500">Commissions</span>
                              <span className={`text-xs font-medium ${order.commissionsGenerated ? 'text-emerald-600' : 'text-gray-400'}`}>
                                {order.commissionsGenerated ? 'Generated' : 'None'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Updated</span>
                              <span className="text-gray-900 text-xs">{formatDate(order.updatedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {!loading && orders.length === 0 && (
        <div className="px-5 py-16 text-center">
          <svg className="mx-auto h-10 w-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-gray-400 text-sm">No orders found matching your filters.</p>
          <button
            onClick={() => {
              setSearch('');
              setFilterStatus('all');
            }}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 max-w-sm w-full mx-4">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Delete Order</h3>
            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete order{' '}
              <span className="font-mono font-medium text-gray-900">
                {orders.find((o) => o.id === confirmDeleteId)?.ref}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteOrder(confirmDeleteId)}
                disabled={deletingId === confirmDeleteId}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deletingId === confirmDeleteId && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
