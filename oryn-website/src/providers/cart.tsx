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
import type { Product } from "@/data/products";

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

// Fallback local cart item (used when Medusa backend is unavailable)
interface LocalCartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  // Medusa cart (server-side, the source of truth when available)
  cart: MedusaCart | null;
  // Local cart items (fallback + for display mapping)
  items: LocalCartItem[];
  // Whether we're connected to Medusa
  medusaConnected: boolean;
  // Cart actions
  addItem: (product: Product, variantId?: string) => Promise<void>;
  removeItem: (productId: string, lineItemId?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, lineItemId?: string) => Promise<void>;
  clearCart: () => void;
  // Cart state
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  lastAdded: Product | null;
  // Promotions
  appliedPromotion: AppliedPromotion | null;
  applyPromotion: (promo: AppliedPromotion) => void;
  removePromotion: () => void;
  discountedPrice: number;
  // Medusa cart lifecycle
  refreshCart: () => Promise<MedusaCart | null>;
  setCartEmail: (email: string) => Promise<void>;
  setCartAddress: (address: Record<string, string>) => Promise<void>;
  addShippingMethod: (optionId: string) => Promise<void>;
  initPaymentSession: (providerId: string) => Promise<void>;
  completeCart: () => Promise<{ type: string; order?: unknown; cart?: unknown }>;
  loading: boolean;
}

const CART_ID_KEY = "oryn_medusa_cart_id";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<MedusaCart | null>(null);
  const [items, setItems] = useState<LocalCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<Product | null>(null);
  const [appliedPromotion, setAppliedPromotion] = useState<AppliedPromotion | null>(null);
  const [medusaConnected, setMedusaConnected] = useState(false);
  const [loading, setLoading] = useState(false);

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
          // Cart expired or invalid, create new one
          localStorage.removeItem(CART_ID_KEY);
        }
      }

      // Create a new cart - try to get region first
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
    }
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Sync local items from Medusa cart
  useEffect(() => {
    if (cart?.items && medusaConnected) {
      // We keep the local items in sync for display purposes
      // but Medusa is the source of truth
    }
  }, [cart, medusaConnected]);

  const addItem = useCallback(
    async (product: Product, variantId?: string) => {
      // Always update local state for immediate UI feedback
      setItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      setLastAdded(product);
      setIsOpen(true);
      setTimeout(() => setLastAdded(null), 3000);

      // Add to Medusa cart if connected
      if (medusaConnected) {
        try {
          let resolvedVariantId = variantId;

          // If no variantId provided, look up the product in Medusa by slug/handle
          if (!resolvedVariantId && product.slug) {
            try {
              const { products: medusaProducts } = await sdk.store.product.list({
                handle: product.slug,
                limit: 1,
              });
              if (medusaProducts?.[0]?.variants?.[0]?.id) {
                resolvedVariantId = medusaProducts[0].variants[0].id;
              }
            } catch {
              console.warn("Failed to resolve variant for:", product.slug);
            }
          }

          if (resolvedVariantId) {
            const currentCart = cart || (await refreshCart());
            if (currentCart) {
              const { cart: updatedCart } = await sdk.store.cart.createLineItem(
                currentCart.id,
                {
                  variant_id: resolvedVariantId,
                  quantity: 1,
                }
              );
              setCart(updatedCart as unknown as MedusaCart);
            }
          }
        } catch (err) {
          console.warn("Failed to add item to Medusa cart:", err);
        }
      }
    },
    [cart, medusaConnected, refreshCart]
  );

  const removeItem = useCallback(
    async (productId: string, lineItemId?: string) => {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));

      if (medusaConnected && cart && lineItemId) {
        try {
          const { cart: updatedCart } = await sdk.store.cart.deleteLineItem(
            cart.id,
            lineItemId
          );
          setCart(updatedCart as unknown as MedusaCart);
        } catch (err) {
          console.warn("Failed to remove item from Medusa cart:", err);
        }
      }
    },
    [cart, medusaConnected]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number, lineItemId?: string) => {
      if (quantity <= 0) {
        return removeItem(productId, lineItemId);
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );

      if (medusaConnected && cart && lineItemId) {
        try {
          const { cart: updatedCart } = await sdk.store.cart.updateLineItem(
            cart.id,
            lineItemId,
            { quantity }
          );
          setCart(updatedCart as unknown as MedusaCart);
        } catch (err) {
          console.warn("Failed to update Medusa cart item:", err);
        }
      }
    },
    [cart, medusaConnected, removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
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
        console.warn("Failed to set cart email:", err);
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
          country_code: address.country?.toLowerCase() || "es",
          phone: address.phone,
        };
        const { cart: updatedCart } = await sdk.store.cart.update(cart.id, {
          shipping_address: medusaAddress,
          billing_address: medusaAddress,
        });
        setCart(updatedCart as unknown as MedusaCart);
      } catch (err) {
        console.warn("Failed to set cart address:", err);
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
        console.warn("Failed to add shipping method:", err);
      }
    },
    [cart, medusaConnected]
  );

  const initPaymentSession = useCallback(
    async (providerId: string) => {
      if (!cart || !medusaConnected) return;
      setLoading(true);
      try {
        // Initialize payment collection
        await sdk.store.payment.initiatePaymentSession(cart, {
          provider_id: providerId,
        });
        // Refresh cart to get payment session data
        const { cart: updatedCart } = await sdk.store.cart.retrieve(cart.id);
        setCart(updatedCart as unknown as MedusaCart);
      } catch (err) {
        console.warn("Failed to init payment session:", err);
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
      console.error("Failed to complete cart:", err);
      return { type: "error" };
    } finally {
      setLoading(false);
    }
  }, [cart, medusaConnected, clearCart]);

  const applyPromotion = useCallback(
    (promo: AppliedPromotion) => {
      setAppliedPromotion(promo);
      // Also try adding promo code to Medusa cart
      if (cart && medusaConnected) {
        sdk.store.cart
          .update(cart.id, { promo_codes: [promo.code] })
          .then(({ cart: updatedCart }) => {
            setCart(updatedCart as unknown as MedusaCart);
          })
          .catch(() => {
            // Promo handled locally if Medusa doesn't support it
          });
      }
    },
    [cart, medusaConnected]
  );

  const removePromotion = useCallback(() => {
    setAppliedPromotion(null);
  }, []);

  // Calculate totals - prefer Medusa cart totals when available
  const totalItems = medusaConnected && cart?.items
    ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
    : items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = medusaConnected && cart?.subtotal != null
    ? cart.subtotal / 100 // Medusa stores amounts in cents
    : items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discountedPrice = appliedPromotion
    ? Math.max(0, Math.round((totalPrice - appliedPromotion.discountAmount) * 100) / 100)
    : totalPrice;

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        medusaConnected,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        lastAdded,
        appliedPromotion,
        applyPromotion,
        removePromotion,
        discountedPrice,
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
