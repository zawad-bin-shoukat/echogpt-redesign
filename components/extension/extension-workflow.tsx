import * as React from "react";
import { Layout, Globe, MessageSquare, CheckCircle2 } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Open the Side Panel",
    description:
      "Press ⌘⇧E or click the EchoGPT toolbar icon to summon the companion beside your active tab.",
    icon: Layout,
  },
  {
    step: "02",
    title: "Inspect Clean Page Context",
    description:
      "EchoGPT automatically parses document structure, stripping ads and sidebars to focus purely on the text.",
    icon: Globe,
  },
  {
    step: "03",
    title: "Ask, Summarize, or Explain",
    description:
      "Highlight difficult terminology for on-the-spot breakdowns or request executive summaries with one click.",
    icon: MessageSquare,
  },
  {
    step: "04",
    title: "Stay in Your Flow",
    description:
      "Extract citations, copy code snippets, and cross-verify with 40+ models without ever switching browser tabs.",
    icon: CheckCircle2,
  },
];

export function ExtensionWorkflow() {
  return (
    <section id="workflow" className="py-16 sm:py-20 border-t border-border-subtle bg-surface/30 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface border border-border-subtle text-[11px] font-mono text-accent font-semibold uppercase tracking-wider">
            Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            How the Chrome Side Panel Works
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            A persistent, context-aware AI companion designed for research, technical reading, and writing workflows.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 rounded-[var(--radius-xl)] bg-surface border border-border-subtle hover:border-border-strong transition-all shadow-2xs flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent">
                      {item.step}
                    </span>
                    <div className="size-8 rounded-[var(--radius-md)] bg-accent-subtle text-accent flex items-center justify-center">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <h3 className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="h-0.5 w-8 bg-border-subtle group-hover:w-16 group-hover:bg-accent transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
