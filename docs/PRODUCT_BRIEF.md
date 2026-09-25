# EchoGPT Product Brief & Architecture Strategy

**Document Version:** 1.0  
**Phase:** 1 — Research & Product Definition  
**Status:** Complete  
**Authors:** Senior Frontend Implementation Engineer  

---

## 1. Executive Product Overview

### 1.1 What EchoGPT Is
**EchoGPT** is a unified multi-model AI productivity workspace and browser companion developed by AppifyDevs. Rather than locking users into a single AI provider, EchoGPT serves as an intelligent aggregation platform that enables users to access, converse with, and directly compare leading frontier and open-weight AI models through:
1. **A Web Application Workspace:** A unified chat, model comparison, and specialized productivity studio interface.
2. **A Browser Extension (Chrome Side Panel):** An in-context productivity assistant integrated directly into the browser workflow via the Chrome Side Panel API (`Command+Shift+E` / `Ctrl+Shift+E`).
3. **A Marketing & Discovery Presence:** A product landing experience explaining multi-model value propositions, pricing tiers, and browser capabilities.

### 1.2 Target Audience & Personas
* **Knowledge Workers & Professionals:** Draft emails, synthesize complex technical documentation, rephrase writing, and compare outputs across model providers.
* **Students & Researchers:** Summarize dense academic papers, extract key takeaways from web sources without leaving their tab, and verify explanations.
* **Developers & Power Users:** Switch between coding-specialized models (e.g. Kimi Code, DeepSeek, Qwen) and general reasoning models, comparing syntax and logic side by side.
* **Everyday Web Browsers:** Get instant explanations for highlighted terms, translate passages, and ask questions about active web pages.

### 1.3 Core Value Proposition
* **One Subscription, Multiple Frontier Models:** Eliminates the fatigue and cost of maintaining multiple $20/month subscriptions across individual AI providers.
* **In-Context Web Intelligence:** Zero-context-switching assistance via the Chrome Side Panel with page-level context injection and highlighted-text explanation.
* **Objective Model Comparison:** Direct multi-model querying (`/compare`) allowing users to assess response quality, latency, and reasoning perspectives in parallel.

---

## 2. Verified AI Model Ecosystem

Based on empirical inspection of the production API (`https://api.echogpt.live/v1/model/active`) and web application bundles:

### Category A: Models Verified From Live Production EchoGPT API & App
EchoGPT actively manages 41 model endpoints classified into **Free** and **Advanced** access tiers:

| Provider / Family | Verified Model Names & Slugs | Tier / Access | Verified Attributes / Specialization |
| :--- | :--- | :--- | :--- |
| **OpenAI Series** | `GPT-5.4`, `GPT-5.5`, `GPT-5.6 Sol`, `GPT-5.6 Luna` | Advanced (Free promo) | General reasoning, everyday versatility, lightweight fast tier (`Luna`) |
| **Google Gemini** | `Gemini 3.7 Flash`, `Gemini 3.8 Flash` | Advanced (Free promo) | Fast multimodal responses, prompt caching, long-context support |
| **DeepSeek** | `DeepSeek V4 Pro`, `DeepSeek V4 Flash`, `DeepSeek V4 Flash Fast`, `DeepSeek V4 Flash Vision` | Advanced & Free | Code & math reasoning, ultra-low latency (`Flash Fast`), image understanding (`Vision`) |
| **xAI Grok** | `Grok 4.5`, `Grok 4.6` | Advanced | 500K context, conversational wit, current-events awareness, instruction following |
| **Alibaba Qwen** | `Qwen 3.6 Plus`, `Qwen 3.7 Plus`, `Qwen 3.7 Max`, `Qwen 3.8 Flash`, `Qwen 3.8 Max`, `Qwen 3.8 Max 0902`, `Qwen 3.8 27B` | Advanced | Multi-step reasoning over long contexts, multilingual strength |
| **Moonshot Kimi** | `Kimi K2.7 Code`, `Kimi K2.7 Code HighSpeed`, `Kimi K3` | Advanced | Software engineering, algorithmic debugging, high-speed coding |
| **Meta Muse** | `Muse Spark 1.2`, `Muse Spark 1.3`, `Muse Spark 1.3 Contributor` | Advanced | 1M token context, creative writing, open-ended discussions |
| **Thinking Machines** | `Inkling`, `Inkling Small` | Advanced | Deliberate step-by-step reasoning, clean structured explanations |
| **Zhipu GLM** | `GLM-5.2`, `GLM-5.2 Fast`, `GLM-5.3`, `GLM-5.3 Flash` | Advanced | Multilingual reasoning, low-latency live interactive chat |
| **StepFun** | `Step 3.5 Flash`, `Step 3.7 Flash` | Advanced | 1M token context, low-cost high-volume queries |
| **Xiaomi MiMo** | `MiMo V2.5`, `MiMo V2.5 Pro` | Advanced | Ultra-efficient everyday assistance |
| **Tencent Hunyuan**| `Tencent Hy3`, `Tencent Hy4 Preview` | Advanced (Paid only) | 1M context long-document analysis |
| **Nvidia** | `Nemotron 3 Ultra` (`nemotron-3-ultra-550b`) | Free | Massive parameter open-weight reasoning |
| **Meituan / MiniMax**| `LongCat 2.0`, `MiniMax M3` | Free / Advanced | Extended context processing, cost-effective conversational quality |
| **EchoGPT Native** | `EchoGPT` (`echogpt`) | Free (Default) | General assistant, balanced speed and response formatting |

