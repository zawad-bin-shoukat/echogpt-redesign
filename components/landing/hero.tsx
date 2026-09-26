import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Puzzle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkspacePreview } from "./workspace-preview";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32"
      aria-labelledby="hero-heading"
    >
      {/* Background Architectural Grid Pattern (Subtle, CSS-only) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Text & Narrative Hierarchy */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-2xs mb-6 sm:mb-8 transition-colors hover:border-border-strong">
            <span className="flex size-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] text-accent font-semibold uppercase tracking-wider">
              Ecosystem
            </span>
            <span className="text-border-strong">|</span>
            <span>41 Verified Models</span>
          </div>

          {/* Primary H1 Heading */}
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl leading-[1.08] sm:leading-[1.08]"
          >
            One workspace for the world&apos;s leading AI models.
          </h1>

          {/* Supporting Product Value Narrative */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed sm:leading-relaxed max-w-2xl mx-auto">
            Access OpenAI, Google, DeepSeek, xAI, and Moonshot AI in a single
            unified workspace. Seamlessly compare outputs, switch models instantly,
            and extend intelligent assistance directly into your browser side panel.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/app" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto justify-center shadow-sm"
                leftIcon={<Sparkles className="size-4" />}
                rightIcon={<ArrowRight className="size-4" />}
              >
                Try EchoGPT
              </Button>
            </Link>

            <Link href="/extension" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto justify-center"
                leftIcon={<Puzzle className="size-4 text-sky-500" />}
              >
                Explore the Extension
              </Button>
            </Link>
          </div>

          {/* Trust & Capability Micro-Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-accent" />
              Zero individual API keys required
            </span>
            <span className="hidden sm:inline text-border-strong">·</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-accent" />
              Unified conversational memory
            </span>
            <span className="hidden sm:inline text-border-strong">·</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-accent" />
              Chrome Side Panel companion
            </span>
          </div>
        </div>

        {/* Hero Visual: Interactive Product Workspace Preview */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <WorkspacePreview />
        </div>
      </div>
    </section>
  );
}
