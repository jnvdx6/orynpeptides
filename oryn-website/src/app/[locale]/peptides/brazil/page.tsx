import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BRAZIL_COUNTRY } from "@/data/brazilian-cities";
import { products, productImages } from "@/data/products";
import {
  SEO_CATEGORIES,
  SITE_URL,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { PageTracker } from "@/components/analytics/PageTracker";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === "pt-br"
    ? `Comprar Peptídeos no Brasil | ORYN — Entrega em ${BRAZIL_COUNTRY.deliveryDays} Dias`
    : locale === "pt"
    ? `Comprar Peptídeos no Brasil | ORYN — Entrega em ${BRAZIL_COUNTRY.deliveryDays} Dias`
    : locale === "es"
    ? `Comprar Péptidos en Brasil | ORYN — Entrega en ${BRAZIL_COUNTRY.deliveryDays} Días`
    : `Buy Peptides in Brazil | ORYN — ${BRAZIL_COUNTRY.deliveryDays}-Day Delivery`;

  const description = locale === "pt-br"
    ? `Compre canetas de peptídeos de pesquisa no Brasil. Entrega rastreada em ${BRAZIL_COUNTRY.deliveryDays} dias para mais de ${BRAZIL_COUNTRY.cities.length} cidades. Pureza >99%, fabricação GMP. BPC-157, Tirzepatida, NAD+ e mais. Pague em R$ BRL.`
    : locale === "pt"
    ? `Compre canetas de peptídeos de investigação no Brasil. Entrega rastreada em ${BRAZIL_COUNTRY.deliveryDays} dias para mais de ${BRAZIL_COUNTRY.cities.length} cidades. Pureza >99%, fabricação GMP. BPC-157, Tirzepatida, NAD+ e mais. Pague em R$ BRL.`
    : locale === "es"
    ? `Pida plumas de péptidos de investigación en Brasil. Entrega rastreada en ${BRAZIL_COUNTRY.deliveryDays} días a más de ${BRAZIL_COUNTRY.cities.length} ciudades. Pureza >99%, fabricación GMP. BPC-157, Tirzepatida, NAD+ y más. Pague en R$ BRL.`
    : `Order research-grade peptide pens in Brazil. ${BRAZIL_COUNTRY.deliveryDays}-day tracked delivery to ${BRAZIL_COUNTRY.cities.length}+ cities. >99% purity, GMP manufactured. BPC-157, Tirzepatide, NAD+ & more. Pay in R$ BRL.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/brazil`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/brazil`,
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/peptides/brazil`])),
    },
  };
}

