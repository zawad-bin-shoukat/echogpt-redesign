import type { FaqItem } from "@/types";

/**
 * Verified FAQ items based on official EchoGPT website, Chrome Web Store listing,
 * and the internship portfolio prototype architecture.
 * Sourced directly from docs/PRODUCT_BRIEF.md.
 */
export const VERIFIED_FAQS: FaqItem[] = [
  {
    id: "faq-what-is-echogpt",
    question: "What is EchoGPT?",
    answer:
      "EchoGPT is a unified multi-model AI productivity workspace and browser companion developed by AppifyDevs. Rather than locking users into a single AI provider, it aggregates 40+ leading foundation models (including GPT-5.6 Sol, Gemini 3.8 Flash, DeepSeek V4 Pro, Kimi K2.7, and Grok 4.6) into a single web application and Chrome extension side panel.",
    category: "general",
  },
  {
    id: "faq-how-workspace-works",
    question: "How does the multi-model workspace work?",
    answer:
      "In the EchoGPT workspace, you can select and converse with any supported model from a single prompt interface. You can switch models on the fly, run objective side-by-side model comparisons on the same query to inspect differences in reasoning, and organize conversations across sessions without provider lock-in.",
    category: "models",
  },
  {
    id: "faq-api-keys",
    question: "Do I need separate API keys?",
    answer:
      "No. EchoGPT provides unified access through its platform gateway. You do not need to register developer accounts, input personal API keys, manage separate provider credit balances, or worry about rate limits across different AI providers.",
    category: "general",
  },
  {
    id: "faq-switch-models-in-conversation",
    question: "Can I switch models during a conversation?",
    answer:
      "Yes. EchoGPT supports continuous session memory. You can initiate a task with a high-capacity reasoning model like GPT-5.6 Sol, switch to a code specialist like DeepSeek V4 Pro for syntax verification, and synthesize outputs with a high-speed model like Gemini 3.8 Flash without losing conversation history.",
    category: "models",
  },
  {
    id: "faq-what-extension-does",
    question: "What does the Chrome extension do?",
    answer:
      "The EchoGPT Chrome extension uses the native Chrome Side Panel API to dock an AI assistant alongside any webpage. It enables one-click structured page summaries, instant explanation of highlighted text, and DOM context injection directly into your browsing flow.",
    category: "extension",
  },
  {
    id: "faq-without-leaving-page",
    question: "Can I use EchoGPT without leaving the current webpage?",
    answer:
      "Yes. Because the extension runs inside the Chrome Side Panel rather than an overlay popover or separate browser tab, you can read articles, inspect documentation, and interact with the AI assistant concurrently using the global shortcut (⌘⇧E on macOS or Ctrl+Shift+E on Windows/Linux).",
    category: "extension",
  },
  {
    id: "faq-real-chrome-extension",
    question: "Is the extension a real Chrome extension?",
    answer:
      "The official EchoGPT Chrome Extension is published on the Google Chrome Web Store (v1.0.5 by AppifyDevs). In this portfolio project, we also provide an interactive in-browser simulator at /extension so reviewers and users can explore the side-panel experience without needing to install an extension file.",
    category: "extension",
  },
  {
    id: "faq-demo-checkout",
    question: "Is the checkout / payment flow functional in this demo?",
    answer:
      "No. This website and application is a frontend engineering prototype created for an internship assignment evaluation. All subscription plans, model interactions, and checkout buttons link directly to the interactive workspace demonstration without processing real financial transactions.",
    category: "pricing",
  },
];
