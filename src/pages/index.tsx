import { SEO } from "@/components/SEO";
import { Hero } from "@/components/landing/Hero";
import { Partners } from "@/components/landing/Partners";
import { AboutSection } from "@/components/landing/AboutSection";
import { WhyDaryum } from "@/components/landing/WhyDaryum";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { Features } from "@/components/landing/Features";
import { RoleBenefits } from "@/components/landing/RoleBenefits";
import { AISection } from "@/components/landing/AISection";
import { OwnerReporting } from "@/components/landing/OwnerReporting";
import { PricingPlans } from "@/components/landing/PricingPlans";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <SEO 
        title="داريوم - نظام متكامل لإدارة العقارات المؤجرة"
        description="منصة سعودية رائدة لإدارة العقارات والوحدات المؤجرة. مزامنة فورية للحجوزات، تحليلات ذكية، وعمليات تشغيلية سلسة."
      />
      
      <main className="min-h-screen">
        <Hero />
        <Partners />
        <AboutSection />
        <WhyDaryum />
        <HowItWorks />
        <RoleBenefits />
        <AISection />
        <OwnerReporting />
        <PricingPlans />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}