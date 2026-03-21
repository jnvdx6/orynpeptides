"use client";

import { useState } from "react";
import type { Campaign } from "@/data/campaigns";
import { trackCampaignPromoCopied } from "@/lib/analytics";

export function CampaignPromo({ campaign }: { campaign: Campaign }) {
  const { theme, promos } = campaign;

  if (promos.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {promos.map((promo) => (
            <PromoCard
              key={promo.code}
              code={promo.code}
              description={promo.description}
              campaignSlug={campaign.slug}
              accentColor={theme.accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoCard({
  code,
  description,
  campaignSlug,
  accentColor,
}: {
  code: string;
  description: string;
  campaignSlug: string;
  accentColor: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      trackCampaignPromoCopied(code, campaignSlug);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      trackCampaignPromoCopied(code, campaignSlug);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="relative border-2 border-dashed p-6 sm:p-8 text-center"
      style={{ borderColor: `${accentColor}40` }}
    >
      {/* Decorative corners */}
      <div
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2"
        style={{ borderColor: accentColor }}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2"
        style={{ borderColor: accentColor }}
      />

      <p className="text-[10px] font-mono tracking-[0.2em] text-oryn-black/40 mb-3 uppercase">
        USE CODE AT CHECKOUT
      </p>

      <div className="flex items-center justify-center gap-4 mb-3">
        <span
          className="text-3xl sm:text-4xl font-bold font-mono tracking-[0.1em]"
          style={{ color: accentColor }}
        >
          {code}
        </span>
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-[10px] font-bold tracking-wider transition-all"
          style={{
            backgroundColor: copied ? accentColor : `${accentColor}15`,
            color: copied ? "#fff" : accentColor,
          }}
        >
          {copied ? "COPIED!" : "COPY"}
        </button>
      </div>

      <p className="text-sm text-oryn-black/50 font-plex">{description}</p>
    </div>
  );
}
