import posthog from "posthog-js";

// Only initialize PostHog on production and with user consent (GDPR)
const isProduction =
  typeof window !== "undefined" &&
  window.location.hostname === "orynxpeptides.com";

const hasConsent =
  typeof window !== "undefined" &&
  localStorage.getItem("oryn_cookie_consent") === "accepted";

if (isProduction && hasConsent && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
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

      // Device, locale & geo info
      const w = window.innerWidth;
      const pathLocale = window.location.pathname.split("/")[1] || "en";
      const localeCountryMap: Record<string, string> = {
        en: "GB", es: "ES", de: "DE", fr: "FR", it: "IT", pt: "PT", nl: "NL",
      };
      const localeMarketMap: Record<string, string> = {
        en: "UK", es: "EU", de: "EU", fr: "EU", it: "EU", pt: "EU", nl: "EU",
      };
      const detectedCountry = localeCountryMap[pathLocale] || "GB";
      const detectedMarket = localeMarketMap[pathLocale] || "Other";
      const detectedCurrency = pathLocale === "en" ? "GBP" : "EUR";

      ph.register({
        device_type: w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop",
        viewport_width: w,
        locale: pathLocale,
        country: detectedCountry,
        market_region: detectedMarket,
        currency: detectedCurrency,
        site_version: "2026-03",
      });

      // Set person properties for country segmentation
      ph.setPersonProperties(
        { country: detectedCountry, market_region: detectedMarket, currency: detectedCurrency },
        { first_country: detectedCountry, first_locale: pathLocale },
      );

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
}
