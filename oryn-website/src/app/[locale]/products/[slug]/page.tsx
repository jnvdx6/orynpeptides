"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { productImages } from "@/data/products";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/providers/products";
import { ProductCard } from "@/components/products/ProductCard";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { getProductDetail } from "@/data/product-details";
import { SellingPoints } from "@/components/product/SellingPoints";
import { PenAdvantage } from "@/components/product/PenAdvantage";
import { DosingGuide } from "@/components/product/DosingGuide";
import { ProductScience } from "@/components/product/ProductScience";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductFAQ } from "@/components/product/ProductFAQ";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getProductBySlug, products } = useProducts();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { t, formatPrice } = useLocale();
  const [quantity, setQuantity] = useState(1);
  const gallery = productImages.gallery[product?.slug || ""] || [productImages.bySlug[product?.slug || ""] || "/images/products/pen-bpc157.png"];
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"benefits" | "specs" | "science">("benefits");

  const detail = product ? getProductDetail(product.slug) : undefined;

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t.productDetail.notFound}</h1>
          <Link href="/products" className="text-oryn-orange hover:underline">
            {t.productDetail.backToProducts}
          </Link>
        </div>
      </div>
    );
  }

  const productT = t.products[product.slug];
  const subtitle = productT?.subtitle || product.subtitle;
  const description = productT?.description || product.description;
  const benefits = productT?.benefits || product.benefits;
  const categoryLabel = productT?.categoryLabel || product.categoryLabel;
  const badge = productT?.badge || product.badge;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const avgRating = detail?.reviews
    ? detail.reviews.reduce((sum, r) => sum + r.rating, 0) / detail.reviews.length
    : 4.8;

  return (
    <div className="pt-[calc(1rem+4px)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
          <Link href="/" className="hover:text-oryn-orange transition-colors">{t.productDetail.home}</Link>
          <span className="text-oryn-orange">/</span>
          <Link href="/products" className="hover:text-oryn-orange transition-colors">{t.productDetail.products}</Link>
          <span className="text-oryn-orange">/</span>
          <span className="text-oryn-orange">{product.name.toUpperCase()}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-3">
            <div className="bg-oryn-cream overflow-hidden relative flex items-center justify-center p-16 min-h-[500px]">
              <Image
                src={gallery[activeImage] || productImages.bySlug[product.slug] || "/images/products/pen-bpc157.png"}
                alt={`ORYN ${product.name}`}
                width={400}
                height={400}
                className="object-contain transition-opacity duration-300"
              />
              {badge && (
                <span className="absolute top-6 left-6 px-3 py-1 bg-oryn-orange text-white text-[9px] font-bold tracking-[0.15em] uppercase">
                  {badge}
                </span>
              )}
              <span className="absolute top-6 right-6 px-2 py-1 bg-white/80 text-oryn-orange text-[9px] font-mono tracking-[0.1em]">
                {categoryLabel}
              </span>
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`bg-oryn-cream overflow-hidden flex items-center justify-center p-3 aspect-square transition-all ${
                      activeImage === i
                        ? "ring-2 ring-oryn-orange ring-offset-1"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`ORYN ${product.name} view ${i + 1}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                {categoryLabel.toUpperCase()}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mt-1 mb-2 tracking-tight">
              {product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`}
            </h1>

            {/* Star rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill={star <= Math.round(avgRating) ? "#FF6A1A" : "none"} stroke="#FF6A1A" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-oryn-black/40 font-plex">
                {avgRating.toFixed(1)} ({detail?.reviews?.length || 0} reviews)
              </span>
            </div>

            <p className="text-sm text-oryn-black/40 font-plex mb-6">
              {subtitle}
            </p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-oryn-orange">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-oryn-black/30 font-plex font-normal">{t.productDetail.perUnit}</span>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: t.productDetail.trustShipping },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: t.productDetail.trustPurity },
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: t.productDetail.trustCOA },
              ].map((trust) => (
                <div key={trust.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-oryn-orange/5 border border-oryn-orange/10">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                    <path d={trust.icon} />
                  </svg>
                  <span className="text-[9px] font-mono text-oryn-black/50 tracking-[0.05em]">{trust.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {[product.dosage, product.volume, t.productCard.purity, t.productCard.pharmaGrade].map((spec) => (
                <span key={spec} className="px-3 py-1.5 bg-oryn-orange/5 text-[9px] font-mono text-oryn-orange tracking-[0.1em] border border-oryn-orange/10">
                  {spec}
                </span>
              ))}
            </div>

            {/* Quick selling points */}
            {detail?.sellingPoints && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {detail.sellingPoints.map((sp) => (
                  <div key={sp.title} className="flex items-start gap-2 p-3 bg-oryn-orange/5 border border-oryn-orange/10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-[10px] font-bold tracking-wide">{sp.title}</p>
                      <p className="text-[9px] text-oryn-black/40 font-plex">{sp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-oryn-black/50 font-plex leading-relaxed mb-8">
              {description}
            </p>

            {/* Quantity + Add to cart */}
            <div className="flex gap-3 mb-3">
              <div className="flex items-center border border-oryn-grey/30">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-[52px] flex items-center justify-center text-lg hover:bg-oryn-grey-light transition-colors"
                >
                  -
                </button>
                <span className="w-12 h-[52px] flex items-center justify-center font-mono text-sm border-x border-oryn-grey/30">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-[52px] flex items-center justify-center text-lg hover:bg-oryn-grey-light transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product);
                }}
                className="flex-1 py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {t.productDetail.addToCart} &mdash; {formatPrice(product.price * quantity)}
              </button>
            </div>

            {/* Security reassurance */}
            <div className="flex items-center justify-center gap-4 mb-10 py-2">
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[9px] text-oryn-black/30 font-mono tracking-[0.1em]">{t.productDetail.secureCheckout}</span>
              </div>
              <span className="w-px h-3 bg-oryn-grey" />
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-[9px] text-oryn-black/30 font-mono tracking-[0.1em]">{t.productDetail.discreetShipping}</span>
              </div>
            </div>

            {/* Tabbed content: Benefits / Specs / Science */}
            <div className="mb-10">
              <div className="flex border-b border-oryn-grey/20 mb-6">
                {(["benefits", "specs", "science"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-[10px] font-mono tracking-[0.15em] uppercase transition-colors relative ${
                      activeTab === tab
                        ? "text-oryn-orange"
                        : "text-oryn-black/30 hover:text-oryn-black/60"
                    }`}
                  >
                    {tab === "benefits" ? t.productDetail.keyBenefits : tab === "specs" ? t.productDetail.specifications : "Science"}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-oryn-orange" />
                    )}
                  </button>
                ))}
              </div>

              {activeTab === "benefits" && (
                <ul className="space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs text-oryn-black/50 font-plex">{benefit}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "specs" && (
                <div className="bg-oryn-orange/5 divide-y divide-oryn-orange/10 border border-oryn-orange/10">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between px-5 py-3">
                      <span className="text-[9px] text-oryn-black/30 font-mono tracking-[0.1em]">
                        {key.toUpperCase()}
                      </span>
                      <span className="text-xs font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "science" && detail?.science && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {detail.science.molecularFormula && (
                      <div className="p-3 bg-oryn-orange/5 border border-oryn-orange/10">
                        <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">FORMULA</span>
                        <p className="text-xs font-medium mt-1">{detail.science.molecularFormula}</p>
                      </div>
                    )}
                    {detail.science.molecularWeight && (
                      <div className="p-3 bg-oryn-orange/5 border border-oryn-orange/10">
                        <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">WEIGHT</span>
                        <p className="text-xs font-medium mt-1">{detail.science.molecularWeight}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-oryn-black/50 font-plex leading-relaxed">
                    {detail.science.mechanism}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {detail.science.researchAreas.map((area) => (
                      <span key={area} className="px-2 py-1 bg-oryn-cream text-[9px] font-mono text-oryn-black/50 tracking-[0.05em]">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full-width selling points bar */}
      {detail && <SellingPoints detail={detail} />}

      {/* Pen vs Vial comparison */}
      {detail && <PenAdvantage detail={detail} />}

      {/* Dosing guide */}
      {detail && <DosingGuide detail={detail} />}

      {/* Deep science section */}
      {detail && <ProductScience detail={detail} productName={product.name} />}

      {/* Reviews */}
      {detail && <ProductReviews detail={detail} productName={product.name} />}

      {/* FAQ */}
      {detail && <ProductFAQ detail={detail} productName={product.name} />}

      {/* Research disclaimer */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="p-6 bg-oryn-orange/5 border border-oryn-orange/10">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-oryn-orange flex items-center justify-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold text-oryn-orange mb-1">{t.productDetail.researchOnlyTitle}</h4>
              <p className="text-[10px] text-oryn-black/40 font-plex leading-relaxed">
                {t.productDetail.researchOnlyDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-oryn-black py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to experience {product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`}?
          </h2>
          <p className="text-sm text-white/50 font-plex mb-8 max-w-lg mx-auto">
            Premium pen delivery system with fully adjustable dosing. GMP manufactured, &gt;99% purity guaranteed.
          </p>
          <button
            onClick={() => {
              for (let i = 0; i < quantity; i++) addItem(product);
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            ADD TO CART &mdash; {formatPrice(product.price)}
          </button>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-oryn-orange" />
            <h2 className="text-lg font-bold tracking-wide">{t.productDetail.relatedProducts}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-oryn-grey/20">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-oryn-orange/20 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-lg font-bold text-oryn-orange">{formatPrice(product.price)}</span>
          </div>
          <button
            onClick={() => {
              for (let i = 0; i < quantity; i++) addItem(product);
            }}
            className="flex-1 py-3.5 bg-oryn-orange text-white font-medium text-xs tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {t.productDetail.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
