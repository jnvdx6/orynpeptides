"use client";

import { useState } from "react";
import { OrynLogo } from "@/components/icons/OrynLogo";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";
import { trackNewsletterSignup } from "@/lib/analytics";
import { openCookieSettings } from "@/components/ui/CookieConsent";
import { BRAZILIAN_CITIES } from "@/data/brazilian-cities";


function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full md:pointer-events-none"
      >
        <h4 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange">{title}</h4>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF6A1A"
          strokeWidth="2"
          className={`md:hidden transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 md:max-h-none md:opacity-100 md:mt-4 ${open ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const { t, locale } = useLocale();
  const f = t.footer;
  const isBrazil = locale === "pt-br";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = {
    [f.sections.products]: [
      { href: "/products", label: f.productLinks.all },
      { href: "/products?category=peptide-pen", label: f.productLinks.pens },
      { href: "/products?category=medit-pen", label: f.productLinks.medit },
      { href: "/products?category=novadose", label: f.productLinks.novadose },
    ],
    [f.sections.company]: [
      { href: "/about", label: f.companyLinks.about },
      { href: "/science", label: f.companyLinks.science },
      { href: "/quality", label: f.companyLinks.quality },
      { href: "/about", label: f.companyLinks.whyOryn },
      { href: "/learn", label: f.companyLinks.researchHub },
      { href: "/tools/peptide-calculator", label: f.companyLinks.calculator },
      { href: "/contact", label: f.companyLinks.contact },
    ],
    [f.sections.legal]: [
      { href: "/terms", label: f.legalLinks.terms },
      { href: "/privacy", label: f.legalLinks.privacy },
      { href: "/disclaimer", label: f.legalLinks.disclaimer },
      { href: "#cookie-settings", label: f.legalLinks.cookieSettings, onClick: openCookieSettings },
    ],
  };

  const categoryLinks = [
    { href: "/peptides-for/recovery", label: t.researchCategories["recovery"] || "Recovery & Healing" },
    { href: "/peptides-for/weight-loss", label: t.researchCategories["weight-loss"] || "Weight Loss" },
    { href: "/peptides-for/anti-aging", label: t.researchCategories["anti-aging"] || "Anti-Aging" },
    { href: "/peptides-for/muscle-growth", label: t.researchCategories["muscle-growth"] || "Muscle Growth" },
    { href: "/peptides-for/skin-rejuvenation", label: t.researchCategories["skin-rejuvenation"] || "Skin Rejuvenation" },
    { href: "/peptides-for/sleep-quality", label: t.researchCategories["sleep-quality"] || "Sleep & Recovery" },
    { href: "/peptides-for/gut-health", label: t.researchCategories["gut-health"] || "Gut Health" },
    { href: "/peptides-for/joint-health", label: t.researchCategories["joint-health"] || "Joint & Tendon" },
    { href: "/peptides-for/hair-growth", label: t.researchCategories["hair-growth"] || "Hair Growth" },
    { href: "/peptides-for/immune-support", label: t.researchCategories["immune-support"] || "Immune Support" },
    { href: "/peptides-for/tendon-repair", label: t.researchCategories["tendon-repair"] || "Tendon Repair" },
    { href: "/peptides-for/sports-recovery", label: t.researchCategories["sports-recovery"] || "Sports Recovery" },
    { href: "/peptides-for/post-surgery", label: t.researchCategories["post-surgery"] || "Post-Surgery" },
    { href: "/peptides-for/cognitive-enhancement", label: t.researchCategories["cognitive-enhancement"] || "Cognitive Enhancement" },
    { href: "/peptides-for/energy-vitality", label: t.researchCategories["energy-vitality"] || "Energy & Vitality" },
    { href: "/peptides-for/detox-cleanse", label: t.researchCategories["detox-cleanse"] || "Detox & Cleanse" },
    { href: "/peptides-for/body-composition", label: t.researchCategories["body-composition"] || "Body Composition" },
    { href: "/peptides-for/inflammation", label: t.researchCategories["inflammation"] || "Inflammation & Pain" },
    { href: "/peptides-for/hormonal-balance", label: t.researchCategories["hormonal-balance"] || "Hormonal Balance" },
    { href: "/peptides-for/longevity-biohacking", label: t.researchCategories["longevity-biohacking"] || "Longevity & Biohacking" },
  ];

  const ukCityLinks = [
    { href: "/peptides/london", label: "London" },
    { href: "/peptides/manchester", label: "Manchester" },
    { href: "/peptides/birmingham", label: "Birmingham" },
    { href: "/peptides/edinburgh", label: "Edinburgh" },
    { href: "/peptides/glasgow", label: "Glasgow" },
    { href: "/peptides/leeds", label: "Leeds" },
    { href: "/peptides/bristol", label: "Bristol" },
    { href: "/peptides/liverpool", label: "Liverpool" },
    { href: "/peptides/cambridge", label: "Cambridge" },
    { href: "/peptides/oxford", label: "Oxford" },
    { href: "/peptides/cardiff", label: "Cardiff" },
    { href: "/peptides/newcastle", label: "Newcastle" },
    { href: "/peptides/brighton", label: "Brighton" },
    { href: "/peptides/sheffield", label: "Sheffield" },
    { href: "/peptides/nottingham", label: "Nottingham" },
    { href: "/peptides/belfast", label: "Belfast" },
    { href: "/peptides/southampton", label: "Southampton" },
    { href: "/peptides/york", label: "York" },
    { href: "/peptides/reading", label: "Reading" },
    { href: "/peptides/aberdeen", label: "Aberdeen" },
    { href: "/peptides/leicester", label: "Leicester" },
    { href: "/peptides/coventry", label: "Coventry" },
    { href: "/peptides/hull", label: "Hull" },
    { href: "/peptides/stoke-on-trent", label: "Stoke-on-Trent" },
    { href: "/peptides/plymouth", label: "Plymouth" },
    { href: "/peptides/derby", label: "Derby" },
    { href: "/peptides/swansea", label: "Swansea" },
    { href: "/peptides/exeter", label: "Exeter" },
    { href: "/peptides/bath", label: "Bath" },
    { href: "/peptides/dundee", label: "Dundee" },
    { href: "/peptides/bournemouth", label: "Bournemouth" },
    { href: "/peptides/norwich", label: "Norwich" },
    { href: "/peptides/ipswich", label: "Ipswich" },
    { href: "/peptides/milton-keynes", label: "Milton Keynes" },
    { href: "/peptides/cheltenham", label: "Cheltenham" },
    { href: "/peptides/wolverhampton", label: "Wolverhampton" },
    { href: "/peptides/sunderland", label: "Sunderland" },
    { href: "/peptides/peterborough", label: "Peterborough" },
    { href: "/peptides/blackpool", label: "Blackpool" },
    { href: "/peptides/middlesbrough", label: "Middlesbrough" },
    { href: "/peptides/bolton", label: "Bolton" },
    { href: "/peptides/luton", label: "Luton" },
    { href: "/peptides/colchester", label: "Colchester" },
    { href: "/peptides/gloucester", label: "Gloucester" },
    { href: "/peptides/warrington", label: "Warrington" },
    { href: "/peptides/canterbury", label: "Canterbury" },
    { href: "/peptides/worcester", label: "Worcester" },
    { href: "/peptides/lincoln", label: "Lincoln" },
    { href: "/peptides/stirling", label: "Stirling" },
    { href: "/peptides/inverness", label: "Inverness" },
    { href: "/peptides/slough", label: "Slough" },
    { href: "/peptides/stockport", label: "Stockport" },
    { href: "/peptides/doncaster", label: "Doncaster" },
    { href: "/peptides/basildon", label: "Basildon" },
    { href: "/peptides/crawley", label: "Crawley" },
  ];

  const brazilCityLinks = BRAZILIAN_CITIES.map((city) => ({
    href: `/peptides/brazil/${city.slug}`,
    label: city.name,
  }));

  const cityLinks = isBrazil ? brazilCityLinks : ukCityLinks;

  const learnLinksEN = [
    { href: "/learn/are-peptides-legal-in-the-uk", label: "Are Peptides Legal in the UK?" },
    { href: "/learn/peptide-pen-vs-vial", label: "Peptide Pen vs Vial" },
    { href: "/learn/bpc-157-complete-guide", label: "BPC-157 Complete Guide" },
    { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
    { href: "/learn/how-to-use-peptide-pen", label: "How to Use a Peptide Pen" },
    { href: "/learn/best-peptides-for-recovery-uk", label: "Best Peptides for Recovery UK" },
    { href: "/learn/best-peptide-pens-uk-2026", label: "Best Peptide Pens UK 2026" },
    { href: "/learn/buy-peptides-online-uk-guide", label: "Buy Peptides Online UK" },
    { href: "/learn/tirzepatide-pen-uk-guide", label: "Tirzepatide Pen UK Guide" },
    { href: "/learn/peptides-for-athletes-uk", label: "Peptides for Athletes UK" },
    { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "GHK-Cu Hair & Skin Guide" },
    { href: "/learn/peptide-delivery-uk-next-day", label: "UK Delivery Guide" },
    { href: "/learn/peptide-stacking-guide-uk", label: "Peptide Stacking Guide" },
    { href: "/learn/peptide-safety-side-effects-guide", label: "Peptide Safety Guide" },
    { href: "/learn/what-is-a-peptide-pen", label: "What Is a Peptide Pen?" },
    { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs Pen" },
    { href: "/learn/peptide-pens-for-beginners-uk", label: "Beginner's Guide" },
    { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
    { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
    { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
    { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutathione" },
    { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "NAD+ Pen vs IV Therapy" },
    { href: "/learn/cheapest-peptides-uk-2026", label: "Cheapest Peptides UK 2026" },
    { href: "/learn/peptides-vs-hrt", label: "Peptides vs HRT" },
    { href: "/learn/do-peptides-really-work", label: "Do Peptides Really Work?" },
    { href: "/learn/peptide-regulations-uk-2026", label: "UK Peptide Regulations" },
    { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Semaglutide vs Tirzepatide" },
    { href: "/learn/peptide-pens-for-women-uk", label: "Peptides for Women UK" },
  ];

  const learnLinksByLocale: Record<string, typeof learnLinksEN> = {
    "pt-br": [
      { href: "/learn/are-peptides-legal-in-the-uk", label: "Peptídeos São Legais no Brasil?" },
      { href: "/learn/peptide-pen-vs-vial", label: "Caneta vs Frasco de Peptídeos" },
      { href: "/learn/bpc-157-complete-guide", label: "Guia Completo BPC-157" },
      { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzepatida vs Semaglutida" },
      { href: "/learn/how-to-use-peptide-pen", label: "Como Usar uma Caneta de Peptídeos" },
      { href: "/learn/best-peptides-for-recovery-uk", label: "Melhores Peptídeos para Recuperação" },
      { href: "/learn/best-peptide-pens-uk-2026", label: "Melhores Canetas de Peptídeos 2026" },
      { href: "/learn/buy-peptides-online-uk-guide", label: "Comprar Peptídeos Online" },
      { href: "/learn/tirzepatide-pen-uk-guide", label: "Guia Caneta Tirzepatida" },
      { href: "/learn/peptides-for-athletes-uk", label: "Peptídeos para Atletas" },
      { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "Guia GHK-Cu Cabelo e Pele" },
      { href: "/peptides/brazil", label: "Guia de Entrega Brasil" },
      { href: "/learn/peptide-stacking-guide-uk", label: "Guia de Combinação de Peptídeos" },
      { href: "/learn/peptide-safety-side-effects-guide", label: "Guia de Segurança de Peptídeos" },
      { href: "/learn/what-is-a-peptide-pen", label: "O Que É uma Caneta de Peptídeos?" },
      { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs Caneta" },
      { href: "/learn/peptide-pens-for-beginners-uk", label: "Guia para Iniciantes" },
      { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
      { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatida vs Semaglutida" },
      { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelina" },
      { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutationa" },
      { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "Caneta NAD+ vs Terapia IV" },
      { href: "/learn/peptides-vs-hrt", label: "Peptídeos vs TRH" },
      { href: "/learn/do-peptides-really-work", label: "Peptídeos Realmente Funcionam?" },
      { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Semaglutida vs Tirzepatida" },
    ],
    es: [
      { href: "/learn/are-peptides-legal-in-the-uk", label: "\u00bfSon legales los p\u00e9ptidos en Europa?" },
      { href: "/learn/peptide-pen-vs-vial", label: "Pluma de p\u00e9ptidos vs vial" },
      { href: "/learn/bpc-157-complete-guide", label: "Gu\u00eda completa de BPC-157" },
      { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzepatida vs Semaglutida" },
      { href: "/learn/how-to-use-peptide-pen", label: "C\u00f3mo usar una pluma de p\u00e9ptidos" },
      { href: "/learn/best-peptides-for-recovery-uk", label: "Mejores p\u00e9ptidos para recuperaci\u00f3n" },
      { href: "/learn/best-peptide-pens-uk-2026", label: "Mejores plumas de p\u00e9ptidos 2026" },
      { href: "/learn/buy-peptides-online-uk-guide", label: "Comprar p\u00e9ptidos online" },
      { href: "/learn/tirzepatide-pen-uk-guide", label: "Gu\u00eda pluma Tirzepatida" },
      { href: "/learn/peptides-for-athletes-uk", label: "P\u00e9ptidos para deportistas" },
      { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "Gu\u00eda GHK-Cu cabello y piel" },
      { href: "/learn/peptide-delivery-uk-next-day", label: "Gu\u00eda de env\u00edo a Europa" },
      { href: "/learn/peptide-stacking-guide-uk", label: "Gu\u00eda de combinaci\u00f3n de p\u00e9ptidos" },
      { href: "/learn/peptide-safety-side-effects-guide", label: "Gu\u00eda de seguridad de p\u00e9ptidos" },
      { href: "/learn/what-is-a-peptide-pen", label: "\u00bfQu\u00e9 es una pluma de p\u00e9ptidos?" },
      { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs pluma" },
      { href: "/learn/peptide-pens-for-beginners-uk", label: "Gu\u00eda para principiantes" },
      { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
      { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatida vs Semaglutida" },
      { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
      { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutati\u00f3n" },
      { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "Pluma NAD+ vs terapia IV" },
      { href: "/learn/peptides-vs-hrt", label: "P\u00e9ptidos vs TRH" },
      { href: "/learn/do-peptides-really-work", label: "\u00bfFuncionan realmente los p\u00e9ptidos?" },
      { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Semaglutida vs Tirzepatida" },
    ],
    de: [
      { href: "/learn/are-peptides-legal-in-the-uk", label: "Sind Peptide legal in Europa?" },
      { href: "/learn/peptide-pen-vs-vial", label: "Peptid-Pen vs Flasche" },
      { href: "/learn/bpc-157-complete-guide", label: "BPC-157 Komplett-Guide" },
      { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzepatid vs Semaglutid" },
      { href: "/learn/how-to-use-peptide-pen", label: "Peptid-Pen richtig anwenden" },
      { href: "/learn/best-peptides-for-recovery-uk", label: "Beste Peptide f\u00fcr Regeneration" },
      { href: "/learn/best-peptide-pens-uk-2026", label: "Beste Peptid-Pens 2026" },
      { href: "/learn/buy-peptides-online-uk-guide", label: "Peptide online kaufen" },
      { href: "/learn/tirzepatide-pen-uk-guide", label: "Tirzepatid-Pen Leitfaden" },
      { href: "/learn/peptides-for-athletes-uk", label: "Peptide f\u00fcr Sportler" },
      { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "GHK-Cu Haar- & Haut-Guide" },
      { href: "/learn/peptide-delivery-uk-next-day", label: "Lieferung nach Europa" },
      { href: "/learn/peptide-stacking-guide-uk", label: "Peptid-Stacking-Guide" },
      { href: "/learn/peptide-safety-side-effects-guide", label: "Peptid-Sicherheitsguide" },
      { href: "/learn/what-is-a-peptide-pen", label: "Was ist ein Peptid-Pen?" },
      { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs Pen" },
      { href: "/learn/peptide-pens-for-beginners-uk", label: "Anf\u00e4nger-Guide" },
      { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
      { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatid vs Semaglutid" },
      { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
      { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutathion" },
      { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "NAD+ Pen vs IV-Therapie" },
      { href: "/learn/peptides-vs-hrt", label: "Peptide vs HRT" },
      { href: "/learn/do-peptides-really-work", label: "Wirken Peptide wirklich?" },
      { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Semaglutid vs Tirzepatid" },
    ],
    fr: [
      { href: "/learn/are-peptides-legal-in-the-uk", label: "Les peptides sont-ils l\u00e9gaux en Europe ?" },
      { href: "/learn/peptide-pen-vs-vial", label: "Stylo peptide vs flacon" },
      { href: "/learn/bpc-157-complete-guide", label: "Guide complet BPC-157" },
      { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzépatide vs Sémaglutide" },
      { href: "/learn/how-to-use-peptide-pen", label: "Comment utiliser un stylo peptide" },
      { href: "/learn/best-peptides-for-recovery-uk", label: "Meilleurs peptides pour la récupération" },
      { href: "/learn/best-peptide-pens-uk-2026", label: "Meilleurs stylos peptides 2026" },
      { href: "/learn/buy-peptides-online-uk-guide", label: "Acheter des peptides en ligne" },
      { href: "/learn/tirzepatide-pen-uk-guide", label: "Guide stylo Tirzépatide" },
      { href: "/learn/peptides-for-athletes-uk", label: "Peptides pour sportifs" },
      { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "Guide GHK-Cu cheveux et peau" },
      { href: "/learn/peptide-delivery-uk-next-day", label: "Guide de livraison Europe" },
      { href: "/learn/peptide-stacking-guide-uk", label: "Guide de combinaison de peptides" },
      { href: "/learn/peptide-safety-side-effects-guide", label: "Guide de sécurité des peptides" },
      { href: "/learn/what-is-a-peptide-pen", label: "Qu'est-ce qu'un stylo peptide ?" },
      { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs stylo" },
      { href: "/learn/peptide-pens-for-beginners-uk", label: "Guide pour débutants" },
      { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
      { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzépatide vs Sémaglutide" },
      { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
      { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutathion" },
      { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "Stylo NAD+ vs thérapie IV" },
      { href: "/learn/peptides-vs-hrt", label: "Peptides vs THS" },
      { href: "/learn/do-peptides-really-work", label: "Les peptides fonctionnent-ils vraiment ?" },
      { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Sémaglutide vs Tirzépatide" },
    ],
    it: [
      { href: "/learn/are-peptides-legal-in-the-uk", label: "I peptidi sono legali in Europa?" },
      { href: "/learn/peptide-pen-vs-vial", label: "Penna peptidica vs fiala" },
      { href: "/learn/bpc-157-complete-guide", label: "Guida completa BPC-157" },
      { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
      { href: "/learn/how-to-use-peptide-pen", label: "Come usare una penna peptidica" },
      { href: "/learn/best-peptides-for-recovery-uk", label: "Migliori peptidi per il recupero" },
      { href: "/learn/best-peptide-pens-uk-2026", label: "Migliori penne peptidiche 2026" },
      { href: "/learn/buy-peptides-online-uk-guide", label: "Acquistare peptidi online" },
      { href: "/learn/tirzepatide-pen-uk-guide", label: "Guida penna Tirzepatide" },
      { href: "/learn/peptides-for-athletes-uk", label: "Peptidi per sportivi" },
      { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "Guida GHK-Cu capelli e pelle" },
      { href: "/learn/peptide-delivery-uk-next-day", label: "Guida alla consegna in Europa" },
      { href: "/learn/peptide-stacking-guide-uk", label: "Guida alla combinazione di peptidi" },
      { href: "/learn/peptide-safety-side-effects-guide", label: "Guida alla sicurezza dei peptidi" },
      { href: "/learn/what-is-a-peptide-pen", label: "Cos'\u00e8 una penna peptidica?" },
      { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs penna" },
      { href: "/learn/peptide-pens-for-beginners-uk", label: "Guida per principianti" },
      { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
      { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
      { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
      { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutatione" },
      { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "Penna NAD+ vs terapia IV" },
      { href: "/learn/peptides-vs-hrt", label: "Peptidi vs TOS" },
      { href: "/learn/do-peptides-really-work", label: "I peptidi funzionano davvero?" },
      { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Semaglutide vs Tirzepatide" },
    ],
    nl: [
      { href: "/learn/are-peptides-legal-in-the-uk", label: "Zijn peptiden legaal in Europa?" },
      { href: "/learn/peptide-pen-vs-vial", label: "Peptidepen vs flesje" },
      { href: "/learn/bpc-157-complete-guide", label: "BPC-157 complete gids" },
      { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
      { href: "/learn/how-to-use-peptide-pen", label: "Hoe een peptidepen te gebruiken" },
      { href: "/learn/best-peptides-for-recovery-uk", label: "Beste peptiden voor herstel" },
      { href: "/learn/best-peptide-pens-uk-2026", label: "Beste peptidepennen 2026" },
      { href: "/learn/buy-peptides-online-uk-guide", label: "Peptiden online kopen" },
      { href: "/learn/tirzepatide-pen-uk-guide", label: "Tirzepatide-pen gids" },
      { href: "/learn/peptides-for-athletes-uk", label: "Peptiden voor sporters" },
      { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "GHK-Cu haar- & huidgids" },
      { href: "/learn/peptide-delivery-uk-next-day", label: "Leveringsgids Europa" },
      { href: "/learn/peptide-stacking-guide-uk", label: "Peptide-stackinggids" },
      { href: "/learn/peptide-safety-side-effects-guide", label: "Peptide-veiligheidsgids" },
      { href: "/learn/what-is-a-peptide-pen", label: "Wat is een peptidepen?" },
      { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs pen" },
      { href: "/learn/peptide-pens-for-beginners-uk", label: "Beginnersgids" },
      { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
      { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatide vs Semaglutide" },
      { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
      { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutathion" },
      { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "NAD+ pen vs IV-therapie" },
      { href: "/learn/peptides-vs-hrt", label: "Peptiden vs HRT" },
      { href: "/learn/do-peptides-really-work", label: "Werken peptiden echt?" },
      { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Semaglutide vs Tirzepatide" },
    ],
    pl: [
      { href: "/learn/are-peptides-legal-in-the-uk", label: "Czy peptydy s\u0105 legalne w Europie?" },
      { href: "/learn/peptide-pen-vs-vial", label: "Pen peptydowy vs fiolka" },
      { href: "/learn/bpc-157-complete-guide", label: "Kompletny przewodnik BPC-157" },
      { href: "/learn/tirzepatide-vs-semaglutide", label: "Tyrzepatyd vs Semaglutyd" },
      { href: "/learn/how-to-use-peptide-pen", label: "Jak u\u017cywa\u0107 penu peptydowego" },
      { href: "/learn/best-peptides-for-recovery-uk", label: "Najlepsze peptydy na regeneracj\u0119" },
      { href: "/learn/best-peptide-pens-uk-2026", label: "Najlepsze peny peptydowe 2026" },
      { href: "/learn/buy-peptides-online-uk-guide", label: "Kup peptydy online" },
      { href: "/learn/tirzepatide-pen-uk-guide", label: "Przewodnik pen Tyrzepatyd" },
      { href: "/learn/peptides-for-athletes-uk", label: "Peptydy dla sportowc\u00f3w" },
      { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "Przewodnik GHK-Cu w\u0142osy i sk\u00f3ra" },
      { href: "/learn/peptide-delivery-uk-next-day", label: "Przewodnik dostawy do Europy" },
      { href: "/learn/peptide-stacking-guide-uk", label: "Przewodnik \u0142\u0105czenia peptyd\u00f3w" },
      { href: "/learn/peptide-safety-side-effects-guide", label: "Przewodnik bezpiecze\u0144stwa peptyd\u00f3w" },
      { href: "/learn/what-is-a-peptide-pen", label: "Czym jest pen peptydowy?" },
      { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs pen" },
      { href: "/learn/peptide-pens-for-beginners-uk", label: "Przewodnik dla pocz\u0105tkuj\u0105cych" },
      { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
      { href: "/compare/tirzepatide-vs-semaglutide", label: "Tyrzepatyd vs Semaglutyd" },
      { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
      { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutation" },
      { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "Pen NAD+ vs terapia IV" },
      { href: "/learn/peptides-vs-hrt", label: "Peptydy vs HTZ" },
      { href: "/learn/do-peptides-really-work", label: "Czy peptydy naprawd\u0119 dzia\u0142aj\u0105?" },
      { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Semaglutyd vs Tyrzepatyd" },
    ],
    pt: [
      { href: "/learn/are-peptides-legal-in-the-uk", label: "Os p\u00e9ptidos s\u00e3o legais na Europa?" },
      { href: "/learn/peptide-pen-vs-vial", label: "Caneta vs frasco de p\u00e9ptidos" },
      { href: "/learn/bpc-157-complete-guide", label: "Guia completo BPC-157" },
      { href: "/learn/tirzepatide-vs-semaglutide", label: "Tirzepatida vs Semaglutida" },
      { href: "/learn/how-to-use-peptide-pen", label: "Como usar uma caneta de p\u00e9ptidos" },
      { href: "/learn/best-peptides-for-recovery-uk", label: "Melhores p\u00e9ptidos para recupera\u00e7\u00e3o" },
      { href: "/learn/best-peptide-pens-uk-2026", label: "Melhores canetas de p\u00e9ptidos 2026" },
      { href: "/learn/buy-peptides-online-uk-guide", label: "Comprar p\u00e9ptidos online" },
      { href: "/learn/tirzepatide-pen-uk-guide", label: "Guia caneta Tirzepatida" },
      { href: "/learn/peptides-for-athletes-uk", label: "P\u00e9ptidos para atletas" },
      { href: "/learn/copper-peptide-ghk-cu-hair-skin", label: "Guia GHK-Cu cabelo e pele" },
      { href: "/learn/peptide-delivery-uk-next-day", label: "Guia de entrega Europa" },
      { href: "/learn/peptide-stacking-guide-uk", label: "Guia de combina\u00e7\u00e3o de p\u00e9ptidos" },
      { href: "/learn/peptide-safety-side-effects-guide", label: "Guia de seguran\u00e7a de p\u00e9ptidos" },
      { href: "/learn/what-is-a-peptide-pen", label: "O que \u00e9 uma caneta de p\u00e9ptidos?" },
      { href: "/learn/nad-iv-therapy-vs-injection-pen", label: "NAD+ IV vs caneta" },
      { href: "/learn/peptide-pens-for-beginners-uk", label: "Guia para iniciantes" },
      { href: "/compare/bpc-157-vs-tb-500", label: "BPC-157 vs TB-500" },
      { href: "/compare/tirzepatide-vs-semaglutide", label: "Tirzepatida vs Semaglutida" },
      { href: "/compare/cjc-1295-vs-ipamorelin", label: "CJC-1295 vs Ipamorelin" },
      { href: "/compare/ghk-cu-vs-glutathione", label: "GHK-Cu vs Glutationa" },
      { href: "/compare/nad-plus-pen-vs-iv-therapy", label: "Caneta NAD+ vs terapia IV" },
      { href: "/learn/peptides-vs-hrt", label: "P\u00e9ptidos vs TRH" },
      { href: "/learn/do-peptides-really-work", label: "Os p\u00e9ptidos funcionam mesmo?" },
      { href: "/learn/semaglutide-vs-tirzepatide-2026", label: "Semaglutida vs Tirzepatida" },
    ],
  };

  const learnLinks = learnLinksByLocale[locale] || learnLinksEN;

  const [subscribing, setSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    setSubscribeError(null);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
        headers["x-publishable-api-key"] = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/newsletter`, {
        method: "POST",
        headers,
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || f.newsletterError);
      }
      setSubscribed(true);
      trackNewsletterSignup("footer");
    } catch (err) {
      setSubscribeError(err instanceof Error ? err.message : f.newsletterErrorFallback);
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-oryn-black text-oryn-white">
      <div className="h-px bg-oryn-orange" />

      {/* Certifications bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {f.certifications.map((cert) => (
              <div key={cert.label} className="py-8 text-center">
                <div className="text-lg font-bold text-oryn-orange mb-1">{cert.label}</div>
                <div className="text-[9px] font-mono text-white/30 tracking-[0.2em]">
                  {cert.detail.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">{f.newsletterTitle}</h3>
              <p className="text-xs text-white/30 font-plex">{f.newsletterDescription}</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 px-6 py-3 bg-oryn-orange/10 border border-oryn-orange/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-oryn-orange font-medium">{f.newsletterSuccess}</span>
              </div>
            ) : (
              <div className="w-full md:w-auto">
                <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
                  <label htmlFor="footer-newsletter-email" className="sr-only">{f.newsletterTitle}</label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={f.newsletterPlaceholder}
                    required
                    disabled={subscribing}
                    className="px-4 py-3 bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-oryn-orange transition-colors w-full md:w-64 font-plex disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors shrink-0 disabled:opacity-70"
                  >
                    {subscribing ? "..." : f.newsletterButton}
                  </button>
                </form>
                {subscribeError && (
                  <p className="text-xs text-red-400 font-plex mt-2">{subscribeError}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <OrynLogo size={120} color="#FAFAFA" />
            </div>
            <p className="text-xs text-oryn-white/30 font-plex leading-relaxed max-w-sm mb-8">
              {f.description}
            </p>
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://instagram.com/orynpeptides"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-oryn-orange hover:border-oryn-orange/30 transition-colors"
                aria-label={t.aria.instagram}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/orynpeptides"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-oryn-orange hover:border-oryn-orange/30 transition-colors"
                aria-label={t.aria.linkedin}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:info@orynxpeptides.com"
                className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/30 hover:text-oryn-orange hover:border-oryn-orange/30 transition-colors"
                aria-label={t.aria.email}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="22,4 12,13 2,4" />
                </svg>
              </a>
            </div>
            {/* Payment methods */}
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-mono text-white/40 tracking-[0.15em]">{f.paymentMethods}</span>
              {["VISA", "MC", "AMEX", "BTC", "ETH"].map((m) => (
                <span key={m} className="text-[9px] font-mono text-white/40 px-2 py-1 border border-white/10">{m}</span>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <CollapsibleSection title={title.toUpperCase()} defaultOpen>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      {"onClick" in link && link.onClick ? (
                        <button
                          onClick={link.onClick as () => void}
                          className="text-xs text-oryn-white/30 hover:text-oryn-orange transition-colors font-plex cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-xs text-oryn-white/30 hover:text-oryn-orange transition-colors font-plex"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </CollapsibleSection>
            </div>
          ))}

          <div className="lg:col-span-1 hidden lg:block" />
        </div>
      </div>

      {/* SEO: Research Areas */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <CollapsibleSection title={f.seoSections.researchAreas.toUpperCase()}>
              <ul className="space-y-2">
                {categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection title={f.seoSections.learn.toUpperCase()}>
              <ul className="space-y-2">
                {learnLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            <CollapsibleSection title={f.seoSections.ukDelivery.toUpperCase()}>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {cityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>

      {/* Regional Hubs & Encyclopedia */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <CollapsibleSection title={f.seoSections.ukRegions.toUpperCase()}>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {(isBrazil ? [
                  { href: "/peptides/brazil/region/sudeste", label: "Sudeste" },
                  { href: "/peptides/brazil/region/sul", label: "Sul" },
                  { href: "/peptides/brazil/region/nordeste", label: "Nordeste" },
                  { href: "/peptides/brazil/region/centro-oeste", label: "Centro-Oeste" },
                  { href: "/peptides/brazil/region/norte", label: "Norte" },
                ] : [
                  { href: "/peptides/region/scotland", label: "Scotland" },
                  { href: "/peptides/region/wales", label: "Wales" },
                  { href: "/peptides/region/north-england", label: "North England" },
                  { href: "/peptides/region/south-england", label: "South England" },
                  { href: "/peptides/region/midlands", label: "Midlands" },
                  { href: "/peptides/region/east-england", label: "East England" },
                ]).map((link) => (
                  <Link key={link.href} href={link.href} className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                    {link.label}
                  </Link>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title={f.seoSections.ukCounties.toUpperCase()}>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {(isBrazil ? [
                  "sao-paulo", "rio-de-janeiro", "minas-gerais", "bahia", "parana",
                  "rio-grande-do-sul", "pernambuco", "ceara", "para", "santa-catarina",
                  "goias", "maranhao", "amazonas", "espirito-santo", "paraiba",
                  "mato-grosso", "rio-grande-do-norte", "alagoas", "piaui", "distrito-federal",
                  "mato-grosso-do-sul", "sergipe", "rondonia", "tocantins", "acre", "amapa", "roraima",
                ] : [
                  "kent", "surrey", "hampshire", "essex", "devon", "cornwall",
                  "oxfordshire", "cambridgeshire", "norfolk", "suffolk",
                  "lancashire", "cheshire", "west-yorkshire", "greater-manchester",
                  "warwickshire", "nottinghamshire", "derbyshire", "leicestershire",
                  "highland", "lothian", "fife", "glamorgan", "gwynedd", "antrim",
                ]).map((slug) => {
                  const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                  return (
                    <Link key={slug} href={isBrazil ? `/peptides/brazil/state/${slug}` : `/peptides/county/${slug}`} className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                      {name}
                    </Link>
                  );
                })}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title={f.seoSections.peptideEncyclopedia.toUpperCase()}>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {[
                  { href: "/peptides/encyclopedia/bpc-157", label: "BPC-157" },
                  { href: "/peptides/encyclopedia/tb-500", label: "TB-500" },
                  { href: "/peptides/encyclopedia/cjc-1295", label: "CJC-1295" },
                  { href: "/peptides/encyclopedia/ipamorelin", label: "Ipamorelin" },
                  { href: "/peptides/encyclopedia/tirzepatide-pen", label: "Tirzepatide" },
                  { href: "/peptides/encyclopedia/ghk-cu", label: "GHK-Cu" },
                  { href: "/peptides/encyclopedia/glutathione", label: "Glutathione" },
                  { href: "/peptides/encyclopedia/nad-plus", label: "NAD+" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                    {link.label}
                  </Link>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection title={f.seoSections.resources.toUpperCase()}>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {[
                  { href: "/faq", label: "FAQ" },
                  { href: "/wholesale", label: "Wholesale Orders" },
                  { href: "/shipping", label: "Shipping Info" },
                  { href: "/quality", label: "Quality & Testing" },
                  { href: "/about", label: "Why ORYN" },
                  { href: "/tools/peptide-calculator", label: "Peptide Calculator" },
                  { href: "/compare", label: "Compare Peptides" },
                  { href: "/peptides/glossary", label: "Peptide Glossary" },
                  { href: "/bundles/recovery-stack", label: "Recovery Stack" },
                  { href: "/bundles/anti-aging-stack", label: "Anti-Aging Stack" },
                  { href: "/bundles/gh-stack", label: "GH Stack" },
                  { href: "/bundles/metabolic-stack", label: "Metabolic Stack" },
                  { href: "/bundles/total-wellness", label: "Total Wellness" },
                  { href: "/bundles/athlete-recovery", label: "Athlete Recovery" },
                  { href: "/bundles/nad-complete", label: "NAD+ Complete" },
                  { href: "/bundles/skin-renewal", label: "Skin Renewal" },
                  { href: "/protocols", label: "Research Protocols" },
                  { href: "/protocols/recovery-stack", label: "Recovery Protocol" },
                  { href: "/protocols/anti-aging-protocol", label: "Anti-Aging Protocol" },
                  { href: "/protocols/gh-optimization", label: "GH Protocol" },
                  { href: "/protocols/metabolic-reset", label: "Metabolic Protocol" },
                  { href: "/faq/peptide-pens-faq", label: "Peptide Pens FAQ" },
                  { href: "/faq/ordering-delivery-faq", label: "Ordering & Delivery FAQ" },
                  { href: "/faq/purity-testing-faq", label: "Purity & Testing FAQ" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                    {link.label}
                  </Link>
                ))}
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>

      {/* European / Brazil Delivery */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-8">
          <CollapsibleSection title={f.seoSections.europeanDelivery.toUpperCase()}>
            {isBrazil ? (
              <>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-6">
                  {BRAZILIAN_CITIES.map((city) => (
                    <Link key={city.slug} href={`/peptides/brazil/${city.slug}`} className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                      {city.name}
                    </Link>
                  ))}
                </div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-4">{f.seoSections.topEuCities.toUpperCase()}</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {BRAZILIAN_CITIES.flatMap((city) =>
                    city.nearbyAreas.map((area) => (
                      <Link key={`${city.slug}-${area}`} href={`/peptides/brazil/${city.slug}`} className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                        {area}
                      </Link>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5 mb-6">
                  {[
                    { href: "/peptides/europe/germany", label: "Germany" },
                    { href: "/peptides/europe/france", label: "France" },
                    { href: "/peptides/europe/spain", label: "Spain" },
                    { href: "/peptides/europe/italy", label: "Italy" },
                    { href: "/peptides/europe/netherlands", label: "Netherlands" },
                    { href: "/peptides/europe/belgium", label: "Belgium" },
                    { href: "/peptides/europe/austria", label: "Austria" },
                    { href: "/peptides/europe/portugal", label: "Portugal" },
                    { href: "/peptides/europe/sweden", label: "Sweden" },
                    { href: "/peptides/europe/denmark", label: "Denmark" },
                    { href: "/peptides/europe/poland", label: "Poland" },
                    { href: "/peptides/europe/switzerland", label: "Switzerland" },
                    { href: "/peptides/europe/ireland", label: "Ireland" },
                    { href: "/peptides/europe/greece", label: "Greece" },
                    { href: "/peptides/europe/czech-republic", label: "Czech Republic" },
                    { href: "/peptides/europe/finland", label: "Finland" },
                    { href: "/peptides/europe/norway", label: "Norway" },
                    { href: "/peptides/europe/hungary", label: "Hungary" },
                    { href: "/peptides/europe/romania", label: "Romania" },
                    { href: "/peptides/europe/croatia", label: "Croatia" },
                    { href: "/peptides/europe/bulgaria", label: "Bulgaria" },
                    { href: "/peptides/europe/slovakia", label: "Slovakia" },
                    { href: "/peptides/europe/lithuania", label: "Lithuania" },
                    { href: "/peptides/europe/latvia", label: "Latvia" },
                    { href: "/peptides/europe/estonia", label: "Estonia" },
                    { href: "/peptides/europe/slovenia", label: "Slovenia" },
                    { href: "/peptides/europe/luxembourg", label: "Luxembourg" },
                    { href: "/peptides/europe/cyprus", label: "Cyprus" },
                    { href: "/peptides/europe/malta", label: "Malta" },
                    { href: "/peptides/europe/iceland", label: "Iceland" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                      {link.label}
                    </Link>
                  ))}
                </div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] text-oryn-orange mb-4">{f.seoSections.topEuCities.toUpperCase()}</h4>
                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {[
                    { href: "/peptides/europe/germany/berlin", label: "Berlin" },
                    { href: "/peptides/europe/germany/munich", label: "Munich" },
                    { href: "/peptides/europe/france/paris", label: "Paris" },
                    { href: "/peptides/europe/france/lyon", label: "Lyon" },
                    { href: "/peptides/europe/spain/madrid", label: "Madrid" },
                    { href: "/peptides/europe/spain/barcelona", label: "Barcelona" },
                    { href: "/peptides/europe/italy/rome", label: "Rome" },
                    { href: "/peptides/europe/italy/milan", label: "Milan" },
                    { href: "/peptides/europe/netherlands/amsterdam", label: "Amsterdam" },
                    { href: "/peptides/europe/netherlands/rotterdam", label: "Rotterdam" },
                    { href: "/peptides/europe/belgium/brussels", label: "Brussels" },
                    { href: "/peptides/europe/austria/vienna", label: "Vienna" },
                    { href: "/peptides/europe/portugal/lisbon", label: "Lisbon" },
                    { href: "/peptides/europe/sweden/stockholm", label: "Stockholm" },
                    { href: "/peptides/europe/denmark/copenhagen", label: "Copenhagen" },
                    { href: "/peptides/europe/poland/warsaw", label: "Warsaw" },
                    { href: "/peptides/europe/switzerland/zurich", label: "Zurich" },
                    { href: "/peptides/europe/ireland/dublin", label: "Dublin" },
                    { href: "/peptides/europe/czech-republic/prague", label: "Prague" },
                    { href: "/peptides/europe/finland/helsinki", label: "Helsinki" },
                    { href: "/peptides/europe/norway/oslo", label: "Oslo" },
                    { href: "/peptides/europe/hungary/budapest", label: "Budapest" },
                    { href: "/peptides/europe/greece/athens", label: "Athens" },
                    { href: "/peptides/europe/romania/bucharest", label: "Bucharest" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </CollapsibleSection>
        </div>
      </div>

      {/* London / São Paulo Areas */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-8">
          <CollapsibleSection title={f.seoSections.londonDelivery.toUpperCase()}>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {(isBrazil ? [
                "jardins", "vila-mariana", "pinheiros", "moema", "itaim-bibi", "brooklin",
                "vila-olimpia", "perdizes", "higienopolis", "consolacao",
                "liberdade", "bela-vista", "santa-cecilia", "lapa", "butanta",
                "morumbi", "campo-belo", "santo-amaro", "saude", "ipiranga",
                "tatuape", "mooca", "penha", "santana", "tucuruvi",
                "agua-branca", "barra-funda", "republica", "se", "cambuci",
              ] : [
                "westminster", "city-of-london", "mayfair", "marylebone", "fitzrovia", "bloomsbury", "south-kensington",
                "covent-garden", "holborn", "soho",
                "camden", "islington", "hackney", "hampstead", "shoreditch", "finsbury-park", "muswell-hill", "highgate", "wood-green",
                "canary-wharf", "stratford", "whitechapel", "bow", "docklands", "walthamstow", "barking",
                "brixton", "clapham", "greenwich", "southwark", "croydon", "wimbledon",
                "streatham", "tooting", "lewisham", "dulwich", "woolwich", "crystal-palace",
                "kensington", "chelsea", "notting-hill", "fulham", "hammersmith", "ealing", "richmond", "kingston",
                "chiswick", "acton", "shepherds-bush", "brentford", "twickenham",
              ]).map((slug) => {
                const name = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
                  .replace("Of", "of");
                return (
                  <Link
                    key={slug}
                    href={isBrazil ? `/peptides/brazil/sao-paulo/${slug}` : `/peptides/london/${slug}`}
                    className="text-[10px] text-oryn-white/40 hover:text-oryn-orange transition-colors font-plex"
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </CollapsibleSection>
        </div>
      </div>

      {/* Trust & Security */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: f.trustBadges.ssl },
              { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: f.trustBadges.secure },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: f.trustBadges.coa },
              { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", label: f.trustBadges.guarantee },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="shrink-0">
                  <path d={item.icon} />
                </svg>
                <span className="text-[9px] font-mono text-white/30 tracking-[0.1em]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-oryn-white/40 font-mono tracking-wider">
            &copy; {new Date().getFullYear()} {f.copyright}
          </p>
          <p className="text-[10px] text-oryn-white/30 font-mono tracking-wider">
            {f.researchOnly}
          </p>
        </div>
      </div>
    </footer>
  );
}
