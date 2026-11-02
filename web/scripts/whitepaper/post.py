"""Turn pandoc's fragment into the body and contents list the Astro page embeds.

Usage: python3 -I post.py pass2.html paper.aux outdir/

Replaces the plain-text markers prep.py planted, numbers figures, tables and
algorithms from the .aux file, gives equations their ids and numbers, links
numeric citations to their bibliography entries, and builds a nested
contents list from the h2/h3 headings.
"""
import re
import sys
import pathlib

h = pathlib.Path(sys.argv[1]).read_text()
aux = pathlib.Path(sys.argv[2]).read_text()
out = pathlib.Path(sys.argv[3])
media = pathlib.Path(sys.argv[4])          # where the figure SVGs live
labels = dict(re.findall(r'\\newlabel\{([^}]*)\}\{\{([^}]*)\}', aux))
def need(key):
    if key not in labels:
        sys.exit('post.py: %s not in the .aux; run latexmk first' % key)
    return labels[key]

# --- figures -----------------------------------------------------------------
h = h.replace(' data-latex-placement="!htbp"', '')

def svg_size(name):
    """Intrinsic size from the SVG's viewBox, so a lazy image reserves its box."""
    head = (media / (name + '.svg')).read_text()[:2000]
    vb = re.search(r'viewBox="[\d.]+ [\d.]+ ([\d.]+) ([\d.]+)"', head)
    return (round(float(vb.group(1))), round(float(vb.group(2)))) if vb else (None, None)

# Pandoc emits <embed> for a PDF include. The alt text is the caption's bold
# lead sentence; the full caption follows in the figcaption.
def figure(m):
    fid, inner = m.group(1), m.group(2)
    n = need(fid)
    lead = re.search(r'<figcaption[^>]*>\s*<strong>(.*?)</strong>', inner, flags=re.S)
    lead_text = re.sub(r'<annotation.*?</annotation>', '', lead.group(1), flags=re.S) if lead else ''
    alt = re.sub(r'<[^>]+>', '', lead_text).strip() if lead else 'Figure %s' % n
    def img(e):
        name = e.group(1)
        # A hand-made web diagram, if one exists, is inlined so it sets in
        # the site's fonts and can be styled; otherwise the paper's export is
        # placed as an image that figures/index.js may upgrade to a chart.
        diagram = out.parent.parent / 'figures' / 'diagrams' / (name + '.svg')
        if diagram.exists():
            svg = diagram.read_text().strip()
            svg = re.sub(r'^<\?xml[^>]*>\s*', '', svg)
            svg = re.sub(r'<svg\b', '<svg class="diagram" role="img" aria-label="%s"' % alt.replace('"', '&quot;'), svg, count=1)
            return '<div class="fig fig--diagram" data-fig="%s">%s</div>' % (name, svg)
        w, hh = svg_size(name)
        size = ' width="%d" height="%d"' % (w, hh) if w else ''
        # data-src: the paper's figure is fetched only if the live chart
        # cannot be built (figures/index.js); <noscript> covers no JavaScript.
        return ('<div class="fig" data-fig="%s"><img data-src="/media/hybrid-workforces/%s.svg" alt="%s"%s decoding="async" />'
                '<noscript><img src="/media/hybrid-workforces/%s.svg" alt="%s" /></noscript></div>'
                % (name, name, alt.replace('"', '&quot;'), size, name, alt.replace('"', '&quot;')))
    inner = re.sub(r'<embed src="ch0\d/([a-z0-9_]+)\.pdf" />', img, inner)
    inner = re.sub(r'<figcaption([^>]*)>',
                   r'<figcaption\1><span class="cap__n">Figure %s</span> ' % n, inner, count=1)
    return '<figure id="%s">%s</figure>' % (fid, inner)
h = re.sub(r'<figure id="(fig:[^"]+)">(.*?)</figure>', figure, h, flags=re.S)

