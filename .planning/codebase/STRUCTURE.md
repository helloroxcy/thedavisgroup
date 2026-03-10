# Codebase Structure

**Analysis Date:** 2026-03-09

## Directory Layout

```
davis-website/
├── index.html          # Entire site — HTML + all CSS + all JS in one file
├── SITE-REFERENCE.md   # Design spec extracted from original WordPress source
├── Images/             # All image assets used by the site
├── fonts/              # Self-hosted custom font files (Didot)
├── File 2016/          # WordPress backup archive (source reference only, not served)
│   ├── revslider/      # RevSlider templates and images from original WP build
│   ├── elementor/      # Elementor CSS from original WP build
│   ├── oceanwp/        # OceanWP theme files from original WP build
│   └── wpcf7_uploads/  # Contact Form 7 uploads from original WP build
├── .planning/          # GSD planning documents
│   └── codebase/       # Codebase analysis documents
└── .claude/            # Claude configuration
```

## Directory Purposes

**`Images/` (root level):**
- Purpose: All production image assets referenced by `index.html`
- Contains: Hero slides, neighborhood photos, team banner, logos, favicon, contact decorative image, MLS/Realtor badge
- Key files:
  - `Images/hero-bg.jpg` — hero parallax background (1920×1200)
  - `Images/Home 1920x1200 (1–4).jpg` — hero slider slides
  - `Images/Drone PV 1920x1200.jpg` — used in hero slider and mobile nav header
  - `Images/Neighborhood-HB.jpg`, `Neighborhood-MB.jpg`, `Neighborhood-PVE-3.jpg`, `Neighborhood-RH-1.jpg`, `Neighborhood-RHE.jpg`, `Neighborhood-RPV.jpg`, `Neighborhood-HR.jpg`, `Neighborhood-RB.jpg` — neighborhood mosaic tiles (1244×826)
  - `Images/PVR-logotype-wht@2x.png` — white logo (used in dark header, mobile nav, footer)
  - `Images/PVR-logotype-gry2x.png` — gray logo variant
  - `Images/Contact1x.png` — decorative image for network section (845×171)
  - `Images/Team-stock-1.jpg` — team section banner (1440×347)
  - `Images/Realty_Logos@3x.png` — MLS/Equal Housing/Realtor badges in footer
  - `Images/favicon.png` — browser tab icon
  - `Images/PFRE Aug 18.jpg`, `Images/January Entry Exterior Twilight.jpg` — featured properties slider cards

**`fonts/` (root level):**
- Purpose: Self-hosted Didot font files for `@font-face` declaration
- Contains: Two variants of DidotLTStd in woff2, woff, ttf, eot, svg formats
- Key files:
  - `fonts/DidotLTStd-Headline-1.woff2` — primary format used by `@font-face` in `index.html`
  - `fonts/DidotLTStd-Headline-1.woff` — fallback
  - `fonts/DidotLTStd-Headline-1.ttf` — fallback

**`File 2016/` (root level):**
- Purpose: WordPress backup archive — source reference material only, not part of the built site
- Contains: RevSlider templates and assets, Elementor CSS, OceanWP theme files, Contact Form 7 uploads
- Generated: No (imported from WP backup)
- Committed: Yes (as reference archive)
- Note: The original RevSlider hero images are in `File 2016/revslider/home-hero/` — copies renamed and placed in `Images/` for the current build

**`SITE-REFERENCE.md` (root level):**
- Purpose: Design specification extracted from the WordPress source — confirmed colors, typography sizes, spacing values, known discrepancies between build and source
- Key sections: Color palette, typography specs, section-by-section measurements, images inventory, confirmed differences from current build

## Key File Locations

**Entry Point:**
- `index.html`: The entire website — HTML structure, embedded CSS, embedded JavaScript

**Design Reference:**
- `SITE-REFERENCE.md`: Authoritative source of truth for design tokens and measurements. Consult before making any visual changes.

**All CSS:**
- `index.html` lines 11–1172: Two `<style>` blocks in `<head>`. First block contains the `@font-face` declaration. Second block contains all design tokens, component styles, responsive breakpoints, and animation keyframes.

