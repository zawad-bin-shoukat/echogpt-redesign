import * as React from "react";
import Link from "next/link";
import {
  Puzzle,
  FileText,
  Highlighter,
  Command,
  ArrowRight,
  Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ExtensionSpotlight() {
  return (
    <section
      id="extension"
      aria-labelledby="extension-heading"
      className="relative py-20 sm:py-28 lg:py-32 border-t border-border-subtle bg-background overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & Workflows (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-2xs">
              <Puzzle className="size-3.5 text-sky-500" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-sky-500 font-semibold">
                Side Panel API
              </span>
              <span className="text-border-strong">|</span>
              <span>Chrome Companion</span>
            </div>

            <h2
              id="extension-heading"
              className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-tight"
            >
              Intelligence that lives directly in your browser.
            </h2>

            <p className="text-base text-text-secondary leading-relaxed">
              No more copying and pasting text into separate chat windows. Built on Chrome&apos;s
              modern Side Panel architecture, EchoGPT stays anchored alongside your active tab
              for zero-context-switching productivity.
            </p>

            {/* Verified Capabilities List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="size-8 rounded-[var(--radius-md)] bg-accent-subtle text-accent flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    One-Click Webpage Summaries
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                    Extract structured executive summaries and key decisions from dense RFCs,
                    whitepapers, or news articles in seconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="size-8 rounded-[var(--radius-md)] bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Highlighter className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    Highlight &amp; Explain Anywhere
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                    Highlight complex terminology or code on any website for instant contextual
                    breakdowns without leaving the paragraph.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="size-8 rounded-[var(--radius-md)] bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Command className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    Instant Global Keyboard Shortcut
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                    Toggle the panel with <kbd className="font-mono px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-[11px] text-text-primary font-medium">⌘⇧E</kbd> on macOS or <kbd className="font-mono px-1.5 py-0.5 rounded bg-surface border border-border-subtle text-[11px] text-text-primary font-medium">Ctrl+Shift+E</kbd> on Windows.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/extension" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto justify-center"
                  leftIcon={<Laptop className="size-4" />}
                  rightIcon={<ArrowRight className="size-4" />}
                >
                  Try Extension Simulator
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Realistic Browser Split-Pane Mockup (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated shadow-xl overflow-hidden">
              {/* Browser Window Chrome */}
              <div className="border-b border-border-subtle bg-surface px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-border-strong" />
                  <div className="size-2.5 rounded-full bg-border-strong" />
                  <div className="size-2.5 rounded-full bg-border-strong" />
                </div>

                {/* URL Bar */}
                <div className="flex-1 max-w-sm mx-auto">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-[var(--radius-md)] bg-surface-elevated border border-border-subtle text-xs text-text-muted font-mono truncate">
                    <span className="text-accent font-semibold">https://</span>
                    <span className="text-text-secondary truncate">docs.ast-compiler.dev/v2/transforms</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="size-6 rounded bg-accent-subtle text-accent flex items-center justify-center font-mono text-[10px] font-bold">
                    E
                  </div>
                </div>
              </div>

              {/* Split Body: Webpage (Left) + Side Panel (Right) */}
              <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[360px]">
                {/* Simulated Webpage (Left 7 cols on sm) */}
                <div className="sm:col-span-7 p-5 bg-background border-b sm:border-b-0 sm:border-r border-border-subtle space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                      Technical Documentation
                    </span>
                    <h4 className="text-sm font-semibold text-text-primary leading-snug">
                      Compiler AST Lowering and Tree Rewriting Pipelines
                    </h4>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    When lowering intermediate representation nodes to executable bytecode, the AST pass
                    must preserve variable lexical scopes while pruning dead control paths.
                  </p>

                  {/* Highlighted text block */}
                  <div className="p-2.5 rounded-[var(--radius-sm)] bg-amber-500/10 border-l-2 border-amber-500 text-xs text-text-primary leading-relaxed">
                    <span className="font-semibold text-amber-500 text-[10px] block uppercase tracking-wider mb-0.5">
                      Selected Text (Highlighted)
                    </span>
                    &ldquo;Static single assignment (SSA) phi-nodes eliminate redundant memory barriers across parallel task workers.&rdquo;
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    Optimizers can subsequently rewrite SSA graphs into vector registers using single-cycle SIMD intrinsics.
                  </p>
                </div>

                {/* Simulated Chrome Side Panel (Right 5 cols on sm) */}
                <div className="sm:col-span-5 p-4 bg-surface/50 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Side Panel Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-accent" />
                        <span className="text-xs font-semibold text-text-primary">
                          Gemini 3.8 Flash
                        </span>
                      </div>
                      <Badge variant="fast" size="sm">
                        0.22s
                      </Badge>
                    </div>

                    {/* Page Context Badge */}
                    <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-surface-elevated border border-border-subtle text-[11px]">
                      <span className="text-text-muted">Page Context:</span>
                      <span className="font-mono text-accent font-medium">1,420 words active</span>
                    </div>

                    {/* Assistant Quick Explanation */}
                    <div className="p-3 rounded-[var(--radius-md)] bg-surface-elevated border border-border-subtle space-y-1.5 text-xs text-text-primary shadow-2xs">
                      <div className="text-[10px] font-mono text-text-muted">
                        Explain Highlight:
                      </div>
                      <p className="text-text-secondary text-[11px] leading-relaxed">
                        SSA phi-nodes act as conditional mergers for variable versions, allowing the compiler to keep data in CPU registers without expensive RAM synchronization.
                      </p>
                    </div>
                  </div>

                  {/* Panel Mini Composer */}
                  <div className="p-2 rounded-[var(--radius-md)] bg-surface-elevated border border-border-subtle flex items-center justify-between text-xs text-text-muted">
                    <span className="truncate">Ask about this page...</span>
                    <kbd className="font-mono text-[10px] px-1 rounded bg-surface border border-border-subtle">
                      ↵
                    </kbd>
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
