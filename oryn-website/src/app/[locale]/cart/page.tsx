"use client";

import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import Image from "next/image";
import { products } from "@/data/products";

const categoryImages: Record<string, string> = {
  "peptide-pen": "/images/peptide-pen-real.png",
  "medit-pen": "/images/medit-box.png",
  novadose: "/images/novadose-pen-real.png",
};

const FREE_SHIPPING_THRESHOLD = 150;

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { t, formatPrice } = useLocale();

  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;
  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);

  // Suggest products not in cart
  const cartIds = new Set(items.map((i) => i.product.id));
  const suggestions = products.filter((p) => !cartIds.has(p.id) && p.badge).slice(0, 3);

  if (items.length === 0) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-oryn-grey-light flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-oryn-black/30">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">{t.cart.empty}</h1>
          <p className="text-oryn-black/50 font-plex mb-6 text-sm">
            {t.cart.emptySubtext}
          </p>
          <Link
            href="/products"
            className="px-6 py-3 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors shadow-md shadow-oryn-orange/20"
          >
            {t.cart.browseProducts}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-8">
          <Link href="/" className="hover:text-oryn-orange transition-colors">{t.productDetail.home}</Link>
          <span className="text-oryn-orange">/</span>
          <span className="text-oryn-orange">{t.cart.title}</span>
        </nav>

        <h1 className="text-3xl font-bold mb-2">{t.cart.title}</h1>
        <p className="text-oryn-black/50 font-plex mb-4 text-sm">
          {items.length} {t.cart.itemsLabel}
        </p>

        {/* Free shipping bar */}
        <div className="mb-8 p-4 bg-oryn-orange/5 border border-oryn-orange/10">
          {amountToFreeShipping > 0 ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-plex text-oryn-black/50">
                  {t.cart.freeShippingAway.replace("{amount}", formatPrice(amountToFreeShipping))}
                </p>
                <span className="text-[9px] font-mono text-oryn-orange">{Math.round(shippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-oryn-grey/30 overflow-hidden">
                <div className="h-full bg-oryn-orange transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-plex text-oryn-orange font-medium">{t.cart.freeShippingUnlocked}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-5 p-5 bg-white border border-oryn-grey/20"
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  className="w-24 h-24 bg-oryn-cream overflow-hidden relative shrink-0 flex items-center justify-center"
                >
                  <Image
                    src={categoryImages[item.product.category] || "/images/peptide-pen-real.png"}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/products/${item.product.slug}`} className="font-bold hover:text-oryn-orange transition-colors">
                        {item.product.name.startsWith("ORYN") ? item.product.name : `ORYN ${item.product.name}`}
                      </Link>
                      <p className="text-xs text-oryn-black/50 font-plex mt-0.5">
                        {item.product.subtitle} &middot; {item.product.dosage}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-oryn-black/30 hover:text-red-500 transition-colors p-1"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 bg-oryn-grey-light flex items-center justify-center text-sm hover:bg-oryn-orange hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="font-mono w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 bg-oryn-grey-light flex items-center justify-center text-sm hover:bg-oryn-orange hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-lg font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit sticky top-28 space-y-6">
            <div className="bg-oryn-grey-light p-6">
              <h3 className="text-sm font-bold tracking-wide mb-6">{t.cart.orderSummary}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-oryn-black/50">{t.cart.subtotal}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-oryn-black/50">{t.cart.shipping}</span>
                  {amountToFreeShipping <= 0 ? (
                    <span className="text-oryn-orange text-xs font-medium">{t.cart.free}</span>
                  ) : (
                    <span className="text-xs font-mono text-oryn-black/40">{t.cart.atCheckout}</span>
                  )}
                </div>
              </div>
              <div className="border-t border-oryn-grey/30 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t.cart.total}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full bg-oryn-orange text-white text-center py-4 font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-colors shadow-lg shadow-oryn-orange/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t.cart.checkout}
              </Link>
              <Link
                href="/products"
                className="block w-full text-center text-sm text-oryn-black/40 hover:text-oryn-orange mt-4 transition-colors"
              >
                {t.cart.continueShopping}
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-4 py-4">
              {[
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: t.cart.trustSecure },
                { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: t.cart.trustDiscreet },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: t.cart.trustCOA },
              ].map((trust) => (
                <div key={trust.label} className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
                    <path d={trust.icon} />
                  </svg>
                  <span className="text-[9px] font-mono text-oryn-black/40">{trust.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* You might also like */}
        {suggestions.length > 0 && (
          <div className="mt-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-oryn-orange" />
              <h2 className="text-lg font-bold tracking-wide">{t.cart.youMightLike}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-4 p-4 bg-white border border-oryn-grey/20 hover:border-oryn-orange/30 transition-colors group"
                >
                  <div className="w-16 h-16 bg-oryn-cream flex items-center justify-center shrink-0">
                    <Image
                      src={categoryImages[product.category] || "/images/peptide-pen-real.png"}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors">{product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`}</h3>
                    <p className="text-[10px] text-oryn-black/40 font-plex">{product.subtitle}</p>
                    <p className="text-sm font-bold text-oryn-orange mt-1">{formatPrice(product.price)}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" className="group-hover:stroke-oryn-orange transition-colors shrink-0">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
