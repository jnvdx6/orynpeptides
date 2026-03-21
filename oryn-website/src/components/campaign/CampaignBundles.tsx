"use client";

import Image from "next/image";
import { Link } from "@/components/ui/LocaleLink";
import { useProducts } from "@/providers/products";
import { useLocale } from "@/i18n/LocaleContext";
import { trackCTAClick } from "@/lib/analytics";
import type { Campaign, CampaignBundle } from "@/data/campaigns";
import { productImages } from "@/data/products";

export function CampaignBundles({ campaign }: { campaign: Campaign }) {
  const { products } = useProducts();
  const { formatPrice } = useLocale();
  const { theme } = campaign;

  return (
    <section id="bundles" className={`py-16 sm:py-20 ${theme.sectionBg}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ backgroundColor: `${theme.accentColor}66` }} />
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase"
              style={{ color: theme.accentColor }}
            >
              ENHANCED SAVINGS
            </span>
            <div className="w-8 h-px" style={{ backgroundColor: `${theme.accentColor}66` }} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-oryn-black tracking-tight mb-3">
            Campaign Bundles
          </h2>
          <p className="text-sm text-oryn-black/50 font-plex max-w-lg mx-auto">
            Save more with our curated stacks — enhanced discounts available during this campaign only.
          </p>
        </div>

        {/* Bundles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaign.bundles.map((bundle) => (
            <BundleCard
              key={bundle.slug}
              bundle={bundle}
              campaign={campaign}
              products={products}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BundleCard({
  bundle,
  campaign,
  products,
  formatPrice,
}: {
  bundle: CampaignBundle;
  campaign: Campaign;
  products: Array<{ slug: string; name: string; price: number; image: string }>;
  formatPrice: (v: number) => string;
}) {
  const { theme } = campaign;
  const bundleProducts = bundle.productSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as typeof products;

  const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const campaignPrice = totalPrice * (1 - bundle.discountPercent / 100);
  const savings = totalPrice - campaignPrice;
  const extraSavings = bundle.discountPercent - bundle.standardDiscountPercent;

  return (
    <div className="bg-white border border-oryn-orange/10 overflow-hidden hover:border-oryn-orange/30 transition-colors group">
      {/* Savings badge */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ backgroundColor: theme.accentColor }}
      >
        <span className="text-xs font-bold text-white tracking-wider">
          {bundle.discountPercent}% OFF
        </span>
        {extraSavings > 0 && (
          <span className="text-[9px] font-mono text-white/80 tracking-wider">
            +{extraSavings}% EXTRA vs STANDARD
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Bundle name */}
        <h3 className="text-lg font-bold text-oryn-black mb-3">{bundle.name}</h3>

        {/* Product thumbnails */}
        <div className="flex items-center gap-3 mb-4">
          {bundleProducts.map((p) => (
            <div
              key={p.slug}
              className="w-14 h-14 bg-oryn-cream rounded-sm flex items-center justify-center p-1 border border-oryn-orange/5"
            >
              <Image
                src={productImages.bySlug[p.slug] || p.image}
                alt={p.name}
                width={48}
                height={36}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Product names */}
        <div className="mb-4">
          {bundleProducts.map((p, i) => (
            <span key={p.slug} className="text-xs text-oryn-black/50 font-plex">
              {p.name}
              {i < bundleProducts.length - 1 && " + "}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-end gap-3 mb-5">
          <span className="text-2xl font-bold text-oryn-black">
            {formatPrice(campaignPrice)}
          </span>
          <span className="text-sm text-oryn-black/30 line-through font-plex">
            {formatPrice(totalPrice)}
          </span>
          <span
            className="text-xs font-bold ml-auto px-2 py-0.5"
            style={{
              backgroundColor: `${theme.accentColor}15`,
              color: theme.accentColor,
            }}
          >
            SAVE {formatPrice(savings)}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/bundles/${bundle.slug}`}
          onClick={() =>
            trackCTAClick(
              `campaign_bundle_${bundle.slug}`,
              `campaign_bundles_${campaign.slug}`
            )
          }
          className="block w-full text-center px-6 py-3 bg-oryn-grey-dark text-white text-[10px] font-bold tracking-[0.15em] hover:bg-oryn-black transition-colors"
        >
          VIEW BUNDLE
        </Link>
      </div>
    </div>
  );
}