**All JavaScript:**
- `index.html` lines 1591–1785: Single `<script>` block before `</body>`. Contains five IIFE modules in order: Hero Slider, Featured Properties Slider, Scroll Reveal, Foreground Parallax + Hero Blur, Mobile Nav Overlay, Neighborhoods Column Parallax.

**Section IDs (anchor targets):**
- `#hero` — hero slider section
- `#properties` — featured properties slider
- `#neighborhoods` — neighborhood mosaic grid
- `#team` — meet the team section
- `#contact` — join our network / contact form section

## Naming Conventions

**Files:**
- Images use descriptive names with spaces and mixed case: `Home 1920x1200 (1).jpg`, `Neighborhood-PVE-3.jpg`
- Font files use exact vendor names: `DidotLTStd-Headline-1.woff2`
- No kebab-case consistency enforced on image files

**CSS Classes:**
- Component prefix pattern: `.feat-card`, `.feat-track`, `.feat-nav` (featured properties); `.nbhd-col`, `.nbhd-tile`, `.nbhd-tile-label` (neighborhoods); `.team-name`, `.team-bio` (team)
- State classes: `.active` (current hero slide), `.visible` (revealed element), `.open` (mobile nav overlay)
- Utility classes: `.wrap` (max-width container), `.reveal` (scroll-reveal), `.section-label`, `.section-title`, `.section-rule`, `.ornament-heading`
- Modifier classes: `.orn-light` / `.orn-dark` on `.ornament-heading`, `.light` on `.outline-btn`

**JavaScript IDs (DOM hooks for JS):**
- `#heroPrev`, `#heroNext`, `#heroContent`, `#heroScrollDown` — hero slider controls
- `#propTrack`, `#propPrev`, `#propNext` — featured properties slider
- `#navToggle`, `#mobileNav`, `#mobileNavClose` — mobile navigation
- `#mobileNavHomeLink`, `#mnTeam`, `#mnNeighborhoods`, `#mnContact` — mobile nav links

## Where to Add New Code

**New page section:**
- Add HTML between existing `<section>` blocks in `index.html`, before the `</body>` tag's `<script>` block
- Add corresponding CSS inside the second `<style>` block, organized under a `/* === SECTION NAME === */` comment block following the existing pattern
- Add a section ID (e.g., `id="new-section"`) and add the anchor to both desktop nav (`.nav-group`) and mobile nav (`.mobile-nav-links`)

**New interactive behavior:**
- Add a new IIFE at the bottom of the `<script>` block in `index.html`, following the existing pattern:
  ```javascript
  /* ─── FEATURE NAME ─────────────────────── */
  (function () {
    // query DOM, bind events, manage local state
  })();
  ```

**New images:**
- Place in `Images/` directory
- Reference as `src="Images/filename.ext"` — paths are relative to `index.html` at root

**New fonts:**
- Place font files in `fonts/`
- Add `@font-face` declaration in the first `<style>` block in `<head>`
- Register as a new CSS custom property in `:root` if used site-wide

**New design token (color, spacing, etc.):**
- Add to the `:root {}` block at the top of the second `<style>` block
- Use `--kebab-case` naming consistent with existing tokens

**Responsive styles:**
- Add to the appropriate existing `@media` block at the bottom of the second `<style>` block
- Breakpoints in use: `1120px` (slider nav position), `1024px` (tablet — hide desktop nav, show hamburger), `768px` (mobile layout + show mobile nav), `480px` (small mobile)

## Special Directories

**`File 2016/`:**
- Purpose: Original WordPress site backup used as design reference during rebuild
- Generated: No
- Committed: Yes
- Note: Not served as part of the live site — purely a local reference archive. The `revslider/home-hero/` subdirectory contains the original property slider images that were the source for `Images/hero-slide-1.jpg`, etc.

**`.planning/`:**
- Purpose: GSD planning documents and codebase analysis
- Generated: By GSD tooling
- Committed: Yes

---

*Structure analysis: 2026-03-09*
