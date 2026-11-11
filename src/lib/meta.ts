import { getLesson, lessons } from '../content/lessons';
import { site } from './site';

export type PageMeta = { title: string; description: string };

const staticPages: Record<string, PageMeta> = {
  '/': { title: site.name, description: site.description },
  '/lessons': {
    title: 'All lessons',
    description: `${lessons.length} short lessons, from writing your first proof to getting hired.`,
  },
  '/practice': {
    title: 'Practice routine',
    description:
      'A simple daily, weekly and monthly routine that turns the lessons into habits.',
  },
  '/checklists': {
    title: 'Checklists',
    description:
      'Copy-ready checklists for pull requests, releases, reviews, messages, incidents and AI output.',
  },
  '/resources': {
    title: 'Resources',
    description: 'Free practice sites, references and books worth your time.',
  },
  '/about': {
    title: 'About',
    description: 'Why this guide exists, who wrote it, and how to help.',
  },
};

const notFound: PageMeta = {
  title: 'Page not found',
  description: 'That page does not exist. Try the lessons list instead.',
};

/** Paths every build prerenders, in sitemap order. */
export const routePaths = [
  ...Object.keys(staticPages),
  ...lessons.map((lesson) => `/lessons/${lesson.slug}`),
];

export function getMeta(pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/';
  const page = staticPages[path];
  const meta =
    page ??
    (() => {
      const slug = /^\/lessons\/([a-z0-9-]+)$/.exec(path)?.[1];
      const lesson = slug ? getLesson(slug) : undefined;
      return lesson
        ? { title: lesson.title, description: lesson.summary }
        : notFound;
    })();
  return {
    title: path === '/' ? meta.title : `${meta.title} · ${site.name}`,
    description: meta.description,
  };
}
