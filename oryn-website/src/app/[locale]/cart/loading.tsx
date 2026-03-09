export default function CartLoading() {
  return (
    <div className="pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="w-24 h-3 bg-oryn-grey/15 mb-8 animate-pulse" />
        <div className="w-32 h-8 bg-oryn-grey/15 mb-2 animate-pulse" />
        <div className="w-20 h-3 bg-oryn-grey/10 mb-8 animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-5 p-5 bg-white border border-oryn-grey/20">
                <div className="w-24 h-24 bg-oryn-grey/10 animate-pulse shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="w-40 h-4 bg-oryn-grey/15 animate-pulse" />
                  <div className="w-28 h-3 bg-oryn-grey/10 animate-pulse" />
                  <div className="w-20 h-6 bg-oryn-grey/15 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-64 bg-oryn-grey/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
