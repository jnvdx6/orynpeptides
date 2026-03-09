"use client";

import { useState, useEffect } from "react";
import { FIRST_VISIT_KEY } from "@/lib/discounts";
import { Link } from "@/components/ui/LocaleLink";

export function FirstVisitPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show only on first visit ever
    if (localStorage.getItem(FIRST_VISIT_KEY)) return;

    const timer = setTimeout(() => {
      setShow(true);
      localStorage.setItem(FIRST_VISIT_KEY, "1");
    }, 8000); // Show after 8 seconds of browsing

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      <div className="relative bg-white max-w-lg w-full shadow-2xl overflow-hidden">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 p-1 text-oryn-black/30 hover:text-oryn-black transition-colors z-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Top orange accent */}
        <div className="h-1 bg-oryn-orange" />

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left visual */}
          <div className="bg-oryn-black p-8 flex flex-col items-center justify-center text-center">
            <span className="text-6xl font-bold text-oryn-orange mb-2">10%</span>
            <span className="text-[10px] font-mono text-white/60 tracking-[0.3em]">DISCOUNT</span>
            <div className="w-8 h-px bg-oryn-orange my-4" />
            <span className="text-[9px] font-mono text-white/40 tracking-[0.15em]">
              YOUR FIRST ORDER
            </span>
            <div className="mt-6 px-4 py-2 border border-oryn-orange/30">
              <span className="text-sm font-mono text-oryn-orange tracking-[0.2em]">WELCOME10</span>
            </div>
          </div>

          {/* Right content */}
          <div className="p-8">
            <span className="text-[9px] font-mono text-oryn-orange tracking-[0.2em]">
              WELCOME TO ORYN
            </span>
            <h3 className="text-xl font-bold mt-2 mb-3">
              Precision Peptide Science
            </h3>
            <p className="text-xs text-oryn-black/40 font-plex mb-6 leading-relaxed">
              European biotech lab delivering &gt;99% purity research peptides in precision pen systems. Use code WELCOME10 on your first order.
            </p>

            <div className="space-y-2 mb-6">
              {[
                "Free shipping over \u20AC150",
                "GMP certified manufacturing",
                "Certificate of Analysis included",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span className="text-[10px] text-oryn-black/50 font-plex">{benefit}</span>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              onClick={() => setShow(false)}
              className="block w-full py-3 bg-oryn-orange text-white text-center text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
            >
              SHOP NOW
            </Link>

            <button
              onClick={() => setShow(false)}
              className="block w-full mt-2 py-2 text-[10px] text-oryn-black/30 font-plex hover:text-oryn-black/50 transition-colors text-center"
            >
              No thanks, I&apos;ll browse on my own
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
