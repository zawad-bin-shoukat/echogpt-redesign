"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  /**
   * When true, the textarea grows vertically as the user types,
   * up to the CSS `max-height` value.
   */
  autoResize?: boolean;
}

/**
 * Accessible textarea with optional label, error, helper text, and
 * auto-resize behaviour. Designed for the prompt composer.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      autoResize = false,
      disabled,
      id: idProp,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = idProp ?? generatedId;
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? internalRef;

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (autoResize && resolvedRef.current) {
          resolvedRef.current.style.height = "auto";
          resolvedRef.current.style.height = `${resolvedRef.current.scrollHeight}px`;
        }
        onChange?.(e);
      },
      [autoResize, resolvedRef, onChange]
    );

    const describedBy = [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-text-primary select-none"
          >
            {label}
          </label>
        )}

        <textarea
          ref={resolvedRef}
          id={textareaId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          onChange={handleChange}
          className={cn(
            "w-full min-h-[52px] px-3 py-3 text-sm",
            "text-text-primary placeholder:text-text-muted",
            "bg-surface rounded-[var(--radius-lg)]",
            "border transition-colors duration-150",
            "resize-none",
            error
              ? "border-error focus:border-error"
              : "border-border-subtle focus:border-accent",
            "outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            disabled && "opacity-50 cursor-not-allowed",
            autoResize && "overflow-hidden",
            className
          )}
          {...props}
        />

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
Textarea.displayName = "Textarea";
