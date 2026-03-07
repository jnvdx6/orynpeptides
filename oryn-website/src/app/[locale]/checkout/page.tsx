"use client";

import { useCart } from "@/lib/cart-context";
import { useState, useEffect, useCallback } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import Image from "next/image";
import StripeCheckout from "@/components/checkout/StripeCheckout";

type CryptoOption = "BTC" | "ETH" | "USDT" | "SOL";
type PaymentMethod = "card" | "crypto";

const CRYPTO_NAMES: Record<CryptoOption, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "Tether",
  SOL: "Solana",
};

function CryptoIcon({ crypto, size = 28 }: { crypto: CryptoOption; size?: number }) {
  const s = size;
  switch (crypto) {
    case "BTC":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#F7931A" strokeWidth="2" />
          <text x="16" y="21" textAnchor="middle" fill="#F7931A" fontSize="14" fontWeight="bold" fontFamily="monospace">B</text>
        </svg>
      );
    case "ETH":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <polygon points="16,2 6,16 16,22 26,16" stroke="#627EEA" strokeWidth="1.5" fill="none" />
          <polygon points="16,22 6,16 16,30 26,16" stroke="#627EEA" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>
      );
    case "USDT":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#26A17B" strokeWidth="2" />
          <text x="16" y="21" textAnchor="middle" fill="#26A17B" fontSize="14" fontWeight="bold" fontFamily="monospace">T</text>
        </svg>
      );
    case "SOL":
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#9945FF" strokeWidth="2" />
          <line x1="8" y1="11" x2="24" y2="11" stroke="#9945FF" strokeWidth="2" />
          <line x1="8" y1="16" x2="24" y2="16" stroke="#9945FF" strokeWidth="2" />
          <line x1="8" y1="21" x2="24" y2="21" stroke="#9945FF" strokeWidth="2" />
        </svg>
      );
  }
}

