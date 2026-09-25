"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── Input ─────────────────────────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  /** Optional label text rendered above the input. */
  label?: string;
  /** Helper text rendered below the input. */
  helperText?: string;
  /** Error message — if present, applies error visual state. */
  error?: string;
  /** Slot for an icon or element displayed at the leading (left) edge. */
  prefix?: React.ReactNode;
  /** Slot for an icon or element displayed at the trailing (right) edge. */
  suffix?: React.ReactNode;
}

/**
 * Accessible text input with optional label, helper, error, and icon slots.
 * Meets WCAG 2.1 AA requirements: visible focus ring, label association via
 * `htmlFor`/`id`, and `aria-describedby` for helper and error text.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      prefix,
      suffix,
      id: idProp,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    // Generate a stable id when not provided so label association always works.
    const generatedId = React.useId();
    const inputId = idProp ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const describedBy = [
      error ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {prefix && (
            <span
              className="absolute left-3 flex items-center text-text-muted pointer-events-none"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy || undefined}
            className={cn(
              // Base
              "w-full h-10 text-sm text-text-primary placeholder:text-text-muted",
              "bg-surface rounded-[var(--radius-md)]",
              "border transition-colors duration-150",
              // Border states
              error
                ? "border-error focus:border-error"
                : "border-border-subtle focus:border-accent",
              // Focus ring
              "outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
              // Prefix/suffix padding
              prefix ? "pl-9" : "pl-3",
              suffix ? "pr-9" : "pr-3",
              // Disabled
              disabled && "opacity-50 cursor-not-allowed bg-surface-hover",
              className
            )}
            {...props}
          />

          {suffix && (
            <span
              className="absolute right-3 flex items-center text-text-muted"
              aria-hidden="true"
            >
              {suffix}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-error leading-snug">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="text-xs text-text-muted leading-snug">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
