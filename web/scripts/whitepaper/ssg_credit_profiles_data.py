"""Data behind Figure 5 (ssg_credit_profiles) as JSON for the web chart.

Reproduces the role and axis selection of the paper's figure script
(hybrid-workforces-overleaf/figures/src/ssg_credit_profiles.py) exactly: the six
roles are fixed, the eight axes are the ones listed by all six roles with the
largest tier-removed spread, and levels are on the framework's 1-6 scale.

Usage: python3 -I ssg_credit_profiles_data.py [<repo with ssg_experiment>] [<out.json>]
"""
import json
import os
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
REPO = pathlib.Path(sys.argv[1] if len(sys.argv) > 1
                    else os.path.expanduser("~/repos/hybrid-workforces"))
OUT = pathlib.Path(sys.argv[2] if len(sys.argv) > 2
                   else HERE / ".." / ".." / "src" / "figures" / "data" / "ssg_credit_profiles.json")

sys.path.insert(0, str(REPO / "ssg_experiment"))
import build_matrix as bm  # noqa: E402

# Same six roles, same order, same panel titles as the paper.
ROLES = [
    ("Credit Risk Analyst (Corporate Banking)", "Credit Risk Analyst"),
    ("Credit Risk Manager (Corporate Banking)", "Credit Risk Manager"),
    ("Head of Credit Risk Management (Corporate Banking)", "Head of Credit Risk"),
    ("Risk Strategy Manager", "Risk Strategy Manager"),
    ("Head of Risk Strategy", "Head of Risk Strategy"),
    ("Operational Risk Manager", "Operational Risk Manager"),
]
N_AXES = 8
COVER_FLOOR = 6
MAXL = 6.0

# The paper's shortened spoke labels (newlines kept: the chart breaks on them).
SHORT = {
    "Ethical Culture": "Ethical\nCulture",
    "Stakeholder Management": "Stakeholders",
    "People Performance Management": "People\nPerformance",
    "Strategy Planning": "Strategy\nPlanning",
    "Business Risk Assessment": "Business\nRisk",
    "Data Collection and Analysis": "Data",
    "Risk and Compliance Reporting": "Compliance",
    "Technology Application": "Technology",
    "Policy Implementation and Revision": "Policy",
    "Regulatory Compliance": "Regulatory\nCompliance",
    "Scenario Planning and Analysis": "Scenarios",
    "Credit Assessment": "Credit\nAssessment",
    "Credit Risk Management": "Credit Risk",
    "Risk Analytics": "Risk\nAnalytics",
    "Business Environment Analysis": "Business\nEnvironment",
    "Continuous Improvement Management": "Continuous\nImprovement",
    "Climate Change Management": "Climate\nChange",
    "Data Analytics and Computational Modelling": "Data\nAnalytics",
    "Non-Financial Industry Sustainability Developments": "Sustainability",
    "Standard Operating Procedures Development": "Operating\nProcedures",
}


def pick_axes(panel):
    """Verbatim from the figure script: coverage first, tier-removed spread second."""
    cover = (panel > 0).sum(axis=0)
    eligible = cover[cover >= COVER_FLOOR].index
    if len(eligible) < N_AXES:
        raise SystemExit("only %d axes clear the coverage floor" % len(eligible))
    listed = panel.where(panel > 0)
    shape = listed.sub(listed.mean(axis=1), axis=0)[eligible].std(axis=0)
    chosen = sorted(eligible, key=lambda s: (-cover[s], -shape[s]))[:N_AXES]
    return sorted(chosen, key=lambda s: (-cover[s], -shape[s]))


def main():
    rows = bm.load_rows()
    df = bm.build(rows, sector="Financial Services")
    df.index = [i.split(" :: ")[1] for i in df.index]
    df.columns = [c.split(":", 1)[1] for c in df.columns]

    role_ids = [r for r, _ in ROLES]
    for r in role_ids:
        if r not in df.index:
            raise SystemExit("role not in framework: %s" % r)

    axes_skills = pick_axes(df.loc[role_ids])
    panel = df.loc[role_ids, axes_skills] * MAXL
    ref = df[axes_skills].mean(axis=0) * MAXL
    if (panel <= 0).any().any():
        raise SystemExit("a chosen role does not list every axis")

    out = {
        "source": "Skills Framework for Financial Services (SkillsFuture Singapore)",
        "n_roles": int(df.shape[0]),
        "n_skills": int(df.shape[1]),
        "max_level": int(MAXL),
        "axes": [{"name": s, "short": SHORT.get(s, s)} for s in axes_skills],
        "roles": [{"name": r, "short": lab,
                   "levels": [int(round(v)) for v in panel.loc[r].values]}
                  for r, lab in ROLES],
        "sector_mean": [round(float(v), 4) for v in ref.values],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, separators=(",", ":")) + "\n")
    print("wrote", OUT.resolve(), OUT.stat().st_size, "bytes")
    print(panel.astype(int).to_string())
    print("sector mean:", [round(float(v), 2) for v in ref.values])


if __name__ == "__main__":
    main()
