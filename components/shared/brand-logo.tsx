import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showBadge?: boolean;
}

/**
 * Clean text-based EchoGPT wordmark.
 * Uses font-sans with tight tracking and a subtle emerald dot indicator.
 */
export function BrandLogo({ className, showBadge = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 select-none focus-visible:outline-2 focus-visible:outline-accent rounded-[var(--radius-sm)]",
        className
      )}
      aria-label="EchoGPT home"
    >
      <div className="flex items-center gap-1.5 font-bold tracking-tight text-text-primary text-lg sm:text-xl">
        <span className="font-semibold text-text-primary group-hover:text-text-primary transition-colors">
          Echo
        </span>
        <span className="font-bold text-accent transition-colors">
          GPT
        </span>
        <span
          className="size-1.5 rounded-full bg-accent animate-pulse"
          aria-hidden="true"
        />
      </div>

      {showBadge && (
        <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded-full bg-accent-subtle text-accent border border-accent/20">
          v1.0
        </span>
      )}
    </Link>
  );
}
