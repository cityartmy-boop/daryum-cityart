import { SEO } from "@/components/SEO";
import { Hero } from "@/components/landing/Hero";
import { Partners } from "@/components/landing/Partners";
import { WhyDaryum } from "@/components/landing/WhyDaryum";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { RoleBenefits } from "@/components/landing/RoleBenefits";
import { AISection } from "@/components/landing/AISection";
import { SaudiSection } from "@/components/landing/SaudiSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <SEO />
      <main className="min-h-screen">
        <Hero />
        <Partners />
        <WhyDaryum />
        <Features />
        <HowItWorks />
        <RoleBenefits />
        <AISection />
        <SaudiSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}