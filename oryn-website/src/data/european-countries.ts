/* ─── European Countries & Cities Data ────────────────────────────────── */

export interface EuropeanCity {
  slug: string;
  name: string;
  deliveryDays: string;
  population: string;
  description: string;
  landmarks: string[];
  nearbyAreas: string[];
}

export interface EuropeanCountry {
  slug: string;
  name: string;
  code: string;
  deliveryDays: string;
  description: string;
  currency: string;
  currencySymbol: string;
  cities: EuropeanCity[];
}

export const EUROPEAN_COUNTRIES: EuropeanCountry[] = [
  /* ── Germany ─────────────────────────────────────────────────────── */
  {
    slug: "germany",
    name: "Germany",
    code: "DE",
    deliveryDays: "3-5",
    description: "Europe's largest economy with a thriving biotech and pharmaceutical research landscape.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "berlin",
        name: "Berlin",
        deliveryDays: "3-4",
        population: "3.7 million",
        description: "Germany's capital and a leading hub for biotech startups and academic research",
        landmarks: ["Charité University Hospital", "Max Planck Institute", "Berlin Institute of Health"],
        nearbyAreas: ["Potsdam", "Spandau", "Kreuzberg", "Mitte", "Schöneberg"],
      },
      {
        slug: "munich",
        name: "Munich",
        deliveryDays: "3-4",
        population: "1.5 million",
        description: "Bavaria's capital, renowned for its world-class universities and biomedical research centres",
        landmarks: ["TU Munich", "Ludwig Maximilian University", "Max Planck Society HQ"],
        nearbyAreas: ["Augsburg", "Freising", "Dachau", "Starnberg", "Erding"],
      },
      {
        slug: "hamburg",
        name: "Hamburg",
        deliveryDays: "3-4",
        population: "1.9 million",
        description: "Germany's second-largest city with major pharmaceutical and life sciences companies",
        landmarks: ["University of Hamburg", "DESY Research Centre", "Hamburg-Eppendorf Medical Centre"],
        nearbyAreas: ["Altona", "Harburg", "Lübeck", "Kiel", "Bremen"],
      },
      {
        slug: "frankfurt",
        name: "Frankfurt",
        deliveryDays: "3-4",
        population: "760,000",
        description: "A major financial and logistics hub with growing biotech infrastructure",
        landmarks: ["Goethe University", "Frankfurt BioTech Alliance", "Max Planck Institute for Biophysics"],
        nearbyAreas: ["Wiesbaden", "Offenbach", "Darmstadt", "Mainz", "Hanau"],
      },
      {
        slug: "cologne",
        name: "Cologne",
        deliveryDays: "3-5",
        population: "1.1 million",
        description: "A vibrant city on the Rhine with strong academic and pharmaceutical research traditions",
        landmarks: ["University of Cologne", "Max Planck Institute for Biology of Ageing", "German Sport University"],
        nearbyAreas: ["Bonn", "Düsseldorf", "Leverkusen", "Aachen", "Bergisch Gladbach"],
      },
      {
        slug: "stuttgart",
        name: "Stuttgart",
        deliveryDays: "3-5",
        population: "630,000",
        description: "An innovation powerhouse in Baden-Württemberg with significant biotech investment",
        landmarks: ["University of Stuttgart", "Robert Bosch Hospital", "Fraunhofer IGB"],
        nearbyAreas: ["Esslingen", "Ludwigsburg", "Böblingen", "Reutlingen", "Tübingen"],
      },
    ],
  },

  /* ── France ──────────────────────────────────────────────────────── */
  {
    slug: "france",
    name: "France",
    code: "FR",
    deliveryDays: "3-5",
    description: "A global leader in pharmaceutical innovation with world-renowned research institutions.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "paris",
        name: "Paris",
        deliveryDays: "3-4",
        population: "2.2 million",
        description: "France's capital and a global centre for pharmaceutical research and biotech innovation",
        landmarks: ["Sorbonne University", "Institut Pasteur", "CNRS", "Inserm"],
        nearbyAreas: ["La Défense", "Versailles", "Boulogne-Billancourt", "Saint-Denis", "Neuilly-sur-Seine"],
      },
      {
        slug: "lyon",
        name: "Lyon",
        deliveryDays: "3-5",
        population: "520,000",
        description: "France's biotech capital, home to the Lyonbiopôle cluster and major research hospitals",
        landmarks: ["University of Lyon", "Lyonbiopôle", "Centre Léon Bérard"],
        nearbyAreas: ["Villeurbanne", "Vénissieux", "Saint-Étienne", "Vaulx-en-Velin", "Caluire"],
      },
      {
        slug: "marseille",
        name: "Marseille",
        deliveryDays: "4-5",
        population: "870,000",
        description: "France's second-largest city with a strong Mediterranean biomedical research community",
        landmarks: ["Aix-Marseille University", "IHU Méditerranée Infection", "CNRS Marseille"],
        nearbyAreas: ["Aix-en-Provence", "Aubagne", "Martigues", "La Ciotat", "Cassis"],
      },
      {
        slug: "toulouse",
        name: "Toulouse",
        deliveryDays: "4-5",
        population: "490,000",
        description: "A major scientific hub in southern France with strong aerospace and biomedical research",
        landmarks: ["University of Toulouse", "INSERM Toulouse", "Oncopole"],
        nearbyAreas: ["Blagnac", "Colomiers", "Tournefeuille", "Muret", "Balma"],
      },
      {
        slug: "nice",
        name: "Nice",
        deliveryDays: "4-5",
        population: "340,000",
        description: "A Côte d'Azur city with a growing tech and biomedical research sector",
        landmarks: ["Université Côte d'Azur", "CNRS Sophia Antipolis", "Institut de Pharmacologie Moléculaire"],
        nearbyAreas: ["Antibes", "Cannes", "Sophia Antipolis", "Grasse", "Monaco"],
      },
    ],
  },

  /* ── Spain ───────────────────────────────────────────────────────── */
  {
    slug: "spain",
    name: "Spain",
    code: "ES",
    deliveryDays: "3-5",
    description: "A rapidly growing biotech market with world-class research universities and innovation hubs.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "madrid",
        name: "Madrid",
        deliveryDays: "3-4",
        population: "3.3 million",
        description: "Spain's capital and the largest biomedical research hub on the Iberian Peninsula",
        landmarks: ["Complutense University", "CNIO", "CSIC", "Hospital La Paz"],
        nearbyAreas: ["Alcalá de Henares", "Getafe", "Leganés", "Alcorcón", "Móstoles"],
      },
      {
        slug: "barcelona",
        name: "Barcelona",
        deliveryDays: "3-4",
        population: "1.6 million",
        description: "A Mediterranean innovation hub with leading biotech parks and research centres",
        landmarks: ["Barcelona Biomedical Research Park", "ICREA", "IRB Barcelona", "Hospital Clínic"],
        nearbyAreas: ["L'Hospitalet", "Badalona", "Terrassa", "Sabadell", "Mataró"],
      },
      {
        slug: "valencia",
        name: "Valencia",
        deliveryDays: "3-5",
        population: "800,000",
        description: "Spain's third-largest city with a growing biotech and pharmaceutical sector",
        landmarks: ["University of Valencia", "CIPF", "La Fe University Hospital"],
        nearbyAreas: ["Alicante", "Castellón", "Torrent", "Paterna", "Sagunto"],
      },
      {
        slug: "seville",
        name: "Seville",
        deliveryDays: "4-5",
        population: "690,000",
        description: "Andalusia's capital with expanding university research and biomedical facilities",
        landmarks: ["University of Seville", "CABIMER", "Hospital Virgen del Rocío"],
        nearbyAreas: ["Dos Hermanas", "Alcalá de Guadaíra", "Jerez de la Frontera", "Córdoba", "Huelva"],
      },
      {
        slug: "bilbao",
        name: "Bilbao",
        deliveryDays: "3-5",
        population: "350,000",
        description: "The Basque Country's largest city with strong industrial biotech and research capacity",
        landmarks: ["University of the Basque Country", "CIC bioGUNE", "Bizkaia Science and Technology Park"],
        nearbyAreas: ["San Sebastián", "Vitoria-Gasteiz", "Barakaldo", "Getxo", "Portugalete"],
      },
    ],
  },

  /* ── Italy ───────────────────────────────────────────────────────── */
  {
    slug: "italy",
    name: "Italy",
    code: "IT",
    deliveryDays: "3-5",
    description: "A pharmaceutical powerhouse with centuries of scientific tradition and modern biotech centres.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "rome",
        name: "Rome",
        deliveryDays: "3-5",
        population: "2.8 million",
        description: "Italy's capital with major university hospitals and national research institutions",
        landmarks: ["Sapienza University", "Istituto Superiore di Sanità", "Policlinico Gemelli"],
        nearbyAreas: ["Fiumicino", "Tivoli", "Frascati", "Ostia", "Guidonia"],
      },
      {
        slug: "milan",
        name: "Milan",
        deliveryDays: "3-4",
        population: "1.4 million",
        description: "Italy's biotech and pharma capital, home to leading research hospitals and universities",
        landmarks: ["University of Milan", "San Raffaele Hospital", "Humanitas Research Hospital", "European Institute of Oncology"],
        nearbyAreas: ["Monza", "Bergamo", "Brescia", "Como", "Pavia"],
      },
      {
        slug: "naples",
        name: "Naples",
        deliveryDays: "4-5",
        population: "970,000",
        description: "Southern Italy's largest city with strong research ties to marine biology and biochemistry",
        landmarks: ["University of Naples Federico II", "Stazione Zoologica Anton Dohrn", "TIGEM"],
        nearbyAreas: ["Caserta", "Salerno", "Avellino", "Pozzuoli", "Torre del Greco"],
      },
      {
        slug: "turin",
        name: "Turin",
        deliveryDays: "3-5",
        population: "870,000",
        description: "A northern Italian city with significant pharmaceutical manufacturing and research",
        landmarks: ["University of Turin", "Politecnico di Torino", "IRCCS Candiolo"],
        nearbyAreas: ["Moncalieri", "Collegno", "Rivoli", "Chieri", "Asti"],
      },
      {
        slug: "florence",
        name: "Florence",
        deliveryDays: "3-5",
        population: "380,000",
        description: "A historic city with a growing pharmaceutical and biotech cluster in Tuscany",
        landmarks: ["University of Florence", "Meyer Children's Hospital", "Toscana Life Sciences"],
        nearbyAreas: ["Prato", "Pistoia", "Siena", "Arezzo", "Empoli"],
      },
    ],
  },

  /* ── Netherlands ─────────────────────────────────────────────────── */
  {
    slug: "netherlands",
    name: "Netherlands",
    code: "NL",
    deliveryDays: "3-4",
    description: "A dense biotech ecosystem with top-ranked universities and Europe's pharma logistics hub.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "amsterdam",
        name: "Amsterdam",
        deliveryDays: "3-4",
        population: "870,000",
        description: "The Netherlands' capital with world-renowned research universities and biotech companies",
        landmarks: ["University of Amsterdam", "VU Amsterdam", "Amsterdam UMC", "Netherlands Cancer Institute"],
        nearbyAreas: ["Haarlem", "Zaandam", "Amstelveen", "Diemen", "Hilversum"],
      },
      {
        slug: "rotterdam",
        name: "Rotterdam",
        deliveryDays: "3-4",
        population: "650,000",
        description: "A major port city with Europe's leading medical university and biotech hub",
        landmarks: ["Erasmus MC", "Erasmus University Rotterdam", "Rotterdam Science Tower"],
        nearbyAreas: ["Dordrecht", "Delft", "Schiedam", "Vlaardingen", "Capelle aan den IJssel"],
      },
      {
        slug: "the-hague",
        name: "The Hague",
        deliveryDays: "3-4",
        population: "550,000",
        description: "The Dutch seat of government with proximity to Leiden's biotech cluster",
        landmarks: ["Leiden University", "Leiden Bio Science Park", "HMC Westeinde"],
        nearbyAreas: ["Leiden", "Delft", "Zoetermeer", "Wassenaar", "Rijswijk"],
      },
      {
        slug: "utrecht",
        name: "Utrecht",
        deliveryDays: "3-4",
        population: "360,000",
        description: "A central Dutch city with one of Europe's largest life sciences campuses",
        landmarks: ["Utrecht University", "UMC Utrecht", "Utrecht Science Park"],
        nearbyAreas: ["Amersfoort", "Zeist", "Nieuwegein", "Houten", "Bunnik"],
      },
      {
        slug: "eindhoven",
        name: "Eindhoven",
        deliveryDays: "3-4",
        population: "240,000",
        description: "A technology hub in southern Netherlands driving health-tech and biomedical innovation",
        landmarks: ["Eindhoven University of Technology", "High Tech Campus", "Catharina Hospital"],
        nearbyAreas: ["Tilburg", "Helmond", "Veldhoven", "Best", "Son en Breugel"],
      },
    ],
  },

  /* ── Belgium ─────────────────────────────────────────────────────── */
  {
    slug: "belgium",
    name: "Belgium",
    code: "BE",
    deliveryDays: "3-4",
    description: "Home to Europe's densest biotech cluster and world-leading pharmaceutical companies.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "brussels",
        name: "Brussels",
        deliveryDays: "3-4",
        population: "1.2 million",
        description: "The EU capital and home to major pharma headquarters and research organisations",
        landmarks: ["Université Libre de Bruxelles", "KU Leuven Brussels", "Erasme Hospital"],
        nearbyAreas: ["Leuven", "Mechelen", "Waterloo", "Halle", "Vilvoorde"],
      },
      {
        slug: "antwerp",
        name: "Antwerp",
        deliveryDays: "3-4",
        population: "530,000",
        description: "Belgium's second city with major pharmaceutical manufacturing and research",
        landmarks: ["University of Antwerp", "Institute of Tropical Medicine", "Janssen Pharmaceutica"],
        nearbyAreas: ["Ghent", "Mechelen", "Turnhout", "Sint-Niklaas", "Lier"],
      },
      {
        slug: "ghent",
        name: "Ghent",
        deliveryDays: "3-4",
        population: "265,000",
        description: "A biotech stronghold in Flanders, home to VIB and world-class research facilities",
        landmarks: ["Ghent University", "VIB-UGent Centre", "Flanders Bio"],
        nearbyAreas: ["Bruges", "Antwerp", "Kortrijk", "Aalst", "Dendermonde"],
      },
    ],
  },

  /* ── Austria ─────────────────────────────────────────────────────── */
  {
    slug: "austria",
    name: "Austria",
    code: "AT",
    deliveryDays: "3-5",
    description: "A central European nation with excellent research infrastructure and biotech potential.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "vienna",
        name: "Vienna",
        deliveryDays: "3-4",
        population: "1.9 million",
        description: "Austria's capital and a European biotech hub with world-class medical universities",
        landmarks: ["Medical University of Vienna", "IMBA", "CeMM", "Vienna BioCenter"],
        nearbyAreas: ["Graz", "Linz", "Bratislava", "St. Pölten", "Baden"],
      },
      {
        slug: "graz",
        name: "Graz",
        deliveryDays: "4-5",
        population: "290,000",
        description: "Austria's second city with a growing life sciences and biotech sector",
        landmarks: ["Medical University of Graz", "University of Graz", "Graz Technology Park"],
        nearbyAreas: ["Leibnitz", "Voitsberg", "Gleisdorf", "Weiz", "Judenburg"],
      },
      {
        slug: "salzburg",
        name: "Salzburg",
        deliveryDays: "4-5",
        population: "155,000",
        description: "A picturesque city with strong academic research and connections to Munich's biotech scene",
        landmarks: ["University of Salzburg", "Paracelsus Medical University", "Salzburg University Hospital"],
        nearbyAreas: ["Innsbruck", "Linz", "Hallein", "Bad Ischl", "Berchtesgaden"],
      },
    ],
  },

  /* ── Portugal ────────────────────────────────────────────────────── */
  {
    slug: "portugal",
    name: "Portugal",
    code: "PT",
    deliveryDays: "4-6",
    description: "An emerging biotech market with growing research investment and modern university infrastructure.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "lisbon",
        name: "Lisbon",
        deliveryDays: "4-5",
        population: "550,000",
        description: "Portugal's capital with a vibrant health sciences sector and strong university research",
        landmarks: ["University of Lisbon", "Instituto Gulbenkian de Ciência", "iMM Lisboa"],
        nearbyAreas: ["Cascais", "Sintra", "Oeiras", "Almada", "Setúbal"],
      },
      {
        slug: "porto",
        name: "Porto",
        deliveryDays: "4-5",
        population: "230,000",
        description: "Portugal's second city with a strong biomedical research community and modern facilities",
        landmarks: ["University of Porto", "i3S", "IBMC"],
        nearbyAreas: ["Vila Nova de Gaia", "Matosinhos", "Braga", "Guimarães", "Aveiro"],
      },
    ],
  },

  /* ── Sweden ──────────────────────────────────────────────────────── */
  {
    slug: "sweden",
    name: "Sweden",
    code: "SE",
    deliveryDays: "4-6",
    description: "A Scandinavian leader in pharmaceutical innovation with strong public research funding.",
    currency: "SEK",
    currencySymbol: "kr",
    cities: [
      {
        slug: "stockholm",
        name: "Stockholm",
        deliveryDays: "4-5",
        population: "980,000",
        description: "Sweden's capital and home to the Karolinska Institute, one of the world's top medical universities",
        landmarks: ["Karolinska Institute", "KTH Royal Institute of Technology", "SciLifeLab"],
        nearbyAreas: ["Solna", "Sundbyberg", "Nacka", "Huddinge", "Sollentuna"],
      },
      {
        slug: "gothenburg",
        name: "Gothenburg",
        deliveryDays: "4-5",
        population: "590,000",
        description: "Sweden's second city and a key centre for pharmaceutical R&D and clinical research",
        landmarks: ["University of Gothenburg", "Sahlgrenska University Hospital", "AstraZeneca R&D"],
        nearbyAreas: ["Mölndal", "Kungsbacka", "Borås", "Kungälv", "Partille"],
      },
      {
        slug: "malmo",
        name: "Malmö",
        deliveryDays: "4-5",
        population: "350,000",
        description: "A dynamic city in southern Sweden connected to Copenhagen's Medicon Valley biotech cluster",
        landmarks: ["Lund University", "Medeon Science Park", "Malmö University"],
        nearbyAreas: ["Lund", "Helsingborg", "Trelleborg", "Landskrona", "Ystad"],
      },
    ],
  },

  /* ── Denmark ─────────────────────────────────────────────────────── */
  {
    slug: "denmark",
    name: "Denmark",
    code: "DK",
    deliveryDays: "4-5",
    description: "A global pharma powerhouse home to Novo Nordisk and leading peptide research institutions.",
    currency: "DKK",
    currencySymbol: "kr",
    cities: [
      {
        slug: "copenhagen",
        name: "Copenhagen",
        deliveryDays: "4-5",
        population: "800,000",
        description: "Denmark's capital and epicentre of Medicon Valley, one of Europe's strongest biotech clusters",
        landmarks: ["University of Copenhagen", "Novo Nordisk Foundation", "DTU", "Rigshospitalet"],
        nearbyAreas: ["Frederiksberg", "Roskilde", "Hillerød", "Helsingør", "Malmö"],
      },
      {
        slug: "aarhus",
        name: "Aarhus",
        deliveryDays: "4-5",
        population: "350,000",
        description: "Denmark's second-largest city with leading university research and biotech clusters",
        landmarks: ["Aarhus University", "Aarhus University Hospital", "INCUBA Science Park"],
        nearbyAreas: ["Randers", "Silkeborg", "Horsens", "Skanderborg", "Viborg"],
      },
    ],
  },

  /* ── Poland ──────────────────────────────────────────────────────── */
  {
    slug: "poland",
    name: "Poland",
    code: "PL",
    deliveryDays: "4-6",
    description: "Central Europe's fastest-growing biotech market with competitive research infrastructure.",
    currency: "PLN",
    currencySymbol: "zł",
    cities: [
      {
        slug: "warsaw",
        name: "Warsaw",
        deliveryDays: "4-5",
        population: "1.8 million",
        description: "Poland's capital and largest centre for pharmaceutical and biotech research",
        landmarks: ["University of Warsaw", "Medical University of Warsaw", "Polish Academy of Sciences"],
        nearbyAreas: ["Łódź", "Radom", "Piaseczno", "Pruszków", "Legionowo"],
      },
      {
        slug: "krakow",
        name: "Kraków",
        deliveryDays: "4-5",
        population: "780,000",
        description: "A historic university city with growing biotech investment and research capacity",
        landmarks: ["Jagiellonian University", "AGH University of Science and Technology", "Life Science Park"],
        nearbyAreas: ["Katowice", "Wieliczka", "Tarnów", "Nowy Sącz", "Zakopane"],
      },
      {
        slug: "wroclaw",
        name: "Wrocław",
        deliveryDays: "4-5",
        population: "640,000",
        description: "A vibrant university city in western Poland with a strong life sciences community",
        landmarks: ["Wrocław Medical University", "University of Wrocław", "Wrocław Technology Park"],
        nearbyAreas: ["Opole", "Legnica", "Wałbrzych", "Jelenia Góra", "Oleśnica"],
      },
    ],
  },

  /* ── Switzerland ─────────────────────────────────────────────────── */
  {
    slug: "switzerland",
    name: "Switzerland",
    code: "CH",
    deliveryDays: "4-6",
    description: "Home to global pharma giants and world-leading research universities in life sciences.",
    currency: "CHF",
    currencySymbol: "CHF",
    cities: [
      {
        slug: "zurich",
        name: "Zurich",
        deliveryDays: "4-5",
        population: "430,000",
        description: "Switzerland's largest city and home to ETH Zurich, a global leader in biomedical research",
        landmarks: ["ETH Zurich", "University of Zurich", "University Hospital Zurich"],
        nearbyAreas: ["Winterthur", "Baden", "Zug", "Uster", "Rapperswil"],
      },
      {
        slug: "basel",
        name: "Basel",
        deliveryDays: "4-5",
        population: "180,000",
        description: "The world capital of pharmaceutical research, headquarters of Roche and Novartis",
        landmarks: ["University of Basel", "Novartis Campus", "Roche Pharma", "Friedrich Miescher Institute"],
        nearbyAreas: ["Mulhouse", "Freiburg", "Liestal", "Lörrach", "Rheinfelden"],
      },
      {
        slug: "geneva",
        name: "Geneva",
        deliveryDays: "4-5",
        population: "200,000",
        description: "An international city with strong ties to global health organisations and biotech",
        landmarks: ["University of Geneva", "CERN", "WHO Headquarters", "Geneva University Hospitals"],
        nearbyAreas: ["Lausanne", "Nyon", "Annemasse", "Thonon-les-Bains", "Annecy"],
      },
    ],
  },

  /* ── Ireland ─────────────────────────────────────────────────────── */
  {
    slug: "ireland",
    name: "Ireland",
    code: "IE",
    deliveryDays: "3-5",
    description: "Europe's biopharma manufacturing hub with nine of the world's ten largest pharma companies.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "dublin",
        name: "Dublin",
        deliveryDays: "3-4",
        population: "1.4 million",
        description: "Ireland's capital and Europe's leading hub for pharmaceutical manufacturing and biotech",
        landmarks: ["Trinity College Dublin", "UCD", "RCSI", "National Institute for Bioprocessing"],
        nearbyAreas: ["Galway", "Cork", "Limerick", "Swords", "Dún Laoghaire"],
      },
      {
        slug: "cork",
        name: "Cork",
        deliveryDays: "3-5",
        population: "210,000",
        description: "Ireland's second city with major biopharma manufacturing sites and university research",
        landmarks: ["University College Cork", "Tyndall National Institute", "Cork University Hospital"],
        nearbyAreas: ["Limerick", "Waterford", "Killarney", "Cobh", "Kinsale"],
      },
      {
        slug: "galway",
        name: "Galway",
        deliveryDays: "3-5",
        population: "85,000",
        description: "A west coast city with a thriving medtech cluster and strong university research",
        landmarks: ["University of Galway", "Galway MedTech", "CÚRAM Centre for Medical Devices"],
        nearbyAreas: ["Athlone", "Ennis", "Tuam", "Loughrea", "Oranmore"],
      },
    ],
  },

  /* ── Greece ──────────────────────────────────────────────────────── */
  {
    slug: "greece",
    name: "Greece",
    code: "GR",
    deliveryDays: "5-7",
    description: "The birthplace of Western medicine with growing pharmaceutical research and manufacturing.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "athens",
        name: "Athens",
        deliveryDays: "5-6",
        population: "3.2 million",
        description: "Greece's capital and the country's main centre for pharmaceutical research and biotech",
        landmarks: ["National and Kapodistrian University of Athens", "BRFAA", "Evangelismos Hospital"],
        nearbyAreas: ["Thessaloniki", "Piraeus", "Glyfada", "Marousi", "Kifissia"],
      },
      {
        slug: "thessaloniki",
        name: "Thessaloniki",
        deliveryDays: "5-7",
        population: "1.1 million",
        description: "Greece's second city with strong university research and growing biotech investments",
        landmarks: ["Aristotle University of Thessaloniki", "Centre for Research and Technology Hellas"],
        nearbyAreas: ["Kavala", "Larissa", "Serres", "Katerini", "Veria"],
      },
    ],
  },

  /* ── Czech Republic ──────────────────────────────────────────────── */
  {
    slug: "czech-republic",
    name: "Czech Republic",
    code: "CZ",
    deliveryDays: "4-6",
    description: "A central European nation with competitive biotech research and strong university infrastructure.",
    currency: "CZK",
    currencySymbol: "Kč",
    cities: [
      {
        slug: "prague",
        name: "Prague",
        deliveryDays: "4-5",
        population: "1.3 million",
        description: "The Czech capital with historic universities and a modern biotech ecosystem",
        landmarks: ["Charles University", "Czech Academy of Sciences", "IOCB Prague"],
        nearbyAreas: ["Brno", "Plzeň", "Liberec", "Olomouc", "Karlovy Vary"],
      },
      {
        slug: "brno",
        name: "Brno",
        deliveryDays: "4-5",
        population: "380,000",
        description: "The Czech Republic's second city with strong life sciences and technology research",
        landmarks: ["Masaryk University", "CEITEC", "Brno University of Technology"],
        nearbyAreas: ["Olomouc", "Zlín", "Jihlava", "Znojmo", "Vyškov"],
      },
    ],
  },

  /* ── Finland ────────────────────────────────────────────────────── */
  {
    slug: "finland",
    name: "Finland",
    code: "FI",
    deliveryDays: "4-6",
    description: "A Nordic innovation leader with world-class universities and cutting-edge biomedical research.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "helsinki",
        name: "Helsinki",
        deliveryDays: "4-5",
        population: "660,000",
        description: "Finland's capital and a leading Nordic centre for biomedical research and health technology",
        landmarks: ["University of Helsinki", "Helsinki University Hospital", "Institute for Molecular Medicine Finland"],
        nearbyAreas: ["Espoo", "Vantaa", "Tampere", "Turku", "Porvoo"],
      },
      {
        slug: "tampere",
        name: "Tampere",
        deliveryDays: "4-6",
        population: "240,000",
        description: "Finland's second-largest inland city with strong biomedical engineering and research programmes",
        landmarks: ["Tampere University", "Tampere University Hospital", "BioMediTech"],
        nearbyAreas: ["Nokia", "Ylöjärvi", "Kangasala", "Lempäälä", "Pirkkala"],
      },
      {
        slug: "turku",
        name: "Turku",
        deliveryDays: "4-6",
        population: "195,000",
        description: "Finland's oldest city with a major pharmaceutical and life sciences cluster",
        landmarks: ["University of Turku", "Åbo Akademi University", "Turku BioValley"],
        nearbyAreas: ["Naantali", "Kaarina", "Raisio", "Lieto", "Salo"],
      },
    ],
  },

  /* ── Norway ─────────────────────────────────────────────────────── */
  {
    slug: "norway",
    name: "Norway",
    code: "NO",
    deliveryDays: "4-6",
    description: "A Scandinavian nation with strong public health investment and world-class biomedical research.",
    currency: "NOK",
    currencySymbol: "kr",
    cities: [
      {
        slug: "oslo",
        name: "Oslo",
        deliveryDays: "4-5",
        population: "700,000",
        description: "Norway's capital and the country's primary hub for pharmaceutical research and biotech",
        landmarks: ["University of Oslo", "Oslo University Hospital", "Norwegian Institute of Public Health"],
        nearbyAreas: ["Drammen", "Asker", "Bærum", "Lillestrøm", "Ski"],
      },
      {
        slug: "bergen",
        name: "Bergen",
        deliveryDays: "4-6",
        population: "285,000",
        description: "Norway's second city with strong university research in marine biology and biomedicine",
        landmarks: ["University of Bergen", "Haukeland University Hospital", "Bergen Teknologioverføring"],
        nearbyAreas: ["Askøy", "Os", "Sotra", "Stord", "Voss"],
      },
      {
        slug: "trondheim",
        name: "Trondheim",
        deliveryDays: "4-6",
        population: "210,000",
        description: "A major technology and research city, home to one of Scandinavia's top technical universities",
        landmarks: ["NTNU", "St. Olavs University Hospital", "SINTEF"],
        nearbyAreas: ["Stjørdal", "Malvik", "Melhus", "Steinkjer", "Levanger"],
      },
    ],
  },

  /* ── Hungary ────────────────────────────────────────────────────── */
  {
    slug: "hungary",
    name: "Hungary",
    code: "HU",
    deliveryDays: "5-7",
    description: "A central European nation with a strong pharmaceutical tradition and competitive research costs.",
    currency: "HUF",
    currencySymbol: "Ft",
    cities: [
      {
        slug: "budapest",
        name: "Budapest",
        deliveryDays: "5-6",
        population: "1.7 million",
        description: "Hungary's capital and the country's main centre for pharmaceutical R&D and university research",
        landmarks: ["Semmelweis University", "Hungarian Academy of Sciences", "Eötvös Loránd University"],
        nearbyAreas: ["Debrecen", "Szeged", "Győr", "Érd", "Budaörs"],
      },
      {
        slug: "debrecen",
        name: "Debrecen",
        deliveryDays: "5-7",
        population: "200,000",
        description: "Hungary's second-largest city with a major medical university and research hospital",
        landmarks: ["University of Debrecen", "Debrecen Medical Centre", "MTA Atomki"],
        nearbyAreas: ["Nyíregyháza", "Hajdúböszörmény", "Balmazújváros", "Berettyóújfalu", "Hajdúszoboszló"],
      },
    ],
  },

  /* ── Romania ────────────────────────────────────────────────────── */
  {
    slug: "romania",
    name: "Romania",
    code: "RO",
    deliveryDays: "5-7",
    description: "An emerging Eastern European market with growing pharmaceutical infrastructure and research talent.",
    currency: "RON",
    currencySymbol: "lei",
    cities: [
      {
        slug: "bucharest",
        name: "Bucharest",
        deliveryDays: "5-6",
        population: "1.8 million",
        description: "Romania's capital and the country's primary centre for medical research and pharmaceutical production",
        landmarks: ["University of Bucharest", "Carol Davila University of Medicine", "National Institute for Chemical-Pharmaceutical R&D"],
        nearbyAreas: ["Ploiești", "Pitești", "Giurgiu", "Brașov", "Târgoviște"],
      },
      {
        slug: "cluj-napoca",
        name: "Cluj-Napoca",
        deliveryDays: "5-7",
        population: "330,000",
        description: "Romania's second city and a major university hub with a vibrant tech and life sciences community",
        landmarks: ["Babeș-Bolyai University", "Iuliu Hațieganu University of Medicine", "Institute for Advanced Studies in Levant Culture"],
        nearbyAreas: ["Turda", "Dej", "Zalău", "Alba Iulia", "Bistrița"],
      },
      {
        slug: "timisoara",
        name: "Timișoara",
        deliveryDays: "5-7",
        population: "320,000",
        description: "A western Romanian city with strong ties to Central European research networks and modern biomedical facilities",
        landmarks: ["West University of Timișoara", "Victor Babeș University of Medicine", "OncoGen Centre"],
        nearbyAreas: ["Arad", "Reșița", "Lugoj", "Deva", "Oradea"],
      },
    ],
  },

  /* ── Croatia ────────────────────────────────────────────────────── */
  {
    slug: "croatia",
    name: "Croatia",
    code: "HR",
    deliveryDays: "5-7",
    description: "An EU member state with growing biotech investment and competitive academic research institutions.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "zagreb",
        name: "Zagreb",
        deliveryDays: "5-6",
        population: "810,000",
        description: "Croatia's capital and the main hub for pharmaceutical production and university research in the country",
        landmarks: ["University of Zagreb", "Ruđer Bošković Institute", "Zagreb University Hospital Centre"],
        nearbyAreas: ["Velika Gorica", "Samobor", "Zaprešić", "Sesvete", "Karlovac"],
      },
      {
        slug: "split",
        name: "Split",
        deliveryDays: "5-7",
        population: "180,000",
        description: "Croatia's second-largest city with a growing university research sector along the Adriatic coast",
        landmarks: ["University of Split", "Split University Hospital Centre", "Mediterranean Institute for Life Sciences"],
        nearbyAreas: ["Trogir", "Kaštela", "Solin", "Omiš", "Makarska"],
      },
      {
        slug: "rijeka",
        name: "Rijeka",
        deliveryDays: "5-7",
        population: "130,000",
        description: "A major Adriatic port city with a strong medical faculty and biomedical research tradition",
        landmarks: ["University of Rijeka", "Rijeka Clinical Hospital Centre", "Faculty of Medicine Rijeka"],
        nearbyAreas: ["Opatija", "Crikvenica", "Krk", "Kastav", "Delnice"],
      },
    ],
  },

  /* ── Bulgaria ───────────────────────────────────────────────────── */
  {
    slug: "bulgaria",
    name: "Bulgaria",
    code: "BG",
    deliveryDays: "5-7",
    description: "An EU member with a long pharmaceutical manufacturing tradition and competitive research costs.",
    currency: "BGN",
    currencySymbol: "лв",
    cities: [
      {
        slug: "sofia",
        name: "Sofia",
        deliveryDays: "5-6",
        population: "1.3 million",
        description: "Bulgaria's capital and the country's primary hub for pharmaceutical research and biotech development",
        landmarks: ["Sofia University", "Medical University of Sofia", "Bulgarian Academy of Sciences"],
        nearbyAreas: ["Pernik", "Blagoevgrad", "Kyustendil", "Samokov", "Botevgrad"],
      },
      {
        slug: "plovdiv",
        name: "Plovdiv",
        deliveryDays: "5-7",
        population: "350,000",
        description: "Bulgaria's second-largest city with a strong medical university and pharmaceutical industry",
        landmarks: ["Medical University of Plovdiv", "Plovdiv University", "Thracian University"],
        nearbyAreas: ["Stara Zagora", "Pazardzhik", "Asenovgrad", "Karlovo", "Haskovo"],
      },
    ],
  },

  /* ── Slovakia ───────────────────────────────────────────────────── */
  {
    slug: "slovakia",
    name: "Slovakia",
    code: "SK",
    deliveryDays: "4-6",
    description: "A central European eurozone member with growing biotech research and strong university programmes.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "bratislava",
        name: "Bratislava",
        deliveryDays: "4-5",
        population: "440,000",
        description: "Slovakia's capital with major medical universities and proximity to Vienna's biotech corridor",
        landmarks: ["Comenius University", "Slovak Academy of Sciences", "Slovak University of Technology"],
        nearbyAreas: ["Trnava", "Nitra", "Senec", "Pezinok", "Malacky"],
      },
      {
        slug: "kosice",
        name: "Košice",
        deliveryDays: "4-6",
        population: "240,000",
        description: "Slovakia's second city with a strong technical university and growing life sciences sector",
        landmarks: ["Pavol Jozef Šafárik University", "Technical University of Košice", "L. Pasteur University Hospital"],
        nearbyAreas: ["Prešov", "Michalovce", "Spišská Nová Ves", "Rožňava", "Trebišov"],
      },
    ],
  },

  /* ── Lithuania ──────────────────────────────────────────────────── */
  {
    slug: "lithuania",
    name: "Lithuania",
    code: "LT",
    deliveryDays: "4-6",
    description: "A Baltic state with a strong laser-technology sector and growing pharmaceutical and biotech research.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "vilnius",
        name: "Vilnius",
        deliveryDays: "4-5",
        population: "580,000",
        description: "Lithuania's capital and the Baltic region's rising hub for biotech startups and university research",
        landmarks: ["Vilnius University", "Lithuanian University of Health Sciences", "Life Sciences Centre"],
        nearbyAreas: ["Kaunas", "Trakai", "Elektrėnai", "Šalčininkai", "Ukmergė"],
      },
      {
        slug: "kaunas",
        name: "Kaunas",
        deliveryDays: "4-6",
        population: "310,000",
        description: "Lithuania's second city and home to the country's main medical university and pharmaceutical research",
        landmarks: ["Lithuanian University of Health Sciences", "Kaunas University of Technology", "Hospital of Lithuanian University of Health Sciences"],
        nearbyAreas: ["Vilnius", "Klaipėda", "Jonava", "Kėdainiai", "Marijampolė"],
      },
    ],
  },

  /* ── Latvia ─────────────────────────────────────────────────────── */
  {
    slug: "latvia",
    name: "Latvia",
    code: "LV",
    deliveryDays: "4-6",
    description: "A Baltic nation with a well-established pharmaceutical industry and competitive life sciences research.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "riga",
        name: "Riga",
        deliveryDays: "4-5",
        population: "615,000",
        description: "Latvia's capital and the largest city in the Baltics, with strong pharmaceutical manufacturing",
        landmarks: ["University of Latvia", "Riga Stradiņš University", "Latvian Institute of Organic Synthesis"],
        nearbyAreas: ["Jūrmala", "Jelgava", "Ogre", "Tukums", "Sigulda"],
      },
      {
        slug: "daugavpils",
        name: "Daugavpils",
        deliveryDays: "4-6",
        population: "80,000",
        description: "Latvia's second city with university research and proximity to Lithuanian and Belarusian markets",
        landmarks: ["Daugavpils University", "Daugavpils Regional Hospital", "Latgale Region Research Centre"],
        nearbyAreas: ["Rēzekne", "Jēkabpils", "Krāslava", "Preiļi", "Līvāni"],
      },
    ],
  },

  /* ── Estonia ────────────────────────────────────────────────────── */
  {
    slug: "estonia",
    name: "Estonia",
    code: "EE",
    deliveryDays: "4-6",
    description: "Europe's most digitally advanced nation with cutting-edge biotech research and e-health infrastructure.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "tallinn",
        name: "Tallinn",
        deliveryDays: "4-5",
        population: "450,000",
        description: "Estonia's capital and a European leader in digital health innovation and biotech research",
        landmarks: ["Tallinn University of Technology", "National Institute for Health Development", "Protobios"],
        nearbyAreas: ["Tartu", "Pärnu", "Haapsalu", "Keila", "Saue"],
      },
      {
        slug: "tartu",
        name: "Tartu",
        deliveryDays: "4-6",
        population: "100,000",
        description: "Estonia's intellectual capital and home to the country's oldest and most prestigious university",
        landmarks: ["University of Tartu", "Estonian Biocentre", "Tartu University Hospital"],
        nearbyAreas: ["Elva", "Põlva", "Valga", "Viljandi", "Jõgeva"],
      },
    ],
  },

  /* ── Slovenia ───────────────────────────────────────────────────── */
  {
    slug: "slovenia",
    name: "Slovenia",
    code: "SI",
    deliveryDays: "4-6",
    description: "A compact eurozone nation with a strong pharmaceutical sector led by Krka and Lek.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "ljubljana",
        name: "Ljubljana",
        deliveryDays: "4-5",
        population: "290,000",
        description: "Slovenia's capital and the country's primary centre for pharmaceutical and biomedical research",
        landmarks: ["University of Ljubljana", "National Institute of Chemistry", "Lek Pharmaceuticals"],
        nearbyAreas: ["Maribor", "Kranj", "Celje", "Kamnik", "Domžale"],
      },
      {
        slug: "maribor",
        name: "Maribor",
        deliveryDays: "4-6",
        population: "95,000",
        description: "Slovenia's second city with a growing university and technology research community",
        landmarks: ["University of Maribor", "Maribor University Medical Centre", "Štajerska Technology Park"],
        nearbyAreas: ["Ptuj", "Celje", "Murska Sobota", "Slovenj Gradec", "Velenje"],
      },
    ],
  },

  /* ── Luxembourg ─────────────────────────────────────────────────── */
  {
    slug: "luxembourg",
    name: "Luxembourg",
    code: "LU",
    deliveryDays: "3-4",
    description: "A small but affluent eurozone nation with growing life sciences research and EU institutional presence.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "luxembourg-city",
        name: "Luxembourg City",
        deliveryDays: "3-4",
        population: "130,000",
        description: "The capital and only major city, an emerging hub for biotech and health research in the Greater Region",
        landmarks: ["University of Luxembourg", "Luxembourg Institute of Health", "Luxembourg Centre for Systems Biomedicine"],
        nearbyAreas: ["Esch-sur-Alzette", "Differdange", "Dudelange", "Ettelbruck", "Trier"],
      },
    ],
  },

  /* ── Cyprus ─────────────────────────────────────────────────────── */
  {
    slug: "cyprus",
    name: "Cyprus",
    code: "CY",
    deliveryDays: "5-7",
    description: "An eastern Mediterranean island nation with growing university research and a modern healthcare system.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "nicosia",
        name: "Nicosia",
        deliveryDays: "5-6",
        population: "340,000",
        description: "Cyprus's capital and the main centre for biomedical research and pharmaceutical activity on the island",
        landmarks: ["University of Cyprus", "Cyprus Institute of Neurology and Genetics", "Nicosia General Hospital"],
        nearbyAreas: ["Limassol", "Larnaca", "Paphos", "Strovolos", "Lakatamia"],
      },
      {
        slug: "limassol",
        name: "Limassol",
        deliveryDays: "5-7",
        population: "240,000",
        description: "Cyprus's second city and a growing centre for health-tech and life sciences innovation",
        landmarks: ["Cyprus University of Technology", "Limassol General Hospital", "TEPAK Research Centre"],
        nearbyAreas: ["Nicosia", "Larnaca", "Paphos", "Kourion", "Amathus"],
      },
    ],
  },

  /* ── Malta ──────────────────────────────────────────────────────── */
  {
    slug: "malta",
    name: "Malta",
    code: "MT",
    deliveryDays: "5-7",
    description: "A Mediterranean island state with a strong pharmaceutical manufacturing base and EU regulatory framework.",
    currency: "EUR",
    currencySymbol: "€",
    cities: [
      {
        slug: "valletta",
        name: "Valletta",
        deliveryDays: "5-7",
        population: "6,000",
        description: "Malta's capital and the main administrative centre for pharmaceutical regulation and research on the island",
        landmarks: ["University of Malta", "Mater Dei Hospital", "Malta Life Sciences Park"],
        nearbyAreas: ["Sliema", "St. Julian's", "Birkirkara", "Qormi", "Msida"],
      },
    ],
  },

  /* ── Iceland ────────────────────────────────────────────────────── */
  {
    slug: "iceland",
    name: "Iceland",
    code: "IS",
    deliveryDays: "5-7",
    description: "A Nordic island nation renowned for genetic research and a unique biomedical data ecosystem.",
    currency: "ISK",
    currencySymbol: "kr",
    cities: [
      {
        slug: "reykjavik",
        name: "Reykjavik",
        deliveryDays: "5-7",
        population: "140,000",
        description: "Iceland's capital and home to world-leading genetic and biomedical research institutions",
        landmarks: ["University of Iceland", "deCODE Genetics", "Landspítali University Hospital"],
        nearbyAreas: ["Kópavogur", "Hafnarfjörður", "Akureyri", "Reykjanesbær", "Garðabær"],
      },
    ],
  },
];

/* ─── Lookup Helpers ──────────────────────────────────────────────── */

export function getCountryBySlug(slug: string): EuropeanCountry | undefined {
  return EUROPEAN_COUNTRIES.find((c) => c.slug === slug);
}

export function getEuropeanCityBySlug(
  countrySlug: string,
  citySlug: string
): { country: EuropeanCountry; city: EuropeanCity } | undefined {
  const country = getCountryBySlug(countrySlug);
  if (!country) return undefined;
  const city = country.cities.find((c) => c.slug === citySlug);
  if (!city) return undefined;
  return { country, city };
}
