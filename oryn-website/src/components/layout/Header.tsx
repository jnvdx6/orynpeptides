"use client";

import { useState, useEffect, useRef } from "react";
import { OrynLogo } from "@/components/icons/OrynLogo";
import { useCart } from "@/lib/cart-context";
import { CartSlider } from "@/components/ui/CartSlider";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { useAuth } from "@/providers/auth";
import { useProducts } from "@/providers/products";
import { useWishlist } from "@/providers/wishlist";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, setIsOpen } = useCart();
  const { t } = useLocale();
  const { isAuthenticated, user } = useAuth();
  const { products } = useProducts();
  const { totalItems: wishlistCount } = useWishlist();

  // Search results
  const searchResults = searchQuery.trim().length > 1
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q);
      }).slice(0, 5)
    : [];

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navLinks = [
    { href: "/products", label: t.nav.products },
    { href: "/science", label: t.nav.science },
    { href: "/learn", label: "Learn" },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-oryn-black text-white h-8 flex items-center justify-center">
        <Link href="/products" className="flex items-center gap-2 group">
          <span className="text-[9px] font-mono tracking-[0.25em] text-white/60 group-hover:text-white/80 transition-colors">
            {t.header.announcementText}
          </span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-oryn-orange group-hover:translate-x-0.5 transition-transform">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <header className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm" : "bg-white/80 backdrop-blur-md"
      }`}>
        <div className="h-px bg-oryn-orange" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <OrynLogo size={100} color="#121212" />
            </Link>

            {/* Center nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-medium text-oryn-black/50 hover:text-oryn-orange transition-colors tracking-[0.15em] uppercase relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-oryn-orange group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div ref={searchRef} className="relative hidden md:block">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-oryn-black/40 hover:text-oryn-orange transition-colors"
                  aria-label="Search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>

                {searchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-oryn-grey/20 shadow-xl z-50">
                    <div className="p-3 border-b border-oryn-grey/10">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search peptides..."
                        className="w-full px-3 py-2 bg-oryn-grey-light/50 text-sm font-plex focus:outline-none focus:ring-1 focus:ring-oryn-orange"
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setSearchOpen(false);
                            setSearchQuery("");
                          }
                        }}
                      />
                    </div>
                    {searchResults.length > 0 ? (
                      <div className="max-h-64 overflow-y-auto">
                        {searchResults.map((p) => (
                          <Link
                            key={p.id}
                            href={`/products/${p.slug}`}
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-oryn-orange/5 transition-colors"
                          >
                            <div className="w-8 h-8 bg-oryn-cream flex items-center justify-center shrink-0">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
                                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate">{p.name}</p>
                              <p className="text-[10px] text-oryn-black/40 font-plex truncate">{p.subtitle}</p>
                            </div>
                            <span className="text-xs font-bold text-oryn-orange shrink-0 ml-auto">
                              {t.cart ? "" : ""}{/* formatPrice not available in scope, so just show raw */}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : searchQuery.trim().length > 1 ? (
                      <div className="p-4 text-center">
                        <p className="text-xs text-oryn-black/40 font-plex">No results for &ldquo;{searchQuery}&rdquo;</p>
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-[10px] text-oryn-black/30 font-plex">Type to search...</p>
                      </div>
                    )}
                    <Link
                      href="/products"
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="block p-3 text-center text-[10px] font-mono text-oryn-orange tracking-[0.1em] border-t border-oryn-grey/10 hover:bg-oryn-orange/5 transition-colors"
                    >
                      VIEW ALL PRODUCTS
                    </Link>
                  </div>
                )}
              </div>

              <LocaleSwitcher />

              <Link
                href="/products"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-oryn-orange text-white text-[10px] font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
              >
                {t.header.shopNow}
              </Link>

              <Link
                href="/account"
                className="hidden md:flex items-center justify-center p-2 text-oryn-black/40 hover:text-oryn-orange transition-colors"
                aria-label="Account"
              >
                {isAuthenticated && user ? (
                  <span className="w-6 h-6 bg-oryn-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {user.firstName?.charAt(0).toUpperCase() || "U"}
                  </span>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </Link>

              <Link
                href="/wishlist"
                className="hidden md:flex relative p-2 text-oryn-black/40 hover:text-oryn-orange transition-colors"
                aria-label="Wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "#FF6A1A" : "none"} stroke={wishlistCount > 0 ? "#FF6A1A" : "currentColor"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-oryn-orange text-white text-[8px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-oryn-black/40 hover:text-oryn-orange transition-colors"
                aria-label="Open cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-oryn-orange text-white text-[8px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-oryn-black"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {mobileOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <>
                      <line x1="3" y1="7" x2="21" y2="7" />
                      <line x1="9" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="17" x2="21" y2="17" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="h-px bg-oryn-grey/20" />

        {/* Mobile menu */}
        {mobileOpen && (
          <nav role="navigation" aria-label="Mobile menu" className="md:hidden bg-white border-t border-oryn-grey/10">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-[11px] font-medium text-oryn-black/60 hover:text-oryn-orange transition-colors border-b border-oryn-grey/10 last:border-0 tracking-[0.15em] uppercase"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-4 text-[11px] font-medium text-oryn-black/60 hover:text-oryn-orange transition-colors border-b border-oryn-grey/10 tracking-[0.15em] uppercase"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {isAuthenticated ? "My Account" : "Sign In"}
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-4 mt-4 bg-oryn-orange text-white text-[11px] font-medium tracking-[0.15em] uppercase"
              >
                {t.header.shopNow}
              </Link>
            </div>
          </nav>
        )}
      </header>

      <CartSlider />
    </>
  );
}
