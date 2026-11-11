import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Plugin } from 'vite';
import { parse } from 'yaml';
import { parts } from '../src/content/parts.ts';

const VIRTUAL_ID = 'virtual:lessons';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const FILE_NAME = /^(\d{2})-([a-z0-9-]+)\.mdx$/;
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n/;

export type LessonInfo = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  part: string;
  minutes: number;
};

/** Reads and checks every lesson's frontmatter. Throws on the first problem. */
export function readLessons(dir: string): LessonInfo[] {
  const partIds = new Set<string>(parts.map((p) => p.id));
  return readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .sort()
    .map((file) => {
      const name = FILE_NAME.exec(file);
      if (!name) throw new Error(`${file}: name it NN-slug.mdx`);
      const front = FRONTMATTER.exec(readFileSync(join(dir, file), 'utf8'));
      if (!front) throw new Error(`${file}: missing --- frontmatter ---`);
      const data = parse(front[1] as string) as Record<string, unknown>;
      const fail = (msg: string) => {
        throw new Error(`${file}: ${msg}`);
      };
      if (typeof data.title !== 'string' || !data.title) fail('needs a title');
      if (typeof data.summary !== 'string' || !data.summary)
        fail('needs a summary');
      if (typeof data.part !== 'string' || !partIds.has(data.part))
        fail(`part must be one of: ${[...partIds].join(', ')}`);
      if (typeof data.minutes !== 'number' || data.minutes < 1)
        fail('minutes must be a positive number');
      return {
        number: Number(name[1]),
        slug: name[2] as string,
        title: data.title as string,
        summary: data.summary as string,
        part: data.part as string,
        minutes: data.minutes as number,
      };
    });
}

/**
 * Exposes lesson metadata as `virtual:lessons`, so lists and menus never
 * have to download the lesson bodies.
 */
export function lessonsPlugin(dir: string): Plugin {
  return {
    name: 'real-engineering:lessons',
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      for (const file of readdirSync(dir)) this.addWatchFile(join(dir, file));
      return `export default ${JSON.stringify(readLessons(dir))};`;
    },
    handleHotUpdate({ file, server }) {
      if (!file.startsWith(dir)) return;
      const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
      if (mod) server.moduleGraph.invalidateModule(mod);
    },
  };
}
