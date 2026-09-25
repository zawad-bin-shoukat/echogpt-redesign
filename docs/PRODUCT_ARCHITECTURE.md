# EchoGPT Product Architecture Specification

**Version:** 1.0  
**Phase:** 2 — Product Architecture & Design Specification  
**Status:** Approved for Implementation  
**Target Platform:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4  

---

## 1. Executive Product Architecture

EchoGPT is an integrated multi-model AI productivity platform and browser companion. The architecture is structured around three interconnected experiences sharing a single design system, type system, and mock data foundation:

1. **EchoGPT Marketing Landing Page (`/`):** High-converting, educational product showcase featuring value propositions, verified model directory, live interactive model preview, pricing tiers, and extension spotlight.
2. **EchoGPT Web App Workspace (`/app`):** Full-screen, high-performance conversational AI workspace with a collapsible session drawer, categorized model switcher, markdown/code rendering, quick prompt suggestions, and settings drawer.
3. **EchoGPT Chrome Extension Concept (`/extension`):** Interactive browser simulator rendering an authentic Chrome Side Panel experience (`⌘⇧E` / `Ctrl+Shift+E`), equipped with page context inspection, page summarization, highlighted text explanation, and compact chat.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           GLOBAL NAVIGATION & SHELL                          │
│     Brand Logo · Experience Switcher (Landing / App / Extension) · Theme     │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│  LANDING PAGE    │         │  WEB APP (CHAT)  │         │  EXTENSION DEMO  │
│  Route: /        │         │  Route: /app     │         │  Route: /ext     │
├──────────────────┤         ├──────────────────┤         ├──────────────────┤
│ • Hero & Value   │         │ • Session Sidebar│         │ • Browser Canvas │
│ • Model Preview  │         │ • Model Selector │         │ • Side Panel     │
│ • Bento Features │         │ • Chat Thread    │         │ • Page Context   │
│ • Pricing Plans  │         │ • Prompt Bar     │         │ • Quick Actions  │
│ • Extension CTA  │         │ • Compare Mode   │         │ • Text Explain   │
│ • FAQ & Footer   │         │ • Settings Modal │         │ • Settings Pane  │
└──────────────────┘         └──────────────────┘         └──────────────────┘
         │                             │                             │
         └─────────────────────────────┼─────────────────────────────┘
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                       SHARED ARCHITECTURE FOUNDATION                         │
│  • Design Tokens & CSS Variables (`app/globals.css`)                         │
│  • Reusable UI Primitives (`components/ui/*`)                                │
│  • Verified Model Catalog & Data Models (`lib/mock/models.ts`, `types/*`)    │
│  • Mock State Store & LocalStorage Adapter (`lib/store/*`)                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Route Architecture

The project employs Next.js App Router with dedicated semantic routes:

| Route Path | Experience | Primary Responsibility | Layout Type |
| :--- | :--- | :--- | :--- |
| `/` | Marketing Landing Page | Product narrative, multi-model education, pricing, extension preview, conversion. | Standard scrolling document with sticky navbar and rich footer. |
| `/app` | Web Chat Workspace | Dual-column AI workspace, conversation history, model switching, prompt execution. | Full viewport height (`h-screen overflow-hidden`), collapsible sidebar. |
| `/extension` | Chrome Extension Concept | Interactive simulation of a browser window with active page and Chrome Side Panel. | Split-pane browser frame (`h-screen overflow-hidden`) with responsive viewport. |

---

## 3. Page Hierarchy & Navigation Structure

### 3.1 Shared Application Shell
To ensure human reviewers and end users experience the three touchpoints as **one cohesive product ecosystem**, a unified global shell is provided:
* **Global Product Switcher:** A lightweight, persistent top header present across all routes offering one-click navigation between:
  * 🌐 **Overview (Landing Page)**
  * 💬 **AI Workspace (`/app`)**
  * 🧩 **Chrome Extension (`/extension`)**
  * 🌗 **Theme Mode Toggle (Light / Dark)**
* **Contextual Persistence:** Switching between the Web App and the Extension Simulator shares the active model state and session data through a lightweight client store.

