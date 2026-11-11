import { useId, useState } from 'react';
import { lessons, lessonsByPart } from '../content/lessons';
import { LessonList } from '../components/LessonList';

export function Lessons() {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const q = query.trim().toLowerCase();
  const groups = lessonsByPart()
    .map((part) => ({
      ...part,
      lessons: part.lessons.filter(
        (lesson) =>
          !q ||
          lesson.title.toLowerCase().includes(q) ||
          lesson.summary.toLowerCase().includes(q),
      ),
    }))
    .filter((part) => part.lessons.length > 0);

  return (
    <div className="container page">
      <header className="page__head">
        <h1>All lessons</h1>
        <p className="page__lead">
          {lessons.length} short lessons in six parts. Read them in order the
          first time, then come back to the ones you need.
        </p>
        <div className="search">
          <label htmlFor={inputId} className="visually-hidden">
            Filter lessons
          </label>
          <input
            id={inputId}
            type="search"
            placeholder="Filter lessons, e.g. tests, review, resume"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </header>
      {groups.length === 0 ? (
        <p className="empty">No lessons match "{query}".</p>
      ) : (
        groups.map((part) => (
          <section key={part.id} className="part">
            <h2 className="part__title">{part.title}</h2>
            <p className="part__blurb">{part.blurb}</p>
            <LessonList lessons={part.lessons} />
          </section>
        ))
      )}
    </div>
  );
}
