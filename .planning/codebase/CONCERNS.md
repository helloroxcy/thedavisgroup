# Codebase Concerns

**Analysis Date:** 2026-03-09

---

## Tech Debt

**All CSS and HTML in a single monolithic file:**
- Issue: The entire site — 1,788 lines — lives in `index.html`, with all CSS embedded in two `<style>` blocks in `<head>` and all JavaScript inline at the bottom. There is no separation of concerns, no external stylesheet, and no build pipeline.
- Files: `index.html`
- Impact: Every change requires navigating a very long file. Styles for unrelated sections are interleaved. No ability to cache CSS separately from HTML.
- Fix approach: Extract CSS to `styles.css` and JS to `main.js`; reference them with `<link>` and `<script src>`.

**Hardcoded pixel values alongside CSS custom properties:**
- Issue: The `:root` block defines design tokens (`--dark`, `--accent`, `--font-serif`, etc.), but many rules bypass them with raw hex values (`#292B32`, `#1B1C21`, `#626470`, `rgba(41,43,51,0.35)`, `#B87A6D`) scattered throughout. The `feat-view-all` button uses `#292B32` instead of `var(--dark)`. The featured properties nav arrow uses `stroke: #B87A6D` instead of `var(--accent)`.
- Files: `index.html` (lines ~536, ~526, ~139, ~669)
- Impact: Color changes require hunting every hardcoded value in addition to updating `:root`.
- Fix approach: Replace all raw hex literals with the corresponding CSS custom property.

**Inline style overrides on elements:**
- Issue: The "Join Our Network" heading at line 1475 uses `style="font-size:42px;line-height:42px;letter-spacing:3.1px;font-weight:bold;"` directly on the element rather than a CSS class. The second team reveal card at line 1455 uses `style="transition-delay: 0.2s;"`.
- Files: `index.html` (lines 1455, 1475)
- Impact: Presentation logic is split between the stylesheet and the markup, making global changes inconsistent.
- Fix approach: Create utility or modifier classes (e.g., `.network-heading`, `.reveal--delayed`) and move these values to CSS.

**Duplicate social icon markup:**
- Issue: The full social icon bar SVG block (~22 lines) appears identically twice: once between the Featured Properties and Neighborhoods sections (lines ~1348-1371) and again between the Contact section and Footer (lines ~1512-1535).
- Files: `index.html`
- Impact: Any change to social links (adding a platform, fixing an href) must be made in two places. Currently all social `href` values are `#` (placeholders — see Known Bugs below).
- Fix approach: If a templating approach is adopted, extract to a single partial. At minimum, add a comment marking both instances as needing the same update.

**Roboto font not loaded:**
- Issue: `SITE-REFERENCE.md` confirms the SEND button font should be Roboto. The current build uses `var(--font-nav)` (Montserrat) for `.form-submit`. Roboto is not listed in the Google Fonts `<link>` at line 10.
- Files: `index.html` (lines 10, 856)
- Impact: Visual mismatch from the source design.
- Fix approach: Add `family=Roboto:wght@700` to the Google Fonts URL and create a `--font-roboto` custom property; apply it to `.form-submit`.

---

## Known Bugs

**Contact form submits nowhere:**
- Symptoms: The form at line 1480 has `action="#"` and `method="POST"`. Submitting it reloads the page with no data sent anywhere.
- Files: `index.html` (line 1480)
- Trigger: Click "Send" on the contact form with any input.
- Workaround: None — form submissions are silently lost.

**All social media links are dead placeholders:**
- Symptoms: Every `<a class="social-bar-icon">` in both social bars links to `href="#"`. Facebook, Instagram, YouTube, Twitter/X, and Pinterest all scroll to the top of the page on click.
- Files: `index.html` (lines ~1353-1367, ~1517-1531)
- Trigger: Click any social icon.
- Workaround: None.

**"Read More" links are dead placeholders:**
- Symptoms: Both "Read More" links in the Meet The Team section (`#team`) point to `href="#"`.
- Files: `index.html` (lines 1451, 1458)
- Trigger: Click "Read More" on either team member.
- Workaround: None.

**Privacy Policy link is a dead placeholder:**
- Symptoms: The Privacy Policy link in the footer nav points to `href="#"`.
- Files: `index.html` (line 1573)
- Trigger: Click "Privacy Policy" in the footer.
- Workaround: None.

**Hero logo and home logo links go nowhere:**
- Symptoms: The header logo (`<a class="header-logo" href="#">`) and the footer logo (`<a href="#">`) both point to `href="#"`.
- Files: `index.html` (lines 1238, 1545)
- Trigger: Click either logo.
- Workaround: None — they scroll to the top rather than navigating to a canonical home URL.

