"use client";

import * as React from "react";
import { Check, Copy, Sparkles, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Message, Model } from "@/types";
import { cn } from "@/lib/utils";

interface WorkspaceMessagesProps {
  messages: Message[];
  activeModel: Model;
  isThinking: boolean;
}

/**
 * Lightweight inline markdown renderer for formatting code blocks,
 * headings, bold text, inline code, and lists cleanly without external libraries.
 */
function FormattedContent({ text }: { text: string }) {
  // Split on code blocks: ```lang ... ```
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 leading-relaxed text-xs sm:text-sm">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          const firstLine = lines[0]?.trim() || "";
          const hasLang = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const language = hasLang ? firstLine : "code";
          const codeLines = hasLang ? lines.slice(1) : lines;
          const codeString = codeLines.join("\n");

          return (
            <CodeBlock key={index} language={language} code={codeString} />
          );
        }

        // Render normal text blocks with headings, lists, blockquotes, and tables
        return <TextParagraphs key={index} block={part} />;
      })}
    </div>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-3 rounded-[var(--radius-lg)] border border-border-strong bg-surface-elevated overflow-hidden shadow-xs">
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-surface border-b border-border-subtle text-[11px] font-mono text-text-muted">
        <div className="flex items-center gap-1.5">
          <Terminal className="size-3 text-accent" />
          <span className="uppercase text-[10px] tracking-wider">{language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="inline-flex items-center gap-1 text-[10px] font-sans text-text-muted hover:text-text-primary px-2 py-0.5 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="size-3 text-accent" />
              <span className="text-accent font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3.5 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed text-text-primary bg-surface-elevated/70">
        <pre className="whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}

function TextParagraphs({ block }: { block: string }) {
  const lines = block.split("\n");
  const elements: React.ReactNode[] = [];

  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;
  let inTable = false;
  let tableRows: string[][] = [];

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === "ul") {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-5 space-y-1 my-2">
          {currentList.items.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`ol-${elements.length}`} className="list-decimal pl-5 space-y-1 my-2">
          {currentList.items.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  const flushTable = () => {
    if (!inTable || tableRows.length === 0) return;
    const header = tableRows[0];
    const body = tableRows.slice(2); // Skip separator row

    elements.push(
      <div key={`table-${elements.length}`} className="my-3 overflow-x-auto border border-border-subtle rounded-[var(--radius-md)]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-surface border-b border-border-subtle">
              {header?.map((col, idx) => (
                <th key={idx} className="p-2.5 font-semibold text-text-primary">
                  {formatInline(col.trim())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {body.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-surface/50">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2.5 text-text-secondary">
                    {formatInline(cell.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i] ?? "";
    const line = rawLine.trim();

    // Table row detection: begins and ends with |
    if (line.startsWith("|") && line.endsWith("|")) {
      flushList();
      inTable = true;
      const cells = line.split("|").slice(1, -1);
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Markdown Headings
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-sm sm:text-base font-bold text-text-primary mt-3 mb-1">
          {formatInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("#### ")) {
      flushList();
      elements.push(
        <h4 key={`h4-${i}`} className="text-xs sm:text-sm font-semibold text-text-primary mt-2 mb-1">
          {formatInline(line.slice(5))}
        </h4>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      flushList();
      elements.push(
        <div key={`bq-${i}`} className="border-l-2 border-accent pl-3 py-1 my-2 italic text-text-secondary bg-surface/40 rounded-r">
          {formatInline(line.slice(2))}
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(line.slice(2));
      continue;
    }

    // Ordered list (e.g. "1. ")
    const olMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(olMatch[2] || "");
      continue;
    }

    // Regular line / paragraph break
    flushList();
    if (line) {
      elements.push(
        <p key={`p-${i}`} className="my-1.5 text-text-secondary leading-relaxed">
          {formatInline(line)}
        </p>
      );
    }
  }

  flushList();
  flushTable();

  return <>{elements}</>;
}

/** Handles inline bold (**bold**) and inline code (`code`). */
function formatInline(str: string): React.ReactNode {
  const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded px-1.5 py-0.5 font-mono text-[11px] bg-surface-elevated border border-border-subtle text-accent font-medium"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function WorkspaceMessages({
  messages,
  activeModel,
  isThinking,
}: WorkspaceMessagesProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Auto-scroll to latest message on change or when thinking state changes
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleCopyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 space-y-6">
      {messages.map((msg) => {
        const isUser = msg.role === "user";

        return (
          <div
            key={msg.id}
            className={cn(
              "flex items-start gap-3 animate-in fade-in duration-150",
              isUser ? "ml-auto max-w-xl justify-end" : "w-full max-w-3xl"
            )}
          >
            {/* Assistant Avatar */}
            {!isUser && (
              <div className="size-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                E
              </div>
            )}

            <div className={cn("space-y-1.5 flex-1 min-w-0", isUser && "flex-initial")}>
              {/* Assistant Header Info */}
              {!isUser && (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-text-primary">
                      {activeModel.name}
                    </span>
                    <Badge variant={activeModel.category} size="sm" className="capitalize text-[10px]">
                      {activeModel.category}
                    </Badge>
                  </div>

                  <span className="text-[10px] font-mono text-text-muted">
                    {activeModel.provider}
                  </span>
                </div>
              )}

              {/* Message Content Bubble */}
              <div
                className={cn(
                  "p-4 rounded-[var(--radius-lg)] text-xs sm:text-sm leading-relaxed transition-colors",
                  isUser
                    ? "bg-surface border border-border-subtle text-text-primary rounded-tr-xs shadow-2xs whitespace-pre-wrap"
                    : "bg-surface/50 border border-border-subtle text-text-primary rounded-tl-xs shadow-2xs"
                )}
              >
                {isUser ? msg.content : <FormattedContent text={msg.content} />}
              </div>

              {/* Assistant Message Footer: Actions & Prototype Label */}
              {!isUser && (
                <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-text-muted">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      aria-label={copiedId === msg.id ? "Message copied" : "Copy response"}
                      className="inline-flex items-center gap-1 text-[10px] hover:text-text-primary transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="size-3 text-accent" />
                          <span className="text-accent font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="font-mono text-[10px] text-text-muted">
                    Simulated Demo Response
                  </span>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {isUser && (
              <div className="size-7 rounded-full bg-border-strong text-text-secondary flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 shadow-2xs">
                U
              </div>
            )}
          </div>
        );
      })}

      {/* Simulated Thinking / Loading State */}
      {isThinking && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 w-full max-w-3xl animate-in fade-in duration-150"
        >
          <div className="size-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            E
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-text-primary">
                {activeModel.name}
              </span>
              <Badge variant={activeModel.category} size="sm" className="capitalize text-[10px]">
                {activeModel.category}
              </Badge>
            </div>
            <div className="p-4 rounded-[var(--radius-lg)] bg-surface/40 border border-border-subtle rounded-tl-xs inline-flex items-center gap-2 text-xs text-text-secondary">
              <Sparkles className="size-3.5 text-accent animate-spin" />
              <span>Thinking and generating response via {activeModel.name}...</span>
              <span className="inline-flex gap-1 ml-1">
                <span className="size-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="size-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="size-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Anchor for automatic smooth scrolling */}
      <div ref={messagesEndRef} className="h-2" />
    </div>
  );
}
