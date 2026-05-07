import { SEO } from "@/components/SEO";
import { Hero } from "@/components/landing/Hero";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { Features } from "@/components/landing/Features";
import { RoleBenefits } from "@/components/landing/RoleBenefits";
import { AISection } from "@/components/landing/AISection";
import { SaudiSection } from "@/components/landing/SaudiSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <SEO 
        title="PropTech — نظام متكامل لإدارة العقارات المؤجرة"
        description="منصة سعودية رائدة لإدارة العقارات والوحدات المؤجرة. مزامنة فورية للحجوزات، تحليلات ذكية، وعمليات تشغيلية سلسة."
      />
      
      <main className="min-h-screen">
        <Hero />
        <ProblemSolution />
        <Features />
        <RoleBenefits />
        <AISection />
        <SaudiSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}