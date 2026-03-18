import type { Dictionary } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nl = {
  meta: {
    title: "ORYN | Peptide Pen Systemen — Koop Peptiden Online",
    titleTemplate: "%s | ORYN Peptide Labs",
    description:
      "Koop farmaceutische peptide pennen online. BPC-157, NAD+, Tirzepatide, GHK-CU en meer in herbruikbare pensystemen. GMP-gecertificeerd, >99% zuiverheid, geproduceerd in Zuid-Korea. Vanaf €99. Gratis verzending.",
    ogDescription:
      "Precisie-gedoseerde peptide pensystemen. 10 onderzoekspeptiden vanaf €99. Herbruikbare pennen met vervangbare cartridges. GMP-gecertificeerd. >99% zuiverheid. Gratis verzending door heel Europa.",
  },

  header: {
    announcementText: "GRATIS VERZENDING BIJ BESTELLINGEN BOVEN €150",
    shopNow: "WINKELEN",
    myAccount: "Mijn Account",
    signIn: "Inloggen",
    searchPlaceholder: "Zoek peptiden...",
    noResults: "Geen resultaten voor",
    typeToSearch: "Typ om te zoeken...",
    viewAll: "BEKIJK ALLE PRODUCTEN",
  },

  nav: {
    products: "Producten",
    science: "Wetenschap",
    about: "Over Ons",
    contact: "Contact",
    compare: "Vergelijk",
    learn: "Kenniscentrum",
  },

  hero: {
    tagline: "PRECISIE PEPTIDE PENSYSTEMEN",
    brandDescriptor: "Onderzoekskwaliteit Peptide Pensystemen",
    subtitle: "Stop Veroudering. Versterk Welzijn. Verleng Levensduur.",
    description:
      "Farmaceutische peptiden in herbruikbare pensystemen met vervangbare cartridges. Klik-en-ga gemak, nauwkeurige dosering, 30 dagen voorraad. GMP-gecertificeerd. Geproduceerd in Zuid-Korea. Zuiverheid >99%.",
    explorePeptides: "ONTDEK PEPTIDEN",
    ourScience: "ONZE WETENSCHAP",
    purityLabel: "ZUIVERHEID",
    dosingLabel: "DOSERING",
    dosingValue: "30 Days",
    trustFreeShipping: "GRATIS VERZENDING",
    trustSecure: "VEILIG BETALEN",
    trustCOA: "COA INBEGREPEN",
    socialProofCount: "2.400+ bestellingen",
    socialProofLabel: "verzonden dit kwartaal",
    stats: {
      productsValue: "10",
      productsLabel: "Producten",
      purityValue: ">99%",
      purityLabel: "Zuiverheid",
      cleanroomValue: "ISO 7",
      cleanroomLabel: "Cleanroom",
      certifiedValue: "GMP",
      certifiedLabel: "Gecertificeerd",
    },
  },

  categories: {
    label: "PRODUCTLIJNEN",
    titleLine1: "Drie Systemen.",
    titleLine2: "Eén Standaard.",
    description:
      "Elk ORYN-product wordt vervaardigd in ISO Klasse 7 cleanrooms met GMP-certificering en onafhankelijke validatie.",
    from: "Vanaf",
    items: [
      {
        name: "Peptide Pen System",
        tagline: "30 Dagen Precisiedosering",
        description:
          "8 onderzoekspeptiden in herbruikbare multi-dose pennen. Farmaceutische formuleringen met digitaal doseerdisplay.",
      },
      {
        name: "MediT Pen",
        tagline: "Eenmaal Per Week Injectie",
        description:
          "Voorgevulde Tirzepatide 40mg pen. Dubbele GIP/GLP-1 werking voor metabool onderzoek.",
      },
      {
        name: "NovaDose System",
        tagline: "Dagelijkse NAD+ Microdosering",
        description:
          "Geavanceerd cartridge-gebaseerd NAD+ afgiftesysteem. Farmaceutische kwaliteit met bijna 100% biologische beschikbaarheid.",
      },
    ],
  },

  showcase: {
    label: "UITGELICHT",
    titleLine1: "Onderzoekskwaliteit",
    titleLine2: "Peptiden",
    subtitle: "Farmaceutische verbindingen vanaf €99. Herbruikbare pensystemen met 30 dagen precisiedosering.",
    viewAll: "BEKIJK ALLE PRODUCTEN",
    trustShipping: "GRATIS VERZENDING",
    trustPurity: "ZUIVERHEID >99%",
    trustCOA: "COA INBEGREPEN",
    trustReturn: "BATCH TRACEERBAAR",
  },

  science: {
    label: "ONS PROCES",
    titleLine1: "Ontwikkeld met",
    titleLine2: "Moleculaire Precisie",
    description:
      "Van grondstof inkoop tot eindsterilisatie — elke stap in het ORYN productieproces wordt beheerst door farmaceutische protocollen en gevalideerd door onafhankelijke laboratoria.",
    specs: {
      manufacturingLabel: "Productie",
      manufacturingValue: "Korea",
      capacityLabel: "Capaciteit",
      capacityValue: "100K/mnd",
      batchSizeLabel: "Batchgrootte",
      batchSizeValue: "20.000 st",
      leadTimeLabel: "Levertijd",
      leadTimeValue: "45-60 dagen",
    },
    steps: [
      {
        title: "Synthese",
        description:
          "Vaste-fase peptidesynthese met gepatenteerde zuiveringsprotocollen die >99% zuiverheid bereiken voor alle formuleringen.",
      },
      {
        title: "Formulering",
        description:
          "Farmaceutische waterige formuleringen met PEG viscositeitsmiddelen. pH-geoptimaliseerd (6.8-7.4) voor stabiliteit en biologische beschikbaarheid.",
      },
      {
        title: "Sterilisatie",
        description:
          "Volledige aseptische kamerproductie met 0.22um filtratie en gammastraling sterilisatie. ISO Klasse 7 cleanrooms.",
      },
      {
        title: "Validatie",
        description:
          "Onafhankelijke QA/QC door POSTECH, UNIST en SGS. Elke batch bevat een Analysecertificaat met volledige analytische gegevens.",
      },
    ],
  },

  howItWorks: {
    label: "HOE HET WERKT",
    titleLine1: "Eenvoudig.",
    titleLine2: "Effectief.",
    description: "Van het kiezen van uw peptide tot het zien van resultaten — ons pen-afgiftesysteem maakt onderzoek moeiteloos.",
    cta: "ONTDEK PEPTIDEN",
    steps: [
      {
        title: "Kies Uw Peptide",
        description: "Bekijk ons aanbod van >99% zuivere peptiden. Elke pen is voorgemengd en gebruiksklaar.",
      },
      {
        title: "Bestel Veilig",
        description: "Snelle checkout met Stripe. Gratis verzending bij bestellingen boven €150.",
      },
      {
        title: "Ontvang Discreet",
        description: "Neutrale verpakking, temperatuurgecontroleerde verzending. COA bij elke bestelling.",
      },
      {
        title: "Start Uw Onderzoek",
        description: "Instelbare dosering via precisie-pen. Geen mengen, geen flacons, geen verspilling.",
      },
    ],
  },

  quality: {
    label: "KWALITEITSBORGING",
    titleLine1: "Farmaceutische",
    titleLine2: "Standaarden",
    pillars: [
      {
        title: "ISO Klasse 7 Cleanroom",
        description:
          "Deeltjesvrije omgevingen die voldoen aan farmaceutische productienormen.",
      },
      {
        title: "GMP Gecertificeerd",
        description:
          "Consistente kwaliteit, juiste documentatie en traceerbare productie.",
      },
      {
        title: ">99% Zuiverheid",
        description:
          "HPLC-analyse en onafhankelijke validatie door POSTECH, UNIST en SGS.",
      },
      {
        title: "Batch Traceerbaarheid",
        description:
          "Volledige DMF-documentatie, stabiliteitsgegevens en COA voor elke batch.",
      },
      {
        title: "Gammastraling Sterilisatie",
        description:
          "Volledige steriliteit via gammabestraling na aseptische productie.",
      },
      {
        title: "Europese Normen",
        description:
          "Volledige naleving van Europese farmaceutische regelgevingskaders.",
      },
    ],
  },

  cta: {
    label: "START UW ONDERZOEK",
    titleLine1: "Klaar om uw",
    titleLine2: "peptide-onderzoek te versnellen?",
    description:
      "Ontdek onze volledige catalogus van onderzoekskwaliteit peptiden. Elk product wordt geleverd met Analysecertificaat en volledige batchdocumentatie.",
    browseProducts: "BEKIJK ALLE PRODUCTEN",
    contactTeam: "NEEM CONTACT OP",
    valueProp1: "GRATIS VERZENDING EU/UK",
    valueProp2: "COA BIJ ELKE BESTELLING",
    valueProp3: "GMP GECERTIFICEERD",
    badges: [
      { value: "ISO 7", label: "CLEANROOM" },
      { value: "GMP", label: "GECERTIFICEERD" },
      { value: ">99%", label: "ZUIVERHEID" },
      { value: "SGS", label: "GEVALIDEERD" },
    ],
  },

  footer: {
    description:
      "Precisie Peptide Wetenschap. Biotech laboratorium dat onderzoekskwaliteit peptide-oplossingen levert, ontworpen voor moleculaire precisie.",
    researchOnly: "UITSLUITEND VOOR ONDERZOEKSDOELEINDEN",
    newsletterTitle: "Blijf Op De Hoogte",
    newsletterDescription: "Ontvang het laatste nieuws over nieuwe peptiden, onderzoeksupdates en exclusieve aanbiedingen.",
    newsletterPlaceholder: "uw@email.com",
    newsletterButton: "ABONNEREN",
    newsletterSuccess: "Bedankt! U bent nu geabonneerd.",
    paymentMethods: "WIJ ACCEPTEREN",
    sections: {
      products: "Producten",
      company: "Bedrijf",
      legal: "Juridisch",
    },
    productLinks: {
      all: "Alle Producten",
      pens: "Peptide Pennen",
      medit: "MediT Pen",
      novadose: "NovaDose",
    },
    companyLinks: {
      about: "Over ORYN",
      science: "Wetenschap",
      contact: "Contact",
      quality: "Kwaliteit",
      whyOryn: "Waarom ORYN",
      researchHub: "Onderzoekscentrum",
      calculator: "Peptide Calculator",
    },
    trustBadges: {
      ssl: "SSL Versleuteld",
      secure: "Veilig Afrekenen",
      coa: "COA Inbegrepen",
      guarantee: "Zuiverheid Gegarandeerd",
    },
    legalLinks: {
      terms: "Algemene Voorwaarden",
      privacy: "Privacybeleid",
      disclaimer: "Onderzoeksdisclaimer",
    },
    seoSections: {
      researchAreas: "Onderzoeksgebieden",
      learn: "Kenniscentrum",
      ukDelivery: "UK Levering",
      ukRegions: "UK Regio's",
      ukCounties: "UK Graafschappen",
      peptideEncyclopedia: "Peptide Encyclopedie",
      resources: "Bronnen",
      londonDelivery: "Londen Levering",
      europeanDelivery: "Europese Levering",
      topEuCities: "Top EU Steden",
    },
    certifications: [
      { label: "ISO KLASSE 7", detail: "Cleanroom" },
      { label: "GMP", detail: "Gecertificeerd" },
      { label: ">99%", detail: "Zuiverheid" },
      { label: "EU", detail: "Geproduceerd" },
    ],
    copyright: "ORYN PEPTIDE LABS — ALLE RECHTEN VOORBEHOUDEN",
  },

  productCard: {
    purity: "ZUIVERHEID >99%",
    pharmaGrade: "FARMACEUTISCHE KWALITEIT",
    details: "DETAILS",
    addToCart: "IN WINKELWAGEN",
  },

  cart: {
    title: "UW BESTELLING",
    empty: "Uw winkelwagen is leeg",
    emptySubtext: "Begin met het toevoegen van onderzoekspeptiden aan uw winkelwagen.",
    browseProducts: "PRODUCTEN BEKIJKEN",
    continueShopping: "Verder Winkelen",
    subtotal: "Subtotaal",
    checkout: "VEILIG AFREKENEN",
    researchOnly: "Uitsluitend voor onderzoeksdoeleinden",
    itemLabel: "artikel",
    itemsLabel: "artikelen",
    freeShippingAway: "Nog {amount} voor GRATIS verzending",
    freeShippingUnlocked: "U heeft GRATIS verzending ontgrendeld!",
    youMightLike: "MISSCHIEN OOK INTERESSANT",
    trustSecure: "VEILIG BETALEN",
    trustDiscreet: "DISCRETE VERZENDING",
    trustCOA: "COA INBEGREPEN",
    orderSummary: "BESTELOVERZICHT",
    shipping: "Verzending",
    free: "GRATIS",
    atCheckout: "BIJ AFREKENEN",
    estimatedShippingFrom: "Vanaf",
    weAccept: "GEACCEPTEERDE BETAALMETHODEN",
    total: "Totaal",
    volumeDiscount: "Volumekorting",
    saveForLater: "Bewaar voor later",
    saved: "BEWAARD",
    save: "BEWAREN",
    havePromoCode: "Heb je een promotiecode?",
    cancel: "Annuleren",
  },

  productsPage: {
    label: "CATALOGUS",
    title: "Onderzoekspeptiden",
    description:
      "Ontdek ons volledige aanbod van precisie-ontworpen peptide-oplossingen. Elk product geproduceerd volgens farmaceutische normen met >99% zuiverheid.",
    all: "ALLE",
    results: "producten",
    searchPlaceholder: "Zoek peptiden...",
    sortBy: "SORTEER OP",
    sortPriceAsc: "PRIJS: LAAG NAAR HOOG",
    sortPriceDesc: "PRIJS: HOOG NAAR LAAG",
    sortName: "NAAM: A-Z",
    noResults: "Geen producten gevonden voor",
    noCategory: "Geen producten in deze categorie",
    clearFilters: "Filters wissen",
    disclaimer:
      "ALLE ORYN-PRODUCTEN ZIJN UITSLUITEND BESTEMD VOOR ONDERZOEK EN LABORATORIUMGEBRUIK. NIET VOOR MENSELIJKE CONSUMPTIE.",
  },

  productDetail: {
    notFound: "Product Niet Gevonden",
    backToProducts: "Terug naar Producten",
    home: "HOME",
    products: "PRODUCTEN",
    perUnit: "per stuk",
    addToCart: "IN WINKELWAGEN",
    adding: "TOEVOEGEN...",
    keyBenefits: "BELANGRIJKSTE VOORDELEN",
    specifications: "SPECIFICATIES",
    researchOnlyTitle: "Uitsluitend Voor Onderzoek",
    researchOnlyDescription:
      "Dit product is uitsluitend bestemd voor laboratorium- en onderzoeksdoeleinden. Niet voor menselijke consumptie.",
    relatedProducts: "Gerelateerde Producten",
    trustShipping: "GRATIS VERZENDING",
    trustPurity: "ZUIVERHEID >99%",
    trustCOA: "COA INBEGREPEN",
    secureCheckout: "VEILIG AFREKENEN",
    discreetShipping: "DISCRETE VERZENDING",
    inStock: "OP VOORRAAD",
    readyToShip: "Klaar om te verzenden",
    reviews: "beoordelingen",
    scienceTab: "Wetenschap",
    readyToExperience: "Klaar om te ervaren",
    premiumPenDescription: "Premium pen-afgiftesysteem met volledig instelbare dosering. GMP-geproduceerd, >99% zuiverheid gegarandeerd.",
    dosingProtocol: "DOSERINGSPROTOCOL",
    howToUse: "Hoe Uw ORYN Pen Te Gebruiken",
    quickReference: "BEKNOPT OVERZICHT",
    recommendedDose: "Aanbevolen Dosis",
    frequency: "Frequentie",
    duration: "Duur",
    proTips: "TIPS",
    stepByStep: "STAPSGEWIJZE INSTRUCTIES",
    importantLabel: "BELANGRIJK",
    safetyNote: "Gebruik altijd een nieuwe steriele naald bij elke toediening. Gooi gebruikte naalden weg in een geschikte naaldcontainer. Bewaar de pen gekoeld bij 2-8°C.",
    scienceLabel: "WETENSCHAP",
    scienceBehind: "De Wetenschap Achter",
    compoundProfile: "VERBINDINGSPROFIEL",
    classificationLabel: "CLASSIFICATIE",
    molecularFormula: "MOLECULAIRE FORMULE",
    molecularWeightLabel: "MOLECULAIR GEWICHT",
    halfLifeLabel: "HALFWAARDETIJD",
    sequenceLabel: "SEQUENTIE",
    researchAreasLabel: "ONDERZOEKSGEBIEDEN",
    mechanismOfAction: "WERKINGSMECHANISME",
    keyResearchFindings: "BELANGRIJKSTE ONDERZOEKSRESULTATEN",
    trustedByResearchers: "VERTROUWD DOOR ONDERZOEKERS",
    whatLabsSay: "Wat Laboratoria Zeggen Over",
    fromVerifiedReviews: "uit {count} geverifieerde beoordelingen",
    verifiedLabel: "GEVERIFIEERD",
    faqLabel: "FAQ",
    frequentlyAsked: "Veelgestelde Vragen Over",
    buyInYourCity: "KOOP {product} IN UW STAD",
    relatedResearch: "GERELATEERD ONDERZOEK",
    formulaLabel: "FORMULE",
    weightLabel: "GEWICHT",
    add: "TOEVOEGEN",
    closeCart: "Winkelwagen sluiten",
    decreaseQuantity: "Aantal verminderen",
    increaseQuantity: "Aantal verhogen",
    removeItem: "Artikel verwijderen",
    toggleWishlist: "Verlanglijst in-/uitschakelen",
    closeSearch: "Zoeken sluiten",
    closePopup: "Sluiten",
    purityBadge: ">99% ZUIVERHEID",
    gmpBadge: "GMP GECERTIFICEERD",
    freeShippingBadge: "GRATIS VERZENDING 150+",
    whyChoosePen: "WAAROM DE PEN KIEZEN",
    traditionalVials: "TRADITIONELE FLACONS",
    orynPenSystem: "ORYN PEN SYSTEEM",
    vialProblems: [
      { label: "Reconstitutie vereist", detail: "Bacteriostatisch water, spuit, nauwkeurig mengen" },
      { label: "Doseringsvariabiliteit", detail: "Spuitmarkeringen kunnen 10-20% afwijken" },
      { label: "Besmettingsrisico", detail: "Rubberen stop meerdere keren doorgeprikt" },
      { label: "Snelle degradatie", detail: "Potentie daalt na reconstitutie" },
      { label: "Complexe voorbereiding", detail: "5-10 minuten per bereiding" },
      { label: "Onpraktisch op reis", detail: "Flacons, spuiten, water, naalden..." },
    ],
    comparisonBar: [
      { vial: "5-10 min", pen: "30 sec", label: "Voorbereidingstijd" },
      { vial: "~80%", pen: ">99%", label: "Doseringsnauwkeurigheid" },
      { vial: "Afnemend", pen: "Behouden", label: "Steriliteit" },
      { vial: "7-14 dagen", pen: "30 dagen", label: "Stabiliteit" },
    ],
    compareWith: "VERGELIJKEN MET VERGELIJKBARE PRODUCTEN",
    sideBy: "Producten Vergelijken",
    vsLabel: "VERBERGEN",
    keyDifferences: "BELANGRIJKSTE VOORDELEN",
    bestFor: "voordelen",
    viewProduct: "TOEVOEGEN",
    comparisonDisclaimer: "PRIJS",
  },

  aboutPage: {
    tagline: "OVER ORYN",
    heroTitle1: "De Wetenschap Achter",
    heroTitle2: "de Precisie",
    heroDescription:
      "ORYN is een biotech laboratorium dat zich richt op het bevorderen van peptide-onderzoek door middel van farmaceutische productie, innovatieve afgiftesystemen en compromisloze kwaliteitsnormen.",
    brandStatement:
      "Wij geloven dat peptide-onderzoek dezelfde productiestandaarden verdient als",
    brandHighlight: "farmaceutische productie.",
    brandParagraphs: [
      "ORYN is ontstaan uit frustratie met de peptide-onderzoeksmarkt. Te veel verbindingen van onzekere zuiverheid, inconsistente dosering en ondoorzichtige toeleveringsketens. Wij besloten dat te veranderen.",
      "Onze productiepartners werken in ISO Klasse 7 cleanrooms met GMP-certificering. Elke formulering ondergaat HPLC-analyse en onafhankelijke validatie door derden. Wij bieden volledige batchdocumentatie omdat transparantie niet optioneel is — het is fundamenteel.",
      "Het resultaat: onderzoekskwaliteit peptiden waar wetenschappers en laboratoria op kunnen vertrouwen, geleverd in precisie-ontworpen systemen voor consistente, betrouwbare resultaten.",
    ],
    valuesLabel: "ONZE WAARDEN",
    valuesTitle: "Wat Ons Drijft",
    values: [
      {
        title: "Precisie",
        description:
          "Elke meting telt. Van synthese tot eindvulling beheersen wij variabelen op moleculair niveau.",
      },
      {
        title: "Zuiverheid",
        description:
          "99% is ons minimum. Onafhankelijk gevalideerd door POSTECH, UNIST en SGS voor absoluut vertrouwen.",
      },
      {
        title: "Innovatie",
        description:
          "Drie unieke afgifteplatformen ontworpen voor optimale stabiliteit, doseringsnauwkeurigheid en gebruikerservaring.",
      },
      {
        title: "Transparantie",
        description:
          "Volledige batchdocumentatie, COA bij elk product en volledige traceerbaarheid van de toeleveringsketen.",
      },
    ],
    journeyLabel: "ONZE REIS",
    journeyTitle: "Opbouwen",
    timeline: [
      {
        year: "Oprichting",
        title: "Precisie Vanaf Dag Eén",
        description:
          "ORYN is opgericht met één visie: farmaceutisch peptide-onderzoek naar Europese laboratoria brengen met compromisloze kwaliteitsnormen.",
      },
      {
        year: "Productie",
        title: "Koreaans Biotech Partnerschap",
        description:
          "Strategisch partnerschap met ISO Klasse 7 gecertificeerde productiefaciliteiten in Eumseong en Osan, Korea. 100.000 eenheden per maand capaciteit.",
      },
      {
        year: "Innovatie",
        title: "Geavanceerde Afgiftesystemen",
        description:
          "Ontwikkeling van drie gepatenteerde afgifteplatformen: de multi-dose Peptide Pen, de voorgevulde MediT Pen en het NovaDose cartridgesysteem.",
      },
      {
        year: "Vandaag",
        title: "10 Onderzoekspeptiden",
        description:
          "Volledige catalogus van onderzoekskwaliteit peptiden voor herstel, metabool, anti-veroudering en groeihormoononderzoek met wereldwijde distributie.",
      },
    ],
    manufacturingLabel: "PRODUCTIE",
    manufacturingTitle: "Productiespecificaties",
    manufacturingSpecs: [
      { value: "ISO 7", label: "Cleanroom Klasse", sub: "Gecertificeerd" },
      { value: "GMP", label: "Productie", sub: "Gecertificeerd" },
      { value: "100K", label: "Maandcapaciteit", sub: "Eenheden/Maand" },
      { value: "24mnd", label: "Houdbaarheid", sub: "Stabiliteit Getest" },
      { value: "0.22um", label: "Sterilisatie", sub: "Filtratie" },
      { value: "SGS", label: "Validatie", sub: "Derden" },
      { value: "6.8-7.4", label: "pH Bereik", sub: "Geoptimaliseerd" },
      { value: "PEG", label: "Viscositeit", sub: "Middel" },
    ],
  },

  sciencePage: {
    tagline: "WETENSCHAP",
    heroTitle1: "Peptide",
    heroTitle2: "Onderzoeksbibliotheek",
    heroDescription:
      "Inzicht in de moleculaire mechanismen achter elk ORYN-product. Deze bibliotheek biedt een wetenschappelijk overzicht van onze onderzoekspeptide-catalogus en hun onderzoeksgebieden.",
    processLabel: "PROCES",
    processTitle1: "Van Synthese tot",
    processTitle2: "Aflevering",
    processDescription:
      "Een farmaceutisch productieproces in zes stappen dat consistentie, zuiverheid en stabiliteit in elk product waarborgt.",
    processSteps: [
      { step: "01", label: "Grondstoffen", time: "2 Weken" },
      { step: "02", label: "Synthese", time: "8 Dagen" },
      { step: "03", label: "Zuivering", time: "HPLC" },
      { step: "04", label: "Formulering", time: "pH 6.8-7.4" },
      { step: "05", label: "Vullen & Sluiten", time: "2 Weken" },
      { step: "06", label: "Steriliseren & QC", time: "1 Week" },
    ],
    libraryLabel: "BIBLIOTHEEK",
    libraryTitle1: "Peptide Verbinding",
    libraryTitle2: "Profielen",
    classification: "CLASSIFICATIE",
    mechanism: "MECHANISME",
    researchAreas: "ONDERZOEKSGEBIEDEN",
    specsLabel: "SPECIFICATIES",
    specsTitle: "Universele Kwaliteitsparameters",
    specsItems: [
      { value: ">99%", label: "Zuiverheid (HPLC)" },
      { value: "6.8-7.4", label: "pH Bereik" },
      { value: "0.22um", label: "Steriele Filtratie" },
      { value: "3 mL", label: "Vulvolume" },
      { value: "PEG", label: "Viscositeitsmiddel" },
      { value: "30 Days", label: "Doseringsperiode" },
      { value: "24 mo", label: "Houdbaarheid" },
      { value: "2-8°C", label: "Bewaartemperatuur" },
    ],
  },

  contactPage: {
    tagline: "CONTACT",
    heroTitle: "Neem Contact Op",
    heroDescription:
      "Voor groothandelsaanvragen, onderzoekspartnerschappen of productvragen. Ons team reageert binnen 24 uur.",
    companyName: "ORYN Peptide Labs",
    emailLabel: "E-MAIL",
    wholesaleLabel: "GROOTHANDEL",
    locationLabel: "LOCATIE",
    locationLine1: "Europese Operaties",
    locationLine2: "Onderzoek & Distributie",
    infoBoxes: [
      {
        title: "Groothandelsbestellingen",
        description:
          "MOQ: 1.000 per SKU. Volledig OEM-branding beschikbaar. Betaling: 50% vooraf / 50% voor verzending. DDP-verzending mogelijk.",
      },
      {
        title: "Onderzoekspartnerschappen",
        description:
          "Wij ondersteunen academische en institutionele onderzoeksprogramma's met maatwerkformuleringen, volumeprijzen en prioriteitsproductie.",
      },
      {
        title: "Documentatie",
        description:
          "COA, stabiliteitsgegevens, DMF-documentatie en marketingmateriaal beschikbaar voor alle ORYN-producten op aanvraag.",
      },
    ],
    formTitle: "Stuur ons een bericht",
    formDescription:
      "Vul het formulier in en ons team neemt spoedig contact met u op.",
    firstName: "VOORNAAM",
    lastName: "ACHTERNAAM",
    email: "E-MAIL",
    organization: "ORGANISATIE",
    inquiryType: "TYPE AANVRAAG",
    inquiryOptions: [
      "Productaanvraag",
      "Groothandelsbestelling",
      "Onderzoekspartnerschap",
      "Maatwerk Formulering",
      "Documentatie Aanvraag",
      "Overig",
    ],
    message: "BERICHT",
    messagePlaceholder: "Vertel ons over uw onderzoeksbehoeften...",
    sendMessage: "BERICHT VERSTUREN",
    messageSent: "Bericht Verstuurd",
    messageSentDescription: "Wij reageren binnen 24 uur.",
  },

  checkoutPage: {
    emptyCart: "Uw winkelwagen is leeg",
    emptyCartDescription: "Voeg producten toe voordat u naar de kassa gaat.",
    browseProducts: "Producten Bekijken",
    steps: ["Gegevens", "Verzending", "Betaling"],
    shippingTitle: "Verzendinformatie",
    firstName: "VOORNAAM",
    lastName: "ACHTERNAAM",
    email: "E-MAIL",
    phone: "TELEFOON",
    address: "ADRES",
    city: "Stad",
    postalCode: "Postcode",
    country: "Land",
    referralCode: "VERWIJZINGSCODE",
    referralCodePlaceholder: "Voer verwijzingscode in",
    referralCodeHint: "Heeft u een verwijzingscode? Voer deze in voor tracking.",
    continueToPayment: "DOORGAAN NAAR BETALING",
    paymentTitle: "Betaling",
    cardPayment: "Kaartbetaling",
    cryptoPayment: "Crypto Betaling",
    cardNumber: "KAARTNUMMER",
    expiry: "VERVALDATUM",
    cvc: "CVC",
    selectCrypto: "SELECTEER CRYPTOCURRENCY",
    amountToPay: "TE BETALEN BEDRAG",
    discountApplied: "(5% korting toegepast)",
    sendToAddress: "VERSTUUR NAAR ADRES",
    copy: "KOPIËREN",
    copied: "GEKOPIEERD",
    timeRemaining: "RESTERENDE TIJD",
    sendBeforeExpiry: "Verstuur de betaling voordat de timer afloopt",
    sentPayment: "IK HEB DE BETALING VERSTUURD",
    txHash: "TRANSACTIE HASH",
    txHashPlaceholder: "Voer uw transactie hash in",
    sessionExpired: "BETALINGSSESSIE VERLOPEN",
    restartSession: "SESSIE HERSTARTEN",
    back: "Terug",
    placeOrder: "BESTELLING PLAATSEN",
    processing: "VERWERKEN...",
    orderSummary: "BESTELOVERZICHT",
    qty: "Aantal",
    subtotal: "Subtotaal",
    cryptoDiscount: "Crypto Korting (5%)",
    shipping: "Verzending",
    shippingNote: "BEREKEND IN VOLGENDE STAP",
    referral: "Verwijzing",
    total: "Totaal",
    researchOnly: "Uitsluitend voor onderzoeksdoeleinden",
    orderConfirmed: "Bestelling Bevestigd",
    orderConfirmedDescription:
      "Bedankt voor uw bestelling. Een bevestigingsmail is verstuurd met uw bestelgegevens en trackinginformatie.",
    paymentVerifying: "BETALING WORDT GEVERIFIEERD",
    paymentVerifyingDescription:
      "Uw crypto-betaling wordt bevestigd op de blockchain. Dit kan tot 30 minuten duren.",
    paymentConfirmed: "BETALING BEVESTIGD",
    referralApplied: "VERWIJZINGSCODE TOEGEPAST",
    continueShopping: "Verder Winkelen",
    secureCheckout: "VEILIG AFREKENEN",
    orderRef: "BESTELNR.",
    contactShipping: "Contact- en verzendinformatie",
    change: "Wijzigen",
    emailPlaceholder: "uw@email.com",
    shippingAddress: "VERZENDADRES",
    useSavedAddress: "OPGESLAGEN ADRES GEBRUIKEN",
    selectCountry: "Selecteer land...",
    firstNamePlaceholder: "Voornaam",
    lastNamePlaceholder: "Achternaam",
    addressPlaceholder: "Adres",
    apartmentPlaceholder: "Appartement, suite, etc. (optioneel)",
    cityPlaceholder: "Stad",
    postalCodePlaceholder: "Postcode",
    phonePlaceholder: "Telefoon (optioneel)",
    continueToShipping: "DOORGAAN NAAR VERZENDING",
    shippingMethod: "Verzendmethode",
    loadingShipping: "Verzendopties laden...",
    freeShippingApplied: "GRATIS VERZENDING TOEGEPAST!",
    freeShippingLabel: "GRATIS VERZENDING (BESTELLING +€{threshold})",
    freeStandardShipping: "Gratis standaard verzending",
    returnToInformation: "← Terug naar gegevens",
    returnToShipping: "← Terug naar verzending",
    contact: "CONTACT",
    shipTo: "VERZEND NAAR",
    method: "METHODE",
    free: "Gratis",
    required: "Verplicht",
    validEmailRequired: "Geldig e-mailadres vereist",
    invalidCode: "Ongeldige code",
    failedToValidate: "Validatie mislukt",
    hideOrderSummary: "Besteloverzicht verbergen",
    showOrderSummary: "Besteloverzicht tonen",
    discount: "Korting",
    volumeDiscountLabel: "Volumekorting",
    calculatedNextStep: "Berekend in volgende stap",
    selectCountryForShipping: "Selecteer land voor schatting",
    securePayment: "VEILIG BETALEN",
    discreetShipping: "DISCRETE VERZENDING",
    coaIncluded: "COA INBEGREPEN",
    gmpCertified: "GMP GECERTIFICEERD",
    allSecure: "ALLE TRANSACTIES ZIJN VEILIG EN VERSLEUTELD",
    backendRequired: "BACKEND VEREIST",
    backendDescription: "Medusa backend is vereist om betalingen te verwerken.",
    promoCodePlaceholder: "Kortingscode",
    apply: "TOEPASSEN",
    referralPlaceholder: "Verwijzingscode (optioneel)",
    sslEncrypted: "SSL Versleuteld",
    purity99: ">99% Zuiverheid",
    guaranteed: "Gegarandeerd",
    gmpCertifiedBadge: "GMP Gecertificeerd",
    guarantee30: "30 Dagen Garantie",
    noQuestions: "Geen vragen",
    emailHint: "Geen account nodig. Uw bestelling wordt gekoppeld aan dit e-mailadres.",
    verifyingPayment: "Betaling verifiëren...",
    paymentFailed: "Betaling Mislukt",
    paymentFailedDescription: "Uw betaling kon niet worden verwerkt. Probeer het opnieuw of gebruik een andere betaalmethode.",
    tryAgain: "Opnieuw Proberen",
    whatHappensNext: "WAT NU VOLGT",
    nextSteps: [
      "Bestelbevestiging per e-mail naar uw inbox verstuurd",
      "Uw bestelling wordt voorbereid & kwaliteitsgecontroleerd",
      "Verzonden met track & trace — meestal volgende werkdag",
    ],
    viewOrders: "BESTELLINGEN BEKIJKEN",
    referralTitle: "Deel ORYN & verdien 10% commissie",
    referralDescription: "Tevreden met onze producten? Deel uw verwijzingslink en verdien 10% op elke aankoop.",
    getReferralLink: "ONTVANG UW VERWIJZINGSLINK →",
  },

  products: {
    "bpc-157": {
      subtitle: "Herstel & Regeneratie",
      categoryLabel: "Peptide Pen",
      description:
        "Body Protection Compound-157 is een synthetisch peptide afgeleid van een natuurlijk voorkomend eiwit in maagsap. ORYN BPC-157 is geformuleerd op farmaceutisch niveau in een precisie-gedoseerd pensysteem voor consistente, betrouwbare toediening gedurende 30 dagen.",
      benefits: [
        "Ondersteunt weefselherstel en regeneratie",
        "Bevordert darmgezondheid en integriteit",
        "Ondersteunt pees- en ligamentherstel",
        "Ontstekingsremmende eigenschappen",
        "Neuroprotectief potentieel",
      ],
      badge: "Bestseller",
    },
    "tb-500": {
      subtitle: "Weefselherstel",
      categoryLabel: "Peptide Pen",
      description:
        "Thymosin Beta-4 fragment, TB-500, speelt een cruciale rol bij weefselherstel en regeneratie. ORYN TB-500 levert een nauwkeurige dosis van 15mg in ons geavanceerde pensysteem, ontworpen voor optimale biologische beschikbaarheid en consistente resultaten.",
      benefits: [
        "Versnelt wondgenezing",
        "Vermindert ontstekingen",
        "Bevordert spierweefselherstel",
        "Ondersteunt cardiovasculaire gezondheid",
        "Verbetert flexibiliteit en mobiliteit",
      ],
    },
    "cjc-1295": {
      subtitle: "GH Stimulatie",
      categoryLabel: "Peptide Pen",
      description:
        "CJC-1295 is een synthetisch analoog van groeihormoon-afgifte hormoon (GHRH). ORYN CJC-1295 biedt aanhoudende GH-verhoging via ons precisiedoseringssysteem, geproduceerd volgens de hoogste farmaceutische normen.",
      benefits: [
        "Stimuleert groeihormonafgifte",
        "Ondersteunt magere lichaamssamenstelling",
        "Bevordert diepe herstellende slaap",
        "Verbetert herstel tussen sessies",
        "Ondersteunt stofwisselingsfunctie",
      ],
    },
    ipamorelin: {
      subtitle: "GH Stimulatie",
      categoryLabel: "Peptide Pen",
      description:
        "Ipamorelin is een selectief groeihormoon secretagoog dat de hypofyse stimuleert. ORYN Ipamorelin biedt gerichte GH-afgifte zonder de bredere hormonale verstoring die bij minder selectieve verbindingen optreedt.",
      benefits: [
        "Selectieve GH-afgifte",
        "Minimaal bijwerkingenprofiel",
        "Ondersteunt botdichtheid",
        "Bevordert mager weefsel",
        "Verbetert slaapkwaliteit",
      ],
    },
    "tirzepatide-pen": {
      subtitle: "Metabool",
      categoryLabel: "Peptide Pen",
      description:
        "Tirzepatide is een dubbele GIP/GLP-1 receptor agonist die de voorhoede vertegenwoordigt van metabole peptide-wetenschap. Het ORYN Tirzepatide pensysteem levert precisiedosering voor metabool onderzoekstoepassingen.",
      benefits: [
        "Dubbele hormoonreceptor werking",
        "Ondersteunt stofwisselingsfunctie",
        "Bloedsuikerbeheer",
        "Eetlustregulatie",
        "Klinisch onderzochte verbinding",
      ],
      badge: "Populair",
    },
    "ghk-cu": {
      subtitle: "Huidherstel",
      categoryLabel: "Peptide Pen",
      description:
        "GHK-Cu (Koperpeptide) is een natuurlijk voorkomend tripeptide met een hoge affiniteit voor koperionen. ORYN GHK-CU ondersteunt huidherstel en -remodelleringsonderzoek met een krachtige 60mg formulering.",
      benefits: [
        "Bevordert collageensynthese",
        "Ondersteunt huidelasticiteit",
        "Antioxidant eigenschappen",
        "Ondersteuning bij wondgenezing",
        "Anti-veroudering onderzoekstoepassingen",
      ],
    },
    glutathione: {
      subtitle: "Antioxidant",
      categoryLabel: "Peptide Pen",
      description:
        "Glutathion is de belangrijkste antioxidant van het lichaam, essentieel voor cellulaire ontgifting en immuunfunctie. ORYN Glutathion levert een krachtige dosis van 6g via ons precisie-pensysteem voor maximale biologische beschikbaarheid.",
      benefits: [
        "Meester-antioxidant bescherming",
        "Cellulaire ontgifting",
        "Immuunsysteem ondersteuning",
        "Huidverheldering",
        "Leverfunctie ondersteuning",
      ],
    },
    "nad-plus": {
      subtitle: "Metabool & Anti-Veroudering",
      categoryLabel: "Peptide Pen",
      description:
        "Nicotinamide Adenine Dinucleotide (NAD+) is een essentieel co-enzym aanwezig in elke cel. De ORYN NAD+ pen levert een geconcentreerde dosis van 500mg ter ondersteuning van cellulaire energieproductie, DNA-reparatie en gezond ouder worden.",
      benefits: [
        "Cellulaire energieproductie",
        "DNA-reparatie ondersteuning",
        "Onderzoek naar gezond ouder worden",
        "Cognitieve functie ondersteuning",
        "Metabole efficiëntie",
      ],
      badge: "Premium",
    },
    "medit-tirzepatide": {
      subtitle: "Tirzepatide 40mg — Gewichtsbeheer",
      categoryLabel: "MediT Pen",
      description:
        "De ORYN MediT Pen is een voorgevulde, enkelvoudige injectiepen met 40mg Tirzepatide. Ontworpen voor wekelijkse toediening, combineert het dubbele GIP/GLP-1 hormoonwerking voor uitgebreide metabole ondersteuning.",
      benefits: [
        "Dubbele hormoonwerking (GIP + GLP-1)",
        "Eenmaal per week gemak",
        "Klinisch bewezen effectiviteit",
        "Eetlustbeheersing en verzadigingsverhoging",
        "Bloedsuikerbeheer",
        "Ondersteuning bij langdurig gewichtsbeheer",
        "Kan risico op obesitas-gerelateerde ziekten verminderen",
      ],
      badge: "Nieuw",
    },
    "novadose-nad": {
      subtitle: "Jeugd In Uw Handen",
      categoryLabel: "NovaDose System",
      description:
        "NovaDose levert farmaceutische NAD+ via een innovatief cartridge-gebaseerd pensysteem. Ontworpen voor nauwkeurige dagelijkse microdosering, ondersteunt het cellulaire energie, metabole efficiëntie en natuurlijk herstel. Betaalbaarder en duurzamer dan IV-therapie.",
      benefits: [
        "Farmaceutische NAD+ uit Korea",
        "Nauwkeurige dagelijkse microdosering",
        "Bijna 100% biologische beschikbaarheid",
        "Ondersteunt cellulaire energie en helderheid",
        "Verbetert stemming en fysieke prestaties",
        "Kosteneffectiever dan IV-therapie",
        "GMP-gecertificeerde productie",
      ],
      badge: "Innovatie",
    },
  },

  categoryNames: {
    "peptide-pen": "Peptide Pen System",
    "medit-pen": "MediT Pen",
    novadose: "NovaDose System",
  },

  categoryDescriptions: {
    "peptide-pen":
      "Herbruikbare multi-dose pennen met 30 dagen precisiedosering. 8 onderzoekspeptiden beschikbaar.",
    "medit-pen":
      "Voorgevulde enkelvoudige wekelijkse injectiepen. Tirzepatide 40mg voor metabool onderzoek.",
    novadose:
      "Geavanceerd NAD+ cartridge-afgiftesysteem voor dagelijkse precisie-microdosering.",
  },

  researchCategories: {
    recovery: "Herstel en Genezing",
    "weight-loss": "Gewichtsverlies",
    "anti-aging": "Anti-Veroudering",
    "muscle-growth": "Spiergroei",
    "skin-rejuvenation": "Huidverjonging",
    "sleep-quality": "Slaap en Herstel",
    "gut-health": "Darmgezondheid",
    "joint-health": "Gewrichten en Pezen",
    "hair-growth": "Haargroei",
    "immune-support": "Immuunondersteuning",
    "tendon-repair": "Peesherstel",
    "sports-recovery": "Sportherstel",
    "post-surgery": "Na de Operatie",
    "cognitive-enhancement": "Cognitieve Verbetering",
    "energy-vitality": "Energie en Vitaliteit",
    "detox-cleanse": "Detox en Reiniging",
    "body-composition": "Lichaamssamenstelling",
    inflammation: "Ontsteking en Pijn",
    "hormonal-balance": "Hormonaal Evenwicht",
    "longevity-biohacking": "Levensduur en Biohacking",
  },

  breadcrumbs: {
    home: "Home",
    products: "Producten",
    about: "Over Ons",
    science: "Wetenschap",
    contact: "Contact",
    learn: "Leren",
    quality: "Kwaliteit",
    faq: "FAQ",
    compare: "Vergelijken",
    shipping: "Verzending",
    whyOryn: "Waarom ORYN",
    terms: "Voorwaarden",
    privacy: "Privacy",
    disclaimer: "Disclaimer",
    cart: "Winkelwagen",
    checkout: "Afrekenen",
    account: "Account",
    orders: "Bestellingen",
    referrals: "Verwijzingen",
    wishlist: "Verlanglijst",
    profile: "Profiel",
    wholesale: "Groothandel",
    bundles: "Bundels",
    protocols: "Protocollen",
    peptides: "Peptiden",
    peptidePens: "Peptide Pennen",
    europe: "Europa",
    glossary: "Woordenlijst",
    london: "Londen",
    encyclopedia: "Encyclopedie",
    ukPeptideDelivery: "VK Peptide Levering",
    tools: "Tools",
    peptideCalculator: "Peptide Calculator",
  },

  homeSeo: {
    deliveryTitle: "PEPTIDE LEVERING IN HEEL EUROPA",
    researchAreaTitle: "PEPTIDEN PER ONDERZOEKSGEBIED",
    researchHubTitle: "ONDERZOEKSCENTRUM",
    peptidesFor: "Peptiden voor",
  },

  testimonials: {
    label: "VERTROUWD DOOR ONDERZOEKERS",
    titleLine1: "Wat Onze",
    titleLine2: "Klanten Zeggen",
    items: [
      {
        quote: "De zuiverheid en consistentie van ORYN peptiden zijn ongeëvenaard. Het pen-afgiftesysteem maakt de dosering ongelooflijk nauwkeurig en betrouwbaar voor onze laboratoriumprotocollen.",
        name: "Dr. M. Richter",
        role: "Onderzoeksdirecteur, München",
      },
      {
        quote: "Wij zijn zes maanden geleden overgestapt op ORYN. De COA-documentatie, batchtraceerbaarheid en GMP-certificering geven ons volledig vertrouwen in elke bestelling.",
        name: "Dr. S. Lindberg",
        role: "Klinisch Onderzoeker, Stockholm",
      },
      {
        quote: "Uitstekende productkwaliteit en snelle EU-verzending. Het NovaDose systeem is een doorbraak voor ons NAD+ onderzoek. Sterk aanbevolen voor elk serieus laboratorium.",
        name: "Prof. J. Torres",
        role: "Biotech Lab Directeur, Barcelona",
      },
    ],
    stats: [
      { value: "2.400+", label: "BESTELLINGEN VERZONDEN" },
      { value: "98%", label: "HERBESTELTARIEF" },
      { value: "4.9/5", label: "TEVREDENHEID" },
      { value: "24u", label: "REACTIETIJD" },
    ],
  },

  localeSwitcher: {
    label: "Markt",
    uk: "UK (€)",
    eu: "EU (€)",
  },

  wishlistPage: {
    title: "Verlanglijst",
    breadcrumb: "VERLANGLIJST",
    empty: "Uw verlanglijst is leeg",
    emptyTitle: "Nog geen opgeslagen artikelen",
    emptyDescription: "Bekijk onze producten en klik op het hartje om artikelen op te slaan.",
    browseProducts: "PRODUCTEN BEKIJKEN",
    itemsSaved: "artikelen opgeslagen",
    itemSaved: "artikel opgeslagen",
  },

  faq: {
    title: "Veelgestelde Vragen",
    label: "FAQ",
  },

  contactFaq: {
    title: "VOORDAT U CONTACT OPNEEMT",
    items: [
      { q: "Hoe lang duurt de levering?", a: "UK-bestellingen: 2-4 werkdagen. Europa: 3-7 werkdagen. Alle bestellingen worden verzonden in discrete, temperatuurgecontroleerde verpakking." },
      { q: "Kan ik mijn bestelling volgen?", a: "Ja! Na verzending ontvangt u een trackingnummer per e-mail. U kunt bestellingen ook volgen in uw accountdashboard." },
      { q: "Wat is uw retourbeleid?", a: "Wij bieden een 30 dagen geld-terug-garantie op ongeopende producten. Neem contact met ons op via info@orynlabs.com om een retour te starten." },
      { q: "Biedt u groothandelsprijzen?", a: "Ja, neem contact op via wholesale@orynlabs.com voor volumeprijzen. Wij bieden gestaffelde kortingen voor onderzoeksinstellingen en wederverkopers." },
    ],
  },

  homeFaq: {
    items: [
      { q: "Wat zijn ORYN Peptide Pennen?", a: "ORYN Peptide Pennen zijn voorgemengde, gebruiksklare peptide-afgiftesystemen voor onderzoek. Elke pen bevat farmaceutische peptiden met >99% zuiverheid, geproduceerd in onze ISO 7 cleanroom faciliteit. Het penformaat elimineert de noodzaak voor reconstitutie en zorgt voor consistente dosering bij onderzoekstoepassingen." },
      { q: "Zijn peptiden legaal in Nederland en Europa?", a: "Ja, onderzoekspeptiden zijn legaal te kopen in Nederland en heel Europa voor onderzoeksdoeleinden. ORYN Peptiden worden uitsluitend verkocht voor in-vitro onderzoek en laboratoriumgebruik. Ze zijn niet bedoeld voor menselijke consumptie." },
      { q: "Hoe worden uw peptiden geproduceerd?", a: "Alle ORYN peptiden worden gesynthetiseerd in ons GMP-gecertificeerd, ISO 7 cleanroom laboratorium in Zuid-Korea. Elke batch ondergaat strenge HPLC- en massaspectrometrie-testen om >99% zuiverheid te verifiëren. Een Analysecertificaat (COA) wordt bij elke bestelling meegeleverd." },
      { q: "Hoe lang duurt de levering?", a: "UK-bestellingen komen doorgaans binnen 2-4 werkdagen aan. Europese bestellingen duren 3-7 werkdagen afhankelijk van de bestemming. Alle bestellingen worden verzonden in discrete, temperatuurgecontroleerde verpakking. Bestellingen boven €150 komen in aanmerking voor gratis verzending." },
      { q: "Wat is het ORYN Verwijzingsprogramma?", a: "Ons meerlagen-verwijzingsprogramma laat u 10% commissie verdienen op aankopen van collega's die u doorverwijst. U verdient ook commissies tot 5 niveaus diep naarmate uw netwerk groeit. Maak een gratis account aan om uw unieke verwijzingscode te ontvangen." },
      { q: "Biedt u volume- of groothandelsprijzen?", a: "Ja, wij bieden volumekortingen vanaf 3+ stuks. Hoe meer u bestelt, hoe groter de korting — tot 15% voor grote onderzoeksbestellingen. Neem contact met ons op voor maatwerk groothandelsprijzen bij bulkbestellingen." },
    ],
  },

  shippingFaq: {
    items: [
      { q: "Hoe lang duurt de levering van peptiden in Nederland?", a: "De levertijden in Nederland zijn afhankelijk van uw locatie. Amsterdam, Rotterdam en Den Haag ontvangen bestellingen in 1-2 werkdagen, andere grote steden in 2-3 werkdagen en rurale gebieden in 3-4 werkdagen. Alle bestellingen geplaatst voor 14:00 uur worden dezelfde dag verzonden." },
      { q: "Is de peptidenverzending temperatuurgecontroleerd?", a: "Ja. Alle ORYN peptidenzendingen worden verpakt in geïsoleerde dozen met gelkoelpacks om een temperatuurbereik van 2-8 graden Celsius te handhaven tijdens het transport. Tijdens de zomermaanden (juni-september) voegen wij extra koelkettenbescherming toe met extra koelpacks en isolerende voering om de productintegriteit te waarborgen." },
      { q: "Hoe kom ik in aanmerking voor gratis verzending?", a: "Gratis standaardverzending is beschikbaar voor alle bestellingen boven 150 euro. Deze drempel geldt voor het subtotaal van de bestelling vóór eventuele kortingscodes. Internationale bestellingen naar Europa zijn onderhevig aan een vaste verzendkosten ongeacht de bestelwaarde. Uw winkelwagen toont een voortgangsbalk die aangeeft hoe dicht u bij de gratis verzenddrempel bent." },
      { q: "Verzendt u peptiden internationaal naar Europa?", a: "Ja, ORYN verzendt naar de meeste landen van de Europese Unie. Europese levering duurt doorgaans 3-7 werkdagen afhankelijk van het bestemmingsland. Alle internationale zendingen bevatten temperatuurgecontroleerde verpakkingen en volledige tracking. Douanerechten en invoerbelastingen zijn de verantwoordelijkheid van de klant." },
      { q: "Hoe wordt mijn peptidbestelling verpakt?", a: "Alle ORYN-bestellingen worden verzonden in onopvallende, ongemarkeerde dozen zonder productbeschrijvingen of merken zichtbaar aan de buitenkant. Binnenin zijn de peptidepennen vastgezet in op maat gemaakte schuimstofinserts in een geïsoleerde container met gelkoelpacks. Een pakbon en Analysecertificaat zijn inbegrepen in de doos." },
      { q: "Kan ik mijn peptidbestelling volgen?", a: "Ja. Alle bestellingen ontvangen binnen 2 uur na verzending een trackingnummer per e-mail. U kunt uw zending in real-time volgen via het portaal van onze koerierpartner. Voor groothandelsbestellingen van 10+ eenheden bieden wij uitgebreide tracking met geschatte levervensters en leverbevestiging met handtekening." },
    ],
  },

  qualityFaq: {
    items: [
      { q: "Wat is een Analysecertificaat (COA)?", a: "Een Analysecertificaat is een document afgegeven door een gekwalificeerd testlaboratorium dat de identiteit, zuiverheid en samenstelling van een peptideproduct bevestigt. Elk ORYN COA omvat HPLC-zuiverheidsgegevens, identiteitsbevestiging via massaspectrometrie, endotoxinetestresultaten, steriliteitsverificatie en batchspecifieke productiedetails." },
      { q: "Hoe lees ik een HPLC-zuiverheidsresultaat?", a: "HPLC-resultaten (High-Performance vloeistofchromatografie) tonen een chromatogram met pieken die verschillende componenten vertegenwoordigen. Het percentage van het hoofdpiekoppervlak geeft de zuiverheid aan — bijvoorbeeld betekent 99,2% dat 99,2% van het gedetecteerde materiaal het doelpeptide is. Alle ORYN-peptiden bereiken consequent meer dan 98% zuiverheid, met de meeste batches die 99% overschrijden." },
      { q: "Wie voert uw tests door derden uit?", a: "ORYN-peptiden worden getest door onafhankelijke, ISO 17025-geaccrediteerde analytische laboratoria. Deze laboratoria opereren onafhankelijk van onze productiefaciliteiten en zorgen voor onbevooroordeelde verificatie van zuiverheid, identiteit en steriliteit voor elke batch die wij produceren." },
      { q: "Hoe vaak worden ORYN-peptiden getest?", a: "Elke batch van elk ORYN-product wordt getest vóór vrijgave. Wij hanteren een strikt batchvrijgaveprotocol: geen enkel product verlaat onze faciliteit zonder een geslaagd Analysecertificaat van een onafhankelijk laboratorium. Testen omvatten HPLC-zuiverheidsanalyse, identiteitsbevestiging via massaspectrometrie, endotoxinescreening en steriliteitsverificatie." },
      { q: "Aan welke zuiverheidsnormen voldoen ORYN-peptiden?", a: "Alle ORYN-peptiden worden vervaardigd om 98% zuiverheid te overschrijden, waarbij de meeste batches meer dan 99% bereiken. Dit wordt geverifieerd door onafhankelijke HPLC-tests en bevestigd via massaspectrometrie. Onze productiefaciliteiten zijn GMP-gecertificeerd en werken onder ISO 9001-kwaliteitsmanagementsystemen in ISO 7-cleanroom-omgevingen." },
      { q: "Kan ik een COA aanvragen voor mijn specifieke batch?", a: "Ja. Elk ORYN-product wordt geleverd met een batchnummer op de verpakking. U kunt het specifieke COA voor uw batch aanvragen door contact op te nemen met ons supportteam via info@orynpeptides.com met uw batchnummer. Wij bewaren volledige traceerbaarheidsdossiers voor elke geproduceerde batch." },
    ],
  },

  wholesaleFaq: {
    items: [
      { q: "Wat is de minimale bestelhoeveelheid voor groothandelsprijzen?", a: "Onze groothandelsprijsniveaus beginnen bij slechts 3 eenheden. Bestellingen van 3-5 eenheden ontvangen 5% korting, 6-9 eenheden ontvangen 10% korting, en 10 of meer eenheden ontvangen 15% korting op de verkoopprijs. Voor bestellingen van 50+ eenheden bieden wij op maat gemaakte offertes aan." },
      { q: "Hoe werken groothandelsprijzen bij ORYN?", a: "ORYN-groothandelsprijzen zijn gebaseerd op volumekortingsniveaus toegepast op onze standaard verkoopprijzen. Kortingen worden automatisch berekend bij het afrekenen voor kwalificerende bestellingen. U kunt producten combineren uit onze Peptide Pen-, MediT Pen- en NovaDose-assortimenten om uw niveau te bereiken. Voor doorlopende leveringsovereenkomsten neemt u contact op met ons groothandelsteam." },
      { q: "Hoe stel ik een groothandelsaccount in?", a: "Een groothandelsaccount instellen is eenvoudig. Neem contact op met ons team via info@orynpeptides.com of gebruik het groothandelsinformatieformulier op onze contactpagina. Wij verifiëren uw organisatiegegevens, wijzen een toegewijde accountmanager toe en activeren volumeprijzen op uw account binnen 1-2 werkdagen." },
      { q: "Welke betalingsvoorwaarden zijn beschikbaar voor groothandelsklanten?", a: "Standaard groothandelsbestellingen zijn betaalbaar per bankoverschrijving, creditcard of inkooporder (voor goedgekeurde accounts). Wij bieden NET-30-betalingsvoorwaarden voor gevestigde groothandelsklanten met een geverifieerde handelsgeschiedenis. Alle eerste bestellingen zijn vooruitbetaald. Neem contact op met ons team om betalingsregelingen te bespreken voor grootvolume contracten." },
      { q: "Wat zijn de levertijden voor bulkbestellingen van peptiden?", a: "Groothandelsbestellingen worden binnen 1-2 werkdagen verzonden vanuit ons distributiecentrum. Standaard levering duurt 2-4 werkdagen. Voor grote bestellingen (50+ eenheden) kunnen wij tot 5 werkdagen nodig hebben voor voorbereiding. Alle groothandelszendingen bevatten temperatuurgecontroleerde verpakking zonder extra kosten, met volledige tracking." },
    ],
  },

  account: {
    nav: {
      dashboard: "Dashboard",
      orders: "Bestellingen",
      referrals: "Verwijzingen",
      wishlist: "Verlanglijst",
      profile: "Profiel",
      signOut: "Uitloggen",
    },
    dashboard: {
      welcome: "Welkom terug,",
      subtitle: "Beheer uw bestellingen, volg zendingen en werk uw accountgegevens bij.",
      yourOrders: "Uw Bestellingen",
      yourOrdersDesc: "Bekijk bestelgeschiedenis en volg zendingen",
      profileSettings: "Profielinstellingen",
      profileSettingsDesc: "Werk uw persoonlijke gegevens bij",
      shopPeptides: "Peptiden Kopen",
      shopPeptidesDesc: "Bekijk onze onderzoekscatalogus",
      orynRewards: "ORYN Beloningen",
      earnPoints: "Verdien 1 punt per €1 besteed",
      points: "PUNTEN",
      tier: "NIVEAU",
      member: "Lid",
      nextReward: "VOLGENDE BELONING",
      nextRewardValue: "€10 korting bij 500 punten",
      multiplier: "VERMENIGVULDIGER",
      multiplierValue: "1x",
      inviteEarn: "Nodig Uit & Verdien",
      viewDashboard: "DASHBOARD BEKIJKEN",
      inviteDescription: "Verdien 10% commissie wanneer collega's bestellen met uw code. Plus commissies tot 5 niveaus diep.",
      copyCode: "CODE KOPIËREN",
      copyLink: "LINK KOPIËREN",
      share: "DEEL:",
      accountBenefits: "ACCOUNTVOORDELEN",
      benefits: [
        { title: "Bestelling Volgen", desc: "Realtime updates over al uw zendingen" },
        { title: "Bestelgeschiedenis", desc: "Volledige geschiedenis met herbestelmogelijkheid" },
        { title: "Verwijzingsinkomsten", desc: "Verdien commissies op verwijzingen" },
        { title: "Prioriteit Support", desc: "Accounthouders krijgen sneller antwoord" },
      ],
    },
    login: {
      title: "Welkom Terug",
      subtitle: "Log in op uw ORYN account",
      email: "E-MAIL",
      password: "WACHTWOORD",
      emailPlaceholder: "uw@email.com",
      passwordPlaceholder: "Voer uw wachtwoord in",
      signingIn: "INLOGGEN...",
      signIn: "INLOGGEN",
      noAccount: "Nog geen account?",
      createOne: "Maak er een aan",
      continueWithout: "Verder winkelen zonder account",
      loginFailed: "Inloggen mislukt",
    },
    register: {
      title: "Account Aanmaken",
      subtitle: "Meld u aan bij ORYN voor besteltracking, exclusieve aanbiedingen en meer",
      firstName: "VOORNAAM *",
      lastName: "ACHTERNAAM *",
      email: "E-MAIL *",
      emailPlaceholder: "uw@email.com",
      password: "WACHTWOORD *",
      passwordPlaceholder: "Minimaal 8 tekens",
      confirmPassword: "WACHTWOORD BEVESTIGEN *",
      organization: "ORGANISATIE",
      organizationPlaceholder: "Lab, universiteit, bedrijf...",
      referralCode: "VERWIJZINGSCODE",
      referralCodePlaceholder: "Optioneel",
      creating: "ACCOUNT AANMAKEN...",
      createAccount: "ACCOUNT AANMAKEN",
      termsPrefix: "Door een account aan te maken, gaat u akkoord met de",
      termsOfService: "Algemene Voorwaarden",
      and: "en het",
      privacyPolicy: "Privacybeleid",
      hasAccount: "Heeft u al een account?",
      signIn: "Inloggen",
      passwordsMismatch: "Wachtwoorden komen niet overeen",
      passwordTooShort: "Wachtwoord moet minimaal 8 tekens bevatten",
      registrationFailed: "Registratie mislukt",
    },
    profile: {
      title: "Profielinstellingen",
      subtitle: "Beheer uw accountgegevens",
      personalInfo: "PERSOONLIJKE GEGEVENS",
      firstName: "VOORNAAM",
      lastName: "ACHTERNAAM",
      email: "E-MAIL",
      emailNotChangeable: "E-mail kan niet worden gewijzigd",
      referralCode: "VERWIJZINGSCODE",
      saveChanges: "WIJZIGINGEN OPSLAAN",
      saved: "Opgeslagen",
      changePassword: "WACHTWOORD WIJZIGEN",
      currentPassword: "HUIDIG WACHTWOORD",
      newPassword: "NIEUW WACHTWOORD",
      newPasswordPlaceholder: "Minimaal 8 tekens",
      confirmNewPassword: "NIEUW WACHTWOORD BEVESTIGEN",
      updatePassword: "WACHTWOORD BIJWERKEN",
      passwordUpdated: "Wachtwoord bijgewerkt",
      passwordsMismatch: "Wachtwoorden komen niet overeen",
      passwordTooShort: "Wachtwoord moet minimaal 8 tekens bevatten",
    },
    orders: {
      title: "Uw Bestellingen",
      subtitle: "Volg en beheer al uw ORYN-bestellingen",
      noOrders: "Nog geen bestellingen",
      noOrdersDesc: "Uw bestelgeschiedenis verschijnt hier zodra u uw eerste aankoop doet.",
      browseProducts: "PRODUCTEN BEKIJKEN",
      addedToCart: "TOEGEVOEGD AAN WINKELWAGEN ✓",
      reorder: "HERBESTELLEN",
      items: "artikelen",
      item: "artikel",
    },
    orderDetail: {
      notFound: "Bestelling niet gevonden",
      backToOrders: "Terug naar bestellingen",
      ordersBreadcrumb: "Bestellingen",
      orderTitle: "Bestelling",
      placedOn: "Geplaatst op",
      print: "AFDRUKKEN",
      orderTracking: "BESTELLING VOLGEN",
      pending: "In afwachting",
      processing: "In behandeling",
      shipped: "Verzonden",
      delivered: "Afgeleverd",
      cancelled: "Geannuleerd",
      orderItems: "BESTELARTIKELEN",
      qty: "Aantal:",
      subtotal: "Subtotaal",
      shipping: "Verzending",
      free: "GRATIS",
      discount: "Korting",
      total: "Totaal",
      shippingAddress: "VERZENDADRES",
      shippingNotAvailable: "Verzendgegevens niet beschikbaar",
      payment: "BETALING",
      method: "Methode",
      status: "Status",
      addedToCart: "TOEGEVOEGD AAN WINKELWAGEN",
      reorderAll: "ALLES HERBESTELLEN",
      needHelp: "Hulp Nodig?",
      needHelpDesc: "Als u vragen heeft over uw bestelling, neem dan contact op via",
    },
    referrals: {
      title: "Verwijzingsprogramma",
      subtitle: "Deel ORYN met collega's en verdien commissie op elke bestelling die zij plaatsen.",
      yourCode: "UW VERWIJZINGSCODE",
      copied: "GEKOPIEERD!",
      copyCode: "CODE KOPIËREN",
      yourLink: "UW VERWIJZINGSLINK",
      copyLink: "LINK KOPIËREN",
      shareVia: "DEEL VIA:",
      whatsapp: "WhatsApp",
      email: "E-mail",
      directReferrals: "DIRECTE VERWIJZINGEN",
      networkSize: "NETWERKGROOTTE",
      totalEarned: "TOTAAL VERDIEND",
      available: "BESCHIKBAAR",
      earningsByLevel: "INKOMSTEN PER NIVEAU",
      levelLabel: "Niveau",
      commission: "commissie",
      ordersLabel: "bestellingen",
      pending: "IN AFWACHTING",
      approved: "GOEDGEKEURD",
      paidOut: "UITBETAALD",
      yourReferrals: "UW VERWIJZINGEN",
      commissionHistory: "COMMISSIEGESCHIEDENIS",
      tableOrder: "BESTELLING",
      tableLevel: "NIVEAU",
      tableRate: "TARIEF",
      tableAmount: "BEDRAG",
      tableStatus: "STATUS",
      tableDate: "DATUM",
      howItWorks: "HOE HET WERKT",
      steps: [
        { title: "Deel Uw Code", desc: "Stuur uw unieke verwijzingscode of link naar collega's en mede-onderzoekers." },
        { title: "Zij Bestellen", desc: "Wanneer zij zich registreren met uw code en een bestelling plaatsen, verdient u commissie." },
        { title: "Verdien Beloningen", desc: "Verdien 10% op directe verwijzingen, plus commissies op hun verwijzingen tot 5 niveaus diep." },
      ],
      whatsappShareText: "Ontdek ORYN Peptides — precisie onderzoekspeptiden uit een biotech laboratorium. Gebruik mijn code {code} bij uw eerste bestelling: {link}",
      emailShareSubject: "ORYN Peptides — Precisie Onderzoekspeptiden",
      emailShareBody: "Hallo,\n\nIk wilde ORYN Peptides met u delen. Ze produceren farmaceutische onderzoekspeptiden met >99% zuiverheid.\n\nGebruik mijn verwijzingscode: {code}\n\nOf klik hier: {link}\n\nMet vriendelijke groet",
    },
    wishlist: {
      title: "Verlanglijst",
      itemsSaved: "artikelen opgeslagen",
      itemSaved: "artikel opgeslagen",
      empty: "Uw verlanglijst is leeg",
      emptyDesc: "Sla producten op waarin u geïnteresseerd bent.",
      browseProducts: "PRODUCTEN BEKIJKEN",
      addToCart: "IN WINKELWAGEN",
      remove: "VERWIJDEREN",
    },
    savedAddresses: {
      title: "OPGESLAGEN ADRESSEN",
      cancel: "ANNULEREN",
      addAddress: "+ ADRES TOEVOEGEN",
      labelField: "LABEL (bijv. Thuis, Kantoor)",
      labelPlaceholder: "Thuis",
      firstName: "VOORNAAM",
      lastName: "ACHTERNAAM",
      address: "ADRES",
      city: "STAD",
      postcode: "POSTCODE",
      country: "LAND",
      phone: "TELEFOON",
      setAsDefault: "Instellen als standaardadres",
      saveAddress: "ADRES OPSLAAN",
      noAddresses: "Geen opgeslagen adressen. Voeg er een toe voor sneller afrekenen.",
      default: "STANDAARD",
      setDefault: "ALS STANDAARD INSTELLEN",
      remove: "VERWIJDEREN",
      countries: {
        GB: "Verenigd Koninkrijk",
        ES: "Spanje",
        IE: "Ierland",
        DE: "Duitsland",
        FR: "Frankrijk",
        NL: "Nederland",
      },
    },
  },

  cookie: {
    message:
      "Wij gebruiken cookies om uw ervaring te verbeteren en voor essentiële sitefunctionaliteit. Door verder te gaan, gaat u akkoord met ons",
    privacyPolicy: "Privacybeleid",
    acceptAll: "ALLES ACCEPTEREN",
    essentialOnly: "ALLEEN ESSENTIEEL",
  },

  toast: {
    addedToCart: "TOEGEVOEGD AAN WINKELWAGEN",
  },

  popups: {
    firstVisit: {
      discount: "10%",
      yourFirstOrder: "UW EERSTE BESTELLING",
      code: "WELCOME10",
      tagline: "WELKOM BIJ ORYN",
      title: "Precisie Peptide Wetenschap",
      description:
        "Biotech lab dat >99% zuivere onderzoekspeptiden levert in precisie-pensystemen. Gebruik code WELCOME10 bij uw eerste bestelling.",
      benefits: [
        "Gratis verzending boven €150",
        "GMP-gecertificeerde productie",
        "Analysecertificaat inbegrepen",
      ],
      shopNow: "NU WINKELEN",
      noThanks: "Nee bedankt, ik bekijk het zelf",
    },
    exitIntent: {
      tagline: "WACHT — VOORDAT U VERTREKT",
      title: "Ontvang 10% Korting Op Uw Eerste Bestelling",
      description:
        "Sluit u aan bij onderzoekers wereldwijd die ORYN precisie-peptiden gebruiken. Voer uw e-mail in om uw exclusieve kortingscode te ontvangen.",
      placeholder: "uw@email.com",
      claimDiscount: "CLAIM MIJN 10% KORTING",
      noSpam: "Geen spam. Uitschrijven kan altijd.",
      welcomeTitle: "Welkom bij ORYN!",
      welcomeMessage:
        "Gebruik code WELCOME10 bij het afrekenen voor 10% korting.",
    },
  },

  payment: {
    processing: "VERWERKEN...",
    loadingPayment: "BETALING LADEN...",
    completeOrder: "BESTELLING AFRONDEN",
    sslEncrypted: "SSL VERSLEUTELD",
    pciCompliant: "PCI COMPLIANT",
    paymentFailed: "Betaling mislukt. Probeer het opnieuw.",
    unexpectedError: "Er is een onverwachte fout opgetreden.",
    notCompleted: "Betaling niet voltooid. Probeer het opnieuw.",
    preparingPayment: "Veilige betaling voorbereiden...",
    paymentNotReady: "Het betalingssysteem is niet gereed. Probeer het opnieuw.",
    paymentFormLoading: "Het betalingsformulier wordt nog geladen. Even geduld.",
    orderCreationFailed: "Betaling verwerkt maar het aanmaken van de bestelling is mislukt. Neem contact op met support.",
    orPayWith: "OF BETAAL MET KAART",
  },

  volumeDiscount: {
    applied: "Volumekorting toegepast:",
    addMore: "Voeg nog {count} artikel toe voor {percent}% KORTING",
    title: "VOLUMEKORTINGEN",
    items: "{count}+ artikelen",
    off: "{percent}% KORTING",
    active: "ACTIEF",
    unlockMore: "Voeg nog {count} artikel toe om {percent}% korting te ontgrendelen!",
  },

  frequentlyBought: {
    title: "Vaak Samen Gekocht",
    save: "BESPAAR 10%",
    bundlePrice: "Bundelprijs — bespaar {amount} met deze combinatie",
    addAll: "ALLES IN WINKELWAGEN",
  },

  recentlyViewed: {
    title: "Recent Bekeken",
  },

  orderBump: {
    addToOrder: "TOEVOEGEN AAN UW BESTELLING",
    yesAddIt: "JA, TOEVOEGEN",
  },

  aria: {
    search: "Zoeken",
    account: "Account",
    wishlist: "Verlanglijst",
    openCart: "Winkelwagen openen",
    toggleMenu: "Menu wisselen",
    mobileMenu: "Mobiel menu",
    backToTop: "Terug naar boven",
    cookieConsent: "Cookietoestemming",
    shareWhatsApp: "Delen op WhatsApp",
    shareX: "Delen op X",
    shareFacebook: "Delen op Facebook",
    copyLink: "Link kopiëren",
    switchLanguage: "Taal wijzigen",
    switchRegion: "Regio wijzigen",
    breadcrumb: "Kruimelpad",
    dismiss: "Sluiten",
    close: "Sluiten",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    email: "E-mail",
    researchDisclaimer: "Onderzoeksdisclaimer",
  },

  calculator: {
    interactiveTool: "INTERACTIEF HULPMIDDEL",
    title: "Peptide Reconstitutie Calculator",
    description: "Voer uw peptidehoeveelheid, watervolume en gewenste dosis in om concentratie en injectievolume te berekenen.",
    peptideAmount: "Peptidehoeveelheid",
    bacteriostaticWater: "Volume Bacteriostatisch Water",
    desiredDose: "Gewenste Dosis per Injectie",
    customAmount: "Aangepaste hoeveelheid",
    customVolume: "Aangepast volume",
    customDose: "Aangepaste dosis",
    concentration: "Concentratie",
    injectionVolume: "Injectievolume",
    insulinSyringe: "Insulinespuit",
    totalDoses: "Totaal Doses",
    mcgPerMl: "mcg / mL",
    mlPerDose: "mL per dosis",
    unitsIuMarks: "eenheden (IE-markeringen)",
    fromVial: "uit het flesje",
    units: "eenheden",
    overHundredUnits: "> 100 eenheden",
    zeroUnits: "0 eenheden",
    ml: "mL",
    overOneMl: "> 1,0 mL (gebruik grotere spuit)",
    zeroMl: "0,000 mL",
    syringeLabel: "Insulinespuit (100 eenheden = 1 mL)",
    warningNote: "Let op:",
    warningText: "De berekende dosis overschrijdt een standaard insulinespuit van 100 eenheden (1 mL). Overweeg meer bacteriostatisch water toe te voegen om het volume te vergroten, waardoor de concentratie daalt en het injectievolume per dosis afneemt.",
    enterValues: "Voer geldige waarden in om uw berekende resultaten te zien.",
    quickReference: "Snelle Referentie",
    unitConversions: "Eenheidsconversies",
    standardSyringe: "Standaard Spuit",
    theFormula: "De Formule",
    mgToMcg: "1 mg = 1.000 mcg",
    mlToUnits: "1 mL = 100 insuline-eenheden",
    u100Syringe: "U-100 insulinespuit",
    hundredUnitsOneMl: "100 eenheden = 1,0 mL",
    formulaLine1: "Dosis (mcg) / Concentratie (mcg/mL)",
    formulaLine2: "= Te injecteren volume (mL)",
  },

  whyOrynPage: {
    differentiators: [
      { title: "Voorgedoseerde Peptide-pennen", description: "In tegenstelling tot concurrenten die losse flesjes verkopen die reconstitutie vereisen, levert ORYN voorgemengde, precies gedoseerde peptide-pennen die direct klaar zijn voor onderzoeksgebruik. Geen mengen, geen berekeningen, geen besmettingsrisico.", highlight: "Uniek op de Britse markt" },
      { title: "≥98% HPLC-geverifieerde Zuiverheid", description: "Elke ORYN-batch overschrijdt 98% zuiverheid, onafhankelijk geverifieerd via hogedrukvloeistofchromatografie en massaspectrometrie. De meeste Britse concurrenten bieden slechts 95% of niet-geverifieerde claims.", highlight: "Boven industriestandaard" },
      { title: "GMP-productie in het VK", description: "Alle ORYN-peptiden worden geproduceerd in GMP-gecertificeerde faciliteiten die voldoen aan farmaceutische productienormen. Volledige batchtraceerbaarheid van grondstof tot eindproduct.", highlight: "Farmaceutische kwaliteit" },
      { title: "Gratis UK-verzending boven €150", description: "Geniet van gratis volgende-dag levering op alle Britse bestellingen boven €150. Temperatuurgecontroleerde verpakking garandeert de integriteit van peptiden van onze faciliteit naar uw onderzoekslab.", highlight: "Levering volgende dag" },
      { title: "Volledig COA bij elke bestelling", description: "Elke ORYN-bestelling wordt geleverd met een volledig analysecertificaat dat zuiverheid, identiteit, endotoxineniveaus en steriliteit bevestigt. Geen wachten, geen aanvragen — standaard inbegrepen.", highlight: "Transparantie gegarandeerd" },
      { title: "ISO 7 Reinruimteproductie", description: "ORYN-peptiden worden gevuld en verzegeld in ISO 7-geclassificeerde reinruimten met continue omgevingsmonitoring. Dit overtreft de normen van de meeste Britse peptide-leveranciers.", highlight: "Omgeving op ziekenhuisniveau" },
    ],
    comparisonFeatures: [
      { feature: "Leveringsformaat", oryn: "Voorgedoseerd Pensysteem", competitor: "Losse Flesjes (reconstitutie vereist)" },
      { feature: "Zuiverheidsstandaard", oryn: "≥98% HPLC & MS geverifieerd", competitor: "≥95% (vaak niet geverifieerd)" },
      { feature: "Testprotocol", oryn: "HPLC + Massaspectrometrie + Endotoxine", competitor: "Alleen basis HPLC" },
      { feature: "UK-verzending", oryn: "Gratis boven €150 (volgende dag)", competitor: "Variabel (€5-€15)" },
      { feature: "COA inbegrepen", oryn: "Elke batch, elke bestelling", competitor: "Op aanvraag (indien beschikbaar)" },
      { feature: "Productiefaciliteit", oryn: "ISO 7 Reinruimte, GMP-gecertificeerd", competitor: "Variabel (vaak niet bekendgemaakt)" },
      { feature: "Steriliteit", oryn: "0,22μm Filter + Gammastraling", competitor: "Alleen filtratie" },
      { feature: "Houdbaarheid", oryn: "24 maanden (verzegeld)", competitor: "6-12 maanden" },
      { feature: "Klantenservice", oryn: "Toegewijd onderzoeksteam", competitor: "Alleen e-mail" },
      { feature: "Productassortiment", oryn: "10 peptiden in 3 leveringssystemen", competitor: "5-8 peptiden, alleen flesjes" },
    ],
    stats: [
      { value: "10", label: "Onderzoekspeptiden", sublabel: "in 3 leveringssystemen" },
      { value: "98%+", label: "Geverifieerde Zuiverheid", sublabel: "HPLC + MS getest" },
      { value: "ISO 7", label: "Reinruimtestandaard", sublabel: "farmaceutische kwaliteit" },
      { value: "15+", label: "Bediende Britse Steden", sublabel: "levering volgende dag" },
      { value: "40+", label: "Londense Gebieden", sublabel: "zelfde dag verzending beschikbaar" },
      { value: "24", label: "Maanden Houdbaarheid", sublabel: "verzegeld, gekoeld" },
    ],
    tableOryn: "ORYN",
    tableCompetitors: "TYPISCHE UK-CONCURRENTEN",
    feature: "Kenmerk",
    viewProducts: "BEKIJK ONZE PRODUCTEN",
    ourNumbers: "ONZE CIJFERS",
    comparisonTitle: "Hoe ORYN Zich Vergelijkt",
    comparisonSubtitle: "Ontdek hoe ORYN zich verhoudt tot typische Britse peptide-leveranciers.",
  },

  wholesalePage: {
    breadcrumbHome: "HOME",
    breadcrumbWholesale: "GROOTHANDEL",
    heroBulkOrders: "BULKBESTELLINGEN",
    heroTitle1: "Groothandel &",
    heroTitle2: "Bulkbestellingen",
    heroDescription: "ORYN levert peptide-pensystemen van onderzoekskwaliteit aan universiteiten, laboratoria, klinieken en distributeurs in het Verenigd Koninkrijk en Europa. Volumekortingen van 5% tot 15% — met aangepaste prijzen voor grootschalige contracten.",
    statMinOrderLabel: "Min. Bestelling",
    statMinOrderValue: "3 Eenheden",
    statMaxDiscountLabel: "Max. Korting",
    statMaxDiscountValue: "15% Korting",
    statPurityLabel: "Zuiverheid",
    statPurityValue: ">99%",
    statDispatchLabel: "UK Verzending",
    statDispatchValue: "Zelfde Dag",
    tiersLabel: "VOLUMEPRIJZEN",
    tiersTitle1: "Korting-",
    tiersTitle2: "Niveaus",
    tiersDescription: "Combineer elk product uit ons volledige assortiment. Kortingen worden automatisch toegepast op basis van het totale aantal eenheden.",
    tierMostPopular: "MEEST POPULAIR",
    tierOffRetail: "OP DE WINKELPRIJS",
    tierPricing: "PRIJSSTELLING",
    tierLabelStarter: "STARTER",
    tierLabelProfessional: "PROFESSIONEEL",
    tierLabelEnterprise: "ONDERNEMING",
    tierLabelCustom: "AANGEPASTE OFFERTE",
    benefitsLabel: "GROOTHANDELSVOORDELEN",
    benefitsTitle1: "Waarom Samenwerken Met",
    benefitsTitle2: "ORYN",
    benefitsDescription: "Naast volumeprijzen bieden ORYN-groothandelsaccounts een reeks diensten die zijn ontworpen voor professionele kopers.",
    benefitAccountManagerTitle: "Vaste Accountmanager",
    benefitAccountManagerDesc: "Een enkel aanspreekpunt voor bestellingen, prijzen en technische vragen. Uw accountmanager begrijpt uw behoeften.",
    benefitShippingTitle: "Prioriteitsverzending",
    benefitShippingDesc: "Groothandelsbestellingen worden dezelfde dag verzonden bij plaatsing voor 14:00 uur. Temperatuurgecontroleerde verpakking inbegrepen zonder extra kosten.",
    benefitVolumePricingTitle: "Volumeprijzen",
    benefitVolumePricingDesc: "Automatische kortingen van 5% tot 15% op basis van bestelhoeveelheid. Aangepaste prijzen beschikbaar voor doorlopende contracten.",
    benefitCOATitle: "COA Inbegrepen",
    benefitCOADesc: "Elke groothandelslevering bevat partijspecifieke analysecertificaten. Volledige traceerbaarheid van synthese tot levering.",
    benefitCustomLabellingTitle: "Aangepaste Etikettering",
    benefitCustomLabellingDesc: "Witmerk en aangepaste verpakking beschikbaar voor distributeurs en klinieken. Minimale bestellingen van 50 eenheden voor aangepaste etiketten.",
    benefitTechSupportTitle: "Technische Ondersteuning",
    benefitTechSupportDesc: "Toegang tot ons peptidewetenschap team voor protocolbegeleiding, opslagaanbevelingen en productspecificaties.",
    whoWeServeLabel: "ONZE KLANTEN",
    whoWeServeTitle1: "Wie Wij",
    whoWeServeTitle2: "Bedienen",
    whoWeServeDescription: "ORYN groothandel peptiden worden vertrouwd door onderzoeksprofessionals en organisaties in het Verenigd Koninkrijk en Europa.",
    customerUniversitiesTitle: "Universiteiten & Academie",
    customerUniversitiesDesc: "Onderzoeksafdelingen en postdoctorale programma's die peptidebiologie, farmacologie en regeneratieve geneeskunde bestuderen.",
    customerResearchLabsTitle: "Onderzoekslaboratoria",
    customerResearchLabsDesc: "Private en publieke onderzoekslabs die in vitro en in vivo studies uitvoeren met peptideverbindingen van onderzoekskwaliteit.",
    customerPharmaTitle: "Farmaceutische Bedrijven",
    customerPharmaDesc: "Farmaceutische R&D-afdelingen die referentiestandaard peptiden gebruiken voor geneesmiddelontwikkeling en analytische vergelijkingsstudies.",
    customerClinicsTitle: "Klinieken & Medische Praktijken",
    customerClinicsDesc: "Integratieve geneeskundeklinieken en beoefenaars die een consistente, hoogzuivere peptidetoevoer nodig hebben voor klinisch onderzoek.",
    customerDistributorsTitle: "Distributeurs & Wederverkopers",
    customerDistributorsDesc: "Groothandelspartners die ORYN-producten distribueren in het Verenigd Koninkrijk en Europa. Witmerkopties beschikbaar.",
    customerBiotechTitle: "Biotech Startups",
    customerBiotechDesc: "Opkomende biotechbedrijven die een betrouwbare peptidetoevoer nodig hebben voor productontwikkeling en proof-of-conceptstudies.",
    productsLabel: "VOORBEELDEN VAN GROOTHANDELSPRIJZEN",
    productsTitle1: "Producten tegen",
    productsTitle2: "Groothandelsprijzen",
    productsDescription: "Zie hoe volumeprijzen uw kosten per eenheid verlagen. Alle ORYN-producten komen in aanmerking voor groothandelskortingen.",
    productRetailLabel: "WINKELPRIJS",
    productViewAll: "BEKIJK ALLE {count} PRODUCTEN",
    faqLabel: "FAQ",
    faqTitle1: "Groothandels-",
    faqTitle2: "FAQ",
    faqDescription: "Veelgestelde vragen over ons groothandelsprogramma, prijzen en accountinstelling.",
    ctaTitle: "Klaar om in Bulk te Bestellen?",
    ctaDescription: "Neem contact op met ons groothandelsteam om uw account in te stellen, aangepaste prijzen te bespreken en te besparen op peptide-pennen van onderzoekskwaliteit.",
    ctaEnquiry: "GROOTHANDELSAANVRAAG",
    ctaBrowseProducts: "BEKIJK PRODUCTEN",
  },

  share: {
    label: "DELEN",
  },

  socialProof: {
    from: "uit",
    purchased: "kocht",
    minAgo: "{min} min geleden",
  },

  flashSale: {
    flash: "Flash Sale — Gebruik code FLASH15 voor 15% korting op alle peptide pennen",
    weekend: "Weekend Aanbieding — Gebruik code WEEKEND10 voor 10% korting",
  },

  qualityPage: {
    breadcrumbHome: "HOME",
    breadcrumbQuality: "KWALITEIT & ANALYSE",
    heroBadge: "GEVERIFIEERD DOOR DERDEN",
    heroTitle1: "Transparantie in",
    heroTitle2: "Elk Batch",
    heroDescription:
      "Elk ORYN-peptide wordt onafhankelijk getest door ISO-geaccrediteerde laboratoria. We publiceren Analysecertificaten voor elk product omdat we geloven dat u precies moet kunnen zien wat u ontvangt — zuiverheid, identiteit en steriliteit, geverifieerd door wetenschap, niet door marketing.",
    statPurityLabel: "BATCH-ZUIVERHEID",
    statLabsLabel: "ONAFHANKELIJKE LABS",
    statTestsLabel: "TESTEN PER BATCH",
    statTraceabilityLabel: "TRACEERBAARHEID",
    processLabel: "ONS PROCES",
    processTitle1: "Van Synthese tot",
    processTitle2: "Certificaat",
    processDescription:
      "Een rigoureuze vierstaps kwaliteitsborging-pipeline zorgt ervoor dat elk ORYN-peptide voldoet aan de hoogste analytische normen voor vrijgave.",
    testingSteps: [
      {
        title: "Peptidesynthese",
        description:
          "Vaste-fase peptidesynthese (SPPS) in GMP-gecertificeerde faciliteiten onder ISO 9001 kwaliteitsmanagement.",
      },
      {
        title: "HPLC-analyse",
        description:
          "Hogedruk vloeistofchromatografie scheidt en kwantificeert de peptidezuiverheid en bevestigt >98% voor elk batch.",
      },
      {
        title: "Massaspectrometrie",
        description:
          "LC-MS/MS identiteitsbevestiging verifieert exact molecuulgewicht en integriteit van de aminozuursequentie.",
      },
      {
        title: "Certificaatgeneratie",
        description:
          "Een onafhankelijk laboratorium geeft een batch-specifiek Analysecertificaat uit met volledige analytische gegevens en goedkeuringscriteria.",
      },
    ],
    certificationsLabel: "CERTIFICERINGEN",
    standardsTitle1: "Kwaliteitsnormen die",
    standardsTitle2: "Ons Definiëren",
    standardsDescription:
      "Onze productie- en testinfrastructuur voldoet aan de meest veeleisende farmaceutische kwaliteitsbenchmarks in de sector.",
    qualityStandards: [
      {
        title: "GMP-productie",
        description:
          "GMP-gecertificeerde productiefaciliteiten in de gehele EU, die farmaceutische kwaliteitsconsistentie garanderen.",
      },
      {
        title: "ISO 9001 Kwaliteit",
        description:
          "Internationaal erkend kwaliteitsbeheersysteem dat elke stap van grondstoffen tot eindproduct regelt.",
      },
      {
        title: "ISO 7 Cleanroom",
        description:
          "Steriele vulling uitgevoerd in ISO 7 geclassificeerde cleanrooms met HEPA-filtratie en continue omgevingsmonitoring.",
      },
      {
        title: "HPLC-geverifieerde Zuiverheid",
        description:
          "Elk batch geverifieerd door onafhankelijke HPLC-analyse. De meeste batches overtreffen 99% zuiverheid — tot de hoogste op de Europese markt.",
      },
    ],
    coaLabel: "ANALYSECERTIFICATEN",
    coaTitle1: "Analysecertificaat voor Elk",
    coaTitle2: "Product",
    coaDescription:
      "Elk van onze peptideproducten wordt onafhankelijk geverifieerd. Hieronder staan de meest recente batch-testresultaten.",
    passLabel: "GESLAAGD",
    purityLabel: "ZUIVERHEID",
    batchLabel: "BATCH",
    testedLabel: "GETEST",
    methodLabel: "METHODE",
    testedDate: "Feb 2026",
    viewCoa: "COA BEKIJKEN",
    independentLabel: "ONAFHANKELIJKE VERIFICATIE",
    partnersTitle1: "Onafhankelijke Analytische",
    partnersTitle2: "Laboratoria",
    partnersP1:
      "ORYN test zijn eigen producten niet. Elk Analysecertificaat wordt gegenereerd door onafhankelijke, ISO 17025-geaccrediteerde analytische laboratoria die geen financiële relatie hebben met onze productieoperatie.",
    partnersP2:
      "Deze scheiding zorgt voor onbevooroordeelde, wetenschappelijk rigoureuze verificatie van zuiverheid, identiteit en steriliteit. Onze testpartners gebruiken gevalideerde analytische methoden waaronder omgekeerde-fase HPLC, LC-MS/MS, LAL-endotoxinetest en membraanfiltratie-steriliteitstesten.",
    partnersBullets: [
      "ISO 17025 geaccrediteerde analytische laboratoria",
      "Geen financiële banden met ORYN-productie",
      "Gevalideerde HPLC- en massaspectrometriemethoden",
      "Endotoxine- en steriliteitverificatie",
      "Volledige batch-traceerbaarheid van synthese tot certificaat",
    ],
    analyticalMethodsLabel: "ANALYTISCHE METHODEN",
    analyticalMethods: [
      {
        method: "HPLC-zuiverheidstest",
        description:
          "C18 omgekeerde-fase kolom, UV-detectie bij 220 nm. Kwantificeert peptidezuiverheid en detecteert onzuiverheden.",
          standard: "USP <621>",
      },
      {
        method: "Massaspectrometrie (LC-MS)",
        description:
          "Elektrospray-ionisatie met hoogresolutie massadetectie. Bevestigt moleculaire identiteit.",
          standard: "ISO 13528",
      },
      {
        method: "Endotoxinetest",
        description:
          "Kinetische turbidimetrische LAL-test (Limulus Amebocyte Lysaat). Zorgt ervoor dat bacteriële endotoxineniveaus onder de limieten zijn.",
          standard: "USP <85>",
      },
      {
        method: "Steriliteitstesten",
        description:
          "Membraanfiltratiemethode met 14-daagse incubatie in TSB- en FTM-media.",
          standard: "USP <71>",
      },
    ],
    understandingLabel: "UW COA BEGRIJPEN",
    coaContentsTitle1: "Wat Elk COA",
    coaContentsTitle2: "Bevat",
    coaContentsDescription:
      "Elk ORYN Analysecertificaat biedt volledige analytische transparantie. Dit is wat u in elk document zult vinden.",
    coaItems: [
      {
        title: "Peptide-identiteit",
        details:
          "Verbindingsnaam, molecuulformule, molecuulgewicht, aminozuursequentie en CAS-nummer.",
      },
      {
        title: "HPLC-zuiverheidsgegevens",
        details:
          "Chromatogram, retentietijd, piekoppervlakpercentage en onzuiverheidsprofiel met acceptatiecriteria.",
      },
      {
        title: "Massaspectrum",
        details:
          "LC-MS identiteitsbevestiging met waargenomen vs. theoretisch molecuulgewicht en ladingstoestanden.",
      },
      {
        title: "Endotoxineresultaten",
        details:
          "LAL-testresultaten in EU/mL met specificatielimieten. Alle ORYN-producten testen onder 0,5 EU/mL.",
      },
      {
        title: "Steriliteitenrapport",
        details:
          "14-daagse incubatieresultaten in TSB- en FTM-media die geen microbiële groei bevestigen.",
      },
      {
        title: "Batch-informatie",
        details:
          "Uniek batchnummer, productiedatum, testdatum, vervaldatum en analistenidentificatie.",
      },
    ],
    faqLabel: "FAQ",
    faqTitle1: "Kwaliteit & Analyse",
    faqTitle2: "FAQ",
    faqDescription:
      "Veelgestelde vragen over ons kwaliteitsborging-proces, peptidezuiverheidstesten en Analysecertificaten.",
    ctaTitle: "Kwaliteit die U Kunt Verifiëren",
    ctaDescription:
      "Elk ORYN-peptide wordt geleverd met een batchnummer dat u kunt traceren naar een onafhankelijk Analysecertificaat. Bekijk de wetenschap zelf.",
    ctaBrowseProducts: "BEKIJK PRODUCTEN",
    ctaRequestCoa: "COA AANVRAGEN",
  },

  shippingPage: {
    heroTagline: "TEMPERATUURGECONTROLEERD",
    heroTitle1: "Verzending &",
    heroTitle2: "Levering",
    heroDescription:
      "Elke ORYN-bestelling wordt dezelfde dag verzonden in temperatuurgecontroleerde verpakking, zodat uw peptide pennen in perfecte staat aankomen. Gratis UK-verzending voor bestellingen boven \u20ac{threshold}.",
    breadcrumbHome: "HOME",
    breadcrumbShipping: "VERZENDING & LEVERING",
    statUkDeliveryLabel: "UK Levering",
    statUkDeliveryValue: "2-4 Dagen",
    statDispatchLabel: "Verzending",
    statDispatchValue: "Zelfde Dag",
    statFreeOverLabel: "Gratis Vanaf",
    statPackagingLabel: "Verpakking",
    statPackagingValue: "2-8\u00b0C",
    ukZonesSectionLabel: "UK LEVERINGSZONES",
    ukZonesSectionTitle1: "Levertijden per",
    ukZonesSectionTitle2: "Regio",
    ukZonesSectionDescription:
      "Alle bestellingen voor 14:00 GMT worden dezelfde werkdag verzonden. De aangegeven tijden zijn werkdagen vanaf verzending.",
    ukDeliveryNote:
      "Levertijden zijn schattingen voor standaardverzending. Express-opties zijn beschikbaar bij het afrekenen. Bestellingen in het weekend en op feestdagen worden de volgende werkdag verzonden.",
    ukZones: [
      { region: "Londen & Zuidoost", days: "1 \u2013 2 dagen" },
      { region: "Midlands & East Anglia", days: "2 \u2013 3 dagen" },
      { region: "Noord-Engeland", days: "2 \u2013 3 dagen" },
      { region: "Schotland (Laagland)", days: "3 \u2013 4 dagen" },
      { region: "Wales", days: "2 \u2013 3 dagen" },
      { region: "Noord-Ierland", days: "3 \u2013 4 dagen" },
      { region: "Hooglanden & Eilanden", days: "4 \u2013 5 dagen" },
    ],
    coldChainSectionLabel: "KOUDE KETEN LOGISTIEK",
    packagingTitle1: "Temperatuurgecontroleerde",
    packagingTitle2: "Verpakking",
    packagingDescription:
      "Peptiden vereisen gekoelde opslag bij 2-8\u00b0C. Onze koude keten-verpakking zorgt ervoor dat uw bestelling de optimale temperatuur behoudt tijdens het transport.",
    packagingBullets: [
      "Behoudt 2-8\u00b0C tot 48 uur onderweg",
      "Niet-toxische gel-koelpacks, voorgekoeld op 2\u00b0C",
      "Meerlaagse geïsoleerde verzendcontainers",
      "Extra bescherming tijdens zomermaanden",
      "Maatgesneden schuiminzetstukken voor pennen",
    ],
    coldChainFeatures: [
      {
        title: "Geïsoleerde Verzendboxen",
        description:
          "Meerlaagse isolatiecontainers houden de inwendige temperatuur tot 48 uur op 2-8\u00b0C, waardoor de integriteit van peptiden van magazijn tot deur wordt beschermd.",
      },
      {
        title: "Gel Koelpacks",
        description:
          "Niet-toxische fasewisselende gelpacks, voorgekoeld op 2\u00b0C, zorgen voor aanhoudende koeling zonder risico op bevriezing.",
      },
      {
        title: "Seizoensaanpassingen",
        description:
          "In de zomermaanden (juni-september) voegen we extra koelpacks en verbeterde isolatie toe. Bij extreme hitte kiezen we voor expreslevering.",
      },
      {
        title: "Temperatuurbewaking",
        description:
          "Groothandelsbestellingen van 25+ eenheden bevatten temperatuurindicatorstrips die bevestigen dat de levering binnen het bereik van 2-8\u00b0C bleef.",
      },
    ],
    euSectionLabel: "INTERNATIONALE VERZENDING",
    euSectionTitle1: "Europese",
    euSectionTitle2: "Levering",
    euSectionDescription:
      "ORYN levert aan meer dan 15 Europese landen met volledige tracking en temperatuurgecontroleerde verpakking.",
    euCountriesHeader: "EU-LANDEN WAARNAAR WE VERZENDEN",
    euCountriesNotListed:
      "Niet vermeld? Neem contact op \u2014 we kunnen mogelijk verzending naar uw land regelen.",
    euDeliveryTimeTitle: "Levertijd",
    euDeliveryTimeValue: "3 \u2013 7 dagen",
    euDeliveryTimeDescription:
      "Werkdagen vanaf verzending. West-Europa doorgaans 3-5 dagen, Oost-Europa 5-7 dagen.",
    euShippingCostTitle: "Verzendkosten",
    euShippingCostValue: "Vast Tarief",
    euShippingCostDescription:
      "Vaste verzendkosten naar alle Europese bestemmingen. Berekend bij het afrekenen op basis van het bestemmingsland en het bestelgewicht.",
    euCustomsTitle: "Douane & Belastingen",
    euCustomsValue: "Verantwoordelijkheid van de Koper",
    euCustomsDescription:
      "Internationale bestellingen kunnen onderhevig zijn aan douanerechten en invoerbelastingen. Deze kosten zijn voor rekening van de klant.",
    euTrackingTitle: "Tracking",
    euTrackingValue: "Volledige Tracking",
    euTrackingDescription:
      "Alle internationale zendingen bevatten end-to-end tracking met realtime statusupdates per e-mail.",
    freeShippingSectionLabel: "GRATIS VERZENDING",
    freeShippingTitle1: "Gratis UK-Verzending Vanaf",
    freeShippingTitle2: "\u20ac{threshold}",
    freeShippingDescription:
      "Bestellingen boven \u20ac{threshold} komen in aanmerking voor gratis standaardverzending naar het Verenigd Koninkrijk. Volg uw voortgang in uw winkelwagen.",
    freeShippingExampleLabel: "VOORBEELD: BESTELLING VAN \u20ac120",
    freeShippingExampleAway: "\u20ac30 verwijderd van gratis verzending",
    discreetTitle: "Discrete Verpakking",
    discreetDescription:
      "Alle ORYN-bestellingen worden verzonden in neutrale, ongemarkeerde dozen. Geen productnamen, branding of beschrijvingen zichtbaar op de buitenverpakking.",
    discreetItems: [
      "Neutrale buitendoos",
      "Geen zichtbare branding",
      "Generieke afzendernaam",
      "Geen productbeschrijvingen",
    ],
    trackingTitle: "Bestelling Volgen",
    trackingDescription:
      "Elke bestelling ontvangt binnen 2 uur na verzending een trackingnummer. Volg uw zending in realtime van ons magazijn tot aan uw deur.",
    trackingItems: [
      "Tracking e-mail binnen 2 uur",
      "Realtime statusupdates",
      "Geschatte leveringsvenster",
      "Afleverbevestiging",
    ],
    returnsTitle: "Retourzendingen & Terugbetalingen",
    returnsDescription:
      "Als uw bestelling beschadigd of onjuist aankomt, neem dan contact met ons op binnen 48 uur. We regelen vervanging of volledige terugbetaling zonder extra kosten.",
    returnsItems: [
      "48 uur venster voor schademeldingen",
      "Volledige vervanging of terugbetaling",
      "Fotobewijs vereist",
      "Gratis retourverzending bij fouten",
    ],
    faqSectionLabel: "FAQ",
    faqSectionTitle1: "Verzending",
    faqSectionTitle2: "FAQ",
    faqSectionDescription:
      "Veelgestelde vragen over peptide-levering, verpakking en verzendopties.",
    ctaTitle: "Bestel Vandaag, Ontvang Deze Week",
    ctaDescription:
      "Verzending dezelfde dag voor 14:00. Temperatuurgecontroleerde levering. Gratis UK-verzending vanaf \u20ac{threshold}.",
    ctaShopNow: "NU WINKELEN",
    ctaContactUs: "CONTACT OPNEMEN",
  },

  termsPage: {
    tagline: "JURIDISCH",
    title: "Gebruiksvoorwaarden",
    lastUpdated: "Laatst bijgewerkt: maart 2026",
    sections: [
      {
        heading: "1. Aanvaarding van de Voorwaarden",
        content:
          "Door toegang te krijgen tot en gebruik te maken van de website en diensten van ORYN Peptide Labs, stemt u in met deze Gebruiksvoorwaarden. Als u niet akkoord gaat met deze voorwaarden, gebruik dan geen gebruik van onze diensten.",
      },
      {
        heading: "2. Alleen voor Onderzoeksdoeleinden",
        content:
          "Alle producten die door ORYN Peptide Labs worden verkocht, zijn uitsluitend bedoeld voor laboratorium- en onderzoeksdoeleinden. Producten zijn niet bedoeld voor menselijke of dierlijke consumptie. Door te kopen, bevestigt u dat u producten aanschaft voor legitieme onderzoeksdoeleinden en alle toepasselijke wetten en regelgeving in uw rechtsgebied naleeft.",
      },
      {
        heading: "3. Geschiktheid",
        content:
          "U moet minimaal 18 jaar oud zijn en een legitieme onderzoeksorganisatie, laboratorium of academische instelling vertegenwoordigen om producten te kunnen kopen. ORYN behoudt zich het recht voor om verificatie van onderzoekskwalificaties te vragen.",
      },
      {
        heading: "4. Bestellingen en Betaling",
        content:
          "Alle prijzen zijn in EUR. Betaling wordt veilig verwerkt. ORYN behoudt zich het recht voor bestellingen te annuleren die frauduleus lijken of deze voorwaarden schenden. Voor groothandelbestellingen: 50% aanbetaling, 50% voor verzending.",
      },
      {
        heading: "5. Verzending en Levering",
        content:
          "Producten worden indien nodig verzonden met koude-ketenverwerking. Levertijden zijn schattingen. ORYN is niet verantwoordelijk voor vertragingen veroorzaakt door douane, vervoerders of overmacht.",
      },
      {
        heading: "6. Retouren en Terugbetalingen",
        content:
          "Vanwege de aard van onze producten worden retouren alleen geaccepteerd voor beschadigde of onjuiste artikelen binnen 14 dagen na levering. Producten moeten ongeopend en in originele verpakking zijn.",
      },
      {
        heading: "7. Intellectueel Eigendom",
        content:
          "Alle inhoud, merkrecht en materialen op deze website zijn eigendom van ORYN Peptide Labs. Ongeautoriseerde reproductie is verboden.",
      },
      {
        heading: "8. Beperking van Aansprakelijkheid",
        content:
          "ORYN Peptide Labs levert producten in de huidige staat voor onderzoeksdoeleinden. Wij bieden geen garanties met betrekking tot geschiktheid voor een bepaald doel buiten de vermelde specificaties. Onze aansprakelijkheid is beperkt tot de aankoopprijs van het product.",
      },
      {
        heading: "9. Contact",
        content: "Voor vragen over deze voorwaarden, neem contact met ons op via legal@orynlabs.com.",
      },
    ],
  },

  privacyPage: {
    tagline: "JURIDISCH",
    title: "Privacybeleid",
    lastUpdated: "Laatst bijgewerkt: maart 2026",
    sections: [
      {
        heading: "1. Informatie die Wij Verzamelen",
        content:
          "Wij verzamelen informatie die u direct verstrekt: naam, e-mail, organisatie, verzendadres en betalingsgegevens wanneer u een account aanmaakt of een bestelling plaatst.",
      },
      {
        heading: "2. Hoe Wij Uw Informatie Gebruiken",
        content:
          "Uw informatie wordt gebruikt voor: het verwerken van bestellingen, communicatie over uw account, klantenondersteuning, het verzenden van bestelupdates en het naleven van wettelijke verplichtingen. Wij verkopen uw persoonlijke gegevens niet.",
      },
      {
        heading: "3. Gegevensbescherming",
        content:
          "ORYN Peptide Labs voldoet aan de AVG en toepasselijke Europese regelgeving inzake gegevensbescherming. Uw gegevens worden veilig opgeslagen met versleuteling in rust en in transit.",
      },
      {
        heading: "4. Uw Rechten",
        content:
          "Op grond van de AVG heeft u het recht op: toegang tot uw gegevens, rectificatie van onjuistheden, verzoek tot verwijdering, beperking van verwerking, gegevensoverdraagbaarheid en bezwaar tegen verwerking. Neem contact op met privacy@orynlabs.com om deze rechten uit te oefenen.",
      },
      {
        heading: "5. Cookies",
        content:
          "Wij gebruiken essentiële cookies voor de sitefunctionaliteit en analytische cookies om onze service te verbeteren. U kunt cookievoorkeuren beheren in uw browserinstellingen.",
      },
      {
        heading: "6. Contact",
        content: "Functionaris voor Gegevensbescherming: privacy@orynlabs.com",
      },
    ],
  },

  disclaimerPage: {
    tagline: "JURIDISCH",
    title: "Onderzoeksdisclaimer",
    lastUpdated: "Laatst bijgewerkt: maart 2026",
    alertTitle: "Belangrijke Mededeling",
    alertContent:
      "Alle producten die door ORYN Peptide Labs worden verkocht, zijn uitsluitend bedoeld voor laboratoriumonderzoek en wetenschappelijke studie. Ze zijn NIET bedoeld voor menselijk of veterinair gebruik, voedseladditieven, geneesmiddelen, cosmetica, huishoudelijke chemicaliën of enige andere vorm van consumptie.",
    buyerResponsibilityIntro:
      "Door te kopen bij ORYN Peptide Labs erkent en stemt de koper in dat:",
    buyerResponsibilityItems: [
      "Producten uitsluitend worden gebruikt voor legitieme onderzoeksdoeleinden",
      "De koper bekend is met en voldoet aan alle toepasselijke regelgeving",
      "Producten niet worden doorverkocht voor menselijke consumptie",
      "De koper alle verantwoordelijkheid aanvaardt voor correcte behandeling en gebruik",
      "De koper meerderjarig is en een legitieme onderzoeksinstelling vertegenwoordigt",
    ],
    sections: [
      {
        heading: "Verklaring Onderzoeksgebruik",
        content:
          "ORYN Peptide Labs vervaardigt en distribueert peptideverbindingen uitsluitend voor in-vitro onderzoek, laboratoriumexperimenten en wetenschappelijk onderzoek. Alle verbindingen worden geleverd als onderzoekschemicaliën met bijgevoegde Analysecertificaten (COA) voor batchverificatie.",
      },
      {
        heading: "Verantwoordelijkheid van de Koper",
        content: "",
      },
      {
        heading: "Geen Medische Claims",
        content:
          "ORYN Peptide Labs maakt geen claims met betrekking tot de therapeutische, diagnostische of preventieve eigenschappen van enig product. Productbeschrijvingen verwijzen naar gepubliceerde wetenschappelijke literatuur uitsluitend voor informatieve doeleinden en vormen geen medisch advies of werkzaamheidsclaims.",
      },
      {
        heading: "Kwaliteitsborging",
        content:
          "Alle ORYN-producten worden vervaardigd in GMP-gecertificeerde ISO Klasse 7 cleanroomfaciliteiten met analytische validatie door derden. Zuiverheidsgraden overschrijden 99% zoals geverifieerd door HPLC-analyse. Volledige batchdocumentatie inclusief COA, stabiliteitsgegevens en DMF-documentatie is op verzoek beschikbaar.",
      },
      {
        heading: "Naleving van Regelgeving",
        content:
          "Het is de verantwoordelijkheid van de koper om naleving te waarborgen van alle lokale, nationale en internationale regelgeving met betrekking tot aankoop, invoer, bezit en gebruik van onderzoekspeptiden. ORYN Peptide Labs opereert binnen Europese regelgevingskaders.",
      },
    ],
  },
} as unknown as Dictionary;

export default nl;
