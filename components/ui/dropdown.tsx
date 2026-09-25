"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────

export interface DropdownItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** If true, renders a destructive (red) label. */
  destructive?: boolean;
  /** Render a separator line before this item. */
  separator?: boolean;
}

export interface DropdownProps {
  /** The trigger element — button text or a custom child. */
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  /** Controlled open state. If omitted, uses internal state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Alignment of the dropdown relative to the trigger. */
  align?: "left" | "right";
  className?: string;
  /** Custom class for the menu panel. */
  menuClassName?: string;
  /** When true, wraps trigger with a default styled button. */
  asButton?: boolean;
}

/**
 * Accessible dropdown menu with keyboard navigation.
 *
 * - Opens on click, closes on Escape or outside click.
 * - Arrow keys move focus between items.
 * - Enter/Space select the focused item.
 * - Items with `disabled` cannot be selected.
 */
export function Dropdown({
  trigger,
  items,
  onSelect,
  open: controlledOpen,
  onOpenChange,
  align = "left",
  className,
  menuClassName,
  asButton = false,
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  const setIsOpen = React.useCallback(
    (val: boolean) => {
      setInternalOpen(val);
      onOpenChange?.(val);
    },
    [onOpenChange]
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);


  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, setIsOpen]);

  // Close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, setIsOpen]);

  const enabledItems = items.filter((i) => !i.disabled && !i.separator);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const focusedEl = document.activeElement;
    const currentIdx = itemRefs.current.findIndex((el) => el === focusedEl);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (currentIdx + 1) % enabledItems.length;
      itemRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = (currentIdx - 1 + enabledItems.length) % enabledItems.length;
      itemRefs.current[next]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemRefs.current[enabledItems.length - 1]?.focus();
    }
  };

  let enabledIdx = 0;

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex", className)}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger */}
      {asButton ? (
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "inline-flex items-center gap-2 h-10 px-4 text-sm font-medium",
            "bg-surface text-text-primary rounded-[var(--radius-md)]",
            "border border-border-subtle hover:bg-surface-hover",
            "transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          )}
        >
          {trigger}
          <ChevronDown
            size={14}
            className={cn(
              "text-text-muted transition-transform duration-150 shrink-0",
              isOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      ) : (
        <div
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          role="button"
          tabIndex={0}
          className="cursor-pointer"
        >
          {trigger}
        </div>
      )}

      {/* Menu Panel */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Options"
          className={cn(
            "absolute top-full mt-1.5 z-50 py-1",
            "bg-surface-elevated border border-border-subtle rounded-[var(--radius-lg)]",
            "shadow-lg min-w-[160px] w-max max-w-xs",
            align === "right" ? "right-0" : "left-0",
            menuClassName
          )}
        >
          {items.map((item) => {
            if (item.separator) {
              return (
                <div
                  key={item.id}
                  role="separator"
                  className="my-1 border-t border-border-subtle"
                  aria-hidden="true"
                />
              );
            }

            const currentIdx = enabledIdx++;

            return (
              <button
                key={item.id}
                ref={(el) => { itemRefs.current[currentIdx] = el; }}
                role="menuitem"
                disabled={item.disabled}
                tabIndex={-1}
                onClick={() => {
                  if (item.disabled) return;
                  onSelect(item);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left",
                  "transition-colors duration-100",
                  "focus:outline-none focus:bg-surface-hover",
                  item.destructive
                    ? "text-error hover:bg-error/10 focus:bg-error/10"
                    : "text-text-primary hover:bg-surface-hover",
                  item.disabled && "opacity-40 cursor-not-allowed"
                )}
              >
                {item.icon && (
                  <span className="shrink-0 text-text-muted" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="flex flex-col gap-0.5 min-w-0">
                  <span className="truncate font-medium">{item.label}</span>
                  {item.description && (
                    <span className="text-xs text-text-muted truncate">
                      {item.description}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
