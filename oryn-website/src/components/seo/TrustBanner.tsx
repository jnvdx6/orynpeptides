"use client";

import { useLocale } from "@/i18n/LocaleContext";

const TRUST_LABELS: Record<string, { gmp: string; purity: string; tested: string; cleanroom: string; manufactured: string }> = {
  en: { gmp: "GMP Certified", purity: ">99% Purity", tested: "3rd Party Tested", cleanroom: "ISO 7 Cleanroom", manufactured: "Manufactured in South Korea" },
  es: { gmp: "Certificado GMP", purity: "Pureza >99%", tested: "Testado por Terceros", cleanroom: "Sala Limpia ISO 7", manufactured: "Fabricado en Corea del Sur" },
  fr: { gmp: "Certifié GMP", purity: "Pureté >99%", tested: "Testé par des Tiers", cleanroom: "Salle Blanche ISO 7", manufactured: "Fabriqué en Corée du Sud" },
  de: { gmp: "GMP-Zertifiziert", purity: "Reinheit >99%", tested: "Drittanbieter-Getestet", cleanroom: "ISO 7 Reinraum", manufactured: "Hergestellt in Südkorea" },
  it: { gmp: "Certificato GMP", purity: "Purezza >99%", tested: "Testato da Terze Parti", cleanroom: "Camera Bianca ISO 7", manufactured: "Prodotto in Corea del Sud" },
  pt: { gmp: "Certificado GMP", purity: "Pureza >99%", tested: "Testado por Terceiros", cleanroom: "Sala Limpa ISO 7", manufactured: "Fabricado na Coreia do Sul" },
  "pt-br": { gmp: "Certificado GMP", purity: "Pureza >99%", tested: "Testado por Terceiros", cleanroom: "Sala Limpa ISO 7", manufactured: "Fabricado na Coreia do Sul" },
  nl: { gmp: "GMP-Gecertificeerd", purity: "Zuiverheid >99%", tested: "Door Derden Getest", cleanroom: "ISO 7 Cleanroom", manufactured: "Gefabriceerd in Zuid-Korea" },
  pl: { gmp: "Certyfikat GMP", purity: "Czystość >99%", tested: "Testowane przez Strony Trzecie", cleanroom: "Cleanroom ISO 7", manufactured: "Wyprodukowano w Korei Południowej" },
};

export function TrustBanner() {
  const { locale } = useLocale();
  const labels = TRUST_LABELS[locale] || TRUST_LABELS.en;

  return (
    <section className="bg-oryn-cream border-y border-oryn-orange/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {/* GMP Certified */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">{labels.gmp}</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-oryn-orange/20" />

          {/* >99% Purity */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">{labels.purity}</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-oryn-orange/20" />

          {/* 3rd Party Tested */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              <path d="M9 14l2 2 4-4" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">{labels.tested}</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-oryn-orange/20" />

          {/* ISO 7 Cleanroom */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
              <path d="M3 21h18" />
              <path d="M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">{labels.cleanroom}</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-oryn-orange/20" />

          {/* Manufactured in South Korea */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">{labels.manufactured}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
