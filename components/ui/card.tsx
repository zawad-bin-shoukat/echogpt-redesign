import * as React from "react";
import { cn } from "@/lib/utils";

// ── Card ──────────────────────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Removes default padding for custom inner layout. */
  noPadding?: boolean;
  /** Adds a subtle hover state, useful for clickable cards. */
  interactive?: boolean;
}

/**
 * Surface container for content grouping. Follows the design system's
 * surface-elevated token with a refined border and optional hover state.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ noPadding = false, interactive = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-surface-elevated rounded-[var(--radius-lg)]",
        "border border-border-subtle",
        !noPadding && "p-6",
        interactive &&
          "transition-colors duration-150 cursor-pointer hover:border-border-strong hover:bg-surface-hover/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

// ── CardHeader ────────────────────────────────────────────────────────────

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 pb-4", className)}
    {...props}
  >
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

// ── CardTitle ─────────────────────────────────────────────────────────────

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-base font-semibold text-text-primary leading-snug tracking-tight", className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

// ── CardDescription ───────────────────────────────────────────────────────

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-secondary leading-relaxed", className)}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

// ── CardContent ───────────────────────────────────────────────────────────

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

// ── CardFooter ────────────────────────────────────────────────────────────

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 border-t border-border-subtle", className)}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";

// ── Divider ───────────────────────────────────────────────────────────────

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  /** Optional label text centered in the divider line. */
  label?: string;
}

export function Divider({ orientation = "horizontal", label, className, ...props }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("w-px self-stretch bg-border-subtle shrink-0", className)}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("relative flex items-center", className)}>
        <div className="flex-1 border-t border-border-subtle" role="separator" aria-hidden="true" />
        <span className="mx-3 text-xs text-text-muted font-medium select-none">{label}</span>
        <div className="flex-1 border-t border-border-subtle" role="separator" aria-hidden="true" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={cn("border-0 border-t border-border-subtle", className)}
      {...props}
    />
  );
}
