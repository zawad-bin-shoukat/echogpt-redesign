"use client";

import * as React from "react";
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";
import { IconButton } from "@/components/ui/button";
import type { Model } from "@/types";
import { cn } from "@/lib/utils";

interface WorkspaceComposerProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  activeModel: Model;
  isThinking?: boolean;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}

export function WorkspaceComposer({
  value,
  onChange,
  onSubmit,
  activeModel,
  isThinking = false,
  textareaRef: externalRef,
}: WorkspaceComposerProps) {
  const internalRef = React.useRef<HTMLTextAreaElement>(null);
  const textareaRef = externalRef || internalRef;

  // Auto-adjust textarea height
  React.useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      const newHeight = Math.min(Math.max(el.scrollHeight, 40), 160);
      el.style.height = `${newHeight}px`;
    }
  }, [value, textareaRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd+Enter or Ctrl+Enter submits
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (value.trim() && !isThinking) {
        onSubmit();
      }
      return;
    }

    // Enter without Shift submits
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isThinking) {
        onSubmit();
      }
      return;
    }
  };

  const isSendDisabled = !value.trim() || isThinking;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-t from-background via-background/95 to-transparent pt-4 shrink-0">
      <div className="max-w-3xl mx-auto w-full">
        {/* Composer Container Card */}
        <div className="rounded-[var(--radius-xl)] border border-border-strong bg-surface p-2.5 sm:p-3 shadow-xs focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isThinking}
            placeholder={
              isThinking
                ? `${activeModel.name} is thinking...`
                : `Message ${activeModel.name} or type a prompt...`
            }
            aria-label={`Prompt input for ${activeModel.name}`}
            className="w-full resize-none bg-transparent px-2 py-1 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-hidden leading-relaxed max-h-40 overflow-y-auto"
          />

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border-subtle mt-1">
            {/* Left Controls: Attachments & Model Tag */}
            <div className="flex items-center gap-1.5 min-w-0">
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Attach file context (demo placeholder)"
                onClick={() => {}}
                className="size-7 text-text-muted hover:text-text-primary shrink-0"
              >
                <Paperclip className="size-3.5" />
              </IconButton>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-elevated border border-border-subtle text-[11px] font-mono text-text-muted truncate">
                <span className="size-1.5 rounded-full bg-accent shrink-0" />
                <span className="truncate">{activeModel.name}</span>
              </span>
            </div>

            {/* Right Controls: Shortcut Cue & Submit Button */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline font-mono text-[10px] text-text-muted">
                ↵ to send · Shift+↵ for newline
              </span>

              <button
                type="button"
                onClick={onSubmit}
                disabled={isSendDisabled}
                aria-disabled={isSendDisabled}
                aria-label={isThinking ? "Thinking..." : "Send message"}
                className={cn(
                  "size-8 rounded-[var(--radius-md)] flex items-center justify-center transition-all",
                  isSendDisabled
                    ? "bg-surface-elevated text-text-muted border border-border-subtle opacity-50 cursor-not-allowed"
                    : "bg-accent text-white shadow-xs hover:bg-accent-hover cursor-pointer active:scale-95"
                )}
              >
                {isThinking ? (
                  <Sparkles className="size-3.5 text-accent animate-spin" />
                ) : (
                  <ArrowUp className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer / Footnote */}
        <div className="mt-2 text-center text-[11px] text-text-muted">
          EchoGPT prototype connects 40+ verified models. Verify critical outputs.
        </div>
      </div>
    </div>
  );
}
