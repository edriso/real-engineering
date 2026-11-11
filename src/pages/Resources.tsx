import { resources } from '../content/resources';

export function Resources() {
  return (
    <div className="container page">
      <header className="page__head">
        <h1>Resources</h1>
        <p className="page__lead">
          A short list on purpose. Everything here is free to read or practice,
          except the books, which are worth buying or borrowing.
        </p>
      </header>
      {resources.map((group) => (
        <section key={group.id} className="resource-group">
          <h2>{group.title}</h2>
          <ul className="resource-list">
            {group.items.map((item) => (
              <li key={item.url}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
                <p>{item.note}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
