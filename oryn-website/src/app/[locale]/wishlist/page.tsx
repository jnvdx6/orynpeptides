"use client";

import { useWishlist } from "@/providers/wishlist";
import { useProducts } from "@/providers/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Link } from "@/components/ui/LocaleLink";

export default function WishlistPage() {
  const { items: wishlistIds, totalItems } = useWishlist();
  const { products } = useProducts();

  const wishlistProducts = wishlistIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="pt-[calc(1rem+4px)] pb-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] mb-8">
          <Link href="/" className="hover:text-oryn-orange transition-colors">HOME</Link>
          <span className="text-oryn-orange">/</span>
          <span className="text-oryn-orange">WISHLIST</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
            <p className="text-xs text-oryn-black/40 font-plex mt-1">
              {totalItems === 0
                ? "Your wishlist is empty"
                : `${totalItems} item${totalItems !== 1 ? "s" : ""} saved`}
            </p>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-oryn-grey-light flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-oryn-black/20">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">No saved items yet</h2>
            <p className="text-sm text-oryn-black/40 font-plex mb-6">
              Browse our products and click the heart icon to save items for later.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
            >
              BROWSE PRODUCTS
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-oryn-grey/20">
            {wishlistProducts.map((product) => (
              <ProductCard key={product!.id} product={product!} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
