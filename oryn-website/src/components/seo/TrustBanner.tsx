export function TrustBanner() {
  return (
    <section className="bg-oryn-cream border-y border-oryn-orange/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {/* GMP Certified */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">GMP Certified</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-oryn-orange/20" />

          {/* >99% Purity */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">&gt;99% Purity</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-oryn-orange/20" />

          {/* 3rd Party Tested */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              <path d="M9 14l2 2 4-4" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">3rd Party Tested</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-oryn-orange/20" />

          {/* ISO 7 Cleanroom */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
              <path d="M3 21h18" />
              <path d="M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">ISO 7 Cleanroom</span>
          </div>

          <span className="hidden sm:block w-px h-4 bg-oryn-orange/20" />

          {/* EU Manufactured */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            <span className="text-[11px] font-mono text-oryn-black/60 tracking-[0.05em]">EU Manufactured</span>
          </div>
        </div>
      </div>
    </section>
  );
}
