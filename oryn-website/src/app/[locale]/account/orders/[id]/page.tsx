"use client";

import { useParams } from "next/navigation";
import { Link } from "@/components/ui/LocaleLink";
import { useLocale } from "@/i18n/LocaleContext";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { t } = useLocale();
  const od = t.account.orderDetail;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/account/orders" className="text-[10px] text-oryn-black/40 font-plex hover:text-oryn-orange transition-colors">
            {od.ordersBreadcrumb}
          </Link>
          <span className="text-oryn-orange text-[10px]">/</span>
          <span className="text-[10px] font-mono text-oryn-orange">{orderId}</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight">{od.orderTitle} {orderId}</h1>
      </div>

      {/* Order info message */}
      <div className="bg-white border border-oryn-grey/15 p-8 text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="mx-auto mb-4">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-bold mb-2">Order details sent to your email</h3>
        <p className="text-sm text-oryn-black/50 font-plex max-w-md mx-auto mb-6">
          Your order confirmation and tracking information have been sent to your email address.
          Please check your inbox (and spam folder) for the latest updates on your order.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/account/orders"
            className="px-5 py-2.5 border border-oryn-grey/20 text-xs font-mono tracking-[0.1em] text-oryn-black/60 hover:border-oryn-orange hover:text-oryn-orange transition-colors"
          >
            {od.backToOrders}
          </Link>
          <a
            href="mailto:info@orynpeptides.com"
            className="px-5 py-2.5 bg-oryn-orange text-white text-xs font-mono tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>

      {/* Help */}
      <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-5 flex items-start gap-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0 mt-0.5">
          <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4 className="text-xs font-bold mb-1">{od.needHelp}</h4>
          <p className="text-[10px] text-oryn-black/50 font-plex">
            {od.needHelpDesc}{" "}
            <a href="mailto:info@orynpeptides.com" className="text-oryn-orange hover:underline">info@orynpeptides.com</a>{" "}
            ({orderId}).
          </p>
        </div>
      </div>
    </div>
  );
}
