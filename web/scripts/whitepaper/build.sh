#!/usr/bin/env bash
# Regenerate the /hybrid-workforces/ page body from the paper's LaTeX source.
#   scripts/whitepaper/build.sh ~/repos/hybrid-workforces-overleaf main
# The source of truth is the Overleaf project (git.overleaf.com bridge,
# cloned to ~/repos/hybrid-workforces-overleaf, main.tex); the second
# argument is the .tex basename and defaults to "main".
# Needs pandoc and pdftocairo (poppler). Writes src/papers/hybrid-workforces/
# and public/media/hybrid-workforces/. Run latexmk on the paper first so the
# .aux and .pdf are current: the aux supplies every cross-reference number,
# and the script refuses a stale one.
set -euo pipefail
PAPER=${1:?path to the paper directory}
BASE=${2:-main}
HERE=$(cd "$(dirname "$0")" && pwd)
WEB=$(cd "$HERE/../.." && pwd)
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

for f in "$BASE.tex" "$BASE.aux" "$BASE.pdf" references.bib; do
  [[ -f "$PAPER/$f" ]] || { echo "missing $PAPER/$f" >&2; exit 1; }
done
if [[ "$PAPER/$BASE.tex" -nt "$PAPER/$BASE.aux" ]]; then
  echo "$BASE.aux is older than $BASE.tex: run latexmk first" >&2; exit 1
fi

# Figures first, into a staging directory: post.py reads each SVG's viewBox
# for the <img> size, and nothing in public/ changes unless the whole run
# succeeds. Figures with a web diagram (src/figures/diagrams) are inlined into
# the page, so their paper export is not shipped.
MEDIA="$WEB/public/media/hybrid-workforces"
STAGE="$TMP/media"
mkdir -p "$MEDIA" "$STAGE"
grep -o 'includegraphics\[[^]]*\]{ch0[0-9]/[^}]*}' "$PAPER/$BASE.tex" | sed 's/.*{\(.*\)}/\1/' | sort -u |
while read -r f; do
  b=$(basename "${f%.pdf}")
  [[ -f "$WEB/src/figures/diagrams/$b.svg" ]] && continue
  pdftocairo -svg "$PAPER/figures/$f" "$STAGE/$b.svg" 2> >(grep -v 'Syntax Warning' >&2 || true)
done

python3 -I "$HERE/prep.py" "$PAPER/$BASE.tex" "$PAPER/$BASE.aux" "$TMP/prepped.tex"
pandoc -f latex -t html5 --mathml --citeproc --bibliography "$PAPER/references.bib" \
  --csl "$HERE/acm-sig-proceedings.csl" --wrap=none --number-sections --shift-heading-level-by=1 \
  "$HERE/macros.tex" "$TMP/prepped.tex" -o "$TMP/pass.html" 2> >(grep -v 'already defined' >&2 || true)
python3 -I "$HERE/post.py" "$TMP/pass.html" "$PAPER/$BASE.aux" "$WEB/src/papers/hybrid-workforces" "$STAGE"

# post.py passed: swap the staged media in. The PDF goes to src/ (git-ignored
# while the paper is protected); lock.mjs then writes the encrypted forms that
# are committed and published. See src/papers/hybrid-workforces/config.mjs.
rm -f "$MEDIA"/*.svg
mv "$STAGE"/* "$MEDIA"/
cp "$PAPER/$BASE.pdf" "$WEB/src/papers/hybrid-workforces/whitepaper.pdf"
# While the paper is public the plain PDF is what the page links to.
if grep -q 'WHITEPAPER_PUBLIC = true' "$WEB/src/papers/hybrid-workforces/config.mjs"; then
  cp "$PAPER/$BASE.pdf" "$MEDIA/designing-for-hybrid-human-ai-workforces.pdf"
fi
if [[ -f "$WEB/.whitepaper-password" ]]; then
  (cd "$WEB" && node scripts/whitepaper/lock.mjs)
else
  echo "no web/.whitepaper-password: the encrypted paper was not refreshed" >&2
fi

echo "done: src/papers/hybrid-workforces/{body,toc}.html and public/media/hybrid-workforces/"
