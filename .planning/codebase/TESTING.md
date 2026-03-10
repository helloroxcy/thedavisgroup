# Testing Patterns

**Analysis Date:** 2026-03-09

## Test Framework

**Runner:** None

**Assertion Library:** None

**Run Commands:** Not applicable — no test commands exist.

## Current Testing State

This project has **no automated testing infrastructure** of any kind.

- No `package.json` in the project root (the `package.json` at the parent directory level is unrelated)
- No test runner (Jest, Vitest, Mocha, Playwright, Cypress, etc.)
- No test files (`*.test.*`, `*.spec.*`, `*.e2e.*`)
- No testing configuration files
- No CI pipeline or automated check scripts
- No linter configured to catch regressions

The codebase is a single static HTML file (`index.html`) with no module system, no build step, and no JavaScript imports. All testing is currently manual and visual.

## Manual Testing Surface

The full site behavior lives in `index.html`. Manual verification covers:

**Interactive features to test manually:**
- Hero slider: prev/next buttons advance slides; auto-advances every 7 seconds; touch swipe works on mobile
- Hero scroll-down chevron: scrolls to `#properties` section
- Featured properties slider: prev/next buttons and touch swipe cycle through cards
- Scroll-reveal: `.reveal` elements fade in when entering viewport
- Foreground parallax: hero header/content drifts up on scroll; hero images blur as user scrolls down
- Neighborhoods parallax: columns 1 and 3 shift vertically in opposite directions while scrolling (disabled at ≤768px)
- Mobile nav overlay: hamburger opens overlay; close button and nav link taps close it; Escape key closes it
- Form: all fields accept input; submit button is present (no backend currently)

**Responsive breakpoints to test manually:**
- Desktop (≥1025px): full nav visible, 3-column neighborhood mosaic, 2-column team grid
- Tablet (1024px): hamburger nav appears, 2-column neighborhood grid, 1-column network layout
- Mobile (768px): mobile nav overlay shown, hero prev/next arrows hidden, team stack to single column
- Small mobile (480px): neighborhood mosaic collapses to 1 column

## Adding Tests in the Future

If automated testing is introduced, the recommended approach given this project's nature:

**Visual regression testing** would cover the most risk surface — tools like Playwright or Puppeteer can screenshot pages and diff against baselines.

**Suggested test file location** (if a test directory is created):
- `tests/` at project root
- `tests/visual/` for screenshot-based tests
- `tests/interactions/` for JS behavior tests

**Suggested test structure** if Playwright is adopted:
```js
// tests/interactions/hero-slider.spec.js
import { test, expect } from '@playwright/test';

test('hero slider advances on next click', async ({ page }) => {
  await page.goto('/');
  const firstSlide = page.locator('.hero-slide.active');
  await page.click('#heroNext');
  // assert second slide is now active
});
```

**What to test if tests are added:**
- Slider state transitions (class changes on `.hero-slide`, `.feat-card`)
- Mobile nav open/close state (`.open` class, `aria-hidden` attribute)
- Scroll-reveal triggering (`.visible` class added on `.reveal` elements)
- Parallax transform values at known scroll positions
- Responsive breakpoint layout changes

## Coverage

**Requirements:** None enforced.

**Current coverage:** 0% automated. All verification is manual.

---

*Testing analysis: 2026-03-09*
