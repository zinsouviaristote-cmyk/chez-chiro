# Chez Chiro — Design system (V2)

> Uber's structure and type logic, Chez Chiro's colours.

**Source:** Uber's design system (Refero style "Uber"), checked against uber.com (19 Oct 2026: H1 52px/64px weight 700, H2 36px/44px weight 700, body 16px/24px, letter-spacing normal). We take its typography and structural rules. We keep Chez Chiro's colours and logo.

**Theme:** light. Cream canvas, one soft surface, brown for dark bands.

The page should feel calm, direct and useful: big, bold, left-aligned headlines; real food photos; flat surfaces; one clear action per block (order on WhatsApp). Nothing decorative. If an element does not help someone choose a dish or place an order, it goes.

---

## 1. Colours

| Token | Value | Role | Uber equivalent |
|---|---|---|---|
| `--color-orange` | `#E7641B` | Primary action: the "Commander sur WhatsApp" button, active states. Never body text on cream (3.2:1). | Uber black button |
| `--color-brown` | `#311408` | Dark surfaces: dark bands, footer, announcement bar, mobile sticky bar, hero overlay. Secondary button fill. | Black `#000000` surfaces |
| `--color-ink` | `#272928` | Text: headings and body. | `#000000` text |
| `--color-ink-soft` | `#5C5A55` | Secondary text, captions, metadata. Anthracite lightened; 6.6:1 on cream. | `#4B4B4B` / `#5E5E5E` |
| `--color-cream` | `#FDFBF1` | Page canvas. | `#FFFFFF` |
| `--color-surface` | `#F5F1E3` | The one soft surface: cards, alternating bands, table headers. Derived from the cream (same hue, darker, less saturated). | `#F6F6F6` |
| `--color-line` | `#E3DDCD` | 1px hairlines on cream and on the soft surface. | `#E2E2E2` |
| `--color-spark` | `#F2730D` | Small highlights only: rating stars, a dot. One text exception: the rotating word of the hero headline (display size on the brown overlay, 5.8:1). Never body text, never a fill larger than an icon. | — |

On brown surfaces: text is cream (`#FDFBF1`), secondary text cream at 72%, hairlines cream at 15%.

**Depth comes from surface steps, never from shadows:** cream → soft surface → brown. A card on cream is soft surface; a card on soft surface is cream; a band that must stand out is brown.

---

## 2. Typography

### Family

**Figtree** (Google Fonts, OFL, variable 300–900), loaded once through `next/font/google`, used for everything. One family, no second font.

Why Figtree: Uber Move (headlines) and Uber Move Text (body) are proprietary. We compared Inter Tight, Plus Jakarta Sans and Figtree on the hero headline, a section heading and a menu line, and against uber.com's own "Go anywhere" (52px bold):

| Font | "Go anywhere" (Uber Move: 318px) | "Explore what you can do with Uber" (Uber Move: 566px) | Shapes |
|---|---|---|---|
| **Figtree** | **318px** | 579px | Round geometric bowls (G, o, c, e), double-storey a, straight-tailed y, open apertures: the same skeleton as Uber Move. |
| Inter Tight | 316px | 569px | Width matches, but the letters are narrower, squarer grotesque shapes, tighter apertures. Reads "tech UI", not Uber Move. |
| Plus Jakarta Sans | 336px | 601px | Wider and taller x-height, more stylised (g, y, rounded joins). Clearly further away. |

No serif. No italics in headings, no "accent word in another style" pattern.

### Rules

- Sentence case everywhere ("Commander sur WhatsApp", not "Commander Sur WhatsApp").
- Letter-spacing normal. Slightly negative only at display sizes (−0.02em at 40–72px).
- Left-aligned. Body copy is never centred.
- Uppercase only for very short labels: badges, table headers, footer column labels. No uppercase eyebrow above section headings.
- Copy: short, concrete, confident French. Headlines say something specific about Chez Chiro, never a slogan. No rhetorical questions, no emoji in headings.
- Where facts appear: phone numbers only in the header, section 7 and the footer. Google rating only in the hero proof bar and section 6. TikTok audience and Barbecue d'Or in the hero proof bar and section 4. Nothing else is repeated.
- Weights: 400 body, 500 subheadings, 700 headings, buttons and prices.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Numbers in tables and prices use tabular figures.

