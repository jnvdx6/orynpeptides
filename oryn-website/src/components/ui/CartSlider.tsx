"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { products } from "@/data/products";

const categoryImages: Record<string, string> = {
  "peptide-pen": "/images/peptide-pen-real.png",
  "medit-pen": "/images/medit-box.png",
  novadose: "/images/novadose-pen-real.png",
};

const FREE_SHIPPING_THRESHOLD = 150;

export function CartSlider() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen, addItem, appliedPromotion, removePromotion, discountedPrice } =
    useCart();
  const { t, formatPrice } = useLocale();

  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

  // Suggest a product not in cart
  const cartIds = new Set(items.map((i) => i.product.id));
  const suggestion = products.find((p) => !cartIds.has(p.id) && p.badge);

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
                <p className="text-[10px] font-plex text-oryn-orange font-medium">{t.cart.freeShippingUnlocked}</p>
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
                      src={categoryImages[item.product.category] || "/images/peptide-pen-real.png"}
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
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-6 h-6 bg-oryn-grey/40 flex items-center justify-center text-xs hover:bg-oryn-orange hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-mono w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-6 h-6 bg-oryn-grey/40 flex items-center justify-center text-xs hover:bg-oryn-orange hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-oryn-black/20 hover:text-red-500 transition-colors p-0.5"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell suggestion */}
              {suggestion && (
                <div className="mt-4 p-3 border border-dashed border-oryn-orange/20 bg-oryn-orange/5">
                  <p className="text-[9px] font-mono text-oryn-orange tracking-[0.15em] mb-2">{t.cart.youMightLike}</p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/products/${suggestion.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="w-10 h-10 bg-oryn-cream flex items-center justify-center shrink-0"
                    >
                      <Image
                        src={categoryImages[suggestion.category] || "/images/peptide-pen-real.png"}
                        alt={suggestion.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </Link>
                    <Link
                      href={`/products/${suggestion.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex-1 min-w-0 group"
                    >
                      <p className="text-xs font-bold group-hover:text-oryn-orange transition-colors truncate">{suggestion.name.startsWith("ORYN") ? suggestion.name : `ORYN ${suggestion.name}`}</p>
                      <p className="text-[10px] text-oryn-black/40 font-plex">{formatPrice(suggestion.price)}</p>
                    </Link>
                    <button
                      onClick={() => addItem(suggestion)}
                      className="shrink-0 px-3 py-2 bg-oryn-orange text-white text-[9px] font-bold tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors flex items-center gap-1.5"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      ADD
                    </button>
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
              <span className={`text-lg font-bold ${appliedPromotion ? 'text-oryn-black/40 line-through text-base' : ''}`}>{formatPrice(totalPrice)}</span>
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
                <span className="text-lg font-bold">{formatPrice(discountedPrice)}</span>
              </div>
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
