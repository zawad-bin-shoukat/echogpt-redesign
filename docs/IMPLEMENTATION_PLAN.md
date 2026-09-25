# EchoGPT Step-by-Step Implementation Plan

**Version:** 1.0  
**Phase:** 2 — Product Architecture & Design Specification  
**Status:** Approved for Phased Execution  
**Target:** Next.js 16, React 19, TypeScript, Tailwind CSS v4  

---

## Overview

This implementation roadmap outlines the structured, 12-phase sequence to build and verify the EchoGPT ecosystem redesign. Each phase specifies exact deliverables, files involved, required dependencies, testing protocols, and clear Definitions of Done (DoD).

---

## Phase 1: Foundation Setup

### Deliverables
* Configure Tailwind CSS v4 CSS variables and theme tokens in `app/globals.css`.
* Establish TypeScript type definitions for models, chat messages, sessions, settings, and subscription plans.
* Implement the verified mock data layer reflecting current production API data (41 verified models from `api.echogpt.live`, verified pricing: $9.99/mo, $99.99/yr).
* Setup utility helper functions for class merging and date/string formatting.

### Files Involved
* `app/globals.css`
* `lib/types/model.ts`
* `lib/types/chat.ts`
* `lib/types/subscription.ts`
* `lib/mock/verified-models.ts`
* `lib/mock/verified-pricing.ts`
* `lib/mock/sample-conversations.ts`
* `lib/utils.ts`

### Dependencies
* `clsx`, `tailwind-merge` (lightweight utility helpers).
* `lucide-react` (comprehensive iconography for chat, model badges, and extension).

### Verification & Testing
* `npx tsc --noEmit` verifies strict TypeScript integrity across all data contracts.
* Verify CSS variable resolution in browser DevTools.

### Definition of Done
* All verified models and pricing tiers are typed and exportable.
* Linter and TypeScript compiler pass with zero errors.

---

## Phase 2: Core Design System & UI Primitives

### Deliverables
* Build accessible, zero-dependency atomic UI primitives following the design system tokens.
* Support primary, secondary, outline, and ghost variants.
* Provide light/dark mode parity for all components.

### Files Involved
* `components/ui/button.tsx`
* `components/ui/input.tsx`
* `components/ui/textarea.tsx`
* `components/ui/badge.tsx`
* `components/ui/card.tsx`
* `components/ui/modal.tsx`
* `components/ui/dropdown.tsx`
* `components/ui/tabs.tsx`
* `components/ui/tooltip.tsx`
* `components/ui/switch.tsx`

### Dependencies
* Existing stack + `lucide-react`.

