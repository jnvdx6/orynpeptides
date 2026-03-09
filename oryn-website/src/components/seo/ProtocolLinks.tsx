import Link from "next/link";
import { PROTOCOLS } from "@/data/protocols";
import { FAQ_HUBS } from "@/data/faq-hubs";

interface ProtocolLinksProps {
  productSlug: string;
  locale: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  recovery: "bg-green-100 text-green-700",
  "anti-aging": "bg-purple-100 text-purple-700",
  performance: "bg-blue-100 text-blue-700",
  metabolic: "bg-amber-100 text-amber-700",
  wellness: "bg-cyan-100 text-cyan-700",
};

export function ProtocolLinks({ productSlug, locale }: ProtocolLinksProps) {
  const relatedProtocols = PROTOCOLS.filter((p) =>
    p.productSlugs.includes(productSlug)
  );

  const faqHub = FAQ_HUBS.find(
    (hub) =>
      hub.type === "product" && hub.relatedProductSlug === productSlug
  );

  if (relatedProtocols.length === 0 && !faqHub) return null;

  return (
    <section className="border-t border-oryn-grey/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-3 mb-2">
          <div className="w-6 h-px bg-oryn-orange" />
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
            PROTOCOLS &amp; FAQ
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-8">
          Research Protocols &amp; FAQ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedProtocols.map((protocol) => (
            <Link
              key={protocol.slug}
              href={`/${locale}/protocols/${protocol.slug}`}
              className="group block rounded-xl border border-oryn-grey/20 bg-white p-5 transition-all hover:border-oryn-orange/30 hover:shadow-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[8px] font-mono text-oryn-orange tracking-[0.15em]">
                  PROTOCOL
                </span>
                <span
                  className={`text-[8px] font-mono tracking-[0.1em] px-2 py-0.5 rounded-full ${CATEGORY_COLORS[protocol.category] || "bg-gray-100 text-gray-600"}`}
                >
                  {protocol.category.toUpperCase()}
                </span>
              </div>
              <h3 className="text-sm font-bold mt-1 mb-2 group-hover:text-oryn-orange transition-colors line-clamp-2">
                {protocol.name}
              </h3>
              <p className="text-xs text-oryn-black/50 font-plex mb-3 line-clamp-2">
                {protocol.subtitle}
              </p>
              <div className="flex items-center gap-3 text-[10px] font-mono text-oryn-black/40 tracking-wide">
                <span>{protocol.duration}</span>
                <span className="w-1 h-1 rounded-full bg-oryn-black/20" />
                <span>
                  {protocol.productSlugs.length} peptide
                  {protocol.productSlugs.length > 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          ))}

          {faqHub && (
            <Link
              href={`/${locale}/faq/${faqHub.slug}`}
              className="group block rounded-xl border border-oryn-grey/20 bg-white p-5 transition-all hover:border-oryn-orange/30 hover:shadow-md"
            >
              <span className="text-[8px] font-mono text-oryn-orange tracking-[0.15em]">
                FAQ
              </span>
              <h3 className="text-sm font-bold mt-1 mb-2 group-hover:text-oryn-orange transition-colors line-clamp-2">
                {faqHub.title}
              </h3>
              <p className="text-xs text-oryn-black/50 font-plex line-clamp-3">
                {faqHub.metaDescription}
              </p>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
