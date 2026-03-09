export default function CheckoutLoading() {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-white">
      <div className="border-b border-oryn-grey/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="w-16 h-5 bg-oryn-grey/15 animate-pulse" />
          <div className="w-32 h-4 bg-oryn-grey/10 animate-pulse" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-oryn-grey/20 p-6">
                <div className="w-48 h-4 bg-oryn-grey/15 mb-4 animate-pulse" />
                <div className="space-y-3">
                  <div className="w-full h-10 bg-oryn-grey/10 animate-pulse" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 bg-oryn-grey/10 animate-pulse" />
                    <div className="h-10 bg-oryn-grey/10 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block lg:col-span-5">
            <div className="h-80 bg-oryn-grey/10 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
