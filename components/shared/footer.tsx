import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface/50 text-text-secondary text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Brand & Brief Description (5 cols on md) */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo showBadge />
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm">
              Unified multi-model AI productivity workspace and Chrome Side Panel companion.
              Access 40+ leading frontier models from a single interface.
            </p>
          </div>

          {/* Middle Columns: Product & Resources Navigation (4 cols on md) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold mb-3">
                Product
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/" className="hover:text-text-primary transition-colors">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="hover:text-text-primary transition-colors">
                    AI Workspace
                  </Link>
                </li>
                <li>
                  <Link href="/extension" className="hover:text-text-primary transition-colors">
                    Chrome Extension
                  </Link>
                </li>
                <li>
                  <Link href="/#models" className="hover:text-text-primary transition-colors">
                    Models Directory
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold mb-3">
                Resources
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/#features" className="hover:text-text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-text-primary transition-colors">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="hover:text-text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Fast CTA Launch (3 cols on md) */}
          <div className="md:col-span-3 flex flex-col justify-start space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold">
              Get Started
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Explore 40+ verified models with zero personal API keys.
            </p>
            <Link href="/app" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center shadow-2xs"
                leftIcon={<Sparkles className="size-3.5" />}
                rightIcon={<ArrowRight className="size-3.5" />}
              >
                Try EchoGPT
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <div>© 2026 EchoGPT. All rights reserved.</div>
          <div className="font-mono text-[11px]">
            Frontend prototype for internship evaluation.
          </div>
        </div>
      </div>
    </footer>
  );
}