### Category B: Models / Capabilities Documented in Historical or Product Materials
* **Legacy Models:** GPT-4o, GPT-3.5-Turbo, Claude 3.5 Sonnet, Claude 3 Opus, Mistral Large, Llama 3 70B (frequently used in benchmark mockups and competitor comparisons).
* *Note on Model Strategy for Assignment:* In our frontend implementation, we should showcase a curated, recognizable selection combining frontier favorites (GPT, Claude, Gemini, DeepSeek) with EchoGPT's native multi-model catalog.

---

## 3. Verified Pricing & Subscription Architecture

Inspected from production endpoint `https://api.echogpt.live/v1/subscription/active`:

| Plan Tier | Duration | Price (USD) | Effective Monthly | Documented Entitlements |
| :--- | :--- | :--- | :--- | :--- |
| **Free Tier** | Ongoing | $0.00 | $0.00 | Access to basic models, daily query limit, standard speed, standard community support. |
| **Monthly Pro** | 1 Month | $9.99 | $9.99 / mo | Unlimited chats, access to advanced models, full web context in extension, fast response speed. |
| **Quarterly Pro**| 3 Months | $29.99 | $9.99 / mo | 3-month continuous Pro billing, priority model routing, model comparison tool. |
| **Half-Yearly Pro**| 6 Months | $59.99 | $9.99 / mo | 6-month continuous Pro billing, team connectors access. |
| **Annual Pro** | 12 Months | $99.99 | **$8.33 / mo** *(~17% savings)* | Access all Pro features for full year with annual discount, early access to new models. |

---

## 4. Verified Chrome Extension Specifications

Data verified from the official Google Chrome Web Store listing (Version 1.0.5, Developer: AppifyDevs / `mdsami@echogpt.live`):
* **Architecture:** Chrome Extension Manifest V3 utilizing the **Chrome Side Panel API** (allowing concurrent web browsing and side-by-side interaction rather than an intrusive modal or disappearing popover).
* **Keyboard Shortcuts:**
  * **macOS:** `Command + Shift + E`
  * **Windows / Linux:** `Ctrl + Shift + E`
* **Core Workflows:**
  1. *Summarize Any Page:* One-click extraction and structured summary of active tab HTML/text (articles, docs, papers).
  2. *Explain Selected Text:* User highlights text on an active web page; right-click or shortcut prompts instant analysis without copy-pasting into another tab.
  3. *Page Context Toggle:* Configurable switch enabling the AI assistant to reference the active DOM/text as background context.
  4. *Multi-Model Switching:* Quick dropdown inside the side panel to toggle the active model on the fly.
  5. *Persistence & Auth:* Token-based authentication synced with the EchoGPT web platform via Google OAuth or Email credentials; local session storage for offline chat persistence.

---

## 5. Ecosystem Architecture & Product Strategy

The redesign connects three essential touchpoints into a unified, high-polish product experience:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ECHOGPT DESIGN SYSTEM                           │
│  Typography (Geist) · Curated Tokens · Subtle Borders · Micro-Motion   │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
    ┌───────────────┴──────────────┐ ┌───────────────┴──────────────┐
    │     MARKETING / LANDING      │ │        WEB CHAT WORKSPACE    │
    │  • Hero & Multi-Model Visual │ │  • Collapsible History Drawer│
    │  • Live Interactive Preview  │ │  • Dynamic Model Switcher    │
    │  • Feature Bento Grid        │ │  • Rich Markdown/Code Output │
    │  • Side-by-Side Comparison   │ │  • Prompt Suggestions & Bar  │
    │  • Transparent Pricing Cards │ │  • Settings & Model Limits   │
    │  • Extension Spotlight & CTA │ │  • Empty, Loading, Error UI  │
    └──────────────────────────────┘ └──────────────────────────────┘
                    │                                │
                    └───────────────┬────────────────┘
                                    │
                    ┌───────────────┴──────────────┐
                    │     CHROME EXTENSION CONCEPT │
                    │  • Chrome Side Panel Canvas  │
                    │  • Webpage Context Bar       │
                    │  • Instant Action Pills      │
                    │  • Compact Chat Thread       │
                    │  • Global Shortcut Display   │
                    └──────────────────────────────┘
