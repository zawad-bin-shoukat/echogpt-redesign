# EchoGPT Redesign — Frontend Internship Practical Assignment

A modern frontend redesign and interactive prototype inspired by the EchoGPT web ecosystem and Chrome Extension experience. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

---

## 1. Project Overview

EchoGPT is a multi-model AI productivity ecosystem that enables users to query leading foundation models through a unified interface. This project delivers a high-fidelity frontend redesign across three core product experiences:

1. **Landing Page (`/`)**: A conversion-focused overview showcasing EchoGPT's multi-model directory, interactive workspace preview, extension spotlight, transparent subscription pricing, and FAQ.
2. **AI Workspace Prototype (`/app`)**: An interactive conversational workspace featuring model switching across 41 verified models, conversational history management, new chat initialization, multi-line auto-resizing composer, and local simulated responses.
3. **Chrome Extension Simulator (`/extension`)**: An in-browser simulation of Chrome's native Side Panel companion, featuring active page context injection, quick actions (*Summarize*, *Explain Selection*, *Key Takeaways*), model switching, and responsive viewport isolation.

---

## 2. Features

### Landing Page (`/`)
- **Hero & Interactive Preview**: Value narrative with a live interactive model switcher and side-by-side comparison demo.
- **Bento Product Architecture**: Visual breakdowns of dynamic routing, parallel comparison, extension integration, and continuous session handoff.
- **Verified 41-Model Directory**: Filterable directory categorized by Flagship, Fast, and Coding capabilities.
- **Extension Spotlight**: Interactive walkthrough of Chrome Side Panel capabilities with DOM context injection.
- **Verified Subscription Pricing**: Transparent presentation of Free, Monthly Pro ($9.99/mo), and Annual Pro ($99.99/yr) plans with billing details.
- **Accessible FAQ**: Keyboard-accessible accordion with comprehensive product and security details.

### AI Workspace (`/app`)
- **Searchable Model Selector**: Fast search and filtering across the 41-model development catalog with Quick Select shortcuts.
- **Deterministic Simulation**: Instant local AI responses tailored to the active model and user query without external API latency or failure states.
- **Conversation Management**: Sidebar with historical conversation switching, New Chat creation, and mobile slide-over drawer.
- **Composer Controls**: Auto-expanding textarea with `Enter` (send) and `Shift+Enter` (newline) keyboard navigation.
- **Interaction Feedback**: Copy-to-clipboard actions on code snippets and assistant answers with ephemeral check indicators.

### Chrome Extension Simulator (`/extension`)
- **Realistic Browser Frame**: Chrome address bar, navigation controls, and viewport tabs (*Split View*, *Webpage Active*, *Side Panel Active*).
- **Simulated Page Context**: Realistic technical article excerpt with dynamic context active/paused states.
- **Quick Action Workflows**:
  - **Summarize**: Generates structured executive summaries and architectural implications.
  - **Explain Selection**: Explains highlighted code excerpts with syntax breakdowns.
  - **Key Takeaways**: Extracts actionable bullet points from the page.
- **Side Panel Model Selector**: Model switching directly inside the simulated panel.
- **Mobile-Isolated Frame**: Top-level simulator framing with dedicated touch-friendly controls and overflow-proof action toolbars.

---

## 3. Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict type checking)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with semantic CSS custom properties
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Geist and Geist Mono via `next/font`
- **Linting**: ESLint 9 (`eslint-config-next`)

---

## 4. Project Structure / Routes

```text
├── app/
│   ├── layout.tsx                # Root layout with Geist font & theme support
│   ├── page.tsx                  # Route: / (Landing Page)
│   ├── app/
│   │   └── page.tsx              # Route: /app (AI Workspace Prototype)
│   ├── extension/
│   │   └── page.tsx              # Route: /extension (Chrome Extension Simulator)
│   └── globals.css               # Design system tokens & Tailwind v4 theme
├── components/
│   ├── landing/                  # Landing page sections (Hero, Bento, Models, Pricing, etc.)
│   ├── workspace/                # AI Workspace components (Header, Sidebar, Composer, Stream)
│   ├── extension/                # Chrome extension & browser simulator components
│   ├── shared/                   # Cross-route components (Navbar, Footer, BrandLogo, ThemeToggle)
│   └── ui/                       # Accessible atomic primitives (Button, Badge, Modal, Tooltip, etc.)
├── types/
│   └── index.ts                  # TypeScript interfaces for models, chats, and subscriptions
├── lib/
│   ├── mock/                     # Verified 41-model catalog, pricing plans, and simulation data
│   └── utils.ts                  # Class merging and formatting utilities
└── docs/                         # Assignment specifications, architectural plans, and design system docs
```

