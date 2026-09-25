"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VERIFIED_MODELS } from "@/lib/mock/verified-models";
import type { Model, ModelCategory } from "@/types";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | ModelCategory;

interface CategoryTab {
  id: CategoryFilter;
  label: string;
  count: number;
}

export function ModelsSection() {
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all");

  const categories: CategoryTab[] = React.useMemo(() => {
    return [
      { id: "all", label: "Curated Directory", count: VERIFIED_MODELS.length },
      {
        id: "flagship",
        label: "Flagship Reasoning",
        count: VERIFIED_MODELS.filter((m) => m.category === "flagship").length,
      },
      {
        id: "coding",
        label: "Code & Engineering",
        count: VERIFIED_MODELS.filter((m) => m.category === "coding").length,
      },
      {
        id: "fast",
        label: "High-Throughput Fast",
        count: VERIFIED_MODELS.filter((m) => m.category === "fast").length,
      },
      {
        id: "specialized",
        label: "Extended Context (1M+)",
        count: VERIFIED_MODELS.filter((m) => m.category === "specialized").length,
      },
      {
        id: "free",
        label: "Free Access Tier",
        count: VERIFIED_MODELS.filter((m) => m.tier === "free").length,
      },
    ];
  }, []);

  // Filter models based on selection
  const displayedModels: Model[] = React.useMemo(() => {
    if (activeCategory === "all") {
      // Curate a diverse selection of 8 prominent models across providers
      const featuredSlugs = [
        "gpt-5.6-sol",
        "google/gemini-3.8-flash",
        "deepseek/deepseek-v4-pro",
        "moonshotai/Kimi-K2.7-Code",
        "x-ai/grok-4.6",
        "echogpt",
        "Qwen/Qwen3.8-Max",
        "nemotron-3-ultra-550b",
      ];
      const featured = VERIFIED_MODELS.filter((m) => featuredSlugs.includes(m.slug));
      return featured.length > 0 ? featured : VERIFIED_MODELS.slice(0, 8);
    }

    if (activeCategory === "free") {
      return VERIFIED_MODELS.filter((m) => m.tier === "free").slice(0, 8);
    }

    return VERIFIED_MODELS.filter((m) => m.category === activeCategory).slice(0, 8);
  }, [activeCategory]);

  return (
    <section
      id="models"
      aria-labelledby="models-heading"
      className="relative py-20 sm:py-28 lg:py-32 border-t border-border-subtle bg-surface/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-2xs mb-4">
            <Cpu className="size-3.5 text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
              Model Catalog
            </span>
            <span className="text-border-strong">|</span>
            <span>Verified 41-Model Directory</span>
          </div>

          <h2
            id="models-heading"
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-tight"
          >
            The world&apos;s most capable AI models.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            From multi-step algorithmic proofs to million-token document synthesis,
            switch seamlessly between specialized architectures tailored to your exact task.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-10 sm:mt-12 flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-none pb-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0",
                "focus-visible:outline-2 focus-visible:outline-accent",
                activeCategory === cat.id
                  ? "bg-accent text-white shadow-xs font-semibold"
                  : "bg-surface border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-surface-hover"
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  "font-mono text-[10px] px-1.5 py-0.2 rounded-full",
                  activeCategory === cat.id
                    ? "bg-white/20 text-white"
                    : "bg-surface-elevated text-text-muted"
                )}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Curated Model Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedModels.map((model) => (
            <div
              key={model.id}
              className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated p-5 flex flex-col justify-between shadow-xs hover:border-border-strong hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge variant={model.category} size="sm" className="capitalize">
                    {model.category}
                  </Badge>

                  <div className="flex items-center gap-1">
                    {model.tier === "free" ? (
                      <span className="text-[10px] font-mono text-emerald-500 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        Free
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-text-muted px-1.5 py-0.5 rounded bg-surface border border-border-subtle">
                        Pro
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {model.name}
                </h3>

                <div className="flex items-center gap-2 mt-1 text-xs text-text-muted font-mono">
                  <span>{model.provider}</span>
                  {model.contextWindow && (
                    <>
                      <span>·</span>
                      <span className="text-accent">{model.contextWindow}</span>
                    </>
                  )}
                </div>

                <p className="mt-3 text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {model.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-text-muted">
                  via EchoGPT
                </span>
                <Link
                  href="/app"
                  className="inline-flex items-center gap-1 font-medium text-text-primary group-hover:text-accent group-hover:underline transition-colors"
                >
                  <span>Use Model</span>
                  <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Directory Footer Banner */}
        <div className="mt-10 sm:mt-12 rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="size-9 rounded-full bg-accent-subtle text-accent flex items-center justify-center shrink-0">
              <Terminal className="size-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary">
                Explore the complete verified 41-model catalog
              </div>
              <div className="text-xs text-text-secondary">
                Filter by provider, test prompts, and customize system instructions in the workspace.
              </div>
            </div>
          </div>

          <Link href="/app" className="shrink-0 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              className="w-full sm:w-auto justify-center"
              rightIcon={<ArrowRight className="size-3.5" />}
            >
              Open Full Catalog
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
