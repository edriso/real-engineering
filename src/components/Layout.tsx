import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { getMeta } from '../lib/meta';
import { site } from '../lib/site';
import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';

const nav = [
  { to: '/lessons', label: 'Lessons' },
  { to: '/practice', label: 'Practice' },
  { to: '/checklists', label: 'Checklists' },
  { to: '/resources', label: 'Resources' },
];

function usePageChrome() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = getMeta(pathname).title;
    if (hash) {
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return pathname;
}

export function Layout({ children }: { children: ReactNode }) {
  const pathname = usePageChrome();
  const [openFor, setOpenFor] = useState<string | null>(null);
  // The menu closes on its own when the route changes.
  const open = openFor === pathname;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand" aria-label={`${site.name} home`}>
            <span className="brand__mark" aria-hidden="true">
              re
            </span>
            <span className="brand__name">{site.name}</span>
          </Link>
          <nav
            id="site-nav"
            className="site-nav"
            data-open={open || undefined}
            aria-label="Main"
          >
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} className="site-nav__link">
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="site-header__actions">
            <ThemeToggle />
            <a
              className="icon-button"
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="Source on GitHub"
              title="Source on GitHub"
            >
              <Icon name="github" />
            </a>
            <button
              type="button"
              className="icon-button menu-button"
              aria-expanded={open}
              aria-controls="site-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpenFor(open ? null : pathname)}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          <p>
            Written by{' '}
            <a href={site.authorUrl} target="_blank" rel="noreferrer">
              {site.author}
            </a>
            . Free to read, share and improve.
          </p>
          <p className="site-footer__links">
            <Link to="/about">About</Link>
            <a href={site.repo} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a
              href={`${site.repo}/issues/new`}
              target="_blank"
              rel="noreferrer"
            >
              Suggest a change
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
