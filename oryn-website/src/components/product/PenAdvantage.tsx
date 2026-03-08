"use client";

import type { ProductDetail } from "@/data/product-details";

const vialProblems = [
  { label: "Reconstitution required", detail: "Bacteriostatic water, syringe, precise mixing" },
  { label: "Dosing variability", detail: "Syringe markings can vary 10-20%" },
  { label: "Contamination risk", detail: "Rubber stopper punctured multiple times" },
  { label: "Rapid degradation", detail: "Potency drops after reconstitution" },
  { label: "Complex setup", detail: "5-10 minutes per preparation" },
  { label: "Travel impractical", detail: "Vials, syringes, water, needles..." },
];

export function PenAdvantage({ detail }: { detail: ProductDetail }) {
  return (
    <section className="py-16 bg-oryn-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            WHY CHOOSE THE PEN
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            {detail.penAdvantage.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Vial Problems */}
          <div className="bg-white/5 border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-red-500/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-sm font-bold tracking-[0.1em] text-white/60">
                TRADITIONAL VIALS
              </h3>
            </div>
            <ul className="space-y-4">
              {vialProblems.map((problem) => (
                <li key={problem.label} className="flex items-start gap-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="shrink-0 mt-0.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <div>
                    <span className="text-xs font-medium text-white/80">{problem.label}</span>
                    <p className="text-[10px] text-white/30 font-plex mt-0.5">{problem.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pen Advantages */}
          <div className="bg-oryn-orange/10 border border-oryn-orange/30 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-oryn-orange flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-sm font-bold tracking-[0.1em] text-oryn-orange">
                ORYN PEN SYSTEM
              </h3>
            </div>
            <ul className="space-y-5">
              {detail.penAdvantage.points.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <div>
                    <span className="text-xs font-medium text-white">{point.title}</span>
                    <p className="text-[10px] text-white/40 font-plex mt-0.5 leading-relaxed">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom comparison bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {[
            { vial: "5-10 min", pen: "30 sec", label: "Prep Time" },
            { vial: "~80%", pen: ">99%", label: "Dose Accuracy" },
            { vial: "Decreasing", pen: "Maintained", label: "Sterility" },
            { vial: "7-14 days", pen: "30 days", label: "Stability" },
          ].map((item) => (
            <div key={item.label} className="bg-oryn-black p-5 text-center">
              <p className="text-[9px] font-mono text-white/30 tracking-[0.1em] mb-2">{item.label}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-[10px] text-red-400/60 line-through">{item.vial}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7" />
                </svg>
                <span className="text-xs font-bold text-oryn-orange">{item.pen}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
