"use client";

import { useCart } from "@/lib/cart-context";
import { products } from "@/data/products";

export function BundleAddToCart({ productSlugs }: { productSlugs: string[] }) {
  const { addItem } = useCart();

  const handleAddAll = async () => {
    for (const slug of productSlugs) {
      const product = products.find((p) => p.slug === slug);
      if (product) await addItem(product);
    }
  };

  return (
    <button
      onClick={handleAddAll}
      className="w-full sm:w-auto px-8 py-4 bg-oryn-orange text-white font-bold text-sm tracking-wide hover:bg-oryn-orange/90 transition-colors"
    >
      ADD BUNDLE TO CART
    </button>
  );
}
