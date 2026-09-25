import * as React from "react";
import Link from "next/link";
import {
  Layers,
  Scale,
  Puzzle,
  GitBranch,
  ArrowRight,
  Cpu,
  Code2,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoFeatures() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative py-20 sm:py-28 lg:py-32 border-t border-border-subtle bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-2xs mb-4">
            <Layers className="size-3.5 text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
              Capabilities
            </span>
            <span className="text-border-strong">|</span>
            <span>Purpose-Built Architecture</span>
          </div>

          <h2
            id="features-heading"
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-tight"
          >
            Built for deep focus, not vendor lock-in.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            Why juggle multiple subscriptions and disparate browser tabs? EchoGPT consolidates
            the world&apos;s leading frontier foundation models into one intelligent, cohesive
            workspace with native browser context.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Multi-Model Gateway (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-border-strong transition-colors">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="size-10 rounded-[var(--radius-md)] bg-accent-subtle border border-accent/20 flex items-center justify-center text-accent">
                  <Layers className="size-5" />
                </div>
                <Badge variant="primary" size="sm">
                  40+ Unified Models
                </Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight">
                One unified subscription, all frontier models.
              </h3>
              <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
                Eliminate the cost and cognitive fatigue of paying $20/month across separate
                AI accounts. Query OpenAI, Google DeepMind, DeepSeek, xAI, and Moonshot AI
                from a single high-performance interface with zero API key configuration.
              </p>
            </div>

            {/* Visual Preview Container */}
            <div className="mt-8 rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-text-muted pb-2 border-b border-border-subtle font-mono">
                <span>Active Routing Cluster</span>
                <span className="flex items-center gap-1.5 text-accent font-semibold">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                  All 41 Gateways Online
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-[var(--radius-md)] bg-surface-elevated border border-border-subtle flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="size-3.5 text-indigo-400" />
                    <span className="text-xs font-semibold text-text-primary">GPT-5.6 Sol</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">OpenAI · Flagship</span>
                </div>

                <div className="p-2.5 rounded-[var(--radius-md)] bg-surface-elevated border border-border-subtle flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Zap className="size-3.5 text-sky-400" />
                    <span className="text-xs font-semibold text-text-primary">Gemini 3.8</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">Google · Ultra Fast</span>
                </div>

                <div className="p-2.5 rounded-[var(--radius-md)] bg-surface-elevated border border-border-subtle flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="size-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-text-primary">DeepSeek V4</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">DeepSeek · Code & Math</span>
                </div>

                <div className="p-2.5 rounded-[var(--radius-md)] bg-surface-elevated border border-border-subtle flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="size-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-text-primary">Kimi K2.7</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">Moonshot · Long AST</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-text-muted">No API quotas, personal keys, or rate limits</span>
                <Link
                  href="/app"
                  className="inline-flex items-center gap-1 text-accent font-medium hover:underline text-xs"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Parallel Model Comparison (1 column) */}
          <div className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-border-strong transition-colors">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="size-10 rounded-[var(--radius-md)] bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Scale className="size-5" />
                </div>
                <Badge variant="fast" size="sm">
                  Side-by-Side
                </Badge>
              </div>

              <h3 className="text-xl font-semibold text-text-primary tracking-tight">
                Objective Model Cross-Verification
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Never accept an AI answer without verification. Inspect answers from two distinct
                architectures side by side to detect subtle hallucinations and compare reasoning logic.
              </p>
            </div>

            {/* Comparative Visual preview */}
            <div className="mt-6 rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-3.5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-border-subtle pb-2">
                <span className="text-indigo-400 font-medium">Model A: GPT-5.6 Sol</span>
                <span className="text-text-muted">vs</span>
                <span className="text-emerald-400 font-medium">Model B: DeepSeek V4</span>
              </div>
              <div className="space-y-1.5 text-xs text-text-secondary">
                <div className="p-2 rounded bg-surface-elevated border border-border-subtle flex items-start justify-between gap-2">
                  <span className="truncate">Algorithmic correctness</span>
                  <span className="font-mono text-[10px] text-accent font-semibold shrink-0">100% Match</span>
                </div>
                <div className="p-2 rounded bg-surface-elevated border border-border-subtle flex items-start justify-between gap-2">
                  <span className="truncate">Inference latency differential</span>
                  <span className="font-mono text-[10px] text-text-muted shrink-0">Δ 0.04s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Browser Extension (1 column) */}
          <div className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-border-strong transition-colors">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="size-10 rounded-[var(--radius-md)] bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Puzzle className="size-5" />
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-surface border border-border-subtle text-text-muted">
                  ⌘⇧E Shortcut
                </span>
              </div>

              <h3 className="text-xl font-semibold text-text-primary tracking-tight">
                Chrome Side Panel Companion
              </h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                Summon EchoGPT alongside any webpage. Summarize articles, explain highlighted code,
                and extract takeaways directly from active browser tabs without switching away.
              </p>
            </div>

            {/* Visual browser frame */}
            <div className="mt-6 rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-text-primary font-medium">
                  <span className="size-2 rounded-full bg-accent" />
                  <span>DOM Context Injected</span>
                </div>
                <span className="font-mono text-[10px] text-text-muted">1,420 words</span>
              </div>
              <div className="p-2 rounded bg-surface-elevated border border-border-subtle text-xs text-text-secondary">
                &ldquo;Summarize the key architectural implications of this RFC...&rdquo;
              </div>
            </div>
          </div>

          {/* Card 4: Continuous Contextual Memory (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-border-strong transition-colors">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="size-10 rounded-[var(--radius-md)] bg-accent-subtle border border-accent/20 flex items-center justify-center text-accent">
                  <GitBranch className="size-5" />
                </div>
                <Badge variant="coding" size="sm">
                  Seamless Handoff
                </Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight">
                Switch models mid-conversation without memory loss.
              </h3>
              <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
                Start a thought with a high-capacity reasoning model, pass the context to a coding specialist
                for implementation, and finish with a fast model for formatting. EchoGPT preserves the
                entire session state across model transitions.
              </p>
            </div>

            {/* Flow visualization */}
            <div className="mt-8 rounded-[var(--radius-lg)] border border-border-subtle bg-surface p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-7 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-primary">Step 1: Ideation & Architecture</div>
                    <div className="text-[11px] font-mono text-text-muted">GPT-5.6 Sol · 128K context</div>
                  </div>
                </div>

                <div className="hidden sm:block text-text-muted font-mono text-xs">→</div>

                <div className="flex items-center gap-3">
                  <div className="size-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-primary">Step 2: Syntax & Implementation</div>
                    <div className="text-[11px] font-mono text-text-muted">DeepSeek V4 Pro · Code specialization</div>
                  </div>
                </div>

                <div className="hidden sm:block text-text-muted font-mono text-xs">→</div>

                <div className="flex items-center gap-3">
                  <div className="size-7 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-text-primary">Step 3: Executive Summary</div>
                    <div className="text-[11px] font-mono text-text-muted">Gemini 3.8 Flash · 0.24s stream</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
