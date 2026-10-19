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
- `src/assets/images/*`: optimised images. Sources and upgrade plan: `../IMAGES.md`.

## Notes

- Motion (motion.dev) runs the counters and the mobile menu. It is code-split, so it never loads before the hero. Scroll reveals use CSS plus one IntersectionObserver.
- The display font (Bricolage Grotesque, OFL) is self-hosted through `next/font/local`, as a single 22 KB instance. The other fonts come from `next/font/google`.
- SEO: metadata for each page, `opengraph-image.jpg`, `Restaurant` JSON-LD (in the layout), `Menu` JSON-LD (on `/menu`), `robots.txt`, `sitemap.xml`.
- Deploy: Vercel. Before launch, set `SITE_URL` in `src/lib/site.ts` to the final domain.