function CountdownTimer({ minutes, onExpire }: { minutes: number; onExpire: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    if (secondsLeft <= 0) { onExpire(); return; }
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onExpire]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isUrgent = secondsLeft < 300;

  return (
    <div className={`font-mono text-lg tracking-wider ${isUrgent ? "text-red-500" : "text-oryn-orange"}`}>
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const {
    items,
    totalPrice,
    clearCart,
    appliedPromotion,
    applyPromotion,
    removePromotion,
    discountedPrice,
    cart,
    medusaConnected,
    setCartEmail,
    setCartAddress,
    initPaymentSession,
    loading: cartLoading,
  } = useCart();

  const { t, formatPrice } = useLocale();
  const ch = t.checkoutPage;
  const [step, setStep] = useState<"info" | "payment" | "confirm">("info");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [txHash, setTxHash] = useState("");
  const [cryptoSent, setCryptoSent] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [copied, setCopied] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});

  const [cryptoWallets, setCryptoWallets] = useState<Record<CryptoOption, string>>({
    BTC: "", ETH: "", USDT: "", SOL: "",
  });

  const [shipping, setShipping] = useState<ShippingData>({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", postalCode: "", country: "",
  });

  const [cryptoRates, setCryptoRates] = useState<Record<CryptoOption, number>>({
    BTC: 0.0000154, ETH: 0.000285, USDT: 1.0, SOL: 0.0067,
  });

  const CRYPTO_DISCOUNT = 0.05;
  const priceAfterPromo = discountedPrice;
  const discountedTotal = paymentMethod === "crypto" ? priceAfterPromo * (1 - CRYPTO_DISCOUNT) : priceAfterPromo;

  useEffect(() => {
    fetch("/api/crypto/rates").then((r) => r.ok ? r.json() : null).then((d) => { if (d?.rates) setCryptoRates(d.rates); }).catch(() => {});
    fetch("/api/admin/settings").then((r) => r.ok ? r.json() : null).then((d) => { if (d?.settings?.cryptoWallets) setCryptoWallets(d.settings.cryptoWallets); }).catch(() => {});
  }, []);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError("");
    try {
      const res = await fetch("/api/promotions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode.trim(), subtotal: totalPrice, productIds: items.map((i) => i.product.id) }),
      });
      const data = await res.json();
      if (data.valid && data.promotion) {
        applyPromotion({ code: data.promotion.code, label: data.promotion.label, discountAmount: data.discountAmount, discountType: data.promotion.discountType, discountValue: data.promotion.discountValue });
        setPromoCode("");
      } else {
        setPromoError(data.error || "Invalid promotion code");
      }
    } catch { setPromoError("Failed to validate code"); }
    finally { setPromoLoading(false); }
  };

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, []);

  const validateShipping = (): boolean => {
    const errors: Partial<Record<keyof ShippingData, string>> = {};
    if (!shipping.firstName.trim()) errors.firstName = "Required";
    if (!shipping.lastName.trim()) errors.lastName = "Required";
    if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email)) errors.email = "Valid email required";
    if (!shipping.address.trim()) errors.address = "Required";
    if (!shipping.city.trim()) errors.city = "Required";
    if (!shipping.postalCode.trim()) errors.postalCode = "Required";
    if (!shipping.country.trim()) errors.country = "Required";
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToPayment = async () => {
    if (!validateShipping()) return;
    setIsSubmitting(true);
    try {
      if (medusaConnected) {
        await setCartEmail(shipping.email);
        await setCartAddress(shipping as unknown as Record<string, string>);
        if (paymentMethod === "card") {
          await initPaymentSession("pp_stripe_stripe");
        }
      }
      setStep("payment");
    } catch (err) {
      console.error("Failed to prepare checkout:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentMethodChange = async (method: PaymentMethod) => {
    setPaymentMethod(method);
    setPaymentError("");
    if (method === "card" && medusaConnected && cart) {
      await initPaymentSession("pp_stripe_stripe");
    }
  };

  const handleCryptoOrder = async () => {
    setIsSubmitting(true);
    const ref = "ORY-" + Date.now().toString(36).toUpperCase();
    setOrderRef(ref);
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, productName: i.product.name, quantity: i.quantity, price: i.product.price })),
          shipping, paymentMethod: "crypto", referralCode: referralCode || undefined, promoCode: appliedPromotion?.code || undefined,
        }),
      });
      if (txHash) {
        await fetch("/api/payments/crypto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderRef: ref, txHash, crypto: selectedCrypto, amount: discountedTotal * (cryptoRates[selectedCrypto!] || 1) }),
        });
      }
    } catch { /* Continue */ }
    clearCart();
    setStep("confirm");
    setIsSubmitting(false);
  };

  const handleStripeSuccess = (id: string, ref: string) => {
    setOrderRef(ref);
    if (referralCode) {
      fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, productName: i.product.name, quantity: i.quantity, price: i.product.price })),
          shipping, paymentMethod: "card", referralCode, promoCode: appliedPromotion?.code || undefined, medusaOrderId: id,
        }),
      }).catch(console.error);
    }
    setStep("confirm");
  };

  const handleStripeError = (message: string) => { setPaymentError(message); };
  const handleTimerExpire = useCallback(() => { setTimerExpired(true); }, []);

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-oryn-grey-light flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-oryn-black/30">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">{ch.emptyCart}</h1>
          <p className="text-oryn-black/50 font-plex mb-6">{ch.emptyCartDescription}</p>
          <Link href="/products" className="px-6 py-3 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors shadow-md shadow-oryn-orange/20">{ch.browseProducts}</Link>
        </div>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-oryn-orange flex items-center justify-center mx-auto mb-8 shadow-lg shadow-oryn-orange/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-3xl font-bold mb-3">{ch.orderConfirmed}</h1>
          <p className="text-oryn-black/50 font-plex mb-2">{ch.orderConfirmedDescription}</p>
          <p className="text-xs font-mono text-oryn-black/30 mb-4">ORDER REF: {orderRef}</p>
          {paymentMethod === "crypto" ? (
            <div className="bg-oryn-grey-dark text-white p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-sm font-mono tracking-wider">{ch.paymentVerifying}</span>
              </div>
              <p className="text-xs text-white/50 font-plex">{ch.paymentVerifyingDescription}</p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M9 12l2 2 4-4" /></svg>
                <span className="text-sm font-mono tracking-wider text-green-700">{ch.paymentConfirmed}</span>
              </div>
            </div>
          )}
          {referralCode && <p className="text-xs font-mono text-oryn-orange mb-4">{ch.referralApplied}: {referralCode.toUpperCase()}</p>}
          <Link href="/products" className="px-6 py-3 bg-oryn-orange text-white text-sm font-medium hover:bg-oryn-orange-dark transition-colors shadow-md shadow-oryn-orange/20 inline-block">{ch.continueShopping}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-8 mb-12">
          {ch.steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${i === (step === "info" ? 0 : 1) ? "bg-oryn-orange text-white" : i < (step === "info" ? 0 : 1) ? "bg-oryn-black text-white" : "bg-oryn-grey-light text-oryn-black/30"}`}>{i + 1}</div>
              <span className={`text-sm font-medium hidden sm:inline ${i === (step === "info" ? 0 : 1) ? "text-oryn-black" : "text-oryn-black/30"}`}>{s}</span>
              {i < 2 && <div className="w-12 h-px bg-oryn-grey ml-2" />}
            </div>
          ))}
        </div>

        {medusaConnected && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span className="text-[9px] font-mono text-oryn-black/30 tracking-wider">SECURE CHECKOUT ACTIVE</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {step === "info" && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold">{ch.shippingTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {([
                    { key: "firstName" as const, label: ch.firstName, placeholder: "John", type: "text" },
                    { key: "lastName" as const, label: ch.lastName, placeholder: "Doe", type: "text" },
                    { key: "email" as const, label: ch.email, placeholder: "john@lab.com", type: "email" },
                    { key: "phone" as const, label: ch.phone, placeholder: "+44 000 000 0000", type: "tel" },
                  ]).map((field) => (
                    <div key={field.key}>
                      <label className="block text-[10px] font-mono text-oryn-black/40 tracking-wider mb-2">{field.label}</label>
                      <input
                        type={field.type} placeholder={field.placeholder} value={shipping[field.key]}
                        onChange={(e) => setShipping((s) => ({ ...s, [field.key]: e.target.value }))}
                        className={`w-full px-4 py-3 bg-oryn-grey-light border text-sm focus:outline-none focus:border-oryn-orange transition-colors ${shippingErrors[field.key] ? "border-red-300" : "border-oryn-grey/30"}`}
                      />
                      {shippingErrors[field.key] && <p className="text-[10px] text-red-500 mt-1">{shippingErrors[field.key]}</p>}
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-oryn-black/40 tracking-wider mb-2">{ch.address}</label>
                  <input type="text" placeholder="123 Research Lane" value={shipping.address}
                    onChange={(e) => setShipping((s) => ({ ...s, address: e.target.value }))}
                    className={`w-full px-4 py-3 bg-oryn-grey-light border text-sm focus:outline-none focus:border-oryn-orange transition-colors mb-4 ${shippingErrors.address ? "border-red-300" : "border-oryn-grey/30"}`}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {([
                      { key: "city" as const, placeholder: ch.city },
                      { key: "postalCode" as const, placeholder: ch.postalCode },
                      { key: "country" as const, placeholder: ch.country },
                    ]).map((f) => (
                      <input key={f.key} type="text" placeholder={f.placeholder} value={shipping[f.key]}
                        onChange={(e) => setShipping((s) => ({ ...s, [f.key]: e.target.value }))}
                        className={`w-full px-4 py-3 bg-oryn-grey-light border text-sm focus:outline-none focus:border-oryn-orange transition-colors ${shippingErrors[f.key] ? "border-red-300" : "border-oryn-grey/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="border-t border-oryn-grey/20 pt-6">
                  <label className="block text-[10px] font-mono text-oryn-black/40 tracking-wider mb-2">{ch.referralCode}</label>
                  <input type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value.toUpperCase())} placeholder={ch.referralCodePlaceholder} className="w-full px-4 py-3 bg-oryn-grey-light border border-oryn-grey/30 text-sm focus:outline-none focus:border-oryn-orange transition-colors font-mono tracking-wider" />
                  <p className="text-[10px] font-plex text-oryn-black/30 mt-1.5">{ch.referralCodeHint}</p>
                </div>
                <div className="border-t border-oryn-grey/20 pt-6">
                  <label className="block text-[10px] font-mono text-oryn-black/40 tracking-wider mb-2">DISCOUNT CODE</label>
                  {appliedPromotion ? (
                    <div className="flex items-center gap-3 px-4 py-3 bg-oryn-orange/5 border border-oryn-orange/20">
                      <div className="flex-1">
                        <span className="text-sm font-mono font-bold text-oryn-orange">{appliedPromotion.code}</span>
                        <span className="text-xs text-oryn-black/40 ml-2">{appliedPromotion.label}</span>
                      </div>
                      <span className="text-sm font-bold text-oryn-orange">-{formatPrice(appliedPromotion.discountAmount)}</span>
                      <button onClick={removePromotion} className="text-oryn-black/30 hover:text-red-500 transition-colors p-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input type="text" value={promoCode} onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(""); }} placeholder="ENTER CODE"
                          className={`flex-1 px-4 py-3 bg-oryn-grey-light border text-sm focus:outline-none focus:border-oryn-orange transition-colors font-mono tracking-wider ${promoError ? "border-red-300" : "border-oryn-grey/30"}`}
                        />
                        <button onClick={handleApplyPromo} disabled={promoLoading || !promoCode.trim()} className="px-5 py-3 bg-oryn-grey-dark text-white text-xs font-bold tracking-wider hover:bg-oryn-black transition-colors disabled:opacity-40">
                          {promoLoading ? "..." : "APPLY"}
                        </button>
                      </div>
                      {promoError && <p className="text-[10px] text-red-500 font-plex mt-1.5">{promoError}</p>}
                    </div>
                  )}
                </div>
                <button onClick={handleContinueToPayment} disabled={isSubmitting} className="w-full py-4 bg-oryn-orange text-white font-bold text-sm tracking-wide hover:bg-oryn-orange-dark transition-colors shadow-lg shadow-oryn-orange/20 disabled:opacity-60">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      PREPARING CHECKOUT...
                    </span>
                  ) : ch.continueToPayment}
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold">{ch.paymentTitle}</h2>
                <div className="flex bg-oryn-grey-light p-1 gap-1">
                  <button onClick={() => handlePaymentMethodChange("card")} className={`flex-1 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${paymentMethod === "card" ? "bg-white text-oryn-black shadow-sm" : "text-oryn-black/40 hover:text-oryn-black/60"}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                    {ch.cardPayment}
                  </button>
                  <button onClick={() => handlePaymentMethodChange("crypto")} className={`flex-1 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${paymentMethod === "crypto" ? "bg-oryn-grey-dark text-white shadow-sm" : "text-oryn-black/40 hover:text-oryn-black/60"}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v12M8 8h5a3 3 0 010 6H8" /></svg>
                    {ch.cryptoPayment}
                    <span className="text-[9px] bg-oryn-orange text-white px-1.5 py-0.5 font-mono">-5%</span>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div>
                    {paymentError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{paymentError}</div>
                    )}
                    {medusaConnected ? (
                      <StripeCheckout onSuccess={handleStripeSuccess} onError={handleStripeError} disabled={isSubmitting || cartLoading} />
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs">
                          <p className="font-mono font-bold mb-1">MEDUSA BACKEND REQUIRED</p>
                          <p className="font-plex">Start the Medusa backend to enable secure Stripe Elements payment. Run: <code className="bg-yellow-100 px-1">cd medusa-backend && npm run dev</code></p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === "crypto" && (
                  <div className="bg-oryn-grey-dark p-6 text-white">
                    <p className="text-[10px] font-mono text-white/40 tracking-wider mb-4">{ch.selectCrypto}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      {(["BTC", "ETH", "USDT", "SOL"] as CryptoOption[]).map((crypto) => (
                        <button key={crypto} onClick={() => { setSelectedCrypto(crypto); setTxHash(""); setCryptoSent(false); setTimerExpired(false); }} className={`p-4 border transition-all text-center relative ${selectedCrypto === crypto ? "border-oryn-orange bg-oryn-orange/10" : "border-white/10 hover:border-white/30 bg-white/5"}`}>
                          <div className="flex justify-center mb-2"><CryptoIcon crypto={crypto} /></div>
                          <span className="text-xs font-mono block">{crypto}</span>
                          <span className="text-[9px] text-white/40 block">{CRYPTO_NAMES[crypto]}</span>
                          <span className="absolute top-1 right-1 text-[8px] bg-oryn-orange/80 text-white px-1 py-0.5 font-mono">5% OFF</span>
                        </button>
                      ))}
                    </div>
                    {selectedCrypto && !timerExpired && cryptoWallets[selectedCrypto] && (
                      <div className="border-t border-white/10 pt-6 space-y-6">
                        <div className="text-center">
                          <p className="text-[10px] font-mono text-white/40 tracking-wider mb-1">{ch.amountToPay}</p>
                          <p className="text-2xl font-bold font-mono text-oryn-orange">
                            {(discountedTotal * cryptoRates[selectedCrypto]).toFixed(selectedCrypto === "USDT" ? 2 : selectedCrypto === "BTC" ? 8 : 6)} {selectedCrypto}
                          </p>
                          <p className="text-xs text-white/30 font-plex mt-1">{formatPrice(discountedTotal)} {ch.discountApplied}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-white/40 tracking-wider mb-2">{ch.sendToAddress}</p>
                          <div className="flex items-center gap-2 bg-black/30 p-3 border border-white/10">
                            <code className="text-xs font-mono text-white/70 flex-1 break-all">{cryptoWallets[selectedCrypto]}</code>
                            <button onClick={() => copyToClipboard(cryptoWallets[selectedCrypto])} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-mono transition-colors shrink-0">
                              {copied ? ch.copied : ch.copy}
                            </button>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-mono text-white/40 tracking-wider mb-2">{ch.timeRemaining}</p>
                          <CountdownTimer minutes={30} onExpire={handleTimerExpire} />
                          <p className="text-[10px] text-white/30 font-plex mt-1">{ch.sendBeforeExpiry}</p>
                        </div>
                        {!cryptoSent ? (
                          <button onClick={() => setCryptoSent(true)} className="w-full py-3 border border-oryn-orange text-oryn-orange font-medium text-sm tracking-wide hover:bg-oryn-orange hover:text-white transition-colors">{ch.sentPayment}</button>
                        ) : (
                          <div>
                            <label className="block text-[10px] font-mono text-white/40 tracking-wider mb-2">{ch.txHash}</label>
                            <input type="text" value={txHash} onChange={(e) => setTxHash(e.target.value)} placeholder={ch.txHashPlaceholder} className="w-full px-4 py-3 bg-black/30 border border-white/10 text-sm text-white font-mono focus:outline-none focus:border-oryn-orange transition-colors placeholder:text-white/20" />
                          </div>
                        )}
                      </div>
                    )}
                    {timerExpired && (
                      <div className="border-t border-white/10 pt-6 text-center">
                        <p className="text-red-400 font-mono text-sm mb-3">{ch.sessionExpired}</p>
                        <button onClick={() => { setTimerExpired(false); setCryptoSent(false); setTxHash(""); }} className="px-6 py-2 border border-white/20 text-xs font-mono text-white/60 hover:text-white hover:border-white/40 transition-colors">{ch.restartSession}</button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-4">
                  <button onClick={() => setStep("info")} className="px-6 py-4 border border-oryn-grey text-sm font-medium hover:border-oryn-orange transition-colors">{ch.back}</button>
                  {paymentMethod === "crypto" && (
                    <button onClick={handleCryptoOrder} disabled={isSubmitting || !selectedCrypto || !cryptoSent || !txHash} className="flex-1 py-4 bg-oryn-orange text-white font-medium text-sm tracking-wide hover:bg-oryn-orange-dark transition-colors shadow-lg shadow-oryn-orange/20 disabled:opacity-40 disabled:cursor-not-allowed">
                      {isSubmitting ? ch.processing : `${formatPrice(discountedTotal)} \u2014 ${ch.placeOrder}`}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-oryn-grey-light p-6 h-fit sticky top-24">
            <h3 className="text-sm font-bold tracking-wide mb-6">{ch.orderSummary}</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-oryn-cream flex items-center justify-center shrink-0">
                    <Image src={item.product.image} alt={item.product.name} width={40} height={40} className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">ORYN {item.product.name}</p>
                    <p className="text-xs text-oryn-black/40 font-plex">{ch.qty}: {item.quantity} &times; {formatPrice(item.product.price)}</p>
                  </div>
                  <span className="text-sm font-bold shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-oryn-grey/30 pt-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-oryn-black/50">{ch.subtotal}</span><span>{formatPrice(totalPrice)}</span></div>
              {appliedPromotion && (
                <div className="flex justify-between text-sm">
                  <span className="text-oryn-orange flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /></svg>
                    {appliedPromotion.code}
                  </span>
                  <span className="text-oryn-orange">-{formatPrice(appliedPromotion.discountAmount)}</span>
                </div>
              )}
              {paymentMethod === "crypto" && (
                <div className="flex justify-between text-sm"><span className="text-oryn-orange">{ch.cryptoDiscount}</span><span className="text-oryn-orange">-{formatPrice(priceAfterPromo * CRYPTO_DISCOUNT)}</span></div>
              )}
              <div className="flex justify-between text-sm"><span className="text-oryn-black/50">{ch.shipping}</span><span className="text-oryn-orange text-xs font-mono">{ch.shippingNote}</span></div>
              {referralCode && (
                <div className="flex justify-between text-sm"><span className="text-oryn-black/50">{ch.referral}</span><span className="text-xs font-mono text-oryn-black/40">{referralCode}</span></div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-oryn-grey/30"><span>{ch.total}</span><span>{formatPrice(discountedTotal)}</span></div>
            </div>
            <p className="text-[10px] text-oryn-black/30 font-mono mt-4 text-center">{ch.researchOnly}</p>
            <div className="mt-6 pt-4 border-t border-oryn-grey/30 space-y-2">
              {[
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "SECURE PAYMENT" },
                { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "DISCREET SHIPPING" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "COA INCLUDED" },
                { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", label: "GMP CERTIFIED" },
              ].map((trust) => (
                <div key={trust.label} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0"><path d={trust.icon} /></svg>
                  <span className="text-[9px] font-mono text-oryn-black/40 tracking-[0.05em]">{trust.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
