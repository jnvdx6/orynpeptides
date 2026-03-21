"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { ReviewForm } from "@/components/product/ReviewForm";
import { ProductVideo } from "@/components/product/ProductVideo";
import { trackProductView } from "@/lib/analytics";
import { usePageTracking } from "@/hooks/usePageTracking";
import { ProductExpressCheckout } from "@/components/product/ProductExpressCheckout";

export function ProductPageClient() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { getProductBySlug, products } = useProducts();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t, formatPrice, localePath } = useLocale();
  const { addViewed } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [reviewRefreshKey, setReviewRefreshKey] = useState(0);
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
  const gallery = productImages.gallery[product?.slug || ""] || [productImages.bySlug[product?.slug || ""] || "/images/products/bpc157-hero.png"];
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"benefits" | "specs">("benefits");

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-3">
            <div
              className="bg-oryn-cream overflow-hidden relative flex items-center justify-center p-8 md:p-16 min-h-[350px] md:min-h-[500px] group cursor-zoom-in"
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
                src={gallery[activeImage] || productImages.bySlug[product.slug] || "/images/products/bpc157-hero.png"}
                alt={`ORYN ${product.name} ${product.dosage} peptide pen system`}
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
                      alt={`ORYN ${product.name} — ${["product pen", "detail view", "angled view", "close-up", "packaging", "kit"][i] || `view ${i + 1}`}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
            {product.videoUrl && (
              <ProductVideo videoUrl={product.videoUrl} productName={product.name} />
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
            <div className="space-y-3 mb-3">
              <div className="flex gap-3">
                <div className="flex items-center border border-oryn-grey/30">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 sm:w-12 h-[52px] flex items-center justify-center text-lg hover:bg-oryn-grey-light transition-colors"
                    aria-label={t.productDetail.decreaseQuantity}
                  >
                    -
                  </button>
                  <span className="w-10 sm:w-12 h-[52px] flex items-center justify-center font-mono text-sm border-x border-oryn-grey/30">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-11 sm:w-12 h-[52px] flex items-center justify-center text-lg hover:bg-oryn-grey-light transition-colors disabled:opacity-30"
                    disabled={quantity >= 10}
                    aria-label={t.productDetail.increaseQuantity}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={async () => {
                    setAddingToCart(true);
                    await addItem(product, undefined, quantity);
                    setAddingToCart(false);
                  }}
                  disabled={addingToCart}
                  className="flex-1 py-4 bg-oryn-orange text-white font-medium text-xs tracking-[0.15em] sm:tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70"
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      <span className="truncate">{t.productDetail.addToCart} &mdash; {formatPrice(product.price * quantity)}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-[52px] h-[52px] shrink-0 border flex items-center justify-center transition-colors ${
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

              {/* Buy Now — skip cart, go straight to checkout */}
              <button
                onClick={async () => {
                  setBuyingNow(true);
                  await addItem(product, undefined, quantity);
                  setBuyingNow(false);
                  router.push(localePath("/checkout"));
                }}
                disabled={buyingNow || addingToCart}
                className="w-full py-4 border-2 border-oryn-orange text-oryn-orange font-medium text-xs tracking-[0.15em] sm:tracking-[0.2em] hover:bg-oryn-orange hover:text-white transition-colors flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-70"
              >
                {buyingNow ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t.productDetail.adding || "ADDING..."}
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span>{t.productDetail.buyNow} &mdash; {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Express checkout — Apple Pay, Google Pay, etc. */}
            <div className="mb-3">
              <ProductExpressCheckout
                product={{ id: product.id, name: product.name, price: product.price, slug: product.slug }}
                quantity={quantity}
                dividerLabel={t.productDetail.orPayInstantly}
              />
            </div>

            {/* Security reassurance */}
            <div className="flex items-center justify-center gap-4 mb-4 py-2">
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

            {/* Payment methods */}
            <div className="border border-oryn-grey/20 rounded-sm p-4 mb-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] uppercase">
                  Secure payment methods
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {/* Visa */}
                <div className="h-7 px-2.5 bg-white border border-oryn-grey/20 rounded flex items-center justify-center" title="Visa">
                  <svg width="32" height="10" viewBox="0 0 48 16" fill="none">
                    <path d="M17.87 0.5L11.19 15.5H7.33L4.05 3.56C3.85 2.78 3.68 2.5 3.08 2.17C2.09 1.62 0.5 1.1 0.5 1.1L0.59 0.5H6.67C7.47 0.5 8.18 1.04 8.35 1.96L9.87 10.13L13.67 0.5H17.87ZM34.5 10.67C34.52 6.67 28.9 6.45 28.94 4.67C28.95 4.1 29.49 3.5 30.67 3.34C31.25 3.27 32.82 3.21 34.61 4.04L35.36 0.94C34.39 0.57 33.15 0.22 31.61 0.22C27.65 0.22 24.87 2.36 24.84 5.42C24.82 7.67 26.84 8.92 28.37 9.67C29.94 10.44 30.47 10.94 30.46 11.63C30.45 12.69 29.18 13.15 27.99 13.17C26.01 13.2 24.87 12.65 23.97 12.23L23.19 15.43C24.1 15.85 25.78 16.22 27.52 16.24C31.72 16.24 34.48 14.12 34.5 10.67ZM44.08 15.5H47.5L44.54 0.5H41.39C40.7 0.5 40.12 0.92 39.86 1.53L34.04 15.5H38.23L39.06 13.21H44.18L44.08 15.5ZM40.27 10.08L42.37 4.38L43.58 10.08H40.27ZM23.27 0.5L19.97 15.5H15.97L19.27 0.5H23.27Z" fill="#1A1F71"/>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="h-7 px-2 bg-white border border-oryn-grey/20 rounded flex items-center justify-center" title="Mastercard">
                  <svg width="26" height="16" viewBox="0 0 32 20" fill="none">
                    <circle cx="11" cy="10" r="9" fill="#EB001B"/>
                    <circle cx="21" cy="10" r="9" fill="#F79E1B"/>
                    <path d="M16 3.13C17.87 4.68 19 7.19 19 10C19 12.81 17.87 15.32 16 16.87C14.13 15.32 13 12.81 13 10C13 7.19 14.13 4.68 16 3.13Z" fill="#FF5F00"/>
                  </svg>
                </div>
                {/* Amex */}
                <div className="h-7 px-2 bg-[#006FCF] border border-[#006FCF] rounded flex items-center justify-center" title="American Express">
                  <span className="text-[8px] font-bold text-white tracking-[0.05em]">AMEX</span>
                </div>
                {/* Apple Pay */}
                <div className="h-7 px-2.5 bg-black border border-black rounded flex items-center justify-center" title="Apple Pay">
                  <svg width="30" height="12" viewBox="0 0 40 17" fill="none">
                    <path d="M7.4 2.28C6.93 2.84 6.19 3.28 5.45 3.22C5.36 2.48 5.72 1.69 6.15 1.19C6.62 0.61 7.44 0.21 8.09 0.18C8.17 0.95 7.87 1.71 7.4 2.28ZM8.08 3.36C6.97 3.3 6.02 3.98 5.49 3.98C4.96 3.98 4.14 3.4 3.26 3.41C2.13 3.43 1.08 4.05 0.51 5.05C-0.66 7.05 0.2 10.02 1.33 11.65C1.89 12.46 2.55 13.35 3.42 13.32C4.26 13.28 4.59 12.77 5.59 12.77C6.6 12.77 6.89 13.32 7.78 13.3C8.69 13.28 9.26 12.49 9.82 11.68C10.46 10.75 10.73 9.85 10.74 9.81C10.73 9.8 8.75 9.03 8.73 6.76C8.72 4.87 10.28 3.97 10.35 3.92C9.47 2.64 8.12 2.49 7.66 2.46L8.08 3.36Z" fill="white"/>
                    <path d="M16.12 1.12V13.22H17.93V9.16H20.43C22.71 9.16 24.33 7.57 24.33 5.13C24.33 2.69 22.74 1.12 20.49 1.12H16.12ZM17.93 2.67H19.97C21.6 2.67 22.49 3.52 22.49 5.14C22.49 6.76 21.6 7.62 19.97 7.62H17.93V2.67ZM28.1 13.32C29.37 13.32 30.55 12.68 31.07 11.66H31.1V13.22H32.77V7.49C32.77 5.71 31.36 4.54 29.21 4.54C27.22 4.54 25.72 5.72 25.67 7.28H27.29C27.39 6.5 28.12 5.98 29.15 5.98C30.39 5.98 31.08 6.55 31.08 7.57V8.29L28.79 8.43C26.65 8.56 25.5 9.41 25.5 10.86C25.5 12.33 26.68 13.32 28.1 13.32ZM28.55 11.93C27.47 11.93 26.81 11.42 26.81 10.64C26.81 9.83 27.44 9.37 28.62 9.3L31.08 9.16V9.9C31.08 11.11 30 11.93 28.55 11.93ZM34.41 16.52C36.16 16.52 37.01 15.81 37.73 13.77L40.73 5.62H38.87L36.84 11.93H36.81L34.78 5.62H32.88L35.77 13.27L35.62 13.8C35.34 14.71 34.87 15.05 34.06 15.05C33.92 15.05 33.64 15.04 33.53 15.02V16.48C33.63 16.51 34.14 16.52 34.41 16.52Z" fill="white"/>
                  </svg>
                </div>
                {/* Google Pay */}
                <div className="h-7 px-2.5 bg-white border border-oryn-grey/20 rounded flex items-center justify-center" title="Google Pay">
                  <svg width="30" height="12" viewBox="0 0 40 16" fill="none">
                    <path d="M19.05 7.74V11.74H17.74V1.44H21.31C22.17 1.44 22.91 1.73 23.5 2.3C24.1 2.87 24.41 3.59 24.41 4.43C24.41 5.3 24.1 6.02 23.5 6.58C22.91 7.13 22.18 7.41 21.31 7.41H19.05V7.74ZM19.05 2.7V6.48H21.34C21.85 6.48 22.27 6.3 22.61 5.95C22.96 5.6 23.13 5.16 23.13 4.65C23.13 4.15 22.96 3.72 22.62 3.37C22.28 3.01 21.86 2.83 21.35 2.83H19.05V2.7ZM27.28 4.52C28.23 4.52 28.97 4.78 29.52 5.3C30.06 5.82 30.33 6.52 30.33 7.42V11.74H29.08V10.77H29.03C28.49 11.58 27.76 11.98 26.85 11.98C26.08 11.98 25.43 11.76 24.91 11.31C24.39 10.87 24.13 10.31 24.13 9.63C24.13 8.91 24.41 8.34 24.96 7.91C25.52 7.48 26.25 7.27 27.17 7.27C27.96 7.27 28.61 7.42 29.11 7.71V7.38C29.11 6.87 28.92 6.44 28.54 6.09C28.16 5.74 27.71 5.56 27.2 5.56C26.43 5.56 25.83 5.89 25.39 6.55L24.24 5.84C24.87 4.96 25.9 4.52 27.28 4.52ZM25.38 9.67C25.38 10.04 25.55 10.35 25.87 10.59C26.19 10.83 26.57 10.95 27 10.95C27.63 10.95 28.19 10.71 28.68 10.24C29.17 9.77 29.41 9.22 29.41 8.61C29 8.28 28.42 8.12 27.68 8.12C27.13 8.12 26.67 8.26 26.3 8.53C25.92 8.81 25.38 9.18 25.38 9.67ZM35.55 4.76L31.62 13.97H30.27L31.73 10.87L29.05 4.76H30.49L32.46 9.46H32.48L34.39 4.76H35.55Z" fill="#3C4043"/>
                    <path d="M13.07 7.2C13.07 6.72 13.03 6.24 12.94 5.78H6.68V8.47H10.26C10.1 9.33 9.59 10.09 8.83 10.56V12.3H11.04C12.33 11.12 13.07 9.33 13.07 7.2Z" fill="#4285F4"/>
                    <path d="M6.68 14C8.5 14 10.03 13.4 11.04 12.3L8.83 10.56C8.2 10.98 7.39 11.22 6.68 11.22C4.93 11.22 3.44 10.03 2.89 8.42H0.61V10.22C1.65 12.29 3.98 14 6.68 14Z" fill="#34A853"/>
                    <path d="M2.89 8.42C2.63 7.56 2.63 6.64 2.89 5.78V3.98H0.61C-0.37 5.98 -0.37 8.22 0.61 10.22L2.89 8.42Z" fill="#FBBC04"/>
                    <path d="M6.68 2.98C7.78 2.96 8.84 3.38 9.63 4.14L11.08 2.69C9.96 1.64 8.47 1.06 6.68 1.08C3.98 1.08 1.65 2.79 0.61 4.86L2.89 6.66C3.44 5.05 4.93 2.98 6.68 2.98Z" fill="#EA4335"/>
                  </svg>
                </div>
                {/* Klarna */}
                <div className="h-7 px-2 bg-[#FFB3C7] border border-[#FFB3C7] rounded flex items-center justify-center" title="Klarna">
                  <span className="text-[8px] font-extrabold text-black tracking-[0.02em]">Klarna.</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[8px] text-oryn-black/30 font-plex">SSL encrypted &middot; PCI DSS compliant &middot; 256-bit security</span>
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
                {(["benefits", "specs"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-[10px] font-mono tracking-[0.15em] uppercase transition-colors relative ${
                      activeTab === tab
                        ? "text-oryn-orange"
                        : "text-oryn-black/30 hover:text-oryn-black/60"
                    }`}
                  >
                    {tab === "benefits" ? t.productDetail.keyBenefits : t.productDetail.specifications}
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
      <CustomerReviews productSlug={product.slug} productName={product.name} refreshKey={reviewRefreshKey} />

      {/* Write a Review */}
      <ReviewForm productSlug={product.slug} onSubmit={() => setReviewRefreshKey((k) => k + 1)} />

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
              await addItem(product, undefined, quantity);
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
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-oryn-grey/15 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-2.5">
          <div className="shrink-0">
            <span className="text-lg font-bold text-oryn-orange leading-none">{formatPrice(product.price)}</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[8px] text-green-600 font-mono">{t.productDetail.inStock}</span>
            </div>
          </div>
          <div className="flex items-center border border-oryn-grey/30 shrink-0">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-9 h-11 flex items-center justify-center text-base hover:bg-oryn-grey-light transition-colors"
              aria-label={t.productDetail.decreaseQuantity}
            >
              -
            </button>
            <span className="w-8 h-11 flex items-center justify-center font-mono text-xs border-x border-oryn-grey/30">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-9 h-11 flex items-center justify-center text-base hover:bg-oryn-grey-light transition-colors disabled:opacity-30"
              disabled={quantity >= 10}
              aria-label={t.productDetail.increaseQuantity}
            >
              +
            </button>
          </div>
          <button
            onClick={async () => {
              setAddingToCart(true);
              await addItem(product, undefined, quantity);
              setAddingToCart(false);
            }}
            disabled={addingToCart}
            className="flex-1 h-11 bg-oryn-orange text-white font-medium text-[11px] tracking-[0.12em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
          >
            {addingToCart ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span>{t.productDetail.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sticky mobile bar — appears on scroll */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 ${
        showStickyBar ? "translate-y-0" : "translate-y-full"
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-oryn-grey/20 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-oryn-orange">{formatPrice(product.price * quantity)}</span>
                {quantity > 1 && <span className="text-[10px] text-oryn-black/40 font-mono">×{quantity}</span>}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-[9px] font-mono text-green-600 tracking-[0.05em]">{t.productDetail.inStock}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  setAddingToCart(true);
                  await addItem(product, undefined, quantity);
                  setAddingToCart(false);
                }}
                disabled={addingToCart}
                className="flex-1 py-3 bg-oryn-orange text-white font-medium text-[11px] tracking-[0.12em] hover:bg-oryn-orange-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
              >
                {addingToCart ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    <span>{t.productDetail.addToCart}</span>
                  </>
                )}
              </button>
              <button
                onClick={async () => {
                  setBuyingNow(true);
                  await addItem(product, undefined, quantity);
                  setBuyingNow(false);
                  router.push(localePath("/checkout"));
                }}
                disabled={buyingNow || addingToCart}
                className="flex-1 py-3 border-2 border-oryn-orange text-oryn-orange font-medium text-[11px] tracking-[0.12em] hover:bg-oryn-orange hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
              >
                {buyingNow ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span>{t.productDetail.buyNow}</span>
                  </>
                )}
              </button>
            </div>
          </div>
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
                  src={gallery[0] || productImages.bySlug[product.slug] || "/images/products/bpc157-hero.png"}
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
                  await addItem(product, undefined, quantity);
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
                onClick={async () => {
                  setBuyingNow(true);
                  await addItem(product, undefined, quantity);
                  setBuyingNow(false);
                  router.push(localePath("/checkout"));
                }}
                disabled={buyingNow || addingToCart}
                className="px-6 py-2.5 border-2 border-oryn-orange text-oryn-orange font-medium text-xs tracking-[0.15em] hover:bg-oryn-orange hover:text-white transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {buyingNow ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    {t.productDetail.buyNow}
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
