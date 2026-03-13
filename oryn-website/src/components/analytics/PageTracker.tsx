"use client";

import { usePageTracking } from "@/hooks/usePageTracking";

/**
 * Drop-in client component for tracking page views in server components.
 * Renders nothing — just activates the usePageTracking hook.
 *
 * Usage in a server component:
 *   <PageTracker pageName="blog_article" properties={{ slug, title }} />
 */
export function PageTracker({
  pageName,
  properties,
}: {
  pageName: string;
  properties?: Record<string, unknown>;
}) {
  usePageTracking(pageName, properties);
  return null;
}
