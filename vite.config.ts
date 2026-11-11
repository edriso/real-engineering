import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { lessonsPlugin } from './tools/lessons-plugin.ts';

const lessonsDir = fileURLToPath(
  new URL('./src/content/lessons', import.meta.url),
);

export default defineConfig({
  // GitHub Pages serves this project from /real-engineering/.
  base: '/real-engineering/',
  plugins: [
    lessonsPlugin(lessonsDir),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [rehypeSlug],
      }),
    },
    react({ include: /\.(mdx|ts|tsx)$/ }),
  ],
  build: {
    target: 'es2022',
  },
});
