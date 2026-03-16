import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Terms of Service | ORYN Peptide Labs",
    description: "ORYN Peptide Labs terms of service. Research use only policy, ordering, shipping, returns, and legal information for peptide purchases in the UK and Europe.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/terms`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/terms`])
      ),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: dict.breadcrumbs.home, url: `/${locale}` },
          { name: dict.breadcrumbs.terms, url: `/${locale}/terms` },
        ])}
      />
      <div className="pt-32 pb-16">
        <section className="py-16 bg-oryn-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <span className="text-xs font-mono text-white/70 tracking-widest">LEGAL</span>
            <h1 className="text-4xl font-bold mt-4">Terms of Service</h1>
          </div>
        </section>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="prose prose-sm max-w-none font-plex text-oryn-black/70 space-y-6">
            <p className="text-xs font-mono text-oryn-black/40">Last updated: March 2026</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">1. Acceptance of Terms</h2>
            <p>By accessing and using the ORYN Peptide Labs website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">2. Research Use Only</h2>
            <p>All products sold by ORYN Peptide Labs are intended for laboratory and research purposes only. Products are not intended for human or animal consumption. By purchasing, you confirm you are acquiring products for legitimate research purposes and comply with all applicable laws and regulations in your jurisdiction.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">3. Eligibility</h2>
            <p>You must be at least 18 years old and represent a legitimate research organization, laboratory, or academic institution to purchase products. ORYN reserves the right to request verification of research credentials.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">4. Orders and Payment</h2>
            <p>All prices are listed in EUR. Payment is processed securely. ORYN reserves the right to cancel orders that appear fraudulent or violate these terms. For wholesale orders: 50% upfront payment, 50% before shipping.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">5. Shipping and Delivery</h2>
            <p>Products are shipped with cold chain handling where required. Delivery times are estimates. ORYN is not responsible for delays caused by customs, carriers, or force majeure events.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">6. Returns and Refunds</h2>
            <p>Due to the nature of our products, returns are accepted only for damaged or incorrect items within 14 days of delivery. Products must be unopened and in original packaging.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">7. Intellectual Property</h2>
            <p>All content, branding, and materials on this website are the property of ORYN Peptide Labs. Unauthorized reproduction is prohibited.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">8. Limitation of Liability</h2>
            <p>ORYN Peptide Labs provides products as-is for research purposes. We make no warranties regarding fitness for any particular purpose beyond stated specifications. Our liability is limited to the purchase price of the product.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">9. Contact</h2>
            <p>For questions regarding these terms, contact us at legal@orynlabs.com.</p>
          </div>
        </section>
      </div>
    </>
  );
}