### Verification & Testing
* Test component keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`).
* Verify high-contrast focus rings and hover transitions.

### Definition of Done
* All 10 UI primitives render cleanly with full variant support and no TypeScript warnings.

---

## Phase 3: Shared Shell & Navigation Components

### Deliverables
* Global product switcher navigation bar connecting `/` (Landing), `/app` (Web App), and `/extension` (Extension).
* Model provider badge with category indicators.
* Dark / Light theme toggle with local storage persistence.
* Client state store (`ChatStore` & `SettingsStore`) with localStorage sync.

### Files Involved
* `components/shared/global-header.tsx`
* `components/shared/model-badge.tsx`
* `components/shared/theme-toggle.tsx`
* `lib/store/chat-store.tsx`
* `lib/store/settings-store.tsx`
* `app/layout.tsx`

### Dependencies
* None additional.

### Verification & Testing
* Verify smooth route switching between `/`, `/app`, and `/extension`.
* Verify active route visual pill highlighting in the header.
* Verify theme toggle updates HTML class and persists across reloads.

### Definition of Done
* Header is responsive, accessible, and provides seamless navigation across the three experiences.

---

## Phase 4: Marketing Landing Page (`/`)

### Deliverables
* Complete product narrative and value proposition showcase.
* High-impact Hero section with dual CTAs ("Launch Workspace", "Add to Chrome").
* Live Interactive Model Playground allowing visitors to test sample prompts across models.
* Bento Feature Grid (Multi-Model Chat, Side Panel, Model Comparison, Security).
* Categorized Model Directory displaying verified models with search.
* Verified Pricing Section with Monthly/Annual switcher ($9.99 vs $99.99).
* Chrome Extension spotlight with animated shortcut callouts (`⌘⇧E`).
* Interactive FAQ accordion and comprehensive footer.

### Files Involved
* `app/page.tsx`
* `components/landing/hero-section.tsx`
* `components/landing/live-model-preview.tsx`
* `components/landing/bento-features.tsx`
* `components/landing/model-catalog-section.tsx`
* `components/landing/pricing-section.tsx`
* `components/landing/extension-spotlight.tsx`
* `components/landing/faq-section.tsx`
* `components/landing/landing-footer.tsx`

### Verification & Testing
* Interactive model playground responds immediately to model tab switching.
* Pricing annual toggle updates displayed savings accurately.
* FAQ accordion opens and closes smoothly with keyboard access.

### Definition of Done
* Landing page renders completely, loads fast, and delivers a compelling, polished first impression.

---

## Phase 5: Web Application Workspace (`/app`)

### Deliverables
* Full-screen dual-column conversational AI workspace.
* Collapsible history sidebar with search filter, new chat shortcut, and usage indicator.
* Chat message thread with rich Markdown, code blocks with copy button, and action bar.
* Model selector with categorized tabs (Flagship Reasoning, Coding, Fast, Vision) and live search.
* Prompt composer with auto-expanding textarea, quick prompt chips, and token count.
* Side-by-side Model Compare Mode panel.
* State handling: Empty state cards, typing/streaming simulation, error/retry states.
* Settings modal to configure temperature, system prompt, and API preferences.

### Files Involved
* `app/app/page.tsx`
* `components/chat/chat-shell.tsx`
* `components/chat/chat-sidebar.tsx`
* `components/chat/chat-header.tsx`
* `components/chat/chat-thread.tsx`
* `components/chat/chat-message.tsx`
* `components/chat/code-block.tsx`
* `components/chat/prompt-composer.tsx`
* `components/chat/model-selector-modal.tsx`
* `components/chat/compare-panel.tsx`
* `components/chat/chat-empty-state.tsx`
* `components/chat/chat-settings-modal.tsx`

### Verification & Testing
* Prompt submission appends user message and triggers incremental simulated streaming response.
* "New Chat" resets conversation and displays empty state.
* Model selection updates current chat context immediately.
* Code blocks copy cleanly to clipboard with visual checkmark feedback.

### Definition of Done
* Full conversational loop operates reliably without console errors or layout shifts.

---

## Phase 6: Chrome Extension Concept Simulator (`/extension`)

### Deliverables
* Interactive simulated browser canvas featuring a realistic browser chrome frame (tabs, URL bar, SSL badge).
* Simulated active webpage with an engaging article and highlightable text.
* Chrome Side Panel interface (accurate 380px panel width).
* Active webpage context indicator ("Connected: 1,480 words from active tab").
* Quick context tools: "Summarize Webpage", "Explain Highlighted Text", "Extract Action Items".
* Compact chat thread optimized for narrow side-panel viewports.
* Floating text selection tooltip ("Explain with EchoGPT").

### Files Involved
* `app/extension/page.tsx`
* `components/extension/browser-mockup-frame.tsx`
* `components/extension/simulated-webpage.tsx`
* `components/extension/side-panel-shell.tsx`
* `components/extension/context-status-bar.tsx`
* `components/extension/quick-action-toolbar.tsx`
* `components/extension/compact-chat-thread.tsx`
* `components/extension/extension-settings.tsx`
* `lib/mock/mock-webpage.ts`

### Verification & Testing
* Clicking "Summarize Webpage" initiates a simulated structured summary of the mock article.
* Highlighting text on the mock webpage displays the contextual floating trigger.
* Side-panel model switcher updates active assistant smoothly.

### Definition of Done
* The extension simulation realistically models an authentic Chrome Side Panel workflow.

---

## Phase 7: Responsive Implementation & Breakpoint Polish

### Deliverables
* Ensure all pages adapt smoothly across 320px, 375px, 430px, 768px, 1024px, and 1440px+.
* Implement mobile slide-over drawer for the `/app` sidebar.
* Implement vertical split / toggle view for the `/extension` simulator on mobile screens.
* Ensure touch target sizes exceed 44px on mobile devices.

### Files Involved
* All page components and shell layouts.

### Verification & Testing
* Test using Chrome DevTools device mode across iPhone SE (375px), iPhone 14 Pro (393px), iPad (768px), and Desktop (1440px).
* Verify zero unwanted horizontal scrollbars.

### Definition of Done
* Flawless responsive behavior across every target viewport.

---

## Phase 8: Accessibility & Semantic Review

### Deliverables
* Audit and implement semantic HTML landmarks (`header`, `main`, `nav`, `aside`, `section`).
* Ensure full keyboard navigability (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`).
* Add `aria-label`, `aria-expanded`, and `role="dialog"` attributes to all interactive elements.
* Verify WCAG 2.1 AA color contrast across all text and border tokens.

