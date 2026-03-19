"use client";

import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

export function HowItWorksSection() {
  const { t } = useLocale();

  const steps = [
    {
      number: "01",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
    },
    {
      number: "02",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      ),
    },
    {
      number: "03",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      number: "04",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, #FF6A1A 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              {t.howItWorks.label}
            </span>
            <div className="w-8 h-px bg-oryn-orange" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight">
            {t.howItWorks.titleLine1}
            <span className="text-gradient-orange"> {t.howItWorks.titleLine2}</span>
          </h2>
          <p className="text-sm text-oryn-black/60 font-plex mt-4 max-w-lg mx-auto">
            {t.howItWorks.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-px bg-oryn-grey/10">
          {t.howItWorks.steps.map((step, i) => (
            <div key={i} className="relative group bg-white">
              {/* Connector line */}
              {i < 3 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] right-0 h-px bg-oryn-orange/20 z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-oryn-orange/30 rotate-45" />
                </div>
              )}

              <div className="p-4 sm:p-8 text-center relative z-10">
                {/* Step number */}
                <div className="text-[10px] font-mono text-oryn-orange/40 tracking-[0.2em] mb-3">
                  {steps[i].number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-oryn-orange/5 border border-oryn-orange/10 flex items-center justify-center mx-auto mb-5 text-oryn-orange group-hover:bg-oryn-orange group-hover:text-white group-hover:border-oryn-orange transition-all duration-300">
                  {steps[i].icon}
                </div>

                <h3 className="text-sm font-bold mb-2 tracking-wide">{step.title}</h3>
                <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
          >
            {t.howItWorks.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