### 3.2 Navigation Map
```
[Global Header]
  ├─ Brand: EchoGPT (links to /)
  ├─ Nav Pills:
  │   ├─ "Overview" (/)
  │   ├─ "Web Workspace" (/app)
  │   └─ "Chrome Extension" (/extension)
  └─ Actions:
      ├─ Theme Toggle (Light/Dark)
      ├─ "Launch App" CTA button (on Landing)
      └─ "Sign In" / User Avatar Mock
```

---

## 4. Component Boundaries & Directory Structure

```text
echogpt-assignment/
├── app/
│   ├── layout.tsx                     # Root HTML shell, Geist fonts, Theme provider
│   ├── globals.css                    # Tailwind v4 theme, tokens, CSS variables
│   ├── page.tsx                       # Landing page route (/)
│   ├── app/
│   │   └── page.tsx                   # Web Chat workspace route (/app)
│   └── extension/
│       └── page.tsx                   # Chrome Extension simulation route (/extension)
│
├── components/
│   ├── ui/                            # Atomic, zero-dependency design system primitives
│   │   ├── button.tsx                 # Button (primary, secondary, outline, ghost, destructive)
│   │   ├── input.tsx                  # Text input with prefix/suffix slots
│   │   ├── textarea.tsx               # Auto-expanding prompt textarea
│   │   ├── badge.tsx                  # Status & category pills (Free, Pro, Flagship, Fast)
│   │   ├── card.tsx                   # Surface container with refined borders
│   │   ├── modal.tsx                  # Accessible backdrop & dialog container
│   │   ├── dropdown.tsx               # Accessible click/hover dropdown
│   │   ├── tabs.tsx                   # Pill and underline tab switchers
│   │   ├── tooltip.tsx                # Accessible hover info popup
│   │   ├── scroll-area.tsx            # Custom styled slim scrollbar container
│   │   └── switch.tsx                 # Toggle switch for settings/context
│   │
│   ├── shared/                        # Shell components used across pages
│   │   ├── global-header.tsx          # Product switcher & brand header
│   │   ├── model-badge.tsx            # Model provider icon & capability pill
│   │   └── theme-toggle.tsx           # Dark/light mode switcher
│   │
│   ├── landing/                       # Landing page modular sections
│   │   ├── hero-section.tsx           # Value prop headline, CTA cluster, key stats
│   │   ├── live-model-preview.tsx     # Interactive hero component: query test with models
│   │   ├── bento-features.tsx         # 4-card feature grid (Multi-model, Side Panel, Speed, Security)
│   │   ├── model-catalog-section.tsx  # Categorized model showcase & capability cards
│   │   ├── extension-spotlight.tsx    # Chrome extension visual callout with shortcut badges
│   │   ├── pricing-section.tsx        # Verified plans (Free, Monthly $9.99, Annual $99.99)
│   │   ├── faq-section.tsx            # Accessible accordion of common questions
│   │   └── landing-footer.tsx         # Ecosystem links, legal, newsletter, credits
│   │
│   ├── chat/                          # Web app workspace components
│   │   ├── chat-shell.tsx             # Dual-pane flex layout manager
│   │   ├── chat-sidebar.tsx           # Collapsible history drawer with search & new chat
│   │   ├── chat-header.tsx            # Current model selector trigger & action toolbar
│   │   ├── chat-thread.tsx            # Message list with auto-scroll manager
│   │   ├── chat-message.tsx           # User / Assistant message bubble with copy & retry
│   │   ├── code-block.tsx             # Syntax block with copy button and language tag
│   │   ├── prompt-composer.tsx        # Auto-resizing input, quick action pills, submit button
│   │   ├── model-selector-modal.tsx   # Categorized model modal with search & details
│   │   ├── compare-panel.tsx          # Dual-model side-by-side comparison mode
│   │   ├── chat-empty-state.tsx       # Welcoming starter suggestions and capabilities
│   │   └── chat-settings-modal.tsx    # Parameter controls (Temperature, Context, System Prompt)
│   │
│   └── extension/                     # Chrome Extension simulator components
│       ├── browser-mockup-frame.tsx   # Realistic browser chrome (tabs, URL bar, side-panel toggle)
│       ├── simulated-webpage.tsx      # Mock active webpage with highlightable text & article
│       ├── side-panel-shell.tsx       # Accurate 380px Chrome Side Panel frame
│       ├── context-status-bar.tsx     # "Page Context: 1,420 words active" indicator
│       ├── quick-action-toolbar.tsx   # "Summarize Page", "Explain Highlight", "Action Items"
│       ├── compact-chat-thread.tsx    # High-density message stream designed for sidebar widths
│       └── extension-settings.tsx     # Side-panel preferences & API endpoint configuration
│
├── lib/
│   ├── types/                         # TypeScript interfaces & types
│   │   ├── model.ts                   # Model definition, category, tier, capabilities
│   │   ├── chat.ts                    # Message, conversation, session, role
│   │   ├── subscription.ts            # Plan, duration, pricing, benefits
│   │   └── extension.ts               # Browser context, active tab, selection
│   │
│   ├── mock/                          # Verified data models
│   │   ├── verified-models.ts         # 41 verified models from api.echogpt.live
│   │   ├── curated-models.ts          # Curated flagship subset for quick selection
│   │   ├── sample-conversations.ts    # Realistic mock chat threads
│   │   ├── verified-pricing.ts        # Exact verified subscription plans ($9.99, $99.99)
│   │   └── mock-webpage.ts            # Realistic technical article for extension demo
│   │
│   ├── store/                         # Lightweight reactive client store
│   │   ├── chat-store.tsx             # Context/hook managing active chat, history, streaming
│   │   └── settings-store.tsx         # User preferences, active model, dark mode
│   │
│   └── utils.ts                       # Classnames merging, date formatting, string helpers
│
└── docs/                              # Project documentation & specs
```

