"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth";
import { useLocale } from "@/i18n/LocaleContext";
import { SavedAddresses } from "@/components/account/SavedAddresses";

export default function ProfilePage() {
  const { user, updateProfile, refreshProfile } = useAuth();
  const { t } = useLocale();
  const p = t.account.profile;

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Refresh profile from Medusa on mount to get latest data
  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  // Sync form when user data loads/changes
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">{p.title}</h1>
        <p className="text-xs text-oryn-black/40 font-plex">
          {p.subtitle}
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-5">
          {p.personalInfo}
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-600 font-plex">
            {error}
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                {p.firstName}
              </label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                {p.lastName}
              </label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
              {p.email}
            </label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex bg-oryn-cream/30 text-oryn-black/40"
            />
            <p className="text-[9px] text-oryn-black/30 font-plex mt-1">{p.emailNotChangeable}</p>
          </div>

          {user?.referralCode && (
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                {p.referralCode}
              </label>
              <input
                type="text"
                value={user.referralCode}
                disabled
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-mono bg-oryn-cream/30 text-oryn-orange tracking-[0.2em]"
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent animate-spin" />
                  Saving...
                </>
              ) : (
                p.saveChanges
              )}
            </button>
            {saved && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {p.saved}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Saved Addresses */}
      <SavedAddresses />

      {/* Security / Password Note */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">
          {p.changePassword}
        </h3>
        <div className="p-4 bg-oryn-cream/30 border border-oryn-grey/10">
          <p className="text-xs text-oryn-black/50 font-plex leading-relaxed">
            Password management is handled securely through our authentication system.
            If you need to reset your password, please log out and use the registration flow
            with your existing email, or contact our support team at{" "}
            <a href="mailto:support@orynpeptides.com" className="text-oryn-orange hover:underline">
              support@orynpeptides.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
