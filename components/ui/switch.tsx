"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  /** Accessible label for the toggle control. Required. */
  label: string;
  /** Optional helper text shown below the label. */
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
}

/**
 * Accessible toggle switch.
 *
 * Uses role="switch" and aria-checked for correct screen reader semantics.
 * Keyboard: Space or Enter toggle the state.
 * Visual: A pill track with a sliding thumb.
 */
export function Switch({
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
  id: idProp,
  className,
}: SwitchProps) {
  const generatedId = React.useId();
  const switchId = idProp ?? generatedId;
  const descId = `${switchId}-desc`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onCheckedChange(!checked);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 w-full",
        disabled && "opacity-50",
        className
      )}
    >
      {/* Label side */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <label
          htmlFor={switchId}
          className={cn(
            "text-sm font-medium text-text-primary cursor-pointer",
            disabled && "cursor-not-allowed"
          )}
        >
          {label}
        </label>
        {description && (
          <p id={descId} className="text-xs text-text-muted leading-snug">
            {description}
          </p>
        )}
      </div>

      {/* Switch track */}
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={checked}
        aria-describedby={description ? descId : undefined}
        aria-label={label}
        disabled={disabled}
        tabIndex={0}
        onClick={() => !disabled && onCheckedChange(!checked)}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative inline-flex items-center shrink-0",
          "h-6 w-11 rounded-[var(--radius-full)]",
          "border-2 border-transparent",
          "transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed",
          checked ? "bg-accent" : "bg-border-strong"
        )}
      >
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={cn(
            "block w-4 h-4 bg-white rounded-full shadow-sm",
            "transition-transform duration-200",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
