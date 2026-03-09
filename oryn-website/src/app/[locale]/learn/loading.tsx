export default function LearnLoading() {
  return (
    <div className="pt-[calc(1rem+4px)] min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-oryn-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-32 h-3 bg-white/10 mb-4 animate-pulse" />
          <div className="w-80 h-10 bg-white/10 mb-3 animate-pulse" />
          <div className="w-96 h-4 bg-white/5 animate-pulse" />
        </div>
      </div>

      {/* Articles grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-oryn-grey/15">
              <div className="aspect-[16/9] bg-oryn-grey/10 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="w-20 h-3 bg-oryn-orange/15 animate-pulse" />
                <div className="w-full h-5 bg-oryn-grey/15 animate-pulse" />
                <div className="w-3/4 h-4 bg-oryn-grey/10 animate-pulse" />
                <div className="w-24 h-3 bg-oryn-grey/10 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
