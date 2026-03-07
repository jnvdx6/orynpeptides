"use client";

import { useState, useEffect } from "react";
import { OrynLogo } from "@/components/icons/OrynLogo";
import { useCart } from "@/lib/cart-context";
import { CartSlider } from "@/components/ui/CartSlider";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { t } = useLocale();

  const navLinks = [
    { href: "/products", label: t.nav.products },
    { href: "/science", label: t.nav.science },
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
              <LocaleSwitcher />

              <Link
                href="/products"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-oryn-orange text-white text-[10px] font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
              >
                {t.header.shopNow}
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
          <div className="md:hidden bg-white border-t border-oryn-grey/10">
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
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-4 mt-4 bg-oryn-orange text-white text-[11px] font-medium tracking-[0.15em] uppercase"
              >
                {t.header.shopNow}
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartSlider />
    </>
  );
}
