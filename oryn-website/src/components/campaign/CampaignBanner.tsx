"use client";

import { Link } from "@/components/ui/LocaleLink";
import { getActiveCampaign } from "@/data/campaigns";
import { trackCTAClick } from "@/lib/analytics";

/**
 * Campaign awareness banner for the homepage.
 * Shows the active or upcoming campaign with a CTA to the landing page.
 */
export function CampaignBanner() {
  const campaign = getActiveCampaign();
  if (!campaign) return null;

  const { theme } = campaign;
  const now = new Date().toISOString().split("T")[0];
  const isActive = now >= campaign.startDate && now <= campaign.endDate;
  const statusLabel = isActive ? "NOW LIVE" : "COMING SOON";

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: theme.heroGradient }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: campaign info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-2 py-0.5 text-[9px] font-bold tracking-[0.15em]"
                style={{
                  backgroundColor: theme.accentColor,
                  color: "#fff",
                }}
              >
                {statusLabel}
              </span>
              <span className="text-[10px] font-mono text-white/50 tracking-[0.15em]">
                {campaign.subtitle.toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              {campaign.name}
            </h2>
            <p className="text-sm text-white/50 font-plex max-w-md">
              {campaign.tagline}
            </p>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {campaign.promos[0] && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-[9px] font-mono text-white/60 tracking-wider">CODE:</span>
                <span
                  className="text-sm font-bold font-mono"
                  style={{ color: theme.accentColor }}
                >
                  {campaign.promos[0].code}
                </span>
              </div>
            )}
            <Link
              href={`/${campaign.slug}`}
              onClick={() =>
                trackCTAClick("homepage_campaign_banner", `campaign_banner_${campaign.slug}`)
              }
              className="px-6 py-3 font-semibold text-[10px] tracking-[0.15em] text-center transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: theme.accentColor,
                color: "#fff",
              }}
            >
              EXPLORE CAMPAIGN
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
