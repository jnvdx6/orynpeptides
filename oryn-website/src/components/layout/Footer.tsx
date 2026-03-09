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
      { href: "/learn", label: "Research Hub" },
      { href: "/contact", label: f.companyLinks.contact },
    ],
    [f.sections.legal]: [
      { href: "/terms", label: f.legalLinks.terms },
      { href: "/privacy", label: f.legalLinks.privacy },
      { href: "/disclaimer", label: f.legalLinks.disclaimer },
    ],
  };

  const categoryLinks = [
    { href: "/peptides-for/recovery", label: "Recovery & Healing" },
    { href: "/peptides-for/weight-loss", label: "Weight Loss" },
    { href: "/peptides-for/anti-aging", label: "Anti-Aging" },
    { href: "/peptides-for/muscle-growth", label: "Muscle Growth" },
    { href: "/peptides-for/skin-rejuvenation", label: "Skin Rejuvenation" },
  ];

  const cityLinks = [
    { href: "/peptides/london", label: "London" },
    { href: "/peptides/manchester", label: "Manchester" },
    { href: "/peptides/birmingham", label: "Birmingham" },
    { href: "/peptides/edinburgh", label: "Edinburgh" },
    { href: "/peptides/glasgow", label: "Glasgow" },
    { href: "/peptides/leeds", label: "Leeds" },
    { href: "/peptides/bristol", label: "Bristol" },
    { href: "/peptides/liverpool", label: "Liverpool" },
    { href: "/peptides/cambridge", label: "Cambridge" },
    { href: "/peptides/oxford", label: "Oxford" },
    { href: "/peptides/cardiff", label: "Cardiff" },
    { href: "/peptides/newcastle", label: "Newcastle" },
    { href: "/peptides/brighton", label: "Brighton" },
    { href: "/peptides/sheffield", label: "Sheffield" },
    { href: "/peptides/nottingham", label: "Nottingham" },
    { href: "/peptides/belfast", label: "Belfast" },
    { href: "/peptides/southampton", label: "Southampton" },
    { href: "/peptides/york", label: "York" },
    { href: "/peptides/reading", label: "Reading" },
    { href: "/peptides/aberdeen", label: "Aberdeen" },
    { href: "/peptides/leicester", label: "Leicester" },
    { href: "/peptides/coventry", label: "Coventry" },
    { href: "/peptides/hull", label: "Hull" },
    { href: "/peptides/stoke-on-trent", label: "Stoke-on-Trent" },
    { href: "/peptides/plymouth", label: "Plymouth" },
    { href: "/peptides/derby", label: "Derby" },
    { href: "/peptides/swansea", label: "Swansea" },
    { href: "/peptides/exeter", label: "Exeter" },
    { href: "/peptides/bath", label: "Bath" },
    { href: "/peptides/dundee", label: "Dundee" },
    { href: "/peptides/bournemouth", label: "Bournemouth" },
    { href: "/peptides/norwich", label: "Norwich" },
    { href: "/peptides/ipswich", label: "Ipswich" },
    { href: "/peptides/milton-keynes", label: "Milton Keynes" },
    { href: "/peptides/cheltenham", label: "Cheltenham" },
  ];

  const learnLinks = [
    { href: "/learn/are-peptides-legal-in-the-uk", label: "Are Peptides Legal in the UK?" },
    { href: "/learn/peptide-pen-vs-vial", label: "Peptide Pen vs Vial" },
    { href: "/learn/bpc-157-complete-guide", label: "BPC-157 Complete Guide" },
    { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
    { href: "/learn/how-to-use-peptide-pen", label: "How to Use a Peptide Pen" },
    { href: "/learn/best-peptides-for-recovery-uk", label: "Best Peptides for Recovery UK" },
    { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
    { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
    { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
    { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutathione" },
    { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "NAD+ Pen vs IV Therapy" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store subscriber emails locally
      try {
        const existing = JSON.parse(localStorage.getItem("oryn_newsletter_emails") || "[]");
        if (!existing.includes(email)) {
          existing.push(email);
          localStorage.setItem("oryn_newsletter_emails", JSON.stringify(existing));
        }
      } catch {
        // ignore
      }
      setSubscribed(true);
    }
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

      {/* SEO: Research Areas */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Research Areas */}
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-4">
                RESEARCH AREAS
              </h4>
              <ul className="space-y-2">
                {categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-oryn-white/25 hover:text-oryn-orange transition-colors font-plex">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-4">
                LEARN
              </h4>
              <ul className="space-y-2">
                {learnLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-oryn-white/25 hover:text-oryn-orange transition-colors font-plex">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* UK Delivery */}
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-4">
                <Link href="/peptides" className="hover:text-white transition-colors">
                  UK DELIVERY
                </Link>
              </h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {cityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[10px] text-oryn-white/20 hover:text-oryn-orange transition-colors font-plex"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Security */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "SSL ENCRYPTED" },
              { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "SECURE PAYMENTS" },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "COA INCLUDED" },
              { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: "30-DAY GUARANTEE" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
                  <path d={item.icon} />
                </svg>
                <span className="text-[9px] font-mono text-white/30 tracking-[0.1em]">{item.label}</span>
              </div>
            ))}
          </div>
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
