"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { OrynLogo } from "@/components/icons/OrynLogo";
import { useCart } from "@/lib/cart-context";
import { CartSlider } from "@/components/ui/CartSlider";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { useAuth } from "@/providers/auth";
import { useProducts } from "@/providers/products";
import { useWishlist } from "@/providers/wishlist";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, setIsOpen } = useCart();
  const { t, formatPrice } = useLocale();
  const { isAuthenticated, user } = useAuth();
  const { products } = useProducts();
  const { totalItems: wishlistCount } = useWishlist();
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Search results (memoized to avoid re-filtering on unrelated renders)
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length <= 1) return [];
    const q = searchQuery.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery, products]);

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

  // Focus input when search opens (desktop or mobile)
  useEffect(() => {
    if (searchOpen) {
      requestAnimationFrame(() => {
        if (window.innerWidth >= 768 && searchInputRef.current) {
          searchInputRef.current.focus();
        } else if (mobileSearchInputRef.current) {
          mobileSearchInputRef.current.focus();
        }
      });
    }
  }, [searchOpen]);

  // Cmd/Ctrl+K keyboard shortcut for search + ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        if (!searchOpen) setSearchQuery("");
      }
      if (e.key === "Escape") {
        if (searchOpen) {
          setSearchOpen(false);
          setSearchQuery("");
        }
        if (mobileOpen) {
          setMobileOpen(false);
          setActiveDropdown(null);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, mobileOpen]);

  const navLinks = useMemo(() => [
    { href: "/products", label: t.nav.products, dropdown: "products" },
    { href: "/compare", label: t.nav.compare },
    { href: "/science", label: t.nav.science },
    { href: "/learn", label: t.nav.learn, dropdown: "learn" },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ], [t.nav]);

  const megaMenus: Record<string, { columns: { title: string; links: { href: string; label: string }[] }[] }> = useMemo(() => ({
    products: {
      columns: [
        {
          title: "PEPTIDE PENS",
          links: [
            { href: "/products/bpc-157", label: "BPC-157 Pen" },
            { href: "/products/tirzepatide", label: "Tirzepatide Pen" },
            { href: "/products/ghk-cu", label: "GHK-Cu Pen" },
            { href: "/products/glutathione", label: "Glutathione Pen" },
            { href: "/products/nad-plus", label: "NAD+ Pen" },
            { href: "/products", label: "View All Products →" },
          ],
        },
        {
          title: "RESEARCH AREAS",
          links: [
            { href: "/peptides-for/recovery", label: "Recovery & Healing" },
            { href: "/peptides-for/weight-loss", label: "Weight Loss" },
            { href: "/peptides-for/anti-aging", label: "Anti-Aging" },
            { href: "/peptides-for/muscle-growth", label: "Muscle Growth" },
            { href: "/peptides-for/skin-rejuvenation", label: "Skin Rejuvenation" },
            { href: "/peptides-for/gut-health", label: "Gut Health" },
          ],
        },
        {
          title: "BUNDLES & DELIVERY",
          links: [
            { href: "/bundles", label: "All Bundles" },
            { href: "/bundles/recovery-stack", label: "Recovery Stack" },
            { href: "/protocols", label: "Research Protocols" },
            { href: "/peptide-pens", label: "Peptide Pens Guide" },
            { href: "/peptides/europe", label: "European Delivery →" },
            { href: "/shipping", label: "Shipping Info" },
          ],
        },
      ],
    },
    learn: {
      columns: [
        {
          title: "GUIDES & ARTICLES",
          links: [
            { href: "/learn/are-peptides-legal-in-the-uk", label: "Are Peptides Legal in the UK?" },
            { href: "/learn/bpc-157-complete-guide", label: "BPC-157 Complete Guide" },
            { href: "/learn/how-to-use-peptide-pen", label: "How to Use a Peptide Pen" },
            { href: "/learn/peptide-pens-for-beginners-uk", label: "Beginner's Guide" },
            { href: "/learn/peptide-sciences-alternative-2026", label: "Peptide Sciences Alternative" },
            { href: "/learn/peptide-stacking-guide-uk", label: "Stacking Guide" },
            { href: "/learn", label: "All Articles →" },
          ],
        },
        {
          title: "COMPARE & REFERENCE",
          links: [
            { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
            { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
            { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
            { href: "/peptides/encyclopedia", label: "Peptide Encyclopedia" },
            { href: "/peptides/glossary", label: "Peptide Glossary" },
            { href: "/compare", label: "All Comparisons →" },
          ],
        },
        {
          title: "FAQ & RESOURCES",
          links: [
            { href: "/faq", label: "All FAQs" },
            { href: "/faq/peptide-pens-faq", label: "Peptide Pens FAQ" },
            { href: "/faq/ordering-delivery-faq", label: "Ordering & Delivery FAQ" },
            { href: "/faq/purity-testing-faq", label: "Purity & Testing FAQ" },
            { href: "/quality", label: "Quality & Testing" },
            { href: "/tools/peptide-calculator", label: "Peptide Calculator" },
          ],
        },
      ],
    },
  }), []);

  const handleDropdownEnter = useCallback((key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-14 sm:h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <OrynLogo size={90} color="#121212" />
            </Link>

            {/* Center nav — desktop */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.dropdown && handleDropdownEnter(link.dropdown)}
                  onMouseLeave={() => link.dropdown && handleDropdownLeave()}
                >
                  <Link
                    href={link.href}
                    className="text-[11px] font-medium text-oryn-black/50 hover:text-oryn-orange transition-colors tracking-[0.15em] uppercase relative group flex items-center gap-1"
                  >
                    {link.label}
                    {link.dropdown && (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${activeDropdown === link.dropdown ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-oryn-orange group-hover:w-full transition-all duration-300" />
                  </Link>

                  {/* Mega dropdown — left-aligned to prevent overflow */}
                  {link.dropdown && activeDropdown === link.dropdown && (
                    <div
                      className="absolute top-full left-0 pt-4 z-50"
                      onMouseEnter={() => handleDropdownEnter(link.dropdown!)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="bg-white border border-oryn-grey/20 shadow-xl min-w-[600px]">
                        <div className="grid grid-cols-3 gap-0 divide-x divide-oryn-grey/10">
                          {megaMenus[link.dropdown].columns.map((col) => (
                            <div key={col.title} className="p-5">
                              <h3 className="text-[9px] font-bold tracking-[0.2em] text-oryn-orange mb-3">
                                {col.title}
                              </h3>
                              <ul className="space-y-2">
                                {col.links.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      href={l.href}
                                      onClick={() => setActiveDropdown(null)}
                                      className="text-xs text-oryn-black/50 hover:text-oryn-orange transition-colors font-plex block py-0.5"
                                    >
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2.5 text-oryn-black/40 hover:text-oryn-orange transition-colors"
                  aria-label={t.aria.search}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>

                {searchOpen && (
                  <>
                    {/* Mobile: full-screen overlay */}
                    <div className="lg:hidden fixed inset-0 top-[calc(2rem+3.75rem)] sm:top-[calc(2rem+4.25rem)] bg-white z-50">
                      <div className="p-4 border-b border-oryn-grey/10">
                        <div className="relative">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                          </svg>
                          <input
                            ref={mobileSearchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.header.searchPlaceholder}
                            className="w-full pl-10 pr-10 py-3 bg-oryn-grey-light/50 text-sm font-plex focus:outline-none focus:ring-1 focus:ring-oryn-orange rounded-none"
                            onKeyDown={(e) => {
                              if (e.key === "Escape") {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }
                            }}
                          />
                          <button
                            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-oryn-black/30"
                            aria-label={t.productDetail.closeSearch}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-[calc(100vh-10rem)]">
                        {searchResults.length > 0 ? (
                          <div>
                            {searchResults.map((p) => (
                              <Link
                                key={p.id}
                                href={`/products/${p.slug}`}
                                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                                className="flex items-center gap-3 px-4 py-3.5 hover:bg-oryn-orange/5 active:bg-oryn-orange/10 transition-colors border-b border-oryn-grey/10"
                              >
                                <div className="w-10 h-10 bg-oryn-cream flex items-center justify-center shrink-0">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
                                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                  </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-bold truncate">{p.name}</p>
                                  <p className="text-xs text-oryn-black/40 font-plex truncate">{p.subtitle}</p>
                                </div>
                                <span className="text-sm font-bold text-oryn-orange shrink-0">
                                  {formatPrice(p.price)}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ) : searchQuery.trim().length > 1 ? (
                          <div className="p-8 text-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1" className="mx-auto mb-3">
                              <circle cx="11" cy="11" r="8" />
                              <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <p className="text-sm text-oryn-black/40 font-plex">
                              {`${t.header.noResults} "${searchQuery}"`}
                            </p>
                          </div>
                        ) : (
                          <div className="p-8 text-center">
                            <p className="text-xs text-oryn-black/30 font-plex">
                              {t.header.typeToSearch}
                            </p>
                          </div>
                        )}
                      </div>
                      <Link
                        href="/products"
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="absolute bottom-0 left-0 right-0 p-4 text-center text-[11px] font-mono text-oryn-orange tracking-[0.1em] border-t border-oryn-grey/10 bg-white hover:bg-oryn-orange/5 transition-colors"
                      >
                        {t.header.viewAll}
                      </Link>
                    </div>

                    {/* Desktop: dropdown */}
                    <div className="hidden lg:block absolute top-full right-0 mt-2 w-80 bg-white border border-oryn-grey/20 shadow-xl z-50">
                      <div className="p-3 border-b border-oryn-grey/10">
                        <div className="relative">
                          <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.header.searchPlaceholder}
                            className="w-full px-3 py-2 bg-oryn-grey-light/50 text-sm font-plex focus:outline-none focus:ring-1 focus:ring-oryn-orange"
                            onKeyDown={(e) => {
                              if (e.key === "Escape") {
                                setSearchOpen(false);
                                setSearchQuery("");
                              }
                            }}
                          />
                          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-oryn-black/20 bg-oryn-grey-light px-1.5 py-0.5 border border-oryn-grey/20">
                            ESC
                          </kbd>
                        </div>
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
                                {formatPrice(p.price)}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ) : searchQuery.trim().length > 1 ? (
                        <div className="p-4 text-center">
                          <p className="text-xs text-oryn-black/40 font-plex">
                            {`${t.header.noResults} "${searchQuery}"`}
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-[10px] text-oryn-black/30 font-plex">
                            {t.header.typeToSearch}
                          </p>
                          <p className="text-[9px] text-oryn-black/20 font-mono mt-1">
                            ⌘K
                          </p>
                        </div>
                      )}
                      <Link
                        href="/products"
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="block p-3 text-center text-[10px] font-mono text-oryn-orange tracking-[0.1em] border-t border-oryn-grey/10 hover:bg-oryn-orange/5 transition-colors"
                      >
                        {t.header.viewAll}
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="hidden lg:block">
                <LocaleSwitcher />
              </div>

              <Link
                href="/products"
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-oryn-orange text-white text-[10px] font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
              >
                {t.header.shopNow}
              </Link>

              <Link
                href="/account"
                className="hidden lg:flex items-center justify-center p-2 text-oryn-black/40 hover:text-oryn-orange transition-colors"
                aria-label={t.aria.account}
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
                className="hidden lg:flex relative p-2 text-oryn-black/40 hover:text-oryn-orange transition-colors"
                aria-label={t.aria.wishlist}
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

              {/* Cart — always visible */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 text-oryn-black/40 hover:text-oryn-orange transition-colors"
                aria-label={t.aria.openCart}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-oryn-orange text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 text-oryn-black -mr-1"
                aria-label={t.aria.toggleMenu}
                aria-expanded={mobileOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      </header>

      {/* ─── Mobile Menu (full-screen overlay) ─── */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Menu panel */}
      <div
        className={`lg:hidden fixed top-[calc(2rem+3.75rem)] sm:top-[calc(2rem+4.25rem)] left-0 right-0 bottom-0 z-40 bg-white transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <nav
          role="navigation"
          aria-label={t.aria.mobileMenu}
          className="h-full overflow-y-auto overscroll-contain"
        >
          <div className="px-5 pt-2 pb-[max(2rem,env(safe-area-inset-bottom))]">
            {/* Main nav links */}
            {navLinks.map((link) => (
              <div key={link.href} className="border-b border-oryn-grey/10">
                <div className="flex items-center">
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex-1 py-4 text-sm font-medium text-oryn-black/70 active:text-oryn-orange transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link.dropdown ? null : link.dropdown!)}
                      className="p-3 -mr-3 text-oryn-black/30 active:text-oryn-orange"
                      aria-label={`Expand ${link.label}`}
                      aria-expanded={activeDropdown === link.dropdown}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${activeDropdown === link.dropdown ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Accordion sub-menu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    link.dropdown && activeDropdown === link.dropdown
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {link.dropdown && (
                    <div className="pb-4 pl-1 space-y-5">
                      {megaMenus[link.dropdown].columns.map((col) => (
                        <div key={col.title}>
                          <h4 className="text-[9px] font-bold tracking-[0.2em] text-oryn-orange mb-2 pl-3 border-l-2 border-oryn-orange/30">
                            {col.title}
                          </h4>
                          <div className="space-y-0.5 pl-3">
                            {col.links.map((l) => (
                              <Link
                                key={l.href}
                                href={l.href}
                                onClick={closeMobileMenu}
                                className="block py-2 text-[13px] text-oryn-black/50 active:text-oryn-orange transition-colors font-plex"
                              >
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Secondary actions */}
            <div className="mt-4 space-y-0">
              <button
                onClick={() => { closeMobileMenu(); setSearchOpen(true); }}
                className="flex items-center gap-3 w-full py-4 text-sm text-oryn-black/60 active:text-oryn-orange transition-colors border-b border-oryn-grey/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                {t.header.searchPlaceholder}
              </button>

              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-4 text-sm text-oryn-black/60 active:text-oryn-orange transition-colors border-b border-oryn-grey/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlistCount > 0 ? "#FF6A1A" : "none"} stroke={wishlistCount > 0 ? "#FF6A1A" : "currentColor"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                {t.account.nav.wishlist}
                {wishlistCount > 0 && (
                  <span className="ml-auto text-xs font-bold text-oryn-orange">{wishlistCount}</span>
                )}
              </Link>

              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 py-4 text-sm text-oryn-black/60 active:text-oryn-orange transition-colors border-b border-oryn-grey/10"
              >
                {isAuthenticated && user ? (
                  <span className="w-6 h-6 bg-oryn-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full shrink-0">
                    {user.firstName?.charAt(0).toUpperCase() || "U"}
                  </span>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
                {isAuthenticated ? t.header.myAccount : t.header.signIn}
              </Link>
            </div>

            {/* Locale switcher + CTA */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-center">
                <LocaleSwitcher />
              </div>

              <Link
                href="/products"
                onClick={closeMobileMenu}
                className="block w-full text-center py-4 bg-oryn-orange text-white text-sm font-medium tracking-[0.1em]"
              >
                {t.header.shopNow}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <CartSlider />
    </>
  );
}
