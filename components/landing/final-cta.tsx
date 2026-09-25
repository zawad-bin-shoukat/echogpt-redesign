import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative py-12 sm:py-16 border-t border-border-subtle bg-surface/40"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-2xl)] border border-border-subtle bg-surface-elevated p-8 sm:p-12 lg:p-16 text-center shadow-sm relative overflow-hidden">
          {/* Subtle architectural background texture */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            Ready When You Are
          </span>

          <h2
            id="final-cta-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl"
          >
            Stop switching between AI tools.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            Bring your models, browser context, and conversations into one workspace.
            Experience true multi-model productivity with zero individual API keys.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/app" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto justify-center shadow-xs"
                leftIcon={<Sparkles className="size-4" />}
                rightIcon={<ArrowRight className="size-4" />}
              >
                Try EchoGPT Now
              </Button>
            </Link>

            <Link href="/extension" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto justify-center"
                leftIcon={<Laptop className="size-4 text-sky-500" />}
              >
                Explore the Extension
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
