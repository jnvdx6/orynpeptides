export default function AccountLoading() {
  return (
    <div className="pt-[calc(1rem+4px)] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header skeleton */}
        <div className="w-48 h-8 bg-oryn-grey/15 mb-2 animate-pulse" />
        <div className="w-64 h-4 bg-oryn-grey/10 mb-8 animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar skeleton */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 bg-oryn-grey/10 animate-pulse" />
            ))}
          </div>

          {/* Content skeleton */}
          <div className="md:col-span-3 space-y-6">
            <div className="h-32 bg-oryn-grey/10 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-oryn-grey/10 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
