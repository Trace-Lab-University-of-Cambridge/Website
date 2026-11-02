"""Dump the experiment results behind Figures 7, 8 and 9 as JSON for the web charts.

Usage: python3 -I figdata.py <repo>/onet_experiment/results <web>/src/figures/data

Figures 5 and 6 need the Skills Framework and O*NET tables and their own
computation; see ssg_credit_profiles.py and onet_transfer.py next to this
file, which write their JSON the same way.
"""
import csv
import json
import pathlib
import sys

res = pathlib.Path(sys.argv[1])
out = pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)


def rows(name):
    with open(res / name, newline='') as f:
        return list(csv.DictReader(f))


def num(v):
    return float(v)


# --- Figure 7: five estimators recovering a held-out profile -----------------
r = rows('exp1_methods.csv')
methods = {}
for d in r:
    m = methods.setdefault(d['method'], {'label': d['label'], 'points': []})
    m['points'].append({
        'k': int(d['k']),
        'R': num(d['R']), 'R_lo': num(d['R_lo']), 'R_hi': num(d['R_hi']),
        'r': num(d['r']), 'r_lo': num(d['r_lo']), 'r_hi': num(d['r_hi']),
        'cov': num(d['cov']), 'cov_lo': num(d['cov_lo']), 'cov_hi': num(d['cov_hi']),
    })
for m in methods.values():
    m['points'].sort(key=lambda p: p['k'])
(out / 'onet_recovery_curves.json').write_text(json.dumps({'methods': methods}, separators=(',', ':')))

# --- Figure 8: orchestration, clearance over the run and the split ---------
curve = {}
for d in rows('exp2_curve.csv'):
    curve.setdefault(d['policy'], []).append({
        'bin': int(d['bin']), 'success': num(d['success']), 'se': num(d['success_se']),
        'regret': num(d['regret']), 'human_share': num(d['human_share']),
    })
for v in curve.values():
    v.sort(key=lambda p: p['bin'])
blocks = {}
for d in rows('exp2_blocks.csv'):
    blocks.setdefault(d['policy'], {})[d['block']] = {
        'human_share': num(d['human_share']), 'se': num(d['human_share_se']),
        'success': num(d['success']), 'success_se': num(d['success_se']),
    }
(out / 'onet_orchestration.json').write_text(json.dumps({'curve': curve, 'blocks': blocks}, separators=(',', ':')))

# --- Figure 9: what the floor costs ------------------------------------------
floor = []
for d in rows('exp3_floor.csv'):
    floor.append({k: num(v) for k, v in d.items()})
floor.sort(key=lambda p: p['phi'])
(out / 'controls_floor.json').write_text(json.dumps({'floor': floor}, separators=(',', ':')))

print('wrote', sorted(p.name for p in out.glob('*.json')))
