import type { Dictionary } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fr = {
  meta: {
    title: "ORYN | Stylos Peptidiques — Achetez des Peptides en Ligne",
    titleTemplate: "%s | ORYN Peptide Labs",
    description:
      "Achetez des stylos peptidiques de qualité pharmaceutique en ligne. BPC-157, NAD+, Tirzepatide, GHK-CU et plus dans des systèmes de stylos réutilisables. Certifié GMP, pureté >99%, fabriqué en Corée du Sud. À partir de €99. Livraison gratuite.",
    ogDescription:
      "Systèmes de stylos peptidiques à dosage de précision. 10 peptides de recherche à partir de €99. Stylos réutilisables avec cartouches remplaçables. Certifié GMP. Pureté >99%. Livraison gratuite en Europe.",
  },

  header: {
    announcementText: "LIVRAISON GRATUITE POUR TOUTE COMMANDE SUPÉRIEURE À {threshold}",
    shopNow: "ACHETER",
    myAccount: "Mon Compte",
    signIn: "Se Connecter",
    searchPlaceholder: "Rechercher des peptides...",
    noResults: "Aucun résultat pour",
    typeToSearch: "Tapez pour rechercher...",
    viewAll: "VOIR TOUS LES PRODUITS",
  },

  nav: {
    products: "Produits",
    science: "Science",
    about: "À Propos",
    contact: "Contact",
    compare: "Comparer",
    learn: "Apprendre",
  },

  hero: {
    tagline: "SYSTÈMES DE STYLOS PEPTIDIQUES DE PRÉCISION",
    brandDescriptor: "Systèmes de Stylos Peptidiques de Qualité Recherche",
    subtitle: "Stoppez le Vieillissement. Boostez votre Bien-être. Prolongez votre Longévité.",
    description:
      "Peptides de qualité pharmaceutique dans des systèmes de stylos réutilisables avec cartouches remplaçables. Praticité click-and-go, dosage précis, approvisionnement de 30 jours. Certifié GMP. Fabriqué en Corée du Sud. Pureté >99%.",
    explorePeptides: "EXPLORER LES PEPTIDES",
    ourScience: "NOTRE SCIENCE",
    purityLabel: "PURETÉ",
    dosingLabel: "DOSAGE",
    dosingValue: "30 Days",
    trustFreeShipping: "LIVRAISON GRATUITE",
    trustSecure: "PAIEMENT SÉCURISÉ",
    trustCOA: "COA INCLUS",
    socialProofCount: "2 400+ commandes",
    socialProofLabel: "expédiées ce trimestre",
    stats: {
      productsValue: "10",
      productsLabel: "Produits",
      purityValue: ">99%",
      purityLabel: "Pureté",
      cleanroomValue: "ISO 7",
      cleanroomLabel: "Salle Blanche",
      certifiedValue: "GMP",
      certifiedLabel: "Certifié",
    },
  },

  categories: {
    label: "GAMMES DE PRODUITS",
    titleLine1: "Trois Systèmes.",
    titleLine2: "Un Seul Standard.",
    description:
      "Chaque produit ORYN est fabriqué dans des salles blanches ISO Classe 7 avec certification GMP et validation par des tiers.",
    from: "À partir de",
    items: [
      {
        name: "Peptide Pen System",
        tagline: "Dosage de Précision sur 30 Jours",
        description:
          "8 peptides de recherche dans des stylos multi-doses réutilisables. Formulations de qualité pharmaceutique avec affichage numérique de dose.",
      },
      {
        name: "MediT Pen",
        tagline: "Injection Hebdomadaire",
        description:
          "Stylo prérempli de Tirzepatide 40 mg. Double action GIP/GLP-1 pour la recherche métabolique.",
      },
      {
        name: "NovaDose System",
        tagline: "Microdosage Quotidien de NAD+",
        description:
          "Système avancé d'administration de NAD+ à base de cartouches. Qualité pharmaceutique avec une biodisponibilité proche de 100%.",
      },
    ],
  },

  showcase: {
    label: "EN VEDETTE",
    titleLine1: "Peptides de",
    titleLine2: "Qualité Recherche",
    subtitle: "Composés de qualité pharmaceutique à partir de €99. Systèmes de stylos réutilisables avec dosage de précision sur 30 jours.",
    viewAll: "VOIR TOUS LES PRODUITS",
    trustShipping: "LIVRAISON GRATUITE",
    trustPurity: "PURETÉ >99%",
    trustCOA: "COA INCLUS",
    trustReturn: "TRAÇABILITÉ PAR LOT",
  },

  science: {
    label: "NOTRE PROCESSUS",
    titleLine1: "Précision",
    titleLine2: "Moléculaire Avancée",
    description:
      "De l'approvisionnement en matières premières à la stérilisation finale, chaque étape du processus de fabrication ORYN est régie par des protocoles de qualité pharmaceutique et validée par des laboratoires indépendants.",
    specs: {
      manufacturingLabel: "Fabrication",
      manufacturingValue: "Korea",
      capacityLabel: "Capacité",
      capacityValue: "100K/mo",
      batchSizeLabel: "Taille de Lot",
      batchSizeValue: "20,000 ea",
      leadTimeLabel: "Délai",
      leadTimeValue: "45-60 days",
    },
    steps: [
      {
        title: "Synthèse",
        description:
          "Synthèse peptidique en phase solide avec des protocoles de purification propriétaires atteignant une pureté >99% sur toutes les formulations.",
      },
      {
        title: "Formulation",
        description:
          "Formulations aqueuses de qualité pharmaceutique avec agents de viscosité PEG. pH optimisé (6,8-7,4) pour la stabilité et la biodisponibilité.",
      },
      {
        title: "Stérilisation",
        description:
          "Fabrication en chambre aseptique complète avec filtration 0,22 μm et stérilisation finale par rayons gamma. Salles blanches ISO Classe 7.",
      },
      {
        title: "Validation",
        description:
          "AQ/CQ par des tiers : POSTECH, UNIST et SGS. Chaque lot inclut un Certificat d'Analyse avec données analytiques complètes.",
      },
    ],
  },

  howItWorks: {
    label: "COMMENT ÇA MARCHE",
    titleLine1: "Simple.",
    titleLine2: "Efficace.",
    description: "Du choix de votre peptide aux résultats — notre système de stylo rend la recherche facile.",
    cta: "EXPLORER LES PEPTIDES",
    steps: [
      {
        title: "Choisissez Votre Peptide",
        description: "Parcourez notre gamme de peptides à pureté >99%. Chaque stylo est prémélangé et prêt à l'emploi.",
      },
      {
        title: "Commandez en Toute Sécurité",
        description: "Paiement rapide via Stripe. Livraison gratuite en France pour les commandes de plus de 150€.",
      },
      {
        title: "Recevez Discrètement",
        description: "Emballage neutre, expédition à température contrôlée. COA inclus avec chaque commande.",
      },
      {
        title: "Commencez Votre Recherche",
        description: "Dosage ajustable via le stylo de précision. Pas de mélange, pas de flacons, pas de gaspillage.",
      },
    ],
  },

  quality: {
    label: "ASSURANCE QUALITÉ",
    titleLine1: "Standards",
    titleLine2: "Pharmaceutiques",
    pillars: [
      {
        title: "Salle Blanche ISO Classe 7",
        description:
          "Environnements sans particules conformes aux normes de fabrication pharmaceutique.",
      },
      {
        title: "Certifié GMP",
        description:
          "Qualité constante, documentation rigoureuse et production traçable.",
      },
      {
        title: "Pureté >99%",
        description:
          "Analyse HPLC et validation par des tiers : POSTECH, UNIST et SGS.",
      },
      {
        title: "Traçabilité des Lots",
        description:
          "Documentation DMF complète, données de stabilité et COA pour chaque lot.",
      },
      {
        title: "Stérilisation par Rayons Gamma",
        description:
          "Stérilité complète par irradiation gamma après fabrication aseptique.",
      },
      {
        title: "Normes Européennes",
        description:
          "Conformité totale aux cadres réglementaires pharmaceutiques européens.",
      },
    ],
  },

  cta: {
    label: "COMMENCEZ VOTRE RECHERCHE",
    titleLine1: "Prêt à faire avancer votre",
    titleLine2: "recherche peptidique ?",
    description:
      "Explorez notre catalogue complet de peptides de qualité recherche. Chaque produit est expédié avec un Certificat d'Analyse et une documentation complète du lot.",
    browseProducts: "PARCOURIR TOUS LES PRODUITS",
    contactTeam: "CONTACTER NOTRE ÉQUIPE",
    valueProp1: "LIVRAISON GRATUITE UE/UK",
    valueProp2: "COA AVEC CHAQUE COMMANDE",
    valueProp3: "CERTIFIÉ GMP",
    badges: [
      { value: "ISO 7", label: "SALLE BLANCHE" },
      { value: "GMP", label: "CERTIFIÉ" },
      { value: ">99%", label: "PURETÉ" },
      { value: "SGS", label: "VALIDÉ" },
    ],
  },

  footer: {
    description:
      "Science Peptidique de Précision. Laboratoire de biotechnologie fournissant des solutions peptidiques de qualité recherche, conçues pour la précision moléculaire.",
    researchOnly: "À DES FINS DE RECHERCHE UNIQUEMENT",
    newsletterTitle: "Restez Informé",
    newsletterDescription: "Recevez les dernières actualités sur les nouveaux peptides, les avancées de la recherche et les offres exclusives.",
    newsletterPlaceholder: "votre@email.com",
    newsletterButton: "S'ABONNER",
    newsletterSuccess: "Merci ! Vous êtes maintenant abonné.",
    paymentMethods: "NOUS ACCEPTONS",
    sections: {
      products: "Produits",
      company: "Entreprise",
      legal: "Mentions Légales",
    },
    productLinks: {
      all: "Tous les Produits",
      pens: "Stylos Peptidiques",
      medit: "MediT Pen",
      novadose: "NovaDose",
    },
    companyLinks: {
      about: "À Propos d'ORYN",
      science: "Science",
      contact: "Contact",
      quality: "Qualité",
      whyOryn: "Pourquoi ORYN",
      researchHub: "Centre de Recherche",
      calculator: "Calculateur de Peptides",
    },
    trustBadges: {
      ssl: "Chiffrement SSL",
      secure: "Paiement Sécurisé",
      coa: "COA Inclus",
      guarantee: "Pureté Garantie",
    },
    legalLinks: {
      terms: "Conditions Générales de Vente",
      privacy: "Politique de Confidentialité",
      disclaimer: "Avertissement de Recherche",
    },
    seoSections: {
      researchAreas: "Domaines de Recherche",
      learn: "Apprendre",
      ukDelivery: "Livraison UK",
      ukRegions: "Régions UK",
      ukCounties: "Comtés UK",
      peptideEncyclopedia: "Encyclopédie des Peptides",
      resources: "Ressources",
      londonDelivery: "Livraison Londres",
      europeanDelivery: "Livraison Europe",
      topEuCities: "Grandes Villes UE",
    },
    certifications: [
      { label: "ISO CLASSE 7", detail: "Salle Blanche" },
      { label: "GMP", detail: "Certifié" },
      { label: ">99%", detail: "Pureté" },
      { label: "CORÉE", detail: "Fabriqué" },
    ],
    copyright: "ORYN PEPTIDE LABS — TOUS DROITS RÉSERVÉS",
  },

  productCard: {
    purity: "PURETÉ >99%",
    pharmaGrade: "QUALITÉ PHARMA",
    details: "DÉTAILS",
    addToCart: "AJOUTER AU PANIER",
  },

  cart: {
    title: "VOTRE COMMANDE",
    empty: "Votre panier est vide",
    emptySubtext: "Commencez à ajouter des peptides de recherche à votre panier.",
    browseProducts: "PARCOURIR LES PRODUITS",
    continueShopping: "Continuer les Achats",
    subtotal: "Sous-total",
    checkout: "PAIEMENT SÉCURISÉ",
    researchOnly: "À des fins de recherche uniquement",
    itemLabel: "article",
    itemsLabel: "articles",
    freeShippingAway: "Ajoutez {amount} de plus pour la LIVRAISON GRATUITE",
    freeShippingUnlocked: "Vous avez débloqué la LIVRAISON GRATUITE !",
    youMightLike: "VOUS AIMEREZ AUSSI",
    trustSecure: "PAIEMENT SÉCURISÉ",
    trustDiscreet: "EXPÉDITION DISCRÈTE",
    trustCOA: "COA INCLUS",
    orderSummary: "RÉCAPITULATIF DE COMMANDE",
    shipping: "Livraison",
    free: "GRATUITE",
    atCheckout: "AU PAIEMENT",
    estimatedShippingFrom: "À partir de",
    weAccept: "MOYENS DE PAIEMENT ACCEPTÉS",
    total: "Total",
    volumeDiscount: "Remise volume",
    saveForLater: "Sauvegarder pour plus tard",
    saved: "SAUVEGARDÉ",
    save: "SAUVEGARDER",
    havePromoCode: "Vous avez un code promo\u00a0?",
    cancel: "Annuler",
  },

  productsPage: {
    label: "CATALOGUE",
    title: "Peptides de Recherche",
    description:
      "Explorez notre gamme complète de solutions peptidiques conçues avec précision. Chaque produit est fabriqué selon les normes pharmaceutiques avec une pureté >99%.",
    all: "TOUT",
    results: "produits",
    searchPlaceholder: "Rechercher des peptides...",
    sortBy: "TRIER PAR",
    sortPriceAsc: "PRIX : CROISSANT",
    sortPriceDesc: "PRIX : DÉCROISSANT",
    sortName: "NOM : A-Z",
    noResults: "Aucun produit trouvé pour",
    noCategory: "Aucun produit dans cette catégorie",
    clearFilters: "Effacer les filtres",
    disclaimer:
      "TOUS LES PRODUITS ORYN SONT DESTINÉS À LA RECHERCHE ET À L'USAGE EN LABORATOIRE UNIQUEMENT. PAS POUR LA CONSOMMATION HUMAINE.",
  },

  productDetail: {
    notFound: "Produit Non Trouvé",
    backToProducts: "Retour aux Produits",
    home: "ACCUEIL",
    products: "PRODUITS",
    perUnit: "par unité",
    addToCart: "AJOUTER AU PANIER",
    adding: "AJOUT EN COURS...",
    keyBenefits: "AVANTAGES CLÉS",
    specifications: "SPÉCIFICATIONS",
    researchOnlyTitle: "Usage Recherche Uniquement",
    researchOnlyDescription:
      "Ce produit est destiné à la recherche et à l'usage en laboratoire uniquement. Pas pour la consommation humaine.",
    relatedProducts: "Produits Associés",
    trustShipping: "LIVRAISON GRATUITE",
    trustPurity: "PURETÉ >99%",
    trustCOA: "COA INCLUS",
    secureCheckout: "PAIEMENT SÉCURISÉ",
    discreetShipping: "EXPÉDITION DISCRÈTE",
    inStock: "EN STOCK",
    readyToShip: "Prêt à expédier",
    reviews: "avis",
    scienceTab: "Science",
    readyToExperience: "Prêt à découvrir",
    premiumPenDescription: "Système de stylo premium avec dosage entièrement ajustable. Fabriqué GMP, pureté >99% garantie.",
    dosingProtocol: "PROTOCOLE DE DOSAGE",
    howToUse: "Comment Utiliser Votre Stylo ORYN",
    quickReference: "RÉFÉRENCE RAPIDE",
    recommendedDose: "Dose Recommandée",
    frequency: "Fréquence",
    duration: "Durée",
    proTips: "CONSEILS PRO",
    stepByStep: "INSTRUCTIONS ÉTAPE PAR ÉTAPE",
    importantLabel: "IMPORTANT",
    safetyNote: "Utilisez toujours une aiguille stérile neuve pour chaque administration. Éliminez les aiguilles usagées dans un conteneur à aiguilles approprié. Conservez le stylo au réfrigérateur entre 2 et 8°C.",
    scienceLabel: "SCIENCE",
    scienceBehind: "La Science Derrière",
    compoundProfile: "PROFIL DU COMPOSÉ",
    classificationLabel: "CLASSIFICATION",
    molecularFormula: "FORMULE MOLÉCULAIRE",
    molecularWeightLabel: "POIDS MOLÉCULAIRE",
    halfLifeLabel: "DEMI-VIE",
    sequenceLabel: "SÉQUENCE",
    researchAreasLabel: "DOMAINES DE RECHERCHE",
    mechanismOfAction: "MÉCANISME D'ACTION",
    keyResearchFindings: "RÉSULTATS DE RECHERCHE CLÉS",
    trustedByResearchers: "APPROUVÉ PAR LES CHERCHEURS",
    whatLabsSay: "Ce que Disent les Labos sur",
    fromVerifiedReviews: "sur {count} avis vérifiés",
    verifiedLabel: "VÉRIFIÉ",
    faqLabel: "FAQ",
    frequentlyAsked: "Questions Fréquentes sur",
    buyInYourCity: "ACHETEZ {product} DANS VOTRE VILLE",
    relatedResearch: "RECHERCHE ASSOCIÉE",
    formulaLabel: "FORMULE",
    weightLabel: "POIDS",
    add: "AJOUTER",
    closeCart: "Fermer le panier",
    decreaseQuantity: "Diminuer la quantité",
    increaseQuantity: "Augmenter la quantité",
    removeItem: "Retirer l'article",
    toggleWishlist: "Basculer la liste de souhaits",
    closeSearch: "Fermer la recherche",
    closePopup: "Fermer",
    purityBadge: "PURETÉ >99%",
    gmpBadge: "CERTIFIÉ GMP",
    freeShippingBadge: "LIVRAISON GRATUITE 150+",
    whyChoosePen: "POURQUOI CHOISIR LE STYLO",
    traditionalVials: "FLACONS TRADITIONNELS",
    orynPenSystem: "SYSTÈME STYLO ORYN",
    vialProblems: [
      { label: "Reconstitution nécessaire", detail: "Eau bactériostatique, seringue, mélange précis" },
      { label: "Variabilité du dosage", detail: "Les graduations de seringue peuvent varier de 10-20%" },
      { label: "Risque de contamination", detail: "Bouchon en caoutchouc percé plusieurs fois" },
      { label: "Dégradation rapide", detail: "La puissance diminue après reconstitution" },
      { label: "Préparation complexe", detail: "5-10 minutes par préparation" },
      { label: "Voyage impraticable", detail: "Flacons, seringues, eau, aiguilles..." },
    ],
    comparisonBar: [
      { vial: "5-10 min", pen: "30 sec", label: "Temps de Préparation" },
      { vial: "~80%", pen: ">99%", label: "Précision de Dose" },
      { vial: "Décroissante", pen: "Maintenue", label: "Stérilité" },
      { vial: "7-14 jours", pen: "30 jours", label: "Stabilité" },
    ],
    compareWith: "COMPARER AVEC DES PRODUITS SIMILAIRES",
    sideBy: "Comparer les Produits",
    vsLabel: "MASQUER",
    keyDifferences: "BÉNÉFICES CLÉS",
    bestFor: "bénéfices",
    viewProduct: "AJOUTER",
    comparisonDisclaimer: "PRIX",
  },

  aboutPage: {
    tagline: "À PROPOS D'ORYN",
    heroTitle1: "La Science Derrière",
    heroTitle2: "la Précision",
    heroDescription:
      "ORYN est un laboratoire de biotechnologie dédié à l'avancement de la recherche peptidique grâce à une fabrication de qualité pharmaceutique en Corée du Sud, des systèmes d'administration innovants et des normes de qualité intransigeantes.",
    brandStatement:
      "Nous croyons que la recherche peptidique mérite la même rigueur de fabrication que la",
    brandHighlight: "production pharmaceutique.",
    brandParagraphs: [
      "ORYN est né d'une frustration vis-à-vis du marché de la recherche peptidique. Trop de composés de pureté incertaine, de dosages incohérents et de chaînes d'approvisionnement opaques. Nous avons décidé de changer cela.",
      "Nos partenaires de fabrication opèrent dans des salles blanches ISO Classe 7 avec certification GMP. Chaque formulation fait l'objet d'une analyse HPLC et d'une validation indépendante par des tiers. Nous fournissons une documentation complète de chaque lot, car la transparence n'est pas optionnelle — elle est fondamentale.",
      "Le résultat : des peptides de qualité recherche auxquels les scientifiques et les laboratoires peuvent faire confiance, livrés dans des systèmes de précision conçus pour des résultats constants et fiables.",
    ],
    valuesLabel: "NOS VALEURS",
    valuesTitle: "Ce Qui Nous",
    values: [
      {
        title: "Précision",
        description:
          "Chaque mesure compte. De la synthèse au remplissage final, nous contrôlons les variables au niveau moléculaire.",
      },
      {
        title: "Pureté",
        description:
          "99% est notre minimum. Validé par des tiers : POSTECH, UNIST et SGS pour une confiance absolue.",
      },
      {
        title: "Innovation",
        description:
          "Trois plateformes d'administration uniques conçues pour une stabilité, une précision de dosage et une expérience utilisateur optimales.",
      },
      {
        title: "Transparence",
        description:
          "Documentation complète de chaque lot, COA pour chaque produit et traçabilité totale de la chaîne d'approvisionnement.",
      },
    ],
    journeyLabel: "NOTRE PARCOURS",
    journeyTitle: "Construire",
    timeline: [
      {
        year: "Foundation",
        title: "La Précision dès le Premier Jour",
        description:
          "ORYN a été fondé avec une vision unique : apporter la recherche peptidique de qualité pharmaceutique aux laboratoires européens avec des normes de qualité intransigeantes.",
      },
      {
        year: "Manufacturing",
        title: "Partenariat Biotech Coréen",
        description:
          "Partenariat stratégique avec des installations de fabrication certifiées ISO Classe 7 à Eumseong et Osan, en Corée. Capacité de 100 000 unités par mois.",
      },
      {
        year: "Innovation",
        title: "Systèmes d'Administration Avancés",
        description:
          "Développement de trois plateformes d'administration propriétaires : le Peptide Pen multi-doses, le MediT Pen prérempli et le système à cartouches NovaDose.",
      },
      {
        year: "Today",
        title: "10 Peptides de Recherche",
        description:
          "Catalogue complet de peptides de qualité recherche couvrant la cicatrisation, le métabolisme, l'anti-âge et la recherche sur l'hormone de croissance, avec distribution mondiale.",
      },
    ],
    manufacturingLabel: "FABRICATION",
    manufacturingTitle: "Spécifications de Production",
    manufacturingSpecs: [
      { value: "ISO 7", label: "Classe Salle Blanche", sub: "Certifiée" },
      { value: "GMP", label: "Fabrication", sub: "Certifiée" },
      { value: "100K", label: "Capacité Mensuelle", sub: "Unités/Mois" },
      { value: "24mo", label: "Durée de Conservation", sub: "Stabilité Testée" },
      { value: "0.22um", label: "Stérilisation", sub: "Filtration" },
      { value: "SGS", label: "Validation", sub: "Tiers" },
      { value: "6.8-7.4", label: "Plage pH", sub: "Optimisée" },
      { value: "PEG", label: "Viscosité", sub: "Agent" },
    ],
  },

  sciencePage: {
    tagline: "SCIENCE",
    heroTitle1: "Bibliothèque de",
    heroTitle2: "Recherche Peptidique",
    heroDescription:
      "Comprendre les mécanismes moléculaires derrière chaque produit ORYN. Cette bibliothèque offre un aperçu scientifique de notre catalogue de peptides de recherche et de leurs domaines d'investigation.",
    processLabel: "PROCESSUS",
    processTitle1: "De la Synthèse à",
    processTitle2: "la Livraison",
    processDescription:
      "Un pipeline de fabrication pharmaceutique en six étapes garantissant la constance, la pureté et la stabilité de chaque produit.",
    processSteps: [
      { step: "01", label: "Matière Première", time: "2 Weeks" },
      { step: "02", label: "Synthèse", time: "8 Days" },
      { step: "03", label: "Purification", time: "HPLC" },
      { step: "04", label: "Formulation", time: "pH 6.8-7.4" },
      { step: "05", label: "Remplissage & Scellage", time: "2 Weeks" },
      { step: "06", label: "Stérilisation & CQ", time: "1 Week" },
    ],
    libraryLabel: "BIBLIOTHÈQUE",
    libraryTitle1: "Profils des",
    libraryTitle2: "Composés Peptidiques",
    classification: "CLASSIFICATION",
    mechanism: "MÉCANISME",
    researchAreas: "DOMAINES DE RECHERCHE",
    specsLabel: "SPÉCIFICATIONS",
    specsTitle: "Paramètres de Qualité Universels",
    specsItems: [
      { value: ">99%", label: "Pureté (HPLC)" },
      { value: "6.8-7.4", label: "Plage pH" },
      { value: "0.22um", label: "Filtration Stérile" },
      { value: "3 mL", label: "Volume de Remplissage" },
      { value: "PEG", label: "Agent de Viscosité" },
      { value: "30 Days", label: "Période de Dosage" },
      { value: "24 mo", label: "Durée de Conservation" },
      { value: "2-8°C", label: "Température de Stockage" },
    ],
  },

  contactPage: {
    tagline: "CONTACT",
    heroTitle: "Contactez-Nous",
    heroDescription:
      "Pour les demandes de vente en gros, les partenariats de recherche ou les questions sur nos produits. Notre équipe répond sous 24 heures.",
    companyName: "ORYN Peptide Labs",
    emailLabel: "EMAIL",
    wholesaleLabel: "VENTE EN GROS",
    locationLabel: "LOCALISATION",
    locationLine1: "Opérations Européennes",
    locationLine2: "Recherche & Distribution",
    infoBoxes: [
      {
        title: "Commandes en Gros",
        description:
          "MOQ : 1 000 par référence. Personnalisation OEM complète disponible. Paiement : 50% à la commande / 50% avant expédition. Support expédition DDP disponible.",
      },
      {
        title: "Partenariats de Recherche",
        description:
          "Nous accompagnons les programmes de recherche académiques et institutionnels avec des formulations sur mesure, des tarifs préférentiels et une fabrication prioritaire.",
      },
      {
        title: "Documentation",
        description:
          "COA, données de stabilité, documentation DMF et supports marketing disponibles pour tous les produits ORYN sur demande.",
      },
    ],
    formTitle: "Envoyez-nous un message",
    formDescription:
      "Remplissez le formulaire et notre équipe vous répondra rapidement.",
    firstName: "PRÉNOM",
    lastName: "NOM",
    email: "EMAIL",
    organization: "ORGANISATION",
    inquiryType: "TYPE DE DEMANDE",
    inquiryOptions: [
      "Demande Produit",
      "Commande en Gros",
      "Partenariat de Recherche",
      "Formulation Sur Mesure",
      "Demande de Documentation",
      "Autre",
    ],
    message: "MESSAGE",
    messagePlaceholder: "Décrivez-nous vos besoins de recherche...",
    sendMessage: "ENVOYER LE MESSAGE",
    messageSent: "Message Envoyé",
    messageSentDescription: "Nous vous répondrons sous 24 heures.",
  },

  checkoutPage: {
    emptyCart: "Votre panier est vide",
    emptyCartDescription: "Ajoutez des produits avant de procéder au paiement.",
    browseProducts: "Parcourir les Produits",
    steps: ["Informations", "Livraison", "Paiement"],
    shippingTitle: "Informations de Livraison",
    firstName: "PRÉNOM",
    lastName: "NOM",
    email: "EMAIL",
    phone: "TÉLÉPHONE",
    address: "ADRESSE",
    city: "Ville",
    postalCode: "Code Postal",
    country: "Pays",
    referralCode: "CODE PARRAINAGE",
    referralCodePlaceholder: "Entrez le code parrainage",
    referralCodeHint: "Vous avez un code parrainage ? Entrez-le pour le suivi.",
    continueToPayment: "CONTINUER VERS LE PAIEMENT",
    paymentTitle: "Paiement",
    cardPayment: "Paiement par Carte",
    cryptoPayment: "Paiement Crypto",
    cardNumber: "NUMÉRO DE CARTE",
    expiry: "EXPIRATION",
    cvc: "CVC",
    selectCrypto: "SÉLECTIONNER LA CRYPTOMONNAIE",
    amountToPay: "MONTANT À PAYER",
    discountApplied: "(réduction de 5% appliquée)",
    sendToAddress: "ENVOYER À L'ADRESSE",
    copy: "COPIER",
    copied: "COPIÉ",
    timeRemaining: "TEMPS RESTANT",
    sendBeforeExpiry: "Envoyez le paiement avant l'expiration du délai",
    sentPayment: "J'AI ENVOYÉ LE PAIEMENT",
    txHash: "HASH DE TRANSACTION",
    txHashPlaceholder: "Entrez votre hash de transaction",
    sessionExpired: "SESSION DE PAIEMENT EXPIRÉE",
    restartSession: "REDÉMARRER LA SESSION",
    back: "Retour",
    placeOrder: "PASSER LA COMMANDE",
    processing: "TRAITEMENT EN COURS...",
    orderSummary: "RÉCAPITULATIF DE COMMANDE",
    qty: "Qté",
    subtotal: "Sous-total",
    cryptoDiscount: "Réduction Crypto (5%)",
    shipping: "Livraison",
    shippingNote: "CALCULÉ À L'ÉTAPE SUIVANTE",
    referral: "Parrainage",
    total: "Total",
    researchOnly: "À des fins de recherche uniquement",
    orderConfirmed: "Commande Confirmée",
    orderConfirmedDescription:
      "Merci pour votre commande. Un email de confirmation a été envoyé avec les détails de votre commande et les informations de suivi.",
    paymentVerifying: "VÉRIFICATION DU PAIEMENT EN COURS",
    paymentVerifyingDescription:
      "Votre paiement crypto est en cours de confirmation sur la blockchain. Cela peut prendre jusqu'à 30 minutes.",
    paymentConfirmed: "PAIEMENT CONFIRMÉ",
    referralApplied: "CODE PARRAINAGE APPLIQUÉ",
    continueShopping: "Continuer les Achats",
    secureCheckout: "PAIEMENT SÉCURISÉ",
    orderRef: "RÉF. COMMANDE",
    contactShipping: "Informations de contact et de livraison",
    change: "Modifier",
    emailPlaceholder: "votre@email.com",
    shippingAddress: "ADRESSE DE LIVRAISON",
    useSavedAddress: "UTILISER L'ADRESSE ENREGISTRÉE",
    selectCountry: "Sélectionner un pays...",
    firstNamePlaceholder: "Prénom",
    lastNamePlaceholder: "Nom",
    addressPlaceholder: "Adresse",
    apartmentPlaceholder: "Appartement, suite, etc. (optionnel)",
    cityPlaceholder: "Ville",
    postalCodePlaceholder: "Code postal",
    phonePlaceholder: "Téléphone (optionnel)",
    continueToShipping: "CONTINUER VERS LA LIVRAISON",
    shippingMethod: "Mode de livraison",
    loadingShipping: "Chargement des options de livraison...",
    freeShippingApplied: "LIVRAISON GRATUITE APPLIQUÉE !",
    freeShippingLabel: "LIVRAISON GRATUITE (COMMANDE +€{threshold})",
    freeStandardShipping: "Livraison standard gratuite",
    returnToInformation: "← Retour aux informations",
    returnToShipping: "← Retour à la livraison",
    contact: "CONTACT",
    shipTo: "EXPÉDIER À",
    method: "MÉTHODE",
    free: "Gratuit",
    required: "Obligatoire",
    validEmailRequired: "Email valide requis",
    invalidCode: "Code invalide",
    failedToValidate: "Échec de la validation",
    hideOrderSummary: "Masquer le récapitulatif",
    showOrderSummary: "Afficher le récapitulatif",
    discount: "Réduction",
    volumeDiscountLabel: "Remise volume",
    calculatedNextStep: "Calculé à l'étape suivante",
    selectCountryForShipping: "Sélectionnez le pays pour estimer",
    securePayment: "PAIEMENT SÉCURISÉ",
    discreetShipping: "EXPÉDITION DISCRÈTE",
    coaIncluded: "COA INCLUS",
    gmpCertified: "CERTIFIÉ GMP",
    allSecure: "TOUTES LES TRANSACTIONS SONT SÉCURISÉES ET CHIFFRÉES",
    backendRequired: "BACKEND REQUIS",
    backendDescription: "Le backend Medusa est nécessaire pour traiter les paiements.",
    promoCodePlaceholder: "Code de réduction",
    apply: "APPLIQUER",
    referralPlaceholder: "Code parrainage (optionnel)",
    sslEncrypted: "Chiffrement SSL",
    purity99: "Pureté >99%",
    guaranteed: "Garanti",
    gmpCertifiedBadge: "Certifié GMP",
    guarantee30: "Garantie 30 Jours",
    noQuestions: "Sans condition",
    emailHint: "Pas besoin de compte. Votre commande sera liée à cet email.",
    verifyingPayment: "Vérification du paiement...",
    paymentFailed: "Échec du Paiement",
    paymentFailedDescription: "Votre paiement n'a pas pu être traité. Veuillez réessayer ou utiliser un autre moyen de paiement.",
    tryAgain: "Réessayer",
    whatHappensNext: "ET ENSUITE ?",
    nextSteps: [
      "Email de confirmation de commande envoyé dans votre boîte de réception",
      "Votre commande est en cours de préparation et de contrôle qualité",
      "Expédiée avec livraison suivie — généralement le jour ouvrable suivant",
    ],
    viewOrders: "VOIR LES COMMANDES",
    referralTitle: "Partagez ORYN et gagnez 10% de commission",
    referralDescription: "Vous aimez nos produits ? Partagez votre lien de parrainage et gagnez 10% sur chaque achat.",
    getReferralLink: "OBTENIR VOTRE LIEN DE PARRAINAGE →",
  },

  products: {
    "bpc-157": {
      subtitle: "Cicatrisation & Récupération",
      categoryLabel: "Peptide Pen",
      description:
        "Le Body Protection Compound-157 est un peptide synthétique dérivé d'une protéine naturellement présente dans le suc gastrique. ORYN BPC-157 est formulé à qualité pharmaceutique dans un système de stylo à dosage de précision pour une administration constante et fiable sur 30 jours.",
      benefits: [
        "Favorise la cicatrisation et la récupération des tissus",
        "Soutient la santé et l'intégrité intestinale",
        "Favorise la réparation des tendons et ligaments",
        "Propriétés anti-inflammatoires",
        "Potentiel neuroprotecteur",
      ],
      badge: "Best Seller",
    },
    "tb-500": {
      subtitle: "Réparation Tissulaire",
      categoryLabel: "Peptide Pen",
      description:
        "Le fragment de Thymosin Bêta-4, TB-500, joue un rôle crucial dans la réparation et la régénération des tissus. ORYN TB-500 délivre une dose précise de 15 mg dans notre système de stylo avancé, conçu pour une biodisponibilité optimale et des résultats constants.",
      benefits: [
        "Accélère la cicatrisation des plaies",
        "Réduit l'inflammation",
        "Favorise la réparation du tissu musculaire",
        "Soutient la santé cardiovasculaire",
        "Améliore la flexibilité et la mobilité",
      ],
    },
    "cjc-1295": {
      subtitle: "Stimulation GH",
      categoryLabel: "Peptide Pen",
      description:
        "Le CJC-1295 est un analogue synthétique de l'hormone de libération de l'hormone de croissance (GHRH). ORYN CJC-1295 offre une élévation soutenue de la GH grâce à notre système de dosage de précision, fabriqué selon les plus hauts standards pharmaceutiques.",
      benefits: [
        "Stimule la libération de l'hormone de croissance",
        "Favorise une composition corporelle maigre",
        "Soutient un sommeil profond et réparateur",
        "Améliore la récupération entre les sessions",
        "Soutient la fonction métabolique",
      ],
    },
    ipamorelin: {
      subtitle: "Stimulation GH",
      categoryLabel: "Peptide Pen",
      description:
        "L'Ipamorelin est un sécrétagogue sélectif de l'hormone de croissance qui stimule l'hypophyse. ORYN Ipamorelin offre une libération ciblée de GH sans la perturbation hormonale plus large observée avec des composés moins sélectifs.",
      benefits: [
        "Libération sélective de GH",
        "Profil d'effets secondaires minimal",
        "Soutient la densité osseuse",
        "Favorise les tissus maigres",
        "Améliore la qualité du sommeil",
      ],
    },
    "tirzepatide-pen": {
      subtitle: "Métabolique",
      categoryLabel: "Peptide Pen",
      description:
        "Le Tirzepatide est un double agoniste des récepteurs GIP/GLP-1 représentant l'avant-garde de la science peptidique métabolique. Le système de stylo ORYN Tirzepatide délivre un dosage de précision pour les applications de recherche métabolique.",
      benefits: [
        "Double action sur les récepteurs hormonaux",
        "Soutient la fonction métabolique",
        "Gestion de la glycémie",
        "Régulation de l'appétit",
        "Composé cliniquement étudié",
      ],
      badge: "Popular",
    },
    "ghk-cu": {
      subtitle: "Réparation Cutanée",
      categoryLabel: "Peptide Pen",
      description:
        "Le GHK-Cu (peptide de cuivre) est un tripeptide naturel ayant une forte affinité pour les ions cuivre. ORYN GHK-CU soutient la recherche sur le remodelage et la réparation cutanée avec une formulation puissante de 60 mg.",
      benefits: [
        "Favorise la synthèse du collagène",
        "Soutient l'élasticité de la peau",
        "Propriétés antioxydantes",
        "Soutien à la cicatrisation",
        "Applications de recherche anti-âge",
      ],
    },
    glutathione: {
      subtitle: "Antioxydant",
      categoryLabel: "Peptide Pen",
      description:
        "Le Glutathion est le maître antioxydant de l'organisme, essentiel pour la détoxification cellulaire et la fonction immunitaire. ORYN Glutathione délivre une dose puissante de 6 g via notre système de stylo de précision pour une biodisponibilité maximale.",
      benefits: [
        "Défense antioxydante majeure",
        "Détoxification cellulaire",
        "Soutien du système immunitaire",
        "Propriétés éclaircissantes pour la peau",
        "Soutien de la fonction hépatique",
      ],
    },
    "nad-plus": {
      subtitle: "Métabolique & Anti-Âge",
      categoryLabel: "Peptide Pen",
      description:
        "Le Nicotinamide Adénine Dinucléotide (NAD+) est un coenzyme essentiel présent dans chaque cellule. Le stylo ORYN NAD+ délivre une dose concentrée de 500 mg pour soutenir la production d'énergie cellulaire, la réparation de l'ADN et le vieillissement en bonne santé.",
      benefits: [
        "Production d'énergie cellulaire",
        "Soutien à la réparation de l'ADN",
        "Recherche sur le vieillissement en bonne santé",
        "Soutien de la fonction cognitive",
        "Efficacité métabolique",
      ],
      badge: "Premium",
    },
    "medit-tirzepatide": {
      subtitle: "Tirzepatide 40mg — Gestion du Poids",
      categoryLabel: "MediT Pen",
      description:
        "Le MediT Pen ORYN est un stylo d'injection prérempli à usage unique contenant 40 mg de Tirzepatide. Conçu pour une administration hebdomadaire, il combine la double action hormonale GIP/GLP-1 pour un soutien métabolique complet.",
      benefits: [
        "Double action hormonale (GIP + GLP-1)",
        "Praticité hebdomadaire",
        "Efficacité cliniquement prouvée",
        "Contrôle de l'appétit et boost de satiété",
        "Gestion de la glycémie",
        "Soutien à la gestion du poids à long terme",
        "Peut réduire les risques liés à l'obésité",
      ],
      badge: "New",
    },
    "novadose-nad": {
      subtitle: "La Jeunesse Entre Vos Mains",
      categoryLabel: "NovaDose System",
      description:
        "NovaDose délivre du NAD+ de qualité pharmaceutique grâce à un système innovant de stylo à cartouches. Conçu pour un microdosage quotidien précis, il soutient l'énergie cellulaire, l'efficacité métabolique et la réparation naturelle. Plus abordable et durable que la thérapie IV.",
      benefits: [
        "NAD+ de qualité pharmaceutique de Corée",
        "Microdosage quotidien précis",
        "Biodisponibilité proche de 100%",
        "Soutient l'énergie cellulaire et la clarté mentale",
        "Améliore l'humeur et la performance physique",
        "Plus économique que la thérapie IV",
        "Fabrication certifiée GMP",
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
      "Stylos multi-doses réutilisables avec dosage de précision sur 30 jours. 8 peptides de recherche disponibles.",
    "medit-pen":
      "Stylo d'injection prérempli à usage unique hebdomadaire. Tirzepatide 40 mg pour la recherche métabolique.",
    novadose:
      "Système avancé d'administration de NAD+ par cartouche pour un microdosage quotidien de précision.",
  },

  researchCategories: {
    recovery: "Récupération et Guérison",
    "weight-loss": "Perte de Poids",
    "anti-aging": "Anti-Âge",
    "muscle-growth": "Croissance Musculaire",
    "skin-rejuvenation": "Rajeunissement de la Peau",
    "sleep-quality": "Sommeil et Récupération",
    "gut-health": "Santé Intestinale",
    "joint-health": "Articulations et Tendons",
    "hair-growth": "Croissance Capillaire",
    "immune-support": "Soutien Immunitaire",
    "tendon-repair": "Réparation des Tendons",
    "sports-recovery": "Récupération Sportive",
    "post-surgery": "Post-Chirurgie",
    "cognitive-enhancement": "Amélioration Cognitive",
    "energy-vitality": "Énergie et Vitalité",
    "detox-cleanse": "Détox et Purification",
    "body-composition": "Composition Corporelle",
    inflammation: "Inflammation et Douleur",
    "hormonal-balance": "Équilibre Hormonal",
    "longevity-biohacking": "Longévité et Biohacking",
  },

  breadcrumbs: {
    home: "Accueil",
    products: "Produits",
    about: "À Propos",
    science: "Science",
    contact: "Contact",
    learn: "Apprendre",
    quality: "Qualité",
    faq: "FAQ",
    compare: "Comparer",
    shipping: "Livraison",
    whyOryn: "Pourquoi ORYN",
    terms: "Conditions",
    privacy: "Confidentialité",
    disclaimer: "Avertissement",
    cart: "Panier",
    checkout: "Paiement",
    account: "Compte",
    orders: "Commandes",
    referrals: "Parrainages",
    wishlist: "Favoris",
    profile: "Profil",
    wholesale: "Grossiste",
    bundles: "Packs",
    protocols: "Protocoles",
    peptides: "Peptides",
    peptidePens: "Stylos Peptidiques",
    europe: "Europe",
    glossary: "Glossaire",
    london: "Londres",
    encyclopedia: "Encyclopédie",
    ukPeptideDelivery: "Livraison de Peptides au Royaume-Uni",
    tools: "Outils",
    peptideCalculator: "Calculateur de Peptides",
  },

  homeSeo: {
    deliveryTitle: "LIVRAISON DE PEPTIDES EN EUROPE",
    researchAreaTitle: "PEPTIDES PAR DOMAINE DE RECHERCHE",
    researchHubTitle: "CENTRE DE RECHERCHE",
    peptidesFor: "Peptides pour",
  },

  testimonials: {
    label: "APPROUVÉ PAR LES CHERCHEURS",
    titleLine1: "Ce que Disent",
    titleLine2: "Nos Clients",
    items: [
      {
        quote: "La pureté et la constance des peptides ORYN sont inégalées. Le système de stylo rend le dosage incroyablement précis et fiable pour nos protocoles de laboratoire.",
        name: "Dr. M. Richter",
        role: "Directeur de Recherche, Munich",
      },
      {
        quote: "Nous sommes passés à ORYN il y a six mois. La documentation COA, la traçabilité des lots et la certification GMP nous donnent une confiance totale à chaque commande.",
        name: "Dr. S. Lindberg",
        role: "Chercheur Clinicien, Stockholm",
      },
      {
        quote: "Qualité de produit exceptionnelle et livraison rapide en UE. Le système NovaDose est une révolution pour notre recherche sur le NAD+. Fortement recommandé pour tout laboratoire sérieux.",
        name: "Prof. J. Torres",
        role: "Directeur de Laboratoire Biotech, Barcelone",
      },
    ],
    stats: [
      { value: "2 400+", label: "COMMANDES EXPÉDIÉES" },
      { value: "98%", label: "TAUX DE RÉACHAT" },
      { value: "4.9/5", label: "SATISFACTION" },
      { value: "24h", label: "TEMPS DE RÉPONSE" },
    ],
  },

  localeSwitcher: {
    label: "Marché",
    uk: "UK (€)",
    eu: "EU (€)",
  },

  wishlistPage: {
    title: "Liste de Souhaits",
    breadcrumb: "LISTE DE SOUHAITS",
    empty: "Votre liste de souhaits est vide",
    emptyTitle: "Aucun article enregistré",
    emptyDescription: "Parcourez nos produits et cliquez sur l'icône cœur pour enregistrer des articles.",
    browseProducts: "PARCOURIR LES PRODUITS",
    itemsSaved: "articles enregistrés",
    itemSaved: "article enregistré",
  },

  faq: {
    title: "Questions Fréquemment Posées",
    label: "FAQ",
  },

  contactFaq: {
    title: "AVANT DE NOUS CONTACTER",
    items: [
      { q: "Quels sont les délais de livraison ?", a: "Commandes France : 2-4 jours ouvrables. Europe : 3-7 jours ouvrables. Toutes les commandes sont expédiées dans un emballage discret à température contrôlée." },
      { q: "Puis-je suivre ma commande ?", a: "Oui ! Une fois expédiée, vous recevrez un numéro de suivi par email. Vous pouvez également suivre vos commandes depuis votre tableau de bord." },
      { q: "Quelle est votre politique de retour ?", a: "Nous offrons une garantie satisfait ou remboursé de 30 jours sur les produits non ouverts. Contactez-nous à info@orynlabs.com pour initier un retour." },
      { q: "Proposez-vous des tarifs de gros ?", a: "Oui, contactez wholesale@orynlabs.com pour les tarifs de gros. Nous proposons des remises par paliers pour les institutions de recherche et les revendeurs." },
    ],
  },

  homeFaq: {
    items: [
      { q: "Que sont les Stylos Peptidiques ORYN ?", a: "Les Stylos Peptidiques ORYN sont des systèmes d'administration de peptides de recherche prémélangés et prêts à l'emploi. Chaque stylo contient des peptides de qualité pharmaceutique à une pureté >99%, fabriqués dans notre installation de salle blanche ISO 7. Le format stylo élimine le besoin de reconstitution, assurant un dosage constant pour les applications de recherche." },
      { q: "Les peptides sont-ils légaux en France et en Europe ?", a: "Oui, les peptides de recherche sont légaux à l'achat en France et dans toute l'Europe à des fins de recherche. Les Peptides ORYN sont vendus strictement pour la recherche in vitro et l'usage en laboratoire. Ils ne sont pas destinés à la consommation humaine." },
      { q: "Comment sont fabriqués vos peptides ?", a: "Tous les peptides ORYN sont synthétisés dans notre laboratoire certifié GMP en salle blanche ISO 7 en Corée du Sud. Chaque lot subit des tests rigoureux HPLC et de spectrométrie de masse pour vérifier une pureté >99%. Un Certificat d'Analyse (COA) est inclus avec chaque commande." },
      { q: "Quels sont les délais de livraison ?", a: "Les commandes en France arrivent généralement en 2-4 jours ouvrables. Les commandes européennes prennent 3-7 jours ouvrables selon la destination. Toutes les commandes sont expédiées dans un emballage discret à température contrôlée. Les commandes de plus de €150 bénéficient de la livraison gratuite." },
      { q: "Qu'est-ce que le Programme de Parrainage ORYN ?", a: "Notre programme de parrainage multi-niveaux vous permet de gagner 10% de commission sur les achats effectués par les collègues que vous parrainez. Vous gagnez également des commissions jusqu'à 5 niveaux de profondeur à mesure que votre réseau s'agrandit. Créez un compte gratuit pour obtenir votre code de parrainage unique." },
      { q: "Proposez-vous des tarifs de gros ou en volume ?", a: "Oui, nous proposons des remises volume à partir de 3 unités et plus. Plus vous commandez, plus la remise est importante — jusqu'à 15% de réduction pour les grosses commandes de recherche. Contactez-nous pour des tarifs de gros personnalisés sur les commandes en volume." },
    ],
  },

  shippingFaq: {
    items: [
      { q: "Quel est le délai de livraison des peptides en France ?", a: "Les délais de livraison en France dépendent de votre localisation. Paris et l'Île-de-France reçoivent les commandes en 1-2 jours ouvrables, les autres grandes villes en 2-3 jours ouvrables, et les zones rurales en 3-5 jours ouvrables. Toutes les commandes passées avant 14h sont expédiées le jour même." },
      { q: "L'expédition des peptides est-elle à température contrôlée ?", a: "Oui. Tous les envois de peptides ORYN sont conditionnés dans des boîtes isolantes avec des accumulateurs de froid en gel afin de maintenir une température de 2-8 degrés Celsius pendant le transport. Pendant les mois d'été (juin-septembre), nous ajoutons une protection supplémentaire de la chaîne du froid avec des accumulateurs supplémentaires et des doublures isolantes pour garantir l'intégrité du produit." },
      { q: "Comment bénéficier de la livraison gratuite ?", a: "La livraison standard gratuite est disponible pour toutes les commandes supérieures à 150 euros. Ce seuil s'applique au sous-total de la commande avant tout code de réduction. Les commandes internationales vers l'Europe sont soumises à des frais de livraison forfaitaires quelle que soit la valeur de la commande. Votre panier affichera une barre de progression indiquant combien il vous reste pour atteindre le seuil de livraison gratuite." },
      { q: "Livrez-vous les peptides à l'international en Europe ?", a: "Oui, ORYN livre dans la plupart des pays de l'Union européenne. La livraison européenne prend généralement 3-7 jours ouvrables selon le pays de destination. Tous les envois internationaux comprennent un emballage à température contrôlée et un suivi complet. Les droits de douane et taxes à l'importation sont à la charge du client." },
      { q: "Comment ma commande de peptides est-elle emballée ?", a: "Toutes les commandes ORYN sont expédiées dans des boîtes neutres et non marquées, sans description de produit ni marque visible à l'extérieur. À l'intérieur, les stylos à peptides sont fixés dans des inserts en mousse personnalisés au sein d'un contenant isolant avec des accumulateurs de gel. Un bon de livraison et un Certificat d'Analyse sont inclus dans la boîte." },
      { q: "Puis-je suivre ma commande de peptides ?", a: "Oui. Toutes les commandes reçoivent un numéro de suivi par e-mail dans les 2 heures suivant l'expédition. Vous pouvez suivre votre colis en temps réel via le portail de notre partenaire de livraison. Pour les commandes en gros de 10 unités et plus, nous proposons un suivi amélioré avec des fenêtres de livraison estimées et une confirmation de livraison avec signature." },
    ],
  },

  qualityFaq: {
    items: [
      { q: "Qu'est-ce qu'un Certificat d'Analyse (COA) ?", a: "Un Certificat d'Analyse est un document émis par un laboratoire d'analyse qualifié qui confirme l'identité, la pureté et la composition d'un produit peptidique. Chaque COA ORYN comprend des données de pureté HPLC, une confirmation d'identité par spectrométrie de masse, les résultats des tests d'endotoxines, la vérification de stérilité et les détails de fabrication spécifiques au lot." },
      { q: "Comment lire un résultat de pureté HPLC ?", a: "Les résultats HPLC (Chromatographie Liquide Haute Performance) montrent un chromatogramme avec des pics représentant différents composants. Le pourcentage d'aire du pic principal indique la pureté — par exemple, 99,2% signifie que 99,2% du matériau détecté est le peptide cible. Tous les peptides ORYN atteignent systématiquement plus de 98% de pureté, la plupart des lots dépassant 99%." },
      { q: "Qui effectue vos tests par des tiers ?", a: "Les peptides ORYN sont analysés par des laboratoires analytiques indépendants accrédités ISO 17025. Ces laboratoires opèrent indépendamment de nos installations de fabrication, assurant une vérification impartiale de la pureté, de l'identité et de la stérilité pour chaque lot que nous produisons." },
      { q: "À quelle fréquence les peptides ORYN sont-ils testés ?", a: "Chaque lot de chaque produit ORYN est testé avant sa mise en vente. Nous appliquons un protocole strict de libération par lot : aucun produit ne quitte nos installations sans un Certificat d'Analyse approuvé par un laboratoire indépendant. Les analyses comprennent la pureté par HPLC, la confirmation d'identité par spectrométrie de masse, le criblage des endotoxines et la vérification de stérilité." },
      { q: "Quelles normes de pureté les peptides ORYN respectent-ils ?", a: "Tous les peptides ORYN sont fabriqués pour dépasser 98% de pureté, la plupart des lots atteignant plus de 99%. Cela est vérifié par des analyses HPLC indépendantes et confirmé par spectrométrie de masse. Nos installations de fabrication sont certifiées GMP et fonctionnent selon des systèmes de gestion de la qualité ISO 9001 dans des environnements de salle blanche ISO 7." },
      { q: "Puis-je demander un COA pour mon lot spécifique ?", a: "Oui. Chaque produit ORYN est livré avec un numéro de lot imprimé sur l'emballage. Vous pouvez demander le COA spécifique à votre lot en contactant notre équipe d'assistance à info@orynpeptides.com avec votre numéro de lot. Nous conservons des enregistrements complets de traçabilité pour chaque lot fabriqué." },
    ],
  },

  wholesaleFaq: {
    items: [
      { q: "Quelle est la quantité minimale de commande pour les tarifs de gros ?", a: "Nos niveaux de tarification de gros commencent à seulement 3 unités. Les commandes de 3-5 unités bénéficient de 5% de réduction, celles de 6-9 unités de 10%, et celles de 10 unités ou plus de 15% sur le prix de détail. Pour les commandes de 50 unités et plus, nous proposons des devis personnalisés adaptés à vos besoins spécifiques." },
      { q: "Comment fonctionnent les tarifs de gros chez ORYN ?", a: "Les tarifs de gros ORYN sont basés sur des niveaux de remise volume appliqués à nos prix de détail standard. Les remises sont calculées automatiquement lors du paiement pour les commandes éligibles. Vous pouvez associer et assortir tous les produits de nos gammes Peptide Pen, MediT Pen et NovaDose pour atteindre votre niveau. Pour des accords d'approvisionnement continus, contactez notre équipe de gros." },
      { q: "Comment créer un compte grossiste ?", a: "La création d'un compte grossiste est simple. Contactez notre équipe à info@orynpeptides.com ou utilisez le formulaire de demande grossiste sur notre page de contact. Nous vérifierons les coordonnées de votre organisation, assignerons un chargé de compte dédié et activerons les tarifs volume sur votre compte dans un délai de 1-2 jours ouvrables." },
      { q: "Quelles sont les conditions de paiement disponibles pour les clients grossistes ?", a: "Les commandes en gros standard sont réglables par virement bancaire, carte de crédit ou bon de commande (pour les comptes approuvés). Nous proposons des conditions de paiement NET-30 pour les clients grossistes établis avec un historique commercial vérifié. Toutes les premières commandes sont prépayées. Contactez notre équipe pour discuter des modalités de paiement pour les contrats de grand volume." },
      { q: "Quels sont les délais de livraison pour les commandes en vrac de peptides ?", a: "Les commandes en gros sont expédiées dans un délai de 1-2 jours ouvrables depuis notre centre de distribution. La livraison standard prend 2-4 jours ouvrables. Pour les grandes commandes (50+ unités), nous pouvons avoir besoin de 5 jours ouvrables de préparation. Tous les envois en gros comprennent un emballage à température contrôlée sans frais supplémentaires, avec un suivi complet fourni." },
    ],
  },

  account: {
    nav: {
      dashboard: "Tableau de Bord",
      orders: "Commandes",
      referrals: "Parrainages",
      wishlist: "Liste de Souhaits",
      profile: "Profil",
      signOut: "Se Déconnecter",
    },
    dashboard: {
      welcome: "Bon retour,",
      subtitle: "Gérez vos commandes, suivez vos expéditions et mettez à jour vos informations.",
      yourOrders: "Vos Commandes",
      yourOrdersDesc: "Consultez l'historique des commandes et suivez les expéditions",
      profileSettings: "Paramètres du Profil",
      profileSettingsDesc: "Mettez à jour vos informations personnelles",
      shopPeptides: "Acheter des Peptides",
      shopPeptidesDesc: "Parcourez notre catalogue de qualité recherche",
      orynRewards: "Récompenses ORYN",
      earnPoints: "Gagnez 1 point par €1 dépensé",
      points: "POINTS",
      tier: "NIVEAU",
      member: "Membre",
      nextReward: "PROCHAINE RÉCOMPENSE",
      nextRewardValue: "€10 de remise à 500 pts",
      multiplier: "MULTIPLICATEUR",
      multiplierValue: "1x",
      inviteEarn: "Inviter & Gagner",
      viewDashboard: "VOIR LE TABLEAU DE BORD",
      inviteDescription: "Gagnez 10% de commission quand vos collègues commandent avec votre code. Plus des commissions jusqu'à 5 niveaux de profondeur.",
      copyCode: "COPIER LE CODE",
      copyLink: "COPIER LE LIEN",
      share: "PARTAGER :",
      accountBenefits: "AVANTAGES DU COMPTE",
      benefits: [
        { title: "Suivi de Commande", desc: "Mises à jour en temps réel sur toutes vos expéditions" },
        { title: "Historique des Commandes", desc: "Historique complet avec possibilité de recommander" },
        { title: "Gains de Parrainage", desc: "Gagnez des commissions sur vos parrainages" },
        { title: "Support Prioritaire", desc: "Les titulaires de compte bénéficient de réponses plus rapides" },
      ],
    },
    login: {
      title: "Bon Retour",
      subtitle: "Connectez-vous à votre compte ORYN",
      email: "EMAIL",
      password: "MOT DE PASSE",
      emailPlaceholder: "votre@email.com",
      passwordPlaceholder: "Entrez votre mot de passe",
      signingIn: "CONNEXION EN COURS...",
      signIn: "SE CONNECTER",
      noAccount: "Vous n'avez pas de compte ?",
      createOne: "Créer un compte",
      continueWithout: "Continuer vos achats sans compte",
      loginFailed: "Échec de la connexion",
    },
    register: {
      title: "Créer un Compte",
      subtitle: "Rejoignez ORYN pour le suivi des commandes, les offres exclusives et plus encore",
      firstName: "PRÉNOM *",
      lastName: "NOM *",
      email: "EMAIL *",
      emailPlaceholder: "votre@email.com",
      password: "MOT DE PASSE *",
      passwordPlaceholder: "Minimum 8 caractères",
      confirmPassword: "CONFIRMER LE MOT DE PASSE *",
      organization: "ORGANISATION",
      organizationPlaceholder: "Labo, université, entreprise...",
      referralCode: "CODE PARRAINAGE",
      referralCodePlaceholder: "Optionnel",
      creating: "CRÉATION DU COMPTE...",
      createAccount: "CRÉER UN COMPTE",
      termsPrefix: "En créant un compte, vous acceptez les",
      termsOfService: "Conditions Générales de Vente",
      and: "et la",
      privacyPolicy: "Politique de Confidentialité",
      hasAccount: "Vous avez déjà un compte ?",
      signIn: "Se connecter",
      passwordsMismatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit comporter au moins 8 caractères",
      registrationFailed: "Échec de l'inscription",
    },
    profile: {
      title: "Paramètres du Profil",
      subtitle: "Gérez vos informations de compte",
      personalInfo: "INFORMATIONS PERSONNELLES",
      firstName: "PRÉNOM",
      lastName: "NOM",
      email: "EMAIL",
      emailNotChangeable: "L'email ne peut pas être modifié",
      referralCode: "CODE PARRAINAGE",
      saveChanges: "ENREGISTRER LES MODIFICATIONS",
      saved: "Enregistré",
      changePassword: "CHANGER LE MOT DE PASSE",
      currentPassword: "MOT DE PASSE ACTUEL",
      newPassword: "NOUVEAU MOT DE PASSE",
      newPasswordPlaceholder: "Minimum 8 caractères",
      confirmNewPassword: "CONFIRMER LE NOUVEAU MOT DE PASSE",
      updatePassword: "METTRE À JOUR LE MOT DE PASSE",
      passwordUpdated: "Mot de passe mis à jour",
      passwordsMismatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit comporter au moins 8 caractères",
    },
    orders: {
      title: "Vos Commandes",
      subtitle: "Suivez et gérez toutes vos commandes ORYN",
      noOrders: "Aucune commande",
      noOrdersDesc: "Votre historique de commandes apparaîtra ici après votre premier achat.",
      browseProducts: "PARCOURIR LES PRODUITS",
      addedToCart: "AJOUTÉ AU PANIER ✓",
      reorder: "RECOMMANDER",
      items: "articles",
      item: "article",
    },
    orderDetail: {
      notFound: "Commande non trouvée",
      backToOrders: "Retour aux commandes",
      ordersBreadcrumb: "Commandes",
      orderTitle: "Commande",
      placedOn: "Passée le",
      print: "IMPRIMER",
      orderTracking: "SUIVI DE COMMANDE",
      pending: "En attente",
      processing: "En traitement",
      shipped: "Expédiée",
      delivered: "Livrée",
      cancelled: "Annulée",
      orderItems: "ARTICLES DE LA COMMANDE",
      qty: "Qté :",
      subtotal: "Sous-total",
      shipping: "Livraison",
      free: "GRATUITE",
      discount: "Réduction",
      total: "Total",
      shippingAddress: "ADRESSE DE LIVRAISON",
      shippingNotAvailable: "Détails de livraison non disponibles",
      payment: "PAIEMENT",
      method: "Méthode",
      status: "Statut",
      addedToCart: "AJOUTÉ AU PANIER",
      reorderAll: "RECOMMANDER TOUS LES ARTICLES",
      needHelp: "Besoin d'Aide ?",
      needHelpDesc: "Pour toute question concernant votre commande, contactez-nous à",
    },
    referrals: {
      title: "Programme de Parrainage",
      subtitle: "Partagez ORYN avec vos collègues et gagnez des commissions sur chaque commande qu'ils passent.",
      yourCode: "VOTRE CODE PARRAINAGE",
      copied: "COPIÉ !",
      copyCode: "COPIER LE CODE",
      yourLink: "VOTRE LIEN DE PARRAINAGE",
      copyLink: "COPIER LE LIEN",
      shareVia: "PARTAGER VIA :",
      whatsapp: "WhatsApp",
      email: "Email",
      directReferrals: "PARRAINAGES DIRECTS",
      networkSize: "TAILLE DU RÉSEAU",
      totalEarned: "TOTAL GAGNÉ",
      available: "DISPONIBLE",
      earningsByLevel: "GAINS PAR NIVEAU",
      levelLabel: "Niveau",
      commission: "commission",
      ordersLabel: "commandes",
      pending: "EN ATTENTE",
      approved: "APPROUVÉ",
      paidOut: "VERSÉ",
      yourReferrals: "VOS PARRAINAGES",
      commissionHistory: "HISTORIQUE DES COMMISSIONS",
      tableOrder: "COMMANDE",
      tableLevel: "NIVEAU",
      tableRate: "TAUX",
      tableAmount: "MONTANT",
      tableStatus: "STATUT",
      tableDate: "DATE",
      howItWorks: "COMMENT ÇA MARCHE",
      steps: [
        { title: "Partagez Votre Code", desc: "Envoyez votre code ou lien de parrainage unique à vos collègues et chercheurs." },
        { title: "Ils Commandent", desc: "Lorsqu'ils s'inscrivent avec votre code et passent une commande, vous gagnez une commission." },
        { title: "Gagnez des Récompenses", desc: "Gagnez 10% sur les parrainages directs, plus des commissions sur leurs parrainages jusqu'à 5 niveaux de profondeur." },
      ],
      whatsappShareText: "Découvrez ORYN Peptides — des peptides de recherche de précision fabriqués en Corée du Sud. Utilisez mon code {code} pour votre première commande : {link}",
      emailShareSubject: "ORYN Peptides — Peptides de Recherche de Précision",
      emailShareBody: "Bonjour,\n\nJe voulais partager ORYN Peptides avec vous. Ils produisent des peptides de recherche de qualité pharmaceutique avec >99% de pureté.\n\nUtilisez mon code de parrainage : {code}\n\nOu cliquez ici : {link}\n\nCordialement",
    },
    wishlist: {
      title: "Liste de Souhaits",
      itemsSaved: "articles enregistrés",
      itemSaved: "article enregistré",
      empty: "Votre liste de souhaits est vide",
      emptyDesc: "Enregistrez les produits qui vous intéressent pour plus tard.",
      browseProducts: "PARCOURIR LES PRODUITS",
      addToCart: "AJOUTER AU PANIER",
      remove: "RETIRER",
    },
    savedAddresses: {
      title: "ADRESSES ENREGISTRÉES",
      cancel: "ANNULER",
      addAddress: "+ AJOUTER UNE ADRESSE",
      labelField: "LIBELLÉ (ex. Domicile, Bureau)",
      labelPlaceholder: "Domicile",
      firstName: "PRÉNOM",
      lastName: "NOM",
      address: "ADRESSE",
      city: "VILLE",
      postcode: "CODE POSTAL",
      country: "PAYS",
      phone: "TÉLÉPHONE",
      setAsDefault: "Définir comme adresse par défaut",
      saveAddress: "ENREGISTRER L'ADRESSE",
      noAddresses: "Aucune adresse enregistrée. Ajoutez-en une pour un paiement plus rapide.",
      default: "PAR DÉFAUT",
      setDefault: "DÉFINIR PAR DÉFAUT",
      remove: "SUPPRIMER",
      countries: {
        GB: "Royaume-Uni",
        ES: "Espagne",
        IE: "Irlande",
        DE: "Allemagne",
        FR: "France",
        NL: "Pays-Bas",
      },
    },
  },

  cookie: {
    message:
      "Nous utilisons des cookies pour améliorer votre expérience et assurer le bon fonctionnement du site. En continuant, vous acceptez notre",
    privacyPolicy: "Politique de Confidentialité",
    acceptAll: "TOUT ACCEPTER",
    essentialOnly: "ESSENTIELS UNIQUEMENT",
  },

  toast: {
    addedToCart: "AJOUTÉ AU PANIER",
  },

  popups: {
    firstVisit: {
      discount: "10%",
      yourFirstOrder: "VOTRE PREMIÈRE COMMANDE",
      code: "WELCOME10",
      tagline: "BIENVENUE CHEZ ORYN",
      title: "Science Peptidique de Précision",
      description:
        "Laboratoire de biotechnologie livrant des peptides de recherche à pureté >99% dans des systèmes de stylos de précision. Fabriqués en Corée du Sud. Utilisez le code WELCOME10 sur votre première commande.",
      benefits: [
        "Livraison gratuite dès 150€",
        "Fabrication certifiée GMP",
        "Certificat d'Analyse inclus",
      ],
      shopNow: "ACHETER MAINTENANT",
      noThanks: "Non merci, je préfère naviguer seul",
    },
    exitIntent: {
      tagline: "ATTENDEZ — AVANT DE PARTIR",
      title: "Obtenez 10% de Remise sur Votre Première Commande",
      description:
        "Rejoignez des chercheurs du monde entier utilisant les peptides de précision ORYN. Entrez votre email pour recevoir votre code de réduction exclusif.",
      placeholder: "votre@email.com",
      claimDiscount: "OBTENIR MA REMISE DE 10%",
      noSpam: "Pas de spam. Désabonnement à tout moment.",
      welcomeTitle: "Bienvenue chez ORYN !",
      welcomeMessage:
        "Utilisez le code WELCOME10 lors du paiement pour 10% de remise.",
    },
  },

  payment: {
    processing: "TRAITEMENT EN COURS...",
    loadingPayment: "CHARGEMENT DU PAIEMENT...",
    completeOrder: "FINALISER LA COMMANDE",
    sslEncrypted: "CHIFFREMENT SSL",
    pciCompliant: "CONFORME PCI",
    paymentFailed: "Échec du paiement. Veuillez réessayer.",
    unexpectedError: "Une erreur inattendue s'est produite.",
    notCompleted: "Le paiement n'a pas été finalisé. Veuillez réessayer.",
    preparingPayment: "Préparation du paiement sécurisé...",
    paymentNotReady: "Le système de paiement n'est pas prêt. Veuillez réessayer.",
    paymentFormLoading: "Le formulaire de paiement est en cours de chargement. Patientez un instant.",
    orderCreationFailed: "Paiement traité mais la création de la commande a échoué. Contactez le support.",
    orPayWith: "OU PAYER PAR CARTE",
  },

  volumeDiscount: {
    applied: "Remise volume appliquée :",
    addMore: "Ajoutez {count} article(s) de plus pour {percent}% DE REMISE",
    title: "REMISES VOLUME",
    items: "{count}+ articles",
    off: "{percent}% DE REMISE",
    active: "ACTIF",
    unlockMore: "Ajoutez {count} article(s) de plus pour débloquer {percent}% de remise !",
  },

  frequentlyBought: {
    title: "Fréquemment Achetés Ensemble",
    save: "ÉCONOMISEZ 10%",
    bundlePrice: "Prix du lot — économisez {amount} avec cette combinaison",
    addAll: "TOUT AJOUTER AU PANIER",
  },

  recentlyViewed: {
    title: "Consultés Récemment",
  },

  orderBump: {
    addToOrder: "AJOUTEZ À VOTRE COMMANDE",
    yesAddIt: "OUI, AJOUTER",
  },

  aria: {
    search: "Rechercher",
    account: "Compte",
    wishlist: "Favoris",
    openCart: "Ouvrir le panier",
    toggleMenu: "Basculer le menu",
    mobileMenu: "Menu mobile",
    backToTop: "Retour en haut",
    cookieConsent: "Consentement aux cookies",
    shareWhatsApp: "Partager sur WhatsApp",
    shareX: "Partager sur X",
    shareFacebook: "Partager sur Facebook",
    copyLink: "Copier le lien",
    switchLanguage: "Changer de langue",
    switchRegion: "Changer de région",
    breadcrumb: "Fil d'Ariane",
    dismiss: "Fermer",
    close: "Fermer",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    email: "E-mail",
    researchDisclaimer: "Avertissement de recherche",
  },

  calculator: {
    interactiveTool: "OUTIL INTERACTIF",
    title: "Calculateur de Reconstitution de Peptides",
    description: "Entrez la quantité de peptide, le volume d'eau et la dose souhaitée pour calculer la concentration et le volume d'injection.",
    peptideAmount: "Quantité de Peptide",
    bacteriostaticWater: "Volume d'Eau Bactériostatique",
    desiredDose: "Dose Souhaitée Par Injection",
    customAmount: "Quantité personnalisée",
    customVolume: "Volume personnalisé",
    customDose: "Dose personnalisée",
    concentration: "Concentration",
    injectionVolume: "Volume d'Injection",
    insulinSyringe: "Seringue à Insuline",
    totalDoses: "Doses Totales",
    mcgPerMl: "mcg / mL",
    mlPerDose: "mL par dose",
    unitsIuMarks: "unités (graduations UI)",
    fromVial: "du flacon",
    units: "unités",
    overHundredUnits: "> 100 unités",
    zeroUnits: "0 unités",
    ml: "mL",
    overOneMl: "> 1,0 mL (utiliser une seringue plus grande)",
    zeroMl: "0,000 mL",
    syringeLabel: "Seringue à Insuline (100 unités = 1 mL)",
    warningNote: "Note :",
    warningText: "La dose calculée dépasse une seringue à insuline standard de 100 unités (1 mL). Envisagez d'ajouter plus d'eau bactériostatique pour augmenter le volume, ce qui réduira la concentration et le volume d'injection par dose.",
    enterValues: "Entrez des valeurs valides ci-dessus pour voir vos résultats calculés.",
    quickReference: "Référence Rapide",
    unitConversions: "Conversions d'Unités",
    standardSyringe: "Seringue Standard",
    theFormula: "La Formule",
    mgToMcg: "1 mg = 1 000 mcg",
    mlToUnits: "1 mL = 100 unités d'insuline",
    u100Syringe: "Seringue à insuline U-100",
    hundredUnitsOneMl: "100 unités = 1,0 mL",
    formulaLine1: "Dose (mcg) / Concentration (mcg/mL)",
    formulaLine2: "= Volume à injecter (mL)",
  },

  whyOrynPage: {
    differentiators: [
      { title: "Stylos à Peptides Pré-dosés", description: "Contrairement aux concurrents qui vendent des flacons en vrac nécessitant une reconstitution, ORYN propose des stylos à peptides pré-mélangés et dosés avec précision, prêts pour une utilisation immédiate en recherche. Pas de mélange, pas de calculs, pas de risque de contamination.", highlight: "Unique sur le marché britannique" },
      { title: "Pureté Vérifiée HPLC à 98%+", description: "Chaque lot ORYN dépasse 98% de pureté, vérifié indépendamment par Chromatographie Liquide Haute Performance et Spectrométrie de Masse. La plupart des concurrents britanniques n'offrent que 95% ou des déclarations non vérifiées.", highlight: "Au-dessus du standard de l'industrie" },
      { title: "Fabrication GMP au Royaume-Uni", description: "Tous les peptides ORYN sont fabriqués dans des installations certifiées GMP conformes aux normes de production pharmaceutique. Traçabilité complète des lots de la matière première au produit fini.", highlight: "Qualité pharmaceutique" },
      { title: "Livraison Gratuite au Royaume-Uni pour les Commandes Supérieures à €150", description: "Profitez de la livraison gratuite le lendemain pour toutes les commandes britanniques supérieures à €150. L'emballage à température contrôlée garantit l'intégrité des peptides de nos installations à votre laboratoire de recherche.", highlight: "Livraison le lendemain" },
      { title: "COA Complet avec Chaque Commande", description: "Chaque commande ORYN est expédiée avec un Certificat d'Analyse complet confirmant la pureté, l'identité, les niveaux d'endotoxines et la stérilité. Pas d'attente, pas de demande — il est inclus en standard.", highlight: "Transparence garantie" },
      { title: "Production en Salle Blanche ISO 7", description: "Les peptides ORYN sont conditionnés et scellés dans des salles blanches classées ISO 7 avec surveillance environnementale continue. Cela dépasse les normes de la plupart des fournisseurs de peptides britanniques.", highlight: "Environnement de qualité hospitalière" },
    ],
    comparisonFeatures: [
      { feature: "Format de Livraison", oryn: "Système de Stylo Pré-dosé", competitor: "Flacons en Vrac (reconstitution requise)" },
      { feature: "Standard de Pureté", oryn: "98%+ Vérifié HPLC et MS", competitor: "95%+ (souvent non vérifié)" },
      { feature: "Protocole de Tests", oryn: "HPLC + Spectrométrie de Masse + Endotoxines", competitor: "HPLC de base uniquement" },
      { feature: "Livraison Royaume-Uni", oryn: "Gratuite au-dessus de €150 (le lendemain)", competitor: "Variable (€5–€15)" },
      { feature: "COA Inclus", oryn: "Chaque lot, chaque commande", competitor: "Sur demande (si disponible)" },
      { feature: "Installation de Production", oryn: "Salle Blanche ISO 7, Certifiée GMP", competitor: "Variable (souvent non divulgué)" },
      { feature: "Stérilité", oryn: "Filtre 0,22μm + Rayons Gamma", competitor: "Filtration uniquement" },
      { feature: "Durée de Conservation", oryn: "24 mois (scellé)", competitor: "6–12 mois" },
      { feature: "Support Client", oryn: "Équipe de recherche dédiée", competitor: "Email uniquement" },
      { feature: "Gamme de Produits", oryn: "10 peptides sur 3 systèmes de livraison", competitor: "5–8 peptides, flacons uniquement" },
    ],
    stats: [
      { value: "10", label: "Peptides de Recherche", sublabel: "sur 3 systèmes de livraison" },
      { value: "98%+", label: "Pureté Vérifiée", sublabel: "testé HPLC + MS" },
      { value: "ISO 7", label: "Standard Salle Blanche", sublabel: "qualité pharmaceutique" },
      { value: "15+", label: "Villes Britanniques Desservies", sublabel: "livraison le lendemain" },
      { value: "40+", label: "Zones de Londres", sublabel: "expédition le jour même disponible" },
      { value: "24", label: "Mois de Conservation", sublabel: "scellé, réfrigéré" },
    ],
    tableOryn: "ORYN",
    tableCompetitors: "CONCURRENTS TYPIQUES AU ROYAUME-UNI",
    feature: "Caractéristique",
    viewProducts: "VOIR NOS PRODUITS",
    ourNumbers: "NOS CHIFFRES",
    comparisonTitle: "Comment ORYN Se Compare",
    comparisonSubtitle: "Découvrez comment ORYN se compare aux fournisseurs de peptides typiques au Royaume-Uni.",
  },

  wholesalePage: {
    breadcrumbHome: "ACCUEIL",
    breadcrumbWholesale: "GROSSISTE",
    heroBulkOrders: "COMMANDES EN GROS",
    heroTitle1: "Grossiste et Commandes",
    heroTitle2: "en Volume",
    heroDescription: "ORYN fournit des systèmes de stylos peptidiques de qualité recherche aux universités, laboratoires, cliniques et distributeurs au Royaume-Uni et en Europe. Remises sur volume de 5% à 15% — avec tarification personnalisée pour les contrats à grande échelle.",
    statMinOrderLabel: "Commande Min.",
    statMinOrderValue: "3 Unités",
    statMaxDiscountLabel: "Remise Max.",
    statMaxDiscountValue: "15% Off",
    statPurityLabel: "Pureté",
    statPurityValue: ">99%",
    statDispatchLabel: "Expédition UK",
    statDispatchValue: "Jour Même",
    tiersLabel: "TARIFICATION PAR VOLUME",
    tiersTitle1: "Niveaux de",
    tiersTitle2: "Remise",
    tiersDescription: "Mélangez et associez n'importe quels produits de toute notre gamme. Les remises s'appliquent automatiquement selon le nombre total d'unités.",
    tierMostPopular: "PLUS POPULAIRE",
    tierOffRetail: "SUR PRIX PUBLIC",
    tierPricing: "TARIFICATION",
    tierLabelStarter: "DÉBUTANT",
    tierLabelProfessional: "PROFESSIONNEL",
    tierLabelEnterprise: "ENTREPRISE",
    tierLabelCustom: "DEVIS PERSONNALISÉ",
    benefitsLabel: "AVANTAGES GROSSISTE",
    benefitsTitle1: "Pourquoi Partnériser Avec",
    benefitsTitle2: "ORYN",
    benefitsDescription: "Au-delà de la tarification par volume, les comptes grossistes ORYN débloquent une suite de services conçus pour les acheteurs professionnels.",
    benefitAccountManagerTitle: "Responsable de Compte Dédié",
    benefitAccountManagerDesc: "Un point de contact unique pour les commandes, la tarification et les questions techniques. Votre responsable de compte comprend vos besoins.",
    benefitShippingTitle: "Livraison Prioritaire",
    benefitShippingDesc: "Les commandes en gros sont expédiées le jour même si passées avant 14h. Emballage contrôlé en température inclus sans frais supplémentaires.",
    benefitVolumePricingTitle: "Tarification par Volume",
    benefitVolumePricingDesc: "Remises automatiques de 5% à 15% selon la quantité commandée. Tarification personnalisée disponible pour les contrats récurrents.",
    benefitCOATitle: "COA Inclus",
    benefitCOADesc: "Chaque expédition en gros comprend des Certificats d'Analyse spécifiques au lot. Traçabilité complète de la synthèse à la livraison.",
    benefitCustomLabellingTitle: "Étiquetage Personnalisé",
    benefitCustomLabellingDesc: "Marque blanche et emballage personnalisé disponibles pour les distributeurs et cliniques. Commandes minimales de 50 unités pour les étiquettes personnalisées.",
    benefitTechSupportTitle: "Support Technique",
    benefitTechSupportDesc: "Accès à notre équipe scientifique peptidique pour des conseils de protocole, recommandations de stockage et spécifications produits.",
    whoWeServeLabel: "NOS CLIENTS",
    whoWeServeTitle1: "Qui Nous",
    whoWeServeTitle2: "Servons",
    whoWeServeDescription: "Les peptides en gros ORYN sont approuvés par des professionnels de la recherche et des organisations au Royaume-Uni et en Europe.",
    customerUniversitiesTitle: "Universités & Académie",
    customerUniversitiesDesc: "Départements de recherche et programmes de troisième cycle étudiant la biologie peptidique, la pharmacologie et la médecine régénérative.",
    customerResearchLabsTitle: "Laboratoires de Recherche",
    customerResearchLabsDesc: "Laboratoires de recherche privés et publics conduisant des études in vitro et in vivo avec des composés peptidiques de qualité recherche.",
    customerPharmaTitle: "Entreprises Pharmaceutiques",
    customerPharmaDesc: "Divisions R&D pharmaceutiques utilisant des peptides de standard de référence pour le développement de médicaments et les études de comparaison analytique.",
    customerClinicsTitle: "Cliniques & Cabinets Médicaux",
    customerClinicsDesc: "Cliniques de médecine intégrative et praticiens nécessitant un approvisionnement constant en peptides de haute pureté pour la recherche clinique.",
    customerDistributorsTitle: "Distributeurs & Revendeurs",
    customerDistributorsDesc: "Partenaires grossistes distribuant les produits ORYN au Royaume-Uni et en Europe. Options marque blanche disponibles.",
    customerBiotechTitle: "Startups Biotech",
    customerBiotechDesc: "Entreprises biotech émergentes ayant besoin d'un approvisionnement fiable en peptides pour le développement de produits et les études de preuve de concept.",
    productsLabel: "EXEMPLES DE TARIFICATION GROSSISTE",
    productsTitle1: "Produits aux",
    productsTitle2: "Prix Grossiste",
    productsDescription: "Découvrez comment la tarification par volume réduit votre coût par unité. Tous les produits ORYN sont éligibles aux remises grossiste.",
    productRetailLabel: "PRIX PUBLIC",
    productViewAll: "VOIR LES {count} PRODUITS",
    faqLabel: "FAQ",
    faqTitle1: "Questions",
    faqTitle2: "Fréquentes",
    faqDescription: "Questions fréquentes sur notre programme grossiste, la tarification et la création de compte.",
    ctaTitle: "Prêt à Commander en Gros ?",
    ctaDescription: "Contactez notre équipe grossiste pour configurer votre compte, discuter des tarifs personnalisés et commencer à économiser sur les stylos peptidiques de qualité recherche.",
    ctaEnquiry: "DEMANDE GROSSISTE",
    ctaBrowseProducts: "VOIR LES PRODUITS",
  },

  share: {
    label: "PARTAGER",
  },

  socialProof: {
    from: "de",
    purchased: "a acheté",
    minAgo: "il y a {min} min",
  },

  flashSale: {
    flash: "Vente Flash — Utilisez le code FLASH15 pour 15% de remise sur tous les stylos peptidiques",
    weekend: "Offre Week-end — Utilisez le code WEEKEND10 pour 10% de remise",
  },

  qualityPage: {
    breadcrumbHome: "ACCUEIL",
    breadcrumbQuality: "QUALITÉ & ANALYSES",
    heroBadge: "VÉRIFIÉ PAR DES TIERS",
    heroTitle1: "Transparence à",
    heroTitle2: "Chaque Lot",
    heroDescription:
      "Chaque peptide ORYN est analysé de manière indépendante par des laboratoires accrédités ISO. Nous publions des Certificats d'Analyse pour chaque produit car nous croyons que vous méritez de voir exactement ce que vous recevez — pureté, identité et stérilité, vérifiés par la science, pas par le marketing.",
    statPurityLabel: "PURETÉ DU LOT",
    statLabsLabel: "LABORATOIRES INDÉPENDANTS",
    statTestsLabel: "TESTS PAR LOT",
    statTraceabilityLabel: "TRAÇABILITÉ",
    processLabel: "NOTRE PROCESSUS",
    processTitle1: "De la Synthèse au",
    processTitle2: "Certificat",
    processDescription:
      "Un pipeline rigoureux d'assurance qualité en quatre étapes garantit que chaque peptide ORYN satisfait les plus hautes normes analytiques avant sa mise en circulation.",
    testingSteps: [
      {
        title: "Synthèse de Peptides",
        description:
          "Synthèse de peptides en phase solide (SPPS) dans des installations certifiées GMP en Corée du Sud sous système de management de la qualité ISO 9001.",
      },
      {
        title: "Analyse HPLC",
        description:
          "La Chromatographie Liquide Haute Performance sépare et quantifie la pureté des peptides, confirmant >98% pour chaque lot.",
      },
      {
        title: "Spectrométrie de Masse",
        description:
          "La confirmation d'identité LC-MS/MS vérifie le poids moléculaire exact et l'intégrité de la séquence d'acides aminés.",
      },
      {
        title: "Génération du Certificat",
        description:
          "Un laboratoire indépendant émet un Certificat d'Analyse spécifique au lot avec toutes les données analytiques et les critères d'acceptation/rejet.",
      },
    ],
    certificationsLabel: "CERTIFICATIONS",
    standardsTitle1: "Normes Qualité qui",
    standardsTitle2: "Nous Définissent",
    standardsDescription:
      "Notre infrastructure de fabrication et d'analyse répond aux exigences qualité pharmaceutiques les plus strictes du secteur.",
    qualityStandards: [
      {
        title: "Fabrication GMP",
        description:
          "Installations de production certifiées Bonnes Pratiques de Fabrication dans toute l'UE, garantissant une cohérence de qualité pharmaceutique.",
      },
      {
        title: "Qualité ISO 9001",
        description:
          "Système de management de la qualité reconnu internationalement, régissant chaque étape des matières premières au produit fini.",
      },
      {
        title: "Salle Blanche ISO 7",
        description:
          "Le remplissage stérile est effectué dans des salles blanches classifiées ISO 7 avec filtration HEPA et surveillance environnementale continue.",
      },
      {
        title: "Pureté Vérifiée par HPLC",
        description:
          "Chaque lot vérifié par analyse HPLC indépendante. La plupart des lots dépassent 99% de pureté — parmi les plus élevés du marché européen.",
      },
    ],
    coaLabel: "CERTIFICATS D'ANALYSE",
    coaTitle1: "COA pour Chaque",
    coaTitle2: "Produit",
    coaDescription:
      "Chacun de nos produits peptidiques est vérifié de manière indépendante. Voici les derniers résultats de tests par lot.",
    passLabel: "CONFORME",
    purityLabel: "PURETÉ",
    batchLabel: "LOT",
    testedLabel: "ANALYSÉ",
    methodLabel: "MÉTHODE",
    testedDate: "Fév 2026",
    viewCoa: "VOIR COA",
    independentLabel: "VÉRIFICATION INDÉPENDANTE",
    partnersTitle1: "Laboratoires d'Analyse",
    partnersTitle2: "Indépendants",
    partnersP1:
      "ORYN ne teste pas ses propres produits. Chaque Certificat d'Analyse est généré par des laboratoires analytiques indépendants accrédités ISO 17025, sans aucune relation financière avec notre opération de fabrication.",
    partnersP2:
      "Cette séparation garantit une vérification impartiale et scientifiquement rigoureuse de la pureté, de l'identité et de la stérilité. Nos partenaires de test utilisent des méthodes analytiques validées incluant HPLC en phase inverse, LC-MS/MS, test LAL d'endotoxines et stérilité par filtration sur membrane.",
    partnersBullets: [
      "Laboratoires analytiques accrédités ISO 17025",
      "Aucun lien financier avec la fabrication ORYN",
      "Méthodes validées HPLC et spectrométrie de masse",
      "Vérification des endotoxines et de la stérilité",
      "Traçabilité complète du lot de la synthèse au certificat",
    ],
    analyticalMethodsLabel: "MÉTHODES ANALYTIQUES",
    analyticalMethods: [
      {
        method: "Test de Pureté HPLC",
        description:
          "Colonne C18 en phase inverse, détection UV à 220 nm. Quantifie la pureté des peptides et détecte les impuretés.",
          standard: "USP <621>",
      },
      {
        method: "Spectrométrie de Masse (LC-MS)",
        description:
          "Ionisation par électrospray avec détection de masse haute résolution. Confirme l'identité moléculaire.",
          standard: "ISO 13528",
      },
      {
        method: "Test d'Endotoxines",
        description:
          "Essai turbidimétrique cinétique LAL (Lysat d'Amébocytes de Limule). Garantit que les niveaux d'endotoxines bactériennes sont en dessous des limites.",
          standard: "USP <85>",
      },
      {
        method: "Test de Stérilité",
        description:
          "Méthode de filtration sur membrane avec incubation de 14 jours dans les milieux TSB et FTM.",
          standard: "USP <71>",
      },
    ],
    understandingLabel: "COMPRENDRE VOTRE COA",
    coaContentsTitle1: "Ce que Contient",
    coaContentsTitle2: "Chaque COA",
    coaContentsDescription:
      "Chaque Certificat d'Analyse ORYN fournit une transparence analytique complète. Voici ce que vous trouverez dans chaque document.",
    coaItems: [
      {
        title: "Identité du Peptide",
        details:
          "Nom du composé, formule moléculaire, poids moléculaire, séquence d'acides aminés et numéro CAS.",
      },
      {
        title: "Données de Pureté HPLC",
        details:
          "Chromatogramme, temps de rétention, pourcentage d'aire de pic et profil d'impuretés avec critères d'acceptation.",
      },
      {
        title: "Spectre de Masse",
        details:
          "Confirmation d'identité LC-MS montrant le poids moléculaire observé vs théorique et les états de charge.",
      },
      {
        title: "Résultats d'Endotoxines",
        details:
          "Résultats du test LAL en UE/mL avec limites de spécification. Tous les produits ORYN testent en dessous de 0,5 UE/mL.",
      },
      {
        title: "Rapport de Stérilité",
        details:
          "Résultats d'incubation de 14 jours dans les milieux TSB et FTM confirmant l'absence de croissance microbienne.",
      },
      {
        title: "Informations sur le Lot",
        details:
          "Numéro de lot unique, date de fabrication, date d'analyse, date d'expiration et identification de l'analyste.",
      },
    ],
    faqLabel: "FAQ",
    faqTitle1: "Qualité & Analyses",
    faqTitle2: "FAQ",
    faqDescription:
      "Questions fréquentes sur notre processus d'assurance qualité, les tests de pureté des peptides et les Certificats d'Analyse.",
    ctaTitle: "Qualité que Vous Pouvez Vérifier",
    ctaDescription:
      "Chaque peptide ORYN est livré avec un numéro de lot que vous pouvez tracer jusqu'à un Certificat d'Analyse indépendant. Vérifiez la science par vous-même.",
    ctaBrowseProducts: "VOIR LES PRODUITS",
    ctaRequestCoa: "DEMANDER UN COA",
  },

  shippingPage: {
    heroTagline: "TEMPÉRATURE CONTRÔLÉE",
    heroTitle1: "Livraison &",
    heroTitle2: "Expédition",
    heroDescription:
      "Chaque commande ORYN est expédiée le jour même dans un emballage à température contrôlée, garantissant que vos stylos peptidiques arrivent en parfait état. Livraison gratuite au Royaume-Uni dès \u20ac{threshold}.",
    breadcrumbHome: "ACCUEIL",
    breadcrumbShipping: "LIVRAISON & EXPÉDITION",
    statUkDeliveryLabel: "Livraison UK",
    statUkDeliveryValue: "2-4 Jours",
    statDispatchLabel: "Expédition",
    statDispatchValue: "Même Jour",
    statFreeOverLabel: "Gratuit Dès",
    statPackagingLabel: "Emballage",
    statPackagingValue: "2-8\u00b0C",
    ukZonesSectionLabel: "ZONES DE LIVRAISON UK",
    ukZonesSectionTitle1: "Délais de Livraison par",
    ukZonesSectionTitle2: "Région",
    ukZonesSectionDescription:
      "Toutes les commandes passées avant 14h GMT sont expédiées le jour ouvrable même. Les délais indiqués sont en jours ouvrables à partir de l'expédition.",
    ukDeliveryNote:
      "Les délais sont estimatifs pour la livraison standard. Des options express sont disponibles au paiement. Les commandes passées le week-end ou les jours fériés sont expédiées le prochain jour ouvrable.",
    ukZones: [
      { region: "Londres & Sud-Est", days: "1 \u2013 2 jours" },
      { region: "Midlands & Anglie Orientale", days: "2 \u2013 3 jours" },
      { region: "Nord de l'Angleterre", days: "2 \u2013 3 jours" },
      { region: "Écosse (Basses Terres)", days: "3 \u2013 4 jours" },
      { region: "Pays de Galles", days: "2 \u2013 3 jours" },
      { region: "Irlande du Nord", days: "3 \u2013 4 jours" },
      { region: "Highlands & Îles", days: "4 \u2013 5 jours" },
    ],
    coldChainSectionLabel: "LOGISTIQUE CHAÎNE DU FROID",
    packagingTitle1: "Emballage à",
    packagingTitle2: "Température Contrôlée",
    packagingDescription:
      "Les peptides nécessitent un stockage réfrigéré à 2-8\u00b0C. Notre emballage de chaîne du froid garantit que votre commande maintient une température optimale tout au long du transit.",
    packagingBullets: [
      "Maintient 2-8\u00b0C jusqu'à 48 heures en transit",
      "Sachets de gel non toxiques, prérefroidis à 2\u00b0C",
      "Conteneurs isolants multicouches",
      "Protection renforcée pendant les mois d'été",
      "Inserts en mousse sur mesure pour les stylos",
    ],
    coldChainFeatures: [
      {
        title: "Boîtes d'Expédition Isolées",
        description:
          "Les conteneurs isolants multicouches maintiennent la température interne à 2-8\u00b0C jusqu'à 48 heures, protégeant l'intégrité des peptides de l'entrepôt à la porte.",
      },
      {
        title: "Sachets de Gel Froid",
        description:
          "Des sachets de gel à changement de phase non toxiques prérefroidis à 2\u00b0C assurent un refroidissement continu sans risque de congélation.",
      },
      {
        title: "Ajustements Saisonniers",
        description:
          "Pendant les mois d'été (juin-septembre), nous ajoutons des sachets de gel supplémentaires et une isolation renforcée. En cas de chaleur extrême, nous optons pour une livraison express.",
      },
      {
        title: "Suivi de Température",
        description:
          "Les commandes en gros de 25+ unités incluent des bandelettes indicatrices de température confirmant que la livraison est restée dans la plage 2-8\u00b0C.",
      },
    ],
    euSectionLabel: "EXPÉDITION INTERNATIONALE",
    euSectionTitle1: "Livraison",
    euSectionTitle2: "Européenne",
    euSectionDescription:
      "ORYN livre dans plus de 15 pays européens avec un suivi complet et un emballage à température contrôlée.",
    euCountriesHeader: "PAYS UE OÙ NOUS LIVRONS",
    euCountriesNotListed:
      "Votre pays n'est pas listé ? Contactez-nous \u2014 nous pourrons peut-être organiser la livraison.",
    euDeliveryTimeTitle: "Délai de Livraison",
    euDeliveryTimeValue: "3 \u2013 7 jours",
    euDeliveryTimeDescription:
      "Jours ouvrables à partir de l'expédition. Europe de l'Ouest : 3-5 jours, Europe de l'Est : 5-7 jours.",
    euShippingCostTitle: "Frais d'Expédition",
    euShippingCostValue: "Tarif Forfaitaire",
    euShippingCostDescription:
      "Expédition à tarif forfaitaire vers toutes les destinations européennes. Calculé au paiement selon le pays de destination et le poids de la commande.",
    euCustomsTitle: "Douanes & Taxes",
    euCustomsValue: "Responsabilité de l'Acheteur",
    euCustomsDescription:
      "Les commandes internationales peuvent être soumises à des droits de douane et à des taxes d'importation. Ces frais sont à la charge du client.",
    euTrackingTitle: "Suivi",
    euTrackingValue: "Suivi Complet",
    euTrackingDescription:
      "Tous les envois internationaux comprennent un suivi de bout en bout avec des mises à jour en temps réel par email.",
    freeShippingSectionLabel: "LIVRAISON GRATUITE",
    freeShippingTitle1: "Livraison UK Gratuite Dès",
    freeShippingTitle2: "\u20ac{threshold}",
    freeShippingDescription:
      "Les commandes supérieures à \u20ac{threshold} bénéficient de la livraison standard gratuite au Royaume-Uni. Suivez votre progression dans votre panier.",
    freeShippingExampleLabel: "EXEMPLE : COMMANDE DE \u20ac120",
    freeShippingExampleAway: "\u20ac30 pour obtenir la livraison gratuite",
    discreetTitle: "Emballage Discret",
    discreetDescription:
      "Toutes les commandes ORYN sont expédiées dans des boîtes neutres et non marquées. Aucun nom de produit, marque ou description n'est visible sur l'emballage extérieur.",
    discreetItems: [
      "Boîte extérieure neutre",
      "Aucune marque visible",
      "Nom d'expéditeur générique",
      "Aucune description de produit",
    ],
    trackingTitle: "Suivi de Commande",
    trackingDescription:
      "Chaque commande reçoit un numéro de suivi dans les 2 heures suivant l'expédition. Suivez votre colis en temps réel de notre entrepôt à votre porte.",
    trackingItems: [
      "Email de suivi dans les 2 heures",
      "Mises à jour en temps réel",
      "Fenêtre de livraison estimée",
      "Confirmation de livraison",
    ],
    returnsTitle: "Retours & Remboursements",
    returnsDescription:
      "Si votre commande arrive endommagée ou incorrecte, contactez-nous dans les 48 heures. Nous organiserons un remplacement ou un remboursement complet sans frais supplémentaires.",
    returnsItems: [
      "Fenêtre de 48 heures pour signaler les dommages",
      "Remplacement complet ou remboursement",
      "Preuve photo requise",
      "Retour gratuit pour les erreurs",
    ],
    faqSectionLabel: "FAQ",
    faqSectionTitle1: "Questions sur",
    faqSectionTitle2: "la Livraison",
    faqSectionDescription:
      "Questions fréquentes sur la livraison de peptides, l'emballage et les options d'expédition.",
    ctaTitle: "Commandez Aujourd'hui, Recevez Cette Semaine",
    ctaDescription:
      "Expédition le jour même avant 14h. Livraison à température contrôlée. Livraison UK gratuite dès \u20ac{threshold}.",
    ctaShopNow: "ACHETER MAINTENANT",
    ctaContactUs: "NOUS CONTACTER",
  },

  termsPage: {
    tagline: "LÉGAL",
    title: "Conditions Générales d'Utilisation",
    lastUpdated: "Dernière mise à jour : mars 2026",
    sections: [
      {
        heading: "1. Acceptation des Conditions",
        content:
          "En accédant et en utilisant le site web et les services d'ORYN Peptide Labs, vous acceptez d'être lié par ces Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
      },
      {
        heading: "2. Usage à des Fins de Recherche Uniquement",
        content:
          "Tous les produits vendus par ORYN Peptide Labs sont destinés uniquement à des fins de laboratoire et de recherche. Les produits ne sont pas destinés à la consommation humaine ou animale. En achetant, vous confirmez que vous acquérez les produits à des fins de recherche légitimes et respectez toutes les lois et réglementations applicables dans votre juridiction.",
      },
      {
        heading: "3. Éligibilité",
        content:
          "Vous devez avoir au moins 18 ans et représenter une organisation de recherche légitime, un laboratoire ou une institution académique pour acheter des produits. ORYN se réserve le droit de demander une vérification des accréditations de recherche.",
      },
      {
        heading: "4. Commandes et Paiement",
        content:
          "Tous les prix sont indiqués en EUR. Le paiement est traité de manière sécurisée. ORYN se réserve le droit d'annuler les commandes qui semblent frauduleuses ou qui violent ces conditions. Pour les commandes en gros : 50 % de paiement à l'avance, 50 % avant l'expédition.",
      },
      {
        heading: "5. Expédition et Livraison",
        content:
          "Les produits sont expédiés avec une manutention en chaîne du froid si nécessaire. Les délais de livraison sont des estimations. ORYN n'est pas responsable des retards causés par les douanes, les transporteurs ou les événements de force majeure.",
      },
      {
        heading: "6. Retours et Remboursements",
        content:
          "En raison de la nature de nos produits, les retours ne sont acceptés que pour les articles endommagés ou incorrects dans les 14 jours suivant la livraison. Les produits doivent être non ouverts et dans leur emballage d'origine.",
      },
      {
        heading: "7. Propriété Intellectuelle",
        content:
          "Tout le contenu, la marque et les matériaux de ce site web sont la propriété d'ORYN Peptide Labs. La reproduction non autorisée est interdite.",
      },
      {
        heading: "8. Limitation de Responsabilité",
        content:
          "ORYN Peptide Labs fournit des produits en l'état à des fins de recherche. Nous n'offrons aucune garantie quant à l'adéquation à un usage particulier au-delà des spécifications indiquées. Notre responsabilité est limitée au prix d'achat du produit.",
      },
      {
        heading: "9. Contact",
        content: "Pour toute question concernant ces conditions, contactez-nous à legal@orynlabs.com.",
      },
    ],
  },

  privacyPage: {
    tagline: "LÉGAL",
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour : mars 2026",
    sections: [
      {
        heading: "1. Informations que Nous Collectons",
        content:
          "Nous collectons les informations que vous fournissez directement : nom, e-mail, organisation, adresse de livraison et coordonnées de paiement lors de la création d'un compte ou d'une commande.",
      },
      {
        heading: "2. Comment Nous Utilisons Vos Informations",
        content:
          "Vos informations sont utilisées pour : traiter les commandes, communiquer au sujet de votre compte, fournir un support client, envoyer des mises à jour de commande et respecter les obligations légales. Nous ne vendons pas vos données personnelles.",
      },
      {
        heading: "3. Protection des Données",
        content:
          "ORYN Peptide Labs est conforme au RGPD et aux réglementations européennes applicables en matière de protection des données. Vos données sont stockées en toute sécurité avec chiffrement au repos et en transit.",
      },
      {
        heading: "4. Vos Droits",
        content:
          "En vertu du RGPD, vous avez le droit d'accéder à vos données, de rectifier les inexactitudes, de demander la suppression, de restreindre le traitement, la portabilité des données et de vous opposer au traitement. Contactez privacy@orynlabs.com pour exercer ces droits.",
      },
      {
        heading: "5. Cookies",
        content:
          "Nous utilisons des cookies essentiels pour le bon fonctionnement du site et des cookies analytiques pour améliorer notre service. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.",
      },
      {
        heading: "6. Contact",
        content: "Délégué à la Protection des Données : privacy@orynlabs.com",
      },
    ],
  },

  disclaimerPage: {
    tagline: "LÉGAL",
    title: "Avertissement de Recherche",
    lastUpdated: "Dernière mise à jour : mars 2026",
    alertTitle: "Avis Important",
    alertContent:
      "Tous les produits vendus par ORYN Peptide Labs sont strictement destinés à la recherche en laboratoire et à l'étude scientifique. Ils ne sont PAS destinés à un usage humain ou vétérinaire, aux additifs alimentaires, aux médicaments, aux cosmétiques, aux produits chimiques ménagers ou à toute autre forme de consommation.",
    buyerResponsibilityIntro:
      "En achetant auprès d'ORYN Peptide Labs, l'acheteur reconnaît et accepte que :",
    buyerResponsibilityItems: [
      "Les produits seront utilisés uniquement à des fins de recherche légitimes",
      "L'acheteur connaît et respecte toutes les réglementations applicables",
      "Les produits ne seront pas revendus pour la consommation humaine",
      "L'acheteur assume l'entière responsabilité de la manipulation et de l'utilisation appropriées",
      "L'acheteur est majeur et représente une entité de recherche légitime",
    ],
    sections: [
      {
        heading: "Déclaration d'Usage à des Fins de Recherche",
        content:
          "ORYN Peptide Labs fabrique et distribue des composés peptidiques exclusivement pour la recherche in vitro, l'expérimentation en laboratoire et l'investigation scientifique. Tous les composés sont fournis en tant que produits chimiques de recherche avec des Certificats d'Analyse (COA) joints pour la vérification des lots.",
      },
      {
        heading: "Responsabilité de l'Acheteur",
        content: "",
      },
      {
        heading: "Aucune Allégation Médicale",
        content:
          "ORYN Peptide Labs ne fait aucune allégation concernant les propriétés thérapeutiques, diagnostiques ou préventives de quelque produit que ce soit. Les descriptions de produits font référence à la littérature scientifique publiée à des fins d'information uniquement et ne constituent pas un avis médical ni des allégations d'efficacité.",
      },
      {
        heading: "Assurance Qualité",
        content:
          "Tous les produits ORYN sont fabriqués dans des salles blanches ISO Classe 7 certifiées GMP avec validation analytique par des tiers. Les niveaux de pureté dépassent 99 % selon les analyses HPLC. La documentation complète des lots, incluant COA, données de stabilité et documentation DMF, est disponible sur demande.",
      },
      {
        heading: "Conformité Réglementaire",
        content:
          "Il incombe à l'acheteur de s'assurer du respect de toutes les réglementations locales, nationales et internationales concernant l'achat, l'importation, la possession et l'utilisation de peptides de recherche. ORYN Peptide Labs opère dans le cadre des réglementations européennes.",
      },
    ],
  },

  compare: {
    title: "Comparer les Produits",
    customTitle: "Personnalis\u00e9",
    compare: "COMPARER",
    comparing: "EN COMPARAISON",
    compareNow: "COMPARER",
    clearAll: "TOUT EFFACER",
    selectMore: "S\u00e9lectionnez 1 de plus",
    remove: "Supprimer",
    productsSelected: "produits s\u00e9lectionn\u00e9s",
    emptyMessage: "S\u00e9lectionnez au moins 2 produits du catalogue pour les comparer c\u00f4te \u00e0 c\u00f4te.",
  },
} as unknown as Dictionary;

export default fr;
