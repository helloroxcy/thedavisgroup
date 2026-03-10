# External Integrations

**Analysis Date:** 2026-03-09

## APIs & External Services

**Font Delivery:**
- Google Fonts — loads `Mulish` and `Montserrat` typefaces
  - Endpoint: `https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap`
  - Preconnect hints to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` in `<head>` of `index.html`
  - Auth: None (public CDN)

## Data Storage

**Databases:**
- None — fully static site, no database

**File Storage:**
- Local filesystem / static host — images served from `Images/` directory

**Caching:**
- None configured explicitly — relies on browser defaults and hosting platform CDN if applicable

## Authentication & Identity

**Auth Provider:**
- None — no login, user accounts, or protected content

## Contact Form

**Current State:**
- Form is present in `index.html` (lines ~1480–1504) with `method="POST" action="#"`
- Form fields: Name, Email, City of Interest, Message
- Form submission is NOT wired to any backend or service — `action="#"` means submitting reloads the page with no data sent
- No JavaScript form handler is implemented
- This is a known gap: the form needs a submission handler (e.g., Formspree, Netlify Forms, EmailJS, or a custom backend endpoint)

**Fields:**
- `name` (text)
- `email` (email)
- `city` (text)
- `message` (textarea)

## Social Media Links

**Platforms linked (all currently pointing to `#` placeholder):**
- Facebook
- Instagram
- YouTube
- Twitter
- Pinterest

- Actual profile URLs not yet set in `index.html` — all `href="#"`

## External Site Links

**palosverdesrealty.com** — the live WordPress site is referenced for deep links:
- Featured listings: `https://palosverdesrealty.com/featured-listings/`
- Neighborhood pages:
  - `https://palosverdesrealty.com/palos-verdes-estates/`
  - `https://palosverdesrealty.com/manhattan-beach/`
  - `https://palosverdesrealty.com/redondo-beach/`
  - `https://palosverdesrealty.com/rolling-hills-estates/`
  - `https://palosverdesrealty.com/hermosa-beach/`
  - `https://palosverdesrealty.com/rancho-palos-verdes/`
  - `https://palosverdesrealty.com/rolling-hills/`
  - `https://palosverdesrealty.com/hollywood-riviera/`

## Contact Information (hardcoded)

**Phone:** `(310) 920-8812` — linked as `tel:+13109208812`
**General email:** `contact@palosverdesrealty.com` — linked as `mailto:contact@palosverdesrealty.com`
**Agent emails:**
- `billdavishomes@me.com`
- `keith@palosverdesrealty.com`

**Address:** 450 Silver Spur Road, Palos Verdes, CA 90275

## Monitoring & Observability

**Error Tracking:**
- None

**Analytics:**
- None detected — no Google Analytics, Plausible, or similar script present

**Logs:**
- None

## CI/CD & Deployment

**Hosting:**
- Not yet configured — site is a local build; deployment target not specified in repo

**CI Pipeline:**
- None

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Environment Configuration

**Required env vars:**
- None — fully static, no secrets or env vars required

**Secrets location:**
- Not applicable

---

*Integration audit: 2026-03-09*