```

### 5.1 Design Personality
* **Premium Utility:** Sophisticated, minimalist, dark/light harmonious color palette. Clean neutral grays (`zinc-900`/`zinc-100`) with precise emerald/indigo accenting.
* **Focused & Distraction-Free:** Generous negative space, crisp typography hierarchy, zero decorative clutter or gratuitous glowing blobs.
* **High Perceived Velocity:** Smooth state transitions, snappy modal openings, clear skeleton loaders, and interactive feedback.

---

## 6. Feature Prioritization Matrix

### MUST HAVE (Core Assignment Requirements)
- [x] **Complete Design Token System:** Semantic colors (background, foreground, card, muted, border, primary accent), typography scale, radius, elevation.
- [x] **Marketing Landing Page:**
  - Modern header with brand logo, nav links, and dual CTAs ("Try Free", "Add to Chrome").
  - Value-packed Hero communicating multi-model aggregation and browser integration.
  - Interactive multi-model preview component demonstrating real-time model switching.
  - Comprehensive feature bento grid (Multi-Model Chat, Compare Mode, Web Context, Security).
  - Model directory & capability comparison table.
  - Transparent pricing section featuring verified plans (Free, Monthly $9.99, Annual $99.99).
  - Chrome Extension spotlight section with live shortcut badges (`⌘⇧E`).
  - Interactive FAQ accordion & footer with social/legal links.
- [x] **Web App Chat Workspace:**
  - Collapsible, searchable conversation sidebar with session grouping (Today, Previous 7 Days, Older).
  - Rich model selector dropdown displaying model status, provider badge, and context limits.
  - Chat thread supporting Markdown rendering, syntax-highlighted code blocks, copy action, and retry action.
  - Multi-line auto-expanding prompt composer with quick prompt suggestions, submit button, and clear actions.
  - Comprehensive state handling: Pristine Empty State, Typing/Streaming State, Error/Retry State.
- [x] **Chrome Extension Interactive Simulator:**
  - Dedicated interactive preview frame mimicking the Chrome Side Panel at realistic dimensions (380px–420px width).
  - Simulated active webpage context header ("Viewing: docs.nextjs.org/...").
  - Fast context actions: "Summarize Page", "Explain Key Terms", "Generate Action Items".
  - Compact multi-model selector and synchronized conversation thread.
- [x] **Flawless Responsiveness:** Seamless layout adaptation across mobile (320px–430px), tablet (768px), laptop (1024px), and ultra-wide screens (1440px+).
- [x] **Accessibility:** Keyboard navigable controls, focus visible rings, WCAG AA contrast, proper ARIA labels.

### SHOULD HAVE (High Frontend Polish & Differentiation)
- [ ] **Interactive Model Compare Mode:** Split-pane interface in the web app allowing two models to respond to the same prompt concurrently.
- [ ] **System Prompt & Parameter Drawer:** Slide-over modal to customize temperature, system persona, and context window size.
- [ ] **Local Storage Persistence:** Preserving user chats, active model selection, and mock settings between page refreshes.
- [ ] **Framer Motion Micro-Transitions:** Smooth layout morphing between tabs, accordion collapses, and subtle hover indicators.

### NICE TO HAVE (Post-Core Extensions)
- [ ] Export conversation as Markdown or PDF.
- [ ] Simulated token counter and latency timer in response headers.
- [ ] Sound feedback toggle for completion.

---

## 7. Open Design Decisions Requiring Lead Feedback
1. **Primary Navigation Strategy:** Should the Landing Page, Web App, and Chrome Extension Simulator live as distinct Next.js routes (`/`, `/app`, `/extension`) accessible via an omnipresent product switcher header, or should the app provide an in-page tabbed switcher? *(Recommendation: Route-based with unified top bar)*.
2. **Model Catalog Framing:** Should we present the verified 41-model catalog or a curated subset of 8–10 flagship models (OpenAI GPT-4o / GPT-5, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5/3.8 Flash, DeepSeek V4, Meta Llama 3) to optimize user comprehension? *(Recommendation: Curated flagship set with search/filter)*.
