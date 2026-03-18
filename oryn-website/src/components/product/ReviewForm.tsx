"use client";

import { useState } from "react";
import type { Review } from "@/data/reviews";

const STORAGE_KEY = "oryn_user_reviews";

export function getStoredReviews(slug: string): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Review[];
    return all.filter((r) => r.product === slug);
  } catch {
    return [];
  }
}

function storeReview(review: Review) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Review[];
    all.push(review);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch { /* localStorage full or unavailable */ }
}

interface ReviewFormProps {
  productSlug: string;
  onSubmit?: (review: Review) => void;
}

export function ReviewForm({ productSlug, onSubmit }: ReviewFormProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (text.length < 20) {
      setError("Review must be at least 20 characters.");
      return;
    }

    const review: Review = {
      id: `user-${Date.now()}`,
      author: author.trim() || "Anonymous",
      location: "",
      product: productSlug,
      rating: rating as Review["rating"],
      title: title.trim(),
      text: text.trim(),
      date: new Date().toISOString().split("T")[0],
      verified: false,
    };

    storeReview(review);
    onSubmit?.(review);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-12 bg-oryn-cream/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="mx-auto mb-4">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Thank you for your review</h3>
          <p className="text-sm text-oryn-black/50 font-plex">Your feedback helps other researchers make informed decisions.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-oryn-cream/30">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 mx-auto text-sm font-bold tracking-wide hover:text-oryn-orange transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Write a Review
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Star rating */}
            <fieldset>
              <legend className="text-[10px] font-mono text-oryn-black/50 tracking-[0.15em] uppercase mb-2">
                Rating *
              </legend>
              <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={rating === star}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-0.5 transition-transform hover:scale-110"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={star <= (hoverRating || rating) ? "#FF6A1A" : "none"}
                      stroke={star <= (hoverRating || rating) ? "#FF6A1A" : "#ccc"}
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Title */}
            <div>
              <label htmlFor="review-title" className="text-[10px] font-mono text-oryn-black/50 tracking-[0.15em] uppercase block mb-2">
                Title
              </label>
              <input
                id="review-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summary of your experience"
                className="w-full px-4 py-3 bg-white border border-oryn-grey/20 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
              />
            </div>

            {/* Review text */}
            <div>
              <label htmlFor="review-text" className="text-[10px] font-mono text-oryn-black/50 tracking-[0.15em] uppercase block mb-2">
                Review *
              </label>
              <textarea
                id="review-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your experience with this product (min 20 characters)"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-oryn-grey/20 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors resize-vertical"
              />
              <span className="text-[9px] text-oryn-black/30 font-mono mt-1 block">
                {text.length}/20 min characters
              </span>
            </div>

            {/* Author name */}
            <div>
              <label htmlFor="review-author" className="text-[10px] font-mono text-oryn-black/50 tracking-[0.15em] uppercase block mb-2">
                Your Name
              </label>
              <input
                id="review-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Anonymous"
                className="w-full px-4 py-3 bg-white border border-oryn-grey/20 text-sm font-plex focus:outline-none focus:border-oryn-orange transition-colors"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 font-plex">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-oryn-orange text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-oryn-orange/90 transition-colors"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
