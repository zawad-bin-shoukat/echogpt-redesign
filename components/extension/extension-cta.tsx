import * as React from "react";
import Link from "next/link";
import { ArrowRight, Puzzle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExtensionCta() {
  return (
    <section className="py-16 sm:py-20 border-t border-border-subtle bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border-subtle text-xs font-medium text-text-secondary shadow-2xs">
          <Sparkles className="size-3 text-accent" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            One-Click Setup
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
          Bring 40+ AI models to your Chrome browser
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-text-secondary leading-relaxed">
          Compatible with Google Chrome, Brave, and Microsoft Edge. Enjoy unified model access directly inside Chrome&apos;s native side panel.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-xs"
              leftIcon={<Puzzle className="size-4" />}
            >
              Add to Chrome — Free
            </Button>
          </a>

          <Link href="/app" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full justify-center"
              rightIcon={<ArrowRight className="size-4" />}
            >
              Launch Web Workspace
            </Button>
          </Link>
        </div>

        <p className="text-[11px] text-text-muted font-mono">
          Free tier included · 40+ models available · No individual API keys needed
        </p>
      </div>
    </section>
  );
}
