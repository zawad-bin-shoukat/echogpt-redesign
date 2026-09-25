"use client";

import * as React from "react";
import {
  Sparkles,
  ArrowUp,
  FileText,
  HelpCircle,
  MoreHorizontal,
  Copy,
  Check,
  Globe,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidePanelProps {
  onSummarizeClick?: () => void;
  onExplainClick?: () => void;
  className?: string;
}

export function SidePanel({
  onSummarizeClick,
  onExplainClick,
  className,
}: SidePanelProps) {
  const [copied, setCopied] = React.useState(false);
  const [composerText, setComposerText] = React.useState("");

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <aside
      aria-label="Chrome Side Panel - EchoGPT"
      className={cn(
        "flex flex-col h-full bg-surface border-l border-border-subtle text-text-primary overflow-hidden",
        className
      )}
    >
      {/* 1. Side Panel Header (Native Chrome Side Panel Style) */}
      <div className="h-12 px-3 border-b border-border-subtle flex items-center justify-between gap-2 shrink-0 bg-surface-elevated/70">
        <div className="flex items-center gap-2 min-w-0">
          <div className="size-6 rounded-[var(--radius-sm)] bg-accent-subtle border border-accent/20 flex items-center justify-center text-accent font-bold text-xs shrink-0">
            E
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-semibold text-xs text-text-primary tracking-tight truncate">
              EchoGPT
            </span>
            <span className="text-border-strong text-xs">/</span>
            <span className="text-[11px] font-mono text-text-muted truncate">
              Side Panel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Badge variant="flagship" size="sm" className="hidden sm:inline-flex text-[10px]">
            GPT-5.6 Sol
          </Badge>
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="Side panel settings (demo)"
            onClick={() => {}}
            className="size-7 text-text-muted hover:text-text-primary"
          >
            <SlidersHorizontal className="size-3.5" />
          </IconButton>
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="More options (demo)"
            onClick={() => {}}
            className="size-7 text-text-muted hover:text-text-primary"
          >
            <MoreHorizontal className="size-3.5" />
          </IconButton>
        </div>
      </div>

      {/* 2. Active Page Context Banner */}
      <div className="p-2.5 bg-surface border-b border-border-subtle shrink-0">
        <div className="p-2 rounded-[var(--radius-md)] bg-surface-elevated border border-border-subtle/80 flex flex-col gap-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-accent font-medium">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span>PAGE CONTEXT ACTIVE</span>
            </div>
            <span className="text-text-muted">1.8k words</span>
          </div>

          <div className="flex items-center gap-1.5 min-w-0">
            <Globe className="size-3 text-text-muted shrink-0" />
            <span className="text-xs font-medium text-text-primary truncate">
              Understanding Mixture-of-Experts Models
            </span>
          </div>
        </div>

        {/* Quick Action Suggestion Chips */}
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto scrollbar-none pb-0.5">
          <button
            type="button"
            onClick={onSummarizeClick}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer shrink-0"
          >
            <FileText className="size-3 text-accent" />
            <span>Summarize</span>
          </button>

          <button
            type="button"
            onClick={onExplainClick}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer shrink-0"
          >
            <HelpCircle className="size-3 text-sky-400" />
            <span>Explain Selection</span>
          </button>

          <button
            type="button"
            onClick={onSummarizeClick}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-elevated hover:bg-surface-hover border border-border-subtle text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="size-3 text-emerald-400" />
            <span>Key Takeaways</span>
          </button>
        </div>
      </div>

      {/* 3. Conversation Transcript Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3.5 scrollbar-none">
        {/* User Query Simulation Card */}
        <div className="flex flex-col items-end gap-1">
          <div className="p-2.5 rounded-[var(--radius-lg)] rounded-tr-xs bg-surface-elevated border border-border-subtle text-xs text-text-primary max-w-[90%] shadow-2xs">
            <span className="font-semibold text-[10px] text-accent block mb-0.5 uppercase tracking-wider">
              Selected Passage
            </span>
            &quot;Explain the selected passage on sparse expert routing and why it reduces inference FLOPs.&quot;
          </div>
          <span className="text-[10px] font-mono text-text-muted pr-1">Just now</span>
        </div>

        {/* Assistant Response Simulation Card */}
        <div className="flex items-start gap-2 max-w-full">
          <div className="size-6 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
            E
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-text-primary">GPT-5.6 Sol</span>
              <span className="text-[10px] font-mono text-text-muted">Simulated</span>
            </div>

            <div className="p-3 rounded-[var(--radius-lg)] rounded-tl-xs bg-surface-elevated/70 border border-border-subtle text-xs leading-relaxed text-text-secondary space-y-2 shadow-2xs">
              <p>
                The highlighted section describes how <strong className="text-text-primary font-medium">Sparse Mixture-of-Experts (MoE)</strong> decouples overall parameter capacity from per-token computation:
              </p>

              <div className="p-2 rounded bg-surface border border-border-subtle font-mono text-[11px] text-text-primary">
                <code>active_experts = topK(softmax(W_gate · x), k=2)</code>
              </div>

              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li>
                  <strong className="text-text-primary">Selective Gating:</strong> Only 2 of 16 sub-networks activate for any single token.
                </li>
                <li>
                  <strong className="text-text-primary">FLOP Efficiency:</strong> Maintains a 40B+ capacity representation while computing only ~7B FLOPs per step.
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between px-1 text-[10px] text-text-muted">
              <button
                type="button"
                onClick={() => handleCopy("Sparse Mixture-of-Experts decouples overall parameter capacity...")}
                className="inline-flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer"
                aria-label={copied ? "Copied" : "Copy answer"}
              >
                {copied ? <Check className="size-3 text-accent" /> : <Copy className="size-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <span className="font-mono text-[9px]">EchoGPT Side Panel Demo</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Compact Side Panel Composer */}
      <div className="p-2.5 bg-surface border-t border-border-subtle shrink-0">
        <div className="flex items-center gap-1.5 p-1.5 rounded-[var(--radius-lg)] bg-surface-elevated border border-border-strong focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
          <input
            type="text"
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            placeholder="Ask EchoGPT about this page..."
            aria-label="Side panel prompt input"
            className="flex-1 bg-transparent px-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-hidden"
          />
          <button
            type="button"
            disabled={!composerText.trim()}
            aria-label="Send message in side panel"
            className={cn(
              "size-7 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 transition-all",
              composerText.trim()
                ? "bg-accent text-white hover:bg-accent-hover cursor-pointer"
                : "bg-surface text-text-muted border border-border-subtle opacity-50 cursor-not-allowed"
            )}
          >
            <ArrowUp className="size-3.5" />
          </button>
        </div>
        <div className="mt-1 text-center text-[10px] font-mono text-text-muted">
          Shortcut: ⌘ + Shift + E
        </div>
      </div>
    </aside>
  );
}
