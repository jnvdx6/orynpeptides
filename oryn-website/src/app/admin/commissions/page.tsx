'use client';

import { useEffect, useState, useCallback } from 'react';
import { adminGet, adminPut, adminPost } from '@/lib/admin-fetch';

interface Commission {
  id: string;
  orderId: string;
  orderRef: string;
  beneficiaryId: string;
  sourceUserId: string;
  level: number;
  percentage: number;
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  createdAt: string;
  paidAt?: string;
  selected?: boolean;
}

interface User {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-emerald-50 text-emerald-700',
  paid: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-red-50 text-red-700',
};

function getUserName(user: User | undefined): string {
  if (!user) return 'Unknown';
  if (user.name) return user.name;
  if (user.first_name || user.last_name) return `${user.first_name || ''} ${user.last_name || ''}`.trim();
  return user.email || 'Unknown';
}

export default function AdminCommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [userMap, setUserMap] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const fetchCommissions = useCallback(async () => {
    try {
      const queryParam = filterStatus !== 'all' ? `?status=${filterStatus}` : '';
      const [commData, userData] = await Promise.all([
        adminGet<{ commissions: Commission[] }>(`/api/admin/commissions${queryParam}`),
        adminGet<{ users: User[] }>('/api/admin/users'),
      ]);

      const map: Record<string, User> = {};
      for (const u of userData.users || []) {
        map[u.id] = u;
      }
      setUserMap(map);
      setCommissions((commData.commissions || []).map((c) => ({ ...c, selected: false })));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load commissions');
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    setLoading(true);
    fetchCommissions();
  }, [fetchCommissions]);

  const toggleSelect = (id: string) => {
    setCommissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  const getFiltered = useCallback(() => {
    return commissions.filter((c) => {
      const matchStatus = filterStatus === 'all' || c.status === filterStatus;
      const matchLevel = filterLevel === 'all' || c.level === parseInt(filterLevel);
      return matchStatus && matchLevel;
    });
  }, [commissions, filterStatus, filterLevel]);

  const toggleSelectAll = () => {
    const filtered = getFiltered();
    const allSelected = filtered.length > 0 && filtered.every((c) => c.selected);
    const filteredIds = new Set(filtered.map((c) => c.id));
    setCommissions((prev) =>
      prev.map((c) => (filteredIds.has(c.id) ? { ...c, selected: !allSelected } : c))
    );
  };

  const updateStatus = async (id: string, status: Commission['status']) => {
    setActionLoading(id);
    try {
      await adminPut('/api/admin/commissions', { commissionId: id, status });
      setCommissions((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status, selected: false } : c))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update commission');
    } finally {
      setActionLoading(null);
    }
  };

  const bulkUpdate = async (status: Commission['status']) => {
    const selectedPending = commissions.filter((c) => c.selected && c.status === 'pending');
    if (selectedPending.length === 0) return;

    const ids = selectedPending.map((c) => c.id);
    setActionLoading('bulk');
    try {
      await adminPost('/api/admin/commissions', { commissionIds: ids, status });
      setCommissions((prev) =>
        prev.map((c) =>
          ids.includes(c.id) ? { ...c, status, selected: false } : c
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update commissions');
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = getFiltered();
  const selectedCount = filtered.filter((c) => c.selected).length;

  const totalPending = commissions.filter((c) => c.status === 'pending').reduce((s, c) => s + c.amount, 0);
  const totalApproved = commissions.filter((c) => c.status === 'approved').reduce((s, c) => s + c.amount, 0);
  const totalPaid = commissions.filter((c) => c.status === 'paid').reduce((s, c) => s + c.amount, 0);
  const totalAll = commissions.reduce((s, c) => s + c.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm animate-pulse">Loading commissions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={() => { setError(null); setLoading(true); fetchCommissions(); }}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Commissions</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">EUR {totalAll.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">EUR {totalPending.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">EUR {totalApproved.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">EUR {totalPaid.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters and bulk actions */}
      <div className="bg-white rounded-xl px-4 py-3 border border-gray-200 flex flex-wrap gap-3 items-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none bg-white text-gray-700"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none bg-white text-gray-700"
        >
          <option value="all">All Levels</option>
          {[1, 2, 3, 4, 5].map((l) => (
            <option key={l} value={l}>Level {l}</option>
          ))}
        </select>
        <div className="flex-1" />
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">{selectedCount} selected</span>
            <button
              onClick={() => bulkUpdate('approved')}
              disabled={actionLoading === 'bulk'}
              className="px-3 py-1.5 bg-oryn-orange text-white text-sm font-medium rounded-lg hover:bg-oryn-orange-dark transition-colors disabled:opacity-50"
            >
              {actionLoading === 'bulk' ? 'Updating...' : 'Approve'}
            </button>
            <button
              onClick={() => bulkUpdate('cancelled')}
              disabled={actionLoading === 'bulk'}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {actionLoading === 'bulk' ? 'Updating...' : 'Reject'}
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={filtered.length > 0 && filtered.every((c) => c.selected)}
                    className="rounded border-gray-300 accent-oryn-orange"
                  />
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order Ref</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Beneficiary</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={c.selected || false}
                      onChange={() => toggleSelect(c.id)}
                      className="rounded border-gray-300 accent-oryn-orange"
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{c.id}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">{c.orderRef}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {getUserName(userMap[c.beneficiaryId])}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {getUserName(userMap[c.sourceUserId])}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600">
                      L{c.level}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-gray-600">{c.percentage}%</td>
                  <td className="px-4 py-3 font-mono text-sm font-medium text-gray-900">EUR {c.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {c.status === 'pending' && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateStatus(c.id, 'approved')}
                          disabled={actionLoading === c.id}
                          className="text-xs px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors font-medium disabled:opacity-50"
                        >
                          {actionLoading === c.id ? '...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => updateStatus(c.id, 'cancelled')}
                          disabled={actionLoading === c.id}
                          className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium disabled:opacity-50"
                        >
                          {actionLoading === c.id ? '...' : 'Reject'}
                        </button>
                      </div>
                    )}
                    {c.status === 'approved' && (
                      <button
                        onClick={() => updateStatus(c.id, 'paid')}
                        disabled={actionLoading === c.id}
                        className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-medium disabled:opacity-50"
                      >
                        {actionLoading === c.id ? '...' : 'Mark Paid'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-400">No commissions found matching your filters.</div>
        )}
      </div>
    </div>
  );
}
