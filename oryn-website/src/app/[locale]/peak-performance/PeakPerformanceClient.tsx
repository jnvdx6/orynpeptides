"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePageTracking } from "@/hooks/usePageTracking";
import { trackCTAClick, trackToolUsed } from "@/lib/analytics";
import { productImages, type Product } from "@/data/products";
import {
  PEAK_CAMPAIGN,
  TIRZEPATIDE_COMPARISON,
  NAD_COMPARISON,
  type ComparisonSpec,
  type CampaignBundle,
} from "@/data/campaign-peak-performance";

// ─── Types ──────────────────────────────────────────────────

interface BundleWithPricing extends CampaignBundle {
  products: Product[];
  totalPrice: number;
  discountedPrice: number;
}

interface Props {
  locale: string;
  heroProducts: Product[];
  bundleData: BundleWithPricing[];
}

// ─── Main Component ─────────────────────────────────────────

export function PeakPerformanceClient({ locale, heroProducts, bundleData }: Props) {
  usePageTracking("peak_performance_campaign", { campaign: "peak-performance" });

  return (
    <>
      <HeroSection locale={locale} />
      <PromoCodeBanner />
      <HeroProductsGrid products={heroProducts} locale={locale} />
      <ComparisonTool
        title={TIRZEPATIDE_COMPARISON.title}
        subtitle="Which tirzepatide format is right for your research?"
        slugA={TIRZEPATIDE_COMPARISON.slugA}
        slugB={TIRZEPATIDE_COMPARISON.slugB}
        specs={TIRZEPATIDE_COMPARISON.specs}
        locale={locale}
        id="tirzepatide-comparison"
      />
      <ComparisonTool
        title={NAD_COMPARISON.title}
        subtitle="Compare two NAD+ delivery systems for your protocol"
        slugA={NAD_COMPARISON.slugA}
        slugB={NAD_COMPARISON.slugB}
        specs={NAD_COMPARISON.specs}
        locale={locale}
        id="nad-comparison"
      />
      <BundleBuilder bundles={bundleData} locale={locale} />
      <FreeDeliverySection />
      <CampaignCTA locale={locale} />
    </>
  );
}

// ─── Hero Section (campaign theme: bold blues & oranges) ────

function HeroSection({ locale }: { locale: string }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-oryn-orange-dark text-white py-24 md:py-32 overflow-hidden">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(30deg, transparent 45%, rgba(255,106,26,0.3) 45%, rgba(255,106,26,0.3) 55%, transparent 55%), linear-gradient(150deg, transparent 45%, rgba(59,130,246,0.3) 45%, rgba(59,130,246,0.3) 55%, transparent 55%)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-10 h-[2px] bg-oryn-orange" />
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.3em]">
            PRE-SUMMER CAMPAIGN · MAY 15 – JUNE 30
          </span>
          <div className="w-10 h-[2px] bg-oryn-orange" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Peak
          <span className="text-oryn-orange"> Performance</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 font-plex max-w-2xl mx-auto mb-8">
          Engineer your peak with our most advanced metabolic, NAD+, and growth
          hormone peptides. Up to 15% off with code{" "}
          <span className="font-mono text-oryn-orange font-bold">PEAK26</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href={`/${locale}/products`}
            onClick={() => trackCTAClick("peak_hero_shop", "peak_hero")}
            className="px-8 py-4 bg-oryn-orange text-white font-semibold text-xs tracking-[0.15em] hover:bg-oryn-orange-dark transition-all"
          >
            SHOP CAMPAIGN PRODUCTS
          </Link>
          <a
            href="#tirzepatide-comparison"
            onClick={() => trackCTAClick("peak_hero_compare", "peak_hero")}
            className="px-8 py-4 border border-white/20 text-white font-medium text-xs tracking-[0.15em] hover:border-oryn-orange hover:text-oryn-orange transition-all"
          >
            COMPARE PRODUCTS
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: "6", label: "Hero Products" },
            { value: "4", label: "Curated Bundles" },
            { value: "15%", label: "Max Discount" },
            { value: "€400+", label: "Free Delivery" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-oryn-orange">{s.value}</div>
              <div className="text-[9px] font-mono text-white/40 tracking-[0.1em] mt-1">
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Promo Code Banner ──────────────────────────────────────

function PromoCodeBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PEAK_CAMPAIGN.promoCode);
    setCopied(true);
    trackCTAClick("peak_copy_promo", "promo_banner");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-oryn-black py-4 border-y border-oryn-orange/20">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <span className="text-xs text-white/60 font-plex">
          Use code
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-oryn-orange/10 border border-oryn-orange/30 hover:bg-oryn-orange/20 transition-colors"
        >
          <span className="font-mono text-sm font-bold text-oryn-orange tracking-[0.2em]">
            {PEAK_CAMPAIGN.promoCode}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={copied ? "#22c55e" : "#FF6A1A"}
            strokeWidth="2"
          >
            {copied ? (
              <path d="M20 6L9 17l-5-5" />
            ) : (
              <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            )}
          </svg>
        </button>
        <span className="text-xs text-white/60 font-plex">
          10% on 2 products · 15% on 3+
        </span>
      </div>
    </section>
  );
}

