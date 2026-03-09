"use client";

import type { ProductDetail } from "@/data/product-details";
import { useLocale } from "@/i18n/LocaleContext";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= rating ? "#FF6A1A" : "none"}
          stroke={star <= rating ? "#FF6A1A" : "#ddd"}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function ProductReviews({ detail, productName }: { detail: ProductDetail; productName: string }) {
  const { t } = useLocale();
  const avgRating = detail.reviews.reduce((sum, r) => sum + r.rating, 0) / detail.reviews.length;

  return (
    <section className="py-16 bg-oryn-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            {t.productDetail.trustedByResearchers}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            {t.productDetail.whatLabsSay} {productName}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <StarRating rating={Math.round(avgRating)} />
            <span className="text-sm font-bold text-oryn-orange">{avgRating.toFixed(1)}</span>
            <span className="text-[10px] text-oryn-black/40 font-plex">
              {t.productDetail.fromVerifiedReviews.replace("{count}", String(detail.reviews.length))}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {detail.reviews.map((review, i) => (
            <div key={i} className="bg-white border border-oryn-grey/15 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={review.rating} />
                {review.verified && (
                  <span className="flex items-center gap-1 text-[8px] font-mono text-green-600 tracking-[0.1em]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t.productDetail.verifiedLabel}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold mb-2">{review.title}</h4>
              <p className="text-xs text-oryn-black/50 font-plex leading-relaxed flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t border-oryn-grey/10 flex items-center gap-3">
                <div className="w-8 h-8 bg-oryn-orange/10 text-oryn-orange flex items-center justify-center text-[10px] font-bold">
                  {review.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-medium">{review.author}</p>
                  <p className="text-[9px] text-oryn-black/40 font-plex">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
