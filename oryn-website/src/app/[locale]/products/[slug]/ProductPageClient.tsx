"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { productImages } from "@/data/products";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/providers/products";
import { useWishlist } from "@/providers/wishlist";
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
import { FrequentlyBoughtTogether } from "@/components/products/FrequentlyBoughtTogether";
import { ProductComparison } from "@/components/products/ProductComparison";
import { RecentlyViewed } from "@/components/products/RecentlyViewed";
import { DeliveryEstimator } from "@/components/product/DeliveryEstimator";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { CustomerReviews } from "@/components/product/CustomerReviews";
import { trackProductView } from "@/lib/analytics";
import { usePageTracking } from "@/hooks/usePageTracking";

export function ProductPageClient() {
  const params = useParams();
  const slug = params.slug as string;
  const { getProductBySlug, products } = useProducts();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t, formatPrice } = useLocale();
  const { addViewed } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  usePageTracking("product_detail", product ? { product_slug: product.slug, product_name: product.name } : {});

  // Track recently viewed & analytics
  useEffect(() => {
    if (slug) addViewed(slug);
    if (product) {
      trackProductView({ name: product.name, slug: product.slug, price: product.price, category: product.category });
    }
  }, [slug, addViewed, product]);

  // Show sticky bar on desktop when scrolled past the add-to-cart button
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

  const related = useMemo(() =>
    products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3),
    [products, product.category, product.id]
  );

  const avgRating = useMemo(() =>
    detail?.reviews
      ? detail.reviews.reduce((sum, r) => sum + r.rating, 0) / detail.reviews.length
      : 4.8,
    [detail?.reviews]
  );

  return (
    <div className="pt-[calc(1rem+4px)] pb-20 lg:pb-0">
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
            <div
              className="bg-oryn-cream overflow-hidden relative flex items-center justify-center p-16 min-h-[500px] group cursor-zoom-in"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                const img = e.currentTarget.querySelector(".zoom-img") as HTMLElement;
                if (img) {
                  img.style.transformOrigin = `${x}% ${y}%`;
                }
              }}
            >
              <Image
                src={gallery[activeImage] || productImages.bySlug[product.slug] || "/images/products/pen-bpc157.png"}
                alt={`ORYN ${product.name}`}
                width={400}
                height={400}
                className="zoom-img object-contain transition-all duration-300 group-hover:scale-150"
                priority
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
                {avgRating.toFixed(1)} ({detail?.reviews?.length || 0} {t.productDetail.reviews})
              </span>
            </div>

            <p className="text-sm text-oryn-black/40 font-plex mb-6">
              {subtitle}
            </p>

            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-4xl font-bold text-oryn-orange">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-oryn-black/30 font-plex font-normal">{t.productDetail.perUnit}</span>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-green-600 tracking-[0.1em]">{t.productDetail.inStock}</span>
              <span className="text-[10px] text-oryn-black/30 font-plex">— {t.productDetail.readyToShip}</span>
            </div>

            {/* Delivery estimator */}
            <div className="mb-6">
              <DeliveryEstimator />
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
                  aria-label={t.productDetail.decreaseQuantity}
                >
                  -
                </button>
                <span className="w-12 h-[52px] flex items-center justify-center font-mono text-sm border-x border-oryn-grey/30">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-12 h-[52px] flex items-center justify-center text-lg hover:bg-oryn-grey-light transition-colors disabled:opacity-30"
                  disabled={quantity >= 10}
                  aria-label={t.productDetail.increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                onClick={async () => {
                  setAddingToCart(true);
                  for (let i = 0; i < quantity; i++) await addItem(product);
                  setAddingToCart(false);
                }}
                disabled={addingToCart}
                className="flex-1 py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {addingToCart ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t.productDetail.adding || "ADDING..."}
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    {t.productDetail.addToCart} &mdash; {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-[52px] h-[52px] border flex items-center justify-center transition-colors ${
                  isInWishlist(product.id)
                    ? "border-oryn-orange bg-oryn-orange/5"
                    : "border-oryn-grey/30 hover:border-oryn-orange/50"
                }`}
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? "#FF6A1A" : "none"} stroke={isInWishlist(product.id) ? "#FF6A1A" : "#999"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
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

            {/* Share buttons */}
            <div className="mb-8">
              <ShareButtons
                url={`/products/${product.slug}`}
                title={`ORYN ${product.name} — ${subtitle}`}
                description={`${product.dosage} pre-mixed peptide pen. >99% purity, GMP manufactured.`}
              />
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
                    {tab === "benefits" ? t.productDetail.keyBenefits : tab === "specs" ? t.productDetail.specifications : t.productDetail.scienceTab}
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
                        <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">{t.productDetail.formulaLabel}</span>
                        <p className="text-xs font-medium mt-1">{detail.science.molecularFormula}</p>
                      </div>
                    )}
                    {detail.science.molecularWeight && (
                      <div className="p-3 bg-oryn-orange/5 border border-oryn-orange/10">
                        <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">{t.productDetail.weightLabel}</span>
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

      {/* Customer Reviews (from centralized reviews data) */}
      <CustomerReviews productSlug={product.slug} productName={product.name} />

      {/* FAQ */}
      {detail && <ProductFAQ detail={detail} productName={product.name} />}

      {/* Frequently Bought Together */}
      <FrequentlyBoughtTogether currentProduct={product} />

      {/* Compare with similar products */}
      <ProductComparison currentProduct={product} />

      {/* Recently viewed */}
      <RecentlyViewed currentSlug={product.slug} />

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
            {t.productDetail.readyToExperience} {product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`}?
          </h2>
          <p className="text-sm text-white/50 font-plex mb-8 max-w-lg mx-auto">
            {t.productDetail.premiumPenDescription}
          </p>
          <button
            onClick={async () => {
              setAddingToCart(true);
              for (let i = 0; i < quantity; i++) await addItem(product);
              setAddingToCart(false);
            }}
            disabled={addingToCart}
            className="inline-flex items-center gap-3 px-8 py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors disabled:opacity-70"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {addingToCart ? (t.productDetail.adding || "ADDING...") : `${t.productDetail.addToCart} — ${formatPrice(product.price)}`}
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

      {/* SEO: Buy in your city */}
      <section className="bg-oryn-cream border-t border-oryn-orange/10 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-4">
            {t.productDetail.buyInYourCity.replace("{product}", (product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`).toUpperCase())}
          </h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {[
              "london", "manchester", "birmingham", "edinburgh", "glasgow",
              "leeds", "bristol", "liverpool", "cambridge", "oxford",
              "cardiff", "newcastle", "brighton", "sheffield", "nottingham",
              "belfast", "southampton", "york", "bath", "exeter",
            ].map((city) => (
              <Link
                key={city}
                href={`/peptides/${city}/${product.slug}`}
                className="text-[11px] text-oryn-black/30 hover:text-oryn-orange transition-colors font-plex capitalize"
              >
                {city.replace(/-/g, " ")}
              </Link>
            ))}
          </div>

          {/* Related articles & comparisons */}
          {(() => {
            const articleMap: Record<string, { slug: string; title: string }[]> = {
              "bpc-157": [
                { slug: "bpc-157-complete-guide", title: "BPC-157 Complete Guide" },
                { slug: "best-peptides-for-recovery-uk", title: "Best Peptides for Recovery UK" },
                { slug: "are-peptides-legal-in-the-uk", title: "Are Peptides Legal in the UK?" },
              ],
              "tb-500": [
                { slug: "best-peptides-for-recovery-uk", title: "Best Peptides for Recovery UK" },
                { slug: "peptide-pen-vs-vial", title: "Peptide Pen vs Vial" },
                { slug: "bpc-157-vs-tb-500", title: "BPC-157 vs TB-500 Comparison" },
              ],
              "cjc-1295": [
                { slug: "ipamorelin-vs-cjc-1295", title: "Ipamorelin vs CJC-1295" },
                { slug: "how-to-use-peptide-pen", title: "How to Use a Peptide Pen" },
              ],
              "ipamorelin": [
                { slug: "ipamorelin-vs-cjc-1295", title: "Ipamorelin vs CJC-1295" },
                { slug: "how-to-use-peptide-pen", title: "How to Use a Peptide Pen" },
              ],
              "tirzepatide-pen": [
                { slug: "tirzepatide-vs-semaglutide", title: "Tirzepatide vs Semaglutide" },
                { slug: "best-peptides-weight-loss-uk", title: "Best Peptides for Weight Loss UK" },
              ],
              "ghk-cu": [
                { slug: "ghk-cu-skin-peptide-guide", title: "GHK-Cu Skin Peptide Guide" },
                { slug: "peptide-storage-guide", title: "Peptide Storage Guide" },
              ],
              "glutathione": [
                { slug: "ghk-cu-skin-peptide-guide", title: "GHK-Cu & Glutathione Skin Guide" },
                { slug: "nad-plus-complete-guide", title: "NAD+ Complete Guide" },
              ],
              "nad-plus": [
                { slug: "nad-plus-complete-guide", title: "NAD+ Complete Guide" },
                { slug: "peptide-storage-guide", title: "Peptide Storage Guide" },
              ],
              "medit-tirzepatide": [
                { slug: "tirzepatide-vs-semaglutide", title: "Tirzepatide vs Semaglutide" },
                { slug: "best-peptides-weight-loss-uk", title: "Best Peptides for Weight Loss UK" },
              ],
              "novadose-nad": [
                { slug: "nad-plus-complete-guide", title: "NAD+ Complete Guide" },
              ],
            };
            const compareMap: Record<string, { slug: string; title: string }> = {
              "bpc-157": { slug: "bpc-157-vs-tb-500", title: "BPC-157 vs TB-500" },
              "tb-500": { slug: "bpc-157-vs-tb-500", title: "BPC-157 vs TB-500" },
              "cjc-1295": { slug: "cjc-1295-vs-ipamorelin", title: "CJC-1295 vs Ipamorelin" },
              "ipamorelin": { slug: "cjc-1295-vs-ipamorelin", title: "CJC-1295 vs Ipamorelin" },
              "tirzepatide-pen": { slug: "tirzepatide-vs-semaglutide", title: "Tirzepatide vs Semaglutide" },
              "medit-tirzepatide": { slug: "tirzepatide-vs-semaglutide", title: "Tirzepatide vs Semaglutide" },
              "ghk-cu": { slug: "ghk-cu-vs-glutathione", title: "GHK-Cu vs Glutathione" },
              "glutathione": { slug: "ghk-cu-vs-glutathione", title: "GHK-Cu vs Glutathione" },
              "nad-plus": { slug: "nad-plus-pen-vs-iv-therapy", title: "NAD+ Pen vs IV Therapy" },
              "novadose-nad": { slug: "nad-plus-pen-vs-iv-therapy", title: "NAD+ Pen vs IV Therapy" },
            };
            const articles = articleMap[product.slug] || [];
            const comparison = compareMap[product.slug];
            if (articles.length === 0 && !comparison) return null;
            return (
              <div className="mt-6">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-3">
                  {t.productDetail.relatedResearch}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {articles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/learn/${a.slug}`}
                      className="text-[11px] text-oryn-black/35 hover:text-oryn-orange transition-colors font-plex"
                    >
                      {a.title}
                    </Link>
                  ))}
                  {comparison && (
                    <Link
                      href={`/compare/${comparison.slug}`}
                      className="text-[11px] text-oryn-black/35 hover:text-oryn-orange transition-colors font-plex"
                    >
                      {comparison.title}
                    </Link>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-oryn-orange/20 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-lg font-bold text-oryn-orange">{formatPrice(product.price)}</span>
          </div>
          <button
            onClick={async () => {
              setAddingToCart(true);
              for (let i = 0; i < quantity; i++) await addItem(product);
              setAddingToCart(false);
            }}
            disabled={addingToCart}
            className="flex-1 py-3.5 bg-oryn-orange text-white font-medium text-xs tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {addingToCart ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {t.productDetail.addToCart}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sticky desktop bar — appears on scroll */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 hidden lg:block transition-all duration-300 ${
        showStickyBar ? "translate-y-0" : "translate-y-full"
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-oryn-grey/20 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-oryn-cream flex items-center justify-center shrink-0">
                <Image
                  src={gallery[0] || productImages.bySlug[product.slug] || "/images/products/pen-bpc157.png"}
                  alt={product.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`}</p>
                <p className="text-[10px] text-oryn-black/40 font-plex">{product.dosage} &middot; {subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-oryn-orange">{formatPrice(product.price)}</span>
              <div className="flex items-center border border-oryn-grey/30">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-10 flex items-center justify-center text-sm hover:bg-oryn-grey-light transition-colors"
                  aria-label={t.productDetail.decreaseQuantity}
                >
                  -
                </button>
                <span className="w-8 h-10 flex items-center justify-center font-mono text-xs border-x border-oryn-grey/30">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="w-8 h-10 flex items-center justify-center text-sm hover:bg-oryn-grey-light transition-colors disabled:opacity-30"
                  disabled={quantity >= 10}
                  aria-label={t.productDetail.increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                onClick={async () => {
                  setAddingToCart(true);
                  for (let i = 0; i < quantity; i++) await addItem(product);
                  setAddingToCart(false);
                }}
                disabled={addingToCart}
                className="px-6 py-2.5 bg-oryn-orange text-white font-medium text-xs tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {addingToCart ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    {t.productDetail.addToCart} &mdash; {formatPrice(product.price * quantity)}
                  </>
                )}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 border transition-colors ${
                  isInWishlist(product.id)
                    ? "border-oryn-orange bg-oryn-orange/5"
                    : "border-oryn-grey/30 hover:border-oryn-orange/50"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? "#FF6A1A" : "none"} stroke={isInWishlist(product.id) ? "#FF6A1A" : "#999"} strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
