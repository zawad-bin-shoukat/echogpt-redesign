"use client";

import * as React from "react";
import {
  Sparkles,
  ArrowUp,
  FileText,
  HelpCircle,
  Copy,
  Check,
  Globe,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Search,
  Cpu,
  Zap,
  Code2,
  X,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/button";
import { QUICK_SELECT_MODELS, VERIFIED_MODELS } from "@/lib/mock/verified-models";
import type { Model } from "@/types";
import { cn } from "@/lib/utils";
import {
  INITIAL_EXTENSION_MESSAGES,
  getExtensionActionResponse,
  getExtensionCustomResponse,
  type ExtensionMessage,
} from "./extension-simulation";

type MessagesUpdater =
  | ExtensionMessage[]
  | ((prev: ExtensionMessage[]) => ExtensionMessage[]);

export interface SidePanelProps {
  className?: string;
  /** Controlled page context state */
  pageContextActive?: boolean;
  onTogglePageContext?: () => void;
  /** Highlight selection state */
  selectedHighlight?: boolean;
  /** Active model */
  activeModel?: Model;
  onSelectModel?: (model: Model) => void;
  /** Messages */
  messages?: ExtensionMessage[];
  onMessagesChange?: (updater: MessagesUpdater) => void;
  /** Simulation status */
  status?: "idle" | "processing";
  onStatusChange?: (status: "idle" | "processing") => void;
  /** Triggered action hook from parent */
  externalActionTrigger?: {
    action: "summarize" | "explain" | "takeaways";
    timestamp: number;
  } | null;
}

/**
 * Lightweight inline markdown formatter for the simulated side panel responses.
 */
function renderFormattedText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const codeMatch = remaining.match(/`(.+?)`/);
    const italicMatch = remaining.match(/\*([^*]+?)\*/);

    let firstIndex = -1;
    let matchType: "bold" | "code" | "italic" | null = null;
    let matchLength = 0;
    let matchContent = "";

    if (boldMatch && boldMatch.index !== undefined) {
      firstIndex = boldMatch.index;
      matchType = "bold";
      matchLength = boldMatch[0].length;
      matchContent = boldMatch[1];
    }

    if (
      codeMatch &&
      codeMatch.index !== undefined &&
      (firstIndex === -1 || codeMatch.index < firstIndex)
    ) {
      firstIndex = codeMatch.index;
      matchType = "code";
      matchLength = codeMatch[0].length;
      matchContent = codeMatch[1];
    }

    if (
      italicMatch &&
      italicMatch.index !== undefined &&
      (firstIndex === -1 || italicMatch.index < firstIndex)
    ) {
      firstIndex = italicMatch.index;
      matchType = "italic";
      matchLength = italicMatch[0].length;
      matchContent = italicMatch[1];
    }

    if (firstIndex === -1 || matchType === null) {
      parts.push(remaining);
      break;
    }

    if (firstIndex > 0) {
      parts.push(remaining.substring(0, firstIndex));
    }

    if (matchType === "bold") {
      parts.push(
        <strong key={key++} className="font-semibold text-text-primary">
          {matchContent}
        </strong>
      );
    } else if (matchType === "code") {
      parts.push(
        <code
          key={key++}
          className="font-mono text-[11px] px-1 py-0.5 rounded bg-surface border border-border-subtle text-text-primary"
        >
          {matchContent}
        </code>
      );
    } else if (matchType === "italic") {
      parts.push(
        <em key={key++} className="italic text-text-primary">
          {matchContent}
        </em>
      );
    }

    remaining = remaining.substring(firstIndex + matchLength);
  }

  return <>{parts}</>;
}

/**
 * Renders structured markdown-like paragraphs, headers, and lists.
 */
function renderMessageContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="list-disc pl-4 space-y-1 my-1.5 text-xs text-text-secondary"
        >
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h4
          key={idx}
          className="font-semibold text-text-primary text-xs tracking-tight mt-1 mb-0.5"
        >
          {trimmed.replace(/^###\s+/, "")}
        </h4>
      );
      return;
    }

    if (trimmed.startsWith("#### ")) {
      flushList();
      elements.push(
        <h5
          key={idx}
          className="font-medium text-text-primary text-[11px] uppercase tracking-wider mt-1 mb-0.5"
        >
          {trimmed.replace(/^####\s+/, "")}
        </h5>
      );
      return;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      const text = trimmed.replace(/^[-*]\s+/, "");
      listItems.push(
        <li key={idx} className="leading-relaxed">
          {renderFormattedText(text)}
        </li>
      );
      return;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushList();
      elements.push(
        <div
          key={idx}
          className="flex items-start gap-1.5 text-xs text-text-secondary leading-relaxed my-0.5"
        >
          <span className="font-mono text-[10px] text-accent font-semibold shrink-0 mt-0.5">
            {trimmed.match(/^\d+\./)?.[0]}
          </span>
          <div className="flex-1 min-w-0">
            {renderFormattedText(trimmed.replace(/^\d+\.\s+/, ""))}
          </div>
        </div>
      );
      return;
    }

    flushList();
    elements.push(
      <p key={idx} className="text-xs text-text-secondary leading-relaxed">
        {renderFormattedText(trimmed)}
      </p>
    );
  });

  flushList();
  return <div className="space-y-1.5">{elements}</div>;
}

