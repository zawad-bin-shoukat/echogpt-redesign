"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  Check,
  Search,
  Sparkles,
  ArrowUp,
  Cpu,
  Zap,
  Code2,
  Puzzle,
  ArrowRight,
  X,
  Scale,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/button";
import {
  VERIFIED_MODELS,
  QUICK_SELECT_MODELS,
} from "@/lib/mock/verified-models";
import {
  INITIAL_USER_PROMPT,
  getModelResponse,
  type WorkspaceResponseData,
} from "@/lib/mock/workspace-sim";
import type { Model } from "@/types";
import { cn } from "@/lib/utils";

export function WorkspacePreview() {
  // ── State ────────────────────────────────────────────────────────────────
  const [activeModel, setActiveModel] = React.useState<Model>(() => {
    return (
      VERIFIED_MODELS.find((m) => m.slug === "gpt-5.6-sol") ||
      VERIFIED_MODELS[0]
    );
  });

  const [comparisonModel, setComparisonModel] = React.useState<Model | null>(
    null
  );

  const [selectorOpen, setSelectorOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [userPrompt, setUserPrompt] = React.useState(INITIAL_USER_PROMPT);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Reference for unmount timeout cleanup
  const loadingTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const selectorRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Clean up timers on unmount
  React.useEffect(() => {
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, []);

  // Close selector on outside click
  React.useEffect(() => {
    if (!selectorOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(e.target as Node)
      ) {
        setSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [selectorOpen]);

  // Handle Escape key to close selector
  React.useEffect(() => {
    if (!selectorOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectorOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectorOpen]);

  // Adjust search query on selector close during render (React 19 pattern)
  const [prevSelectorOpen, setPrevSelectorOpen] = React.useState(selectorOpen);
  if (prevSelectorOpen !== selectorOpen) {
    setPrevSelectorOpen(selectorOpen);
    if (!selectorOpen) {
      setSearchQuery("");
    }
  }

  // Focus search input when selector opens
  React.useEffect(() => {
    if (selectorOpen) {
      searchInputRef.current?.focus();
    }
  }, [selectorOpen]);

  // ── Filtered Models ───────────────────────────────────────────────────────
  const filteredModels = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return VERIFIED_MODELS;
    return VERIFIED_MODELS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const selectModel = (model: Model) => {
    setActiveModel(model);
    setSelectorOpen(false);
    // If selecting the comparison model as primary, clear comparison
    if (comparisonModel?.id === model.id) {
      setComparisonModel(null);
    }
  };

  const handleCrossVerify = (slug: string) => {
    const target = VERIFIED_MODELS.find((m) => m.slug === slug);
    if (target) {
      setComparisonModel(target);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    setUserPrompt(trimmed);
    setInputValue("");
    setIsLoading(true);
    setComparisonModel(null);

    // Realistic brief simulated delay (600ms)
    loadingTimerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const handleKeyDownComposer = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Derive response data
  const primaryResponse: WorkspaceResponseData = React.useMemo(
    () => getModelResponse(activeModel, userPrompt),
    [activeModel, userPrompt]
  );

  const comparisonResponse: WorkspaceResponseData | null = React.useMemo(() => {
    if (!comparisonModel) return null;
    return getModelResponse(comparisonModel, userPrompt);
  }, [comparisonModel, userPrompt]);

  // Map category to icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "flagship":
        return <Cpu className="size-3" />;
      case "fast":
        return <Zap className="size-3 text-sky-400" />;
      case "coding":
        return <Code2 className="size-3 text-emerald-400" />;
      default:
        return <Sparkles className="size-3" />;
    }
  };

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Outer Window Container with Subtle Depth */}
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated shadow-xl transition-all">
        {/* Window Titlebar */}
        <div className="flex items-center justify-between border-b border-border-subtle bg-surface px-4 py-3 sm:px-6 relative z-20">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-border-strong" />
            <div className="size-2.5 rounded-full bg-border-strong" />
            <div className="size-2.5 rounded-full bg-border-strong" />
            <span className="ml-2 font-mono text-[11px] text-text-muted hidden sm:inline">
              echogpt.live/app
            </span>
          </div>

          {/* Interactive Model Selector Pill Trigger */}
          <div className="relative" ref={selectorRef}>
            <button
              type="button"
              id="model-selector-trigger"
              onClick={() => setSelectorOpen(!selectorOpen)}
              aria-expanded={selectorOpen}
              aria-haspopup="dialog"
              aria-controls="model-selector-popover"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border bg-surface-elevated px-3 py-1 text-xs font-medium text-text-primary shadow-2xs transition-all",
                "hover:border-border-strong focus-visible:outline-2 focus-visible:outline-accent",
                selectorOpen ? "border-accent ring-2 ring-accent/20" : "border-border-strong"
              )}
            >
              <span className="size-2 rounded-full bg-accent" />
              <span className="font-semibold">{activeModel.name}</span>
              <Badge variant={activeModel.category} size="sm" className="hidden sm:inline-flex capitalize">
                {activeModel.category}
              </Badge>
              <ChevronDown
                className={cn(
                  "size-3 text-text-muted transition-transform duration-150",
                  selectorOpen && "rotate-180"
                )}
              />
            </button>

            {/* Model Selector Popover Dropdown */}
            {selectorOpen && (
              <div
                id="model-selector-popover"
                role="dialog"
                aria-label="Model Catalog"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 rounded-[var(--radius-lg)] border border-border-strong bg-surface-elevated shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
              >
                {/* Search Bar */}
                <div className="p-3 border-b border-border-subtle bg-surface/50">
                  <div className="relative flex items-center">
                    <Search className="absolute left-2.5 size-3.5 text-text-muted pointer-events-none" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search 41 models..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface border border-border-subtle rounded-[var(--radius-md)] text-text-primary placeholder:text-text-muted focus:outline-hidden focus:border-accent"
                    />
                  </div>
                </div>

                {/* Quick Select Section (When no search query) */}
                {!searchQuery && (
                  <div className="p-2 border-b border-border-subtle">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-text-muted font-medium">
                      Approved Quick Select
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      {QUICK_SELECT_MODELS.map((m) => {
                        const isSelected = m.id === activeModel.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => selectModel(m)}
                            className={cn(
                              "flex items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium text-left transition-colors",
                              isSelected
                                ? "bg-accent-subtle text-accent font-semibold"
                                : "text-text-secondary hover:bg-surface hover:text-text-primary"
                            )}
                          >
                            <span className="truncate">{m.name}</span>
                            {isSelected && <Check className="size-3 text-accent shrink-0 ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Full Catalog List */}
                <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-text-muted font-medium">
                    {searchQuery ? `Matching Models (${filteredModels.length})` : "All Verified Models (41)"}
                  </div>

                  {filteredModels.length === 0 ? (
                    <div className="py-6 text-center text-xs text-text-muted">
                      No matching models found.
                    </div>
                  ) : (
                    filteredModels.map((m) => {
                      const isSelected = m.id === activeModel.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => selectModel(m)}
                          className={cn(
                            "w-full flex items-center justify-between p-2 rounded-[var(--radius-sm)] text-xs text-left transition-colors",
                            isSelected
                              ? "bg-surface border border-accent/20 text-text-primary"
                              : "hover:bg-surface text-text-secondary hover:text-text-primary"
                          )}
                        >
                          <div className="flex flex-col min-w-0 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-text-primary truncate">{m.name}</span>
                              <Badge variant={m.category} size="sm" className="capitalize text-[9px] px-1 py-0">
                                {m.category}
                              </Badge>
                            </div>
                            <span className="text-[11px] text-text-muted truncate mt-0.5">
                              {m.provider} {m.contextWindow && `· ${m.contextWindow}`}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {m.tier === "free" ? (
                              <span className="text-[10px] font-mono text-emerald-500 font-medium">Free</span>
                            ) : (
                              <span className="text-[10px] font-mono text-text-muted">Pro</span>
                            )}
                            {isSelected && <Check className="size-3.5 text-accent shrink-0" />}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Status Indicator & Model Count */}
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="hidden sm:inline font-mono text-[11px]">41 models ready</span>
          </div>
        </div>

        {/* Quick Model Carousel Strip (Interactive Chips) */}
        <div className="border-b border-border-subtle bg-surface/50 px-4 py-2 sm:px-6 overflow-x-auto scrollbar-none flex items-center gap-2 text-xs">
          <span className="font-mono text-[11px] text-text-muted shrink-0 hidden md:inline">
            Quick Select:
          </span>
          {QUICK_SELECT_MODELS.map((m) => {
            const isActive = m.id === activeModel.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => selectModel(m)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-all",
                  "focus-visible:outline-2 focus-visible:outline-accent",
                  isActive
                    ? "bg-accent-subtle text-accent border border-accent/30 shadow-2xs font-semibold"
                    : "bg-surface text-text-secondary border border-border-subtle hover:text-text-primary hover:bg-surface-hover"
                )}
              >
                {getCategoryIcon(m.category)}
                <span>{m.name}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setSelectorOpen(true)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono text-text-muted shrink-0 hover:text-text-primary hover:bg-surface transition-colors"
          >
            <span>+35 more</span>
          </button>
        </div>

        {/* Interactive Chat Thread Workspace */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* User Prompt Message */}
          <div className="flex items-start gap-3 max-w-2xl ml-auto justify-end">
            <div className="rounded-[var(--radius-lg)] rounded-tr-xs bg-surface border border-border-subtle p-3.5 sm:p-4 text-sm text-text-primary leading-relaxed shadow-2xs">
              <p>{userPrompt}</p>
            </div>
            <div className="size-7 rounded-full bg-border-strong text-text-secondary flex items-center justify-center text-xs font-semibold shrink-0">
              U
            </div>
          </div>

          {/* Loading Indicator State */}
          {isLoading && (
            <div className="flex items-start gap-3 max-w-3xl animate-in fade-in duration-150">
              <div className="size-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                E
              </div>
              <div className="rounded-[var(--radius-lg)] bg-surface border border-border-subtle px-4 py-3 text-xs text-text-muted flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent animate-ping" />
                <span>Generating response with <strong className="text-text-primary font-medium">{activeModel.name}</strong>...</span>
              </div>
            </div>
          )}

          {/* Assistant Response Message (Primary Model) */}
          {!isLoading && (
            <div className="flex items-start gap-3 max-w-3xl">
              <div className="size-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold shrink-0">
                E
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-text-primary">
                    {activeModel.name}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">
                    via EchoGPT
                  </span>
                  <Badge variant={activeModel.category} size="sm" className="capitalize">
                    {activeModel.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-text-muted ml-auto">
                    Simulated response
                  </span>
                </div>

                <div className="rounded-[var(--radius-lg)] rounded-tl-xs bg-surface/70 border border-border-subtle p-4 sm:p-5 text-sm text-text-primary leading-relaxed space-y-3">
                  <p>{primaryResponse.summary}</p>

                  {/* Code Block Snippet (if available) */}
                  {primaryResponse.codeSnippet && (
                    <div className="rounded-[var(--radius-md)] bg-background border border-border-subtle p-3 font-mono text-xs overflow-x-auto text-text-secondary leading-normal">
                      <div className="text-text-muted">{primaryResponse.codeSnippet.comment}</div>
                      {primaryResponse.codeSnippet.code.map((line, idx) => (
                        <div key={idx} className="whitespace-pre">
                          {line}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comparison Highlights */}
                  {primaryResponse.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                      {primaryResponse.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-[var(--radius-sm)] bg-surface border border-border-subtle"
                        >
                          <span className="font-semibold text-text-primary block mb-0.5">
                            {metric.title}
                          </span>
                          <span className="text-text-secondary">
                            {metric.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Cross-Model Comparison Cue */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-text-muted">
                  <span className="flex items-center gap-1 font-medium">
                    <Scale className="size-3 text-text-secondary" />
                    Cross-verify output with:
                  </span>
                  {primaryResponse.crossVerifySuggestions.map((slug) => {
                    const candidate = VERIFIED_MODELS.find((m) => m.slug === slug);
                    if (!candidate) return null;
                    const isComparingThis = comparisonModel?.id === candidate.id;
                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => handleCrossVerify(slug)}
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-1 rounded border text-xs font-medium transition-all",
                          isComparingThis
                            ? "border-accent bg-accent-subtle text-accent"
                            : "border-border-subtle bg-surface text-text-secondary hover:text-text-primary hover:border-border-strong"
                        )}
                      >
                        {getCategoryIcon(candidate.category)}
                        <span>{candidate.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Model Comparison Card (When Active) */}
          {!isLoading && comparisonModel && comparisonResponse && (
            <div className="flex items-start gap-3 max-w-3xl pl-4 sm:pl-8 border-l-2 border-accent/40 animate-in fade-in slide-in-from-left-2 duration-150">
              <div className="size-7 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center text-xs font-bold shrink-0">
                vs
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-text-primary">
                      {comparisonModel.name}
                    </span>
                    <Badge variant={comparisonModel.category} size="sm" className="capitalize">
                      {comparisonModel.category}
                    </Badge>
                    <span className="text-[10px] font-mono text-text-muted">
                      Simulated response
                    </span>
                  </div>

                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Close comparison view"
                    onClick={() => setComparisonModel(null)}
                    className="size-6 text-text-muted hover:text-text-primary"
                  >
                    <X className="size-3.5" />
                  </IconButton>
                </div>

                <div className="rounded-[var(--radius-lg)] bg-surface/80 border border-sky-500/20 p-4 sm:p-5 text-sm text-text-primary leading-relaxed space-y-3">
                  <div className="text-[11px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
                    Side-by-Side Verification
                  </div>
                  <p>{comparisonResponse.summary}</p>

                  {comparisonResponse.codeSnippet && (
                    <div className="rounded-[var(--radius-md)] bg-background border border-border-subtle p-3 font-mono text-xs overflow-x-auto text-text-secondary leading-normal">
                      <div className="text-text-muted">{comparisonResponse.codeSnippet.comment}</div>
                      {comparisonResponse.codeSnippet.code.map((line, idx) => (
                        <div key={idx} className="whitespace-pre">
                          {line}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                    {comparisonResponse.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-[var(--radius-sm)] bg-surface border border-border-subtle"
                      >
                        <span className="font-semibold text-text-primary block mb-0.5">
                          {metric.title}
                        </span>
                        <span className="text-text-secondary">
                          {metric.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Composer Bar */}
          <div className="pt-2">
            <form
              onSubmit={handleSendMessage}
              className="relative rounded-[var(--radius-lg)] border border-border-strong bg-surface p-2 sm:p-2.5 shadow-inner transition-colors focus-within:border-accent"
            >
              <div className="flex items-center gap-2">
                <textarea
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDownComposer}
                  placeholder={`Ask ${activeModel.name}, or switch models to compare responses...`}
                  className="w-full resize-none bg-transparent px-2 py-1 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-hidden"
                />

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectorOpen(true)}
                    className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono rounded bg-surface-elevated border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-strong transition-colors"
                  >
                    <span>⌘K Models</span>
                  </button>

                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    aria-label={`Send message to ${activeModel.name}`}
                    className={cn(
                      "size-8 rounded-[var(--radius-md)] flex items-center justify-center transition-all",
                      inputValue.trim() && !isLoading
                        ? "bg-accent text-white shadow-xs hover:bg-accent-hover cursor-pointer"
                        : "bg-surface-elevated text-text-muted border border-border-subtle opacity-50 cursor-not-allowed"
                    )}
                  >
                    <ArrowUp className="size-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Browser Extension Floating Companion Card */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-[var(--radius-md)] border border-border-subtle bg-surface/60 px-4 py-2.5 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <Puzzle className="size-4 text-sky-500 shrink-0" />
                <span>
                  <strong className="text-text-primary font-medium">
                    Browser Side Panel Companion:
                  </strong>{" "}
                  Use EchoGPT on any webpage without switching tabs.
                </span>
              </div>
              <Link
                href="/extension"
                className="inline-flex items-center gap-1 text-accent font-medium hover:underline shrink-0"
              >
                <span>Explore Extension</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
