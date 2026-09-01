#!/usr/bin/env python3
"""Regenerate data/publications.yaml from OpenAlex.

Run it by hand when there is something new to pick up:

    python3 scripts/sync-publications.py

Why OpenAlex and not Google Scholar
-----------------------------------
Scholar has no API, its terms forbid scraping, and it serves a CAPTCHA to
datacentre IPs — so a build-time fetch would break on Netlify and GitHub
Actions even though it works from a laptop. More to the point, the Scholar
profile page *truncates the fields we care about*: authors come back as
"U Bhatt, A Xiang, S Sharma, ..." and venues as "Proceedings of the 2020
Conference on Fairness, Accountability, and …". That truncation is where the
"..." in the old hand-maintained file came from.

OpenAlex is a free public API covering the same papers with full author names,
full venue titles, DOIs, and open-access links. The site still links out to
Scholar for citation counts.

This writes a file rather than fetching at build time, so builds stay
deterministic and work offline, and a bad upstream day cannot break the site.
Review the diff before committing.
"""

from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

# OpenAlex has split Umang across several author records; all of them are his.
# Check for new ones with:
#   https://api.openalex.org/authors?search=Umang%20Bhatt
AUTHOR_IDS = [
    "A5016469734",  # main record
    "A5125538948",
    "A5128870255",
    "A5093887402",
    "A5130000331",
]

# OpenAlex asks for a contact address; it buys a faster rate-limit pool.
MAILTO = "usb20@cam.ac.uk"

OUTPUT = Path(__file__).resolve().parent.parent / "data" / "publications.yaml"

# Editorial matter and corrections are not publications for our purposes.
SKIP_TYPES = {"paratext", "erratum", "editorial", "letter", "grant", "peer-review"}

OVERRIDES = Path(__file__).resolve().parent.parent / "data" / "publications_overrides.yaml"

# Venues are normalised to the short name the field actually uses. The year is
# already its own column, so it never appears in the venue, and "Proceedings of
# the Nth Conference on ..." is never spelled out.
VENUE_FIXES = [
    (r"^arXiv.*", "Preprint"),
    (r"^bioRxiv.*", "Preprint"),
    (r"^Social Science Research Network$", "SSRN"),
    (r".*AAAI/ACM Conference on AI[ ,]*Ethics,? and Society.*", "AIES"),
    (r".*Conference on Fairness,? Accountability,? and Transparency.*", "FAccT"),
    (r".*AAAI Conference on Human Computation and Crowdsourcing.*", "HCOMP"),
    (r".*AAAI Conference on Artificial Intelligence.*", "AAAI"),
    (r"^National Conference on Artificial Intelligence$", "AAAI"),
    (r".*International Joint Conference on Artificial Intelligence.*", "IJCAI"),
    (r".*Neural Information Processing Systems.*", "NeurIPS"),
    (r".*International Conference on Machine Learning.*", "ICML"),
    (r".*Conference on Human Factors in Computing Systems.*", "CHI"),
    (r".*Uncertainty in Artificial Intelligence.*", "UAI"),
    (r"^Findings of the Association for Computational Linguistics: EMNLP.*", "EMNLP"),
    (r"^Equity and Access in Algorithms, Mechanisms,? and Optimization$", "EAAMO"),
    (r".*International Conference on Acoustics, Speech and Signal Processing.*", "ICASSP"),
    (r".*Robot and Human Interactive Communication.*", "RO-MAN"),
    (r"^Proceedings of the National Academy of Sciences$", "PNAS"),
    (r"^Philosophical Transactions of the Royal Society A.*", "Phil. Trans. R. Soc. A"),
    (r"^RSS Data Science and Artificial Intelligence$", "RSS: Data Science and AI"),
    (r"^Computer$", "IEEE Computer"),
    (r"^Frontiers in Artificial Intelligence and Applications$", "ECAI"),
    (r"\s*\(Cornell University\)\s*", ""),
    # Anything left over: drop a leading year and the "Proceedings of the" frame.
    (r"^Proceedings of (the )?(\d{4} )?", ""),
    (r"^\d{4} ", ""),
]


def load_overrides() -> dict:
    """Minimal reader for the flat override file — avoids a PyYAML dependency."""
    data: dict = {"allowed_venues": [], "merge": [], "venues": {}, "featured": []}
    if not OVERRIDES.exists():
        return data
    section, item = None, None
    for raw in OVERRIDES.read_text().splitlines():
        line = raw.split("#")[0].rstrip() if not raw.strip().startswith("#") else ""
        if not line.strip():
            continue
        if not line.startswith(" ") and line.rstrip().endswith(":"):
            section = line.rstrip()[:-1]
            continue
        if not line.startswith(" ") and ": {}" in line:
            section = None
            continue
        value = line.strip()
        if section == "merge":
            if value.startswith("- "):
                item = {}
                data["merge"].append(item)
                value = value[2:]
            key, _, rest = value.partition(":")
            if item is not None:
                item[key.strip()] = rest.strip().strip('"')
        elif section in ("allowed_venues", "featured") and value.startswith("- "):
            data[section].append(value[2:].strip().strip('"'))
        elif section == "venues" and ":" in value:
            key, _, rest = value.partition(":")
            data["venues"][key.strip().strip('"')] = rest.strip().strip('"')
    return data


