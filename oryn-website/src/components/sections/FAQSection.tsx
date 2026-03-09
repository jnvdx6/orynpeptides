"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "What are ORYN Peptide Pens?",
    a: "ORYN Peptide Pens are pre-mixed, ready-to-use research peptide delivery systems. Each pen contains pharmaceutical-grade peptides at >99% purity, manufactured in our ISO 7 cleanroom facility. The pen format eliminates the need for reconstitution, ensuring consistent dosing for research applications.",
  },
  {
    q: "Are peptides legal in the UK and Europe?",
    a: "Yes, research peptides are legal to purchase in the UK and across Europe for research purposes. ORYN Peptides are sold strictly for in-vitro research and laboratory use. They are not intended for human consumption.",
  },
  {
    q: "How are your peptides manufactured?",
    a: "All ORYN peptides are synthesised in our GMP-certified, ISO 7 cleanroom laboratory in Europe. Every batch undergoes rigorous HPLC and mass spectrometry testing to verify >99% purity. A Certificate of Analysis (COA) is included with every order.",
  },
  {
    q: "How long does delivery take?",
    a: "UK orders typically arrive within 2-4 business days. European orders take 3-7 business days depending on destination. All orders are shipped in discreet, temperature-controlled packaging. Orders over €150 qualify for free shipping.",
  },
  {
    q: "What is the ORYN Referral Programme?",
    a: "Our multi-level referral programme lets you earn 10% commission on purchases made by colleagues you refer. You also earn commissions up to 5 levels deep as your network grows. Sign up for a free account to get your unique referral code.",
  },
  {
    q: "Do you offer bulk or wholesale pricing?",
    a: "Yes, we offer volume discounts starting from 3+ units. The more you order, the bigger the discount — up to 15% off for large research orders. Contact us for custom wholesale pricing on bulk orders.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              FAQ
            </span>
            <div className="w-6 h-px bg-oryn-orange" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-oryn-grey/15">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-medium pr-8 group-hover:text-oryn-orange transition-colors">
                    {item.q}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`shrink-0 text-oryn-orange transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-48 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm text-oryn-black/50 font-plex leading-relaxed pr-12">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
