"use client";

import { useState } from "react";
import type { ProductDetail } from "@/data/product-details";
import { useLocale } from "@/i18n/LocaleContext";

export function ProductFAQ({ detail, productName }: { detail: ProductDetail; productName: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLocale();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            {t.productDetail.faqLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            {t.productDetail.frequentlyAsked} {productName}
          </h2>
        </div>

        <div className="space-y-2">
          {detail.faq.map((item, i) => (
            <div
              key={i}
              className={`border transition-colors ${
                openIndex === i ? "border-oryn-orange/30 bg-oryn-orange/[0.02]" : "border-oryn-grey/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium pr-4">{item.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={openIndex === i ? "#FF6A1A" : "#999"}
                  strokeWidth="2"
                  className={`shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5">
                  <div className="h-px bg-oryn-orange/10 mb-4" />
                  <p className="text-xs text-oryn-black/50 font-plex leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
