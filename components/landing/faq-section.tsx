"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { VERIFIED_FAQS } from "@/lib/mock/faq";
import { cn } from "@/lib/utils";

export function FaqSection() {
  // Allow open/close by ID, default to first item open
  const [openId, setOpenId] = React.useState<string | null>(VERIFIED_FAQS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative pt-20 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 lg:pb-24 border-t border-border-subtle bg-background"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-2xs mb-4">
            <HelpCircle className="size-3.5 text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
              FAQ
            </span>
            <span className="text-border-strong">|</span>
            <span>Frequently Asked Questions</span>
          </div>

          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl leading-tight"
          >
            Everything you need to know.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
            Clear answers about multi-model routing, browser companion capabilities, and this prototype.
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="mt-12 sm:mt-16 divide-y divide-border-subtle border-y border-border-subtle">
          {VERIFIED_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const buttonId = `faq-btn-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <div key={faq.id} className="py-5 sm:py-6">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(faq.id)}
                    className="w-full flex items-center justify-between text-left gap-4 text-base sm:text-lg font-semibold text-text-primary hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded-[var(--radius-sm)]"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={cn(
                        "size-7 rounded-full bg-surface border border-border-subtle flex items-center justify-center shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180 bg-surface-hover border-border-strong"
                      )}
                    >
                      <ChevronDown className="size-4 text-text-secondary" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pt-3 pr-8 sm:pr-12 text-sm sm:text-base text-text-secondary leading-relaxed animate-in fade-in duration-150"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
