"use client";

import { useLocale } from "@/i18n/LocaleContext";

export function TestimonialsSection() {
  const { t } = useLocale();

  return (
    <section className="py-24 bg-oryn-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              {t.testimonials.label}
            </span>
            <div className="w-8 h-px bg-oryn-orange" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t.testimonials.titleLine1}
            <span className="text-gradient-orange"> {t.testimonials.titleLine2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-oryn-grey/20">
          {t.testimonials.items.map((item, i) => (
            <div key={i} className="bg-white p-8 flex flex-col">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#FF6A1A" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-sm text-oryn-black/60 font-plex leading-relaxed flex-1 mb-6">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-oryn-grey/20">
                <div className="w-10 h-10 bg-oryn-orange/10 flex items-center justify-center text-oryn-orange font-bold text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-[10px] text-oryn-black/40 font-plex">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10 py-6">
          {t.testimonials.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-oryn-orange">{stat.value}</div>
              <div className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