---

## 5. Setup Instructions

### Prerequisites
- Node.js 18.18+ (Node.js 20+ recommended)
- npm, pnpm, or yarn

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zawad-bin-shoukat/echogpt-redesign.git
   cd echogpt-redesign
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Verify production build:**
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```

---

## 6. Assumptions & Implementation Notes

- **Frontend Prototype Scope**: This project is built as a frontend engineering prototype for the practical internship assignment. It contains no backend database, user authentication system, or payment processing gateways.
- **Local Simulation**: AI responses and processing delays are simulated locally and deterministically. There is no active connection to external AI APIs (OpenAI, Anthropic, Google, etc.), ensuring fast, offline-capable evaluation with zero API key requirements or rate limits.
- **Extension Representation**: The Chrome Extension is realized as an interactive in-page browser simulator (`/extension`) rather than a compiled `.crx` binary. This allows reviewers to inspect the Side Panel UX and interaction state machine directly on any desktop or mobile browser.
- **Catalog Snapshot**: The 41-model directory is grounded in a development snapshot from the live EchoGPT service for realism, but serves as a prototype dataset rather than a guaranteed production guarantee.
- **Design Grounding**: Visual hierarchy, layouts, and copy were designed from the ground up based on the assignment brief and publicly observable EchoGPT product concepts.

---

## 7. Additional Features Implemented

- **Dark & Light Mode Parity**: Complete theme support with smooth transitions, system preference detection, and `localStorage` persistence.
- **Comprehensive Responsive Layouts**: Tested across 320px, 375px, 390px, 440px, 768px, 1024px, 1280px, and 1440px viewports with zero horizontal overflow.
- **Keyboard Ergonomics**: Full keyboard accessibility with `Escape` dismissals for dropdowns/modals, `Enter` submission, and visible focus rings.
- **Accessibility Foundations**: Semantic HTML elements, ARIA labels, dialog semantics, and live regions (`aria-live="polite"`) for simulated stream updates.
- **Model Filtering & Search**: Real-time filtering by model name, provider, and architectural capability with instant highlight feedback.
- **State Machine Fidelity**: Believable multi-phase state progression: prompt input → simulated synthesis delay → formatted response rendering → continuity.
- **Clipboard Interactions**: One-click copying for code blocks and responses with transient confirmation checkmarks.
- **Mobile Navigation Drawer**: Dedicated mobile navigation menu with backdrop locking and quick ecosystem switcher links.

---

## 8. Live Demo

- **Production Deployment**: [https://echogpt-redesign-ten.vercel.app/](https://echogpt-redesign-ten.vercel.app/)

---

## 9. Repository

- **GitHub Repository**: [https://github.com/zawad-bin-shoukat/echogpt-redesign](https://github.com/zawad-bin-shoukat/echogpt-redesign)

---

## 10. Quality / QA

The codebase has undergone automated and manual quality assurance passes:

- **ESLint**: Passed with 0 errors and 0 warnings (`npm run lint`).
- **TypeScript**: Passed with strict type checking and 0 compiler errors (`npx tsc --noEmit`).
- **Production Build**: Prerendered statically with Next.js Turbopack compiler (`npm run build`).
- **Console & Hydration**: Verified 0 browser console errors, 0 uncaught exceptions, and 0 React hydration mismatches.
- **Responsive Layout Integrity**: Tested from narrow mobile devices (320px) up to large desktop screens (1440px+) with 0 horizontal overflows.
- **Theme Parity**: Verified high contrast and readable hierarchy across both dark and light modes on every route.

---

## 11. Assignment Notes

- Built for the **AppifyDevs Frontend Internship Practical Assignment**.
- Demonstrates clean component modularity, clean architectural separation, strict typing, responsive design principles, and realistic state simulation.
- All code is original and maintained with a clean Git commit history reflecting phased milestone checkpoints.
