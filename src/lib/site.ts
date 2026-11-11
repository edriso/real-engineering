export const site = {
  name: 'Real Engineering',
  tagline: 'Become the engineer teams trust and companies look for.',
  description:
    'A free, plain-English field guide to becoming a real engineer: ship work you can prove, write like a human, use AI well, and get found by companies.',
  url: 'https://edriso.github.io/real-engineering',
  repo: 'https://github.com/edriso/real-engineering',
  author: 'Mohamed Idris',
  authorUrl: 'https://edriso.github.io/portfolio/',
} as const;

/** Router basename: Vite's base without the trailing slash. */
export const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
