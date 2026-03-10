# Palos Verdes Realty — Site Reference
*Extracted from WordPress backup (wp.26_92802.2026-02-26_20-35-02)*

---

## COLOR PALETTE (confirmed from Elementor global kit CSS)

| Variable | Hex | Usage |
|---|---|---|
| Dark navy | `#292B33` | Primary dark bg, form bg, header |
| Rust/accent | `#C2766A` | Accent color, links, button text |
| Gray-blue | `#616471` | Section heading text (Meet the Team, etc.) |
| Divider | `rgba(71, 75, 89, 0.38)` | Ornament heading lines |
| White | `#FFFFFF` | Text on dark, bg |
| Near-black | `#1B1C21` | Darkest bg variant |
| Mid-gray | `#767676` | Secondary text |
| Border gray | `#A8A8A8` | Form button border |
| Input border | `#969696` | Form input bottom border |

---

## TYPOGRAPHY (confirmed from Elementor & child theme CSS)

### Fonts in Use
| Font | Role | Source |
|---|---|---|
| **Didot** (DidotLTStd-Headline) | All display/serif headlines | Custom @font-face — woff2 at `/uploads/2019/07/DidotLTStd-Headline-1.woff2` |
| **Montserrat** | Navigation, labels, body copy, taglines | Google Font |
| **Roboto** | Form SEND button only | Google Font |

> **Note:** Elementor loads Didot with `font-weight: bold`. The @font-face for 'Didot' declares `font-weight: bold`, so all serif headings should use `font-weight: bold` (not 400).

---

## SECTION-BY-SECTION SPECIFICATIONS

### HEADER / NAV
- Nav links: Montserrat, 14px, weight 500, uppercase, letter-spacing 3.3px, color #ffffff
- Logo width: 71% of column on desktop
- Header bg scrolled: #292B33

---

### HERO SECTION
- **Background image:** `Trump-Aerial-100-jd.jpg`
- **Background position:** top center
- **Background size:** 100vw auto
- **Background attachment:** `fixed` on desktop (parallax scroll effect)
- **Dark overlay:** `rgba(0,0,0,0.98)` at `opacity: 0.11` → effectively `rgba(0,0,0,0.11)`
- **Hero title:** Didot, `3.4vw` (≈42px at 1248px viewport), **bold**, letter-spacing: 5.5px, color #ffffff, padding-top: 36%
- **Hero tagline:** Montserrat, normal weight, letter-spacing: 3px, line-height: 1.7em, color #ffffff, padding-bottom: 12%

> **Current build issue:** Hero title uses `53px` fixed. Source is `3.4vw` = ~42px at 1248px. Also letter-spacing should be 5.5px (we have 5px).

---

### FEATURED PROPERTIES SLIDER (RevSlider)
- **Section bg:** `#292B33`
- **Slider dimensions (desktop CSS px):** `1002px × 626px` (from 2005×1253 Retina measurement)
- **Aspect ratio:** ~16:10
- **"FEATURED" heading:** Didot, 36px, letter-spacing 4px (from JS inspection of live site)
- **Heading ornament lines:** `rgba(71,75,89,0.38)`, 1px solid
- **Property address text:** Montserrat, 16px, weight 400, letter-spacing 2px, uppercase, color #ffffff
- **VIEW ALL button:** Montserrat, 16px, weight 700, letter-spacing 0.8px, uppercase, color `#C2766A`, border `rgba(255,255,255,0.35)`
- **RevSlider images (home-hero folder):** `27.jpg` (1440×961), `46.jpg` (1440×611), `49.jpg` (1440×960)

---

### MEET THE TEAM HEADING (ornament style)
Confirmed from `post-3825.css` element `2b7efd1`:
- Font: Didot, **32px**, uppercase, line-height 1.2em, letter-spacing 3.3px
- Color: `#292b33`
- Divider lines: `rgba(71,75,89,0.38)`, 1px solid, width 20% of column
- Column layout at desktop: Left divider col 33% | Heading col 33% | Right divider col 33%
- Column layout at tablet (768–1024px): 25% | 50% | 25%
- Mobile: all centered, dividers center-aligned

> **Current build issue:** We use 34px (from computed style inspection). Source says 32px.

---

### NEIGHBORHOODS MOSAIC
- Neighborhood images all: **1244 × 826px** (from WordPress uploads)
- Available images: HB (Hermosa Beach), HR, MB (Manhattan Beach), PVE-3 (Palos Verdes Estates), RB, RH-1 (Rolling Hills), RHE (Rolling Hills Estates), RPV (Rancho Palos Verdes)

---

### JOIN OUR NETWORK SECTION
Confirmed from `post-3825.css`:
- **Section bg:** `#292B33`
- **Contact image (decorative):** `Contact1x.png`, position: bottom right, size: 57vw auto
- **"Join Our Network" heading:** Didot, **42px**, letter-spacing 3.1px, color #ffffff, line-height 1.2em
- **"GET DIRECTIONS" label:** Montserrat, **15px**, bold, letter-spacing 2px, color `#C2766A`
- **Address text:** Montserrat, 15px, weight 300, line-height 34px, letter-spacing 0.8px, color #ffffff
- **Phone/secondary:** Montserrat, 15px, weight 300, line-height 25px, letter-spacing 0.8px, color #ffffff
- **Column layout:** Network info (left) | Form (right). At tablet: network col 40%, form col 60%

