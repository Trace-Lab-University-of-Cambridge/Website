// Shared roster logic. Lab members' names are set in bold in author lists so a
// reader can see the group's contribution at a glance (ported from
// layouts/partials/trace/authors.html).
import people from '../data/people.yaml';

type Group = { people?: { name: string }[] };
type People = {
  groups?: Group[];
  alumni?: { groups?: Group[] };
};

const p = people as People;

export const LAB_NAMES: Set<string> = (() => {
  const s = new Set<string>();
  for (const g of p.groups ?? []) for (const m of g.people ?? []) s.add(m.name);
  for (const g of p.alumni?.groups ?? []) for (const m of g.people ?? []) s.add(m.name);
  return s;
})();

export type AuthorToken = { name: string; lab: boolean };

// Truncate very long lists with a count rather than a bare ellipsis.
export function formatAuthors(
  authors: string[] | string,
  limit = 14
): { shown: AuthorToken[]; extra: number } {
  const all = Array.isArray(authors)
    ? authors
    : String(authors).split(',').map((s) => s.trim()).filter(Boolean);
  let shown = all;
  let extra = 0;
  if (all.length > limit) {
    shown = all.slice(0, limit - 2);
    extra = all.length - (limit - 2);
  }
  return { shown: shown.map((name) => ({ name, lab: LAB_NAMES.has(name) })), extra };
}
