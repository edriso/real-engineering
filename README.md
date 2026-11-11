# Real Engineering

A free, plain-English field guide to becoming the engineer teams trust and companies look for.

**Read it: [edriso.github.io/real-engineering](https://edriso.github.io/real-engineering/)**

Anyone can write code now, and AI writes plenty of it. Teams still look hard for the person who solves the right problem, proves it works, and makes everyone around them faster. This guide teaches those habits in 18 short lessons, each with real examples and practice you can do this week.

## What's inside

| Part             | Lessons                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Foundations      | What real engineering means · Own the outcome                                                               |
| Build well       | Understand the problem · Small, safe changes · One source of truth · Tests that prove something · Debugging |
| Work with people | Code review · Write like a human · Git and pull requests                                                    |
| Ship and run     | Ship safely · Decide under uncertainty · When things break                                                  |
| Engineer with AI | Work with AI agents · Specs, skills and evals                                                               |
| Get found        | Build proof in public · Job search and interviews · Keep growing                                            |

On top of the lessons:

- **Practice routine:** small daily, weekly and monthly habits that reset on their own.
- **Checklists:** before a PR, before a release, when reviewing, when something breaks, before trusting AI output. Copy any of them as Markdown.
- **Resources:** a short list of free practice sites, references and books.

No accounts, cookies or tracking. Your ticks and theme choice stay in your browser.

## Run it locally

You need Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173/real-engineering/
npm run check      # typecheck, lint, format check, tests
npm run build      # static site in dist/
npm run preview    # serve the build
```

## How it's built

React 19, React Router and Vite, with lessons written in MDX. At build time every page is prerendered to static HTML, so the site loads fast, reads fine without JavaScript, and works on GitHub Pages with clean URLs. Each lesson body is its own small chunk. More detail in [docs/architecture.md](docs/architecture.md).

Every push to `main` runs the checks and deploys to GitHub Pages. Pull requests run the same checks.

## Contributing

Fixes and better examples are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md) and the [writing guide](docs/writing-guide.md). Every lesson page has a "Suggest an edit" link.

## Credits

The name and the idea behind this guide come from Sara and Tom. Sara shared a quick screen recording of a real-time video test, with no slides and no report, just proof you could watch. Tom replied: "This is what real engineering looks like." Lesson 1 opens with that moment.

## License

Code is [MIT](LICENSE). Lesson text is [CC BY 4.0](LICENSE-CONTENT.md): share and adapt it, with credit.
