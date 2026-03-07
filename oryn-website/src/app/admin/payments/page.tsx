'use client';

import { useEffect, useState } from 'react';
import { adminGet } from '@/lib/admin-fetch';

interface CryptoPayment {
  currency: string;
  walletAddress: string;
  amount: string;
  amountEur: number;
  txHash?: string;
  expiresAt?: string;
}

interface Order {
  id: string;
  display_id?: number;
  status: string;
  created_at: string;
  cryptoPayment?: CryptoPayment;
}

interface PaymentStats {
  totalOrders: number;
  totalConfirmed: number;
  totalPending: number;
  totalExpired: number;
  totalFailed: number;
  volumeByCurrency: Record<string, { count: number; volume: number }>;
}

interface PaymentsResponse {
  orders: Order[];
  stats: PaymentStats;
}

const currencyColors: Record<string, string> = {
  BTC: 'bg-amber-50 text-amber-700',
  ETH: 'bg-indigo-50 text-indigo-700',
  USDT: 'bg-emerald-50 text-emerald-700',
  SOL: 'bg-violet-50 text-violet-700',
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-emerald-50 text-emerald-700',
  expired: 'bg-gray-50 text-gray-500',
  failed: 'bg-red-50 text-red-700',
};

function getPaymentStatus(order: Order): string {
  const status = order.status?.toLowerCase() ?? '';
  if (status === 'confirmed' || status === 'completed' || status === 'paid') return 'confirmed';
  if (status === 'pending' || status === 'awaiting' || status === 'requires_action') return 'pending';
  if (status === 'expired') return 'expired';
  if (status === 'failed' || status === 'canceled' || status === 'cancelled') return 'failed';
  return status;
}

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const data = await adminGet<PaymentsResponse>('/api/admin/payments');
        setOrders(data.orders ?? []);
        setStats(data.stats ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load payments');
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm animate-pulse">Loading crypto payments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-sm text-red-700">
          {error}
        </div>
      </div>
    );
  }

  const cryptoOrders = orders.filter((o) => o.cryptoPayment);

  const totalVolume = stats
    ? Object.values(stats.volumeByCurrency).reduce((s, v) => s + v.volume, 0)
    : 0;

  const successRate =
    stats && stats.totalOrders > 0
      ? ((stats.totalConfirmed / stats.totalOrders) * 100).toFixed(0)
      : '0';

  const currencies = ['BTC', 'ETH', 'USDT', 'SOL'];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{stats?.totalOrders ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Confirmed</p>
          <p className="text-xl font-semibold text-emerald-700 mt-1">{stats?.totalConfirmed ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</p>
          <p className="text-xl font-semibold text-amber-700 mt-1">{stats?.totalPending ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{successRate}%</p>
        </div>
      </div>

      {/* Volume stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Volume</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">EUR {totalVolume.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Expired</p>
          <p className="text-xl font-semibold text-gray-500 mt-1">{stats?.totalExpired ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Failed</p>
          <p className="text-xl font-semibold text-red-700 mt-1">{stats?.totalFailed ?? 0}</p>
        </div>
      </div>

      {/* Revenue by currency */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Revenue by Cryptocurrency</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {currencies.map((cur) => {
            const data = stats?.volumeByCurrency[cur];
            return (
              <div key={cur} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium font-mono ${currencyColors[cur] ?? 'bg-gray-50 text-gray-600'}`}>
                    {cur}
                  </span>
                </div>
                <p className="text-xl font-semibold text-gray-900">EUR {(data?.volume ?? 0).toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-0.5">{data?.count ?? 0} confirmed payments</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Crypto)</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (EUR)</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">TX Hash</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {cryptoOrders.map((order) => {
                const cp = order.cryptoPayment!;
                const displayStatus = getPaymentStatus(order);
                const orderId = order.display_id ? `ORN-${order.display_id}` : order.id.slice(0, 12);
                return (
                  <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{orderId}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium font-mono ${currencyColors[cp.currency] ?? 'bg-gray-50 text-gray-600'}`}>
                        {cp.currency}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-gray-700">{cp.amount}</td>
                    <td className="px-4 py-3 font-mono text-sm font-medium text-gray-900">EUR {cp.amountEur}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[displayStatus] ?? 'bg-gray-50 text-gray-500'}`}>
                        {displayStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500 max-w-[120px] truncate" title={cp.walletAddress}>
                      {cp.walletAddress.slice(0, 8)}...{cp.walletAddress.slice(-6)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {cp.txHash ? (
                        <span className="text-gray-500 hover:text-oryn-orange cursor-pointer transition-colors" title={cp.txHash}>
                          {cp.txHash.slice(0, 12)}...
                        </span>
                      ) : (
                        <span className="text-gray-300">--</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {cryptoOrders.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-400">No crypto payments found.</div>
        )}
      </div>
    </div>
  );
}
