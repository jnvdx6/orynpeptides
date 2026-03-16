import type { Dictionary } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const de = {
  meta: {
    title: "ORYN | Peptid-Pen-Systeme — Peptide Online Kaufen",
    titleTemplate: "%s | ORYN Peptide Labs",
    description:
      "Pharmazeutische Peptid-Pens online kaufen. BPC-157, NAD+, Tirzepatide, GHK-CU und mehr in wiederverwendbaren Pen-Systemen. GMP-zertifiziert, >99% Reinheit, hergestellt in Südkorea. Ab €99. Kostenloser Versand.",
    ogDescription:
      "Präzisionsdosierte Peptid-Pen-Systeme. 10 Forschungspeptide ab €99. Wiederverwendbare Pens mit austauschbaren Kartuschen. GMP-zertifiziert. >99% Reinheit. Kostenloser Versand in ganz Europa.",
  },

  header: {
    announcementText: "KOSTENLOSER VERSAND AB EINEM BESTELLWERT VON 150€",
    shopNow: "JETZT KAUFEN",
    myAccount: "Mein Konto",
    signIn: "Anmelden",
    searchPlaceholder: "Peptide suchen...",
    noResults: "Keine Ergebnisse für",
    typeToSearch: "Suchbegriff eingeben...",
    viewAll: "ALLE PRODUKTE ANZEIGEN",
  },

  nav: {
    products: "Produkte",
    science: "Wissenschaft",
    about: "Über uns",
    contact: "Kontakt",
    compare: "Vergleichen",
    learn: "Wissen",
  },

  hero: {
    tagline: "PRÄZISIONS-PEPTID-PEN-SYSTEME",
    subtitle: "Alterung stoppen. Wohlbefinden steigern. Langlebigkeit fördern.",
    description:
      "Pharmazeutische Peptide in wiederverwendbaren Pen-Systemen mit austauschbaren Kartuschen. Einfache Anwendung, präzise Dosierung, 30-Tage-Versorgung. GMP-zertifiziert. Hergestellt in Südkorea. Reinheit >99%.",
    explorePeptides: "PEPTIDE ENTDECKEN",
    ourScience: "UNSERE WISSENSCHAFT",
    purityLabel: "REINHEIT",
    dosingLabel: "DOSIERUNG",
    dosingValue: "30 Tage",
    trustFreeShipping: "KOSTENLOSER VERSAND",
    trustSecure: "SICHERE ZAHLUNG",
    trustCOA: "COA INKLUSIVE",
    socialProofCount: "2.400+ Bestellungen",
    socialProofLabel: "in diesem Quartal versendet",
    stats: {
      peptidesValue: "10",
      peptidesLabel: "Peptide",
      purityValue: ">99%",
      purityLabel: "Reinheit",
      cleanroomValue: "ISO 7",
      cleanroomLabel: "Reinraum",
      certifiedValue: "GMP",
      certifiedLabel: "Zertifiziert",
    },
  },

  categories: {
    label: "PRODUKTLINIEN",
    titleLine1: "Drei Systeme.",
    titleLine2: "Ein Standard.",
    description:
      "Jedes ORYN-Produkt wird in ISO-Klasse-7-Reinräumen mit GMP-Zertifizierung und unabhängiger Validierung hergestellt.",
    from: "Ab",
    items: [
      {
        name: "Peptide Pen System",
        tagline: "30-Tage-Präzisionsdosierung",
        description:
          "8 Forschungspeptide in wiederverwendbaren Mehrfachdosis-Pens. Pharmazeutische Formulierungen mit digitalem Dosierungsdisplay.",
      },
      {
        name: "MediT Pen",
        tagline: "Einmal-wöchentliche Injektion",
        description:
          "Vorgefüllter Tirzepatide 40mg Pen. Duale GIP/GLP-1-Wirkung für die metabolische Forschung.",
      },
      {
        name: "NovaDose System",
        tagline: "Tägliche NAD+-Mikrodosierung",
        description:
          "Fortschrittliches kartuschenbasiertes NAD+-Verabreichungssystem. Pharmazeutische Qualität mit nahezu 100% Bioverfügbarkeit.",
      },
    ],
  },

  showcase: {
    label: "EMPFOHLEN",
    titleLine1: "Forschungsqualität",
    titleLine2: "Peptide",
    subtitle: "Pharmazeutische Verbindungen ab €99. Wiederverwendbare Pen-Systeme mit 30-Tage-Präzisionsdosierung.",
    viewAll: "ALLE PRODUKTE ANZEIGEN",
    trustShipping: "KOSTENLOSER VERSAND",
    trustPurity: "REINHEIT >99%",
    trustCOA: "COA INKLUSIVE",
    trustReturn: "CHARGENRÜCKVERFOLGBAR",
  },

  science: {
    label: "UNSER PROZESS",
    titleLine1: "Entwickelt für",
    titleLine2: "Molekulare Präzision",
    description:
      "Von der Rohstoffbeschaffung bis zur Endsterilisation – jeder Schritt im ORYN-Herstellungsprozess unterliegt pharmazeutischen Protokollen und wird von unabhängigen Laboren validiert.",
    specs: {
      manufacturingLabel: "Herstellung",
      manufacturingValue: "Korea",
      capacityLabel: "Kapazität",
      capacityValue: "100K/Mo",
      batchSizeLabel: "Chargengröße",
      batchSizeValue: "20.000 Stk",
      leadTimeLabel: "Lieferzeit",
      leadTimeValue: "45-60 Tage",
    },
    steps: [
      {
        title: "Synthese",
        description:
          "Festphasen-Peptidsynthese mit proprietären Reinigungsprotokollen für eine Reinheit von >99% bei allen Formulierungen.",
      },
      {
        title: "Formulierung",
        description:
          "Wässrige Formulierungen in pharmazeutischer Qualität mit PEG-Viskositätsmitteln. pH-optimiert (6,8-7,4) für Stabilität und Bioverfügbarkeit.",
      },
      {
        title: "Sterilisation",
        description:
          "Vollständige aseptische Kammerherstellung mit 0,22μm-Filtration und Gammastrahlen-Sterilisationsfinish. ISO-Klasse-7-Reinräume.",
      },
      {
        title: "Validierung",
        description:
          "Unabhängige QA/QC durch POSTECH, UNIST und SGS. Jede Charge enthält ein Analysezertifikat mit vollständigen analytischen Daten.",
      },
    ],
  },

  howItWorks: {
    label: "SO FUNKTIONIERT ES",
    titleLine1: "Einfach.",
    titleLine2: "Effektiv.",
    description: "Von der Peptidauswahl bis zu den Ergebnissen — unser Pen-System macht die Forschung mühelos.",
    cta: "PEPTIDE ENTDECKEN",
    steps: [
      {
        title: "Wählen Sie Ihr Peptid",
        description: "Durchsuchen Sie unser Sortiment an Peptiden mit >99% Reinheit. Jeder Pen ist vorgemischt und sofort einsatzbereit.",
      },
      {
        title: "Sicher bestellen",
        description: "Schneller Checkout mit Stripe. Kostenloser Versand bei Bestellungen über 150€.",
      },
      {
        title: "Diskret erhalten",
        description: "Neutrale Verpackung, temperaturkontrollierter Versand. COA bei jeder Bestellung inklusive.",
      },
      {
        title: "Forschung starten",
        description: "Einstellbare Dosierung über den Präzisions-Pen. Kein Mischen, keine Fläschchen, kein Abfall.",
      },
    ],
  },

  quality: {
    label: "QUALITÄTSSICHERUNG",
    titleLine1: "Pharmazeutische",
    titleLine2: "Standards",
    pillars: [
      {
        title: "ISO-Klasse-7-Reinraum",
        description:
          "Partikelfreie Umgebungen, die pharmazeutische Herstellungsstandards erfüllen.",
      },
      {
        title: "GMP-zertifiziert",
        description:
          "Gleichbleibende Qualität, ordnungsgemäße Dokumentation und rückverfolgbare Produktion.",
      },
      {
        title: ">99% Reinheit",
        description:
          "HPLC-Analyse und unabhängige Validierung durch POSTECH, UNIST und SGS.",
      },
      {
        title: "Chargenrückverfolgbarkeit",
        description:
          "Vollständige DMF-Dokumentation, Stabilitätsdaten und COA für jede Charge.",
      },
      {
        title: "Gammastrahlen-Sterilisation",
        description:
          "Vollständige Sterilität durch Gammabestrahlung nach aseptischer Herstellung.",
      },
      {
        title: "Europäische Standards",
        description:
          "Vollständige Konformität mit europäischen pharmazeutischen Regulierungsrahmen.",
      },
    ],
  },

  cta: {
    label: "STARTEN SIE IHRE FORSCHUNG",
    titleLine1: "Bereit, Ihre",
    titleLine2: "Peptidforschung voranzubringen?",
    description:
      "Entdecken Sie unseren kompletten Katalog an Forschungspeptiden. Jedes Produkt wird mit Analysezertifikat und vollständiger Chargendokumentation geliefert.",
    browseProducts: "ALLE PRODUKTE ANSEHEN",
    contactTeam: "UNSER TEAM KONTAKTIEREN",
    valueProp1: "KOSTENLOSER VERSAND EU/UK",
    valueProp2: "COA BEI JEDER BESTELLUNG",
    valueProp3: "GMP-ZERTIFIZIERT",
    badges: [
      { value: "ISO 7", label: "REINRAUM" },
      { value: "GMP", label: "ZERTIFIZIERT" },
      { value: ">99%", label: "REINHEIT" },
      { value: "SGS", label: "VALIDIERT" },
    ],
  },

  footer: {
    description:
      "Präzisions-Peptid-Wissenschaft. Europäisches Biotech-Labor, das forschungstaugliche Peptidlösungen mit molekularer Präzision liefert.",
    researchOnly: "NUR FÜR FORSCHUNGSZWECKE",
    newsletterTitle: "Auf dem Laufenden bleiben",
    newsletterDescription: "Erhalten Sie Neuigkeiten zu Peptiden, Forschungsupdates und exklusiven Angeboten.",
    newsletterPlaceholder: "ihre@email.com",
    newsletterButton: "ABONNIEREN",
    newsletterSuccess: "Vielen Dank! Sie sind jetzt angemeldet.",
    paymentMethods: "WIR AKZEPTIEREN",
    sections: {
      products: "Produkte",
      company: "Unternehmen",
      legal: "Rechtliches",
    },
    productLinks: {
      all: "Alle Produkte",
      pens: "Peptide Pens",
      medit: "MediT Pen",
      novadose: "NovaDose",
    },
    companyLinks: {
      about: "Über ORYN",
      science: "Wissenschaft",
      contact: "Kontakt",
      quality: "Qualität",
      whyOryn: "Warum ORYN",
      researchHub: "Forschungszentrum",
      calculator: "Peptid-Rechner",
    },
    trustBadges: {
      ssl: "SSL-verschlüsselt",
      secure: "Sicherer Checkout",
      coa: "COA inklusive",
      guarantee: "Reinheit garantiert",
    },
    legalLinks: {
      terms: "Allgemeine Geschäftsbedingungen",
      privacy: "Datenschutzrichtlinie",
      disclaimer: "Forschungshinweis",
    },
    seoSections: {
      researchAreas: "Forschungsbereiche",
      learn: "Wissen",
      ukDelivery: "UK-Lieferung",
      ukRegions: "UK-Regionen",
      ukCounties: "UK-Grafschaften",
      peptideEncyclopedia: "Peptid-Enzyklopädie",
      resources: "Ressourcen",
      londonDelivery: "Lieferung nach London",
      europeanDelivery: "Europaweite Lieferung",
      topEuCities: "Top EU-Städte",
    },
    certifications: [
      { label: "ISO KLASSE 7", detail: "Reinraum" },
      { label: "GMP", detail: "Zertifiziert" },
      { label: ">99%", detail: "Reinheit" },
      { label: "EU", detail: "Hergestellt" },
    ],
    copyright: "ORYN PEPTIDE LABS — ALLE RECHTE VORBEHALTEN",
  },

  productCard: {
    purity: "REINHEIT >99%",
    pharmaGrade: "PHARMA-QUALITÄT",
    details: "DETAILS",
    addToCart: "IN DEN WARENKORB",
  },

  cart: {
    title: "IHRE BESTELLUNG",
    empty: "Ihr Warenkorb ist leer",
    emptySubtext: "Fügen Sie Forschungspeptide zu Ihrem Warenkorb hinzu.",
    browseProducts: "PRODUKTE DURCHSUCHEN",
    continueShopping: "Weiter einkaufen",
    subtotal: "Zwischensumme",
    checkout: "SICHERER CHECKOUT",
    researchOnly: "Nur für Forschungszwecke",
    itemsLabel: "Artikel",
    freeShippingAway: "Noch {amount} bis zum KOSTENLOSEN Versand",
    freeShippingUnlocked: "Sie haben KOSTENLOSEN Versand freigeschaltet!",
    youMightLike: "DAS KÖNNTE IHNEN AUCH GEFALLEN",
    trustSecure: "SICHERE ZAHLUNG",
    trustDiscreet: "DISKRETER VERSAND",
    trustCOA: "COA INKLUSIVE",
    orderSummary: "BESTELLÜBERSICHT",
    shipping: "Versand",
    free: "KOSTENLOS",
    atCheckout: "IM CHECKOUT",
    total: "Gesamt",
    volumeDiscount: "Mengenrabatt",
    saveForLater: "Für später speichern",
    saved: "GESPEICHERT",
    save: "SPEICHERN",
  },

  productsPage: {
    label: "KATALOG",
    title: "Forschungspeptide",
    description:
      "Entdecken Sie unser gesamtes Sortiment an präzisionsgefertigten Peptidlösungen. Jedes Produkt wird nach pharmazeutischen Standards mit >99% Reinheit hergestellt.",
    all: "ALLE",
    results: "Produkte",
    searchPlaceholder: "Peptide suchen...",
    sortBy: "SORTIEREN NACH",
    sortPriceAsc: "PREIS: AUFSTEIGEND",
    sortPriceDesc: "PREIS: ABSTEIGEND",
    sortName: "NAME: A-Z",
    noResults: "Keine Produkte gefunden für",
    noCategory: "Keine Produkte in dieser Kategorie",
    clearFilters: "Filter zurücksetzen",
    disclaimer:
      "ALLE ORYN-PRODUKTE SIND AUSSCHLIESSLICH FÜR FORSCHUNGS- UND LABORZWECKE BESTIMMT. NICHT ZUM MENSCHLICHEN VERZEHR.",
  },

  productDetail: {
    notFound: "Produkt nicht gefunden",
    backToProducts: "Zurück zu Produkten",
    home: "STARTSEITE",
    products: "PRODUKTE",
    perUnit: "pro Einheit",
    addToCart: "IN DEN WARENKORB",
    adding: "WIRD HINZUGEFÜGT...",
    keyBenefits: "HAUPTVORTEILE",
    specifications: "SPEZIFIKATIONEN",
    researchOnlyTitle: "Nur für Forschungszwecke",
    researchOnlyDescription:
      "Dieses Produkt ist ausschließlich für Labor- und Forschungszwecke bestimmt. Nicht zum menschlichen Verzehr.",
    relatedProducts: "Verwandte Produkte",
    trustShipping: "KOSTENLOSER VERSAND",
    trustPurity: "REINHEIT >99%",
    trustCOA: "COA INKLUSIVE",
    secureCheckout: "SICHERER CHECKOUT",
    discreetShipping: "DISKRETER VERSAND",
    inStock: "AUF LAGER",
    readyToShip: "Versandbereit",
    reviews: "Bewertungen",
    scienceTab: "Wissenschaft",
    readyToExperience: "Bereit, es zu erleben",
    premiumPenDescription: "Premium-Pen-System mit vollständig einstellbarer Dosierung. GMP-hergestellt, >99% Reinheit garantiert.",
    dosingProtocol: "DOSIERUNGSPROTOKOLL",
    howToUse: "So verwenden Sie Ihren ORYN Pen",
    quickReference: "KURZÜBERSICHT",
    recommendedDose: "Empfohlene Dosis",
    frequency: "Häufigkeit",
    duration: "Dauer",
    proTips: "PROFI-TIPPS",
    stepByStep: "SCHRITT-FÜR-SCHRITT-ANLEITUNG",
    importantLabel: "WICHTIG",
    safetyNote: "Verwenden Sie bei jeder Anwendung eine neue sterile Nadel. Entsorgen Sie gebrauchte Nadeln in einem geeigneten Abwurfbehälter. Lagern Sie den Pen gekühlt bei 2-8°C.",
    scienceLabel: "WISSENSCHAFT",
    scienceBehind: "Die Wissenschaft hinter",
    compoundProfile: "WIRKSTOFFPROFIL",
    classificationLabel: "KLASSIFIZIERUNG",
    molecularFormula: "MOLEKÜLFORMEL",
    molecularWeightLabel: "MOLEKULARGEWICHT",
    halfLifeLabel: "HALBWERTSZEIT",
    sequenceLabel: "SEQUENZ",
    researchAreasLabel: "FORSCHUNGSBEREICHE",
    mechanismOfAction: "WIRKMECHANISMUS",
    keyResearchFindings: "WICHTIGE FORSCHUNGSERGEBNISSE",
    trustedByResearchers: "VON FORSCHERN VERTRAUT",
    whatLabsSay: "Was Labore über",
    fromVerifiedReviews: "aus {count} verifizierten Bewertungen",
    verifiedLabel: "VERIFIZIERT",
    faqLabel: "FAQ",
    frequentlyAsked: "Häufig gefragt zu",
    buyInYourCity: "{product} IN IHRER STADT KAUFEN",
    relatedResearch: "VERWANDTE FORSCHUNG",
    formulaLabel: "FORMEL",
    weightLabel: "GEWICHT",
    add: "HINZUFÜGEN",
    closeCart: "Warenkorb schließen",
    decreaseQuantity: "Menge verringern",
    increaseQuantity: "Menge erhöhen",
    removeItem: "Artikel entfernen",
    toggleWishlist: "Wunschliste umschalten",
    closeSearch: "Suche schließen",
    closePopup: "Schließen",
    purityBadge: ">99% REINHEIT",
    gmpBadge: "GMP-ZERTIFIZIERT",
    freeShippingBadge: "KOSTENLOSER VERSAND AB 150+",
    whyChoosePen: "WARUM DEN PEN WÄHLEN",
    traditionalVials: "HERKÖMMLICHE FLÄSCHCHEN",
    orynPenSystem: "ORYN PEN SYSTEM",
    vialProblems: [
      { label: "Rekonstitution erforderlich", detail: "Bakteriostatisches Wasser, Spritze, präzises Mischen" },
      { label: "Dosierungsschwankungen", detail: "Spritzenmarkierungen können 10-20% abweichen" },
      { label: "Kontaminationsrisiko", detail: "Gummistopfen wird mehrfach durchstochen" },
      { label: "Schneller Abbau", detail: "Wirksamkeit sinkt nach Rekonstitution" },
      { label: "Komplexe Vorbereitung", detail: "5-10 Minuten pro Zubereitung" },
      { label: "Reiseuntauglich", detail: "Fläschchen, Spritzen, Wasser, Nadeln..." },
    ],
    comparisonBar: [
      { vial: "5-10 Min", pen: "30 Sek", label: "Vorbereitungszeit" },
      { vial: "~80%", pen: ">99%", label: "Dosiergenauigkeit" },
      { vial: "Abnehmend", pen: "Gleichbleibend", label: "Sterilität" },
      { vial: "7-14 Tage", pen: "30 Tage", label: "Stabilität" },
    ],
    compareWith: "MIT ÄHNLICHEN PRODUKTEN VERGLEICHEN",
    sideBy: "Produkte Vergleichen",
    vsLabel: "AUSBLENDEN",
    keyDifferences: "HAUPTVORTEILE",
    bestFor: "Vorteile",
    viewProduct: "HINZUFÜGEN",
    comparisonDisclaimer: "PREIS",
  },

  aboutPage: {
    tagline: "ÜBER ORYN",
    heroTitle1: "Die Wissenschaft hinter",
    heroTitle2: "der Präzision",
    heroDescription:
      "ORYN ist ein europäisches Biotech-Labor, das sich der Weiterentwicklung der Peptidforschung durch pharmazeutische Herstellung, innovative Verabreichungssysteme und kompromisslose Qualitätsstandards widmet.",
    brandStatement:
      "Wir glauben, dass Peptidforschung dieselbe Herstellungssorgfalt verdient wie",
    brandHighlight: "die pharmazeutische Produktion.",
    brandParagraphs: [
      "ORYN entstand aus einer Frustration mit dem Peptid-Forschungsmarkt. Zu viele Verbindungen mit ungewisser Reinheit, inkonsistenter Dosierung und undurchsichtigen Lieferketten. Wir haben uns vorgenommen, das zu ändern.",
      "Unsere Herstellungspartner betreiben ISO-Klasse-7-Reinräume mit GMP-Zertifizierung. Jede Formulierung durchläuft eine HPLC-Analyse und unabhängige Drittvalidierung. Wir stellen vollständige Chargendokumentation bereit, weil Transparenz nicht optional ist — sie ist grundlegend.",
      "Das Ergebnis: Forschungspeptide, denen Wissenschaftler und Labore vertrauen können, geliefert in präzisionsgefertigten Systemen für konsistente, zuverlässige Ergebnisse.",
    ],
    valuesLabel: "UNSERE WERTE",
    valuesTitle: "Was uns antreibt",
    values: [
      {
        title: "Präzision",
        description:
          "Jede Messung zählt. Von der Synthese bis zur Endabfüllung kontrollieren wir Variablen auf molekularer Ebene.",
      },
      {
        title: "Reinheit",
        description:
          "99% ist unser Minimum. Drittvalidiert durch POSTECH, UNIST und SGS für absolute Sicherheit.",
      },
      {
        title: "Innovation",
        description:
          "Drei einzigartige Verabreichungsplattformen, entwickelt für optimale Stabilität, Dosiergenauigkeit und Benutzerfreundlichkeit.",
      },
      {
        title: "Transparenz",
        description:
          "Vollständige Chargendokumentation, COA für jedes Produkt und lückenlose Lieferkettenrückverfolgbarkeit.",
      },
    ],
    journeyLabel: "UNSERE REISE",
    journeyTitle: "Aufbau",
    timeline: [
      {
        year: "Gründung",
        title: "Präzision von Tag eins",
        description:
          "ORYN wurde mit einer einzigen Vision gegründet: europäischen Laboren Peptidforschung in pharmazeutischer Qualität mit kompromisslosen Qualitätsstandards zu ermöglichen.",
      },
      {
        year: "Herstellung",
        title: "Koreanische Biotech-Partnerschaft",
        description:
          "Strategische Partnerschaft mit ISO-Klasse-7-zertifizierten Produktionsstätten in Eumseong und Osan, Korea. 100.000 Einheiten pro Monat Kapazität.",
      },
      {
        year: "Innovation",
        title: "Fortschrittliche Verabreichungssysteme",
        description:
          "Entwicklung von drei proprietären Verabreichungsplattformen: Mehrfachdosis Peptide Pen, vorgefüllter MediT Pen und das NovaDose-Kartuschensystem.",
      },
      {
        year: "Heute",
        title: "10 Forschungspeptide",
        description:
          "Vollständiger Katalog von Forschungspeptiden in den Bereichen Heilung, Stoffwechsel, Anti-Aging und Wachstumshormonforschung mit weltweitem Vertrieb.",
      },
    ],
    manufacturingLabel: "HERSTELLUNG",
    manufacturingTitle: "Produktionsspezifikationen",
    manufacturingSpecs: [
      { value: "ISO 7", label: "Reinraumklasse", sub: "Zertifiziert" },
      { value: "GMP", label: "Herstellung", sub: "Zertifiziert" },
      { value: "100K", label: "Monatskapazität", sub: "Einheiten/Monat" },
      { value: "24Mo", label: "Haltbarkeit", sub: "Stabilitätsgeprüft" },
      { value: "0.22um", label: "Sterilisation", sub: "Filtration" },
      { value: "SGS", label: "Validierung", sub: "Drittanbieter" },
      { value: "6.8-7.4", label: "pH-Bereich", sub: "Optimiert" },
      { value: "PEG", label: "Viskosität", sub: "Mittel" },
    ],
  },

  sciencePage: {
    tagline: "WISSENSCHAFT",
    heroTitle1: "Peptid-",
    heroTitle2: "Forschungsbibliothek",
    heroDescription:
      "Verstehen Sie die molekularen Mechanismen hinter jedem ORYN-Produkt. Diese Bibliothek bietet einen wissenschaftlichen Überblick über unseren Forschungspeptid-Katalog und deren Untersuchungsbereiche.",
    processLabel: "PROZESS",
    processTitle1: "Von der Synthese zur",
    processTitle2: "Verabreichung",
    processDescription:
      "Eine sechsstufige pharmazeutische Herstellungspipeline, die Konsistenz, Reinheit und Stabilität in jedem Produkt gewährleistet.",
    processSteps: [
      { step: "01", label: "Rohstoff", time: "2 Wochen" },
      { step: "02", label: "Synthese", time: "8 Tage" },
      { step: "03", label: "Reinigung", time: "HPLC" },
      { step: "04", label: "Formulierung", time: "pH 6,8-7,4" },
      { step: "05", label: "Abfüllung", time: "2 Wochen" },
      { step: "06", label: "Sterilisation & QK", time: "1 Woche" },
    ],
    libraryLabel: "BIBLIOTHEK",
    libraryTitle1: "Peptid-Wirkstoff-",
    libraryTitle2: "Profile",
    classification: "KLASSIFIZIERUNG",
    mechanism: "MECHANISMUS",
    researchAreas: "FORSCHUNGSBEREICHE",
    specsLabel: "SPEZIFIKATIONEN",
    specsTitle: "Universelle Qualitätsparameter",
    specsItems: [
      { value: ">99%", label: "Reinheit (HPLC)" },
      { value: "6.8-7.4", label: "pH-Bereich" },
      { value: "0.22um", label: "Sterilfiltration" },
      { value: "3 mL", label: "Füllvolumen" },
      { value: "PEG", label: "Viskositätsmittel" },
      { value: "30 Days", label: "Dosierungszeitraum" },
      { value: "24 mo", label: "Haltbarkeit" },
      { value: "2-8°C", label: "Lagertemperatur" },
    ],
  },

  contactPage: {
    tagline: "KONTAKT",
    heroTitle: "Kontaktieren Sie uns",
    heroDescription:
      "Für Großhandelsanfragen, Forschungspartnerschaften oder Produktfragen. Unser Team antwortet innerhalb von 24 Stunden.",
    companyName: "ORYN Peptide Labs",
    emailLabel: "E-MAIL",
    wholesaleLabel: "GROSSHANDEL",
    locationLabel: "STANDORT",
    locationLine1: "Europäischer Geschäftsbetrieb",
    locationLine2: "Forschung & Vertrieb",
    infoBoxes: [
      {
        title: "Großhandelsbestellungen",
        description:
          "Mindestbestellmenge: 1.000 pro SKU. Vollständiges OEM-Branding verfügbar. Zahlung: 50% Vorauszahlung / 50% vor Versand. DDP-Versand möglich.",
      },
      {
        title: "Forschungspartnerschaften",
        description:
          "Wir unterstützen akademische und institutionelle Forschungsprogramme mit individuellen Formulierungen, Großhandelspreisen und bevorzugter Herstellung.",
      },
      {
        title: "Dokumentation",
        description:
          "COA, Stabilitätsdaten, DMF-Dokumentation und Marketingmaterialien sind für alle ORYN-Produkte auf Anfrage erhältlich.",
      },
    ],
    formTitle: "Senden Sie uns eine Nachricht",
    formDescription:
      "Füllen Sie das Formular aus und unser Team wird sich umgehend bei Ihnen melden.",
    firstName: "VORNAME",
    lastName: "NACHNAME",
    email: "E-MAIL",
    organization: "ORGANISATION",
    inquiryType: "ANFRAGETYP",
    inquiryOptions: [
      "Produktanfrage",
      "Großhandelsbestellung",
      "Forschungspartnerschaft",
      "Individuelle Formulierung",
      "Dokumentationsanfrage",
      "Sonstiges",
    ],
    message: "NACHRICHT",
    messagePlaceholder: "Erzählen Sie uns von Ihrem Forschungsbedarf...",
    sendMessage: "NACHRICHT SENDEN",
    messageSent: "Nachricht gesendet",
    messageSentDescription: "Wir antworten innerhalb von 24 Stunden.",
  },

  checkoutPage: {
    emptyCart: "Ihr Warenkorb ist leer",
    emptyCartDescription: "Fügen Sie Produkte hinzu, bevor Sie zur Kasse gehen.",
    browseProducts: "Produkte durchsuchen",
    steps: ["Informationen", "Versand", "Zahlung"],
    shippingTitle: "Versandinformationen",
    firstName: "VORNAME",
    lastName: "NACHNAME",
    email: "E-MAIL",
    phone: "TELEFON",
    address: "ADRESSE",
    city: "Stadt",
    postalCode: "Postleitzahl",
    country: "Land",
    referralCode: "EMPFEHLUNGSCODE",
    referralCodePlaceholder: "Empfehlungscode eingeben",
    referralCodeHint: "Haben Sie einen Empfehlungscode? Geben Sie ihn zur Nachverfolgung ein.",
    continueToPayment: "WEITER ZUR ZAHLUNG",
    paymentTitle: "Zahlung",
    cardPayment: "Kartenzahlung",
    cryptoPayment: "Krypto-Zahlung",
    cardNumber: "KARTENNUMMER",
    expiry: "ABLAUFDATUM",
    cvc: "CVC",
    selectCrypto: "KRYPTOWÄHRUNG AUSWÄHLEN",
    amountToPay: "ZU ZAHLENDER BETRAG",
    discountApplied: "(5% Rabatt angewendet)",
    sendToAddress: "AN ADRESSE SENDEN",
    copy: "KOPIEREN",
    copied: "KOPIERT",
    timeRemaining: "VERBLEIBENDE ZEIT",
    sendBeforeExpiry: "Zahlung vor Ablauf senden",
    sentPayment: "ICH HABE DIE ZAHLUNG GESENDET",
    txHash: "TRANSAKTIONS-HASH",
    txHashPlaceholder: "Geben Sie Ihren Transaktions-Hash ein",
    sessionExpired: "ZAHLUNGSSITZUNG ABGELAUFEN",
    restartSession: "SITZUNG NEU STARTEN",
    back: "Zurück",
    placeOrder: "BESTELLUNG AUFGEBEN",
    processing: "WIRD VERARBEITET...",
    orderSummary: "BESTELLÜBERSICHT",
    qty: "Anz.",
    subtotal: "Zwischensumme",
    cryptoDiscount: "Krypto-Rabatt (5%)",
    shipping: "Versand",
    shippingNote: "WIRD IM NÄCHSTEN SCHRITT BERECHNET",
    referral: "Empfehlung",
    total: "Gesamt",
    researchOnly: "Nur für Forschungszwecke",
    orderConfirmed: "Bestellung bestätigt",
    orderConfirmedDescription:
      "Vielen Dank für Ihre Bestellung. Eine Bestätigungs-E-Mail mit Ihren Bestelldetails und Tracking-Informationen wurde gesendet.",
    paymentVerifying: "ZAHLUNG WIRD VERIFIZIERT",
    paymentVerifyingDescription:
      "Ihre Krypto-Zahlung wird auf der Blockchain bestätigt. Dies kann bis zu 30 Minuten dauern.",
    paymentConfirmed: "ZAHLUNG BESTÄTIGT",
    referralApplied: "EMPFEHLUNGSCODE ANGEWENDET",
    continueShopping: "Weiter einkaufen",
    secureCheckout: "SICHERER CHECKOUT",
    orderRef: "BESTELL-NR.",
    contactShipping: "Kontakt- und Versandinformationen",
    change: "Ändern",
    emailPlaceholder: "ihre@email.com",
    shippingAddress: "LIEFERADRESSE",
    useSavedAddress: "GESPEICHERTE ADRESSE VERWENDEN",
    selectCountry: "Land auswählen...",
    firstNamePlaceholder: "Vorname",
    lastNamePlaceholder: "Nachname",
    addressPlaceholder: "Adresse",
    apartmentPlaceholder: "Wohnung, Suite usw. (optional)",
    cityPlaceholder: "Stadt",
    postalCodePlaceholder: "Postleitzahl",
    phonePlaceholder: "Telefon (optional)",
    continueToShipping: "WEITER ZUM VERSAND",
    shippingMethod: "Versandmethode",
    loadingShipping: "Versandoptionen werden geladen...",
    freeShippingApplied: "KOSTENLOSER VERSAND AKTIVIERT!",
    freeShippingLabel: "KOSTENLOSER VERSAND (BESTELLUNG +€{threshold})",
    freeStandardShipping: "Kostenloser Standardversand",
    returnToInformation: "← Zurück zu Informationen",
    returnToShipping: "← Zurück zum Versand",
    contact: "KONTAKT",
    shipTo: "LIEFERUNG AN",
    method: "METHODE",
    free: "Kostenlos",
    required: "Pflichtfeld",
    validEmailRequired: "Gültige E-Mail-Adresse erforderlich",
    invalidCode: "Ungültiger Code",
    failedToValidate: "Validierung fehlgeschlagen",
    hideOrderSummary: "Bestellübersicht ausblenden",
    showOrderSummary: "Bestellübersicht anzeigen",
    discount: "Rabatt",
    volumeDiscountLabel: "Mengenrabatt",
    calculatedNextStep: "Wird im nächsten Schritt berechnet",
    securePayment: "SICHERE ZAHLUNG",
    discreetShipping: "DISKRETER VERSAND",
    coaIncluded: "COA INKLUSIVE",
    gmpCertified: "GMP-ZERTIFIZIERT",
    allSecure: "ALLE TRANSAKTIONEN SIND SICHER UND VERSCHLÜSSELT",
    backendRequired: "BACKEND ERFORDERLICH",
    backendDescription: "Medusa-Backend ist zur Zahlungsabwicklung erforderlich.",
    promoCodePlaceholder: "Rabattcode",
    apply: "ANWENDEN",
    referralPlaceholder: "Empfehlungscode (optional)",
    sslEncrypted: "SSL-verschlüsselt",
    purity99: ">99% Reinheit",
    guaranteed: "Garantiert",
    gmpCertifiedBadge: "GMP-zertifiziert",
    guarantee30: "30-Tage-Garantie",
    noQuestions: "Ohne Rückfragen",
    emailHint: "Kein Konto erforderlich. Ihre Bestellung wird mit dieser E-Mail verknüpft.",
    verifyingPayment: "Zahlung wird verifiziert...",
    paymentFailed: "Zahlung fehlgeschlagen",
    paymentFailedDescription: "Ihre Zahlung konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut oder verwenden Sie eine andere Zahlungsmethode.",
    tryAgain: "Erneut versuchen",
    whatHappensNext: "WAS PASSIERT ALS NÄCHSTES",
    nextSteps: [
      "Bestellbestätigung per E-Mail an Ihren Posteingang",
      "Ihre Bestellung wird vorbereitet und qualitätsgeprüft",
      "Versand mit Sendungsverfolgung — in der Regel am nächsten Werktag",
    ],
    viewOrders: "BESTELLUNGEN ANZEIGEN",
    referralTitle: "Teilen Sie ORYN und verdienen Sie 10% Provision",
    referralDescription: "Sie mögen unsere Produkte? Teilen Sie Ihren Empfehlungslink und verdienen Sie 10% bei jedem Kauf.",
    getReferralLink: "IHREN EMPFEHLUNGSLINK ERHALTEN →",
  },

  products: {
    "bpc-157": {
      subtitle: "Heilung & Regeneration",
      categoryLabel: "Peptide Pen",
      description:
        "Body Protection Compound-157 ist ein synthetisches Peptid, das von einem natürlich vorkommenden Protein im Magensaft abgeleitet ist. ORYN BPC-157 ist in pharmazeutischer Qualität in einem präzisionsdosierten Pen-System für konsistente, zuverlässige Verabreichung über 30 Tage formuliert.",
      benefits: [
        "Unterstützt Gewebeheilung und Regeneration",
        "Fördert die Darmgesundheit und -integrität",
        "Unterstützt die Sehnen- und Bänderreparatur",
        "Entzündungshemmende Eigenschaften",
        "Neuroprotektives Potenzial",
      ],
      badge: "Bestseller",
    },
    "tb-500": {
      subtitle: "Gewebereparatur",
      categoryLabel: "Peptide Pen",
      description:
        "Thymosin Beta-4-Fragment, TB-500, spielt eine entscheidende Rolle bei der Gewebereparatur und -regeneration. ORYN TB-500 liefert eine präzise 15mg-Dosis in unserem fortschrittlichen Pen-System, entwickelt für optimale Bioverfügbarkeit und konsistente Ergebnisse.",
      benefits: [
        "Beschleunigt die Wundheilung",
        "Reduziert Entzündungen",
        "Fördert die Muskelgewebereparatur",
        "Unterstützt die Herz-Kreislauf-Gesundheit",
        "Verbessert Flexibilität und Mobilität",
      ],
    },
    "cjc-1295": {
      subtitle: "GH-Stimulation",
      categoryLabel: "Peptide Pen",
      description:
        "CJC-1295 ist ein synthetisches Analogon des Wachstumshormon-Releasing-Hormons (GHRH). ORYN CJC-1295 bietet eine anhaltende GH-Erhöhung durch unser Präzisionsdosierungssystem, hergestellt nach höchsten pharmazeutischen Standards.",
      benefits: [
        "Stimuliert die Wachstumshormonfreisetzung",
        "Unterstützt die magere Körperzusammensetzung",
        "Fördert tiefen, erholsamen Schlaf",
        "Verbessert die Erholung zwischen Sitzungen",
        "Unterstützt die Stoffwechselfunktion",
      ],
    },
    ipamorelin: {
      subtitle: "GH-Stimulation",
      categoryLabel: "Peptide Pen",
      description:
        "Ipamorelin ist ein selektives Wachstumshormon-Sekretagogum, das die Hypophyse stimuliert. ORYN Ipamorelin bietet gezielte GH-Freisetzung ohne die breitere hormonelle Störung, die bei weniger selektiven Verbindungen auftritt.",
      benefits: [
        "Selektive GH-Freisetzung",
        "Minimales Nebenwirkungsprofil",
        "Unterstützt die Knochendichte",
        "Fördert mageres Gewebe",
        "Verbessert die Schlafqualität",
      ],
    },
    "tirzepatide-pen": {
      subtitle: "Stoffwechsel",
      categoryLabel: "Peptide Pen",
      description:
        "Tirzepatide ist ein dualer GIP/GLP-1-Rezeptoragonist, der an der Spitze der metabolischen Peptidwissenschaft steht. Das ORYN Tirzepatide Pen-System liefert Präzisionsdosierung für metabolische Forschungsanwendungen.",
      benefits: [
        "Duale Hormonrezeptorwirkung",
        "Unterstützt die Stoffwechselfunktion",
        "Blutzuckermanagement",
        "Appetitregulierung",
        "Klinisch untersuchte Verbindung",
      ],
      badge: "Beliebt",
    },
    "ghk-cu": {
      subtitle: "Hautreparatur",
      categoryLabel: "Peptide Pen",
      description:
        "GHK-Cu (Kupferpeptid) ist ein natürlich vorkommendes Tripeptid mit hoher Affinität für Kupferionen. ORYN GHK-CU unterstützt die Hautmodellierung und -reparaturforschung mit einer potenten 60mg-Formulierung.",
      benefits: [
        "Fördert die Kollagensynthese",
        "Unterstützt die Hautelastizität",
        "Antioxidative Eigenschaften",
        "Unterstützung der Wundheilung",
        "Anti-Aging-Forschungsanwendungen",
      ],
    },
    glutathione: {
      subtitle: "Antioxidans",
      categoryLabel: "Peptide Pen",
      description:
        "Glutathion ist das wichtigste Antioxidans des Körpers, entscheidend für zelluläre Entgiftung und Immunfunktion. ORYN Glutathion liefert eine leistungsstarke 6g-Dosis über unser Präzisions-Pen-System für maximale Bioverfügbarkeit.",
      benefits: [
        "Stärkstes antioxidatives Schutzsystem",
        "Zelluläre Entgiftung",
        "Unterstützung des Immunsystems",
        "Hautaufhellende Eigenschaften",
        "Unterstützung der Leberfunktion",
      ],
    },
    "nad-plus": {
      subtitle: "Stoffwechsel & Anti-Aging",
      categoryLabel: "Peptide Pen",
      description:
        "Nicotinamid-Adenin-Dinukleotid (NAD+) ist ein essentielles Coenzym, das in jeder Zelle vorkommt. Der ORYN NAD+ Pen liefert eine konzentrierte 500mg-Dosis zur Unterstützung der zellulären Energieproduktion, DNA-Reparatur und des gesunden Alterns.",
      benefits: [
        "Zelluläre Energieproduktion",
        "Unterstützung der DNA-Reparatur",
        "Forschung zum gesunden Altern",
        "Unterstützung der kognitiven Funktion",
        "Stoffwechseleffizienz",
      ],
      badge: "Premium",
    },
    "medit-tirzepatide": {
      subtitle: "Tirzepatide 40mg — Gewichtsmanagement",
      categoryLabel: "MediT Pen",
      description:
        "Der ORYN MediT Pen ist ein vorgefüllter Einweg-Injektionspen mit 40mg Tirzepatide. Für die einmal wöchentliche Anwendung konzipiert, kombiniert er die duale GIP/GLP-1-Hormonwirkung für umfassende metabolische Unterstützung.",
      benefits: [
        "Duale Hormonwirkung (GIP + GLP-1)",
        "Einmal wöchentliche Anwendung",
        "Klinisch nachgewiesene Wirksamkeit",
        "Appetitkontrolle und Sättigungssteigerung",
        "Blutzuckermanagement",
        "Unterstützt langfristiges Gewichtsmanagement",
        "Kann das Risiko adipositasbedingter Erkrankungen senken",
      ],
      badge: "Neu",
    },
    "novadose-nad": {
      subtitle: "Jugend in Ihren Händen",
      categoryLabel: "NovaDose System",
      description:
        "NovaDose liefert pharmazeutisches NAD+ über ein innovatives kartuschenbasiertes Pen-System. Entwickelt für präzise tägliche Mikrodosierung, unterstützt es zelluläre Energie, Stoffwechseleffizienz und natürliche Reparatur. Erschwinglicher und nachhaltiger als IV-Therapie.",
      benefits: [
        "Pharmazeutisches NAD+ aus Korea",
        "Präzise tägliche Mikrodosierung",
        "Nahezu 100% Bioverfügbarkeit",
        "Unterstützt zelluläre Energie und Klarheit",
        "Verbessert Stimmung und körperliche Leistung",
        "Kostengünstiger als IV-Therapie",
        "GMP-zertifizierte Herstellung",
      ],
      badge: "Innovation",
    },
  },

  categoryNames: {
    "peptide-pen": "Peptide Pen System",
    "medit-pen": "MediT Pen",
    novadose: "NovaDose System",
  },

  categoryDescriptions: {
    "peptide-pen":
      "Wiederverwendbare Mehrfachdosis-Pens mit 30-Tage-Präzisionsdosierung. 8 Forschungspeptide verfügbar.",
    "medit-pen":
      "Vorgefüllter Einweg-Injektionspen zur wöchentlichen Anwendung. Tirzepatide 40mg für metabolische Forschung.",
    novadose:
      "Fortschrittliches NAD+-Kartuschen-Verabreichungssystem für tägliche Präzisions-Mikrodosierung.",
  },

  researchCategories: {
    recovery: "Erholung und Heilung",
    "weight-loss": "Gewichtsverlust",
    "anti-aging": "Anti-Aging",
    "muscle-growth": "Muskelaufbau",
    "skin-rejuvenation": "Hautverjüngung",
    "sleep-quality": "Schlaf und Erholung",
    "gut-health": "Darmgesundheit",
    "joint-health": "Gelenke und Sehnen",
    "hair-growth": "Haarwachstum",
    "immune-support": "Immununterstützung",
    "tendon-repair": "Sehnenreparatur",
    "sports-recovery": "Sporterholung",
    "post-surgery": "Nach der Operation",
    "cognitive-enhancement": "Kognitive Verbesserung",
    "energy-vitality": "Energie und Vitalität",
    "detox-cleanse": "Entgiftung und Reinigung",
    "body-composition": "Körperzusammensetzung",
    inflammation: "Entzündung und Schmerzen",
    "hormonal-balance": "Hormonelles Gleichgewicht",
    "longevity-biohacking": "Langlebigkeit und Biohacking",
  },

  breadcrumbs: {
    home: "Startseite",
    products: "Produkte",
    about: "Über Uns",
    science: "Wissenschaft",
    contact: "Kontakt",
    learn: "Lernen",
    quality: "Qualität",
    faq: "FAQ",
    compare: "Vergleichen",
    shipping: "Versand",
    whyOryn: "Warum ORYN",
    terms: "AGB",
    privacy: "Datenschutz",
    disclaimer: "Haftungsausschluss",
    cart: "Warenkorb",
    checkout: "Kasse",
    account: "Konto",
    orders: "Bestellungen",
    referrals: "Empfehlungen",
    wishlist: "Wunschliste",
    profile: "Profil",
    wholesale: "Großhandel",
    bundles: "Pakete",
    protocols: "Protokolle",
    peptides: "Peptide",
    peptidePens: "Peptid-Pens",
    europe: "Europa",
    glossary: "Glossar",
    london: "London",
    encyclopedia: "Enzyklopädie",
    ukPeptideDelivery: "UK Peptid-Lieferung",
    tools: "Tools",
    peptideCalculator: "Peptid-Rechner",
  },

  homeSeo: {
    deliveryTitle: "PEPTID-LIEFERUNG IN GANZ EUROPA",
    researchAreaTitle: "PEPTIDE NACH FORSCHUNGSBEREICH",
    researchHubTitle: "FORSCHUNGSZENTRUM",
    peptidesFor: "Peptide für",
  },

  testimonials: {
    label: "VON FORSCHERN VERTRAUT",
    titleLine1: "Was unsere",
    titleLine2: "Kunden sagen",
    items: [
      {
        quote: "Die Reinheit und Konsistenz der ORYN-Peptide ist unübertroffen. Das Pen-System macht die Dosierung für unsere Laborprotokolle unglaublich präzise und zuverlässig.",
        name: "Dr. M. Richter",
        role: "Forschungsleiter, München",
      },
      {
        quote: "Wir sind vor sechs Monaten zu ORYN gewechselt. Die COA-Dokumentation, Chargenrückverfolgbarkeit und GMP-Zertifizierung geben uns vollstes Vertrauen bei jeder Bestellung.",
        name: "Dr. S. Lindberg",
        role: "Klinischer Forscher, Stockholm",
      },
      {
        quote: "Hervorragende Produktqualität und schneller EU-Versand. Das NovaDose-System ist ein Durchbruch für unsere NAD+-Forschung. Sehr empfehlenswert für jedes seriöse Labor.",
        name: "Prof. J. Torres",
        role: "Biotech-Laborleiter, Barcelona",
      },
    ],
    stats: [
      { value: "2.400+", label: "BESTELLUNGEN VERSENDET" },
      { value: "98%", label: "NACHBESTELLRATE" },
      { value: "4.9/5", label: "ZUFRIEDENHEIT" },
      { value: "24h", label: "ANTWORTZEIT" },
    ],
  },

  localeSwitcher: {
    label: "Markt",
    uk: "UK (€)",
    eu: "EU (€)",
  },

  wishlistPage: {
    title: "Wunschliste",
    breadcrumb: "WUNSCHLISTE",
    empty: "Ihre Wunschliste ist leer",
    emptyTitle: "Noch keine gespeicherten Artikel",
    emptyDescription: "Durchsuchen Sie unsere Produkte und klicken Sie auf das Herz-Symbol, um Artikel für später zu speichern.",
    browseProducts: "PRODUKTE DURCHSUCHEN",
    itemsSaved: "Artikel gespeichert",
    itemSaved: "Artikel gespeichert",
  },

  faq: {
    title: "Häufig gestellte Fragen",
    label: "FAQ",
  },

  contactFaq: {
    title: "BEVOR SIE UNS KONTAKTIEREN",
    items: [
      { q: "Wie lange dauert die Lieferung?", a: "UK-Bestellungen: 2-4 Werktage. Europa: 3-7 Werktage. Alle Bestellungen werden in diskreter, temperaturkontrollierter Verpackung versendet." },
      { q: "Kann ich meine Bestellung verfolgen?", a: "Ja! Nach dem Versand erhalten Sie eine Sendungsverfolgungsnummer per E-Mail. Sie können Bestellungen auch in Ihrem Konto-Dashboard verfolgen." },
      { q: "Wie lautet Ihre Rückgaberichtlinie?", a: "Wir bieten eine 30-Tage-Geld-zurück-Garantie für ungeöffnete Produkte. Kontaktieren Sie uns unter info@orynlabs.com, um eine Rücksendung einzuleiten." },
      { q: "Bieten Sie Großhandelspreise an?", a: "Ja, kontaktieren Sie wholesale@orynlabs.com für Mengenpreise. Wir bieten gestaffelte Rabatte für Forschungseinrichtungen und Wiederverkäufer." },
    ],
  },

  homeFaq: {
    items: [
      { q: "Was sind ORYN Peptide Pens?", a: "ORYN Peptide Pens sind vorgemischte, sofort einsatzbereite Forschungspeptid-Verabreichungssysteme. Jeder Pen enthält Peptide in pharmazeutischer Qualität mit >99% Reinheit, hergestellt in unserer ISO-7-Reinraumanlage. Das Pen-Format macht die Rekonstitution überflüssig und gewährleistet eine konsistente Dosierung für Forschungsanwendungen." },
      { q: "Sind Peptide in Deutschland und Europa legal?", a: "Ja, Forschungspeptide können in Deutschland und in ganz Europa für Forschungszwecke legal erworben werden. ORYN Peptide werden ausschließlich für die In-vitro-Forschung und den Laborgebrauch verkauft. Sie sind nicht zum menschlichen Verzehr bestimmt." },
      { q: "Wie werden Ihre Peptide hergestellt?", a: "Alle ORYN-Peptide werden in unserem GMP-zertifizierten ISO-7-Reinraumlabor in Europa synthetisiert. Jede Charge wird mittels HPLC und Massenspektrometrie auf >99% Reinheit geprüft. Ein Analysezertifikat (COA) ist bei jeder Bestellung enthalten." },
      { q: "Wie lange dauert die Lieferung?", a: "UK-Bestellungen kommen in der Regel innerhalb von 2-4 Werktagen an. Europäische Bestellungen dauern je nach Zielort 3-7 Werktage. Alle Bestellungen werden in diskreter, temperaturkontrollierter Verpackung versendet. Bestellungen über 150€ qualifizieren sich für kostenlosen Versand." },
      { q: "Was ist das ORYN-Empfehlungsprogramm?", a: "Unser mehrstufiges Empfehlungsprogramm ermöglicht es Ihnen, 10% Provision auf Einkäufe zu verdienen, die von empfohlenen Kollegen getätigt werden. Sie verdienen außerdem Provisionen bis zu 5 Ebenen tief, wenn Ihr Netzwerk wächst. Melden Sie sich für ein kostenloses Konto an, um Ihren einzigartigen Empfehlungscode zu erhalten." },
      { q: "Bieten Sie Mengen- oder Großhandelspreise an?", a: "Ja, wir bieten Mengenrabatte ab 3+ Einheiten an. Je mehr Sie bestellen, desto größer der Rabatt — bis zu 15% auf große Forschungsbestellungen. Kontaktieren Sie uns für individuelle Großhandelspreise bei Sammelbestellungen." },
    ],
  },

  shippingFaq: {
    items: [
      { q: "Wie lange dauert die Lieferung von Peptiden in Deutschland?", a: "Die Lieferzeiten in Deutschland hängen von Ihrem Standort ab. Berlin, München und Hamburg erhalten Bestellungen in 1-2 Werktagen, andere Großstädte in 2-3 Werktagen und ländliche Gebiete in 3-4 Werktagen. Alle Bestellungen, die vor 14 Uhr aufgegeben werden, werden noch am selben Tag versandt." },
      { q: "Wird die Peptid-Lieferung temperaturkontrolliert?", a: "Ja. Alle ORYN-Peptidsendungen werden in isolierten Kartons mit Gel-Kühlelementen verpackt, um während des Transports eine Temperatur von 2-8 Grad Celsius aufrechtzuerhalten. In den Sommermonaten (Juni-September) fügen wir zusätzlichen Kühlkettenschutz hinzu, einschließlich extra Kühlelemente und isolierende Einlagen, um die Produktintegrität zu gewährleisten." },
      { q: "Wie qualifiziere ich mich für kostenlosen Versand?", a: "Kostenloser Standardversand ist für alle Bestellungen über 150 Euro verfügbar. Dieser Schwellenwert gilt für den Bestellwert vor der Anwendung von Rabattcodes. Internationale Bestellungen nach Europa unterliegen einer pauschalen Versandgebühr unabhängig vom Bestellwert. Ihr Warenkorb zeigt einen Fortschrittsbalken an, der angibt, wie nah Sie am Schwellenwert für kostenlosen Versand sind." },
      { q: "Versenden Sie Peptide international nach Europa?", a: "Ja, ORYN liefert in die meisten Länder der Europäischen Union. Die europäische Lieferung dauert je nach Bestimmungsland in der Regel 3-7 Werktage. Alle internationalen Sendungen enthalten temperaturkontrollierte Verpackungen und vollständige Sendungsverfolgung. Zollgebühren und Einfuhrsteuern gehen zu Lasten des Kunden." },
      { q: "Wie wird meine Peptidbestellung verpackt?", a: "Alle ORYN-Bestellungen werden in schlichten, unmarkierten Kartons ohne Produktbeschreibungen oder Markierungen außen versandt. Im Inneren sind die Peptid-Pens in maßgefertigten Schaumstoffeinlagen innerhalb eines isolierten Behälters mit Gel-Kühlelementen gesichert. Ein Lieferschein und das Analysezertifikat sind in der Kartonage enthalten." },
      { q: "Kann ich meine Peptidbestellung verfolgen?", a: "Ja. Alle Bestellungen erhalten innerhalb von 2 Stunden nach dem Versand eine Sendungsverfolgungsnummer per E-Mail. Sie können Ihre Sendung in Echtzeit über das Portal unseres Kurierpartners verfolgen. Für Großbestellungen von 10+ Einheiten bieten wir erweiterte Sendungsverfolgung mit geschätzten Lieferfenstern und Lieferbestätigung mit Unterschrift an." },
    ],
  },

  qualityFaq: {
    items: [
      { q: "Was ist ein Analysezertifikat (COA)?", a: "Ein Analysezertifikat ist ein Dokument, das von einem qualifizierten Prüflabor ausgestellt wird und die Identität, Reinheit und Zusammensetzung eines Peptidprodukts bestätigt. Jedes ORYN COA enthält HPLC-Reinheitsdaten, Identitätsbestätigung per Massenspektrometrie, Ergebnisse der Endotoxintests, Sterilitätsverifizierung und chargenspezifische Herstellungsdetails." },
      { q: "Wie lese ich ein HPLC-Reinheitsergebnis?", a: "HPLC-Ergebnisse (Hochleistungsflüssigkeitschromatographie) zeigen ein Chromatogramm mit Peaks, die verschiedene Komponenten darstellen. Der Prozentsatz der Hauptpeakfläche zeigt die Reinheit an — zum Beispiel bedeutet 99,2%, dass 99,2% des detektierten Materials das Zielpeptid ist. Alle ORYN-Peptide erreichen konsistent mehr als 98% Reinheit, wobei die meisten Chargen 99% überschreiten." },
      { q: "Wer führt Ihre Drittparteitests durch?", a: "ORYN-Peptide werden von unabhängigen, nach ISO 17025 akkreditierten Analyselaboren getestet. Diese Labore arbeiten unabhängig von unseren Produktionsanlagen und gewährleisten eine unvoreingenommene Überprüfung von Reinheit, Identität und Sterilität für jede von uns produzierte Charge." },
      { q: "Wie häufig werden ORYN-Peptide getestet?", a: "Jede einzelne Charge jedes ORYN-Produkts wird vor der Freigabe getestet. Wir betreiben ein strenges Chargenfreigabeprotokoll: Kein Produkt verlässt unsere Anlage ohne ein bestandenes Analysezertifikat eines unabhängigen Labors. Die Tests umfassen HPLC-Reinheitsanalyse, Identitätsbestätigung per Massenspektrometrie, Endotoxin-Screening und Sterilitätsverifizierung." },
      { q: "Welche Reinheitsstandards erfüllen ORYN-Peptide?", a: "Alle ORYN-Peptide werden so hergestellt, dass sie 98% Reinheit überschreiten, wobei die meisten Chargen mehr als 99% erreichen. Dies wird durch unabhängige HPLC-Tests verifiziert und per Massenspektrometrie bestätigt. Unsere Produktionsanlagen sind GMP-zertifiziert und arbeiten unter ISO 9001-Qualitätsmanagementsystemen in ISO 7-Reinraumumgebungen." },
      { q: "Kann ich ein COA für meine spezifische Charge anfordern?", a: "Ja. Jedes ORYN-Produkt wird mit einer auf der Verpackung aufgedruckten Chargennummer geliefert. Sie können das spezifische COA für Ihre Charge anfordern, indem Sie unser Support-Team unter info@orynpeptides.com mit Ihrer Chargennummer kontaktieren. Wir führen vollständige Rückverfolgbarkeitsaufzeichnungen für jede hergestellte Charge." },
    ],
  },

  wholesaleFaq: {
    items: [
      { q: "Welche Mindestbestellmenge gilt für Großhandelspreise?", a: "Unsere Großhandelspreisstaffelung beginnt bereits ab 3 Einheiten. Bestellungen von 3-5 Einheiten erhalten 5% Rabatt, 6-9 Einheiten erhalten 10% Rabatt, und 10 oder mehr Einheiten erhalten 15% Rabatt auf den Einzelhandelspreis. Für Bestellungen von 50+ Einheiten bieten wir maßgeschneiderte Angebote an." },
      { q: "Wie funktionieren Großhandelspreise bei ORYN?", a: "Die ORYN-Großhandelspreise basieren auf Mengenrabattstaffeln, die auf unsere Standard-Einzelhandelspreise angewendet werden. Rabatte werden beim Checkout für qualifizierende Bestellungen automatisch berechnet. Sie können beliebige Produkte aus unseren Peptide Pen-, MediT Pen- und NovaDose-Sortimenten kombinieren, um Ihre Staffel zu erreichen. Für laufende Lieferverträge wenden Sie sich an unser Großhandelsteam." },
      { q: "Wie richte ich ein Großhandelskonto ein?", a: "Das Einrichten eines Großhandelskontos ist unkompliziert. Kontaktieren Sie unser Team unter info@orynpeptides.com oder nutzen Sie das Großhandelsanfrageformular auf unserer Kontaktseite. Wir überprüfen Ihre Organisationsdaten, weisen einen dedizierten Kundenbetreuer zu und aktivieren die Mengenpreisgestaltung auf Ihrem Konto innerhalb von 1-2 Werktagen." },
      { q: "Welche Zahlungsbedingungen stehen Großhandelskunden zur Verfügung?", a: "Standard-Großhandelsbestellungen sind per Banküberweisung, Kreditkarte oder Bestellschein (für genehmigte Konten) zahlbar. Wir bieten NET-30-Zahlungsbedingungen für etablierte Großhandelskunden mit nachgewiesener Handelserfahrung an. Alle Erstbestellungen sind im Voraus zu bezahlen. Kontaktieren Sie unser Team zur Erörterung von Zahlungsvereinbarungen für Großmengenverträge." },
      { q: "Welche Lieferzeiten gelten für Großbestellungen von Peptiden?", a: "Großhandelsbestellungen werden innerhalb von 1-2 Werktagen aus unserem Distributionszentrum versandt. Die Standardlieferung dauert 2-4 Werktage. Für große Bestellungen (50+ Einheiten) benötigen wir möglicherweise bis zu 5 Werktage für die Vorbereitung. Alle Großhandelssendungen beinhalten ohne Aufpreis temperaturkontrollierte Verpackung mit vollständiger Sendungsverfolgung." },
    ],
  },

  account: {
    nav: {
      dashboard: "Übersicht",
      orders: "Bestellungen",
      referrals: "Empfehlungen",
      wishlist: "Wunschliste",
      profile: "Profil",
      signOut: "Abmelden",
    },
    dashboard: {
      welcome: "Willkommen zurück,",
      subtitle: "Verwalten Sie Ihre Bestellungen, verfolgen Sie Sendungen und aktualisieren Sie Ihre Kontodaten.",
      yourOrders: "Ihre Bestellungen",
      yourOrdersDesc: "Bestellhistorie einsehen und Sendungen verfolgen",
      profileSettings: "Profileinstellungen",
      profileSettingsDesc: "Persönliche Informationen aktualisieren",
      shopPeptides: "Peptide kaufen",
      shopPeptidesDesc: "Durchsuchen Sie unseren Forschungskatalog",
      orynRewards: "ORYN Prämien",
      earnPoints: "Sammeln Sie 1 Punkt pro 1€ Einkauf",
      points: "PUNKTE",
      tier: "STUFE",
      member: "Mitglied",
      nextReward: "NÄCHSTE PRÄMIE",
      nextRewardValue: "10€ Rabatt ab 500 Pkt.",
      multiplier: "MULTIPLIKATOR",
      multiplierValue: "1x",
      inviteEarn: "Einladen & Verdienen",
      viewDashboard: "ÜBERSICHT ANZEIGEN",
      inviteDescription: "Verdienen Sie 10% Provision, wenn Kollegen mit Ihrem Code bestellen. Dazu Provisionen bis zu 5 Ebenen tief.",
      copyCode: "CODE KOPIEREN",
      copyLink: "LINK KOPIEREN",
      share: "TEILEN:",
      accountBenefits: "KONTOVORTEILE",
      benefits: [
        { title: "Sendungsverfolgung", desc: "Echtzeit-Updates zu allen Ihren Sendungen" },
        { title: "Bestellhistorie", desc: "Vollständige Historie mit Nachbestellmöglichkeit" },
        { title: "Empfehlungsverdienste", desc: "Provisionen durch Empfehlungen verdienen" },
        { title: "Bevorzugter Support", desc: "Kontoinhaber erhalten schnellere Antworten" },
      ],
    },
    login: {
      title: "Willkommen zurück",
      subtitle: "Melden Sie sich in Ihrem ORYN-Konto an",
      email: "E-MAIL",
      password: "PASSWORT",
      emailPlaceholder: "ihre@email.com",
      passwordPlaceholder: "Passwort eingeben",
      signingIn: "ANMELDUNG...",
      signIn: "ANMELDEN",
      noAccount: "Noch kein Konto?",
      createOne: "Konto erstellen",
      continueWithout: "Ohne Konto weiter einkaufen",
      loginFailed: "Anmeldung fehlgeschlagen",
    },
    register: {
      title: "Konto erstellen",
      subtitle: "Registrieren Sie sich bei ORYN für Bestellverfolgung, exklusive Angebote und mehr",
      firstName: "VORNAME *",
      lastName: "NACHNAME *",
      email: "E-MAIL *",
      emailPlaceholder: "ihre@email.com",
      password: "PASSWORT *",
      passwordPlaceholder: "Mindestens 8 Zeichen",
      confirmPassword: "PASSWORT BESTÄTIGEN *",
      organization: "ORGANISATION",
      organizationPlaceholder: "Labor, Universität, Unternehmen...",
      referralCode: "EMPFEHLUNGSCODE",
      referralCodePlaceholder: "Optional",
      creating: "KONTO WIRD ERSTELLT...",
      createAccount: "KONTO ERSTELLEN",
      termsPrefix: "Mit der Kontoerstellung stimmen Sie den",
      termsOfService: "Allgemeinen Geschäftsbedingungen",
      and: "und der",
      privacyPolicy: "Datenschutzrichtlinie",
      hasAccount: "Bereits ein Konto?",
      signIn: "Anmelden",
      passwordsMismatch: "Passwörter stimmen nicht überein",
      passwordTooShort: "Passwort muss mindestens 8 Zeichen lang sein",
      registrationFailed: "Registrierung fehlgeschlagen",
    },
    profile: {
      title: "Profileinstellungen",
      subtitle: "Verwalten Sie Ihre Kontoinformationen",
      personalInfo: "PERSÖNLICHE INFORMATIONEN",
      firstName: "VORNAME",
      lastName: "NACHNAME",
      email: "E-MAIL",
      emailNotChangeable: "E-Mail kann nicht geändert werden",
      referralCode: "EMPFEHLUNGSCODE",
      saveChanges: "ÄNDERUNGEN SPEICHERN",
      saved: "Gespeichert",
      changePassword: "PASSWORT ÄNDERN",
      currentPassword: "AKTUELLES PASSWORT",
      newPassword: "NEUES PASSWORT",
      newPasswordPlaceholder: "Mindestens 8 Zeichen",
      confirmNewPassword: "NEUES PASSWORT BESTÄTIGEN",
      updatePassword: "PASSWORT AKTUALISIEREN",
      passwordUpdated: "Passwort aktualisiert",
      passwordsMismatch: "Passwörter stimmen nicht überein",
      passwordTooShort: "Passwort muss mindestens 8 Zeichen lang sein",
    },
    orders: {
      title: "Ihre Bestellungen",
      subtitle: "Verfolgen und verwalten Sie alle Ihre ORYN-Bestellungen",
      noOrders: "Noch keine Bestellungen",
      noOrdersDesc: "Ihre Bestellhistorie erscheint hier, sobald Sie Ihren ersten Einkauf tätigen.",
      browseProducts: "PRODUKTE DURCHSUCHEN",
      addedToCart: "IN DEN WARENKORB GELEGT ✓",
      reorder: "NACHBESTELLEN",
      items: "Artikel",
      item: "Artikel",
    },
    orderDetail: {
      notFound: "Bestellung nicht gefunden",
      backToOrders: "Zurück zu Bestellungen",
      ordersBreadcrumb: "Bestellungen",
      orderTitle: "Bestellung",
      placedOn: "Aufgegeben am",
      print: "DRUCKEN",
      orderTracking: "BESTELLVERFOLGUNG",
      pending: "Ausstehend",
      processing: "In Bearbeitung",
      shipped: "Versendet",
      delivered: "Zugestellt",
      cancelled: "Storniert",
      orderItems: "BESTELLTE ARTIKEL",
      qty: "Anz.:",
      subtotal: "Zwischensumme",
      shipping: "Versand",
      free: "KOSTENLOS",
      discount: "Rabatt",
      total: "Gesamt",
      shippingAddress: "LIEFERADRESSE",
      shippingNotAvailable: "Versanddetails nicht verfügbar",
      payment: "ZAHLUNG",
      method: "Methode",
      status: "Status",
      addedToCart: "IN DEN WARENKORB GELEGT",
      reorderAll: "ALLE ARTIKEL NACHBESTELLEN",
      needHelp: "Hilfe benötigt?",
      needHelpDesc: "Bei Fragen zu Ihrer Bestellung kontaktieren Sie uns unter",
      },
    referrals: {
      title: "Empfehlungsprogramm",
      subtitle: "Teilen Sie ORYN mit Kollegen und verdienen Sie Provisionen bei jeder Bestellung.",
      yourCode: "IHR EMPFEHLUNGSCODE",
      copied: "KOPIERT!",
      copyCode: "CODE KOPIEREN",
      yourLink: "IHR EMPFEHLUNGSLINK",
      copyLink: "LINK KOPIEREN",
      shareVia: "TEILEN ÜBER:",
      whatsapp: "WhatsApp",
      email: "E-Mail",
      directReferrals: "DIREKTE EMPFEHLUNGEN",
      networkSize: "NETZWERKGRÖSSE",
      totalEarned: "GESAMT VERDIENT",
      available: "VERFÜGBAR",
      earningsByLevel: "EINNAHMEN NACH EBENE",
      levelLabel: "Ebene",
      commission: "Provision",
      ordersLabel: "Bestellungen",
      pending: "AUSSTEHEND",
      approved: "GENEHMIGT",
      paidOut: "AUSGEZAHLT",
      yourReferrals: "IHRE EMPFEHLUNGEN",
      commissionHistory: "PROVISIONSHISTORIE",
      tableOrder: "BESTELLUNG",
      tableLevel: "EBENE",
      tableRate: "SATZ",
      tableAmount: "BETRAG",
      tableStatus: "STATUS",
      tableDate: "DATUM",
      howItWorks: "SO FUNKTIONIERT ES",
      steps: [
        { title: "Teilen Sie Ihren Code", desc: "Senden Sie Ihren einzigartigen Empfehlungscode oder -link an Kollegen und Mitforscher." },
        { title: "Sie bestellen", desc: "Wenn sie sich mit Ihrem Code registrieren und eine Bestellung aufgeben, verdienen Sie Provision." },
        { title: "Prämien verdienen", desc: "Verdienen Sie 10% bei direkten Empfehlungen, plus Provisionen auf deren Empfehlungen bis zu 5 Ebenen tief." },
      ],
      whatsappShareText: "Entdecken Sie ORYN Peptides — Präzisions-Forschungspeptide aus einem europäischen Biotech-Labor. Verwenden Sie meinen Code {code} bei Ihrer ersten Bestellung: {link}",
      emailShareSubject: "ORYN Peptides — Präzisions-Forschungspeptide",
      emailShareBody: "Hallo,\n\nIch wollte ORYN Peptides mit Ihnen teilen. Sie produzieren pharmazeutische Forschungspeptide mit >99% Reinheit.\n\nVerwenden Sie meinen Empfehlungscode: {code}\n\nOder klicken Sie hier: {link}\n\nMit freundlichen Grüßen",
    },
    wishlist: {
      title: "Wunschliste",
      itemsSaved: "Artikel gespeichert",
      itemSaved: "Artikel gespeichert",
      empty: "Ihre Wunschliste ist leer",
      emptyDesc: "Speichern Sie Produkte, die Sie interessieren, für später.",
      browseProducts: "PRODUKTE DURCHSUCHEN",
      addToCart: "IN DEN WARENKORB",
      remove: "ENTFERNEN",
    },
    savedAddresses: {
      title: "GESPEICHERTE ADRESSEN",
      cancel: "ABBRECHEN",
      addAddress: "+ ADRESSE HINZUFÜGEN",
      labelField: "BEZEICHNUNG (z.B. Zuhause, Büro)",
      labelPlaceholder: "Zuhause",
      firstName: "VORNAME",
      lastName: "NACHNAME",
      address: "ADRESSE",
      city: "STADT",
      postcode: "POSTLEITZAHL",
      country: "LAND",
      phone: "TELEFON",
      setAsDefault: "Als Standardadresse festlegen",
      saveAddress: "ADRESSE SPEICHERN",
      noAddresses: "Keine gespeicherten Adressen. Fügen Sie eine hinzu für schnelleren Checkout.",
      default: "STANDARD",
      setDefault: "ALS STANDARD",
      remove: "ENTFERNEN",
      countries: {
        GB: "Vereinigtes Königreich",
        ES: "Spanien",
        IE: "Irland",
        DE: "Deutschland",
        FR: "Frankreich",
        NL: "Niederlande",
      },
    },
  },

  cookie: {
    message:
      "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und für wesentliche Website-Funktionen. Durch die weitere Nutzung stimmen Sie unserer",
    privacyPolicy: "Datenschutzrichtlinie",
    acceptAll: "ALLE AKZEPTIEREN",
    essentialOnly: "NUR ESSENZIELLE",
  },

  toast: {
    addedToCart: "IN DEN WARENKORB GELEGT",
  },

  popups: {
    firstVisit: {
      discount: "10%",
      yourFirstOrder: "AUF IHRE ERSTE BESTELLUNG",
      code: "WELCOME10",
      tagline: "WILLKOMMEN BEI ORYN",
      title: "Präzisions-Peptid-Wissenschaft",
      description:
        "Europäisches Biotech-Labor mit >99% Reinheit Forschungspeptiden in Präzisions-Pen-Systemen. Verwenden Sie den Code WELCOME10 bei Ihrer ersten Bestellung.",
      benefits: [
        "Kostenloser Versand ab 150€",
        "GMP-zertifizierte Herstellung",
        "Analysezertifikat inklusive",
      ],
      shopNow: "JETZT KAUFEN",
      noThanks: "Nein danke, ich schaue mich alleine um",
    },
    exitIntent: {
      tagline: "WARTEN SIE — BEVOR SIE GEHEN",
      title: "Erhalten Sie 10% auf Ihre erste Bestellung",
      description:
        "Schließen Sie sich Forschern weltweit an, die ORYN Präzisionspeptide verwenden. Geben Sie Ihre E-Mail ein, um Ihren exklusiven Rabattcode zu erhalten.",
      placeholder: "ihre@email.com",
      claimDiscount: "MEINEN 10% RABATT SICHERN",
      noSpam: "Kein Spam. Jederzeit abmelden.",
      welcomeTitle: "Willkommen bei ORYN!",
      welcomeMessage:
        "Verwenden Sie den Code WELCOME10 beim Checkout für 10% Rabatt.",
    },
  },

  payment: {
    processing: "WIRD VERARBEITET...",
    loadingPayment: "ZAHLUNG WIRD GELADEN...",
    completeOrder: "BESTELLUNG ABSCHLIESSEN",
    sslEncrypted: "SSL-VERSCHLÜSSELT",
    pciCompliant: "PCI-KONFORM",
    paymentFailed: "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    unexpectedError: "Ein unerwarteter Fehler ist aufgetreten.",
    notCompleted: "Zahlung wurde nicht abgeschlossen. Bitte versuchen Sie es erneut.",
    preparingPayment: "Sichere Zahlung wird vorbereitet...",
    paymentNotReady: "Das Zahlungssystem ist nicht bereit. Bitte versuchen Sie es erneut.",
    paymentFormLoading: "Das Zahlungsformular wird noch geladen. Bitte warten Sie einen Moment.",
    orderCreationFailed: "Zahlung verarbeitet, aber Bestellerstellung fehlgeschlagen. Bitte kontaktieren Sie den Support.",
  },

  volumeDiscount: {
    applied: "Mengenrabatt angewendet:",
    addMore: "Noch {count} Artikel hinzufügen für {percent}% RABATT",
    title: "MENGENRABATTE",
    items: "{count}+ Artikel",
    off: "{percent}% RABATT",
    active: "AKTIV",
    unlockMore: "Noch {count} Artikel hinzufügen, um {percent}% Rabatt freizuschalten!",
  },

  frequentlyBought: {
    title: "Häufig zusammen gekauft",
    save: "SPAREN SIE 10%",
    bundlePrice: "Paketpreis — sparen Sie {amount} mit dieser Kombination",
    addAll: "ALLE IN DEN WARENKORB",
  },

  recentlyViewed: {
    title: "Zuletzt angesehen",
  },

  orderBump: {
    addToOrder: "ZU IHRER BESTELLUNG HINZUFÜGEN",
    yesAddIt: "JA, HINZUFÜGEN",
  },

  aria: {
    search: "Suche",
    account: "Konto",
    wishlist: "Wunschliste",
    openCart: "Warenkorb öffnen",
    toggleMenu: "Menü umschalten",
    mobileMenu: "Mobiles Menü",
    backToTop: "Nach oben",
    cookieConsent: "Cookie-Einwilligung",
    shareWhatsApp: "Auf WhatsApp teilen",
    shareX: "Auf X teilen",
    shareFacebook: "Auf Facebook teilen",
    copyLink: "Link kopieren",
    switchLanguage: "Sprache wechseln",
    switchRegion: "Region wechseln",
    breadcrumb: "Brotkrumen",
    dismiss: "Schließen",
    close: "Schließen",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    email: "E-Mail",
    researchDisclaimer: "Forschungshinweis",
  },

  calculator: {
    interactiveTool: "INTERAKTIVES WERKZEUG",
    title: "Peptid-Rekonstitutionsrechner",
    description: "Geben Sie Ihre Peptidmenge, Wasservolumen und gewünschte Dosis ein, um Konzentration und Injektionsvolumen zu berechnen.",
    peptideAmount: "Peptidmenge",
    bacteriostaticWater: "Bakteriostatisches Wasservolumen",
    desiredDose: "Gewünschte Dosis Pro Injektion",
    customAmount: "Benutzerdefinierte Menge",
    customVolume: "Benutzerdefiniertes Volumen",
    customDose: "Benutzerdefinierte Dosis",
    concentration: "Konzentration",
    injectionVolume: "Injektionsvolumen",
    insulinSyringe: "Insulinspritze",
    totalDoses: "Gesamtdosen",
    mcgPerMl: "mcg / mL",
    mlPerDose: "mL pro Dosis",
    unitsIuMarks: "Einheiten (IU-Markierungen)",
    fromVial: "aus der Ampulle",
    units: "Einheiten",
    overHundredUnits: "> 100 Einheiten",
    zeroUnits: "0 Einheiten",
    ml: "mL",
    overOneMl: "> 1,0 mL (größere Spritze verwenden)",
    zeroMl: "0,000 mL",
    syringeLabel: "Insulinspritze (100 Einheiten = 1 mL)",
    warningNote: "Hinweis:",
    warningText: "Die berechnete Dosis überschreitet eine Standard-Insulinspritze mit 100 Einheiten (1 mL). Erwägen Sie, mehr bakteriostatisches Wasser hinzuzufügen, um das Volumen zu erhöhen, was die Konzentration senkt und das Injektionsvolumen pro Dosis reduziert.",
    enterValues: "Geben Sie oben gültige Werte ein, um Ihre berechneten Ergebnisse zu sehen.",
    quickReference: "Schnellreferenz",
    unitConversions: "Einheitenumrechnungen",
    standardSyringe: "Standardspritze",
    theFormula: "Die Formel",
    mgToMcg: "1 mg = 1.000 mcg",
    mlToUnits: "1 mL = 100 Insulineinheiten",
    u100Syringe: "U-100 Insulinspritze",
    hundredUnitsOneMl: "100 Einheiten = 1,0 mL",
    formulaLine1: "Dosis (mcg) / Konzentration (mcg/mL)",
    formulaLine2: "= Zu injizierendes Volumen (mL)",
  },

  whyOrynPage: {
    differentiators: [
      { title: "Vordosierte Peptid-Pens", description: "Im Gegensatz zu Wettbewerbern, die lose Ampullen mit erforderlicher Rekonstitution verkaufen, liefert ORYN vorgemischte, präzisionsdosierte Peptid-Pens, die sofort einsatzbereit sind. Kein Mischen, keine Berechnungen, kein Kontaminationsrisiko.", highlight: "Einzigartig auf dem UK-Markt" },
      { title: "HPLC-verifizierte Reinheit von 98%+", description: "Jede ORYN-Charge überschreitet 98% Reinheit, unabhängig verifiziert durch Hochleistungsflüssigkeitschromatographie und Massenspektrometrie. Die meisten UK-Wettbewerber bieten nur 95% oder ungeprüfte Behauptungen.", highlight: "Über Industriestandard" },
      { title: "GMP-Herstellung im UK", description: "Alle ORYN-Peptide werden in GMP-zertifizierten Einrichtungen gemäß pharmazeutischen Produktionsstandards hergestellt. Vollständige Chargenrückverfolgbarkeit vom Rohmaterial bis zum fertigen Produkt.", highlight: "Pharmazeutische Qualität" },
      { title: "Kostenloser UK-Versand ab €150", description: "Genießen Sie kostenlosen Express-Versand für alle UK-Bestellungen über €150. Temperaturkontrollierte Verpackung gewährleistet die Integrität der Peptide von unserer Einrichtung bis zu Ihrem Forschungslabor.", highlight: "Express-Lieferung" },
      { title: "Vollständiges COA mit jeder Bestellung", description: "Jede ORYN-Bestellung wird mit einem vollständigen Analysezertifikat geliefert, das Reinheit, Identität, Endotoxinspiegel und Sterilität bestätigt. Kein Warten, kein Anfragen — es ist standardmäßig enthalten.", highlight: "Transparenz garantiert" },
      { title: "ISO 7 Reinraumproduktion", description: "ORYN-Peptide werden in ISO 7 klassifizierten Reinräumen mit kontinuierlicher Umgebungsüberwachung abgefüllt und versiegelt. Dies übertrifft die Standards der meisten UK-Peptidlieferanten.", highlight: "Krankenhausqualität" },
    ],
    comparisonFeatures: [
      { feature: "Lieferformat", oryn: "Vordosiertes Pen-System", competitor: "Lose Ampullen (Rekonstitution erforderlich)" },
      { feature: "Reinheitsstandard", oryn: "98%+ HPLC & MS verifiziert", competitor: "95%+ (oft ungeprüft)" },
      { feature: "Testprotokoll", oryn: "HPLC + Massenspektrometrie + Endotoxin", competitor: "Nur Basis-HPLC" },
      { feature: "UK-Versand", oryn: "Kostenlos ab €150 (Express)", competitor: "Variiert (€5–€15)" },
      { feature: "COA enthalten", oryn: "Jede Charge, jede Bestellung", competitor: "Auf Anfrage (falls verfügbar)" },
      { feature: "Produktionsanlage", oryn: "ISO 7 Reinraum, GMP-zertifiziert", competitor: "Variiert (oft nicht angegeben)" },
      { feature: "Sterilität", oryn: "0,22 μm Filter + Gammastrahlung", competitor: "Nur Filtration" },
      { feature: "Haltbarkeit", oryn: "24 Monate (versiegelt)", competitor: "6–12 Monate" },
      { feature: "Kundensupport", oryn: "Spezialisiertes Forschungsteam", competitor: "Nur E-Mail" },
      { feature: "Produktpalette", oryn: "10 Peptide in 3 Verabreichungssystemen", competitor: "5–8 Peptide, nur Ampullen" },
    ],
    stats: [
      { value: "10", label: "Forschungspeptide", sublabel: "in 3 Verabreichungssystemen" },
      { value: "98%+", label: "Verifizierte Reinheit", sublabel: "HPLC + MS getestet" },
      { value: "ISO 7", label: "Reinraumstandard", sublabel: "pharmazeutische Qualität" },
      { value: "15+", label: "UK-Städte beliefert", sublabel: "Express-Lieferung" },
      { value: "40+", label: "Londoner Bezirke", sublabel: "Same-Day-Versand möglich" },
      { value: "24", label: "Monate Haltbarkeit", sublabel: "versiegelt, gekühlt" },
    ],
    tableOryn: "ORYN",
    tableCompetitors: "TYPISCHE UK-WETTBEWERBER",
    feature: "Merkmal",
    viewProducts: "UNSERE PRODUKTE ANSEHEN",
    ourNumbers: "UNSERE ZAHLEN",
    comparisonTitle: "Wie ORYN Sich Vergleicht",
    comparisonSubtitle: "Sehen Sie, wie ORYN im Vergleich zu typischen UK-Peptid-Anbietern abschneidet.",
  },

  wholesalePage: {
    breadcrumbHome: "STARTSEITE",
    breadcrumbWholesale: "GROSSHANDEL",
    heroBulkOrders: "GROßBESTELLUNGEN",
    heroTitle1: "Großhandel &",
    heroTitle2: "Massenbestellungen",
    heroDescription: "ORYN beliefert Universitäten, Laboratorien, Kliniken und Distributoren im Vereinigten Königreich und in Europa mit Peptid-Pen-Systemen in Forschungsqualität. Mengenrabatte von 5% bis 15% — mit individueller Preisgestaltung für Großverträge.",
    statMinOrderLabel: "Mindestbestellung",
    statMinOrderValue: "3 Einheiten",
    statMaxDiscountLabel: "Max. Rabatt",
    statMaxDiscountValue: "15% Rabatt",
    statPurityLabel: "Reinheit",
    statPurityValue: ">99%",
    statDispatchLabel: "UK-Versand",
    statDispatchValue: "Gleicher Tag",
    tiersLabel: "MENGENPREISE",
    tiersTitle1: "Rabatt-",
    tiersTitle2: "Stufen",
    tiersDescription: "Kombinieren Sie beliebige Produkte aus unserem gesamten Sortiment. Rabatte werden automatisch basierend auf der Gesamtstückzahl angewendet.",
    tierMostPopular: "AM BELIEBTESTEN",
    tierOffRetail: "AUF DEN LISTENPREIS",
    tierPricing: "PREIS",
    tierLabelStarter: "EINSTEIGER",
    tierLabelProfessional: "PROFESSIONELL",
    tierLabelEnterprise: "UNTERNEHMEN",
    tierLabelCustom: "INDIVIDUALANGEBOT",
    benefitsLabel: "GROSSHANDELSVORTEILE",
    benefitsTitle1: "Warum Mit",
    benefitsTitle2: "ORYN Zusammenarbeiten",
    benefitsDescription: "Über die Mengenpreise hinaus erschließen ORYN-Großhandelskonten eine Reihe von Diensten für professionelle Käufer.",
    benefitAccountManagerTitle: "Dedizierter Kundenbetreuer",
    benefitAccountManagerDesc: "Ein einziger Ansprechpartner für Bestellungen, Preise und technische Anfragen. Ihr Kundenbetreuer versteht Ihre Bedürfnisse.",
    benefitShippingTitle: "Prioritätsversand",
    benefitShippingDesc: "Großhandelsbestellungen werden am gleichen Tag versendet, wenn sie vor 14 Uhr aufgegeben werden. Temperaturkontrollierte Verpackung ohne Aufpreis inklusive.",
    benefitVolumePricingTitle: "Mengenpreise",
    benefitVolumePricingDesc: "Automatische Rabatte von 5% bis 15% basierend auf der Bestellmenge. Individuelle Preisgestaltung für laufende Verträge verfügbar.",
    benefitCOATitle: "COA Inklusive",
    benefitCOADesc: "Jede Großhandelslieferung enthält chargenspezifische Analysezertifikate. Vollständige Rückverfolgbarkeit von der Synthese bis zur Lieferung.",
    benefitCustomLabellingTitle: "Individuelle Etikettierung",
    benefitCustomLabellingDesc: "White-Label und individuelle Verpackung für Distributoren und Kliniken verfügbar. Mindestbestellung 50 Einheiten für individuelle Etiketten.",
    benefitTechSupportTitle: "Technischer Support",
    benefitTechSupportDesc: "Zugang zu unserem Peptidwissenschaftsteam für Protokollführung, Lagerempfehlungen und Produktspezifikationen.",
    whoWeServeLabel: "UNSERE KUNDEN",
    whoWeServeTitle1: "Wen Wir",
    whoWeServeTitle2: "Bedienen",
    whoWeServeDescription: "ORYN-Großhandelspeptide werden von Forschungsprofis und Organisationen im Vereinigten Königreich und Europa vertraut.",
    customerUniversitiesTitle: "Universitäten & Hochschulen",
    customerUniversitiesDesc: "Forschungsabteilungen und postgraduale Programme, die Peptidbiology, Pharmakologie und regenerative Medizin studieren.",
    customerResearchLabsTitle: "Forschungslaboratorien",
    customerResearchLabsDesc: "Private und öffentliche Forschungslabore, die In-vitro- und In-vivo-Studien mit Peptidverbindungen in Forschungsqualität durchführen.",
    customerPharmaTitle: "Pharmaunternehmen",
    customerPharmaDesc: "Pharmazeutische F&E-Abteilungen, die Referenzstandard-Peptide für die Arzneimittelentwicklung und analytische Vergleichsstudien verwenden.",
    customerClinicsTitle: "Kliniken & Arztpraxen",
    customerClinicsDesc: "Kliniken für integrative Medizin und Praktiker, die eine konsistente Versorgung mit hochreinen Peptiden für die klinische Forschung benötigen.",
    customerDistributorsTitle: "Distributoren & Wiederverkäufer",
    customerDistributorsDesc: "Großhandelspartner, die ORYN-Produkte im Vereinigten Königreich und Europa vertreiben. White-Label-Optionen verfügbar.",
    customerBiotechTitle: "Biotech-Startups",
    customerBiotechDesc: "Aufstrebende Biotechnologieunternehmen, die eine zuverlässige Peptidversorgung für die Produktentwicklung und Proof-of-Concept-Studien benötigen.",
    productsLabel: "BEISPIELE FÜR GROSSHANDELSPREISE",
    productsTitle1: "Produkte zu",
    productsTitle2: "Großhandelspreisen",
    productsDescription: "Sehen Sie, wie Mengenpreise Ihre Kosten pro Einheit senken. Alle ORYN-Produkte sind für Großhandelsrabatte berechtigt.",
    productRetailLabel: "LISTENPREIS",
    productViewAll: "ALLE {count} PRODUKTE ANSEHEN",
    faqLabel: "FAQ",
    faqTitle1: "Großhandels-",
    faqTitle2: "FAQ",
    faqDescription: "Häufige Fragen zu unserem Großhandelsprogramm, Preisen und Kontoeinrichtung.",
    ctaTitle: "Bereit für Großbestellungen?",
    ctaDescription: "Kontaktieren Sie unser Großhandelsteam, um Ihr Konto einzurichten, individuelle Preise zu besprechen und bei Peptid-Pens in Forschungsqualität zu sparen.",
    ctaEnquiry: "GROSSHANDELSANFRAGE",
    ctaBrowseProducts: "PRODUKTE ANSEHEN",
  },

  share: {
    label: "TEILEN",
  },

  socialProof: {
    from: "aus",
    purchased: "hat gekauft",
    minAgo: "vor {min} Min.",
  },

  flashSale: {
    flash: "Flash Sale — Code FLASH15 für 15% Rabatt auf alle Peptide Pens",
    weekend: "Wochenendangebot — Code WEEKEND10 für 10% Rabatt",
  },

  qualityPage: {
    breadcrumbHome: "STARTSEITE",
    breadcrumbQuality: "QUALITÄT & ANALYTIK",
    heroBadge: "VON DRITTEN VERIFIZIERT",
    heroTitle1: "Transparenz in",
    heroTitle2: "Jedem Batch",
    heroDescription:
      "Jedes ORYN-Peptid wird unabhängig von ISO-akkreditierten Laboren getestet. Wir veröffentlichen Analysezertifikate für jedes Produkt, denn wir glauben, dass Sie genau sehen sollten, was Sie erhalten — Reinheit, Identität und Sterilität, von der Wissenschaft bestätigt, nicht vom Marketing.",
    statPurityLabel: "BATCH-REINHEIT",
    statLabsLabel: "UNABHÄNGIGE LABORE",
    statTestsLabel: "TESTS PRO BATCH",
    statTraceabilityLabel: "RÜCKVERFOLGBARKEIT",
    processLabel: "UNSER PROZESS",
    processTitle1: "Von der Synthese zum",
    processTitle2: "Zertifikat",
    processDescription:
      "Eine strenge vierstufige Qualitätssicherungs-Pipeline stellt sicher, dass jedes ORYN-Peptid die höchsten Analysestandards vor der Freigabe erfüllt.",
    testingSteps: [
      {
        title: "Peptidsynthese",
        description:
          "Festphasen-Peptidsynthese (SPPS) in GMP-zertifizierten europäischen Einrichtungen unter ISO 9001 Qualitätsmanagement.",
      },
      {
        title: "HPLC-Analyse",
        description:
          "Hochleistungsflüssigkeitschromatographie trennt und quantifiziert die Peptidreinheit und bestätigt >98% für jeden Batch.",
      },
      {
        title: "Massenspektrometrie",
        description:
          "LC-MS/MS-Identitätsbestätigung verifiziert das exakte Molekulargewicht und die Integrität der Aminosäuresequenz.",
      },
      {
        title: "Zertifikatserstellung",
        description:
          "Ein unabhängiges Labor erstellt ein batchspezifisches Analysezertifikat mit vollständigen analytischen Daten und Bestehens-/Nichtbestehens-Kriterien.",
      },
    ],
    certificationsLabel: "ZERTIFIZIERUNGEN",
    standardsTitle1: "Qualitätsstandards, die",
    standardsTitle2: "Uns Definieren",
    standardsDescription:
      "Unsere Fertigungs- und Prüfinfrastruktur erfüllt die anspruchsvollsten pharmazeutischen Qualitätsbenchmarks der Branche.",
    qualityStandards: [
      {
        title: "GMP-Herstellung",
        description:
          "GMP-zertifizierte Produktionsanlagen in der gesamten EU, die pharmazeutische Qualitätskonsistenz gewährleisten.",
      },
      {
        title: "ISO 9001 Qualität",
        description:
          "International anerkanntes Qualitätsmanagementsystem, das jeden Schritt von den Rohstoffen bis zum Fertigprodukt regelt.",
      },
      {
        title: "ISO 7 Reinraum",
        description:
          "Sterile Abfüllung in ISO 7 klassifizierten Reinräumen mit HEPA-Filtration und kontinuierlichem Umgebungsmonitoring.",
      },
      {
        title: "HPLC-verifizierte Reinheit",
        description:
          "Jeder Batch durch unabhängige HPLC-Analyse verifiziert. Die meisten Batches übertreffen 99% Reinheit — zu den höchsten auf dem europäischen Markt.",
      },
    ],
    coaLabel: "ANALYSEZERTIFIKATE",
    coaTitle1: "Analysezertifikat für Jedes",
    coaTitle2: "Produkt",
    coaDescription:
      "Jedes unserer Peptidprodukte wird unabhängig verifiziert. Nachfolgend die aktuellen Batch-Testergebnisse.",
    passLabel: "BESTANDEN",
    purityLabel: "REINHEIT",
    batchLabel: "BATCH",
    testedLabel: "GETESTET",
    methodLabel: "METHODE",
    testedDate: "Feb 2026",
    viewCoa: "COA ANSEHEN",
    independentLabel: "UNABHÄNGIGE VERIFIZIERUNG",
    partnersTitle1: "Analytische Drittlabore",
    partnersTitle2: "Partner",
    partnersP1:
      "ORYN testet seine eigenen Produkte nicht. Jedes Analysezertifikat wird von unabhängigen, ISO 17025-akkreditierten Analyselaboren ausgestellt, die keine finanzielle Beziehung zu unserem Herstellungsbetrieb haben.",
    partnersP2:
      "Diese Trennung gewährleistet eine unvoreingenommene, wissenschaftlich rigorose Verifizierung von Reinheit, Identität und Sterilität. Unsere Testpartner verwenden validierte Analysemethoden einschließlich Umkehrphasen-HPLC, LC-MS/MS, LAL-Endotoxin-Test und Membranfiltrations-Sterilitätstest.",
    partnersBullets: [
      "ISO 17025 akkreditierte Analyselabore",
      "Keine finanziellen Verbindungen zur ORYN-Herstellung",
      "Validierte HPLC- und Massenspektrometrie-Methoden",
      "Endotoxin- und Sterilitätsverifizierung",
      "Vollständige Batch-Rückverfolgbarkeit von der Synthese bis zum Zertifikat",
    ],
    analyticalMethodsLabel: "ANALYSEMETHODEN",
    analyticalMethods: [
      {
        method: "HPLC-Reinheitsprüfung",
        description:
          "C18-Umkehrphasensäule, UV-Detektion bei 220 nm. Quantifiziert Peptidreinheit und detektiert Verunreinigungen.",
          standard: "USP <621>",
      },
      {
        method: "Massenspektrometrie (LC-MS)",
        description:
          "Elektrospray-Ionisation mit hochauflösender Massendetektion. Bestätigt molekulare Identität.",
          standard: "ISO 13528",
      },
      {
        method: "Endotoxin-Test",
        description:
          "Kinetischer turbidimetrischer LAL-Test (Limulus-Amöbozyten-Lysat). Stellt sicher, dass bakterielle Endotoxingehalte unter den Grenzwerten liegen.",
          standard: "USP <85>",
      },
      {
        method: "Sterilitätstest",
        description:
          "Membranfiltrationsmethode mit 14-tägiger Inkubation in TSB- und FTM-Nährmedien.",
          standard: "USP <71>",
      },
    ],
    understandingLabel: "IHR COA VERSTEHEN",
    coaContentsTitle1: "Was Jedes COA",
    coaContentsTitle2: "Enthält",
    coaContentsDescription:
      "Jedes ORYN-Analysezertifikat bietet vollständige analytische Transparenz. Das finden Sie in jedem Dokument.",
    coaItems: [
      {
        title: "Peptididentität",
        details:
          "Verbindungsname, Molekularformel, Molekulargewicht, Aminosäuresequenz und CAS-Nummer.",
      },
      {
        title: "HPLC-Reinheitsdaten",
        details:
          "Chromatogramm, Retentionszeit, Peakflächenprozentsatz und Verunreinigungsprofil mit Akzeptanzkriterien.",
      },
      {
        title: "Massenspektrum",
        details:
          "LC-MS-Identitätsbestätigung mit beobachtetem vs. theoretischem Molekulargewicht und Ladungszuständen.",
      },
      {
        title: "Endotoxin-Ergebnisse",
        details:
          "LAL-Testergebnisse in EU/mL mit Spezifikationsgrenzen. Alle ORYN-Produkte testen unter 0,5 EU/mL.",
      },
      {
        title: "Sterilitätsbericht",
        details:
          "14-Tage-Inkubationsergebnisse in TSB- und FTM-Medien, die kein mikrobielles Wachstum bestätigen.",
      },
      {
        title: "Batch-Informationen",
        details:
          "Eindeutige Batch-Nummer, Herstellungsdatum, Testdatum, Ablaufdatum und Analysten-Identifikation.",
      },
    ],
    faqLabel: "FAQ",
    faqTitle1: "Qualität & Analytik",
    faqTitle2: "FAQ",
    faqDescription:
      "Häufige Fragen zu unserem Qualitätssicherungsprozess, Peptid-Reinheitstests und Analysezertifikaten.",
    ctaTitle: "Qualität, die Sie Überprüfen Können",
    ctaDescription:
      "Jedes ORYN-Peptid wird mit einer Batch-Nummer geliefert, die Sie bis zu einem unabhängigen Analysezertifikat zurückverfolgen können. Überzeugen Sie sich selbst von der Wissenschaft.",
    ctaBrowseProducts: "PRODUKTE ANSEHEN",
    ctaRequestCoa: "COA ANFORDERN",
  },

  shippingPage: {
    heroTagline: "TEMPERATURKONTROLLIERT",
    heroTitle1: "Versand &",
    heroTitle2: "Lieferung",
    heroDescription:
      "Jede ORYN-Bestellung wird noch am selben Tag in temperaturkontrollierter Verpackung versandt, damit Ihre Peptid-Pens einwandfrei ankommen. Kostenloser UK-Versand ab \u20ac{threshold}.",
    breadcrumbHome: "STARTSEITE",
    breadcrumbShipping: "VERSAND & LIEFERUNG",
    statUkDeliveryLabel: "UK-Lieferung",
    statUkDeliveryValue: "2-4 Tage",
    statDispatchLabel: "Versand",
    statDispatchValue: "Gleicher Tag",
    statFreeOverLabel: "Gratis ab",
    statPackagingLabel: "Verpackung",
    statPackagingValue: "2-8\u00b0C",
    ukZonesSectionLabel: "UK-LIEFERZONEN",
    ukZonesSectionTitle1: "Lieferzeiten nach",
    ukZonesSectionTitle2: "Region",
    ukZonesSectionDescription:
      "Alle Bestellungen bis 14:00 Uhr GMT werden noch am gleichen Werktag versandt. Die angegebenen Zeiten sind Werktage ab Versand.",
    ukDeliveryNote:
      "Lieferzeiten sind Schätzwerte für den Standardversand. Expressoptionen sind beim Bezahlen verfügbar. Bestellungen am Wochenende oder an Feiertagen werden am nächsten Werktag versandt.",
    ukZones: [
      { region: "London & Südosten", days: "1 \u2013 2 Tage" },
      { region: "Midlands & East Anglia", days: "2 \u2013 3 Tage" },
      { region: "Nordengland", days: "2 \u2013 3 Tage" },
      { region: "Schottland (Tiefland)", days: "3 \u2013 4 Tage" },
      { region: "Wales", days: "2 \u2013 3 Tage" },
      { region: "Nordirland", days: "3 \u2013 4 Tage" },
      { region: "Highlands & Inseln", days: "4 \u2013 5 Tage" },
    ],
    coldChainSectionLabel: "KÜHLKETTENLOGISTIK",
    packagingTitle1: "Temperaturkontrollierte",
    packagingTitle2: "Verpackung",
    packagingDescription:
      "Peptide müssen bei 2-8\u00b0C gekühlt gelagert werden. Unsere Kühlkettenverpackung stellt sicher, dass Ihre Bestellung während des gesamten Transports optimale Temperatur beibehält.",
    packagingBullets: [
      "Hält 2-8\u00b0C bis zu 48 Stunden im Transit",
      "Ungiftige Gel-Kühlpacks, vorgekühlt auf 2\u00b0C",
      "Mehrlagige isolierte Versandbehälter",
      "Zusätzlicher Schutz in den Sommermonaten",
      "Maßgeschneiderte Schaumstoffeinsätze für Pens",
    ],
    coldChainFeatures: [
      {
        title: "Isolierte Versandboxen",
        description:
          "Mehrlagige Isolierbehälter halten die Innentemperatur bis zu 48 Stunden bei 2-8\u00b0C und schützen so die Peptidintegrität vom Lager bis zur Haustür.",
      },
      {
        title: "Gel-Kühlpacks",
        description:
          "Ungiftige Phasenwechsel-Gelpacks, vorgekühlt auf 2\u00b0C, sorgen für anhaltende Kühlung ohne Gefrierrisiko.",
      },
      {
        title: "Saisonale Anpassungen",
        description:
          "In den Sommermonaten (Juni-September) legen wir zusätzliche Kühlpacks und verstärkte Isolierung bei. Bei extremer Hitze wechseln wir zur Expresslieferung.",
      },
      {
        title: "Temperaturüberwachung",
        description:
          "Großbestellungen ab 25 Einheiten enthalten Temperaturindikatorstreifen, die bestätigen, dass die Lieferung im Bereich 2-8\u00b0C blieb.",
      },
    ],
    euSectionLabel: "INTERNATIONALER VERSAND",
    euSectionTitle1: "Europäische",
    euSectionTitle2: "Lieferung",
    euSectionDescription:
      "ORYN liefert in mehr als 15 europäische Länder mit vollständiger Sendungsverfolgung und temperaturkontrollierter Verpackung.",
    euCountriesHeader: "EU-LÄNDER, IN DIE WIR LIEFERN",
    euCountriesNotListed:
      "Nicht aufgeführt? Kontaktieren Sie uns \u2014 wir können möglicherweise eine Lieferung in Ihr Land arrangieren.",
    euDeliveryTimeTitle: "Lieferzeit",
    euDeliveryTimeValue: "3 \u2013 7 Tage",
    euDeliveryTimeDescription:
      "Werktage ab Versand. Westeuropa typischerweise 3-5 Tage, Osteuropa 5-7 Tage.",
    euShippingCostTitle: "Versandkosten",
    euShippingCostValue: "Pauschaltarif",
    euShippingCostDescription:
      "Pauschalversand in alle europäischen Länder. Wird beim Bezahlen anhand des Ziellandes und des Bestellgewichts berechnet.",
    euCustomsTitle: "Zoll & Steuern",
    euCustomsValue: "Verantwortung des Käufers",
    euCustomsDescription:
      "Internationale Bestellungen können Zollgebühren und Einfuhrsteuern unterliegen. Diese Gebühren trägt der Kunde.",
    euTrackingTitle: "Sendungsverfolgung",
    euTrackingValue: "Vollständige Verfolgung",
    euTrackingDescription:
      "Alle internationalen Sendungen beinhalten eine lückenlose Sendungsverfolgung mit Echtzeit-Statusupdates per E-Mail.",
    freeShippingSectionLabel: "KOSTENLOSER VERSAND",
    freeShippingTitle1: "Kostenloser UK-Versand ab",
    freeShippingTitle2: "\u20ac{threshold}",
    freeShippingDescription:
      "Bestellungen über \u20ac{threshold} erhalten kostenlosen Standardversand ins Vereinigte Königreich. Verfolgen Sie Ihren Fortschritt im Warenkorb.",
    freeShippingExampleLabel: "BEISPIEL: BESTELLUNG VON \u20ac120",
    freeShippingExampleAway: "\u20ac30 bis zum kostenlosen Versand",
    discreetTitle: "Diskrete Verpackung",
    discreetDescription:
      "Alle ORYN-Bestellungen werden in schlichten, unbeschrifteten Kartons versandt. Keine Produktnamen, keine Markenzeichen und keine Beschreibungen sind auf der Außenverpackung sichtbar.",
    discreetItems: [
      "Schlichte Außenverpackung",
      "Kein sichtbares Branding",
      "Generischer Absendername",
      "Keine Produktbeschreibungen",
    ],
    trackingTitle: "Bestellverfolgung",
    trackingDescription:
      "Jede Bestellung erhält innerhalb von 2 Stunden nach Versand eine Trackingnummer. Verfolgen Sie Ihre Sendung in Echtzeit von unserem Lager bis zu Ihrer Tür.",
    trackingItems: [
      "Tracking-E-Mail innerhalb von 2 Stunden",
      "Echtzeit-Statusupdates",
      "Geschätzte Lieferzeitfenster",
      "Lieferbestätigung",
    ],
    returnsTitle: "Rückgaben & Rückerstattungen",
    returnsDescription:
      "Wenn Ihre Bestellung beschädigt oder falsch ankommt, kontaktieren Sie uns innerhalb von 48 Stunden. Wir organisieren Ersatz oder eine vollständige Rückerstattung ohne zusätzliche Kosten.",
    returnsItems: [
      "48-Stunden-Frist zur Schadensmeldung",
      "Vollständiger Ersatz oder Rückerstattung",
      "Fotodokumentation erforderlich",
      "Kostenloser Rückversand bei Fehlern",
    ],
    faqSectionLabel: "FAQ",
    faqSectionTitle1: "Versand-",
    faqSectionTitle2: "FAQ",
    faqSectionDescription:
      "Häufige Fragen zu Peptidlieferung, Verpackung und Versandoptionen.",
    ctaTitle: "Heute Bestellen, Diese Woche Erhalten",
    ctaDescription:
      "Versand am gleichen Tag bis 14:00 Uhr. Temperaturkontrollierte Lieferung. Kostenloser UK-Versand ab \u20ac{threshold}.",
    ctaShopNow: "JETZT KAUFEN",
    ctaContactUs: "KONTAKTIEREN",
  },

  termsPage: {
    tagline: "RECHTLICHES",
    title: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert: März 2026",
    sections: [
      {
        heading: "1. Zustimmung zu den Bedingungen",
        content:
          "Durch den Zugriff auf und die Nutzung der Website und Dienste von ORYN Peptide Labs stimmen Sie diesen Nutzungsbedingungen zu. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie unsere Dienste bitte nicht.",
      },
      {
        heading: "2. Nur für Forschungszwecke",
        content:
          "Alle von ORYN Peptide Labs verkauften Produkte sind ausschließlich für Labor- und Forschungszwecke bestimmt. Die Produkte sind nicht für den menschlichen oder tierischen Verzehr bestimmt. Durch den Kauf bestätigen Sie, dass Sie die Produkte für legitime Forschungszwecke erwerben und alle geltenden Gesetze und Vorschriften in Ihrer Gerichtsbarkeit einhalten.",
      },
      {
        heading: "3. Berechtigung",
        content:
          "Sie müssen mindestens 18 Jahre alt sein und eine legitime Forschungsorganisation, ein Labor oder eine akademische Einrichtung vertreten, um Produkte erwerben zu können. ORYN behält sich das Recht vor, den Nachweis von Forschungsqualifikationen anzufordern.",
      },
      {
        heading: "4. Bestellungen und Zahlung",
        content:
          "Alle Preise sind in EUR angegeben. Die Zahlung wird sicher verarbeitet. ORYN behält sich das Recht vor, Bestellungen zu stornieren, die betrügerisch erscheinen oder gegen diese Bedingungen verstoßen. Für Großbestellungen: 50 % Vorauszahlung, 50 % vor dem Versand.",
      },
      {
        heading: "5. Versand und Lieferung",
        content:
          "Produkte werden bei Bedarf mit Kühlkettenhandling versendet. Lieferzeiten sind Schätzungen. ORYN ist nicht verantwortlich für Verzögerungen durch Zoll, Spediteure oder höhere Gewalt.",
      },
      {
        heading: "6. Rücksendungen und Erstattungen",
        content:
          "Aufgrund der Beschaffenheit unserer Produkte werden Rücksendungen nur für beschädigte oder falsche Artikel innerhalb von 14 Tagen nach der Lieferung akzeptiert. Die Produkte müssen ungeöffnet und in der Originalverpackung sein.",
      },
      {
        heading: "7. Geistiges Eigentum",
        content:
          "Alle Inhalte, Markenzeichen und Materialien auf dieser Website sind Eigentum von ORYN Peptide Labs. Unbefugte Vervielfältigung ist untersagt.",
      },
      {
        heading: "8. Haftungsbeschränkung",
        content:
          "ORYN Peptide Labs stellt Produkte im Ist-Zustand für Forschungszwecke bereit. Wir übernehmen keine Garantie für die Eignung für einen bestimmten Zweck über die angegebenen Spezifikationen hinaus. Unsere Haftung ist auf den Kaufpreis des Produkts beschränkt.",
      },
      {
        heading: "9. Kontakt",
        content: "Bei Fragen zu diesen Bedingungen kontaktieren Sie uns unter legal@orynlabs.com.",
      },
    ],
  },

  privacyPage: {
    tagline: "RECHTLICHES",
    title: "Datenschutzerklärung",
    lastUpdated: "Zuletzt aktualisiert: März 2026",
    sections: [
      {
        heading: "1. Informationen, die wir erheben",
        content:
          "Wir erheben Informationen, die Sie direkt angeben: Name, E-Mail, Organisation, Lieferadresse und Zahlungsdaten, wenn Sie ein Konto erstellen oder eine Bestellung aufgeben.",
      },
      {
        heading: "2. Wie wir Ihre Informationen verwenden",
        content:
          "Ihre Informationen werden verwendet, um: Bestellungen zu verarbeiten, über Ihr Konto zu kommunizieren, Kundensupport zu leisten, Bestellaktualisierungen zu senden und gesetzliche Verpflichtungen einzuhalten. Wir verkaufen Ihre persönlichen Daten nicht.",
      },
      {
        heading: "3. Datenschutz",
        content:
          "ORYN Peptide Labs hält die DSGVO und die geltenden europäischen Datenschutzvorschriften ein. Ihre Daten werden sicher mit Verschlüsselung im Ruhezustand und bei der Übertragung gespeichert.",
      },
      {
        heading: "4. Ihre Rechte",
        content:
          "Gemäß DSGVO haben Sie das Recht auf: Zugang zu Ihren Daten, Berichtigung von Unrichtigkeiten, Löschungsantrag, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung. Kontaktieren Sie privacy@orynlabs.com, um diese Rechte auszuüben.",
      },
      {
        heading: "5. Cookies",
        content:
          "Wir verwenden wesentliche Cookies für die Website-Funktionalität und Analyse-Cookies zur Verbesserung unseres Dienstes. Sie können Cookie-Einstellungen in Ihrem Browser verwalten.",
      },
      {
        heading: "6. Kontakt",
        content: "Datenschutzbeauftragter: privacy@orynlabs.com",
      },
    ],
  },

  disclaimerPage: {
    tagline: "RECHTLICHES",
    title: "Forschungshinweis",
    lastUpdated: "Zuletzt aktualisiert: März 2026",
    alertTitle: "Wichtiger Hinweis",
    alertContent:
      "Alle von ORYN Peptide Labs verkauften Produkte sind ausschließlich für die Laborforschung und wissenschaftliche Untersuchung bestimmt. Sie sind NICHT für den menschlichen oder veterinären Gebrauch, Lebensmittelzusatzstoffe, Arzneimittel, Kosmetika, Haushaltschemikalien oder andere Konsumformen bestimmt.",
    buyerResponsibilityIntro:
      "Durch den Kauf bei ORYN Peptide Labs erkennt der Käufer an und stimmt zu, dass:",
    buyerResponsibilityItems: [
      "Produkte ausschließlich für legitime Forschungszwecke verwendet werden",
      "Der Käufer mit allen geltenden Vorschriften vertraut und compliant ist",
      "Produkte nicht für den menschlichen Verzehr weiterverkauft werden",
      "Der Käufer die volle Verantwortung für sachgemäße Handhabung und Verwendung übernimmt",
      "Der Käufer volljährig ist und eine legitime Forschungseinrichtung vertritt",
    ],
    sections: [
      {
        heading: "Erklärung zur Forschungsnutzung",
        content:
          "ORYN Peptide Labs stellt Peptidverbindungen ausschließlich für In-vitro-Forschung, Laborexperimente und wissenschaftliche Untersuchungen her und vertreibt diese. Alle Verbindungen werden als Forschungschemikalien mit beigefügten Analysezertifikaten (COA) zur Chargenverifizierung geliefert.",
      },
      {
        heading: "Verantwortung des Käufers",
        content: "",
      },
      {
        heading: "Keine medizinischen Aussagen",
        content:
          "ORYN Peptide Labs macht keinerlei Aussagen bezüglich der therapeutischen, diagnostischen oder präventiven Eigenschaften eines Produkts. Produktbeschreibungen verweisen auf veröffentlichte wissenschaftliche Literatur ausschließlich zu Informationszwecken und stellen keine medizinische Beratung oder Wirksamkeitsbehauptungen dar.",
      },
      {
        heading: "Qualitätssicherung",
        content:
          "Alle ORYN-Produkte werden in GMP-zertifizierten ISO Klasse 7-Reinräumen mit analytischer Drittvalidierung hergestellt. Reinheitsgrade übersteigen 99 %, wie durch HPLC-Analyse verifiziert. Vollständige Chargendokumentation einschließlich COA, Stabilitätsdaten und DMF-Dokumentation ist auf Anfrage erhältlich.",
      },
      {
        heading: "Regulatorische Compliance",
        content:
          "Es liegt in der Verantwortung des Käufers, die Einhaltung aller lokalen, nationalen und internationalen Vorschriften bezüglich Kauf, Import, Besitz und Verwendung von Forschungspeptiden sicherzustellen. ORYN Peptide Labs operiert im Rahmen europäischer Regulierungsrahmen.",
      },
    ],
  },
} as unknown as Dictionary;

export default de;
