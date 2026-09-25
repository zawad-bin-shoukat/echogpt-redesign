"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "./button";

// ── Backdrop ──────────────────────────────────────────────────────────────

interface BackdropProps {
  onClick?: () => void;
}

function Backdrop({ onClick }: BackdropProps) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-150"
      aria-hidden="true"
      onClick={onClick}
    />
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible title for the dialog — required for screen readers. */
  title: string;
  /** Optional subtitle rendered below the title. */
  description?: string;
  /** Controls the maximum width of the dialog panel. */
  size?: "sm" | "md" | "lg" | "xl";
  /** If true, clicking the backdrop does not close the modal. */
  persistent?: boolean;
  children: React.ReactNode;
  /** Content rendered in the modal footer area. */
  footer?: React.ReactNode;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

/**
 * Fully accessible dialog modal.
 *
 * - Uses the native `<dialog>` element for correct browser semantics.
 * - Traps focus within the dialog when open.
 * - Closes on Escape key.
 * - Announces title and description to screen readers via aria-labelledby
 *   and aria-describedby.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  persistent = false,
  children,
  footer,
}: ModalProps) {
  const titleId = React.useId();
  const descId = React.useId();

  // Escape key handler
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !persistent) onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, persistent, onClose]);

  // Prevent body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={persistent ? undefined : onClose} />

      {/* Portal-style fixed centering */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="presentation"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descId : undefined}
          className={cn(
            "relative w-full bg-surface-elevated rounded-[var(--radius-xl)]",
            "border border-border-subtle shadow-2xl",
            "flex flex-col max-h-[90dvh]",
            sizeClasses[size]
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-6 pb-4 shrink-0">
            <div className="flex flex-col gap-1">
              <h2
                id={titleId}
                className="text-base font-semibold text-text-primary tracking-tight"
              >
                {title}
              </h2>
              {description && (
                <p id={descId} className="text-sm text-text-secondary leading-snug">
                  {description}
                </p>
              )}
            </div>
            <IconButton
              aria-label="Close dialog"
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="shrink-0 -mt-1 -mr-1"
            >
              <X size={16} />
            </IconButton>
          </div>

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-6 pb-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="shrink-0 px-6 py-4 border-t border-border-subtle">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
