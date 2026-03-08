"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [saved, setSaved] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (passwordForm.newPassword !== passwordForm.confirm) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    // In a real app, this would call an API
    setPasswordSaved(true);
    setPasswordForm({ current: "", newPassword: "", confirm: "" });
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Profile Settings</h1>
        <p className="text-xs text-oryn-black/40 font-plex">
          Manage your account information
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-5">
          PERSONAL INFORMATION
        </h3>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                FIRST NAME
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
                LAST NAME
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
              EMAIL
            </label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex bg-oryn-cream/30 text-oryn-black/40"
            />
            <p className="text-[9px] text-oryn-black/30 font-plex mt-1">Email cannot be changed</p>
          </div>

          {user?.referralCode && (
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                REFERRAL CODE
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
              className="px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
            >
              SAVE CHANGES
            </button>
            {saved && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Saved
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Password Change */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-5">
          CHANGE PASSWORD
        </h3>

        {passwordError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-600 font-plex">
            {passwordError}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
              CURRENT PASSWORD
            </label>
            <input
              type="password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, current: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
            />
          </div>
          <div>
            <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
              NEW PASSWORD
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
              placeholder="Minimum 8 characters"
            />
          </div>
          <div>
            <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
              CONFIRM NEW PASSWORD
            </label>
            <input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirm: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-oryn-black text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-black/80 transition-colors"
            >
              UPDATE PASSWORD
            </button>
            {passwordSaved && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Password updated
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
