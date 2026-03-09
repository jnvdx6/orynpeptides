"use client";

import { useEffect } from "react";

export default function CheckoutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { void error; }, [error]);

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">Checkout Error</h1>
        <p className="text-sm text-oryn-black/50 font-plex mb-6">
          Something went wrong during checkout. Your payment has not been processed. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
          >
            TRY AGAIN
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-oryn-grey/30 text-xs font-medium tracking-[0.15em] hover:border-oryn-orange/30 hover:text-oryn-orange transition-colors"
          >
            GO HOME
          </a>
        </div>
        {error.digest && (
          <p className="mt-6 text-[9px] font-mono text-oryn-black/20">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
