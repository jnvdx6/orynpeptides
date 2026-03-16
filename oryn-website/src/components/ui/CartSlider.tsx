"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import { useProducts } from "@/providers/products";
import { Link } from "@/components/ui/LocaleLink";
import { VolumeDiscountBanner } from "@/components/ui/VolumeDiscountBanner";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/discounts";
import { trackCartViewed, trackRemoveFromCart, trackQuantityChanged, trackCTAClick } from "@/lib/analytics";

import { productImages } from "@/data/products";

function getProductImage(slug: string, category: string): string {
  return productImages.bySlug[slug] || productImages.categoryCard[category] || "/images/products/peptide-pen-black.png";
}

export function CartSlider() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, isOpen, setIsOpen, addItem, appliedPromotion, removePromotion, discountedPrice, volumeDiscount, finalPrice } =
    useCart();
  const { t, formatPrice, currencyCode } = useLocale();

  // Max shipping savings by currency (express shipping costs)
  const shippingSavings: Record<string, string> = { gbp: "\u00a39.99", usd: "$14.99", eur: "\u20ac15.99" };
  const savingsLabel = shippingSavings[currencyCode] || "\u20ac15.99";
  const { products } = useProducts();

  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

  // Suggest complementary products not in cart
  const cartIds = new Set(items.map((i) => i.product.id));
  const cartSlugs = new Set(items.map((i) => i.product.slug));

  // Curated complementary pairs
  const COMPLEMENTS: Record<string, string[]> = {
    "bpc-157": ["tb-500", "glutathione"],
    "tb-500": ["bpc-157", "ghk-cu"],
    "cjc-1295": ["ipamorelin", "nad-plus"],
    "ipamorelin": ["cjc-1295", "nad-plus"],
    "tirzepatide-pen": ["glutathione", "nad-plus"],
    "ghk-cu": ["bpc-157", "glutathione"],
    "glutathione": ["nad-plus", "ghk-cu"],
    "nad-plus": ["glutathione", "cjc-1295"],
    "medit-tirzepatide": ["glutathione", "nad-plus"],
    "novadose-nad": ["glutathione", "bpc-157"],
  };

  // Get suggestions based on cart contents
  const suggestions = (() => {
    const suggestedSlugs = new Set<string>();
    for (const item of items) {
      const complements = COMPLEMENTS[item.product.slug] || [];
      for (const slug of complements) {
        if (!cartSlugs.has(slug)) suggestedSlugs.add(slug);
      }
    }
    const suggested = Array.from(suggestedSlugs)
      .map((slug) => products.find((p) => p.slug === slug))
      .filter(Boolean)
      .slice(0, 2);
    // Fallback: if no complements, show popular products
    if (suggested.length === 0) {
      return products.filter((p) => !cartIds.has(p.id) && p.badge).slice(0, 2);
    }
    return suggested;
  })();

  const prevIsOpen = useRef(false);
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      trackCartViewed({ itemCount: items.length, total: totalPrice });
    }
    prevIsOpen.current = isOpen;
  }, [isOpen, items.length, totalPrice]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slider */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-oryn-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-oryn-grey/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold tracking-wide">{t.cart.title}</h2>
            {items.length > 0 && (
              <span className="text-[9px] font-mono text-oryn-orange bg-oryn-orange/10 px-2 py-0.5">
                {items.reduce((sum, i) => sum + i.quantity, 0)} {t.cart.itemsLabel}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-oryn-grey/20 transition-colors"
            aria-label={t.productDetail.closeCart}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-oryn-orange/5 border-b border-oryn-orange/10">
            {amountToFreeShipping > 0 ? (
              <>
                <p className="text-[10px] font-plex text-oryn-black/50 mb-2">
                  {t.cart.freeShippingAway.replace("{amount}", formatPrice(amountToFreeShipping))}
                  {" — save up to " + savingsLabel + "!"}
                </p>
                <div className="w-full h-1.5 bg-oryn-grey/30 overflow-hidden">
                  <div
                    className="h-full bg-oryn-orange transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[10px] font-plex text-oryn-orange font-medium">
                  {t.cart.freeShippingUnlocked}{" You're saving up to " + savingsLabel}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-oryn-grey/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-oryn-black/30">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="text-sm text-oryn-black/40 font-plex mb-2">{t.cart.empty}</p>
              <p className="text-xs text-oryn-black/30 font-plex mb-4">{t.cart.emptySubtext}</p>
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-oryn-orange text-white text-xs font-medium tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
              >
                {t.cart.browseProducts}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-oryn-grey-light"
                >
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="w-16 h-16 bg-oryn-cream flex items-center justify-center shrink-0 overflow-hidden"
                  >
                    <Image
                      src={getProductImage(item.product.slug, item.product.category)}
                      alt={item.product.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-bold truncate block hover:text-oryn-orange transition-colors"
                    >
                      {item.product.name.startsWith("ORYN") ? item.product.name : `ORYN ${item.product.name}`}
                    </Link>
                    <p className="text-[10px] text-oryn-black/40 font-plex">
                      {item.product.dosage} &middot; {item.product.volume}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            trackQuantityChanged({ name: item.product.name, slug: item.product.slug, price: item.product.price, oldQuantity: item.quantity, newQuantity: item.quantity - 1 });
                            updateQuantity(item.product.id, item.quantity - 1);
                          }}
                          className="w-9 h-9 bg-oryn-grey/40 flex items-center justify-center text-sm hover:bg-oryn-orange hover:text-white transition-colors active:scale-95"
                          aria-label={t.productDetail.decreaseQuantity}
                        >
                          -
                        </button>
                        <span className="text-sm font-mono w-7 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            trackQuantityChanged({ name: item.product.name, slug: item.product.slug, price: item.product.price, oldQuantity: item.quantity, newQuantity: item.quantity + 1 });
                            updateQuantity(item.product.id, item.quantity + 1);
                          }}
                          disabled={item.quantity >= 10}
                          className="w-9 h-9 bg-oryn-grey/40 flex items-center justify-center text-sm hover:bg-oryn-orange hover:text-white transition-colors active:scale-95 disabled:opacity-30 disabled:hover:bg-oryn-grey/40 disabled:hover:text-current"
                          aria-label={t.productDetail.increaseQuantity}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => { trackRemoveFromCart({ name: item.product.name, slug: item.product.slug, price: item.product.price }); removeItem(item.product.id); }}
                          className="text-oryn-black/20 hover:text-red-500 transition-colors p-2.5 -m-1"
                          aria-label={t.productDetail.removeItem}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Volume discount banner */}
              <div className="mt-3">
                <VolumeDiscountBanner totalItems={totalItems} compact />
              </div>

              {/* Upsell suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-3 p-3 border border-dashed border-oryn-orange/20 bg-oryn-orange/5">
                  <p className="text-[9px] font-mono text-oryn-orange tracking-[0.15em] mb-2">{t.cart.youMightLike}</p>
                  <div className="space-y-2">
                    {suggestions.map((s) => s && (
                      <div key={s.id} className="flex items-center gap-3">
                        <Link
                          href={`/products/${s.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="w-10 h-10 bg-oryn-cream flex items-center justify-center shrink-0"
                        >
                          <Image
                            src={getProductImage(s.slug, s.category)}
                            alt={s.name}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </Link>
                        <Link
                          href={`/products/${s.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex-1 min-w-0 group"
                        >
                          <p className="text-xs font-bold group-hover:text-oryn-orange transition-colors truncate">{s.name.startsWith("ORYN") ? s.name : `ORYN ${s.name}`}</p>
                          <p className="text-[10px] text-oryn-black/40 font-plex">{formatPrice(s.price)}</p>
                        </Link>
                        <button
                          onClick={() => { trackCTAClick("cart_suggestion", "cart_slider"); addItem(s); }}
                          className="shrink-0 px-3 py-2 bg-oryn-orange text-white text-[9px] font-bold tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors flex items-center gap-1.5"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          {t.productDetail.add}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-oryn-grey/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-oryn-black/60">{t.cart.subtotal}</span>
              <span className={`text-lg font-bold ${(appliedPromotion || volumeDiscount) ? 'text-oryn-black/40 line-through text-base' : ''}`}>{formatPrice(totalPrice)}</span>
            </div>
            {appliedPromotion && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono bg-oryn-orange/10 text-oryn-orange px-1.5 py-0.5">{appliedPromotion.code}</span>
                  <button onClick={removePromotion} className="text-oryn-black/20 hover:text-red-500 transition-colors">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>
                <span className="text-sm font-bold text-oryn-orange">-{formatPrice(appliedPromotion.discountAmount)}</span>
              </div>
            )}
            {appliedPromotion && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-oryn-black/60">{t.cart.total}</span>
                <span className={`text-lg font-bold ${volumeDiscount ? 'text-oryn-black/40 line-through text-base' : ''}`}>{formatPrice(discountedPrice)}</span>
              </div>
            )}
            {volumeDiscount && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono bg-green-100 text-green-700 px-1.5 py-0.5">{volumeDiscount.tier.label}</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">-{formatPrice(volumeDiscount.discount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-oryn-black/60">{t.cart.total}</span>
                  <span className="text-lg font-bold">{formatPrice(finalPrice)}</span>
                </div>
              </>
            )}
            <Link
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-oryn-orange text-white text-center py-4 font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-colors shadow-lg shadow-oryn-orange/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {t.cart.checkout}
            </Link>
            {/* Trust signals */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[8px] text-oryn-black/30 font-mono">{t.cart.trustSecure}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-[8px] text-oryn-black/30 font-mono">{t.cart.trustDiscreet}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[8px] text-oryn-black/30 font-mono">{t.cart.trustCOA}</span>
              </div>
            </div>
            <p className="text-[10px] text-oryn-black/30 text-center font-mono">
              {t.cart.researchOnly}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
