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
  // Register super properties that attach to every event
  loaded: (ph) => {
    // UTM params (persist from landing)
    const params = new URLSearchParams(window.location.search);
    const utmProps: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const val = params.get(key);
      if (val) utmProps[key] = val;
    }
    if (Object.keys(utmProps).length > 0) {
      ph.register(utmProps);
      ph.setPersonProperties({}, utmProps); // $set_once on person
    }

    // Device & locale info
    const w = window.innerWidth;
    ph.register({
      device_type: w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop",
      viewport_width: w,
      locale: document.documentElement.lang || "en",
      site_version: "2026-03",
    });

    // Referrer tracking (first touch)
    if (document.referrer && !document.referrer.includes(window.location.hostname)) {
      try {
        const refDomain = new URL(document.referrer).hostname;
        ph.register_once({
          initial_referrer: document.referrer,
          initial_referrer_domain: refDomain,
        });
        ph.setPersonPropertiesForFlags({ referrer_domain: refDomain });
      } catch { /* ignore */ }
    }

    // Landing page (first touch)
    ph.register_once({
      initial_landing_page: window.location.pathname,
    });
  },
});