**Hero title uses wrong size and letter-spacing (confirmed against source):**
- Symptoms: `.hero-title` is set to `53px` fixed and `letter-spacing: 5px`. The confirmed source value is `3.4vw` (~42px at 1248px viewport) and `letter-spacing: 5.5px`.
- Files: `index.html` (lines 353-355); documented in `SITE-REFERENCE.md` line 186
- Trigger: Visible at all viewport sizes; most apparent at wide viewports where 53px is noticeably larger than the source.

**"Meet The Team" heading uses wrong font size (confirmed against source):**
- Symptoms: `.ornament-heading.orn-light span` is set to `34px`. The confirmed source value is `32px`.
- Files: `index.html` (line 142); documented in `SITE-REFERENCE.md` line 78
- Trigger: Visible on desktop.

**Hero tagline letter-spacing is wrong:**
- Symptoms: `.hero-tagline` uses `letter-spacing: 2px`. The confirmed source value is `3px`.
- Files: `index.html` (line 366); documented in `SITE-REFERENCE.md` line 188

---

## Security Considerations

**No CSRF protection or server-side validation on contact form:**
- Risk: When a form backend is eventually added, the current form structure has no hidden CSRF token field and no client-side validation (required fields, email format, message length).
- Files: `index.html` (lines 1480-1504)
- Current mitigation: `action="#"` means no data is sent — there is no backend to attack.
- Recommendations: When wiring up a backend or third-party service (e.g., Netlify Forms, Formspree), add required attributes to inputs, validate email format client-side, and use whatever CSRF mechanism the backend provides.

**External Google Fonts loaded without Subresource Integrity (SRI):**
- Risk: The Google Fonts stylesheet is loaded without an `integrity` attribute. A CDN compromise could inject malicious CSS.
- Files: `index.html` (line 10)
- Current mitigation: Google Fonts is widely trusted; practical risk is low.
- Recommendations: Self-host the font files (woff2 only) to eliminate the external dependency entirely, which also improves performance.

---

## Performance Bottlenecks

**74 MB total image directory, 60 MB of which are unused AdobeStock files:**
- Problem: `Images/` contains 10 AdobeStock JPEG files (4-8 MB each, 60 MB total) that are not referenced anywhere in `index.html`. They are present alongside the production images.
- Files: `Images/AdobeStock_*.jpeg` (10 files), `Images/`
- Cause: Design exploration assets committed alongside production assets.
- Improvement path: Move unused images out of the repo or into a separate untracked `_unused/` directory. No impact on the page itself, but repo clone size is inflated.

**Hero images are large, unoptimized JPEGs with no `srcset`:**
- Problem: The five hero slider images (`Home 1920x1200 (1-4).jpg`, `Drone PV 1920x1200.jpg`) are full 1920-wide JPEGs loaded as plain `<img>`. No `srcset`, no WebP alternative. All five images are requested by the browser even though only one is visible at a time (the hidden slides have `opacity: 0` but the images are not lazy-loaded — only the non-first slides eventually get `loading="lazy"` — but slide 1 is always eager-loaded).
- Files: `index.html` (lines 1209-1223), `Images/`
- Cause: No image optimization pipeline.
- Improvement path: Convert to WebP; add `srcset` for 768px, 1280px, 1920px breakpoints; confirm `loading="lazy"` is present on slides 2-5 (it is not on slides 1-5 currently — only featured property cards use `loading="lazy"`).

**All CSS delivered render-blocking in `<head>` as two large `<style>` blocks:**
- Problem: ~1,100 lines of CSS are in `<head>` with no deferral. While inline CSS avoids a render-blocking request, it makes the HTML payload large and uncacheable.
- Files: `index.html`
- Cause: Single-file architecture.
- Improvement path: Extract to an external `styles.css` with far-future cache headers.

**No image dimensions declared on neighborhood and team images:**
- Problem: Neighborhood tile images and the team banner do not have explicit `width`/`height` attributes. This causes layout shift (CLS) as images load.
- Files: `index.html` (lines ~1381-1424, 1443)
- Cause: Images sized purely via CSS (`height: 360px`, `height: 280px`, etc.) with no HTML dimension hints.
- Improvement path: Add `width` and `height` attributes matching the CSS-rendered dimensions, or use `aspect-ratio` in CSS to reserve space before images load.

---

## Fragile Areas

**Featured Properties slider nav button positioning (`calc(50% - 560px)`):**
- Files: `index.html` (lines 523-524)
- Why fragile: `#propPrev` and `#propNext` are positioned with `left: calc(50% - 560px)` and `right: calc(50% - 560px)`, which assumes the slider is exactly 1002px wide (half = 501px, plus 59px offset). If the slider width changes (e.g., at the 1024px breakpoint where it switches to `max-width: 802px`), the nav buttons overlap the slider at some viewport widths. The breakpoint at 1120px partially compensates by switching to `left: 16px` / `right: 16px`.
- Safe modification: Change to percentage- or flex-based positioning, or position buttons relative to the `.feat-slider-wrap` container.
- Test coverage: None — no automated tests exist.

