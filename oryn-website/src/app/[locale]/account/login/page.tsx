"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { OrynLogo } from "@/components/icons/OrynLogo";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const { localePath } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    router.push(localePath("/account"));
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push(localePath("/account"));
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center bg-oryn-cream/30">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white border border-oryn-grey/15 p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <OrynLogo size={80} color="#121212" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-xs text-oryn-black/40 font-plex">
              Sign in to your ORYN account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-xs text-red-600 font-plex">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
                placeholder="Enter your password"
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
                  SIGNING IN...
                </>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-oryn-grey/10 text-center">
            <p className="text-xs text-oryn-black/40 font-plex">
              Don&apos;t have an account?{" "}
              <Link href="/account/register" className="text-oryn-orange hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/products" className="text-[10px] text-oryn-black/30 font-plex hover:text-oryn-orange transition-colors">
            Continue shopping without an account
          </Link>
        </div>
      </div>
    </div>
  );
}
