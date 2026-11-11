export type Checklist = {
  id: string;
  title: string;
  when: string;
  lesson: string;
  items: string[];
};

export const checklists: Checklist[] = [
  {
    id: 'before-pr',
    title: 'Before you open a pull request',
    when: 'Run through this every time. It takes two minutes.',
    lesson: 'git-and-pull-requests',
    items: [
      'The PR does one thing. Anything else is a separate PR or a linked issue.',
      'I read my own diff top to bottom, like a reviewer would.',
      'I searched for other copies of the code I fixed, and fixed them too.',
      'There is a test that fails without my change and passes with it.',
      'No hardcoded values that already live in config or a shared constant.',
      'Leftovers are gone: unused code, debug logs, stale comments.',
      'The description says what changed, why, how to check it, what I ran, and what I did not cover.',
      'Every claim in the title and description is true of this diff.',
      'I can answer any question about this diff without asking an AI.',
    ],
  },
  {
    id: 'before-ship',
    title: 'Before you ship to production',
    when: 'For anything users will feel.',
    lesson: 'ship-safely',
    items: [
      'I know how to undo this, and how long the undo takes.',
      'New settings default to what production does today.',
      'Data the new code reads is already in place.',
      'Risky behavior sits behind a flag that starts off.',
      'I checked the biggest real input, not only the happy case.',
      'Someone will be around for a few hours after the release.',
      'I wrote down how I will know it worked, and how I will know it failed.',
    ],
  },
  {
    id: 'review',
    title: 'When you review a pull request',
    when: 'Be quick, be kind, block only real problems.',
    lesson: 'code-review',
    items: [
      'I understand what the change is for. If not, I ask first.',
      'I checked the claims in the description against the code.',
      'I looked for bugs, missed requirements, security issues and things that cannot be undone.',
      'Preferences are marked "Nit:" or moved to a follow-up issue.',
      'My comment is short: the point first, then a few bullets.',
      'I approve if it makes the code better, even if it is not perfect.',
      'I replied within one working day.',
    ],
  },
  {
    id: 'message',
    title: 'Before you send a message',
    when: 'Slack, email, PR comments, status updates.',
    lesson: 'write-like-a-human',
    items: [
      'The first line is the point. The reader can stop there.',
      'It uses plain words and sounds like a person.',
      'Dates are real dates, not "last Tuesday".',
      'If I need something, the ask and the deadline are clear.',
      'A screenshot or short video would not say this faster.',
      'Long detail is below the short version, or in a linked doc.',
    ],
  },
  {
    id: 'incident',
    title: 'When something breaks',
    when: 'Keep this open during the incident.',
    lesson: 'when-things-break',
    items: [
      'Stop the damage first: roll back, turn off the flag, pause the job.',
      'Tell people now: what is broken, who is affected, when the next update comes.',
      'Write a timeline as you go, with real times.',
      'Check whether it is code, data or the environment.',
      'Find the root cause and say it in one sentence.',
      'Add a test or check that would have caught it.',
      'Write a short, blameless postmortem within a few days.',
    ],
  },
  {
    id: 'ai-output',
    title: 'Before you trust AI output',
    when: 'Code, reviews, summaries, numbers.',
    lesson: 'work-with-ai-agents',
    items: [
      'I read every line I am about to ship.',
      'I checked each claim against the real code, data or docs.',
      'Tests ran, and I saw them fail before the fix.',
      'Nothing was copied into a message without my own words on top.',
      'A different agent or a person reviewed it, not the one that wrote it.',
      'No secrets or private data went into the prompt.',
    ],
  },
  {
    id: 'profile',
    title: 'Your public profile',
    when: 'Check once a quarter.',
    lesson: 'build-proof-in-public',
    items: [
      'My GitHub profile README says what I do and links to my best proof.',
      'My pinned repos have a clear README, a screenshot and a live demo.',
      'My headline says what I build and for whom, not just a job title.',
      'My resume bullets show results with numbers.',
      'I published something in the last 90 days.',
    ],
  },
];