---

## 5. Data Flow & State Architecture

### 5.1 Principles
* **Local State First:** Local component state (`useState`) handles ephemeral UI states (modal open/close, dropdown toggles, hovering, cursor positions).
* **Predictable Context Store:** A dedicated React Context (`ChatStore`) manages active conversations, message generation, and model selection.
* **LocalStorage Persistence:** Conversations, user settings, and theme preferences persist across reloads without requiring a heavyweight backend.
* **Realistic Simulation:** Mock responses stream incrementally with realistic character cadences, syntax-highlighted code output, and realistic token consumption.

### 5.2 State Diagram
```
[User Action: Send Prompt]
          │
          ▼
[ChatComposer validates non-empty input]
          │
          ▼
[Append User Message to Active Conversation]
          │
          ▼
[Set Status: 'streaming' | Show Typing Indicator]
          │
          ▼
[Invoke Mock Streamer (simulate 15ms-40ms chunk intervals)]
          │
          ├─► Chunks append to Assistant Message content
          │
          ▼
[Stream Completes ──► Set Status: 'ready' ──► Update LocalStorage]
```

---

## 6. Verified Model Architecture & Categorization

To avoid the cognitive overload of the current live app's flat 41-model dropdown while remaining **100% faithful to verified live API data**, models are grouped into four intuitive operational categories:

### 6.1 Curated Categories (Derived from Verified API Slugs)
1. **Flagship Reasoning:**
   * `GPT-5.6 Sol` (`gpt-5.6-sol`) — Advanced general intelligence & broad knowledge.
   * `GPT-5.5` (`gpt-5.5`) — Versatile reasoning and structured synthesis.
   * `Gemini 3.8 Flash` (`google/gemini-3.8-flash`) — High-speed multimodal analysis & caching.
   * `Grok 4.6` (`xai/grok-4.6`) — Real-time reasoning, deep instruction following.
   * `Qwen 3.8 Max` (`Qwen/Qwen3.8-Max`) — Flagship multi-step reasoning over long context.
2. **Code & Engineering:**
   * `Kimi K2.7 Code` (`moonshotai/Kimi-K2.7-Code`) — Specialized algorithmic synthesis & code review.
   * `Kimi K2.7 Code HighSpeed` (`moonshotai/Kimi-K2.7-Code-Highspeed`) — Low-latency code output.
   * `DeepSeek V4 Pro` (`deepseek/deepseek-v4-pro`) — Advanced mathematical & software reasoning.
