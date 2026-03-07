"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLocale();
  const c = t.contactPage;

  return (
    <div className="pt-[calc(1rem+4px)]">
      <section className="py-24 bg-oryn-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-30" />
        <div className="absolute -right-20 -top-20 w-96 h-96 border border-white/5" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.1em] mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">{t.productDetail.home}</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/60">{t.nav.contact.toUpperCase()}</span>
          </nav>
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-white/40" />
            <span className="text-xs font-mono text-white/70 tracking-widest">
              {c.tagline}
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {c.heroTitle}
          </h1>
          <p className="text-white/70 font-plex max-w-lg text-lg">
            {c.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-24 bg-oryn-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-8">{c.companyName}</h2>

              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-mono text-oryn-orange tracking-widest block mb-2">
                    {c.emailLabel}
                  </span>
                  <a
                    href="mailto:info@orynlabs.com"
                    className="text-lg font-medium hover:text-oryn-orange transition-colors"
                  >
                    info@orynlabs.com
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-oryn-orange tracking-widest block mb-2">
                    {c.wholesaleLabel}
                  </span>
                  <a
                    href="mailto:wholesale@orynlabs.com"
                    className="text-lg font-medium hover:text-oryn-orange transition-colors"
                  >
                    wholesale@orynlabs.com
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-oryn-orange tracking-widest block mb-2">
                    {c.locationLabel}
                  </span>
                  <p className="text-oryn-black/60 font-plex">
                    {c.locationLine1}<br />
                    {c.locationLine2}
                  </p>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                {c.infoBoxes.map((box) => (
                  <div key={box.title} className="p-6 bg-oryn-orange/5 border border-oryn-orange/10">
                    <h3 className="text-sm font-bold mb-2 text-oryn-orange">{box.title}</h3>
                    <p className="text-xs text-oryn-black/50 font-plex leading-relaxed">
                      {box.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-oryn-cream p-8 border border-oryn-orange/10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 bg-oryn-orange flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{c.messageSent}</h3>
                  <p className="text-sm text-oryn-black/50 font-plex">
                    {c.messageSentDescription}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold mb-2">{c.formTitle}</h3>
                  <p className="text-sm text-oryn-black/50 font-plex mb-8">
                    {c.formDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-oryn-orange tracking-wider mb-2">
                        {c.firstName}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-oryn-orange/15 text-sm focus:outline-none focus:border-oryn-orange focus:ring-2 focus:ring-oryn-orange/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-oryn-orange tracking-wider mb-2">
                        {c.lastName}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-oryn-orange/15 text-sm focus:outline-none focus:border-oryn-orange focus:ring-2 focus:ring-oryn-orange/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-oryn-orange tracking-wider mb-2">
                      {c.email}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white border border-oryn-orange/15 text-sm focus:outline-none focus:border-oryn-orange focus:ring-2 focus:ring-oryn-orange/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-oryn-orange tracking-wider mb-2">
                      {c.organization}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-oryn-orange/15 text-sm focus:outline-none focus:border-oryn-orange focus:ring-2 focus:ring-oryn-orange/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-oryn-orange tracking-wider mb-2">
                      {c.inquiryType}
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-oryn-orange/15 text-sm focus:outline-none focus:border-oryn-orange transition-all text-oryn-black/60"
                    >
                      {c.inquiryOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-oryn-orange tracking-wider mb-2">
                      {c.message}
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-oryn-orange/15 text-sm focus:outline-none focus:border-oryn-orange focus:ring-2 focus:ring-oryn-orange/10 transition-all resize-none"
                      placeholder={c.messagePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-oryn-orange text-white font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-colors shadow-lg shadow-oryn-orange/20"
                  >
                    {c.sendMessage}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 bg-oryn-cream border-t border-oryn-orange/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: t.showcase.trustShipping },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: t.showcase.trustPurity },
              { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: t.showcase.trustCOA },
              { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: t.showcase.trustReturn },
            ].map((trust) => (
              <div key={trust.label} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
                  <path d={trust.icon} />
                </svg>
                <span className="text-[10px] font-mono text-oryn-black/40 tracking-[0.1em]">{trust.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
