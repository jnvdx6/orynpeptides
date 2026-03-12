import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  // Recommended defaults for new projects
  defaults: "2026-01-30",
  // Autocapture: clicks, inputs, page views, rage clicks
  autocapture: true,
  // Capture pageviews + page leaves automatically
  capture_pageview: true,
  capture_pageleave: true,
  // Session recording (controlled via PostHog project settings)
  disable_session_recording: false,
  // Performance / Web Vitals
  capture_performance: true,
  // Heatmaps
  enable_heatmaps: true,
  // Dead click detection
  capture_dead_clicks: true,
  // Cross-subdomain tracking
  cross_subdomain_cookie: false,
  // Respect Do Not Track
  respect_dnt: false,
  // Persistence
  persistence: "localStorage+cookie",
  // Mask passwords in session recordings
  session_recording: {
    maskAllInputs: false,
    maskInputOptions: {
      password: true,
    },
  },
});
