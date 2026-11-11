// Renders every route to static HTML so GitHub Pages serves real pages
// (fast first paint, readable without JavaScript, shareable link previews).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, getMeta, routePaths, site, preloadAllLessons } = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
);
await preloadAllLessons();

const template = await readFile(join(dist, 'index.html'), 'utf8');

const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

function head(pathname) {
  const { title, description } = getMeta(pathname);
  const url = `${site.url}${pathname === '/' ? '/' : pathname}`;
  return [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.url}/og.png" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ');
}

// data-route tells the client which page this HTML was built for.
function page(pathname, extraHead = '') {
  return template
    .replace('<!--app-head-->', head(pathname) + extraHead)
    .replace('<div id="root">', `<div id="root" data-route="${pathname}">`)
    .replace('<!--app-html-->', render(pathname));
}

// "/" -> index.html, "/lessons/x" -> lessons/x.html. GitHub Pages serves
// /lessons/x from lessons/x.html, so URLs stay clean with no redirect.
function fileFor(pathname) {
  return pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`;
}

async function write(file, html) {
  const target = join(dist, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

for (const pathname of routePaths) {
  const html = page(pathname);
  await write(fileFor(pathname), html);
  // A folder can shadow a same-named .html file, so give it an index too.
  if (routePaths.some((p) => p.startsWith(`${pathname}/`))) {
    await write(`${pathname.slice(1)}/index.html`, html);
  }
}

await write(
  '404.html',
  page('/404', '\n    <meta name="robots" content="noindex" />'),
);

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routePaths.map(
    (p) =>
      `  <url><loc>${site.url}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`,
  ),
  '</urlset>',
  '',
].join('\n');
await write('sitemap.xml', sitemap);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routePaths.length} pages, 404.html and sitemap.xml`);
