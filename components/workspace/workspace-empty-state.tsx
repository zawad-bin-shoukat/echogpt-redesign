import * as React from "react";
import {
  FileText,
  Lightbulb,
  Scale,
  Code2,
  Sparkles,
} from "lucide-react";
import type { Model } from "@/types";

interface WorkspaceEmptyStateProps {
  activeModel: Model;
  onSelectPrompt: (prompt: string) => void;
}

const QUICK_SUGGESTIONS = [
  {
    icon: FileText,
    title: "Summarize a long article",
    description: "Extract structured key takeaways, core findings, and executive decisions.",
    prompt:
      "Please provide a concise, structured summary of the key architectural trade-offs in modern multi-model AI gateways, highlighting cost, latency, and reliability.",
  },
  {
    icon: Lightbulb,
    title: "Explain a difficult concept",
    description: "Break down complex technical systems, physics, or algorithmic trade-offs.",
    prompt:
      "Can you explain how speculative decoding works in large language models with an intuitive analogy and step-by-step breakdown?",
  },
  {
    icon: Scale,
    title: "Compare two ideas",
    description: "Evaluate pros, cons, and performance implications across architectural options.",
    prompt:
      "Compare the architectural tradeoffs between dense and Mixture-of-Experts (MoE) transformer architectures for high-throughput code synthesis.",
  },
  {
    icon: Code2,
    title: "Write or improve code",
    description: "Synthesize type-safe functions, refactor hooks, or debug subtle errors.",
    prompt:
      "Help me review and optimize this React state management pattern to prevent unnecessary re-renders in a streaming chat component.",
  },
];

export function WorkspaceEmptyState({
  activeModel,
  onSelectPrompt,
}: WorkspaceEmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto my-auto animate-in fade-in duration-200">
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1 text-xs font-medium text-text-secondary shadow-2xs mb-4">
        <Sparkles className="size-3 text-accent" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
          AI Workspace
        </span>
        <span className="text-border-strong">|</span>
        <span className="capitalize">{activeModel.name} Active</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
        How can EchoGPT help?
      </h1>

      {/* Supporting Narrative */}
      <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed max-w-lg">
        Chat with <strong className="text-text-primary font-medium">{activeModel.name}</strong> or
        switch to any of the 40+ verified models. Type a prompt below or pick a starter action.
      </p>

      {/* Quick Action Suggestion Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
        {QUICK_SUGGESTIONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectPrompt(item.prompt)}
              className="p-3.5 rounded-[var(--radius-lg)] border border-border-subtle bg-surface-elevated hover:bg-surface-hover/70 hover:border-border-strong text-left transition-all shadow-2xs group focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-7 rounded-[var(--radius-md)] bg-accent-subtle text-accent flex items-center justify-center shrink-0">
                  <Icon className="size-3.5" />
                </div>
                <div className="font-semibold text-xs text-text-primary group-hover:text-accent transition-colors">
                  {item.title}
                </div>
              </div>
              <p className="mt-2 text-[11px] text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
