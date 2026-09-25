"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────

export interface Tab {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  /** Visual style of the tabs. */
  variant?: "underline" | "pill";
  /** Renders tabs at full container width. */
  fullWidth?: boolean;
  className?: string;
  /** Content to render when a tab is selected. */
  children?: React.ReactNode;
}

/**
 * Accessible tab component.
 *
 * Implements ARIA Authoring Practices tablist pattern:
 * - role="tablist" on the container
 * - role="tab" on each trigger
 * - role="tabpanel" on the content area
 * - Arrow Left/Right navigates between tabs
 * - Home/End jump to first/last tab
 */
export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "underline",
  fullWidth = false,
  className,
  children,
}: TabsProps) {
  const tablistId = React.useId();
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const enabledIndices = tabs
      .map((t, i) => (!t.disabled ? i : null))
      .filter((i) => i !== null) as number[];
    const currentEnabledPos = enabledIndices.indexOf(index);

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next =
        (currentEnabledPos + dir + enabledIndices.length) %
        enabledIndices.length;
      const nextIndex = enabledIndices[next];
      tabRefs.current[nextIndex]?.focus();
      onChange(tabs[nextIndex].id);
    } else if (e.key === "Home") {
      e.preventDefault();
      const firstIdx = enabledIndices[0];
      tabRefs.current[firstIdx]?.focus();
      onChange(tabs[firstIdx].id);
    } else if (e.key === "End") {
      e.preventDefault();
      const lastIdx = enabledIndices[enabledIndices.length - 1];
      tabRefs.current[lastIdx]?.focus();
      onChange(tabs[lastIdx].id);
    }

    void enabledTabs; // suppress unused warning
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Tabs"
        id={tablistId}
        className={cn(
          "flex",
          variant === "underline" &&
            "border-b border-border-subtle gap-0",
          variant === "pill" &&
            "bg-surface rounded-[var(--radius-md)] p-1 gap-1",
          fullWidth && "w-full"
        )}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el; }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !tab.disabled && onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium select-none",
                "transition-colors duration-150",
                "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                // Underline variant
                variant === "underline" && [
                  "px-4 py-2.5 border-b-2 -mb-px",
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong",
                ],
                // Pill variant
                variant === "pill" && [
                  "px-3 py-1.5 rounded-[var(--radius-sm)] flex-1 justify-center",
                  isActive
                    ? "bg-surface-elevated text-text-primary shadow-sm border border-border-subtle"
                    : "text-text-secondary hover:text-text-primary",
                ]
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "text-[11px] font-medium px-1.5 py-0.5 rounded-[var(--radius-full)]",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "bg-surface-hover text-text-muted"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
        {/* Unused to suppress warning */}
        {void activeIndex}
      </div>

      {/* Tab panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeTab}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {tab.id === activeTab && children}
        </div>
      ))}
    </div>
  );
}
