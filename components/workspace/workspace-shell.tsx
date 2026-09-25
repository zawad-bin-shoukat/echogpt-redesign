"use client";

import * as React from "react";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceEmptyState } from "./workspace-empty-state";
import { WorkspaceMessages } from "./workspace-messages";
import { WorkspaceComposer } from "./workspace-composer";
import { SAMPLE_CONVERSATIONS } from "@/lib/mock/sample-conversations";
import { VERIFIED_MODELS } from "@/lib/mock/verified-models";
import { generateSimulatedResponse } from "@/lib/mock/simulation-responses";
import type { Conversation, Message, Model } from "@/types";

export function WorkspaceShell() {
  const [conversations, setConversations] =
    React.useState<Conversation[]>(SAMPLE_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = React.useState<
    string | null
  >(null);

  const [activeModel, setActiveModel] = React.useState<Model>(() => {
    return (
      VERIFIED_MODELS.find((m) => m.slug === "gpt-5.6-sol") ||
      VERIFIED_MODELS[0]!
    );
  });

  const [composerValue, setComposerValue] = React.useState("");
  const [isThinking, setIsThinking] = React.useState(false);
  const [isOpenMobile, setIsOpenMobile] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Clean up any pending thinking timers on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Active conversation object
  const activeConversation = React.useMemo(() => {
    if (!activeConversationId) return null;
    return conversations.find((c) => c.id === activeConversationId) || null;
  }, [activeConversationId, conversations]);

  // Handle conversation selection from sidebar
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    const selected = conversations.find((c) => c.id === id);
    if (selected?.modelSlug) {
      const matchedModel = VERIFIED_MODELS.find(
        (m) => m.slug === selected.modelSlug
      );
      if (matchedModel) {
        setActiveModel(matchedModel);
      }
    }
  };

  // Handle "New Chat" action
  const handleNewChat = () => {
    setActiveConversationId(null);
    setComposerValue("");
    setIsThinking(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  // Handle model change from header selector
  const handleSelectModel = (newModel: Model) => {
    setActiveModel(newModel);
    if (activeConversationId) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId ? { ...c, modelSlug: newModel.slug } : c
        )
      );
    }
  };

  // Primary message submission pipeline
  const handleSendPrompt = (promptText: string) => {
    const text = promptText.trim();
    if (!text || isThinking) return;

    // Clear composer input immediately
    setComposerValue("");

    const now = new Date().toISOString();
    const userMessage: Message = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      content: text,
      createdAt: now,
      status: "complete",
    };

    let targetConvId = activeConversationId;

    if (!targetConvId) {
      // Create new conversation
      const newId = `conv-${Date.now()}`;
      const title =
        text.length > 36 ? `${text.slice(0, 36).trim()}…` : text;

      const newConversation: Conversation = {
        id: newId,
        title,
        modelSlug: activeModel.slug,
        createdAt: now,
        updatedAt: now,
        messages: [userMessage],
      };

      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversationId(newId);
      targetConvId = newId;
    } else {
      // Append user message to existing active conversation
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              updatedAt: now,
              messages: [...c.messages, userMessage],
            };
          }
          return c;
        })
      );
    }

    // Trigger local simulated assistant response
    setIsThinking(true);
    const thinkingModel = activeModel;

    timerRef.current = setTimeout(() => {
      const responseData = generateSimulatedResponse(text, thinkingModel);
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-a`,
        role: "assistant",
        content: responseData.content,
        modelSlug: thinkingModel.slug,
        createdAt: new Date().toISOString(),
        status: "complete",
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === targetConvId) {
            return {
              ...c,
              updatedAt: new Date().toISOString(),
              messages: [...c.messages, assistantMessage],
            };
          }
          return c;
        })
      );

      setIsThinking(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }, 600);
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
          currentTitle={
            activeConversation ? activeConversation.title : "New Conversation"
          }
          activeModel={activeModel}
          onSelectModel={handleSelectModel}
          onOpenMobileSidebar={() => setIsOpenMobile(true)}
        />

        {/* Workspace Center Content (Empty state OR Conversation transcript) */}
        <main
          id="workspace-main"
          className="flex-1 overflow-y-auto flex flex-col justify-between"
        >
          {!activeConversation || activeConversation.messages.length === 0 ? (
            <WorkspaceEmptyState
              activeModel={activeModel}
              onSelectPrompt={handleSendPrompt}
            />
          ) : (
            <WorkspaceMessages
              messages={activeConversation.messages}
              activeModel={activeModel}
              isThinking={isThinking}
            />
          )}

          {/* Workspace Bottom Composer */}
          <WorkspaceComposer
            value={composerValue}
            onChange={setComposerValue}
            onSubmit={() => handleSendPrompt(composerValue)}
            activeModel={activeModel}
            isThinking={isThinking}
            textareaRef={textareaRef}
          />
        </main>
      </div>
    </div>
  );
}
