# Chez Chiro — site V1

Next.js 16 (App Router), TypeScript and Tailwind CSS 4. Static pages, no backend.

## Run

```bash
npm install
npm run dev            # http://localhost:3000
# or the production build:
npm run build && npm start
```

## Where things live

- `src/lib/site.ts`: phone numbers, hours, address, socials, delivery zones, event.
- `src/lib/menu.ts`: the full menu with "à partir de" prices.
- `src/lib/reviews.ts`: Google reviews, quoted word for word.
- `src/lib/whatsapp.ts`: the prefilled WhatsApp messages.
- `src/components/home/*`: the homepage sections. `src/app/menu/page.tsx` is the menu page.
- `src/assets/images/*`: optimised images. Sources and upgrade plan: `IMAGES.md`.

## Notes

- Design system: `reference-design.md` (Uber's structure and type logic, Chez Chiro's colours). Tokens live in `src/app/globals.css`.
- One font family, Figtree (OFL), through `next/font/google` (one 20 KB variable file for latin).
- Motion (motion.dev) runs the hero's rotating dish (motion-primitives `TextLoop`) and the mobile menu, through `m` + `LazyMotion`. It is code-split and loads on idle, never before the hero. The hero entrance is pure CSS; scroll reveals use CSS plus one IntersectionObserver.
- SEO: metadata for each page, `opengraph-image.jpg`, `Restaurant` JSON-LD (in the layout), `Menu` JSON-LD (on `/menu`), `robots.txt`, `sitemap.xml`.
- Deploy: Vercel. Before launch, set `SITE_URL` in `src/lib/site.ts` to the final domain.
