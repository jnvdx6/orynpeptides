'use client';

import { useEffect, useState } from 'react';
import { adminGet, adminPut } from '@/lib/admin-fetch';

interface AdminSettings {
  commissionRates: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
  };
  cryptoEnabled: boolean;
  cryptoWallets: {
    BTC: string;
    ETH: string;
    USDT: string;
    SOL: string;
  };
  cryptoDiscount: number;
  minPayoutAmount: number;
  autoApproveCommissions: boolean;
  shippingRates: {
    standard: number;
    priority: number;
  };
}

const walletBadgeColors: Record<string, string> = {
  BTC: 'bg-amber-50 text-amber-700',
  ETH: 'bg-indigo-50 text-indigo-700',
  USDT: 'bg-emerald-50 text-emerald-700',
  SOL: 'bg-violet-50 text-violet-700',
};

const levelLabels = ['level1', 'level2', 'level3', 'level4', 'level5'] as const;

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await adminGet<{ settings: AdminSettings }>('/api/admin/settings');
        setSettings(data.settings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setFeedback(null);
    try {
      const data = await adminPut<{ settings: AdminSettings }>('/api/admin/settings', settings);
      setSettings(data.settings);
      setFeedback({ type: 'success', message: 'Settings saved successfully' });
    } catch (err) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Failed to save settings' });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const updateRate = (level: typeof levelLabels[number], value: string) => {
    if (!settings) return;
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      setSettings({
        ...settings,
        commissionRates: { ...settings.commissionRates, [level]: num },
      });
    }
  };

  const updateWallet = (currency: keyof AdminSettings['cryptoWallets'], value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      cryptoWallets: { ...settings.cryptoWallets, [currency]: value },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-sm animate-pulse">Loading settings...</div>
      </div>
    );
  }

  if (error || !settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 text-sm text-red-700">
          {error ?? 'Failed to load settings'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Feedback toast */}
      {feedback && (
        <div className={`rounded-xl px-4 py-3 flex items-center gap-2 border ${
          feedback.type === 'success'
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-red-50 border-red-200'
        }`}>
          {feedback.type === 'success' ? (
            <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span className={`text-sm font-medium ${feedback.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
            {feedback.message}
          </span>
        </div>
      )}

      {/* Commission Rates */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Commission Rates</h2>
        <p className="text-xs text-gray-500 mt-0.5 mb-5">Set the referral commission percentage for each level.</p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {levelLabels.map((level, i) => (
            <div key={level}>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Level {i + 1}</label>
              <div className="relative">
                <input
                  type="number"
                  value={settings.commissionRates[level]}
                  onChange={(e) => updateRate(level, e.target.value)}
                  min="0"
                  max="100"
                  step="0.5"
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-sm">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crypto Settings */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Crypto Payments</h2>
        <p className="text-xs text-gray-500 mt-0.5 mb-5">Configure cryptocurrency payment settings.</p>

        <div className="space-y-5">
          {/* Enable toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Enable Crypto Payments</p>
              <p className="text-xs text-gray-500">Accept BTC, ETH, USDT, and SOL</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, cryptoEnabled: !settings.cryptoEnabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.cryptoEnabled ? 'bg-oryn-orange' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                settings.cryptoEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Wallet addresses */}
          {settings.cryptoEnabled && (
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <div className="pt-3 space-y-3">
                {(Object.keys(settings.cryptoWallets) as Array<keyof AdminSettings['cryptoWallets']>).map((currency) => (
                  <div key={currency}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium font-mono ${walletBadgeColors[currency]}`}>
                        {currency}
                      </span>
                      <label className="text-xs text-gray-500">Wallet Address</label>
                    </div>
                    <input
                      type="text"
                      value={settings.cryptoWallets[currency]}
                      onChange={(e) => updateWallet(currency, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none transition-all"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Crypto Discount</label>
                <div className="relative w-32">
                  <input
                    type="number"
                    value={settings.cryptoDiscount}
                    onChange={(e) => setSettings({ ...settings, cryptoDiscount: parseFloat(e.target.value) || 0 })}
                    min="0"
                    max="50"
                    step="0.5"
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-sm">%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payout Settings */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Payout Settings</h2>
        <p className="text-xs text-gray-500 mt-0.5 mb-5">Configure commission payout rules.</p>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Minimum Payout Amount (EUR)</label>
            <div className="relative w-40">
              <input
                type="number"
                value={settings.minPayoutAmount}
                onChange={(e) => setSettings({ ...settings, minPayoutAmount: parseFloat(e.target.value) || 0 })}
                min="0"
                step="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Auto-approve Commissions</p>
              <p className="text-xs text-gray-500">Automatically approve commissions without manual review</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, autoApproveCommissions: !settings.autoApproveCommissions })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoApproveCommissions ? 'bg-oryn-orange' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                settings.autoApproveCommissions ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Shipping Rates */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Shipping Rates</h2>
        <p className="text-xs text-gray-500 mt-0.5 mb-5">Set shipping prices for different methods.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Standard Shipping (EUR)</label>
            <input
              type="number"
              value={settings.shippingRates.standard}
              onChange={(e) => setSettings({ ...settings, shippingRates: { ...settings.shippingRates, standard: parseFloat(e.target.value) || 0 } })}
              min="0"
              step="0.10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Priority Shipping (EUR)</label>
            <input
              type="number"
              value={settings.shippingRates.priority}
              onChange={(e) => setSettings({ ...settings, shippingRates: { ...settings.shippingRates, priority: parseFloat(e.target.value) || 0 } })}
              min="0"
              step="0.10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-oryn-orange/20 focus:border-oryn-orange outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sticky save button */}
      <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-4 pb-6 -mx-1 px-1">
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-oryn-orange text-white hover:bg-oryn-orange-dark rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
