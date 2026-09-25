import type { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Hero } from "@/components/landing/hero";
import { BentoFeatures } from "@/components/landing/bento-features";
import { ModelsSection } from "@/components/landing/models-section";
import { ExtensionSpotlight } from "@/components/landing/extension-spotlight";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";

export const metadata: Metadata = {
  title: "EchoGPT — One Workspace for the World's Leading AI Models",
  description:
    "Access 40+ frontier AI models — GPT-5.6 Sol, Gemini 3.8 Flash, DeepSeek V4 Pro, Grok 4.6, Kimi K2.7 and more — in one unified workspace with an intelligent Chrome Extension side panel.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-subtle selection:text-accent scroll-smooth">
      {/* Global Shared Navigation */}
      <Navbar />

      {/* Main Content Stream */}
      <main className="flex-1">
        {/* 1. Hero & Interactive Workspace Preview */}
        <Hero />

        {/* 2. Bento Capabilities & Product Story */}
        <BentoFeatures />

        {/* 3. Verified 41-Model Directory Showcase */}
        <ModelsSection />

        {/* 4. Chrome Side Panel Extension Spotlight */}
        <ExtensionSpotlight />

        {/* 5. Verified Subscription Pricing */}
        <PricingSection />

        {/* 6. Accessible Frequently Asked Questions */}
        <FaqSection />

        {/* 7. Compact Final Conversion CTA */}
        <FinalCta />
      </main>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
}
