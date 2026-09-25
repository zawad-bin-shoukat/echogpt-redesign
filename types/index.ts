// ============================================================
// Model Types
// ============================================================

/**
 * Capability categories derived from the verified EchoGPT model catalog.
 * These correspond to real groupings verified from api.echogpt.live/v1/model/active.
 */
export type ModelCategory =
  | "flagship"    // Broad multi-step reasoning and general intelligence
  | "coding"      // Software engineering, algorithmic synthesis, code review
  | "fast"        // Ultra-low latency, high-throughput everyday queries
  | "vision"      // Multimodal image and document understanding
  | "specialized" // Extended context, creative writing, structured analysis
  | "free";       // Native EchoGPT free-tier default assistant

/** Availability tier — derived from the verified API `type` and `freeAccess` fields. */
export type ModelTier = "free" | "pro";

/** Subscription tier level for access control. */
export type SubscriptionTier = "free" | "pro";

/**
 * A verified AI model entry from the EchoGPT catalog.
 * All fields derive from api.echogpt.live/v1/model/active or Chrome Web Store listing.
 * Do NOT add capability fields that were not verified from those sources.
 */
export interface Model {
  /** EchoGPT internal UUID from the live API. */
  id: string;
  /** Display name shown in the model selector (e.g. "GPT-5.6 Sol"). */
  name: string;
  /** API routing slug (e.g. "gpt-5.6-sol"). Verified from live API. */
  slug: string;
  /** Provider family label (e.g. "OpenAI", "Google", "DeepSeek"). */
  provider: string;
  /** Short description verified from live API `description` field. */
  description: string;
  /** Functional capability category for UI grouping. */
  category: ModelCategory;
  /** Access tier — free or pro — derived from verified API `freeAccess` field. */
  tier: ModelTier;
  /** URL to the model provider icon from EchoGPT S3 CDN. */
  iconUrl?: string;
  /**
   * Token context window if stated in the verified description.
   * Uses "1M" or "500K" strings rather than raw numbers for display.
   * Only populate if explicitly confirmed in verified API description.
   */
  contextWindow?: string;
  /**
   * Whether this model appears in the curated quick-select menu
   * (the 6 approved flagship models).
   */
  quickSelect?: boolean;
}

// ============================================================
// Chat / Conversation Types
// ============================================================

/** The originator of a chat message. */
export type MessageRole = "user" | "assistant" | "system";

/** Status of an assistant response in the streaming lifecycle. */
export type MessageStatus = "pending" | "streaming" | "complete" | "error";

/** A single message in a conversation thread. */
export interface Message {
  id: string;
  role: MessageRole;
  /** Markdown-formatted content rendered in the chat thread. */
  content: string;
  /** ISO 8601 timestamp of when the message was created. */
  createdAt: string;
  status: MessageStatus;
  /** The model slug that generated this response (for assistant messages). */
  modelSlug?: string;
}

/** A full conversation session containing an ordered message array. */
export interface Conversation {
  id: string;
  /** Short auto-generated title derived from the first user message. */
  title: string;
  /** ISO 8601 timestamp of the most recent message. */
  updatedAt: string;
  /** ISO 8601 timestamp when the conversation was created. */
  createdAt: string;
  messages: Message[];
  /** The active model slug for this conversation. */
  modelSlug: string;
  /** Whether the conversation is currently pinned to the sidebar top. */
  pinned?: boolean;
}

// ============================================================
// Subscription / Pricing Types
// ============================================================

/** Duration enum matching verified subscription durations from the EchoGPT API. */
export type SubscriptionDuration = 1 | 3 | 6 | 12; // months

/**
 * Verified subscription plan from api.echogpt.live/v1/subscription/active.
 * All amounts are exact values from the live API response.
 */
export interface SubscriptionPlan {
  id: string;
  /** Display name for this plan (e.g. "Monthly Pro", "Annual Pro"). */
  name: string;
  /** Duration in months as returned by the live API. */
  duration: SubscriptionDuration;
  /** Total USD amount as returned by the live API (e.g. "9.99"). */
  amount: string;
  /** Computed effective monthly rate for display (e.g. "$9.99 / mo"). */
  monthlyEquivalent: string;
  /** Percentage discount relative to monthly billing (0 for monthly plan). */
  discountPercent: number;
  /** Human-readable billing description. */
  billingDescription: string;
  /** Key differentiating benefit copy lines for pricing cards. */
  benefits: string[];
}

// ============================================================
// Settings Types
// ============================================================

/** Application color scheme preference. */
export type Theme = "light" | "dark" | "system";

/**
 * Persistent user settings stored in localStorage.
 * Controls appearance and workspace defaults.
 */
export interface UserSettings {
  theme: Theme;
  /** The slug of the currently selected model in the workspace. */
  activeModelSlug: string;
  /** Whether the conversation history sidebar is expanded. */
  sidebarOpen: boolean;
  /** Whether the extension page context injection is active. */
  extensionPageContextEnabled: boolean;
  /** UI density preference. */
  density: "comfortable" | "compact";
}

// ============================================================
// Quick Actions
// ============================================================

/**
 * A one-click starter action shown in the chat empty state and prompt composer.
 * These are UX scaffolds, not verified EchoGPT API features.
 */
export interface QuickAction {
  id: string;
  /** Short display label (e.g. "Summarize"). */
  label: string;
  /** Prompt text injected into the composer when clicked. */
  prompt: string;
  /** Lucide icon name for the action chip. */
  icon: string;
  /** Capability category for grouping. */
  category: "write" | "code" | "analyze" | "browse";
}

// ============================================================
// Extension Types
// ============================================================

/** Represents the simulated active webpage in the Chrome Extension demo. */
export interface SimulatedPage {
  title: string;
  url: string;
  /** Approximate word count of the simulated article body. */
  wordCount: number;
  /** Short description of the page for context display. */
  snippet: string;
}

/** The current state of the Chrome Extension side panel context. */
export interface ExtensionContextState {
  /** Whether page context injection is toggled on. */
  enabled: boolean;
  /** The simulated page currently "being browsed". */
  activePage: SimulatedPage | null;
  /** Whether text is currently highlighted on the page. */
  hasSelection: boolean;
  /** The selected text content (if any). */
  selectedText?: string;
}

// ============================================================
// FAQ Types
// ============================================================

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: "general" | "models" | "pricing" | "extension";
}
