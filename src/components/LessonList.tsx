import { Link } from 'react-router';
import { preloadLesson, type Lesson } from '../content/lessons';
import { readKey } from '../lib/progress';
import { useStoredState } from '../lib/storage';
import { Icon } from './Icon';

function LessonRow({ lesson }: { lesson: Lesson }) {
  const [read] = useStoredState(readKey(lesson.slug), false);
  return (
    <li>
      <Link
        to={`/lessons/${lesson.slug}`}
        className="lesson-row"
        data-read={read || undefined}
        onPointerEnter={() => preloadLesson(lesson.slug)}
        onFocus={() => preloadLesson(lesson.slug)}
      >
        <span className="lesson-row__num" aria-hidden="true">
          {String(lesson.number).padStart(2, '0')}
        </span>
        <span className="lesson-row__text">
          <span className="lesson-row__title">{lesson.title}</span>
          <span className="lesson-row__summary">{lesson.summary}</span>
        </span>
        <span className="lesson-row__meta">
          {read ? (
            <span className="lesson-row__read">
              <Icon name="check" size={14} strokeWidth={2.6} />
              <span className="visually-hidden">Read. </span>
            </span>
          ) : null}
          {lesson.minutes} min
        </span>
      </Link>
    </li>
  );
}

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <ol className="lesson-list">
      {lessons.map((lesson) => (
        <LessonRow key={lesson.slug} lesson={lesson} />
      ))}
    </ol>
  );
}
