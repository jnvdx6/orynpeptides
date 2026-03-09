export default function ProductsLoading() {
  return (
    <div className="pt-[calc(1rem+4px)] pb-16">
      {/* Hero skeleton */}
      <div className="bg-oryn-gradient py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-32 h-3 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="w-80 h-12 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="w-64 h-4 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-24 h-10 bg-oryn-grey/20 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-oryn-grey/20">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-6">
              <div className="aspect-[4/3] bg-oryn-grey/10 mb-4 animate-pulse" />
              <div className="w-32 h-4 bg-oryn-grey/15 mb-2 animate-pulse" />
              <div className="w-48 h-3 bg-oryn-grey/10 mb-4 animate-pulse" />
              <div className="flex justify-between items-center pt-4 border-t border-oryn-grey/10">
                <div className="w-16 h-6 bg-oryn-orange/20 animate-pulse" />
                <div className="w-24 h-8 bg-oryn-grey/15 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