### Scale (mobile → desktop)

| Role | Utility | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| Hero display | `text-display` | 40 → 72px (fluid) | 700 | 1.08 | −0.02em |
| Section heading | `text-heading` | 30 → 36px | 700 | 1.22 | −0.01em |
| Heading small | `text-heading-sm` | 24px | 700 | 1.33 | normal |
| Subheading | `text-subheading` | 18px | 500 | 1.33 | normal |
| Body | `text-body` | 16px | 400 | 1.5 | normal |
| Small | `text-small` | 14px | 400 | 1.5 | normal |
| Caption | `text-caption` | 12px | 400 | 1.67 | normal |

---

## 3. Shape, depth, spacing

- **Radius 8px** (`rounded-lg`) for cards, images, inputs and standard buttons. Badges 4px.
- **Pill shape** only for the header CTAs and for toggles / tabs.
- **No shadows, no gradients, no glows, no decorative circles, no rotated elements.** Depth = surface steps + 1px hairlines.
- **Spacing:** 4px base unit. Scale 4, 8, 12, 16, 20, 24, 28, 32, 36, 48, 64.
  - Section padding: 64px mobile, 96px desktop (`.section`).
  - Card padding 24px. Element gap 16px.
  - Max content width 1200px. Side gutter 16px (mobile), 24px (≥640px), 32px (≥768px).
- **Icons:** solid, single-colour glyphs (fill `currentColor`), 16–24px. Brand logos (WhatsApp, TikTok, Facebook, Instagram) also solid. The Google "G" keeps its four colours.

---

## 4. Components

### Buttons

| Variant | Class | Look |
|---|---|---|
| Primary | `btn btn-primary` | Orange `#E7641B`, **white** text, bold, **19px minimum** (white on this orange is 3.4:1, so labels must qualify as WCAG large text: ≥18.66px bold). 56px tall, 8px radius. Hover: darker orange (a 12% brown layer fades in; `#CF5310`-ish, 4.3:1). |
| Secondary (dark) | `btn btn-secondary` | Brown fill, white text, bold. Hover: slightly lighter. |
| Secondary (outline) | `btn btn-outline` | 1px anthracite outline, anthracite text. Hover: soft-surface fill. |
| Outline on dark | `btn btn-outline-light` | 1px cream outline at 60%, white text. Used on the hero photo and brown bands. |
| Small | `btn-sm` | 44px tall, 15px, inline width. For rows inside lists only (never orange). |

- Full-width on mobile (< 640px), auto width above.
- Icons inside buttons: 20px, 10px gap, before the label.
- Press: scale 0.98. No lift, no shadow.
- Header CTAs keep their pill shape (the only pill buttons on the site), with 19px labels like every orange button.

### Links

Bold, anthracite, arrow glyph after the label. Underline grows on hover (1–2px, 200ms). The arrow moves 3px right.

### Proof bar

A row of 4 static facts along the bottom edge of the hero, separated by 1px hairlines (cream 20% on the photo). Each cell: value (heading-sm, 700) + label (small, cream 80%). 2 × 2 grid on mobile, 4 columns on desktop. **Numbers never animate** (no counters on ratings).

### Cards

Soft surface on cream (or cream on soft surface), 8px radius, 24px padding, no border unless the card sits on the same colour (then a 1px hairline). Image on top at 8px radius. Title heading-sm, text body / small in ink-soft.

### Lists and tables

Rows separated by 1px hairlines. Table headers: caption size, uppercase, bold, ink-soft, on soft surface. Prices right-aligned, bold, tabular.

