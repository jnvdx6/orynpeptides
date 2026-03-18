import type { Dictionary } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pt = {
  meta: {
    title: "ORYN | Sistemas de Caneta Peptídica — Compre Peptídeos Online",
    titleTemplate: "%s | ORYN Peptide Labs",
    description:
      "Compre canetas de peptídeos de grau farmacêutico online. BPC-157, NAD+, Tirzepatide, GHK-CU e mais em sistemas de caneta reutilizáveis. Certificação GMP, pureza >99%. Desde €99. Envio gratuito.",
    ogDescription:
      "Sistemas de caneta peptídica de precisão. 10 peptídeos desde €99. Canetas reutilizáveis com cartuchos substituíveis. Certificação GMP. Pureza >99%. Envio gratuito para a Europa.",
  },

  header: {
    announcementText: "ENVIO GRATUITO PARA ENCOMENDAS SUPERIORES A 150€",
    shopNow: "COMPRAR",
    myAccount: "A Minha Conta",
    signIn: "Iniciar Sessão",
    searchPlaceholder: "Pesquisar peptídeos...",
    noResults: "Sem resultados para",
    typeToSearch: "Escreva para pesquisar...",
    viewAll: "VER TODOS OS PRODUTOS",
  },

  nav: {
    products: "Produtos",
    science: "Ciência",
    about: "Sobre Nós",
    contact: "Contacto",
    compare: "Comparar",
    learn: "Aprender",
  },

  hero: {
    tagline: "SISTEMAS DE CANETA PEPTÍDICA DE PRECISÃO",
    brandDescriptor: "Sistemas de Caneta Peptídica de Grau de Investigação",
    subtitle: "Trave o Envelhecimento. Potencie o Bem-Estar. Prolongue a Longevidade.",
    description:
      "Peptídeos de grau farmacêutico em sistemas de caneta reutilizáveis com cartuchos substituíveis. Dosagem precisa, fornecimento de 30 dias. Certificação GMP. Fabricados na Coreia do Sul. Pureza >99%.",
    explorePeptides: "EXPLORAR PEPTÍDEOS",
    ourScience: "A NOSSA CIÊNCIA",
    purityLabel: "PUREZA",
    dosingLabel: "DOSAGEM",
    dosingValue: "30 Dias",
    trustFreeShipping: "ENVIO GRATUITO",
    trustSecure: "PAGAMENTO SEGURO",
    trustCOA: "COA INCLUÍDO",
    socialProofCount: "2.400+ encomendas",
    socialProofLabel: "enviadas este trimestre",
    stats: {
      productsValue: "10",
      productsLabel: "Produtos",
      purityValue: ">99%",
      purityLabel: "Pureza",
      cleanroomValue: "ISO 7",
      cleanroomLabel: "Sala Limpa",
      certifiedValue: "GMP",
      certifiedLabel: "Certificado",
    },
  },

  categories: {
    label: "LINHAS DE PRODUTO",
    titleLine1: "Três Sistemas.",
    titleLine2: "Um Padrão.",
    description:
      "Cada produto ORYN é fabricado em salas limpas ISO Classe 7 com certificação GMP e validação por terceiros.",
    from: "Desde",
    items: [
      {
        name: "Sistema Peptide Pen",
        tagline: "Dosagem de Precisão 30 Dias",
        description:
          "8 peptídeos de investigação em canetas reutilizáveis multidose. Formulações de grau farmacêutico com visor digital de dosagem.",
      },
      {
        name: "MediT Pen",
        tagline: "Injeção Semanal",
        description:
          "Caneta pré-carregada de Tirzepatide 40mg. Ação dupla GIP/GLP-1 para investigação metabólica.",
      },
      {
        name: "Sistema NovaDose",
        tagline: "Microdosagem Diária NAD+",
        description:
          "Sistema avançado de administração NAD+ baseado em cartuchos. Grau farmacêutico com biodisponibilidade próxima de 100%.",
      },
    ],
  },

  showcase: {
    label: "DESTAQUES",
    titleLine1: "Peptídeos de",
    titleLine2: "Grau de Investigação",
    subtitle: "Compostos de grau farmacêutico desde €99. Sistemas de caneta reutilizáveis com dosagem de precisão de 30 dias.",
    viewAll: "VER TODOS OS PRODUTOS",
    trustShipping: "ENVIO GRATUITO",
    trustPurity: "PUREZA >99%",
    trustCOA: "COA INCLUÍDO",
    trustReturn: "LOTE RASTREÁVEL",
  },

  science: {
    label: "O NOSSO PROCESSO",
    titleLine1: "Precisão",
    titleLine2: "Molecular Projetada",
    description:
      "Desde a obtenção de matérias-primas até à esterilização final, cada etapa do processo de fabrico ORYN é regida por protocolos de grau farmacêutico e validada por laboratórios independentes.",
    specs: {
      manufacturingLabel: "Fabrico",
      manufacturingValue: "Coreia",
      capacityLabel: "Capacidade",
      capacityValue: "100K/mês",
      batchSizeLabel: "Tamanho do Lote",
      batchSizeValue: "20.000 un",
      leadTimeLabel: "Prazo",
      leadTimeValue: "45-60 dias",
    },
    steps: [
      {
        title: "Síntese",
        description:
          "Síntese de peptídeos em fase sólida com protocolos de purificação proprietários que atingem >99% de pureza em todas as formulações.",
      },
      {
        title: "Formulação",
        description:
          "Formulações aquosas de grau farmacêutico com agentes de viscosidade PEG. pH otimizado (6,8-7,4) para estabilidade e biodisponibilidade.",
      },
      {
        title: "Esterilização",
        description:
          "Fabrico completo em câmara asséptica com filtração de 0,22um e acabamento por esterilização com raios gama. Salas limpas ISO Classe 7.",
      },
      {
        title: "Validação",
        description:
          "Controlo de qualidade por terceiros: POSTECH, UNIST e SGS. Cada lote inclui Certificado de Análise com dados analíticos completos.",
      },
    ],
  },

  howItWorks: {
    label: "COMO FUNCIONA",
    titleLine1: "Simples.",
    titleLine2: "Eficaz.",
    description: "Desde escolher o seu peptídeo até ver resultados — o nosso sistema de caneta torna a investigação descomplicada.",
    cta: "EXPLORAR PEPTÍDEOS",
    steps: [
      {
        title: "Escolha o Seu Peptídeo",
        description: "Explore a nossa gama de peptídeos com >99% de pureza. Cada caneta vem pré-misturada e pronta a usar.",
      },
      {
        title: "Compre com Segurança",
        description: "Pagamento rápido com Stripe. Envio gratuito em encomendas superiores a €150.",
      },
      {
        title: "Receba Discretamente",
        description: "Embalagem discreta, envio com temperatura controlada. COA incluído em cada encomenda.",
      },
      {
        title: "Inicie a Sua Investigação",
        description: "Dosagem ajustável através de caneta de precisão. Sem misturar, sem frascos, sem desperdício.",
      },
    ],
  },

  quality: {
    label: "GARANTIA DE QUALIDADE",
    titleLine1: "Padrões",
    titleLine2: "Farmacêuticos",
    pillars: [
      {
        title: "Sala Limpa ISO Classe 7",
        description:
          "Ambientes livres de partículas que cumprem os padrões de fabrico farmacêutico.",
      },
      {
        title: "Certificação GMP",
        description:
          "Qualidade consistente, documentação adequada e produção rastreável.",
      },
      {
        title: "Pureza >99%",
        description:
          "Análise HPLC e validação por terceiros — POSTECH, UNIST e SGS.",
      },
      {
        title: "Rastreabilidade de Lotes",
        description:
          "Documentação DMF completa, dados de estabilidade e COA para cada lote.",
      },
      {
        title: "Esterilização por Raios Gama",
        description:
          "Esterilidade completa por irradiação gama após fabrico asséptico.",
      },
      {
        title: "Padrões Europeus",
        description:
          "Conformidade total com os quadros regulamentares farmacêuticos europeus.",
      },
    ],
  },

  cta: {
    label: "INICIE A SUA INVESTIGAÇÃO",
    titleLine1: "Pronto para avançar na sua",
    titleLine2: "investigação peptídica?",
    description:
      "Explore o nosso catálogo completo de peptídeos de grau de investigação. Cada produto inclui Certificado de Análise e documentação completa do lote.",
    browseProducts: "VER TODOS OS PRODUTOS",
    contactTeam: "CONTACTAR A NOSSA EQUIPA",
    valueProp1: "ENVIO GRATUITO EU/UK",
    valueProp2: "COA EM CADA ENCOMENDA",
    valueProp3: "CERTIFICAÇÃO GMP",
    badges: [
      { value: "ISO 7", label: "SALA LIMPA" },
      { value: "GMP", label: "CERTIFICADO" },
      { value: ">99%", label: "PUREZA" },
      { value: "SGS", label: "VALIDADO" },
    ],
  },

  footer: {
    description:
      "Ciência Peptídica de Precisão. Laboratório biotecnológico que fornece soluções peptídicas de grau de investigação projetadas com precisão molecular.",
    researchOnly: "APENAS PARA FINS DE INVESTIGAÇÃO",
    newsletterTitle: "Mantenha-se Atualizado",
    newsletterDescription: "Receba as últimas novidades sobre peptídeos, investigação e ofertas exclusivas.",
    newsletterPlaceholder: "o.seu@email.com",
    newsletterButton: "SUBSCREVER",
    newsletterSuccess: "Obrigado! Está agora subscrito.",
    paymentMethods: "ACEITAMOS",
    sections: {
      products: "Produtos",
      company: "Empresa",
      legal: "Legal",
    },
    productLinks: {
      all: "Todos os Produtos",
      pens: "Peptide Pens",
      medit: "MediT Pen",
      novadose: "NovaDose",
    },
    companyLinks: {
      about: "Sobre a ORYN",
      science: "Ciência",
      contact: "Contacto",
      quality: "Qualidade",
      whyOryn: "Porquê a ORYN",
      researchHub: "Centro de Investigação",
      calculator: "Calculadora de Peptídeos",
    },
    trustBadges: {
      ssl: "Encriptação SSL",
      secure: "Pagamento Seguro",
      coa: "COA Incluído",
      guarantee: "Pureza Garantida",
    },
    legalLinks: {
      terms: "Termos de Serviço",
      privacy: "Política de Privacidade",
      disclaimer: "Aviso de Investigação",
    },
    seoSections: {
      researchAreas: "Áreas de Investigação",
      learn: "Aprender",
      ukDelivery: "Envio Reino Unido",
      ukRegions: "Regiões do Reino Unido",
      ukCounties: "Condados do Reino Unido",
      peptideEncyclopedia: "Enciclopédia de Peptídeos",
      resources: "Recursos",
      londonDelivery: "Envio para Londres",
      europeanDelivery: "Entrega Europa",
      topEuCities: "Principais Cidades da UE",
    },
    certifications: [
      { label: "ISO CLASS 7", detail: "Sala Limpa" },
      { label: "GMP", detail: "Certificado" },
      { label: ">99%", detail: "Pureza" },
      { label: "EU", detail: "Fabricado" },
    ],
    copyright: "ORYN PEPTIDE LABS — TODOS OS DIREITOS RESERVADOS",
  },

  productCard: {
    purity: "PUREZA >99%",
    pharmaGrade: "GRAU FARMACÊUTICO",
    details: "DETALHES",
    addToCart: "ADICIONAR AO CARRINHO",
  },

  cart: {
    title: "A SUA ENCOMENDA",
    empty: "O seu carrinho está vazio",
    emptySubtext: "Comece a adicionar peptídeos de investigação ao seu carrinho.",
    browseProducts: "VER PRODUTOS",
    continueShopping: "Continuar a Comprar",
    subtotal: "Subtotal",
    checkout: "PAGAMENTO SEGURO",
    researchOnly: "Apenas para fins de investigação",
    itemLabel: "artigo",
    itemsLabel: "artigos",
    freeShippingAway: "Adicione mais {amount} para envio GRATUITO",
    freeShippingUnlocked: "Desbloqueou envio GRATUITO!",
    youMightLike: "PODERÁ TAMBÉM GOSTAR",
    trustSecure: "PAGAMENTO SEGURO",
    trustDiscreet: "ENVIO DISCRETO",
    trustCOA: "COA INCLUÍDO",
    orderSummary: "RESUMO DA ENCOMENDA",
    shipping: "Envio",
    free: "GRATUITO",
    atCheckout: "NO PAGAMENTO",
    estimatedShippingFrom: "A partir de",
    weAccept: "MÉTODOS DE PAGAMENTO ACEITES",
    total: "Total",
    volumeDiscount: "Desconto por volume",
    saveForLater: "Guardar para mais tarde",
    saved: "GUARDADO",
    save: "GUARDAR",
  },

  productsPage: {
    label: "CATÁLOGO",
    title: "Peptídeos de Investigação",
    description:
      "Explore a nossa gama completa de soluções peptídicas de precisão. Cada produto fabricado segundo padrões farmacêuticos com pureza >99%.",
    all: "TODOS",
    results: "produtos",
    searchPlaceholder: "Pesquisar peptídeos...",
    sortBy: "ORDENAR POR",
    sortPriceAsc: "PREÇO: MENOR PARA MAIOR",
    sortPriceDesc: "PREÇO: MAIOR PARA MENOR",
    sortName: "NOME: A-Z",
    noResults: "Não foram encontrados produtos para",
    noCategory: "Não existem produtos nesta categoria",
    clearFilters: "Limpar filtros",
    disclaimer:
      "TODOS OS PRODUTOS ORYN DESTINAM-SE EXCLUSIVAMENTE A INVESTIGAÇÃO E USO LABORATORIAL. NÃO SE DESTINAM A CONSUMO HUMANO.",
  },

  productDetail: {
    notFound: "Produto Não Encontrado",
    backToProducts: "Voltar aos Produtos",
    home: "INÍCIO",
    products: "PRODUTOS",
    perUnit: "por unidade",
    addToCart: "ADICIONAR AO CARRINHO",
    adding: "A ADICIONAR...",
    keyBenefits: "BENEFÍCIOS PRINCIPAIS",
    specifications: "ESPECIFICAÇÕES",
    researchOnlyTitle: "Apenas para Investigação",
    researchOnlyDescription:
      "Este produto destina-se exclusivamente a uso laboratorial e de investigação. Não se destina a consumo humano.",
    relatedProducts: "Produtos Relacionados",
    trustShipping: "ENVIO GRATUITO",
    trustPurity: "PUREZA >99%",
    trustCOA: "COA INCLUÍDO",
    secureCheckout: "PAGAMENTO SEGURO",
    discreetShipping: "ENVIO DISCRETO",
    inStock: "EM STOCK",
    readyToShip: "Pronto a enviar",
    reviews: "avaliações",
    scienceTab: "Ciência",
    readyToExperience: "Pronto para experimentar",
    premiumPenDescription: "Sistema de caneta premium com dosagem totalmente ajustável. Fabrico GMP, pureza >99% garantida.",
    dosingProtocol: "PROTOCOLO DE DOSAGEM",
    howToUse: "Como Usar a Sua Caneta ORYN",
    quickReference: "REFERÊNCIA RÁPIDA",
    recommendedDose: "Dose Recomendada",
    frequency: "Frequência",
    duration: "Duração",
    proTips: "DICAS PRO",
    stepByStep: "INSTRUÇÕES PASSO A PASSO",
    importantLabel: "IMPORTANTE",
    safetyNote: "Utilize sempre uma agulha estéril nova para cada administração. Descarte as agulhas usadas num recipiente apropriado para objetos cortantes. Conserve a caneta refrigerada a 2-8°C.",
    scienceLabel: "CIÊNCIA",
    scienceBehind: "A Ciência Por Trás de",
    compoundProfile: "PERFIL DO COMPOSTO",
    classificationLabel: "CLASSIFICAÇÃO",
    molecularFormula: "FÓRMULA MOLECULAR",
    molecularWeightLabel: "PESO MOLECULAR",
    halfLifeLabel: "MEIA-VIDA",
    sequenceLabel: "SEQUÊNCIA",
    researchAreasLabel: "ÁREAS DE INVESTIGAÇÃO",
    mechanismOfAction: "MECANISMO DE AÇÃO",
    keyResearchFindings: "PRINCIPAIS DESCOBERTAS DE INVESTIGAÇÃO",
    trustedByResearchers: "CONFIANÇA DOS INVESTIGADORES",
    whatLabsSay: "O Que Dizem os Laboratórios Sobre",
    fromVerifiedReviews: "de {count} avaliações verificadas",
    verifiedLabel: "VERIFICADO",
    faqLabel: "FAQ",
    frequentlyAsked: "Perguntas Frequentes Sobre",
    buyInYourCity: "COMPRAR {product} NA SUA CIDADE",
    relatedResearch: "INVESTIGAÇÃO RELACIONADA",
    formulaLabel: "FÓRMULA",
    weightLabel: "PESO",
    add: "ADICIONAR",
    closeCart: "Fechar carrinho",
    decreaseQuantity: "Diminuir quantidade",
    increaseQuantity: "Aumentar quantidade",
    removeItem: "Remover artigo",
    toggleWishlist: "Alternar lista de desejos",
    closeSearch: "Fechar pesquisa",
    closePopup: "Fechar",
    purityBadge: ">99% PUREZA",
    gmpBadge: "GMP CERTIFICADO",
    freeShippingBadge: "ENVIO GRATUITO 150+",
    whyChoosePen: "PORQUÊ ESCOLHER A CANETA",
    traditionalVials: "FRASCOS TRADICIONAIS",
    orynPenSystem: "SISTEMA DE CANETA ORYN",
    vialProblems: [
      { label: "Reconstituição necessária", detail: "Água bacteriostática, seringa, mistura precisa" },
      { label: "Variabilidade de dosagem", detail: "As marcações da seringa podem variar 10-20%" },
      { label: "Risco de contaminação", detail: "Rolha de borracha perfurada múltiplas vezes" },
      { label: "Degradação rápida", detail: "A potência diminui após a reconstituição" },
      { label: "Preparação complexa", detail: "5-10 minutos por preparação" },
      { label: "Viagem impraticável", detail: "Frascos, seringas, água, agulhas..." },
    ],
    comparisonBar: [
      { vial: "5-10 min", pen: "30 seg", label: "Preparação" },
      { vial: "~80%", pen: ">99%", label: "Precisão da Dose" },
      { vial: "Decrescente", pen: "Mantida", label: "Esterilidade" },
      { vial: "7-14 dias", pen: "30 dias", label: "Estabilidade" },
    ],
    compareWith: "COMPARAR COM PRODUTOS SIMILARES",
    sideBy: "Comparar Produtos",
    vsLabel: "OCULTAR",
    keyDifferences: "BENEFÍCIOS PRINCIPAIS",
    bestFor: "benefícios",
    viewProduct: "ADICIONAR",
    comparisonDisclaimer: "PREÇO",
  },

  aboutPage: {
    tagline: "SOBRE A ORYN",
    heroTitle1: "A Ciência Por Trás",
    heroTitle2: "da Precisão",
    heroDescription:
      "A ORYN é um laboratório biotecnológico dedicado a avançar na investigação peptídica através de fabrico de grau farmacêutico, sistemas de administração inovadores e padrões de qualidade intransigentes.",
    brandStatement:
      "Acreditamos que a investigação peptídica merece o mesmo rigor de fabrico que a",
    brandHighlight: "produção farmacêutica.",
    brandParagraphs: [
      "A ORYN nasceu de uma frustração com o mercado de investigação peptídica. Demasiados compostos de pureza incerta, dosagem inconsistente e cadeias de fornecimento opacas. Propusemo-nos a mudar isso.",
      "Os nossos parceiros de fabrico operam salas limpas ISO Classe 7 com certificação GMP. Cada formulação é submetida a análise HPLC e validação independente por terceiros. Fornecemos documentação completa de cada lote porque a transparência não é opcional — é fundamental.",
      "O resultado: peptídeos de grau de investigação nos quais cientistas e laboratórios podem confiar, entregues em sistemas de precisão concebidos para resultados consistentes e fiáveis.",
    ],
    valuesLabel: "OS NOSSOS VALORES",
    valuesTitle: "O Que Nos Move",
    values: [
      {
        title: "Precisão",
        description:
          "Cada medição conta. Da síntese ao enchimento final, controlamos as variáveis ao nível molecular.",
      },
      {
        title: "Pureza",
        description:
          "99% é o nosso mínimo. Validado por terceiros: POSTECH, UNIST e SGS para confiança absoluta.",
      },
      {
        title: "Inovação",
        description:
          "Três plataformas de administração únicas projetadas para estabilidade ótima, precisão de dosagem e experiência de utilização.",
      },
      {
        title: "Transparência",
        description:
          "Documentação completa de cada lote, COA para cada produto e rastreabilidade total da cadeia de fornecimento.",
      },
    ],
    journeyLabel: "O NOSSO PERCURSO",
    journeyTitle: "A Construir",
    timeline: [
      {
        year: "Fundação",
        title: "Precisão Desde o Primeiro Dia",
        description:
          "A ORYN foi fundada com uma visão singular: levar a investigação peptídica de grau farmacêutico aos laboratórios europeus com padrões de qualidade intransigentes.",
      },
      {
        year: "Fabrico",
        title: "Parceria Biotecnológica Coreana",
        description:
          "Parceria estratégica com instalações de fabrico certificadas ISO Classe 7 em Eumseong e Osan, Coreia. Capacidade de 100.000 unidades por mês.",
      },
      {
        year: "Inovação",
        title: "Sistemas de Administração Avançados",
        description:
          "Desenvolvimento de três plataformas de administração proprietárias: Peptide Pen multidose, MediT Pen pré-carregada e o sistema de cartuchos NovaDose.",
      },
      {
        year: "Hoje",
        title: "10 Peptídeos de Investigação",
        description:
          "Catálogo completo de peptídeos de grau de investigação que abrange cicatrização, metabolismo, anti-envelhecimento e investigação de hormona de crescimento com distribuição global.",
      },
    ],
    manufacturingLabel: "FABRICO",
    manufacturingTitle: "Especificações de Produção",
    manufacturingSpecs: [
      { value: "ISO 7", label: "Classe Sala Limpa", sub: "Certificado" },
      { value: "GMP", label: "Fabrico", sub: "Certificado" },
      { value: "100K", label: "Capacidade Mensal", sub: "Unidades/Mês" },
      { value: "24m", label: "Prazo de Validade", sub: "Estabilidade Testada" },
      { value: "0,22um", label: "Esterilização", sub: "Filtração" },
      { value: "SGS", label: "Validação", sub: "Terceiros" },
      { value: "6,8-7,4", label: "Intervalo pH", sub: "Otimizado" },
      { value: "PEG", label: "Viscosidade", sub: "Agente" },
    ],
  },

  sciencePage: {
    tagline: "CIÊNCIA",
    heroTitle1: "Biblioteca de",
    heroTitle2: "Investigação Peptídica",
    heroDescription:
      "Compreender os mecanismos moleculares por trás de cada produto ORYN. Esta biblioteca apresenta uma visão científica geral do nosso catálogo de peptídeos de investigação e das respetivas áreas de estudo.",
    processLabel: "PROCESSO",
    processTitle1: "Da Síntese à",
    processTitle2: "Entrega",
    processDescription:
      "Um pipeline de fabrico farmacêutico de seis etapas que garante consistência, pureza e estabilidade em cada produto.",
    processSteps: [
      { step: "01", label: "Matéria-Prima", time: "2 Semanas" },
      { step: "02", label: "Síntese", time: "8 Dias" },
      { step: "03", label: "Purificação", time: "HPLC" },
      { step: "04", label: "Formulação", time: "pH 6,8-7,4" },
      { step: "05", label: "Enchimento e Selagem", time: "2 Semanas" },
      { step: "06", label: "Esterilizar e CQ", time: "1 Semana" },
    ],
    libraryLabel: "BIBLIOTECA",
    libraryTitle1: "Perfis de",
    libraryTitle2: "Compostos Peptídicos",
    classification: "CLASSIFICAÇÃO",
    mechanism: "MECANISMO",
    researchAreas: "ÁREAS DE INVESTIGAÇÃO",
    specsLabel: "ESPECIFICAÇÕES",
    specsTitle: "Parâmetros de Qualidade Universais",
    specsItems: [
      { value: ">99%", label: "Pureza (HPLC)" },
      { value: "6,8-7,4", label: "Intervalo pH" },
      { value: "0,22um", label: "Filtração Estéril" },
      { value: "3 mL", label: "Volume de Enchimento" },
      { value: "PEG", label: "Agente de Viscosidade" },
      { value: "30 Dias", label: "Período de Dosagem" },
      { value: "24 m", label: "Prazo de Validade" },
      { value: "2-8°C", label: "Temp. Armazenamento" },
    ],
  },

  contactPage: {
    tagline: "CONTACTO",
    heroTitle: "Entre em Contacto",
    heroDescription:
      "Para encomendas por grosso, parcerias de investigação ou questões sobre produtos. A nossa equipa responde em 24 horas.",
    companyName: "ORYN Peptide Labs",
    emailLabel: "EMAIL",
    wholesaleLabel: "GROSSISTA",
    locationLabel: "LOCALIZAÇÃO",
    locationLine1: "Operações Europeias",
    locationLine2: "Investigação e Distribuição",
    infoBoxes: [
      {
        title: "Encomendas por Grosso",
        description:
          "MOQ: 1.000 por SKU. Marca OEM completa disponível. Pagamento: 50% adiantado / 50% antes do envio. Apoio de envio DDP disponível.",
      },
      {
        title: "Parcerias de Investigação",
        description:
          "Apoiamos programas de investigação académica e institucional com formulações personalizadas, preços por volume e fabrico prioritário.",
      },
      {
        title: "Documentação",
        description:
          "COA, dados de estabilidade, documentação DMF e materiais de marketing disponíveis para todos os produtos ORYN mediante pedido.",
      },
    ],
    formTitle: "Envie-nos uma mensagem",
    formDescription:
      "Preencha o formulário e a nossa equipa responder-lhe-á brevemente.",
    firstName: "PRIMEIRO NOME",
    lastName: "APELIDO",
    email: "EMAIL",
    organization: "ORGANIZAÇÃO",
    inquiryType: "TIPO DE PEDIDO",
    inquiryOptions: [
      "Questão sobre Produto",
      "Encomenda por Grosso",
      "Parceria de Investigação",
      "Formulação Personalizada",
      "Pedido de Documentação",
      "Outro",
    ],
    message: "MENSAGEM",
    messagePlaceholder: "Fale-nos sobre as suas necessidades de investigação...",
    sendMessage: "ENVIAR MENSAGEM",
    messageSent: "Mensagem Enviada",
    messageSentDescription: "Responderemos em 24 horas.",
  },

  checkoutPage: {
    emptyCart: "O seu carrinho está vazio",
    emptyCartDescription: "Adicione produtos antes de prosseguir para o pagamento.",
    browseProducts: "Ver Produtos",
    steps: ["Informação", "Envio", "Pagamento"],
    shippingTitle: "Informação de Envio",
    firstName: "PRIMEIRO NOME",
    lastName: "APELIDO",
    email: "EMAIL",
    phone: "TELEFONE",
    address: "MORADA",
    city: "Cidade",
    postalCode: "Código Postal",
    country: "País",
    referralCode: "CÓDIGO DE REFERÊNCIA",
    referralCodePlaceholder: "Introduza o código de referência",
    referralCodeHint: "Tem um código de referência? Introduza-o para rastreio.",
    continueToPayment: "CONTINUAR PARA O PAGAMENTO",
    paymentTitle: "Pagamento",
    cardPayment: "Pagamento com Cartão",
    cryptoPayment: "Pagamento com Crypto",
    cardNumber: "NÚMERO DO CARTÃO",
    expiry: "VALIDADE",
    cvc: "CVC",
    selectCrypto: "SELECIONAR CRIPTOMOEDA",
    amountToPay: "MONTANTE A PAGAR",
    discountApplied: "(5% de desconto aplicado)",
    sendToAddress: "ENVIAR PARA ENDEREÇO",
    copy: "COPIAR",
    copied: "COPIADO",
    timeRemaining: "TEMPO RESTANTE",
    sendBeforeExpiry: "Envie o pagamento antes de o temporizador expirar",
    sentPayment: "JÁ ENVIEI O PAGAMENTO",
    txHash: "HASH DA TRANSAÇÃO",
    txHashPlaceholder: "Introduza o hash da transação",
    sessionExpired: "SESSÃO DE PAGAMENTO EXPIRADA",
    restartSession: "REINICIAR SESSÃO",
    back: "Voltar",
    placeOrder: "CONFIRMAR ENCOMENDA",
    processing: "A PROCESSAR...",
    orderSummary: "RESUMO DA ENCOMENDA",
    qty: "Qtd",
    subtotal: "Subtotal",
    cryptoDiscount: "Desconto Crypto (5%)",
    shipping: "Envio",
    shippingNote: "CALCULADO NO PASSO SEGUINTE",
    referral: "Referência",
    total: "Total",
    researchOnly: "Apenas para fins de investigação",
    orderConfirmed: "Encomenda Confirmada",
    orderConfirmedDescription:
      "Obrigado pela sua encomenda. Foi enviado um email de confirmação com os detalhes da encomenda e informação de rastreio.",
    paymentVerifying: "PAGAMENTO EM VERIFICAÇÃO",
    paymentVerifyingDescription:
      "O seu pagamento em criptomoeda está a ser confirmado na blockchain. Este processo pode demorar até 30 minutos.",
    paymentConfirmed: "PAGAMENTO CONFIRMADO",
    referralApplied: "CÓDIGO DE REFERÊNCIA APLICADO",
    continueShopping: "Continuar a Comprar",
    secureCheckout: "PAGAMENTO SEGURO",
    orderRef: "REF. ENCOMENDA",
    contactShipping: "Informação de contacto e envio",
    change: "Alterar",
    emailPlaceholder: "o.seu@email.com",
    shippingAddress: "MORADA DE ENVIO",
    useSavedAddress: "USAR MORADA GUARDADA",
    selectCountry: "Selecionar país...",
    firstNamePlaceholder: "Primeiro nome",
    lastNamePlaceholder: "Apelido",
    addressPlaceholder: "Morada",
    apartmentPlaceholder: "Apartamento, andar, etc. (opcional)",
    cityPlaceholder: "Cidade",
    postalCodePlaceholder: "Código postal",
    phonePlaceholder: "Telefone (opcional)",
    continueToShipping: "CONTINUAR PARA O ENVIO",
    shippingMethod: "Método de envio",
    loadingShipping: "A carregar opções de envio...",
    freeShippingApplied: "ENVIO GRATUITO APLICADO!",
    freeShippingLabel: "ENVIO GRATUITO (ENCOMENDA +€{threshold})",
    freeStandardShipping: "Envio standard gratuito",
    returnToInformation: "← Voltar à informação",
    returnToShipping: "← Voltar ao envio",
    contact: "CONTACTO",
    shipTo: "ENVIAR PARA",
    method: "MÉTODO",
    free: "Gratuito",
    required: "Obrigatório",
    validEmailRequired: "Email válido obrigatório",
    invalidCode: "Código inválido",
    failedToValidate: "Falha na validação",
    hideOrderSummary: "Ocultar resumo",
    showOrderSummary: "Mostrar resumo",
    discount: "Desconto",
    volumeDiscountLabel: "Desc. volume",
    calculatedNextStep: "Calculado no passo seguinte",
    selectCountryForShipping: "Selecione o país para estimar",
    securePayment: "PAGAMENTO SEGURO",
    discreetShipping: "ENVIO DISCRETO",
    coaIncluded: "COA INCLUÍDO",
    gmpCertified: "CERTIFICAÇÃO GMP",
    allSecure: "TODAS AS TRANSAÇÕES SÃO SEGURAS E ENCRIPTADAS",
    backendRequired: "BACKEND NECESSÁRIO",
    backendDescription: "O backend Medusa é necessário para processar pagamentos.",
    promoCodePlaceholder: "Código de desconto",
    apply: "APLICAR",
    referralPlaceholder: "Código de referência (opcional)",
    sslEncrypted: "SSL Encriptado",
    purity99: "Pureza >99%",
    guaranteed: "Garantido",
    gmpCertifiedBadge: "Certificação GMP",
    guarantee30: "Garantia 30 Dias",
    noQuestions: "Sem questões",
    emailHint: "Não precisa de conta. A sua encomenda será associada a este email.",
    verifyingPayment: "A verificar pagamento...",
    paymentFailed: "Pagamento Falhado",
    paymentFailedDescription: "Não foi possível processar o seu pagamento. Tente novamente ou utilize outro método de pagamento.",
    tryAgain: "Tentar Novamente",
    whatHappensNext: "O QUE ACONTECE A SEGUIR",
    nextSteps: [
      "Email de confirmação enviado para a sua caixa de entrada",
      "A sua encomenda está a ser preparada e verificada",
      "Enviada com rastreio — normalmente no próximo dia útil",
    ],
    viewOrders: "VER ENCOMENDAS",
    referralTitle: "Partilhe a ORYN e ganhe 10% de comissão",
    referralDescription: "Gosta dos nossos produtos? Partilhe o seu link de referência e ganhe 10% em cada compra.",
    getReferralLink: "OBTER O SEU LINK DE REFERÊNCIA →",
  },

  products: {
    "bpc-157": {
      subtitle: "Cicatrização e Recuperação",
      categoryLabel: "Peptide Pen",
      description:
        "O Body Protection Compound-157 é um peptídeo sintético derivado de uma proteína natural do suco gástrico. O ORYN BPC-157 é formulado com grau farmacêutico num sistema de caneta de dosagem precisa para uma administração consistente e fiável durante 30 dias.",
      benefits: [
        "Apoia a cicatrização e recuperação de tecidos",
        "Promove a saúde e integridade intestinal",
        "Apoia a reparação de tendões e ligamentos",
        "Propriedades anti-inflamatórias",
        "Potencial neuroprotetor",
      ],
      badge: "Mais Vendido",
    },
    "tb-500": {
      subtitle: "Reparação Tecidular",
      categoryLabel: "Peptide Pen",
      description:
        "O fragmento de Timosina Beta-4, TB-500, desempenha um papel crucial na reparação e regeneração de tecidos. O ORYN TB-500 fornece uma dose precisa de 15mg no nosso sistema avançado de caneta, projetado para biodisponibilidade ótima e resultados consistentes.",
      benefits: [
        "Acelera a cicatrização de feridas",
        "Reduz a inflamação",
        "Promove a reparação do tecido muscular",
        "Apoia a saúde cardiovascular",
        "Melhora a flexibilidade e mobilidade",
      ],
    },
    "cjc-1295": {
      subtitle: "Estimulação GH",
      categoryLabel: "Peptide Pen",
      description:
        "O CJC-1295 é um análogo sintético da hormona libertadora de hormona de crescimento (GHRH). O ORYN CJC-1295 proporciona elevação sustentada de GH através do nosso sistema de dosagem de precisão, fabricado segundo os mais elevados padrões farmacêuticos.",
      benefits: [
        "Estimula a libertação de hormona de crescimento",
        "Apoia a composição corporal magra",
        "Promove o sono profundo reparador",
        "Melhora a recuperação entre sessões",
        "Apoia a função metabólica",
      ],
    },
    ipamorelin: {
      subtitle: "Estimulação GH",
      categoryLabel: "Peptide Pen",
      description:
        "O Ipamorelin é um secretagogo seletivo de hormona de crescimento que estimula a glândula pituitária. O ORYN Ipamorelin oferece libertação dirigida de GH sem a perturbação hormonal mais ampla observada em compostos menos seletivos.",
      benefits: [
        "Libertação seletiva de GH",
        "Perfil mínimo de efeitos secundários",
        "Apoia a densidade óssea",
        "Promove o tecido magro",
        "Melhora a qualidade do sono",
      ],
    },
    "tirzepatide-pen": {
      subtitle: "Metabólico",
      categoryLabel: "Peptide Pen",
      description:
        "O Tirzepatide é um agonista duplo do recetor GIP/GLP-1 que representa a vanguarda da ciência peptídica metabólica. O sistema de caneta ORYN Tirzepatide oferece dosagem de precisão para aplicações de investigação metabólica.",
      benefits: [
        "Ação dupla em recetores hormonais",
        "Apoia a função metabólica",
        "Gestão do açúcar no sangue",
        "Regulação do apetite",
        "Composto clinicamente estudado",
      ],
      badge: "Popular",
    },
    "ghk-cu": {
      subtitle: "Reparação Cutânea",
      categoryLabel: "Peptide Pen",
      description:
        "O GHK-Cu (peptídeo de cobre) é um tripeptídeo natural com alta afinidade para iões de cobre. O ORYN GHK-CU apoia a remodelação e reparação cutânea com uma formulação potente de 60mg.",
      benefits: [
        "Promove a síntese de colagénio",
        "Apoia a elasticidade da pele",
        "Propriedades antioxidantes",
        "Apoio à cicatrização",
        "Aplicações de investigação anti-envelhecimento",
      ],
    },
    glutathione: {
      subtitle: "Antioxidante",
      categoryLabel: "Peptide Pen",
      description:
        "A Glutationa é o principal antioxidante do corpo, essencial para a desintoxicação celular e a função imunitária. O ORYN Glutathione fornece uma dose potente de 6g através do nosso sistema de caneta de precisão para máxima biodisponibilidade.",
      benefits: [
        "Defesa antioxidante principal",
        "Desintoxicação celular",
        "Apoio ao sistema imunitário",
        "Propriedades de luminosidade da pele",
        "Apoio à função hepática",
      ],
    },
    "nad-plus": {
      subtitle: "Metabólico e Anti-Envelhecimento",
      categoryLabel: "Peptide Pen",
      description:
        "A Nicotinamida Adenina Dinucleótido (NAD+) é uma coenzima essencial presente em todas as células. A caneta ORYN NAD+ fornece uma dose concentrada de 500mg para apoiar a produção de energia celular, a reparação do ADN e o envelhecimento saudável.",
      benefits: [
        "Produção de energia celular",
        "Apoio à reparação do ADN",
        "Investigação do envelhecimento saudável",
        "Apoio à função cognitiva",
        "Eficiência metabólica",
      ],
      badge: "Premium",
    },
    "medit-tirzepatide": {
      subtitle: "Tirzepatide 40mg — Gestão de Peso",
      categoryLabel: "MediT Pen",
      description:
        "A ORYN MediT Pen é uma caneta de injeção pré-carregada de uso único contendo 40mg de Tirzepatide. Concebida para administração semanal, combina ação hormonal dupla GIP/GLP-1 para apoio metabólico completo.",
      benefits: [
        "Ação hormonal dupla (GIP + GLP-1)",
        "Comodidade semanal",
        "Eficácia clinicamente comprovada",
        "Controlo do apetite e aumento da saciedade",
        "Gestão do açúcar no sangue",
        "Apoia a gestão de peso a longo prazo",
        "Pode reduzir o risco de doenças associadas à obesidade",
      ],
      badge: "Novo",
    },
    "novadose-nad": {
      subtitle: "Juventude nas Suas Mãos",
      categoryLabel: "Sistema NovaDose",
      description:
        "O NovaDose fornece NAD+ de grau farmacêutico através de um inovador sistema de caneta baseado em cartuchos. Concebido para microdosagem diária precisa, apoia a energia celular, a eficiência metabólica e a reparação natural. Mais acessível e sustentável do que a terapia IV.",
      benefits: [
        "NAD+ de grau farmacêutico da Coreia",
        "Microdosagem diária precisa",
        "Biodisponibilidade próxima de 100%",
        "Apoia a energia celular e a clareza mental",
        "Melhora o humor e o desempenho físico",
        "Mais económico do que a terapia IV",
        "Fabrico certificado GMP",
      ],
      badge: "Inovação",
    },
  },

  categoryNames: {
    "peptide-pen": "Sistema Peptide Pen",
    "medit-pen": "MediT Pen",
    novadose: "Sistema NovaDose",
  },

  categoryDescriptions: {
    "peptide-pen":
      "Canetas reutilizáveis multidose com dosagem de precisão de 30 dias. 8 peptídeos de investigação disponíveis.",
    "medit-pen":
      "Caneta de injeção semanal pré-carregada de uso único. Tirzepatide 40mg para investigação metabólica.",
    novadose:
      "Sistema avançado de administração NAD+ por cartuchos para microdosagem diária de precisão.",
  },

  researchCategories: {
    recovery: "Recuperação e Cura",
    "weight-loss": "Perda de Peso",
    "anti-aging": "Anti-Envelhecimento",
    "muscle-growth": "Crescimento Muscular",
    "skin-rejuvenation": "Rejuvenescimento da Pele",
    "sleep-quality": "Sono e Recuperação",
    "gut-health": "Saúde Intestinal",
    "joint-health": "Articulações e Tendões",
    "hair-growth": "Crescimento Capilar",
    "immune-support": "Suporte Imunitário",
    "tendon-repair": "Reparação de Tendões",
    "sports-recovery": "Recuperação Desportiva",
    "post-surgery": "Pós-Cirurgia",
    "cognitive-enhancement": "Melhoria Cognitiva",
    "energy-vitality": "Energia e Vitalidade",
    "detox-cleanse": "Detox e Purificação",
    "body-composition": "Composição Corporal",
    inflammation: "Inflamação e Dor",
    "hormonal-balance": "Equilíbrio Hormonal",
    "longevity-biohacking": "Longevidade e Biohacking",
  },

  breadcrumbs: {
    home: "Início",
    products: "Produtos",
    about: "Sobre Nós",
    science: "Ciência",
    contact: "Contacto",
    learn: "Aprender",
    quality: "Qualidade",
    faq: "FAQ",
    compare: "Comparar",
    shipping: "Envio",
    whyOryn: "Porquê ORYN",
    terms: "Termos",
    privacy: "Privacidade",
    disclaimer: "Aviso Legal",
    cart: "Carrinho",
    checkout: "Pagamento",
    account: "Conta",
    orders: "Encomendas",
    referrals: "Referências",
    wishlist: "Lista de Desejos",
    profile: "Perfil",
    wholesale: "Grossista",
    bundles: "Packs",
    protocols: "Protocolos",
    peptides: "Péptidos",
    peptidePens: "Canetas de Péptidos",
    europe: "Europa",
    glossary: "Glossário",
    london: "Londres",
    encyclopedia: "Enciclopédia",
    ukPeptideDelivery: "Entrega de Péptidos no Reino Unido",
    tools: "Ferramentas",
    peptideCalculator: "Calculadora de Péptidos",
  },

  homeSeo: {
    deliveryTitle: "ENTREGA DE PÉPTIDOS EM TODA A EUROPA",
    researchAreaTitle: "PÉPTIDOS POR ÁREA DE INVESTIGAÇÃO",
    researchHubTitle: "CENTRO DE INVESTIGAÇÃO",
    peptidesFor: "Péptidos para",
  },

  testimonials: {
    label: "CONFIANÇA DOS INVESTIGADORES",
    titleLine1: "O Que Dizem",
    titleLine2: "os Nossos Clientes",
    items: [
      {
        quote: "A pureza e consistência dos peptídeos ORYN é incomparável. O sistema de caneta torna a dosagem incrivelmente precisa e fiável para os nossos protocolos laboratoriais.",
        name: "Dr. M. Richter",
        role: "Diretor de Investigação, Munique",
      },
      {
        quote: "Mudámos para a ORYN há seis meses. A documentação COA, a rastreabilidade de lotes e a certificação GMP dão-nos total confiança em cada encomenda.",
        name: "Dr. S. Lindberg",
        role: "Investigador Clínico, Estocolmo",
      },
      {
        quote: "Qualidade de produto excecional e envio rápido na UE. O sistema NovaDose é revolucionário para a nossa investigação NAD+. Altamente recomendado para qualquer laboratório sério.",
        name: "Prof. J. Torres",
        role: "Diretor de Lab. Biotech, Barcelona",
      },
    ],
    stats: [
      { value: "2.400+", label: "ENCOMENDAS ENVIADAS" },
      { value: "98%", label: "TAXA DE RECOMPRA" },
      { value: "4.9/5", label: "SATISFAÇÃO" },
      { value: "24h", label: "TEMPO DE RESPOSTA" },
    ],
  },

  localeSwitcher: {
    label: "Mercado",
    uk: "UK (€)",
    eu: "UE (€)",
  },

  wishlistPage: {
    title: "Lista de Desejos",
    breadcrumb: "LISTA DE DESEJOS",
    empty: "A sua lista de desejos está vazia",
    emptyTitle: "Sem artigos guardados",
    emptyDescription: "Explore os nossos produtos e clique no ícone de coração para guardar artigos.",
    browseProducts: "VER PRODUTOS",
    itemsSaved: "artigos guardados",
    itemSaved: "artigo guardado",
  },

  faq: {
    title: "Perguntas Frequentes",
    label: "FAQ",
  },

  contactFaq: {
    title: "ANTES DE NOS CONTACTAR",
    items: [
      { q: "Quanto tempo demora a entrega?", a: "Encomendas em Portugal: 3-5 dias úteis. Europa: 3-7 dias úteis. Todas as encomendas são enviadas em embalagem discreta e com temperatura controlada." },
      { q: "Posso rastrear a minha encomenda?", a: "Sim! Assim que expedida, receberá um número de rastreio por email. Pode também rastrear encomendas no painel da sua conta." },
      { q: "Qual é a vossa política de devoluções?", a: "Oferecemos garantia de devolução de 30 dias em produtos por abrir. Contacte info@orynlabs.com para iniciar uma devolução." },
      { q: "Oferecem preços por grosso?", a: "Sim, contacte wholesale@orynlabs.com para preços por volume. Oferecemos descontos escalonados para instituições de investigação e revendedores." },
    ],
  },

  homeFaq: {
    items: [
      { q: "O que são as ORYN Peptide Pens?", a: "As ORYN Peptide Pens são sistemas de administração de peptídeos de investigação pré-misturados e prontos a usar. Cada caneta contém peptídeos de grau farmacêutico com >99% de pureza, fabricados nas nossas instalações de sala limpa ISO 7. O formato de caneta elimina a necessidade de reconstituição, assegurando uma dosagem consistente para aplicações de investigação." },
      { q: "Os peptídeos são legais em Portugal e na Europa?", a: "Sim, os peptídeos de investigação são legais para compra em Portugal e em toda a Europa para fins de investigação. Os peptídeos ORYN são vendidos estritamente para investigação in-vitro e uso laboratorial. Não se destinam a consumo humano." },
      { q: "Como são fabricados os vossos peptídeos?", a: "Todos os peptídeos ORYN são sintetizados no nosso laboratório de sala limpa ISO 7 certificado GMP na Coreia do Sul. Cada lote é submetido a rigorosas análises de HPLC e espectrometria de massa para verificar >99% de pureza. É incluído um Certificado de Análise (COA) em cada encomenda." },
      { q: "Quanto tempo demora a entrega?", a: "As encomendas em Portugal chegam normalmente em 3-5 dias úteis. Encomendas europeias demoram 3-7 dias úteis conforme o destino. Todas as encomendas são enviadas em embalagem discreta e com temperatura controlada. Encomendas superiores a 150€ têm envio gratuito." },
      { q: "O que é o Programa de Referências ORYN?", a: "O nosso programa de referências multinível permite-lhe ganhar 10% de comissão nas compras feitas por colegas que referir. Também ganha comissões até 5 níveis de profundidade à medida que a sua rede cresce. Registe-se gratuitamente para obter o seu código de referência único." },
      { q: "Oferecem preços por volume ou por grosso?", a: "Sim, oferecemos descontos por volume a partir de 3+ unidades. Quanto mais encomendar, maior o desconto — até 15% de desconto para encomendas de investigação de grande volume. Contacte-nos para preços por grosso personalizados." },
    ],
  },

  shippingFaq: {
    items: [
      { q: "Quanto tempo demora a entrega de péptidos em Portugal?", a: "Os tempos de entrega em Portugal dependem da sua localização. Lisboa e Porto recebem encomendas em 1-2 dias úteis, outras cidades principais em 2-3 dias úteis, e zonas rurais ou ilhas em 3-5 dias úteis. Todas as encomendas efectuadas antes das 14h são despachadas no mesmo dia." },
      { q: "O envio de péptidos é controlado por temperatura?", a: "Sim. Todas as remessas de péptidos ORYN são embaladas em caixas isoladas com acumuladores de frio em gel para manter uma temperatura de 2-8 graus Celsius durante o transporte. Nos meses de verão (junho-setembro), adicionamos protecção extra da cadeia de frio com acumuladores adicionais e forros isolantes para garantir a integridade do produto." },
      { q: "Como me qualifico para envio gratuito?", a: "O envio padrão gratuito está disponível em todas as encomendas superiores a 150 euros. Este limiar aplica-se ao subtotal da encomenda antes de quaisquer códigos de desconto. As encomendas internacionais para a Europa estão sujeitas a uma taxa de envio fixa independentemente do valor da encomenda. O seu carrinho mostrará uma barra de progresso indicando o quanto falta para atingir o limiar de envio gratuito." },
      { q: "Fazem envios internacionais de péptidos para a Europa?", a: "Sim, a ORYN envia para a maioria dos países da União Europeia. A entrega europeia demora normalmente 3-7 dias úteis conforme o país de destino. Todas as remessas internacionais incluem embalagem com temperatura controlada e rastreio completo. Direitos aduaneiros e impostos de importação são da responsabilidade do cliente." },
      { q: "Como é embalada a minha encomenda de péptidos?", a: "Todas as encomendas ORYN são enviadas em caixas simples e sem marcas, sem descrições de produtos ou marcas visíveis no exterior. No interior, as canetas de péptidos estão fixadas em inserções de espuma personalizadas dentro de um contentor isolado com acumuladores de gel. Uma guia de remessa e o Certificado de Análise estão incluídos dentro da caixa." },
      { q: "Posso rastrear a minha encomenda de péptidos?", a: "Sim. Todas as encomendas recebem um número de rastreio por email até 2 horas após o despacho. Pode rastrear a sua remessa em tempo real através do portal do nosso parceiro de correio. Para encomendas por grosso de 10+ unidades, fornecemos rastreio aprimorado com janelas de entrega estimadas e confirmação de entrega com assinatura." },
    ],
  },

  qualityFaq: {
    items: [
      { q: "O que é um Certificado de Análise (COA)?", a: "Um Certificado de Análise é um documento emitido por um laboratório de ensaio qualificado que confirma a identidade, pureza e composição de um produto peptídico. Cada COA da ORYN inclui dados de pureza por HPLC, confirmação de identidade por espectrometria de massa, resultados de testes de endotoxinas, verificação de esterilidade e detalhes de fabrico específicos do lote." },
      { q: "Como leio um resultado de pureza HPLC?", a: "Os resultados de HPLC (Cromatografia Líquida de Alta Eficiência) mostram um cromatograma com picos representando diferentes componentes. A percentagem da área do pico principal indica a pureza — por exemplo, 99,2% significa que 99,2% do material detectado é o péptido alvo. Todos os péptidos ORYN atingem consistentemente mais de 98% de pureza, com a maioria dos lotes a exceder 99%." },
      { q: "Quem realiza os vossos testes por terceiros?", a: "Os péptidos ORYN são analisados por laboratórios analíticos independentes acreditados com ISO 17025. Estes laboratórios operam independentemente das nossas instalações de fabrico, garantindo verificação imparcial de pureza, identidade e esterilidade para cada lote que produzimos." },
      { q: "Com que frequência são testados os péptidos ORYN?", a: "Cada lote de cada produto ORYN é testado antes do lançamento. Operamos um protocolo rigoroso de libertação por lote: nenhum produto sai das nossas instalações sem um Certificado de Análise aprovado por um laboratório independente. Os testes incluem análise de pureza por HPLC, confirmação de identidade por espectrometria de massa, rastreio de endotoxinas e verificação de esterilidade." },
      { q: "Que padrões de pureza os péptidos ORYN cumprem?", a: "Todos os péptidos ORYN são fabricados para exceder 98% de pureza, com a maioria dos lotes a atingir mais de 99%. Isto é verificado por testes HPLC independentes e confirmado por espectrometria de massa. As nossas instalações de fabrico são certificadas GMP e operam sob sistemas de gestão de qualidade ISO 9001 em ambientes de sala limpa ISO 7." },
      { q: "Posso solicitar um COA para o meu lote específico?", a: "Sim. Cada produto ORYN é enviado com um número de lote impresso na embalagem. Pode solicitar o COA específico para o seu lote contactando a nossa equipa de apoio em info@orynpeptides.com com o seu número de lote. Mantemos registos completos de rastreabilidade para cada lote fabricado." },
    ],
  },

  wholesaleFaq: {
    items: [
      { q: "Qual é a quantidade mínima de encomenda para preços por grosso?", a: "Os nossos níveis de preços por grosso começam em apenas 3 unidades. Encomendas de 3-5 unidades recebem 5% de desconto, 6-9 unidades recebem 10% de desconto, e 10 ou mais unidades recebem 15% de desconto sobre o preço de retalho. Para encomendas de 50+ unidades, oferecemos orçamentos personalizados adaptados às suas necessidades específicas." },
      { q: "Como funcionam os preços por grosso na ORYN?", a: "Os preços por grosso da ORYN baseiam-se em níveis de desconto por volume aplicados aos nossos preços de retalho padrão. Os descontos são calculados automaticamente no checkout para encomendas elegíveis. Pode combinar qualquer produto das nossas gamas Peptide Pen, MediT Pen e NovaDose para atingir o seu nível. Para acordos de fornecimento contínuos, contacte a nossa equipa de grosso." },
      { q: "Como configuro uma conta por grosso?", a: "Configurar uma conta por grosso é simples. Contacte a nossa equipa em info@orynpeptides.com ou utilize o formulário de consulta de grosso na nossa página de contacto. Verificaremos os detalhes da sua organização, atribuiremos um gestor de conta dedicado e activaremos os preços por volume na sua conta dentro de 1-2 dias úteis." },
      { q: "Que condições de pagamento estão disponíveis para clientes por grosso?", a: "As encomendas por grosso padrão são pagáveis por transferência bancária, cartão de crédito ou ordem de compra (para contas aprovadas). Oferecemos condições de pagamento NET-30 para clientes por grosso estabelecidos com histórico comercial verificado. Todas as primeiras encomendas são pré-pagas. Contacte a nossa equipa para discutir condições de pagamento para contratos de grande volume." },
      { q: "Quais são os tempos de entrega para encomendas a granel de péptidos?", a: "As encomendas por grosso são enviadas dentro de 1-2 dias úteis a partir do nosso centro de distribuição. A entrega padrão demora 2-4 dias úteis. Para encomendas grandes (50+ unidades), podemos precisar de até 5 dias úteis para preparação. Todas as remessas por grosso incluem embalagem com temperatura controlada sem custo adicional, com rastreio completo fornecido." },
    ],
  },

  account: {
    nav: {
      dashboard: "Painel",
      orders: "Encomendas",
      referrals: "Referências",
      wishlist: "Favoritos",
      profile: "Perfil",
      signOut: "Terminar Sessão",
    },
    dashboard: {
      welcome: "Bem-vindo/a,",
      subtitle: "Gerir as suas encomendas, rastrear envios e atualizar os dados da sua conta.",
      yourOrders: "As Suas Encomendas",
      yourOrdersDesc: "Ver histórico de encomendas e rastrear envios",
      profileSettings: "Definições do Perfil",
      profileSettingsDesc: "Atualizar a sua informação pessoal",
      shopPeptides: "Comprar Peptídeos",
      shopPeptidesDesc: "Explorar o nosso catálogo de grau de investigação",
      orynRewards: "ORYN Rewards",
      earnPoints: "Ganhe 1 ponto por cada 1€ gasto",
      points: "PONTOS",
      tier: "NÍVEL",
      member: "Membro",
      nextReward: "PRÓXIMA RECOMPENSA",
      nextRewardValue: "€10 desc. aos 500pts",
      multiplier: "MULTIPLICADOR",
      multiplierValue: "1x",
      inviteEarn: "Convide e Ganhe",
      viewDashboard: "VER PAINEL",
      inviteDescription: "Ganhe 10% de comissão quando os seus colegas encomendam com o seu código. Além disso, comissões até 5 níveis de profundidade.",
      copyCode: "COPIAR CÓDIGO",
      copyLink: "COPIAR LINK",
      share: "PARTILHAR:",
      accountBenefits: "BENEFÍCIOS DA CONTA",
      benefits: [
        { title: "Rastreio de Encomendas", desc: "Atualizações em tempo real de todos os seus envios" },
        { title: "Histórico de Encomendas", desc: "Histórico completo com opção de reencomenda" },
        { title: "Ganhos por Referências", desc: "Ganhe comissões por referências" },
        { title: "Suporte Prioritário", desc: "Titulares de conta recebem respostas mais rápidas" },
      ],
    },
    login: {
      title: "Bem-vindo/a",
      subtitle: "Inicie sessão na sua conta ORYN",
      email: "EMAIL",
      password: "PALAVRA-PASSE",
      emailPlaceholder: "o.seu@email.com",
      passwordPlaceholder: "Introduza a sua palavra-passe",
      signingIn: "A INICIAR SESSÃO...",
      signIn: "INICIAR SESSÃO",
      noAccount: "Não tem conta?",
      createOne: "Crie uma",
      continueWithout: "Continuar a comprar sem conta",
      loginFailed: "Falha ao iniciar sessão",
    },
    register: {
      title: "Criar Conta",
      subtitle: "Junte-se à ORYN para rastreio de encomendas, ofertas exclusivas e mais",
      firstName: "PRIMEIRO NOME *",
      lastName: "APELIDO *",
      email: "EMAIL *",
      emailPlaceholder: "o.seu@email.com",
      password: "PALAVRA-PASSE *",
      passwordPlaceholder: "Mínimo 8 caracteres",
      confirmPassword: "CONFIRMAR PALAVRA-PASSE *",
      organization: "ORGANIZAÇÃO",
      organizationPlaceholder: "Laboratório, universidade, empresa...",
      referralCode: "CÓDIGO DE REFERÊNCIA",
      referralCodePlaceholder: "Opcional",
      creating: "A CRIAR CONTA...",
      createAccount: "CRIAR CONTA",
      termsPrefix: "Ao criar uma conta, concorda com os",
      termsOfService: "Termos de Serviço",
      and: "e a",
      privacyPolicy: "Política de Privacidade",
      hasAccount: "Já tem conta?",
      signIn: "Iniciar sessão",
      passwordsMismatch: "As palavras-passe não coincidem",
      passwordTooShort: "A palavra-passe deve ter pelo menos 8 caracteres",
      registrationFailed: "Falha no registo",
    },
    profile: {
      title: "Definições do Perfil",
      subtitle: "Gerir a informação da sua conta",
      personalInfo: "INFORMAÇÃO PESSOAL",
      firstName: "PRIMEIRO NOME",
      lastName: "APELIDO",
      email: "EMAIL",
      emailNotChangeable: "O email não pode ser alterado",
      referralCode: "CÓDIGO DE REFERÊNCIA",
      saveChanges: "GUARDAR ALTERAÇÕES",
      saved: "Guardado",
      changePassword: "ALTERAR PALAVRA-PASSE",
      currentPassword: "PALAVRA-PASSE ATUAL",
      newPassword: "NOVA PALAVRA-PASSE",
      newPasswordPlaceholder: "Mínimo 8 caracteres",
      confirmNewPassword: "CONFIRMAR NOVA PALAVRA-PASSE",
      updatePassword: "ATUALIZAR PALAVRA-PASSE",
      passwordUpdated: "Palavra-passe atualizada",
      passwordsMismatch: "As palavras-passe não coincidem",
      passwordTooShort: "A palavra-passe deve ter pelo menos 8 caracteres",
    },
    orders: {
      title: "As Suas Encomendas",
      subtitle: "Rastreie e gira todas as suas encomendas ORYN",
      noOrders: "Sem encomendas ainda",
      noOrdersDesc: "O seu histórico de encomendas aparecerá aqui assim que fizer a sua primeira compra.",
      browseProducts: "VER PRODUTOS",
      addedToCart: "ADICIONADO AO CARRINHO \u2713",
      reorder: "REENCOMENDAR",
      items: "artigos",
      item: "artigo",
    },
    orderDetail: {
      notFound: "Encomenda não encontrada",
      backToOrders: "Voltar às encomendas",
      ordersBreadcrumb: "Encomendas",
      orderTitle: "Encomenda",
      placedOn: "Realizada em",
      print: "IMPRIMIR",
      orderTracking: "RASTREIO DA ENCOMENDA",
      pending: "Pendente",
      processing: "Em Processamento",
      shipped: "Enviada",
      delivered: "Entregue",
      cancelled: "Cancelada",
      orderItems: "ARTIGOS DA ENCOMENDA",
      qty: "Qtd:",
      subtotal: "Subtotal",
      shipping: "Envio",
      free: "GRATUITO",
      discount: "Desconto",
      total: "Total",
      shippingAddress: "MORADA DE ENVIO",
      shippingNotAvailable: "Detalhes de envio não disponíveis",
      payment: "PAGAMENTO",
      method: "Método",
      status: "Estado",
      addedToCart: "ADICIONADO AO CARRINHO",
      reorderAll: "REENCOMENDAR TODOS OS ARTIGOS",
      needHelp: "Precisa de Ajuda?",
      needHelpDesc: "Se tiver questões sobre a sua encomenda, contacte-nos em",
    },
    referrals: {
      title: "Programa de Referências",
      subtitle: "Partilhe a ORYN com colegas e ganhe comissões em cada encomenda que fizerem.",
      yourCode: "O SEU CÓDIGO DE REFERÊNCIA",
      copied: "COPIADO!",
      copyCode: "COPIAR CÓDIGO",
      yourLink: "O SEU LINK DE REFERÊNCIA",
      copyLink: "COPIAR LINK",
      shareVia: "PARTILHAR VIA:",
      whatsapp: "WhatsApp",
      email: "Email",
      directReferrals: "REFERÊNCIAS DIRETAS",
      networkSize: "TAMANHO DA REDE",
      totalEarned: "TOTAL GANHO",
      available: "DISPONÍVEL",
      earningsByLevel: "GANHOS POR NÍVEL",
      levelLabel: "Nível",
      commission: "comissão",
      ordersLabel: "encomendas",
      pending: "PENDENTE",
      approved: "APROVADO",
      paidOut: "PAGO",
      yourReferrals: "AS SUAS REFERÊNCIAS",
      commissionHistory: "HISTÓRICO DE COMISSÕES",
      tableOrder: "ENCOMENDA",
      tableLevel: "NÍVEL",
      tableRate: "TAXA",
      tableAmount: "MONTANTE",
      tableStatus: "ESTADO",
      tableDate: "DATA",
      howItWorks: "COMO FUNCIONA",
      steps: [
        { title: "Partilhe o Seu Código", desc: "Envie o seu código ou link de referência único a colegas e investigadores." },
        { title: "Eles Encomendam", desc: "Quando se registam com o seu código e fazem uma encomenda, ganha comissão." },
        { title: "Ganhe Recompensas", desc: "Ganhe 10% em referências diretas, mais comissões nas referências deles até 5 níveis de profundidade." },
      ],
      whatsappShareText: "Descubra ORYN Peptides — péptidos de investigação de precisão de um laboratório biotech. Use o meu código {code} na sua primeira encomenda: {link}",
      emailShareSubject: "ORYN Peptides — Péptidos de Investigação de Precisão",
      emailShareBody: "Olá,\n\nQueria partilhar a ORYN Peptides consigo. Produzem péptidos de investigação de grau farmacêutico com >99% de pureza.\n\nUse o meu código de referência: {code}\n\nOu clique aqui: {link}\n\nCumprimentos",
    },
    wishlist: {
      title: "Favoritos",
      itemsSaved: "artigos guardados",
      itemSaved: "artigo guardado",
      empty: "A sua lista de favoritos está vazia",
      emptyDesc: "Guarde os produtos que lhe interessam para mais tarde.",
      browseProducts: "VER PRODUTOS",
      addToCart: "ADICIONAR AO CARRINHO",
      remove: "REMOVER",
    },
    savedAddresses: {
      title: "MORADAS GUARDADAS",
      cancel: "CANCELAR",
      addAddress: "+ ADICIONAR MORADA",
      labelField: "ETIQUETA (ex. Casa, Escritório)",
      labelPlaceholder: "Casa",
      firstName: "PRIMEIRO NOME",
      lastName: "APELIDO",
      address: "MORADA",
      city: "CIDADE",
      postcode: "CÓDIGO POSTAL",
      country: "PAÍS",
      phone: "TELEFONE",
      setAsDefault: "Definir como morada predefinida",
      saveAddress: "GUARDAR MORADA",
      noAddresses: "Sem moradas guardadas. Adicione uma para um pagamento mais rápido.",
      default: "PREDEFINIDA",
      setDefault: "PREDEFINIR",
      remove: "REMOVER",
      countries: {
        GB: "Reino Unido",
        ES: "Espanha",
        IE: "Irlanda",
        DE: "Alemanha",
        FR: "França",
        NL: "Países Baixos",
      },
    },
  },

  cookie: {
    message:
      "Utilizamos cookies para melhorar a sua experiência e para funcionalidades essenciais do site. Ao continuar, concorda com a nossa",
    privacyPolicy: "Política de Privacidade",
    acceptAll: "ACEITAR TUDO",
    essentialOnly: "APENAS ESSENCIAIS",
  },

  toast: {
    addedToCart: "ADICIONADO AO CARRINHO",
  },

  popups: {
    firstVisit: {
      discount: "10%",
      yourFirstOrder: "A SUA PRIMEIRA ENCOMENDA",
      code: "WELCOME10",
      tagline: "BEM-VINDO À ORYN",
      title: "Ciência Peptídica de Precisão",
      description:
        "Laboratório de biotecnologia com peptídeos de investigação de >99% de pureza em sistemas de caneta de precisão. Use o código WELCOME10 na sua primeira encomenda.",
      benefits: [
        "Envio gratuito a partir de 150€",
        "Fabrico certificado GMP",
        "Certificado de Análise incluído",
      ],
      shopNow: "COMPRAR AGORA",
      noThanks: "Não, obrigado, prefiro navegar por conta própria",
    },
    exitIntent: {
      tagline: "ESPERE — ANTES DE SAIR",
      title: "Obtenha 10% de Desconto na Sua Primeira Encomenda",
      description:
        "Junte-se a investigadores de todo o mundo que utilizam peptídeos de precisão ORYN. Introduza o seu email para receber o seu código de desconto exclusivo.",
      placeholder: "o.seu@email.com",
      claimDiscount: "OBTER O MEU 10% DE DESCONTO",
      noSpam: "Sem spam. Cancele quando quiser.",
      welcomeTitle: "Bem-vindo à ORYN!",
      welcomeMessage:
        "Use o código WELCOME10 no checkout para 10% de desconto.",
    },
  },

  payment: {
    processing: "A PROCESSAR...",
    loadingPayment: "A CARREGAR PAGAMENTO...",
    completeOrder: "CONCLUIR ENCOMENDA",
    sslEncrypted: "SSL ENCRIPTADO",
    pciCompliant: "COMPATÍVEL PCI",
    paymentFailed: "O pagamento falhou. Tente novamente.",
    unexpectedError: "Ocorreu um erro inesperado.",
    notCompleted: "O pagamento não foi concluído. Tente novamente.",
    preparingPayment: "A preparar pagamento seguro...",
    paymentNotReady: "O sistema de pagamento não está pronto. Por favor, tente novamente.",
    paymentFormLoading: "O formulário de pagamento ainda está a carregar. Aguarde um momento.",
    orderCreationFailed: "Pagamento processado mas a criação do pedido falhou. Contacte o suporte.",
    orPayWith: "OU PAGAR COM CARTÃO",
  },

  volumeDiscount: {
    applied: "Desconto por volume aplicado:",
    addMore: "Adicione mais {count} para {percent}% DE DESCONTO",
    title: "DESCONTOS POR VOLUME",
    items: "{count}+ artigos",
    off: "{percent}% DESC",
    active: "ATIVO",
    unlockMore: "Adicione mais {count} para desbloquear {percent}% de desconto!",
  },

  frequentlyBought: {
    title: "Frequentemente Comprados em Conjunto",
    save: "POUPE 10%",
    bundlePrice: "Preço do pack — poupe {amount} com esta combinação",
    addAll: "ADICIONAR TUDO AO CARRINHO",
  },

  recentlyViewed: {
    title: "Vistos Recentemente",
  },

  orderBump: {
    addToOrder: "ADICIONE AO SEU PEDIDO",
    yesAddIt: "SIM, ADICIONAR",
  },

  aria: {
    search: "Pesquisar",
    account: "Conta",
    wishlist: "Lista de desejos",
    openCart: "Abrir carrinho",
    toggleMenu: "Alternar menu",
    mobileMenu: "Menu móvel",
    backToTop: "Voltar ao topo",
    cookieConsent: "Consentimento de cookies",
    shareWhatsApp: "Partilhar no WhatsApp",
    shareX: "Partilhar no X",
    shareFacebook: "Partilhar no Facebook",
    copyLink: "Copiar link",
    switchLanguage: "Mudar idioma",
    switchRegion: "Mudar região",
    breadcrumb: "Migalhas de pão",
    dismiss: "Fechar",
    close: "Fechar",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    email: "E-mail",
    researchDisclaimer: "Aviso de investigação",
  },

  calculator: {
    interactiveTool: "FERRAMENTA INTERATIVA",
    title: "Calculadora de Reconstituição de Péptidos",
    description: "Introduza a quantidade de péptido, volume de água e dose desejada para calcular a concentração e o volume de injeção.",
    peptideAmount: "Quantidade de Péptido",
    bacteriostaticWater: "Volume de Água Bacteriostática",
    desiredDose: "Dose Desejada por Injeção",
    customAmount: "Quantidade personalizada",
    customVolume: "Volume personalizado",
    customDose: "Dose personalizada",
    concentration: "Concentração",
    injectionVolume: "Volume de Injeção",
    insulinSyringe: "Seringa de Insulina",
    totalDoses: "Doses Totais",
    mcgPerMl: "mcg / mL",
    mlPerDose: "mL por dose",
    unitsIuMarks: "unidades (marcas UI)",
    fromVial: "do frasco",
    units: "unidades",
    overHundredUnits: "> 100 unidades",
    zeroUnits: "0 unidades",
    ml: "mL",
    overOneMl: "> 1,0 mL (usar seringa maior)",
    zeroMl: "0,000 mL",
    syringeLabel: "Seringa de Insulina (100 unidades = 1 mL)",
    warningNote: "Nota:",
    warningText: "A dose calculada excede uma seringa de insulina padrão de 100 unidades (1 mL). Considere adicionar mais água bacteriostática para aumentar o volume, o que reduzirá a concentração e diminuirá o volume de injeção por dose.",
    enterValues: "Introduza valores válidos acima para ver os resultados calculados.",
    quickReference: "Referência Rápida",
    unitConversions: "Conversões de Unidades",
    standardSyringe: "Seringa Padrão",
    theFormula: "A Fórmula",
    mgToMcg: "1 mg = 1.000 mcg",
    mlToUnits: "1 mL = 100 unidades de insulina",
    u100Syringe: "Seringa de insulina U-100",
    hundredUnitsOneMl: "100 unidades = 1,0 mL",
    formulaLine1: "Dose (mcg) / Concentração (mcg/mL)",
    formulaLine2: "= Volume a injetar (mL)",
  },

  whyOrynPage: {
    differentiators: [
      { title: "Canetas de Péptidos Pré-Doseadas", description: "Ao contrário dos concorrentes que vendem frascos soltos que requerem reconstituição, a ORYN oferece canetas de péptidos pré-misturadas e com dosagem precisa, prontas para uso imediato em investigação. Sem mistura, sem cálculos, sem risco de contaminação.", highlight: "Único no mercado do Reino Unido" },
      { title: "Pureza Verificada por HPLC ≥98%", description: "Cada lote ORYN supera 98% de pureza, verificado de forma independente por Cromatografia Líquida de Alta Eficiência e Espectrometria de Massa. A maioria dos concorrentes do Reino Unido oferece apenas 95% ou alegações não verificadas.", highlight: "Acima do padrão da indústria" },
      { title: "Fabrico GMP no Reino Unido", description: "Todos os péptidos ORYN são fabricados em instalações certificadas GMP, em conformidade com os padrões de produção farmacêutica. Rastreabilidade completa do lote, desde a matéria-prima até ao produto acabado.", highlight: "Grau farmacêutico" },
      { title: "Envio Gratuito para o Reino Unido acima de €150", description: "Desfrute de entrega gratuita no dia seguinte em todos os pedidos do Reino Unido acima de €150. A embalagem com controlo de temperatura garante a integridade do péptido desde as nossas instalações até ao seu laboratório de investigação.", highlight: "Entrega no dia seguinte" },
      { title: "COA Completo com Cada Pedido", description: "Cada pedido ORYN é enviado com um Certificado de Análise completo que confirma pureza, identidade, níveis de endotoxina e esterilidade. Sem espera, sem pedidos — está incluído como padrão.", highlight: "Transparência garantida" },
      { title: "Produção em Sala Limpa ISO 7", description: "Os péptidos ORYN são preenchidos e selados em salas limpas classificadas ISO 7, com monitorização ambiental contínua. Isto supera os padrões da maioria dos fornecedores de péptidos do Reino Unido.", highlight: "Ambiente de grau hospitalar" },
    ],
    comparisonFeatures: [
      { feature: "Formato de Entrega", oryn: "Sistema de Caneta Pré-Doseada", competitor: "Frascos Soltos (reconstituição necessária)" },
      { feature: "Padrão de Pureza", oryn: "≥98% Verificado por HPLC e EM", competitor: "≥95% (muitas vezes não verificado)" },
      { feature: "Protocolo de Teste", oryn: "HPLC + Espectrometria de Massa + Endotoxina", competitor: "Apenas HPLC básico" },
      { feature: "Envio para o Reino Unido", oryn: "Gratuito acima de €150 (dia seguinte)", competitor: "Variável (€5-€15)" },
      { feature: "COA Incluído", oryn: "Cada lote, cada pedido", competitor: "Mediante pedido (se disponível)" },
      { feature: "Instalação de Produção", oryn: "Sala Limpa ISO 7, Certificado GMP", competitor: "Variável (muitas vezes não divulgado)" },
      { feature: "Esterilidade", oryn: "Filtro 0,22μm + Raio Gama", competitor: "Apenas filtração" },
      { feature: "Prazo de Validade", oryn: "24 meses (selado)", competitor: "6-12 meses" },
      { feature: "Suporte ao Cliente", oryn: "Equipa de investigação dedicada", competitor: "Apenas e-mail" },
      { feature: "Gama de Produtos", oryn: "10 péptidos em 3 sistemas de entrega", competitor: "5-8 péptidos, apenas frascos" },
    ],
    stats: [
      { value: "10", label: "Péptidos de Investigação", sublabel: "em 3 sistemas de entrega" },
      { value: "98%+", label: "Pureza Verificada", sublabel: "testado por HPLC + EM" },
      { value: "ISO 7", label: "Padrão de Sala Limpa", sublabel: "grau farmacêutico" },
      { value: "15+", label: "Cidades do Reino Unido Servidas", sublabel: "entrega no dia seguinte" },
      { value: "40+", label: "Áreas de Londres", sublabel: "expedição no mesmo dia disponível" },
      { value: "24", label: "Meses de Prazo de Validade", sublabel: "selado, refrigerado" },
    ],
    tableOryn: "ORYN",
    tableCompetitors: "CONCORRENTES TÍPICOS DO REINO UNIDO",
    feature: "Característica",
    viewProducts: "VER OS NOSSOS PRODUTOS",
    ourNumbers: "OS NOSSOS NÚMEROS",
    comparisonTitle: "Como a ORYN Se Compara",
    comparisonSubtitle: "Veja como a ORYN se compara com os fornecedores típicos de péptidos no Reino Unido.",
  },

  wholesalePage: {
    breadcrumbHome: "INÍCIO",
    breadcrumbWholesale: "GROSSISTA",
    heroBulkOrders: "ENCOMENDAS A GRANEL",
    heroTitle1: "Grossista e Encomendas",
    heroTitle2: "em Volume",
    heroDescription: "A ORYN fornece sistemas de canetas peptídicas de qualidade para investigação a universidades, laboratórios, clínicas e distribuidores no Reino Unido e na Europa. Descontos por volume de 5% a 15% — com preços personalizados para contratos de grande escala.",
    statMinOrderLabel: "Encomenda Mín.",
    statMinOrderValue: "3 Unidades",
    statMaxDiscountLabel: "Desconto Máximo",
    statMaxDiscountValue: "15% Desc.",
    statPurityLabel: "Pureza",
    statPurityValue: ">99%",
    statDispatchLabel: "Envio UK",
    statDispatchValue: "Mesmo Dia",
    tiersLabel: "PREÇOS POR VOLUME",
    tiersTitle1: "Níveis de",
    tiersTitle2: "Desconto",
    tiersDescription: "Combine quaisquer produtos de toda a nossa gama. Os descontos aplicam-se automaticamente com base no total de unidades.",
    tierMostPopular: "MAIS POPULAR",
    tierOffRetail: "NO PREÇO DE RETALHO",
    tierPricing: "PREÇO",
    tierLabelStarter: "BÁSICO",
    tierLabelProfessional: "PROFISSIONAL",
    tierLabelEnterprise: "EMPRESA",
    tierLabelCustom: "ORÇAMENTO PERSONALIZADO",
    benefitsLabel: "VANTAGENS DE GROSSISTA",
    benefitsTitle1: "Porquê Parcerizar Com",
    benefitsTitle2: "ORYN",
    benefitsDescription: "Além dos preços por volume, as contas grossistas ORYN desbloqueiam um conjunto de serviços concebidos para compradores profissionais.",
    benefitAccountManagerTitle: "Gestor de Conta Dedicado",
    benefitAccountManagerDesc: "Um único ponto de contacto para encomendas, preços e consultas técnicas. O seu gestor de conta compreende as suas necessidades.",
    benefitShippingTitle: "Envio Prioritário",
    benefitShippingDesc: "As encomendas grossistas são enviadas no mesmo dia quando efetuadas antes das 14h. Embalagem com controlo de temperatura incluída sem custo adicional.",
    benefitVolumePricingTitle: "Preços por Volume",
    benefitVolumePricingDesc: "Descontos automáticos de 5% a 15% com base na quantidade encomendada. Preços personalizados disponíveis para contratos contínuos.",
    benefitCOATitle: "COA Incluído",
    benefitCOADesc: "Cada envio grossista inclui Certificados de Análise específicos por lote. Rastreabilidade completa desde a síntese até à entrega.",
    benefitCustomLabellingTitle: "Rotulagem Personalizada",
    benefitCustomLabellingDesc: "Marca branca e embalagem personalizada disponíveis para distribuidores e clínicas. Encomendas mínimas de 50 unidades para rótulos personalizados.",
    benefitTechSupportTitle: "Suporte Técnico",
    benefitTechSupportDesc: "Acesso à nossa equipa de ciência peptídica para orientação sobre protocolos, recomendações de armazenamento e especificações de produtos.",
    whoWeServeLabel: "OS NOSSOS CLIENTES",
    whoWeServeTitle1: "A Quem",
    whoWeServeTitle2: "Servimos",
    whoWeServeDescription: "Os péptidos grossistas da ORYN são confiados a profissionais de investigação e organizações no Reino Unido e na Europa.",
    customerUniversitiesTitle: "Universidades e Academia",
    customerUniversitiesDesc: "Departamentos de investigação e programas de pós-graduação a estudar biologia peptídica, farmacologia e medicina regenerativa.",
    customerResearchLabsTitle: "Laboratórios de Investigação",
    customerResearchLabsDesc: "Laboratórios de investigação privados e públicos que conduzem estudos in vitro e in vivo com compostos peptídicos de qualidade para investigação.",
    customerPharmaTitle: "Empresas Farmacêuticas",
    customerPharmaDesc: "Divisões de I&D farmacêuticas que utilizam péptidos de padrão de referência para desenvolvimento de medicamentos e estudos de comparação analítica.",
    customerClinicsTitle: "Clínicas e Consultas Médicas",
    customerClinicsDesc: "Clínicas de medicina integrativa e profissionais que necessitam de um fornecimento consistente de péptidos de elevada pureza para investigação clínica.",
    customerDistributorsTitle: "Distribuidores e Revendedores",
    customerDistributorsDesc: "Parceiros grossistas que distribuem produtos ORYN no Reino Unido e na Europa. Opções de marca branca disponíveis.",
    customerBiotechTitle: "Startups de Biotech",
    customerBiotechDesc: "Empresas de biotecnologia emergentes que necessitam de um fornecimento fiável de péptidos para desenvolvimento de produtos e estudos de prova de conceito.",
    productsLabel: "EXEMPLOS DE PREÇOS GROSSISTAS",
    productsTitle1: "Produtos a",
    productsTitle2: "Preços Grossistas",
    productsDescription: "Veja como os preços por volume reduzem o seu custo por unidade. Todos os produtos ORYN são elegíveis para descontos grossistas.",
    productRetailLabel: "PREÇO DE RETALHO",
    productViewAll: "VER TODOS OS {count} PRODUTOS",
    faqLabel: "FAQ",
    faqTitle1: "Perguntas",
    faqTitle2: "Frequentes",
    faqDescription: "Perguntas comuns sobre o nosso programa grossista, preços e configuração de conta.",
    ctaTitle: "Pronto para Encomendar em Volume?",
    ctaDescription: "Contacte a nossa equipa grossista para configurar a sua conta, discutir preços personalizados e começar a poupar em canetas peptídicas de qualidade para investigação.",
    ctaEnquiry: "CONSULTA GROSSISTA",
    ctaBrowseProducts: "VER PRODUTOS",
  },

  share: {
    label: "PARTILHAR",
  },

  socialProof: {
    from: "de",
    purchased: "comprou",
    minAgo: "há {min} min",
  },

  flashSale: {
    flash: "Venda Relâmpago — Use o código FLASH15 para 15% de desconto em todas as canetas peptídicas",
    weekend: "Especial de Fim de Semana — Use o código WEEKEND10 para 10% de desconto",
  },

  qualityPage: {
    breadcrumbHome: "INÍCIO",
    breadcrumbQuality: "QUALIDADE & ANÁLISES",
    heroBadge: "VERIFICADO POR TERCEIROS",
    heroTitle1: "Transparência em",
    heroTitle2: "Cada Lote",
    heroDescription:
      "Cada péptido ORYN é analisado de forma independente por laboratórios acreditados pela ISO. Publicamos Certificados de Análise para cada produto porque acreditamos que merece ver exatamente o que recebe — pureza, identidade e esterilidade, verificados pela ciência, não pelo marketing.",
    statPurityLabel: "PUREZA DO LOTE",
    statLabsLabel: "LABORATÓRIOS INDEPENDENTES",
    statTestsLabel: "TESTES POR LOTE",
    statTraceabilityLabel: "RASTREABILIDADE",
    processLabel: "O NOSSO PROCESSO",
    processTitle1: "Da Síntese ao",
    processTitle2: "Certificado",
    processDescription:
      "Um rigoroso processo de garantia de qualidade em quatro etapas garante que cada péptido ORYN cumpre os mais elevados padrões analíticos antes do lançamento.",
    testingSteps: [
      {
        title: "Síntese de Péptidos",
        description:
          "Síntese de péptidos em fase sólida (SPPS) em instalações certificadas GMP sob sistema de gestão de qualidade ISO 9001.",
      },
      {
        title: "Análise HPLC",
        description:
          "A Cromatografia Líquida de Alta Eficiência separa e quantifica a pureza do péptido, confirmando >98% em cada lote.",
      },
      {
        title: "Espectrometria de Massa",
        description:
          "A confirmação de identidade LC-MS/MS verifica o peso molecular exato e a integridade da sequência de aminoácidos.",
      },
      {
        title: "Geração do Certificado",
        description:
          "Um laboratório independente emite um Certificado de Análise específico do lote com todos os dados analíticos e critérios de aprovação/rejeição.",
      },
    ],
    certificationsLabel: "CERTIFICAÇÕES",
    standardsTitle1: "Padrões de Qualidade que",
    standardsTitle2: "Nos Definem",
    standardsDescription:
      "A nossa infraestrutura de fabrico e análise cumpre os requisitos de qualidade farmacêutica mais exigentes do setor.",
    qualityStandards: [
      {
        title: "Fabrico GMP",
        description:
          "Instalações de produção certificadas em Boas Práticas de Fabrico em toda a UE, garantindo consistência de qualidade farmacêutica.",
      },
      {
        title: "Qualidade ISO 9001",
        description:
          "Sistema de gestão de qualidade reconhecido internacionalmente que rege cada etapa das matérias-primas ao produto acabado.",
      },
      {
        title: "Sala Limpa ISO 7",
        description:
          "O enchimento estéril é realizado em salas limpas classificadas ISO 7 com filtração HEPA e monitorização ambiental contínua.",
      },
      {
        title: "Pureza Verificada por HPLC",
        description:
          "Cada lote verificado por análise HPLC independente. A maioria dos lotes supera os 99% de pureza — entre os mais elevados do mercado europeu.",
      },
    ],
    coaLabel: "CERTIFICADOS DE ANÁLISE",
    coaTitle1: "COA para Cada",
    coaTitle2: "Produto",
    coaDescription:
      "Cada um dos nossos produtos peptídicos é verificado de forma independente. Abaixo estão os resultados dos testes do lote mais recente.",
    passLabel: "APROVADO",
    purityLabel: "PUREZA",
    batchLabel: "LOTE",
    testedLabel: "ANALISADO",
    methodLabel: "MÉTODO",
    testedDate: "Fev 2026",
    viewCoa: "VER COA",
    independentLabel: "VERIFICAÇÃO INDEPENDENTE",
    partnersTitle1: "Laboratórios de Análise",
    partnersTitle2: "Independentes",
    partnersP1:
      "A ORYN não analisa os seus próprios produtos. Cada Certificado de Análise é gerado por laboratórios analíticos independentes acreditados ISO 17025, sem qualquer relação financeira com a nossa operação de fabrico.",
    partnersP2:
      "Esta separação garante uma verificação imparcial e cientificamente rigorosa de pureza, identidade e esterilidade. Os nossos parceiros de análise utilizam métodos analíticos validados, incluindo HPLC de fase reversa, LC-MS/MS, ensaio LAL de endotoxinas e esterilidade por filtração em membrana.",
    partnersBullets: [
      "Laboratórios analíticos acreditados ISO 17025",
      "Sem laços financeiros com o fabrico ORYN",
      "Métodos validados de HPLC e espectrometria de massa",
      "Verificação de endotoxinas e esterilidade",
      "Rastreabilidade completa do lote da síntese ao certificado",
    ],
    analyticalMethodsLabel: "MÉTODOS ANALÍTICOS",
    analyticalMethods: [
      {
        method: "Teste de Pureza HPLC",
        description:
          "Coluna C18 de fase reversa, deteção UV a 220 nm. Quantifica a pureza do péptido e deteta impurezas.",
          standard: "USP <621>",
      },
      {
        method: "Espectrometria de Massa (LC-MS)",
        description:
          "Ionização por electrospray com deteção de massa de alta resolução. Confirma a identidade molecular.",
          standard: "ISO 13528",
      },
      {
        method: "Teste de Endotoxinas",
        description:
          "Ensaio turbidimétrico cinético LAL (Lisado de Amebócitos de Limulus). Garante que os níveis de endotoxinas bacterianas estão abaixo dos limites.",
          standard: "USP <85>",
      },
      {
        method: "Teste de Esterilidade",
        description:
          "Método de filtração em membrana com incubação de 14 dias em meios TSB e FTM.",
          standard: "USP <71>",
      },
    ],
    understandingLabel: "COMPREENDER O SEU COA",
    coaContentsTitle1: "O que Contém",
    coaContentsTitle2: "Cada COA",
    coaContentsDescription:
      "Cada Certificado de Análise ORYN fornece transparência analítica completa. Aqui está o que encontrará em cada documento.",
    coaItems: [
      {
        title: "Identidade do Péptido",
        details:
          "Nome do composto, fórmula molecular, peso molecular, sequência de aminoácidos e número CAS.",
      },
      {
        title: "Dados de Pureza HPLC",
        details:
          "Cromatograma, tempo de retenção, percentagem de área do pico e perfil de impurezas com critérios de aceitação.",
      },
      {
        title: "Espectro de Massa",
        details:
          "Confirmação de identidade LC-MS mostrando o peso molecular observado vs. teórico e estados de carga.",
      },
      {
        title: "Resultados de Endotoxinas",
        details:
          "Resultados do teste LAL em UE/mL com limites de especificação. Todos os produtos ORYN testam abaixo de 0,5 UE/mL.",
      },
      {
        title: "Relatório de Esterilidade",
        details:
          "Resultados de incubação de 14 dias em meios TSB e FTM confirmando ausência de crescimento microbiano.",
      },
      {
        title: "Informação do Lote",
        details:
          "Número de lote único, data de fabrico, data de análise, data de validade e identificação do analista.",
      },
    ],
    faqLabel: "FAQ",
    faqTitle1: "Qualidade & Análises",
    faqTitle2: "FAQ",
    faqDescription:
      "Perguntas frequentes sobre o nosso processo de garantia de qualidade, testes de pureza de péptidos e Certificados de Análise.",
    ctaTitle: "Qualidade que Pode Verificar",
    ctaDescription:
      "Cada péptido ORYN é enviado com um número de lote que pode rastrear até um Certificado de Análise independente. Veja a ciência por si mesmo.",
    ctaBrowseProducts: "VER PRODUTOS",
    ctaRequestCoa: "SOLICITAR UM COA",
  },

  shippingPage: {
    heroTagline: "TEMPERATURA CONTROLADA",
    heroTitle1: "Envio e",
    heroTitle2: "Entrega",
    heroDescription:
      "Cada encomenda ORYN é expedida no mesmo dia em embalagem de temperatura controlada, garantindo que as suas canetas peptídicas cheguem em perfeitas condições. Envio grátis no Reino Unido em encomendas acima de \u20ac{threshold}.",
    breadcrumbHome: "INÍCIO",
    breadcrumbShipping: "ENVIO E ENTREGA",
    statUkDeliveryLabel: "Entrega UK",
    statUkDeliveryValue: "2-4 Dias",
    statDispatchLabel: "Expedição",
    statDispatchValue: "Mesmo Dia",
    statFreeOverLabel: "Grátis a Partir de",
    statPackagingLabel: "Embalagem",
    statPackagingValue: "2-8\u00b0C",
    ukZonesSectionLabel: "ZONAS DE ENTREGA UK",
    ukZonesSectionTitle1: "Prazos de Entrega por",
    ukZonesSectionTitle2: "Região",
    ukZonesSectionDescription:
      "Todas as encomendas realizadas antes das 14h GMT são expedidas no mesmo dia útil. Os prazos indicados são dias úteis a partir da expedição.",
    ukDeliveryNote:
      "Os prazos são estimativas para envio standard. Opções expresso disponíveis no pagamento. As encomendas ao fim de semana e feriados são expedidas no próximo dia útil.",
    ukZones: [
      { region: "Londres & Sudeste", days: "1 \u2013 2 dias" },
      { region: "Midlands & East Anglia", days: "2 \u2013 3 dias" },
      { region: "Norte de Inglaterra", days: "2 \u2013 3 dias" },
      { region: "Escócia (Terras Baixas)", days: "3 \u2013 4 dias" },
      { region: "País de Gales", days: "2 \u2013 3 dias" },
      { region: "Irlanda do Norte", days: "3 \u2013 4 dias" },
      { region: "Highlands & Ilhas", days: "4 \u2013 5 dias" },
    ],
    coldChainSectionLabel: "LOGÍSTICA DE CADEIA DE FRIO",
    packagingTitle1: "Embalagem de",
    packagingTitle2: "Temperatura Controlada",
    packagingDescription:
      "Os péptidos requerem armazenamento refrigerado a 2-8\u00b0C. A nossa embalagem de cadeia de frio garante que a encomenda mantém a temperatura ideal durante o transporte.",
    packagingBullets: [
      "Mantém 2-8\u00b0C até 48 horas em trânsito",
      "Packs de gel não tóxicos, pré-arrefecidos a 2\u00b0C",
      "Contentores isolados multicamada",
      "Proteção extra durante os meses de verão",
      "Inserções de espuma personalizadas para as canetas",
    ],
    coldChainFeatures: [
      {
        title: "Caixas de Envio Isoladas",
        description:
          "Contentores isolados multicamada mantêm a temperatura interna a 2-8\u00b0C até 48 horas, protegendo a integridade do péptido do armazém à porta.",
      },
      {
        title: "Packs de Gel Refrigerante",
        description:
          "Packs de gel de mudança de fase não tóxicos, pré-arrefecidos a 2\u00b0C, fornecem arrefecimento sustentado sem risco de congelamento.",
      },
      {
        title: "Ajustes Sazonais",
        description:
          "Durante os meses de verão (junho-setembro) adicionamos packs de gel extra e isolamento reforçado. Em calor extremo, optamos por entrega expresso.",
      },
      {
        title: "Monitorização de Temperatura",
        description:
          "Encomendas por grosso de 25+ unidades incluem tiras indicadoras de temperatura que confirmam que a entrega se manteve na gama 2-8\u00b0C.",
      },
    ],
    euSectionLabel: "ENVIO INTERNACIONAL",
    euSectionTitle1: "Entrega",
    euSectionTitle2: "Europeia",
    euSectionDescription:
      "A ORYN envia para mais de 15 países europeus com rastreamento completo e embalagem de temperatura controlada.",
    euCountriesHeader: "PAÍSES DA UE PARA ONDE ENVIAMOS",
    euCountriesNotListed:
      "Não está listado? Contacte-nos \u2014 podemos arranjar envio para o seu país.",
    euDeliveryTimeTitle: "Prazo de Entrega",
    euDeliveryTimeValue: "3 \u2013 7 dias",
    euDeliveryTimeDescription:
      "Dias úteis desde a expedição. Europa Ocidental tipicamente 3-5 dias, Europa de Leste 5-7 dias.",
    euShippingCostTitle: "Custo de Envio",
    euShippingCostValue: "Taxa Fixa",
    euShippingCostDescription:
      "Envio a taxa fixa para todos os destinos europeus. Calculado no pagamento com base no país de destino e peso da encomenda.",
    euCustomsTitle: "Alfândega & Taxas",
    euCustomsValue: "Responsabilidade do Comprador",
    euCustomsDescription:
      "As encomendas internacionais podem estar sujeitas a direitos aduaneiros e impostos de importação. Estes encargos são da responsabilidade do cliente.",
    euTrackingTitle: "Rastreamento",
    euTrackingValue: "Rastreamento Completo",
    euTrackingDescription:
      "Todos os envios internacionais incluem rastreamento de ponta a ponta com atualizações em tempo real por email.",
    freeShippingSectionLabel: "ENVIO GRÁTIS",
    freeShippingTitle1: "Envio UK Grátis a Partir de",
    freeShippingTitle2: "\u20ac{threshold}",
    freeShippingDescription:
      "Encomendas acima de \u20ac{threshold} têm envio standard grátis para o Reino Unido. Acompanhe o progresso no carrinho.",
    freeShippingExampleLabel: "EXEMPLO: ENCOMENDA DE \u20ac120",
    freeShippingExampleAway: "\u20ac30 para envio grátis",
    discreetTitle: "Embalagem Discreta",
    discreetDescription:
      "Todas as encomendas ORYN são enviadas em caixas neutras e sem identificação. Nenhum nome de produto, marca ou descrição é visível no exterior.",
    discreetItems: [
      "Caixa exterior neutra",
      "Sem marcas visíveis",
      "Nome do remetente genérico",
      "Sem descrição do produto",
    ],
    trackingTitle: "Rastreamento da Encomenda",
    trackingDescription:
      "Cada encomenda recebe um número de rastreamento nas 2 horas após a expedição. Siga o envio em tempo real do nosso armazém até à sua porta.",
    trackingItems: [
      "Email de rastreamento em 2 horas",
      "Atualizações de estado em tempo real",
      "Janela de entrega estimada",
      "Confirmação de entrega",
    ],
    returnsTitle: "Devoluções & Reembolsos",
    returnsDescription:
      "Se a encomenda chegar danificada ou incorreta, contacte-nos em 48 horas. Tratamos da substituição ou reembolso completo sem custos adicionais.",
    returnsItems: [
      "Prazo de 48 horas para reportar danos",
      "Substituição completa ou reembolso",
      "Evidência fotográfica necessária",
      "Devolução gratuita por erros",
    ],
    faqSectionLabel: "FAQ",
    faqSectionTitle1: "Perguntas sobre",
    faqSectionTitle2: "Envio",
    faqSectionDescription:
      "Perguntas frequentes sobre entrega de péptidos, embalagem e opções de envio.",
    ctaTitle: "Encomende Hoje, Receba Esta Semana",
    ctaDescription:
      "Expedição no mesmo dia antes das 14h. Entrega de temperatura controlada. Envio UK grátis a partir de \u20ac{threshold}.",
    ctaShopNow: "COMPRAR AGORA",
    ctaContactUs: "CONTACTE-NOS",
  },

  termsPage: {
    tagline: "LEGAL",
    title: "Termos de Serviço",
    lastUpdated: "Última atualização: março de 2026",
    sections: [
      {
        heading: "1. Aceitação dos Termos",
        content:
          "Ao aceder e utilizar o website e os serviços da ORYN Peptide Labs, concorda em ficar vinculado a estes Termos de Serviço. Se não concordar com estes termos, por favor não utilize os nossos serviços.",
      },
      {
        heading: "2. Apenas para Uso em Investigação",
        content:
          "Todos os produtos vendidos pela ORYN Peptide Labs destinam-se exclusivamente a fins de laboratório e investigação. Os produtos não se destinam ao consumo humano ou animal. Ao adquirir, confirma que está a obter os produtos para fins de investigação legítimos e cumpre todas as leis e regulamentos aplicáveis na sua jurisdição.",
      },
      {
        heading: "3. Elegibilidade",
        content:
          "Deve ter pelo menos 18 anos e representar uma organização de investigação legítima, laboratório ou instituição académica para adquirir produtos. A ORYN reserva-se o direito de solicitar verificação de credenciais de investigação.",
      },
      {
        heading: "4. Encomendas e Pagamento",
        content:
          "Todos os preços estão listados em EUR. O pagamento é processado de forma segura. A ORYN reserva-se o direito de cancelar encomendas que pareçam fraudulentas ou violem estes termos. Para encomendas de grossista: 50% de pagamento antecipado, 50% antes do envio.",
      },
      {
        heading: "5. Envio e Entrega",
        content:
          "Os produtos são enviados com manuseamento de cadeia de frio quando necessário. Os prazos de entrega são estimativas. A ORYN não é responsável por atrasos causados por alfândegas, transportadoras ou eventos de força maior.",
      },
      {
        heading: "6. Devoluções e Reembolsos",
        content:
          "Devido à natureza dos nossos produtos, as devoluções são aceites apenas para artigos danificados ou incorretos no prazo de 14 dias após a entrega. Os produtos devem estar por abrir e na embalagem original.",
      },
      {
        heading: "7. Propriedade Intelectual",
        content:
          "Todo o conteúdo, marca e materiais neste website são propriedade da ORYN Peptide Labs. A reprodução não autorizada é proibida.",
      },
      {
        heading: "8. Limitação de Responsabilidade",
        content:
          "A ORYN Peptide Labs fornece produtos no estado em que se encontram para fins de investigação. Não oferecemos garantias quanto à adequação para qualquer fim específico além das especificações indicadas. A nossa responsabilidade é limitada ao preço de compra do produto.",
      },
      {
        heading: "9. Contacto",
        content: "Para questões relacionadas com estes termos, contacte-nos em legal@orynlabs.com.",
      },
    ],
  },

  privacyPage: {
    tagline: "LEGAL",
    title: "Política de Privacidade",
    lastUpdated: "Última atualização: março de 2026",
    sections: [
      {
        heading: "1. Informações que Recolhemos",
        content:
          "Recolhemos informações que fornece diretamente: nome, e-mail, organização, morada de envio e dados de pagamento quando cria uma conta ou faz uma encomenda.",
      },
      {
        heading: "2. Como Utilizamos as Suas Informações",
        content:
          "As suas informações são utilizadas para: processar encomendas, comunicar sobre a sua conta, prestar apoio ao cliente, enviar atualizações de encomendas e cumprir obrigações legais. Não vendemos os seus dados pessoais.",
      },
      {
        heading: "3. Proteção de Dados",
        content:
          "A ORYN Peptide Labs cumpre o RGPD e os regulamentos europeus de proteção de dados aplicáveis. Os seus dados são armazenados de forma segura com encriptação em repouso e em trânsito.",
      },
      {
        heading: "4. Os Seus Direitos",
        content:
          "Ao abrigo do RGPD, tem o direito de: aceder aos seus dados, retificar imprecisões, solicitar a eliminação, restringir o processamento, portabilidade de dados e opor-se ao processamento. Contacte privacy@orynlabs.com para exercer estes direitos.",
      },
      {
        heading: "5. Cookies",
        content:
          "Utilizamos cookies essenciais para a funcionalidade do site e cookies analíticos para melhorar o nosso serviço. Pode gerir as preferências de cookies nas definições do seu browser.",
      },
      {
        heading: "6. Contacto",
        content: "Encarregado de Proteção de Dados: privacy@orynlabs.com",
      },
    ],
  },

  disclaimerPage: {
    tagline: "LEGAL",
    title: "Aviso de Investigação",
    lastUpdated: "Última atualização: março de 2026",
    alertTitle: "Aviso Importante",
    alertContent:
      "Todos os produtos vendidos pela ORYN Peptide Labs destinam-se estritamente à investigação laboratorial e ao estudo científico. NÃO se destinam ao uso humano ou veterinário, aditivos alimentares, medicamentos, cosméticos, produtos químicos domésticos ou qualquer outra forma de consumo.",
    buyerResponsibilityIntro:
      "Ao comprar à ORYN Peptide Labs, o comprador reconhece e concorda que:",
    buyerResponsibilityItems: [
      "Os produtos serão utilizados exclusivamente para fins de investigação legítimos",
      "O comprador está familiarizado e em conformidade com todos os regulamentos aplicáveis",
      "Os produtos não serão revendidos para consumo humano",
      "O comprador assume toda a responsabilidade pelo manuseamento e uso corretos",
      "O comprador tem maioridade e representa uma entidade de investigação legítima",
    ],
    sections: [
      {
        heading: "Declaração de Uso em Investigação",
        content:
          "A ORYN Peptide Labs fabrica e distribui compostos peptídicos exclusivamente para investigação in vitro, experimentação laboratorial e investigação científica. Todos os compostos são fornecidos como produtos químicos de investigação com Certificados de Análise (COA) acompanhantes para verificação de lotes.",
      },
      {
        heading: "Responsabilidade do Comprador",
        content: "",
      },
      {
        heading: "Sem Alegações Médicas",
        content:
          "A ORYN Peptide Labs não faz quaisquer alegações sobre as propriedades terapêuticas, diagnósticas ou preventivas de qualquer produto. As descrições dos produtos fazem referência à literatura científica publicada apenas para fins informativos e não constituem aconselhamento médico nem alegações de eficácia.",
      },
      {
        heading: "Garantia de Qualidade",
        content:
          "Todos os produtos ORYN são fabricados em instalações de sala limpa ISO Classe 7 certificadas GMP com validação analítica de terceiros. Os níveis de pureza excedem 99% conforme verificado pela análise HPLC. A documentação completa do lote, incluindo COA, dados de estabilidade e documentação DMF, está disponível mediante solicitação.",
      },
      {
        heading: "Conformidade Regulamentar",
        content:
          "É da responsabilidade do comprador garantir a conformidade com todos os regulamentos locais, nacionais e internacionais relativos à compra, importação, posse e utilização de péptidos de investigação. A ORYN Peptide Labs opera no âmbito dos quadros regulamentares europeus.",
      },
    ],
  },
} as unknown as Dictionary;

export default pt;
