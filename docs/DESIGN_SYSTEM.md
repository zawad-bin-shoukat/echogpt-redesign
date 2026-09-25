# EchoGPT Design System Specification

**Version:** 1.0  
**Phase:** 2 — Product Architecture & Design Specification  
**Design Philosophy:** Precision Utility, Calm Intelligence, Distraction-Free Focus  
**Target:** Tailwind CSS v4 (`@theme inline`), CSS Custom Properties  

---

## 1. Design Philosophy & Aesthetic Principles

EchoGPT's visual identity avoids the stereotypical tropes of generic "AI startup" designs: **no gratuitous neon blobs, no blinding rainbow gradients, and no overdone frosted glassmorphism that impedes readability.**

Instead, EchoGPT is grounded in the principles of **high-density productivity tools** (such as Linear, Raycast, and VS Code):
* **Calm & Architectural:** Neutral zinc/slate foundations provide exceptional contrast without visual noise.
* **Semantic Accenting:** Color is used exclusively to denote status, active states, model capabilities, and primary user actions.
* **Information Density:** Clean negative space paired with compact, purposeful UI controls.
* **Haptic Micro-Interactions:** Subtle border shifts and elevation changes replace exaggerated animations.

---

## 2. Color System & Design Tokens

The system provides complete parity between **Dark Mode** (the primary workspace aesthetic) and **Light Mode** (high-contrast productivity mode). All colors are defined via CSS variables mapped to Tailwind v4 theme tokens.

### 2.1 Core Semantic Tokens

| Token Name | Light Mode (Hex / HSL) | Dark Mode (Hex / HSL) | Usage Description |
| :--- | :--- | :--- | :--- |
| `--background` | `#FFFFFF` | `#09090B` (zinc-950) | Core page & canvas background |
| `--surface` | `#F4F4F5` (zinc-100) | `#121215` (zinc-900) | Secondary panels, sidebars, containers |
| `--surface-elevated` | `#FFFFFF` | `#18181B` (zinc-850) | Modals, dropdown menus, cards, popovers |
| `--surface-hover` | `#E4E4E7` (zinc-200) | `#27272A` (zinc-800) | Interactive hover surface for rows/buttons |
| `--border-subtle` | `#E4E4E7` (zinc-200) | `#27272A` (zinc-800) | Dividers, card borders, subtle separators |
| `--border-strong` | `#D4D4D8` (zinc-300) | `#3F3F46` (zinc-700) | Active inputs, selected item boundaries |
| `--text-primary` | `#09090B` (zinc-950) | `#FAFAFA` (zinc-50) | Main headings, user prompts, key text |
| `--text-secondary` | `#52525B` (zinc-600) | `#A1A1AA` (zinc-400) | Subtitles, assistant body copy, descriptions |
| `--text-muted` | `#71717A` (zinc-500) | `#71717A` (zinc-500) | Timestamps, placeholder text, shortcut keys |
| `--accent-primary` | `#10B981` (emerald-500) | `#10B981` (emerald-500) | Primary brand accent, primary CTA, active states |
| `--accent-hover` | `#059669` (emerald-600) | `#34D399` (emerald-400) | Hover state for primary accent controls |
| `--accent-subtle` | `rgba(16,185,129,0.1)` | `rgba(16,185,129,0.15)` | Active selection backgrounds, pill highlights |
| `--status-success` | `#10B981` (emerald-500) | `#10B981` (emerald-500) | Successful completions, connected status |
| `--status-warning` | `#F59E0B` (amber-500) | `#FBBF24` (amber-400) | Rate limit warnings, token usage warnings |
| `--status-error` | `#EF4444` (red-500) | `#F87171` (red-400) | Error banners, failed responses, retry alerts |

