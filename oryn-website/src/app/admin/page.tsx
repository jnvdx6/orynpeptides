'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { adminGet } from '@/lib/admin-fetch';
import type { DashboardStats, Order, ActivityLog } from '@/types';

interface ActivityResponse {
  logs: ActivityLog[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700',
  processing: 'bg-blue-50 text-blue-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
};

const activityDotColors: Record<string, string> = {
  order: 'bg-blue-400',
  user: 'bg-amber-400',
  product: 'bg-purple-400',
  commission: 'bg-emerald-400',
  payment: 'bg-oryn-orange',
  settings: 'bg-gray-400',
};

function formatCurrency(value: number): string {
  return `EUR ${value.toLocaleString('en-IE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr${diffHr > 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHr / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatChartDay(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'short' });
}

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashboardData, activityData] = await Promise.all([
        adminGet<DashboardStats>('/api/admin/dashboard'),
        adminGet<ActivityResponse>('/api/admin/activity?limit=10'),
      ]);
      setDashboard(dashboardData);
      setActivity(activityData.logs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-8 w-8 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-sm text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-3">{error || 'Something went wrong'}</p>
          <button
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const maxChartValue = Math.max(...dashboard.revenueByDay.map((d) => d.amount), 1);

  const statCards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(dashboard.totalRevenue),
    },
    {
      label: 'Total Orders',
      value: dashboard.totalOrders.toString(),
    },
    {
      label: 'Total Users',
      value: dashboard.totalUsers.toString(),
    },
    {
      label: 'Pending Commissions',
      value: dashboard.pendingCommissions.toString(),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {card.label}
            </p>
            <div className="mt-2">
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-900">Revenue (Last 7 Days)</h2>
          </div>
          <div className="p-6">
            {dashboard.revenueByDay.length > 0 ? (
              <div className="flex items-end gap-3 h-48">
                {dashboard.revenueByDay.map((item) => (
                  <div key={item.date} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {item.amount >= 1000
                        ? `EUR ${(item.amount / 1000).toFixed(1)}k`
                        : formatCurrency(item.amount)}
                    </span>
                    <div className="w-full relative">
                      <div
                        className="w-full bg-oryn-orange rounded-t hover:opacity-80 transition-opacity min-h-[4px]"
                        style={{
                          height: `${(item.amount / maxChartValue) * 140}px`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{formatChartDay(item.date)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-sm text-gray-400">
                No revenue data available
              </div>
            )}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-900">Top Products</h2>
          </div>
          <div className="p-6 space-y-4">
            {dashboard.topProducts.length > 0 ? (
              dashboard.topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-400 w-5">{i + 1}.</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(product.revenue)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No product data available</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-xs font-medium text-oryn-orange hover:text-oryn-orange-dark transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            {dashboard.recentOrders.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ref
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.recentOrders.map((order: Order) => (
                    <tr
                      key={order.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3 text-sm font-medium text-gray-900">{order.ref}</td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {order.shipping.firstName} {order.shipping.lastName}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                            statusColors[order.status] || 'bg-gray-50 text-gray-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center py-8 text-sm text-gray-400">
                No orders yet
              </div>
            )}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            {activity.length > 0 ? (
              <div className="space-y-5">
                {activity.map((item, i) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 ${
                          activityDotColors[item.type] || 'bg-gray-400'
                        }`}
                      />
                      {i < activity.length - 1 && (
                        <div className="w-px flex-1 bg-gray-100 mt-1" />
                      )}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatRelativeTime(item.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
