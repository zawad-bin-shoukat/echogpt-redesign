"use client";

import * as React from "react";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceEmptyState } from "./workspace-empty-state";
import { WorkspaceComposer } from "./workspace-composer";
import { SAMPLE_CONVERSATIONS } from "@/lib/mock/sample-conversations";
import { VERIFIED_MODELS } from "@/lib/mock/verified-models";
import type { Conversation, Model } from "@/types";
import { Badge } from "@/components/ui/badge";

export function WorkspaceShell() {
  const [conversations] = React.useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null);

  const [activeModel, setActiveModel] = React.useState<Model>(() => {
    return (
      VERIFIED_MODELS.find((m) => m.slug === "gpt-5.6-sol") ||
      VERIFIED_MODELS[0]
    );
  });

  const [composerValue, setComposerValue] = React.useState("");
  const [isOpenMobile, setIsOpenMobile] = React.useState(false);

  // Active conversation object
  const activeConversation = React.useMemo(() => {
    if (!activeConversationId) return null;
    return conversations.find((c) => c.id === activeConversationId) || null;
  }, [activeConversationId, conversations]);

  // Handle conversation selection
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    const selected = conversations.find((c) => c.id === id);
    if (selected?.modelSlug) {
      const matchedModel = VERIFIED_MODELS.find((m) => m.slug === selected.modelSlug);
      if (matchedModel) {
        setActiveModel(matchedModel);
      }
    }
  };

  const handleNewChat = () => {
    setActiveConversationId(null);
    setComposerValue("");
  };

  const handleSubmit = () => {
    // In Phase 5A this is local prototype state
    if (!composerValue.trim()) return;
    setComposerValue("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-text-primary">
      {/* 1. Workspace Sidebar */}
      <WorkspaceSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        isOpenMobile={isOpenMobile}
        onCloseMobile={() => setIsOpenMobile(false)}
      />

      {/* 2. Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-background">
        {/* Workspace Top Header */}
        <WorkspaceHeader
          currentTitle={activeConversation ? activeConversation.title : "New Conversation"}
          activeModel={activeModel}
          onSelectModel={setActiveModel}
          onOpenMobileSidebar={() => setIsOpenMobile(true)}
        />

        {/* Workspace Center Content (Empty state or Conversation view) */}
        <main className="flex-1 overflow-y-auto flex flex-col justify-between">
          {!activeConversation ? (
            <WorkspaceEmptyState
              activeModel={activeModel}
              onSelectPrompt={(prompt) => setComposerValue(prompt)}
            />
          ) : (
            <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 space-y-6 animate-in fade-in duration-150">
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "ml-auto max-w-xl justify-end" : "max-w-2xl"
                  }`}
                >
                  {msg.role !== "user" && (
                    <div className="size-7 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      E
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1 min-w-0">
                    {msg.role !== "user" && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-text-primary">
                          {activeModel.name}
                        </span>
                        <Badge variant={activeModel.category} size="sm" className="capitalize">
                          {activeModel.category}
                        </Badge>
                      </div>
                    )}

                    <div
                      className={`rounded-[var(--radius-lg)] p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-surface border border-border-subtle text-text-primary rounded-tr-xs"
                          : "bg-surface/60 border border-border-subtle text-text-secondary rounded-tl-xs"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="size-7 rounded-full bg-border-strong text-text-secondary flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                      U
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Workspace Bottom Composer */}
          <WorkspaceComposer
            value={composerValue}
            onChange={setComposerValue}
            onSubmit={handleSubmit}
            activeModel={activeModel}
          />
        </main>
      </div>
    </div>
  );
}
