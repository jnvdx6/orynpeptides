"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth";
import { Link } from "@/components/ui/LocaleLink";
import { useLocale } from "@/i18n/LocaleContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const accountNavItems = [
  { href: "/account", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/account/orders", label: "Orders", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { href: "/account/profile", label: "Profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { localePath } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isAuthPage) {
      router.push(localePath("/account/login"));
    }
  }, [isLoading, isAuthenticated, isAuthPage, router, localePath]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-oryn-orange border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pt-28 min-h-screen bg-oryn-cream/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-2">
            <div className="bg-white border border-oryn-grey/15 p-5 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-oryn-orange text-white flex items-center justify-center text-sm font-bold">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div>
                  <p className="text-sm font-bold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-[10px] text-oryn-black/40 font-plex">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="bg-white border border-oryn-grey/15 divide-y divide-oryn-grey/10">
              {accountNavItems.map((item) => {
                const isActive = pathname === localePath(item.href) ||
                  (item.href !== "/account" && pathname.startsWith(localePath(item.href)));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 text-xs transition-colors ${
                      isActive
                        ? "text-oryn-orange bg-oryn-orange/5 font-medium"
                        : "text-oryn-black/50 hover:text-oryn-orange hover:bg-oryn-orange/[0.02]"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs text-red-500/60 hover:text-red-500 hover:bg-red-50 transition-colors bg-white border border-oryn-grey/15"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </aside>

          {/* Main content */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