3. **Fast & High-Throughput:**
   * `GPT-5.6 Luna` (`gpt-5.6-luna`) — Lightweight tier for instantaneous turnaround.
   * `DeepSeek V4 Flash Fast` (`deepseek/deepseek-v4-flash-fast`) — Ultra-low latency responses.
   * `Gemini 3.7 Flash` (`google/gemini-3.7-flash`) — Fast multimodal processing.
   * `Qwen 3.8 Flash` (`Qwen/Qwen3.8-Flash`) — Agile conversational processing.
   * `MiMo V2.5` (`xiaomi/mimo-v2.5`) — Efficient everyday queries.
4. **Specialized & Extended Context:**
   * `DeepSeek V4 Flash Vision` (`deepseek/deepseek-v4-flash-vision-exp`) — Image & visual document understanding.
   * `Muse Spark 1.3` (`meta/muse-spark-1.3`) — 1M token context, creative prose & drafting.
   * `Inkling` (`thinkingmachines/inkling`) — Structured step-by-step analytical breakdown.
   * `Nemotron 3 Ultra` (`nvidia/nemotron-3-ultra-550b`) — Massive parameter open-weight reasoning.
   * `EchoGPT Native` (`echogpt`) — Core balanced assistant.

### 6.2 Model Selector UX
* **Quick Selector (Dropdown):** Displays 6 curated top models with provider badge, speed/reasoning tag, and Free/Pro badge.
* **Full Catalog Modal:** Search bar with live filtering, category tabs (All, Reasoning, Code, Fast, Vision), capability matrix, and token context limits.

---

## 7. Web App Architecture (`/app`)

### 7.1 Layout Grid
* **Container:** Fixed full viewport (`100dvh` / `h-screen`). Zero outer window scrollbars.
* **Left Sidebar (280px desktop, slide-over drawer mobile):**
  * Top: "New Chat" primary button (`⌘N`).
  * Search bar to filter historical threads.
  * Chronologically grouped session list: *Today*, *Previous 7 Days*, *Older*.
  * Bottom: Plan usage meter ("Free Tier: 18 / 25 daily queries") and Settings button.
* **Main Chat Area (Fluid flex-1):**
  * Top bar: Model selector pill, Model parameter indicators, "Compare Mode" toggle, Clear chat action.
  * Message thread: Centered readable container (`max-w-3xl mx-auto`), user messages right-aligned or distinctly styled, assistant messages with model avatar, markdown formatting, syntax code blocks, copy action, and timestamp.
  * Empty state: Welcoming greeting, model capability highlights, and 4 one-click starter prompt cards.
  * Prompt composer: Fixed at bottom, auto-expanding textarea, action pills (Code, Summarize, Brainstorm), token count, and send button.

---

## 8. Landing Page Architecture (`/`)

### 8.1 Visual & Narrative Hierarchy
1. **Hero Section:**
   * High-contrast badge: `"The Multi-Model AI Productivity Ecosystem"`.
   * Clear value headline: `"Every Frontier AI Model. One Unified Workspace."`
   * Subheadline articulating the core benefit: *"Switch seamlessly between OpenAI, DeepSeek, Gemini, Qwen, and Kimi without managing multiple subscriptions."*
   * Primary CTAs: `"Launch AI Workspace"` (primary) and `"Add to Chrome — Free"` (secondary with Chrome icon).
2. **Live Interactive Model Playground:**
   * An in-hero interactive demonstration where visitors can click between 3 model tabs (e.g. `GPT-5.6 Sol`, `Claude / Kimi Code`, `DeepSeek V4 Pro`) and observe differences in response style, reasoning depth, and latency in real time.
3. **Bento Feature Grid:**
   * Card 1 (Large): Unified Multi-Model Chat.
   * Card 2: Chrome Side Panel Companion with `⌘⇧E` shortcut badge.
   * Card 3: Side-by-Side Model Comparison Engine.
   * Card 4: Enterprise Privacy & Token Caching.