export default async function BrazilPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const country = BRAZIL_COUNTRY;
  const topCategories = SEO_CATEGORIES.slice(0, 6);

  const isPtBr = locale === "pt-br";

  const faqs = isPtBr
    ? [
        {
          question: `Posso comprar peptídeos no Brasil?`,
          answer: `Sim. A ORYN entrega canetas de peptídeos de grau farmacêutico para mais de ${country.cities.length} cidades no Brasil com entrega rastreada em ${country.deliveryDays} dias. Todos os produtos têm pureza superior a 99% e são fabricados em instalações europeias com certificação GMP.`,
        },
        {
          question: `Qual o prazo de entrega para o Brasil?`,
          answer: `A ORYN envia no mesmo dia para pedidos feitos antes das 15h. A entrega para o Brasil leva ${country.deliveryDays} dias úteis via envio internacional expresso rastreado com embalagem com controle de temperatura.`,
        },
        {
          question: `Quais peptídeos estão disponíveis para entrega no Brasil?`,
          answer: `A ORYN oferece ${products.length} canetas de peptídeos de pesquisa para entrega no Brasil, incluindo BPC-157, TB-500, CJC-1295, Ipamorelina, Tirzepatida, GHK-Cu, Glutationa e NAD+. Todos os produtos são pré-misturados e prontos para uso.`,
        },
        {
          question: `Posso pagar em Reais (BRL)?`,
          answer: `Sim. A ORYN aceita pagamentos em BRL (R$), além de GBP, EUR, USD e outras moedas. Os preços são exibidos na sua moeda local no checkout.`,
        },
      ]
    : [
        {
          question: `Can I buy peptides in Brazil?`,
          answer: `Yes. ORYN delivers research-grade peptide pens to ${country.cities.length}+ cities across Brazil with ${country.deliveryDays}-day tracked delivery. All products exceed 99% purity and are manufactured in GMP-certified European facilities.`,
        },
        {
          question: `How fast is delivery to Brazil?`,
          answer: `ORYN ships same-day for orders before 3 PM. Delivery to Brazil takes ${country.deliveryDays} business days via express tracked international shipping with temperature-controlled packaging.`,
        },
        {
          question: `What peptides are available for delivery to Brazil?`,
          answer: `ORYN offers ${products.length} research-grade peptide pens for delivery to Brazil, including BPC-157, TB-500, CJC-1295, Ipamorelin, Tirzepatide, GHK-Cu, Glutathione, and NAD+. All products are pre-mixed and ready to use.`,
        },
        {
          question: `Can I pay in Brazilian Reais (BRL)?`,
          answer: `Yes. ORYN accepts payments in BRL (R$) as well as GBP, EUR, USD and other major currencies. Prices are displayed in your local currency at checkout.`,
        },
      ];

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            {
              name: "Brazil",
              url: `/${locale}/peptides/brazil`,
            },
          ]),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Peptide Delivery Cities in Brazil`,
            numberOfItems: country.cities.length,
            itemListElement: country.cities.map((city, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/${locale}/peptides/brazil/${city.slug}`,
              name: `Peptides in ${city.name}, Brazil`,
            })),
          },
        ]}
      />
      <PageTracker pageName="brazil_country" />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]">
            <Link
              href={`/${locale}`}
              className="hover:text-oryn-orange transition-colors"
            >
              HOME
            </Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">BRAZIL</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                BR &middot; {country.deliveryDays}-DAY DELIVERY
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {isPtBr ? "Peptídeos no" : "Peptides in"}
              <br />
              <span className="text-oryn-orange">{isPtBr ? "Brasil" : "Brazil"}</span>
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-4">
              {country.description} ORYN delivers {products.length}{" "}
              research-grade peptide pens to {country.cities.length}+ cities
              across Brazil with {country.deliveryDays}-day tracked
              delivery.
            </p>
            <p className="text-sm text-white/40 font-plex mb-8">
              All products &gt;99% purity, GMP manufactured, pre-mixed &amp;
              ready to use. Pay in R$ BRL.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/products`}
                className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
              >
                SHOP ALL PEPTIDES
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-b border-oryn-grey/20">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: `${country.deliveryDays}-Day Delivery`,
                sub: "Brazil",
              },
              { label: ">99% Purity", sub: "HPLC Verified" },
              {
                label: `${country.cities.length}+ Cities`,
                sub: "Direct Delivery",
              },
              { label: "Pre-Mixed Pens", sub: "Ready to Use" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em] mt-1">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cities Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-6 h-px bg-oryn-orange" />
            <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
              {isPtBr ? "CIDADES DE ENTREGA" : "DELIVERY CITIES"}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {isPtBr ? "Cidades de Entrega de Peptídeos no Brasil" : "Peptide Delivery Cities in Brazil"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {country.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${locale}/peptides/brazil/${city.slug}`}
                className="group p-4 border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all"
              >
                <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                  {city.name}
                </h3>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em] mt-1">
                  {city.deliveryDays}-DAY &middot; POP. {city.population}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">
              {isPtBr ? "Peptídeos Disponíveis no Brasil" : "Peptides Available in Brazil"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group p-4"
                >
                  <Image
                    src={productImages.bySlug[product.slug] || product.image}
                    alt={`${product.name} — delivery to Brazil`}
                    width={80}
                    height={80}
                    className="object-contain mx-auto mb-2"
                  />
                  <h3 className="text-xs font-bold text-center group-hover:text-oryn-orange transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-center text-sm font-bold text-oryn-orange mt-1">
                    R${product.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-6">
            {isPtBr ? "Categorias de Peptídeos no Brasil" : "Peptide Categories in Brazil"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${locale}/peptides-for/${cat.slug}`}
                className="p-5 border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
              >
                <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-oryn-black/50 font-plex mt-1 line-clamp-2">
                  {cat.description}
                </p>
                <span className="text-[9px] font-mono text-oryn-orange tracking-[0.1em] mt-2 inline-block">
                  {cat.productSlugs.length} PRODUCTS &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-oryn-cream/50 border-t border-oryn-grey/10">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-8">
              Peptides in Brazil &mdash; FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-oryn-grey/20 bg-white open:border-oryn-orange/20"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                    <h3 className="text-sm font-bold pr-4">{faq.question}</h3>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="shrink-0 text-oryn-orange group-open:rotate-45 transition-transform"
                    >
                      <path d="M12 5v14m-7-7h14" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-xs text-oryn-black/60 font-plex leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Order Peptides in Brazil
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              {country.deliveryDays}-day tracked delivery to{" "}
              {country.cities.length}+ cities. GMP manufactured, &gt;99% purity
              guaranteed. Pay in R$ BRL.
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              SHOP ALL PEPTIDES
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
