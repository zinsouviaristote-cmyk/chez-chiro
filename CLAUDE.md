# Restaurant Website Project — Context for Claude Code

## What we're doing
I'm Aristote, a designer and developer based in Cotonou, Benin. This is an end-of-year campaign: redesigning or creating websites for 44 restaurants in Cotonou. **This folder is one restaurant.** We build a strong V1 from the restaurant's real information, I present it to the owner, then we iterate.

## Quality bar
- It must look like a real, high-end food brand website, clearly better than anything else in Cotonou. Professional and appetizing; never experimental or strange.
- It must convert. The main goal is orders via WhatsApp.
- You have full creative freedom on layout, composition, typography, copy and motion. Make strong decisions and don't stop for approval midway. Deliver a complete V1; I'll ask for changes afterwards.

## Design reference
- `reference-design.md` at the project root is a style I picked on Refero. Use it as inspiration for structure, rhythm, typography logic, components and overall feel. Don't copy it.
- **Restaurant with an existing brand**: keep its colors and logo, and map them onto the reference's logic (which color plays which role). Don't use the reference's own colors, fonts or brand.
- **Restaurant without a brand**: create a new, clean identity inspired by the reference.
- Fonts: free Google Fonts via `next/font`.

## Images
- For now: real photos only (from the website, Google Maps, social accounts). No stock photos, no AI-generated images.
- When photos are missing or weak, design sections that work without them (typography, color). No empty placeholder boxes.
- Keep `IMAGES.md` at the project root: each image slot, the file used, its source, and whether it should be upgraded later.
- Higgsfield (AI image upgrade) comes later. Don't use it unless I say so.
- Optimize every image: `next/image`, AVIF/WebP, correct sizes.

## Motion
- Required: scroll animations (reveals, staggered lists, counters…), hover effects (buttons, links, cards, images), and smooth transitions.
- Use Motion (motion.dev / framer-motion), motion-primitives components (github.com/ibelick/motion-primitives), and CSS. Premium and smooth, never gimmicky.
- Respect `prefers-reduced-motion`. Never delay the main content: the hero shows immediately.

## Tech
- Next.js (App Router) + TypeScript + Tailwind CSS, in `site/`. Static, no backend.
- Target Lighthouse mobile Performance ≥ 90.
- SEO: meta title and description, Open Graph image, schema.org `Restaurant` JSON-LD.
- Deploy target: Vercel.

## Local context — Cotonou, Benin
- All copy in French. Prices in FCFA, formatted like `3 500 FCFA`.
- Phone numbers have 10 digits: `+229 01 XX XX XX XX`.
- WhatsApp is the main ordering channel:
  - use `https://wa.me/229XXXXXXXXXX` links with a prefilled French message
  - add a sticky WhatsApp + call bar on mobile
- Mobile-first: design at 390px first. Most visitors arrive from TikTok or Facebook on their phone.
- Always include:
  - menu with prices
  - opening hours
  - address or map link
  - call and WhatsApp buttons
  - real Google reviews
  - social links

## Honesty
- Use only real information. If something is missing, leave it out or mark it, and list it for me. Never invent facts, dishes, prices or reviews.
- Quote reviews word for word.

## Browsing
- Use the Claude in Chrome tools when they're available; otherwise use the Playwright MCP.
- Skip pages that require a login, and tell me.

## Done means
- You ran the site, checked screenshots at 390px and 1440px, fixed what looked off, and iterated until it's clearly better than the current site.
- Your final message includes:
  - how to run the site
  - screenshot paths
  - things to confirm with the owner
  - image slots to upgrade later
