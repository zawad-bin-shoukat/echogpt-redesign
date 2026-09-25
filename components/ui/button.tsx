"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── Variant & Size Maps ────────────────────────────────────────────────────

const variantClasses = {
  primary:
    "bg-accent text-white font-medium shadow-sm hover:bg-accent-hover active:scale-[0.98] disabled:bg-accent/50",
  secondary:
    "bg-surface text-text-primary border border-border-subtle hover:bg-surface-hover active:scale-[0.98] disabled:opacity-50",
  outline:
    "bg-transparent text-text-primary border border-border-strong hover:bg-surface-hover active:scale-[0.98] disabled:opacity-50",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover active:scale-[0.98] disabled:opacity-40",
  destructive:
    "bg-transparent text-error border border-error/30 hover:bg-error/10 active:scale-[0.98] disabled:opacity-50",
} as const;

const sizeClasses = {
  sm: "h-8 px-3 text-xs rounded-[var(--radius-md)] gap-1.5",
  md: "h-10 px-4 text-sm rounded-[var(--radius-md)] gap-2",
  lg: "h-12 px-6 text-base rounded-[var(--radius-md)] gap-2.5",
} as const;

// ── Types ─────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  /** Left-side icon element. */
  leftIcon?: React.ReactNode;
  /** Right-side icon element. */
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

// ── Spinner ────────────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ── Button ─────────────────────────────────────────────────────────────────

/**
 * Accessible, design-system-aware Button primitive.
 *
 * Supports primary, secondary, outline, ghost, and destructive variants
 * across three sizes. All interactions use semantic CSS tokens.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cn(
          // Base layout
          "inline-flex items-center justify-center whitespace-nowrap",
          "select-none transition-all duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Spinner className="shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

// ── IconButton ─────────────────────────────────────────────────────────────

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible label — required when the button contains only an icon. */
  "aria-label": string;
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  loading?: boolean;
}

/**
 * Compact icon-only button. Requires an `aria-label` for accessibility.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "ghost",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    // Override px with equal padding for square appearance
    const squareSize = { sm: "size-8", md: "size-10", lg: "size-12" }[size];

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center shrink-0",
          "select-none transition-all duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          "disabled:cursor-not-allowed rounded-[var(--radius-md)]",
          variantClasses[variant],
          squareSize,
          className
        )}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
