"use client";

import { useWishlist } from "@/providers/wishlist";
import { useProducts } from "@/providers/products";
import { useCart } from "@/lib/cart-context";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import Image from "next/image";
import { productImages } from "@/data/products";

export default function WishlistPage() {
  const { items: wishlistIds, removeFromWishlist } = useWishlist();
  const { products } = useProducts();
  const { addItem } = useCart();
  const { formatPrice, t } = useLocale();
  const w = t.account.wishlist;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="space-y-6">
      <div className="bg-white border border-oryn-grey/15 p-6">
        <div className="flex items-center gap-3 mb-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          <h1 className="text-2xl font-bold tracking-tight">{w.title}</h1>
        </div>
        <p className="text-xs text-oryn-black/40 font-plex">
          {wishlistProducts.length} {wishlistProducts.length !== 1 ? w.itemsSaved : w.itemSaved}
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white border border-oryn-grey/15 p-12 text-center">
          <div className="w-16 h-16 bg-oryn-grey/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <p className="text-sm text-oryn-black/40 font-plex mb-2">{w.empty}</p>
          <p className="text-xs text-oryn-black/30 font-plex mb-4">{w.emptyDesc}</p>
          <Link
            href="/products"
            className="inline-block px-6 py-2.5 bg-oryn-orange text-white text-xs font-medium tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
          >
            {w.browseProducts}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="bg-white border border-oryn-grey/15 p-4 flex gap-4">
              <Link href={`/products/${product.slug}`} className="w-20 h-20 bg-oryn-cream flex items-center justify-center shrink-0">
                <Image
                  src={productImages.bySlug[product.slug] || "/images/products/bpc157-hero.png"}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${product.slug}`} className="text-sm font-bold hover:text-oryn-orange transition-colors block truncate">
                  {product.name.startsWith("ORYN") ? product.name : `ORYN ${product.name}`}
                </Link>
                <p className="text-[10px] text-oryn-black/40 font-plex">{product.subtitle}</p>
                <p className="text-lg font-bold text-oryn-orange mt-1">{formatPrice(product.price)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => addItem(product)}
                    className="px-3 py-1.5 bg-oryn-orange text-white text-[9px] font-medium tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
                  >
                    {w.addToCart}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="px-3 py-1.5 border border-red-200 text-red-400 text-[9px] font-medium tracking-[0.1em] hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    {w.remove}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
