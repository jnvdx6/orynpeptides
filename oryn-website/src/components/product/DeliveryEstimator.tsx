"use client";

export function DeliveryEstimator() {
  // Estimate delivery: order before 2pm = next day, otherwise 2 days
  const now = new Date();
  const hour = now.getHours();
  const isBeforeCutoff = hour < 14;

  const deliveryDate = new Date(now);
  // Skip weekends
  let daysToAdd = isBeforeCutoff ? 1 : 2;
  while (daysToAdd > 0) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    const day = deliveryDate.getDay();
    if (day !== 0 && day !== 6) daysToAdd--;
  }

  const formatted = deliveryDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200/50">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
        <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
      <div>
        <span className="text-[10px] font-mono text-green-700 tracking-[0.05em]">
          {isBeforeCutoff ? "Order now" : "Order today"} — Est. delivery{" "}
          <strong>{formatted}</strong>
        </span>
      </div>
    </div>
  );
}
