# Contributing

Thanks for helping. Small fixes are the most useful kind: a clearer sentence, a better example, a broken link.

## Quick fixes

Click "Suggest an edit" at the bottom of any lesson. GitHub opens the file in its editor and helps you open a pull request.

## Bigger changes

1. Open an issue first and say what you want to change and why, in two sentences.
2. Fork, then branch from a fresh `main`.
3. Make one change per pull request.
4. Run `npm run check` and `npm run build`.
5. In the PR, say what changed, why, and how you checked it.

## Adding a lesson

Create `src/content/lessons/NN-slug.mdx`. The number sets the reading order, so renumber the files after it if you insert one in the middle.

```mdx
---
title: Short title in sentence case
summary: One sentence that says what the reader will be able to do.
part: build # foundations | build | people | ship | ai | career
minutes: 7
---

Opening paragraph: why this matters, with a small story or example.

## A section

<Compare>
<Before label="Weak">

The weak version.

</Before>
<After label="Strong">

The strong version.

</After>
</Compare>

<Drill id="build-unique-id" title="Something to do this week" time="20 min">

Clear steps the reader can actually do.

</Drill>

<Takeaways>

- Three to five lines the reader should remember.

</Takeaways>
```

Components you can use without importing: `Callout` (`type="tip" | "warn" | "note"`), `Compare` with `Before` and `After`, `Drill`, `Takeaways` and `Quote` (`by="..."`). Leave a blank line inside a component before and after markdown content.

Follow the [writing guide](docs/writing-guide.md). The build fails if the frontmatter is wrong, and the tests fail on a broken internal link, a repeated drill id or an em dash.
