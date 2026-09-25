"use client";

import * as React from "react";
import Link from "next/link";
import {
  Plus,
  Settings,
  X,
  Laptop,
  Home,
  User,
} from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button, IconButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConversationItem } from "./conversation-item";
import type { Conversation } from "@/types";
import { cn } from "@/lib/utils";

interface WorkspaceSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function WorkspaceSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  isOpenMobile,
  onCloseMobile,
}: WorkspaceSidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="workspace-sidebar"
        aria-label="Workspace sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-surface border-r border-border-subtle flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 md:z-auto",
          isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Top Header & Brand */}
        <div className="p-4 border-b border-border-subtle flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <BrandLogo />
            <div className="flex items-center gap-1">
              <Badge variant="flagship" size="sm">
                Pro
              </Badge>
              {/* Mobile Close Button */}
              <div className="md:hidden">
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label="Close sidebar"
                  onClick={onCloseMobile}
                >
                  <X className="size-4 text-text-secondary" />
                </IconButton>
              </div>
            </div>
          </div>

          {/* New Chat Primary Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full justify-start font-medium shadow-2xs"
            leftIcon={<Plus className="size-4 text-accent" />}
          >
            New Chat
          </Button>
        </div>

        {/* Conversation Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-none">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-text-muted font-semibold">
            Recent Conversations
          </div>

          <div className="space-y-0.5">
            {conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isActive={activeConversationId === conv.id}
                onSelect={(id) => {
                  onSelectConversation(id);
                  onCloseMobile();
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Utility Area */}
        <div className="p-3 border-t border-border-subtle bg-surface/80 flex flex-col gap-2">
          {/* Quick Ecosystem Jump Links */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius-md)] text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <Home className="size-3.5 text-text-muted" />
              <span>Overview</span>
            </Link>
            <Link
              href="/extension"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius-md)] text-xs text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <Laptop className="size-3.5 text-sky-400" />
              <span>Extension</span>
            </Link>
          </div>

          <div className="h-px bg-border-subtle my-1" />

          {/* User Profile & Actions Row */}
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="size-7 rounded-full bg-accent-subtle border border-accent/20 flex items-center justify-center text-accent text-xs font-semibold shrink-0">
                <User className="size-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-text-primary truncate">
                  Pro Workspace
                </div>
                <div className="text-[10px] font-mono text-text-muted truncate">
                  41 models unlocked
                </div>
              </div>
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
              <ThemeToggle />
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Workspace settings (demo)"
                onClick={() => {}}
                className="size-8 text-text-muted hover:text-text-primary"
              >
                <Settings className="size-3.5" />
              </IconButton>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
