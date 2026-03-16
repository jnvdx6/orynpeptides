"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { ScienceSection } from "@/components/sections/ScienceSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { QualitySection } from "@/components/sections/QualitySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { TrustBanner } from "@/components/seo/TrustBanner";
import { Link } from "@/components/ui/LocaleLink";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useLocale } from "@/i18n/LocaleContext";

const topCities = [
  { slug: "london", name: "London" },
  { slug: "manchester", name: "Manchester" },
  { slug: "birmingham", name: "Birmingham" },
  { slug: "edinburgh", name: "Edinburgh" },
  { slug: "glasgow", name: "Glasgow" },
  { slug: "leeds", name: "Leeds" },
  { slug: "bristol", name: "Bristol" },
  { slug: "liverpool", name: "Liverpool" },
  { slug: "cambridge", name: "Cambridge" },
  { slug: "oxford", name: "Oxford" },
  { slug: "cardiff", name: "Cardiff" },
  { slug: "newcastle", name: "Newcastle" },
  { slug: "brighton", name: "Brighton" },
  { slug: "sheffield", name: "Sheffield" },
  { slug: "nottingham", name: "Nottingham" },
  { slug: "belfast", name: "Belfast" },
  { slug: "southampton", name: "Southampton" },
  { slug: "york", name: "York" },
  { slug: "bath", name: "Bath" },
  { slug: "exeter", name: "Exeter" },
];

const researchAreas = [
  { slug: "recovery" },
  { slug: "weight-loss" },
  { slug: "anti-aging" },
  { slug: "muscle-growth" },
  { slug: "skin-rejuvenation" },
];

const topArticles = [
  { slug: "are-peptides-legal-in-the-uk", title: "Are Peptides Legal in the UK?" },
  { slug: "bpc-157-complete-guide", title: "BPC-157 Complete Guide" },
  { slug: "tirzepatide-vs-semaglutide", title: "Tirzepatide vs Semaglutide" },
  { slug: "how-to-use-peptide-pen", title: "How to Use a Peptide Pen" },
  { slug: "best-peptides-for-recovery-uk", title: "Best Peptides for Recovery" },
  { slug: "nad-plus-complete-guide", title: "NAD+ Complete Guide" },
];

export function HomeClient() {
  usePageTracking("home");
  const { t } = useLocale();

  return (
    <>
      <HeroSection />
      <TrustBanner />
      <CategoriesSection />
      <ProductsShowcase />
      <HowItWorksSection />
      <TestimonialsSection />
      <ScienceSection />
      <QualitySection />
      <FAQSection />
      <CTASection />

      {/* SEO Internal Linking Section */}
      <section className="py-16 bg-oryn-cream border-t border-oryn-orange/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* UK Delivery Cities */}
            <div>
              <h2 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-5">
                {t.homeSeo.deliveryTitle}
              </h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {topCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/peptides/${city.slug}`}
                    className="text-[11px] text-oryn-black/35 hover:text-oryn-orange transition-colors font-plex"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Research Areas */}
            <div>
              <h2 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-5">
                {t.homeSeo.researchAreaTitle}
              </h2>
              <ul className="space-y-2">
                {researchAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/peptides-for/${area.slug}`}
                      className="text-[11px] text-oryn-black/35 hover:text-oryn-orange transition-colors font-plex"
                    >
                      {t.homeSeo.peptidesFor} {t.researchCategories[area.slug] || area.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Research Hub */}
            <div>
              <h2 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-5">
                {t.homeSeo.researchHubTitle}
              </h2>
              <ul className="space-y-2">
                {topArticles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/learn/${article.slug}`}
                      className="text-[11px] text-oryn-black/35 hover:text-oryn-orange transition-colors font-plex"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
