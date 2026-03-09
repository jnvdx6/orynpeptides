export default function ProductLoading() {
  return (
    <div className="pt-[calc(1rem+4px)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="w-48 h-3 bg-oryn-grey/15 animate-pulse" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image skeleton */}
          <div className="bg-oryn-cream min-h-[500px] animate-pulse" />
          {/* Info skeleton */}
          <div className="space-y-4">
            <div className="w-24 h-3 bg-oryn-orange/20 animate-pulse" />
            <div className="w-64 h-10 bg-oryn-grey/15 animate-pulse" />
            <div className="w-48 h-4 bg-oryn-grey/10 animate-pulse" />
            <div className="w-32 h-8 bg-oryn-orange/20 animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-8 bg-oryn-orange/5 border border-oryn-orange/10 animate-pulse" />
              ))}
            </div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-oryn-grey/10 animate-pulse" />
              <div className="w-5/6 h-3 bg-oryn-grey/10 animate-pulse" />
              <div className="w-4/6 h-3 bg-oryn-grey/10 animate-pulse" />
            </div>
            <div className="flex gap-3 pt-4">
              <div className="w-36 h-[52px] bg-oryn-grey/10 animate-pulse" />
              <div className="flex-1 h-[52px] bg-oryn-orange/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