### Tabs and toggles

Pill-shaped segmented control: soft-surface track, active item = brown pill with cream text (or cream pill on soft surface). The active pill slides (motion-primitives `AnimatedBackground`).

---

## 5. Motion

Quick and premium. Tools: motion-primitives components (`TextEffect`, `TextLoop`, `InView`, `AnimatedGroup`, `SlidingNumber`, `AnimatedBackground`, `Carousel`, `TransitionPanel`) and CSS.

- Hovers 150–250ms. Reveals 400–700ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`, 16–24px travel.
- Animate `transform` and `opacity` only.
- No tilt, magnetic, cursor-follow, spotlight or glow effects. No rotating seals, no marquees.
- Never animate the Google rating or any proof number as a counter.
- `prefers-reduced-motion`: everything static, text loops stop on the first item.
- The hero never waits for JavaScript: its entrance is pure CSS, the LCP photo is never hidden.
- Motion (the library) is code-split and loads once the page has settled (first interaction, or 2.5 s after load), never on the critical path.
- Implementation in this repo:
  - `TextLoop` and `SlidingNumber`: the motion-primitives components, on `m` + `LazyMotion`, loaded lazily.
  - `InView` and `AnimatedGroup` (`src/components/motion/in-view.tsx`): same roles and presets ("slide", "fade"), run by CSS and one shared IntersectionObserver, so sections stay Server Components.
  - `Carousel` (`src/components/ui/carousel.tsx`): the motion-primitives API on native scroll-snap (native swipe on phones, no animation library). Optional `autoPlay` (reviews: one card every 6 s, loops), paused on hover, focus and touch, off-screen and with reduced motion, plus a pause button.
  - `AnimatedBackground` (`src/components/ui/animated-background.tsx`): the motion-primitives API, the active pill slides with a CSS transform.
  - Map (`src/components/map/`): Leaflet + OpenStreetMap tiles, imported with its CSS only when the section comes within 400px of the viewport.
- Only interactive parts are client components: TextLoop, carousels, countdown, video players, map. Sections are Server Components.

---

## 6. Imagery

- Real photos only (site, Google Maps, TikTok, the owner). No stock, no AI for now (Higgsfield comes later).
- Photos are the hero: large, full-bleed or edge-to-edge in cards, 8px radius when not full-bleed.
- Over a photo, text sits on a flat brown overlay (no gradient scrim).
- When a dish has no clean photo, the card is typographic (soft surface or brown), never an empty box.
- Every image: `next/image`, AVIF/WebP, correct `sizes`. The hero photo is preloaded with high priority and art-directed (landscape crop ≥768px, portrait crop below).

---

## 7. Homepage structure (7 sections)

Header and footer keep their layout and content.

| # | Section | Contents | Surface |
|---|---|---|---|
| 1 | **Hero + proof bar** | Full-bleed food photo, dark brown overlay, slow Ken Burns. Centred headline on three lines: "Votre" / rotating moment in spark orange, same weight, followed by a comma (`TextLoop`: déjeuner, dîner, repas de famille, repas d'équipe) / "signé Chez Chiro.", one supporting line (18px), "Commander sur WhatsApp" + "Voir la carte" (cream fill). Proof bar along the bottom edge, cells centred: 4,4/5 Google (54 avis) · 2,8 M TikTok · 562 K Facebook · Barbecue d'Or 2022. | Photo |
| 2 | **Nos plats** | Merges "Les incontournables" (incl. Sauce Gbota Royal and Pack Banger) and the tabbed menu preview. | Cream / soft surface |
| 3 | **Commander en 3 étapes** | Vertical timeline (choose → send the prefilled WhatsApp → pay on delivery) + CTA, next to a believable WhatsApp conversation as tall as the timeline: brown header (logo avatar, name, number; no status), cream-tinted chat, the customer’s prefilled message (light WhatsApp green, time, double check), “typing…”, the restaurant’s generic reply (step 3: total and delivery confirmed, nothing invented), an input bar whose orange send button opens WhatsApp. Plays once in view (~3.4 s, CSS) and lights up the matching step; static with reduced motion. | Soft surface |
| 4 | **Chez Chiro sur TikTok** | Merges the TikTok videos and "Notre histoire" (10 years, Barbecue d'Or 2022). | Brown |
| 5 | **La Manifestation** | 4, 5 & 6 Dec 2026, poster, partnerships contact. | Cream / brown |
| 6 | **Avis** | "Ce que nos clients écrivent sur Google". Rating block (4,4 in big numerals, partial fifth star, "54 avis Google", Google logo, no distribution bars), Fely N.'s sauce gbota review in large type, then a carousel of five other 5-star reviews (autoplay, swipe). Quotes word for word. Link to all reviews on Google. | Soft surface |
| 7 | **Infos pratiques** | Three facts in one row (hours, delivery area, payment on delivery). Leaflet map with the logo pin: a click (not a drag) opens the Google Maps listing; no scroll-wheel zoom, one-finger drag scrolls the page on phones. Delivery fees: "Votre quartier" search over every neighbourhood of the zone data, zone chips A–E, "Quartier non listé ? Demandez sur WhatsApp". Ends with a brown order block: WhatsApp (orange) + Appeler, the two numbers; the WhatsApp message includes the neighbourhood picked above. Absorbs the old final CTA. The footer shows a small static preview of the same map. | Cream |

Mobile: sticky brown bar with "Commander sur WhatsApp" + call, shown once the hero has scrolled away.

---

## 8. Menu page (/menu)

Uber Eats’ store page as the structural reference.

- **Store header:** wide banner (8px radius from md, full-bleed on phones), logo tile overlapping its lower edge, “Chez Chiro” (40 → 48px, 700), one meta line (4,4 ★ (54 avis Google) · Livraison à partir de 500 FCFA · 9h–20h · Paiement à la livraison; a wrapped line never starts with a separator), “Rechercher un plat” (live, accent-insensitive; the empty state offers to ask on WhatsApp).
- **Category navigation:** sticky under the header, horizontal scroll on phones, pill tabs with the active one filled brown (`AnimatedBackground`), following the scroll. First category “Populaires”: Sauce Gbota Royal, the four homepage classics, Pack Banger.
- **Item cards:** 1 column on phones, 2 from md. 1px hairline, 8px radius, 16px padding, no shadow; hover = soft surface + thumbnail zoom. Name (bold), description clamped to 2 lines (precisions like “la tête de mouton” move here), price on its own line (“à partir de 3 000 FCFA”), price notes in caption. A square 112px thumbnail on the right only for a real photo whose watermark is not visible; otherwise the text takes the width. “Signature” badge on Sauce Gbota Royal only.
- **Ordering:** the whole card and its round orange “+” add the dish to an order (localStorage, no account); the “+” then becomes a brown − n + stepper. A “Votre commande (n)” bar (bottom on phones, floating from md) opens a drawer (native `<dialog>`: bottom sheet on phones, side panel from md) with quantities, an indicative “à partir de” total (delivery excluded, confirmed by Chez Chiro) and one “Envoyer la commande sur WhatsApp” button: every dish with its quantity and subtotal, a neighbourhood line, the indicative total. Empty order: the usual WhatsApp + call bar on phones. Homepage dish links still open WhatsApp directly.

---

## 9. Do / don't

**Do**
- One primary orange button per block.
- Let photos and big bold type carry the page.
- Keep copy short and concrete: dish names, prices in FCFA (`3 500 FCFA`), times, places.

**Don't**
- Italic or serif accent words, wordplay headlines ("Ça *mijote*").
- Eyebrows above every heading.
- Shadows, gradients, glows, decorative circles, tilted cards, marquees, rotating badges.
- Orange text on cream for anything smaller than 24px bold.
- Centred paragraphs.
