import { Link } from 'react-router';
import { site } from '../lib/site';

export function About() {
  return (
    <div className="container page">
      <header className="page__head">
        <h1>About this guide</h1>
      </header>
      <div className="prose">
        <p>
          I'm {site.author}, a software engineer. I wrote this guide from real
          work: the comments reviewers kept leaving on my pull requests, the
          incidents that taught me to slow down, the trainings my team ran on
          working with AI, and the habits of the senior engineers I learned
          from.
        </p>
        <p>
          The lessons are generic on purpose. You won't find company names or
          private details here, only what carries over to any team.
        </p>
        <h2>Who it's for</h2>
        <p>
          Junior and mid-level engineers who want to be trusted with bigger
          work, career changers, and anyone who wants their work to speak for
          them when they look for a job. The English is kept simple so it's easy
          to read even if English isn't your first language.
        </p>
        <h2>How to use it</h2>
        <ol>
          <li>
            Read the <Link to="/lessons">lessons</Link> in order, one or two a
            day.
          </li>
          <li>Do at least one practice drill from each lesson.</li>
          <li>
            Keep the <Link to="/practice">practice routine</Link> going after
            you finish.
          </li>
          <li>
            Use the <Link to="/checklists">checklists</Link> at work.
          </li>
        </ol>
        <h2>Privacy</h2>
        <p>
          There are no accounts, cookies or tracking. Your ticks and theme
          choice are saved in your own browser and never leave it.
        </p>
        <h2>Help improve it</h2>
        <p>
          Found a mistake or have a better example? Every lesson has a "Suggest
          an edit" link, or you can{' '}
          <a href={`${site.repo}/issues/new`} target="_blank" rel="noreferrer">
            open an issue
          </a>
          . The code is MIT licensed and the lessons are CC BY 4.0, so you can
          share them with credit.
        </p>
      </div>
    </div>
  );
}
