"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { adminGet } from "@/lib/admin-fetch";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ---------------------------------------------------------------------------
// Types (inline, no @/types import)
// ---------------------------------------------------------------------------

interface OverviewData {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  totalPayments: number;
  avgOrderValue: number;
  revenueByDay: { date: string; amount: number }[];
  ordersByDay: { date: string; count: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
  ordersByStatus: Record<string, number>;
  ordersByCountry: Record<string, number>;
  recentOrders: Array<{
    id: string;
    display_id: number;
    status: string;
    email: string;
    total: number;
    currency_code: string;
    created_at: string;
    items: Array<{ title: string; quantity: number }>;
  }>;
  recentCustomers: Array<{
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
  }>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BRAND_ORANGE = "#FF6A1A";
const PIE_COLORS = ["#FF6A1A", "#1A1A1A", "#FF9A5C", "#333333", "#FFBD8E", "#666666", "#FFD4B2", "#999999"];
const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  completed: "#10b981",
  canceled: "#ef4444",
  archived: "#6b7280",
  requires_action: "#3b82f6",
  not_fulfilled: "#8b5cf6",
  fulfilled: "#10b981",
  partially_fulfilled: "#06b6d4",
  partially_shipped: "#06b6d4",
  shipped: "#8b5cf6",
};
const STATUS_BG: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  completed: "bg-emerald-50 text-emerald-700",
  canceled: "bg-red-50 text-red-700",
  archived: "bg-gray-50 text-gray-600",
  requires_action: "bg-blue-50 text-blue-700",
  not_fulfilled: "bg-violet-50 text-violet-700",
  fulfilled: "bg-emerald-50 text-emerald-700",
  partially_fulfilled: "bg-cyan-50 text-cyan-700",
  shipped: "bg-purple-50 text-purple-700",
};

const AUTO_REFRESH_MS = 60_000; // 1 minute

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmtCurrency(v: number, currency = "EUR") {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(v);
}

function fmtShortDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function fmtRelative(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function KpiCard({ label, value, sub, icon }: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{label}</p>
          <p className="text-2xl font-bold font-mono text-gray-900 mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        <div className="p-2 rounded-lg bg-orange-50 text-[#FF6A1A]">{icon}</div>
      </div>
    </div>
  );
}

function LiveIndicator({ lastRefresh, onRefresh, refreshing }: {
  lastRefresh: Date | null;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[10px] font-mono font-semibold text-emerald-700 tracking-wider">LIVE FROM MEDUSA</span>
      </div>
      {lastRefresh && (
        <span className="text-[10px] font-mono text-gray-400">
          Updated {fmtRelative(lastRefresh.toISOString())}
        </span>
      )}
      <button
        onClick={onRefresh}
        disabled={refreshing}
        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
        title="Refresh data"
      >
        <svg
          className={`w-3.5 h-3.5 text-gray-500 ${refreshing ? "animate-spin" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminDashboardPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<"7d" | "30d">("7d");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);
    try {
      const overview = await adminGet<OverviewData>("/api/admin/medusa?resource=overview");
      setData(overview);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(() => fetchData(true), AUTO_REFRESH_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData]);

  // ---- Loading state ----
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-[#FF6A1A] mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-gray-400 font-mono">CONNECTING TO MEDUSA...</p>
        </div>
      </div>
    );
  }

  // ---- Error state ----
  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">Could not load dashboard</p>
          <p className="text-xs text-gray-500 mb-4">{error || "Something went wrong"}</p>
          <button
            onClick={() => fetchData()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ---- Derived data ----
  const revenueData = period === "7d" ? data.revenueByDay.slice(-7) : data.revenueByDay;
  const ordersData = period === "7d" ? data.ordersByDay.slice(-7) : data.ordersByDay;

  const chartData = revenueData.map((r, i) => ({
    date: fmtShortDate(r.date),
    revenue: r.amount,
    orders: ordersData[i]?.count || 0,
  }));

  const statusData = Object.entries(data.ordersByStatus).map(([name, value]) => ({ name, value }));
  const totalStatusOrders = statusData.reduce((s, d) => s + d.value, 0);

  // ---- Render ----
  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <LiveIndicator lastRefresh={lastRefresh} onRefresh={() => fetchData(true)} refreshing={refreshing} />
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden ml-2">
            <button
              onClick={() => setPeriod("7d")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                period === "7d" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setPeriod("30d")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                period === "30d" ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              30 Days
            </button>
          </div>
        </div>
      </div>

      {/* ===== KPI Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Revenue"
          value={fmtCurrency(data.totalRevenue)}
          sub={`${data.totalPayments} payments processed`}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <KpiCard
          label="Total Orders"
          value={data.totalOrders.toLocaleString()}
          sub={`${data.totalProducts} products in catalog`}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          }
        />
        <KpiCard
          label="Customers"
          value={data.totalCustomers.toLocaleString()}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <KpiCard
          label="Avg Order Value"
          value={fmtCurrency(data.avgOrderValue)}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          }
        />
      </div>

      {/* ===== Revenue Chart ===== */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Revenue Overview</h2>
            <p className="text-[10px] font-mono text-gray-400 mt-0.5">
              LAST {period === "7d" ? "7" : "30"} DAYS
            </p>
          </div>
          <Link
            href="/admin/analytics"
            className="text-xs font-medium text-[#FF6A1A] hover:underline transition-colors"
          >
            Full analytics
          </Link>
        </div>
        <div className="p-6">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="dashGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_ORANGE} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={BRAND_ORANGE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#999", fontFamily: "monospace" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#999", fontFamily: "monospace" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                />
                <Tooltip
                  contentStyle={{
                    border: "1px solid #e5e5e5",
                    borderRadius: 8,
                    fontSize: 12,
                    fontFamily: "monospace",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                  }}
                  formatter={(value: unknown) => [fmtCurrency(Number(value)), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={BRAND_ORANGE}
                  strokeWidth={2.5}
                  fill="url(#dashGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-sm text-gray-400">
              No revenue data available for this period
            </div>
          )}
        </div>
      </div>

      {/* ===== Middle row: Recent Orders + Order Status ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5">LATEST FROM MEDUSA</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-medium text-[#FF6A1A] hover:underline transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            {data.recentOrders.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="text-left px-6 py-3 text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="text-left px-6 py-3 text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="text-left px-6 py-3 text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="text-left px-6 py-3 text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-3 text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="text-right px-6 py-3 text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs font-semibold text-gray-900">
                        #{order.display_id}
                      </td>
                      <td className="px-6 py-3 text-gray-600 text-xs truncate max-w-[180px]">
                        {order.email}
                      </td>
                      <td className="px-6 py-3 text-gray-500 text-xs truncate max-w-[200px]">
                        {order.items.map((it) => `${it.quantity}x ${it.title}`).join(", ")}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                            STATUS_BG[order.status] || "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {order.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right font-mono text-xs font-semibold text-gray-900">
                        {fmtCurrency(order.total, order.currency_code.toUpperCase())}
                      </td>
                      <td className="px-6 py-3 text-right text-xs text-gray-400 font-mono">
                        {fmtRelative(order.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center py-12 text-sm text-gray-400">
                No orders yet
              </div>
            )}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Order Status</h2>
            <p className="text-[10px] font-mono text-gray-400 mt-0.5">DISTRIBUTION</p>
          </div>
          <div className="p-6">
            {statusData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      dataKey="value"
                      paddingAngle={2}
                      stroke="none"
                    >
                      {statusData.map((entry, i) => (
                        <Cell
                          key={entry.name}
                          fill={STATUS_COLORS[entry.name] || PIE_COLORS[i % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        fontSize: 12,
                        fontFamily: "monospace",
                        border: "1px solid #e5e5e5",
                        borderRadius: 8,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-2">
                  {statusData.map((s) => {
                    const pct = totalStatusOrders > 0 ? Math.round((s.value / totalStatusOrders) * 100) : 0;
                    return (
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: STATUS_COLORS[s.name] || "#999" }}
                          />
                          <span className="text-gray-600 capitalize">{s.name.replace(/_/g, " ")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-gray-900 font-medium">{s.value}</span>
                          <span className="font-mono text-gray-400 w-8 text-right">{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-12 text-sm text-gray-400">
                No orders yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Bottom row: Top Products + Recent Customers ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Top Products</h2>
            <p className="text-[10px] font-mono text-gray-400 mt-0.5">BY REVENUE</p>
          </div>
          <div className="p-6">
            {data.topProducts.length > 0 ? (
              <div className="space-y-4">
                {data.topProducts.map((product, i) => {
                  const maxRev = data.topProducts[0]?.revenue || 1;
                  const barWidth = Math.max((product.revenue / maxRev) * 100, 4);
                  return (
                    <div key={product.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center text-[10px] font-bold font-mono text-gray-500 shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium text-gray-900 truncate">{product.name}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-3">
                          <span className="text-[10px] font-mono text-gray-400">{product.sales} sold</span>
                          <span className="text-sm font-bold font-mono text-gray-900">
                            {fmtCurrency(product.revenue)}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: BRAND_ORANGE,
                            opacity: 1 - i * 0.15,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12 text-sm text-gray-400">
                No product data available
              </div>
            )}
          </div>
        </div>

        {/* Recent Customers */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Recent Customers</h2>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5">NEW SIGNUPS</p>
            </div>
            <Link
              href="/admin/users"
              className="text-xs font-medium text-[#FF6A1A] hover:underline transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="p-6">
            {data.recentCustomers.length > 0 ? (
              <div className="space-y-3">
                {data.recentCustomers.slice(0, 6).map((c) => {
                  const name = [c.first_name, c.last_name].filter(Boolean).join(" ") || null;
                  const initial = (c.first_name?.[0] || c.email[0]).toUpperCase();
                  return (
                    <div key={c.id} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-orange-50 text-[#FF6A1A] flex items-center justify-center text-xs font-bold shrink-0">
                        {initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {name || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{c.email}</p>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 shrink-0">
                        {fmtRelative(c.created_at)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12 text-sm text-gray-400">
                No customers yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
