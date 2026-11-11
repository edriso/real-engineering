import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useStoredState } from '../lib/storage';
import { Checkbox } from './Checkbox';

type CalloutType = 'tip' | 'warn' | 'note';
const calloutLabel: Record<CalloutType, string> = {
  tip: 'Tip',
  warn: 'Watch out',
  note: 'Note',
};

export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className={`callout callout--${type}`}>
      <p className="callout__title">{title ?? calloutLabel[type]}</p>
      <div className="callout__body">{children}</div>
    </aside>
  );
}

/** Side-by-side "before / after" examples. Stacks on small screens. */
export function Compare({ children }: { children: ReactNode }) {
  return <div className="compare">{children}</div>;
}

export function Before({
  label = 'Weak',
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="compare__side compare__side--before">
      <p className="compare__label">{label}</p>
      {children}
    </div>
  );
}

export function After({
  label = 'Strong',
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="compare__side compare__side--after">
      <p className="compare__label">{label}</p>
      {children}
    </div>
  );
}

/** A practice exercise. Its "done" tick is saved in this browser only. */
export function Drill({
  id,
  title,
  time,
  children,
}: {
  id: string;
  title: string;
  time?: string;
  children: ReactNode;
}) {
  const [done, setDone] = useStoredState(`re:drill:${id}`, false);
  return (
    <section className="drill" data-done={done || undefined}>
      <header className="drill__head">
        <p className="drill__kicker">
          Practice{time ? <span> · {time}</span> : null}
        </p>
        <h3 className="drill__title">{title}</h3>
      </header>
      <div className="drill__body">{children}</div>
      <Checkbox checked={done} onChange={setDone}>
        I did this
      </Checkbox>
    </section>
  );
}

export function Takeaways({ children }: { children: ReactNode }) {
  return (
    <section className="takeaways" aria-label="Key takeaways">
      <p className="takeaways__title">Remember</p>
      {children}
    </section>
  );
}

export function Quote({ by, children }: { by?: string; children: ReactNode }) {
  return (
    <figure className="quote">
      <blockquote>{children}</blockquote>
      {by ? <figcaption>{by}</figcaption> : null}
    </figure>
  );
}

export function SmartLink({
  href = '',
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('/')) {
    return <Link to={href}>{children}</Link>;
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
