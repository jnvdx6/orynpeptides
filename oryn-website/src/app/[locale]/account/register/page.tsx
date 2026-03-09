"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { OrynLogo } from "@/components/icons/OrynLogo";
import { REFERRAL_CODE_KEY } from "@/lib/discounts";

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const { localePath, t } = useLocale();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    referralCodeUsed: "",
  });

  const r = t.account.register;

  // Pre-fill referral code from URL capture (via ?ref=CODE)
  useEffect(() => {
    const captured = localStorage.getItem(REFERRAL_CODE_KEY);
    if (captured && !form.referralCodeUsed) {
      setForm((prev) => ({ ...prev, referralCodeUsed: captured }));
    }
  }, []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    router.push(localePath("/account"));
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError(r.passwordsMismatch);
      return;
    }
    if (form.password.length < 8) {
      setError(r.passwordTooShort);
      return;
    }

    setLoading(true);
    const result = await register({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      organization: form.organization || undefined,
      referralCodeUsed: form.referralCodeUsed || undefined,
    });
    setLoading(false);

    if (result.success) {
      router.push(localePath("/account"));
    } else {
      setError(result.error || r.registrationFailed);
    }
  };

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center bg-oryn-cream/30 pb-16">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white border border-oryn-grey/15 p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <OrynLogo size={80} color="#121212" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight mb-2">{r.title}</h1>
            <p className="text-xs text-oryn-black/40 font-plex">
              {r.subtitle}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-xs text-red-600 font-plex">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                  {r.firstName}
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                  {r.lastName}
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                {r.email}
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                placeholder={r.emailPlaceholder}
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                {r.password}
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                placeholder={r.passwordPlaceholder}
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                {r.confirmPassword}
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                required
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                {r.organization}
              </label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => update("organization", e.target.value)}
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                placeholder={r.organizationPlaceholder}
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                {r.referralCode}
              </label>
              <input
                type="text"
                value={form.referralCodeUsed}
                onChange={(e) => update("referralCodeUsed", e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors font-mono"
                placeholder={r.referralCodePlaceholder}
                maxLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
                  {r.creating}
                </>
              ) : (
                r.createAccount
              )}
            </button>

            <p className="text-[9px] text-oryn-black/30 font-plex text-center leading-relaxed">
              {r.termsPrefix}{" "}
              <Link href="/terms" className="text-oryn-orange hover:underline">{r.termsOfService}</Link>{" "}
              {r.and}{" "}
              <Link href="/privacy" className="text-oryn-orange hover:underline">{r.privacyPolicy}</Link>.
            </p>
          </form>

          <div className="mt-6 pt-6 border-t border-oryn-grey/10 text-center">
            <p className="text-xs text-oryn-black/40 font-plex">
              {r.hasAccount}{" "}
              <Link href="/account/login" className="text-oryn-orange hover:underline font-medium">
                {r.signIn}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
