import { MDXProvider } from '@mdx-js/react';
import { createElement, Suspense } from 'react';
import { Link, useParams } from 'react-router';
import { Checkbox } from '../components/Checkbox';
import { Icon } from '../components/Icon';
import { readKey } from '../lib/progress';
import { mdxComponents } from '../components/mdx-components';
import {
  getLesson,
  lessonContent,
  lessonFile,
  neighbours,
  preloadLesson,
} from '../content/lessons';
import { parts } from '../content/parts';
import { site } from '../lib/site';
import { useStoredState } from '../lib/storage';
import { NotFound } from './NotFound';

// lessonContent caches one component per slug, so its identity is stable across renders.
function LessonBody({ slug }: { slug: string }) {
  return createElement(lessonContent(slug));
}

export function Lesson() {
  const { slug = '' } = useParams();
  const lesson = getLesson(slug);
  const [read, setRead] = useStoredState(readKey(slug), false);
  if (!lesson) return <NotFound />;

  const part = parts.find((p) => p.id === lesson.part);
  const { prev, next } = neighbours(lesson.slug);

  return (
    <article className="container page lesson">
      <header className="lesson__head">
        <p className="eyebrow">
          <Link to="/lessons">Lesson {lesson.number}</Link>
          {part ? <> · {part.title}</> : null} · {lesson.minutes} min read
        </p>
        <h1>{lesson.title}</h1>
        <p className="page__lead">{lesson.summary}</p>
      </header>

      <div className="prose">
        <MDXProvider components={mdxComponents}>
          <Suspense fallback={<p className="loading">Loading the lesson...</p>}>
            <LessonBody slug={lesson.slug} />
          </Suspense>
        </MDXProvider>
      </div>

      <footer className="lesson__foot">
        <div className="lesson__done">
          <Checkbox checked={read} onChange={setRead}>
            Mark this lesson as read
          </Checkbox>
          <a
            className="lesson__edit"
            href={`${site.repo}/edit/main/src/content/lessons/${lessonFile(lesson)}`}
            target="_blank"
            rel="noreferrer"
          >
            Suggest an edit
          </a>
        </div>
        <nav className="pager" aria-label="Lessons">
          {prev ? (
            <Link
              to={`/lessons/${prev.slug}`}
              className="pager__link"
              onPointerEnter={() => preloadLesson(prev.slug)}
            >
              <span className="pager__dir">
                <Icon name="arrowLeft" size={16} /> Previous
              </span>
              <span className="pager__title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/lessons/${next.slug}`}
              className="pager__link pager__link--next"
              onPointerEnter={() => preloadLesson(next.slug)}
            >
              <span className="pager__dir">
                Next <Icon name="arrowRight" size={16} />
              </span>
              <span className="pager__title">{next.title}</span>
            </Link>
          ) : (
            <Link to="/practice" className="pager__link pager__link--next">
              <span className="pager__dir">
                You finished the lessons <Icon name="arrowRight" size={16} />
              </span>
              <span className="pager__title">Now build the routine</span>
            </Link>
          )}
        </nav>
      </footer>
    </article>
  );
}
