"""Rewrite paper.tex into a pandoc-friendly copy.

Usage: python3 -I prep.py paper.tex paper.aux out.tex

Everything pandoc's LaTeX reader cannot know about the paper's custom
preamble is flattened here: the cover page is dropped (the web page gets its
own masthead), cross-references are resolved to the numbers in the .aux file,
run-in paragraphs become bold lead-ins, the algorithmic blocks become nested
enumerate lists with depth markers, and the tcolorbox listings become
environments pandoc already understands. Plain-text markers (CMTBEG, OBSMARK,
FIGSRCBEG, INDn) survive pandoc untouched and are turned into HTML by post.py.
"""
import re
import sys
import pathlib

src = pathlib.Path(sys.argv[1]).read_text()
aux = pathlib.Path(sys.argv[2]).read_text()
labels = dict(re.findall(r'\\newlabel\{([^}]*)\}\{\{([^}]*)\}', aux))

# Cover page and front-matter furniture.
src = re.sub(r'\\begin\{titlepage\}.*?\\end\{titlepage\}', '', src, flags=re.S)
src = re.sub(r'\\begingroup\s*\\hypersetup\{[^}]*\}\s*\\tableofcontents\s*\\endgroup', '', src)
src = re.sub(r'\\microtypesetup\{[^}]*\}', '', src)
src = re.sub(r'\\markboth\{[^}]*\}\{[^}]*\}', '', src)
src = re.sub(r'\\addcontentsline\{[^}]*\}\{[^}]*\}\{[^}]*\}', '', src)
src = re.sub(r'\\needspace\{[^}]*\}', '', src)
src = src.replace('\\clearpage', '')

# Web-only omissions (the PDF keeps both): the contact paragraph, because the
# page's contact band at the bottom lists everyone once, and the revision
# history, which is editorial record rather than content. Fail loudly if the
# wording changes, so neither silently comes back.
for lead in ('Questions.', 'Revision reference.'):
    src, n = re.subn(r'\\paragraph\*?\{%s\}.*?(?:\n\s*\n|(?=\\(?:sub)*section))' % re.escape(lead), '', src, flags=re.S)
    if n != 1:
        sys.exit('prep.py: expected one \\paragraph{%s} in the front matter, found %d' % (lead, n))

# Cross-references: pandoc leaves \ref empty, so resolve them from the aux.
def ref(m):
    key = m.group(2)
    if key not in labels:
        sys.exit('prep.py: \\ref{%s} not in paper.aux; run latexmk first' % key)
    n = labels[key]
    if m.group(1) == 'eq':
        return r'\hyperref[%s]{(%s)}' % (key, n)
    return r'\hyperref[%s]{%s}' % (key, n)
src = re.sub(r'\\(eq)?ref\{([^}]*)\}', ref, src)

# Run-in paragraph headings, as in the PDF.
src = re.sub(r'\\paragraph\*?\{([^}]*)\}', r'\\textbf{\1}', src)

# tcolorbox environments -> things pandoc knows.
src = src.replace(r'\begin{takeaways}[Takeaways]', r'\begin{takeaways}')
src = src.replace(r'\begin{pythonblock}', r'\begin{lstlisting}[language=Python]')
src = src.replace(r'\end{pythonblock}', r'\end{lstlisting}')

# The output box: strip the font/colour furniture, simplify the column spec,
# and keep the table.
src = re.sub(r'\\ttfamily\\fontsize\{[^}]*\}\{[^}]*\}\\selectfont\\color\{ink\}\s*\n', '', src)
src = re.sub(r'\\setlength\{\\tabcolsep\}\{[^}]*\}\\renewcommand\{\\arraystretch\}\{[^}]*\}\s*\n', '', src)
src = src.replace(r'\begin{tabular}{@{}l@{\hspace{7pt}}l r r l@{}}', r'\begin{tabular}{llrrl}')
src = src.replace(r'\arrayrulecolor{rule}\cmidrule[0.5pt]{1-5}', r'\midrule')
src = re.sub(r'\\par\\vspace\{4pt\}\s*\{\\sffamily\\scriptsize\\color\{inkfaint\}\\obs\\ watched\}',
             '\n\n\\\\obs\\\\ watched\n', src)

# Partial rules pandoc cannot draw; it would otherwise leak "3-4" into a cell.
src = re.sub(r'\\cmidrule\([^)]*\)\{[^}]*\}\s*\n', '', src)

# Pandoc keeps only the header rule; an interior \midrule (a group break, as
# under Table 1's Oracle row) is carried to post.py as a marker on the next row.
def interior_rules(m):
    body, seen = m.group(0), [0]
    def rule(r):
        seen[0] += 1
        return r.group(0) if seen[0] == 1 else 'MIDRULEMARK '
    return re.sub(r'\\midrule\s*\n\s*', rule, body)
src = re.sub(r'\\begin\{tabular\}.*?\\end\{tabular\}', interior_rules, src, flags=re.S)

# Algorithms: numbered lines with depth markers, "for" blocks explicit.
def algorithm(m):
    body = m.group(0)
    cap = re.search(r'\\caption\{(.*)\}', body).group(1)
    lab = re.search(r'\\label\{([^}]*)\}', body).group(1)
    if lab not in labels:
        sys.exit('prep.py: %s not in paper.aux; run latexmk first' % lab)
    n = labels[lab]
    inner = re.search(r'\\begin\{algorithmic\}\[1\](.*?)\\end\{algorithmic\}', body, re.S).group(1)
    out = ['\\begin{algorithm}', '\\label{%s}' % lab,
           'ALGCAPBEG Algorithm %s. ALGCAPMID %s ALGCAPEND' % (n, cap), '',
           '\\begin{enumerate}']
    depth = 0
    for raw in inner.strip().splitlines():
        s = raw.strip()
        if not s:
            continue
        s = re.sub(r'\\Comment\{(.*)\}\s*$', r' CMTBEG \1 CMTEND', s)
        if s.startswith('\\Require'):
            out.append('\\item INDR \\textbf{Input:}' + s[len('\\Require'):]); continue
        elif s.startswith('\\Ensure'):
            out.append('\\item INDR \\textbf{Output:}' + s[len('\\Ensure'):]); continue
        elif s.startswith('\\For{'):
            # the condition may contain braces; take up to the matching one
            i, bal, start = len('\\For{'), 1, len('\\For{')
            while bal and i < len(s):
                bal += {'{': 1, '}': -1}.get(s[i], 0)
                i += 1
            if bal:
                sys.exit('prep.py: unbalanced \\For line: %s' % s)
            s = '\\textbf{for} ' + s[start:i - 1] + ' \\textbf{do}' + s[i:]
            out.append('\\item IND%d %s' % (depth, s))
            depth += 1
            continue
        elif s.startswith('\\EndFor'):
            depth -= 1
            s = '\\textbf{end for}'
        elif s.startswith('\\State \\Return'):
            s = '\\textbf{return}' + s[len('\\State \\Return'):]
        elif s.startswith('\\State'):
            s = s[len('\\State'):].strip()
        out.append('\\item IND%d %s' % (depth, s))
    out += ['\\end{enumerate}', '\\end{algorithm}']
    return '\n'.join(out)
src = re.sub(r'\\begin\{algorithm\}\[[^\]]*\].*?\\end\{algorithm\}', algorithm, src, flags=re.S)
src = re.sub(r'\\footnotesize\n', '', src)

pathlib.Path(sys.argv[3]).write_text(src)
print('labels', len(labels), 'bytes', len(src))
