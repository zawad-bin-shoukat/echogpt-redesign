import * as React from "react";
import { MessageSquare } from "lucide-react";
import type { Conversation } from "@/types";
import { cn, formatRelativeDate } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
}: ConversationItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={cn(
        "w-full flex items-start gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-xs text-left transition-colors group",
        "focus-visible:outline-2 focus-visible:outline-accent",
        isActive
          ? "bg-surface-hover text-text-primary font-medium border border-border-subtle shadow-2xs"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-hover/60 border border-transparent"
      )}
      aria-current={isActive ? "true" : undefined}
    >
      <MessageSquare
        className={cn(
          "size-3.5 shrink-0 mt-0.5 transition-colors",
          isActive ? "text-accent" : "text-text-muted group-hover:text-text-secondary"
        )}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <div className="truncate font-medium leading-snug">{conversation.title}</div>
        <div
          className="text-[10px] font-mono text-text-muted mt-0.5 truncate"
          suppressHydrationWarning
        >
          {formatRelativeDate(conversation.updatedAt)}
        </div>
      </div>
    </button>
  );
}
