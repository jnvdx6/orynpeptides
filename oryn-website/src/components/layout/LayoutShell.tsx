"use client";

import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { ProductsProvider } from "@/providers/products";
import { AuthProvider } from "@/providers/auth";
import { WishlistProvider } from "@/providers/wishlist";
import { CompareProvider } from "@/providers/compare";
import { CompareBar } from "@/components/products/CompareBar";
import { AddToCartToast } from "@/components/ui/AddToCartToast";
import { ExitIntentPopup } from "@/components/ui/ExitIntentPopup";
import { FirstVisitPopup } from "@/components/ui/FirstVisitPopup";
import { FlashSaleBanner } from "@/components/ui/FlashSaleBanner";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SocialProofToast } from "@/components/ui/SocialProofToast";
import { BackToTop } from "@/components/ui/BackToTop";
import { ReferralCaptureProvider } from "@/components/ui/ReferralCaptureProvider";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Check for admin path (now under /[locale]/admin)
  const isAdmin = /^\/[a-z]{2}\/admin/.test(pathname) || pathname.startsWith("/admin");

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <Suspense fallback={null}>
                <ReferralCaptureProvider />
              </Suspense>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-oryn-orange focus:text-white focus:text-sm focus:font-medium"
              >
                Skip to main content
              </a>
              <FlashSaleBanner />
              <Header />
              <main id="main-content">{children}</main>
              <AddToCartToast />
              <CompareBar />
              <ExitIntentPopup />
              <FirstVisitPopup />
              <CookieConsent />
              <SocialProofToast />
              <BackToTop />
              <Footer />
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
