"use client";

import { useEffect, useRef } from "react";
import { trackPageView, trackScrollDepth, trackEngagementTime } from "@/lib/analytics";

/**
 * Hook that auto-tracks page view, scroll depth milestones, and engagement time.
 * Use in any client component. For server components, use <PageTracker />.
 */
export function usePageTracking(pageName: string, properties?: Record<string, unknown>) {
  const trackedDepths = useRef(new Set<number>());
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Track page view on mount
    trackPageView(pageName, properties);
    trackedDepths.current.clear();
    startTime.current = Date.now();

    // Scroll depth tracking
    const milestones = [25, 50, 75, 100];
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const m of milestones) {
        if (percent >= m && !trackedDepths.current.has(m)) {
          trackedDepths.current.add(m);
          trackScrollDepth(pageName, m);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Engagement time on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds >= 3) {
        trackEngagementTime(pageName, seconds);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName]);
}
