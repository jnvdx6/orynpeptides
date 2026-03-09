import type { Product } from "./products";

export interface PeptideComparison {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  productA: string; // product slug
  productB: string;
  verdict: string;
  introduction: string;
  categories: {
    name: string;
    productA: string;
    productB: string;
    winner?: "A" | "B" | "tie";
  }[];
  detailedSections: {
    heading: string;
    content: string;
  }[];
  faqs: { question: string; answer: string }[];
}

export const COMPARISONS: PeptideComparison[] = [
  {
    slug: "bpc-157-vs-tb-500",
    title: "BPC-157 vs TB-500: Which Recovery Peptide Is Better?",
    metaTitle: "BPC-157 vs TB-500: Complete Comparison | ORYN UK",
    metaDescription: "Compare BPC-157 and TB-500 for recovery research. Mechanisms, benefits, dosing, and when to use each peptide. Buy both as pre-mixed pens UK.",
    productA: "bpc-157",
    productB: "tb-500",
    verdict: "Both peptides excel at different aspects of recovery. BPC-157 is stronger for gut healing, tendon repair, and neuroprotection. TB-500 is superior for wound healing, cardiac repair, and inflammation. Many researchers use both together for comprehensive recovery protocols.",
    introduction: "BPC-157 and TB-500 are the two most popular recovery peptides in the research community. While they share a common goal — accelerating tissue repair — they achieve this through fundamentally different biological mechanisms. Understanding these differences is crucial for designing effective research protocols.",
    categories: [
      { name: "Mechanism", productA: "Growth factor modulation, NO system, FAK-paxillin pathway", productB: "Cell migration via actin regulation, angiogenesis promotion", winner: "tie" },
      { name: "Tendon & Ligament Repair", productA: "Extensive research showing accelerated healing, strong evidence", productB: "Moderate evidence, supports via increased blood supply", winner: "A" },
      { name: "Wound Healing", productA: "Supports healing via growth factors", productB: "Promotes cell migration and new blood vessel formation — primary strength", winner: "B" },
      { name: "Gut Health", productA: "Originally studied for GI protection — strongest evidence base", productB: "Limited direct gut research", winner: "A" },
      { name: "Anti-Inflammatory", productA: "Modulates inflammatory cytokines", productB: "Powerful anti-inflammatory via immune modulation", winner: "tie" },
      { name: "Neuroprotection", productA: "Strong evidence for nerve regeneration and brain injury protection", productB: "Limited neurological research", winner: "A" },
      { name: "Cardiovascular", productA: "Cardioprotective properties shown in research", productB: "Heart tissue regeneration — strong evidence", winner: "B" },
      { name: "Published Studies", productA: "100+ published studies", productB: "50+ published studies", winner: "A" },
      { name: "ORYN Price", productA: "£189 (10 mg, 30 days)", productB: "£199 (15 mg, 30 days)", winner: "A" },
    ],
    detailedSections: [
      {
        heading: "How BPC-157 Works",
        content: "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide derived from human gastric juice proteins. Its mechanism of action involves multiple pathways:\n\n**Growth Factor Upregulation**: BPC-157 increases expression of VEGF (vascular endothelial growth factor), EGF (epidermal growth factor), and FGF (fibroblast growth factor), all critical for tissue repair.\n\n**Nitric Oxide System**: The peptide modulates the NO system, promoting vasodilation and improved blood flow to damaged tissues.\n\n**FAK-Paxillin Pathway**: BPC-157 activates the focal adhesion kinase signalling pathway, essential for cell migration during wound healing.\n\nThis multi-pathway approach makes BPC-157 particularly versatile, with research applications spanning gut health, musculoskeletal repair, and neuroprotection.",
      },
      {
        heading: "How TB-500 Works",
        content: "TB-500 is a synthetic fragment of Thymosin Beta-4, a naturally occurring protein involved in tissue repair and regeneration. Its primary mechanisms include:\n\n**Actin Regulation**: TB-500 binds to actin, the protein that forms the structural framework of cells. This promotes cell migration — allowing repair cells to reach damaged tissue more effectively.\n\n**Angiogenesis**: TB-500 strongly promotes the formation of new blood vessels, ensuring damaged tissues receive the oxygen and nutrients needed for repair.\n\n**Anti-Inflammatory Action**: TB-500 modulates inflammatory responses, reducing excessive inflammation that can impede healing while maintaining the beneficial aspects of the inflammatory cascade.\n\nTB-500's strength lies in its ability to fundamentally improve the body's healing infrastructure — making it a powerful complement to peptides that directly stimulate repair mechanisms.",
      },
      {
        heading: "Using BPC-157 and TB-500 Together",
        content: "The combination of BPC-157 and TB-500 is one of the most popular protocols in peptide research. The rationale is straightforward:\n\n**Complementary Mechanisms**: BPC-157 stimulates growth factor production and directly promotes repair, while TB-500 ensures repair cells can reach the damage site (via cell migration) and have adequate blood supply (via angiogenesis).\n\n**Broader Coverage**: BPC-157 excels at soft tissue and gut healing; TB-500 excels at wound healing and cardiovascular repair. Together, they cover virtually all tissue types.\n\n**Research Protocol**: Many researchers run both peptides concurrently, with daily administration of each for 4-8 weeks. ORYN offers both as pre-mixed pen systems, making dual protocols convenient and consistent.\n\n**Cost-Effective**: At £189 + £199 = £388 for two 30-day pens, the combination protocol represents strong value for comprehensive recovery research.",
      },
      {
        heading: "Which Should You Choose?",
        content: "**Choose BPC-157 if your primary research focus is:**\n- Gastrointestinal healing and protection\n- Tendon, ligament, and joint repair\n- Neuroprotection and nerve regeneration\n- Broad-spectrum tissue repair with the largest evidence base\n- Budget-conscious protocols (£189 vs £199)\n\n**Choose TB-500 if your primary research focus is:**\n- Wound healing and scar tissue reduction\n- Cardiovascular tissue repair\n- Promoting new blood vessel formation\n- Flexibility, mobility, and joint health\n- Hair follicle health research\n\n**Choose both if:**\n- You want the most comprehensive recovery protocol available\n- Your research requires multi-pathway tissue repair\n- You're studying synergistic effects between complementary peptides\n- Recovery and healing are the primary endpoints of your research",
      },
    ],
    faqs: [
      { question: "Can I use BPC-157 and TB-500 together?", answer: "Yes, BPC-157 and TB-500 are commonly researched in combination. They target different healing pathways and are considered highly complementary. Many researchers run both concurrently for comprehensive recovery protocols." },
      { question: "Which is better for tendon repair — BPC-157 or TB-500?", answer: "BPC-157 has stronger direct evidence for tendon and ligament repair, with multiple studies showing accelerated healing. TB-500 supports healing indirectly by promoting blood supply to the area. For tendon-focused research, BPC-157 is generally the first choice." },
      { question: "Which is better for wound healing?", answer: "TB-500 is generally considered superior for wound healing, due to its ability to promote cell migration and new blood vessel formation — both critical for wound closure and tissue regeneration." },
      { question: "How long should a BPC-157 vs TB-500 research protocol last?", answer: "Typical research protocols run 4-8 weeks. Each ORYN pen provides a 30-day supply, making two pens sufficient for most standard protocols." },
    ],
  },
  {
    slug: "tirzepatide-vs-semaglutide",
    title: "Tirzepatide vs Semaglutide: Which Weight Loss Peptide Is Superior?",
    metaTitle: "Tirzepatide vs Semaglutide Comparison | ORYN UK",
    metaDescription: "Compare tirzepatide and semaglutide for metabolic research. Dual vs single receptor, efficacy data, side effects, and pricing. Buy tirzepatide pens UK.",
    productA: "tirzepatide-pen",
    productB: "medit-tirzepatide",
    verdict: "Clinical data consistently shows tirzepatide's dual GIP/GLP-1 mechanism produces greater weight reduction than semaglutide's GLP-1-only approach. ORYN offers tirzepatide in two formats: the standard pen (10mg, £249) and the MediT prefilled pen (40mg, £349).",
    introduction: "The metabolic peptide landscape has been revolutionised by two compounds: semaglutide (Ozempic/Wegovy) and tirzepatide (Mounjaro). Both target the incretin system but through different mechanisms. This comparison examines the scientific evidence to help researchers understand the key differences.",
    categories: [
      { name: "Mechanism", productA: "Dual GIP/GLP-1 receptor agonist", productB: "MediT format — same dual GIP/GLP-1 mechanism, weekly dosing", winner: "tie" },
      { name: "Receptor Targets", productA: "Two receptors (GIP + GLP-1)", productB: "Two receptors (GIP + GLP-1)", winner: "tie" },
      { name: "Dosing Format", productA: "Multi-dose pen, 30-day supply, daily precision dosing", productB: "Prefilled single-use pen, weekly administration", winner: "tie" },
      { name: "Dosage", productA: "10 mg total", productB: "40 mg total", winner: "B" },
      { name: "Convenience", productA: "Daily dosing with adjustable amounts", productB: "Once-weekly — maximum convenience", winner: "B" },
      { name: "Flexibility", productA: "Fully adjustable dose per administration", productB: "Fixed dose per pen", winner: "A" },
      { name: "Price", productA: "£249", productB: "£349", winner: "A" },
    ],
    detailedSections: [
      {
        heading: "Understanding Dual vs Single Receptor Action",
        content: "The fundamental difference between tirzepatide and semaglutide lies in receptor pharmacology:\n\n**Semaglutide (GLP-1 only)**\nSemaglutide mimics GLP-1, activating receptors in the pancreas (insulin release), brain (appetite suppression), and gut (slowed gastric emptying). It is highly effective but works through a single hormonal pathway.\n\n**Tirzepatide (GIP + GLP-1)**\nTirzepatide activates both GIP and GLP-1 receptors. GIP acts primarily on adipose tissue, enhancing fat metabolism and improving lipid handling. Combined with GLP-1's appetite and insulin effects, this dual mechanism provides a more comprehensive metabolic intervention.\n\nThe SURPASS clinical trials demonstrated that tirzepatide's dual action translates to clinically meaningful improvements over semaglutide monotherapy.",
      },
      {
        heading: "Clinical Efficacy: Head-to-Head Data",
        content: "**SURPASS-2 (Tirzepatide vs Semaglutide 1mg)**\nThis landmark trial directly compared tirzepatide to semaglutide and found tirzepatide superior at all doses:\n- Tirzepatide 5mg: -7.6 kg vs semaglutide -5.7 kg\n- Tirzepatide 10mg: -9.3 kg vs semaglutide -5.7 kg  \n- Tirzepatide 15mg: -11.2 kg vs semaglutide -5.7 kg\n\n**SURMOUNT-1 (Tirzepatide for Weight Management)**\nMean weight reductions at 72 weeks:\n- 5mg: -15.0%\n- 10mg: -19.5%\n- 15mg: -20.9%\n\n**STEP-1 (Semaglutide 2.4mg for Weight)**\n- Mean weight reduction: -14.9% at 68 weeks\n\nThe data consistently shows tirzepatide achieving greater efficacy, attributed to the additional metabolic benefits of GIP receptor activation.",
      },
      {
        heading: "ORYN Tirzepatide Options",
        content: "ORYN offers two tirzepatide formats to suit different research needs:\n\n**Tirzepatide Pen (£249)**\n- 10mg in a multi-dose pen system\n- 30-day supply with daily precision dosing\n- Fully adjustable dose — ideal for dose-finding research\n- >99% purity, GMP manufactured\n\n**MediT Pen (£349)**\n- 40mg prefilled, single-use injection pen\n- Once-weekly administration\n- Maximum convenience — no dose adjustment needed\n- Ideal for fixed-dose weekly protocols\n\nBoth formats deliver the same pharmaceutical-grade tirzepatide with >99% purity from GMP-certified European facilities.",
      },
      {
        heading: "Side Effect Considerations",
        content: "Both tirzepatide and semaglutide share similar gastrointestinal side effects, which are the most commonly reported:\n\n**Common Side Effects (both compounds):**\n- Nausea (most common, typically resolves over 4-8 weeks)\n- Diarrhoea\n- Constipation\n- Reduced appetite\n- Injection site reactions\n\n**Key Difference**: Some clinical data suggests tirzepatide may have a slightly more favourable GI side effect profile at equivalent efficacy doses, possibly because the dual mechanism allows lower doses of each pathway to achieve the same metabolic effect.\n\nAll side effect data comes from clinical trials. Individual responses in research settings may vary. Proper research protocols should include monitoring for these known effects.",
      },
    ],
    faqs: [
      { question: "Is tirzepatide more effective than semaglutide for weight loss?", answer: "Clinical trial data from SURPASS-2 shows tirzepatide produced significantly greater weight reduction than semaglutide 1mg at all doses. This is attributed to tirzepatide's dual GIP/GLP-1 mechanism." },
      { question: "What is the difference between the Tirzepatide Pen and MediT Pen?", answer: "The Tirzepatide Pen (£249) is a multi-dose pen with 10mg for daily precision dosing over 30 days. The MediT Pen (£349) is a prefilled single-use pen with 40mg for once-weekly administration." },
      { question: "Can I buy tirzepatide without a prescription in the UK?", answer: "Tirzepatide is available for research purposes without a prescription. ORYN sells tirzepatide pen systems strictly for research use only." },
    ],
  },
  {
    slug: "cjc-1295-vs-ipamorelin",
    title: "CJC-1295 vs Ipamorelin: Growth Hormone Peptides Compared",
    metaTitle: "CJC-1295 vs Ipamorelin: GH Peptide Guide | ORYN UK",
    metaDescription: "Compare CJC-1295 and Ipamorelin for growth hormone research. Mechanisms, synergy, dosing protocols, and how to stack them. Buy GH peptide pens UK.",
    productA: "cjc-1295",
    productB: "ipamorelin",
    verdict: "CJC-1295 and Ipamorelin work through different GH pathways and are most commonly studied together for synergistic effects. CJC-1295 extends GH release duration, while Ipamorelin triggers clean GH pulses. The combination is one of the most popular GH research stacks.",
    introduction: "CJC-1295 and Ipamorelin are the two leading growth hormone secretagogue peptides. While both stimulate natural GH release, they do so through entirely different receptor pathways — making them ideal candidates for combination research protocols.",
    categories: [
      { name: "Mechanism", productA: "GHRH analogue — extends duration of GH release", productB: "Ghrelin receptor agonist — triggers GH pulses", winner: "tie" },
      { name: "GH Release Pattern", productA: "Sustained, elevated baseline", productB: "Pulsatile, mimics natural rhythm", winner: "tie" },
      { name: "Selectivity", productA: "Moderate — some effect on cortisol/prolactin", productB: "Highly selective — minimal effect on other hormones", winner: "B" },
      { name: "Sleep Quality", productA: "Supports deep sleep via sustained GH", productB: "May enhance sleep through GH pulse timing", winner: "tie" },
      { name: "Side Effects", productA: "Water retention possible at higher doses", productB: "Generally well-tolerated, fewer side effects", winner: "B" },
      { name: "Published Research", productA: "Well-studied GHRH analogue", productB: "Well-studied selective GHS", winner: "tie" },
      { name: "ORYN Price", productA: "£179 (5 mg, 30 days)", productB: "£179 (6 mg, 30 days)", winner: "tie" },
    ],
    detailedSections: [
      {
        heading: "How CJC-1295 Stimulates Growth Hormone",
        content: "CJC-1295 is a synthetic analogue of Growth Hormone Releasing Hormone (GHRH). It binds to GHRH receptors on the pituitary gland, stimulating the production and release of growth hormone.\n\n**Key Features:**\n- Extended half-life compared to natural GHRH\n- Produces sustained GH elevation (not just a single pulse)\n- Increases IGF-1 levels over time\n- Works at the hypothalamic-pituitary level\n\nThe sustained GH elevation produced by CJC-1295 is beneficial for research into body composition, recovery, and metabolic function. However, because it amplifies all GH-related pathways, it may also affect cortisol and prolactin levels at higher doses.",
      },
      {
        heading: "How Ipamorelin Triggers GH Release",
        content: "Ipamorelin is a selective growth hormone secretagogue that works through the ghrelin receptor (GHSR). Unlike other ghrelin mimetics, Ipamorelin is remarkably selective — it triggers GH release without significantly affecting cortisol, prolactin, or ACTH.\n\n**Key Features:**\n- Highly selective GH release\n- Mimics natural pulsatile GH pattern\n- Minimal effect on appetite (unlike ghrelin itself)\n- Well-tolerated with few reported side effects\n- Does not desensitise receptors as quickly as other GHS compounds\n\nIpamorelin's selectivity makes it one of the cleanest GH-releasing peptides available for research, particularly valuable when studying GH effects in isolation from other hormonal changes.",
      },
      {
        heading: "The CJC-1295 + Ipamorelin Stack",
        content: "The combination of CJC-1295 and Ipamorelin is one of the most widely studied GH peptide stacks. The rationale is synergistic:\n\n**CJC-1295** amplifies and extends the GH signal via the GHRH pathway\n**Ipamorelin** triggers additional GH pulses via the ghrelin pathway\n\nTogether, they produce a greater total GH release than either peptide alone — working through complementary receptor systems rather than competing for the same pathway.\n\n**Research Protocol Considerations:**\n- Both peptides are typically administered simultaneously\n- Common protocol: daily administration, preferably before bed (to align with natural GH secretion patterns)\n- Duration: 8-12 week protocols are common in the research literature\n- ORYN offers both at £179 each — £358 for the complete GH stack\n\nThe combination is particularly popular for research into body composition, recovery, sleep quality, and anti-aging.",
      },
    ],
    faqs: [
      { question: "Should I use CJC-1295 and Ipamorelin together?", answer: "The CJC-1295 + Ipamorelin combination is one of the most popular and well-studied GH peptide stacks. They work through complementary pathways (GHRH and ghrelin) for synergistic GH release." },
      { question: "Which is safer — CJC-1295 or Ipamorelin?", answer: "Ipamorelin is generally considered to have a cleaner side effect profile due to its high selectivity — it triggers GH release without significantly affecting cortisol, prolactin, or appetite." },
      { question: "How much do CJC-1295 and Ipamorelin cost together?", answer: "ORYN offers both CJC-1295 (£179) and Ipamorelin (£179) as 30-day pre-mixed pen systems. The complete GH research stack costs £358." },
    ],
  },
  {
    slug: "ghk-cu-vs-glutathione",
    title: "GHK-Cu vs Glutathione: Anti-Aging & Skin Peptides Compared",
    metaTitle: "GHK-Cu vs Glutathione: Skin Peptide Guide | ORYN UK",
    metaDescription: "Compare GHK-Cu copper peptide and Glutathione for skin and anti-aging research. Mechanisms, benefits, and how to combine them. Buy peptide pens UK.",
    productA: "ghk-cu",
    productB: "glutathione",
    verdict: "GHK-Cu and Glutathione target different anti-aging pathways and are highly complementary. GHK-Cu excels at structural repair (collagen, elastin), while Glutathione provides master antioxidant defence and skin brightening. Together, they form a comprehensive anti-aging research protocol.",
    introduction: "GHK-Cu and Glutathione represent two distinct approaches to anti-aging and skin science. While GHK-Cu works to rebuild structural proteins, Glutathione protects against oxidative damage. Understanding their complementary roles is key to designing effective research protocols.",
    categories: [
      { name: "Primary Mechanism", productA: "Collagen synthesis, tissue remodelling, copper delivery", productB: "Master antioxidant, cellular detoxification, melanin regulation", winner: "tie" },
      { name: "Collagen Production", productA: "Strong — directly stimulates collagen and elastin synthesis", productB: "Indirect — protects existing collagen from oxidative damage", winner: "A" },
      { name: "Antioxidant Power", productA: "Moderate antioxidant properties", productB: "The body's most powerful endogenous antioxidant", winner: "B" },
      { name: "Skin Brightening", productA: "Not primary mechanism", productB: "Well-documented skin brightening via melanin regulation", winner: "B" },
      { name: "Wound Healing", productA: "Accelerates wound healing and reduces scarring", productB: "Supports healing via detoxification pathways", winner: "A" },
      { name: "Published Studies", productA: "70+ studies on skin biology", productB: "Thousands of studies (endogenous compound)", winner: "B" },
      { name: "ORYN Price", productA: "£219 (60 mg, 30 days)", productB: "£169 (6 g, 30 days)", winner: "B" },
    ],
    detailedSections: [
      {
        heading: "GHK-Cu: The Structural Repair Peptide",
        content: "GHK-Cu (glycyl-L-histidyl-L-lysine copper) is a naturally occurring tripeptide with a high affinity for copper ions. Research spanning over 40 years has established its role in tissue remodelling:\n\n**Collagen & Elastin**: GHK-Cu activates genes responsible for collagen types I and III synthesis, as well as elastin production. This directly improves skin structural integrity.\n\n**Glycosaminoglycans**: Increases production of GAGs including hyaluronic acid, improving skin hydration and plumpness.\n\n**Growth Factors**: Stimulates release of TGF-β and other growth factors involved in tissue repair.\n\n**Gene Expression**: Studies show GHK-Cu can modulate expression of over 4,000 genes, with a pattern that shifts gene activity from an aged to a more youthful profile.",
      },
      {
        heading: "Glutathione: The Master Antioxidant",
        content: "Glutathione is a tripeptide (L-glutamate, L-cysteine, L-glycine) present in every cell. It serves as the body's primary defence against oxidative stress:\n\n**Antioxidant Defence**: Directly neutralises free radicals and reactive oxygen species. Regenerates other antioxidants (vitamins C and E).\n\n**Detoxification**: Conjugates toxins in the liver via glutathione S-transferase enzymes, facilitating their elimination.\n\n**Melanin Regulation**: Inhibits tyrosinase activity and shifts melanin production from eumelanin (dark) to pheomelanin (light), producing documented skin brightening effects.\n\n**Bioavailability Advantage**: ORYN's pen-delivered Glutathione bypasses digestive degradation entirely, delivering 6g of active compound with near-complete bioavailability — far superior to oral supplements.",
      },
      {
        heading: "Combining GHK-Cu and Glutathione",
        content: "These two compounds target complementary pathways and are commonly studied together:\n\n**GHK-Cu rebuilds**: Stimulates new collagen, elastin, and GAG production — rebuilding the skin's structural framework.\n\n**Glutathione protects**: Neutralises the oxidative damage that degrades existing collagen and causes premature aging.\n\nTogether, they address both the cause (oxidative stress) and the effect (structural protein loss) of skin aging. This makes the GHK-Cu + Glutathione combination one of the most comprehensive approaches to skin and anti-aging research.\n\n**ORYN Combined Cost**: £219 + £169 = £388 for two 30-day pens covering both structural repair and antioxidant defence.",
      },
    ],
    faqs: [
      { question: "Can I use GHK-Cu and Glutathione together?", answer: "Yes, GHK-Cu and Glutathione are commonly researched together as they target complementary anti-aging pathways. GHK-Cu rebuilds structural proteins while Glutathione provides antioxidant protection." },
      { question: "Which is better for skin — GHK-Cu or Glutathione?", answer: "GHK-Cu is stronger for structural repair (collagen, elastin production), while Glutathione excels at skin brightening and antioxidant defence. For comprehensive skin research, both are valuable." },
      { question: "Is injectable Glutathione better than oral?", answer: "Yes. Oral Glutathione is largely degraded during digestion. ORYN's pen-delivered Glutathione bypasses the digestive system entirely, providing near-complete bioavailability of 6g per pen." },
    ],
  },
  {
    slug: "nad-plus-pen-vs-iv-therapy",
    title: "NAD+ Pen vs IV Therapy: Which Delivery Method Is Better?",
    metaTitle: "NAD+ Pen vs IV Therapy Comparison | ORYN UK",
    metaDescription: "Compare NAD+ pen delivery vs IV infusion therapy. Cost, convenience, bioavailability, and results compared. Buy NAD+ peptide pen and NovaDose system UK.",
    productA: "nad-plus",
    productB: "novadose-nad",
    verdict: "NAD+ pen systems offer comparable bioavailability to IV therapy at a fraction of the cost and without clinic visits. ORYN's standard NAD+ pen (£299) and NovaDose system (£399) both deliver pharmaceutical-grade NAD+ with the convenience of at-home administration.",
    introduction: "NAD+ (Nicotinamide Adenine Dinucleotide) therapy has gained significant attention for its role in cellular energy, DNA repair, and healthy aging research. Traditionally delivered via expensive IV infusions, NAD+ is now available in convenient pen systems. This comparison examines both delivery methods.",
    categories: [
      { name: "Bioavailability", productA: "High — subcutaneous delivery, near-complete absorption", productB: "Near 100% — NovaDose cartridge system, daily microdosing", winner: "B" },
      { name: "Convenience", productA: "At-home use, 30-day supply, no clinic needed", productB: "At-home daily microdosing, cartridge system", winner: "tie" },
      { name: "Cost per Month", productA: "£299 (vs £500-1500+ for IV sessions)", productB: "£399 (still far less than IV therapy)", winner: "A" },
      { name: "Dosage", productA: "500 mg total, adjustable dosing", productB: "500 mg, daily microdose precision", winner: "tie" },
      { name: "Dosing Flexibility", productA: "Adjustable per administration", productB: "Pre-set daily microdose", winner: "A" },
      { name: "Time Required", productA: "Minutes per day", productB: "Minutes per day", winner: "tie" },
      { name: "ORYN Price", productA: "£299", productB: "£399", winner: "A" },
    ],
    detailedSections: [
      {
        heading: "The Problem with NAD+ IV Therapy",
        content: "NAD+ IV therapy has been the gold standard for NAD+ delivery, but it comes with significant drawbacks:\n\n**Cost**: Typical IV NAD+ sessions cost £500-1,500 per treatment, with protocols requiring multiple sessions per month. Annual costs can exceed £10,000.\n\n**Time**: Each IV infusion takes 2-4 hours, requiring a clinic visit and supervision.\n\n**Availability**: Limited to clinic locations, often requiring advance booking.\n\n**Side Effects**: IV infusions can cause chest tightness, nausea, and discomfort during administration, particularly at higher infusion rates.\n\n**Inconsistency**: NAD+ levels spike dramatically during infusion, then decline. This pattern differs from the body's natural, steady-state NAD+ metabolism.\n\nFor researchers studying NAD+ biology, these limitations make IV therapy impractical for sustained, consistent protocols.",
      },
      {
        heading: "ORYN NAD+ Pen: Daily Precision Dosing",
        content: "The ORYN NAD+ Pen delivers 500mg of pharmaceutical-grade NAD+ in a pre-mixed pen system designed for consistent, daily administration:\n\n**Subcutaneous Delivery**: Bypasses the digestive system entirely, providing high bioavailability without the complexity of IV access.\n\n**Consistent Levels**: Daily dosing maintains steadier NAD+ levels compared to the spike-and-crash pattern of periodic IV infusions.\n\n**At-Home Convenience**: No clinic visits, no appointments, no 2-4 hour sessions. Administration takes minutes.\n\n**Cost**: £299 per month vs £500-1,500+ per IV session. Over a year, savings can exceed £10,000.\n\nThe ORYN NAD+ pen is ideal for researchers who need consistent, daily NAD+ delivery with adjustable dosing flexibility.",
      },
      {
        heading: "NovaDose System: Advanced Daily Microdosing",
        content: "The NovaDose NAD+ system represents ORYN's most advanced delivery platform:\n\n**Cartridge-Based Design**: Uses replaceable cartridges in an aluminium pen body, offering a premium, sustainable dosing experience.\n\n**Daily Microdosing**: Engineered specifically for precise daily microdoses, aligning with the body's natural NAD+ metabolism patterns.\n\n**Near 100% Bioavailability**: The cartridge system and micro-needle technology maximise absorption and minimise waste.\n\n**Korean Pharmaceutical Grade**: NAD+ sourced from pharmaceutical-grade Korean manufacturing facilities.\n\n**At £399**, the NovaDose system costs less than a single IV infusion session while providing a full month of daily NAD+ delivery. For sustained research protocols, it represents an order-of-magnitude improvement in cost-effectiveness.",
      },
    ],
    faqs: [
      { question: "Is NAD+ pen as effective as IV therapy?", answer: "Subcutaneous NAD+ delivery provides high bioavailability comparable to IV therapy. Daily pen dosing also maintains more consistent NAD+ levels than periodic IV infusions, which cause spike-and-crash patterns." },
      { question: "How much does NAD+ pen cost compared to IV?", answer: "ORYN NAD+ pen costs £299/month and NovaDose costs £399/month. IV NAD+ therapy typically costs £500-1,500 per session, with multiple sessions needed per month. Annual savings with pen delivery can exceed £10,000." },
      { question: "What is the difference between the NAD+ Pen and NovaDose?", answer: "The NAD+ Pen (£299) is a standard pre-mixed pen with adjustable dosing. The NovaDose (£399) is an advanced cartridge-based system designed specifically for daily microdosing with near-100% bioavailability." },
    ],
  },
];

export function getComparisonBySlug(slug: string): PeptideComparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

export const COMPARISON_SLUGS = COMPARISONS.map((c) => c.slug);
