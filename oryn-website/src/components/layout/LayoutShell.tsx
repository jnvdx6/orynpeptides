"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { ProductsProvider } from "@/providers/products";
import { AuthProvider } from "@/providers/auth";
import { AddToCartToast } from "@/components/ui/AddToCartToast";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Check for admin path (now under /[locale]/admin)
  const isAdmin = /^\/[a-z]{2}\/admin/.test(pathname) || pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <AddToCartToast />
          <Footer />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
