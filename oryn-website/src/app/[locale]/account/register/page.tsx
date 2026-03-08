"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { OrynLogo } from "@/components/icons/OrynLogo";

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const { localePath } = useLocale();
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
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
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
      setError(result.error || "Registration failed");
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
            <h1 className="text-2xl font-bold tracking-tight mb-2">Create Account</h1>
            <p className="text-xs text-oryn-black/40 font-plex">
              Join ORYN for order tracking, exclusive offers, and more
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
                  FIRST NAME *
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
                  LAST NAME *
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
                EMAIL *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                PASSWORD *
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                placeholder="Minimum 8 characters"
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                CONFIRM PASSWORD *
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
                ORGANIZATION
              </label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => update("organization", e.target.value)}
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                placeholder="Lab, university, company..."
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                REFERRAL CODE
              </label>
              <input
                type="text"
                value={form.referralCodeUsed}
                onChange={(e) => update("referralCodeUsed", e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors font-mono"
                placeholder="Optional"
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
                  CREATING ACCOUNT...
                </>
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>

            <p className="text-[9px] text-oryn-black/30 font-plex text-center leading-relaxed">
              By creating an account, you agree to ORYN&apos;s{" "}
              <Link href="/terms" className="text-oryn-orange hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-oryn-orange hover:underline">Privacy Policy</Link>.
            </p>
          </form>

          <div className="mt-6 pt-6 border-t border-oryn-grey/10 text-center">
            <p className="text-xs text-oryn-black/40 font-plex">
              Already have an account?{" "}
              <Link href="/account/login" className="text-oryn-orange hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
