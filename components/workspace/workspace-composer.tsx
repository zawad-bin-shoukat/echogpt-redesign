"use client";

import * as React from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import { IconButton } from "@/components/ui/button";
import type { Model } from "@/types";
import { cn } from "@/lib/utils";

interface WorkspaceComposerProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  activeModel: Model;
}

export function WorkspaceComposer({
  value,
  onChange,
  onSubmit,
  activeModel,
}: WorkspaceComposerProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-t from-background via-background to-transparent pt-6">
      <div className="max-w-3xl mx-auto w-full">
        {/* Composer Container Card */}
        <div className="rounded-[var(--radius-xl)] border border-border-strong bg-surface p-2.5 sm:p-3 shadow-sm focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
          <textarea
            ref={textareaRef}
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${activeModel.name} or type a prompt...`}
            aria-label={`Prompt input for ${activeModel.name}`}
            className="w-full resize-none bg-transparent px-2 py-1 text-sm text-text-primary placeholder:text-text-muted focus:outline-hidden leading-relaxed"
          />

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border-subtle mt-1">
            {/* Left Controls: Attachments & Model Tag */}
            <div className="flex items-center gap-1.5">
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Attach file context (demo placeholder)"
                onClick={() => {}}
                className="size-7 text-text-muted hover:text-text-primary"
              >
                <Paperclip className="size-3.5" />
              </IconButton>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-elevated border border-border-subtle text-[11px] font-mono text-text-muted">
                <span className="size-1.5 rounded-full bg-accent" />
                <span>{activeModel.name}</span>
              </span>
            </div>

            {/* Right Controls: Shortcut Cue & Submit Button */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-mono text-[10px] text-text-muted">
                Shift + ↵ for newline
              </span>

              <button
                type="button"
                onClick={onSubmit}
                disabled={!value.trim()}
                aria-label="Send message"
                className={cn(
                  "size-8 rounded-[var(--radius-md)] flex items-center justify-center transition-all",
                  value.trim()
                    ? "bg-accent text-white shadow-xs hover:bg-accent-hover cursor-pointer active:scale-95"
                    : "bg-surface-elevated text-text-muted border border-border-subtle opacity-50 cursor-not-allowed"
                )}
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer / Footnote */}
        <div className="mt-2 text-center text-[11px] text-text-muted">
          EchoGPT aggregates 40+ frontier models. Verify critical architectural or medical outputs.
        </div>
      </div>
    </div>
  );
}
