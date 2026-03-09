"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "oryn_recently_viewed";
const MAX_ITEMS = 6;

export function useRecentlyViewed() {
  const [viewed, setViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setViewed(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const addViewed = useCallback((slug: string) => {
    setViewed((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const updated = [slug, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { viewed, addViewed };
}
