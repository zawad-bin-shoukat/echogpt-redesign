"use client";

/**
 * TEMPORARY DEV COMPONENT — Phase 3 Foundation Verification
 *
 * Exercises all design tokens and UI primitives to confirm they render
 * correctly in both light and dark modes. This file will be deleted
 * in Phase 4 when the real landing page is implemented.
 */

import * as React from "react";
import { Moon, Sun, Search, Mail, Code2, Zap, Check } from "lucide-react";
import { Button, IconButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Divider,
} from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Dropdown } from "@/components/ui/dropdown";
import { Tabs } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

// ── Theme Toggle (DEV only) ────────────────────────────────────────────────
function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] bg-surface border border-border-subtle text-sm text-text-secondary hover:bg-surface-hover transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun size={14} /> : <Moon size={14} />}
      {dark ? "Light" : "Dark"} Mode
    </button>
  );
}

// ── Section Wrapper ───────────────────────────────────────────────────────
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-h2 text-text-primary mb-1">{title}</h2>
      <Divider className="mb-6" />
      {children}
    </section>
  );
}

// ── Main Showcase ─────────────────────────────────────────────────────────
export default function FoundationShowcase() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("all");
  const [switchA, setSwitchA] = React.useState(true);
  const [switchB, setSwitchB] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("");

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <ThemeToggle />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-xs font-mono text-accent mb-3 uppercase tracking-widest">
            Phase 3 — Dev Verification Only
          </p>
          <h1 className="text-display text-text-primary mb-3">
            EchoGPT Foundation
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
            Design system tokens, typography, and UI primitives smoke test.
            This page will be replaced by the real landing page in Phase 4.
          </p>
        </header>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button leftIcon={<Mail size={14} />}>With Icon</Button>
            <Button rightIcon={<Check size={14} />} variant="secondary">
              With Right Icon
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <IconButton aria-label="Search" variant="ghost">
              <Search size={16} />
            </IconButton>
            <IconButton aria-label="Code" variant="secondary">
              <Code2 size={16} />
            </IconButton>
            <IconButton aria-label="Fast" variant="primary">
              <Zap size={16} />
            </IconButton>
          </div>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary" dot>Accent</Badge>
            <Badge variant="success" dot>Success</Badge>
            <Badge variant="warning" dot>Warning</Badge>
            <Badge variant="error" dot>Error</Badge>
            <Badge variant="flagship">Flagship</Badge>
            <Badge variant="coding">Coding</Badge>
            <Badge variant="fast">Fast</Badge>
            <Badge variant="vision">Vision</Badge>
            <Badge variant="specialized">Specialized</Badge>
            <Badge variant="free">Free</Badge>
          </div>
        </Section>

        {/* ── Inputs ── */}
        <Section title="Inputs & Textarea">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Input label="Standard Input" placeholder="Enter text…" />
            <Input
              label="With prefix icon"
              placeholder="Search models…"
              prefix={<Search size={14} />}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <Input
              label="Error State"
              placeholder="username"
              error="This field is required."
            />
            <Input label="Disabled" placeholder="Disabled input" disabled />
          </div>
          <Textarea
            label="Prompt Composer (auto-resize)"
            placeholder="Ask anything…"
            autoResize
            helperText="Press Enter to send, Shift+Enter for new line."
          />
        </Section>

        {/* ── Cards ── */}
        <Section title="Cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>GPT-5.6 Sol</CardTitle>
                <CardDescription>
                  Broad general intelligence with strong reasoning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant="flagship">Flagship</Badge>
                  <Badge variant="free" dot>Free access</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="ml-auto">Select Model</Button>
              </CardFooter>
            </Card>

            <Card interactive>
              <CardHeader>
                <CardTitle>Kimi K2.7 Code</CardTitle>
                <CardDescription>
                  Specialized for software engineering and code review.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant="coding">Coding</Badge>
                  <Badge variant="free" dot>Free access</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Tabs">
          <Tabs
            tabs={[
              { id: "all", label: "All Models", count: 41 },
              { id: "flagship", label: "Flagship" },
              { id: "coding", label: "Coding" },
              { id: "fast", label: "Fast" },
              { id: "disabled", label: "Disabled", disabled: true },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
            className="mb-6"
          >
            <p className="pt-4 text-sm text-text-secondary">
              Active tab: <code className="font-mono text-accent">{activeTab}</code>
            </p>
          </Tabs>

          <Tabs
            tabs={[
              { id: "tab1", label: "Overview" },
              { id: "tab2", label: "Settings" },
              { id: "tab3", label: "History" },
            ]}
            activeTab="tab1"
            onChange={() => {}}
            variant="pill"
          />
        </Section>

        {/* ── Dropdown ── */}
        <Section title="Dropdown">
          <div className="flex gap-4">
            <Dropdown
              asButton
              trigger="Select Model"
              items={[
                { id: "gpt56sol", label: "GPT-5.6 Sol", description: "OpenAI · Flagship" },
                { id: "gemini38", label: "Gemini 3.8 Flash", description: "Google · Fast" },
                { id: "deepseek", label: "DeepSeek V4 Pro", description: "DeepSeek · Coding" },
                { id: "sep", label: "", separator: true },
                { id: "more", label: "Browse all 41 models…" },
              ]}
              onSelect={(item) => console.log("Selected:", item.id)}
            />
          </div>
        </Section>

        {/* ── Switch ── */}
        <Section title="Switches">
          <div className="flex flex-col gap-4 max-w-sm">
            <Switch
              label="Page Context"
              description="Include current webpage content in prompts."
              checked={switchA}
              onCheckedChange={setSwitchA}
            />
            <Switch
              label="Dark Mode"
              checked={switchB}
              onCheckedChange={setSwitchB}
            />
            <Switch
              label="Disabled Toggle"
              checked={false}
              onCheckedChange={() => {}}
              disabled
            />
          </div>
        </Section>

        {/* ── Tooltip ── */}
        <Section title="Tooltips">
          <div className="flex gap-4 flex-wrap">
            <Tooltip content="Search across 41 models" side="top">
              <Button variant="secondary" leftIcon={<Search size={14} />}>
                Search
              </Button>
            </Tooltip>
            <Tooltip content="Opens settings panel" side="right">
              <IconButton aria-label="Settings" variant="ghost">
                <Zap size={16} />
              </IconButton>
            </Tooltip>
          </div>
        </Section>

        {/* ── Modal ── */}
        <Section title="Modal">
          <Button onClick={() => setModalOpen(true)} variant="secondary">
            Open Modal
          </Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="EchoGPT Model Selector"
            description="Choose from 41 verified AI models."
            size="md"
            footer={
              <div className="flex gap-2 justify-end w-full">
                <Button variant="ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setModalOpen(false)}>Confirm</Button>
              </div>
            }
          >
            <div className="space-y-3">
              {["GPT-5.6 Sol", "Gemini 3.8 Flash", "Kimi K2.7 Code"].map(
                (name) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-border-subtle hover:bg-surface-hover transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-text-primary">
                      {name}
                    </span>
                    <Badge variant="free" dot>Free</Badge>
                  </div>
                )
              )}
            </div>
          </Modal>
        </Section>

        {/* ── Color Tokens ── */}
        <Section title="Design Tokens">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "background", cls: "bg-background" },
              { name: "surface", cls: "bg-surface" },
              { name: "surface-elevated", cls: "bg-surface-elevated" },
              { name: "surface-hover", cls: "bg-surface-hover" },
              { name: "accent", cls: "bg-accent" },
              { name: "success", cls: "bg-success" },
              { name: "warning", cls: "bg-warning" },
              { name: "error", cls: "bg-error" },
            ].map(({ name, cls }) => (
              <div key={name} className="flex flex-col gap-1.5">
                <div
                  className={`${cls} h-12 rounded-[var(--radius-md)] border border-border-subtle`}
                />
                <span className="text-xs font-mono text-text-muted">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <footer className="mt-16 pt-8 border-t border-border-subtle">
          <p className="text-xs text-text-muted font-mono">
            EchoGPT Phase 3 — Foundation complete. Next: Phase 4 Landing Page.
          </p>
        </footer>
      </div>
    </div>
  );
}
