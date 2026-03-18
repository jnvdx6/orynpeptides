"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

const MAX_COMPARE = 4;
const SESSION_KEY = "oryn_compare_products";

interface CompareContextType {
  selectedProducts: Product[];
  toggleCompare: (product: Product) => void;
  clearComparison: () => void;
  isComparing: (productId: string) => boolean;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Restore from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Product[];
        if (Array.isArray(parsed)) setSelectedProducts(parsed);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to sessionStorage on change
  useEffect(() => {
    try {
      if (selectedProducts.length > 0) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(selectedProducts));
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [selectedProducts]);

  const toggleCompare = useCallback((product: Product) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, product];
    });
  }, []);

  const clearComparison = useCallback(() => {
    setSelectedProducts([]);
  }, []);

  const isComparing = useCallback(
    (productId: string) => selectedProducts.some((p) => p.id === productId),
    [selectedProducts]
  );

  const canAddMore = selectedProducts.length < MAX_COMPARE;

  return (
    <CompareContext.Provider
      value={{
        selectedProducts,
        toggleCompare,
        clearComparison,
        isComparing,
        canAddMore,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}