---

### CONTACT FORM
Confirmed from `post-3825.css` element `fa5b8ae`:
- **Form labels:** Montserrat, 14px, weight 700, uppercase, letter-spacing 0.8px, color #ffffff
- **Form inputs:** Montserrat, 18px, weight 400, letter-spacing 0.8px, color #ffffff
- **Input border:** bottom only, 1px solid `#969696`, border-radius 0
- **Input bg:** #292B33 (same as section bg — transparent appearance)
- **SEND button font:** **Roboto** (not Montserrat!), 16px, weight 700, uppercase, letter-spacing 0.8px
- **SEND button:** bg `#292B33`, color `#C2766A`, border 1px solid `#A8A8A8`, padding 13px 60px
- **SEND button hover:** color changes to #ffffff

> **Current build issue:** Form button uses `--font-nav` (Montserrat). Source uses **Roboto**.

---

## FONT FILE LOCATIONS (in this WordPress backup)

```
/wp-content/webfonts/
  DidotLTStd-Headline.eot
  DidotLTStd-Headline.woff
  DidotLTStd-Headline.woff2   ← best format
  DidotLTStd-Headline.ttf
  DidotLTStd-Headline.svg

/wp-content/uploads/2019/07/
  DidotLTStd-Headline-1.woff2  ← used by Elementor @font-face
  DidotLTStd-Headline-1.ttf
  DidotLTStd-Headline.eot
  DidotLTStd-Headline.woff
  DidotLTStd-Headline.svg
```

---

## IMAGES INVENTORY

### Hero
| File in `/Images/` | Source | Dimensions | Usage |
|---|---|---|---|
| `hero-bg.jpg` | 2020/10/Trump-Aerial-100-jd.jpg | 1920×1200 | Hero parallax background |
| `hero-slide-1.jpg` | revslider/home-hero/27.jpg | 1440×961 | Hero RevSlider slide 1 |
| `hero-slide-2.jpg` | revslider/home-hero/46.jpg | 1440×611 | Hero RevSlider slide 2 |
| `hero-slide-3.jpg` | revslider/home-hero/49.jpg | 1440×960 | Hero RevSlider slide 3 |

### Featured Properties Slider
| File in `/Images/` | Dimensions | Notes |
|---|---|---|
| `PFRE Aug 18.jpg` | — | Already in build |
| `January Entry Exterior Twilight.jpg` | — | Already in build |
| `Home 1920x1200 (1).jpg` | — | Already in build |
| `Home 1920x1200 (2).jpg` | — | Already in build |
| `JanuaryEntry_ExteriorTwilight-1.jpg` | 2000×1333 | WP original |
| `main-home.jpg` | 1440×958 | WP main home photo |

### Neighborhoods
| File | Neighborhood | Dimensions |
|---|---|---|
| `Neighborhood-HB.jpg` | Hermosa Beach | 1244×826 |
| `Neighborhood-MB.jpg` | Manhattan Beach | 1244×826 |
| `Neighborhood-PVE-3.jpg` | Palos Verdes Estates | 1244×826 |
| `Neighborhood-RH-1.jpg` | Rolling Hills | 1244×826 |
| `Neighborhood-RHE.jpg` | Rolling Hills Estates | 1244×826 |
| `Neighborhood-RPV.jpg` | Rancho Palos Verdes | 1244×826 |
| `Neighborhood-HR.jpg` | — | 1244×826 |
| `Neighborhood-RB.jpg` | — | 1244×826 |
| `Featured-Neighborhoods.png` | All neighborhoods graphic | 960×652 |
| `neighborhoods.jpg` | General | 1440×979 |

### Team
| File | Dimensions | Notes |
|---|---|---|
| `Team-stock-1.jpg` | 1440×347 | Team banner |

### Contact & UI
| File | Notes |
|---|---|
| `Contact1x.png` | Decorative contact section image, position: bottom right, size: 57vw auto (845×171px actual) |
| `PVR-logotype-wht@2x.png` | White logo (692×118) |
| `PVR-logotype-gry2x.png` | Gray logo (692×118) |

---

## CONFIRMED DIFFERENCES FROM CURRENT BUILD

| Element | Current Build | Source (confirmed) |
|---|---|---|
| Hero title size | `53px` | `3.4vw` (~42px at 1248px) |
| Hero title letter-spacing | `5px` | `5.5px` |
| Hero tagline letter-spacing | `2px` | `3px` |
| Hero bg attachment | not set | `fixed` (parallax) |
| MEET THE TEAM heading | `34px` | `32px` |
| Form SEND button font | Montserrat | **Roboto** |
| Form SEND button size | (check) | `16px` |
| Input border color | `rgb(150,150,150)` | `#969696` (=150,150,150) ✓ same |

---

## GLOBAL LAYOUT

- Standard section max-width: **1140px** (Elementor global)
- Wide section max-width: **1400px** (used on hero, network/contact sections)
- Standard responsive breakpoints: **1024px** (tablet), **767px** (mobile)
- Standard section transition: `background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s`
