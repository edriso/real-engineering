export type Resource = {
  title: string;
  url: string;
  note: string;
};

export type ResourceGroup = {
  id: string;
  title: string;
  items: Resource[];
};

export const resources: ResourceGroup[] = [
  {
    id: 'practice',
    title: 'Practice for free',
    items: [
      {
        title: 'Learn Git Branching',
        url: 'https://learngitbranching.js.org/',
        note: 'A visual game that finally makes branches, rebase and cherry-pick click.',
      },
      {
        title: 'The Missing Semester',
        url: 'https://missing.csail.mit.edu/',
        note: 'MIT lectures on the shell, editors, git and debugging. The tools school skips.',
      },
      {
        title: 'Exercism',
        url: 'https://exercism.org/',
        note: 'Small exercises in 70+ languages, with free human mentors who review your code.',
      },
      {
        title: 'Frontend Mentor',
        url: 'https://www.frontendmentor.io/',
        note: 'Real designs to build. Good for portfolio pieces and responsive layout practice.',
      },
      {
        title: 'Good First Issue',
        url: 'https://goodfirstissue.dev/',
        note: 'Beginner-friendly issues in real open source projects.',
      },
    ],
  },
  {
    id: 'craft',
    title: 'Code review, git and the craft',
    items: [
      {
        title: "Google's engineering practices",
        url: 'https://google.github.io/eng-practices/',
        note: 'A short, public guide to code review from both sides. Read the whole thing once.',
      },
      {
        title: 'How to write a git commit message',
        url: 'https://cbea.ms/git-commit/',
        note: 'Seven simple rules. Your future self will thank you.',
      },
      {
        title: 'Conventional Commits',
        url: 'https://www.conventionalcommits.org/',
        note: 'A common format for commit messages that tools can read.',
      },
      {
        title: 'Martin Fowler on refactoring',
        url: 'https://refactoring.com/',
        note: 'The catalog of safe, small code changes, with examples.',
      },
      {
        title: 'Julia Evans: Wizard Zines',
        url: 'https://wizardzines.com/',
        note: 'Friendly comics about debugging, networking, git and Linux. Great for hard topics.',
      },
    ],
  },
  {
    id: 'ai',
    title: 'Working with AI',
    items: [
      {
        title: 'Claude Code best practices',
        url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
        note: 'How to give a coding agent context, plans and checks that work.',
      },
      {
        title: 'Building effective agents',
        url: 'https://www.anthropic.com/engineering/building-effective-agents',
        note: 'When to use a simple workflow and when an agent is worth it.',
      },
      {
        title: 'AGENTS.md',
        url: 'https://agents.md/',
        note: 'A simple, open format for giving coding agents the context of your repo.',
      },
      {
        title: 'Evals FAQ by Hamel Husain',
        url: 'https://hamel.dev/blog/posts/evals-faq/',
        note: 'Practical answers on testing AI features, from someone who does it daily.',
      },
    ],
  },
  {
    id: 'career',
    title: 'Getting hired',
    items: [
      {
        title: 'Get your work recognized: write a brag document',
        url: 'https://jvns.ca/blog/brag-documents/',
        note: 'Julia Evans on keeping a running list of what you did, so reviews and resumes write themselves.',
      },
      {
        title: 'Work log template',
        url: 'https://blog.pragmaticengineer.com/work-log-template-for-software-engineers/',
        note: 'A simple weekly log from The Pragmatic Engineer. Copy it and start today.',
      },
      {
        title: 'GitHub profile README',
        url: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme',
        note: 'The official how-to for the README that shows at the top of your profile.',
      },
      {
        title: 'Tech Interview Handbook',
        url: 'https://www.techinterviewhandbook.org/',
        note: 'Free, well-organized prep for coding and behavioral interviews.',
      },
      {
        title: 'System Design Primer',
        url: 'https://github.com/donnemartin/system-design-primer',
        note: 'The classic free guide to system design basics, with practice questions.',
      },
    ],
  },
  {
    id: 'web',
    title: 'Web platform references',
    items: [
      {
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/',
        note: 'The reference for HTML, CSS and JavaScript. Trust it over random blog posts.',
      },
      {
        title: 'web.dev',
        url: 'https://web.dev/',
        note: 'Performance, accessibility and modern web guides from the Chrome team.',
      },
      {
        title: 'React docs',
        url: 'https://react.dev/',
        note: 'The official docs. The "Thinking in React" page alone is worth an hour.',
      },
    ],
  },
  {
    id: 'books',
    title: 'Books worth your time',
    items: [
      {
        title: 'A Philosophy of Software Design',
        url: 'https://web.stanford.edu/~ouster/cgi-bin/book.php',
        note: 'John Ousterhout. Short, clear thinking about complexity and good modules.',
      },
      {
        title: 'The Pragmatic Programmer',
        url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/',
        note: 'David Thomas and Andrew Hunt. Habits of engineers who own their work.',
      },
      {
        title: 'Accelerate',
        url: 'https://itrevolution.com/product/accelerate/',
        note: 'Forsgren, Humble and Kim. The research on what makes teams ship fast and safely.',
      },
      {
        title: 'Debugging',
        url: 'https://debuggingrules.com/',
        note: 'David Agans. Nine rules for finding any bug. A quick, fun read.',
      },
      {
        title: "The Staff Engineer's Path",
        url: 'https://www.oreilly.com/library/view/the-staff-engineers/9781098118723/',
        note: 'Tanya Reilly. What growing past senior looks like: scope, influence and judgment.',
      },
    ],
  },
];
