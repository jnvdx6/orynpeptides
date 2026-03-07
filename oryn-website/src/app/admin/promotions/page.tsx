'use client';

import { useEffect, useState } from 'react';
import { adminGet, adminPost, adminPut, adminDelete } from '@/lib/admin-fetch';
import type { Promotion } from '@/types';

const statusColors: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  draft: 'bg-gray-100 text-gray-600',
  expired: 'bg-red-50 text-red-600',
};

const typeLabels: Record<string, string> = {
  standard: 'Standard',
  buyget: 'Buy X Get Y',
};

const discountTypeLabels: Record<string, string> = {
  percentage: '%',
  fixed: '€',
};

interface PromotionForm {
  code: string;
  type: 'standard' | 'buyget';
  status: 'active' | 'draft' | 'expired';
  label: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  targetType: 'order' | 'items' | 'shipping';
  minOrderAmount: string;
  maxDiscountAmount: string;
  totalLimit: string;
  perCustomerLimit: string;
  validFrom: string;
  validTo: string;
  isCombinable: boolean;
}

const emptyForm: PromotionForm = {
  code: '',
  type: 'standard',
  status: 'draft',
  label: '',
  description: '',
  discountType: 'percentage',
  discountValue: 10,
  targetType: 'order',
  minOrderAmount: '',
  maxDiscountAmount: '',
  totalLimit: '',
  perCustomerLimit: '',
  validFrom: '',
  validTo: '',
  isCombinable: false,
};

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PromotionForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'draft' | 'expired'>('all');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchPromotions = async () => {
    try {
      const data = await adminGet<{ promotions: Promotion[] }>('/api/admin/promotions');
      setPromotions(data.promotions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load promotions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPromotions(); }, []);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (promo: Promotion) => {
    setForm({
      code: promo.code,
      type: promo.type,
      status: promo.status,
      label: promo.label,
      description: promo.description || '',
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      targetType: promo.targetType,
      minOrderAmount: promo.minOrderAmount?.toString() || '',
      maxDiscountAmount: promo.maxDiscountAmount?.toString() || '',
      totalLimit: promo.totalLimit?.toString() || '',
      perCustomerLimit: promo.perCustomerLimit?.toString() || '',
      validFrom: promo.validFrom || '',
      validTo: promo.validTo || '',
      isCombinable: promo.isCombinable,
    });
    setEditingId(promo.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.code || !form.label) {
      showFeedback('error', 'Code and label are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        code: form.code.toUpperCase(),
        minOrderAmount: form.minOrderAmount ? parseFloat(form.minOrderAmount) : undefined,
        maxDiscountAmount: form.maxDiscountAmount ? parseFloat(form.maxDiscountAmount) : undefined,
        totalLimit: form.totalLimit ? parseInt(form.totalLimit) : undefined,
        perCustomerLimit: form.perCustomerLimit ? parseInt(form.perCustomerLimit) : undefined,
        validFrom: form.validFrom || undefined,
        validTo: form.validTo || undefined,
      };

      if (editingId) {
        await adminPut('/api/admin/promotions', { id: editingId, ...payload });
        showFeedback('success', 'Promotion updated');
      } else {
        await adminPost('/api/admin/promotions', payload);
        showFeedback('success', 'Promotion created');
      }
      setShowModal(false);
      fetchPromotions();
    } catch (err) {
      showFeedback('error', err instanceof Error ? err.message : 'Failed to save promotion');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminDelete(`/api/admin/promotions?id=${id}`);
      showFeedback('success', 'Promotion deleted');
      setDeleteConfirm(null);
      fetchPromotions();
    } catch (err) {
      showFeedback('error', err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const handleToggleStatus = async (promo: Promotion) => {
    const newStatus = promo.status === 'active' ? 'draft' : 'active';
    try {
      await adminPut('/api/admin/promotions', { id: promo.id, status: newStatus });
      fetchPromotions();
    } catch (err) {
      showFeedback('error', err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const filtered = filter === 'all' ? promotions : promotions.filter((p) => p.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm animate-pulse">Loading promotions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-sm text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Feedback */}
      {feedback && (
        <div className={`rounded-xl px-4 py-3 flex items-center gap-2 border ${
          feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
        }`}>
          <span className={`text-sm font-medium ${feedback.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
            {feedback.message}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">{promotions.length} promotion{promotions.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-oryn-orange text-white text-sm font-medium rounded-lg hover:bg-oryn-orange-dark transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Promotion
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(['all', 'active', 'draft', 'expired'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
              filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">No promotions found</p>
            <p className="text-xs text-gray-400 mt-1">Create your first promotion to get started</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">Label</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="text-left px-4 py-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-[11px] font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm font-medium text-gray-900">{promo.code}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-gray-900">{promo.label}</p>
                      {promo.description && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">{promo.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500">{typeLabels[promo.type]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono font-medium text-gray-900">
                      {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `€${promo.discountValue.toFixed(2)}`}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">
                      on {promo.targetType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-gray-600">
                      {promo.usedCount}
                      {promo.totalLimit ? ` / ${promo.totalLimit}` : ''}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleStatus(promo)}
                      className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${statusColors[promo.status]} cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      {promo.status}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(promo)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                      {deleteConfirm === promo.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(promo.id)}
                            className="px-2 py-1 bg-red-500 text-white text-[11px] rounded-md font-medium"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-[11px] rounded-md font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(promo.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" onClick={() => setShowModal(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                {editingId ? 'Edit Promotion' : 'Create Promotion'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Code & Label */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Code</label>
                  <input
                    type="text"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="SUMMER20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as PromotionForm['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Label</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="Summer Sale 20% Off"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Optional description..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none resize-none"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Promotion Type</label>
                <div className="flex gap-2">
                  {(['standard', 'buyget'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        form.type === t
                          ? 'border-oryn-orange bg-oryn-orange/5 text-oryn-orange'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {typeLabels[t]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <p className="text-xs font-semibold text-gray-700">Discount Settings</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Type</label>
                    <select
                      value={form.discountType}
                      onChange={(e) => setForm({ ...form, discountType: e.target.value as PromotionForm['discountType'] })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Value</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={form.discountValue}
                        onChange={(e) => setForm({ ...form, discountValue: parseFloat(e.target.value) || 0 })}
                        min="0"
                        step={form.discountType === 'percentage' ? '1' : '0.01'}
                        className="w-full px-2 py-1.5 pr-7 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-mono">
                        {discountTypeLabels[form.discountType]}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Target</label>
                    <select
                      value={form.targetType}
                      onChange={(e) => setForm({ ...form, targetType: e.target.value as PromotionForm['targetType'] })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                    >
                      <option value="order">Order</option>
                      <option value="items">Items</option>
                      <option value="shipping">Shipping</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">Max Discount (EUR)</label>
                  <input
                    type="number"
                    value={form.maxDiscountAmount}
                    onChange={(e) => setForm({ ...form, maxDiscountAmount: e.target.value })}
                    placeholder="No limit"
                    min="0"
                    step="0.01"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                  />
                </div>
              </div>

              {/* Conditions */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <p className="text-xs font-semibold text-gray-700">Conditions</p>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">Minimum Order Amount (EUR)</label>
                  <input
                    type="number"
                    value={form.minOrderAmount}
                    onChange={(e) => setForm({ ...form, minOrderAmount: e.target.value })}
                    placeholder="No minimum"
                    min="0"
                    step="0.01"
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Valid From</label>
                    <input
                      type="datetime-local"
                      value={form.validFrom}
                      onChange={(e) => setForm({ ...form, validFrom: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Valid Until</label>
                    <input
                      type="datetime-local"
                      value={form.validTo}
                      onChange={(e) => setForm({ ...form, validTo: e.target.value })}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Usage Limits */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <p className="text-xs font-semibold text-gray-700">Usage Limits</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Total Uses</label>
                    <input
                      type="number"
                      value={form.totalLimit}
                      onChange={(e) => setForm({ ...form, totalLimit: e.target.value })}
                      placeholder="Unlimited"
                      min="0"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 mb-1">Per Customer</label>
                    <input
                      type="number"
                      value={form.perCustomerLimit}
                      onChange={(e) => setForm({ ...form, perCustomerLimit: e.target.value })}
                      placeholder="Unlimited"
                      min="0"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Combinability */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Combinable</p>
                  <p className="text-xs text-gray-500">Can be used with other promotions</p>
                </div>
                <button
                  onClick={() => setForm({ ...form, isCombinable: !form.isCombinable })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    form.isCombinable ? 'bg-oryn-orange' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    form.isCombinable ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-oryn-orange text-white text-sm font-medium rounded-lg hover:bg-oryn-orange-dark transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