// ─── Hero Products Grid ─────────────────────────────────────

function HeroProductsGrid({ products, locale }: { products: Product[]; locale: string }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            CAMPAIGN PRODUCTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            Hero Products
          </h2>
          <p className="text-sm text-oryn-black/50 font-plex mt-3 max-w-lg mx-auto">
            Six advanced peptides selected for peak metabolic, cellular, and
            hormonal performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-oryn-grey/10">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/${locale}/products/${product.slug}`}
              onClick={() =>
                trackCTAClick(`peak_product_${product.slug}`, "hero_grid")
              }
              className="group bg-white p-6 hover:bg-oryn-cream/30 transition-colors"
            >
              <div className="flex items-center justify-center h-32 mb-4">
                <Image
                  src={productImages.bySlug[product.slug] || product.image}
                  alt={`ORYN ${product.name}`}
                  width={100}
                  height={100}
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[8px] font-mono text-oryn-orange tracking-[0.15em]">
                  {product.categoryLabel.toUpperCase()}
                </span>
                {product.badge && (
                  <span className="text-[7px] font-mono px-1.5 py-0.5 bg-oryn-orange/10 text-oryn-orange">
                    {product.badge.toUpperCase()}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-sm group-hover:text-oryn-orange transition-colors">
                {product.name}
              </h3>
              <p className="text-[10px] text-oryn-black/40 font-mono mt-0.5">
                {product.dosage} · {product.volume}
              </p>
              <p className="text-lg font-bold text-oryn-orange mt-2">
                €{product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Comparison Tool ────────────────────────────────

function ComparisonTool({
  title,
  subtitle,
  slugA,
  slugB,
  specs,
  locale,
  id,
}: {
  title: string;
  subtitle: string;
  slugA: string;
  slugB: string;
  specs: ComparisonSpec[];
  locale: string;
  id: string;
}) {
  const [highlightWinners, setHighlightWinners] = useState(true);
  const productA = useMemo(
    () =>
      ({
        slug: slugA,
        image: productImages.bySlug[slugA] || "",
      }),
    [slugA]
  );
  const productB = useMemo(
    () =>
      ({
        slug: slugB,
        image: productImages.bySlug[slugB] || "",
      }),
    [slugB]
  );

  const winsA = specs.filter((s) => s.winner === "A").length;
  const winsB = specs.filter((s) => s.winner === "B").length;
  const ties = specs.filter((s) => s.winner === "tie").length;

  return (
    <section id={id} className="py-20 bg-oryn-cream/50 border-t border-oryn-orange/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            COMPARISON TOOL
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-oryn-black/50 font-plex mt-2">
            {subtitle}
          </p>
        </div>

        {/* Product headers */}
        <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_auto_1fr] gap-4 mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white flex items-center justify-center mb-2">
              <Image
                src={productA.image}
                alt={slugA}
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <span className="text-xs font-bold">
              {slugA === "tirzepatide-pen" ? "Tirzepatide Pen" : "NAD+ Pen"}
            </span>
            <span className="text-[9px] font-mono text-green-600 mt-1">
              {winsA} wins
            </span>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-10 h-10 bg-oryn-black flex items-center justify-center">
              <span className="text-[9px] font-bold text-white tracking-widest">VS</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white flex items-center justify-center mb-2">
              <Image
                src={productB.image}
                alt={slugB}
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <span className="text-xs font-bold">
              {slugB === "medit-tirzepatide" ? "MediT Pen" : "NovaDose NAD+"}
            </span>
            <span className="text-[9px] font-mono text-green-600 mt-1">
              {winsB} wins
            </span>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              setHighlightWinners(!highlightWinners);
              trackToolUsed("peak_comparison_toggle", { comparison: id });
            }}
            className="text-[10px] font-mono text-oryn-black/40 hover:text-oryn-orange transition-colors tracking-[0.1em]"
          >
            {highlightWinners ? "HIDE" : "SHOW"} WINNERS · {ties} TIES
          </button>
        </div>

        {/* Comparison rows */}
        <div className="border border-oryn-grey/15 bg-white">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`grid grid-cols-[1fr_auto_1fr] items-stretch ${
                i > 0 ? "border-t border-oryn-grey/10" : ""
              }`}
            >
              <div
                className={`p-4 text-sm font-plex ${
                  highlightWinners && spec.winner === "A"
                    ? "bg-green-50 text-green-800"
                    : ""
                }`}
              >
                {spec.valueA}
              </div>
              <div className="px-3 py-4 flex items-center justify-center bg-oryn-cream/30 min-w-[100px]">
                <span className="text-[9px] font-mono text-oryn-black/40 tracking-[0.1em] text-center">
                  {spec.label.toUpperCase()}
                </span>
              </div>
              <div
                className={`p-4 text-sm font-plex text-right ${
                  highlightWinners && spec.winner === "B"
                    ? "bg-green-50 text-green-800"
                    : ""
                }`}
              >
                {spec.valueB}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Link
            href={`/${locale}/products/${slugA}`}
            onClick={() => trackCTAClick(`peak_compare_${slugA}`, id)}
            className="py-3 text-center bg-oryn-black text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange transition-colors"
          >
            VIEW {slugA === "tirzepatide-pen" ? "TIRZEPATIDE PEN" : "NAD+ PEN"}
          </Link>
          <Link
            href={`/${locale}/products/${slugB}`}
            onClick={() => trackCTAClick(`peak_compare_${slugB}`, id)}
            className="py-3 text-center bg-oryn-black text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange transition-colors"
          >
            VIEW {slugB === "medit-tirzepatide" ? "MEDIT PEN" : "NOVADOSE NAD+"}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Bundle Builder ─────────────────────────────────────────

function BundleBuilder({
  bundles,
  locale,
}: {
  bundles: BundleWithPricing[];
  locale: string;
}) {
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());

  const toggleBundle = (slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      trackToolUsed("peak_bundle_toggle", {
        bundle: slug,
        selected: !prev.has(slug),
      });
      return next;
    });
  };

  const selectedBundles = bundles.filter((b) => selectedSlugs.has(b.slug));
  const totalOriginal = selectedBundles.reduce((s, b) => s + b.totalPrice, 0);
  const totalDiscounted = selectedBundles.reduce((s, b) => s + b.discountedPrice, 0);
  const totalSaved = totalOriginal - totalDiscounted;
  const qualifiesForFreeDelivery =
    totalDiscounted >= PEAK_CAMPAIGN.freeDeliveryThreshold;

  return (
    <section className="py-20 bg-white border-t border-oryn-orange/10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            BUNDLE BUILDER
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 tracking-tight">
            Build Your Campaign Stack
          </h2>
          <p className="text-sm text-oryn-black/50 font-plex mt-2 max-w-lg mx-auto">
            Select bundles to build your research protocol. Campaign bundles
            include enhanced savings.
          </p>
        </div>

        {/* Bundle cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {bundles.map((bundle) => {
            const isSelected = selectedSlugs.has(bundle.slug);
            return (
              <button
                key={bundle.slug}
                onClick={() => toggleBundle(bundle.slug)}
                className={`text-left border p-5 transition-all ${
                  isSelected
                    ? "border-oryn-orange bg-oryn-orange/5 ring-1 ring-oryn-orange/20"
                    : "border-oryn-grey/15 hover:border-oryn-orange/30"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-mono text-oryn-orange tracking-[0.15em]">
                        {bundle.products.length} PEPTIDES
                      </span>
                      <span className="text-[8px] font-mono px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                        SAVE {bundle.discountPercent}%
                      </span>
                    </div>
                    <h3 className="font-bold text-sm">{bundle.name}</h3>
                    <p className="text-[10px] text-oryn-black/40 font-plex mt-0.5">
                      {bundle.tagline}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                      isSelected
                        ? "border-oryn-orange bg-oryn-orange"
                        : "border-oryn-grey/30"
                    }`}
                  >
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Product images */}
                <div className="flex items-center gap-3 mb-3">
                  {bundle.products.map((p) => (
                    <div
                      key={p.slug}
                      className="w-12 h-12 bg-oryn-cream/50 flex items-center justify-center"
                    >
                      <Image
                        src={productImages.bySlug[p.slug] || p.image}
                        alt={p.name}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-oryn-orange">
                    €{bundle.discountedPrice}
                  </span>
                  <span className="text-sm text-oryn-black/30 line-through">
                    €{bundle.totalPrice}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Summary bar */}
        {selectedBundles.length > 0 && (
          <div className="sticky bottom-0 z-20 bg-oryn-black text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div>
                <span className="text-[9px] font-mono text-white/40 tracking-[0.1em]">
                  {selectedBundles.length} BUNDLE{selectedBundles.length > 1 ? "S" : ""} SELECTED
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xl font-bold text-oryn-orange">
                    €{totalDiscounted}
                  </span>
                  <span className="text-sm text-white/30 line-through">
                    €{totalOriginal}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                    SAVE €{totalSaved}
                  </span>
                </div>
              </div>
              {qualifiesForFreeDelivery && (
                <div className="text-[9px] font-mono text-green-400 tracking-[0.1em] flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  FREE PRIORITY DELIVERY
                </div>
              )}
            </div>
            <Link
              href={`/${locale}/products`}
              onClick={() =>
                trackCTAClick("peak_bundle_shop", "bundle_builder")
              }
              className="px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors shrink-0"
            >
              SHOP SELECTED
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Free Delivery Threshold ────────────────────────────────

function FreeDeliverySection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white border-t border-blue-700/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Icon */}
          <div className="w-20 h-20 bg-white/10 flex items-center justify-center shrink-0">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF6A1A"
              strokeWidth="1.5"
            >
              <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
          </div>

          {/* Copy */}
          <div className="text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                CAMPAIGN EXCLUSIVE
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Free Priority Lab Delivery
            </h3>
            <p className="text-sm text-white/60 font-plex">
              Orders over{" "}
              <span className="text-oryn-orange font-bold">
                €{PEAK_CAMPAIGN.freeDeliveryThreshold}
              </span>{" "}
              qualify for complimentary priority delivery (€35 value).
              Cold-chain packaging, tracked shipment, next-day dispatch.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="text-center shrink-0">
            <div className="text-3xl font-bold text-oryn-orange">€{PEAK_CAMPAIGN.freeDeliveryThreshold}+</div>
            <div className="text-[9px] font-mono text-white/40 tracking-[0.1em] mt-1">
              THRESHOLD
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
          {[
            { label: "Cold-Chain", desc: "Temperature controlled" },
            { label: "Tracked", desc: "Full tracking included" },
            { label: "Next-Day", desc: "Dispatched same day" },
            { label: "€35 Value", desc: "Free with €400+ orders" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-xs font-bold text-white">{item.label}</div>
              <div className="text-[9px] text-white/40 font-plex mt-0.5">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Campaign CTA ───────────────────────────────────────────

function CampaignCTA({ locale }: { locale: string }) {
  return (
    <section className="py-20 bg-oryn-orange text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-[10px] font-mono text-white/60 tracking-[0.25em]">
          LIMITED TIME
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
          Engineer Your Peak Performance
        </h2>
        <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
          Use code{" "}
          <span className="font-mono font-bold text-white">PEAK26</span> at
          checkout. 10% off 2 products, 15% off 3 or more. Campaign runs May
          15 – June 30, 2026.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/products`}
            onClick={() => trackCTAClick("peak_cta_shop", "campaign_cta")}
            className="px-8 py-4 bg-white text-oryn-orange font-semibold text-xs tracking-[0.15em] hover:bg-oryn-cream transition-colors"
          >
            SHOP ALL PEPTIDES
          </Link>
          <Link
            href={`/${locale}/bundles`}
            onClick={() => trackCTAClick("peak_cta_bundles", "campaign_cta")}
            className="px-8 py-4 border border-white/20 text-white font-medium text-xs tracking-[0.15em] hover:border-white transition-colors"
          >
            VIEW ALL BUNDLES
          </Link>
        </div>
      </div>
    </section>
  );
}
