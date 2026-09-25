"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

function subscribe(callback: () => void) {
  // Listen for storage events (across tabs or programmatic)
  window.addEventListener("storage", callback);
  // Also create a custom event listener for in-app theme changes
  window.addEventListener("echogpt-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("echogpt-theme-change", callback);
  };
}

function getSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): "light" | "dark" {
  return "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Initial theme sync with localStorage if available
    const savedTheme = localStorage.getItem("echogpt-theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    window.dispatchEvent(new Event("echogpt-theme-change"));
    // Use requestAnimationFrame so it's not synchronous in effect body
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("echogpt-theme", nextTheme);
    window.dispatchEvent(new Event("echogpt-theme-change"));
  };

  if (!mounted) {
    return (
      <div className="size-8 rounded-[var(--radius-md)] border border-border-subtle bg-surface animate-pulse" />
    );
  }

  return (
    <Tooltip content={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} side="bottom">
      <IconButton
        variant="ghost"
        size="sm"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={toggleTheme}
        className={className}
      >
        {theme === "dark" ? (
          <Sun className="size-4 text-text-secondary hover:text-text-primary transition-colors" />
        ) : (
          <Moon className="size-4 text-text-secondary hover:text-text-primary transition-colors" />
        )}
      </IconButton>
    </Tooltip>
  );
}
