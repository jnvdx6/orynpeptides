"use client";

import { getReviewsByProduct, getAggregateRating, type Review } from "@/data/reviews";

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
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

function ReviewCard({ review }: { review: Review }) {
  const formattedDate = new Date(review.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white border border-oryn-grey/15 p-4 sm:p-6 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={review.rating} />
        {review.verified && (
          <span className="flex items-center gap-1 text-[8px] font-mono text-green-600 tracking-[0.1em]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            VERIFIED PURCHASE
          </span>
        )}
      </div>

      <h4 className="text-sm font-bold mb-2">{review.title}</h4>

      <p className="text-xs text-oryn-black/50 font-plex leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-4 pt-4 border-t border-oryn-grey/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-oryn-orange/10 text-oryn-orange flex items-center justify-center text-[10px] font-bold">
            {review.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-xs font-medium">{review.author}</p>
            <p className="text-[9px] text-oryn-black/40 font-plex">{review.location}</p>
          </div>
        </div>
        <span className="text-[9px] text-oryn-black/30 font-mono">{formattedDate}</span>
      </div>
    </div>
  );
}

export function CustomerReviews({ productSlug, productName }: { productSlug: string; productName: string }) {
  const reviews = getReviewsByProduct(productSlug);
  const aggregate = getAggregateRating(productSlug);

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            CUSTOMER REVIEWS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 tracking-tight">
            What Researchers Say About {productName}
          </h2>

          {/* Aggregate rating */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-5">
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(aggregate.average)} size={18} />
              <span className="text-2xl font-bold text-oryn-orange">{aggregate.average}</span>
            </div>
            <span className="hidden sm:block w-px h-6 bg-oryn-grey/30" />
            <span className="text-sm text-oryn-black/40 font-plex">
              Based on {aggregate.count} verified reviews
            </span>
          </div>

          {/* Rating distribution bar */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4">
            {[5, 4].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length;
              const pct = Math.round((count / reviews.length) * 100);
              return (
                <div key={stars} className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] font-mono text-oryn-black/40 w-4 text-right">{stars}</span>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#FF6A1A" stroke="#FF6A1A" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <div className="w-16 sm:w-20 h-1.5 bg-oryn-grey/15 overflow-hidden">
                    <div className="h-full bg-oryn-orange" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[9px] font-mono text-oryn-black/30">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