### 2.2 Model Category Accents
Subtle semantic badges designate model capabilities without rainbow clutter:
* **Flagship Reasoning:** Indigo (`bg-indigo-500/10 text-indigo-400 border-indigo-500/20`)
* **Code & Engineering:** Emerald (`bg-emerald-500/10 text-emerald-400 border-emerald-500/20`)
* **Fast & High-Throughput:** Sky Blue (`bg-sky-500/10 text-sky-400 border-sky-500/20`)
* **Specialized & Vision:** Purple (`bg-purple-500/10 text-purple-400 border-purple-500/20`)
* **Free Tier Available:** Neutral Slate (`bg-zinc-500/10 text-zinc-400 border-zinc-500/20`)

---

## 3. Typography Scale & System

Typography is driven by Vercel's **Geist Sans** (for interface readability) and **Geist Mono** (for code, shortcuts, tokens, and model identifiers).

### 3.1 Type Hierarchy

| Style Role | Font Size | Line Height | Tracking | Font Weight | Tailwind Class |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | 3.5rem (56px) | 1.1 | -0.03em | Bold (700) | `text-4xl sm:text-6xl font-bold tracking-tight` |
| **Page Title (H1)** | 2.25rem (36px) | 1.2 | -0.025em | SemiBold (600) | `text-3xl sm:text-4xl font-semibold tracking-tight` |
| **Section Title (H2)**| 1.75rem (28px) | 1.25 | -0.02em | SemiBold (600) | `text-2xl sm:text-3xl font-semibold tracking-tight` |
| **Subsection (H3)** | 1.25rem (20px) | 1.35 | -0.015em | Medium (500) | `text-lg sm:text-xl font-medium tracking-tight` |
| **Body (Default)** | 0.9375rem (15px)| 1.6 | 0 | Regular (400) | `text-[15px] leading-relaxed` |
| **Body (Small)** | 0.875rem (14px) | 1.5 | 0 | Regular (400) | `text-sm leading-normal` |
| **Caption & Meta** | 0.75rem (12px) | 1.4 | +0.01em | Medium (500) | `text-xs leading-tight font-medium` |
| **Code & Keycaps** | 0.8125rem (13px)| 1.5 | 0 | Regular / Mono | `font-mono text-[13px]` |

---

## 4. Spacing, Sizing & Grid Rhythm

A base-4 structural spacing scale ensures proportional alignment across all components:

| Token | Size | Typical Use Case |
| :--- | :--- | :--- |
| `space-1` | 4px (0.25rem) | Icon gaps, tight padding between badges |
| `space-2` | 8px (0.5rem) | Button icon spacing, dropdown item vertical padding |
| `space-3` | 12px (0.75rem)| Input padding, small card gap |
| `space-4` | 16px (1.0rem) | Standard component padding, list item gutters |
| `space-6` | 24px (1.5rem) | Card body padding, modal internal gutters |
| `space-8` | 32px (2.0rem) | Section vertical rhythm, chat bubble separation |
| `space-12`| 48px (3.0rem) | Landing page subsection spacing |
| `space-16`| 64px (4.0rem) | Major landing section vertical padding |

---

## 5. Border Radius & Elevation (Shadows)

### 5.1 Radius Scale
* **Small (`rounded-md` / 6px):** Badges, keyboard shortcuts (`kbd`), tooltips, inline code chips.
* **Medium (`rounded-xl` / 12px):** Buttons, text inputs, dropdown menus, quick action pills.
* **Large (`rounded-2xl` / 16px):** Chat message bubbles, feature cards, modal windows, prompt composer bar.
* **Extra Large (`rounded-3xl` / 24px):** Browser simulator frame, landing hero container.
* **Full (`rounded-full`):** Model avatar badges, status indicators, tab indicator pills.

