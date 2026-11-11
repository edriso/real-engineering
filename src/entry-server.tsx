import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { basename } from './lib/site';

export { preloadAllLessons } from './content/lessons';
export { getMeta, routePaths } from './lib/meta';
export { site } from './lib/site';

/** Renders one route to HTML for the build-time prerender. */
export function render(pathname: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter basename={basename} location={`${basename}${pathname}`}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
