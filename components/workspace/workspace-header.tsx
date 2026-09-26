"use client";

import * as React from "react";
import {
  Menu,
  ChevronDown,
  Check,
  Search,
  Cpu,
  Zap,
  Code2,
  Sparkles,
} from "lucide-react";
import { IconButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QUICK_SELECT_MODELS, VERIFIED_MODELS } from "@/lib/mock/verified-models";
import type { Model } from "@/types";
import { cn } from "@/lib/utils";

interface WorkspaceHeaderProps {
  currentTitle: string;
  activeModel: Model;
  onSelectModel: (model: Model) => void;
  onOpenMobileSidebar: () => void;
}

export function WorkspaceHeader({
  currentTitle,
  activeModel,
  onSelectModel,
  onOpenMobileSidebar,
}: WorkspaceHeaderProps) {
  const [selectorOpen, setSelectorOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Close popover on outside click
  React.useEffect(() => {
    if (!selectorOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [selectorOpen]);

  // Handle Escape key to close popover
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

  // Focus search input when popover opens
  React.useEffect(() => {
    if (selectorOpen) {
      searchInputRef.current?.focus();
    }
  }, [selectorOpen]);

  // Reset search query during render if closed (React 19 pattern)
  const [prevSelectorOpen, setPrevSelectorOpen] = React.useState(selectorOpen);
  if (prevSelectorOpen !== selectorOpen) {
    setPrevSelectorOpen(selectorOpen);
    if (!selectorOpen) {
      setSearchQuery("");
    }
  }

  // Filtered models
  const filteredModels = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return VERIFIED_MODELS;
    return VERIFIED_MODELS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

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
    <header className="h-14 border-b border-border-subtle bg-surface/50 px-4 flex items-center justify-between gap-4 shrink-0 relative z-30">
      {/* Left Area: Mobile Trigger + Conversation Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="md:hidden">
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="Open sidebar"
            onClick={onOpenMobileSidebar}
            className="size-8 text-text-secondary hover:text-text-primary"
          >
            <Menu className="size-4" />
          </IconButton>
        </div>

        <div className="truncate text-xs sm:text-sm font-semibold text-text-primary">
          {currentTitle}
        </div>
      </div>

      {/* Right Area: Model Selector & Status Indicator */}
      <div className="flex items-center gap-2.5 shrink-0" ref={popoverRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setSelectorOpen(!selectorOpen)}
            aria-expanded={selectorOpen}
            aria-haspopup="dialog"
            aria-label={`Select AI model. Current: ${activeModel.name}`}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium bg-surface transition-all",
              "hover:border-border-strong focus-visible:outline-2 focus-visible:outline-accent",
              selectorOpen ? "border-accent ring-2 ring-accent/20" : "border-border-subtle"
            )}
          >
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="font-semibold text-text-primary">{activeModel.name}</span>
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

          {/* Model Selector Popover */}
          {selectorOpen && (
            <div
              role="dialog"
              aria-label="Select Model"
              className="absolute right-0 top-full mt-2 w-80 sm:w-88 rounded-[var(--radius-lg)] border border-border-strong bg-surface-elevated shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
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

              {/* Quick Select Section */}
              {!searchQuery && (
                <div className="p-2 border-b border-border-subtle">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-text-muted font-medium">
                    Quick Select Models
                  </div>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    {QUICK_SELECT_MODELS.map((m) => {
                      const isSelected = m.id === activeModel.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            onSelectModel(m);
                            setSelectorOpen(false);
                          }}
                          className={cn(
                            "flex items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium text-left transition-colors",
                            isSelected
                              ? "bg-accent-subtle text-accent font-semibold"
                              : "text-text-secondary hover:bg-surface hover:text-text-primary"
                          )}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            {getCategoryIcon(m.category)}
                            <span className="truncate">{m.name}</span>
                          </div>
                          {isSelected && <Check className="size-3 text-accent shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Full Catalog List */}
              <div className="max-h-60 overflow-y-auto p-1.5 space-y-0.5">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-text-muted font-medium">
                  {searchQuery ? `Matching Models (${filteredModels.length})` : "All Verified Models (41)"}
                </div>

                {filteredModels.length === 0 ? (
                  <div className="py-6 text-center text-xs text-text-muted">
                    No models found.
                  </div>
                ) : (
                  filteredModels.map((m) => {
                    const isSelected = m.id === activeModel.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          onSelectModel(m);
                          setSelectorOpen(false);
                        }}
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
                          <span className="text-[10px] font-mono text-text-muted truncate mt-0.5">
                            {m.provider} {m.contextWindow && `· ${m.contextWindow}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {m.tier === "free" ? (
                            <span className="text-[10px] font-mono text-emerald-500 font-medium">Free</span>
                          ) : (
                            <span className="text-[10px] font-mono text-text-muted">Pro</span>
                          )}
                          {isSelected && <Check className="size-3.5 text-accent shrink-0 ml-1" />}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
