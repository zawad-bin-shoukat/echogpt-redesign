"use client";

import * as React from "react";
import { ArrowDown, Laptop, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExtensionHero() {
  const scrollToSimulator = () => {
    const el = document.getElementById("simulator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWorkflow = () => {
    const el = document.getElementById("workflow");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-subtle text-xs font-medium text-text-secondary shadow-2xs">
          <Puzzle className="size-3.5 text-sky-400" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            Chrome Extension
          </span>
          <span className="text-border-strong">|</span>
          <span>Native Side Panel</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.12]">
          AI that stays with you <br className="hidden sm:inline" />
          <span className="text-text-secondary">while you browse.</span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary leading-relaxed">
          Summarize pages, explain selected text, and query 40+ frontier models in Chrome&apos;s native side panel—without ever leaving the tab you&apos;re working in.
        </p>

        {/* Action Buttons Row */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToSimulator}
            rightIcon={<ArrowDown className="size-4" />}
            className="w-full sm:w-auto shadow-xs"
          >
            Try the Extension Simulator
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToWorkflow}
            leftIcon={<Laptop className="size-4 text-text-muted" />}
            className="w-full sm:w-auto"
          >
            See How It Works
          </Button>
        </div>

        {/* Keyboard Shortcut Callout */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-text-muted font-mono">
          <span>Global Shortcut:</span>
          <kbd className="px-2 py-0.5 rounded bg-surface border border-border-strong text-text-primary font-semibold shadow-2xs text-[11px]">
            ⌘ + Shift + E
          </kbd>
          <span className="text-text-muted/60">or</span>
          <kbd className="px-2 py-0.5 rounded bg-surface border border-border-strong text-text-primary font-semibold shadow-2xs text-[11px]">
            Ctrl + Shift + E
          </kbd>
        </div>
      </div>
    </section>
  );
}
