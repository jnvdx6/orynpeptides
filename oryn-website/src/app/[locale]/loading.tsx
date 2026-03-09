export default function HomeLoading() {
  return (
    <div className="pt-[calc(1rem+4px)]">
      {/* Hero skeleton */}
      <div className="bg-oryn-black py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-24 h-3 bg-white/10 mb-6 animate-pulse" />
          <div className="w-96 h-14 bg-white/10 mb-4 animate-pulse" />
          <div className="w-72 h-5 bg-white/5 mb-8 animate-pulse" />
          <div className="flex gap-4">
            <div className="w-40 h-12 bg-oryn-orange/20 animate-pulse" />
            <div className="w-40 h-12 bg-white/5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Categories skeleton */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-48 h-4 bg-oryn-grey/15 mx-auto mb-12 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-oryn-grey/10 animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Products skeleton */}
      <div className="py-16 bg-oryn-cream/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-56 h-4 bg-oryn-grey/15 mb-12 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-oryn-grey/20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-6">
                <div className="aspect-[4/3] bg-oryn-grey/10 mb-4 animate-pulse" />
                <div className="w-32 h-4 bg-oryn-grey/15 mb-2 animate-pulse" />
                <div className="w-20 h-6 bg-oryn-orange/15 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
