export interface Dictionary {
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    ogDescription: string;
  };

  header: {
    announcementText: string;
    shopNow: string;
    myAccount: string;
    signIn: string;
    searchPlaceholder: string;
    noResults: string;
    typeToSearch: string;
    viewAll: string;
  };

  nav: {
    products: string;
    science: string;
    about: string;
    contact: string;
    compare: string;
    learn: string;
  };

  hero: {
    tagline: string;
    subtitle: string;
    description: string;
    explorePeptides: string;
    ourScience: string;
    purityLabel: string;
    dosingLabel: string;
    dosingValue: string;
    trustFreeShipping: string;
    trustSecure: string;
    trustCOA: string;
    socialProofCount: string;
    socialProofLabel: string;
    stats: {
      peptidesValue: string;
      peptidesLabel: string;
      purityValue: string;
      purityLabel: string;
      cleanroomValue: string;
      cleanroomLabel: string;
      certifiedValue: string;
      certifiedLabel: string;
    };
  };

  categories: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    from: string;
    items: Array<{
      name: string;
      tagline: string;
      description: string;
    }>;
  };

  showcase: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    viewAll: string;
    trustShipping: string;
    trustPurity: string;
    trustCOA: string;
    trustReturn: string;
  };

  science: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    specs: {
      manufacturingLabel: string;
      manufacturingValue: string;
      capacityLabel: string;
      capacityValue: string;
      batchSizeLabel: string;
      batchSizeValue: string;
      leadTimeLabel: string;
      leadTimeValue: string;
    };
    steps: Array<{
      title: string;
      description: string;
    }>;
  };

  howItWorks: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    cta: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };

  quality: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };

  cta: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    browseProducts: string;
    contactTeam: string;
    valueProp1: string;
    valueProp2: string;
    valueProp3: string;
    badges: Array<{ value: string; label: string }>;
  };

  footer: {
    description: string;
    researchOnly: string;
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    newsletterSuccess: string;
    paymentMethods: string;
    sections: {
      products: string;
      company: string;
      legal: string;
    };
    productLinks: {
      all: string;
      pens: string;
      medit: string;
      novadose: string;
    };
    companyLinks: {
      about: string;
      science: string;
      contact: string;
      quality: string;
      whyOryn: string;
      researchHub: string;
      calculator: string;
    };
    trustBadges: {
      ssl: string;
      secure: string;
      coa: string;
      guarantee: string;
    };
    legalLinks: {
      terms: string;
      privacy: string;
      disclaimer: string;
    };
    seoSections: {
      researchAreas: string;
      learn: string;
      ukDelivery: string;
      ukRegions: string;
      ukCounties: string;
      peptideEncyclopedia: string;
      resources: string;
      londonDelivery: string;
      europeanDelivery: string;
      topEuCities: string;
    };
    certifications: Array<{ label: string; detail: string }>;
    copyright: string;
  };

  productCard: {
    purity: string;
    pharmaGrade: string;
    details: string;
    addToCart: string;
  };

  cart: {
    title: string;
    empty: string;
    emptySubtext: string;
    browseProducts: string;
    continueShopping: string;
    subtotal: string;
    checkout: string;
    researchOnly: string;
    itemsLabel: string;
    freeShippingAway: string;
    freeShippingUnlocked: string;
    youMightLike: string;
    trustSecure: string;
    trustDiscreet: string;
    trustCOA: string;
    orderSummary: string;
    shipping: string;
    free: string;
    atCheckout: string;
    total: string;
    volumeDiscount: string;
    saveForLater: string;
    saved: string;
    save: string;
  };

  productsPage: {
    label: string;
    title: string;
    description: string;
    all: string;
    disclaimer: string;
    results: string;
    searchPlaceholder: string;
    sortBy: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortName: string;
    noResults: string;
    noCategory: string;
    clearFilters: string;
  };

  productDetail: {
    notFound: string;
    backToProducts: string;
    home: string;
    products: string;
    perUnit: string;
    addToCart: string;
    adding: string;
    keyBenefits: string;
    specifications: string;
    researchOnlyTitle: string;
    researchOnlyDescription: string;
    relatedProducts: string;
    trustShipping: string;
    trustPurity: string;
    trustCOA: string;
    secureCheckout: string;
    discreetShipping: string;
    inStock: string;
    readyToShip: string;
    reviews: string;
    scienceTab: string;
    readyToExperience: string;
    premiumPenDescription: string;
    // Product section headings
    dosingProtocol: string;
    howToUse: string;
    quickReference: string;
    recommendedDose: string;
    frequency: string;
    duration: string;
    proTips: string;
    stepByStep: string;
    importantLabel: string;
    safetyNote: string;
    scienceLabel: string;
    scienceBehind: string;
    compoundProfile: string;
    classificationLabel: string;
    molecularFormula: string;
    molecularWeightLabel: string;
    halfLifeLabel: string;
    sequenceLabel: string;
    researchAreasLabel: string;
    mechanismOfAction: string;
    keyResearchFindings: string;
    trustedByResearchers: string;
    whatLabsSay: string;
    fromVerifiedReviews: string;
    verifiedLabel: string;
    faqLabel: string;
    frequentlyAsked: string;
    buyInYourCity: string;
    relatedResearch: string;
    formulaLabel: string;
    weightLabel: string;
    // Cart slider
    add: string;
    // Accessibility
    closeCart: string;
    decreaseQuantity: string;
    increaseQuantity: string;
    removeItem: string;
    toggleWishlist: string;
    closeSearch: string;
    closePopup: string;
    // Trust signals (exit intent)
    purityBadge: string;
    gmpBadge: string;
    freeShippingBadge: string;
    // Pen Advantage section
    whyChoosePen: string;
    traditionalVials: string;
    orynPenSystem: string;
    vialProblems: Array<{ label: string; detail: string }>;
    comparisonBar: Array<{ vial: string; pen: string; label: string }>;
    // Product comparison
    compareWith: string;
    sideBy: string;
    vsLabel: string;
    keyDifferences: string;
    bestFor: string;
    viewProduct: string;
    comparisonDisclaimer: string;
  };

  aboutPage: {
    tagline: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDescription: string;
    brandStatement: string;
    brandHighlight: string;
    brandParagraphs: string[];
    valuesLabel: string;
    valuesTitle: string;
    values: Array<{ title: string; description: string }>;
    journeyLabel: string;
    journeyTitle: string;
    timeline: Array<{
      year: string;
      title: string;
      description: string;
    }>;
    manufacturingLabel: string;
    manufacturingTitle: string;
    manufacturingSpecs: Array<{
      value: string;
      label: string;
      sub: string;
    }>;
  };

  sciencePage: {
    tagline: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDescription: string;
    processLabel: string;
    processTitle1: string;
    processTitle2: string;
    processDescription: string;
    processSteps: Array<{
      step: string;
      label: string;
      time: string;
    }>;
    libraryLabel: string;
    libraryTitle1: string;
    libraryTitle2: string;
    classification: string;
    mechanism: string;
    researchAreas: string;
    specsLabel: string;
    specsTitle: string;
    specsItems: Array<{ value: string; label: string }>;
  };

  contactPage: {
    tagline: string;
    heroTitle: string;
    heroDescription: string;
    companyName: string;
    emailLabel: string;
    wholesaleLabel: string;
    locationLabel: string;
    locationLine1: string;
    locationLine2: string;
    infoBoxes: Array<{ title: string; description: string }>;
    formTitle: string;
    formDescription: string;
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
    inquiryType: string;
    inquiryOptions: string[];
    message: string;
    messagePlaceholder: string;
    sendMessage: string;
    messageSent: string;
    messageSentDescription: string;
  };

  checkoutPage: {
    emptyCart: string;
    emptyCartDescription: string;
    browseProducts: string;
    steps: string[];
    shippingTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    referralCode: string;
    referralCodePlaceholder: string;
    referralCodeHint: string;
    continueToPayment: string;
    paymentTitle: string;
    cardPayment: string;
    cryptoPayment: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    selectCrypto: string;
    amountToPay: string;
    discountApplied: string;
    sendToAddress: string;
    copy: string;
    copied: string;
    timeRemaining: string;
    sendBeforeExpiry: string;
    sentPayment: string;
    txHash: string;
    txHashPlaceholder: string;
    sessionExpired: string;
    restartSession: string;
    back: string;
    placeOrder: string;
    processing: string;
    orderSummary: string;
    qty: string;
    subtotal: string;
    cryptoDiscount: string;
    shipping: string;
    shippingNote: string;
    referral: string;
    total: string;
    researchOnly: string;
    orderConfirmed: string;
    orderConfirmedDescription: string;
    paymentVerifying: string;
    paymentVerifyingDescription: string;
    paymentConfirmed: string;
    referralApplied: string;
    continueShopping: string;
    secureCheckout: string;
    orderRef: string;
    contactShipping: string;
    change: string;
    emailPlaceholder: string;
    shippingAddress: string;
    useSavedAddress: string;
    selectCountry: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    addressPlaceholder: string;
    apartmentPlaceholder: string;
    cityPlaceholder: string;
    postalCodePlaceholder: string;
    phonePlaceholder: string;
    continueToShipping: string;
    shippingMethod: string;
    loadingShipping: string;
    freeShippingApplied: string;
    freeShippingLabel: string;
    freeStandardShipping: string;
    returnToInformation: string;
    returnToShipping: string;
    contact: string;
    shipTo: string;
    method: string;
    free: string;
    required: string;
    validEmailRequired: string;
    invalidCode: string;
    failedToValidate: string;
    hideOrderSummary: string;
    showOrderSummary: string;
    discount: string;
    volumeDiscountLabel: string;
    calculatedNextStep: string;
    securePayment: string;
    discreetShipping: string;
    coaIncluded: string;
    gmpCertified: string;
    allSecure: string;
    backendRequired: string;
    backendDescription: string;
    promoCodePlaceholder: string;
    apply: string;
    referralPlaceholder: string;
    sslEncrypted: string;
    purity99: string;
    guaranteed: string;
    gmpCertifiedBadge: string;
    guarantee30: string;
    noQuestions: string;
    emailHint: string;
    verifyingPayment: string;
    paymentFailed: string;
    paymentFailedDescription: string;
    tryAgain: string;
    whatHappensNext: string;
    nextSteps: string[];
    viewOrders: string;
    referralTitle: string;
    referralDescription: string;
    getReferralLink: string;
  };

  products: Record<
    string,
    {
      subtitle: string;
      categoryLabel: string;
      description: string;
      benefits: string[];
      badge?: string;
    }
  >;

  categoryNames: Record<string, string>;
  categoryDescriptions: Record<string, string>;

  /** Research area category names for footer/home SEO links */
  researchCategories: Record<string, string>;

  breadcrumbs: {
    home: string;
    products: string;
    about: string;
    science: string;
    contact: string;
    learn: string;
    quality: string;
    faq: string;
    compare: string;
    shipping: string;
    whyOryn: string;
    terms: string;
    privacy: string;
    disclaimer: string;
    cart: string;
    checkout: string;
    account: string;
    orders: string;
    referrals: string;
    wishlist: string;
    profile: string;
    wholesale: string;
    bundles: string;
    protocols: string;
    peptides: string;
    peptidePens: string;
    europe: string;
    glossary: string;
    london: string;
    encyclopedia: string;
    ukPeptideDelivery: string;
    tools: string;
    peptideCalculator: string;
  };

  homeSeo: {
    deliveryTitle: string;
    researchAreaTitle: string;
    researchHubTitle: string;
    peptidesFor: string;
  };

  testimonials: {
    label: string;
    titleLine1: string;
    titleLine2: string;
    items: Array<{
      quote: string;
      name: string;
      role: string;
    }>;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };

  localeSwitcher: {
    label: string;
    uk: string;
    eu: string;
  };

  wishlistPage: {
    title: string;
    breadcrumb: string;
    empty: string;
    emptyTitle: string;
    emptyDescription: string;
    browseProducts: string;
    itemsSaved: string;
    itemSaved: string;
  };

  faq: {
    title: string;
    label: string;
  };

  contactFaq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };

  homeFaq: {
    items: Array<{ q: string; a: string }>;
  };

  shippingFaq: {
    items: Array<{ q: string; a: string }>;
  };

  qualityFaq: {
    items: Array<{ q: string; a: string }>;
  };

  wholesaleFaq: {
    items: Array<{ q: string; a: string }>;
  };

  cookie: {
    message: string;
    privacyPolicy: string;
    acceptAll: string;
    essentialOnly: string;
  };

  toast: {
    addedToCart: string;
  };

  popups: {
    firstVisit: {
      discount: string;
      yourFirstOrder: string;
      code: string;
      tagline: string;
      title: string;
      description: string;
      benefits: string[];
      shopNow: string;
      noThanks: string;
    };
    exitIntent: {
      tagline: string;
      title: string;
      description: string;
      placeholder: string;
      claimDiscount: string;
      noSpam: string;
      welcomeTitle: string;
      welcomeMessage: string;
    };
  };

  payment: {
    processing: string;
    loadingPayment: string;
    completeOrder: string;
    sslEncrypted: string;
    pciCompliant: string;
    paymentFailed: string;
    unexpectedError: string;
    notCompleted: string;
    preparingPayment: string;
    paymentNotReady: string;
    paymentFormLoading: string;
    orderCreationFailed: string;
  };

  volumeDiscount: {
    applied: string;
    addMore: string;
    title: string;
    items: string;
    off: string;
    active: string;
    unlockMore: string;
  };

  frequentlyBought: {
    title: string;
    save: string;
    bundlePrice: string;
    addAll: string;
  };

  recentlyViewed: {
    title: string;
  };

  orderBump: {
    addToOrder: string;
    yesAddIt: string;
  };

  aria: {
    search: string;
    account: string;
    wishlist: string;
    openCart: string;
    toggleMenu: string;
    mobileMenu: string;
    backToTop: string;
    cookieConsent: string;
    shareWhatsApp: string;
    shareX: string;
    shareFacebook: string;
    copyLink: string;
    switchLanguage: string;
    switchRegion: string;
    breadcrumb: string;
    dismiss: string;
    close: string;
    instagram: string;
    linkedin: string;
    email: string;
    researchDisclaimer: string;
  };

  calculator: {
    interactiveTool: string;
    title: string;
    description: string;
    peptideAmount: string;
    bacteriostaticWater: string;
    desiredDose: string;
    customAmount: string;
    customVolume: string;
    customDose: string;
    concentration: string;
    injectionVolume: string;
    insulinSyringe: string;
    totalDoses: string;
    mcgPerMl: string;
    mlPerDose: string;
    unitsIuMarks: string;
    fromVial: string;
    units: string;
    overHundredUnits: string;
    zeroUnits: string;
    ml: string;
    overOneMl: string;
    zeroMl: string;
    syringeLabel: string;
    warningNote: string;
    warningText: string;
    enterValues: string;
    quickReference: string;
    unitConversions: string;
    standardSyringe: string;
    theFormula: string;
    mgToMcg: string;
    mlToUnits: string;
    u100Syringe: string;
    hundredUnitsOneMl: string;
    formulaLine1: string;
    formulaLine2: string;
  };

  whyOrynPage: {
    differentiators: Array<{
      title: string;
      description: string;
      highlight: string;
    }>;
    comparisonFeatures: Array<{
      feature: string;
      oryn: string;
      competitor: string;
    }>;
    stats: Array<{
      value: string;
      label: string;
      sublabel: string;
    }>;
    tableOryn: string;
    tableCompetitors: string;
    feature: string;
    viewProducts: string;
    ourNumbers: string;
    comparisonTitle: string;
    comparisonSubtitle: string;
  };

  wholesalePage: {
    // Breadcrumb
    breadcrumbHome: string;
    breadcrumbWholesale: string;
    // Hero
    heroBulkOrders: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDescription: string;
    statMinOrderLabel: string;
    statMinOrderValue: string;
    statMaxDiscountLabel: string;
    statMaxDiscountValue: string;
    statPurityLabel: string;
    statPurityValue: string;
    statDispatchLabel: string;
    statDispatchValue: string;
    // Discount tiers section
    tiersLabel: string;
    tiersTitle1: string;
    tiersTitle2: string;
    tiersDescription: string;
    tierMostPopular: string;
    tierOffRetail: string;
    tierPricing: string;
    tierLabelStarter: string;
    tierLabelProfessional: string;
    tierLabelEnterprise: string;
    tierLabelCustom: string;
    // Benefits section
    benefitsLabel: string;
    benefitsTitle1: string;
    benefitsTitle2: string;
    benefitsDescription: string;
    benefitAccountManagerTitle: string;
    benefitAccountManagerDesc: string;
    benefitShippingTitle: string;
    benefitShippingDesc: string;
    benefitVolumePricingTitle: string;
    benefitVolumePricingDesc: string;
    benefitCOATitle: string;
    benefitCOADesc: string;
    benefitCustomLabellingTitle: string;
    benefitCustomLabellingDesc: string;
    benefitTechSupportTitle: string;
    benefitTechSupportDesc: string;
    // Who we serve section
    whoWeServeLabel: string;
    whoWeServeTitle1: string;
    whoWeServeTitle2: string;
    whoWeServeDescription: string;
    customerUniversitiesTitle: string;
    customerUniversitiesDesc: string;
    customerResearchLabsTitle: string;
    customerResearchLabsDesc: string;
    customerPharmaTitle: string;
    customerPharmaDesc: string;
    customerClinicsTitle: string;
    customerClinicsDesc: string;
    customerDistributorsTitle: string;
    customerDistributorsDesc: string;
    customerBiotechTitle: string;
    customerBiotechDesc: string;
    // Products section
    productsLabel: string;
    productsTitle1: string;
    productsTitle2: string;
    productsDescription: string;
    productRetailLabel: string;
    productViewAll: string;
    // FAQ section
    faqLabel: string;
    faqTitle1: string;
    faqTitle2: string;
    faqDescription: string;
    // CTA section
    ctaTitle: string;
    ctaDescription: string;
    ctaEnquiry: string;
    ctaBrowseProducts: string;
  };

  qualityPage: {
    // Hero
    breadcrumbHome: string;
    breadcrumbQuality: string;
    heroBadge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDescription: string;
    statPurityLabel: string;
    statLabsLabel: string;
    statTestsLabel: string;
    statTraceabilityLabel: string;

    // Testing Process section
    processLabel: string;
    processTitle1: string;
    processTitle2: string;
    processDescription: string;
    testingSteps: Array<{ title: string; description: string }>;

    // Quality Standards section
    certificationsLabel: string;
    standardsTitle1: string;
    standardsTitle2: string;
    standardsDescription: string;
    qualityStandards: Array<{ title: string; description: string }>;

    // COA Grid section
    coaLabel: string;
    coaTitle1: string;
    coaTitle2: string;
    coaDescription: string;
    passLabel: string;
    purityLabel: string;
    batchLabel: string;
    testedLabel: string;
    methodLabel: string;
    testedDate: string;
    viewCoa: string;

    // Third-Party Testing section
    independentLabel: string;
    partnersTitle1: string;
    partnersTitle2: string;
    partnersP1: string;
    partnersP2: string;
    partnersBullets: string[];
    analyticalMethodsLabel: string;
    analyticalMethods: Array<{ method: string; description: string; standard: string }>;

    // COA Contents section
    understandingLabel: string;
    coaContentsTitle1: string;
    coaContentsTitle2: string;
    coaContentsDescription: string;
    coaItems: Array<{ title: string; details: string }>;

    // FAQ section
    faqLabel: string;
    faqTitle1: string;
    faqTitle2: string;
    faqDescription: string;

    // CTA section
    ctaTitle: string;
    ctaDescription: string;
    ctaBrowseProducts: string;
    ctaRequestCoa: string;
  };

  share: {
    label: string;
  };

  socialProof: {
    from: string;
    purchased: string;
    minAgo: string;
  };

  flashSale: {
    flash: string;
    weekend: string;
  };

  shippingPage: {
    // Hero
    heroTagline: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDescription: string;
    breadcrumbHome: string;
    breadcrumbShipping: string;
    // Hero trust bar stats
    statUkDeliveryLabel: string;
    statUkDeliveryValue: string;
    statDispatchLabel: string;
    statDispatchValue: string;
    statFreeOverLabel: string;
    statPackagingLabel: string;
    statPackagingValue: string;
    // UK Delivery Zones section
    ukZonesSectionLabel: string;
    ukZonesSectionTitle1: string;
    ukZonesSectionTitle2: string;
    ukZonesSectionDescription: string;
    ukDeliveryNote: string;
    ukZones: Array<{ region: string; days: string }>;
    // Cold chain / Packaging section
    coldChainSectionLabel: string;
    packagingTitle1: string;
    packagingTitle2: string;
    packagingDescription: string;
    packagingBullets: string[];
    coldChainFeatures: Array<{ title: string; description: string }>;
    // European Delivery section
    euSectionLabel: string;
    euSectionTitle1: string;
    euSectionTitle2: string;
    euSectionDescription: string;
    euCountriesHeader: string;
    euCountriesNotListed: string;
    euDeliveryTimeTitle: string;
    euDeliveryTimeValue: string;
    euDeliveryTimeDescription: string;
    euShippingCostTitle: string;
    euShippingCostValue: string;
    euShippingCostDescription: string;
    euCustomsTitle: string;
    euCustomsValue: string;
    euCustomsDescription: string;
    euTrackingTitle: string;
    euTrackingValue: string;
    euTrackingDescription: string;
    // Free Shipping section
    freeShippingSectionLabel: string;
    freeShippingTitle1: string;
    freeShippingTitle2: string;
    freeShippingDescription: string;
    freeShippingExampleLabel: string;
    freeShippingExampleAway: string;
    // Discreet / Tracking / Returns cards
    discreetTitle: string;
    discreetDescription: string;
    discreetItems: string[];
    trackingTitle: string;
    trackingDescription: string;
    trackingItems: string[];
    returnsTitle: string;
    returnsDescription: string;
    returnsItems: string[];
    // FAQ section
    faqSectionLabel: string;
    faqSectionTitle1: string;
    faqSectionTitle2: string;
    faqSectionDescription: string;
    // CTA section
    ctaTitle: string;
    ctaDescription: string;
    ctaShopNow: string;
    ctaContactUs: string;
  };

  termsPage: {
    tagline: string;
    title: string;
    lastUpdated: string;
    sections: Array<{ heading: string; content: string }>;
  };

  privacyPage: {
    tagline: string;
    title: string;
    lastUpdated: string;
    sections: Array<{ heading: string; content: string }>;
  };

  disclaimerPage: {
    tagline: string;
    title: string;
    lastUpdated: string;
    alertTitle: string;
    alertContent: string;
    buyerResponsibilityIntro: string;
    buyerResponsibilityItems: string[];
    sections: Array<{ heading: string; content: string }>;
  };

  account: {
    nav: {
      dashboard: string;
      orders: string;
      referrals: string;
      wishlist: string;
      profile: string;
      signOut: string;
    };
    dashboard: {
      welcome: string;
      subtitle: string;
      yourOrders: string;
      yourOrdersDesc: string;
      profileSettings: string;
      profileSettingsDesc: string;
      shopPeptides: string;
      shopPeptidesDesc: string;
      orynRewards: string;
      earnPoints: string;
      points: string;
      tier: string;
      member: string;
      nextReward: string;
      nextRewardValue: string;
      multiplier: string;
      multiplierValue: string;
      inviteEarn: string;
      viewDashboard: string;
      inviteDescription: string;
      copyCode: string;
      copyLink: string;
      share: string;
      accountBenefits: string;
      benefits: Array<{ title: string; desc: string }>;
    };
    login: {
      title: string;
      subtitle: string;
      email: string;
      password: string;
      emailPlaceholder: string;
      passwordPlaceholder: string;
      signingIn: string;
      signIn: string;
      noAccount: string;
      createOne: string;
      continueWithout: string;
      loginFailed: string;
    };
    register: {
      title: string;
      subtitle: string;
      firstName: string;
      lastName: string;
      email: string;
      emailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      confirmPassword: string;
      organization: string;
      organizationPlaceholder: string;
      referralCode: string;
      referralCodePlaceholder: string;
      creating: string;
      createAccount: string;
      termsPrefix: string;
      termsOfService: string;
      and: string;
      privacyPolicy: string;
      hasAccount: string;
      signIn: string;
      passwordsMismatch: string;
      passwordTooShort: string;
      registrationFailed: string;
    };
    profile: {
      title: string;
      subtitle: string;
      personalInfo: string;
      firstName: string;
      lastName: string;
      email: string;
      emailNotChangeable: string;
      referralCode: string;
      saveChanges: string;
      saved: string;
      changePassword: string;
      currentPassword: string;
      newPassword: string;
      newPasswordPlaceholder: string;
      confirmNewPassword: string;
      updatePassword: string;
      passwordUpdated: string;
      passwordsMismatch: string;
      passwordTooShort: string;
    };
    orders: {
      title: string;
      subtitle: string;
      noOrders: string;
      noOrdersDesc: string;
      browseProducts: string;
      addedToCart: string;
      reorder: string;
      items: string;
      item: string;
    };
    orderDetail: {
      notFound: string;
      backToOrders: string;
      ordersBreadcrumb: string;
      orderTitle: string;
      placedOn: string;
      print: string;
      orderTracking: string;
      pending: string;
      processing: string;
      shipped: string;
      delivered: string;
      cancelled: string;
      orderItems: string;
      qty: string;
      subtotal: string;
      shipping: string;
      free: string;
      discount: string;
      total: string;
      shippingAddress: string;
      shippingNotAvailable: string;
      payment: string;
      method: string;
      status: string;
      addedToCart: string;
      reorderAll: string;
      needHelp: string;
      needHelpDesc: string;
    };
    referrals: {
      title: string;
      subtitle: string;
      yourCode: string;
      copied: string;
      copyCode: string;
      yourLink: string;
      copyLink: string;
      shareVia: string;
      whatsapp: string;
      email: string;
      directReferrals: string;
      networkSize: string;
      totalEarned: string;
      available: string;
      earningsByLevel: string;
      levelLabel: string;
      commission: string;
      ordersLabel: string;
      pending: string;
      approved: string;
      paidOut: string;
      yourReferrals: string;
      commissionHistory: string;
      tableOrder: string;
      tableLevel: string;
      tableRate: string;
      tableAmount: string;
      tableStatus: string;
      tableDate: string;
      howItWorks: string;
      steps: Array<{ title: string; desc: string }>;
      whatsappShareText: string;
      emailShareSubject: string;
      emailShareBody: string;
    };
    wishlist: {
      title: string;
      itemsSaved: string;
      itemSaved: string;
      empty: string;
      emptyDesc: string;
      browseProducts: string;
      addToCart: string;
      remove: string;
    };
    savedAddresses: {
      title: string;
      cancel: string;
      addAddress: string;
      labelField: string;
      labelPlaceholder: string;
      firstName: string;
      lastName: string;
      address: string;
      city: string;
      postcode: string;
      country: string;
      phone: string;
      setAsDefault: string;
      saveAddress: string;
      noAddresses: string;
      default: string;
      setDefault: string;
      remove: string;
      countries: Record<string, string>;
    };
  };
}
