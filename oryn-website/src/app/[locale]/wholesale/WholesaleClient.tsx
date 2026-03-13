"use client";

import Image from "next/image";
import { Link } from "@/components/ui/LocaleLink";
import { products, productImages } from "@/data/products";
import { usePageTracking } from "@/hooks/usePageTracking";

/* ─── Icons (inline SVG) ──────────────────────────────────────────── */

function Package({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function Users({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function Truck({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function Tag({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function ShieldCheck({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowRight({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckMark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────── */

const discountTiers = [
  { range: "3 – 5 units", discount: "5%", label: "STARTER" },
  { range: "6 – 9 units", discount: "10%", label: "PROFESSIONAL" },
  { range: "10+ units", discount: "15%", label: "ENTERPRISE" },
  { range: "50+ units", discount: "Custom", label: "CUSTOM QUOTE" },
];

const wholesaleBenefits = [
  {
    icon: "users",
    title: "Dedicated Account Manager",
    description: "A single point of contact for orders, pricing, and technical queries. Your account manager understands your needs.",
  },
  {
    icon: "truck",
    title: "Priority Shipping",
    description: "Wholesale orders ship same day when placed before 2pm. Temperature-controlled packaging included at no extra cost.",
  },
  {
    icon: "tag",
    title: "Volume Pricing",
    description: "Automatic discounts from 5% to 15% based on order quantity. Custom pricing available for ongoing contracts.",
  },
  {
    icon: "shield",
    title: "COA Included",
    description: "Every wholesale shipment includes batch-specific Certificates of Analysis. Full traceability from synthesis to delivery.",
  },
  {
    icon: "package",
    title: "Custom Labelling",
    description: "White-label and custom packaging available for distributors and clinics. Minimum 50-unit orders for custom labels.",
  },
  {
    icon: "flask",
    title: "Technical Support",
    description: "Access to our peptide science team for protocol guidance, storage recommendations, and product specifications.",
  },
];

const customerTypes = [
  {
    title: "Universities & Academia",
    description: "Research departments and postgraduate programmes studying peptide biology, pharmacology, and regenerative medicine.",
  },
  {
    title: "Research Laboratories",
    description: "Private and public research labs conducting in-vitro and in-vivo studies with research-grade peptide compounds.",
  },
  {
    title: "Pharmaceutical Companies",
    description: "Pharmaceutical R&D divisions using reference-standard peptides for drug development and analytical comparison studies.",
  },
  {
    title: "Clinics & Medical Practices",
    description: "Integrative medicine clinics and practitioners requiring consistent, high-purity peptide supply for clinical research.",
  },
  {
    title: "Distributors & Resellers",
    description: "Wholesale partners distributing ORYN products across the UK and Europe. White-label options available.",
  },
  {
    title: "Biotech Startups",
    description: "Emerging biotech companies needing reliable peptide supply for product development and proof-of-concept studies.",
  },
];

/* ─── Featured wholesale products (top 6 by price variety) ─────── */
const wholesaleProducts = [
  products.find((p) => p.slug === "bpc-157")!,
  products.find((p) => p.slug === "tirzepatide-pen")!,
  products.find((p) => p.slug === "ghk-cu")!,
  products.find((p) => p.slug === "nad-plus")!,
  products.find((p) => p.slug === "medit-tirzepatide")!,
  products.find((p) => p.slug === "novadose-nad")!,
].filter(Boolean);

/* ─── FAQ Accordion ───────────────────────────────────────────────── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-white/10 bg-white/[0.02] hover:border-[#FF6A1A]/30 transition-colors">
      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
        <h3 className="text-sm md:text-base font-bold text-white pr-4">{question}</h3>
        <ChevronDown className="w-5 h-5 text-[#FF6A1A] shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-6 -mt-2">
        <p className="text-sm text-white/60 font-plex leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */

export function WholesaleClient({
  faqs,
  locale,
}: {
  faqs: { question: string; answer: string }[];
  locale: string;
}) {
  usePageTracking("wholesale");
  const symbol = locale === "es" ? "\u20ac" : "\u00a3";

  return (
    <div className="pt-[calc(1rem+4px)]">
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#FF6A1A]/5 rounded-full blur-[120px]" />
        <div className="absolute -right-20 -top-20 w-[500px] h-[500px] border border-white/[0.03]" />
        <div className="absolute -left-10 -bottom-10 w-80 h-80 border border-white/[0.03]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.1em] mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">HOME</Link>
            <span className="text-white/50">/</span>
            <span className="text-white/60">WHOLESALE</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <Package className="w-5 h-5 text-[#FF6A1A]" />
            <span className="text-xs font-mono text-[#FF6A1A] tracking-[0.2em]">
              BULK ORDERS
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Wholesale &amp; Bulk
            <span className="block text-[#FF6A1A]">Peptide Orders</span>
          </h1>

          <p className="text-white/60 font-plex max-w-2xl leading-relaxed text-lg mb-10">
            ORYN supplies research-grade peptide pen systems to universities, laboratories,
            clinics, and distributors across the UK and Europe. Volume discounts from 5%
            to 15% — with custom pricing for large-scale contracts.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {[
              { label: "Min. Order", value: "3 Units" },
              { label: "Max Discount", value: "15% Off" },
              { label: "Purity", value: ">99%" },
              { label: "UK Dispatch", value: "Same Day" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] font-mono text-white/30 tracking-widest mt-1">
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCOUNT TIERS ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                VOLUME PRICING
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Discount{" "}
              <span className="text-[#FF6A1A]">Tiers</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              Mix and match any products across our entire range.
              Discounts apply automatically based on total unit count.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {discountTiers.map((tier, i) => (
              <div
                key={tier.range}
                className={`relative p-8 border transition-all text-center group ${
                  i === 2
                    ? "bg-[#FF6A1A]/10 border-[#FF6A1A]/40 hover:border-[#FF6A1A]/60"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-[#FF6A1A]/30"
                }`}
              >
                {i === 2 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FF6A1A] text-white text-[9px] font-mono tracking-widest">
                    MOST POPULAR
                  </div>
                )}
                <span className="text-[10px] font-mono text-white/30 tracking-widest block mb-3">
                  {tier.label}
                </span>
                <div className="text-4xl md:text-5xl font-bold text-[#FF6A1A] mb-2">
                  {tier.discount}
                </div>
                <span className="text-xs font-mono text-white/30 tracking-wider block mb-1">
                  {tier.discount !== "Custom" ? "OFF RETAIL" : "PRICING"}
                </span>
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <span className="text-sm font-bold text-white">{tier.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHOLESALE BENEFITS ─────────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                WHOLESALE ADVANTAGES
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Why Partner With{" "}
              <span className="text-[#FF6A1A]">ORYN</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              Beyond volume pricing, ORYN wholesale accounts unlock
              a suite of services designed for professional buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wholesaleBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-8 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
              >
                <div className="mb-4">
                  {benefit.icon === "users" && <Users className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "truck" && <Truck className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "tag" && <Tag className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "shield" && <ShieldCheck className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "package" && <Package className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" />}
                  {benefit.icon === "flask" && (
                    <svg className="w-6 h-6 text-[#FF6A1A] opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3h6M10 3v6.5L4 20h16l-6-10.5V3" />
                      <path d="M8.5 14h7" />
                    </svg>
                  )}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-white/40 font-plex leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ───────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                OUR CUSTOMERS
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Who We{" "}
              <span className="text-[#FF6A1A]">Serve</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              ORYN wholesale peptides are trusted by research professionals
              and organisations across the UK and Europe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerTypes.map((customer) => (
              <div
                key={customer.title}
                className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/20 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-0.5 w-4 h-4 border border-[#FF6A1A]/40 flex items-center justify-center shrink-0">
                    <CheckMark className="w-2.5 h-2.5 text-[#FF6A1A]" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{customer.title}</h3>
                </div>
                <p className="text-xs text-white/40 font-plex leading-relaxed pl-7">
                  {customer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHOLESALE PRODUCTS GRID ────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                WHOLESALE PRICING EXAMPLES
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Products at{" "}
              <span className="text-[#FF6A1A]">Wholesale Prices</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              See how volume pricing reduces your cost per unit.
              All ORYN products are eligible for wholesale discounts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wholesaleProducts.map((product) => {
              const imgSrc = productImages.bySlug[product.slug] || product.image;
              const price5 = (product.price * 0.95).toFixed(0);
              const price10 = (product.price * 0.9).toFixed(0);
              const price15 = (product.price * 0.85).toFixed(0);

              return (
                <div
                  key={product.slug}
                  className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 shrink-0">
                      <Image
                        src={imgSrc}
                        alt={`ORYN ${product.name}`}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-sm font-bold text-white hover:text-[#FF6A1A] transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[10px] font-mono text-white/30 mt-1">
                        {product.dosage} | {product.categoryLabel}
                      </p>
                      <p className="text-sm font-bold text-white/60 mt-1">
                        <span className="text-[10px] font-mono text-white/30 mr-1">RETAIL</span>
                        {symbol}{product.price}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/[0.06] pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">3-5 UNITS (5%)</span>
                      <span className="text-sm font-bold text-white">{symbol}{price5}/unit</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-white/30">6-9 UNITS (10%)</span>
                      <span className="text-sm font-bold text-white">{symbol}{price10}/unit</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-[#FF6A1A]/60">10+ UNITS (15%)</span>
                      <span className="text-sm font-bold text-[#FF6A1A]">{symbol}{price15}/unit</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-[#FF6A1A] font-mono tracking-wider hover:underline"
            >
              VIEW ALL {products.length} PRODUCTS
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                FAQ
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Wholesale{" "}
              <span className="text-[#FF6A1A]">FAQ</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              Common questions about our wholesale programme,
              pricing, and account setup.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#FF6A1A] to-[#e55a10] relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Package className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Order in Bulk?
          </h2>
          <p className="text-white/70 font-plex mb-8 max-w-lg mx-auto">
            Contact our wholesale team to set up your account, discuss custom
            pricing, and start saving on research-grade peptide pens.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6A1A] font-bold text-xs tracking-[0.2em] hover:bg-[#FFF8F0] transition-colors"
            >
              WHOLESALE ENQUIRY
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-xs tracking-[0.2em] hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              BROWSE PRODUCTS
              <Package className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
