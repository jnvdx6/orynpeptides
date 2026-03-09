import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="font-grotesk antialiased bg-white text-[#1a1a1a]">
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex items-center justify-center px-6 py-16">
            <div className="text-center max-w-md">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="w-24 h-24 bg-[#FF6A1A]/10 flex items-center justify-center">
                  <span className="text-5xl font-bold text-[#FF6A1A]">404</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-3 tracking-tight">Page Not Found</h1>
              <p className="text-sm text-black/50 mb-8" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back on track.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/en"
                  className="px-6 py-3 bg-[#FF6A1A] text-white text-xs font-medium tracking-[0.15em] hover:opacity-90 transition-opacity"
                >
                  GO TO HOMEPAGE
                </Link>
                <Link
                  href="/en/products"
                  className="px-6 py-3 border border-black/10 text-xs font-medium tracking-[0.15em] hover:border-[#FF6A1A]/30 hover:text-[#FF6A1A] transition-colors"
                >
                  BROWSE PRODUCTS
                </Link>
              </div>
            </div>
          </div>

          {/* SEO Internal Links */}
          <div className="border-t border-black/5 px-6 py-10">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h2 className="text-[9px] font-bold tracking-[0.2em] text-[#FF6A1A] mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  POPULAR PRODUCTS
                </h2>
                <ul className="space-y-1.5">
                  {[
                    { slug: "bpc-157", name: "BPC-157" },
                    { slug: "tirzepatide-pen", name: "Tirzepatide" },
                    { slug: "ghk-cu", name: "GHK-Cu" },
                    { slug: "nad-plus", name: "NAD+" },
                    { slug: "tb-500", name: "TB-500" },
                    { slug: "cjc-1295", name: "CJC-1295" },
                  ].map((p) => (
                    <li key={p.slug}>
                      <Link href={`/en/products/${p.slug}`} className="text-[11px] text-black/30 hover:text-[#FF6A1A] transition-colors" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                        ORYN {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-[9px] font-bold tracking-[0.2em] text-[#FF6A1A] mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  UK DELIVERY
                </h2>
                <div className="flex flex-wrap gap-x-2.5 gap-y-1">
                  {["london", "manchester", "birmingham", "edinburgh", "glasgow", "leeds", "bristol", "liverpool", "cambridge", "oxford"].map((city) => (
                    <Link key={city} href={`/en/peptides/${city}`} className="text-[11px] text-black/30 hover:text-[#FF6A1A] transition-colors capitalize" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                      {city}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-[9px] font-bold tracking-[0.2em] text-[#FF6A1A] mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  LEARN
                </h2>
                <ul className="space-y-1.5">
                  {[
                    { slug: "are-peptides-legal-in-the-uk", title: "Peptides Legal in the UK?" },
                    { slug: "bpc-157-complete-guide", title: "BPC-157 Guide" },
                    { slug: "how-to-use-peptide-pen", title: "How to Use a Peptide Pen" },
                  ].map((a) => (
                    <li key={a.slug}>
                      <Link href={`/en/learn/${a.slug}`} className="text-[11px] text-black/30 hover:text-[#FF6A1A] transition-colors" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-black/5 px-6 py-4">
            <div className="max-w-4xl mx-auto flex items-center justify-center gap-6 text-[9px] text-black/20" style={{ fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>
              <span>ORYN PEPTIDE LABS</span>
              <span className="w-px h-3 bg-black/10" />
              <span>RESEARCH GRADE</span>
              <span className="w-px h-3 bg-black/10" />
              <span>&gt;99% PURITY</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
