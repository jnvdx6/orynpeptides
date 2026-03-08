"use client";

import type { ProductDetail } from "@/data/product-details";

export function DosingGuide({ detail }: { detail: ProductDetail }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            DOSING PROTOCOL
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            How to Use Your ORYN Pen
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Reference Card */}
          <div className="bg-oryn-orange/5 border border-oryn-orange/15 p-6">
            <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-5">
              QUICK REFERENCE
            </h3>
            <div className="space-y-4">
              {[
                { label: "Recommended Dose", value: detail.dosing.recommendedDose },
                { label: "Frequency", value: detail.dosing.frequency },
                { label: "Duration", value: detail.dosing.duration },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-oryn-orange/10 last:border-0">
                  <span className="text-[9px] font-mono text-oryn-black/40 tracking-[0.1em]">
                    {item.label.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-oryn-orange">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div className="mt-6 pt-5 border-t border-oryn-orange/10">
              <h4 className="text-[9px] font-mono text-oryn-orange tracking-[0.15em] mb-3">
                PRO TIPS
              </h4>
              <ul className="space-y-2">
                {detail.dosing.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[8px] font-mono text-oryn-orange mt-0.5 shrink-0">*</span>
                    <span className="text-[10px] text-oryn-black/50 font-plex leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-step Instructions */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-6">
              STEP-BY-STEP INSTRUCTIONS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detail.dosing.instructions.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 bg-oryn-cream/50 border border-oryn-grey/10 hover:border-oryn-orange/20 transition-colors"
                >
                  <div className="w-8 h-8 bg-oryn-orange text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-xs text-oryn-black/60 font-plex leading-relaxed pt-1.5">{step}</p>
                </div>
              ))}
            </div>

            {/* Safety note */}
            <div className="mt-6 p-4 bg-oryn-orange/5 border border-oryn-orange/10 flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <span className="text-[9px] font-mono text-oryn-orange tracking-[0.1em]">IMPORTANT</span>
                <p className="text-[10px] text-oryn-black/40 font-plex mt-1">
                  Always use a new sterile needle for each administration. Dispose of used needles in an appropriate sharps container. Store pen refrigerated at 2-8°C.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
