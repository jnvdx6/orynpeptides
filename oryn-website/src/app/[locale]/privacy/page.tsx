import type { Metadata } from "next";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { locales } from "@/i18n/config";

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
    title: "Privacy Policy | ORYN Peptide Labs — GDPR Compliant",
    description: "ORYN Peptide Labs privacy policy. GDPR compliant data handling, cookie policy, your rights, and how we protect your personal information.",
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}/privacy`])
      ),
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `/${locale}` },
          { name: "Privacy Policy", url: `/${locale}/privacy` },
        ])}
      />
      <div className="pt-32 pb-16">
        <section className="py-16 bg-oryn-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-molecular-grid-orange opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <span className="text-xs font-mono text-white/70 tracking-widest">LEGAL</span>
            <h1 className="text-4xl font-bold mt-4">Privacy Policy</h1>
          </div>
        </section>
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="prose prose-sm max-w-none font-plex text-oryn-black/70 space-y-6">
            <p className="text-xs font-mono text-oryn-black/40">Last updated: March 2026</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">1. Information We Collect</h2>
            <p>We collect information you provide directly: name, email, organization, shipping address, and payment details when you create an account or place an order.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">2. How We Use Your Information</h2>
            <p>Your information is used to: process orders, communicate about your account, provide customer support, send order updates, and comply with legal obligations. We do not sell your personal data.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">3. Data Protection</h2>
            <p>ORYN Peptide Labs complies with GDPR and applicable European data protection regulations. Your data is stored securely with encryption at rest and in transit.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">4. Your Rights</h2>
            <p>Under GDPR, you have the right to: access your data, rectify inaccuracies, request deletion, restrict processing, data portability, and object to processing. Contact privacy@orynlabs.com to exercise these rights.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">5. Cookies</h2>
            <p>We use essential cookies for site functionality and analytics cookies to improve our service. You can manage cookie preferences in your browser settings.</p>

            <h2 className="text-lg font-bold text-oryn-black mt-8">6. Contact</h2>
            <p>Data Protection Officer: privacy@orynlabs.com</p>
          </div>
        </section>
      </div>
    </>
  );
}
