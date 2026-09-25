"use client";

import * as React from "react";
import {
  Lock,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Puzzle,
  Sparkles,
  BookOpen,
  Layout,
  Columns2,
} from "lucide-react";
import { SidePanel } from "./side-panel";
import { Badge } from "@/components/ui/badge";
import { VERIFIED_MODELS } from "@/lib/mock/verified-models";
import type { Model } from "@/types";
import { cn } from "@/lib/utils";
import {
  INITIAL_EXTENSION_MESSAGES,
  type ExtensionMessage,
} from "./extension-simulation";

export function BrowserSimulator() {
  const [activeView, setActiveView] = React.useState<"split" | "page" | "panel">("split");
  const [selectedHighlight, setSelectedHighlight] = React.useState(true);
  const [pageContextActive, setPageContextActive] = React.useState(true);

  // Default active model: GPT-5.6 Sol
  const defaultModel =
    VERIFIED_MODELS.find((m) => m.id === "gpt-5-6-sol") || VERIFIED_MODELS[0];
  const [activeModel, setActiveModel] = React.useState<Model>(defaultModel);

  // Lifted conversation state across views to prevent state loss on tab switches
  const [messages, setMessages] = React.useState<ExtensionMessage[]>(
    INITIAL_EXTENSION_MESSAGES
  );
  const [status, setStatus] = React.useState<"idle" | "processing">("idle");
  const [externalActionTrigger, setExternalActionTrigger] = React.useState<{
    action: "summarize" | "explain" | "takeaways";
    timestamp: number;
  } | null>(null);

  // Trigger explain action from article highlight
  const handleHighlightClick = () => {
    setSelectedHighlight(true);
    setExternalActionTrigger({
      action: "explain",
      timestamp: Date.now(),
    });
    // On mobile or if in page view, switch to panel/split view to show side panel
    if (activeView === "page") {
      // Check window width
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setActiveView("panel");
      } else {
        setActiveView("split");
      }
    }
  };

  // Reusable article component to avoid duplicating text across views
  const renderArticle = (maxWidthClass = "max-w-2xl xl:max-w-3xl") => (
    <article className={cn("mx-auto space-y-5", maxWidthClass)}>
      {/* Article Header Metadata */}
      <div className="space-y-2 border-b border-border-subtle pb-5">
        <div className="flex items-center gap-2">
          <Badge variant="coding" size="sm">
            AI Architecture & Research
          </Badge>
          <span className="text-[11px] font-mono text-text-muted">
            8 min read · Sept 2026
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-text-primary leading-snug">
          Understanding Mixture-of-Experts (MoE) Models in 2026
        </h1>

        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>By Dr. Elena Vance</span>
          <span>·</span>
          <span>Senior ML Systems Architect</span>
        </div>
      </div>

      {/* Article Body Paragraph 1 */}
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        As frontier foundation models scale toward multi-trillion parameter limits, hardware memory bandwidth and inference energy consumption have emerged as the primary bottlenecks in real-time deployment. Dense architectures—where every parameter participates in the computation of every single token—are increasingly uneconomic for high-throughput streaming.
      </p>

      {/* Highlighted / Selected Text Passage (Triggering EchoGPT Explanation) */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleHighlightClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleHighlightClick();
          }
        }}
        aria-label="Highlighted excerpt: Sparse MoE architectures decouple total parameter capacity from per-token computation FLOPs. Click to inspect with EchoGPT."
        className={cn(
          "relative my-4 p-3.5 rounded-[var(--radius-lg)] border text-text-primary transition-all cursor-pointer group shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent",
          selectedHighlight
            ? "bg-accent-subtle/50 border-accent/60"
            : "bg-surface border-border-subtle hover:border-accent/40"
        )}
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-accent font-medium mb-1">
          <span className="inline-flex items-center gap-1">
            <Sparkles className="size-3" />
            <span>HIGHLIGHTED TEXT SELECTION</span>
          </span>
          <span className="text-[10px] text-text-muted group-hover:text-text-primary transition-colors">
            Click to inspect in Side Panel
          </span>
        </div>

        <p className="text-xs sm:text-sm italic font-serif leading-relaxed text-text-primary">
          &quot;Sparse MoE architectures decouple total parameter capacity from per-token computation FLOPs by activating sparse expert sub-networks dynamically per token, achieving 40B+ capacity representation while incurring the compute footprint of a 7B model.&quot;
        </p>

        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-accent/20 text-[11px]">
          <span className="text-text-muted text-[10px] font-mono">
            34 words selected
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-accent text-xs">
            <span>Explain with EchoGPT</span>
            <span className="font-mono text-[10px] opacity-75">⌘⇧E</span>
          </span>
        </div>
      </div>

      {/* Article Body Paragraph 2 */}
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        Rather than forwarding representations through a monolithic feed-forward layer, a lightweight gating router calculates a softmax distribution over candidate expert networks. In state-of-the-art implementations, only the top-2 scoring experts are dispatched per token, blending their activations before passing to the subsequent layer.
      </p>

      {/* Technical Code / Architecture Illustration */}
      <div className="p-3 rounded-[var(--radius-lg)] bg-surface border border-border-subtle font-mono text-[11px] text-text-primary space-y-1">
        <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
          {"// MOE DYNAMIC ROUTER ROUTING MATRIX"}
        </div>
        <div className="text-emerald-500 dark:text-emerald-400">
          const routerWeights = softmax(tokenEmbedding · gateMatrix);
        </div>
        <div className="text-text-muted">
          const [expertA, expertB] = selectTopK(routerWeights, 2);
        </div>
        <div className="text-sky-400">
          return blendOutputs(expertA.forward(token), expertB.forward(token));
        </div>
      </div>

      {/* Article Body Paragraph 3 */}
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        This architecture provides enormous throughput improvements for developers querying models via in-browser side panels, IDE code autocomplete, and real-time document summarization without sacrificing precision.
      </p>
    </article>
  );

  return (
    <div id="simulator" className="w-full max-w-7xl mx-auto scroll-mt-24">
      {/* Container Frame with Simulated Chrome Window Styling */}
      <div className="rounded-[var(--radius-xl)] border border-border-strong bg-surface-elevated shadow-xl overflow-hidden">
        {/* 1. Chrome Window Title Bar & Tabs */}
        <div className="bg-surface border-b border-border-subtle px-3 pt-2.5 pb-1 flex items-center justify-between gap-3">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-1.5 shrink-0 pl-1">
            <span className="size-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {/* Browser Tabs Row */}
          <div className="flex items-center gap-1 min-w-0 flex-1 overflow-x-auto scrollbar-none max-w-2xl">
            {/* Active Tab (Simulated Article) */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-[var(--radius-md)] bg-surface-elevated border-t border-x border-border-subtle text-xs font-medium text-text-primary shrink-0 max-w-xs shadow-2xs">
              <span className="size-2 rounded-full bg-accent shrink-0" />
              <span className="truncate">Understanding Mixture-of-Experts Models</span>
            </div>

            {/* Inactive Tab 1 */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-t-[var(--radius-md)] text-xs text-text-muted hover:text-text-secondary transition-colors shrink-0 max-w-xs">
              <span className="size-2 rounded-full bg-border-strong shrink-0" />
              <span className="truncate">Next.js Architecture Guide</span>
            </div>

            {/* Inactive Tab 2 */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-t-[var(--radius-md)] text-xs text-text-muted hover:text-text-secondary transition-colors shrink-0 max-w-xs">
              <span className="size-2 rounded-full bg-border-strong shrink-0" />
              <span className="truncate">GitHub - EchoGPT Workspace</span>
            </div>
          </div>

          {/* Right Window Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-text-muted shrink-0 pr-1">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>Chrome Side Panel Connected</span>
          </div>
        </div>

        {/* 2. Chrome Navigation Toolbar & Address Bar */}
        <div className="bg-surface-elevated px-3 py-2 border-b border-border-subtle flex items-center justify-between gap-3 text-text-muted">
          {/* Back, Forward, Reload */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              disabled
              aria-label="Back"
              className="p-1 rounded hover:bg-surface text-text-muted/60 cursor-not-allowed"
            >
              <ArrowLeft className="size-3.5" />
            </button>
            <button
              type="button"
              disabled
              aria-label="Forward"
              className="p-1 rounded hover:bg-surface text-text-muted/60 cursor-not-allowed"
            >
              <ArrowRight className="size-3.5" />
            </button>
            <button
              type="button"
              aria-label="Reload webpage"
              onClick={() => {
                setMessages(INITIAL_EXTENSION_MESSAGES);
                setStatus("idle");
              }}
              title="Reload webpage simulation"
              className="p-1 rounded hover:bg-surface text-text-muted hover:text-text-primary cursor-pointer transition-colors"
            >
              <RotateCw className="size-3.5" />
            </button>
          </div>

          {/* Omnibox / Address Bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-subtle text-xs text-text-secondary shadow-2xs">
            <Lock className="size-3 text-accent shrink-0" />
            <span className="text-text-primary font-medium">https://</span>
            <span className="text-text-primary truncate">echogpt.live/blog/understanding-moe-models</span>
          </div>

          {/* Extension Toolbar (Puzzle + Active EchoGPT Extension Icon) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              aria-label="Extensions menu"
              className="p-1 rounded hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
            >
              <Puzzle className="size-3.5" />
            </button>

            {/* EchoGPT Active Side Panel Icon Button */}
            <button
              type="button"
              onClick={() => {
                setActiveView(activeView === "panel" ? "split" : "panel");
              }}
              aria-label="Toggle EchoGPT Side Panel view"
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-subtle border border-accent/30 text-accent text-[11px] font-medium cursor-pointer hover:bg-accent-subtle/80 transition-colors"
              title="EchoGPT Side Panel active on this tab"
            >
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-semibold text-[10px]">EchoGPT</span>
            </button>
          </div>
        </div>

        {/* 3. View Switcher Bar (Responsive Controls) */}
        <div className="bg-surface border-b border-border-subtle p-2 flex items-center justify-between gap-2">
          {/* Switcher Buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-start">
            {/* Split View Button (Desktop only: hidden below lg) */}
            <button
              type="button"
              onClick={() => setActiveView("split")}
              className={cn(
                "hidden lg:inline-flex py-1.5 px-3 rounded-[var(--radius-md)] text-xs font-medium text-center transition-all items-center justify-center gap-1.5 cursor-pointer",
                activeView === "split"
                  ? "bg-surface-elevated text-text-primary border border-border-subtle shadow-xs font-semibold"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              <Columns2 className="size-3.5 text-accent" />
              <span>Split View (Side-by-Side)</span>
            </button>

            {/* Webpage Tab Button */}
            <button
              type="button"
              onClick={() => setActiveView("page")}
              className={cn(
                "flex-1 sm:flex-initial py-1.5 px-3 rounded-[var(--radius-md)] text-xs font-medium text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                activeView === "page"
                  ? "bg-surface-elevated text-text-primary border border-border-subtle shadow-xs font-semibold"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              <BookOpen className="size-3.5" />
              <span>Webpage (Active Tab)</span>
            </button>

            {/* Side Panel Tab Button */}
            <button
              type="button"
              onClick={() => setActiveView("panel")}
              className={cn(
                "flex-1 sm:flex-initial py-1.5 px-3 rounded-[var(--radius-md)] text-xs font-medium text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                activeView === "panel"
                  ? "bg-accent-subtle text-accent border border-accent/30 shadow-xs font-semibold"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              <Layout className="size-3.5 text-accent" />
              <span>EchoGPT Side Panel</span>
            </button>
          </div>

          {/* Right Status Pill (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-text-muted pr-2">
            <span className="size-1.5 rounded-full bg-accent" />
            <span>
              {activeView === "split" && "Dual Pane: Webpage (~65%) + Side Panel (~35%)"}
              {activeView === "page" && "Full Canvas: Simulated Webpage"}
              {activeView === "panel" && "Focused Canvas: EchoGPT Side Panel"}
            </span>
          </div>
        </div>

        {/* 4. Main Browser Viewport Canvas */}
        {/* MODE A: Split View (Side-by-Side Desktop layout) */}
        {activeView === "split" && (
          <div className="flex flex-col lg:flex-row min-h-[580px] lg:h-[620px] bg-background">
            {/* Left / Center Area: Simulated Active Webpage */}
            <div className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 leading-relaxed bg-surface/30">
              {renderArticle("max-w-2xl xl:max-w-3xl")}
            </div>

            {/* Right Area: Chrome Side Panel Container (~380px) */}
            <div className="hidden lg:block w-[380px] xl:w-[400px] shrink-0 border-l border-border-subtle h-full">
              <SidePanel
                className="h-full min-h-[500px] lg:min-h-full"
                pageContextActive={pageContextActive}
                onTogglePageContext={() => setPageContextActive(!pageContextActive)}
                selectedHighlight={selectedHighlight}
                activeModel={activeModel}
                onSelectModel={setActiveModel}
                messages={messages}
                onMessagesChange={setMessages}
                status={status}
                onStatusChange={setStatus}
                externalActionTrigger={externalActionTrigger}
              />
            </div>
          </div>
        )}

        {/* MODE B: Webpage Full Canvas */}
        {activeView === "page" && (
          <div className="w-full min-h-[580px] lg:h-[620px] overflow-y-auto p-4 sm:p-8 lg:p-10 space-y-6 leading-relaxed bg-surface/30">
            {renderArticle("max-w-3xl lg:max-w-4xl")}
          </div>
        )}

        {/* MODE C: EchoGPT Side Panel Focused Canvas */}
        {activeView === "panel" && (
          <div className="w-full min-h-[580px] lg:h-[620px] flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-surface/30">
            <div className="w-full max-w-xl h-full min-h-[520px] rounded-[var(--radius-lg)] border border-border-subtle shadow-md overflow-hidden bg-surface">
              <SidePanel
                className="h-full w-full"
                pageContextActive={pageContextActive}
                onTogglePageContext={() => setPageContextActive(!pageContextActive)}
                selectedHighlight={selectedHighlight}
                activeModel={activeModel}
                onSelectModel={setActiveModel}
                messages={messages}
                onMessagesChange={setMessages}
                status={status}
                onStatusChange={setStatus}
                externalActionTrigger={externalActionTrigger}
              />
            </div>
          </div>
        )}

        {/* 5. Bottom Simulator Status Bar */}
        <div className="px-4 py-2 bg-surface border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-text-muted">
          <div className="flex items-center gap-2 font-mono">
            <span className="size-1.5 rounded-full bg-accent" />
            <span>Simulated Environment: Google Chrome 128 / macOS</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Side Panel width: ~380px</span>
            <span>·</span>
            <span>Zero tab switching required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
