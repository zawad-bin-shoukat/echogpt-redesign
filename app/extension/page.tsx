import type { Metadata } from "next";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import {
  ExtensionHero,
  BrowserSimulator,
  ExtensionWorkflow,
  ExtensionCta,
} from "@/components/extension";

export const metadata: Metadata = {
  title: "Chrome Extension — EchoGPT",
  description:
    "EchoGPT Chrome Side Panel Extension — Query 40+ frontier AI models, summarize articles, and explain text without leaving your active tab.",
};

export default function ExtensionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-subtle selection:text-accent scroll-smooth">
      {/* 1. Global Navigation */}
      <Navbar />

      {/* 2. Main Content Stream */}
      <main className="flex-1">
        {/* Extension Intro Hero */}
        <ExtensionHero />

        {/* Live Browser + Side Panel Simulator */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <BrowserSimulator />
        </section>

        {/* 4-Step Extension Workflow */}
        <ExtensionWorkflow />

        {/* Compact Final Conversion CTA */}
        <ExtensionCta />
      </main>

      {/* 3. Global Footer */}
      <Footer />
    </div>
  );
}
