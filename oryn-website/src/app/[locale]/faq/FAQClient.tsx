"use client";

import { Link } from "@/components/ui/LocaleLink";

/* ─── Icons (inline SVG) ──────────────────────────────────────────── */

function HelpCircle({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
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

/* Category icons */
function InfoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CreditCard({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function TruckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function ShieldCheck({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Flask({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v6.5L4 20h16l-6-10.5V3" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

function LifeBuoy({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  );
}

const categoryIcons: Record<string, typeof InfoIcon> = {
  about: InfoIcon,
  ordering: CreditCard,
  shipping: TruckIcon,
  quality: ShieldCheck,
  science: Flask,
  returns: LifeBuoy,
};

/* ─── Types ────────────────────────────────────────────────────────── */

interface FAQCategory {
  id: string;
  title: string;
  faqs: { question: string; answer: string }[];
}

/* ─── FAQ Item ─────────────────────────────────────────────────────── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border border-white/10 bg-white/[0.02] hover:border-[#FF6A1A]/30 transition-colors">
      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
        <h3 className="text-sm md:text-base font-bold text-white pr-4">{question}</h3>
        <ChevronDown className="w-5 h-5 text-[#FF6A1A] shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 -mt-2">
        <p className="text-sm text-white/60 font-plex leading-relaxed">{answer}</p>
      </div>
    </details>
  );
}

/* ─── Category Section ─────────────────────────────────────────────── */

function CategorySection({ category }: { category: FAQCategory }) {
  const Icon = categoryIcons[category.id] || InfoIcon;

  return (
    <div id={category.id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-5 h-5 text-[#FF6A1A]" />
        <h2 className="text-xl md:text-2xl font-bold text-white">{category.title}</h2>
        <span className="text-[10px] font-mono text-white/40 tracking-widest ml-auto">
          {category.faqs.length} QUESTIONS
        </span>
      </div>
      <div className="space-y-3 mb-16">
        {category.faqs.map((faq) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */

export function FAQClient({
  categories,
}: {
  categories: FAQCategory[];
}) {
  const totalFaqs = categories.reduce((sum, cat) => sum + cat.faqs.length, 0);

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
            <span className="text-white/60">FAQ</span>
          </nav>

          <div className="inline-flex items-center gap-3 mb-6">
            <HelpCircle className="w-5 h-5 text-[#FF6A1A]" />
            <span className="text-xs font-mono text-[#FF6A1A] tracking-[0.2em]">
              KNOWLEDGE BASE
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Frequently Asked
            <span className="block text-[#FF6A1A]">Questions</span>
          </h1>

          <p className="text-white/60 font-plex max-w-2xl leading-relaxed text-lg mb-10">
            Everything you need to know about ORYN peptide pens — from product
            details and ordering to shipping, quality, and peptide science.
            {totalFaqs} answers organised across {categories.length} categories.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            {[
              { label: "Questions Answered", value: totalFaqs.toString() },
              { label: "Categories", value: categories.length.toString() },
              { label: "Products", value: "10" },
              { label: "Purity", value: ">99%" },
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

      {/* ── CATEGORY NAVIGATION ────────────────────────────────── */}
      <section className="py-12 bg-[#0f0f0f] border-b border-white/[0.06] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id] || InfoIcon;
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] hover:border-[#FF6A1A]/40 hover:bg-[#FF6A1A]/10 text-white/60 hover:text-white text-xs font-mono tracking-wider transition-all"
                >
                  <Icon className="w-3.5 h-3.5 text-[#FF6A1A]" />
                  {cat.title.toUpperCase().replace("ORYN & OUR PRODUCTS", "ABOUT ORYN")}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ CATEGORIES ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto px-6">
          {categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* ── QUICK LINKS ────────────────────────────────────────── */}
      <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6A1A]/5 blur-[100px]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
              <span className="text-xs font-mono text-[#FF6A1A] tracking-widest">
                LEARN MORE
              </span>
              <div className="w-8 h-[2px] bg-[#FF6A1A]/40" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">
              Explore{" "}
              <span className="text-[#FF6A1A]">Further</span>
            </h2>
            <p className="text-white/40 font-plex max-w-xl mx-auto">
              Dive deeper into specific topics with our dedicated information pages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Quality & Testing",
                description: "View our Certificates of Analysis, testing methods, and GMP manufacturing standards.",
                href: "/quality",
              },
              {
                title: "Shipping Info",
                description: "UK delivery zones, temperature-controlled packaging, and European shipping details.",
                href: "/shipping",
              },
              {
                title: "Wholesale Orders",
                description: "Volume discounts from 5-15% for research labs, clinics, and distributors.",
                href: "/wholesale",
              },
              {
                title: "All Products",
                description: "Browse our complete range of 10 research-grade peptide pen systems.",
                href: "/products",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-6 bg-white/[0.02] border border-white/[0.06] hover:border-[#FF6A1A]/30 hover:bg-white/[0.04] transition-all group"
              >
                <h3 className="text-sm font-bold text-white group-hover:text-[#FF6A1A] transition-colors mb-2">
                  {link.title}
                </h3>
                <p className="text-xs text-white/40 font-plex leading-relaxed mb-3">
                  {link.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#FF6A1A] tracking-widest">
                  LEARN MORE
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#FF6A1A] to-[#e55a10] relative overflow-hidden">
        <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <HelpCircle className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-white/70 font-plex mb-8 max-w-lg mx-auto">
            Our team is here to help. Reach out with any questions about
            our peptides, ordering process, or anything else.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6A1A] font-bold text-xs tracking-[0.2em] hover:bg-[#FFF8F0] transition-colors"
            >
              CONTACT US
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-xs tracking-[0.2em] hover:bg-white/10 hover:border-white/50 transition-colors"
            >
              BROWSE PRODUCTS
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