# --- tables ------------------------------------------------------------------
# Pandoc wraps a captioned table in <div id="tab:..."> already; that div
# becomes the scrolling wrapper. The output box's bare tabular gets its own.
def table(m):
    tid = m.group(1)
    n = need(tid)
    inner = re.sub(r'<caption>', '<caption><span class="cap__n">Table %s</span> ' % n, m.group(2), count=1)
    # A table whose header starts with \multicolumn gets no <thead> from
    # pandoc: its two header rows sit at the top of <tbody> as <td>s.
    if '<thead>' not in inner:
        rows = re.findall(r'<tr>.*?</tr>', inner, flags=re.S)[:2]
        head = ''.join(rows).replace('<td', '<th scope="col"').replace('</td>', '</th>')
        head = head.replace('<th scope="col" colspan=', '<th scope="colgroup" colspan=')
        # An empty header cell is announced as an empty header; make it a td.
        head = re.sub(r'<th scope="col"([^>]*)></th>', r'<td\1></td>', head)
        for r in rows:
            inner = inner.replace(r, '', 1)
        inner = inner.replace('<tbody>', '<thead>%s</thead>\n<tbody>' % head, 1)
    return '<div id="%s" class="tbl"><table>%s</table>' % (tid, inner)
h = re.sub(r'<div id="(tab:[^"]+)">\s*<table>(.*?)</table>', table, h, flags=re.S)
h = re.sub(r'(<div class="outputbox">\s*)<table>(.*?)</table>',
           r'\1<div class="tbl"><table>\2</table></div>', h, flags=re.S)

# --- algorithms --------------------------------------------------------------
h = re.sub(r'<div class="algorithm">\s*<p><span id="(alg:[^"]+)" data-label="[^"]*"></span>\s*'
           r'ALGCAPBEG Algorithm (\d+)\. ALGCAPMID (.*?) ALGCAPEND</p>',
           r'<div class="algorithm" id="\1"><p class="alg__cap"><span class="cap__n">Algorithm \2</span> \3</p>',
           h, flags=re.S)
h = re.sub(r'<li>(<p>)?IND(\d|R) ?',
           lambda m: '<li class="alg__line alg__line--%s">%s' % ('io' if m.group(2) == 'R' else 'd' + m.group(2), m.group(1) or ''), h)
# list-style:none drops list semantics in Safari; say it is a list.
h = re.sub(r'(<p class="alg__cap">.*?</p>)\s*<ol>', r'\1\n<ol role="list">', h, flags=re.S)
h = re.sub(r' ?CMTBEG (.*?) CMTEND', r' <span class="alg__comment">\1</span>', h, flags=re.S)

# Table 2's numeric columns: pandoc centres them; Table 1's are right-aligned.
h = re.sub(r'(<div id="tab:floor-illustration".*?</table>)',
           lambda t: t.group(1).replace('text-align: center;', 'text-align: right;'), h, flags=re.S)

# A bare number in prose ($0.92$, $120$, $1{,}000$) is text, not maths: left
# as MathML it switches to the serif math font mid-sentence.
h = re.sub(r'<math display="inline"[^>]*><semantics>(?:<mn>([\d.]+)</mn>|<mrow><mn>(\d+)</mn><mo>,</mo><mn>(\d+)</mn></mrow>'
           r'|<mrow><mn>([\d.]+)</mn><mi>%</mi></mrow>)'
           r'<annotation encoding="application/x-tex">[^<]*</annotation></semantics></math>',
           lambda n: n.group(1) if n.group(1) else ('%s,%s' % (n.group(2), n.group(3)) if n.group(2) else n.group(4) + '%'), h)

# --- small markers -----------------------------------------------------------
h = re.sub(r'FIGSRCBEG (.*?) FIGSRCEND', r'<span class="figsource">\1</span>', h, flags=re.S)
h = h.replace('OBSMARK', '<span class="obs" role="img" aria-label="observed">&#9679;</span>')
h = h.replace('<div class="takeaways">', '<div class="takeaways"><p class="takeaways__label">Takeaways</p>')

