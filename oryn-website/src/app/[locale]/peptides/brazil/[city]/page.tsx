import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  BRAZIL_COUNTRY,
  getBrazilianCityBySlug,
  type BrazilianCity,
} from "@/data/brazilian-cities";
import { products, productImages } from "@/data/products";
import { SEO_CATEGORIES, SITE_URL, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { MultiJsonLd } from "@/components/seo/JsonLd";
import { PageTracker } from "@/components/analytics/PageTracker";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export const dynamicParams = true;
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { locale, city: citySlug } = await params;
  const result = getBrazilianCityBySlug(citySlug);
  if (!result) return {};

  const { city } = result;

  const title = locale === "pt-br"
    ? `Peptídeos em ${city.name} | Entrega em ${city.deliveryDays} Dias — ORYN`
    : `Buy Peptides in ${city.name}, Brazil | ORYN — ${city.deliveryDays}-Day Delivery`;

  const description = locale === "pt-br"
    ? `Compre canetas de peptídeos de pesquisa em ${city.name}, Brasil. Entrega rastreada em ${city.deliveryDays} dias. ${products.length} produtos, pureza >99%, certificação GMP. BPC-157, Tirzepatida, NAD+ e mais. Pague em R$.`
    : `Order research-grade peptide pens in ${city.name}, Brazil. ${city.deliveryDays}-day tracked delivery. ${products.length} products, >99% purity, GMP manufactured. Pay in R$ BRL.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/peptides/brazil/${citySlug}`,
      type: "website",
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/peptides/brazil/${citySlug}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/peptides/brazil/${citySlug}`])
        ),
        "x-default": `${SITE_URL}/en/peptides/brazil/${citySlug}`,
      },
    },
  };
}

function cityFaqs(city: BrazilianCity, locale: string) {
  if (locale === "pt-br") {
    return [
      {
        question: `Posso comprar peptídeos em ${city.name}?`,
        answer: `Sim. A ORYN entrega canetas de peptídeos de grau farmacêutico em ${city.name}, Brasil, com entrega rastreada em ${city.deliveryDays} dias. Todos os ${products.length} produtos estão disponíveis, incluindo BPC-157, Tirzepatida, NAD+ e mais. Pureza >99%, fabricação GMP.`,
      },
      {
        question: `Qual o prazo de entrega de peptídeos para ${city.name}?`,
        answer: `A ORYN envia no mesmo dia para pedidos feitos antes das 15h. A entrega para ${city.name} leva ${city.deliveryDays} dias úteis via envio internacional expresso rastreado com embalagem com controle de temperatura.`,
      },
      {
        question: `Peptídeos são legais no Brasil?`,
        answer: `Peptídeos de pesquisa estão disponíveis para compra para fins de pesquisa no Brasil. Os produtos ORYN são vendidos estritamente para uso em pesquisa e não são licenciados para autoadministração. Todos os envios cumprem as regulamentações internacionais de envio.`,
      },
      {
        question: `Posso pagar em Reais para entrega em ${city.name}?`,
        answer: `Sim. A ORYN aceita pagamentos em BRL (R$), além de GBP, EUR, USD e outras moedas para pedidos entregues em ${city.name}. Os preços podem ser exibidos na sua moeda local.`,
      },
    ];
  }
  return [
    {
      question: `Can I buy peptides in ${city.name}?`,
      answer: `Yes. ORYN delivers research-grade peptide pens to ${city.name}, Brazil with ${city.deliveryDays}-day tracked delivery. All ${products.length} products are available, including BPC-157, Tirzepatide, NAD+, and more. >99% purity, GMP manufactured.`,
    },
    {
      question: `How fast is peptide delivery to ${city.name}?`,
      answer: `ORYN ships same-day for orders before 3 PM. Delivery to ${city.name} takes ${city.deliveryDays} business days via express tracked international shipping with temperature-controlled packaging to maintain peptide integrity.`,
    },
    {
      question: `Are peptides legal in Brazil?`,
      answer: `Research peptides are available for purchase for research purposes in Brazil. ORYN products are sold strictly for research use only and are not licensed for self-administration. All shipments comply with international shipping regulations.`,
    },
    {
      question: `Can I pay in Brazilian Reais for ${city.name} delivery?`,
      answer: `Yes. ORYN accepts payments in BRL (R$) as well as GBP, EUR, USD, and other major currencies for orders delivered to ${city.name}. Prices can be displayed in your local currency.`,
    },
  ];
}

export default async function BrazilCityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city: citySlug } = await params;
  const dict = await getDictionary(locale as Locale);
  const result = getBrazilianCityBySlug(citySlug);
  if (!result) notFound();

  const { city } = result;
  const country = BRAZIL_COUNTRY;
  const faqs = cityFaqs(city, locale);
  const nearbyCities = country.cities
    .filter((c) => c.slug !== city.slug)
    .slice(0, 6);
  const topCategories = SEO_CATEGORIES.slice(0, 6);
  const pt = locale === "pt-br";

  return (
    <>
      <MultiJsonLd
        items={[
          breadcrumbSchema([
            { name: dict.breadcrumbs.home, url: `/${locale}` },
            { name: "Brazil", url: `/${locale}/peptides/brazil` },
            { name: city.name, url: `/${locale}/peptides/brazil/${city.slug}` },
          ]),
          faqSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "OnlineBusiness",
            name: `ORYN Peptide Labs — ${city.name}, Brazil`,
            url: `${SITE_URL}/${locale}/peptides/brazil/${city.slug}`,
            description: `Buy research-grade peptide pens in ${city.name}, Brazil. ${city.deliveryDays}-day delivery, >99% purity.`,
            areaServed: {
              "@type": "City",
              name: city.name,
              containedInPlace: { "@type": "Country", name: "Brazil" },
            },
            brand: { "@type": "Brand", name: "ORYN" },
          },
        ]}
      />
      <PageTracker pageName="brazil_city" properties={{ city: citySlug }} />

      <div className="pt-[calc(1rem+4px)]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em] flex-wrap">
            <Link href={`/${locale}`} className="hover:text-oryn-orange transition-colors">HOME</Link>
            <span className="text-oryn-orange">/</span>
            <Link href={`/${locale}/peptides/brazil`} className="hover:text-oryn-orange transition-colors">BRAZIL</Link>
            <span className="text-oryn-orange">/</span>
            <span className="text-oryn-orange">{city.name.toUpperCase()}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="bg-oryn-black text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
                BR &middot; {city.name.toUpperCase()} &middot; {city.deliveryDays}-{pt ? "DIAS" : "DAY DELIVERY"}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {pt ? "Compre Peptídeos" : "Buy Peptides"}
              <br />
              {pt ? "em" : "in"} <span className="text-oryn-orange">{city.name}</span>
            </h1>
            <p className="text-lg text-white/60 font-plex max-w-2xl mb-4">
              {pt
                ? `${city.description}. A ORYN entrega ${products.length} canetas de peptídeos de grau farmacêutico em ${city.name} com entrega rastreada em ${city.deliveryDays} dias. Todos os produtos com pureza >99%, fabricação GMP, pré-misturados e prontos para uso.`
                : `${city.description}. ORYN delivers ${products.length} research-grade peptide pens to ${city.name} with ${city.deliveryDays}-day tracked delivery. All products >99% purity, GMP manufactured, pre-mixed & ready to use.`}
            </p>
            <p className="text-sm text-white/40 font-plex mb-8">
              {pt ? "População" : "Population"}: {city.population} &middot; {pt ? "A partir de" : "From"} R$
              {Math.min(...products.map((p) => p.price))}
            </p>
            <Link
              href={`/${locale}/products`}
              className="px-8 py-4 bg-oryn-orange text-white text-xs font-medium tracking-[0.2em] hover:bg-oryn-orange-dark transition-colors"
            >
              {pt ? "VER TODOS OS PEPTÍDEOS" : "SHOP ALL PEPTIDES"}
            </Link>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="border-b border-oryn-grey/20">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {(pt ? [
              { label: `Entrega em ${city.deliveryDays} Dias`, sub: city.name },
              { label: "Pureza >99%", sub: "Verificado por HPLC" },
              { label: `${products.length} Produtos`, sub: "Disponíveis" },
              { label: "Canetas Pré-Misturadas", sub: "Prontas para Uso" },
            ] : [
              { label: `${city.deliveryDays}-Day Delivery`, sub: city.name },
              { label: ">99% Purity", sub: "HPLC Verified" },
              { label: `${products.length} Products`, sub: "Available" },
              { label: "Pre-Mixed Pens", sub: "Ready to Use" },
            ]).map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm font-bold">{item.label}</p>
                <p className="text-[10px] text-oryn-black/40 font-mono tracking-[0.1em] mt-1">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* City Context */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {pt ? `Pesquisa de Peptídeos em ${city.name}` : `Peptide Research in ${city.name}`}
              </h2>
              <p className="text-sm text-oryn-black/60 font-plex leading-relaxed mb-6">
                {pt
                  ? `${city.name} é ${city.description.toLowerCase()}. A ORYN entrega nossa linha completa de canetas de peptídeos de grau farmacêutico para pesquisadores e profissionais em ${city.name} e regiões próximas, incluindo ${city.nearbyAreas.slice(0, 3).join(", ")}.`
                  : `${city.name} is ${city.description.toLowerCase()}. ORYN delivers our full range of research-grade peptide pens to researchers and professionals in ${city.name} and surrounding areas including ${city.nearbyAreas.slice(0, 3).join(", ")}.`}
              </p>
              {city.landmarks.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold mb-3">{pt ? "Instituições Notáveis" : "Notable Institutions"}</h3>
                  <ul className="space-y-2">
                    {city.landmarks.map((l) => (
                      <li
                        key={l}
                        className="flex items-center gap-2 text-xs text-oryn-black/50 font-plex"
                      >
                        <span className="w-1 h-1 bg-oryn-orange rounded-full shrink-0" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Delivery Info */}
            <div className="bg-oryn-orange/5 border border-oryn-orange/10 p-8">
              <h3 className="text-lg font-bold mb-4">
                {pt ? `Entrega em ${city.name}` : `Delivery to ${city.name}`}
              </h3>
              <div className="space-y-4">
                {(pt ? [
                  { title: "Envio no Mesmo Dia", desc: "Pedidos antes das 15h são enviados no mesmo dia" },
                  { title: `Entrega em ${city.deliveryDays} Dias`, desc: `Envio expresso rastreado para ${city.name}` },
                  { title: "Controle de Temperatura", desc: "Embalagem isolada, integridade da cadeia fria" },
                  { title: "Embalagem Discreta", desc: "Embalagem simples, sem descrição do produto" },
                ] : [
                  { title: "Same-Day Dispatch", desc: "Orders before 3 PM ship the same day" },
                  { title: `${city.deliveryDays}-Day Delivery`, desc: `Express tracked to ${city.name}` },
                  { title: "Temperature Controlled", desc: "Insulated packaging, cold chain integrity" },
                  { title: "Discreet Packaging", desc: "Plain packaging, no product description" },
                ]).map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-xs text-oryn-black/50 font-plex">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-oryn-cream py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-oryn-orange" />
              <span className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
                {pt ? `DISPONÍVEL EM ${city.name.toUpperCase()}` : `AVAILABLE IN ${city.name.toUpperCase()}`}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-8">
              {pt ? `Canetas de Peptídeos para ${city.name}` : `Peptide Pens for ${city.name}`}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/${locale}/products/${product.slug}`}
                  className="bg-white border border-oryn-grey/10 hover:border-oryn-orange/30 transition-all group"
                >
                  <div className="bg-oryn-cream/50 p-6 flex items-center justify-center min-h-[140px]">
                    <Image
                      src={productImages.bySlug[product.slug] || product.image}
                      alt={pt ? `${product.name} — entrega em ${city.name}` : `${product.name} — delivery to ${city.name}`}
                      width={100}
                      height={100}
                      className="object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[9px] font-mono text-oryn-orange tracking-[0.1em] mb-1">
                      {product.categoryLabel.toUpperCase()}
                    </p>
                    <h3 className="text-sm font-bold group-hover:text-oryn-orange transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-oryn-black/40 font-plex mt-1">
                      {product.dosage}
                    </p>
                    <p className="text-lg font-bold text-oryn-orange mt-2">
                      R${product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold mb-6">
            {pt ? `Categorias de Peptídeos Disponíveis em ${city.name}` : `Peptide Categories Available in ${city.name}`}
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
                  {cat.productSlugs.length} {pt ? "PRODUTOS" : "PRODUCTS"} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-oryn-cream/50 border-t border-oryn-grey/10">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-8">
              {pt ? `Peptídeos em ${city.name} — FAQ` : `Peptides in ${city.name} — FAQ`}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-oryn-grey/20 bg-white open:border-oryn-orange/20"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-oryn-cream/50 transition-colors">
                    <h3 className="text-sm font-bold pr-4">{faq.question}</h3>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-oryn-orange group-open:rotate-45 transition-transform">
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

        {/* Nearby Cities */}
        {nearbyCities.length > 0 && (
          <section className="bg-oryn-black text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-xl font-bold mb-6">
                {pt ? "Também Entregamos em Outras Cidades Brasileiras" : "Also Delivering to Other Brazilian Cities"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {nearbyCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${locale}/peptides/brazil/${c.slug}`}
                    className="p-4 border border-white/10 hover:border-oryn-orange/50 transition-colors"
                  >
                    <p className="text-sm font-bold">{c.name}</p>
                    <p className="text-[10px] text-white/40 font-mono tracking-[0.1em]">
                      {pt ? `ENTREGA EM ${c.deliveryDays} DIAS` : `${c.deliveryDays}-DAY DELIVERY`}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-oryn-orange py-16">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              {pt ? `Peça Peptídeos em ${city.name}` : `Order Peptides in ${city.name}`}
            </h2>
            <p className="text-sm text-white/70 font-plex mb-8 max-w-lg mx-auto">
              {pt
                ? `Entrega rastreada em ${city.deliveryDays} dias. Fabricação GMP, pureza >99% garantida. Canetas de peptídeos pré-misturadas prontas para uso.`
                : `${city.deliveryDays}-day tracked delivery. GMP manufactured, >99% purity guaranteed. Pre-mixed peptide pens ready to use.`}
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-oryn-orange font-medium text-xs tracking-[0.2em] hover:bg-oryn-cream transition-colors"
            >
              {pt ? "VER TODOS OS PEPTÍDEOS" : "SHOP ALL PEPTIDES"}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
