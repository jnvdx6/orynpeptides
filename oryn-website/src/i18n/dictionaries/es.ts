import type { Dictionary } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const es = {
  meta: {
    title: "ORYN | Sistemas de Pen Pept\u00eddico \u2014 Compra P\u00e9ptidos Online",
    titleTemplate: "%s | ORYN Peptide Labs",
    description:
      "Compra pens de p\u00e9ptidos de grado farmac\u00e9utico online. BPC-157, NAD+, Tirzepatide, GHK-CU y m\u00e1s en sistemas de pen reutilizables. Certificaci\u00f3n GMP, pureza >99%. Desde \u20ac99. Env\u00edo gratis.",
    ogDescription:
      "Sistemas de pen pept\u00eddico de precisi\u00f3n. 10 p\u00e9ptidos desde \u20ac99. Pens reutilizables con cartuchos reemplazables. GMP certificado. Pureza >99%. Env\u00edo gratis a Europa.",
  },

  header: {
    announcementText: "ENVÍO GRATIS EN PEDIDOS SUPERIORES A 150€",
    shopNow: "COMPRAR",
    myAccount: "Mi Cuenta",
    signIn: "Iniciar Sesión",
    searchPlaceholder: "Buscar péptidos...",
    noResults: "Sin resultados para",
    typeToSearch: "Escribe para buscar...",
    viewAll: "VER TODOS LOS PRODUCTOS",
  },

  nav: {
    products: "Productos",
    science: "Ciencia",
    about: "Nosotros",
    contact: "Contacto",
    compare: "Comparar",
    learn: "Aprender",
  },

  hero: {
    tagline: "SISTEMAS DE PEN PEPT\u00cdDICO DE PRECISI\u00d3N",
    subtitle: "Frena el Envejecimiento. Potencia tu Bienestar.",
    description:
      "P\u00e9ptidos de grado farmac\u00e9utico en sistemas de pen reutilizables con cartuchos reemplazables. Dosificaci\u00f3n precisa, 30 d\u00edas de suministro. Certificaci\u00f3n GMP. Fabricados en Corea del Sur. Pureza >99%.",
    explorePeptides: "EXPLORAR P\u00c9PTIDOS",
    ourScience: "NUESTRA CIENCIA",
    purityLabel: "PUREZA",
    dosingLabel: "DOSIFICACI\u00d3N",
    dosingValue: "30 D\u00edas",
    trustFreeShipping: "ENV\u00cdO GRATIS",
    trustSecure: "PAGO SEGURO",
    trustCOA: "COA INCLUIDO",
    socialProofCount: "2.400+ pedidos",
    socialProofLabel: "enviados este trimestre",
    stats: {
      peptidesValue: "10",
      peptidesLabel: "P\u00e9ptidos",
      purityValue: ">99%",
      purityLabel: "Pureza",
      cleanroomValue: "ISO 7",
      cleanroomLabel: "Sala Limpia",
      certifiedValue: "GMP",
      certifiedLabel: "Certificado",
    },
  },

  categories: {
    label: "L\u00cdNEAS DE PRODUCTO",
    titleLine1: "Tres Sistemas.",
    titleLine2: "Un Est\u00e1ndar.",
    description:
      "Cada producto ORYN se fabrica en salas limpias ISO Clase 7 con certificaci\u00f3n GMP y validaci\u00f3n de terceros.",
    from: "Desde",
    items: [
      {
        name: "Sistema Peptide Pen",
        tagline: "Dosificaci\u00f3n de Precisi\u00f3n 30 D\u00edas",
        description:
          "8 p\u00e9ptidos de investigaci\u00f3n en plumas reutilizables multidosis. Formulaciones de grado farmac\u00e9utico con pantalla digital de dosis.",
      },
      {
        name: "MediT Pen",
        tagline: "Inyecci\u00f3n Semanal",
        description:
          "Pluma precargada de Tirzepatida 40mg. Acci\u00f3n dual GIP/GLP-1 para investigaci\u00f3n metab\u00f3lica.",
      },
      {
        name: "Sistema NovaDose",
        tagline: "Microdosificaci\u00f3n Diaria NAD+",
        description:
          "Sistema avanzado de administraci\u00f3n NAD+ basado en cartuchos. Grado farmac\u00e9utico con biodisponibilidad cercana al 100%.",
      },
    ],
  },

  showcase: {
    label: "DESTACADOS",
    titleLine1: "P\u00e9ptidos de",
    titleLine2: "Grado Investigaci\u00f3n",
    subtitle: "Nuestros compuestos de grado farmac\u00e9utico m\u00e1s populares, confianza de laboratorios en toda Europa.",
    viewAll: "VER TODOS LOS PRODUCTOS",
    trustShipping: "ENV\u00cdO GRATIS",
    trustPurity: "PUREZA >99%",
    trustCOA: "COA INCLUIDO",
    trustReturn: "LOTE TRAZABLE",
  },

  science: {
    label: "NUESTRO PROCESO",
    titleLine1: "Precisi\u00f3n",
    titleLine2: "Molecular Dise\u00f1ada",
    description:
      "Desde la obtenci\u00f3n de materias primas hasta la esterilizaci\u00f3n final, cada paso del proceso de fabricaci\u00f3n ORYN se rige por protocolos de grado farmac\u00e9utico y es validado por laboratorios independientes.",
    specs: {
      manufacturingLabel: "Fabricaci\u00f3n",
      manufacturingValue: "Corea",
      capacityLabel: "Capacidad",
      capacityValue: "100K/mes",
      batchSizeLabel: "Tama\u00f1o Lote",
      batchSizeValue: "20.000 ud",
      leadTimeLabel: "Plazo",
      leadTimeValue: "45-60 d\u00edas",
    },
    steps: [
      {
        title: "S\u00edntesis",
        description:
          "S\u00edntesis de p\u00e9ptidos en fase s\u00f3lida con protocolos de purificaci\u00f3n propietarios que alcanzan >99% de pureza en todas las formulaciones.",
      },
      {
        title: "Formulaci\u00f3n",
        description:
          "Formulaciones acuosas de grado farmac\u00e9utico con agentes de viscosidad PEG. pH optimizado (6,8-7,4) para estabilidad y biodisponibilidad.",
      },
      {
        title: "Esterilizaci\u00f3n",
        description:
          "Fabricaci\u00f3n completa en c\u00e1mara as\u00e9ptica con filtraci\u00f3n de 0,22um y acabado con esterilizaci\u00f3n por rayos gamma. Salas limpias ISO Clase 7.",
      },
      {
        title: "Validaci\u00f3n",
        description:
          "Control de calidad por terceros: POSTECH, UNIST y SGS. Cada lote incluye Certificado de An\u00e1lisis con datos anal\u00edticos completos.",
      },
    ],
  },

  howItWorks: {
    label: "C\u00d3MO FUNCIONA",
    titleLine1: "Simple.",
    titleLine2: "Efectivo.",
    description: "Desde elegir tu p\u00e9ptido hasta ver resultados \u2014 nuestro sistema de pluma hace la investigaci\u00f3n sin esfuerzo.",
    cta: "EXPLORAR P\u00c9PTIDOS",
    steps: [
      {
        title: "Elige Tu P\u00e9ptido",
        description: "Explora nuestra gama de p\u00e9ptidos con >99% de pureza. Cada pluma viene premezclada y lista para usar.",
      },
      {
        title: "Compra con Seguridad",
        description: "Pago r\u00e1pido con Stripe. Env\u00edo gratuito en pedidos superiores a \u20ac150.",
      },
      {
        title: "Recibe Discretamente",
        description: "Embalaje discreto, env\u00edo con temperatura controlada. COA incluido en cada pedido.",
      },
      {
        title: "Comienza Tu Investigaci\u00f3n",
        description: "Dosificaci\u00f3n ajustable mediante pluma de precisi\u00f3n. Sin mezclar, sin viales, sin desperdicio.",
      },
    ],
  },

  quality: {
    label: "GARANT\u00cdA DE CALIDAD",
    titleLine1: "Est\u00e1ndares",
    titleLine2: "Farmac\u00e9uticos",
    pillars: [
      {
        title: "Sala Limpia ISO Clase 7",
        description:
          "Entornos libres de part\u00edculas que cumplen los est\u00e1ndares de fabricaci\u00f3n farmac\u00e9utica.",
      },
      {
        title: "Certificado GMP",
        description:
          "Calidad consistente, documentaci\u00f3n adecuada y producci\u00f3n trazable.",
      },
      {
        title: "Pureza >99%",
        description:
          "An\u00e1lisis HPLC y validaci\u00f3n de terceros por POSTECH, UNIST y SGS.",
      },
      {
        title: "Trazabilidad de Lotes",
        description:
          "Documentaci\u00f3n DMF completa, datos de estabilidad y COA para cada lote.",
      },
      {
        title: "Esterilizaci\u00f3n por Rayos Gamma",
        description:
          "Esterilidad completa mediante irradiaci\u00f3n gamma tras fabricaci\u00f3n as\u00e9ptica.",
      },
      {
        title: "Est\u00e1ndares Europeos",
        description:
          "Cumplimiento total bajo los marcos regulatorios farmac\u00e9uticos europeos.",
      },
    ],
  },

  cta: {
    label: "COMIENZA TU INVESTIGACI\u00d3N",
    titleLine1: "\u00bfListo para avanzar en tu",
    titleLine2: "investigaci\u00f3n pept\u00eddica?",
    description:
      "Explora nuestro cat\u00e1logo completo de p\u00e9ptidos de grado investigaci\u00f3n. Cada producto incluye Certificado de An\u00e1lisis y documentaci\u00f3n completa del lote.",
    browseProducts: "VER TODOS LOS PRODUCTOS",
    contactTeam: "CONTACTAR CON NUESTRO EQUIPO",
    valueProp1: "ENV\u00cdO GRATIS EU/UK",
    valueProp2: "COA CON CADA PEDIDO",
    valueProp3: "CERTIFICADO GMP",
    badges: [
      { value: "ISO 7", label: "SALA LIMPIA" },
      { value: "GMP", label: "CERTIFICADO" },
      { value: ">99%", label: "PUREZA" },
      { value: "SGS", label: "VALIDADO" },
    ],
  },

  footer: {
    description:
      "Ciencia Pept\u00eddica de Precisi\u00f3n. Laboratorio biotecnol\u00f3gico europeo que ofrece soluciones pept\u00eddicas de grado investigaci\u00f3n dise\u00f1adas con precisi\u00f3n molecular.",
    researchOnly: "SOLO PARA FINES DE INVESTIGACI\u00d3N",
    newsletterTitle: "Mant\u00e9nte Actualizado",
    newsletterDescription: "Recibe las \u00faltimas novedades sobre p\u00e9ptidos, investigaci\u00f3n y ofertas exclusivas.",
    newsletterPlaceholder: "tu@email.com",
    newsletterButton: "SUSCRIBIRSE",
    newsletterSuccess: "\u00a1Gracias! Ya est\u00e1s suscrito.",
    paymentMethods: "ACEPTAMOS",
    sections: {
      products: "Productos",
      company: "Empresa",
      legal: "Legal",
    },
    productLinks: {
      all: "Todos los Productos",
      pens: "Peptide Pens",
      medit: "MediT Pen",
      novadose: "NovaDose",
    },
    companyLinks: {
      about: "Sobre ORYN",
      science: "Ciencia",
      contact: "Contacto",
      quality: "Calidad",
      whyOryn: "Por Que ORYN",
      researchHub: "Centro de Investigacion",
      calculator: "Calculadora de Peptidos",
    },
    trustBadges: {
      ssl: "Cifrado SSL",
      secure: "Pago Seguro",
      coa: "COA Incluido",
      guarantee: "Pureza Garantizada",
    },
    legalLinks: {
      terms: "T\u00e9rminos de Servicio",
      privacy: "Pol\u00edtica de Privacidad",
      disclaimer: "Aviso de Investigaci\u00f3n",
    },
    seoSections: {
      researchAreas: "\u00c1reas de Investigaci\u00f3n",
      learn: "Aprender",
      ukDelivery: "Env\u00edo Reino Unido",
      ukRegions: "Regiones del Reino Unido",
      ukCounties: "Condados del Reino Unido",
      peptideEncyclopedia: "Enciclopedia de P\u00e9ptidos",
      resources: "Recursos",
      londonDelivery: "Env\u00edo a Londres",
      europeanDelivery: "Env\u00edo a Europa",
      topEuCities: "Principales Ciudades de la UE",
    },
    certifications: [
      { label: "ISO CLASS 7", detail: "Sala Limpia" },
      { label: "GMP", detail: "Certificado" },
      { label: ">99%", detail: "Pureza" },
      { label: "EU", detail: "Fabricado" },
    ],
    copyright: "ORYN PEPTIDE LABS \u2014 TODOS LOS DERECHOS RESERVADOS",
  },

  productCard: {
    purity: "PUREZA >99%",
    pharmaGrade: "GRADO FARMAC\u00c9UTICO",
    details: "DETALLES",
    addToCart: "A\u00d1ADIR AL CARRITO",
  },

  cart: {
    title: "TU PEDIDO",
    empty: "Tu carrito est\u00e1 vac\u00edo",
    emptySubtext: "Empieza a a\u00f1adir p\u00e9ptidos de investigaci\u00f3n a tu carrito.",
    browseProducts: "VER PRODUCTOS",
    continueShopping: "Seguir Comprando",
    subtotal: "Subtotal",
    checkout: "PAGO SEGURO",
    researchOnly: "Solo para fines de investigaci\u00f3n",
    itemLabel: "art\u00edculo",
    itemsLabel: "art\u00edculos",
    freeShippingAway: "A\u00f1ade {amount} m\u00e1s para env\u00edo GRATIS",
    freeShippingUnlocked: "\u00a1Has desbloqueado env\u00edo GRATIS!",
    youMightLike: "TAMBI\u00c9N TE PUEDE INTERESAR",
    trustSecure: "PAGO SEGURO",
    trustDiscreet: "ENV\u00cdO DISCRETO",
    trustCOA: "COA INCLUIDO",
    orderSummary: "RESUMEN DEL PEDIDO",
    shipping: "Env\u00edo",
    free: "GRATIS",
    atCheckout: "EN EL PAGO",
    estimatedShippingFrom: "Desde",
    weAccept: "MÉTODOS DE PAGO ACEPTADOS",
    total: "Total",
    volumeDiscount: "Descuento por volumen",
    saveForLater: "Guardar para después",
    saved: "GUARDADO",
    save: "GUARDAR",
  },

  productsPage: {
    label: "CATÁLOGO",
    title: "Péptidos de Investigación",
    description:
      "Explora nuestra gama completa de soluciones peptídicas de precisión. Cada producto fabricado con estándares farmacéuticos y pureza >99%.",
    all: "TODOS",
    results: "productos",
    searchPlaceholder: "Buscar péptidos...",
    sortBy: "ORDENAR POR",
    sortPriceAsc: "PRECIO: MENOR A MAYOR",
    sortPriceDesc: "PRECIO: MAYOR A MENOR",
    sortName: "NOMBRE: A-Z",
    noResults: "No se encontraron productos para",
    noCategory: "No hay productos en esta categoría",
    clearFilters: "Borrar filtros",
    disclaimer:
      "TODOS LOS PRODUCTOS ORYN ESTÁN DESTINADOS ÚNICAMENTE PARA USO EN INVESTIGACIÓN Y LABORATORIO. NO PARA CONSUMO HUMANO.",
  },

  productDetail: {
    notFound: "Producto No Encontrado",
    backToProducts: "Volver a Productos",
    home: "INICIO",
    products: "PRODUCTOS",
    perUnit: "por unidad",
    addToCart: "AÑADIR AL CARRITO",
    adding: "AÑADIENDO...",
    keyBenefits: "BENEFICIOS CLAVE",
    specifications: "ESPECIFICACIONES",
    researchOnlyTitle: "Solo para Investigaci\u00f3n",
    researchOnlyDescription:
      "Este producto est\u00e1 destinado \u00fanicamente para uso en laboratorio e investigaci\u00f3n. No para consumo humano.",
    relatedProducts: "Productos Relacionados",
    trustShipping: "ENV\u00cdO GRATIS",
    trustPurity: "PUREZA >99%",
    trustCOA: "COA INCLUIDO",
    secureCheckout: "PAGO SEGURO",
    discreetShipping: "ENV\u00cdO DISCRETO",
    inStock: "EN STOCK",
    readyToShip: "Listo para enviar",
    reviews: "rese\u00f1as",
    scienceTab: "Ciencia",
    readyToExperience: "Listo para experimentar",
    premiumPenDescription: "Sistema de pluma premium con dosificación totalmente ajustable. Fabricación GMP, pureza >99% garantizada.",
    dosingProtocol: "PROTOCOLO DE DOSIFICACIÓN",
    howToUse: "Cómo Usar Tu Pluma ORYN",
    quickReference: "REFERENCIA RÁPIDA",
    recommendedDose: "Dosis Recomendada",
    frequency: "Frecuencia",
    duration: "Duración",
    proTips: "CONSEJOS PRO",
    stepByStep: "INSTRUCCIONES PASO A PASO",
    importantLabel: "IMPORTANTE",
    safetyNote: "Usa siempre una aguja estéril nueva para cada administración. Desecha las agujas usadas en un contenedor de objetos punzantes apropiado. Almacena la pluma refrigerada a 2-8°C.",
    scienceLabel: "CIENCIA",
    scienceBehind: "La Ciencia Detrás de",
    compoundProfile: "PERFIL DEL COMPUESTO",
    classificationLabel: "CLASIFICACIÓN",
    molecularFormula: "FÓRMULA MOLECULAR",
    molecularWeightLabel: "PESO MOLECULAR",
    halfLifeLabel: "VIDA MEDIA",
    sequenceLabel: "SECUENCIA",
    researchAreasLabel: "ÁREAS DE INVESTIGACIÓN",
    mechanismOfAction: "MECANISMO DE ACCIÓN",
    keyResearchFindings: "HALLAZGOS CLAVE DE INVESTIGACIÓN",
    trustedByResearchers: "CONFIANZA DE LOS INVESTIGADORES",
    whatLabsSay: "Lo Que Dicen Los Laboratorios Sobre",
    fromVerifiedReviews: "de {count} reseñas verificadas",
    verifiedLabel: "VERIFICADO",
    faqLabel: "FAQ",
    frequentlyAsked: "Preguntas Frecuentes Sobre",
    buyInYourCity: "COMPRAR {product} EN TU CIUDAD",
    relatedResearch: "INVESTIGACIÓN RELACIONADA",
    formulaLabel: "FÓRMULA",
    weightLabel: "PESO",
    add: "AÑADIR",
    closeCart: "Cerrar carrito",
    decreaseQuantity: "Reducir cantidad",
    increaseQuantity: "Aumentar cantidad",
    removeItem: "Eliminar artículo",
    toggleWishlist: "Alternar lista de deseos",
    closeSearch: "Cerrar búsqueda",
    closePopup: "Cerrar",
    purityBadge: ">99% PUREZA",
    gmpBadge: "GMP CERTIFICADO",
    freeShippingBadge: "ENVÍO GRATIS 150+",
    whyChoosePen: "POR QUÉ ELEGIR LA PLUMA",
    traditionalVials: "VIALES TRADICIONALES",
    orynPenSystem: "SISTEMA DE PLUMA ORYN",
    vialProblems: [
      { label: "Reconstitución necesaria", detail: "Agua bacteriostática, jeringa, mezcla precisa" },
      { label: "Variabilidad de dosis", detail: "Las marcas de la jeringa pueden variar 10-20%" },
      { label: "Riesgo de contaminación", detail: "Tapón de goma perforado múltiples veces" },
      { label: "Degradación rápida", detail: "La potencia disminuye tras la reconstitución" },
      { label: "Preparación compleja", detail: "5-10 minutos por preparación" },
      { label: "Viaje impracticable", detail: "Viales, jeringas, agua, agujas..." },
    ],
    comparisonBar: [
      { vial: "5-10 min", pen: "30 seg", label: "Preparación" },
      { vial: "~80%", pen: ">99%", label: "Precisión" },
      { vial: "Decreciente", pen: "Mantenida", label: "Esterilidad" },
      { vial: "7-14 días", pen: "30 días", label: "Estabilidad" },
    ],
    compareWith: "COMPARAR CON PRODUCTOS SIMILARES",
    sideBy: "Comparar Productos",
    vsLabel: "OCULTAR",
    keyDifferences: "BENEFICIOS",
    bestFor: "beneficios",
    viewProduct: "AÑADIR",
    comparisonDisclaimer: "PRECIO",
  },

  aboutPage: {
    tagline: "SOBRE ORYN",
    heroTitle1: "La Ciencia Detr\u00e1s",
    heroTitle2: "de la Precisi\u00f3n",
    heroDescription:
      "ORYN es un laboratorio biotecnol\u00f3gico europeo dedicado a avanzar en la investigaci\u00f3n pept\u00eddica a trav\u00e9s de fabricaci\u00f3n de grado farmac\u00e9utico, sistemas de administraci\u00f3n innovadores y est\u00e1ndares de calidad intransigentes.",
    brandStatement:
      "Creemos que la investigaci\u00f3n pept\u00eddica merece el mismo rigor de fabricaci\u00f3n que la",
    brandHighlight: "producci\u00f3n farmac\u00e9utica.",
    brandParagraphs: [
      "ORYN naci\u00f3 de una frustraci\u00f3n con el mercado de investigaci\u00f3n pept\u00eddica. Demasiados compuestos de pureza incierta, dosificaci\u00f3n inconsistente y cadenas de suministro opacas. Nos propusimos cambiar eso.",
      "Nuestros socios de fabricaci\u00f3n operan salas limpias ISO Clase 7 con certificaci\u00f3n GMP. Cada formulaci\u00f3n se somete a an\u00e1lisis HPLC y validaci\u00f3n independiente de terceros. Proporcionamos documentaci\u00f3n completa de cada lote porque la transparencia no es opcional \u2014 es fundamental.",
      "El resultado: p\u00e9ptidos de grado investigaci\u00f3n en los que cient\u00edficos y laboratorios pueden confiar, entregados en sistemas de precisi\u00f3n dise\u00f1ados para resultados consistentes y fiables.",
    ],
    valuesLabel: "NUESTROS VALORES",
    valuesTitle: "Lo que impulsa a",
    values: [
      {
        title: "Precisi\u00f3n",
        description:
          "Cada medida cuenta. Desde la s\u00edntesis hasta el llenado final, controlamos las variables a nivel molecular.",
      },
      {
        title: "Pureza",
        description:
          "99% es nuestro m\u00ednimo. Validado por terceros: POSTECH, UNIST y SGS para confianza absoluta.",
      },
      {
        title: "Innovaci\u00f3n",
        description:
          "Tres plataformas de administraci\u00f3n \u00fanicas dise\u00f1adas para estabilidad \u00f3ptima, precisi\u00f3n de dosificaci\u00f3n y experiencia de usuario.",
      },
      {
        title: "Transparencia",
        description:
          "Documentaci\u00f3n completa de cada lote, COA para cada producto y trazabilidad completa de la cadena de suministro.",
      },
    ],
    journeyLabel: "NUESTRO CAMINO",
    journeyTitle: "Construyendo",
    timeline: [
      {
        year: "Fundaci\u00f3n",
        title: "Precisi\u00f3n desde el Primer D\u00eda",
        description:
          "ORYN fue fundada con una visi\u00f3n singular: llevar la investigaci\u00f3n pept\u00eddica de grado farmac\u00e9utico a los laboratorios europeos con est\u00e1ndares de calidad intransigentes.",
      },
      {
        year: "Fabricaci\u00f3n",
        title: "Alianza Biotecnol\u00f3gica Coreana",
        description:
          "Alianza estrat\u00e9gica con instalaciones de fabricaci\u00f3n certificadas ISO Clase 7 en Eumseong y Osan, Corea. Capacidad de 100.000 unidades al mes.",
      },
      {
        year: "Innovaci\u00f3n",
        title: "Sistemas de Administraci\u00f3n Avanzados",
        description:
          "Desarrollo de tres plataformas de administraci\u00f3n propietarias: Peptide Pen multidosis, MediT Pen precargada y el sistema de cartuchos NovaDose.",
      },
      {
        year: "Hoy",
        title: "10 P\u00e9ptidos de Investigaci\u00f3n",
        description:
          "Cat\u00e1logo completo de p\u00e9ptidos de grado investigaci\u00f3n que abarca curaci\u00f3n, metab\u00f3lica, antienvejecimiento e investigaci\u00f3n de hormona de crecimiento con distribuci\u00f3n global.",
      },
    ],
    manufacturingLabel: "FABRICACI\u00d3N",
    manufacturingTitle: "Especificaciones de Producci\u00f3n",
    manufacturingSpecs: [
      { value: "ISO 7", label: "Clase Sala Limpia", sub: "Certificado" },
      { value: "GMP", label: "Fabricaci\u00f3n", sub: "Certificado" },
      { value: "100K", label: "Capacidad Mensual", sub: "Unidades/Mes" },
      { value: "24m", label: "Vida \u00datil", sub: "Estabilidad Probada" },
      { value: "0,22um", label: "Esterilizaci\u00f3n", sub: "Filtraci\u00f3n" },
      { value: "SGS", label: "Validaci\u00f3n", sub: "Terceros" },
      { value: "6,8-7,4", label: "Rango pH", sub: "Optimizado" },
      { value: "PEG", label: "Viscosidad", sub: "Agente" },
    ],
  },

  sciencePage: {
    tagline: "CIENCIA",
    heroTitle1: "Biblioteca de",
    heroTitle2: "Investigaci\u00f3n Pept\u00eddica",
    heroDescription:
      "Comprendiendo los mecanismos moleculares detr\u00e1s de cada producto ORYN. Esta biblioteca proporciona una visi\u00f3n cient\u00edfica general de nuestro cat\u00e1logo de p\u00e9ptidos de investigaci\u00f3n y sus \u00e1reas de estudio.",
    processLabel: "PROCESO",
    processTitle1: "De la S\u00edntesis a la",
    processTitle2: "Entrega",
    processDescription:
      "Un pipeline de fabricaci\u00f3n farmac\u00e9utica de seis etapas que garantiza consistencia, pureza y estabilidad en cada producto.",
    processSteps: [
      { step: "01", label: "Materia Prima", time: "2 Semanas" },
      { step: "02", label: "S\u00edntesis", time: "8 D\u00edas" },
      { step: "03", label: "Purificaci\u00f3n", time: "HPLC" },
      { step: "04", label: "Formulaci\u00f3n", time: "pH 6,8-7,4" },
      { step: "05", label: "Llenado y Sellado", time: "2 Semanas" },
      { step: "06", label: "Esterilizar y CC", time: "1 Semana" },
    ],
    libraryLabel: "BIBLIOTECA",
    libraryTitle1: "Perfiles de",
    libraryTitle2: "Compuestos Pept\u00eddicos",
    classification: "CLASIFICACI\u00d3N",
    mechanism: "MECANISMO",
    researchAreas: "\u00c1REAS DE INVESTIGACI\u00d3N",
    specsLabel: "ESPECIFICACIONES",
    specsTitle: "Par\u00e1metros de Calidad Universales",
    specsItems: [
      { value: ">99%", label: "Pureza (HPLC)" },
      { value: "6,8-7,4", label: "Rango pH" },
      { value: "0,22um", label: "Filtraci\u00f3n Est\u00e9ril" },
      { value: "3 mL", label: "Volumen de Llenado" },
      { value: "PEG", label: "Agente de Viscosidad" },
      { value: "30 D\u00edas", label: "Per\u00edodo de Dosificaci\u00f3n" },
      { value: "24 m", label: "Vida \u00datil" },
      { value: "2-8\u00b0C", label: "Temp. Almacenamiento" },
    ],
  },

  contactPage: {
    tagline: "CONTACTO",
    heroTitle: "Cont\u00e1ctanos",
    heroDescription:
      "Para consultas mayoristas, colaboraciones de investigaci\u00f3n o preguntas sobre productos. Nuestro equipo responde en 24 horas.",
    companyName: "ORYN Peptide Labs",
    emailLabel: "EMAIL",
    wholesaleLabel: "MAYORISTA",
    locationLabel: "UBICACI\u00d3N",
    locationLine1: "Operaciones Europeas",
    locationLine2: "Investigaci\u00f3n y Distribuci\u00f3n",
    infoBoxes: [
      {
        title: "Pedidos Mayoristas",
        description:
          "MOQ: 1.000 por SKU. Marca OEM completa disponible. Pago: 50% anticipo / 50% antes del env\u00edo. Soporte de env\u00edo DDP disponible.",
      },
      {
        title: "Colaboraciones de Investigaci\u00f3n",
        description:
          "Apoyamos programas de investigaci\u00f3n acad\u00e9mica e institucional con formulaciones personalizadas, precios por volumen y fabricaci\u00f3n prioritaria.",
      },
      {
        title: "Documentaci\u00f3n",
        description:
          "COA, datos de estabilidad, documentaci\u00f3n DMF y materiales de marketing disponibles para todos los productos ORYN bajo solicitud.",
      },
    ],
    formTitle: "Env\u00edanos un mensaje",
    formDescription:
      "Completa el formulario y nuestro equipo te responder\u00e1 r\u00e1pidamente.",
    firstName: "NOMBRE",
    lastName: "APELLIDO",
    email: "EMAIL",
    organization: "ORGANIZACI\u00d3N",
    inquiryType: "TIPO DE CONSULTA",
    inquiryOptions: [
      "Consulta de Producto",
      "Pedido Mayorista",
      "Colaboraci\u00f3n de Investigaci\u00f3n",
      "Formulaci\u00f3n Personalizada",
      "Solicitud de Documentaci\u00f3n",
      "Otro",
    ],
    message: "MENSAJE",
    messagePlaceholder: "Cu\u00e9ntanos sobre tus necesidades de investigaci\u00f3n...",
    sendMessage: "ENVIAR MENSAJE",
    messageSent: "Mensaje Enviado",
    messageSentDescription: "Responderemos en 24 horas.",
  },

  checkoutPage: {
    emptyCart: "Tu carrito est\u00e1 vac\u00edo",
    emptyCartDescription: "A\u00f1ade productos antes de proceder al pago.",
    browseProducts: "Ver Productos",
    steps: ["Informaci\u00f3n", "Env\u00edo", "Pago"],
    shippingTitle: "Informaci\u00f3n de Env\u00edo",
    firstName: "NOMBRE",
    lastName: "APELLIDO",
    email: "EMAIL",
    phone: "TEL\u00c9FONO",
    address: "DIRECCI\u00d3N",
    city: "Ciudad",
    postalCode: "C\u00f3digo Postal",
    country: "Pa\u00eds",
    referralCode: "C\u00d3DIGO DE REFERIDO",
    referralCodePlaceholder: "Introduce c\u00f3digo de referido",
    referralCodeHint: "\u00bfTienes un c\u00f3digo de referido? Intr\u00f3ducelo para seguimiento.",
    continueToPayment: "CONTINUAR AL PAGO",
    paymentTitle: "Pago",
    cardPayment: "Pago con Tarjeta",
    cryptoPayment: "Pago con Crypto",
    cardNumber: "N\u00daMERO DE TARJETA",
    expiry: "CADUCIDAD",
    cvc: "CVC",
    selectCrypto: "SELECCIONAR CRIPTOMONEDA",
    amountToPay: "CANTIDAD A PAGAR",
    discountApplied: "(5% de descuento aplicado)",
    sendToAddress: "ENVIAR A DIRECCI\u00d3N",
    copy: "COPIAR",
    copied: "COPIADO",
    timeRemaining: "TIEMPO RESTANTE",
    sendBeforeExpiry: "Env\u00eda el pago antes de que expire el temporizador",
    sentPayment: "HE ENVIADO EL PAGO",
    txHash: "HASH DE TRANSACCI\u00d3N",
    txHashPlaceholder: "Introduce tu hash de transacci\u00f3n",
    sessionExpired: "SESI\u00d3N DE PAGO EXPIRADA",
    restartSession: "REINICIAR SESI\u00d3N",
    back: "Volver",
    placeOrder: "REALIZAR PEDIDO",
    processing: "PROCESANDO...",
    orderSummary: "RESUMEN DEL PEDIDO",
    qty: "Ud",
    subtotal: "Subtotal",
    cryptoDiscount: "Descuento Crypto (5%)",
    shipping: "Env\u00edo",
    shippingNote: "CALCULADO EN EL SIGUIENTE PASO",
    referral: "Referido",
    total: "Total",
    researchOnly: "Solo para fines de investigaci\u00f3n",
    orderConfirmed: "Pedido Confirmado",
    orderConfirmedDescription:
      "Gracias por tu pedido. Se ha enviado un email de confirmaci\u00f3n con los detalles de tu pedido e informaci\u00f3n de seguimiento.",
    paymentVerifying: "PAGO EN VERIFICACI\u00d3N",
    paymentVerifyingDescription:
      "Tu pago en criptomoneda est\u00e1 siendo confirmado en la blockchain. Esto puede tardar hasta 30 minutos.",
    paymentConfirmed: "PAGO CONFIRMADO",
    referralApplied: "C\u00d3DIGO DE REFERIDO APLICADO",
    continueShopping: "Seguir Comprando",
    secureCheckout: "PAGO SEGURO",
    orderRef: "REF. PEDIDO",
    contactShipping: "Informaci\u00f3n de contacto y env\u00edo",
    change: "Cambiar",
    emailPlaceholder: "tu@email.com",
    shippingAddress: "DIRECCI\u00d3N DE ENV\u00cdO",
    useSavedAddress: "USAR DIRECCI\u00d3N GUARDADA",
    selectCountry: "Seleccionar pa\u00eds...",
    firstNamePlaceholder: "Nombre",
    lastNamePlaceholder: "Apellido",
    addressPlaceholder: "Direcci\u00f3n",
    apartmentPlaceholder: "Apartamento, piso, etc. (opcional)",
    cityPlaceholder: "Ciudad",
    postalCodePlaceholder: "C\u00f3digo postal",
    phonePlaceholder: "Tel\u00e9fono (opcional)",
    continueToShipping: "CONTINUAR AL ENV\u00cdO",
    shippingMethod: "M\u00e9todo de env\u00edo",
    loadingShipping: "Cargando opciones de env\u00edo...",
    freeShippingApplied: "\u00a1ENV\u00cdO GRATIS APLICADO!",
    freeShippingLabel: "ENV\u00cdO GRATIS (PEDIDO +\u20ac{threshold})",
    freeStandardShipping: "Env\u00edo est\u00e1ndar gratuito",
    returnToInformation: "\u2190 Volver a informaci\u00f3n",
    returnToShipping: "\u2190 Volver al env\u00edo",
    contact: "CONTACTO",
    shipTo: "ENVIAR A",
    method: "M\u00c9TODO",
    free: "Gratis",
    required: "Obligatorio",
    validEmailRequired: "Email v\u00e1lido requerido",
    invalidCode: "C\u00f3digo inv\u00e1lido",
    failedToValidate: "Error al validar",
    hideOrderSummary: "Ocultar resumen",
    showOrderSummary: "Mostrar resumen",
    discount: "Descuento",
    volumeDiscountLabel: "Dto. volumen",
    calculatedNextStep: "Calculado en el siguiente paso",
    selectCountryForShipping: "Selecciona país para estimar",
    securePayment: "PAGO SEGURO",
    discreetShipping: "ENV\u00cdO DISCRETO",
    coaIncluded: "COA INCLUIDO",
    gmpCertified: "CERTIFICADO GMP",
    allSecure: "TODOS LOS PAGOS SON SEGUROS Y ENCRIPTADOS",
    backendRequired: "BACKEND REQUERIDO",
    backendDescription: "El backend de Medusa es necesario para procesar pagos.",
    promoCodePlaceholder: "C\u00f3digo de descuento",
    apply: "APLICAR",
    referralPlaceholder: "C\u00f3digo de referido (opcional)",
    sslEncrypted: "SSL Encriptado",
    purity99: "Pureza >99%",
    guaranteed: "Garantizado",
    gmpCertifiedBadge: "Certificado GMP",
    guarantee30: "Garant\u00eda 30 d\u00edas",
    noQuestions: "Sin preguntas",
    emailHint: "No necesitas cuenta para comprar. Tu pedido se vincula a este email.",
    verifyingPayment: "Verificando pago...",
    paymentFailed: "Pago Fallido",
    paymentFailedDescription: "No se pudo procesar tu pago. Por favor, inténtalo de nuevo o utiliza un método de pago diferente.",
    tryAgain: "Intentar de Nuevo",
    whatHappensNext: "QUÉ PASA AHORA",
    nextSteps: [
      "Email de confirmación enviado a tu bandeja de entrada",
      "Tu pedido está siendo preparado y verificado",
      "Enviado con seguimiento — normalmente al siguiente día hábil",
    ],
    viewOrders: "VER PEDIDOS",
    referralTitle: "Comparte ORYN y gana 10% de comisión",
    referralDescription: "¿Te gustan nuestros productos? Comparte tu enlace de referido y gana 10% en cada compra.",
    getReferralLink: "OBTENER TU ENLACE DE REFERIDO →",
  },

  products: {
    "bpc-157": {
      subtitle: "Curaci\u00f3n y Recuperaci\u00f3n",
      categoryLabel: "Peptide Pen",
      description:
        "Body Protection Compound-157 es un p\u00e9ptido sint\u00e9tico derivado de una prote\u00edna natural del jugo g\u00e1strico. ORYN BPC-157 est\u00e1 formulado con grado farmac\u00e9utico en un sistema de pluma de dosificaci\u00f3n precisa para una administraci\u00f3n consistente y fiable durante 30 d\u00edas.",
      benefits: [
        "Apoya la curaci\u00f3n y recuperaci\u00f3n de tejidos",
        "Promueve la salud e integridad intestinal",
        "Apoya la reparaci\u00f3n de tendones y ligamentos",
        "Propiedades antiinflamatorias",
        "Potencial neuroprotector",
      ],
      badge: "M\u00e1s Vendido",
    },
    "tb-500": {
      subtitle: "Reparaci\u00f3n Tisular",
      categoryLabel: "Peptide Pen",
      description:
        "El fragmento de Timosina Beta-4, TB-500, juega un papel crucial en la reparaci\u00f3n y regeneraci\u00f3n de tejidos. ORYN TB-500 ofrece una dosis precisa de 15mg en nuestro sistema avanzado de pluma, dise\u00f1ado para biodisponibilidad \u00f3ptima y resultados consistentes.",
      benefits: [
        "Acelera la cicatrizaci\u00f3n de heridas",
        "Reduce la inflamaci\u00f3n",
        "Promueve la reparaci\u00f3n del tejido muscular",
        "Apoya la salud cardiovascular",
        "Mejora la flexibilidad y movilidad",
      ],
    },
    "cjc-1295": {
      subtitle: "Estimulaci\u00f3n GH",
      categoryLabel: "Peptide Pen",
      description:
        "CJC-1295 es un an\u00e1logo sint\u00e9tico de la hormona liberadora de hormona de crecimiento (GHRH). ORYN CJC-1295 proporciona elevaci\u00f3n sostenida de GH a trav\u00e9s de nuestro sistema de dosificaci\u00f3n de precisi\u00f3n, fabricado con los m\u00e1s altos est\u00e1ndares farmac\u00e9uticos.",
      benefits: [
        "Estimula la liberaci\u00f3n de hormona de crecimiento",
        "Apoya la composici\u00f3n corporal magra",
        "Promueve el sue\u00f1o profundo reparador",
        "Mejora la recuperaci\u00f3n entre sesiones",
        "Apoya la funci\u00f3n metab\u00f3lica",
      ],
    },
    ipamorelin: {
      subtitle: "Estimulaci\u00f3n GH",
      categoryLabel: "Peptide Pen",
      description:
        "Ipamorelin es un secretagogo selectivo de hormona de crecimiento que estimula la gl\u00e1ndula pituitaria. ORYN Ipamorelin ofrece liberaci\u00f3n de GH dirigida sin la disrupci\u00f3n hormonal m\u00e1s amplia vista en compuestos menos selectivos.",
      benefits: [
        "Liberaci\u00f3n selectiva de GH",
        "Perfil m\u00ednimo de efectos secundarios",
        "Apoya la densidad \u00f3sea",
        "Promueve el tejido magro",
        "Mejora la calidad del sue\u00f1o",
      ],
    },
    "tirzepatide-pen": {
      subtitle: "Metab\u00f3lico",
      categoryLabel: "Peptide Pen",
      description:
        "Tirzepatida es un agonista dual del receptor GIP/GLP-1 que representa la vanguardia de la ciencia pept\u00eddica metab\u00f3lica. El sistema de pluma ORYN Tirzepatida ofrece dosificaci\u00f3n de precisi\u00f3n para aplicaciones de investigaci\u00f3n metab\u00f3lica.",
      benefits: [
        "Acci\u00f3n dual en receptores hormonales",
        "Apoya la funci\u00f3n metab\u00f3lica",
        "Gesti\u00f3n del az\u00facar en sangre",
        "Regulaci\u00f3n del apetito",
        "Compuesto cl\u00ednicamente estudiado",
      ],
      badge: "Popular",
    },
    "ghk-cu": {
      subtitle: "Reparaci\u00f3n Cut\u00e1nea",
      categoryLabel: "Peptide Pen",
      description:
        "GHK-Cu (p\u00e9ptido de cobre) es un trip\u00e9ptido natural con alta afinidad por los iones de cobre. ORYN GHK-CU apoya la remodelaci\u00f3n y reparaci\u00f3n cut\u00e1nea con una formulaci\u00f3n potente de 60mg.",
      benefits: [
        "Promueve la s\u00edntesis de col\u00e1geno",
        "Apoya la elasticidad de la piel",
        "Propiedades antioxidantes",
        "Soporte de cicatrizaci\u00f3n",
        "Aplicaciones de investigaci\u00f3n antienvejecimiento",
      ],
    },
    glutathione: {
      subtitle: "Antioxidante",
      categoryLabel: "Peptide Pen",
      description:
        "El glutati\u00f3n es el antioxidante maestro del cuerpo, cr\u00edtico para la desintoxicaci\u00f3n celular y la funci\u00f3n inmune. ORYN Glutathione ofrece una potente dosis de 6g a trav\u00e9s de nuestro sistema de pluma de precisi\u00f3n para m\u00e1xima biodisponibilidad.",
      benefits: [
        "Defensa antioxidante maestra",
        "Desintoxicaci\u00f3n celular",
        "Soporte del sistema inmune",
        "Propiedades de aclaramiento de piel",
        "Soporte de funci\u00f3n hep\u00e1tica",
      ],
    },
    "nad-plus": {
      subtitle: "Metab\u00f3lico y Antienvejecimiento",
      categoryLabel: "Peptide Pen",
      description:
        "La Nicotinamida Adenina Dinucle\u00f3tido (NAD+) es una coenzima cr\u00edtica presente en cada c\u00e9lula. La pluma ORYN NAD+ ofrece una dosis concentrada de 500mg para apoyar la producci\u00f3n de energ\u00eda celular, la reparaci\u00f3n del ADN y el envejecimiento saludable.",
      benefits: [
        "Producci\u00f3n de energ\u00eda celular",
        "Soporte de reparaci\u00f3n de ADN",
        "Investigaci\u00f3n de envejecimiento saludable",
        "Soporte de funci\u00f3n cognitiva",
        "Eficiencia metab\u00f3lica",
      ],
      badge: "Premium",
    },
    "medit-tirzepatide": {
      subtitle: "Tirzepatida 40mg \u2014 Gesti\u00f3n de Peso",
      categoryLabel: "MediT Pen",
      description:
        "La ORYN MediT Pen es una pluma de inyecci\u00f3n precargada de un solo uso que contiene 40mg de Tirzepatida. Dise\u00f1ada para administraci\u00f3n semanal, combina acci\u00f3n hormonal dual GIP/GLP-1 para soporte metab\u00f3lico integral.",
      benefits: [
        "Acci\u00f3n hormonal dual (GIP + GLP-1)",
        "Comodidad semanal",
        "Eficacia cl\u00ednicamente probada",
        "Control del apetito y aumento de saciedad",
        "Gesti\u00f3n del az\u00facar en sangre",
        "Apoya la gesti\u00f3n de peso a largo plazo",
        "Puede reducir el riesgo de enfermedades relacionadas con la obesidad",
      ],
      badge: "Nuevo",
    },
    "novadose-nad": {
      subtitle: "Juventud en tus Manos",
      categoryLabel: "Sistema NovaDose",
      description:
        "NovaDose ofrece NAD+ de grado farmac\u00e9utico a trav\u00e9s de un innovador sistema de pluma basado en cartuchos. Dise\u00f1ado para microdosificaci\u00f3n diaria precisa, apoya la energ\u00eda celular, la eficiencia metab\u00f3lica y la reparaci\u00f3n natural. M\u00e1s asequible y sostenible que la terapia IV.",
      benefits: [
        "NAD+ de grado farmac\u00e9utico de Corea",
        "Microdosificaci\u00f3n diaria precisa",
        "Biodisponibilidad cercana al 100%",
        "Apoya la energ\u00eda celular y la claridad",
        "Mejora el estado de \u00e1nimo y el rendimiento f\u00edsico",
        "M\u00e1s econ\u00f3mico que la terapia IV",
        "Fabricaci\u00f3n certificada GMP",
      ],
      badge: "Innovaci\u00f3n",
    },
  },

  categoryNames: {
    "peptide-pen": "Sistema Peptide Pen",
    "medit-pen": "MediT Pen",
    novadose: "Sistema NovaDose",
  },

  categoryDescriptions: {
    "peptide-pen":
      "Plumas reutilizables multidosis con dosificaci\u00f3n de precisi\u00f3n de 30 d\u00edas. 8 p\u00e9ptidos de investigaci\u00f3n disponibles.",
    "medit-pen":
      "Pluma de inyecci\u00f3n semanal precargada de un solo uso. Tirzepatida 40mg para investigaci\u00f3n metab\u00f3lica.",
    novadose:
      "Sistema avanzado de administraci\u00f3n NAD+ por cartuchos para microdosificaci\u00f3n diaria de precisi\u00f3n.",
  },

  researchCategories: {
    recovery: "Recuperaci\u00f3n y Curaci\u00f3n",
    "weight-loss": "P\u00e9rdida de Peso",
    "anti-aging": "Anti-Envejecimiento",
    "muscle-growth": "Crecimiento Muscular",
    "skin-rejuvenation": "Rejuvenecimiento de la Piel",
    "sleep-quality": "Sue\u00f1o y Descanso",
    "gut-health": "Salud Intestinal",
    "joint-health": "Articulaciones y Tendones",
    "hair-growth": "Crecimiento Capilar",
    "immune-support": "Soporte Inmunitario",
    "tendon-repair": "Reparaci\u00f3n de Tendones",
    "sports-recovery": "Recuperaci\u00f3n Deportiva",
    "post-surgery": "Post-Cirug\u00eda",
    "cognitive-enhancement": "Mejora Cognitiva",
    "energy-vitality": "Energ\u00eda y Vitalidad",
    "detox-cleanse": "Desintoxicaci\u00f3n",
    "body-composition": "Composici\u00f3n Corporal",
    inflammation: "Inflamaci\u00f3n y Dolor",
    "hormonal-balance": "Equilibrio Hormonal",
    "longevity-biohacking": "Longevidad y Biohacking",
  },

  breadcrumbs: {
    home: "Inicio",
    products: "Productos",
    about: "Sobre Nosotros",
    science: "Ciencia",
    contact: "Contacto",
    learn: "Aprender",
    quality: "Calidad",
    faq: "FAQ",
    compare: "Comparar",
    shipping: "Env\u00edo",
    whyOryn: "Por Qu\u00e9 ORYN",
    terms: "T\u00e9rminos",
    privacy: "Privacidad",
    disclaimer: "Aviso Legal",
    cart: "Carrito",
    checkout: "Pago",
    account: "Cuenta",
    orders: "Pedidos",
    referrals: "Referidos",
    wishlist: "Lista de Deseos",
    profile: "Perfil",
    wholesale: "Mayorista",
    bundles: "Packs",
    protocols: "Protocolos",
    peptides: "Péptidos",
    peptidePens: "Plumas de Péptidos",
    europe: "Europa",
    glossary: "Glosario",
    london: "Londres",
    encyclopedia: "Enciclopedia",
    ukPeptideDelivery: "Entrega de Péptidos en Reino Unido",
    tools: "Herramientas",
    peptideCalculator: "Calculadora de Péptidos",
  },

  homeSeo: {
    deliveryTitle: "ENTREGA DE P\u00c9PTIDOS EN TODA EUROPA",
    researchAreaTitle: "P\u00c9PTIDOS POR \u00c1REA DE INVESTIGACI\u00d3N",
    researchHubTitle: "CENTRO DE INVESTIGACI\u00d3N",
    peptidesFor: "P\u00e9ptidos para",
  },

  testimonials: {
    label: "CONFIANZA DE INVESTIGADORES",
    titleLine1: "Lo Que Dicen",
    titleLine2: "Nuestros Clientes",
    items: [
      {
        quote: "La pureza y consistencia de los p\u00e9ptidos ORYN es inigualable. El sistema de pluma hace que la dosificaci\u00f3n sea incre\u00edblemente precisa y fiable para nuestros protocolos de laboratorio.",
        name: "Dr. M. Richter",
        role: "Director de Investigaci\u00f3n, M\u00fanich",
      },
      {
        quote: "Cambiamos a ORYN hace seis meses. La documentaci\u00f3n COA, la trazabilidad de lotes y la certificaci\u00f3n GMP nos dan total confianza en cada pedido.",
        name: "Dr. S. Lindberg",
        role: "Investigador Cl\u00ednico, Estocolmo",
      },
      {
        quote: "Calidad de producto excepcional y env\u00edo r\u00e1pido en la UE. El sistema NovaDose es revolucionario para nuestra investigaci\u00f3n NAD+. Muy recomendable para cualquier laboratorio serio.",
        name: "Prof. J. Torres",
        role: "Director de Lab. Biotech, Barcelona",
      },
    ],
    stats: [
      { value: "2.400+", label: "PEDIDOS ENVIADOS" },
      { value: "98%", label: "TASA DE REORDEN" },
      { value: "4.9/5", label: "SATISFACCI\u00d3N" },
      { value: "24h", label: "TIEMPO RESPUESTA" },
    ],
  },

  localeSwitcher: {
    label: "Mercado",
    uk: "UK (€)",
    eu: "UE (€)",
  },

  wishlistPage: {
    title: "Lista de deseos",
    breadcrumb: "LISTA DE DESEOS",
    empty: "Tu lista de deseos está vacía",
    emptyTitle: "Sin artículos guardados",
    emptyDescription: "Explora nuestros productos y haz clic en el icono de corazón para guardar artículos.",
    browseProducts: "VER PRODUCTOS",
    itemsSaved: "artículos guardados",
    itemSaved: "artículo guardado",
  },

  faq: {
    title: "Preguntas Frecuentes",
    label: "FAQ",
  },

  contactFaq: {
    title: "ANTES DE CONTACTARNOS",
    items: [
      { q: "¿Cuánto tarda la entrega?", a: "Pedidos en España: 2-4 días laborables. Europa: 3-7 días laborables. Todos los pedidos se envían en embalaje discreto y con temperatura controlada." },
      { q: "¿Puedo rastrear mi pedido?", a: "¡Sí! Una vez despachado, recibirás un número de seguimiento por email. También puedes rastrear pedidos en tu panel de cuenta." },
      { q: "¿Cuál es su política de devolución?", a: "Ofrecemos garantía de devolución de 30 días en productos sin abrir. Contacta con info@orynlabs.com para iniciar una devolución." },
      { q: "¿Ofrecen precios mayoristas?", a: "Sí, contacta con wholesale@orynlabs.com para precios por volumen. Ofrecemos descuentos escalonados para instituciones de investigación y revendedores." },
    ],
  },

  homeFaq: {
    items: [
      { q: "¿Qué son los ORYN Peptide Pens?", a: "Los ORYN Peptide Pens son sistemas de administración de péptidos de investigación premezclados y listos para usar. Cada pluma contiene péptidos de grado farmacéutico con >99% de pureza, fabricados en nuestra instalación de sala limpia ISO 7. El formato de pluma elimina la necesidad de reconstitución, asegurando una dosificación consistente para aplicaciones de investigación." },
      { q: "¿Son legales los péptidos en España y Europa?", a: "Sí, los péptidos de investigación son legales para comprar en España y en toda Europa con fines de investigación. Los péptidos ORYN se venden estrictamente para investigación in-vitro y uso de laboratorio. No están destinados al consumo humano." },
      { q: "¿Cómo se fabrican sus péptidos?", a: "Todos los péptidos ORYN se sintetizan en nuestro laboratorio de sala limpia ISO 7 certificado GMP en Europa. Cada lote se somete a rigurosas pruebas de HPLC y espectrometría de masas para verificar >99% de pureza. Se incluye un Certificado de Análisis (COA) con cada pedido." },
      { q: "¿Cuánto tarda la entrega?", a: "Los pedidos en España suelen llegar en 2-4 días laborables. Los pedidos europeos tardan 3-7 días laborables según el destino. Todos los pedidos se envían en embalaje discreto y con temperatura controlada. Pedidos superiores a 150\u20ac tienen envío gratis." },
      { q: "¿Qué es el Programa de Referidos ORYN?", a: "Nuestro programa de referidos multinivel te permite ganar un 10% de comisión en las compras realizadas por colegas que refieras. También ganas comisiones hasta 5 niveles de profundidad a medida que crece tu red. Regístrate gratis para obtener tu código de referido único." },
      { q: "¿Ofrecen precios por volumen o al por mayor?", a: "Sí, ofrecemos descuentos por volumen a partir de 3+ unidades. Cuanto más pidas, mayor será el descuento — hasta un 15% de descuento para pedidos de investigación grandes. Contáctanos para precios mayoristas personalizados." },
    ],
  },

  shippingFaq: {
    items: [
      { q: "¿Cuánto tarda la entrega de péptidos en España?", a: "Los tiempos de entrega en España dependen de tu ubicación. Madrid y Barcelona reciben pedidos en 1-2 días laborables, otras ciudades principales en 2-3 días laborables, y zonas rurales o islas en 3-5 días laborables. Todos los pedidos realizados antes de las 14:00 se despachan el mismo día." },
      { q: "¿El envío de péptidos está controlado por temperatura?", a: "Sí. Todos los envíos de péptidos ORYN se embalan en cajas aisladas con acumuladores de frío en gel para mantener una temperatura de 2-8 grados Celsius durante el tránsito. En los meses de verano (junio-septiembre), añadimos protección adicional de cadena de frío con acumuladores extra y forros aislantes para garantizar la integridad del producto." },
      { q: "¿Cómo puedo obtener envío gratuito?", a: "El envío estándar gratuito está disponible en todos los pedidos superiores a 150 euros. Este umbral se aplica al subtotal del pedido antes de cualquier código de descuento. Los pedidos internacionales a Europa están sujetos a una tarifa plana de envío independientemente del valor del pedido. Tu carrito mostrará una barra de progreso indicando cuánto te falta para el umbral de envío gratuito." },
      { q: "¿Realizáis envíos internacionales de péptidos a Europa?", a: "Sí, ORYN realiza envíos a la mayoría de los países de la Unión Europea. La entrega europea suele tardar 3-7 días laborables según el país de destino. Todos los envíos internacionales incluyen embalaje con temperatura controlada y seguimiento completo. Los aranceles aduaneros e impuestos de importación son responsabilidad del cliente." },
      { q: "¿Cómo se empaqueta mi pedido de péptidos?", a: "Todos los pedidos ORYN se envían en cajas sin marcas externas ni descripciones de productos ni logotipos visibles en el exterior. En el interior, los bolígrafos de péptidos están asegurados en insertos de espuma personalizados dentro de un contenedor aislado con acumuladores de gel. Se incluye un albarán y el Certificado de Análisis dentro de la caja." },
      { q: "¿Puedo rastrear mi pedido de péptidos?", a: "Sí. Todos los pedidos reciben un número de seguimiento por email dentro de las 2 horas siguientes al despacho. Puedes rastrear tu envío en tiempo real a través del portal de nuestro socio de mensajería. Para pedidos mayoristas de 10+ unidades, ofrecemos seguimiento mejorado con ventanas de entrega estimadas y confirmación de entrega con firma." },
    ],
  },

  qualityFaq: {
    items: [
      { q: "¿Qué es un Certificado de Análisis (COA)?", a: "Un Certificado de Análisis es un documento emitido por un laboratorio de ensayo cualificado que confirma la identidad, pureza y composición de un producto peptídico. Cada COA de ORYN incluye datos de pureza por HPLC, confirmación de identidad por espectrometría de masas, resultados de pruebas de endotoxinas, verificación de esterilidad y detalles de fabricación específicos del lote." },
      { q: "¿Cómo interpreto un resultado de pureza HPLC?", a: "Los resultados de HPLC (Cromatografía Líquida de Alta Resolución) muestran un cromatograma con picos que representan diferentes componentes. El porcentaje del área del pico principal indica la pureza — por ejemplo, 99,2% significa que el 99,2% del material detectado es el péptido objetivo. Todos los péptidos ORYN alcanzan consistentemente más del 98% de pureza, con la mayoría de los lotes superando el 99%." },
      { q: "¿Quién realiza vuestros ensayos de terceros?", a: "Los péptidos ORYN son analizados por laboratorios analíticos independientes acreditados con ISO 17025. Estos laboratorios operan de forma independiente a nuestras instalaciones de fabricación, garantizando una verificación imparcial de la pureza, identidad y esterilidad de cada lote que producimos." },
      { q: "¿Con qué frecuencia se analizan los péptidos ORYN?", a: "Cada lote de cada producto ORYN se analiza antes de su lanzamiento. Operamos un estricto protocolo de liberación por lotes: ningún producto sale de nuestras instalaciones sin un Certificado de Análisis aprobado por un laboratorio independiente. Los análisis incluyen pureza por HPLC, confirmación de identidad por espectrometría de masas, cribado de endotoxinas y verificación de esterilidad." },
      { q: "¿Qué estándares de pureza cumplen los péptidos ORYN?", a: "Todos los péptidos ORYN se fabrican para superar el 98% de pureza, con la mayoría de los lotes alcanzando más del 99%. Esto se verifica mediante análisis HPLC independiente y confirmado por espectrometría de masas. Nuestras instalaciones de fabricación están certificadas GMP y operan bajo sistemas de gestión de calidad ISO 9001 en entornos de sala limpia ISO 7." },
      { q: "¿Puedo solicitar un COA para mi lote específico?", a: "Sí. Cada producto ORYN se entrega con un número de lote impreso en el embalaje. Puedes solicitar el COA específico de tu lote contactando con nuestro equipo de soporte en info@orynpeptides.com con tu número de lote. Mantenemos registros completos de trazabilidad para cada lote fabricado." },
    ],
  },

  wholesaleFaq: {
    items: [
      { q: "¿Cuál es la cantidad mínima de pedido para precios mayoristas?", a: "Nuestros niveles de precios mayoristas comienzan con solo 3 unidades. Los pedidos de 3-5 unidades reciben un 5% de descuento, de 6-9 unidades un 10% de descuento, y de 10 o más unidades un 15% de descuento sobre el precio de venta. Para pedidos de 50+ unidades, ofrecemos presupuestos personalizados adaptados a tus necesidades específicas." },
      { q: "¿Cómo funcionan los precios mayoristas en ORYN?", a: "Los precios mayoristas de ORYN se basan en niveles de descuento por volumen aplicados a nuestros precios de venta estándar. Los descuentos se calculan automáticamente en el proceso de pago para pedidos que cumplan los requisitos. Puedes combinar cualquier producto de nuestras gamas Peptide Pen, MediT Pen y NovaDose para alcanzar tu nivel. Para acuerdos de suministro continuos, contacta con nuestro equipo mayorista." },
      { q: "¿Cómo configuro una cuenta mayorista?", a: "Configurar una cuenta mayorista es sencillo. Contacta con nuestro equipo en info@orynpeptides.com o usa el formulario de consulta mayorista en nuestra página de contacto. Verificaremos los datos de tu organización, asignaremos un gestor de cuenta dedicado y activaremos los precios por volumen en tu cuenta en 1-2 días laborables." },
      { q: "¿Qué condiciones de pago están disponibles para clientes mayoristas?", a: "Los pedidos mayoristas estándar se pueden pagar por transferencia bancaria, tarjeta de crédito u orden de compra (para cuentas aprobadas). Ofrecemos condiciones de pago NET-30 para clientes mayoristas establecidos con historial comercial verificado. Todos los primeros pedidos se pagan por adelantado. Contacta con nuestro equipo para hablar sobre condiciones de pago para contratos de gran volumen." },
      { q: "¿Cuáles son los tiempos de entrega para pedidos de péptidos en volumen?", a: "Los pedidos mayoristas se envían en 1-2 días laborables desde nuestro centro de distribución. La entrega estándar tarda 2-4 días laborables. Para pedidos grandes (50+ unidades), puede requerirse hasta 5 días laborables de preparación. Todos los envíos mayoristas incluyen embalaje con temperatura controlada sin coste adicional, con seguimiento completo proporcionado." },
    ],
  },

  account: {
    nav: {
      dashboard: "Panel",
      orders: "Pedidos",
      referrals: "Referidos",
      wishlist: "Favoritos",
      profile: "Perfil",
      signOut: "Cerrar sesión",
    },
    dashboard: {
      welcome: "Bienvenido/a,",
      subtitle: "Gestiona tus pedidos, rastrea envíos y actualiza los datos de tu cuenta.",
      yourOrders: "Tus Pedidos",
      yourOrdersDesc: "Ver historial de pedidos y rastrear envíos",
      profileSettings: "Configuración del Perfil",
      profileSettingsDesc: "Actualiza tu información personal",
      shopPeptides: "Comprar Péptidos",
      shopPeptidesDesc: "Explora nuestro catálogo de grado investigación",
      orynRewards: "ORYN Rewards",
      earnPoints: "Gana 1 punto por cada 1\u20ac gastado",
      points: "PUNTOS",
      tier: "NIVEL",
      member: "Miembro",
      nextReward: "PRÓXIMA RECOMPENSA",
      nextRewardValue: "10\u20ac dto. a los 500pts",
      multiplier: "MULTIPLICADOR",
      multiplierValue: "1x",
      inviteEarn: "Invita y Gana",
      viewDashboard: "VER PANEL",
      inviteDescription: "Gana 10% de comisión cuando tus colegas hagan pedidos con tu código. Además, comisiones hasta 5 niveles de profundidad.",
      copyCode: "COPIAR CÓDIGO",
      copyLink: "COPIAR ENLACE",
      share: "COMPARTIR:",
      accountBenefits: "BENEFICIOS DE CUENTA",
      benefits: [
        { title: "Seguimiento de Pedidos", desc: "Actualizaciones en tiempo real de todos tus envíos" },
        { title: "Historial de Pedidos", desc: "Historial completo con opción de repedido" },
        { title: "Ganancias por Referidos", desc: "Gana comisiones por referidos" },
        { title: "Soporte Prioritario", desc: "Los titulares de cuenta reciben respuestas más rápidas" },
      ],
    },
    login: {
      title: "Bienvenido/a",
      subtitle: "Inicia sesión en tu cuenta ORYN",
      email: "EMAIL",
      password: "CONTRASEÑA",
      emailPlaceholder: "tu@email.com",
      passwordPlaceholder: "Introduce tu contraseña",
      signingIn: "INICIANDO SESIÓN...",
      signIn: "INICIAR SESIÓN",
      noAccount: "¿No tienes cuenta?",
      createOne: "Crea una",
      continueWithout: "Continuar comprando sin cuenta",
      loginFailed: "Error al iniciar sesión",
    },
    register: {
      title: "Crear Cuenta",
      subtitle: "Únete a ORYN para seguimiento de pedidos, ofertas exclusivas y más",
      firstName: "NOMBRE *",
      lastName: "APELLIDO *",
      email: "EMAIL *",
      emailPlaceholder: "tu@email.com",
      password: "CONTRASEÑA *",
      passwordPlaceholder: "Mínimo 8 caracteres",
      confirmPassword: "CONFIRMAR CONTRASEÑA *",
      organization: "ORGANIZACIÓN",
      organizationPlaceholder: "Laboratorio, universidad, empresa...",
      referralCode: "CÓDIGO DE REFERIDO",
      referralCodePlaceholder: "Opcional",
      creating: "CREANDO CUENTA...",
      createAccount: "CREAR CUENTA",
      termsPrefix: "Al crear una cuenta, aceptas los",
      termsOfService: "Términos de Servicio",
      and: "y la",
      privacyPolicy: "Política de Privacidad",
      hasAccount: "¿Ya tienes cuenta?",
      signIn: "Inicia sesión",
      passwordsMismatch: "Las contraseñas no coinciden",
      passwordTooShort: "La contraseña debe tener al menos 8 caracteres",
      registrationFailed: "Error en el registro",
    },
    profile: {
      title: "Configuración del Perfil",
      subtitle: "Gestiona la información de tu cuenta",
      personalInfo: "INFORMACIÓN PERSONAL",
      firstName: "NOMBRE",
      lastName: "APELLIDO",
      email: "EMAIL",
      emailNotChangeable: "El email no se puede cambiar",
      referralCode: "CÓDIGO DE REFERIDO",
      saveChanges: "GUARDAR CAMBIOS",
      saved: "Guardado",
      changePassword: "CAMBIAR CONTRASEÑA",
      currentPassword: "CONTRASEÑA ACTUAL",
      newPassword: "NUEVA CONTRASEÑA",
      newPasswordPlaceholder: "Mínimo 8 caracteres",
      confirmNewPassword: "CONFIRMAR NUEVA CONTRASEÑA",
      updatePassword: "ACTUALIZAR CONTRASEÑA",
      passwordUpdated: "Contraseña actualizada",
      passwordsMismatch: "Las contraseñas no coinciden",
      passwordTooShort: "La contraseña debe tener al menos 8 caracteres",
    },
    orders: {
      title: "Tus Pedidos",
      subtitle: "Rastrea y gestiona todos tus pedidos ORYN",
      noOrders: "Sin pedidos aún",
      noOrdersDesc: "Tu historial de pedidos aparecerá aquí cuando realices tu primera compra.",
      browseProducts: "VER PRODUCTOS",
      addedToCart: "AÑADIDO AL CARRITO \u2713",
      reorder: "REPEDIR",
      items: "artículos",
      item: "artículo",
    },
    orderDetail: {
      notFound: "Pedido no encontrado",
      backToOrders: "Volver a pedidos",
      ordersBreadcrumb: "Pedidos",
      orderTitle: "Pedido",
      placedOn: "Realizado el",
      print: "IMPRIMIR",
      orderTracking: "SEGUIMIENTO DEL PEDIDO",
      pending: "Pendiente",
      processing: "Procesando",
      shipped: "Enviado",
      delivered: "Entregado",
      cancelled: "Cancelado",
      orderItems: "ARTÍCULOS DEL PEDIDO",
      qty: "Cant:",
      subtotal: "Subtotal",
      shipping: "Envío",
      free: "GRATIS",
      discount: "Descuento",
      total: "Total",
      shippingAddress: "DIRECCIÓN DE ENVÍO",
      shippingNotAvailable: "Detalles de envío no disponibles",
      payment: "PAGO",
      method: "Método",
      status: "Estado",
      addedToCart: "AÑADIDO AL CARRITO",
      reorderAll: "REPEDIR TODOS LOS ARTÍCULOS",
      needHelp: "¿Necesitas ayuda?",
      needHelpDesc: "Si tienes preguntas sobre tu pedido, contáctanos en",
    },
    referrals: {
      title: "Programa de Referidos",
      subtitle: "Comparte ORYN con colegas y gana comisiones en cada pedido que realicen.",
      yourCode: "TU CÓDIGO DE REFERIDO",
      copied: "¡COPIADO!",
      copyCode: "COPIAR CÓDIGO",
      yourLink: "TU ENLACE DE REFERIDO",
      copyLink: "COPIAR ENLACE",
      shareVia: "COMPARTIR VÍA:",
      whatsapp: "WhatsApp",
      email: "Email",
      directReferrals: "REFERIDOS DIRECTOS",
      networkSize: "TAMAÑO DE RED",
      totalEarned: "TOTAL GANADO",
      available: "DISPONIBLE",
      earningsByLevel: "GANANCIAS POR NIVEL",
      levelLabel: "Nivel",
      commission: "comisión",
      ordersLabel: "pedidos",
      pending: "PENDIENTE",
      approved: "APROBADO",
      paidOut: "PAGADO",
      yourReferrals: "TUS REFERIDOS",
      commissionHistory: "HISTORIAL DE COMISIONES",
      tableOrder: "PEDIDO",
      tableLevel: "NIVEL",
      tableRate: "TASA",
      tableAmount: "IMPORTE",
      tableStatus: "ESTADO",
      tableDate: "FECHA",
      howItWorks: "CÓMO FUNCIONA",
      steps: [
        { title: "Comparte Tu Código", desc: "Envía tu código o enlace de referido único a colegas e investigadores." },
        { title: "Ellos Piden", desc: "Cuando se registran con tu código y hacen un pedido, tú ganas comisión." },
        { title: "Gana Recompensas", desc: "Gana 10% en referidos directos, más comisiones en sus referidos hasta 5 niveles de profundidad." },
      ],
      whatsappShareText: "Descubre ORYN Peptides — péptidos de investigación de precisión de un laboratorio biotecnológico europeo. Usa mi código {code} en tu primer pedido: {link}",
      emailShareSubject: "ORYN Peptides — Péptidos de Investigación de Precisión",
      emailShareBody: "Hola,\n\nQuería compartir ORYN Peptides contigo. Producen péptidos de investigación de grado farmacéutico con >99% de pureza.\n\nUsa mi código de referido: {code}\n\nO haz clic aquí: {link}\n\nSaludos",
    },
    wishlist: {
      title: "Favoritos",
      itemsSaved: "artículos guardados",
      itemSaved: "artículo guardado",
      empty: "Tu lista de favoritos está vacía",
      emptyDesc: "Guarda los productos que te interesen para más tarde.",
      browseProducts: "VER PRODUCTOS",
      addToCart: "AÑADIR AL CARRITO",
      remove: "ELIMINAR",
    },
    savedAddresses: {
      title: "DIRECCIONES GUARDADAS",
      cancel: "CANCELAR",
      addAddress: "+ AÑADIR DIRECCIÓN",
      labelField: "ETIQUETA (ej. Casa, Oficina)",
      labelPlaceholder: "Casa",
      firstName: "NOMBRE",
      lastName: "APELLIDO",
      address: "DIRECCIÓN",
      city: "CIUDAD",
      postcode: "CÓDIGO POSTAL",
      country: "PAÍS",
      phone: "TELÉFONO",
      setAsDefault: "Establecer como dirección predeterminada",
      saveAddress: "GUARDAR DIRECCIÓN",
      noAddresses: "Sin direcciones guardadas. Añade una para un pago más rápido.",
      default: "PREDETERMINADA",
      setDefault: "PREDETERMINAR",
      remove: "ELIMINAR",
      countries: {
        GB: "Reino Unido",
        ES: "España",
        IE: "Irlanda",
        DE: "Alemania",
        FR: "Francia",
        NL: "Países Bajos",
      },
    },
  },

  cookie: {
    message:
      "Usamos cookies para mejorar tu experiencia y para funcionalidades esenciales del sitio. Al continuar, aceptas nuestra",
    privacyPolicy: "Política de Privacidad",
    acceptAll: "ACEPTAR TODO",
    essentialOnly: "SOLO ESENCIALES",
  },

  toast: {
    addedToCart: "AÑADIDO AL CARRITO",
  },

  popups: {
    firstVisit: {
      discount: "10%",
      yourFirstOrder: "TU PRIMER PEDIDO",
      code: "WELCOME10",
      tagline: "BIENVENIDO A ORYN",
      title: "Ciencia de Péptidos de Precisión",
      description:
        "Laboratorio europeo de biotecnología con péptidos de investigación de >99% de pureza en sistemas de pluma de precisión. Usa el código WELCOME10 en tu primer pedido.",
      benefits: [
        "Envío gratis a partir de 150€",
        "Fabricación certificada GMP",
        "Certificado de Análisis incluido",
      ],
      shopNow: "COMPRAR AHORA",
      noThanks: "No gracias, prefiero navegar por mi cuenta",
    },
    exitIntent: {
      tagline: "ESPERA — ANTES DE IRTE",
      title: "Obtén un 10% de Descuento en Tu Primer Pedido",
      description:
        "Únete a investigadores de todo el mundo que usan péptidos de precisión ORYN. Introduce tu email para recibir tu código de descuento exclusivo.",
      placeholder: "tu@email.com",
      claimDiscount: "OBTENER MI 10% DE DESCUENTO",
      noSpam: "Sin spam. Cancela cuando quieras.",
      welcomeTitle: "¡Bienvenido a ORYN!",
      welcomeMessage:
        "Usa el código WELCOME10 en el checkout para un 10% de descuento.",
    },
  },

  payment: {
    processing: "PROCESANDO...",
    loadingPayment: "CARGANDO PAGO...",
    completeOrder: "COMPLETAR PEDIDO",
    sslEncrypted: "CIFRADO SSL",
    pciCompliant: "COMPATIBLE PCI",
    paymentFailed: "El pago ha fallado. Inténtalo de nuevo.",
    unexpectedError: "Ha ocurrido un error inesperado.",
    notCompleted: "El pago no se ha completado. Inténtalo de nuevo.",
    preparingPayment: "Preparando pago seguro...",
    paymentNotReady: "El sistema de pago no está listo. Por favor, inténtalo de nuevo.",
    paymentFormLoading: "El formulario de pago aún está cargando. Espera un momento.",
    orderCreationFailed: "Pago procesado pero falló la creación del pedido. Contacta con soporte.",
    orPayWith: "O PAGAR CON TARJETA",
  },

  volumeDiscount: {
    applied: "Descuento por volumen aplicado:",
    addMore: "Añade {count} más para {percent}% DE DESCUENTO",
    title: "DESCUENTOS POR VOLUMEN",
    items: "{count}+ artículos",
    off: "{percent}% DTO",
    active: "ACTIVO",
    unlockMore: "¡Añade {count} más para desbloquear {percent}% de descuento!",
  },

  frequentlyBought: {
    title: "Comprados Frecuentemente Juntos",
    save: "AHORRA 10%",
    bundlePrice: "Precio del pack — ahorra {amount} con esta combinación",
    addAll: "AÑADIR TODO AL CARRITO",
  },

  recentlyViewed: {
    title: "Vistos Recientemente",
  },

  orderBump: {
    addToOrder: "AÑADE A TU PEDIDO",
    yesAddIt: "SÍ, AÑADIR",
  },

  aria: {
    search: "Buscar",
    account: "Cuenta",
    wishlist: "Lista de deseos",
    openCart: "Abrir carrito",
    toggleMenu: "Alternar menú",
    mobileMenu: "Menú móvil",
    backToTop: "Volver arriba",
    cookieConsent: "Consentimiento de cookies",
    shareWhatsApp: "Compartir en WhatsApp",
    shareX: "Compartir en X",
    shareFacebook: "Compartir en Facebook",
    copyLink: "Copiar enlace",
    switchLanguage: "Cambiar idioma",
    switchRegion: "Cambiar región",
    breadcrumb: "Migas de pan",
    dismiss: "Cerrar",
    close: "Cerrar",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    email: "Correo electrónico",
    researchDisclaimer: "Aviso de investigación",
  },

  calculator: {
    interactiveTool: "HERRAMIENTA INTERACTIVA",
    title: "Calculadora de Reconstitución de Péptidos",
    description: "Introduce la cantidad de péptido, el volumen de agua y la dosis deseada para calcular la concentración y el volumen de inyección.",
    peptideAmount: "Cantidad de Péptido",
    bacteriostaticWater: "Volumen de Agua Bacteriostática",
    desiredDose: "Dosis Deseada Por Inyección",
    customAmount: "Cantidad personalizada",
    customVolume: "Volumen personalizado",
    customDose: "Dosis personalizada",
    concentration: "Concentración",
    injectionVolume: "Volumen de Inyección",
    insulinSyringe: "Jeringa de Insulina",
    totalDoses: "Dosis Totales",
    mcgPerMl: "mcg / mL",
    mlPerDose: "mL por dosis",
    unitsIuMarks: "unidades (marcas UI)",
    fromVial: "del vial",
    units: "unidades",
    overHundredUnits: "> 100 unidades",
    zeroUnits: "0 unidades",
    ml: "mL",
    overOneMl: "> 1,0 mL (usar jeringa más grande)",
    zeroMl: "0,000 mL",
    syringeLabel: "Jeringa de Insulina (100 unidades = 1 mL)",
    warningNote: "Nota:",
    warningText: "La dosis calculada excede una jeringa de insulina estándar de 100 unidades (1 mL). Considere agregar más agua bacteriostática para aumentar el volumen, lo que reducirá la concentración y el volumen de inyección por dosis.",
    enterValues: "Introduce valores válidos arriba para ver los resultados calculados.",
    quickReference: "Referencia Rápida",
    unitConversions: "Conversiones de Unidades",
    standardSyringe: "Jeringa Estándar",
    theFormula: "La Fórmula",
    mgToMcg: "1 mg = 1.000 mcg",
    mlToUnits: "1 mL = 100 unidades de insulina",
    u100Syringe: "Jeringa de insulina U-100",
    hundredUnitsOneMl: "100 unidades = 1,0 mL",
    formulaLine1: "Dosis (mcg) / Concentración (mcg/mL)",
    formulaLine2: "= Volumen a inyectar (mL)",
  },

  whyOrynPage: {
    differentiators: [
      { title: "Plumas de Péptidos Pre-Dosificadas", description: "A diferencia de los competidores que venden viales sueltos que requieren reconstitución, ORYN ofrece plumas de péptidos pre-mezcladas y dosificadas con precisión, listas para uso inmediato en investigación. Sin mezclas, sin cálculos, sin riesgo de contaminación.", highlight: "Único en el mercado del Reino Unido" },
      { title: "Pureza Verificada por HPLC al 98%+", description: "Cada lote de ORYN supera el 98% de pureza, verificado de forma independiente mediante Cromatografía Líquida de Alta Eficiencia y Espectrometría de Masas. La mayoría de los competidores del Reino Unido ofrecen solo el 95% o afirmaciones no verificadas.", highlight: "Por encima del estándar de la industria" },
      { title: "Fabricación GMP en el Reino Unido", description: "Todos los péptidos ORYN se fabrican en instalaciones certificadas GMP que cumplen con los estándares de producción farmacéutica. Trazabilidad completa del lote desde la materia prima hasta el producto terminado.", highlight: "Grado farmacéutico" },
      { title: "Envío Gratuito al Reino Unido en Pedidos Superiores a €150", description: "Disfrute de entrega al día siguiente sin coste en todos los pedidos del Reino Unido superiores a €150. El embalaje con control de temperatura garantiza la integridad del péptido desde nuestras instalaciones hasta su laboratorio de investigación.", highlight: "Entrega al día siguiente" },
      { title: "COA Completo con Cada Pedido", description: "Cada pedido de ORYN se envía con un Certificado de Análisis completo que confirma pureza, identidad, niveles de endotoxinas y esterilidad. Sin esperas, sin solicitudes — se incluye como estándar.", highlight: "Transparencia garantizada" },
      { title: "Producción en Sala Limpia ISO 7", description: "Los péptidos ORYN se envasan y sellan en salas limpias clasificadas ISO 7 con monitoreo ambiental continuo. Esto supera los estándares de la mayoría de los proveedores de péptidos del Reino Unido.", highlight: "Entorno de grado hospitalario" },
    ],
    comparisonFeatures: [
      { feature: "Formato de Entrega", oryn: "Sistema de Pluma Pre-dosificada", competitor: "Viales Sueltos (requiere reconstitución)" },
      { feature: "Estándar de Pureza", oryn: "98%+ Verificado por HPLC y MS", competitor: "95%+ (frecuentemente sin verificar)" },
      { feature: "Protocolo de Pruebas", oryn: "HPLC + Espectrometría de Masas + Endotoxinas", competitor: "Solo HPLC básico" },
      { feature: "Envío al Reino Unido", oryn: "Gratis sobre €150 (al día siguiente)", competitor: "Variable (€5–€15)" },
      { feature: "COA Incluido", oryn: "Cada lote, cada pedido", competitor: "Bajo petición (si disponible)" },
      { feature: "Instalación de Producción", oryn: "Sala Limpia ISO 7, Certificada GMP", competitor: "Variable (frecuentemente no revelado)" },
      { feature: "Esterilidad", oryn: "Filtro 0,22μm + Rayos Gamma", competitor: "Solo filtración" },
      { feature: "Vida Útil", oryn: "24 meses (sellado)", competitor: "6–12 meses" },
      { feature: "Atención al Cliente", oryn: "Equipo de investigación dedicado", competitor: "Solo correo electrónico" },
      { feature: "Gama de Productos", oryn: "10 péptidos en 3 sistemas de entrega", competitor: "5–8 péptidos, solo viales" },
    ],
    stats: [
      { value: "10", label: "Péptidos de Investigación", sublabel: "en 3 sistemas de entrega" },
      { value: "98%+", label: "Pureza Verificada", sublabel: "probado por HPLC + MS" },
      { value: "ISO 7", label: "Estándar de Sala Limpia", sublabel: "grado farmacéutico" },
      { value: "15+", label: "Ciudades del Reino Unido Atendidas", sublabel: "entrega al día siguiente" },
      { value: "40+", label: "Zonas de Londres", sublabel: "despacho el mismo día disponible" },
      { value: "24", label: "Meses de Vida Útil", sublabel: "sellado, refrigerado" },
    ],
    tableOryn: "ORYN",
    tableCompetitors: "COMPETIDORES TÍPICOS DEL REINO UNIDO",
    feature: "Característica",
    viewProducts: "VER NUESTROS PRODUCTOS",
    ourNumbers: "NUESTRAS CIFRAS",
    comparisonTitle: "Cómo Se Compara ORYN",
    comparisonSubtitle: "Vea cómo ORYN se compara con los proveedores típicos de péptidos del Reino Unido.",
  },

  wholesalePage: {
    breadcrumbHome: "INICIO",
    breadcrumbWholesale: "MAYOREO",
    heroBulkOrders: "PEDIDOS AL POR MAYOR",
    heroTitle1: "Mayoreo y Pedidos",
    heroTitle2: "al Por Mayor",
    heroDescription: "ORYN suministra sistemas de pen peptídico de grado investigación a universidades, laboratorios, clínicas y distribuidores en el Reino Unido y Europa. Descuentos por volumen del 5% al 15% — con precios personalizados para contratos a gran escala.",
    statMinOrderLabel: "Pedido Mínimo",
    statMinOrderValue: "3 Unidades",
    statMaxDiscountLabel: "Descuento Máximo",
    statMaxDiscountValue: "15% Dto.",
    statPurityLabel: "Pureza",
    statPurityValue: ">99%",
    statDispatchLabel: "Envío en UK",
    statDispatchValue: "Mismo Día",
    tiersLabel: "PRECIOS POR VOLUMEN",
    tiersTitle1: "Niveles de",
    tiersTitle2: "Descuento",
    tiersDescription: "Combina cualquier producto de toda nuestra gama. Los descuentos se aplican automáticamente según el total de unidades.",
    tierMostPopular: "MÁS POPULAR",
    tierOffRetail: "SOBRE PVP",
    tierPricing: "PRECIO",
    tierLabelStarter: "BÁSICO",
    tierLabelProfessional: "PROFESIONAL",
    tierLabelEnterprise: "EMPRESA",
    tierLabelCustom: "PRECIO PERSONALIZADO",
    benefitsLabel: "VENTAJAS DEL MAYOREO",
    benefitsTitle1: "Por Qué Asociarse Con",
    benefitsTitle2: "ORYN",
    benefitsDescription: "Más allá de los precios por volumen, las cuentas mayoristas de ORYN desbloquean una suite de servicios diseñados para compradores profesionales.",
    benefitAccountManagerTitle: "Gestor de Cuenta Dedicado",
    benefitAccountManagerDesc: "Un único punto de contacto para pedidos, precios y consultas técnicas. Tu gestor de cuenta comprende tus necesidades.",
    benefitShippingTitle: "Envío Prioritario",
    benefitShippingDesc: "Los pedidos mayoristas se envían el mismo día si se realizan antes de las 14h. Embalaje con control de temperatura incluido sin coste adicional.",
    benefitVolumePricingTitle: "Precios por Volumen",
    benefitVolumePricingDesc: "Descuentos automáticos del 5% al 15% según la cantidad del pedido. Precios personalizados disponibles para contratos continuos.",
    benefitCOATitle: "COA Incluido",
    benefitCOADesc: "Cada envío mayorista incluye Certificados de Análisis específicos por lote. Trazabilidad completa desde la síntesis hasta la entrega.",
    benefitCustomLabellingTitle: "Etiquetado Personalizado",
    benefitCustomLabellingDesc: "Marca blanca y packaging personalizado disponible para distribuidores y clínicas. Pedidos mínimos de 50 unidades para etiquetas personalizadas.",
    benefitTechSupportTitle: "Soporte Técnico",
    benefitTechSupportDesc: "Acceso a nuestro equipo de ciencia peptídica para orientación sobre protocolos, recomendaciones de almacenamiento y especificaciones de productos.",
    whoWeServeLabel: "NUESTROS CLIENTES",
    whoWeServeTitle1: "A Quién",
    whoWeServeTitle2: "Servimos",
    whoWeServeDescription: "Los péptidos mayoristas de ORYN son de confianza para profesionales de la investigación y organizaciones en el Reino Unido y Europa.",
    customerUniversitiesTitle: "Universidades y Academia",
    customerUniversitiesDesc: "Departamentos de investigación y programas de posgrado que estudian biología peptídica, farmacología y medicina regenerativa.",
    customerResearchLabsTitle: "Laboratorios de Investigación",
    customerResearchLabsDesc: "Laboratorios de investigación privados y públicos que realizan estudios in vitro e in vivo con compuestos peptídicos de grado investigación.",
    customerPharmaTitle: "Empresas Farmacéuticas",
    customerPharmaDesc: "Divisiones de I+D farmacéutico que usan péptidos de estándar de referencia para el desarrollo de fármacos y estudios de comparación analítica.",
    customerClinicsTitle: "Clínicas y Consultas Médicas",
    customerClinicsDesc: "Clínicas de medicina integrativa y profesionales que requieren un suministro consistente de péptidos de alta pureza para investigación clínica.",
    customerDistributorsTitle: "Distribuidores y Revendedores",
    customerDistributorsDesc: "Socios mayoristas que distribuyen productos ORYN en el Reino Unido y Europa. Opciones de marca blanca disponibles.",
    customerBiotechTitle: "Startups de Biotecnología",
    customerBiotechDesc: "Empresas de biotecnología emergentes que necesitan un suministro fiable de péptidos para el desarrollo de productos y estudios de prueba de concepto.",
    productsLabel: "EJEMPLOS DE PRECIOS MAYORISTAS",
    productsTitle1: "Productos a",
    productsTitle2: "Precios Mayoristas",
    productsDescription: "Descubre cómo los precios por volumen reducen tu coste por unidad. Todos los productos ORYN son elegibles para descuentos mayoristas.",
    productRetailLabel: "PVP",
    productViewAll: "VER LOS {count} PRODUCTOS",
    faqLabel: "FAQ",
    faqTitle1: "Preguntas",
    faqTitle2: "Frecuentes",
    faqDescription: "Preguntas comunes sobre nuestro programa mayorista, precios y configuración de cuenta.",
    ctaTitle: "¿Listo para Pedir al Por Mayor?",
    ctaDescription: "Contacta con nuestro equipo de mayoreo para configurar tu cuenta, discutir precios personalizados y empezar a ahorrar en pens peptídicos de grado investigación.",
    ctaEnquiry: "CONSULTA MAYORISTA",
    ctaBrowseProducts: "VER PRODUCTOS",
  },

  share: {
    label: "COMPARTIR",
  },

  socialProof: {
    from: "de",
    purchased: "compró",
    minAgo: "hace {min} min",
  },

  flashSale: {
    flash: "Venta Flash — Usa el código FLASH15 para un 15% de descuento en todas las plumas",
    weekend: "Oferta de Fin de Semana — Usa el código WEEKEND10 para un 10% de descuento",
  },

  qualityPage: {
    breadcrumbHome: "INICIO",
    breadcrumbQuality: "CALIDAD Y ANÁLISIS",
    heroBadge: "VERIFICADO POR TERCEROS",
    heroTitle1: "Transparencia en",
    heroTitle2: "Cada Lote",
    heroDescription:
      "Cada péptido ORYN es analizado de forma independiente por laboratorios acreditados por ISO. Publicamos Certificados de Análisis de cada producto porque creemos que mereces ver exactamente lo que recibes — pureza, identidad y esterilidad, verificados por la ciencia, no por el marketing.",
    statPurityLabel: "PUREZA DEL LOTE",
    statLabsLabel: "LABORATORIOS INDEPENDIENTES",
    statTestsLabel: "PRUEBAS POR LOTE",
    statTraceabilityLabel: "TRAZABILIDAD",
    processLabel: "NUESTRO PROCESO",
    processTitle1: "De la Síntesis al",
    processTitle2: "Certificado",
    processDescription:
      "Un riguroso proceso de control de calidad en cuatro etapas garantiza que cada péptido ORYN cumpla los más altos estándares analíticos antes de su lanzamiento.",
    testingSteps: [
      {
        title: "Síntesis de Péptidos",
        description:
          "Síntesis de péptidos en fase sólida (SPPS) en instalaciones europeas certificadas GMP bajo el sistema de gestión de calidad ISO 9001.",
      },
      {
        title: "Análisis HPLC",
        description:
          "La Cromatografía Líquida de Alta Eficiencia separa y cuantifica la pureza del péptido, confirmando >98% en cada lote.",
      },
      {
        title: "Espectrometría de Masas",
        description:
          "La confirmación de identidad LC-MS/MS verifica el peso molecular exacto y la integridad de la secuencia de aminoácidos.",
      },
      {
        title: "Generación del Certificado",
        description:
          "Un laboratorio independiente emite el Certificado de Análisis específico del lote con todos los datos analíticos y criterios de aprobación/rechazo.",
      },
    ],
    certificationsLabel: "CERTIFICACIONES",
    standardsTitle1: "Estándares de Calidad que",
    standardsTitle2: "Nos Definen",
    standardsDescription:
      "Nuestra infraestructura de fabricación y análisis cumple los requisitos de calidad farmacéutica más exigentes del sector.",
    qualityStandards: [
      {
        title: "Fabricación GMP",
        description:
          "Instalaciones de producción certificadas en Buenas Prácticas de Fabricación en toda la UE, garantizando consistencia de grado farmacéutico.",
      },
      {
        title: "Calidad ISO 9001",
        description:
          "Sistema de gestión de calidad reconocido internacionalmente que rige cada etapa, desde las materias primas hasta el producto terminado.",
      },
      {
        title: "Sala Limpia ISO 7",
        description:
          "El llenado estéril se realiza en salas limpias clasificadas ISO 7 con filtración HEPA y monitorización ambiental continua.",
      },
      {
        title: "Pureza Verificada por HPLC",
        description:
          "Cada lote verificado mediante análisis HPLC independiente. La mayoría de los lotes superan el 99% de pureza — entre los más altos del mercado europeo.",
      },
    ],
    coaLabel: "CERTIFICADOS DE ANÁLISIS",
    coaTitle1: "COA para Cada",
    coaTitle2: "Producto",
    coaDescription:
      "Cada uno de nuestros productos de péptidos está verificado de forma independiente. A continuación se muestran los últimos resultados de pruebas por lote.",
    passLabel: "APROBADO",
    purityLabel: "PUREZA",
    batchLabel: "LOTE",
    testedLabel: "ANALIZADO",
    methodLabel: "MÉTODO",
    testedDate: "Feb 2026",
    viewCoa: "VER COA",
    independentLabel: "VERIFICACIÓN INDEPENDIENTE",
    partnersTitle1: "Laboratorios de Análisis",
    partnersTitle2: "Independientes",
    partnersP1:
      "ORYN no analiza sus propios productos. Cada Certificado de Análisis es emitido por laboratorios analíticos independientes acreditados por ISO 17025, sin ninguna relación financiera con nuestra operación de fabricación.",
    partnersP2:
      "Esta separación garantiza una verificación imparcial y científicamente rigurosa de pureza, identidad y esterilidad. Nuestros laboratorios asociados utilizan métodos analíticos validados, incluidos HPLC de fase inversa, LC-MS/MS, ensayo LAL de endotoxinas y esterilidad por filtración en membrana.",
    partnersBullets: [
      "Laboratorios analíticos acreditados ISO 17025",
      "Sin vínculos financieros con la fabricación ORYN",
      "Métodos validados de HPLC y espectrometría de masas",
      "Verificación de endotoxinas y esterilidad",
      "Trazabilidad completa del lote desde la síntesis hasta el certificado",
    ],
    analyticalMethodsLabel: "MÉTODOS ANALÍTICOS",
    analyticalMethods: [
      {
        method: "Análisis de Pureza HPLC",
        description:
          "Columna C18 de fase inversa, detección UV a 220 nm. Cuantifica la pureza del péptido y detecta impurezas.",
          standard: "USP <621>",
      },
      {
        method: "Espectrometría de Masas (LC-MS)",
        description:
          "Ionización por electrospray con detección de masas de alta resolución. Confirma la identidad molecular.",
          standard: "ISO 13528",
      },
      {
        method: "Ensayo de Endotoxinas",
        description:
          "Ensayo turbidimétrico cinético LAL (Lisado de Amebocitos de Limulus). Garantiza que los niveles de endotoxinas bacterianas estén por debajo de los límites.",
          standard: "USP <85>",
      },
      {
        method: "Prueba de Esterilidad",
        description:
          "Método de filtración en membrana con incubación de 14 días en medios TSB y FTM.",
          standard: "USP <71>",
      },
    ],
    understandingLabel: "ENTENDIENDO TU COA",
    coaContentsTitle1: "Lo que Contiene",
    coaContentsTitle2: "Cada COA",
    coaContentsDescription:
      "Cada Certificado de Análisis ORYN ofrece transparencia analítica completa. Esto es lo que encontrarás en cada documento.",
    coaItems: [
      {
        title: "Identidad del Péptido",
        details:
          "Nombre del compuesto, fórmula molecular, peso molecular, secuencia de aminoácidos y número CAS.",
      },
      {
        title: "Datos de Pureza HPLC",
        details:
          "Cromatograma, tiempo de retención, porcentaje de área de pico y perfil de impurezas con criterios de aceptación.",
      },
      {
        title: "Espectro de Masas",
        details:
          "Confirmación de identidad LC-MS que muestra el peso molecular observado frente al teórico y los estados de carga.",
      },
      {
        title: "Resultados de Endotoxinas",
        details:
          "Resultados del ensayo LAL en EU/mL con límites de especificación. Todos los productos ORYN están por debajo de 0,5 EU/mL.",
      },
      {
        title: "Informe de Esterilidad",
        details:
          "Resultados de incubación de 14 días en medios TSB y FTM que confirman ausencia de crecimiento microbiano.",
      },
      {
        title: "Información del Lote",
        details:
          "Número de lote único, fecha de fabricación, fecha de análisis, fecha de caducidad e identificación del analista.",
      },
    ],
    faqLabel: "FAQ",
    faqTitle1: "Calidad y Análisis",
    faqTitle2: "FAQ",
    faqDescription:
      "Preguntas frecuentes sobre nuestro proceso de control de calidad, análisis de pureza de péptidos y Certificados de Análisis.",
    ctaTitle: "Calidad que Puedes Verificar",
    ctaDescription:
      "Cada péptido ORYN se envía con un número de lote que puedes rastrear hasta un Certificado de Análisis independiente. Comprueba la ciencia por ti mismo.",
    ctaBrowseProducts: "VER PRODUCTOS",
    ctaRequestCoa: "SOLICITAR UN COA",
  },

  shippingPage: {
    heroTagline: "TEMPERATURA CONTROLADA",
    heroTitle1: "Envío y",
    heroTitle2: "Entrega",
    heroDescription:
      "Cada pedido ORYN se envía el mismo día en embalaje de temperatura controlada, garantizando que tus bolígrafos de péptidos lleguen en perfectas condiciones. Envío gratis en pedidos superiores a \u20ac{threshold}.",
    breadcrumbHome: "INICIO",
    breadcrumbShipping: "ENVÍO Y ENTREGA",
    statUkDeliveryLabel: "Entrega UK",
    statUkDeliveryValue: "2-4 Días",
    statDispatchLabel: "Envío",
    statDispatchValue: "Mismo Día",
    statFreeOverLabel: "Gratis Desde",
    statPackagingLabel: "Embalaje",
    statPackagingValue: "2-8\u00b0C",
    ukZonesSectionLabel: "ZONAS DE ENTREGA UK",
    ukZonesSectionTitle1: "Tiempos de Entrega por",
    ukZonesSectionTitle2: "Región",
    ukZonesSectionDescription:
      "Todos los pedidos realizados antes de las 14:00 GMT se envían el mismo día hábil. Los tiempos indicados son días hábiles desde el despacho.",
    ukDeliveryNote:
      "Los tiempos son estimados para envío estándar. Opciones exprés disponibles en el pago. Los pedidos de fin de semana y festivos se envían el siguiente día hábil.",
    ukZones: [
      { region: "Londres y Sureste", days: "1 \u2013 2 días" },
      { region: "Midlands y Anglia del Este", days: "2 \u2013 3 días" },
      { region: "Norte de Inglaterra", days: "2 \u2013 3 días" },
      { region: "Escocia (Tierras Bajas)", days: "3 \u2013 4 días" },
      { region: "Gales", days: "2 \u2013 3 días" },
      { region: "Irlanda del Norte", days: "3 \u2013 4 días" },
      { region: "Tierras Altas e Islas", days: "4 \u2013 5 días" },
    ],
    coldChainSectionLabel: "LOGÍSTICA DE CADENA DE FRÍO",
    packagingTitle1: "Embalaje de",
    packagingTitle2: "Temperatura Controlada",
    packagingDescription:
      "Los péptidos requieren almacenamiento refrigerado a 2-8\u00b0C. Nuestro embalaje de cadena de frío garantiza que tu pedido mantenga la temperatura óptima durante el tránsito.",
    packagingBullets: [
      "Mantiene 2-8\u00b0C hasta 48 horas en tránsito",
      "Packs de gel no tóxicos, preenfriados a 2\u00b0C",
      "Contenedores aislantes multicapa",
      "Protección extra durante los meses de verano",
      "Insertos de espuma personalizados para los bolígrafos",
    ],
    coldChainFeatures: [
      {
        title: "Cajas de Envío Aisladas",
        description:
          "Contenedores aislantes multicapa mantienen la temperatura interna a 2-8\u00b0C hasta 48 horas, protegiendo la integridad del péptido desde el almacén hasta la puerta.",
      },
      {
        title: "Packs de Gel Frío",
        description:
          "Packs de gel de cambio de fase no tóxico, preenfriados a 2\u00b0C, proporcionan refrigeración sostenida sin riesgo de congelar el producto.",
      },
      {
        title: "Ajustes Estacionales",
        description:
          "Durante los meses de verano (junio-septiembre) añadimos packs de hielo extra y aislamiento mejorado. En calor extremo optamos por entrega exprés.",
      },
      {
        title: "Monitorización de Temperatura",
        description:
          "Los pedidos al por mayor de 25+ unidades incluyen tiras indicadoras de temperatura que confirman que el envío se mantuvo en el rango de 2-8\u00b0C.",
      },
    ],
    euSectionLabel: "ENVÍO INTERNACIONAL",
    euSectionTitle1: "Entrega",
    euSectionTitle2: "Europea",
    euSectionDescription:
      "ORYN envía a más de 15 países europeos con seguimiento completo y embalaje de temperatura controlada.",
    euCountriesHeader: "PAÍSES DE LA UE A LOS QUE ENVIAMOS",
    euCountriesNotListed:
      "\u00bfNo aparece tu país? Contáctanos: es posible que podamos organizar el envío.",
    euDeliveryTimeTitle: "Tiempo de Entrega",
    euDeliveryTimeValue: "3 \u2013 7 días",
    euDeliveryTimeDescription:
      "Días hábiles desde el despacho. Europa Occidental suele tardar 3-5 días, Europa del Este 5-7 días.",
    euShippingCostTitle: "Coste de Envío",
    euShippingCostValue: "Tarifa Plana",
    euShippingCostDescription:
      "Envío a tarifa plana a todos los destinos europeos. Calculado en el pago según el país de destino y el peso del pedido.",
    euCustomsTitle: "Aduanas e Impuestos",
    euCustomsValue: "Responsabilidad del Comprador",
    euCustomsDescription:
      "Los pedidos internacionales pueden estar sujetos a aranceles aduaneros e impuestos de importación. Estos cargos son responsabilidad del cliente.",
    euTrackingTitle: "Seguimiento",
    euTrackingValue: "Seguimiento Completo",
    euTrackingDescription:
      "Todos los envíos internacionales incluyen seguimiento de extremo a extremo con actualizaciones de estado en tiempo real por email.",
    freeShippingSectionLabel: "ENVÍO GRATIS",
    freeShippingTitle1: "Envío UK Gratis a Partir de",
    freeShippingTitle2: "\u20ac{threshold}",
    freeShippingDescription:
      "Los pedidos superiores a \u20ac{threshold} tienen envío estándar gratis al Reino Unido. Sigue tu progreso en tu carrito.",
    freeShippingExampleLabel: "EJEMPLO: PEDIDO DE \u20ac120",
    freeShippingExampleAway: "\u20ac30 para conseguir envío gratis",
    discreetTitle: "Embalaje Discreto",
    discreetDescription:
      "Todos los pedidos ORYN se envían en cajas sin marcar. Ningún nombre de producto, marca ni descripción es visible en el exterior.",
    discreetItems: [
      "Caja exterior sin marcas",
      "Sin branding visible",
      "Nombre de remitente genérico",
      "Sin descripción del producto",
    ],
    trackingTitle: "Seguimiento del Pedido",
    trackingDescription:
      "Cada pedido recibe un número de seguimiento en las 2 horas posteriores al despacho. Sigue tu envío en tiempo real desde nuestro almacén hasta tu puerta.",
    trackingItems: [
      "Email de seguimiento en 2 horas",
      "Actualizaciones de estado en tiempo real",
      "Ventana de entrega estimada",
      "Confirmación de entrega",
    ],
    returnsTitle: "Devoluciones y Reembolsos",
    returnsDescription:
      "Si tu pedido llega dañado o es incorrecto, contáctanos en 48 horas. Organizaremos un reemplazo o reembolso completo sin coste adicional.",
    returnsItems: [
      "Plazo de 48 horas para reportar daños",
      "Reemplazo completo o reembolso",
      "Se requiere evidencia fotográfica",
      "Envío de devolución gratuito por errores",
    ],
    faqSectionLabel: "FAQ",
    faqSectionTitle1: "Preguntas sobre",
    faqSectionTitle2: "Envío",
    faqSectionDescription:
      "Preguntas frecuentes sobre la entrega de péptidos, embalaje y opciones de envío.",
    ctaTitle: "Pide Hoy, Recibe Esta Semana",
    ctaDescription:
      "Despacho el mismo día antes de las 14:00. Entrega de temperatura controlada. Envío UK gratis a partir de \u20ac{threshold}.",
    ctaShopNow: "COMPRAR AHORA",
    ctaContactUs: "CONTÁCTANOS",
  },

  termsPage: {
    tagline: "LEGAL",
    title: "Términos de Servicio",
    lastUpdated: "Última actualización: marzo de 2026",
    sections: [
      {
        heading: "1. Aceptación de los Términos",
        content:
          "Al acceder y utilizar el sitio web y los servicios de ORYN Peptide Labs, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con estos términos, no utilice nuestros servicios.",
      },
      {
        heading: "2. Solo para Uso en Investigación",
        content:
          "Todos los productos vendidos por ORYN Peptide Labs están destinados únicamente a fines de laboratorio e investigación. Los productos no están destinados al consumo humano ni animal. Al adquirirlos, usted confirma que los obtiene para fines de investigación legítimos y cumple con todas las leyes y regulaciones aplicables en su jurisdicción.",
      },
      {
        heading: "3. Elegibilidad",
        content:
          "Debe tener al menos 18 años y representar una organización de investigación legítima, laboratorio o institución académica para adquirir productos. ORYN se reserva el derecho de solicitar verificación de credenciales de investigación.",
      },
      {
        heading: "4. Pedidos y Pago",
        content:
          "Todos los precios están en EUR. El pago se procesa de forma segura. ORYN se reserva el derecho de cancelar pedidos que parezcan fraudulentos o que infrinjan estos términos. Para pedidos mayoristas: 50% de pago anticipado, 50% antes del envío.",
      },
      {
        heading: "5. Envío y Entrega",
        content:
          "Los productos se envían con manejo de cadena de frío cuando es necesario. Los tiempos de entrega son estimados. ORYN no es responsable de los retrasos causados por aduanas, transportistas o eventos de fuerza mayor.",
      },
      {
        heading: "6. Devoluciones y Reembolsos",
        content:
          "Debido a la naturaleza de nuestros productos, solo se aceptan devoluciones por artículos dañados o incorrectos dentro de los 14 días posteriores a la entrega. Los productos deben estar sin abrir y en su embalaje original.",
      },
      {
        heading: "7. Propiedad Intelectual",
        content:
          "Todo el contenido, la marca y los materiales de este sitio web son propiedad de ORYN Peptide Labs. La reproducción no autorizada está prohibida.",
      },
      {
        heading: "8. Limitación de Responsabilidad",
        content:
          "ORYN Peptide Labs proporciona productos tal cual para fines de investigación. No ofrecemos garantías respecto a la idoneidad para ningún propósito particular más allá de las especificaciones indicadas. Nuestra responsabilidad se limita al precio de compra del producto.",
      },
      {
        heading: "9. Contacto",
        content: "Para preguntas sobre estos términos, contáctenos en legal@orynlabs.com.",
      },
    ],
  },

  privacyPage: {
    tagline: "LEGAL",
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: marzo de 2026",
    sections: [
      {
        heading: "1. Información que Recopilamos",
        content:
          "Recopilamos información que usted proporciona directamente: nombre, correo electrónico, organización, dirección de envío y datos de pago cuando crea una cuenta o realiza un pedido.",
      },
      {
        heading: "2. Cómo Usamos su Información",
        content:
          "Su información se utiliza para: procesar pedidos, comunicarnos sobre su cuenta, brindar soporte al cliente, enviar actualizaciones de pedidos y cumplir con obligaciones legales. No vendemos sus datos personales.",
      },
      {
        heading: "3. Protección de Datos",
        content:
          "ORYN Peptide Labs cumple con el RGPD y las regulaciones europeas de protección de datos aplicables. Sus datos se almacenan de forma segura con cifrado en reposo y en tránsito.",
      },
      {
        heading: "4. Sus Derechos",
        content:
          "Bajo el RGPD, usted tiene derecho a: acceder a sus datos, rectificar inexactitudes, solicitar la eliminación, restringir el procesamiento, la portabilidad de datos y oponerse al procesamiento. Contacte a privacy@orynlabs.com para ejercer estos derechos.",
      },
      {
        heading: "5. Cookies",
        content:
          "Utilizamos cookies esenciales para la funcionalidad del sitio y cookies analíticas para mejorar nuestro servicio. Puede gestionar las preferencias de cookies en la configuración de su navegador.",
      },
      {
        heading: "6. Contacto",
        content: "Responsable de Protección de Datos: privacy@orynlabs.com",
      },
    ],
  },

  disclaimerPage: {
    tagline: "LEGAL",
    title: "Aviso Legal de Investigación",
    lastUpdated: "Última actualización: marzo de 2026",
    alertTitle: "Aviso Importante",
    alertContent:
      "Todos los productos vendidos por ORYN Peptide Labs están estrictamente destinados a la investigación de laboratorio y el estudio científico. NO están destinados al uso humano o veterinario, aditivos alimentarios, medicamentos, cosméticos, productos químicos domésticos ni ninguna otra forma de consumo.",
    buyerResponsibilityIntro:
      "Al comprar a ORYN Peptide Labs, el comprador reconoce y acepta que:",
    buyerResponsibilityItems: [
      "Los productos se utilizarán únicamente para fines de investigación legítimos",
      "El comprador conoce y cumple con todas las normativas aplicables",
      "Los productos no se revenderán para consumo humano",
      "El comprador asume toda la responsabilidad por el manejo y uso adecuados",
      "El comprador tiene la mayoría de edad y representa a una entidad de investigación legítima",
    ],
    sections: [
      {
        heading: "Declaración de Uso en Investigación",
        content:
          "ORYN Peptide Labs fabrica y distribuye compuestos peptídicos exclusivamente para investigación in vitro, experimentación de laboratorio e investigación científica. Todos los compuestos se suministran como productos químicos de investigación con Certificados de Análisis (COA) adjuntos para la verificación de lotes.",
      },
      {
        heading: "Responsabilidad del Comprador",
        content: "",
      },
      {
        heading: "Sin Afirmaciones Médicas",
        content:
          "ORYN Peptide Labs no realiza ninguna afirmación sobre las propiedades terapéuticas, diagnósticas o preventivas de ningún producto. Las descripciones de los productos hacen referencia a la literatura científica publicada únicamente con fines informativos y no constituyen asesoramiento médico ni afirmaciones de eficacia.",
      },
      {
        heading: "Garantía de Calidad",
        content:
          "Todos los productos ORYN se fabrican en instalaciones de sala limpia ISO Clase 7 certificadas GMP con validación analítica de terceros. Los niveles de pureza superan el 99% según lo verificado por análisis HPLC. La documentación completa de lotes, incluido COA, datos de estabilidad y documentación DMF, está disponible bajo solicitud.",
      },
      {
        heading: "Cumplimiento Normativo",
        content:
          "Es responsabilidad del comprador garantizar el cumplimiento de todas las normativas locales, nacionales e internacionales sobre la compra, importación, posesión y uso de péptidos de investigación. ORYN Peptide Labs opera bajo marcos regulatorios europeos.",
      },
    ],
  },
} as unknown as Dictionary;

export default es;