# --- equations ---------------------------------------------------------------
# Display maths in document order: the three-line align, then the two metrics.
# The align block is numbered per row, as in the PDF, with the number as a
# third table column so it stays on its line.
align = ['eq:kalman_gain', 'eq:mean_update', 'eq:cov_update']
eqs = [None, 'eq:recovery', 'eq:pearson']
blocks = re.findall(r'<math display="block"', h)
assert len(blocks) == len(eqs), 'expected %d display equations, found %d' % (len(eqs), len(blocks))
def equation(m):
    block = m.group(0)
    key = eqs.pop(0)
    if key is None:
        rows = iter(align)
        def row(r):
            k = next(rows)
            return ('<mtr id="%s">%s<mtd columnalign="right" class="eq__n"><mtext>(%s)</mtext></mtd></mtr>'
                    % (k, r.group(1), labels[k]))
        block = re.sub(r'<mtr>(.*?)</mtr>', row, block, flags=re.S)
        return '<span class="eq">%s</span>' % block
    return '<span class="eq" id="%s">%s<span class="eq__n">(%s)</span></span>' % (key, block, labels[key])
h = re.sub(r'<math display="block".*?</math>', equation, h, flags=re.S)

# --- citations ---------------------------------------------------------------
def cite(m):
    keys, text = m.group(1).split(), m.group(2)
    nums = re.findall(r'\d+', text)
    if len(nums) != len(keys):
        return m.group(0)
    it = iter(keys)
    linked = re.sub(r'\d+', lambda n: '<a href="#ref-%s" aria-label="Reference %s">%s</a>'
                    % (next(it), n.group(0), n.group(0)), text)
    return '<span class="citation" data-cites="%s">%s</span>' % (m.group(1), linked)
h = re.sub(r'<span class="citation" data-cites="([^"]+)">([^<]*)</span>', cite, h)

# --- back matter -------------------------------------------------------------
h = h.replace('<div id="refs"', '<h2 class="unnumbered" id="references">Bibliography</h2>\n<div id="refs"', 1)
h = re.sub(r'<tr>\s*(<td[^>]*>)MIDRULEMARK ?', r'<tr class="group-start">\n\1', h)
h = re.sub(r'(<section id="footnotes"[^>]*>)\s*<hr />',
           r'\1<h2 class="unnumbered" id="notes">Notes</h2>', h, count=1)
h = h.replace('class="footnote-back" role="doc-backlink"',
              'class="footnote-back" role="doc-backlink" aria-label="Back to text"')

# --- contents ----------------------------------------------------------------
entries = []
for m in re.finditer(r'<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)</h\1>', h, flags=re.S):
    lvl, hid, inner = m.groups()
    num = re.search(r'header-section-number">([^<]*)<', inner)
    text = re.sub(r'<[^>]+>', '', inner)
    if num:
        text = text.replace(num.group(1), '', 1)
    entries.append((int(lvl), hid, num.group(1) if num else '', ' '.join(text.split())))

toc = ['<ol class="toc" role="list">']
open_sub = False
for lvl, hid, num, text in entries:
    n = '<span class="toc__n">%s</span>' % num if num else ''
    if lvl == 2:
        if open_sub:
            toc.append('</ol></li>')
            open_sub = False
        else:
            if len(toc) > 1:
                toc.append('</li>')
        toc.append('<li><a href="#%s">%s%s</a>' % (hid, n, text))
    else:
        if not open_sub:
            toc.append('<ol role="list">')
            open_sub = True
        # Sub-entries are clipped to one line in the rail; the title shows the rest.
        toc.append('<li><a href="#%s" title="%s %s">%s%s</a></li>'
                   % (hid, num, text.replace('"', '&quot;'), n, text))
if open_sub:
    toc.append('</ol>')
toc.append('</li></ol>')

out.mkdir(parents=True, exist_ok=True)
leftover = [k for k in ('MIDRULEMARK', 'INDR', 'ALGCAP', 'CMTBEG', 'CMTEND', 'FIGSRC', 'OBSMARK', 'IND0', 'IND1', 'IND2') if k in h]
figures = len(re.findall(r'<figure id="fig:', h))
images = len(re.findall(r'<div class="fig[^"]*" data-fig=', h))
print('body', len(h), 'toc entries', len(entries), 'figures', figures, 'images', images,
      'leftover markers', leftover)
if leftover or eqs or '<embed' in h or figures != images or '>??<' in h:
    sys.exit('post.py: generated body is incomplete (see above)')
(out / 'body.html').write_text(h)
(out / 'toc.html').write_text('\n'.join(toc))
