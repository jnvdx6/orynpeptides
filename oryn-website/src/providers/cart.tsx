"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { sdk } from "@/lib/medusa";
import { products as staticProducts, productImages, type Product } from "@/data/products";
import { useProducts } from "@/providers/products";
import { calculateVolumeDiscount, getVolumeDiscount, type VolumeDiscount } from "@/lib/discounts";
import { trackAddToCart, trackRemoveFromCart, trackCartOpened, trackPromoApplied, updateGeoFromShipping } from "@/lib/analytics";

// Medusa cart types (simplified for what we need)
interface MedusaLineItem {
  id: string;
  title: string;
  subtitle?: string;
  quantity: number;
  unit_price: number;
  total: number;
  variant_id: string;
  variant?: {
    id: string;
    title: string;
    sku?: string;
    product_id: string;
    product?: {
      id: string;
      title: string;
      handle: string;
      thumbnail?: string;
      metadata?: Record<string, unknown>;
    };
  };
  thumbnail?: string;
}

interface MedusaPaymentSession {
  id: string;
  provider_id: string;
  status: string;
  data: Record<string, unknown>;
}

interface MedusaPaymentCollection {
  id: string;
  status: string;
  payment_sessions?: MedusaPaymentSession[];
}

interface MedusaShippingMethod {
  id: string;
  shipping_option_id: string;
  amount: number;
}

export interface MedusaCart {
  id: string;
  region_id?: string;
  email?: string;
  items?: MedusaLineItem[];
  total?: number;
  subtotal?: number;
  discount_total?: number;
  shipping_total?: number;
  tax_total?: number;
  item_total?: number;
  shipping_address?: Record<string, unknown>;
  billing_address?: Record<string, unknown>;
  payment_collection?: MedusaPaymentCollection;
  shipping_methods?: MedusaShippingMethod[];
}

