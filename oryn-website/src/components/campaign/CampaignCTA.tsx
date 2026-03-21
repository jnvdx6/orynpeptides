"use client";

import { Link } from "@/components/ui/LocaleLink";
import type { Campaign } from "@/data/campaigns";
import { trackCTAClick } from "@/lib/analytics";

export function CampaignCTA({ campaign }: { campaign: Campaign }) {
  const { theme } = campaign;

  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: theme.heroGradient }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          {campaign.tagline}
        </h2>
        <p className="text-sm sm:text-base text-white/60 font-plex mb-8 max-w-xl mx-auto">
          {campaign.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/products"
            onClick={() =>
              trackCTAClick("campaign_cta_shop", `campaign_cta_${campaign.slug}`)
            }
            className="px-8 py-4 font-semibold text-xs tracking-[0.15em] flex items-center gap-2 shadow-lg transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: theme.accentColor,
              color: "#fff",
            }}
          >
            SHOP ALL PRODUCTS
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/bundles"
            onClick={() =>
              trackCTAClick("campaign_cta_bundles", `campaign_cta_${campaign.slug}`)
            }
            className="px-8 py-4 text-white border border-white/20 font-medium text-xs tracking-[0.15em] hover:bg-white/5 hover:border-white/40 transition-all"
          >
            EXPLORE ALL BUNDLES
          </Link>
        </div>
      </div>
    </section>
  );
}
