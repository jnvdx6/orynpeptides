export interface UKRegion {
  slug: string;
  name: string;
  description: string;
  cities: string[]; // city slugs from UK_CITIES
  deliveryDays: string;
}

export const UK_REGIONS: UKRegion[] = [
  {
    slug: "scotland",
    name: "Scotland",
    description:
      "Scotland is home to world-renowned universities, pioneering medical research institutions, and a thriving life sciences sector centred around Edinburgh, Glasgow, Aberdeen, and Dundee. From the University of Edinburgh's BioQuarter to Dundee's globally recognised Drug Discovery Unit, Scottish research institutions are at the forefront of peptide science and pharmaceutical innovation.",
    cities: ["edinburgh", "glasgow", "aberdeen", "dundee"],
    deliveryDays: "2-3",
  },
  {
    slug: "wales",
    name: "Wales",
    description:
      "Wales offers a growing biomedical research landscape anchored by Cardiff University's School of Pharmacy and Swansea University's medical school. The Welsh life sciences sector continues to expand, with strong government support for health innovation and pharmaceutical research across both major cities.",
    cities: ["cardiff", "swansea"],
    deliveryDays: "1-2",
  },
  {
    slug: "north-england",
    name: "North of England",
    description:
      "The North of England is a powerhouse of health innovation and biomedical research. From Manchester's Science Park and Alderley Park to Newcastle's Centre for Life, the region hosts some of the UK's most productive research corridors. Universities across the North produce world-leading peptide and pharmaceutical research.",
    cities: [
      "manchester",
      "leeds",
      "liverpool",
      "newcastle",
      "sheffield",
      "hull",
      "york",
      "stoke-on-trent",
    ],
    deliveryDays: "1-2",
  },
  {
    slug: "south-england",
    name: "South of England",
    description:
      "The South of England encompasses London and the surrounding counties, representing the UK's largest concentration of research institutions, teaching hospitals, and life sciences companies. From Imperial College London and the Francis Crick Institute to the universities of Southampton, Reading, and Brighton, the region leads in biomedical discovery and peptide science.",
    cities: [
      "london",
      "brighton",
      "southampton",
      "bournemouth",
      "exeter",
      "plymouth",
      "reading",
      "bath",
    ],
    deliveryDays: "1-2",
  },
  {
    slug: "midlands",
    name: "The Midlands",
    description:
      "The Midlands region is a vital hub for UK pharmaceutical and life sciences research. Birmingham, Nottingham, Leicester, Coventry, and Derby host major research universities and growing biotech clusters. From Nottingham's BioCity to the University of Warwick's biomedical facilities, the Midlands plays a crucial role in advancing UK peptide research.",
    cities: ["birmingham", "nottingham", "leicester", "coventry", "derby"],
    deliveryDays: "1-2",
  },
  {
    slug: "east-england",
    name: "East of England",
    description:
      "East of England is home to the world-famous Cambridge Biomedical Campus and some of the UK's most respected research institutions. From Cambridge and Oxford's centuries-old universities to the growing life sciences clusters in Norwich, Bristol, and Milton Keynes, this region is a global centre for biotech innovation and peptide research.",
    cities: [
      "cambridge",
      "norwich",
      "ipswich",
      "milton-keynes",
      "cheltenham",
      "oxford",
      "bristol",
    ],
    deliveryDays: "1-2",
  },
];

export function getRegionBySlug(slug: string): UKRegion | undefined {
  return UK_REGIONS.find((r) => r.slug === slug);
}

export const REGION_SLUGS = UK_REGIONS.map((r) => r.slug);