4. **Verified Model Catalog Directory:**
   * Interactive directory of the 41 supported models with category filter tabs and search.
5. **Verified Pricing Architecture:**
   * Billing switcher: Monthly vs. Annual (highlighting verified $9.99/mo vs. $99.99/yr with ~17% savings).
   * Feature comparison table contrasting Free tier vs. Pro benefits.
6. **Chrome Extension Spotlight:**
   * Highlighting the browser sidebar workflow with interactive callouts.
7. **FAQ Accordion & Footer.**

---

## 9. Chrome Extension Concept Architecture (`/extension`)

### 9.1 Browser Simulation Canvas
Rather than displaying a static mockup image, the `/extension` route provides an **interactive living simulation**:
* **Top Browser Chrome:** Realistic macOS / Chrome browser frame featuring tabs ("EchoGPT Article", "Next.js Docs", "GitHub"), URL address bar with SSL lock, and Chrome toolbar containing the EchoGPT extension icon.
* **Left Viewport (Fluid Webpage Canvas):** Renders a rich technical article (*"Frontier Model Architectures and Multi-Agent Reasoning in 2026"*). Users can select text on the webpage to trigger an **"Explain with EchoGPT"** floating action.
* **Right Viewport (380px Chrome Side Panel Frame):** Renders the authentic EchoGPT extension side-panel interface:
  * **Header:** Active model selector pill, settings icon, and minimize control.
  * **Page Context Pill:** `"Connected: 1,480 words from active tab"` with on/off toggle.
  * **Quick Actions:** One-click `"Summarize Webpage"`, `"Extract Key Takeaways"`, and `"Explain Highlighted Text"`.
  * **Compact Chat Thread:** Formatted specifically for narrow side-panel widths with full markdown and copy capabilities.
  * **Shortcut Callout:** Floating keyboard helper (`⌘⇧E` / `Ctrl+Shift+E`).

---

## 10. Responsive Architecture

The entire suite is engineered to adapt fluidly across all standard breakpoints:

| Breakpoint | Target Devices | Layout Adaptations |
| :--- | :--- | :--- |
| **Mobile (320px – 430px)** | iPhone SE, 13/14/15 Pro, Pixel | • Global header condenses to hamburger menu.<br>• `/app` sidebar becomes an animated off-canvas drawer.<br>• Prompt composer sticks securely above virtual keyboards.<br>• `/extension` stacks the browser view and side panel vertically with a quick toggle tab. |
| **Tablet (768px – 1023px)** | iPad Mini, iPad Air | • `/app` sidebar supports compact icon-only collapsed mode.<br>• Landing page bento grid reflows into a 2-column layout.<br>• Extension simulation scales proportionally. |
| **Desktop (1024px – 1439px)** | Laptops, MacBooks | • Full dual-column chat workspace.<br>• Extension simulator displays side-by-side 65% webpage / 35% side panel. |
| **Wide Screen (1440px+)** | Desktop Monitors, iMac | • Chat message containers maintain comfortable reading line lengths (`max-w-3xl`).<br>• Landing page content centers with maximum constraint (`max-w-7xl`). |

---

## 11. Accessibility Architecture (WCAG 2.1 AA)

* **Semantic HTML:** Pure semantic tags (`<header>`, `<nav>`, `<main>`, `<aside>`, `<section>`, `<article>`).
* **Keyboard Navigation:**
  * `Enter` submits prompts; `Shift + Enter` inserts newlines.
  * `Escape` closes modals, drawers, and dropdowns.
  * `Tab` / `Shift + Tab` maintains trapped focus inside active dialogs.
  * `⌘K` opens model switcher search; `⌘N` opens a new chat session.
* **Focus Visibility:** High-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`).
* **Screen Reader Support:** Meaningful `aria-label`, `aria-expanded`, `aria-haspopup`, and `role="dialog"` attributes on interactive elements.
* **Contrast Compliance:** All text tokens meet minimum 4.5:1 contrast against their respective backgrounds in both light and dark modes.
