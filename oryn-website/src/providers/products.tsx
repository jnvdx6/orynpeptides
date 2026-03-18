"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { sdk } from "@/lib/medusa";
import {
  products as staticProducts,
  productImages,
  categories as staticCategories,
  type Product,
} from "@/data/products";
import { useLocale } from "@/i18n/LocaleContext";

// ─── Medusa store API types ──────────────────────────────────────
interface MedusaPrice {
  currency_code: string;
  amount: number;
}

interface MedusaVariant {
  id: string;
  title: string;
  sku: string | null;
  prices: MedusaPrice[];
}

interface MedusaImage {
  url: string;
}

interface MedusaStoreProduct {
  id: string;
  title: string;
  handle: string;
  subtitle: string | null;
  description: string | null;
  thumbnail: string | null;
  images: MedusaImage[];
  metadata: Record<string, unknown> | null;
  collection?: { id: string; title: string; handle: string } | null;
  variants: MedusaVariant[];
}

// ─── Context type ────────────────────────────────────────────────
interface ProductsContextType {
  products: Product[];
  categories: (typeof staticCategories[number] & { count: number; minPrice: number })[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsByCollection: (handle: string) => Product[];
  loading: boolean;
  medusaConnected: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// ─── Mapper: Medusa product → local Product type ─────────────────
// Medusa returns the correct price for the region — just use the first price.
function mapMedusaProduct(mp: MedusaStoreProduct, currencyCode: string): Product {
  const meta = mp.metadata || {};
  const slug = mp.handle;
  const staticProduct = staticProducts.find((p) => p.slug === slug);

  // Price: Medusa returns region-filtered prices when region_id is passed.
  // Pick the price matching the region's currency, or fallback.
  const variant = mp.variants?.[0];
  const regionPrice = variant?.prices?.find(
    (p) => p.currency_code === currencyCode
  );
  const fallbackPrice = variant?.prices?.[0];
  const price = regionPrice?.amount ?? fallbackPrice?.amount ?? staticProduct?.price ?? 0;

  // Benefits
  let benefits: string[] = staticProduct?.benefits || [];
  if (meta.benefits) {
    try {
      const parsed = typeof meta.benefits === "string"
        ? JSON.parse(meta.benefits)
        : meta.benefits;
      if (Array.isArray(parsed)) benefits = parsed;
    } catch { /* keep static */ }
  }

  // Specs
  const specs: Record<string, string> = { ...(staticProduct?.specs || {}) };
  const specFields: Record<string, string> = {
    purity: "Purity", volume: "Fill Volume", dosage: "Dosage",
    dosingPeriod: "Dosing Period", storage: "Storage", shelfLife: "Shelf Life",
    sterilization: "Sterilization", frequency: "Frequency", mechanism: "Mechanism",
    bioavailability: "Bioavailability", dosing: "Dosing",
  };
  for (const [metaKey, specLabel] of Object.entries(specFields)) {
    if (meta[metaKey]) specs[specLabel] = meta[metaKey] as string;
  }

  const category = (meta.category as Product["category"]) || staticProduct?.category || "peptide-pen";
  const categoryLabel = (meta.categoryLabel as string) || staticProduct?.categoryLabel || "Peptide Pen";
  const collectionHandle = mp.collection?.handle || null;

  const medusaImgs = mp.images?.map((img) => img.url).filter(Boolean) || [];
  const image = mp.thumbnail
    || (medusaImgs.length > 0 ? medusaImgs[0] : undefined)
    || productImages.bySlug[slug]
    || staticProduct?.image
    || "/images/products/peptide-pen-black.png";

  let name = mp.title;
  if (name.startsWith("ORYN ")) name = name.substring(5);

  return {
    id: mp.id,
    slug,
    name,
    subtitle: mp.subtitle || staticProduct?.subtitle || "",
    category,
    categoryLabel,
    dosage: (meta.dosage as string) || staticProduct?.dosage || "",
    volume: (meta.volume as string) || staticProduct?.volume || "",
    price,
    description: mp.description || staticProduct?.description || "",
    benefits,
    specs,
    badge: (meta.badge as string) || staticProduct?.badge,
    image,
    images: medusaImgs.length > 0 ? medusaImgs : staticProduct?.images,
    researchAreas: (meta.researchAreas as string[]) || staticProduct?.researchAreas,
    videoUrl: (meta.videoUrl as string) || staticProduct?.videoUrl,
    collectionHandle,
  };
}

// ─── Provider component ──────────────────────────────────────────
export function ProductsProvider({ children }: { children: ReactNode }) {
  const { regionId, currencyCode } = useLocale();

  const [medusaProducts, setMedusaProducts] = useState<MedusaStoreProduct[]>([]);
  const [medusaConnected, setMedusaConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Re-fetch when region changes to get correct prices
  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      try {
        const { products: fetched } = await sdk.store.product.list({
          limit: 50,
          region_id: regionId,
          fields: "+metadata,+images,+variants.prices,+collection",
        });

        if (!cancelled && fetched) {
          setMedusaProducts(fetched as unknown as MedusaStoreProduct[]);
          setMedusaConnected(true);
        }
      } catch (err) {
        void err;
        if (!cancelled) setMedusaConnected(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, [regionId]);

  // Map products with region-specific prices
  const products = useMemo<Product[]>(() => {
    if (!medusaConnected || medusaProducts.length === 0) {
      return staticProducts;
    }
    const mapped = medusaProducts.map((mp) => mapMedusaProduct(mp, currencyCode));
    const bySlug = new Map(mapped.map((p) => [p.slug, p]));
    const ordered: Product[] = [];
    for (const sp of staticProducts) {
      const resolved = bySlug.get(sp.slug);
      if (resolved) {
        ordered.push(resolved);
        bySlug.delete(sp.slug);
      }
    }
    for (const remaining of bySlug.values()) {
      ordered.push(remaining);
    }
    return ordered;
  }, [medusaProducts, medusaConnected, currencyCode]);

  const categories = useMemo(() => {
    return staticCategories.map((cat) => {
      const catProducts = products.filter((p) => p.category === cat.id);
      const minPrice = catProducts.length > 0
        ? Math.min(...catProducts.map((p) => p.price))
        : 0;
      return { ...cat, count: catProducts.length, minPrice };
    });
  }, [products]);

  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
  const getProductsByCategory = (category: string) => products.filter((p) => p.category === category);
  const getProductsByCollection = (handle: string) => products.filter((p) => p.collectionHandle === handle);

  return (
    <ProductsContext.Provider
      value={{
        products, categories, getProductBySlug,
        getProductsByCategory, getProductsByCollection,
        loading, medusaConnected,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
}