**Neighborhoods column parallax disabled only at `<= 768px`, not at `<= 1024px` tablet:**
- Files: `index.html` (lines 1765-1772)
- Why fragile: The CSS switches to a 2-column grid at `max-width: 1024px`, removing `.nbhd-col` flex context (`display: contents`). The parallax JS only disables at `<= 768px`. Between 769px and 1024px the parallax transform is still applied to `.nbhd-col-1` and `.nbhd-col-3` even though `display: contents` means the transform is applied to a ghost box.
- Safe modification: Change the JS breakpoint from `768` to `1024` to match the CSS breakpoint.
- Test coverage: None.

**Mobile nav overlay is always rendered in DOM but hidden via `display: none` / opacity:**
- Files: `index.html` (lines 1062-1171)
- Why fragile: `.mobile-nav` starts as `display: none` but switches to `display: flex` at `@media (max-width: 768px)`. On desktop, the overlay exists in the DOM but is not shown. If a desktop user somehow triggers `openNav()` (e.g., via keyboard or developer tools), `body.overflow = hidden` fires on a viewport where the nav is not visible.
- Safe modification: The JS `openNav`/`closeNav` functions are only wired to mobile-visible buttons, so the practical risk is low.

---

## Scaling Limits

**Single static HTML file with no CMS:**
- Current capacity: All content (team bios, property addresses, neighborhood links) is hardcoded in `index.html`.
- Limit: Adding team members, updating property listings, or changing neighborhood URLs requires editing raw HTML.
- Scaling path: Integrate a static site generator (e.g., Eleventy, Hugo) or a headless CMS to template the repeating sections.

---

## Dependencies at Risk

**Twitter/X social icon still uses old Twitter bird brand:**
- Risk: Twitter rebranded to X in 2023. The SVG path at line 1363 is the legacy Twitter bird. Using the old logo may appear dated or confusing to visitors.
- Impact: Visual brand inconsistency.
- Migration plan: Replace with the X logo SVG.

**Duplicate font files in `fonts/` directory:**
- Risk: Both `DidotLTStd-Headline-1.*` (the Elementor variant) and `DidotLTStd-Headline.*` (the original variant) exist in `fonts/`. The `@font-face` rule only references the `-1` variant. The originals (`.eot`, `.svg`, `.ttf`, `.woff`, `.woff2` without `-1`) are unused.
- Files: `fonts/DidotLTStd-Headline.eot`, `fonts/DidotLTStd-Headline.svg`, `fonts/DidotLTStd-Headline.ttf`, `fonts/DidotLTStd-Headline.woff`, `fonts/DidotLTStd-Headline.woff2`
- Impact: Repo bloat only.
- Migration plan: Remove the five unused `DidotLTStd-Headline.*` (non `-1`) files and the `.ttf` format from the `@font-face` declaration (woff2 + woff is sufficient for all modern browsers).

---

## Missing Critical Features

**No form submission backend:**
- Problem: The contact form has no action URL, no Netlify Forms attribute, no Formspree endpoint, and no JavaScript fetch handler. Submitted data goes nowhere.
- Blocks: The primary business conversion goal (capturing visitor contact information) is non-functional.

**No analytics or tracking:**
- Problem: There is no Google Analytics, GA4, Plausible, or any other tracking script in the page.
- Blocks: Cannot measure traffic, conversion events, or visitor behavior.

**No Open Graph / social meta tags:**
- Problem: The `<head>` contains only a basic `<title>` and `<meta charset>` / `<meta viewport>`. There are no `og:title`, `og:image`, `og:description`, `twitter:card`, or structured data tags.
- Blocks: Unfurling the URL on social media or iMessage will show a blank preview.

**No `<meta name="description">` for SEO:**
- Problem: There is no description meta tag.
- Blocks: Search engine snippet will be auto-generated from page content rather than a controlled description.

---

## Test Coverage Gaps

**No tests of any kind:**
- What's not tested: All JavaScript behavior — slider auto-advance, swipe detection, scroll parallax, mobile nav open/close, scroll reveal — has zero test coverage.
- Files: `index.html` (lines 1591-1784)
- Risk: Any refactor of the JS functions could silently break slider navigation, the mobile menu, or the parallax effect.
- Priority: Low for a static marketing site, but consider adding Playwright or Cypress smoke tests for the hero slider and contact form submission flow once a backend is wired up.

---

## Images: Unlicensed / Unverified Files

**Three files explicitly named "Unlicensed Image":**
- Files: `Images/Unlicensed Image.jpg`, `Images/Unlicensed Image (1).jpg`, `Images/Unlicensed Image (2).jpg`
- Risk: These filenames indicate images of unknown licensing status. None are currently referenced in `index.html`, but their presence in the repo is a legal flag.
- Recommendation: Verify licensing or remove these files from the repository before public deployment.

---

*Concerns audit: 2026-03-09*
