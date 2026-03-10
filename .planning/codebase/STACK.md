# Technology Stack

**Analysis Date:** 2026-03-09

## Languages

**Primary:**
- HTML5 - Single-page site markup (`index.html`)
- CSS3 - All styling embedded in `<style>` blocks within `index.html`
- JavaScript (ES6+) - All interactivity embedded in `<script>` block at bottom of `index.html`

**Secondary:**
- None

## Runtime

**Environment:**
- Static site — no server-side runtime required
- Served directly as static files (no Node, Python, PHP, etc.)

**Package Manager:**
- None — no package manager or lockfile present

## Frameworks

**Core:**
- None — vanilla HTML/CSS/JavaScript only, no frontend framework (no React, Vue, Angular, etc.)

**Testing:**
- None detected

**Build/Dev:**
- None — no build step, bundler, or transpiler (no Webpack, Vite, Rollup, etc.)

## Key Dependencies

**External (CDN-loaded):**
- Google Fonts CSS API — loads `Mulish` (weights 300, 400, 600) and `Montserrat` (weights 300, 400, 500, 600, 700) via `<link>` in `<head>` of `index.html`
- No JavaScript libraries loaded from CDN (no jQuery, no Alpine.js, etc.)

**Local Assets:**
- Custom font files in `fonts/` — `DidotLTStd-Headline-1` (woff2, woff, ttf) and legacy `DidotLTStd-Headline` variants (eot, svg, ttf, woff, woff2)
- Images in `Images/` — hero slides, neighborhood photos, team photos, logo files, badge images
- Historical WordPress images archived in `File 2016/` — not served by this build

## Configuration

**Environment:**
- No environment variables — fully static, no server config required

**Build:**
- No build config files (no `package.json`, `vite.config.*`, `webpack.config.*`, etc.)

## Browser APIs Used

All implemented in vanilla JS within `index.html`:
- `IntersectionObserver` — scroll-reveal animations
- `requestAnimationFrame` — neighborhood column parallax
- Touch events (`touchstart`, `touchend`) — swipe support on hero and property sliders
- `window.scrollY` / scroll event — hero foreground parallax and blur effects
- `scrollIntoView` — smooth scroll-to-section on hero arrow click

## Platform Requirements

**Development:**
- Any text editor
- Local HTTP server (e.g., `python3 -m http.server`, VS Code Live Server) to serve fonts/images correctly during development

**Production:**
- Any static file host (e.g., Netlify, GitHub Pages, AWS S3+CloudFront, Vercel, or direct upload to web host)
- No server-side processing required

---

*Stack analysis: 2026-03-09*
