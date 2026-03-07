"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsShowcase } from "@/components/sections/ProductsShowcase";
import { ScienceSection } from "@/components/sections/ScienceSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { QualitySection } from "@/components/sections/QualitySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ProductsShowcase />
      <TestimonialsSection />
      <ScienceSection />
      <QualitySection />
      <CTASection />
    </>
  );
}