def apply_overrides(records: list[dict], ov: dict) -> list[dict]:
    def matches(rec, fragment):
        return fragment.lower() in rec["title"].lower()

    kept = list(records)

    # Merges first, so a merged record carries its "Forthcoming at" venue past
    # the allowlist.
    for merge in ov["merge"]:
        drop, into, venue = merge.get("drop"), merge.get("into"), merge.get("venue")
        if drop:
            kept = [r for r in kept if not matches(r, drop)]
        for rec in kept:
            if into and matches(rec, into) and venue:
                rec["venue"] = venue

    for fragment, venue in ov["venues"].items():
        for rec in kept:
            if matches(rec, fragment):
                rec["venue"] = venue

    # Then the allowlist. Preprints, repository deposits, abstracts and book
    # series all fall out here.
    allowed = set(ov["allowed_venues"])
    if allowed:
        kept = [r for r in kept
                if r["venue"] in allowed or r["venue"].startswith("Forthcoming at")]
    return kept


def fetch(url: str) -> dict:
    req = urllib.request.Request(url, headers={"User-Agent": f"trace-lab-site ({MAILTO})"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.load(resp)


def works_for(author_id: str) -> list[dict]:
    """Every work for one author record, following the cursor."""
    out, cursor = [], "*"
    while cursor:
        params = urllib.parse.urlencode({
            "filter": f"author.id:{author_id}",
            "per-page": 200,
            "cursor": cursor,
            "mailto": MAILTO,
        })
        page = fetch(f"https://api.openalex.org/works?{params}")
        out.extend(page.get("results", []))
        cursor = page.get("meta", {}).get("next_cursor")
    return out


def clean_venue(name: str | None) -> str:
    if not name:
        return ""
    for pattern, replacement in VENUE_FIXES:
        name = re.sub(pattern, replacement, name).strip()
    return name


def venue_from_crossref(doi: str) -> str:
    """OpenAlex has no source for a dozen of the conference papers, but they all
    carry a DOI and Crossref knows the proceedings title."""
    slug = doi.replace("https://doi.org/", "")
    try:
        msg = fetch(f"https://api.crossref.org/works/{urllib.parse.quote(slug)}?mailto={MAILTO}")["message"]
    except (urllib.error.URLError, urllib.error.HTTPError, KeyError, json.JSONDecodeError):
        return ""
    container = msg.get("container-title") or []
    return clean_venue(container[0]) if container else ""


def title_key(title: str) -> str:
    """Normalised title, for spotting the same paper twice."""
    return re.sub(r"[^a-z0-9]+", "", (title or "").lower())


def best_url(work: dict) -> str:
    if work.get("doi"):
        return work["doi"]
    oa = work.get("best_oa_location") or {}
    return oa.get("landing_page_url") or work.get("id", "")


def to_record(work: dict) -> dict | None:
    title = (work.get("title") or "").strip()
    if not title:
        return None

    source = (work.get("primary_location") or {}).get("source") or {}
    venue = clean_venue(source.get("display_name"))
    if not venue and work.get("doi"):
        venue = venue_from_crossref(work["doi"])

    return {
        "title": title,
        "authors": [a["author"]["display_name"] for a in work.get("authorships", [])],
        "year": work.get("publication_year"),
        "venue": venue,
        "url": best_url(work),
        "citations": work.get("cited_by_count", 0),
        "is_preprint": work.get("type") == "preprint",
    }


def dedupe(records: list[dict]) -> list[dict]:
    """Collapse the same paper appearing under several author records, and the
    preprint/published pair OpenAlex keeps as two works."""
    def rank(rec: dict) -> tuple:
        return (not rec["is_preprint"], rec["citations"], len(rec["authors"]))

    best: dict[str, dict] = {}
    for rec in records:
        key = title_key(rec["title"])
        held = best.get(key)
        if held is None or rank(rec) > rank(held):
            best[key] = rec
    return list(best.values())


def yaml_str(value: str) -> str:
    """Double-quoted YAML scalar, escaped."""
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'


def render(records: list[dict]) -> str:
    lines = [
        "# Publications — GENERATED FILE, do not edit by hand.",
        "#",
        "# Regenerate with:  python3 scripts/sync-publications.py",
        "# Source: OpenAlex (see the script's docstring for why not Google Scholar).",
        "",
        "publications:",
    ]
    for rec in records:
        lines.append(f"  - title: {yaml_str(rec['title'])}")
        lines.append("    authors:")
        for name in rec["authors"]:
            lines.append(f"      - {yaml_str(name)}")
        lines.append(f"    year: {rec['year'] or 0}")
        lines.append(f"    venue: {yaml_str(rec['venue'])}")
        lines.append(f"    url: {yaml_str(rec['url'])}")
        lines.append(f"    citations: {rec['citations']}")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    collected: list[dict] = []
    for author_id in AUTHOR_IDS:
        try:
            works = works_for(author_id)
        except urllib.error.URLError as exc:
            print(f"  {author_id}: FAILED ({exc})", file=sys.stderr)
            return 1
        print(f"  {author_id}: {len(works)} works")
        for work in works:
            if work.get("type") in SKIP_TYPES:
                continue
            record = to_record(work)
            if record:
                collected.append(record)

    records = apply_overrides(dedupe(collected), load_overrides())
    records.sort(key=lambda r: (-(r["year"] or 0), -r["citations"], r["title"]))

    OUTPUT.write_text(render(records))
    no_venue = sum(1 for r in records if not r["venue"])
    print(f"\n{len(collected)} fetched -> {len(records)} after dedupe")
    print(f"{no_venue} without a venue" if no_venue else "all have a venue")
    print(f"written to {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
