import * as React from "react";
import { cn } from "@/lib/utils";

// ── Variant Map ────────────────────────────────────────────────────────────

const variantClasses = {
  default:
    "bg-surface-hover text-text-secondary border border-border-subtle",
  primary:
    "bg-accent/10 text-accent border border-accent/20",
  success:
    "bg-success/10 text-success border border-success/20",
  warning:
    "bg-warning/10 text-warning border border-warning/20",
  error:
    "bg-error/10 text-error border border-error/20",
  // Model capability category badges
  flagship:
    "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  coding:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  fast:
    "bg-sky-500/10 text-sky-400 border border-sky-500/20",
  vision:
    "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  specialized:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
  free:
    "bg-zinc-500/10 text-text-muted border border-border-subtle",
} as const;

export type BadgeVariant = keyof typeof variantClasses;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Size variant: sm (compact) or md (default). */
  size?: "sm" | "md";
  /** Optional status dot displayed before text. */
  dot?: boolean;
}

const sizeClasses = {
  sm: "h-4.5 px-1.5 text-[10px]",
  md: "h-5 px-2 text-[11px]",
};

/**
 * Compact, non-interactive badge for status labels, model tiers,
 * capability categories, and contextual information.
 */
export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "rounded-[var(--radius-full)]",
        "font-medium leading-none whitespace-nowrap",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className="block w-1.5 h-1.5 rounded-full bg-current shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
