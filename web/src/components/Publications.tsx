import { useMemo, useState, useEffect, Fragment } from 'react';
import pubsData from '../data/publications.yaml';
import { formatAuthors } from '../lib/lab';

type Pub = {
  title: string;
  authors: string[] | string;
  year: number;
  venue?: string;
  url?: string;
};

const PUBS = ((pubsData as { publications: Pub[] }).publications ?? []).slice();

const YEARS = (() => {
  const ys = PUBS.map((p) => p.year);
  const min = Math.min(...ys);
  const max = Math.max(...ys);
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
})();

const SEARCH = new Map<Pub, string>(
  PUBS.map((p) => {
    const authors = Array.isArray(p.authors) ? p.authors.join(' ') : String(p.authors);
    return [p, `${p.title} ${authors} ${p.venue ?? ''}`.toLowerCase()];
  })
);

function Authors({ authors }: { authors: Pub['authors'] }) {
  const { shown, extra } = formatAuthors(authors, 14);
  return (
    <>
      {shown.map((a, i) => (
        <Fragment key={i}>
          {i > 0 ? ', ' : ''}
          {a.lab ? <b>{a.name}</b> : a.name}
        </Fragment>
      ))}
      {extra > 0 ? `, and ${extra} others` : ''}
    </>
  );
}

export default function Publications() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const countsByYear = useMemo(() => {
    const m = new Map<number, number>();
    for (const p of PUBS) m.set(p.year, (m.get(p.year) ?? 0) + 1);
    return m;
  }, []);
  const maxCount = Math.max(...countsByYear.values());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PUBS.filter((p) => {
      if (year !== null && p.year !== year) return false;
      if (q && !(SEARCH.get(p) ?? '').includes(q)) return false;
      return true;
    });
  }, [query, year]);

  const grouped = useMemo(() => {
    const m = new Map<number, Pub[]>();
    for (const p of filtered) {
      if (!m.has(p.year)) m.set(p.year, []);
      m.get(p.year)!.push(p);
    }
    return Array.from(m.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <div>
      {/* quiet year timeline — a navigator, not decoration */}
      <div className="pub-timeline" role="group" aria-label="Papers per year">
        {YEARS.map((y, i) => {
          const c = countsByYear.get(y) ?? 0;
          const h = c === 0 ? 0.05 : 0.2 + 0.8 * (c / maxCount);
          const grow = mounted ? h : 0;
          return (
            <button
              key={y}
              className="ptl-col"
              aria-pressed={year === y}
              aria-label={`${y}: ${c} paper${c === 1 ? '' : 's'}`}
              onClick={() => setYear((cur) => (cur === y ? null : y))}
              title={`${c} in ${y}`}
            >
              <span className="ptl-count">{c || ''}</span>
              <span className="ptl-bar" style={{ '--grow': grow, transitionDelay: `${i * 40}ms` } as React.CSSProperties} />
              <span className="ptl-year">{`'${String(y).slice(2)}`}</span>
            </button>
          );
        })}
      </div>
      <p className="pub-timeline-hint">
        {year !== null ? `Showing ${year} — click again to clear` : `${YEARS[0]}–${YEARS[YEARS.length - 1]}`}
      </p>

      {/* text filter (Umang's quiet control) */}
      <div className="filter">
        <label className="filter__label" htmlFor="pubfilter">Filter</label>
        <input
          id="pubfilter"
          className="filter__input"
          type="search"
          autoComplete="off"
          placeholder="Title, author, or venue"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="filter__count" role="status" aria-live="polite">
          {query || year !== null ? `${filtered.length} ${filtered.length === 1 ? 'paper' : 'papers'}` : ''}
        </p>
      </div>

      <div>
        {grouped.length === 0 ? (
          <p className="empty">No papers match that.</p>
        ) : (
          grouped.map(([y, items]) => (
            <section className="pubyear" key={y}>
              <h3 className="pubyear__label code">{y}</h3>
              <ul>
                {items.map((p) => (
                  <li className="pub pub--row" key={p.title}>
                    <div>
                      <h4 className="pub__title">
                        {p.url ? <a href={p.url} target="_blank" rel="noopener">{p.title}</a> : p.title}
                      </h4>
                      <p className="pub__authors"><Authors authors={p.authors} /></p>
                      {p.venue && <p className="pub__venue">{p.venue}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