### Files Involved
* `components/ui/*`, `components/shared/*`, `components/chat/*`.

### Verification & Testing
* Full keyboard walk-through of the entire app without mouse interaction.
* Verify screen-reader accessible names using browser accessibility inspection.

### Definition of Done
* 100% compliance with WCAG 2.1 AA keyboard and contrast standards.

---

## Phase 9: Motion & Micro-Interactions

### Deliverables
* Subtle button press scaling (`active:scale-[0.98]`).
* Smooth drawer slide-over and modal backdrop fades.
* Simulated incremental typing cursor pulse.
* Respect `prefers-reduced-motion` media queries.

### Files Involved
* `app/globals.css`, component transition classes.

### Verification & Testing
* Test transitions in browser; verify clean 60fps performance without jank.
* Enable "Emulate prefers-reduced-motion" and verify animations disable cleanly.

### Definition of Done
* Motion feels purposeful, snappy (<200ms), and calm.

---

## Phase 10: End-to-End QA & Edge-Case Handling

### Deliverables
* Empty state validation (empty search, empty conversation, empty prompt).
* Error state validation (simulated rate limit, API network failure, retry action).
* Input edge cases (multi-line input, extremely long prompts, rapid prompt submissions).
* LocalStorage clearing and re-initialization validation.

### Files Involved
* `components/chat/*`, `lib/store/*`.

### Verification & Testing
* Manually trigger error state in chat and verify retry button regenerates output.
* Verify long code snippets trigger horizontal scrollbars within the code block without breaking message layout.

### Definition of Done
* Zero unhandled runtime exceptions or visual anomalies.

---

## Phase 11: Performance Optimization

### Deliverables
* Minimize client component footprints where static rendering suffices.
* Verify image optimization via `next/image` where applicable.
* Analyze bundle size and tree-shake unused exports.

### Files Involved
* `app/*`, `components/*`.

### Verification & Testing
* Run `npm run build` to verify static optimization and Turbopack bundle metrics.
* Check Lighthouse scores for Performance, Accessibility, Best Practices, and SEO.

### Definition of Done
* Production build compiles cleanly in under 5 seconds with zero build warnings.

---

## Phase 12: Documentation & Final Verification

### Deliverables
* Update `README.md` with product overview, architecture guide, and setup instructions.
* Prepare demonstration walkthrough for reviewers highlighting how the three experiences fulfill all assignment requirements.

### Files Involved
* `README.md`, `docs/*`.

### Verification & Testing
* Fresh clone test or clean build test (`npm run build && npm run lint`).

### Definition of Done
* Project is production-ready, beautifully documented, and ready for lead review.