### 5.2 Elevation & Shadows
Shadows are subtle, directional, and never fluorescent:
* **Subtle Surface (`shadow-sm`):** `0 1px 2px 0 rgba(0, 0, 0, 0.05)` — used on buttons, cards in light mode.
* **Dropdown / Card (`shadow-md`):** `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)` — popovers, menus.
* **Modal Elevation (`shadow-2xl`):** `0 25px 50px -12px rgba(0, 0, 0, 0.25)` — centered dialogs.
* **Focus Glow (`ring-2 ring-emerald-500/40`):** Soft focus ring indicating keyboard focus.

---

## 6. Component Visual Language & Specifications

### 6.1 Buttons
* **Primary:** `bg-emerald-500 text-white font-medium hover:bg-emerald-600 active:scale-[0.98] shadow-sm`
* **Secondary:** `bg-surface text-primary border border-border-subtle hover:bg-surface-hover active:scale-[0.98]`
* **Ghost:** `text-secondary hover:text-primary hover:bg-surface-hover active:scale-[0.98]`
* **Destructive:** `text-red-500 hover:bg-red-500/10 active:scale-[0.98]`
* *Sizes:* `sm` (h-8 px-3 text-xs), `md` (h-10 px-4 text-sm), `lg` (h-12 px-6 text-base).

### 6.2 Prompt Composer Bar
* Multi-line container with refined border (`border-border-subtle focus-within:border-emerald-500/60`).
* Auto-resizing textarea (`min-h-[52px] max-h-[200px]`).
* Bottom action shelf housing context tags, quick prompt triggers, model pill, and circular send button.

### 6.3 Chat Message Bubbles
* **User Bubble:** Right-aligned or distinct container with subtle surface fill (`bg-surface-hover/80 text-primary border border-border-subtle`).
* **Assistant Bubble:** Left-aligned, preceded by clean model badge icon, rendered markdown prose, syntax-highlighted code blocks, and an action bar (Copy, Retry, Thumbs up/down).

### 6.4 Code Blocks
* Dark background (`bg-zinc-950 border border-zinc-800`).
* Header row displaying language name (`ts`, `python`, `json`) and instant "Copy Code" button with visual checkmark feedback.
* Monospace typography with crisp syntax coloration.

### 6.5 Model Selector Dropdown & Modal
* Trigger button displaying active model icon, title (`GPT-5.6 Sol`), speed tier, and chevron.
* Modal view providing:
  * Real-time search filter (`⌘K`).
  * Category tabs (All, Reasoning, Coding, Fast, Vision).
  * Model list items detailing model family, token context, latency profile, and Free/Pro badge.

### 6.6 Badges & Pills
* Small, crisp indicators (`h-5 px-2 text-[11px] font-medium rounded-full inline-flex items-center gap-1.5`).
* Status dot (`w-1.5 h-1.5 rounded-full bg-emerald-500`).

---

## 7. Interaction States

Every interactive element defines 6 mandatory states:
1. **Default:** Crisp border, legible text token, comfortable padding.
2. **Hover:** Subtle background shift (`bg-surface-hover`), border contrast enhancement.
3. **Focus-Visible:** High-contrast 2px emerald outline ring with 2px offset.
4. **Active / Pressed:** Subtle micro-scale down (`active:scale-[0.98]`).
5. **Disabled:** Reduced opacity (`opacity-50 cursor-not-allowed pointer-events-none`).
6. **Loading / Streaming:** Pulsing skeleton or subtle spinning indicator; prompt submit morphs into a stop square (`■`).

---

## 8. Motion & Animation Guidelines

* **Intentionality Rule:** Motion is applied strictly to communicate state changes, spatial hierarchy, or completion feedback.
* **Duration & Easing:**
  * Micro-interactions (hover, focus, button clicks): `150ms ease-out`
  * Drawers, dialog backdrops, accordion toggles: `200ms cubic-bezier(0.16, 1, 0.3, 1)`
  * Streaming cursor: `800ms pulse infinite`
* **Reduced Motion:** All transitions respect `@media (prefers-reduced-motion: reduce)` by disabling transforms and falling back to immediate opacity changes.
