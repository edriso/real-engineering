# AGENTS.md

Real Engineering is a static learning site: React 19 + React Router + Vite, lessons in MDX,
prerendered to HTML and deployed to GitHub Pages at `/real-engineering/`.

## Commands

- `npm run dev` starts the dev server. `npm run build` builds and prerenders into `dist/`.
- `npm run check` runs typecheck, lint, format check and tests. Run it before every commit.
- CI (`.github/workflows/ci.yml`) runs the same checks and deploys `main`.

## Where things live

- `src/content/lessons/NN-slug.mdx`: one lesson per file. The number sets the order.
- `src/content/{parts,practice,checklists,resources}.ts`: the other content, as typed data.
- `tools/lessons-plugin.ts`: reads and validates lesson frontmatter into `virtual:lessons`.
- `src/lib/meta.ts`: page titles, descriptions and the list of prerendered routes.
- `scripts/prerender.mjs`: renders every route, `404.html` and `sitemap.xml`.
- `docs/architecture.md` explains the build. `docs/writing-guide.md` owns the voice.

## Rules

- Read `docs/writing-guide.md` before writing or editing lesson text. Plain English for B1-B2
  readers, short sentences, no em or en dashes (a test enforces it).
- Lessons are generic. Never add real company, client or colleague names or private details.
- Never hardcode a color, font or spacing value in a component. Use the tokens in
  `src/styles/global.css`, and give every new color a dark-mode value in both dark blocks.
- Browser storage goes through `useStoredState` (`src/lib/storage.ts`). It keeps the server
  render and first client render identical, so hydration never mismatches.
- A new page needs a route in `src/App.tsx` and an entry in `src/lib/meta.ts`, or it won't be
  prerendered.
- Internal links in MDX start with `/` and must point at a real route (a test checks this).
- Don't add dependencies for small things. The site has no UI library on purpose.
- Commits are plain and imperative. No AI co-author trailers or generated-by footers.
