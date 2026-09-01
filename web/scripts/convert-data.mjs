// Converts the Hugo data/publications.yaml into a typed JSON module the
// Astro/React island imports. This is the "content collection" seam: the lab
// keeps editing one YAML file; the build turns it into type-checked data.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import yaml from 'js-yaml';

const here = dirname(fileURLToPath(import.meta.url));
// Read from the live Hugo repo so the POC uses the REAL, current data.
const src = resolve(here, '../../../Trace Lab Website/data/publications.yaml');
const out = resolve(here, '../src/data/publications.json');

const doc = yaml.load(readFileSync(src, 'utf8'));
const pubs = doc.publications ?? [];
writeFileSync(out, JSON.stringify(pubs, null, 2));
console.log(`Wrote ${pubs.length} publications → ${out}`);
