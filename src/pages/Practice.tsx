import { Link } from 'react-router';
import { Checkbox } from '../components/Checkbox';
import { routine, type Habit } from '../content/practice';
import { getLesson } from '../content/lessons';
import { periodKey, type Cadence } from '../lib/period';
import { useStoredState } from '../lib/storage';

function HabitList({ cadence }: { cadence: Cadence }) {
  const group = routine[cadence];
  // The key includes the current day, week or month, so ticks reset on their own.
  const [done, setDone] = useStoredState<string[]>(
    `re:habits:${cadence}:${periodKey(cadence)}`,
    [],
  );
  const count = group.habits.filter((h) => done.includes(h.id)).length;
  const toggle = (habit: Habit, on: boolean) =>
    setDone(on ? [...done, habit.id] : done.filter((id) => id !== habit.id));

  return (
    <section className="habits card" aria-labelledby={`h-${cadence}`}>
      <header className="habits__head">
        <h2 id={`h-${cadence}`}>{group.title}</h2>
        <p className="habits__count">
          {count} of {group.habits.length}
        </p>
      </header>
      <p className="habits__hint">{group.hint}</p>
      <progress
        className="meter"
        max={group.habits.length}
        value={count}
        aria-label={`${group.title}: ${count} of ${group.habits.length} done`}
      />
      <ul className="habits__list">
        {group.habits.map((habit) => {
          const lesson = getLesson(habit.lesson);
          return (
            <li key={habit.id}>
              <Checkbox
                checked={done.includes(habit.id)}
                onChange={(on) => toggle(habit, on)}
              >
                {habit.text}
              </Checkbox>
              <p className="habits__why">
                {habit.why}
                {lesson ? (
                  <>
                    {' '}
                    <Link to={`/lessons/${lesson.slug}`}>{lesson.title}</Link>
                  </>
                ) : null}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Practice() {
  return (
    <div className="container page">
      <header className="page__head">
        <h1>Practice routine</h1>
        <p className="page__lead">
          Skills grow from small things done often. Here is a simple rhythm: a
          few minutes every day, a few hours every week, one afternoon every
          month. Ticks reset on their own when the day, week or month changes,
          and they're saved in this browser only.
        </p>
      </header>
      <div className="habits-grid">
        <HabitList cadence="daily" />
        <HabitList cadence="weekly" />
        <HabitList cadence="monthly" />
      </div>
      <aside className="callout callout--tip">
        <p className="callout__title">Missed a day?</p>
        <div className="callout__body">
          <p>
            That's fine. There are no streaks here on purpose. Pick it up
            tomorrow. Steady beats perfect.
          </p>
        </div>
      </aside>
    </div>
  );
}
