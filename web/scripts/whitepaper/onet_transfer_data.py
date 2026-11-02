"""Data behind Figure 6 (onet_transfer) as JSON for the web chart.

Reproduces the paper's figure script (hybrid-workforces-overleaf/figures/src/
onet_transfer.py): population mean and sample covariance (pandas .cov(), ddof=1,
no shrinkage) over the 894 x 120 O*NET table, the seven displayed features chosen
by the same rule, and the Kalman update parameters. The browser recomputes the
update from mu, Sigma, y and sigma_obs; the script also writes the default
posterior so the two can be checked against each other.

Usage: python3 -I onet_transfer_data.py [<onet.csv.gz>] [<out.json>]
"""
import json
import os
import pathlib
import sys

import numpy as np
import pandas as pd

HERE = pathlib.Path(__file__).resolve().parent
ONET = pathlib.Path(sys.argv[1] if len(sys.argv) > 1
                    else os.path.expanduser("~/repos/skillinfer/skillinfer/datasets/onet.csv.gz"))
OUT = pathlib.Path(sys.argv[2] if len(sys.argv) > 2
                   else HERE / ".." / ".." / "src" / "figures" / "data" / "onet_transfer.json")

OBSERVED = "Knowledge:Economics and Accounting"
Y = 0.92
TARGET = "Credit Analysts"
SIGMA_OBS = 0.10


def short(name):
    return name.split(":", 1)[1] if ":" in name else name


def main():
    raw = pd.read_csv(ONET, index_col=0)
    mu0 = raw.mean(axis=0)
    Sigma = raw.cov()
    Corr = raw.corr()

    # Displayed features, same rule as the paper: observed, three strongest positive
    # correlates, the most nearly independent, two strongest negative correlates;
    # then ordered as the heatmap orders them (observed first, then by correlation).
    r = Corr[OBSERVED].drop(OBSERVED)
    pos = list(r.sort_values(ascending=False).index[:3])
    neg = list(r.sort_values().index[:2])
    neutral = r.abs().sort_values().index[0]
    idxs = [OBSERVED] + pos + [neutral] + neg
    hm = [OBSERVED] + sorted([f for f in idxs if f != OBSERVED],
                             key=lambda f: -Corr.loc[OBSERVED, f])

    S = Sigma.loc[hm, hm].values
    C = Corr.loc[hm, hm].values
    m = mu0[hm].values
    tg = raw.loc[TARGET, hm].values

    # The default update on the full matrix, as the paper computes it, restricted
    # to the displayed rows. Restricting Sigma first gives the same mean and the
    # same displayed diagonal, since both only use column j and the 7x7 block.
    j = 0
    k = S[:, j] / (S[j, j] + SIGMA_OBS ** 2)
    mu1 = m + k * (Y - m[j])
    S1 = S - np.outer(k, S[j, :])
    k_full = Sigma[OBSERVED] / (Sigma.loc[OBSERVED, OBSERVED] + SIGMA_OBS ** 2)
    mu1_full = (mu0 + k_full * (Y - mu0[OBSERVED]))[hm].values
    assert np.allclose(mu1, mu1_full), "restricted update differs from the full one"

    out = {
        "source": "O*NET 30.2, U.S. Department of Labor / ETA, CC BY 4.0",
        "n_occupations": int(raw.shape[0]),
        "n_features": int(raw.shape[1]),
        "features": [{"name": f, "short": short(f)} for f in hm],
        "observed": {"feature": OBSERVED, "index": j, "y": Y, "sigma_obs": SIGMA_OBS},
        "target": {"name": TARGET, "values": [round(float(v), 6) for v in tg]},
        "mu": [round(float(v), 6) for v in m],
        "sigma": [[round(float(v), 8) for v in row] for row in S],
        "var": [round(float(v), 8) for v in np.diag(S)],
        "corr": [[round(float(v), 4) for v in row] for row in C],
        "default_posterior": {
            "mu": [round(float(v), 6) for v in mu1],
            "var": [round(float(v), 8) for v in np.diag(S1)],
        },
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, separators=(",", ":")) + "\n")
    print("wrote", OUT.resolve(), OUT.stat().st_size, "bytes")
    for i, f in enumerate(hm):
        print("   %-34s rho %+.2f   %.3f -> %.3f   target %.3f   sd %.3f -> %.3f"
              % (short(f)[:34], C[0, i], m[i], mu1[i], tg[i],
                 np.sqrt(S[i, i]), np.sqrt(S1[i, i])))


if __name__ == "__main__":
    main()
