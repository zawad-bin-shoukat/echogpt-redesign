"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  /** The element that triggers the tooltip. */
  children: React.ReactElement;
  /** Tooltip content string or JSX. */
  content: React.ReactNode;
  /** Position relative to the trigger. */
  side?: "top" | "bottom" | "left" | "right";
  /** Delay before showing in milliseconds. */
  delayMs?: number;
  /** Additional class for the tooltip box. */
  className?: string;
}

const sideClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

/**
 * Lightweight hover tooltip.
 *
 * Wraps a single child element and displays a floating label
 * on hover or keyboard focus. Uses aria-describedby to associate
 * the tooltip with its trigger for screen readers.
 */
export function Tooltip({
  children,
  content,
  side = "top",
  delayMs = 400,
  className,
}: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const tooltipId = React.useId();
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delayMs);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const child = React.Children.only(children);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {React.cloneElement(child, {
        "aria-describedby": visible ? tooltipId : undefined,
      } as React.HTMLAttributes<HTMLElement>)}

      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 pointer-events-none",
            "px-2.5 py-1 rounded-[var(--radius-sm)]",
            "bg-zinc-900 dark:bg-zinc-100",
            "text-white dark:text-zinc-900",
            "text-xs font-medium whitespace-nowrap",
            "shadow-md",
            sideClasses[side],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
