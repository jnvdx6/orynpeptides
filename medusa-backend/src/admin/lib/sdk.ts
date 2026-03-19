import Medusa from "@medusajs/js-sdk"

// Use a getter that always returns the dashboard's authenticated SDK at runtime
// This avoids timing issues where window.__sdk isn't available during module evaluation
function getSdk(): Medusa {
  if (typeof window !== "undefined" && (window as any).__sdk) {
    return (window as any).__sdk
  }
  // Fallback - should never be reached in admin context
  return new Medusa({
    baseUrl: "/",
    auth: { type: "session" },
  })
}

// Proxy object that delegates all calls to the runtime SDK
export const sdk = new Proxy({} as Medusa, {
  get(_target, prop) {
    return (getSdk() as any)[prop]
  },
})
