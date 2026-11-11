import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="container page not-found">
      <p className="eyebrow">404</p>
      <h1>This page doesn't exist</h1>
      <p className="page__lead">
        The link may be old, or the page moved. The lessons list has everything.
      </p>
      <p>
        <Link to="/lessons" className="button button--primary">
          Go to all lessons
        </Link>
      </p>
    </div>
  );
}
