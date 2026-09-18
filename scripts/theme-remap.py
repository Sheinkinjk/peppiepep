"""
One-off palette migration, 18 Sep 2026: the consumer green system onto the
homepage tokens (src/app/home.css). Only the green family and its warm greys
move; the legacy dark B2B cyan theme, slate greys and semantic reds do not.
Idempotent: every target is outside the source set.
"""
import pathlib, re, sys
MAP = {
  "#10251b": "#14120f", "#2b362f": "#14120f", "#28453a": "#14120f", "#16201c": "#14120f",
  "#3d4b44": "#56504a", "#5a665f": "#56504a", "#627068": "#56504a", "#5c6b63": "#56504a", "#3a4742": "#56504a",
  "#9aa39c": "#766f66", "#6b756f": "#766f66", "#6e7b74": "#766f66",
  "#0a7c42": "#007a95", "#12a05b": "#0088a6",
  "#086536": "#003647", "#086b39": "#003647",
  "#e5e9e7": "#ded8cd", "#e3e7e2": "#ded8cd", "#cdd5cf": "#ded8cd", "#d9e5df": "#ded8cd", "#dfe5df": "#ded8cd",
  "#d7dcd8": "#ded8cd", "#cfd6d1": "#ded8cd", "#c7cfc9": "#ded8cd",
  "#f5f8f6": "#f7f4ee", "#f8faf9": "#f7f4ee", "#f2f4ee": "#f7f4ee", "#fbfcfb": "#f7f4ee", "#f6f7f6": "#f7f4ee",
  "#eef1ef": "#f1ede4", "#eef1ec": "#f1ede4",
  "#e8f5ee": "#e4f2f5", "#e6f3ec": "#e4f2f5", "#f4f9f6": "#e4f2f5",
  # teal-soft mixed 20% toward teal-bright: the soft teal's own border
  "#cfe6da": "#b9e3eb", "#bfe0cf": "#b9e3eb",
}
RGBA = {"rgba(14,124,66": "rgba(0,122,149", "rgba(10,124,66": "rgba(0,122,149", "rgba(16,37,27": "rgba(20,18,15",
        "rgba(14, 124, 66": "rgba(0, 122, 149", "rgba(10, 124, 66": "rgba(0, 122, 149", "rgba(16, 37, 27": "rgba(20, 18, 15"}
SKIP = ("src/components/home/", "src/components/brand/", "src/app/home.css")
pat = re.compile("|".join(re.escape(k) for k in MAP), re.I)
changed = 0; hits = 0
for root in ("src/app", "src/components"):
    for f in pathlib.Path(root).rglob("*"):
        if f.suffix not in (".tsx", ".ts", ".css") or any(str(f).startswith(s) for s in SKIP): continue
        s = f.read_text()
        n = s
        n, k = pat.subn(lambda m: MAP[m.group(0).lower()], n); hits += k
        for a, b in RGBA.items(): hits += n.count(a); n = n.replace(a, b)
        if n != s: f.write_text(n); changed += 1
print(f"{hits} colour references in {changed} files")
