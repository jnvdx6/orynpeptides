import { PostHog } from "posthog-node";

// Singleton server-side PostHog client
let posthogServerClient: PostHog | null = null;

export function getPostHogServer(): PostHog {
  if (!posthogServerClient) {
    posthogServerClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1, // Flush immediately in serverless
      flushInterval: 0,
    });
  }
  return posthogServerClient;
}

// Helper for API routes: capture + shutdown
export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>
) {
  const ph = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
  ph.capture({ distinctId, event, properties });
  await ph.shutdown();
}
