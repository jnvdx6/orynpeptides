"use client";

import { Link } from "@/components/ui/LocaleLink";
import type { Campaign } from "@/data/campaigns";
import { trackCTAClick } from "@/lib/analytics";

export function CampaignHero({ campaign }: { campaign: Campaign }) {
  const { theme } = campaign;

  return (
    <section
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      style={{ background: theme.heroGradient }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative molecular circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-white/5 opacity-30" />
      <div className="absolute bottom-10 left-20 w-96 h-96 rounded-full border border-white/5 opacity-20" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, ${theme.accentColor}33 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24 w-full">
        <div className="max-w-3xl">
          {/* Campaign subtitle tag */}
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ backgroundColor: theme.accentColor }} />
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase"
              style={{ color: theme.accentColor }}
            >
              {campaign.subtitle}
            </span>
          </div>

          {/* Campaign name */}
          <h1 className={`${theme.heroTextColor} mb-4`}>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9]">
              {campaign.name}
            </span>
          </h1>

          {/* Tagline */}
          <p className={`text-xl sm:text-2xl md:text-3xl font-light ${theme.heroSubtextColor} mb-6 tracking-wide`}>
            {campaign.tagline}
          </p>

          <div className="w-16 h-px mb-6" style={{ backgroundColor: `${theme.accentColor}66` }} />

          {/* Description */}
          <p className="text-sm sm:text-base text-white/50 font-plex max-w-xl mb-8 leading-relaxed">
            {campaign.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mb-10">
            <a
              href="#products"
              onClick={() => trackCTAClick("campaign_shop_products", `campaign_hero_${campaign.slug}`)}
              className="group/btn px-8 py-4 font-semibold text-xs tracking-[0.15em] flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: theme.accentColor,
                color: "#fff",
              }}
            >
              SHOP THE COLLECTION
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover/btn:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#bundles"
              onClick={() => trackCTAClick("campaign_view_bundles", `campaign_hero_${campaign.slug}`)}
              className="px-8 py-4 text-white border border-white/20 font-medium text-xs tracking-[0.15em] hover:bg-white/5 hover:border-white/40 transition-all text-center"
            >
              VIEW BUNDLES & SAVINGS
            </a>
          </div>

          {/* Offers row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {campaign.offers.map((offer) => (
              <div
                key={offer.label}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm"
              >
                <OfferIcon type={offer.icon} color={theme.accentColor} />
                <span className="text-[9px] font-mono text-white/70 tracking-[0.1em] whitespace-nowrap">
                  {offer.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OfferIcon({ type, color }: { type: string; color: string }) {
  const paths: Record<string, string> = {
    shipping:
      "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10 M17 16V8h-4v8",
    discount:
      "M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z",
    gift: "M20 12v10H4V12 M2 7h20v5H2V7z M12 22V7 M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
  };

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      className="shrink-0"
    >
      <path d={paths[type] || paths.discount} />
    </svg>
  );
}
