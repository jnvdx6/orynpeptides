import type { Locale } from "@/i18n/config";

export interface BundleTranslation {
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  protocol: string;
  faqs: Array<{ question: string; answer: string }>;
}

const bundleTranslations: Record<string, Record<Locale, BundleTranslation>> = {
  "recovery-stack": {
    en: {
      name: "Recovery & Repair Stack",
      tagline: "The classic healing duo for accelerated tissue repair",
      description:
        "BPC-157 and TB-500 are the two most extensively researched peptides for tissue repair and regeneration. This stack combines BPC-157's gastric-derived healing properties with TB-500's cell migration and anti-inflammatory action, creating a comprehensive recovery protocol. Researchers worldwide pair these peptides for their complementary mechanisms — BPC-157 promotes angiogenesis and growth factor expression while TB-500 enhances actin regulation and reduces fibrosis. Together, they address both the structural and inflammatory components of tissue damage.",
      benefits: [
        "Synergistic tissue repair through dual mechanisms",
        "Accelerated wound healing and reduced recovery time",
        "Anti-inflammatory action across joints, tendons, and muscles",
        "Supports gut lining integrity and mucosal healing",
        "Promotes angiogenesis for enhanced blood supply to damaged tissue",
        "Reduces fibrosis and scar tissue formation",
      ],
      protocol:
        "The BPC-157 + TB-500 recovery protocol is one of the most well-documented peptide stacks in research literature. Typical protocols involve concurrent administration over 4-8 weeks, with BPC-157 targeting local tissue repair via nitric oxide modulation and TB-500 providing systemic anti-inflammatory and cell-migration support. Both peptides are administered subcutaneously, with many researchers noting enhanced outcomes when injection sites are rotated near the area of interest.",
      faqs: [
        {
          question: "Why are BPC-157 and TB-500 considered the gold standard recovery stack?",
          answer:
            "BPC-157 and TB-500 target complementary healing pathways. BPC-157 promotes angiogenesis, growth factor expression, and nitric oxide synthesis at the tissue level, while TB-500 enhances cell migration, reduces inflammation systemically, and promotes actin polymerisation for structural repair. This dual-mechanism approach addresses both local and systemic aspects of recovery.",
        },
        {
          question: "Can I use both peptides at the same time?",
          answer:
            "Yes, concurrent administration is the most common research protocol. Many studies and anecdotal reports examine both peptides administered on the same day, often at the same time but at different injection sites. The two compounds work through independent mechanisms and do not interfere with each other.",
        },
        {
          question: "How long does a typical recovery stack protocol last?",
          answer:
            "Published research protocols typically run 4-8 weeks for acute injuries and up to 12 weeks for chronic conditions. ORYN's 30-day pen system provides consistent dosing for a full cycle, with many researchers using sequential pens for extended protocols.",
        },
        {
          question: "Is this stack suitable for joint and tendon injuries?",
          answer:
            "Joint and tendon injuries are among the most researched applications for this stack. BPC-157 has been studied in models of severed Achilles tendons, while TB-500 has shown efficacy in reducing joint inflammation and promoting functional connective tissue repair in animal studies.",
        },
      ],
    },
    es: {
      name: "Pack Recuperación y Reparación",
      tagline: "El dúo clásico de curación para una reparación tisular acelerada",
      description:
        "BPC-157 y TB-500 son los dos péptidos más ampliamente investigados para la reparación y regeneración de tejidos. Este pack combina las propiedades curativas de origen gástrico del BPC-157 con la acción de migración celular y antiinflamatoria del TB-500, creando un protocolo de recuperación integral. Investigadores de todo el mundo combinan estos péptidos por sus mecanismos complementarios: el BPC-157 promueve la angiogénesis y la expresión de factores de crecimiento, mientras que el TB-500 mejora la regulación de actina y reduce la fibrosis. Juntos, abordan tanto los componentes estructurales como inflamatorios del daño tisular.",
      benefits: [
        "Reparación tisular sinérgica mediante mecanismos duales",
        "Cicatrización acelerada y tiempo de recuperación reducido",
        "Acción antiinflamatoria en articulaciones, tendones y músculos",
        "Apoya la integridad del revestimiento intestinal y la curación de mucosas",
        "Promueve la angiogénesis para mejorar el suministro de sangre al tejido dañado",
        "Reduce la fibrosis y la formación de tejido cicatricial",
      ],
      protocol:
        "El protocolo de recuperación BPC-157 + TB-500 es uno de los stacks de péptidos más documentados en la literatura científica. Los protocolos típicos implican administración concurrente durante 4-8 semanas, con BPC-157 dirigido a la reparación tisular local mediante modulación del óxido nítrico y TB-500 proporcionando soporte sistémico antiinflamatorio y de migración celular. Ambos péptidos se administran por vía subcutánea, observándose mejores resultados cuando los sitios de inyección se rotan cerca del área de interés.",
      faqs: [
        {
          question: "¿Por qué BPC-157 y TB-500 se consideran el stack de recuperación estándar de oro?",
          answer:
            "BPC-157 y TB-500 actúan sobre vías de curación complementarias. BPC-157 promueve la angiogénesis, la expresión de factores de crecimiento y la síntesis de óxido nítrico a nivel tisular, mientras que TB-500 mejora la migración celular, reduce la inflamación sistémicamente y promueve la polimerización de actina para la reparación estructural.",
        },
        {
          question: "¿Puedo usar ambos péptidos al mismo tiempo?",
          answer:
            "Sí, la administración concurrente es el protocolo de investigación más común. Muchos estudios examinan ambos péptidos administrados el mismo día, a menudo al mismo tiempo pero en diferentes sitios de inyección. Los dos compuestos actúan mediante mecanismos independientes y no interfieren entre sí.",
        },
        {
          question: "¿Cuánto dura un protocolo típico de stack de recuperación?",
          answer:
            "Los protocolos publicados suelen durar 4-8 semanas para lesiones agudas y hasta 12 semanas para condiciones crónicas. El sistema de pluma de 30 días de ORYN proporciona una dosificación consistente para un ciclo completo.",
        },
        {
          question: "¿Es este stack adecuado para lesiones de articulaciones y tendones?",
          answer:
            "Las lesiones articulares y tendinosas se encuentran entre las aplicaciones más investigadas para este stack. El BPC-157 se ha estudiado en modelos de tendones de Aquiles seccionados, mientras que el TB-500 ha demostrado eficacia en la reducción de la inflamación articular en estudios animales.",
        },
      ],
    },
    fr: {
      name: "Pack Récupération & Réparation",
      tagline: "Le duo de guérison classique pour une réparation tissulaire accélérée",
      description:
        "BPC-157 et TB-500 sont les deux peptides les plus largement étudiés pour la réparation et la régénération tissulaire. Ce pack combine les propriétés curatives gastriques du BPC-157 avec l'action de migration cellulaire et anti-inflammatoire du TB-500, créant un protocole de récupération complet. Des chercheurs du monde entier associent ces peptides pour leurs mécanismes complémentaires — BPC-157 favorise l'angiogenèse et l'expression des facteurs de croissance tandis que TB-500 améliore la régulation de l'actine et réduit la fibrose.",
      benefits: [
        "Réparation tissulaire synergique par double mécanisme",
        "Cicatrisation accélérée et temps de récupération réduit",
        "Action anti-inflammatoire sur les articulations, tendons et muscles",
        "Soutient l'intégrité de la muqueuse intestinale",
        "Favorise l'angiogenèse pour améliorer l'apport sanguin aux tissus endommagés",
        "Réduit la fibrose et la formation de tissu cicatriciel",
      ],
      protocol:
        "Le protocole de récupération BPC-157 + TB-500 est l'un des stacks peptidiques les mieux documentés dans la littérature de recherche. Les protocoles typiques impliquent une administration concomitante sur 4 à 8 semaines, BPC-157 ciblant la réparation tissulaire locale via la modulation de l'oxyde nitrique et TB-500 fournissant un soutien anti-inflammatoire et de migration cellulaire systémique.",
      faqs: [
        {
          question: "Pourquoi BPC-157 et TB-500 sont-ils considérés comme le stack de récupération de référence ?",
          answer:
            "BPC-157 et TB-500 ciblent des voies de guérison complémentaires. BPC-157 favorise l'angiogenèse, l'expression des facteurs de croissance et la synthèse d'oxyde nitrique au niveau tissulaire, tandis que TB-500 améliore la migration cellulaire, réduit l'inflammation systémiquement et favorise la polymérisation de l'actine.",
        },
        {
          question: "Puis-je utiliser les deux peptides en même temps ?",
          answer:
            "Oui, l'administration simultanée est le protocole de recherche le plus courant. Les deux composés agissent par des mécanismes indépendants et n'interfèrent pas l'un avec l'autre.",
        },
        {
          question: "Quelle est la durée typique d'un protocole de stack de récupération ?",
          answer:
            "Les protocoles publiés durent généralement 4 à 8 semaines pour les blessures aiguës et jusqu'à 12 semaines pour les affections chroniques. Le système de stylo 30 jours d'ORYN assure un dosage constant pour un cycle complet.",
        },
        {
          question: "Ce stack est-il adapté aux blessures des articulations et des tendons ?",
          answer:
            "Les blessures articulaires et tendineuses sont parmi les applications les plus étudiées pour ce stack. BPC-157 a été étudié dans des modèles de tendons d'Achille sectionnés, tandis que TB-500 a montré une efficacité dans la réduction de l'inflammation articulaire dans des études animales.",
        },
      ],
    },
    de: {
      name: "Erholungs- & Reparatur-Stack",
      tagline: "Das klassische Heilungsduo für beschleunigte Gewebereparatur",
      description:
        "BPC-157 und TB-500 sind die zwei am umfangreichsten erforschten Peptide für Gewebereparatur und -regeneration. Dieser Stack kombiniert die magensäurederivaten Heilungseigenschaften von BPC-157 mit der Zellmigrations- und entzündungshemmenden Wirkung von TB-500 und schafft so ein umfassendes Erholungsprotokoll. Forscher weltweit kombinieren diese Peptide wegen ihrer komplementären Mechanismen — BPC-157 fördert Angiogenese und Wachstumsfaktorexpression, während TB-500 die Aktinregulation verbessert und Fibrose reduziert.",
      benefits: [
        "Synergistische Gewebereparatur durch doppelte Mechanismen",
        "Beschleunigte Wundheilung und verkürzte Erholungszeit",
        "Entzündungshemmende Wirkung auf Gelenke, Sehnen und Muskeln",
        "Unterstützt die Integrität der Darmschleimhaut",
        "Fördert Angiogenese für verbesserte Blutversorgung geschädigten Gewebes",
        "Reduziert Fibrose und Narbengewebebildung",
      ],
      protocol:
        "Das BPC-157 + TB-500 Erholungsprotokoll ist eines der am besten dokumentierten Peptid-Stacks in der Forschungsliteratur. Typische Protokolle beinhalten eine gleichzeitige Verabreichung über 4-8 Wochen, wobei BPC-157 auf die lokale Gewebereparatur über Stickstoffoxid-Modulation abzielt und TB-500 systemische entzündungshemmende und Zellmigrations-Unterstützung bietet.",
      faqs: [
        {
          question: "Warum gelten BPC-157 und TB-500 als der Goldstandard-Erholungs-Stack?",
          answer:
            "BPC-157 und TB-500 zielen auf komplementäre Heilungswege ab. BPC-157 fördert Angiogenese, Wachstumsfaktorexpression und Stickstoffoxidsynthese auf Gewebeebene, während TB-500 die Zellmigration verbessert, Entzündungen systemisch reduziert und die Aktinpolymerisation für strukturelle Reparatur fördert.",
        },
        {
          question: "Kann ich beide Peptide gleichzeitig verwenden?",
          answer:
            "Ja, die gleichzeitige Verabreichung ist das häufigste Forschungsprotokoll. Die beiden Verbindungen wirken durch unabhängige Mechanismen und beeinflussen sich nicht gegenseitig.",
        },
        {
          question: "Wie lange dauert ein typisches Erholungs-Stack-Protokoll?",
          answer:
            "Veröffentlichte Forschungsprotokolle laufen typischerweise 4-8 Wochen für akute Verletzungen und bis zu 12 Wochen für chronische Erkrankungen. ORYNs 30-Tage-Pen-System bietet konsistente Dosierung für einen vollständigen Zyklus.",
        },
        {
          question: "Ist dieser Stack für Gelenk- und Sehnenverletzungen geeignet?",
          answer:
            "Gelenk- und Sehnenverletzungen gehören zu den am meisten erforschten Anwendungen für diesen Stack. BPC-157 wurde in Modellen durchtretener Achillessehnen untersucht, während TB-500 in Tierstudien Wirksamkeit bei der Reduktion von Gelenkentzündungen gezeigt hat.",
        },
      ],
    },
    it: {
      name: "Stack Recupero & Riparazione",
      tagline: "Il classico duo di guarigione per una riparazione tissutale accelerata",
      description:
        "BPC-157 e TB-500 sono i due peptidi più ampiamente studiati per la riparazione e rigenerazione dei tessuti. Questo stack combina le proprietà curative di origine gastrica del BPC-157 con l'azione di migrazione cellulare e antinfiammatoria del TB-500, creando un protocollo di recupero completo. Ricercatori di tutto il mondo abbinano questi peptidi per i loro meccanismi complementari — BPC-157 promuove l'angiogenesi e l'espressione dei fattori di crescita mentre TB-500 potenzia la regolazione dell'actina e riduce la fibrosi.",
      benefits: [
        "Riparazione tissutale sinergica attraverso doppi meccanismi",
        "Guarigione accelerata delle ferite e tempo di recupero ridotto",
        "Azione antinfiammatoria su articolazioni, tendini e muscoli",
        "Supporta l'integrità del rivestimento intestinale",
        "Promuove l'angiogenesi per un miglior apporto ematico al tessuto danneggiato",
        "Riduce la fibrosi e la formazione di tessuto cicatriziale",
      ],
      protocol:
        "Il protocollo di recupero BPC-157 + TB-500 è uno degli stack peptidici più documentati nella letteratura di ricerca. I protocolli tipici prevedono la somministrazione concomitante per 4-8 settimane, con BPC-157 che mira alla riparazione tissutale locale tramite modulazione dell'ossido nitrico e TB-500 che fornisce supporto antinfiammatorio sistemico e di migrazione cellulare.",
      faqs: [
        {
          question: "Perché BPC-157 e TB-500 sono considerati lo stack di recupero standard?",
          answer:
            "BPC-157 e TB-500 agiscono su vie di guarigione complementari. BPC-157 promuove l'angiogenesi, l'espressione dei fattori di crescita e la sintesi di ossido nitrico a livello tissutale, mentre TB-500 migliora la migrazione cellulare, riduce l'infiammazione sistemicamente e promuove la polimerizzazione dell'actina.",
        },
        {
          question: "Posso usare entrambi i peptidi contemporaneamente?",
          answer:
            "Sì, la somministrazione concomitante è il protocollo di ricerca più comune. I due composti agiscono attraverso meccanismi indipendenti e non interferiscono tra loro.",
        },
        {
          question: "Quanto dura un tipico protocollo dello stack di recupero?",
          answer:
            "I protocolli di ricerca pubblicati durano tipicamente 4-8 settimane per lesioni acute e fino a 12 settimane per condizioni croniche. Il sistema di penna da 30 giorni di ORYN fornisce un dosaggio costante per un ciclo completo.",
        },
        {
          question: "Questo stack è adatto per lesioni articolari e tendinee?",
          answer:
            "Le lesioni articolari e tendinee sono tra le applicazioni più studiate per questo stack. BPC-157 è stato studiato in modelli di tendini d'Achille recisi, mentre TB-500 ha mostrato efficacia nella riduzione dell'infiammazione articolare in studi animali.",
        },
      ],
    },
    pt: {
      name: "Stack de Recuperação & Reparação",
      tagline: "O duo clássico de cura para reparação tecidual acelerada",
      description:
        "BPC-157 e TB-500 são os dois péptidos mais amplamente investigados para reparação e regeneração de tecidos. Este stack combina as propriedades curativas de origem gástrica do BPC-157 com a ação de migração celular e anti-inflamatória do TB-500, criando um protocolo de recuperação abrangente. Investigadores de todo o mundo associam estes péptidos pelos seus mecanismos complementares — BPC-157 promove a angiogénese e a expressão de fatores de crescimento enquanto TB-500 melhora a regulação da actina e reduz a fibrose.",
      benefits: [
        "Reparação tecidual sinérgica através de mecanismos duplos",
        "Cicatrização acelerada e tempo de recuperação reduzido",
        "Ação anti-inflamatória em articulações, tendões e músculos",
        "Apoia a integridade do revestimento intestinal e a cura da mucosa",
        "Promove a angiogénese para melhor suprimento sanguíneo ao tecido danificado",
        "Reduz a fibrose e a formação de tecido cicatricial",
      ],
      protocol:
        "O protocolo de recuperação BPC-157 + TB-500 é um dos stacks de péptidos mais documentados na literatura de investigação. Os protocolos típicos envolvem administração concomitante ao longo de 4-8 semanas, com BPC-157 direcionado à reparação tecidual local via modulação de óxido nítrico e TB-500 fornecendo suporte anti-inflamatório sistémico e de migração celular.",
      faqs: [
        {
          question: "Por que BPC-157 e TB-500 são considerados o stack de recuperação padrão ouro?",
          answer:
            "BPC-157 e TB-500 atuam em vias de cura complementares. BPC-157 promove angiogénese, expressão de fatores de crescimento e síntese de óxido nítrico a nível tecidual, enquanto TB-500 melhora a migração celular, reduz a inflamação sistemicamente e promove a polimerização da actina para reparação estrutural.",
        },
        {
          question: "Posso usar ambos os péptidos ao mesmo tempo?",
          answer:
            "Sim, a administração simultânea é o protocolo de investigação mais comum. Os dois compostos atuam por mecanismos independentes e não interferem entre si.",
        },
        {
          question: "Quanto tempo dura um protocolo típico do stack de recuperação?",
          answer:
            "Os protocolos publicados duram tipicamente 4-8 semanas para lesões agudas e até 12 semanas para condições crónicas. O sistema de caneta de 30 dias da ORYN fornece dosagem consistente para um ciclo completo.",
        },
        {
          question: "Este stack é adequado para lesões articulares e tendinosas?",
          answer:
            "Lesões articulares e tendinosas estão entre as aplicações mais investigadas para este stack. BPC-157 foi estudado em modelos de tendões de Aquiles seccionados, enquanto TB-500 mostrou eficácia na redução da inflamação articular em estudos animais.",
        },
      ],
    },
    nl: {
      name: "Herstel & Reparatie Stack",
      tagline: "Het klassieke genezingsduo voor versneld weefselherstel",
      description:
        "BPC-157 en TB-500 zijn de twee meest uitgebreid onderzochte peptiden voor weefselherstel en -regeneratie. Deze stack combineert de maagafgeleide genezeigenschappen van BPC-157 met de celmigratie en ontstekingsremmende werking van TB-500, waardoor een uitgebreid herstelprotocol ontstaat. Onderzoekers wereldwijd combineren deze peptiden vanwege hun complementaire mechanismen — BPC-157 bevordert angiogenese en groeifactorexpressie terwijl TB-500 actineregulatie verbetert en fibrose vermindert.",
      benefits: [
        "Synergetisch weefselherstel via dubbele mechanismen",
        "Versnelde wondgenezing en kortere hersteltijd",
        "Ontstekingsremmende werking op gewrichten, pezen en spieren",
        "Ondersteunt de integriteit van de darmwand en slijmvliesgenezing",
        "Bevordert angiogenese voor verbeterde bloedtoevoer naar beschadigd weefsel",
        "Vermindert fibrose en littekenweefselvorming",
      ],
      protocol:
        "Het BPC-157 + TB-500 herstelprotocol is een van de best gedocumenteerde peptidestacks in de onderzoeksliteratuur. Typische protocollen omvatten gelijktijdige toediening gedurende 4-8 weken, waarbij BPC-157 gericht is op lokaal weefselherstel via stikstofoxidemodulatie en TB-500 systemische ontstekingsremmende en celmigratie-ondersteuning biedt.",
      faqs: [
        {
          question: "Waarom worden BPC-157 en TB-500 beschouwd als de gouden standaard herstelstack?",
          answer:
            "BPC-157 en TB-500 richten zich op complementaire genezingsroutes. BPC-157 bevordert angiogenese, groeifactorexpressie en stikstofoxidesynthese op weefselniveau, terwijl TB-500 celmigratie verbetert, ontstekingen systemisch vermindert en actinepolymerisatie voor structureel herstel bevordert.",
        },
        {
          question: "Kan ik beide peptiden tegelijkertijd gebruiken?",
          answer:
            "Ja, gelijktijdige toediening is het meest voorkomende onderzoeksprotocol. De twee verbindingen werken via onafhankelijke mechanismen en interfereren niet met elkaar.",
        },
        {
          question: "Hoe lang duurt een typisch herstelstackprotocol?",
          answer:
            "Gepubliceerde onderzoeksprotocollen duren doorgaans 4-8 weken voor acute blessures en tot 12 weken voor chronische aandoeningen. Het 30-daagse pensysteem van ORYN biedt consistente dosering voor een volledige cyclus.",
        },
        {
          question: "Is deze stack geschikt voor gewrichts- en peesletsel?",
          answer:
            "Gewrichts- en peesletsels behoren tot de meest onderzochte toepassingen voor deze stack. BPC-157 is bestudeerd in modellen van doorgesneden achillespezen, terwijl TB-500 in dierstudies effectiviteit heeft aangetoond bij het verminderen van gewrichtsontsteking.",
        },
      ],
    },
    pl: {
      name: "Stack Regeneracji i Naprawy",
      tagline: "Klasyczny duet leczniczy dla przyspieszonej naprawy tkanek",
      description:
        "BPC-157 i TB-500 to dwa najszerzej badane peptydy w zakresie naprawy i regeneracji tkanek. Ten stack łączy gastropochodne właściwości lecznicze BPC-157 z działaniem migracji komórkowej i przeciwzapalnym TB-500, tworząc kompleksowy protokół regeneracyjny. Badacze na całym świecie łączą te peptydy ze względu na ich uzupełniające mechanizmy — BPC-157 promuje angiogenezę i ekspresję czynników wzrostu, podczas gdy TB-500 wzmacnia regulację aktyny i redukuje zwłóknienia.",
      benefits: [
        "Synergistyczna naprawa tkanek poprzez podwójne mechanizmy",
        "Przyspieszone gojenie ran i skrócony czas regeneracji",
        "Działanie przeciwzapalne na stawy, ścięgna i mięśnie",
        "Wspiera integralność wyściółki jelitowej i gojenie błon śluzowych",
        "Promuje angiogenezę dla lepszego ukrwienia uszkodzonej tkanki",
        "Redukuje zwłóknienia i tworzenie tkanki bliznowatej",
      ],
      protocol:
        "Protokół regeneracyjny BPC-157 + TB-500 jest jednym z najlepiej udokumentowanych stacków peptydowych w literaturze badawczej. Typowe protokoły obejmują jednoczesne podawanie przez 4-8 tygodni, gdzie BPC-157 ukierunkowany jest na lokalną naprawę tkanek poprzez modulację tlenku azotu, a TB-500 zapewnia systemowe wsparcie przeciwzapalne i migracji komórkowej.",
      faqs: [
        {
          question: "Dlaczego BPC-157 i TB-500 są uważane za złoty standard stacku regeneracyjnego?",
          answer:
            "BPC-157 i TB-500 działają na uzupełniające szlaki lecznicze. BPC-157 promuje angiogenezę, ekspresję czynników wzrostu i syntezę tlenku azotu na poziomie tkankowym, podczas gdy TB-500 poprawia migrację komórkową, systemowo redukuje stan zapalny i promuje polimeryzację aktyny dla naprawy strukturalnej.",
        },
        {
          question: "Czy mogę używać obu peptydów jednocześnie?",
          answer:
            "Tak, jednoczesne podawanie jest najczęstszym protokołem badawczym. Oba związki działają przez niezależne mechanizmy i nie interferują ze sobą.",
        },
        {
          question: "Jak długo trwa typowy protokół stacku regeneracyjnego?",
          answer:
            "Opublikowane protokoły badawcze trwają zazwyczaj 4-8 tygodni dla ostrych urazów i do 12 tygodni dla stanów przewlekłych. 30-dniowy system pióra ORYN zapewnia spójne dawkowanie przez pełny cykl.",
        },
        {
          question: "Czy ten stack jest odpowiedni dla urazów stawów i ścięgien?",
          answer:
            "Urazy stawów i ścięgien należą do najczęściej badanych zastosowań tego stacku. BPC-157 był badany w modelach przeciętych ścięgien Achillesa, podczas gdy TB-500 wykazał skuteczność w zmniejszaniu stanu zapalnego stawów w badaniach na zwierzętach.",
        },
      ],
    },
  },
  "anti-aging-stack": {
    en: {
      name: "Anti-Aging & Longevity Stack",
      tagline: "Triple-compound longevity protocol for cellular renewal",
      description:
        "This comprehensive anti-aging stack combines three powerhouse compounds targeting distinct aging pathways. GHK-Cu stimulates collagen synthesis and tissue remodelling, NAD+ fuels cellular energy production and DNA repair, and Glutathione provides master antioxidant defence against oxidative damage. Together, these three compounds address the structural, energetic, and protective dimensions of biological aging. Researchers studying longevity increasingly recognise that multi-pathway interventions yield superior outcomes compared to single-compound approaches.",
      benefits: [
        "Collagen synthesis and skin elasticity restoration via GHK-Cu",
        "Cellular energy production and mitochondrial support via NAD+",
        "Master antioxidant defence and detoxification via Glutathione",
        "DNA repair pathway activation for genomic integrity",
        "Skin brightening, rejuvenation, and anti-wrinkle properties",
        "Neuroprotective and cognitive function support",
      ],
      protocol:
        "The anti-aging triple stack targets three distinct hallmarks of aging simultaneously. GHK-Cu addresses extracellular matrix degradation by stimulating collagen and elastin production, while NAD+ replenishes the coenzyme critical for sirtuin activation, mitochondrial function, and DNA repair. Glutathione counters the cumulative oxidative stress that drives cellular senescence. Research protocols typically stagger administration — GHK-Cu in the morning, Glutathione midday, and NAD+ in the evening — to optimise each compound's pharmacokinetics.",
      faqs: [
        {
          question: "Why combine three compounds for anti-aging research?",
          answer:
            "Aging is a multi-factorial process involving structural degradation (collagen loss), energy decline (NAD+ depletion), and oxidative damage (glutathione depletion). Addressing all three pathways simultaneously produces synergistic benefits that single-compound approaches cannot match.",
        },
        {
          question: "What does NAD+ do for aging?",
          answer:
            "NAD+ levels decline by up to 50% between ages 40 and 60. This coenzyme is essential for sirtuin activation (the 'longevity genes'), mitochondrial energy production, and PARP-mediated DNA repair. Restoring NAD+ levels is one of the most actively researched anti-aging interventions.",
        },
        {
          question: "How does GHK-Cu complement the other compounds?",
          answer:
            "GHK-Cu works on the structural level — stimulating collagen, elastin, and glycosaminoglycan production while NAD+ and Glutathione work at the cellular level. GHK-Cu also has its own antioxidant and anti-inflammatory properties, creating additional synergy with Glutathione's detoxification pathways.",
        },
        {
          question: "Is there a recommended order of administration?",
          answer:
            "Many researchers stagger administration throughout the day. A common protocol is GHK-Cu in the morning, Glutathione midday, and NAD+ in the evening (as NAD+ metabolism is linked to circadian rhythms). However, some protocols administer all three at the same time without reported issues.",
        },
      ],
    },
    es: {
      name: "Pack Antienvejecimiento y Longevidad",
      tagline: "Protocolo triple de longevidad para la renovación celular",
      description:
        "Este completo pack antienvejecimiento combina tres compuestos potentes que actúan sobre distintas vías del envejecimiento. GHK-Cu estimula la síntesis de colágeno y la remodelación tisular, NAD+ impulsa la producción de energía celular y la reparación del ADN, y el Glutatión proporciona la defensa antioxidante maestra contra el daño oxidativo. Juntos, estos tres compuestos abordan las dimensiones estructural, energética y protectora del envejecimiento biológico.",
      benefits: [
        "Síntesis de colágeno y restauración de la elasticidad cutánea mediante GHK-Cu",
        "Producción de energía celular y soporte mitocondrial mediante NAD+",
        "Defensa antioxidante maestra y desintoxicación mediante Glutatión",
        "Activación de vías de reparación del ADN para la integridad genómica",
        "Propiedades de luminosidad cutánea, rejuvenecimiento y antiarrugas",
        "Soporte neuroprotector y de función cognitiva",
      ],
      protocol:
        "El triple stack antienvejecimiento actúa sobre tres marcadores distintos del envejecimiento simultáneamente. GHK-Cu aborda la degradación de la matriz extracelular estimulando la producción de colágeno y elastina, mientras que NAD+ repone la coenzima crítica para la activación de las sirtuinas, la función mitocondrial y la reparación del ADN. El Glutatión contrarresta el estrés oxidativo acumulado que impulsa la senescencia celular.",
      faqs: [
        {
          question: "¿Por qué combinar tres compuestos para la investigación antienvejecimiento?",
          answer:
            "El envejecimiento es un proceso multifactorial que involucra degradación estructural (pérdida de colágeno), declive energético (agotamiento de NAD+) y daño oxidativo (agotamiento de glutatión). Abordar las tres vías simultáneamente produce beneficios sinérgicos que los enfoques de un solo compuesto no pueden igualar.",
        },
        {
          question: "¿Qué hace el NAD+ para el envejecimiento?",
          answer:
            "Los niveles de NAD+ disminuyen hasta un 50% entre los 40 y los 60 años. Esta coenzima es esencial para la activación de las sirtuinas ('genes de la longevidad'), la producción de energía mitocondrial y la reparación del ADN mediada por PARP.",
        },
        {
          question: "¿Cómo complementa GHK-Cu a los otros compuestos?",
          answer:
            "GHK-Cu actúa a nivel estructural estimulando la producción de colágeno, elastina y glucosaminoglicanos, mientras que NAD+ y Glutatión actúan a nivel celular. GHK-Cu también tiene propiedades antioxidantes y antiinflamatorias propias, creando sinergia adicional con las vías de desintoxicación del Glutatión.",
        },
        {
          question: "¿Existe un orden de administración recomendado?",
          answer:
            "Muchos investigadores escalonan la administración a lo largo del día. Un protocolo común es GHK-Cu por la mañana, Glutatión al mediodía y NAD+ por la noche, ya que el metabolismo del NAD+ está vinculado a los ritmos circadianos.",
        },
      ],
    },
    fr: {
      name: "Pack Anti-Âge & Longévité",
      tagline: "Protocole de longévité triple pour le renouvellement cellulaire",
      description:
        "Ce pack anti-âge complet combine trois composés puissants ciblant des voies de vieillissement distinctes. GHK-Cu stimule la synthèse du collagène et le remodelage tissulaire, NAD+ alimente la production d'énergie cellulaire et la réparation de l'ADN, et le Glutathion fournit la défense antioxydante maîtresse contre les dommages oxydatifs. Ensemble, ces trois composés traitent les dimensions structurelles, énergétiques et protectrices du vieillissement biologique.",
      benefits: [
        "Synthèse du collagène et restauration de l'élasticité cutanée via GHK-Cu",
        "Production d'énergie cellulaire et soutien mitochondrial via NAD+",
        "Défense antioxydante maîtresse et détoxification via Glutathion",
        "Activation des voies de réparation de l'ADN pour l'intégrité génomique",
        "Propriétés d'éclat cutané, de rajeunissement et anti-rides",
        "Soutien neuroprotecteur et de la fonction cognitive",
      ],
      protocol:
        "Le triple stack anti-âge cible trois caractéristiques distinctes du vieillissement simultanément. GHK-Cu traite la dégradation de la matrice extracellulaire en stimulant la production de collagène et d'élastine, tandis que NAD+ reconstitue la coenzyme critique pour l'activation des sirtuines, la fonction mitochondriale et la réparation de l'ADN.",
      faqs: [
        {
          question: "Pourquoi combiner trois composés pour la recherche anti-âge ?",
          answer:
            "Le vieillissement est un processus multifactoriel impliquant une dégradation structurelle (perte de collagène), un déclin énergétique (déplétion en NAD+) et des dommages oxydatifs (déplétion en glutathion). Traiter les trois voies simultanément produit des effets synergiques inégalés par les approches à composé unique.",
        },
        {
          question: "Que fait NAD+ pour le vieillissement ?",
          answer:
            "Les niveaux de NAD+ diminuent jusqu'à 50% entre 40 et 60 ans. Cette coenzyme est essentielle à l'activation des sirtuines (les 'gènes de la longévité'), à la production d'énergie mitochondriale et à la réparation de l'ADN médiée par PARP.",
        },
        {
          question: "Comment GHK-Cu complète-t-il les autres composés ?",
          answer:
            "GHK-Cu agit au niveau structural en stimulant la production de collagène, d'élastine et de glycosaminoglycanes tandis que NAD+ et Glutathion agissent au niveau cellulaire. GHK-Cu possède également ses propres propriétés antioxydantes et anti-inflammatoires.",
        },
        {
          question: "Y a-t-il un ordre d'administration recommandé ?",
          answer:
            "De nombreux chercheurs échelonnent l'administration tout au long de la journée. Un protocole courant est GHK-Cu le matin, Glutathion à midi et NAD+ le soir, car le métabolisme du NAD+ est lié aux rythmes circadiens.",
        },
      ],
    },
    de: {
      name: "Anti-Aging & Langlebigkeits-Stack",
      tagline: "Dreifach-Verbindungs-Langlebigkeitsprotokoll für zelluläre Erneuerung",
      description:
        "Dieser umfassende Anti-Aging-Stack kombiniert drei leistungsstarke Verbindungen, die auf unterschiedliche Alterungspfade abzielen. GHK-Cu stimuliert die Kollagensynthese und Gewebeumbau, NAD+ treibt die zelluläre Energieproduktion und DNA-Reparatur an, und Glutathion bietet den Hauptantioxidationsschutz gegen oxidative Schäden. Zusammen adressieren diese drei Verbindungen die strukturellen, energetischen und schützenden Dimensionen des biologischen Alterns.",
      benefits: [
        "Kollagensynthese und Wiederherstellung der Hautelastizität durch GHK-Cu",
        "Zelluläre Energieproduktion und mitochondriale Unterstützung durch NAD+",
        "Hauptantioxidationsschutz und Entgiftung durch Glutathion",
        "Aktivierung von DNA-Reparaturwegen für genomische Integrität",
        "Hautaufhellung, Verjüngung und Anti-Falten-Eigenschaften",
        "Neuroprotektive und kognitive Funktionsunterstützung",
      ],
      protocol:
        "Der Anti-Aging-Dreifach-Stack zielt gleichzeitig auf drei unterschiedliche Altersmerkmale ab. GHK-Cu behandelt den extrazellulären Matrixabbau durch Stimulierung der Kollagen- und Elastinproduktion, während NAD+ das Coenzym ergänzt, das für die Sirtuin-Aktivierung, Mitochondrienfunktion und DNA-Reparatur entscheidend ist.",
      faqs: [
        {
          question: "Warum drei Verbindungen für Anti-Aging-Forschung kombinieren?",
          answer:
            "Altern ist ein multifaktorieller Prozess, der strukturellen Abbau (Kollagenverlust), Energierückgang (NAD+-Depletion) und oxidative Schäden (Glutathion-Depletion) beinhaltet. Das gleichzeitige Adressieren aller drei Wege produziert synergistische Vorteile, die Einzelverbindungsansätze nicht erreichen können.",
        },
        {
          question: "Was bewirkt NAD+ beim Altern?",
          answer:
            "NAD+-Spiegel sinken zwischen 40 und 60 Jahren um bis zu 50%. Dieses Coenzym ist essentiell für die Sirtuin-Aktivierung (die 'Langlebigkeitsgene'), die mitochondriale Energieproduktion und die PARP-vermittelte DNA-Reparatur.",
        },
        {
          question: "Wie ergänzt GHK-Cu die anderen Verbindungen?",
          answer:
            "GHK-Cu wirkt auf struktureller Ebene und stimuliert die Produktion von Kollagen, Elastin und Glykosaminoglykanen, während NAD+ und Glutathion auf zellulärer Ebene wirken.",
        },
        {
          question: "Gibt es eine empfohlene Reihenfolge der Verabreichung?",
          answer:
            "Viele Forscher staffeln die Verabreichung über den Tag. Ein gängiges Protokoll ist GHK-Cu morgens, Glutathion mittags und NAD+ abends, da der NAD+-Stoffwechsel mit circadianen Rhythmen verbunden ist.",
        },
      ],
    },
    it: {
      name: "Stack Anti-Età & Longevità",
      tagline: "Protocollo di longevità a triplo composto per il rinnovamento cellulare",
      description:
        "Questo completo stack anti-età combina tre composti potenti che agiscono su distinte vie dell'invecchiamento. GHK-Cu stimola la sintesi del collagene e il rimodellamento tissutale, NAD+ alimenta la produzione di energia cellulare e la riparazione del DNA, e il Glutatione fornisce la difesa antiossidante principale contro i danni ossidativi.",
      benefits: [
        "Sintesi del collagene e ripristino dell'elasticità cutanea tramite GHK-Cu",
        "Produzione di energia cellulare e supporto mitocondriale tramite NAD+",
        "Difesa antiossidante principale e disintossicazione tramite Glutatione",
        "Attivazione delle vie di riparazione del DNA per l'integrità genomica",
        "Proprietà di luminosità cutanea, ringiovanimento e anti-rughe",
        "Supporto neuroprotettivo e della funzione cognitiva",
      ],
      protocol:
        "Il triplo stack anti-età agisce su tre distinti segni distintivi dell'invecchiamento simultaneamente. GHK-Cu affronta la degradazione della matrice extracellulare stimolando la produzione di collagene ed elastina, mentre NAD+ reintegra il coenzima fondamentale per l'attivazione delle sirtuine, la funzione mitocondriale e la riparazione del DNA.",
      faqs: [
        {
          question: "Perché combinare tre composti per la ricerca anti-età?",
          answer:
            "L'invecchiamento è un processo multifattoriale che coinvolge degradazione strutturale (perdita di collagene), declino energetico (deplezione di NAD+) e danni ossidativi (deplezione di glutatione). Affrontare tutte e tre le vie simultaneamente produce benefici sinergici che gli approcci a singolo composto non possono eguagliare.",
        },
        {
          question: "Cosa fa NAD+ per l'invecchiamento?",
          answer:
            "I livelli di NAD+ diminuiscono fino al 50% tra i 40 e i 60 anni. Questo coenzima è essenziale per l'attivazione delle sirtuine (i 'geni della longevità'), la produzione di energia mitocondriale e la riparazione del DNA mediata da PARP.",
        },
        {
          question: "Come si integra GHK-Cu con gli altri composti?",
          answer:
            "GHK-Cu agisce a livello strutturale stimolando la produzione di collagene, elastina e glicosaminoglicani mentre NAD+ e Glutatione agiscono a livello cellulare.",
        },
        {
          question: "Esiste un ordine di somministrazione raccomandato?",
          answer:
            "Molti ricercatori scaglionano la somministrazione durante il giorno. Un protocollo comune è GHK-Cu al mattino, Glutatione a mezzogiorno e NAD+ la sera, poiché il metabolismo del NAD+ è legato ai ritmi circadiani.",
        },
      ],
    },
    pt: {
      name: "Stack Anti-Envelhecimento & Longevidade",
      tagline: "Protocolo de longevidade triple para renovação celular",
      description:
        "Este abrangente stack anti-envelhecimento combina três compostos poderosos que atuam em vias de envelhecimento distintas. GHK-Cu estimula a síntese de colagénio e o remodelamento tecidual, NAD+ alimenta a produção de energia celular e a reparação do ADN, e o Glutatião fornece a defesa antioxidante mestre contra danos oxidativos.",
      benefits: [
        "Síntese de colagénio e restauração da elasticidade cutânea via GHK-Cu",
        "Produção de energia celular e suporte mitocondrial via NAD+",
        "Defesa antioxidante mestre e desintoxicação via Glutatião",
        "Ativação de vias de reparação do ADN para integridade genómica",
        "Propriedades de luminosidade cutânea, rejuvenescimento e antirrugas",
        "Suporte neuroprotector e da função cognitiva",
      ],
      protocol:
        "O triple stack anti-envelhecimento atua em três características distintas do envelhecimento simultaneamente. GHK-Cu aborda a degradação da matriz extracelular estimulando a produção de colagénio e elastina, enquanto NAD+ repõe a coenzima crítica para a ativação das sirtuínas, função mitocondrial e reparação do ADN.",
      faqs: [
        {
          question: "Por que combinar três compostos para pesquisa anti-envelhecimento?",
          answer:
            "O envelhecimento é um processo multifatorial envolvendo degradação estrutural (perda de colagénio), declínio energético (depleção de NAD+) e danos oxidativos (depleção de glutatião). Abordar as três vias simultaneamente produz benefícios sinérgicos que abordagens de composto único não conseguem igualar.",
        },
        {
          question: "O que faz o NAD+ pelo envelhecimento?",
          answer:
            "Os níveis de NAD+ diminuem até 50% entre os 40 e os 60 anos. Esta coenzima é essencial para a ativação das sirtuínas (os 'genes da longevidade'), produção de energia mitocondrial e reparação do ADN mediada por PARP.",
        },
        {
          question: "Como o GHK-Cu complementa os outros compostos?",
          answer:
            "GHK-Cu atua a nível estrutural estimulando a produção de colagénio, elastina e glicosaminoglicanos enquanto NAD+ e Glutatião atuam a nível celular.",
        },
        {
          question: "Existe uma ordem de administração recomendada?",
          answer:
            "Muitos investigadores escalonam a administração ao longo do dia. Um protocolo comum é GHK-Cu de manhã, Glutatião ao meio-dia e NAD+ à noite, pois o metabolismo do NAD+ está ligado aos ritmos circadianos.",
        },
      ],
    },
    nl: {
      name: "Anti-Veroudering & Levensduur Stack",
      tagline: "Drievoudig-verbinding levensduurprotocol voor cellulaire vernieuwing",
      description:
        "Deze uitgebreide anti-verouderingsstack combineert drie krachtige verbindingen die zich richten op verschillende verouderingsroutes. GHK-Cu stimuleert de collageensynthese en weefselremodellering, NAD+ voedt cellulaire energieproductie en DNA-herstel, en Glutathion biedt de meester antioxidantverdediging tegen oxidatieve schade.",
      benefits: [
        "Collageensynthese en herstel van huidelasticiteit via GHK-Cu",
        "Cellulaire energieproductie en mitochondriale ondersteuning via NAD+",
        "Meester antioxidantverdediging en ontgifting via Glutathion",
        "Activering van DNA-herstelwegen voor genomische integriteit",
        "Huidverhelderende, verjongende en anti-rimpel eigenschappen",
        "Neuroprotectieve en cognitieve functieondersteuning",
      ],
      protocol:
        "De anti-veroudering driedubbele stack richt zich tegelijkertijd op drie onderscheiden kenmerken van veroudering. GHK-Cu pakt extracellulair matrixafbraak aan door de productie van collageen en elastine te stimuleren, terwijl NAD+ het co-enzym aanvult dat essentieel is voor sirtuïneactivering, mitochondriale functie en DNA-herstel.",
      faqs: [
        {
          question: "Waarom drie verbindingen combineren voor anti-verouderingsonderzoek?",
          answer:
            "Veroudering is een multifactorieel proces waarbij structurele afbraak (collageenverlies), energiedaling (NAD+-depletie) en oxidatieve schade (glutathion-depletie) betrokken zijn. Het gelijktijdig aanpakken van alle drie wegen produceert synergistische voordelen die enkelvoudige verbindingsbenaderingen niet kunnen evenaren.",
        },
        {
          question: "Wat doet NAD+ voor veroudering?",
          answer:
            "NAD+-niveaus dalen met tot 50% tussen de leeftijd van 40 en 60 jaar. Dit co-enzym is essentieel voor sirtuïneactivering (de 'levensduurgen'), mitochondriale energieproductie en PARP-gemedieerd DNA-herstel.",
        },
        {
          question: "Hoe complementeert GHK-Cu de andere verbindingen?",
          answer:
            "GHK-Cu werkt op structureel niveau en stimuleert de productie van collageen, elastine en glycosaminoglycanen terwijl NAD+ en Glutathion op cellulair niveau werken.",
        },
        {
          question: "Is er een aanbevolen volgorde van toediening?",
          answer:
            "Veel onderzoekers spreiden de toediening over de dag. Een veelvoorkomend protocol is GHK-Cu 's ochtends, Glutathion 's middags en NAD+ 's avonds, omdat het NAD+-metabolisme gekoppeld is aan circadiane ritmen.",
        },
      ],
    },
    pl: {
      name: "Stack Anti-Aging i Długowieczności",
      tagline: "Protokół długowieczności z potrójnym związkiem dla odnowy komórkowej",
      description:
        "Ten kompleksowy stack anti-aging łączy trzy silne związki działające na odrębne szlaki starzenia. GHK-Cu stymuluje syntezę kolagenu i przebudowę tkanek, NAD+ napędza produkcję energii komórkowej i naprawę DNA, a Glutation zapewnia główną obronę antyoksydacyjną przed uszkodzeniami oksydacyjnymi.",
      benefits: [
        "Synteza kolagenu i przywracanie elastyczności skóry przez GHK-Cu",
        "Produkcja energii komórkowej i wsparcie mitochondrialne przez NAD+",
        "Główna obrona antyoksydacyjna i detoksykacja przez Glutation",
        "Aktywacja szlaków naprawy DNA dla integralności genomowej",
        "Właściwości rozjaśniające skórę, odmładzające i przeciwzmarszczkowe",
        "Wsparcie neuroprotekcyjne i funkcji poznawczych",
      ],
      protocol:
        "Potrójny stack anti-aging celuje jednocześnie w trzy odrębne cechy starzenia. GHK-Cu zajmuje się degradacją macierzy zewnątrzkomórkowej poprzez stymulację produkcji kolagenu i elastyny, podczas gdy NAD+ uzupełnia koenzym kluczowy dla aktywacji syrtuin, funkcji mitochondrialnej i naprawy DNA.",
      faqs: [
        {
          question: "Dlaczego łączyć trzy związki w badaniach anti-aging?",
          answer:
            "Starzenie jest procesem wieloczynnikowym obejmującym degradację strukturalną (utratę kolagenu), spadek energetyczny (wyczerpanie NAD+) i uszkodzenia oksydacyjne (wyczerpanie glutationu). Jednoczesne działanie na wszystkie trzy szlaki daje synergistyczne korzyści, których nie mogą osiągnąć podejścia jednokomponentowe.",
        },
        {
          question: "Co NAD+ robi dla starzenia?",
          answer:
            "Poziomy NAD+ spadają o nawet 50% między 40 a 60 rokiem życia. Ten koenzym jest niezbędny do aktywacji syrtuin ('genów długowieczności'), produkcji energii mitochondrialnej i naprawy DNA za pośrednictwem PARP.",
        },
        {
          question: "Jak GHK-Cu uzupełnia pozostałe związki?",
          answer:
            "GHK-Cu działa na poziomie strukturalnym, stymulując produkcję kolagenu, elastyny i glikozaminoglikanów, podczas gdy NAD+ i Glutation działają na poziomie komórkowym.",
        },
        {
          question: "Czy istnieje zalecana kolejność podawania?",
          answer:
            "Wielu badaczy rozłoża podawanie w ciągu dnia. Popularny protokół to GHK-Cu rano, Glutation w południe i NAD+ wieczorem, ponieważ metabolizm NAD+ jest powiązany z rytmami dobowymi.",
        },
      ],
    },
  },
  "gh-stack": {
    en: {
      name: "Growth Hormone Stack",
      tagline: "Dual-pathway GH optimisation for peak performance",
      description:
        "The CJC-1295 and Ipamorelin combination is the most widely researched growth hormone secretagogue stack. CJC-1295 mimics GHRH to provide sustained GH elevation, while Ipamorelin triggers targeted GH pulses through the ghrelin receptor without affecting cortisol or prolactin. This dual-pathway approach amplifies natural growth hormone release far beyond what either peptide achieves alone. Researchers favour this combination for its clean hormonal profile and predictable, dose-dependent GH response.",
      benefits: [
        "Amplified natural growth hormone release through dual pathways",
        "Promotes lean body composition and muscle preservation",
        "Deep, restorative sleep enhancement via GH pulse optimisation",
        "Accelerated recovery between training sessions",
        "Supports bone density and joint health",
        "Clean hormonal profile — no cortisol or prolactin elevation",
      ],
      protocol:
        "The CJC-1295 + Ipamorelin protocol leverages two distinct GH-releasing pathways for synergistic elevation. CJC-1295 acts as a GHRH analogue, providing a sustained baseline elevation of growth hormone, while Ipamorelin triggers additional targeted GH pulses via the ghrelin receptor. Most research protocols administer both peptides together in the evening, 30-60 minutes before sleep, to synchronise with the body's natural nocturnal GH surge.",
      faqs: [
        {
          question: "Why combine CJC-1295 with Ipamorelin instead of using one alone?",
          answer:
            "CJC-1295 and Ipamorelin work through completely different receptors — GHRH and ghrelin, respectively. CJC-1295 provides a sustained GH baseline elevation while Ipamorelin triggers sharp, targeted GH pulses. Together, they produce a synergistic GH response significantly greater than either peptide alone.",
        },
        {
          question: "Will this stack affect cortisol or other hormones?",
          answer:
            "One of the key advantages of the CJC-1295 + Ipamorelin combination is its selectivity. Ipamorelin is one of the most selective GH secretagogues available, stimulating GH release without significantly elevating cortisol, prolactin, or ACTH.",
        },
        {
          question: "When is the best time to administer this stack?",
          answer:
            "Most research protocols recommend evening administration, 30-60 minutes before sleep. This timing aligns with the body's natural circadian GH pattern, as the largest growth hormone pulses occur during deep slow-wave sleep. Fasted administration is generally preferred.",
        },
      ],
    },
    es: {
      name: "Stack de Hormona de Crecimiento",
      tagline: "Optimización de GH de doble vía para el máximo rendimiento",
      description:
        "La combinación de CJC-1295 e Ipamorelin es el stack de secretagogos de hormona de crecimiento más ampliamente investigado. CJC-1295 imita el GHRH para proporcionar una elevación sostenida de GH, mientras que Ipamorelin desencadena pulsos de GH dirigidos a través del receptor de ghrelina sin afectar al cortisol o la prolactina. Este enfoque de doble vía amplifica la liberación natural de hormona de crecimiento mucho más allá de lo que cada péptido logra por sí solo.",
      benefits: [
        "Amplificación de la liberación natural de hormona de crecimiento mediante doble vía",
        "Promueve la composición corporal magra y la preservación muscular",
        "Mejora del sueño profundo y restaurador mediante la optimización de los pulsos de GH",
        "Recuperación acelerada entre sesiones de entrenamiento",
        "Apoya la densidad ósea y la salud articular",
        "Perfil hormonal limpio: sin elevación de cortisol ni prolactina",
      ],
      protocol:
        "El protocolo CJC-1295 + Ipamorelin aprovecha dos vías distintas de liberación de GH para una elevación sinérgica. CJC-1295 actúa como análogo del GHRH, proporcionando una elevación basal sostenida de la hormona de crecimiento, mientras que Ipamorelin desencadena pulsos adicionales dirigidos de GH a través del receptor de ghrelina. La mayoría de los protocolos administran ambos péptidos juntos por la noche, 30-60 minutos antes de dormir.",
      faqs: [
        {
          question: "¿Por qué combinar CJC-1295 con Ipamorelin en lugar de usar uno solo?",
          answer:
            "CJC-1295 e Ipamorelin actúan a través de receptores completamente diferentes — GHRH y ghrelina, respectivamente. CJC-1295 proporciona una elevación basal sostenida de GH mientras que Ipamorelin desencadena pulsos agudos y dirigidos de GH. Juntos producen una respuesta sinérgica de GH significativamente mayor que la de cada péptido por sí solo.",
        },
        {
          question: "¿Afectará este stack al cortisol u otras hormonas?",
          answer:
            "Una de las principales ventajas de la combinación CJC-1295 + Ipamorelin es su selectividad. Ipamorelin es uno de los secretagogos de GH más selectivos disponibles, estimulando la liberación de GH sin elevar significativamente el cortisol, la prolactina o la ACTH.",
        },
        {
          question: "¿Cuál es el mejor momento para administrar este stack?",
          answer:
            "La mayoría de los protocolos recomiendan la administración nocturna, 30-60 minutos antes de dormir. Este momento se alinea con el patrón circadiano natural de GH del cuerpo, ya que los mayores pulsos de hormona de crecimiento ocurren durante el sueño profundo de ondas lentas.",
        },
      ],
    },
    fr: {
      name: "Stack Hormone de Croissance",
      tagline: "Optimisation de la GH à double voie pour des performances optimales",
      description:
        "La combinaison CJC-1295 et Ipamorelin est le stack sécrétanogue d'hormone de croissance le plus largement étudié. CJC-1295 mime le GHRH pour fournir une élévation soutenue de la GH, tandis qu'Ipamorelin déclenche des impulsions de GH ciblées via le récepteur de la ghréline sans affecter le cortisol ou la prolactine.",
      benefits: [
        "Amplification de la libération naturelle d'hormone de croissance via double voie",
        "Favorise la composition corporelle maigre et la préservation musculaire",
        "Amélioration du sommeil profond et réparateur via l'optimisation des impulsions GH",
        "Récupération accélérée entre les séances d'entraînement",
        "Soutient la densité osseuse et la santé articulaire",
        "Profil hormonal propre — pas d'élévation du cortisol ou de la prolactine",
      ],
      protocol:
        "Le protocole CJC-1295 + Ipamorelin exploite deux voies distinctes de libération de GH pour une élévation synergique. CJC-1295 agit comme analogue du GHRH en fournissant une élévation de base soutenue de l'hormone de croissance, tandis qu'Ipamorelin déclenche des impulsions GH supplémentaires ciblées via le récepteur de la ghréline.",
      faqs: [
        {
          question: "Pourquoi combiner CJC-1295 avec Ipamorelin plutôt que d'en utiliser un seul ?",
          answer:
            "CJC-1295 et Ipamorelin agissent via des récepteurs complètement différents — GHRH et ghréline respectivement. CJC-1295 fournit une élévation de base soutenue de GH tandis qu'Ipamorelin déclenche des impulsions GH ciblées nettes. Ensemble, ils produisent une réponse GH synergique significativement supérieure à celle de chaque peptide seul.",
        },
        {
          question: "Ce stack affectera-t-il le cortisol ou d'autres hormones ?",
          answer:
            "L'un des principaux avantages de la combinaison CJC-1295 + Ipamorelin est sa sélectivité. Ipamorelin est l'un des sécrétanogues GH les plus sélectifs disponibles, stimulant la libération de GH sans élever significativement le cortisol, la prolactine ou l'ACTH.",
        },
        {
          question: "Quel est le meilleur moment pour administrer ce stack ?",
          answer:
            "La plupart des protocoles recommandent l'administration en soirée, 30 à 60 minutes avant le sommeil. Ce moment s'aligne avec le schéma GH circadien naturel du corps, car les plus grandes impulsions d'hormone de croissance se produisent pendant le sommeil lent profond.",
        },
      ],
    },
    de: {
      name: "Wachstumshormon-Stack",
      tagline: "Doppelweg-GH-Optimierung für Höchstleistung",
      description:
        "Die Kombination CJC-1295 und Ipamorelin ist der am häufigsten erforschte Wachstumshormon-Sekretagog-Stack. CJC-1295 ahmt GHRH nach, um eine anhaltende GH-Erhöhung zu liefern, während Ipamorelin gezielte GH-Pulse über den Ghrelin-Rezeptor auslöst, ohne Cortisol oder Prolaktin zu beeinflussen.",
      benefits: [
        "Verstärkte natürliche Wachstumshormonfreisetzung durch doppelte Wege",
        "Fördert schlanke Körperzusammensetzung und Muskelerhalt",
        "Tiefen, erholsamen Schlaf durch GH-Puls-Optimierung",
        "Beschleunigte Erholung zwischen Trainingseinheiten",
        "Unterstützt Knochendichte und Gelenkgesundheit",
        "Sauberes Hormomprofil — keine Cortisol- oder Prolaktin-Erhöhung",
      ],
      protocol:
        "Das CJC-1295 + Ipamorelin-Protokoll nutzt zwei unterschiedliche GH-freisetzende Wege für synergistische Erhöhung. CJC-1295 wirkt als GHRH-Analogon und liefert eine anhaltende Basalerhöhung des Wachstumshormons, während Ipamorelin zusätzliche gezielte GH-Pulse über den Ghrelin-Rezeptor auslöst.",
      faqs: [
        {
          question: "Warum CJC-1295 mit Ipamorelin kombinieren statt eines allein zu verwenden?",
          answer:
            "CJC-1295 und Ipamorelin wirken über völlig verschiedene Rezeptoren — GHRH bzw. Ghrelin. CJC-1295 liefert eine anhaltende GH-Basiserhöhung, während Ipamorelin scharfe, gezielte GH-Pulse auslöst. Zusammen produzieren sie eine synergistische GH-Reaktion, die deutlich größer ist als die jedes einzelnen Peptids.",
        },
        {
          question: "Wird dieser Stack Cortisol oder andere Hormone beeinflussen?",
          answer:
            "Einer der Hauptvorteile der CJC-1295 + Ipamorelin-Kombination ist ihre Selektivität. Ipamorelin ist einer der selektivsten verfügbaren GH-Sekretagoge und stimuliert die GH-Freisetzung ohne signifikante Erhöhung von Cortisol, Prolaktin oder ACTH.",
        },
        {
          question: "Wann ist der beste Zeitpunkt für die Verabreichung dieses Stacks?",
          answer:
            "Die meisten Forschungsprotokolle empfehlen die abendliche Verabreichung, 30-60 Minuten vor dem Schlafen. Dieses Timing entspricht dem natürlichen circadianen GH-Muster des Körpers.",
        },
      ],
    },
    it: {
      name: "Stack Ormone della Crescita",
      tagline: "Ottimizzazione GH a doppia via per le massime prestazioni",
      description:
        "La combinazione CJC-1295 e Ipamorelin è lo stack di secretagoghi dell'ormone della crescita più ampiamente studiato. CJC-1295 mima il GHRH per fornire un'elevazione sostenuta di GH, mentre Ipamorelin innesca impulsi di GH mirati attraverso il recettore della ghrelina senza influenzare il cortisolo o la prolattina.",
      benefits: [
        "Amplificazione del rilascio naturale di ormone della crescita attraverso doppia via",
        "Promuove la composizione corporea magra e la conservazione muscolare",
        "Miglioramento del sonno profondo e ristoratore tramite ottimizzazione degli impulsi GH",
        "Recupero accelerato tra le sessioni di allenamento",
        "Supporta la densità ossea e la salute articolare",
        "Profilo ormonale pulito — nessuna elevazione di cortisolo o prolattina",
      ],
      protocol:
        "Il protocollo CJC-1295 + Ipamorelin sfrutta due distinte vie di rilascio di GH per un'elevazione sinergica. CJC-1295 agisce come analogo del GHRH, fornendo un'elevazione basale sostenuta dell'ormone della crescita, mentre Ipamorelin innesca impulsi GH aggiuntivi mirati tramite il recettore della ghrelina.",
      faqs: [
        {
          question: "Perché combinare CJC-1295 con Ipamorelin invece di usarne uno solo?",
          answer:
            "CJC-1295 e Ipamorelin agiscono attraverso recettori completamente diversi — GHRH e ghrelina rispettivamente. CJC-1295 fornisce un'elevazione basale sostenuta di GH mentre Ipamorelin innesca impulsi GH mirati acuti. Insieme producono una risposta GH sinergica significativamente superiore a quella di ciascun peptide da solo.",
        },
        {
          question: "Questo stack influenzerà il cortisolo o altri ormoni?",
          answer:
            "Uno dei principali vantaggi della combinazione CJC-1295 + Ipamorelin è la sua selettività. Ipamorelin è uno dei secretagoghi GH più selettivi disponibili, stimolando il rilascio di GH senza elevare significativamente cortisolo, prolattina o ACTH.",
        },
        {
          question: "Qual è il momento migliore per somministrare questo stack?",
          answer:
            "La maggior parte dei protocolli raccomanda la somministrazione serale, 30-60 minuti prima del sonno. Questo timing si allinea con il pattern GH circadiano naturale del corpo.",
        },
      ],
    },
    pt: {
      name: "Stack Hormona de Crescimento",
      tagline: "Otimização de GH de dupla via para desempenho máximo",
      description:
        "A combinação CJC-1295 e Ipamorelin é o stack de secretagogos de hormona de crescimento mais amplamente investigado. CJC-1295 imita o GHRH para fornecer elevação sustentada de GH, enquanto Ipamorelin desencadeia pulsos de GH direcionados através do receptor de grelina sem afetar o cortisol ou a prolactina.",
      benefits: [
        "Amplificação da libertação natural de hormona de crescimento através de dupla via",
        "Promove composição corporal magra e preservação muscular",
        "Melhoria do sono profundo e restaurador via otimização dos pulsos de GH",
        "Recuperação acelerada entre sessões de treino",
        "Suporta a densidade óssea e a saúde articular",
        "Perfil hormonal limpo — sem elevação de cortisol ou prolactina",
      ],
      protocol:
        "O protocolo CJC-1295 + Ipamorelin aproveita duas vias distintas de libertação de GH para elevação sinérgica. CJC-1295 atua como análogo do GHRH, fornecendo uma elevação basal sustentada da hormona de crescimento, enquanto Ipamorelin desencadeia pulsos de GH adicionais direcionados via receptor de grelina.",
      faqs: [
        {
          question: "Por que combinar CJC-1295 com Ipamorelin em vez de usar um só?",
          answer:
            "CJC-1295 e Ipamorelin atuam através de receptores completamente diferentes — GHRH e grelina, respetivamente. CJC-1295 fornece uma elevação basal sustentada de GH enquanto Ipamorelin desencadeia pulsos de GH agudos e direcionados. Juntos produzem uma resposta GH sinérgica significativamente superior à de cada péptido isoladamente.",
        },
        {
          question: "Este stack afetará o cortisol ou outras hormonas?",
          answer:
            "Uma das principais vantagens da combinação CJC-1295 + Ipamorelin é a sua seletividade. Ipamorelin é um dos secretagogos de GH mais seletivos disponíveis, estimulando a libertação de GH sem elevar significativamente cortisol, prolactina ou ACTH.",
        },
        {
          question: "Qual é o melhor momento para administrar este stack?",
          answer:
            "A maioria dos protocolos recomenda administração noturna, 30-60 minutos antes de dormir. Este timing alinha-se com o padrão GH circadiano natural do corpo.",
        },
      ],
    },
    nl: {
      name: "Groeihormoon Stack",
      tagline: "Dubbel-route GH-optimalisatie voor topprestaties",
      description:
        "De combinatie CJC-1295 en Ipamorelin is de meest uitgebreid onderzochte groeihormoon-secretagoogstack. CJC-1295 bootst GHRH na om aanhoudende GH-verhoging te bieden, terwijl Ipamorelin gerichte GH-pulsen veroorzaakt via de ghrelinereceptor zonder cortisol of prolactine te beïnvloeden.",
      benefits: [
        "Versterkte natuurlijke groeihormoonafgifte via dubbele routes",
        "Bevordert slanke lichaamssamenstelling en spierbehoud",
        "Diepe, herstellende slaapverbetering via GH-pulsoptimalisatie",
        "Versneld herstel tussen trainingen",
        "Ondersteunt botdichtheid en gewrichtsgesondheid",
        "Schoon hormoomprofiel — geen cortisol- of prolactineverhoging",
      ],
      protocol:
        "Het CJC-1295 + Ipamorelin protocol maakt gebruik van twee verschillende GH-vrijgevende routes voor synergistische verhoging. CJC-1295 werkt als GHRH-analogon en biedt een aanhoudende basale verhoging van groeihormoon, terwijl Ipamorelin aanvullende gerichte GH-pulsen veroorzaakt via de ghrelinereceptor.",
      faqs: [
        {
          question: "Waarom CJC-1295 combineren met Ipamorelin in plaats van één alleen te gebruiken?",
          answer:
            "CJC-1295 en Ipamorelin werken via volledig verschillende receptoren — respectievelijk GHRH en ghreline. CJC-1295 biedt een aanhoudende GH-basisverhoging terwijl Ipamorelin scherpe, gerichte GH-pulsen veroorzaakt. Samen produceren ze een synergistische GH-respons die aanzienlijk groter is dan die van elk peptide alleen.",
        },
        {
          question: "Zal deze stack cortisol of andere hormonen beïnvloeden?",
          answer:
            "Een van de belangrijkste voordelen van de CJC-1295 + Ipamorelin combinatie is de selectiviteit. Ipamorelin is een van de meest selectieve GH-secretagogen, die GH-afgifte stimuleert zonder cortisol, prolactine of ACTH significant te verhogen.",
        },
        {
          question: "Wat is het beste tijdstip om deze stack toe te dienen?",
          answer:
            "De meeste onderzoeksprotocollen bevelen avondtoediening aan, 30-60 minuten voor het slapen. Dit tijdstip sluit aan bij het natuurlijke circadiane GH-patroon van het lichaam.",
        },
      ],
    },
    pl: {
      name: "Stack Hormonu Wzrostu",
      tagline: "Optymalizacja GH podwójną drogą dla szczytowych osiągnięć",
      description:
        "Kombinacja CJC-1295 i Ipamorelin jest najszerzej badanym stackiem sekretago genów hormonu wzrostu. CJC-1295 naśladuje GHRH, zapewniając trwałe podwyższenie GH, podczas gdy Ipamorelin wyzwala ukierunkowane impulsy GH poprzez receptor greliny bez wpływu na kortyzol lub prolaktynę.",
      benefits: [
        "Wzmocnione naturalne uwalnianie hormonu wzrostu poprzez podwójne szlaki",
        "Promuje szczupłą kompozycję ciała i zachowanie mięśni",
        "Poprawa głębokiego, regenerującego snu poprzez optymalizację impulsów GH",
        "Przyspieszone regeneracja między sesjami treningowymi",
        "Wspiera gęstość kości i zdrowie stawów",
        "Czysty profil hormonalny — bez wzrostu kortyzolu ani prolaktyny",
      ],
      protocol:
        "Protokół CJC-1295 + Ipamorelin wykorzystuje dwa odrębne szlaki uwalniania GH dla synergistycznego podwyższenia. CJC-1295 działa jako analog GHRH, zapewniając trwałe podstawowe podwyższenie hormonu wzrostu, podczas gdy Ipamorelin wyzwala dodatkowe ukierunkowane impulsy GH poprzez receptor greliny.",
      faqs: [
        {
          question: "Dlaczego łączyć CJC-1295 z Ipamorelin zamiast używać jednego?",
          answer:
            "CJC-1295 i Ipamorelin działają przez zupełnie różne receptory — odpowiednio GHRH i grelinę. CJC-1295 zapewnia trwałe podstawowe podwyższenie GH, podczas gdy Ipamorelin wyzwala ostre, ukierunkowane impulsy GH. Razem dają synergistyczną odpowiedź GH znacznie większą niż każdy peptyd osobno.",
        },
        {
          question: "Czy ten stack wpłynie na kortyzol lub inne hormony?",
          answer:
            "Jedną z kluczowych zalet kombinacji CJC-1295 + Ipamorelin jest jej selektywność. Ipamorelin jest jednym z najbardziej selektywnych dostępnych sekretago genów GH, stymulując uwalnianie GH bez znaczącego wzrostu kortyzolu, prolaktyny ani ACTH.",
        },
        {
          question: "Kiedy najlepiej podawać ten stack?",
          answer:
            "Większość protokołów zaleca podawanie wieczorne, 30-60 minut przed snem. Czas ten jest zgodny z naturalnym dobowym wzorcem GH organizmu.",
        },
      ],
    },
  },
  "metabolic-stack": {
    en: {
      name: "Metabolic Transformation Stack",
      tagline: "Dual-format tirzepatide for comprehensive metabolic support",
      description:
        "This stack pairs the ORYN Tirzepatide Pen (10mg, daily micro-dosing) with the MediT Pen (40mg, once-weekly), giving researchers maximum flexibility for metabolic studies. Tirzepatide is a dual GIP/GLP-1 receptor agonist — the most advanced class of metabolic peptide available. The daily pen system allows precise dose titration during the initiation phase, while the weekly MediT Pen provides the higher-dose convenience required for sustained protocols.",
      benefits: [
        "Dual GIP/GLP-1 receptor agonism for enhanced metabolic action",
        "Flexible dosing: daily micro-dosing pen + weekly injection pen",
        "Appetite regulation and satiety signalling modulation",
        "Blood sugar management and insulin sensitivity support",
        "Clinically proven compound class with extensive trial data",
        "Supports long-term metabolic research protocols",
      ],
      protocol:
        "The metabolic transformation protocol leverages two delivery formats of tirzepatide for optimal flexibility. Many researchers begin with the daily Tirzepatide Pen (10mg) for precise dose titration during the initiation phase, allowing gradual upward adjustment to assess tolerance. The MediT Pen (40mg weekly) is then used for the maintenance phase. This stepped approach mirrors the dose-escalation strategy used in published clinical trials of GIP/GLP-1 agonists.",
      faqs: [
        {
          question: "What is the advantage of having both daily and weekly tirzepatide formats?",
          answer:
            "The daily pen (10mg) allows micro-dosing for precise dose titration, particularly valuable during the initiation phase. The weekly MediT Pen (40mg) provides convenience for established protocols. Having both formats gives researchers maximum flexibility.",
        },
        {
          question: "How does tirzepatide differ from GLP-1-only agonists?",
          answer:
            "Tirzepatide is a dual GIP/GLP-1 receptor agonist, activating two key metabolic hormone pathways simultaneously. GIP and GLP-1 have complementary effects on appetite, insulin secretion, and energy metabolism. Clinical data suggests this dual mechanism produces superior metabolic outcomes compared to GLP-1-only compounds.",
        },
        {
          question: "Is dose escalation necessary with tirzepatide?",
          answer:
            "Published clinical trial protocols universally employ dose escalation with tirzepatide, starting at lower doses and gradually increasing over 4-8 weeks. This approach allows the body to adapt to GLP-1 receptor activation and minimises gastrointestinal side effects.",
        },
      ],
    },
    es: {
      name: "Pack de Transformación Metabólica",
      tagline: "Tirzepatida de formato dual para soporte metabólico completo",
      description:
        "Este pack combina el ORYN Tirzepatide Pen (10mg, micro-dosificación diaria) con el MediT Pen (40mg, una vez por semana), dando a los investigadores la máxima flexibilidad para estudios metabólicos. La tirzepatida es un agonista dual del receptor GIP/GLP-1 — la clase más avanzada de péptido metabólico disponible.",
      benefits: [
        "Agonismo dual del receptor GIP/GLP-1 para una acción metabólica mejorada",
        "Dosificación flexible: pluma de micro-dosificación diaria + pluma de inyección semanal",
        "Regulación del apetito y modulación de la señal de saciedad",
        "Control del azúcar en sangre y soporte de la sensibilidad a la insulina",
        "Clase de compuesto clínicamente probada con extensos datos de ensayos",
        "Soporta protocolos de investigación metabólica a largo plazo",
      ],
      protocol:
        "El protocolo de transformación metabólica aprovecha dos formatos de administración de tirzepatida para una flexibilidad óptima. Muchos investigadores comienzan con el Tirzepatide Pen diario (10mg) para una titulación de dosis precisa durante la fase de inicio, permitiendo un ajuste gradual al alza para evaluar la tolerancia. El MediT Pen (40mg semanal) se usa entonces para la fase de mantenimiento.",
      faqs: [
        {
          question: "¿Cuál es la ventaja de tener formatos de tirzepatida diario y semanal?",
          answer:
            "La pluma diaria (10mg) permite la micro-dosificación para una titulación de dosis precisa, particularmente valiosa durante la fase de inicio. La MediT Pen semanal (40mg) proporciona comodidad para protocolos establecidos.",
        },
        {
          question: "¿En qué se diferencia la tirzepatida de los agonistas solo de GLP-1?",
          answer:
            "La tirzepatida es un agonista dual del receptor GIP/GLP-1, activando dos vías clave de hormonas metabólicas simultáneamente. Los datos clínicos sugieren que este mecanismo dual produce resultados metabólicos superiores en comparación con los compuestos solo de GLP-1.",
        },
        {
          question: "¿Es necesaria la escalada de dosis con tirzepatida?",
          answer:
            "Los protocolos de ensayos clínicos publicados emplean universalmente la escalada de dosis con tirzepatida, comenzando con dosis más bajas y aumentando gradualmente durante 4-8 semanas.",
        },
      ],
    },
    fr: {
      name: "Pack Transformation Métabolique",
      tagline: "Tirzépatide en double format pour un soutien métabolique complet",
      description:
        "Ce pack associe le Tirzepatide Pen ORYN (10mg, micro-dosage quotidien) avec le MediT Pen (40mg, une fois par semaine), offrant aux chercheurs une flexibilité maximale pour les études métaboliques. Le tirzépatide est un agoniste double du récepteur GIP/GLP-1 — la classe la plus avancée de peptide métabolique disponible.",
      benefits: [
        "Agonisme double du récepteur GIP/GLP-1 pour une action métabolique améliorée",
        "Dosage flexible : stylo de micro-dosage quotidien + stylo d'injection hebdomadaire",
        "Régulation de l'appétit et modulation de la signalisation de satiété",
        "Gestion de la glycémie et soutien de la sensibilité à l'insuline",
        "Classe de composé cliniquement prouvée avec de nombreuses données d'essais",
        "Soutient les protocoles de recherche métabolique à long terme",
      ],
      protocol:
        "Le protocole de transformation métabolique exploite deux formats d'administration du tirzépatide pour une flexibilité optimale. De nombreux chercheurs commencent avec le Tirzepatide Pen quotidien (10mg) pour une titration précise des doses, puis utilisent le MediT Pen (40mg hebdomadaire) pour la phase de maintenance.",
      faqs: [
        {
          question: "Quel est l'avantage d'avoir des formats de tirzépatide quotidien et hebdomadaire ?",
          answer:
            "Le stylo quotidien (10mg) permet le micro-dosage pour une titration précise des doses pendant la phase d'initiation. Le MediT Pen hebdomadaire (40mg) offre la commodité pour les protocoles établis.",
        },
        {
          question: "En quoi le tirzépatide diffère-t-il des agonistes GLP-1 seuls ?",
          answer:
            "Le tirzépatide est un agoniste double du récepteur GIP/GLP-1, activant simultanément deux voies hormonales métaboliques clés. Les données cliniques suggèrent que ce double mécanisme produit des résultats métaboliques supérieurs comparés aux composés GLP-1 seuls.",
        },
        {
          question: "L'escalade de dose est-elle nécessaire avec le tirzépatide ?",
          answer:
            "Les protocoles d'essais cliniques publiés emploient universellement l'escalade de dose avec le tirzépatide, commençant à des doses plus faibles et augmentant progressivement sur 4-8 semaines.",
        },
      ],
    },
    de: {
      name: "Metabolischer Transformations-Stack",
      tagline: "Doppelformat-Tirzepatid für umfassende metabolische Unterstützung",
      description:
        "Dieser Stack kombiniert den ORYN Tirzepatide Pen (10mg, tägliche Mikrodosierung) mit dem MediT Pen (40mg, einmal wöchentlich) und gibt Forschern maximale Flexibilität für metabolische Studien. Tirzepatid ist ein dualer GIP/GLP-1-Rezeptoragonist — die fortschrittlichste Klasse von Stoffwechsel-Peptiden.",
      benefits: [
        "Dualer GIP/GLP-1-Rezeptoragonismus für verbesserte metabolische Wirkung",
        "Flexible Dosierung: täglicher Mikrodosierungs-Pen + wöchentlicher Injektions-Pen",
        "Appetitregulierung und Sättigungssignalmodulation",
        "Blutzuckerkontrolle und Insulinsensitivitätsunterstützung",
        "Klinisch erprobte Verbindungsklasse mit umfangreichen Versuchsdaten",
        "Unterstützt langfristige metabolische Forschungsprotokolle",
      ],
      protocol:
        "Das metabolische Transformationsprotokoll nutzt zwei Verabreichungsformate von Tirzepatid für optimale Flexibilität. Viele Forscher beginnen mit dem täglichen Tirzepatide Pen (10mg) für präzise Dosistitration, dann wird der MediT Pen (40mg wöchentlich) für die Erhaltungsphase verwendet.",
      faqs: [
        {
          question: "Was ist der Vorteil beider Tirzepatid-Formate?",
          answer:
            "Der tägliche Pen (10mg) ermöglicht Mikrodosierung für präzise Dosistitration während der Initiierungsphase. Der wöchentliche MediT Pen (40mg) bietet Komfort für etablierte Protokolle.",
        },
        {
          question: "Wie unterscheidet sich Tirzepatid von GLP-1-Agonisten?",
          answer:
            "Tirzepatid ist ein dualer GIP/GLP-1-Rezeptoragonist, der zwei wichtige metabolische Hormonwege gleichzeitig aktiviert. Klinische Daten zeigen, dass dieser doppelte Mechanismus überlegene metabolische Ergebnisse produziert.",
        },
        {
          question: "Ist eine Dosissteigerung mit Tirzepatid notwendig?",
          answer:
            "Veröffentlichte klinische Studienprotokolle verwenden universell eine Dosissteigerung mit Tirzepatid, beginnend mit niedrigeren Dosen und schrittweiser Steigerung über 4-8 Wochen.",
        },
      ],
    },
    it: {
      name: "Stack Trasformazione Metabolica",
      tagline: "Tirzepatide in doppio formato per supporto metabolico completo",
      description:
        "Questo stack abbina il Tirzepatide Pen ORYN (10mg, micro-dosaggio giornaliero) con il MediT Pen (40mg, una volta a settimana), offrendo ai ricercatori la massima flessibilità per gli studi metabolici. Il tirzepatide è un doppio agonista del recettore GIP/GLP-1 — la classe più avanzata di peptide metabolico disponibile.",
      benefits: [
        "Agonismo doppio del recettore GIP/GLP-1 per azione metabolica potenziata",
        "Dosaggio flessibile: penna di micro-dosaggio giornaliero + penna di iniezione settimanale",
        "Regolazione dell'appetito e modulazione della segnalazione di sazietà",
        "Gestione della glicemia e supporto alla sensibilità insulinica",
        "Classe di composti clinicamente testata con ampi dati di sperimentazione",
        "Supporta protocolli di ricerca metabolica a lungo termine",
      ],
      protocol:
        "Il protocollo di trasformazione metabolica sfrutta due formati di somministrazione del tirzepatide per flessibilità ottimale. Molti ricercatori iniziano con il Tirzepatide Pen giornaliero (10mg) per una titolazione precisa della dose, poi utilizzano il MediT Pen (40mg settimanale) per la fase di mantenimento.",
      faqs: [
        {
          question: "Qual è il vantaggio di avere entrambi i formati di tirzepatide?",
          answer:
            "La penna giornaliera (10mg) consente il micro-dosaggio per una precisa titolazione nella fase di inizio. Il MediT Pen settimanale (40mg) offre praticità per i protocolli stabiliti.",
        },
        {
          question: "Come differisce il tirzepatide dagli agonisti solo GLP-1?",
          answer:
            "Il tirzepatide è un doppio agonista del recettore GIP/GLP-1, attivando simultaneamente due vie ormonali metaboliche chiave. I dati clinici suggeriscono che questo doppio meccanismo produce risultati metabolici superiori.",
        },
        {
          question: "È necessaria la titolazione della dose con tirzepatide?",
          answer:
            "I protocolli dei trial clinici pubblicati impiegano universalmente la titolazione della dose con tirzepatide, iniziando a dosi più basse e aumentando gradualmente in 4-8 settimane.",
        },
      ],
    },
    pt: {
      name: "Stack de Transformação Metabólica",
      tagline: "Tirzepatida em formato duplo para suporte metabólico abrangente",
      description:
        "Este stack combina o ORYN Tirzepatide Pen (10mg, micro-dosagem diária) com o MediT Pen (40mg, uma vez por semana), dando aos investigadores máxima flexibilidade para estudos metabólicos. A tirzepatida é um agonista duplo do receptor GIP/GLP-1 — a classe mais avançada de péptido metabólico disponível.",
      benefits: [
        "Agonismo duplo do receptor GIP/GLP-1 para ação metabólica melhorada",
        "Dosagem flexível: caneta de micro-dosagem diária + caneta de injeção semanal",
        "Regulação do apetite e modulação da sinalização de saciedade",
        "Gestão do açúcar no sangue e suporte à sensibilidade à insulina",
        "Classe de composto clinicamente provada com extensos dados de ensaios",
        "Suporta protocolos de investigação metabólica de longo prazo",
      ],
      protocol:
        "O protocolo de transformação metabólica aproveita dois formatos de administração de tirzepatida para flexibilidade ótima. Muitos investigadores começam com a Tirzepatide Pen diária (10mg) para titulação precisa de dose, depois utilizam o MediT Pen (40mg semanal) para a fase de manutenção.",
      faqs: [
        {
          question: "Qual é a vantagem de ter ambos os formatos de tirzepatida?",
          answer:
            "A caneta diária (10mg) permite micro-dosagem para titulação precisa na fase de início. O MediT Pen semanal (40mg) proporciona conveniência para protocolos estabelecidos.",
        },
        {
          question: "Como a tirzepatida difere dos agonistas só de GLP-1?",
          answer:
            "A tirzepatida é um agonista duplo do receptor GIP/GLP-1, ativando simultaneamente duas vias hormonais metabólicas chave. Os dados clínicos sugerem que este mecanismo duplo produz resultados metabólicos superiores.",
        },
        {
          question: "É necessária escalada de dose com tirzepatida?",
          answer:
            "Os protocolos de ensaios clínicos publicados empregam universalmente escalada de dose com tirzepatida, começando com doses mais baixas e aumentando gradualmente durante 4-8 semanas.",
        },
      ],
    },
    nl: {
      name: "Metabolische Transformatie Stack",
      tagline: "Dubbelformaat tirzepatide voor uitgebreide metabolische ondersteuning",
      description:
        "Deze stack koppelt de ORYN Tirzepatide Pen (10mg, dagelijkse microdosering) aan de MediT Pen (40mg, eenmaal per week), waardoor onderzoekers maximale flexibiliteit krijgen voor metabolische studies. Tirzepatide is een dubbele GIP/GLP-1-receptoragonist — de meest geavanceerde klasse van metabolisch peptide beschikbaar.",
      benefits: [
        "Dubbel GIP/GLP-1-receptoragonisme voor verbeterde metabolische werking",
        "Flexibele dosering: dagelijkse microdoseringpen + wekelijkse injectiepen",
        "Appetitregulerering en modulatie van verzadigingssignalering",
        "Bloedsuikerbeheer en ondersteuning van insulinegevoeligheid",
        "Klinisch bewezen verbindingsklasse met uitgebreide proefdata",
        "Ondersteunt langetermijn metabolische onderzoeksprotocollen",
      ],
      protocol:
        "Het metabolische transformatieprotocol maakt gebruik van twee toedieningsformaten van tirzepatide voor optimale flexibiliteit. Veel onderzoekers beginnen met de dagelijkse Tirzepatide Pen (10mg) voor nauwkeurige dosistitratie, waarna de MediT Pen (40mg wekelijks) wordt gebruikt voor de onderhoudsfase.",
      faqs: [
        {
          question: "Wat is het voordeel van beide tirzepatide-formaten?",
          answer:
            "De dagelijkse pen (10mg) maakt microdosering mogelijk voor nauwkeurige dosistitratie tijdens de initiatiefase. De wekelijkse MediT Pen (40mg) biedt gemak voor vastgestelde protocollen.",
        },
        {
          question: "Hoe verschilt tirzepatide van GLP-1-only agonisten?",
          answer:
            "Tirzepatide is een dubbele GIP/GLP-1-receptoragonist die tegelijkertijd twee belangrijke metabolische hormoonroutes activeert. Klinische data suggereert dat dit dubbele mechanisme superieure metabolische uitkomsten produceert.",
        },
        {
          question: "Is dosisescalatie nodig bij tirzepatide?",
          answer:
            "Gepubliceerde klinische studieprotocollen gebruiken universeel dosisescalatie met tirzepatide, startend met lagere doses en geleidelijk verhogend over 4-8 weken.",
        },
      ],
    },
    pl: {
      name: "Stack Transformacji Metabolicznej",
      tagline: "Tirzepatyd w podwójnym formacie dla kompleksowego wsparcia metabolicznego",
      description:
        "Ten stack łączy ORYN Tirzepatide Pen (10mg, codzienne mikro-dawkowanie) z MediT Pen (40mg, raz w tygodniu), dając badaczom maksymalną elastyczność w badaniach metabolicznych. Tirzepatyd jest podwójnym agonistą receptora GIP/GLP-1 — najbardziej zaawansowaną klasą dostępnego peptydu metabolicznego.",
      benefits: [
        "Podwójny agonizm receptora GIP/GLP-1 dla wzmocnionego działania metabolicznego",
        "Elastyczne dawkowanie: codzienna pióro do mikrodawkowania + tygodniowe pióro do iniekcji",
        "Regulacja apetytu i modulacja sygnalizacji sytości",
        "Kontrola poziomu cukru we krwi i wsparcie wrażliwości na insulinę",
        "Klinicznie udowodniona klasa związków z obszernymi danymi z badań",
        "Wspiera długoterminowe protokoły badań metabolicznych",
      ],
      protocol:
        "Protokół transformacji metabolicznej wykorzystuje dwa formaty podawania tizepratydu dla optymalnej elastyczności. Wielu badaczy zaczyna od codziennego Tirzepatide Pen (10mg) dla precyzyjnego miareczkowania dawki, a następnie używa MediT Pen (40mg tygodniowo) dla fazy podtrzymania.",
      faqs: [
        {
          question: "Jaka jest zaleta posiadania obu formatów tizepratydu?",
          answer:
            "Codzienne pióro (10mg) umożliwia mikrodawkowanie dla precyzyjnego miareczkowania dawki podczas fazy inicjacji. Tygodniowy MediT Pen (40mg) zapewnia wygodę dla ustalonych protokołów.",
        },
        {
          question: "Czym tirzepatyd różni się od agonistów wyłącznie GLP-1?",
          answer:
            "Tirzepatyd jest podwójnym agonistą receptora GIP/GLP-1, aktywującym jednocześnie dwa kluczowe szlaki hormonalne metabolizmu. Dane kliniczne sugerują, że ten podwójny mechanizm daje lepsze wyniki metaboliczne niż związki tylko GLP-1.",
        },
        {
          question: "Czy eskalacja dawki jest konieczna przy tizepratydzie?",
          answer:
            "Opublikowane protokoły badań klinicznych powszechnie stosują eskalację dawki tizepratydu, zaczynając od niższych dawek i stopniowo zwiększając przez 4-8 tygodni.",
        },
      ],
    },
  },
  "total-wellness": {
    en: {
      name: "Total Wellness Stack",
      tagline: "Foundation protocol for systemic health optimisation",
      description:
        "The Total Wellness Stack combines three compounds that target the most fundamental aspects of health: tissue integrity, cellular energy, and antioxidant defence. BPC-157 supports gut health and systemic tissue repair, NAD+ fuels mitochondrial energy production and DNA repair mechanisms, and Glutathione provides the master antioxidant shield that protects every cell from oxidative damage. This foundational stack is designed for researchers studying whole-body wellness optimisation and preventive health protocols.",
      benefits: [
        "Comprehensive gut health and tissue integrity via BPC-157",
        "Mitochondrial energy production and metabolic support via NAD+",
        "Systemic antioxidant defence and detoxification via Glutathione",
        "Immune system modulation and inflammatory balance",
        "Neuroprotective and cognitive function support",
        "Foundation protocol compatible with additional peptide stacks",
      ],
      protocol:
        "The Total Wellness protocol addresses three pillars of systemic health. BPC-157 targets the gut-body axis, supporting intestinal barrier integrity and modulating inflammatory pathways. NAD+ replenishes the coenzyme that declines with age, restoring mitochondrial function and activating sirtuin-mediated repair pathways. Glutathione provides the antioxidant backbone that protects cellular structures from oxidative stress. Many researchers use this as a foundation protocol, running it for 30-60 days before layering additional targeted peptide stacks.",
      faqs: [
        {
          question: "Why are these three compounds considered a wellness foundation?",
          answer:
            "BPC-157, NAD+, and Glutathione each address a fundamental pillar of health. BPC-157 supports structural integrity (especially gut and connective tissue), NAD+ powers cellular energy and repair mechanisms, and Glutathione protects against the oxidative damage that underlies most chronic diseases.",
        },
        {
          question: "Can this stack be combined with other peptide protocols?",
          answer:
            "Yes, the Total Wellness Stack is specifically designed as a foundation protocol. Many researchers run this stack alongside targeted protocols such as the Recovery Stack (adding TB-500) or the GH Stack (adding CJC-1295 + Ipamorelin).",
        },
        {
          question: "How does BPC-157 support overall wellness beyond gut health?",
          answer:
            "While BPC-157 is best known for gut healing, research shows it has systemic effects including neuroprotection, tendon and ligament repair, anti-inflammatory modulation, and support for the gut-brain axis.",
        },
        {
          question: "What is the recommended duration for a wellness protocol?",
          answer:
            "Most researchers run a minimum 30-day wellness protocol, with many extending to 60-90 days for comprehensive baseline assessment. ORYN's pen system delivers consistent dosing for 30 days per pen.",
        },
      ],
    },
    es: {
      name: "Pack Bienestar Total",
      tagline: "Protocolo de base para la optimización de la salud sistémica",
      description:
        "El Pack Bienestar Total combina tres compuestos que abordan los aspectos más fundamentales de la salud: integridad tisular, energía celular y defensa antioxidante. BPC-157 apoya la salud intestinal y la reparación tisular sistémica, NAD+ impulsa la producción de energía mitocondrial y los mecanismos de reparación del ADN, y el Glutatión proporciona el escudo antioxidante maestro que protege cada célula del daño oxidativo.",
      benefits: [
        "Salud intestinal completa e integridad tisular mediante BPC-157",
        "Producción de energía mitocondrial y soporte metabólico mediante NAD+",
        "Defensa antioxidante sistémica y desintoxicación mediante Glutatión",
        "Modulación del sistema inmunitario y equilibrio inflamatorio",
        "Soporte neuroprotector y de función cognitiva",
        "Protocolo de base compatible con stacks adicionales de péptidos",
      ],
      protocol:
        "El protocolo de Bienestar Total aborda tres pilares de la salud sistémica. BPC-157 actúa sobre el eje intestino-cuerpo, apoyando la integridad de la barrera intestinal. NAD+ repone la coenzima que disminuye con la edad, restaurando la función mitocondrial. El Glutatión proporciona la base antioxidante que protege las estructuras celulares del estrés oxidativo.",
      faqs: [
        {
          question: "¿Por qué se consideran estos tres compuestos la base del bienestar?",
          answer:
            "BPC-157, NAD+ y Glutatión abordan cada uno un pilar fundamental de la salud. BPC-157 apoya la integridad estructural, NAD+ impulsa la energía celular y los mecanismos de reparación, y el Glutatión protege contra el daño oxidativo.",
        },
        {
          question: "¿Se puede combinar este stack con otros protocolos de péptidos?",
          answer:
            "Sí, el Pack Bienestar Total está diseñado específicamente como protocolo de base. Muchos investigadores lo combinan con protocolos dirigidos como el Pack de Recuperación o el Stack de GH.",
        },
        {
          question: "¿Cómo apoya BPC-157 el bienestar general más allá de la salud intestinal?",
          answer:
            "Aunque BPC-157 es más conocido por la curación intestinal, la investigación muestra que tiene efectos sistémicos incluyendo neuroprotección, reparación de tendones y ligamentos y modulación antiinflamatoria.",
        },
        {
          question: "¿Cuál es la duración recomendada para un protocolo de bienestar?",
          answer:
            "La mayoría de los investigadores realizan un protocolo de bienestar mínimo de 30 días, con muchos que se extienden a 60-90 días para una evaluación de referencia completa.",
        },
      ],
    },
    fr: {
      name: "Pack Bien-Être Total",
      tagline: "Protocole de base pour l'optimisation de la santé systémique",
      description:
        "Le Pack Bien-Être Total combine trois composés ciblant les aspects les plus fondamentaux de la santé : intégrité tissulaire, énergie cellulaire et défense antioxydante. BPC-157 soutient la santé intestinale et la réparation tissulaire systémique, NAD+ alimente la production d'énergie mitochondriale et les mécanismes de réparation de l'ADN, et le Glutathion fournit le bouclier antioxydant maître qui protège chaque cellule des dommages oxydatifs.",
      benefits: [
        "Santé intestinale complète et intégrité tissulaire via BPC-157",
        "Production d'énergie mitochondriale et soutien métabolique via NAD+",
        "Défense antioxydante systémique et détoxification via Glutathion",
        "Modulation du système immunitaire et équilibre inflammatoire",
        "Soutien neuroprotecteur et de la fonction cognitive",
        "Protocole de base compatible avec des stacks peptidiques supplémentaires",
      ],
      protocol:
        "Le protocole Bien-Être Total s'attaque à trois piliers de la santé systémique. BPC-157 cible l'axe intestin-corps, NAD+ reconstitue la coenzyme qui décline avec l'âge, et le Glutathion fournit le socle antioxydant protégeant les structures cellulaires du stress oxydatif.",
      faqs: [
        {
          question: "Pourquoi ces trois composés sont-ils considérés comme une base de bien-être ?",
          answer:
            "BPC-157, NAD+ et Glutathion traitent chacun un pilier fondamental de la santé. BPC-157 soutient l'intégrité structurelle, NAD+ alimente l'énergie cellulaire et les mécanismes de réparation, et le Glutathion protège contre les dommages oxydatifs.",
        },
        {
          question: "Ce stack peut-il être combiné avec d'autres protocoles peptidiques ?",
          answer:
            "Oui, le Pack Bien-Être Total est spécifiquement conçu comme protocole de base, souvent associé au Pack Récupération ou au Stack GH.",
        },
        {
          question: "Comment BPC-157 soutient-il le bien-être général au-delà de la santé intestinale ?",
          answer:
            "Au-delà de la guérison intestinale, BPC-157 a des effets systémiques incluant la neuroprotection, la réparation des tendons et la modulation anti-inflammatoire.",
        },
        {
          question: "Quelle est la durée recommandée pour un protocole de bien-être ?",
          answer:
            "La plupart des chercheurs suivent un protocole de bien-être minimum de 30 jours, beaucoup l'étendant à 60-90 jours pour une évaluation de base complète.",
        },
      ],
    },
    de: {
      name: "Total-Wellness-Stack",
      tagline: "Grundlagenprotokoll für systemische Gesundheitsoptimierung",
      description:
        "Der Total-Wellness-Stack kombiniert drei Verbindungen, die die grundlegendsten Gesundheitsaspekte ansprechen: Gewebeintegrität, zelluläre Energie und Antioxidationsschutz. BPC-157 unterstützt die Darmgesundheit und systemische Gewebereparatur, NAD+ treibt die mitochondriale Energieproduktion und DNA-Reparatur an, und Glutathion bietet den Master-Antioxidationsschutz für jede Zelle.",
      benefits: [
        "Umfassende Darmgesundheit und Gewebeintegrität durch BPC-157",
        "Mitochondriale Energieproduktion und Stoffwechselunterstützung durch NAD+",
        "Systemischer Antioxidationsschutz und Entgiftung durch Glutathion",
        "Immunsystemmodulation und Entzündungsbalance",
        "Neuroprotektive und kognitive Funktionsunterstützung",
        "Grundlagenprotokoll kompatibel mit weiteren Peptid-Stacks",
      ],
      protocol:
        "Das Total-Wellness-Protokoll adressiert drei Säulen der systemischen Gesundheit. BPC-157 zielt auf die Darm-Körper-Achse ab, NAD+ ergänzt das Coenzym, das mit dem Alter abnimmt, und Glutathion bietet das antioxidative Fundament zum Schutz zellulärer Strukturen.",
      faqs: [
        {
          question: "Warum gelten diese drei Verbindungen als Wellness-Fundament?",
          answer:
            "BPC-157, NAD+ und Glutathion adressieren jeweils eine grundlegende Säule der Gesundheit. BPC-157 unterstützt strukturelle Integrität, NAD+ treibt zelluläre Energie und Reparaturmechanismen an, und Glutathion schützt vor oxidativen Schäden.",
        },
        {
          question: "Kann dieser Stack mit anderen Peptidprotokollen kombiniert werden?",
          answer:
            "Ja, der Total-Wellness-Stack ist als Grundlagenprotokoll konzipiert und wird häufig mit dem Erholungs-Stack oder dem GH-Stack kombiniert.",
        },
        {
          question: "Wie unterstützt BPC-157 das allgemeine Wohlbefinden über die Darmgesundheit hinaus?",
          answer:
            "Über die Darmheilung hinaus hat BPC-157 systemische Effekte einschließlich Neuroprotektion, Sehnen- und Bandreparatur und entzündungshemmender Modulation.",
        },
        {
          question: "Was ist die empfohlene Dauer eines Wellness-Protokolls?",
          answer:
            "Die meisten Forscher führen ein Mindest-30-Tage-Wellness-Protokoll durch, viele erstrecken es auf 60-90 Tage für eine umfassende Baseline-Bewertung.",
        },
      ],
    },
    it: {
      name: "Stack Benessere Totale",
      tagline: "Protocollo di base per l'ottimizzazione della salute sistemica",
      description:
        "Lo Stack Benessere Totale combina tre composti che agiscono sugli aspetti più fondamentali della salute: integrità tissutale, energia cellulare e difesa antiossidante. BPC-157 supporta la salute intestinale e la riparazione tissutale sistemica, NAD+ alimenta la produzione di energia mitocondriale e i meccanismi di riparazione del DNA, e il Glutatione fornisce lo scudo antiossidante principale che protegge ogni cellula dai danni ossidativi.",
      benefits: [
        "Salute intestinale completa e integrità tissutale tramite BPC-157",
        "Produzione di energia mitocondriale e supporto metabolico tramite NAD+",
        "Difesa antiossidante sistemica e disintossicazione tramite Glutatione",
        "Modulazione del sistema immunitario ed equilibrio infiammatorio",
        "Supporto neuroprotettivo e della funzione cognitiva",
        "Protocollo di base compatibile con ulteriori stack peptidici",
      ],
      protocol:
        "Il protocollo Benessere Totale affronta tre pilastri della salute sistemica. BPC-157 mira all'asse intestino-corpo, NAD+ reintegra il coenzima che diminuisce con l'età, e il Glutatione fornisce la struttura antiossidante che protegge le strutture cellulari dallo stress ossidativo.",
      faqs: [
        {
          question: "Perché questi tre composti sono considerati una base per il benessere?",
          answer:
            "BPC-157, NAD+ e Glutatione affrontano ciascuno un pilastro fondamentale della salute. BPC-157 supporta l'integrità strutturale, NAD+ alimenta l'energia cellulare e i meccanismi di riparazione, e il Glutatione protegge dai danni ossidativi.",
        },
        {
          question: "Questo stack può essere combinato con altri protocolli peptidici?",
          answer:
            "Sì, lo Stack Benessere Totale è progettato come protocollo di base, spesso abbinato allo Stack di Recupero o allo Stack GH.",
        },
        {
          question: "Come supporta BPC-157 il benessere generale oltre alla salute intestinale?",
          answer:
            "Oltre alla guarigione intestinale, BPC-157 ha effetti sistemici inclusi neuroprotection, riparazione di tendini e legamenti e modulazione antinfiammatoria.",
        },
        {
          question: "Qual è la durata raccomandata per un protocollo di benessere?",
          answer:
            "La maggior parte dei ricercatori esegue un protocollo di benessere minimo di 30 giorni, molti lo estendono a 60-90 giorni per una valutazione basale completa.",
        },
      ],
    },
    pt: {
      name: "Stack de Bem-Estar Total",
      tagline: "Protocolo de base para a otimização da saúde sistémica",
      description:
        "O Stack de Bem-Estar Total combina três compostos que visam os aspetos mais fundamentais da saúde: integridade tecidual, energia celular e defesa antioxidante. BPC-157 apoia a saúde intestinal e a reparação tecidual sistémica, NAD+ alimenta a produção de energia mitocondrial e os mecanismos de reparação do ADN, e o Glutatião fornece o escudo antioxidante mestre que protege cada célula de danos oxidativos.",
      benefits: [
        "Saúde intestinal abrangente e integridade tecidual via BPC-157",
        "Produção de energia mitocondrial e suporte metabólico via NAD+",
        "Defesa antioxidante sistémica e desintoxicação via Glutatião",
        "Modulação do sistema imunitário e equilíbrio inflamatório",
        "Suporte neuroprotector e da função cognitiva",
        "Protocolo de base compatível com stacks peptídicos adicionais",
      ],
      protocol:
        "O protocolo de Bem-Estar Total aborda três pilares da saúde sistémica. BPC-157 mira o eixo intestino-corpo, NAD+ repõe a coenzima que diminui com a idade, e o Glutatião fornece a estrutura antioxidante que protege as estruturas celulares do stress oxidativo.",
      faqs: [
        {
          question: "Por que estes três compostos são considerados uma base de bem-estar?",
          answer:
            "BPC-157, NAD+ e Glutatião abordam cada um um pilar fundamental da saúde. BPC-157 suporta integridade estrutural, NAD+ alimenta energia celular e mecanismos de reparação, e Glutatião protege contra danos oxidativos.",
        },
        {
          question: "Este stack pode ser combinado com outros protocolos peptídicos?",
          answer:
            "Sim, o Stack de Bem-Estar Total é projetado como protocolo de base, frequentemente combinado com o Stack de Recuperação ou o Stack de GH.",
        },
        {
          question: "Como o BPC-157 apoia o bem-estar geral além da saúde intestinal?",
          answer:
            "Além da cura intestinal, BPC-157 tem efeitos sistémicos incluindo neuroproteção, reparação de tendões e ligamentos e modulação anti-inflamatória.",
        },
        {
          question: "Qual é a duração recomendada para um protocolo de bem-estar?",
          answer:
            "A maioria dos investigadores realiza um protocolo de bem-estar mínimo de 30 dias, muitos estendendo para 60-90 dias para avaliação de referência abrangente.",
        },
      ],
    },
    nl: {
      name: "Totale Wellness Stack",
      tagline: "Basisprotocol voor systemische gezondheidsoptimalisatie",
      description:
        "De Totale Wellness Stack combineert drie verbindingen die de meest fundamentele gezondheidsaspecten aanpakken: weefselintegriteit, cellulaire energie en antioxidantverdediging. BPC-157 ondersteunt darmgezondheid en systemisch weefselherstel, NAD+ voedt mitochondriale energieproductie en DNA-herstel, en Glutathion biedt het master antioxidantschild dat elke cel beschermt.",
      benefits: [
        "Uitgebreide darmgezondheid en weefselintegriteit via BPC-157",
        "Mitochondriale energieproductie en metabolische ondersteuning via NAD+",
        "Systemische antioxidantverdediging en ontgifting via Glutathion",
        "Immuunsysteemmodulatie en ontstekingsbalans",
        "Neuroprotectieve en cognitieve functieondersteuning",
        "Basisprotocol compatibel met extra peptidestacks",
      ],
      protocol:
        "Het Totale Wellness protocol pakt drie pijlers van systemische gezondheid aan. BPC-157 richt zich op de darm-lichaam-as, NAD+ vult het co-enzym aan dat met de leeftijd afneemt, en Glutathion biedt de antioxidant-ruggengraat die cellulaire structuren beschermt.",
      faqs: [
        {
          question: "Waarom worden deze drie verbindingen als welnessfundament beschouwd?",
          answer:
            "BPC-157, NAD+ en Glutathion behandelen elk een fundamentele pijler van gezondheid. BPC-157 ondersteunt structurele integriteit, NAD+ voedt cellulaire energie en herstelmechanismen, en Glutathion beschermt tegen oxidatieve schade.",
        },
        {
          question: "Kan deze stack gecombineerd worden met andere peptideprotocollen?",
          answer:
            "Ja, de Totale Wellness Stack is ontworpen als basisprotocol, vaak gecombineerd met de Herstelstack of de GH-stack.",
        },
        {
          question: "Hoe ondersteunt BPC-157 algeheel welzijn voorbij darmgezondheid?",
          answer:
            "Naast darmgenezing heeft BPC-157 systemische effecten waaronder neuroprotectie, pees- en bandherstel en ontstekingsremmende modulatie.",
        },
        {
          question: "Wat is de aanbevolen duur voor een wellnessprotocol?",
          answer:
            "De meeste onderzoekers voeren een minimaal 30-daags wellnessprotocol uit, velen verlengen dit tot 60-90 dagen voor uitgebreide baselinebeoordeling.",
        },
      ],
    },
    pl: {
      name: "Stack Totalnego Dobrostanu",
      tagline: "Protokół podstawowy dla systemowej optymalizacji zdrowia",
      description:
        "Stack Totalnego Dobrostanu łączy trzy związki działające na najbardziej fundamentalne aspekty zdrowia: integralność tkankową, energię komórkową i obronę antyoksydacyjną. BPC-157 wspiera zdrowie jelit i systemową naprawę tkanek, NAD+ napędza produkcję energii mitochondrialnej i mechanizmy naprawy DNA, a Glutation zapewnia główną tarczę antyoksydacyjną chroniącą każdą komórkę.",
      benefits: [
        "Kompleksowe zdrowie jelit i integralność tkanek przez BPC-157",
        "Produkcja energii mitochondrialnej i wsparcie metaboliczne przez NAD+",
        "Systemowa obrona antyoksydacyjna i detoksykacja przez Glutation",
        "Modulacja układu odpornościowego i równowaga zapalna",
        "Wsparcie neuroprotekcyjne i funkcji poznawczych",
        "Protokół podstawowy kompatybilny z dodatkowymi stackami peptydowymi",
      ],
      protocol:
        "Protokół Totalnego Dobrostanu zajmuje się trzema filarami zdrowia systemowego. BPC-157 celuje w oś jelito-ciało, NAD+ uzupełnia koenzym, który spada z wiekiem, a Glutation zapewnia antyoksydacyjny fundament chroniący struktury komórkowe.",
      faqs: [
        {
          question: "Dlaczego te trzy związki są uważane za fundament dobrostanu?",
          answer:
            "BPC-157, NAD+ i Glutation każdy działają na jeden podstawowy filar zdrowia. BPC-157 wspiera integralność strukturalną, NAD+ napędza energię komórkową i mechanizmy naprawy, a Glutation chroni przed uszkodzeniami oksydacyjnymi.",
        },
        {
          question: "Czy ten stack można łączyć z innymi protokołami peptydowymi?",
          answer:
            "Tak, Stack Totalnego Dobrostanu jest zaprojektowany jako protokół podstawowy, często łączony ze Stackiem Regeneracyjnym lub Stackiem GH.",
        },
        {
          question: "Jak BPC-157 wspiera ogólny dobrostan poza zdrowiem jelit?",
          answer:
            "Poza gojeniem jelit, BPC-157 ma efekty systemowe, w tym neuroprotekcję, naprawę ścięgien i więzadeł oraz modulację przeciwzapalną.",
        },
        {
          question: "Jaki jest zalecany czas trwania protokołu dobrostanu?",
          answer:
            "Większość badaczy prowadzi minimalny 30-dniowy protokół dobrostanu, wielu przedłuża go do 60-90 dni dla kompleksowej oceny wyjściowej.",
        },
      ],
    },
  },
  "skin-renewal": {
    en: {
      name: "Skin Renewal Stack",
      tagline: "Advanced dermal rejuvenation through peptide science",
      description:
        "The Skin Renewal Stack pairs two of the most potent compounds in dermatological peptide research. GHK-Cu (copper peptide) stimulates collagen and elastin synthesis, promotes tissue remodelling, and enhances the skin's structural proteins. Glutathione, the body's master antioxidant, provides powerful skin brightening, detoxification, and protection against UV-induced oxidative damage. Together, these compounds address both the structural degradation and oxidative stress components of skin aging.",
      benefits: [
        "Stimulates collagen and elastin synthesis for structural renewal",
        "Skin brightening and even tone via glutathione's melanin regulation",
        "Antioxidant protection against UV and environmental damage",
        "Promotes wound healing and scar reduction",
        "Supports hyaluronic acid production for skin hydration",
        "Anti-inflammatory action to reduce redness and irritation",
      ],
      protocol:
        "The Skin Renewal protocol targets complementary dermal pathways. GHK-Cu addresses the structural component of skin aging by stimulating fibroblasts to produce collagen, elastin, and glycosaminoglycans. Glutathione works on the oxidative and pigmentation side, neutralising free radicals and inhibiting tyrosinase (the enzyme responsible for melanin production). Research protocols typically run 8-12 weeks, as collagen remodelling is a gradual process.",
      faqs: [
        {
          question: "How do GHK-Cu and Glutathione work together for skin?",
          answer:
            "GHK-Cu stimulates production of structural proteins (collagen, elastin, proteoglycans) that give skin firmness and elasticity, while Glutathione provides antioxidant protection, brightens skin by inhibiting melanin production, and supports detoxification. Together, they address both the structural and environmental causes of skin aging.",
        },
        {
          question: "How long before visible skin improvements are expected?",
          answer:
            "Initial improvements in skin tone and brightness (from Glutathione) may appear within 2-4 weeks, while structural improvements from collagen synthesis (GHK-Cu) typically become noticeable at 6-12 weeks. Most researchers run this protocol for a minimum of 8 weeks.",
        },
        {
          question: "Is injectable GHK-Cu more effective than topical copper peptide products?",
          answer:
            "Injectable GHK-Cu delivers the peptide systemically, allowing it to reach the dermal layer directly via the bloodstream. Topical copper peptide products face significant penetration challenges. ORYN's pen-delivered GHK-Cu achieves far higher bioavailability and deeper dermal action.",
        },
      ],
    },
    es: {
      name: "Pack Renovación Cutánea",
      tagline: "Rejuvenecimiento dérmico avanzado a través de la ciencia de los péptidos",
      description:
        "El Pack Renovación Cutánea combina dos de los compuestos más potentes en la investigación dermatológica con péptidos. GHK-Cu (péptido de cobre) estimula la síntesis de colágeno y elastina, promueve la remodelación tisular y mejora las proteínas estructurales de la piel. El Glutatión, el principal antioxidante del organismo, proporciona un potente aclaramiento cutáneo, desintoxicación y protección contra el daño oxidativo inducido por UV.",
      benefits: [
        "Estimula la síntesis de colágeno y elastina para la renovación estructural",
        "Luminosidad cutánea y tono uniforme mediante la regulación de la melanina por el glutatión",
        "Protección antioxidante contra los rayos UV y el daño ambiental",
        "Promueve la cicatrización de heridas y la reducción de cicatrices",
        "Apoya la producción de ácido hialurónico para la hidratación cutánea",
        "Acción antiinflamatoria para reducir el enrojecimiento y la irritación",
      ],
      protocol:
        "El protocolo de Renovación Cutánea actúa sobre vías dérmicas complementarias. GHK-Cu aborda el componente estructural del envejecimiento cutáneo estimulando los fibroblastos para producir colágeno, elastina y glucosaminoglicanos. El Glutatión actúa sobre el lado oxidativo y de pigmentación, neutralizando los radicales libres e inhibiendo la tirosinasa. Los protocolos de investigación suelen durar 8-12 semanas.",
      faqs: [
        {
          question: "¿Cómo actúan juntos GHK-Cu y Glutatión para la piel?",
          answer:
            "GHK-Cu estimula la producción de proteínas estructurales (colágeno, elastina, proteoglicanos) que dan firmeza y elasticidad a la piel, mientras que el Glutatión proporciona protección antioxidante, aclara la piel inhibiendo la producción de melanina y apoya la desintoxicación.",
        },
        {
          question: "¿Cuánto tiempo antes de que se esperen mejoras cutáneas visibles?",
          answer:
            "Las mejoras iniciales en el tono y la luminosidad de la piel (del Glutatión) pueden aparecer en 2-4 semanas, mientras que las mejoras estructurales de la síntesis de colágeno (GHK-Cu) suelen ser visibles a las 6-12 semanas.",
        },
        {
          question: "¿Es el GHK-Cu inyectable más eficaz que los productos tópicos de péptidos de cobre?",
          answer:
            "El GHK-Cu inyectable administra el péptido sistémicamente, permitiéndole llegar a la capa dérmica directamente a través del torrente sanguíneo. Los productos tópicos de péptidos de cobre enfrentan importantes desafíos de penetración.",
        },
      ],
    },
    fr: {
      name: "Pack Renouvellement Cutané",
      tagline: "Rajeunissement dermique avancé par la science des peptides",
      description:
        "Le Pack Renouvellement Cutané associe deux des composés les plus puissants dans la recherche dermatologique peptidique. GHK-Cu (peptide de cuivre) stimule la synthèse du collagène et de l'élastine, favorise le remodelage tissulaire et améliore les protéines structurelles de la peau. Le Glutathion, le principal antioxydant de l'organisme, offre un puissant éclaircissement cutané, une détoxification et une protection contre les dommages oxydatifs induits par les UV.",
      benefits: [
        "Stimule la synthèse du collagène et de l'élastine pour le renouvellement structurel",
        "Éclat cutané et teint uniforme via la régulation de la mélanine par le glutathion",
        "Protection antioxydante contre les UV et les dommages environnementaux",
        "Favorise la cicatrisation et la réduction des cicatrices",
        "Soutient la production d'acide hyaluronique pour l'hydratation cutanée",
        "Action anti-inflammatoire pour réduire les rougeurs et l'irritation",
      ],
      protocol:
        "Le protocole Renouvellement Cutané cible des voies dermiques complémentaires. GHK-Cu traite le composant structurel du vieillissement cutané en stimulant les fibroblastes pour produire du collagène, de l'élastine et des glycosaminoglycanes. Le Glutathion agit sur le côté oxydatif et de pigmentation. Les protocoles de recherche durent généralement 8-12 semaines.",
      faqs: [
        {
          question: "Comment GHK-Cu et Glutathion agissent-ils ensemble pour la peau ?",
          answer:
            "GHK-Cu stimule la production de protéines structurelles (collagène, élastine, protéoglycanes) tandis que le Glutathion fournit une protection antioxydante, éclaircit la peau en inhibant la production de mélanine et soutient la détoxification.",
        },
        {
          question: "Combien de temps avant que des améliorations cutanées visibles soient attendues ?",
          answer:
            "Les améliorations initiales du teint (du Glutathion) peuvent apparaître en 2-4 semaines, tandis que les améliorations structurelles de la synthèse du collagène (GHK-Cu) deviennent typiquement visibles à 6-12 semaines.",
        },
        {
          question: "Le GHK-Cu injectable est-il plus efficace que les produits topiques au peptide de cuivre ?",
          answer:
            "Le GHK-Cu injectable délivre le peptide de manière systémique, lui permettant d'atteindre la couche dermique directement via la circulation sanguine, avec une biodisponibilité bien supérieure aux produits topiques.",
        },
      ],
    },
    de: {
      name: "Hautregeneration-Stack",
      tagline: "Fortschrittliche dermale Verjüngung durch Peptidwissenschaft",
      description:
        "Der Hautregeneration-Stack kombiniert zwei der wirksamsten Verbindungen in der dermatologischen Peptidforschung. GHK-Cu (Kupferpeptid) stimuliert die Kollagen- und Elastinsynthese, fördert das Gewebeumbau und verbessert die Strukturproteine der Haut. Glutathion, das wichtigste Antioxidans des Körpers, bietet leistungsstarke Hautaufhellung, Entgiftung und Schutz vor UV-induziertem oxidativen Schäden.",
      benefits: [
        "Stimuliert Kollagen- und Elastinsynthese für strukturelle Erneuerung",
        "Hautaufhellung und gleichmäßiger Teint durch Glutathion-Melanin-Regulation",
        "Antioxidativer Schutz gegen UV- und Umweltschäden",
        "Fördert Wundheilung und Narbenreduktion",
        "Unterstützt Hyaluronsäureproduktion für Hautfeuchtigkeit",
        "Entzündungshemmende Wirkung zur Reduzierung von Rötungen",
      ],
      protocol:
        "Das Hautregeneration-Protokoll zielt auf komplementäre dermale Wege ab. GHK-Cu behandelt den strukturellen Aspekt des Hautalterns durch Stimulierung von Fibroblasten zur Kollagen-, Elastin- und Glykosaminoglykanproduktion. Glutathion wirkt auf der oxidativen und Pigmentierungsseite. Forschungsprotokolle laufen typischerweise 8-12 Wochen.",
      faqs: [
        {
          question: "Wie wirken GHK-Cu und Glutathion zusammen für die Haut?",
          answer:
            "GHK-Cu stimuliert die Produktion von Strukturproteinen (Kollagen, Elastin, Proteoglykane), während Glutathion Antioxidationsschutz bietet, die Haut durch Hemmung der Melaninproduktion aufhellt und Entgiftung unterstützt.",
        },
        {
          question: "Wann sind sichtbare Hautverbesserungen zu erwarten?",
          answer:
            "Erste Verbesserungen in Hauttonus (von Glutathion) können nach 2-4 Wochen auftreten, strukturelle Verbesserungen durch Kollagensynthese (GHK-Cu) werden typischerweise nach 6-12 Wochen sichtbar.",
        },
        {
          question: "Ist injizierbares GHK-Cu wirksamer als topische Kupferpeptid-Produkte?",
          answer:
            "Injizierbares GHK-Cu liefert das Peptid systemisch und ermöglicht es, die Dermis direkt über den Blutkreislauf zu erreichen, mit weit höherer Bioverfügbarkeit als topische Produkte.",
        },
      ],
    },
    it: {
      name: "Stack Rinnovamento Cutaneo",
      tagline: "Ringiovanimento dermico avanzato attraverso la scienza dei peptidi",
      description:
        "Lo Stack Rinnovamento Cutaneo abbina due dei composti più potenti nella ricerca dermatologica peptidica. GHK-Cu (peptide di rame) stimola la sintesi di collagene ed elastina, promuove il rimodellamento tissutale e migliora le proteine strutturali della pelle. Il Glutatione, il principale antiossidante dell'organismo, fornisce potente schiarimento cutaneo, disintossicazione e protezione contro i danni ossidativi indotti dai raggi UV.",
      benefits: [
        "Stimola la sintesi di collagene ed elastina per il rinnovamento strutturale",
        "Luminosità cutanea e tono uniforme tramite la regolazione della melanina del glutatione",
        "Protezione antiossidante contro UV e danni ambientali",
        "Promuove la guarigione delle ferite e la riduzione delle cicatrici",
        "Supporta la produzione di acido ialuronico per l'idratazione cutanea",
        "Azione antinfiammatoria per ridurre rossori e irritazioni",
      ],
      protocol:
        "Il protocollo di Rinnovamento Cutaneo mira a vie dermiche complementari. GHK-Cu affronta la componente strutturale dell'invecchiamento cutaneo stimolando i fibroblasti a produrre collagene, elastina e glicosaminoglicani. Il Glutatione agisce sul lato ossidativo e della pigmentazione. I protocolli di ricerca durano tipicamente 8-12 settimane.",
      faqs: [
        {
          question: "Come agiscono insieme GHK-Cu e Glutatione per la pelle?",
          answer:
            "GHK-Cu stimola la produzione di proteine strutturali (collagene, elastina, proteoglicani) che conferiscono fermezza ed elasticità alla pelle, mentre il Glutatione fornisce protezione antiossidante, schiarisce la pelle inibendo la produzione di melanina e supporta la disintossicazione.",
        },
        {
          question: "Quanto tempo prima che siano attesi miglioramenti cutanei visibili?",
          answer:
            "I miglioramenti iniziali nel tono e nella luminosità della pelle (dal Glutatione) possono apparire entro 2-4 settimane, mentre i miglioramenti strutturali dalla sintesi del collagene (GHK-Cu) diventano tipicamente visibili a 6-12 settimane.",
        },
        {
          question: "Il GHK-Cu iniettabile è più efficace dei prodotti topici al peptide di rame?",
          answer:
            "Il GHK-Cu iniettabile fornisce il peptide in modo sistemico, consentendogli di raggiungere lo strato dermico direttamente tramite il flusso sanguigno, con biodisponibilità molto superiore ai prodotti topici.",
        },
      ],
    },
    pt: {
      name: "Stack de Renovação Cutânea",
      tagline: "Rejuvenescimento dérmico avançado através da ciência dos péptidos",
      description:
        "O Stack de Renovação Cutânea combina dois dos compostos mais potentes na investigação dermatológica peptídica. GHK-Cu (péptido de cobre) estimula a síntese de colagénio e elastina, promove o remodelamento tecidual e melhora as proteínas estruturais da pele. O Glutatião, o principal antioxidante do organismo, fornece potente clareamento cutâneo, desintoxicação e proteção contra danos oxidativos induzidos por UV.",
      benefits: [
        "Estimula a síntese de colagénio e elastina para renovação estrutural",
        "Clareamento cutâneo e tom uniforme via regulação da melanina pelo glutatião",
        "Proteção antioxidante contra UV e danos ambientais",
        "Promove a cicatrização de feridas e redução de cicatrizes",
        "Suporta a produção de ácido hialurónico para hidratação cutânea",
        "Ação anti-inflamatória para reduzir vermelhidão e irritação",
      ],
      protocol:
        "O protocolo de Renovação Cutânea visa vias dérmicas complementares. GHK-Cu aborda o componente estrutural do envelhecimento cutâneo estimulando fibroblastos a produzir colagénio, elastina e glicosaminoglicanos. O Glutatião atua no lado oxidativo e de pigmentação. Os protocolos de investigação duram tipicamente 8-12 semanas.",
      faqs: [
        {
          question: "Como o GHK-Cu e o Glutatião atuam juntos para a pele?",
          answer:
            "GHK-Cu estimula a produção de proteínas estruturais (colagénio, elastina, proteoglicanos) que conferem firmeza e elasticidade à pele, enquanto o Glutatião fornece proteção antioxidante, clareia a pele inibindo a produção de melanina e apoia a desintoxicação.",
        },
        {
          question: "Quanto tempo antes de se esperar melhorias cutâneas visíveis?",
          answer:
            "Melhorias iniciais no tom cutâneo (do Glutatião) podem aparecer em 2-4 semanas, enquanto melhorias estruturais da síntese de colagénio (GHK-Cu) tornam-se tipicamente visíveis às 6-12 semanas.",
        },
        {
          question: "O GHK-Cu injetável é mais eficaz do que produtos tópicos de péptidos de cobre?",
          answer:
            "O GHK-Cu injetável fornece o péptido sistemicamente, permitindo-lhe atingir a camada dérmica diretamente pela corrente sanguínea, com biodisponibilidade muito superior aos produtos tópicos.",
        },
      ],
    },
    nl: {
      name: "Huidvernieuwing Stack",
      tagline: "Geavanceerde dermale verjonging door peptidewetenschap",
      description:
        "De Huidvernieuwing Stack combineert twee van de meest krachtige verbindingen in dermatologisch peptideonderzoek. GHK-Cu (koperpeptide) stimuleert collageen- en elastinesynthese, bevordert weefselremodellering en verbetert de structurele huideiwitten. Glutathion, het meester antioxidant van het lichaam, biedt krachtige huidverheldering, ontgifting en bescherming tegen UV-geïnduceerde oxidatieve schade.",
      benefits: [
        "Stimuleert collageen- en elastinesynthese voor structurele vernieuwing",
        "Huidverheldering en egale teint via glutathions melanineregulatie",
        "Antioxidante bescherming tegen UV- en milieuschade",
        "Bevordert wondgenezing en littekens vermindering",
        "Ondersteunt hyaluronzuurproductie voor huidhydratatie",
        "Ontstekingsremmende werking om roodheid en irritatie te verminderen",
      ],
      protocol:
        "Het Huidvernieuwing protocol richt zich op complementaire dermale routes. GHK-Cu pakt het structurele onderdeel van huidveroudering aan door fibroblasten te stimuleren collageen, elastine en glycosaminoglycanen te produceren. Glutathion werkt op de oxidatieve en pigmentatiezijde. Onderzoeksprotocollen duren typisch 8-12 weken.",
      faqs: [
        {
          question: "Hoe werken GHK-Cu en Glutathion samen voor de huid?",
          answer:
            "GHK-Cu stimuleert de productie van structurele eiwitten (collageen, elastine, proteoglycanen) terwijl Glutathion antioxidante bescherming biedt, de huid verheldert door melanineproductie te remmen en ontgifting ondersteunt.",
        },
        {
          question: "Hoe lang voor zichtbare huidverbeteringen verwacht kunnen worden?",
          answer:
            "Eerste verbeteringen in huidteint (van Glutathion) kunnen binnen 2-4 weken optreden, structurele verbeteringen door collageensynthese (GHK-Cu) worden typisch zichtbaar bij 6-12 weken.",
        },
        {
          question: "Is injecteerbaar GHK-Cu effectiever dan topische koperpeptideproducten?",
          answer:
            "Injecteerbaar GHK-Cu levert het peptide systemisch, waardoor het de dermis direct via de bloedbaan kan bereiken, met een veel hogere biologische beschikbaarheid dan topische producten.",
        },
      ],
    },
    pl: {
      name: "Stack Odnowy Skóry",
      tagline: "Zaawansowane odmłodzenie skóry przez naukę o peptydach",
      description:
        "Stack Odnowy Skóry łączy dwa z najbardziej skutecznych związków w dermatologicznych badaniach peptydowych. GHK-Cu (peptyd miedzi) stymuluje syntezę kolagenu i elastyny, promuje przebudowę tkanek i wzmacnia strukturalne białka skóry. Glutation, główny antyoksydant organizmu, zapewnia silne rozjaśnienie skóry, detoksykację i ochronę przed oksydacyjnymi uszkodzeniami wywołanymi przez UV.",
      benefits: [
        "Stymuluje syntezę kolagenu i elastyny dla strukturalnej odnowy",
        "Rozjaśnienie skóry i wyrównanie tonu przez regulację melaniny przez glutation",
        "Ochrona antyoksydacyjna przed UV i uszkodzeniami środowiskowymi",
        "Promuje gojenie ran i redukcję blizn",
        "Wspiera produkcję kwasu hialuronowego dla nawilżenia skóry",
        "Działanie przeciwzapalne w celu zmniejszenia zaczerwienienia i podrażnień",
      ],
      protocol:
        "Protokół Odnowy Skóry celuje w uzupełniające szlaki skórne. GHK-Cu zajmuje się strukturalnym składnikiem starzenia skóry, stymulując fibroblasty do produkcji kolagenu, elastyny i glikozaminoglikanów. Glutation działa na stronę oksydacyjną i pigmentacji. Protokoły badawcze trwają zazwyczaj 8-12 tygodni.",
      faqs: [
        {
          question: "Jak GHK-Cu i Glutation działają razem na skórę?",
          answer:
            "GHK-Cu stymuluje produkcję strukturalnych białek (kolagen, elastyna, proteoglikany) nadających skórze sprężystość i elastyczność, podczas gdy Glutation zapewnia ochronę antyoksydacyjną, rozjaśnia skórę hamując produkcję melaniny i wspiera detoksykację.",
        },
        {
          question: "Kiedy można spodziewać się widocznych popraw skóry?",
          answer:
            "Wstępne poprawy tonu skóry (od Glutationu) mogą pojawić się w ciągu 2-4 tygodni, podczas gdy strukturalne poprawy syntezy kolagenu (GHK-Cu) stają się zazwyczaj widoczne po 6-12 tygodniach.",
        },
        {
          question: "Czy GHK-Cu do iniekcji jest skuteczniejszy niż miejscowe produkty z peptydami miedzi?",
          answer:
            "Injekcyjny GHK-Cu dostarcza peptyd systemowo, umożliwiając mu dotarcie do warstwy skórnej bezpośrednio przez krwiobieg, z znacznie wyższą biodostępnością niż produkty miejscowe.",
        },
      ],
    },
  },
  "athlete-recovery": {
    en: {
      name: "Athlete Recovery Stack",
      tagline: "Elite-level recovery with GH-enhanced tissue repair",
      description:
        "The Athlete Recovery Stack builds on the classic BPC-157 + TB-500 healing duo by adding CJC-1295 for growth hormone optimisation. This three-compound protocol addresses every dimension of athletic recovery: BPC-157 promotes tissue repair and reduces inflammation, TB-500 enhances cell migration and reduces fibrosis, and CJC-1295 elevates natural growth hormone to support muscle recovery, sleep quality, and body composition. This is the most comprehensive recovery protocol available for researchers studying elite athletic performance and injury rehabilitation.",
      benefits: [
        "Triple-compound approach to accelerated tissue repair",
        "Growth hormone elevation for enhanced muscle recovery",
        "Deep restorative sleep promotion for overnight regeneration",
        "Reduced inflammation across joints, tendons, and muscles",
        "Supports lean body composition during recovery periods",
        "Minimised scar tissue and fibrosis from training injuries",
      ],
      protocol:
        "The Athlete Recovery protocol combines two healing peptides with a growth hormone secretagogue for comprehensive recovery support. BPC-157 and TB-500 are typically administered together (subcutaneously near the area of concern) to maximise local tissue repair, while CJC-1295 is administered in the evening to amplify the natural nocturnal GH surge. Protocols typically run 6-8 weeks for acute injuries and 8-12 weeks for chronic conditions.",
      faqs: [
        {
          question: "Why add CJC-1295 to the BPC-157 + TB-500 recovery stack?",
          answer:
            "CJC-1295 adds a growth hormone dimension to the recovery protocol. Elevated GH supports muscle protein synthesis, deep sleep (when most tissue repair occurs), and lean body composition — all critical for athletic recovery. While BPC-157 and TB-500 handle direct tissue repair, CJC-1295 creates the optimal hormonal environment.",
        },
        {
          question: "Is this stack suitable during active training or only during injury recovery?",
          answer:
            "Many researchers study this stack both during active training phases (for enhanced recovery between sessions) and during injury rehabilitation. During active training, the stack may support faster recovery, reduced soreness, and better sleep quality.",
        },
        {
          question: "How should the three peptides be administered?",
          answer:
            "Common research protocols administer BPC-157 and TB-500 together in the morning or post-training (near the area of concern), and CJC-1295 separately in the evening before sleep to align with natural GH release patterns.",
        },
        {
          question: "Can Ipamorelin be added to this stack?",
          answer:
            "Yes, some researchers add Ipamorelin alongside CJC-1295 for enhanced GH release (see our Growth Hormone Stack). The four-peptide combination is well-documented in research literature.",
        },
      ],
    },
    es: {
      name: "Pack Recuperación del Atleta",
      tagline: "Recuperación de élite con reparación tisular potenciada por GH",
      description:
        "El Pack Recuperación del Atleta amplía el clásico dúo curativo BPC-157 + TB-500 añadiendo CJC-1295 para la optimización de la hormona de crecimiento. Este protocolo de tres compuestos aborda cada dimensión de la recuperación atlética: BPC-157 promueve la reparación tisular y reduce la inflamación, TB-500 mejora la migración celular y reduce la fibrosis, y CJC-1295 eleva la hormona de crecimiento natural para apoyar la recuperación muscular, la calidad del sueño y la composición corporal.",
      benefits: [
        "Enfoque de triple compuesto para la reparación tisular acelerada",
        "Elevación de la hormona de crecimiento para una recuperación muscular mejorada",
        "Promoción del sueño profundo y restaurador para la regeneración nocturna",
        "Inflamación reducida en articulaciones, tendones y músculos",
        "Apoya la composición corporal magra durante los períodos de recuperación",
        "Minimiza el tejido cicatricial y la fibrosis de las lesiones de entrenamiento",
      ],
      protocol:
        "El protocolo de Recuperación del Atleta combina dos péptidos curativos con un secretagogo de hormona de crecimiento para un soporte de recuperación completo. BPC-157 y TB-500 se administran típicamente juntos (subcutáneamente cerca del área de interés) para maximizar la reparación tisular local, mientras que CJC-1295 se administra por la noche. Los protocolos suelen durar 6-8 semanas para lesiones agudas y 8-12 semanas para condiciones crónicas.",
      faqs: [
        {
          question: "¿Por qué añadir CJC-1295 al stack de recuperación BPC-157 + TB-500?",
          answer:
            "CJC-1295 añade una dimensión de hormona de crecimiento al protocolo de recuperación. El GH elevado apoya la síntesis de proteínas musculares, el sueño profundo y la composición corporal magra, todos críticos para la recuperación atlética.",
        },
        {
          question: "¿Es este stack adecuado durante el entrenamiento activo o solo durante la recuperación de lesiones?",
          answer:
            "Muchos investigadores estudian este stack tanto durante las fases de entrenamiento activo como durante la rehabilitación de lesiones, apoyando una recuperación más rápida, menos agujetas y mejor calidad del sueño.",
        },
        {
          question: "¿Cómo se deben administrar los tres péptidos?",
          answer:
            "Los protocolos comunes administran BPC-157 y TB-500 juntos por la mañana o después del entrenamiento, y CJC-1295 por separado por la noche antes de dormir.",
        },
        {
          question: "¿Se puede añadir Ipamorelin a este stack?",
          answer:
            "Sí, algunos investigadores añaden Ipamorelin junto con CJC-1295 para una mayor liberación de GH. La combinación de cuatro péptidos está bien documentada en la literatura.",
        },
      ],
    },
    fr: {
      name: "Pack Récupération Athlète",
      tagline: "Récupération de niveau élite avec réparation tissulaire améliorée par GH",
      description:
        "Le Pack Récupération Athlète s'appuie sur le duo de guérison classique BPC-157 + TB-500 en ajoutant CJC-1295 pour l'optimisation de l'hormone de croissance. Ce protocole à trois composés traite chaque dimension de la récupération athlétique : BPC-157 favorise la réparation tissulaire et réduit l'inflammation, TB-500 améliore la migration cellulaire et réduit la fibrose, et CJC-1295 élève l'hormone de croissance naturelle.",
      benefits: [
        "Approche triple composé pour la réparation tissulaire accélérée",
        "Élévation de l'hormone de croissance pour une récupération musculaire améliorée",
        "Promotion du sommeil profond et réparateur pour la régénération nocturne",
        "Réduction de l'inflammation dans les articulations, tendons et muscles",
        "Soutient la composition corporelle maigre pendant les périodes de récupération",
        "Réduction du tissu cicatriciel et de la fibrose des blessures d'entraînement",
      ],
      protocol:
        "Le protocole de Récupération Athlète combine deux peptides de guérison avec un sécrétanogue d'hormone de croissance. BPC-157 et TB-500 sont administrés ensemble pour maximiser la réparation tissulaire locale, tandis que CJC-1295 est administré le soir. Les protocoles durent généralement 6-8 semaines pour les blessures aiguës et 8-12 semaines pour les affections chroniques.",
      faqs: [
        {
          question: "Pourquoi ajouter CJC-1295 au stack de récupération BPC-157 + TB-500 ?",
          answer:
            "CJC-1295 ajoute une dimension d'hormone de croissance au protocole de récupération. La GH élevée soutient la synthèse des protéines musculaires, le sommeil profond et la composition corporelle maigre.",
        },
        {
          question: "Ce stack est-il adapté pendant l'entraînement actif ou uniquement lors de la rééducation ?",
          answer:
            "De nombreux chercheurs étudient ce stack pendant les phases d'entraînement actif et pendant la rééducation, soutenant une récupération plus rapide et une meilleure qualité de sommeil.",
        },
        {
          question: "Comment les trois peptides doivent-ils être administrés ?",
          answer:
            "Les protocoles courants administrent BPC-157 et TB-500 ensemble le matin ou après l'entraînement, et CJC-1295 séparément le soir avant le sommeil.",
        },
        {
          question: "L'Ipamorelin peut-il être ajouté à ce stack ?",
          answer:
            "Oui, certains chercheurs ajoutent l'Ipamorelin aux côtés de CJC-1295 pour une libération accrue de GH. La combinaison à quatre peptides est bien documentée.",
        },
      ],
    },
    de: {
      name: "Athleten-Erholungs-Stack",
      tagline: "Erholung auf Elite-Niveau mit GH-verstärkter Gewebereparatur",
      description:
        "Der Athleten-Erholungs-Stack baut auf dem klassischen BPC-157 + TB-500 Heilungsduo auf, indem CJC-1295 zur Wachstumshormonoptimierung hinzugefügt wird. Dieses Drei-Verbindungs-Protokoll adressiert jede Dimension der sportlichen Erholung: BPC-157 fördert Gewebereparatur und reduziert Entzündungen, TB-500 verbessert Zellmigration und reduziert Fibrose, und CJC-1295 erhöht das natürliche Wachstumshormon.",
      benefits: [
        "Drei-Verbindungs-Ansatz für beschleunigte Gewebereparatur",
        "Wachstumshormonerhöhung für verbesserte Muskelerholung",
        "Förderung tiefen, erholsamen Schlafs für nächtliche Regeneration",
        "Reduzierte Entzündungen in Gelenken, Sehnen und Muskeln",
        "Unterstützt schlanke Körperzusammensetzung während Erholungsphasen",
        "Minimiertes Narbengewebe und Fibrose aus Trainingsverletzungen",
      ],
      protocol:
        "Das Athleten-Erholungsprotokoll kombiniert zwei Heilpeptide mit einem Wachstumshormon-Sekretagog. BPC-157 und TB-500 werden typischerweise zusammen verabreicht, um lokale Gewebereparatur zu maximieren, während CJC-1295 abends verabreicht wird. Protokolle laufen typischerweise 6-8 Wochen für akute Verletzungen und 8-12 Wochen für chronische Zustände.",
      faqs: [
        {
          question: "Warum CJC-1295 zum BPC-157 + TB-500 Erholungs-Stack hinzufügen?",
          answer:
            "CJC-1295 fügt dem Erholungsprotokoll eine Wachstumshormon-Dimension hinzu. Erhöhtes GH unterstützt Muskelproteinsynthese, tiefen Schlaf und schlanke Körperzusammensetzung — alles kritisch für athletische Erholung.",
        },
        {
          question: "Ist dieser Stack für aktives Training oder nur für Verletzungserholung geeignet?",
          answer:
            "Viele Forscher untersuchen diesen Stack sowohl während aktiver Trainingsphasen als auch während der Verletzungsrehabilitation, mit Unterstützung schnellerer Erholung und besserer Schlafqualität.",
        },
        {
          question: "Wie sollten die drei Peptide verabreicht werden?",
          answer:
            "Gängige Protokolle verabreichen BPC-157 und TB-500 zusammen morgens oder nach dem Training und CJC-1295 separat abends vor dem Schlafen.",
        },
        {
          question: "Kann Ipamorelin zu diesem Stack hinzugefügt werden?",
          answer:
            "Ja, einige Forscher fügen Ipamorelin neben CJC-1295 für verstärkte GH-Freisetzung hinzu. Die Vier-Peptid-Kombination ist gut in der Forschungsliteratur dokumentiert.",
        },
      ],
    },
    it: {
      name: "Stack Recupero Atleta",
      tagline: "Recupero di livello élite con riparazione tissutale potenziata da GH",
      description:
        "Lo Stack Recupero Atleta si basa sul classico duo curativo BPC-157 + TB-500 aggiungendo CJC-1295 per l'ottimizzazione dell'ormone della crescita. Questo protocollo a tre composti affronta ogni dimensione del recupero atletico: BPC-157 promuove la riparazione tissutale e riduce l'infiammazione, TB-500 migliora la migrazione cellulare e riduce la fibrosi, e CJC-1295 eleva l'ormone della crescita naturale.",
      benefits: [
        "Approccio a triplo composto per la riparazione tissutale accelerata",
        "Elevazione dell'ormone della crescita per un miglior recupero muscolare",
        "Promozione del sonno profondo e ristoratore per la rigenerazione notturna",
        "Riduzione dell'infiammazione in articolazioni, tendini e muscoli",
        "Supporta la composizione corporea magra durante i periodi di recupero",
        "Minimizza il tessuto cicatriziale e la fibrosi dalle lesioni da allenamento",
      ],
      protocol:
        "Il protocollo di Recupero Atleta combina due peptidi curativi con un secretagogo dell'ormone della crescita. BPC-157 e TB-500 vengono tipicamente somministrati insieme per massimizzare la riparazione tissutale locale, mentre CJC-1295 viene somministrato la sera. I protocolli durano tipicamente 6-8 settimane per lesioni acute e 8-12 settimane per condizioni croniche.",
      faqs: [
        {
          question: "Perché aggiungere CJC-1295 allo stack di recupero BPC-157 + TB-500?",
          answer:
            "CJC-1295 aggiunge una dimensione di ormone della crescita al protocollo di recupero. GH elevato supporta la sintesi proteica muscolare, il sonno profondo e la composizione corporea magra.",
        },
        {
          question: "Questo stack è adatto durante l'allenamento attivo o solo durante il recupero da infortuni?",
          answer:
            "Molti ricercatori studiano questo stack sia durante le fasi di allenamento attivo che durante la riabilitazione da infortuni, supportando un recupero più rapido e una migliore qualità del sonno.",
        },
        {
          question: "Come dovrebbero essere somministrati i tre peptidi?",
          answer:
            "I protocolli comuni somministrano BPC-157 e TB-500 insieme al mattino o dopo l'allenamento, e CJC-1295 separatamente la sera prima del sonno.",
        },
        {
          question: "L'Ipamorelin può essere aggiunto a questo stack?",
          answer:
            "Sì, alcuni ricercatori aggiungono Ipamorelin accanto a CJC-1295 per un maggiore rilascio di GH. La combinazione a quattro peptidi è ben documentata nella letteratura.",
        },
      ],
    },
    pt: {
      name: "Stack de Recuperação do Atleta",
      tagline: "Recuperação de nível elite com reparação tecidual potenciada por GH",
      description:
        "O Stack de Recuperação do Atleta baseia-se no clássico duo de cura BPC-157 + TB-500 adicionando CJC-1295 para otimização da hormona de crescimento. Este protocolo de três compostos aborda cada dimensão da recuperação atlética: BPC-157 promove reparação tecidual e reduz inflamação, TB-500 melhora migração celular e reduz fibrose, e CJC-1295 eleva a hormona de crescimento natural.",
      benefits: [
        "Abordagem de triple composto para reparação tecidual acelerada",
        "Elevação da hormona de crescimento para recuperação muscular melhorada",
        "Promoção do sono profundo e restaurador para regeneração noturna",
        "Inflamação reduzida em articulações, tendões e músculos",
        "Suporta composição corporal magra durante períodos de recuperação",
        "Minimiza tecido cicatricial e fibrose de lesões de treino",
      ],
      protocol:
        "O protocolo de Recuperação do Atleta combina dois péptidos de cura com um secretagogo da hormona de crescimento. BPC-157 e TB-500 são tipicamente administrados juntos para maximizar a reparação tecidual local, enquanto CJC-1295 é administrado à noite. Os protocolos duram tipicamente 6-8 semanas para lesões agudas e 8-12 semanas para condições crónicas.",
      faqs: [
        {
          question: "Por que adicionar CJC-1295 ao stack de recuperação BPC-157 + TB-500?",
          answer:
            "CJC-1295 adiciona uma dimensão de hormona de crescimento ao protocolo de recuperação. GH elevado apoia a síntese de proteínas musculares, sono profundo e composição corporal magra.",
        },
        {
          question: "Este stack é adequado durante treino ativo ou apenas durante recuperação de lesões?",
          answer:
            "Muitos investigadores estudam este stack tanto durante fases de treino ativo como durante reabilitação de lesões, suportando recuperação mais rápida e melhor qualidade de sono.",
        },
        {
          question: "Como devem ser administrados os três péptidos?",
          answer:
            "Protocolos comuns administram BPC-157 e TB-500 juntos de manhã ou após treino, e CJC-1295 separadamente à noite antes de dormir.",
        },
        {
          question: "O Ipamorelin pode ser adicionado a este stack?",
          answer:
            "Sim, alguns investigadores adicionam Ipamorelin ao lado de CJC-1295 para maior libertação de GH. A combinação de quatro péptidos está bem documentada na literatura.",
        },
      ],
    },
    nl: {
      name: "Atleet Herstel Stack",
      tagline: "Elite-niveau herstel met GH-verbeterd weefselherstel",
      description:
        "De Atleet Herstel Stack bouwt voort op het klassieke BPC-157 + TB-500 genezingsduo door CJC-1295 toe te voegen voor groeihormoonoptimalisatie. Dit drie-verbindingsprotocol behandelt elke dimensie van atletisch herstel: BPC-157 bevordert weefselherstel en vermindert ontsteking, TB-500 verbetert celmigratie en vermindert fibrose, en CJC-1295 verhoogt het natuurlijke groeihormoon.",
      benefits: [
        "Drievoudige verbindingsbenadering voor versneld weefselherstel",
        "Groeihormoonverhoging voor verbeterd spierherstel",
        "Bevordering van diep herstelend slaap voor nachtelijke regeneratie",
        "Verminderde ontsteking in gewrichten, pezen en spieren",
        "Ondersteunt slanke lichaamssamenstelling tijdens herstelperioden",
        "Geminimaliseerd littekenweefsel en fibrose van trainingsblessures",
      ],
      protocol:
        "Het Atleet Herstel protocol combineert twee genezingspeptiden met een groeihormoon-secretagoog. BPC-157 en TB-500 worden typisch samen toegediend om lokaal weefselherstel te maximaliseren, terwijl CJC-1295 's avonds wordt toegediend. Protocollen lopen typisch 6-8 weken voor acute blessures en 8-12 weken voor chronische aandoeningen.",
      faqs: [
        {
          question: "Waarom CJC-1295 toevoegen aan de BPC-157 + TB-500 herstelstack?",
          answer:
            "CJC-1295 voegt een groeihormoon-dimensie toe aan het herstelprotocol. Verhoogd GH ondersteunt spiereiwittsynthese, diepe slaap en slanke lichaamssamenstelling.",
        },
        {
          question: "Is deze stack geschikt tijdens actieve training of alleen bij herstel van blessures?",
          answer:
            "Veel onderzoekers bestuderen deze stack zowel tijdens actieve trainingsfasen als tijdens blessurerehabilitate, met ondersteuning van sneller herstel en betere slaapkwaliteit.",
        },
        {
          question: "Hoe moeten de drie peptiden worden toegediend?",
          answer:
            "Veelvoorkomende protocollen dienen BPC-157 en TB-500 samen toe 's ochtends of na training, en CJC-1295 afzonderlijk 's avonds voor het slapen.",
        },
        {
          question: "Kan Ipamorelin aan deze stack worden toegevoegd?",
          answer:
            "Ja, sommige onderzoekers voegen Ipamorelin naast CJC-1295 toe voor verbeterde GH-afgifte. De vier-peptide combinatie is goed gedocumenteerd in de onderzoeksliteratuur.",
        },
      ],
    },
    pl: {
      name: "Stack Regeneracji Sportowca",
      tagline: "Regeneracja na poziomie elity z naprawą tkanek wzmocnioną przez GH",
      description:
        "Stack Regeneracji Sportowca rozbudowuje klasyczny duet leczniczy BPC-157 + TB-500 o CJC-1295 dla optymalizacji hormonu wzrostu. Ten trójskładnikowy protokół zajmuje się każdym wymiarem regeneracji sportowej: BPC-157 promuje naprawę tkanek i redukuje stan zapalny, TB-500 poprawia migrację komórkową i redukuje zwłóknienia, a CJC-1295 podnosi naturalny hormon wzrostu.",
      benefits: [
        "Trójskładnikowe podejście do przyspieszonej naprawy tkanek",
        "Podwyższenie hormonu wzrostu dla lepszej regeneracji mięśni",
        "Promowanie głębokiego, regenerującego snu dla nocnej regeneracji",
        "Zmniejszony stan zapalny w stawach, ścięgnach i mięśniach",
        "Wspiera szczupłą kompozycję ciała podczas okresów regeneracji",
        "Minimalizacja tkanki bliznowatej i zwłóknień z urazów treningowych",
      ],
      protocol:
        "Protokół Regeneracji Sportowca łączy dwa peptydy lecznicze z sekretago genem hormonu wzrostu. BPC-157 i TB-500 są zazwyczaj podawane razem dla maksymalizacji lokalnej naprawy tkanek, podczas gdy CJC-1295 jest podawany wieczorem. Protokoły trwają zazwyczaj 6-8 tygodni dla ostrych urazów i 8-12 tygodni dla stanów przewlekłych.",
      faqs: [
        {
          question: "Dlaczego dodać CJC-1295 do stacku regeneracyjnego BPC-157 + TB-500?",
          answer:
            "CJC-1295 dodaje wymiar hormonu wzrostu do protokołu regeneracyjnego. Podwyższony GH wspiera syntezę białek mięśniowych, głęboki sen i szczupłą kompozycję ciała.",
        },
        {
          question: "Czy ten stack jest odpowiedni podczas aktywnego treningu czy tylko podczas regeneracji po urazach?",
          answer:
            "Wielu badaczy bada ten stack zarówno podczas aktywnych faz treningowych, jak i podczas rehabilitacji po urazach, wspierając szybszą regenerację i lepszą jakość snu.",
        },
        {
          question: "Jak należy podawać trzy peptydy?",
          answer:
            "Popularne protokoły podają BPC-157 i TB-500 razem rano lub po treningu, a CJC-1295 oddzielnie wieczorem przed snem.",
        },
        {
          question: "Czy można dodać Ipamorelin do tego stacku?",
          answer:
            "Tak, niektórzy badacze dodają Ipamorelin obok CJC-1295 dla wzmocnionego uwalniania GH. Kombinacja czterech peptydów jest dobrze udokumentowana w literaturze.",
        },
      ],
    },
  },
  "nad-complete": {
    en: {
      name: "NAD+ Complete Stack",
      tagline: "Dual-delivery NAD+ for maximum cellular rejuvenation",
      description:
        "The NAD+ Complete Stack combines two delivery systems for comprehensive NAD+ replenishment. The ORYN NAD+ Pen (500mg, peptide pen system) provides a concentrated monthly dose through our precision pen platform, while the NovaDose NAD+ (500mg, cartridge system) enables daily micro-dosing for sustained NAD+ elevation throughout the day. This dual-delivery approach ensures both acute NAD+ supplementation and continuous baseline maintenance — the most thorough NAD+ protocol available outside of clinical IV therapy, at a fraction of the cost.",
      benefits: [
        "Dual-delivery system for comprehensive NAD+ replenishment",
        "Sustained cellular energy production and mitochondrial support",
        "DNA repair pathway activation for genomic stability",
        "Cognitive clarity and neuroprotective benefits",
        "More affordable and convenient than IV NAD+ therapy",
        "Supports sirtuin activation — the longevity gene pathway",
      ],
      protocol:
        "The NAD+ Complete protocol leverages two complementary delivery systems. The ORYN NAD+ Pen provides concentrated subcutaneous NAD+ administration for significant acute elevation of cellular NAD+ levels. The NovaDose system complements this with daily micro-doses that maintain elevated NAD+ throughout the day, preventing the troughs that occur between larger doses. This mirrors the strategy used in clinical NAD+ research, where sustained elevation produces superior outcomes.",
      faqs: [
        {
          question: "Why use two different NAD+ delivery systems?",
          answer:
            "The two systems serve complementary roles. The NAD+ Pen delivers a concentrated dose for acute NAD+ elevation, while the NovaDose system provides daily micro-doses to maintain sustained levels. This dual approach prevents the peaks and troughs of single-delivery protocols, keeping cellular NAD+ consistently elevated.",
        },
        {
          question: "How does this compare to IV NAD+ therapy?",
          answer:
            "IV NAD+ therapy typically costs hundreds of pounds per session and requires clinical visits. The NAD+ Complete Stack provides comparable NAD+ delivery at a fraction of the cost, with the convenience of self-administered pen systems.",
        },
        {
          question: "What are the signs of NAD+ depletion?",
          answer:
            "Research associates NAD+ depletion with fatigue, cognitive fog, reduced exercise capacity, poor sleep quality, and accelerated aging markers. NAD+ levels naturally decline by approximately 50% between ages 40 and 60.",
        },
        {
          question: "Can I combine the NAD+ Complete Stack with other ORYN stacks?",
          answer:
            "Yes, NAD+ is a foundational compound that complements virtually any peptide protocol. It is particularly synergistic with the Anti-Aging Stack (adding GHK-Cu and Glutathione) and the Total Wellness Stack (BPC-157 and Glutathione).",
        },
      ],
    },
    es: {
      name: "Pack NAD+ Completo",
      tagline: "NAD+ de doble administración para el máximo rejuvenecimiento celular",
      description:
        "El Pack NAD+ Completo combina dos sistemas de administración para una reposición completa de NAD+. El ORYN NAD+ Pen (500mg, sistema de pluma de péptidos) proporciona una dosis mensual concentrada, mientras que el NovaDose NAD+ (500mg, sistema de cartucho) permite la micro-dosificación diaria para una elevación sostenida de NAD+ durante todo el día. Este enfoque de doble administración garantiza tanto la suplementación aguda de NAD+ como el mantenimiento continuo de la línea base.",
      benefits: [
        "Sistema de doble administración para la reposición completa de NAD+",
        "Producción de energía celular sostenida y soporte mitocondrial",
        "Activación de vías de reparación del ADN para la estabilidad genómica",
        "Claridad cognitiva y beneficios neuroprotectores",
        "Más asequible y conveniente que la terapia intravenosa de NAD+",
        "Apoya la activación de las sirtuinas — la vía del gen de la longevidad",
      ],
      protocol:
        "El protocolo NAD+ Completo aprovecha dos sistemas de administración complementarios. El ORYN NAD+ Pen proporciona una administración subcutánea concentrada de NAD+, mientras que el sistema NovaDose complementa esto con micro-dosis diarias que mantienen el NAD+ elevado durante todo el día.",
      faqs: [
        {
          question: "¿Por qué usar dos sistemas de administración de NAD+ diferentes?",
          answer:
            "Los dos sistemas sirven funciones complementarias. La pluma NAD+ ofrece una dosis concentrada para la elevación aguda de NAD+, mientras que el sistema NovaDose proporciona micro-dosis diarias para mantener niveles sostenidos.",
        },
        {
          question: "¿Cómo se compara esto con la terapia intravenosa de NAD+?",
          answer:
            "La terapia intravenosa de NAD+ suele costar cientos de libras por sesión y requiere visitas clínicas. El Pack NAD+ Completo proporciona una administración comparable de NAD+ a una fracción del coste.",
        },
        {
          question: "¿Cuáles son los signos del agotamiento de NAD+?",
          answer:
            "La investigación asocia el agotamiento de NAD+ con fatiga, niebla cognitiva, capacidad de ejercicio reducida, mala calidad del sueño y marcadores de envejecimiento acelerado.",
        },
        {
          question: "¿Puedo combinar el Pack NAD+ Completo con otros stacks de ORYN?",
          answer:
            "Sí, el NAD+ es un compuesto fundamental que complementa prácticamente cualquier protocolo de péptidos, siendo especialmente sinérgico con el Pack Antienvejecimiento y el Pack Bienestar Total.",
        },
      ],
    },
    fr: {
      name: "Pack NAD+ Complet",
      tagline: "NAD+ double administration pour un rajeunissement cellulaire maximum",
      description:
        "Le Pack NAD+ Complet combine deux systèmes d'administration pour un réapprovisionnement complet en NAD+. Le Stylo NAD+ ORYN (500mg) fournit une dose mensuelle concentrée, tandis que le NovaDose NAD+ (500mg, système à cartouche) permet un micro-dosage quotidien pour une élévation soutenue du NAD+ tout au long de la journée.",
      benefits: [
        "Système double administration pour un réapprovisionnement complet en NAD+",
        "Production d'énergie cellulaire soutenue et soutien mitochondrial",
        "Activation des voies de réparation de l'ADN pour la stabilité génomique",
        "Clarté cognitive et bénéfices neuroprotecteurs",
        "Plus abordable et pratique que la thérapie IV NAD+",
        "Soutient l'activation des sirtuines — la voie du gène de la longévité",
      ],
      protocol:
        "Le protocole NAD+ Complet exploite deux systèmes d'administration complémentaires. Le Stylo NAD+ ORYN fournit une administration sous-cutanée concentrée, tandis que le système NovaDose complète cela avec des micro-doses quotidiennes pour maintenir un NAD+ élevé tout au long de la journée.",
      faqs: [
        {
          question: "Pourquoi utiliser deux systèmes d'administration NAD+ différents ?",
          answer:
            "Les deux systèmes jouent des rôles complémentaires. Le stylo NAD+ délivre une dose concentrée pour l'élévation aiguë du NAD+, tandis que le système NovaDose maintient des niveaux soutenus avec des micro-doses quotidiennes.",
        },
        {
          question: "Comment cela se compare-t-il à la thérapie IV NAD+ ?",
          answer:
            "La thérapie IV NAD+ coûte généralement des centaines de livres par session et nécessite des visites cliniques. Le Pack NAD+ Complet offre une administration comparable à une fraction du coût.",
        },
        {
          question: "Quels sont les signes de déplétion en NAD+ ?",
          answer:
            "La recherche associe la déplétion en NAD+ à la fatigue, le brouillard cognitif, une capacité d'exercice réduite, une mauvaise qualité de sommeil et des marqueurs de vieillissement accéléré.",
        },
        {
          question: "Puis-je combiner le Pack NAD+ Complet avec d'autres stacks ORYN ?",
          answer:
            "Oui, le NAD+ est un composé fondamental qui complète pratiquement tout protocole peptidique, particulièrement synergique avec le Pack Anti-Âge et le Pack Bien-Être Total.",
        },
      ],
    },
    de: {
      name: "NAD+ Komplett-Stack",
      tagline: "Dual-Delivery-NAD+ für maximale zelluläre Verjüngung",
      description:
        "Der NAD+ Komplett-Stack kombiniert zwei Verabreichungssysteme für umfassende NAD+-Auffüllung. Der ORYN NAD+ Pen (500mg) bietet eine konzentrierte Monatsdosis, während das NovaDose NAD+ (500mg, Kartuschensystem) tägliche Mikrodosierung für anhaltende NAD+-Erhöhung ermöglicht.",
      benefits: [
        "Dual-Delivery-System für umfassende NAD+-Auffüllung",
        "Anhaltende zelluläre Energieproduktion und mitochondriale Unterstützung",
        "Aktivierung von DNA-Reparaturwegen für genomische Stabilität",
        "Kognitive Klarheit und neuroprotektive Vorteile",
        "Erschwinglicher und bequemer als IV-NAD+-Therapie",
        "Unterstützt Sirtuin-Aktivierung — der Langlebigkeitsgen-Weg",
      ],
      protocol:
        "Das NAD+ Komplett-Protokoll nutzt zwei komplementäre Verabreichungssysteme. Der ORYN NAD+ Pen bietet konzentrierte subkutane NAD+-Verabreichung, während das NovaDose-System täglich Mikrodosen liefert, um den NAD+-Spiegel den ganzen Tag aufrechtzuerhalten.",
      faqs: [
        {
          question: "Warum zwei verschiedene NAD+-Verabreichungssysteme verwenden?",
          answer:
            "Die beiden Systeme erfüllen komplementäre Rollen. Der NAD+ Pen liefert eine konzentrierte Dosis für akute NAD+-Erhöhung, während das NovaDose-System tägliche Mikrodosen für anhaltende Spiegel bereitstellt.",
        },
        {
          question: "Wie vergleicht sich dies mit IV-NAD+-Therapie?",
          answer:
            "IV-NAD+-Therapie kostet typischerweise Hunderte von Pfund pro Sitzung und erfordert klinische Besuche. Der NAD+ Komplett-Stack bietet vergleichbare NAD+-Verabreichung zu einem Bruchteil der Kosten.",
        },
        {
          question: "Was sind die Zeichen eines NAD+-Mangels?",
          answer:
            "Forschung assoziiert NAD+-Mangel mit Müdigkeit, kognitivem Nebel, reduzierter Trainingskapazität, schlechter Schlafqualität und beschleunigten Alterungsmarkern.",
        },
        {
          question: "Kann ich den NAD+ Komplett-Stack mit anderen ORYN-Stacks kombinieren?",
          answer:
            "Ja, NAD+ ist eine grundlegende Verbindung, die praktisch jedes Peptidprotokoll ergänzt, besonders synergistisch mit dem Anti-Aging-Stack und dem Total-Wellness-Stack.",
        },
      ],
    },
    it: {
      name: "Stack NAD+ Completo",
      tagline: "NAD+ a doppia somministrazione per il massimo ringiovanimento cellulare",
      description:
        "Lo Stack NAD+ Completo combina due sistemi di somministrazione per un reintegro completo di NAD+. Il NAD+ Pen ORYN (500mg) fornisce una dose mensile concentrata, mentre il NovaDose NAD+ (500mg, sistema a cartuccia) consente il micro-dosaggio giornaliero per un'elevazione sostenuta del NAD+ durante tutto il giorno.",
      benefits: [
        "Sistema a doppia somministrazione per il reintegro completo di NAD+",
        "Produzione di energia cellulare sostenuta e supporto mitocondriale",
        "Attivazione delle vie di riparazione del DNA per la stabilità genomica",
        "Chiarezza cognitiva e benefici neuroprotettivi",
        "Più conveniente e pratico della terapia IV di NAD+",
        "Supporta l'attivazione delle sirtuine — la via del gene della longevità",
      ],
      protocol:
        "Il protocollo NAD+ Completo sfrutta due sistemi di somministrazione complementari. Il NAD+ Pen ORYN fornisce somministrazione sottocutanea concentrata di NAD+, mentre il sistema NovaDose integra questo con micro-dosi giornaliere che mantengono il NAD+ elevato durante tutto il giorno.",
      faqs: [
        {
          question: "Perché usare due sistemi di somministrazione NAD+ diversi?",
          answer:
            "I due sistemi svolgono ruoli complementari. La penna NAD+ fornisce una dose concentrata per l'elevazione acuta del NAD+, mentre il sistema NovaDose mantiene livelli sostenuti con micro-dosi giornaliere.",
        },
        {
          question: "Come si confronta con la terapia IV NAD+?",
          answer:
            "La terapia IV NAD+ costa tipicamente centinaia di sterline per sessione e richiede visite cliniche. Lo Stack NAD+ Completo fornisce somministrazione di NAD+ comparabile a una frazione del costo.",
        },
        {
          question: "Quali sono i segni di deplezione di NAD+?",
          answer:
            "La ricerca associa la deplezione di NAD+ con affaticamento, nebbia cognitiva, capacità di esercizio ridotta, scarsa qualità del sonno e marcatori di invecchiamento accelerato.",
        },
        {
          question: "Posso combinare lo Stack NAD+ Completo con altri stack ORYN?",
          answer:
            "Sì, NAD+ è un composto fondamentale che complementa praticamente qualsiasi protocollo peptidico, particolarmente sinergico con lo Stack Anti-Età e lo Stack Benessere Totale.",
        },
      ],
    },
    pt: {
      name: "Stack NAD+ Completo",
      tagline: "NAD+ de dupla administração para máximo rejuvenescimento celular",
      description:
        "O Stack NAD+ Completo combina dois sistemas de administração para reposição abrangente de NAD+. O ORYN NAD+ Pen (500mg) fornece uma dose mensal concentrada, enquanto o NovaDose NAD+ (500mg, sistema de cartucho) permite micro-dosagem diária para elevação sustentada de NAD+ ao longo do dia.",
      benefits: [
        "Sistema de dupla administração para reposição abrangente de NAD+",
        "Produção de energia celular sustentada e suporte mitocondrial",
        "Ativação de vias de reparação do ADN para estabilidade genómica",
        "Clareza cognitiva e benefícios neuroprotetores",
        "Mais acessível e conveniente do que a terapia IV de NAD+",
        "Suporta ativação das sirtuínas — a via do gene da longevidade",
      ],
      protocol:
        "O protocolo NAD+ Completo aproveita dois sistemas de administração complementares. O ORYN NAD+ Pen fornece administração subcutânea concentrada de NAD+, enquanto o sistema NovaDose complementa com micro-doses diárias para manter NAD+ elevado durante todo o dia.",
      faqs: [
        {
          question: "Por que usar dois sistemas de administração de NAD+ diferentes?",
          answer:
            "Os dois sistemas servem funções complementares. A caneta NAD+ fornece dose concentrada para elevação aguda de NAD+, enquanto o sistema NovaDose mantém níveis sustentados com micro-doses diárias.",
        },
        {
          question: "Como se compara com a terapia IV de NAD+?",
          answer:
            "A terapia IV de NAD+ custa tipicamente centenas de libras por sessão e requer visitas clínicas. O Stack NAD+ Completo fornece administração comparável de NAD+ a uma fração do custo.",
        },
        {
          question: "Quais são os sinais de depleção de NAD+?",
          answer:
            "A investigação associa depleção de NAD+ com fadiga, névoa cognitiva, capacidade de exercício reduzida, má qualidade de sono e marcadores de envelhecimento acelerado.",
        },
        {
          question: "Posso combinar o Stack NAD+ Completo com outros stacks ORYN?",
          answer:
            "Sim, NAD+ é um composto fundamental que complementa praticamente qualquer protocolo peptídico, sendo especialmente sinérgico com o Stack Anti-Envelhecimento e o Stack de Bem-Estar Total.",
        },
      ],
    },
    nl: {
      name: "NAD+ Complete Stack",
      tagline: "Dubbele levering NAD+ voor maximale cellulaire verjonging",
      description:
        "De NAD+ Complete Stack combineert twee leveringssystemen voor uitgebreide NAD+-aanvulling. De ORYN NAD+ Pen (500mg) biedt een geconcentreerde maandelijkse dosis, terwijl het NovaDose NAD+ (500mg, cartridgesysteem) dagelijkse microdosering mogelijk maakt voor aanhoudende NAD+-verhoging gedurende de dag.",
      benefits: [
        "Dubbel leveringssysteem voor uitgebreide NAD+-aanvulling",
        "Aanhoudende cellulaire energieproductie en mitochondriale ondersteuning",
        "Activering van DNA-herstelwegen voor genomische stabiliteit",
        "Cognitieve helderheid en neuroprotectieve voordelen",
        "Betaalbaarder en handiger dan IV NAD+-therapie",
        "Ondersteunt sirtuïneactivering — de levensduurgenroute",
      ],
      protocol:
        "Het NAD+ Complete protocol maakt gebruik van twee complementaire leveringssystemen. De ORYN NAD+ Pen biedt geconcentreerde subcutane NAD+-toediening, terwijl het NovaDose-systeem dit aanvult met dagelijkse microdoses om NAD+ de gehele dag verhoogd te houden.",
      faqs: [
        {
          question: "Waarom twee verschillende NAD+-leveringssystemen gebruiken?",
          answer:
            "De twee systemen dienen complementaire rollen. De NAD+ Pen levert een geconcentreerde dosis voor acute NAD+-verhoging, terwijl het NovaDose-systeem dagelijkse microdoses verstrekt voor aanhoudende niveaus.",
        },
        {
          question: "Hoe verhoudt dit zich tot IV NAD+-therapie?",
          answer:
            "IV NAD+-therapie kost doorgaans honderden pond per sessie en vereist klinische bezoeken. De NAD+ Complete Stack biedt vergelijkbare NAD+-levering tegen een fractie van de kosten.",
        },
        {
          question: "Wat zijn de tekenen van NAD+-depletie?",
          answer:
            "Onderzoek associeert NAD+-depletie met vermoeidheid, cognitieve mist, verminderd uithoudingsvermogen, slechte slaapkwaliteit en versnelde verouderingsmarkers.",
        },
        {
          question: "Kan ik de NAD+ Complete Stack combineren met andere ORYN-stacks?",
          answer:
            "Ja, NAD+ is een fundamentele verbinding die vrijwel elk peptideprotocol aanvult, met name synergetisch met de Anti-Veroudering Stack en de Totale Wellness Stack.",
        },
      ],
    },
    pl: {
      name: "Stack NAD+ Complete",
      tagline: "NAD+ z podwójnym dostarczaniem dla maksymalnego odmłodzenia komórkowego",
      description:
        "Stack NAD+ Complete łączy dwa systemy dostarczania dla kompleksowego uzupełnienia NAD+. ORYN NAD+ Pen (500mg) zapewnia skoncentrowaną miesięczną dawkę, podczas gdy NovaDose NAD+ (500mg, system nabojowy) umożliwia codzienne mikrodawkowanie dla trwałego podwyższenia NAD+ przez cały dzień.",
      benefits: [
        "System podwójnego dostarczania dla kompleksowego uzupełnienia NAD+",
        "Trwała produkcja energii komórkowej i wsparcie mitochondrialne",
        "Aktywacja szlaków naprawy DNA dla stabilności genomowej",
        "Jasność poznawcza i neuroprotekcyjne korzyści",
        "Bardziej przystępna i wygodna niż terapia IV NAD+",
        "Wspiera aktywację syrtuin — szlak genów długowieczności",
      ],
      protocol:
        "Protokół NAD+ Complete wykorzystuje dwa uzupełniające systemy dostarczania. ORYN NAD+ Pen zapewnia skoncentrowane podskórne podawanie NAD+, podczas gdy system NovaDose uzupełnia to codziennymi mikrodawkami utrzymującymi NAD+ na podwyższonym poziomie przez cały dzień.",
      faqs: [
        {
          question: "Dlaczego używać dwóch różnych systemów dostarczania NAD+?",
          answer:
            "Dwa systemy pełnią uzupełniające funkcje. Pióro NAD+ dostarcza skoncentrowaną dawkę dla ostrego podwyższenia NAD+, podczas gdy system NovaDose utrzymuje trwałe poziomy codziennymi mikrodawkami.",
        },
        {
          question: "Jak to wypada w porównaniu z terapią IV NAD+?",
          answer:
            "Terapia IV NAD+ kosztuje zazwyczaj setki funtów za sesję i wymaga wizyt klinicznych. Stack NAD+ Complete zapewnia porównywalne dostarczanie NAD+ za ułamek kosztów.",
        },
        {
          question: "Jakie są oznaki wyczerpania NAD+?",
          answer:
            "Badania wiążą wyczerpanie NAD+ ze zmęczeniem, mgłą poznawczą, zmniejszoną wydolnością fizyczną, złą jakością snu i przyspieszonymi markerami starzenia.",
        },
        {
          question: "Czy mogę łączyć Stack NAD+ Complete z innymi stackami ORYN?",
          answer:
            "Tak, NAD+ jest podstawowym związkiem uzupełniającym praktycznie każdy protokół peptydowy, szczególnie synergistyczny ze Stackiem Anti-Aging i Stackiem Totalnego Dobrostanu.",
        },
      ],
    },
  },
};

export function getLocalizedBundle(
  slug: string,
  locale: Locale
): BundleTranslation | undefined {
  return bundleTranslations[slug]?.[locale] ?? bundleTranslations[slug]?.["en"];
}

export function getLocalizedBundles(locale: Locale) {
  return Object.entries(bundleTranslations).map(([slug, translations]) => ({
    slug,
    ...(translations[locale] ?? translations["en"]),
  }));
}
