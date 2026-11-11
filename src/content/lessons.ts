import type { MDXContent } from 'mdx/types';
import { lazy, type ComponentType } from 'react';
import lessonInfo from 'virtual:lessons';
import { parts, type PartId } from './parts';

export type Lesson = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  part: PartId;
  minutes: number;
};

// The lessons plugin has already checked every field, including `part`.
export const lessons = lessonInfo as Lesson[];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function lessonFile(lesson: Lesson) {
  return `${String(lesson.number).padStart(2, '0')}-${lesson.slug}.mdx`;
}

export function lessonsByPart() {
  return parts.map((part) => ({
    ...part,
    lessons: lessons.filter((lesson) => lesson.part === part.id),
  }));
}

export function neighbours(slug: string) {
  const i = lessons.findIndex((lesson) => lesson.slug === slug);
  return { prev: lessons[i - 1], next: lessons[i + 1] };
}

// Each lesson body is its own chunk, fetched only when someone opens it.
const loaders = import.meta.glob<MDXContent>('./lessons/*.mdx', {
  import: 'default',
});
const loaded = new Map<string, MDXContent>();
const lazyContent = new Map<string, ComponentType>();

export async function preloadLesson(slug: string): Promise<void> {
  const lesson = getLesson(slug);
  if (!lesson || loaded.has(slug)) return;
  const load = loaders[`./lessons/${lessonFile(lesson)}`];
  if (load) loaded.set(slug, await load());
}

export function preloadAllLessons() {
  return Promise.all(lessons.map((lesson) => preloadLesson(lesson.slug)));
}

/**
 * The lesson body as a component. It renders at once when already loaded
 * (prerender, first page load), and suspends otherwise.
 */
export function lessonContent(slug: string): ComponentType {
  const ready = loaded.get(slug);
  if (ready) return ready;
  let component = lazyContent.get(slug);
  if (!component) {
    component = lazy(async () => {
      await preloadLesson(slug);
      const content = loaded.get(slug);
      if (!content) throw new Error(`Lesson not found: ${slug}`);
      return { default: content };
    });
    lazyContent.set(slug, component);
  }
  return component;
}
