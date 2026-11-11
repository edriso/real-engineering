import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '@fontsource-variable/newsreader';
import './styles/global.css';

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import { preloadLesson } from './content/lessons';
import { basename } from './lib/site';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Load the open lesson first, so hydration matches the prerendered HTML.
const slug = /\/lessons\/([a-z0-9-]+)\/?$/.exec(location.pathname)?.[1];
if (slug) await preloadLesson(slug);

// Hydrate only HTML built for this page (or the generic 404). Anything else,
// like a dev server or a host's fallback page, gets a fresh client render.
const path =
  location.pathname.slice(basename.length).replace(/\/+$/, '') || '/';
const builtFor = root.dataset.route;
if (builtFor === path || builtFor === '/404') hydrateRoot(root, app);
else createRoot(root).render(app);
