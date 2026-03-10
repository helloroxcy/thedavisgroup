# Coding Conventions

**Analysis Date:** 2026-03-09

## Project Nature

This is a **single-file static HTML website** (`index.html`). All HTML, CSS, and JavaScript are co-located in that one file. There are no build tools, no preprocessors, and no external JS or CSS files authored in this project. Conventions below describe patterns observed directly in `index.html`.

## Naming Patterns

**CSS Classes:**
- BEM-adjacent kebab-case: `.hero-slide`, `.feat-card`, `.nbhd-tile-label`, `.footer-dir-label`
- Block names are short nouns: `.hero`, `.team`, `.network`, `.properties`, `.neighborhoods`
- Element names append with a hyphen: `.hero-content`, `.hero-title`, `.feat-track`, `.feat-nav`
- Modifier classes are single adjectives appended: `.orn-light`, `.orn-dark`, `.active`, `.visible`, `.open`
- Layout helpers use semantic names: `.wrap`, `.reveal`, `.section-label`, `.section-title`, `.section-rule`
- Component variants are suffixed: `.hero-btn--prev`, `.hero-btn--next` (BEM modifier with double-dash used in at least one place)

**CSS Custom Properties (variables):**
- Defined on `:root`, all lowercase with double-dash prefix
- Short semantic names: `--dark`, `--darker`, `--accent`, `--white`, `--gray`, `--light`, `--border`
- Typography vars: `--font-serif`, `--font-sans`, `--font-nav`
- Utility vars: `--ease`, `--max-w`

**HTML IDs:**
- camelCase for JavaScript targets: `#heroContent`, `#propTrack`, `#mobileNav`, `#navToggle`, `#heroScrollDown`
- kebab-case for section anchors: `#site-header` (mixed — most sections use plain lowercase: `#hero`, `#team`, `#contact`, `#neighborhoods`, `#properties`)
- Form element IDs prefixed with `f`: `#fname`, `#femail`, `#fcity`, `#fmessage`

**JavaScript Variables:**
- `const` for DOM references and constants: `const slides`, `const DELAY = 7000`
- `let` for mutable state: `let cur = 0`, `let idx = 0`, `let ticking = false`
- Constants in SCREAMING_SNAKE_CASE: `DELAY`, `FG_SPEED`, `MAX_BLUR`
- Local vars are short and descriptive: `dx`, `sx`, `rect`, `progress`, `shift`, `blurPx`

**JavaScript Functions:**
- Short verb names inside IIFEs: `go(idx)`, `update()`, `openNav()`, `closeNav()`, `maybeRun()`, `onScroll()`
- Event callbacks are inline arrow functions when trivial, named functions when reusable

## Code Style

**Formatting:**
- No linter or formatter config detected (no `.eslintrc`, `.prettierrc`, `biome.json`, etc.)
- Indentation: 2 spaces for HTML/CSS/JS throughout
- CSS rules: each property on its own line; single-line groupings used for resets (`*, *::before, *::after { ... }`) and short state rules (`.hero-slide.active { opacity: 1; }`)
- JS style: single quotes for strings, semicolons present, no trailing commas

**Linting:**
- None configured. `'use strict'` is declared at the top of the `<script>` block.

## HTML Structure Conventions

**Sectioning:**
- Major sections use `<section>` with matching `id` for anchor navigation
- Section order: mobile nav overlay → hero → properties → social bar → neighborhoods → team → network/contact → social bar → footer
- Non-section dividers (social bar) use `<div>`, not `<section>`

**Comments:**
- Block-level HTML comments delimit every major section:
  ```html
  <!-- ============================================================
       SECTION NAME
  ============================================================ -->
  ```
- CSS sections delimited by banner comments:
  ```css
  /* =============================================
     SECTION NAME
  ============================================= */
  ```
- JS sections delimited by compact banner comments:
  ```js
  /* ─── FEATURE NAME ──────────────────────────── */
  ```
- Inline comments explain non-obvious values directly next to the property:
  ```css
  line-height: 34px; /* exact match from inspector */
  font-size: 15px;   /* matches live site: 15px */
  ```

**Attributes:**
- `aria-label` used on all icon-only interactive elements (buttons, icon links)
- `aria-hidden="true"` on decorative images and the mobile nav overlay when closed
- `loading="lazy"` on all below-the-fold `<img>` tags
- `autocomplete` attributes set on form inputs where applicable

