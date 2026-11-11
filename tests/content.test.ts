import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { checklists } from '../src/content/checklists';
import { getLesson, lessons } from '../src/content/lessons';
import { parts } from '../src/content/parts';
import { routine } from '../src/content/practice';
import { getMeta, routePaths } from '../src/lib/meta';
import { readLessons } from '../tools/lessons-plugin';

const dir = join(import.meta.dirname, '../src/content/lessons');
const files = readdirSync(dir).filter((file) => file.endsWith('.mdx'));
const sources = files.map((file) => ({
  file,
  text: readFileSync(join(dir, file), 'utf8'),
}));

describe('lessons', () => {
  it('have valid frontmatter', () => {
    expect(readLessons(dir)).toHaveLength(files.length);
  });

  it('are numbered 1..n with no gaps or repeats', () => {
    expect(lessons.map((l) => l.number)).toEqual(lessons.map((_, i) => i + 1));
  });

  it('cover every part', () => {
    for (const part of parts) {
      expect(
        lessons.some((l) => l.part === part.id),
        part.id,
      ).toBe(true);
    }
  });

  it('use unique drill ids', () => {
    const ids = sources.flatMap(({ text }) =>
      [...text.matchAll(/<Drill\s+id="([^"]+)"/g)].map((m) => m[1]),
    );
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('end with practice and takeaways', () => {
    for (const { file, text } of sources) {
      expect(text, file).toContain('<Drill');
      expect(text, file).toContain('<Takeaways>');
    }
  });

  it('only link to pages that exist', () => {
    const known = new Set(routePaths);
    for (const { file, text } of sources) {
      for (const [, href] of text.matchAll(/\]\((\/[^)\s#]*)/g)) {
        expect(known.has(href as string), `${file} -> ${href}`).toBe(true);
      }
    }
  });

  it('keep to the house style: no em or en dashes', () => {
    for (const { file, text } of sources) {
      expect(/[–—]/.test(text), file).toBe(false);
    }
  });
});

describe('practice and checklists', () => {
  it('point at real lessons', () => {
    const refs = [
      ...Object.values(routine).flatMap((g) => g.habits.map((h) => h.lesson)),
      ...checklists.map((c) => c.lesson),
    ];
    for (const slug of refs) expect(getLesson(slug), slug).toBeDefined();
  });

  it('use unique habit ids per cadence', () => {
    for (const group of Object.values(routine)) {
      const ids = group.habits.map((h) => h.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe('page meta', () => {
  it('titles lessons from their frontmatter', () => {
    const first = lessons[0]!;
    expect(getMeta(`/lessons/${first.slug}`).title).toContain(first.title);
  });

  it('treats unknown paths as not found', () => {
    expect(getMeta('/nope').title).toMatch(/^Page not found/);
  });
});
