"use client";

import type { Campaign } from "@/data/campaigns";
import { usePageTracking } from "@/hooks/usePageTracking";
import { trackCampaignPageViewed } from "@/lib/analytics";
import { useEffect } from "react";
import { CampaignHero } from "./CampaignHero";
import { CampaignProducts } from "./CampaignProducts";
import { CampaignBundles } from "./CampaignBundles";
import { CampaignPromo } from "./CampaignPromo";
import { CampaignCTA } from "./CampaignCTA";

export function CampaignLandingPage({ campaign }: { campaign: Campaign }) {
  usePageTracking(`campaign_${campaign.slug}`);

  useEffect(() => {
    trackCampaignPageViewed(campaign.slug, campaign.name);
  }, [campaign.slug, campaign.name]);

  return (
    <>
      <CampaignHero campaign={campaign} />
      <CampaignProducts campaign={campaign} />
      <CampaignBundles campaign={campaign} />
      <CampaignPromo campaign={campaign} />
      <CampaignCTA campaign={campaign} />
    </>
  );
}