## CSS Conventions

**Custom Properties Usage:**
- Always use CSS custom properties for colors, fonts, transition timing, and max-width rather than raw values
- Exception: specific pixel values confirmed from live site inspection are written as literals with inline comments

**Responsive Strategy:**
- Mobile-first is NOT used; desktop-first with `max-width` breakpoints
- Breakpoints in order: `1120px`, `1024px`, `768px`, `480px`
- All responsive overrides are grouped in a single `RESPONSIVE` block at the bottom of the `<style>` tag
- Mobile nav (`display: flex`) is shown only at `max-width: 768px`

**Layout:**
- CSS Grid for multi-column layouts (footer, team grid, neighborhoods mosaic, network inner)
- Flexbox for single-axis alignment (nav groups, social bar, ornament heading, mobile nav links)
- `max-width` + `margin: 0 auto` via the `.wrap` utility class (max-width: `var(--max-w)` = 1240px)

**Transitions:**
- Duration/easing always use `var(--ease)` = `0.3s ease` for hover states
- Complex entrance animations use cubic-bezier: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Scroll-reveal elements use `opacity + transform` with 0.85s ease transitions
- Per-element animation delays set via `transition-delay` (inline style or CSS rule)

**Typography Scale:**
- Use `clamp()` for fluid type at section headings: `clamp(26px, 3.5vw, 42px)`
- Fixed pixel sizes only for UI elements confirmed against the live site spec in `SITE-REFERENCE.md`

## JavaScript Conventions

**Module Pattern:**
- Every self-contained feature is wrapped in an immediately-invoked function expression (IIFE):
  ```js
  (function () {
    // feature code
  })();
  ```
- No global variables are intentionally created
- Guard clauses with early return when required DOM elements are missing: `if (!track) return;`

**DOM Selection:**
- `document.getElementById()` for single elements targeted by JS
- `document.querySelector()` / `document.querySelectorAll()` for CSS-class-targeted elements
- Spread operator to convert NodeList to Array: `[...document.querySelectorAll('.hero-slide')]`

**Event Listeners:**
- `{ passive: true }` always passed for scroll and touch events
- `addEventListener` preferred over `on*` properties
- Event delegation is not used; listeners attached directly to elements

**Animation:**
- `requestAnimationFrame` used for scroll-driven position updates to avoid layout thrashing
- `ticking` boolean pattern used to debounce RAF calls:
  ```js
  if (!ticking) {
    requestAnimationFrame(() => { update(); ticking = false; });
    ticking = true;
  }
  ```

**Inline Styles:**
- JavaScript writes `element.style.transform` and `element.style.filter` for animation values only
- Static overrides that need high specificity are set as `style=""` attributes directly on HTML elements (e.g., `style="font-size:42px;"` on the contact section heading)

## Error Handling

**Strategy:** None formally defined. This is a presentational static site with no form submission logic, no API calls, and no async operations.

**Defensive patterns observed:**
- Guard clauses before accessing DOM nodes in JS IIFEs: `if (!track) return;`, `if (!section) return;`
- Touch event thresholding to avoid accidental swipes: `if (Math.abs(dx) > 48)`
- Scroll bounds clamping: `const y = Math.min(window.scrollY, heroH);`

## Logging

No logging framework. No `console.log` statements in production code.

## Comments

**When to Comment:**
- Every major HTML section gets a banner comment
- Every CSS section gets a banner comment
- Every JS IIFE gets a banner comment
- Inline comments explain pixel values that were reverse-engineered from the live site
- Inline comments explain non-obvious CSS/JS decisions (e.g., parallax layer behavior, Ken Burns variant rationale)

**Style:** Plain `/* */` CSS comments and `//` JS line comments. No JSDoc.

## Form Design

**Contact form** (`index.html` line ~1480):
- `name="pvr-contact"` on the form element
- Each field wrapped in `.form-field` div containing `<label>` + `<input>` or `<textarea>`
- Labels use `for` attribute matching input `id`
- Placeholder text mirrors the label (e.g., label "Name", placeholder "First and Last")
- Submit button is `<button type="submit">` inside the form, not `<input type="submit">`
- Form action is `#` — no backend submission currently wired up

---

*Convention analysis: 2026-03-09*
