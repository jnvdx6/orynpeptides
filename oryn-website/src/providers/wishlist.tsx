"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { trackWishlistAdd, trackWishlistRemove } from "@/lib/analytics";

interface WishlistContextType {
  items: string[]; // product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

const WISHLIST_KEY = "oryn_wishlist";
const TOKEN_KEY = "oryn_medusa_auth_token";
const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "";

// Map of product_id -> wishlist_item_id (for Medusa delete operations)
let medusaItemMap: Record<string, string> = {};

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const pk = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
  if (pk) headers["x-publishable-api-key"] = pk;
  return headers;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  // Load wishlist: from Medusa if authenticated, else localStorage
  useEffect(() => {
    const token = getToken();
    if (token && MEDUSA_URL) {
      // Fetch from Medusa
      fetch(`${MEDUSA_URL}/store/wishlist`, {
        headers: getAuthHeaders(),
      })
        .then((r) => r.json())
        .then((data) => {
          const wishlistItems = data.wishlist_items || [];
          const productIds = wishlistItems.map((item: any) => item.product_id);
          // Build the item map for deletions
          medusaItemMap = {};
          wishlistItems.forEach((item: any) => {
            medusaItemMap[item.product_id] = item.id;
          });
          setItems(productIds);
          // Also sync to localStorage as fallback
          localStorage.setItem(WISHLIST_KEY, JSON.stringify(productIds));
        })
        .catch(() => {
          // Fallback to localStorage
          try {
            const stored = localStorage.getItem(WISHLIST_KEY);
            if (stored) setItems(JSON.parse(stored));
          } catch { /* ignore */ }
        });
    } else {
      // Anonymous: use localStorage
      try {
        const stored = localStorage.getItem(WISHLIST_KEY);
        if (stored) setItems(JSON.parse(stored));
      } catch { /* ignore */ }
    }
  }, []);

  // Persist to localStorage as fallback
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });

    // Sync to Medusa if authenticated
    const token = getToken();
    if (token && MEDUSA_URL) {
      fetch(`${MEDUSA_URL}/store/wishlist`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ product_id: productId }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.wishlist_item) {
            medusaItemMap[productId] = data.wishlist_item.id;
          }
        })
        .catch(() => { /* silent */ });
    }
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((id) => id !== productId));

    // Sync to Medusa if authenticated
    const token = getToken();
    const medusaId = medusaItemMap[productId];
    if (token && MEDUSA_URL && medusaId) {
      fetch(`${MEDUSA_URL}/store/wishlist/${medusaId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      }).catch(() => { /* silent */ });
      delete medusaItemMap[productId];
    }
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) {
        trackWishlistRemove(productId);
        // Remove from Medusa
        const token = getToken();
        const medusaId = medusaItemMap[productId];
        if (token && MEDUSA_URL && medusaId) {
          fetch(`${MEDUSA_URL}/store/wishlist/${medusaId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
          }).catch(() => { /* silent */ });
          delete medusaItemMap[productId];
        }
        return prev.filter((id) => id !== productId);
      }
      trackWishlistAdd(productId);
      // Add to Medusa
      const token = getToken();
      if (token && MEDUSA_URL) {
        fetch(`${MEDUSA_URL}/store/wishlist`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ product_id: productId }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.wishlist_item) {
              medusaItemMap[productId] = data.wishlist_item.id;
            }
          })
          .catch(() => { /* silent */ });
      }
      return [...prev, productId];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.includes(productId),
    [items]
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        totalItems: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
