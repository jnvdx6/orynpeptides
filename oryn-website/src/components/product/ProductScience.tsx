"use client";

import type { ProductDetail } from "@/data/product-details";
import { useLocale } from "@/i18n/LocaleContext";

export function ProductScience({ detail, productName }: { detail: ProductDetail; productName: string }) {
  const { t } = useLocale();

  return (
    <section className="py-16 bg-oryn-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            {t.productDetail.scienceLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            {t.productDetail.scienceBehind} {productName}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Classification & Specs */}
          <div className="space-y-6">
            <div className="bg-white border border-oryn-grey/15 p-6">
              <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">
                {t.productDetail.compoundProfile}
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">{t.productDetail.classificationLabel}</span>
                  <p className="text-xs font-medium mt-1">{detail.science.classification}</p>
                </div>
                {detail.science.molecularFormula && (
                  <div>
                    <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">{t.productDetail.molecularFormula}</span>
                    <p className="text-xs font-mono mt-1">{detail.science.molecularFormula}</p>
                  </div>
                )}
                {detail.science.molecularWeight && (
                  <div>
                    <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">{t.productDetail.molecularWeightLabel}</span>
                    <p className="text-xs font-mono mt-1">{detail.science.molecularWeight}</p>
                  </div>
                )}
                {detail.science.halfLife && (
                  <div>
                    <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">{t.productDetail.halfLifeLabel}</span>
                    <p className="text-xs mt-1">{detail.science.halfLife}</p>
                  </div>
                )}
                {detail.science.sequence && (
                  <div>
                    <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">{t.productDetail.sequenceLabel}</span>
                    <p className="text-[10px] font-mono mt-1 text-oryn-black/60 break-all">{detail.science.sequence}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Research Areas */}
            <div className="bg-white border border-oryn-grey/15 p-6">
              <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">
                {t.productDetail.researchAreasLabel}
              </h3>
              <div className="flex flex-wrap gap-2">
                {detail.science.researchAreas.map((area) => (
                  <span
                    key={area}
                    className="px-2.5 py-1 bg-oryn-orange/5 text-[9px] font-mono text-oryn-orange tracking-[0.05em] border border-oryn-orange/10"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Center & Right: Mechanism + Studies */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mechanism */}
            <div className="bg-white border border-oryn-grey/15 p-6">
              <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">
                {t.productDetail.mechanismOfAction}
              </h3>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed">
                {detail.science.mechanism}
              </p>
            </div>

            {/* Key Studies */}
            <div className="bg-white border border-oryn-grey/15 p-6">
              <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-5">
                {t.productDetail.keyResearchFindings}
              </h3>
              <div className="space-y-4">
                {detail.science.keyStudies.map((study) => (
                  <div key={study.title} className="flex items-start gap-4 p-4 bg-oryn-orange/[0.02] border border-oryn-orange/10">
                    <div className="w-1 h-full bg-oryn-orange shrink-0 self-stretch" />
                    <div>
                      <h4 className="text-xs font-bold mb-1">{study.title}</h4>
                      <p className="text-[10px] text-oryn-black/50 font-plex leading-relaxed">
                        {study.finding}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
