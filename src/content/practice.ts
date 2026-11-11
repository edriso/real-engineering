import type { Cadence } from '../lib/period';

export type Habit = {
  id: string;
  text: string;
  why: string;
  lesson: string;
};

export const routine: Record<
  Cadence,
  { title: string; hint: string; habits: Habit[] }
> = {
  daily: {
    title: 'Every day',
    hint: 'About 30 minutes, spread across your day. Resets each morning.',
    habits: [
      {
        id: 'how-do-i-know',
        text: 'Before you call anything done, write one line on how you know it works.',
        why: 'Proof becomes a reflex instead of an afterthought.',
        lesson: 'own-the-outcome',
      },
      {
        id: 'read-code',
        text: 'Read 15 minutes of good code you did not write.',
        why: 'You learn patterns faster from reading than from writing alone.',
        lesson: 'keep-growing',
      },
      {
        id: 'eod',
        text: 'Write a short end-of-day note: Done, Doing, Blockers.',
        why: 'Short, clear updates are the fastest way to earn trust.',
        lesson: 'write-like-a-human',
      },
      {
        id: 'log',
        text: 'Add one line to your learning log: what you learned or fixed today.',
        why: 'This becomes your resume bullets and blog posts later.',
        lesson: 'keep-growing',
      },
    ],
  },
  weekly: {
    title: 'Every week',
    hint: 'A few focused hours. Resets every Monday.',
    habits: [
      {
        id: 'small-pr',
        text: 'Ship one small pull request (under 300 lines) with a full description.',
        why: 'Small, well-explained changes are what reviewers love most.',
        lesson: 'git-and-pull-requests',
      },
      {
        id: 'review',
        text: "Review one pull request: yours from last week, a teammate's, or an open source one.",
        why: 'Reviewing teaches you more than being reviewed.',
        lesson: 'code-review',
      },
      {
        id: 'failing-test',
        text: 'Write one test that fails on the old code before you fix it.',
        why: 'A test that cannot fail proves nothing.',
        lesson: 'tests-that-prove-something',
      },
      {
        id: 'reproduce',
        text: 'Reproduce one bug on purpose before you touch the fix.',
        why: 'If you cannot make it happen, you cannot prove it is gone.',
        lesson: 'debugging',
      },
      {
        id: 'ai-workflow',
        text: 'Spend 20 minutes improving one AI workflow: a prompt, a skill, or one line in AGENTS.md.',
        why: 'Your skill with tools grows every week, even as models change.',
        lesson: 'work-with-ai-agents',
      },
      {
        id: 'drill',
        text: 'Do one practice drill from any lesson.',
        why: 'Reading is easy. Doing is where it sticks.',
        lesson: 'what-real-engineering-means',
      },
    ],
  },
  monthly: {
    title: 'Every month',
    hint: 'One afternoon. Resets on the 1st.',
    habits: [
      {
        id: 'publish',
        text: 'Publish one piece of proof: a short write-up, a demo video, or a better README.',
        why: 'Public proof is how companies find you.',
        lesson: 'build-proof-in-public',
      },
      {
        id: 'open-source',
        text: 'Make one open source contribution, even a docs fix.',
        why: "It shows you can work in someone else's codebase and process.",
        lesson: 'build-proof-in-public',
      },
      {
        id: 'brag-doc',
        text: "Turn the month's log into resume bullets with real numbers.",
        why: 'You will not remember the details in a year. Write them now.',
        lesson: 'job-search-and-interviews',
      },
      {
        id: 'retro',
        text: 'Run a personal retro: one thing that went wrong and what you will change.',
        why: 'Every mistake is free training data if you write it down.',
        lesson: 'when-things-break',
      },
      {
        id: 'focus',
        text: "Pick next month's focus: one lesson to go deeper on.",
        why: 'Depth in one area at a time beats a little of everything.',
        lesson: 'keep-growing',
      },
    ],
  },
};
