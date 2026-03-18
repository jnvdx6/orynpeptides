/* ─── Brazilian Cities Data ──────────────────────────────────────────── */

export interface BrazilianCity {
  slug: string;
  name: string;
  deliveryDays: string;
  population: string;
  description: string;
  landmarks: string[];
  nearbyAreas: string[];
}

export interface BrazilCountry {
  slug: string;
  name: string;
  code: string;
  deliveryDays: string;
  description: string;
  currency: string;
  currencySymbol: string;
  cities: BrazilianCity[];
}

export const BRAZILIAN_CITIES: BrazilianCity[] = [
  /* ── São Paulo ──────────────────────────────────────────────────── */
  {
    slug: "sao-paulo",
    name: "São Paulo",
    deliveryDays: "7-10",
    population: "12.3 million",
    description:
      "Brazil's largest city and the economic engine of Latin America, home to world-class universities, major pharmaceutical companies, and a thriving biotech startup ecosystem",
    landmarks: [
      "University of São Paulo (USP)",
      "Instituto Butantan",
      "Federal University of São Paulo (UNIFESP)",
    ],
    nearbyAreas: ["Campinas", "Guarulhos", "Santo André", "Osasco", "Sorocaba"],
  },

  /* ── Rio de Janeiro ─────────────────────────────────────────────── */
  {
    slug: "rio-de-janeiro",
    name: "Rio de Janeiro",
    deliveryDays: "7-10",
    population: "6.7 million",
    description:
      "Brazil's second-largest city with a strong tradition in biomedical research, public health science, and pharmaceutical innovation driven by leading federal institutions",
    landmarks: [
      "Federal University of Rio de Janeiro (UFRJ)",
      "Fundação Oswaldo Cruz (Fiocruz)",
      "Rio de Janeiro State University (UERJ)",
    ],
    nearbyAreas: ["Niterói", "Duque de Caxias", "Nova Iguaçu", "São Gonçalo", "Petrópolis"],
  },

  /* ── Curitiba ───────────────────────────────────────────────────── */
  {
    slug: "curitiba",
    name: "Curitiba",
    deliveryDays: "8-11",
    population: "1.9 million",
    description:
      "The capital of Paraná state and a well-planned urban centre with strong universities, a growing biotech sector, and notable investment in health technology research",
    landmarks: [
      "Federal University of Paraná (UFPR)",
      "Pontifical Catholic University of Paraná (PUCPR)",
      "Instituto Carlos Chagas (Fiocruz Paraná)",
    ],
    nearbyAreas: ["São José dos Pinhais", "Colombo", "Araucária", "Pinhais", "Campo Largo"],
  },

  /* ── Belo Horizonte ─────────────────────────────────────────────── */
  {
    slug: "belo-horizonte",
    name: "Belo Horizonte",
    deliveryDays: "8-11",
    population: "2.5 million",
    description:
      "The capital of Minas Gerais and a major hub for biomedical research in Brazil, anchored by a prestigious federal university and a vibrant life sciences innovation ecosystem",
    landmarks: [
      "Federal University of Minas Gerais (UFMG)",
      "Instituto René Rachou (Fiocruz Minas)",
      "Santa Casa de Misericórdia de Belo Horizonte",
    ],
    nearbyAreas: ["Contagem", "Betim", "Ribeirão das Neves", "Nova Lima", "Sabará"],
  },

  /* ── Brasília ───────────────────────────────────────────────────── */
  {
    slug: "brasilia",
    name: "Brasília",
    deliveryDays: "8-11",
    population: "3.0 million",
    description:
      "Brazil's federal capital and seat of government, with major public research agencies, a leading university, and strategic importance for national health policy and regulatory bodies",
    landmarks: [
      "University of Brasília (UnB)",
      "Embrapa (Brazilian Agricultural Research Corporation)",
      "Fundação Hemocentro de Brasília",
    ],
    nearbyAreas: ["Taguatinga", "Ceilândia", "Samambaia", "Águas Claras", "Planaltina"],
  },

  /* ── Porto Alegre ───────────────────────────────────────────────── */
  {
    slug: "porto-alegre",
    name: "Porto Alegre",
    deliveryDays: "8-11",
    population: "1.5 million",
    description:
      "The capital of Rio Grande do Sul with a distinguished medical research tradition, one of Latin America's top university hospitals, and a strong pharmaceutical manufacturing base",
    landmarks: [
      "Federal University of Rio Grande do Sul (UFRGS)",
      "Hospital de Clínicas de Porto Alegre",
      "Pontifical Catholic University of Rio Grande do Sul (PUCRS)",
    ],
    nearbyAreas: ["Canoas", "Gravataí", "Viamão", "Novo Hamburgo", "São Leopoldo"],
  },

  /* ── Recife ─────────────────────────────────────────────────────── */
  {
    slug: "recife",
    name: "Recife",
    deliveryDays: "9-12",
    population: "1.6 million",
    description:
      "The capital of Pernambuco and the leading research centre of northeastern Brazil, with pioneering work in tropical medicine, infectious diseases, and public health genomics",
    landmarks: [
      "Federal University of Pernambuco (UFPE)",
      "Fundação Oswaldo Cruz Pernambuco (Fiocruz PE)",
      "Instituto Aggeu Magalhães",
    ],
    nearbyAreas: ["Olinda", "Jaboatão dos Guararapes", "Paulista", "Camaragibe", "Cabo de Santo Agostinho"],
  },

  /* ── Salvador ───────────────────────────────────────────────────── */
  {
    slug: "salvador",
    name: "Salvador",
    deliveryDays: "9-12",
    population: "2.9 million",
    description:
      "The capital of Bahia and a major centre for tropical disease research and immunology, with a vibrant academic community and growing health sciences infrastructure",
    landmarks: [
      "Federal University of Bahia (UFBA)",
      "Fundação Oswaldo Cruz Bahia (Fiocruz BA)",
      "Instituto Gonçalo Moniz",
    ],
    nearbyAreas: ["Lauro de Freitas", "Camaçari", "Simões Filho", "Candeias", "Feira de Santana"],
  },

  /* ── Fortaleza ──────────────────────────────────────────────────── */
  {
    slug: "fortaleza",
    name: "Fortaleza",
    deliveryDays: "9-12",
    population: "2.7 million",
    description:
      "The capital of Ceará and a growing research hub in northeastern Brazil, with strong university programmes in pharmaceutical sciences, marine biotechnology, and public health",
    landmarks: [
      "Federal University of Ceará (UFC)",
      "State University of Ceará (UECE)",
      "Núcleo de Pesquisa e Desenvolvimento de Medicamentos (NPDM)",
    ],
    nearbyAreas: ["Caucaia", "Maracanaú", "Eusébio", "Aquiraz", "Maranguape"],
  },

  /* ── Campinas ───────────────────────────────────────────────────── */
  {
    slug: "campinas",
    name: "Campinas",
    deliveryDays: "7-10",
    population: "1.2 million",
    description:
      "A major technology and research city in São Paulo state, home to one of Brazil's top universities and a dense cluster of pharmaceutical and biotech companies",
    landmarks: [
      "University of Campinas (UNICAMP)",
      "Brazilian Synchrotron Light Laboratory (LNLS)",
      "Centro Nacional de Pesquisa em Energia e Materiais (CNPEM)",
    ],
    nearbyAreas: ["Sumaré", "Hortolândia", "Indaiatuba", "Valinhos", "Americana"],
  },
];

/* ─── Country Object ────────────────────────────────────────────────── */

export const BRAZIL_COUNTRY: BrazilCountry = {
  slug: "brazil",
  name: "Brazil",
  code: "BR",
  deliveryDays: "7-12",
  description:
    "Latin America's largest economy and a global leader in biomedical research, with world-renowned institutions such as Fiocruz and USP driving innovation in tropical medicine, vaccine development, and pharmaceutical sciences.",
  currency: "BRL",
  currencySymbol: "R$",
  cities: BRAZILIAN_CITIES,
};

/* ─── Slug Constants for Sitemap ────────────────────────────────────── */

export const BRAZILIAN_CITY_SLUGS = [
  "sao-paulo",
  "rio-de-janeiro",
  "curitiba",
  "belo-horizonte",
  "brasilia",
  "porto-alegre",
  "recife",
  "salvador",
  "fortaleza",
  "campinas",
] as const;

/* ─── Lookup Helpers ────────────────────────────────────────────────── */

export function getBrazilianCityBySlug(
  citySlug: string
): { city: BrazilianCity } | null {
  const city = BRAZILIAN_CITIES.find((c) => c.slug === citySlug);
  if (!city) return null;
  return { city };
}
