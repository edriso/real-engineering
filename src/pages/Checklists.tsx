import { Link } from 'react-router';
import { Checkbox } from '../components/Checkbox';
import { CopyButton } from '../components/CopyButton';
import { checklists, type Checklist } from '../content/checklists';
import { getLesson } from '../content/lessons';
import { useStoredState } from '../lib/storage';

function toMarkdown(list: Checklist) {
  return [
    `### ${list.title}`,
    '',
    ...list.items.map((item) => `- [ ] ${item}`),
  ].join('\n');
}

function ChecklistCard({ list }: { list: Checklist }) {
  const [ticked, setTicked] = useStoredState<number[]>(
    `re:checklist:${list.id}`,
    [],
  );
  const lesson = getLesson(list.lesson);
  return (
    <section
      className="card checklist"
      id={list.id}
      aria-labelledby={`c-${list.id}`}
    >
      <header className="checklist__head">
        <h2 id={`c-${list.id}`}>{list.title}</h2>
        <p className="checklist__when">{list.when}</p>
      </header>
      <ul className="checklist__items">
        {list.items.map((item, i) => (
          <li key={item}>
            <Checkbox
              checked={ticked.includes(i)}
              onChange={(on) =>
                setTicked(on ? [...ticked, i] : ticked.filter((n) => n !== i))
              }
            >
              {item}
            </Checkbox>
          </li>
        ))}
      </ul>
      <footer className="checklist__foot">
        <CopyButton text={toMarkdown(list)} label="Copy as Markdown" />
        <button
          type="button"
          className="button button--quiet"
          onClick={() => setTicked([])}
          disabled={ticked.length === 0}
        >
          Clear ticks
        </button>
        {lesson ? (
          <Link to={`/lessons/${lesson.slug}`} className="checklist__lesson">
            Why: {lesson.title}
          </Link>
        ) : null}
      </footer>
    </section>
  );
}

export function Checklists() {
  return (
    <div className="container page">
      <header className="page__head">
        <h1>Checklists</h1>
        <p className="page__lead">
          Pilots use checklists because memory fails under pressure. So does
          yours. Use these before the moments that matter, or copy one into a
          pull request template or your team's docs.
        </p>
        <nav className="chips" aria-label="Jump to a checklist">
          {checklists.map((list) => (
            <a key={list.id} href={`#${list.id}`} className="chip">
              {list.title}
            </a>
          ))}
        </nav>
      </header>
      <div className="checklist-grid">
        {checklists.map((list) => (
          <ChecklistCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