export function SidePanel({
  className,
  pageContextActive: controlledPageContext,
  onTogglePageContext,
  selectedHighlight = true,
  activeModel: controlledActiveModel,
  onSelectModel,
  messages: controlledMessages,
  onMessagesChange,
  status: controlledStatus,
  onStatusChange,
  externalActionTrigger,
}: SidePanelProps) {
  // Local state fallbacks if not controlled by parent
  const [localPageContext, setLocalPageContext] = React.useState(true);
  const pageContext = controlledPageContext ?? localPageContext;
  const togglePageContext = () => {
    if (onTogglePageContext) {
      onTogglePageContext();
    } else {
      setLocalPageContext(!localPageContext);
    }
  };

  const defaultModel =
    VERIFIED_MODELS.find((m) => m.id === "gpt-5-6-sol") || VERIFIED_MODELS[0];
  const [localActiveModel, setLocalActiveModel] = React.useState<Model>(defaultModel);
  const activeModel = controlledActiveModel ?? localActiveModel;
  const handleSelectModel = (model: Model) => {
    if (onSelectModel) {
      onSelectModel(model);
    } else {
      setLocalActiveModel(model);
    }
    setModelSelectorOpen(false);
  };

  const [localMessages, setLocalMessages] = React.useState<ExtensionMessage[]>(
    INITIAL_EXTENSION_MESSAGES
  );
  const messages = controlledMessages ?? localMessages;
  const updateMessages = React.useCallback(
    (updater: MessagesUpdater) => {
      if (onMessagesChange) {
        onMessagesChange(updater);
      } else {
        setLocalMessages(updater);
      }
    },
    [onMessagesChange]
  );

  const [localStatus, setLocalStatus] = React.useState<"idle" | "processing">("idle");
  const status = controlledStatus ?? localStatus;
  const updateStatus = React.useCallback(
    (newStatus: "idle" | "processing") => {
      if (onStatusChange) {
        onStatusChange(newStatus);
      } else {
        setLocalStatus(newStatus);
      }
    },
    [onStatusChange]
  );

  // UI state
  const [composerText, setComposerText] = React.useState("");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [modelSelectorOpen, setModelSelectorOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [settingsNotice, setSettingsNotice] = React.useState<string | null>(null);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Auto-scroll to bottom of conversation stream
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Focus search input when model selector opens
  React.useEffect(() => {
    if (modelSelectorOpen) {
      searchInputRef.current?.focus();
    }
  }, [modelSelectorOpen]);

  // Handle outside click to close model selector popover
  React.useEffect(() => {
    if (!modelSelectorOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setModelSelectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [modelSelectorOpen]);

  // Handle Escape key to close popovers
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (modelSelectorOpen) setModelSelectorOpen(false);
        if (settingsNotice) setSettingsNotice(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modelSelectorOpen, settingsNotice]);

  // Run quick action (Summarize, Explain Selection, Key Takeaways)
  const handleRunAction = React.useCallback(
    (action: "summarize" | "explain" | "takeaways") => {
      if (status === "processing") return;

      const { userMessage, assistantMessage } = getExtensionActionResponse(
        action,
        activeModel,
        pageContext
      );

      // Append user message immediately
      updateMessages((prev) => [...prev, userMessage]);
      updateStatus("processing");

      // Clear any previous timer
      if (timerRef.current) clearTimeout(timerRef.current);

      // Simulate response delay
      timerRef.current = setTimeout(() => {
        updateMessages((prev) => [...prev, assistantMessage]);
        updateStatus("idle");
      }, 650);
    },
    [status, activeModel, pageContext, updateMessages, updateStatus]
  );

  // Listen to external action trigger (e.g. from article highlight click)
  const lastTriggerTime = React.useRef<number | null>(null);
  React.useEffect(() => {
    if (
      externalActionTrigger &&
      externalActionTrigger.timestamp !== lastTriggerTime.current
    ) {
      lastTriggerTime.current = externalActionTrigger.timestamp;
      handleRunAction(externalActionTrigger.action);
    }
  }, [externalActionTrigger, handleRunAction]);

  // Filter models for selector
  const filteredModels = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return VERIFIED_MODELS;
    return VERIFIED_MODELS.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Copy to clipboard helper
  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  // Submit custom composer query
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = composerText.trim();
    if (!trimmed || status === "processing") return;

    const { userMessage, assistantMessage } = getExtensionCustomResponse(
      trimmed,
      activeModel,
      pageContext
    );

    setComposerText("");
    updateMessages((prev) => [...prev, userMessage]);
    updateStatus("processing");

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      updateMessages((prev) => [...prev, assistantMessage]);
      updateStatus("idle");
    }, 700);
  };

  // Reset conversation to initial state
  const handleResetConversation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    updateStatus("idle");
    setComposerText("");
    updateMessages(() => INITIAL_EXTENSION_MESSAGES);
    setSettingsNotice("Conversation reset to initial state");
    setTimeout(() => setSettingsNotice(null), 2500);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "flagship":
        return <Cpu className="size-3" />;
      case "fast":
        return <Zap className="size-3 text-sky-400" />;
      case "coding":
        return <Code2 className="size-3 text-emerald-400" />;
      default:
        return <Sparkles className="size-3" />;
    }
  };

  return (
    <aside
      aria-label="Chrome Side Panel - EchoGPT"
      className={cn(
        "flex flex-col h-full bg-surface border-l border-border-subtle text-text-primary overflow-hidden relative",
        className
      )}
    >
      {/* 1. Side Panel Header (Native Chrome Side Panel Style) */}
      <div className="h-12 px-2.5 sm:px-3 border-b border-border-subtle flex items-center justify-between gap-1.5 sm:gap-2 shrink-0 bg-surface-elevated/70 relative z-20">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="size-6 rounded-[var(--radius-sm)] bg-accent-subtle border border-accent/20 flex items-center justify-center text-accent font-bold text-xs shrink-0">
            E
          </div>
          <div className="flex items-center gap-1 min-w-0">
            <span className="font-semibold text-xs text-text-primary tracking-tight shrink-0">
              EchoGPT
            </span>
            <span className="text-border-strong text-xs shrink-0">/</span>
            <span className="text-[11px] font-mono text-text-muted truncate">
              Side Panel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {/* Model Switcher Pill */}
          <button
            type="button"
            onClick={() => setModelSelectorOpen(!modelSelectorOpen)}
            aria-expanded={modelSelectorOpen}
            aria-haspopup="dialog"
            aria-label={`Current model: ${activeModel.name}. Click to switch model.`}
            className={cn(
              "inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-[var(--radius-sm)] text-[11px] font-medium border transition-colors cursor-pointer",
              modelSelectorOpen
                ? "bg-surface-elevated border-accent text-accent"
                : "bg-surface border-border-subtle hover:border-border-strong text-text-primary"
            )}
          >
            <span className="size-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="font-semibold truncate max-w-[70px] min-[380px]:max-w-[85px] sm:max-w-[105px]">
              {activeModel.name}
            </span>
            <ChevronDown
              className={cn(
                "size-3 text-text-muted transition-transform duration-150 shrink-0",
                modelSelectorOpen && "rotate-180"
              )}
            />
          </button>

          {/* Reset / New Interaction */}
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="Reset conversation"
            title="Start new conversation (Reset)"
            onClick={handleResetConversation}
            className="size-7 text-text-muted hover:text-text-primary hover:bg-surface-hover"
          >
            <RotateCcw className="size-3.5" />
          </IconButton>

          {/* Simulated Settings */}
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="Side panel settings"
            title="Side panel settings"
            onClick={() => {
              setSettingsNotice(
                `Connected to Chrome Side Panel API. Current model: ${activeModel.name}.`
              );
              setTimeout(() => setSettingsNotice(null), 3500);
            }}
            className="size-7 text-text-muted hover:text-text-primary hover:bg-surface-hover"
          >
            <SlidersHorizontal className="size-3.5" />
          </IconButton>
        </div>
      </div>

      {/* Ephemeral Feedback Toast */}
      {settingsNotice && (
        <div
          role="status"
          className="absolute top-13 left-2 right-2 p-2 rounded-[var(--radius-md)] bg-surface-elevated border border-accent/40 shadow-lg text-[11px] text-text-primary flex items-center justify-between z-30 animate-in fade-in slide-in-from-top-2"
        >
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span>{settingsNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setSettingsNotice(null)}
            className="text-text-muted hover:text-text-primary p-0.5"
            aria-label="Dismiss notice"
          >
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* Model Selector Popover (Responsive side-panel dropdown) */}
      {modelSelectorOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Select Model"
          className="absolute top-13 left-2 right-2 rounded-[var(--radius-lg)] border border-border-strong bg-surface-elevated shadow-2xl z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Search Header */}
          <div className="p-2 border-b border-border-subtle bg-surface/50">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 size-3.5 text-text-muted pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search 41 models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1 text-xs bg-surface border border-border-subtle rounded-[var(--radius-sm)] text-text-primary placeholder:text-text-muted focus:outline-hidden focus:border-accent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 text-text-muted hover:text-text-primary"
                  aria-label="Clear search"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Select Row */}
          {!searchQuery && (
            <div className="p-2 border-b border-border-subtle bg-surface/20">
              <div className="px-1 py-0.5 text-[9px] font-mono uppercase tracking-wider text-text-muted font-medium">
                Quick Select
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {QUICK_SELECT_MODELS.slice(0, 4).map((m) => {
                  const isSelected = m.id === activeModel.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectModel(m)}
                      className={cn(
                        "flex items-center justify-between px-2 py-1 rounded-[var(--radius-sm)] text-[11px] font-medium text-left transition-colors cursor-pointer",
                        isSelected
                          ? "bg-accent-subtle text-accent font-semibold"
                          : "text-text-secondary hover:bg-surface hover:text-text-primary"
                      )}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        {getCategoryIcon(m.category)}
                        <span className="truncate">{m.name}</span>
                      </div>
                      {isSelected && <Check className="size-3 text-accent shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Catalog List */}
          <div className="max-h-52 overflow-y-auto p-1.5 space-y-0.5">
            <div className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-text-muted font-medium">
              {searchQuery ? `Matching (${filteredModels.length})` : "Verified Models (41)"}
            </div>

            {filteredModels.length === 0 ? (
              <div className="py-4 text-center text-xs text-text-muted">
                No matching models found.
              </div>
            ) : (
              filteredModels.map((m) => {
                const isSelected = m.id === activeModel.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelectModel(m)}
                    className={cn(
                      "w-full flex items-center justify-between p-1.5 rounded-[var(--radius-sm)] text-xs text-left transition-colors cursor-pointer",
                      isSelected
                        ? "bg-surface border border-accent/30 text-text-primary"
                        : "hover:bg-surface text-text-secondary hover:text-text-primary"
                    )}
                  >
                    <div className="flex flex-col min-w-0 pr-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-text-primary truncate text-[11px]">
                          {m.name}
                        </span>
                        <Badge
                          variant={m.category}
                          size="sm"
                          className="capitalize text-[8px] px-1 py-0"
                        >
                          {m.category}
                        </Badge>
                      </div>
                      <span className="text-[9px] font-mono text-text-muted truncate mt-0.5">
                        {m.provider}
                      </span>
                    </div>

                    {isSelected && <Check className="size-3.5 text-accent shrink-0 ml-1" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 2. Active Page Context Banner */}
      <div className="p-2.5 bg-surface border-b border-border-subtle shrink-0">
        <div
          className={cn(
            "p-2 rounded-[var(--radius-md)] border flex flex-col gap-1.5 shadow-2xs transition-colors",
            pageContext
              ? "bg-surface-elevated border-border-subtle/80"
              : "bg-surface-elevated/40 border-border-subtle opacity-75"
          )}
        >
          <div className="flex items-center justify-between text-[10px] font-mono">
            {/* Status indicator with toggle action */}
            <button
              type="button"
              onClick={togglePageContext}
              aria-label={
                pageContext
                  ? "Page context is active. Click to pause."
                  : "Page context is paused. Click to enable."
              }
              className="flex items-center gap-1.5 font-medium hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              <span
                className={cn(
                  "size-1.5 rounded-full shrink-0",
                  pageContext ? "bg-accent animate-pulse" : "bg-text-muted"
                )}
              />
              <span className={pageContext ? "text-accent" : "text-text-muted"}>
                {pageContext ? "PAGE CONTEXT ACTIVE" : "PAGE CONTEXT PAUSED"}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-text-muted">
                {pageContext ? "1.8k words" : "Detached"}
              </span>
              <button
                type="button"
                onClick={togglePageContext}
                className={cn(
                  "px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider border cursor-pointer transition-colors",
                  pageContext
                    ? "text-text-muted border-border-subtle hover:text-text-primary hover:border-border-strong"
                    : "text-accent border-accent/40 bg-accent-subtle/30 hover:bg-accent-subtle"
                )}
                aria-label={pageContext ? "Pause page context" : "Enable page context"}
              >
                {pageContext ? "Pause" : "Enable"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1.5 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <Globe className="size-3 text-text-muted shrink-0" />
              <span className="text-xs font-medium text-text-primary truncate">
                Understanding Mixture-of-Experts Models
              </span>
            </div>

            {pageContext && selectedHighlight && (
              <span className="text-[10px] font-mono text-accent shrink-0">
                34w selected
              </span>
            )}
          </div>
        </div>

        {/* Quick Action Suggestion Chips (Horizontal Scrollable Track) */}
        <div
          role="toolbar"
          aria-label="Quick actions"
          className="mt-2 w-full max-w-full overflow-x-auto scrollbar-none [-webkit-overflow-scrolling:touch] pb-1 -mx-0.5 px-0.5"
        >
          <div className="flex items-center gap-1.5 flex-nowrap min-w-max pr-4">
            <button
              type="button"
              onClick={() => handleRunAction("summarize")}
              disabled={status === "processing"}
              aria-label="Summarize this webpage"
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated border border-border-subtle text-[11px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover hover:border-border-strong transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-2xs",
                status === "processing" && "opacity-50 cursor-not-allowed",
                !pageContext && "opacity-80"
              )}
            >
              <FileText className="size-3 text-accent shrink-0" />
              <span>Summarize</span>
            </button>

            <button
              type="button"
              onClick={() => handleRunAction("explain")}
              disabled={status === "processing"}
              aria-label="Explain highlighted selection"
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated border border-border-subtle text-[11px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover hover:border-border-strong transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-2xs",
                status === "processing" && "opacity-50 cursor-not-allowed",
                !pageContext && "opacity-80"
              )}
            >
              <HelpCircle className="size-3 text-sky-400 shrink-0" />
              <span>Explain Selection</span>
            </button>

            <button
              type="button"
              onClick={() => handleRunAction("takeaways")}
              disabled={status === "processing"}
              aria-label="Extract key takeaways"
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-elevated border border-border-subtle text-[11px] font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover hover:border-border-strong transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-2xs",
                status === "processing" && "opacity-50 cursor-not-allowed",
                !pageContext && "opacity-80"
              )}
            >
              <Sparkles className="size-3 text-emerald-400 shrink-0" />
              <span>Key Takeaways</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Conversation Transcript Stream */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-3.5 scrollbar-none"
        aria-live="polite"
      >
        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex flex-col items-end gap-1">
                <div className="p-2.5 rounded-[var(--radius-lg)] rounded-tr-xs bg-surface-elevated border border-border-subtle text-xs text-text-primary max-w-[90%] shadow-2xs">
                  {msg.passageSnippet && (
                    <div className="mb-1 pb-1 border-b border-border-subtle/60">
                      <span className="font-semibold text-[10px] text-accent block uppercase tracking-wider">
                        Selected Passage
                      </span>
                      <p className="text-[11px] text-text-muted italic line-clamp-2 mt-0.5">
                        &quot;{msg.passageSnippet}&quot;
                      </p>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="text-[10px] font-mono text-text-muted pr-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          }

          // Assistant message
          const isCopied = copiedId === msg.id;
          const displayModel = msg.modelName || activeModel.name;

          return (
            <div key={msg.id} className="flex items-start gap-2 max-w-full">
              <div className="size-6 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                E
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-text-primary">
                    {displayModel}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">
                    Simulated
                  </span>
                </div>

                <div className="p-3 rounded-[var(--radius-lg)] rounded-tl-xs bg-surface-elevated/70 border border-border-subtle text-xs leading-relaxed text-text-secondary space-y-2 shadow-2xs">
                  {renderMessageContent(msg.content)}

                  {msg.codeSnippet && (
                    <div className="p-2 rounded bg-surface border border-border-subtle font-mono text-[11px] text-text-primary overflow-x-auto">
                      <code>{msg.codeSnippet}</code>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between px-1 text-[10px] text-text-muted">
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.content, msg.id)}
                    className="inline-flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer"
                    aria-label={isCopied ? "Copied" : "Copy answer"}
                  >
                    {isCopied ? (
                      <Check className="size-3 text-accent" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                    <span>{isCopied ? "Copied" : "Copy"}</span>
                  </button>
                  <span className="font-mono text-[9px]">EchoGPT Side Panel Demo</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Processing State Animation (Honest Simulation) */}
        {status === "processing" && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-2 max-w-full animate-in fade-in duration-200"
          >
            <div className="size-6 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 animate-pulse">
              E
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-text-primary">
                  {activeModel.name}
                </span>
                <span className="text-[10px] font-mono text-accent animate-pulse">
                  Simulating response…
                </span>
              </div>

              <div className="p-3 rounded-[var(--radius-lg)] rounded-tl-xs bg-surface-elevated/50 border border-accent/30 text-xs text-text-secondary space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-2 text-text-muted font-mono text-[11px]">
                  <RefreshCw className="size-3 text-accent animate-spin" />
                  <span>Synthesizing response with {activeModel.name}…</span>
                </div>
                <div className="h-1.5 w-3/4 bg-border-subtle rounded-full overflow-hidden">
                  <div className="h-full bg-accent animate-pulse rounded-full w-2/3" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Compact Side Panel Composer */}
      <div className="p-2.5 bg-surface border-t border-border-subtle shrink-0">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-1.5 p-1.5 rounded-[var(--radius-lg)] bg-surface-elevated border border-border-strong focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all"
        >
          <input
            type="text"
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            disabled={status === "processing"}
            placeholder={
              status === "processing"
                ? "EchoGPT is responding..."
                : pageContext
                ? "Ask EchoGPT about this page..."
                : "Ask EchoGPT (context detached)..."
            }
            aria-label="Side panel prompt input"
            className="flex-1 bg-transparent px-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-hidden disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!composerText.trim() || status === "processing"}
            aria-label="Send message in side panel"
            className={cn(
              "size-7 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 transition-all",
              composerText.trim() && status !== "processing"
                ? "bg-accent text-white hover:bg-accent-hover cursor-pointer shadow-2xs"
                : "bg-surface text-text-muted border border-border-subtle opacity-50 cursor-not-allowed"
            )}
          >
            <ArrowUp className="size-3.5" />
          </button>
        </form>
        <div className="mt-1 text-center text-[10px] font-mono text-text-muted">
          Shortcut: ⌘ + Shift + E
        </div>
      </div>
    </aside>
  );
}