// Applied promotion from our custom promo system
interface AppliedPromotion {
  code: string;
  label: string;
  discountAmount: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

// Cart item for display — always derived from either Medusa or local state
export interface CartItem {
  product: Product;
  quantity: number;
  lineItemId?: string; // Medusa line item ID for cart operations
}

interface CartContextType {
  cart: MedusaCart | null;
  items: CartItem[];
  medusaConnected: boolean;
  cartLoaded: boolean;
  addItem: (product: Product, variantId?: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lastAdded: Product | null;
  appliedPromotion: AppliedPromotion | null;
  applyPromotion: (promo: AppliedPromotion) => void;
  removePromotion: () => void;
  validateAndApplyPromoCode: (code: string) => Promise<{ success: boolean; error?: string }>;
  discountedPrice: number;
  volumeDiscount: { discount: number; tier: VolumeDiscount } | null;
  finalPrice: number;
  refreshCart: () => Promise<MedusaCart | null>;
  setCartEmail: (email: string) => Promise<void>;
  setCartAddress: (address: Record<string, string>) => Promise<void>;
  addShippingMethod: (optionId: string) => Promise<void>;
  initPaymentSession: (providerId: string) => Promise<void>;
  completeCart: () => Promise<{ type: string; order?: unknown; cart?: unknown }>;
  loading: boolean;
}

const CART_ID_KEY = "oryn_medusa_cart_id";
const MAX_QUANTITY_PER_PRODUCT = 10;

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper: find product by Medusa handle/slug — tries resolved list first, falls back to static
function findProduct(handle: string | undefined, resolvedProducts: Product[], title?: string, productId?: string): Product | undefined {
  if (handle) {
    const bySlug = resolvedProducts.find((p) => p.slug === handle)
      || staticProducts.find((p) => p.slug === handle);
    if (bySlug) return bySlug;
  }
  // Try by Medusa product ID
  if (productId) {
    const byId = resolvedProducts.find((p) => p.id === productId);
    if (byId) return byId;
  }
  // Fallback: match by title/name when handle is missing or doesn't match
  if (title) {
    const normalizedTitle = title.replace(/^ORYN\s+/i, "");
    return resolvedProducts.find((p) => p.name === title || p.name === normalizedTitle)
      || staticProducts.find((p) => p.name === title || p.name === normalizedTitle);
  }
  return undefined;
}

// Helper: derive CartItems from Medusa cart line items
function deriveItemsFromMedusa(cart: MedusaCart, resolvedProducts: Product[]): CartItem[] {
  if (!cart.items || cart.items.length === 0) return [];
  return cart.items.map((lineItem) => {
    const handle = lineItem.variant?.product?.handle;
    const productId = lineItem.variant?.product_id;
    const matched = findProduct(handle, resolvedProducts, lineItem.title, productId);
    // Derive a readable slug from the title when handle is missing
    const fallbackSlug = handle
      || lineItem.title?.replace(/^ORYN\s+/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")
      || lineItem.id;
    // Build a Product from Medusa data if no match
    const product: Product = matched || {
      id: productId || lineItem.id,
      slug: fallbackSlug,
      name: lineItem.title,
      subtitle: lineItem.subtitle || "",
      category: "peptide-pen",
      categoryLabel: "Peptide Pen",
      dosage: "",
      volume: "",
      price: lineItem.unit_price,
      description: "",
      benefits: [],
      specs: {},
      image: productImages.bySlug[fallbackSlug] || lineItem.thumbnail || "/images/products/bpc157-hero.png",
    };
    return {
      product,
      quantity: lineItem.quantity,
      lineItemId: lineItem.id,
    };
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { products: resolvedProducts } = useProducts();
  const [cart, setCart] = useState<MedusaCart | null>(null);
  // Local-only items (fallback when Medusa is unavailable)
  const [localItems, setLocalItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [appliedPromotion, setAppliedPromotion] = useState<AppliedPromotion | null>(null);
  const [medusaConnected, setMedusaConnected] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Derive display items: Medusa cart items when connected, local items as fallback
  const medusaHasItems = medusaConnected && cart?.items && cart.items.length > 0;
  const items: CartItem[] = medusaHasItems ? deriveItemsFromMedusa(cart, resolvedProducts) : localItems;

  // Get or create a Medusa cart
  const refreshCart = useCallback(async (): Promise<MedusaCart | null> => {
    try {
      const storedCartId = localStorage.getItem(CART_ID_KEY);

      if (storedCartId) {
        try {
          const { cart: existingCart } = await sdk.store.cart.retrieve(storedCartId);
          setCart(existingCart as unknown as MedusaCart);
          setMedusaConnected(true);
          return existingCart as unknown as MedusaCart;
        } catch {
          localStorage.removeItem(CART_ID_KEY);
        }
      }

      // Create a new cart
      let regionId: string | undefined;
      try {
        const { regions } = await sdk.store.region.list({ limit: 1 });
        if (regions?.length > 0) {
          regionId = regions[0].id;
        }
      } catch {
        // No regions available
      }

      const createPayload: Record<string, unknown> = {};
      if (regionId) createPayload.region_id = regionId;

      const { cart: newCart } = await sdk.store.cart.create(createPayload);
      localStorage.setItem(CART_ID_KEY, newCart.id);
      setCart(newCart as unknown as MedusaCart);
      setMedusaConnected(true);
      return newCart as unknown as MedusaCart;
    } catch {
      setMedusaConnected(false);
      return null;
    } finally {
      setCartLoaded(true);
    }
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = useCallback(
    async (product: Product, variantId?: string, qty: number = 1) => {
      // Enforce quantity limit
      const currentQty = items.find((i) => i.product.id === product.id)?.quantity || 0;
      const addQty = Math.min(qty, MAX_QUANTITY_PER_PRODUCT - currentQty);
      if (addQty <= 0) return;

      setLastAdded(product);
      setIsOpen(true);
      setTimeout(() => setLastAdded(null), 3000);
      trackAddToCart({ name: product.name, slug: product.slug, price: product.price, category: product.category });

      if (medusaConnected) {
        try {
          let resolvedVariantId = variantId;

          if (!resolvedVariantId && product.slug) {
            try {
              const { products: medusaProducts } = await sdk.store.product.list({
                handle: product.slug,
                limit: 1,
              });
              if (medusaProducts?.[0]?.variants?.[0]?.id) {
                resolvedVariantId = medusaProducts[0].variants[0].id;
              }
            } catch (err) {
              console.error("[ORYN Cart] Variant resolution failed:", err instanceof Error ? err.message : err);
            }
          }

          if (resolvedVariantId) {
            const currentCart = cart || (await refreshCart());
            if (currentCart) {
              const { cart: updatedCart } = await sdk.store.cart.createLineItem(
                currentCart.id,
                {
                  variant_id: resolvedVariantId,
                  quantity: addQty,
                }
              );
              setCart(updatedCart as unknown as MedusaCart);
              return; // Success — Medusa is source of truth
            }
          }
        } catch (err) {
          console.error("[ORYN Cart] Medusa add-to-cart failed:", err instanceof Error ? err.message : err);
          // Falls through to local state fallback
        }
      }

      // Fallback: update local state only if Medusa failed
      setLocalItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + addQty }
              : item
          );
        }
        return [...prev, { product, quantity: addQty }];
      });
    },
    [cart, medusaConnected, refreshCart, items]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      const removedItem = items.find((i) => i.product.id === productId);
      if (removedItem) {
        trackRemoveFromCart({ name: removedItem.product.name, slug: removedItem.product.slug, price: removedItem.product.price });
      }
      if (medusaConnected && cart) {
        // Find the Medusa line item for this product
        const lineItem = cart.items?.find((li) => {
          const handle = li.variant?.product?.handle;
          const localProduct = findProduct(handle, resolvedProducts, li.title);
          return localProduct?.id === productId || li.id === productId;
        });

        if (lineItem) {
          try {
            const { cart: updatedCart } = await sdk.store.cart.deleteLineItem(
              cart.id,
              lineItem.id
            );
            setCart(updatedCart as unknown as MedusaCart);
            return;
          } catch (err) {
            console.error("[ORYN Cart] Remove item failed:", err instanceof Error ? err.message : err);
          }
        }
      }

      // Fallback: local state
      setLocalItems((prev) => prev.filter((item) => item.product.id !== productId));
    },
    [cart, medusaConnected, resolvedProducts]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      if (quantity <= 0) {
        return removeItem(productId);
      }
      if (quantity > MAX_QUANTITY_PER_PRODUCT) return;

      if (medusaConnected && cart) {
        const lineItem = cart.items?.find((li) => {
          const handle = li.variant?.product?.handle;
          const localProduct = findProduct(handle, resolvedProducts, li.title);
          return localProduct?.id === productId || li.id === productId;
        });

        if (lineItem) {
          try {
            const { cart: updatedCart } = await sdk.store.cart.updateLineItem(
              cart.id,
              lineItem.id,
              { quantity }
            );
            setCart(updatedCart as unknown as MedusaCart);
            return;
          } catch (err) {
            console.error("[ORYN Cart] Update quantity failed:", err instanceof Error ? err.message : err);
          }
        }
      }

      // Fallback: local state
      setLocalItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [cart, medusaConnected, removeItem, resolvedProducts]
  );

  const clearCart = useCallback(() => {
    setLocalItems([]);
    setAppliedPromotion(null);
    localStorage.removeItem(CART_ID_KEY);
    setCart(null);
  }, []);

  // Medusa checkout lifecycle methods
  const setCartEmail = useCallback(
    async (email: string) => {
      if (!cart || !medusaConnected) return;
      try {
        const { cart: updatedCart } = await sdk.store.cart.update(cart.id, { email });
        setCart(updatedCart as unknown as MedusaCart);
      } catch (err) {
        console.error("[ORYN Cart] Set email failed:", err instanceof Error ? err.message : err);
      }
    },
    [cart, medusaConnected]
  );

  const setCartAddress = useCallback(
    async (address: Record<string, string>) => {
      if (!cart || !medusaConnected) return;
      try {
        const medusaAddress = {
          first_name: address.firstName,
          last_name: address.lastName,
          address_1: address.address,
          city: address.city,
          postal_code: address.postalCode,
          country_code: address.country?.toLowerCase() || "gb",
          phone: address.phone,
        };
        const { cart: updatedCart } = await sdk.store.cart.update(cart.id, {
          shipping_address: medusaAddress,
          billing_address: medusaAddress,
        });
        setCart(updatedCart as unknown as MedusaCart);
        // Update PostHog with real shipping country for geo segmentation
        const countryCode = address.country?.toUpperCase();
        if (countryCode) updateGeoFromShipping(countryCode);
      } catch (err) {
        console.error("[ORYN Cart] Set address failed:", err instanceof Error ? err.message : err);
      }
    },
    [cart, medusaConnected]
  );

  const addShippingMethod = useCallback(
    async (optionId: string) => {
      if (!cart || !medusaConnected) return;
      try {
        const { cart: updatedCart } = await sdk.store.cart.addShippingMethod(
          cart.id,
          { option_id: optionId }
        );
        setCart(updatedCart as unknown as MedusaCart);
      } catch (err) {
        console.error("[ORYN Cart] Add shipping method failed:", err instanceof Error ? err.message : err);
      }
    },
    [cart, medusaConnected]
  );

  const initPaymentSession = useCallback(
    async (providerId: string) => {
      if (!cart || !medusaConnected) return;
      setLoading(true);
      try {
        const { cart: freshCart } = await sdk.store.cart.retrieve(cart.id);
        await sdk.store.payment.initiatePaymentSession(freshCart as Parameters<typeof sdk.store.payment.initiatePaymentSession>[0], {
          provider_id: providerId,
        });
        const { cart: updatedCart } = await sdk.store.cart.retrieve(cart.id);
        setCart(updatedCart as unknown as MedusaCart);
      } catch (err) {
        console.error("[ORYN Cart] Payment session init failed:", err instanceof Error ? err.message : err);
      } finally {
        setLoading(false);
      }
    },
    [cart, medusaConnected]
  );

  const completeCart = useCallback(async () => {
    if (!cart || !medusaConnected) {
      return { type: "error" };
    }
    setLoading(true);
    try {
      const result = await sdk.store.cart.complete(cart.id);
      if (result.type === "order") {
        clearCart();
      }
      return result as { type: string; order?: unknown; cart?: unknown };
    } catch (err) {
      console.error("[ORYN Cart] Complete cart failed:", err instanceof Error ? err.message : err);
      return { type: "error" };
    } finally {
      setLoading(false);
    }
  }, [cart, medusaConnected, clearCart]);

  const applyPromotion = useCallback(
    (promo: AppliedPromotion) => {
      setAppliedPromotion(promo);
      if (cart && medusaConnected) {
        sdk.store.cart
          .update(cart.id, { promo_codes: [promo.code] })
          .then(({ cart: updatedCart }) => {
            setCart(updatedCart as unknown as MedusaCart);
          })
          .catch((err: unknown) => console.error("[ORYN Cart] Apply promo failed:", err instanceof Error ? err.message : err));
      }
    },
    [cart, medusaConnected]
  );

  const removePromotion = useCallback(() => {
    setAppliedPromotion(null);
  }, []);

  // Calculate totals
  const totalItems = medusaHasItems
    ? cart.items!.reduce((sum, item) => sum + item.quantity, 0)
    : localItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = medusaHasItems && cart?.subtotal != null
    ? cart.subtotal
    : localItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discountedPrice = appliedPromotion
    ? Math.max(0, Math.round((totalPrice - appliedPromotion.discountAmount) * 100) / 100)
    : totalPrice;

  // Volume discount calculation
  const volumeDiscount = calculateVolumeDiscount(discountedPrice, totalItems);

  // Final price after all discounts
  const finalPrice = volumeDiscount
    ? Math.max(0, Math.round((discountedPrice - volumeDiscount.discount) * 100) / 100)
    : discountedPrice;

  const validateAndApplyPromoCode = useCallback(
    async (code: string): Promise<{ success: boolean; error?: string }> => {
      const normalizedCode = code.trim().toUpperCase();
      if (!normalizedCode) return { success: false, error: "Code is required" };

      try {
        // Try Medusa native promotions first
        if (medusaConnected && cart) {
          try {
            await sdk.store.cart.update(cart.id, { promo_codes: [normalizedCode] });
            const refreshedCart = await refreshCart();
            const discountTotal = (refreshedCart?.discount_total as number) || 0;
            if (discountTotal > 0) {
              const promo: AppliedPromotion = {
                code: normalizedCode,
                label: normalizedCode,
                discountAmount: discountTotal,
                discountType: "fixed",
                discountValue: discountTotal,
              };
              setAppliedPromotion(promo);
              trackPromoApplied(normalizedCode, "fixed", discountTotal);
              return { success: true };
            }
          } catch {
            // Fall through to local validation
          }
        }

        // Fallback: local promotion system
        const res = await fetch("/api/promotions/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: normalizedCode,
            subtotal: totalPrice,
            productIds: items.map((i) => i.product.id),
          }),
        });
        const data = await res.json();
        if (data.valid && data.promotion) {
          const promo: AppliedPromotion = {
            code: data.promotion.code,
            label: data.promotion.label,
            discountAmount: data.discountAmount,
            discountType: data.promotion.discountType,
            discountValue: data.promotion.discountValue,
          };
          setAppliedPromotion(promo);
          if (cart && medusaConnected) {
            sdk.store.cart
              .update(cart.id, { promo_codes: [promo.code] })
              .then(({ cart: updatedCart }) => setCart(updatedCart as unknown as MedusaCart))
              .catch(() => {});
          }
          trackPromoApplied(data.promotion.code, data.promotion.discountType, data.promotion.discountValue);
          return { success: true };
        }
        return { success: false, error: data.error || "Invalid promo code" };
      } catch {
        return { success: false, error: "Failed to validate code" };
      }
    },
    [cart, medusaConnected, refreshCart, totalPrice, items]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        medusaConnected,
        cartLoaded,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen: (open: boolean) => {
          if (open && !isOpen) trackCartOpened();
          setIsOpen(open);
        },
        lastAdded,
        appliedPromotion,
        applyPromotion,
        removePromotion,
        validateAndApplyPromoCode,
        discountedPrice,
        volumeDiscount,
        finalPrice,
        refreshCart,
        setCartEmail,
        setCartAddress,
        addShippingMethod,
        initPaymentSession,
        completeCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}


