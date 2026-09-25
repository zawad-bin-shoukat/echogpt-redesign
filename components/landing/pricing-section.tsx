import * as React from "react";
import Link from "next/link";
import { Check, Sparkles, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VERIFIED_PLANS, FREE_TIER } from "@/lib/mock/verified-pricing";

export function PricingSection() {
  const monthlyPlan = VERIFIED_PLANS.find((p) => p.duration === 1);
  const annualPlan = VERIFIED_PLANS.find((p) => p.duration === 12);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative py-20 sm:py-28 lg:py-32 border-t border-border-subtle bg-surface/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-2xs mb-4">
            <CreditCard className="size-3.5 text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
              Pricing
            </span>
            <span className="text-border-strong">|</span>
            <span>Simple, Unified Access</span>
          </div>

          <h2
            id="pricing-heading"
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-tight"
          >
            One workspace. One subscription.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            Bring your AI models, browser context, and conversations into one workspace.
          </p>
        </div>

        {/* 3-Card Pricing Layout */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* 1. Free Tier Card */}
          <div className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-border-strong transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-semibold text-text-primary">
                  {FREE_TIER.name} Access
                </span>
                <Badge variant="free" size="sm">
                  Ongoing
                </Badge>
              </div>

              <p className="mt-2 text-xs text-text-secondary">
                Essential multi-model AI exploration with zero cost or commitment.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-text-primary">$0</span>
                <span className="text-xs text-text-muted">/ month</span>
              </div>

              <div className="mt-1 text-[11px] font-mono text-text-muted">
                Free forever · No credit card required
              </div>

              <div className="mt-6 pt-6 border-t border-border-subtle space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-medium">
                  What&apos;s included:
                </div>
                {FREE_TIER.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                    <Check className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2.5 text-xs text-text-secondary">
                  <Check className="size-3.5 text-accent shrink-0 mt-0.5" />
                  <span>Interactive Chrome Extension simulator</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link href="/app" className="w-full block">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-center"
                >
                  Start with Free Tier
                </Button>
              </Link>
            </div>
          </div>

          {/* 2. Monthly Pro Card */}
          <div className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface-elevated p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-border-strong transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-semibold text-text-primary">
                  {monthlyPlan?.name || "Monthly Pro"}
                </span>
                <Badge variant="coding" size="sm">
                  Flexible
                </Badge>
              </div>

              <p className="mt-2 text-xs text-text-secondary">
                Full access to all 41+ leading AI models with flexible month-to-month billing.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-text-primary">
                  ${monthlyPlan?.amount || "9.99"}
                </span>
                <span className="text-xs text-text-muted">/ month</span>
              </div>

              <div className="mt-1 text-[11px] font-mono text-text-muted">
                {monthlyPlan?.billingDescription || "Billed monthly. Cancel any time."}
              </div>

              <div className="mt-6 pt-6 border-t border-border-subtle space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-medium">
                  Everything in Free, plus:
                </div>
                {monthlyPlan?.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                    <Check className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link href="/app" className="w-full block">
                <Button
                  variant="secondary"
                  size="md"
                  className="w-full justify-center"
                >
                  Get Monthly Pro
                </Button>
              </Link>
            </div>
          </div>

          {/* 3. Annual Pro Card (Visually Emphasized) */}
          <div className="relative rounded-[var(--radius-xl)] border-2 border-accent bg-surface-elevated p-6 sm:p-8 flex flex-col justify-between shadow-md lg:-translate-y-2 transition-transform">
            {/* Best Value Top Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold shadow-xs">
                <Sparkles className="size-3" />
                Best Value · Save 17%
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-base font-semibold text-text-primary">
                  {annualPlan?.name || "Annual Pro"}
                </span>
              </div>

              <p className="mt-2 text-xs text-text-secondary">
                Continuous access to leading AI models at the lowest effective monthly rate.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-bold text-text-primary">
                  ${annualPlan?.monthlyEquivalent.replace(" / mo", "").replace("$", "") || "8.33"}
                </span>
                <span className="text-xs text-text-muted">/ month</span>
              </div>

              <div className="mt-1 text-[11px] font-mono text-accent font-medium">
                ${annualPlan?.amount || "99.99"} billed annually
              </div>

              <div className="mt-6 pt-6 border-t border-border-subtle space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-text-muted font-medium">
                  Everything in Pro, plus:
                </div>
                {annualPlan?.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-text-secondary">
                    <Check className="size-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link href="/app" className="w-full block">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center shadow-xs"
                  rightIcon={<ArrowRight className="size-4" />}
                >
                  Get Annual Pro
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Prototype Evaluation Disclaimer Note */}
        <div className="mt-8 text-center text-xs text-text-muted">
          Demo checkout — no payment is processed. Sourced from verified EchoGPT subscription tiers.
        </div>
      </div>
    </section>
  );
}
