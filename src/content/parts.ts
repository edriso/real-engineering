export const parts = [
  {
    id: 'foundations',
    title: 'Foundations',
    blurb: 'What a real engineer is, and what "done" really means.',
  },
  {
    id: 'build',
    title: 'Build well',
    blurb: 'Understand the problem, change little at a time, and prove it.',
  },
  {
    id: 'people',
    title: 'Work with people',
    blurb:
      'Reviews, messages and pull requests that make you easy to work with.',
  },
  {
    id: 'ship',
    title: 'Ship and run',
    blurb:
      'Release safely, decide with less than perfect information, and handle incidents.',
  },
  {
    id: 'ai',
    title: 'Engineer with AI',
    blurb: 'Get real value from coding agents without giving up your judgment.',
  },
  {
    id: 'career',
    title: 'Get found',
    blurb: 'Turn your work into proof, land the job, and keep growing.',
  },
] as const;

export type PartId = (typeof parts)[number]['id'];
