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
  };

  nav: {
    products: string;
    science: string;
    about: string;
    contact: string;
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
    };
    legalLinks: {
      terms: string;
      privacy: string;
      disclaimer: string;
    };
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
  };

  productsPage: {
    label: string;
    title: string;
    description: string;
    all: string;
    disclaimer: string;
    results: string;
  };

  productDetail: {
    notFound: string;
    backToProducts: string;
    home: string;
    products: string;
    perUnit: string;
    addToCart: string;
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
}
