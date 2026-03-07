'use client';

import { useEffect, useState, useCallback, Fragment } from 'react';
import { adminGet, adminPut, adminDelete } from '@/lib/admin-fetch';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organization?: string;
  phone?: string;
  role: 'customer' | 'admin';
  referralCode: string;
  referredBy?: string;
  referralTree: string[];
  totalEarnings: number;
  availableBalance: number;
  createdAt: string;
  isActive: boolean;
}

function getInitials(firstName: string, lastName: string): string {
  return `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterActive, setFilterActive] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [roleChangingId, setRoleChangingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const currentAdminEmail =
    typeof window !== 'undefined' ? localStorage.getItem('oryn_admin_email') : null;

  const fetchUsers = useCallback(async () => {
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterRole !== 'all') params.set('role', filterRole);
      if (search.trim()) params.set('search', search.trim());
      if (filterActive !== 'all') params.set('active', filterActive);

      const qs = params.toString();
      const data = await adminGet<{ users: User[] }>(
        `/api/admin/users${qs ? `?${qs}` : ''}`
      );
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
      setUsers([]);
    }
  }, [filterRole, filterActive, search]);

  // Fetch all users once (unfiltered) to get total count
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await adminGet<{ users: User[] }>('/api/admin/users');
        if (!cancelled) setTotalCount(data.users.length);
      } catch {
        // ignore - total count is best-effort
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Fetch filtered users
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchUsers().finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [fetchUsers]);

  // Debounce search
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const toggleActive = async (user: User) => {
    setTogglingId(user.id);
    try {
      await adminPut('/api/admin/users', {
        userId: user.id,
        isActive: !user.isActive,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, isActive: !u.isActive } : u))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setTogglingId(null);
    }
  };

  const changeRole = async (user: User, newRole: 'customer' | 'admin') => {
    if (newRole === user.role) return;
    setRoleChangingId(user.id);
    try {
      await adminPut('/api/admin/users', {
        userId: user.id,
        role: newRole,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to change role');
    } finally {
      setRoleChangingId(null);
    }
  };

  const deleteUser = async (user: User) => {
    if (user.email === currentAdminEmail) {
      alert('You cannot delete your own account.');
      setConfirmDeleteId(null);
      return;
    }
    setDeletingId(user.id);
    try {
      await adminDelete(`/api/admin/users?id=${user.id}`);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setTotalCount((c) => Math.max(0, c - 1));
      setConfirmDeleteId(null);
      if (expandedId === user.id) setExpandedId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setDeletingId(null);
    }
  };

  // --- Loading state ---
  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <svg
            className="animate-spin h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span className="text-gray-400 text-sm">Loading users...</span>
        </div>
      </div>
    );
  }

  // --- Error state ---
  if (error && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="text-red-500 text-sm">{error}</div>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchUsers().finally(() => setLoading(false));
          }}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Filter bar */}
      <div className="border-b border-gray-200 p-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-1">
          <div className="flex-1 min-w-[220px] max-w-sm">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="all">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          <span className="text-xs text-gray-500">
            {users.length}{totalCount > 0 ? ` of ${totalCount}` : ''} users
          </span>
        </div>
      </div>

      {/* Users table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referral Code
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Earnings
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Fragment key={user.id}>
                <tr
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === user.id ? null : user.id)
                  }
                >
                  {/* Avatar + Name + Email */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">
                          {getInitials(user.firstName, user.lastName)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-oryn-orange/10 text-oryn-orange'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Referral code */}
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-gray-500">
                      {user.referralCode}
                    </span>
                  </td>

                  {/* Earnings */}
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-gray-900">
                      EUR {user.totalEarnings.toFixed(2)}
                    </span>
                  </td>

                  {/* Active toggle */}
                  <td className="px-4 py-3">
                    <button
                      disabled={togglingId === user.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActive(user);
                      }}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors disabled:opacity-50 ${
                        user.isActive ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
                          user.isActive
                            ? 'translate-x-[18px]'
                            : 'translate-x-[3px]'
                        }`}
                      />
                    </button>
                  </td>

                  {/* Joined */}
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </span>
                  </td>

                  {/* Expand chevron */}
                  <td className="px-4 py-3">
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedId === user.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </td>
                </tr>

                {/* Expanded detail row */}
                {expandedId === user.id && (
                  <tr className="border-t border-gray-100">
                    <td colSpan={7} className="px-4 py-4 bg-gray-50">
                      {/* Stat boxes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Referrals
                          </div>
                          <div className="font-mono text-sm text-gray-900">
                            {user.referralTree.length}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Total Earnings
                          </div>
                          <div className="font-mono text-sm text-oryn-orange">
                            EUR {user.totalEarnings.toFixed(2)}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Available Balance
                          </div>
                          <div className="font-mono text-sm text-gray-900">
                            EUR {user.availableBalance.toFixed(2)}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Referred By
                          </div>
                          <div className="text-sm text-gray-900">
                            {user.referredBy || 'None'}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                            Referral Tree
                          </div>
                          <a
                            href={`/admin/referrals?user=${user.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-oryn-orange hover:text-oryn-orange-dark underline transition-colors"
                          >
                            View network ({user.referralTree.length})
                          </a>
                        </div>
                      </div>

                      {/* Additional info + actions */}
                      <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-200">
                        {user.organization && (
                          <span className="text-xs text-gray-500">
                            Org: <span className="text-gray-700">{user.organization}</span>
                          </span>
                        )}
                        {user.phone && (
                          <span className="text-xs text-gray-500">
                            Phone: <span className="text-gray-700">{user.phone}</span>
                          </span>
                        )}

                        <div className="ml-auto flex items-center gap-3">
                          {/* Role change dropdown */}
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-gray-500">Role:</label>
                            <select
                              value={user.role}
                              disabled={roleChangingId === user.id}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                e.stopPropagation();
                                changeRole(
                                  user,
                                  e.target.value as 'customer' | 'admin'
                                );
                              }}
                              className="px-2 py-1 text-xs bg-white border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 disabled:opacity-50"
                            >
                              <option value="customer">Customer</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>

                          {/* Delete button */}
                          {confirmDeleteId === user.id ? (
                            <div
                              className="flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="text-xs text-red-600">
                                Delete this user?
                              </span>
                              <button
                                disabled={deletingId === user.id}
                                onClick={() => deleteUser(user)}
                                className="px-2 py-1 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                              >
                                {deletingId === user.id
                                  ? 'Deleting...'
                                  : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (user.email === currentAdminEmail) {
                                  alert('You cannot delete your own account.');
                                  return;
                                }
                                setConfirmDeleteId(user.id);
                              }}
                              className="px-2 py-1 text-xs text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          )}
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
      {!loading && users.length === 0 && (
        <div className="p-8 text-center text-gray-400 text-sm">
          No users found matching your filters.
        </div>
      )}
    </div>
  );
}
