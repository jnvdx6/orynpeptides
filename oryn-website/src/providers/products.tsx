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
import { markets } from "@/i18n/config";

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
  categories: typeof staticCategories;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  loading: boolean;
  medusaConnected: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// ─── Mapper: Medusa product → local Product type ─────────────────
function mapMedusaProduct(mp: MedusaStoreProduct, currencyCode: string): Product {
  const meta = mp.metadata || {};
  const slug = mp.handle;
  const staticProduct = staticProducts.find((p) => p.slug === slug);

  // Price: prefer current currency, fall back to any, then static
  const variant = mp.variants?.[0];
  const currPrice = variant?.prices?.find(
    (p) => p.currency_code === currencyCode.toLowerCase()
  );
  const fallbackPrice = variant?.prices?.[0];
  const price = currPrice?.amount ?? fallbackPrice?.amount ?? staticProduct?.price ?? 0;

  // Benefits: stored as JSON string in metadata
  let benefits: string[] = staticProduct?.benefits || [];
  if (meta.benefits) {
    try {
      const parsed = typeof meta.benefits === "string"
        ? JSON.parse(meta.benefits)
        : meta.benefits;
      if (Array.isArray(parsed)) benefits = parsed;
    } catch {
      // keep static fallback
    }
  }

  // Specs: merge from metadata + static fallback
  const specs: Record<string, string> = { ...(staticProduct?.specs || {}) };
  const specFields: Record<string, string> = {
    purity: "Purity",
    volume: "Fill Volume",
    dosage: "Dosage",
    dosingPeriod: "Dosing Period",
    storage: "Storage",
    shelfLife: "Shelf Life",
    sterilization: "Sterilization",
    frequency: "Frequency",
    mechanism: "Mechanism",
    bioavailability: "Bioavailability",
    dosing: "Dosing",
  };
  for (const [metaKey, specLabel] of Object.entries(specFields)) {
    if (meta[metaKey]) specs[specLabel] = meta[metaKey] as string;
  }

  // Category from metadata
  const category = (meta.category as Product["category"]) || staticProduct?.category || "peptide-pen";
  const categoryLabel = (meta.categoryLabel as string) || staticProduct?.categoryLabel || "Peptide Pen";

  // Images: Medusa images if uploaded, otherwise static
  const medusaImgs = mp.images?.map((img) => img.url).filter(Boolean) || [];
  const image = mp.thumbnail
    || (medusaImgs.length > 0 ? medusaImgs[0] : undefined)
    || productImages.bySlug[slug]
    || staticProduct?.image
    || "/images/products/pen-bpc157.png";

  // Name: strip "ORYN " prefix — components re-add it
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
  };
}

// ─── Provider component ──────────────────────────────────────────
export function ProductsProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const currencyCode = markets[locale].currencyCode;

  const [medusaProducts, setMedusaProducts] = useState<MedusaStoreProduct[]>([]);
  const [medusaConnected, setMedusaConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        const { products: fetched } = await sdk.store.product.list({
          limit: 50,
          fields: "+metadata,+images,+variants.prices,+collection",
        });

        if (!cancelled && fetched) {
          setMedusaProducts(fetched as unknown as MedusaStoreProduct[]);
          setMedusaConnected(true);
        }
      } catch (err) {
        void err; // Falls back to static data
        if (!cancelled) setMedusaConnected(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  // Map Medusa products → Product[], or fall back to static
  const products = useMemo<Product[]>(() => {
    if (!medusaConnected || medusaProducts.length === 0) {
      return staticProducts;
    }
    const mapped = medusaProducts.map((mp) => mapMedusaProduct(mp, currencyCode));
    // Preserve ordering: match static products order, then append any new ones
    const bySlug = new Map(mapped.map((p) => [p.slug, p]));
    const ordered: Product[] = [];
    for (const sp of staticProducts) {
      const resolved = bySlug.get(sp.slug);
      if (resolved) {
        ordered.push(resolved);
        bySlug.delete(sp.slug);
      }
    }
    // Append products from Medusa that don't exist in static data
    for (const remaining of bySlug.values()) {
      ordered.push(remaining);
    }
    return ordered;
  }, [medusaProducts, medusaConnected, currencyCode]);

  // Derive categories with dynamic counts
  const categories = useMemo(() => {
    return staticCategories.map((cat) => ({
      ...cat,
      count: products.filter((p) => p.category === cat.id).length,
    }));
  }, [products]);

  const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
  const getProductsByCategory = (category: string) => products.filter((p) => p.category === category);

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        getProductBySlug,
        getProductsByCategory,
        loading,
        medusaConnected,
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
