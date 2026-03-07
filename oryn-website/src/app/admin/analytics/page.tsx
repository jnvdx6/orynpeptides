"use client";

import { useEffect, useState, useCallback } from "react";
import { adminGet } from "@/lib/admin-fetch";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

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

const COLORS = ["#FF6A1A", "#1A1A1A", "#FF9A5C", "#333333", "#FFBD8E", "#666666", "#FFD4B2", "#999999"];
const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  completed: "#10b981",
  canceled: "#ef4444",
  archived: "#6b7280",
  requires_action: "#3b82f6",
  not_fulfilled: "#8b5cf6",
  fulfilled: "#10b981",
  partially_fulfilled: "#06b6d4",
};

function formatCurrency(v: number, currency = "EUR") {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(v);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function formatShortDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function StatCard({ label, value, sub, icon, color = "text-oryn-orange" }: {
  label: string; value: string; sub?: string; icon: React.ReactNode; color?: string;
}) {
  return (
    <div className="bg-white border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 bg-gray-50 ${color}`}>{icon}</div>
      </div>
      <p className="text-[10px] font-mono text-gray-400 tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState<"7d" | "30d">("30d");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const overview = await adminGet<OverviewData>("/api/admin/medusa?resource=overview");
      setData(overview);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-oryn-orange mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-gray-400 font-mono">LOADING ANALYTICS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-600 font-medium mb-2">Failed to load analytics</p>
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={fetchData} className="mt-4 px-4 py-2 bg-red-600 text-white text-sm hover:bg-red-700 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const revenueData = period === "7d" ? data.revenueByDay.slice(-7) : data.revenueByDay;
  const ordersData = period === "7d" ? data.ordersByDay.slice(-7) : data.ordersByDay;

  // Merge revenue and orders data for combined chart
  const combinedData = revenueData.map((r, i) => ({
    date: formatShortDate(r.date),
    revenue: r.amount,
    orders: ordersData[i]?.count || 0,
  }));

  const statusData = Object.entries(data.ordersByStatus).map(([name, value]) => ({ name, value }));
  const countryData = Object.entries(data.ordersByCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-400 font-mono mt-1">REAL-TIME MEDUSA BACKEND DATA</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPeriod("7d")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              period === "7d" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setPeriod("30d")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              period === "30d" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            30 Days
          </button>
          <button
            onClick={fetchData}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 transition-colors ml-2"
            title="Refresh data"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="TOTAL REVENUE"
          value={formatCurrency(data.totalRevenue)}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          label="TOTAL ORDERS"
          value={data.totalOrders.toString()}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>}
        />
        <StatCard
          label="CUSTOMERS"
          value={data.totalCustomers.toString()}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
        />
        <StatCard
          label="AVG. ORDER VALUE"
          value={formatCurrency(data.avgOrderValue)}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>}
        />
        <StatCard
          label="PRODUCTS"
          value={data.totalProducts.toString()}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
        />
        <StatCard
          label="PAYMENTS"
          value={data.totalPayments.toString()}
          icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>}
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Revenue & Orders</h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">LAST {period === "7d" ? "7" : "30"} DAYS</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={combinedData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6A1A" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#FF6A1A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${v}`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ border: "1px solid #e5e5e5", borderRadius: 0, fontSize: 12, fontFamily: "monospace" }}
              formatter={(value: unknown, name: unknown) => [
                name === "revenue" ? formatCurrency(Number(value)) : value,
                name === "revenue" ? "Revenue" : "Orders",
              ] as [React.ReactNode, string]}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#FF6A1A" strokeWidth={2} fill="url(#colorRevenue)" name="Revenue" />
            <Area yAxisId="right" type="monotone" dataKey="orders" stroke="#1A1A1A" strokeWidth={1.5} fill="transparent" strokeDasharray="4 2" name="Orders" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Second row: Top Products + Order Status + Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="bg-white border border-gray-100 p-6 lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Top Products</h2>
          <p className="text-xs text-gray-400 font-mono mb-4">BY REVENUE</p>
          {data.topProducts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No sales data yet</p>
          ) : (
            <div className="space-y-3">
              {data.topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-400">{p.sales} sold</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 shrink-0">{formatCurrency(p.revenue)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Order Status</h2>
          <p className="text-xs text-gray-400 font-mono mb-4">DISTRIBUTION</p>
          {statusData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No orders yet</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                    {statusData.map((entry, i) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12, fontFamily: "monospace", border: "1px solid #e5e5e5", borderRadius: 0 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {statusData.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5" style={{ backgroundColor: STATUS_COLORS[s.name] || "#999" }} />
                    <span className="text-[10px] font-mono text-gray-500">{s.name} ({s.value})</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Countries */}
        <div className="bg-white border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Orders by Country</h2>
          <p className="text-xs text-gray-400 font-mono mb-4">TOP MARKETS</p>
          {countryData.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No geographic data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={countryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#999" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip contentStyle={{ fontSize: 12, fontFamily: "monospace", border: "1px solid #e5e5e5", borderRadius: 0 }} />
                <Bar dataKey="value" fill="#FF6A1A" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Recent Orders</h2>
        <p className="text-xs text-gray-400 font-mono mb-4">FROM MEDUSA BACKEND</p>
        {data.recentOrders.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No orders yet — complete a test purchase to see data here</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-[10px] font-mono text-gray-400 tracking-wider">ORDER</th>
                  <th className="text-left py-2 px-3 text-[10px] font-mono text-gray-400 tracking-wider">CUSTOMER</th>
                  <th className="text-left py-2 px-3 text-[10px] font-mono text-gray-400 tracking-wider">ITEMS</th>
                  <th className="text-left py-2 px-3 text-[10px] font-mono text-gray-400 tracking-wider">STATUS</th>
                  <th className="text-right py-2 px-3 text-[10px] font-mono text-gray-400 tracking-wider">TOTAL</th>
                  <th className="text-right py-2 px-3 text-[10px] font-mono text-gray-400 tracking-wider">DATE</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-3 px-3 font-mono text-xs">#{order.display_id}</td>
                    <td className="py-3 px-3 text-gray-600">{order.email}</td>
                    <td className="py-3 px-3 text-gray-500 text-xs">
                      {order.items.map((i) => `${i.quantity}x ${i.title}`).join(", ")}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider"
                        style={{
                          backgroundColor: (STATUS_COLORS[order.status] || "#999") + "15",
                          color: STATUS_COLORS[order.status] || "#999",
                        }}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-medium">
                      {formatCurrency(order.total, order.currency_code.toUpperCase())}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-400 text-xs">
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Customers */}
      <div className="bg-white border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Recent Customers</h2>
        <p className="text-xs text-gray-400 font-mono mb-4">MEDUSA CUSTOMER ACCOUNTS</p>
        {data.recentCustomers.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No customers yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {data.recentCustomers.map((c) => (
              <div key={c.id} className="p-3 bg-gray-50 border border-gray-100">
                <div className="w-8 h-8 bg-oryn-orange/10 text-oryn-orange flex items-center justify-center text-xs font-bold mb-2">
                  {(c.first_name?.[0] || c.email[0]).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {c.first_name || c.last_name ? `${c.first_name} ${c.last_name}`.trim() : "—"}
                </p>
                <p className="text-xs text-gray-400 truncate">{c.email}</p>
                <p className="text-[10px] text-gray-300 font-mono mt-1">{formatDate(c.created_at)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
