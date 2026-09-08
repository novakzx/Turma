#!/usr/bin/env python3
"""Baixa as fontes do Google Fonts e reescreve @font-face apontando p/ arquivos locais.
Objetivo: self-hosting (sem vazar IP/telemetria p/ terceiros + CSP restritiva)."""
import re
import subprocess
import os

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
URL = (
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700"
    "&family=Sora:wght@600;700;800&display=swap"
)
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "fonts")
OUT_CSS = os.path.join(os.path.dirname(__file__), "..", "src", "app", "fonts.css")

os.makedirs(OUT_DIR, exist_ok=True)

css = subprocess.check_output(["curl", "-s", "-A", UA, URL]).decode()

# separa blocos: comentário de subset + @font-face
blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]+\})", css)

out = ["/* Fontes self-hosted — gerado por scripts/fetch-fonts.py */"]
count = 0
for subset, face in blocks:
    if subset != "latin":
        continue
    family = re.search(r"font-family:\s*'([^']+)'", face).group(1)
    weight = re.search(r"font-weight:\s*(\d+)", face).group(1)
    url = re.search(r"url\((https://[^)]+)\)", face).group(1)
    fname = f"{family.lower()}-{weight}.woff2"
    subprocess.check_call(
        ["curl", "-s", "-o", os.path.join(OUT_DIR, fname), url],
    )
    out.append(
        "@font-face {\n"
        f"  font-family: '{family}';\n"
        f"  font-style: normal;\n"
        f"  font-weight: {weight};\n"
        "  font-display: swap;\n"
        f"  src: url('/fonts/{fname}') format('woff2');\n"
        "}"
    )
    count += 1

with open(OUT_CSS, "w") as f:
    f.write("\n".join(out) + "\n")

print(f"OK: {count} fontes baixadas -> public/fonts/ + src/app/fonts.css")
