"use client";

import { useState } from "react";
import { OrynLogo } from "@/components/icons/OrynLogo";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

const certifications = [
  { label: "ISO CLASS 7", detail: "Cleanroom" },
  { label: "GMP", detail: "Certified" },
  { label: ">99%", detail: "Purity" },
  { label: "EU", detail: "Manufactured" },
];

export function Footer() {
  const { t } = useLocale();
  const f = t.footer;
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = {
    [f.sections.products]: [
      { href: "/products", label: f.productLinks.all },
      { href: "/products?category=peptide-pen", label: f.productLinks.pens },
      { href: "/products?category=medit-pen", label: f.productLinks.medit },
      { href: "/products?category=novadose", label: f.productLinks.novadose },
    ],
    [f.sections.company]: [
      { href: "/about", label: f.companyLinks.about },
      { href: "/science", label: f.companyLinks.science },
      { href: "/contact", label: f.companyLinks.contact },
    ],
    [f.sections.legal]: [
      { href: "/terms", label: f.legalLinks.terms },
      { href: "/privacy", label: f.legalLinks.privacy },
      { href: "/disclaimer", label: f.legalLinks.disclaimer },
    ],
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-oryn-black text-oryn-white">
      <div className="h-px bg-oryn-orange" />

      {/* Certifications bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {certifications.map((cert) => (
              <div key={cert.label} className="py-8 text-center">
                <div className="text-lg font-bold text-oryn-orange mb-1">{cert.label}</div>
                <div className="text-[9px] font-mono text-white/30 tracking-[0.2em]">
                  {cert.detail.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">{f.newsletterTitle}</h3>
              <p className="text-xs text-white/30 font-plex">{f.newsletterDescription}</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 px-6 py-3 bg-oryn-orange/10 border border-oryn-orange/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-oryn-orange font-medium">{f.newsletterSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={f.newsletterPlaceholder}
                  required
                  className="px-4 py-3 bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-oryn-orange transition-colors w-full md:w-64 font-plex"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors shrink-0"
                >
                  {f.newsletterButton}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <OrynLogo size={120} color="#FAFAFA" />
            </div>
            <p className="text-xs text-oryn-white/30 font-plex leading-relaxed max-w-sm mb-8">
              {f.description}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <a
                href="#"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-oryn-orange hover:border-oryn-orange/30 transition-colors"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-oryn-orange hover:border-oryn-orange/30 transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-oryn-orange hover:border-oryn-orange/30 transition-colors"
                aria-label="Email"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22,4 12,13 2,4" />
                </svg>
              </a>
            </div>
            {/* Payment methods */}
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-mono text-white/20 tracking-[0.15em]">{f.paymentMethods}</span>
              {["VISA", "MC", "AMEX", "BTC", "ETH"].map((m) => (
                <span key={m} className="text-[9px] font-mono text-white/20 px-2 py-1 border border-white/5">{m}</span>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-6">
                {title.toUpperCase()}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-oryn-white/30 hover:text-oryn-orange transition-colors font-plex"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1 hidden lg:block" />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-oryn-white/20 font-mono tracking-wider">
            &copy; {new Date().getFullYear()} ORYN PEPTIDE LABS &mdash; ALL RIGHTS RESERVED
          </p>
          <p className="text-[10px] text-oryn-white/15 font-mono tracking-wider">
            {f.researchOnly}
          </p>
        </div>
      </div>
    </footer>
  );
}
