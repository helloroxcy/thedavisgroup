# Architecture

**Analysis Date:** 2026-03-09

## Pattern Overview

**Overall:** Single-page static HTML application — no framework, no build step, no server-side rendering.

**Key Characteristics:**
- All HTML, CSS, and JavaScript live in a single file: `index.html`
- No external JS dependencies (no jQuery, no React, no bundler)
- All interactivity implemented as vanilla JS IIFEs (Immediately Invoked Function Expressions)
- CSS is written entirely inline in a `<style>` block in `<head>` using custom properties (CSS variables)
- No backend: contact form `action="#"` with no processing wired up

## Layers

**Presentation (HTML structure):**
- Purpose: Semantic page sections rendered as flat HTML
- Location: `index.html` lines 1175–1585
- Contains: `<section>`, `<header>`, `<footer>`, `<nav>`, `<form>` elements with BEM-ish class names
- Depends on: CSS variables, image assets in `Images/`, fonts in `fonts/`
- Used by: CSS layer for styling, JS layer for DOM selection

**Styling (embedded CSS):**
- Purpose: All visual styling, layout, responsive behavior, and animation
- Location: `index.html` lines 11–1172 (inside two `<style>` blocks in `<head>`)
- Contains: CSS custom properties, resets, component styles, keyframe animations, media queries
- Depends on: Custom fonts via `@font-face`, Google Fonts via `<link>` preconnect
- Used by: HTML elements via class selectors

**Behavior (embedded JS):**
- Purpose: Interactive behavior for sliders, parallax, scroll-reveal, mobile nav
- Location: `index.html` lines 1591–1785 (single `<script>` block before `</body>`)
- Contains: Five IIFE modules, each scoped independently
- Depends on: DOM IDs and class names established in HTML layer
- Used by: Browser event system (click, scroll, touchstart, touchend, resize, keydown)

## Data Flow

**Hero Slider:**
1. Page loads — first `.hero-slide` has class `active`, opacity 1; others opacity 0
2. JS IIFE queries all `.hero-slide` elements and sets `setInterval` at 7000ms
3. On advance: removes `active` from current slide, adds `active` to next — CSS transition handles opacity crossfade
4. Manual advance via prev/next buttons or touch swipe calls same `go(idx)` function

**Featured Properties Slider:**
1. JS IIFE queries `#propTrack` and child `.feat-card` elements
2. On advance: sets `track.style.transform = translateX(-${idx * 100}%)` — CSS `transition` handles easing
3. Touch swipe supported with 48px threshold

**Scroll Parallax (Hero foreground layer):**
1. `scroll` event fires on `window`
2. `window.scrollY` calculated against hero element height
3. `.hero-fg` (header + content block) pushed up at 45% of scroll speed via `translateY`
4. Slide images receive progressive `blur()` filter as scroll progress increases toward 100%

**Neighborhoods Column Parallax:**
1. `scroll` event fires, requestAnimationFrame used as throttle
2. `.nbhd-col-1` and `.nbhd-col-3` receive opposing `translateY` values (±75px max)
3. Disabled below 768px viewport width

**Scroll Reveal:**
1. `IntersectionObserver` watches all `.reveal` elements
2. When element enters viewport (threshold 0.1, rootMargin -50px bottom), adds class `visible`
3. CSS transitions on `.reveal` / `.reveal.visible` handle opacity + translateY animation
4. Observer disconnects after each element fires (one-shot)

**State Management:**
- No global state object. Each IIFE holds its own local variables (`cur`, `idx`)
- No shared state between modules
- DOM classes serve as state flags (e.g., `active`, `visible`, `open`)

## Key Abstractions

**CSS Custom Properties (`--var` tokens):**
- Purpose: Single source of truth for design tokens — colors, fonts, spacing, easing
- Location: `:root {}` block at top of first `<style>` block, `index.html` lines 27–40
- Tokens: `--dark`, `--darker`, `--accent`, `--white`, `--gray`, `--light`, `--border`, `--font-serif`, `--font-sans`, `--font-nav`, `--ease`, `--max-w`

**`.wrap` layout container:**
- Purpose: Centers content with `max-width: 1240px` and `padding: 0 40px`
- Applied on sections that need constrained content width
- Does NOT apply on full-bleed sections (hero, neighborhoods)

**`.reveal` scroll-reveal pattern:**
- Purpose: Fade-in + rise-up entrance animation triggered by IntersectionObserver
- Applied to: team bios, network/contact section content
- Initial state: `opacity: 0; transform: translateY(28px)`
- Visible state: `opacity: 1; transform: none` (transition 0.85s ease)
- Optional `transition-delay` set inline via `style` attribute

**IIFE modules:**
- Purpose: Scope isolation for each interactive widget
- Pattern: `(function () { /* ... */ })();`
- Each IIFE is self-contained: queries DOM, binds events, manages own state

## Entry Points

**Browser loads `index.html`:**
- Location: `index.html`
- Triggers: Full page parse and render
- Responsibilities: Load fonts (Google Fonts via `<link>`, custom via `@font-face`), render all sections in one pass, run all `<script>` IIFEs on DOMContentLoaded (scripts are deferred by placement before `</body>`)

**JavaScript execution starts:**
- Location: `index.html` lines 1591–1785 (single `<script>` block)
- Triggers: Browser reaches end of `<body>`
- Responsibilities: Hero slider auto-advance, property slider init, scroll/parallax listeners, IntersectionObserver setup, mobile nav binding

## Error Handling

**Strategy:** None formal. No try/catch blocks. Minimal guard: featured properties slider has a null-check (`if (!track) return`).

**Patterns:**
- Early returns used where element may not exist (e.g., `if (!section) return` in neighborhoods parallax)
- No user-facing error states for the contact form (form has `action="#"` — submission goes nowhere)

## Cross-Cutting Concerns

**Logging:** None. No `console.log` calls in production code.

**Validation:** None. Contact form fields have no client-side validation — no `required` attributes, no JS validation on submit.

**Authentication:** Not applicable — fully static public site.

**Performance:** `loading="lazy"` applied to all images below the fold. Hero images are eager-loaded (no `loading` attribute). Ken Burns animation uses `will-change: transform` on each hero slide image. Parallax scroll handlers use `{ passive: true }` event listeners throughout.

**Accessibility:** `aria-label` attributes on all icon buttons. Mobile nav uses `aria-hidden` toggled via JS. `alt` text present on all images.

---

*Architecture analysis: 2026-03-09*
