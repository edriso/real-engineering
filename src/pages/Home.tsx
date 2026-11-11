import { Link } from 'react-router';
import { lessons, lessonsByPart } from '../content/lessons';
import { routine } from '../content/practice';
import { Icon } from '../components/Icon';

const promises = [
  {
    title: "Prove it, don't claim it",
    text: 'Learn to show your work with tests, numbers and short recordings, so people trust what you ship.',
  },
  {
    title: 'Be easy to work with',
    text: 'Small pull requests, short messages and kind reviews. The habits that make teams faster.',
  },
  {
    title: 'Get found',
    text: 'Turn everyday work into public proof that companies notice, then land the job.',
  },
];

export function Home() {
  const first = lessons[0];
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">
            A free field guide · {lessons.length} lessons
          </p>
          <h1 className="hero__title">
            Become the engineer teams <em>trust</em> and companies look for.
          </h1>
          <p className="hero__lead">
            Anyone can write code now. AI writes plenty of it. What teams still
            need is someone who solves the right problem, proves it works, and
            makes everyone around them faster. This guide teaches those habits
            in plain English, with examples and practice you can start today.
          </p>
          <div className="hero__actions">
            {first ? (
              <Link
                to={`/lessons/${first.slug}`}
                className="button button--primary"
              >
                Start with lesson 1 <Icon name="arrowRight" size={18} />
              </Link>
            ) : null}
            <Link to="/practice" className="button">
              See the practice routine
            </Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <ul className="promise-grid">
          {promises.map((item) => (
            <li key={item.title} className="card">
              <h2 className="card__title">{item.title}</h2>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section">
        <div className="section__head">
          <h2>The path</h2>
          <p>
            Six parts. Each lesson takes 5 to 10 minutes and ends with practice.
          </p>
        </div>
        <ol className="path">
          {lessonsByPart().map((part, i) => (
            <li key={part.id} className="path__part">
              <p className="path__step">Part {i + 1}</p>
              <h3 className="path__title">{part.title}</h3>
              <p className="path__blurb">{part.blurb}</p>
              <ul className="path__lessons">
                {part.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link to={`/lessons/${lesson.slug}`}>{lesson.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section">
        <div className="band">
          <div>
            <h2>A little every day</h2>
            <p>
              Reading won't change much on its own. Doing will. The practice
              routine gives you {routine.daily.habits.length} small daily
              habits, {routine.weekly.habits.length} weekly ones and{' '}
              {routine.monthly.habits.length} monthly ones. Tick them off as you
              go. Your progress stays in your browser.
            </p>
          </div>
          <Link to="/practice" className="button button--primary">
            Open the routine <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
