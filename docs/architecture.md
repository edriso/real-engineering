# Architecture

A small static site. No server, no database, no accounts.

## Build

```
npm run build
  1. vite build                      -> dist/ (client bundle, hashed assets)
  2. vite build --ssr entry-server   -> dist-ssr/ (render function)
  3. node scripts/prerender.mjs      -> dist/**/*.html, 404.html, sitemap.xml
```

The prerender step loads every lesson, renders each route in `routePaths` (`src/lib/meta.ts`) to HTML, injects the page's title, description, canonical URL and Open Graph tags, and writes:

- `/` to `index.html`
- `/lessons/debugging` to `lessons/debugging.html`. GitHub Pages serves it at the clean URL with no redirect.
- `/lessons` to `lessons.html` and also `lessons/index.html`, because a folder can shadow a same-named file.

Each page's root element carries `data-route`. The client hydrates only when that matches the current URL (or the page is the generic 404). Anything else gets a fresh render instead of a hydration mismatch.

## Lessons

- MDX files with YAML frontmatter in `src/content/lessons/`.
- `tools/lessons-plugin.ts` reads the frontmatter at build time, checks it, and exposes it as `virtual:lessons`. Lists, menus and page titles use it without downloading any lesson bodies.
- Each lesson body is a lazy chunk (`import.meta.glob`). On a first load, `main.tsx` fetches the open lesson before hydrating, so the HTML matches. In-app navigation suspends briefly and preloads on hover.

## State

Only per-browser conveniences, all through `useStoredState` (`src/lib/storage.ts`), which wraps `localStorage` in `useSyncExternalStore`:

| Key                            | What                                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------------------- |
| `re:theme`                     | `system`, `light` or `dark`. Also read by the pre-paint script in `index.html`.                     |
| `re:read:<slug>`               | Lesson marked as read.                                                                              |
| `re:drill:<id>`                | Drill done.                                                                                         |
| `re:habits:<cadence>:<period>` | Practice ticks. The period key (`2026-11-11`, `2026-W46`, `2026-11`) makes them reset on their own. |
| `re:checklist:<id>`            | Checklist ticks.                                                                                    |

The server snapshot is always empty, so the prerendered HTML and the first client render agree. Saved values appear right after hydration.

## Styling

One stylesheet, `src/styles/global.css`. Colors, fonts, radii and widths are tokens on `:root`. Dark mode redefines the tokens under `prefers-color-scheme: dark` (unless the user picked light) and under `[data-theme='dark']`. Fonts are self-hosted variable fonts from Fontsource: Newsreader for headings, Geist for text, Geist Mono for code.

## Checks

`npm run check` runs `tsc -b`, ESLint (typescript-eslint, React Hooks), Prettier and Vitest. The content tests check frontmatter, numbering, unique drill ids, internal links, practice and checklist references, and the no-dash house style.
